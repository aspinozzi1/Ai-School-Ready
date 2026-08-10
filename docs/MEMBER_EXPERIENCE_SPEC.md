# Member-experience release. Spec locked by the owner, 2026-08-10

Owner directive: this release ships BEFORE launch, built inside the LLC and
attorney waiting period. It makes the pricing page's existing feature claims
("progress tracking and certificates") true, adds the school prompt library,
and completes the invoice/PO payment path. Scope decisions below were made
explicitly by the owner in the 2026-08-10 session; do not relitigate them,
flag conflicts instead.

## The four locked decisions

1. **Certificate**: one capstone, the "AI-Ready Educator Certificate of
   Completion" (name and local-credit disclaimer already in config/site.ts),
   earned by completing all 8 Track A kits. No per-kit certificates.
2. **Completion recording**: school admins record attendance per kit session
   for their staff (dashboard action). NECESSARY EXCEPTION, flagged to the
   owner: Individual members have no admin, so Individual accounts
   self-serve mark-complete. School-member teachers do NOT self-report;
   their admin's record is the source of truth.
3. **Prompt library seeding**: each school's library starts with a
   founder-approved starter set of prompts tagged by subject and grade band,
   drawing on kit lab templates and the free "Ten AI Prompts for Teachers"
   material. The starter set is an owner-gate item before launch.
4. **Invoice/PO sales**: Stripe Invoicing. The owner-admin quote queue gets
   a "create invoice" action that issues a Stripe invoice ($1,499 School
   Membership) to the contact on the quote request. Provisioning fires from
   the invoice-paid webhook. Schools paying by mailed check get their
   invoice marked "paid outside Stripe" in the Stripe dashboard, which
   fires the same webhook. One flow covers card, ACH, and check.

## Feature scope

### Prompt library (school-scoped)
- Each org has one library; Individual members get a personal library.
- Prompt fields: title, body, subject, grade band, task type (communication,
  planning, assessment, other), author profile, created_at.
- Teachers add, browse, filter, and copy prompts. Edit/delete: author and
  school admin.
- The submit flow carries the de-identification nudge (the Kit 1 rule:
  no student names or identifying details; placeholders instead). This is a
  UI fixture, not optional copy. No student PII is the product's core
  promise.
- Starter-set rows are flagged (source = 'starter') so schools can tell
  founder-provided prompts from staff-written ones.

### Progress and certificate
- pd_progress rows: (profile, kit slug, completed_at, recorded_by).
  recorded_by distinguishes admin-recorded from self-recorded and enforces
  decision 2 server-side, not just in UI.
- School dashboard: per-kit attendance recording (checkbox roster per
  released kit), plus school-wide progress view (the pricing page's
  "school-wide progress tracking").
- Member dashboard: personal progress across the 8 kits.
- At 8 of 8: certificate page + downloadable PDF certificate (brand fixtures,
  certificate name and disclaimer from config/site.ts; member name and
  completion date). No credit claims beyond the existing disclaimer.

### Stripe Invoicing
- Quote queue action creates a Stripe customer + invoice (School Membership
  price, net-30 default, days_until_due configurable).
- Webhook adds invoice.paid (or invoice.payment_succeeded) handling that
  reuses provisionFromCheckout's org + admin + license + rollout-seed path.
  Idempotent like the existing handlers.
- Quote request status advances (new -> quoted -> won) from the same queue.
- scripts/setup-stripe.mjs gains the invoice.paid event on the webhook
  endpoint (re-run against the existing endpoint requires delete + re-create
  or a dashboard edit; the script warns about this already).

## Kit copy impact (rides the Batch 3 owner gate)

Kit 2 files reference "a Google Doc, OneNote, whatever your school uses" for
the staff prompt doc (prep guide, script, handout, 30-day plan). Copy shifts
to: your school's prompt library on the member site (or any shared doc).
Source edits + PDF/deck rebuilds + visual verification per KIT_STANDARD.
The rebuilt Kit 2 files join the Batch 3 audit sitting.

## Schema additions (supabase/schema.sql, idempotent like the rest)

- public.prompts (id, org_id nullable for individual-member personal
  prompts, author_id, title, body, subject, grade_band, task_type, source
  'staff'|'starter', created_at). RLS: org members read their org's rows;
  author/admin write; individuals read/write their own.
- public.pd_progress (id, profile_id, kit_slug, completed_at, recorded_by).
  RLS: member reads own; school admin reads/writes org staff rows; member
  writes own ONLY when profile has no org (the Individual exception).
- quote_requests: add stripe_invoice_id, status gains 'invoiced'.

## Test plan (extends docs/TEST_DRIVE.md)

Alongside the existing card-purchase script:
1. Share a prompt from one staff account; pull it from a second.
2. Admin records attendance for Kits 1-8 for one teacher; certificate
   appears; PDF downloads.
3. Individual member self-completes a kit; admin-side recording is absent
   for them by design.
4. Invoice flow: submit /invoice-request, create the invoice from the quote
   queue, pay it with a Stripe test payment method, watch provisioning fire;
   then a second pass marking an invoice paid-outside-Stripe.

## Owner gate items for this release

1. Starter prompt set (content review).
2. Rebuilt Kit 2 files (with Batch 3).
3. Certificate PDF design.
4. The extended sandbox test drive sign-off.
