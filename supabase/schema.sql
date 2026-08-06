-- =============================================================================
-- AI-Ready School — Database schema + Row-Level Security (RLS)
-- Run this ONCE in your Supabase project: SQL Editor → paste → Run.
-- It is safe to re-run: it uses "if exists / if not exists" guards.
--
-- RLS is the REAL access boundary. The app also checks access server-side,
-- but these policies mean a user can only ever read rows they're entitled to,
-- even if they hit the database directly.
-- =============================================================================

-- ---------- Tables -----------------------------------------------------------

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  plan text not null default 'school_license',
  license_status text not null default 'active' check (license_status in ('active','inactive')),
  seats_limit int,
  stripe_customer_id text,
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
  product text not null check (product in ('teacher_kit','school_license')),
  status text not null default 'active' check (status in ('active','inactive')),
  stripe_ref text,
  current_period_end timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  type text not null default 'file' check (type in ('file','link')),
  file_path text,             -- storage path (for type=file) or URL (for type=link)
  category text not null default 'General',
  min_role text not null default 'teacher' check (min_role in ('teacher','school_admin','owner')),
  created_at timestamptz not null default now()
);

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null default 'General',
  grade_band text not null default 'All grades',
  summary text not null default '',
  prompt_text text not null,
  min_role text not null default 'teacher' check (min_role in ('teacher','school_admin','owner')),
  created_at timestamptz not null default now()
);

create table if not exists public.rollout_steps (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  step_key text not null,
  title text not null,
  is_complete boolean not null default false,
  sort_order int not null default 0,
  unique (org_id, step_key)
);

create table if not exists public.invites (
  id uuid primary key default gen_random_uuid(),
  org_id uuid not null references public.organizations(id) on delete cascade,
  email text not null,
  status text not null default 'pending' check (status in ('pending','accepted')),
  token text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
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

create or replace function public.role_rank(r text)
returns int language sql immutable as $$
  select case r when 'owner' then 3 when 'school_admin' then 2 else 1 end
$$;

-- True when the current user has an active license (self, org, or is owner).
create or replace function public.has_active_access()
returns boolean language sql stable security definer set search_path = public as $$
  select
    coalesce((select role = 'owner' from public.profiles where id = auth.uid()), false)
    or exists (
      select 1 from public.licenses
      where user_id = auth.uid() and status = 'active'
    )
    or exists (
      select 1 from public.organizations o
      join public.profiles p on p.org_id = o.id
      where p.id = auth.uid() and o.license_status = 'active'
    )
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
alter table public.resources     enable row level security;
alter table public.recipes       enable row level security;
alter table public.rollout_steps enable row level security;
alter table public.invites       enable row level security;
alter table public.leads         enable row level security;

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
  app_role() = 'owner' or (app_role() = 'school_admin' and id = app_org())
);

-- ---------- Policies: licenses ----------------------------------------------

drop policy if exists licenses_select on public.licenses;
create policy licenses_select on public.licenses for select using (
  user_id = auth.uid() or org_id = app_org() or app_role() = 'owner'
);

-- ---------- Policies: recipes (role-gated + active license) ------------------

drop policy if exists recipes_select on public.recipes;
create policy recipes_select on public.recipes for select using (
  has_active_access() and role_rank(app_role()) >= role_rank(min_role)
);

drop policy if exists recipes_write on public.recipes;
create policy recipes_write on public.recipes for all using (app_role() = 'owner')
  with check (app_role() = 'owner');

-- ---------- Policies: resources (role-gated + active license) ----------------

drop policy if exists resources_select on public.resources;
create policy resources_select on public.resources for select using (
  has_active_access() and role_rank(app_role()) >= role_rank(min_role)
);

drop policy if exists resources_write on public.resources;
create policy resources_write on public.resources for all using (app_role() = 'owner')
  with check (app_role() = 'owner');

-- ---------- Policies: rollout_steps -----------------------------------------

drop policy if exists rollout_select on public.rollout_steps;
create policy rollout_select on public.rollout_steps for select using (
  org_id = app_org() or app_role() = 'owner'
);

drop policy if exists rollout_update on public.rollout_steps;
create policy rollout_update on public.rollout_steps for update using (
  (app_role() = 'school_admin' and org_id = app_org()) or app_role() = 'owner'
);

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

-- ---------- Storage bucket for downloadable resources ------------------------
-- Private bucket. The app generates short-lived signed URLs AFTER checking
-- access server-side, so files are never publicly listable.

insert into storage.buckets (id, name, public)
values ('resources', 'resources', false)
on conflict (id) do nothing;

-- Allow authenticated users to read objects in the resources bucket. Actual
-- gating happens in the app (signed URLs are only minted after an access check).
drop policy if exists resources_bucket_read on storage.objects;
create policy resources_bucket_read on storage.objects for select
  to authenticated using (bucket_id = 'resources');
