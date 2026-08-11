-- =============================================================================
-- AI-Ready School — Database schema + Row-Level Security (RLS)
-- Run this ONCE in your Supabase project: SQL Editor → paste → Run.
-- Safe to re-run: it uses "if exists / if not exists" guards throughout.
--
-- RLS is the REAL access boundary. The app also checks access server-side,
-- but these policies mean a user can only ever read rows they're entitled to,
-- even if they hit the database directly.
--
-- Content (kits, files) is NOT in the database: the catalog lives in
-- lib/catalog.ts and the files ship inside the deploy. The database holds
-- accounts, organizations, licenses, invites, and leads only.
-- =============================================================================

-- ---------- Tables -----------------------------------------------------------

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  license_status text not null default 'inactive' check (license_status in ('active','inactive')),
  -- School Membership covers one school building, up to 75 staff seats.
  seats_limit int not null default 75,
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'teacher' check (role in ('teacher','school_admin','owner')),
  org_id uuid references public.organizations(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.licenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  org_id uuid references public.organizations(id) on delete cascade,
  product text not null check (product in ('individual','school')),
  status text not null default 'active' check (status in ('active','inactive')),
  stripe_ref text,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  status text not null default 'pending' check (status in ('pending','accepted')),
  token text not null unique,
  created_at timestamptz not null default now(),
  unique (org_id, email)
);

-- Free-resource / newsletter signups (written via the service role).
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text not null default 'site',
  created_at timestamptz not null default now()
);

-- Quote / purchase-order requests from the invoice-request form
-- (written via the service role; read by the owners).
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  school_name text not null,
  district text,
  contact_name text not null,
  contact_email text not null,
  po_number text,
  notes text,
  status text not null default 'new' check (status in ('new','quoted','invoiced','won','closed')),
  stripe_invoice_id text,
  created_at timestamptz not null default now()
);

-- Rollout checklist for the school dashboard.
create table if not exists public.rollout_steps (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  step_key text not null,
  title text not null,
  is_complete boolean not null default false,
  sort_order int not null default 0,
  unique (org_id, step_key)
);

-- The prompt library. One library per school (org_id set); Individual members
-- get a personal library (org_id null, scoped to the author).
-- `source` separates founder-provided starter prompts from staff-written ones.
create table if not exists public.prompts (
  id uuid primary key default gen_random_uuid(),
  org_id uuid references public.organizations(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  body text not null,
  subject text,
  grade_band text,
  task_type text not null default 'other'
    check (task_type in ('communication','planning','assessment','other')),
  source text not null default 'staff' check (source in ('staff','starter')),
  created_at timestamptz not null default now()
);

create index if not exists prompts_org_idx on public.prompts (org_id, created_at desc);
create index if not exists prompts_author_idx on public.prompts (author_id, created_at desc);

-- PD completion records. `recorded_by` is who entered it, which is what makes
-- the "admins record for schools, individuals self-serve" rule auditable.
-- One row per (educator, kit): recording twice updates rather than duplicates.
create table if not exists public.pd_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  kit_slug text not null,
  completed_at timestamptz not null default now(),
  recorded_by uuid references public.profiles(id) on delete set null,
  unique (profile_id, kit_slug)
);

create index if not exists pd_progress_profile_idx on public.pd_progress (profile_id);

-- ---------- Migrations for databases created before these columns existed ----
-- (create table if not exists above is a no-op on an existing table, so the
--  same additions are repeated here as alters. Both paths are idempotent.)

alter table public.quote_requests
  add column if not exists stripe_invoice_id text;

alter table public.quote_requests
  drop constraint if exists quote_requests_status_check;
alter table public.quote_requests
  add constraint quote_requests_status_check
  check (status in ('new','quoted','invoiced','won','closed'));

-- ---------- Helper functions (SECURITY DEFINER to avoid RLS recursion) --------

create or replace function public.app_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.app_org()
returns uuid language sql stable security definer set search_path = public as $$
  select org_id from public.profiles where id = auth.uid()
$$;

-- The org of any given profile. Progress policies need to ask "is this
-- educator in my school?", and asking it through a SECURITY DEFINER function
-- keeps the profiles policies from recursing.
create or replace function public.app_org_of(p uuid)
returns uuid language sql stable security definer set search_path = public as $$
  select org_id from public.profiles where id = p
$$;

-- ---------- Auto-create a profile when a new auth user is created -------------

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    'teacher'
  )
  on conflict (id) do nothing;
  return new;
end
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Enable RLS -------------------------------------------------------

alter table public.organizations enable row level security;
alter table public.profiles      enable row level security;
alter table public.licenses      enable row level security;
alter table public.invites       enable row level security;
alter table public.leads         enable row level security;
alter table public.quote_requests enable row level security;
alter table public.rollout_steps enable row level security;
alter table public.prompts       enable row level security;
alter table public.pd_progress   enable row level security;

-- ---------- Policies: profiles ----------------------------------------------

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select using (
  id = auth.uid()
  or app_role() = 'owner'
  or (app_role() = 'school_admin' and org_id = app_org())
  -- Colleagues in the same building can see each other. The prompt library
  -- attributes every prompt to the teacher who wrote it, and "who do I ask
  -- about this one" is the point of a shared library.
  or (app_org() is not null and org_id = app_org())
);

drop policy if exists profiles_insert on public.profiles;
create policy profiles_insert on public.profiles for insert with check (id = auth.uid());

drop policy if exists profiles_update on public.profiles;
create policy profiles_update on public.profiles for update using (
  id = auth.uid() or app_role() = 'owner'
);

-- ---------- Policies: organizations -----------------------------------------

drop policy if exists organizations_select on public.organizations;
create policy organizations_select on public.organizations for select using (
  id = app_org() or app_role() = 'owner'
);

drop policy if exists organizations_update on public.organizations;
create policy organizations_update on public.organizations for update using (
  app_role() = 'owner'
);

-- ---------- Policies: licenses ----------------------------------------------

drop policy if exists licenses_select on public.licenses;
create policy licenses_select on public.licenses for select using (
  user_id = auth.uid() or org_id = app_org() or app_role() = 'owner'
);

-- Licenses are written only by the service role (Stripe webhook / owner tools),
-- which bypasses RLS. No insert/update policies for regular users on purpose.

-- ---------- Policies: invites -----------------------------------------------

drop policy if exists invites_manage on public.invites;
create policy invites_manage on public.invites for all using (
  (app_role() = 'school_admin' and org_id = app_org()) or app_role() = 'owner'
) with check (
  (app_role() = 'school_admin' and org_id = app_org()) or app_role() = 'owner'
);

-- ---------- Policies: leads (owner-only reads; writes via service role) -------

drop policy if exists leads_select on public.leads;
create policy leads_select on public.leads for select using (app_role() = 'owner');

drop policy if exists quote_requests_owner on public.quote_requests;
create policy quote_requests_owner on public.quote_requests for all
  using (app_role() = 'owner') with check (app_role() = 'owner');

-- ---------- Policies: rollout_steps -----------------------------------------

drop policy if exists rollout_select on public.rollout_steps;
create policy rollout_select on public.rollout_steps for select using (
  org_id = app_org() or app_role() = 'owner'
);

drop policy if exists rollout_update on public.rollout_steps;
create policy rollout_update on public.rollout_steps for update using (
  (app_role() = 'school_admin' and org_id = app_org()) or app_role() = 'owner'
);

-- ---------- Policies: prompts ------------------------------------------------
-- A school's library is readable by everyone in that school. An Individual
-- member's library is private to them (org_id null, matched on author).

drop policy if exists prompts_select on public.prompts;
create policy prompts_select on public.prompts for select using (
  (org_id is not null and org_id = app_org())
  or (org_id is null and author_id = auth.uid())
  or app_role() = 'owner'
);

-- You may only add prompts as yourself, into your own school's library
-- (or your personal one when you have no school).
drop policy if exists prompts_insert on public.prompts;
create policy prompts_insert on public.prompts for insert with check (
  author_id = auth.uid()
  and (
    (org_id is not null and org_id = app_org())
    or (org_id is null and app_org() is null)
  )
);

-- Edit and delete: the author, their school admin, or an owner.
drop policy if exists prompts_update on public.prompts;
create policy prompts_update on public.prompts for update using (
  author_id = auth.uid()
  or (app_role() = 'school_admin' and org_id is not null and org_id = app_org())
  or app_role() = 'owner'
);

drop policy if exists prompts_delete on public.prompts;
create policy prompts_delete on public.prompts for delete using (
  author_id = auth.uid()
  or (app_role() = 'school_admin' and org_id is not null and org_id = app_org())
  or app_role() = 'owner'
);

-- ---------- Policies: pd_progress -------------------------------------------
-- Locked product decision: school admins record attendance for their staff,
-- and school-member teachers do NOT self-report. Individual members have no
-- admin, so they self-serve. That exception is enforced HERE, in the database,
-- not only in the UI: the write policies allow a self-record only when the
-- profile belongs to no organization.

drop policy if exists pd_progress_select on public.pd_progress;
create policy pd_progress_select on public.pd_progress for select using (
  profile_id = auth.uid()
  or (app_role() = 'school_admin' and app_org() is not null
      and app_org_of(profile_id) = app_org())
  or app_role() = 'owner'
);

drop policy if exists pd_progress_insert on public.pd_progress;
create policy pd_progress_insert on public.pd_progress for insert with check (
  (app_role() = 'school_admin' and app_org() is not null
   and app_org_of(profile_id) = app_org())
  or (profile_id = auth.uid() and app_org() is null)
  or app_role() = 'owner'
);

drop policy if exists pd_progress_update on public.pd_progress;
create policy pd_progress_update on public.pd_progress for update using (
  (app_role() = 'school_admin' and app_org() is not null
   and app_org_of(profile_id) = app_org())
  or (profile_id = auth.uid() and app_org() is null)
  or app_role() = 'owner'
);

-- Un-recording (an admin correcting a roster) follows the same rule.
drop policy if exists pd_progress_delete on public.pd_progress;
create policy pd_progress_delete on public.pd_progress for delete using (
  (app_role() = 'school_admin' and app_org() is not null
   and app_org_of(profile_id) = app_org())
  or (profile_id = auth.uid() and app_org() is null)
  or app_role() = 'owner'
);

-- =============================================================================
-- After running this file:
--   1. In Supabase Auth settings, set your Site URL and add
--      {SITE_URL}/auth/callback to the redirect allow-list.
--   2. Create the owner accounts by signing up on the site, then run:
--        update public.profiles set role = 'owner' where email in
--          ('adam@yourdomain.com', 'katelyn@yourdomain.com');
-- =============================================================================
