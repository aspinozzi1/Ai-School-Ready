-- =============================================================================
-- OPTION A ONLY: reconcile a Supabase database that previously ran the OLD
-- (replaced) product line's schema, so the current schema.sql lands cleanly.
--
-- If you created a FRESH Supabase project for the real product (Option B,
-- recommended), DO NOT run this — just run schema.sql then seed.sql.
--
-- Run this BEFORE schema.sql. Destructive ONLY for old-product objects and
-- old-product test rows. Safe to re-run.
-- =============================================================================

-- Old-product tables that the current product does not use.
drop table if exists public.pd_progress cascade;
drop table if exists public.pd_lessons cascade;
drop table if exists public.pd_courses cascade;
drop table if exists public.recipes cascade;
drop table if exists public.resources cascade;

-- Old-product helper functions (current schema defines only app_role/app_org).
drop function if exists public.has_active_access();
drop function if exists public.role_rank(text);

-- organizations: shape differences. `create table if not exists` will NOT fix
-- these, so alter explicitly.
alter table public.organizations add column if not exists stripe_subscription_id text;
alter table public.organizations add column if not exists current_period_end timestamptz;
alter table public.organizations drop column if exists plan;
update public.organizations set seats_limit = 75 where seats_limit is null;
alter table public.organizations alter column seats_limit set default 75;
alter table public.organizations alter column seats_limit set not null;

-- leads: current schema tracks a source.
alter table public.leads add column if not exists source text not null default 'site';

-- licenses: the OLD check constraint allows ('teacher_kit','school_license');
-- the current product uses ('individual','school'). Without this fix, webhook
-- provisioning fails at INSERT with a check violation. Old-product license
-- rows are test data from the replaced line; remove them, then retarget the
-- constraint.
delete from public.licenses where product in ('teacher_kit','school_license');
alter table public.licenses drop constraint if exists licenses_product_check;
alter table public.licenses
  add constraint licenses_product_check check (product in ('individual','school'));

-- invites: current schema requires uniqueness per (org_id, email).
delete from public.invites a using public.invites b
  where a.org_id = b.org_id and a.email = b.email and a.ctid < b.ctid;
create unique index if not exists invites_org_id_email_key
  on public.invites (org_id, email);

-- Old demo organization from the replaced line (schema differences above make
-- its rows harmless, but the demo content itself belongs to the old product).
delete from public.rollout_steps where org_id in
  (select id from public.organizations where name = 'Demo Elementary School');
delete from public.organizations where name = 'Demo Elementary School';

-- The old-product storage bucket ('resources') is unused by the current
-- product (kit files ship inside the deploy). Leaving it is harmless; delete
-- via the dashboard if you want a clean slate.

-- Now run schema.sql, then seed.sql.
