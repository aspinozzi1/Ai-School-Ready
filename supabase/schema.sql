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
  status text not null default 'new' check (status in ('new','quoted','won','closed')),
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

-- ---------- Helper functions (SECURITY DEFINER to avoid RLS recursion) --------

create or replace function public.app_role()
returns text language sql stable security definer set search_path = public as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.app_org()
returns uuid language sql stable security definer set search_path = public as $$
  select org_id from public.profiles where id = auth.uid()
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

-- ---------- Policies: profiles ----------------------------------------------

drop policy if exists profiles_select on public.profiles;
create policy profiles_select on public.profiles for select using (
  id = auth.uid()
  or app_role() = 'owner'
  or (app_role() = 'school_admin' and org_id = app_org())
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

-- =============================================================================
-- After running this file:
--   1. In Supabase Auth settings, set your Site URL and add
--      {SITE_URL}/auth/callback to the redirect allow-list.
--   2. Create the owner accounts by signing up on the site, then run:
--        update public.profiles set role = 'owner' where email in
--          ('adam@yourdomain.com', 'katelyn@yourdomain.com');
-- =============================================================================
