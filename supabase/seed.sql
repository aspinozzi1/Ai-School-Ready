-- =============================================================================
-- AI-Ready School — Demo school seed
-- Run AFTER schema.sql. Idempotent: safe to re-run.
--
-- Creates "Spinozzi Demo School" with an active license and a seeded rollout
-- checklist so the School Admin dashboard can be experienced fully populated.
-- To see it as a school admin: sign up on the site, then run the UPDATE at
-- the bottom with your email.
--
-- This block is also the manual-provisioning template for PO sales: change
-- the name, run it, then attach the buyer's profile the same way.
-- =============================================================================

-- The demo organization (active license, 75 seats).
insert into public.organizations (name, license_status, seats_limit)
select 'Spinozzi Demo School', 'active', 75
where not exists (
  select 1 from public.organizations where name = 'Spinozzi Demo School'
);

-- Its rollout checklist (mirrors lib/rollout.ts).
with org as (
  select id from public.organizations where name = 'Spinozzi Demo School'
)
insert into public.rollout_steps (org_id, step_key, title, sort_order, is_complete)
select org.id, s.step_key, s.title, s.sort_order, s.is_complete
from org,
  (values
    ('invite_staff',           'Invite your staff (Dashboard → Invite your staff)', 1, true),
    ('schedule_kit1',          'Put Kit 1 on the PD calendar', 2, true),
    ('pick_facilitator',       'Pick your facilitator (any confident colleague; the script does the rest)', 3, false),
    ('run_kit1',               'Run Kit 1: AI Foundations & Safety', 4, false),
    ('start_prompt_doc',       'Start the shared staff prompt doc (Kit 2''s lab creates it)', 5, false),
    ('calendar_series',        'Calendar the remaining Track A kits (one per week or month)', 6, false),
    ('celebrate_certificates', 'Celebrate Track A completion (certificates at Kit 8)', 7, false)
  ) as s(step_key, title, sort_order, is_complete)
on conflict (org_id, step_key) do nothing;

-- A school license row for the demo org (no Stripe ref; provisioned manually).
with org as (
  select id from public.organizations where name = 'Spinozzi Demo School'
)
insert into public.licenses (org_id, product, status, stripe_ref)
select org.id, 'school', 'active', 'manual-demo-school'
from org
where not exists (
  select 1 from public.licenses where stripe_ref = 'manual-demo-school'
);

-- =============================================================================
-- Attach YOUR account to the demo school as its admin (run after signing up
-- on the site with this email; replace the address first):
--
--   update public.profiles
--   set role = 'school_admin',
--       org_id = (select id from public.organizations where name = 'Spinozzi Demo School')
--   where email = 'you@example.com';
--
-- Make yourselves the owners (full admin dashboard at /admin):
--
--   update public.profiles set role = 'owner'
--   where email in ('adam@yourdomain.com', 'katelyn@yourdomain.com');
-- =============================================================================
