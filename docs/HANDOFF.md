# HANDOFF — resume AI-Ready School work in a fresh session

Read this file first. It carries everything a new session needs to continue exactly
where the last one stopped. The owner (Adam Spinozzi, with Katelyn Spinozzi) starts a
new conversation and says: "Read docs/HANDOFF.md and continue."

## The business

AI-Ready School: a husband-and-wife company (Adam: certified carpentry/CTE teacher;
Katelyn: certified K-8 teacher) selling self-run AI professional development to schools.
Two products in one repo:

- **Part I** — 20 PD kits (Track A: 8 core "AI Foundations" sessions; Tracks B-D in
  production). Each kit = exactly 9 components (prep guide, 25-40 slide deck with
  notes, word-for-word script, handout, first-48-hours sheet, 30-day plan, exit
  ticket, admin one-pager, references). Built in batches with hard owner audit gates:
  Kit 1 (approved) → Kits 2-4 (built, awaiting Batch 2 gate) → 5-8 → 9-14 → 15-17 → 18-20.
- **Part II** — Next.js membership platform. $1,499/yr School Membership (one
  building, 75 staff-account cap), $99/yr Individual. Phase 1 (public site) is live in
  the repo, including the free-resource library (5 real PDFs on /resources, built
  2026-08-08). Phase 2+ (Supabase auth, member library, Stripe, invoice/PO flow,
  certificates, school dashboard, admin) not started.

## Non-negotiables (never violate)

1. No fabricated research. Every citation verified against the live source (WebSearch
   only; direct fetches are EGRESS_BLOCKED). Per-kit RESEARCH_LOG.md maps claims to
   sources.
2. No student PII anywhere. Invented names only inside "unsafe prompt" demonstrations.
3. Legal precision: not-legal-advice notices, "Certificate of Completion" only (+
   local-credit disclaimer), tools referenced factually, honest refund policy.
4. Brand lock: navy #13293D, teal #2A9D8F, amber #F4A825, paper #F7F5F0, ink #1B1F24,
   mist #DCE3EA, muted #5B6B7A, success #2E7D5B, error #B4453A. Inter only.
5. Visual verification: never ship a PDF/deck/page without rendering and inspecting it.
6. Owner audit gates: STOP at each gate and wait for explicit approval.

## Owner directives on record (see docs/DECISIONS.md and kits/KIT_STANDARD.md)

- Em dashes: near-total removal brand-wide; a few earned keeps only.
- No sentence/paragraph splits across page breaks; generous spacing between content
  and headers/footers (brand-wide, including website).
- 75-seat / one-building school license cap (anti-district-sharing).
- Names: "Adam" and "Katelyn" (never Kate; no last names in read-alouds); Adam is "a
  carpentry teacher."
- **Founders' note (2026-08-08, supersedes the old inline-slot system):** every
  facilitator script opens with ONE "From the founders" passage after "How to use this
  script." Why-only: (1) why the kit matters for classroom success, (2) the lessons
  the founders believe it teaches. No stories, no examples, in the note or sprinkled
  in the script body. Optional for the presenter to share. Wrapped in
  break-inside:avoid. Same setup across all kits. Kit 4's note is AI-drafted and
  awaits owner review at the Batch 2 gate.
- Website design: the owner prefers the ORIGINAL look (light centered heroes, sticky
  blur header, icon-tile cards, light 5-column footer) — restored 2026-08-08 from old
  branch origin/claude/ai-ready-school-build-sph7f5. Don't reintroduce heavy navy heroes.
- About page carries the owners' "Our why" manifesto (disrupters; built with AI and
  proud of it; ethics/integrity/morals as the framework directing AI; teach teachers
  to teach students). A pull quote sits on the home founders card.

## State of the repo (latest work: branch claude/handoff-docs-review-dnghzx)

Branch lineage: `claude/handoff-docs-review-dnghzx` continues (is a superset of)
`claude/ai-ready-school-platform-g8zikw`. The old app-line branch
`claude/ai-ready-school-build-sph7f5` and its PR #1 belong to the replaced product;
don't merge them. New sessions should start from the latest branch above.

- `kits/KIT_STANDARD.md` — binding standard for all kits (voice, lengths, pagination,
  founders' note, legal fixtures, build mechanics). Kit 1 + this file are the template.
- `kits/kit01..kit08/` — ALL EIGHT COMPLETE (9 components each, built PDFs + PPTX,
  RESEARCH_LOG.md, PROVENANCE.md, visually verified). All marked "released" in
  lib/catalog.ts; Track A + certificate promise are real. Kits 1-4 founder-audited;
  Kits 5-8 (incl. their AI-drafted founders' notes) await the Batch 3 owner gate.
- `kits/free-resources/` — the 5 free lead-magnet PDFs (src/ HTML + built PDFs,
  same tooling as kits), copied to `public/free/` and served on /resources with
  working download buttons. Visually verified 2026-08-08.
- `kits/tooling/` — build_pdf.js (Chromium at /opt/pw-browsers/chromium), brand.css,
  build_kit.sh, merge_covers.py (NOTE: merging consumes the .cover.pdf; rebuild covers
  if you rebuild a script PDF standalone), render_check.py (usage: out_dir first, then
  PDFs), HUMANIZATION_CHECKLIST.md.
- Website: Next.js 16 App Router + Tailwind v4. globals.css has dual tokens (shadcn
  HSL + named brand aliases). Components: components/ui (button/badge/card),
  components/marketing (Section/PageHero/CtaBand), components/brand/logo.tsx,
  components/site (header/footer/mobile-nav). 16 public pages + MDX blog (7 posts).
  `npm run build` must pass before shipping.
- `config/site.ts` — pricing, seat cap, nav, founders, legal strings. PLACEHOLDERS the
  owner must supply: real contact email/domain (currently hello@aireadyschool.com),
  real W-9 (public/vendor/w9-placeholder.pdf), About page photo.

## Build commands

- Kit: `bash kits/tooling/build_kit.sh kits/kitXX` then `cd kits/kitXX/src && node deck.js`
- Deck QA: libreoffice-impress converts pptx→pdf (convert from ~/lo, not scratchpad),
  then render_check.py → Read the PNGs.
- Site: `npm run build`; screenshots via Playwright with
  executablePath '/opt/pw-browsers/chromium' (NODE_PATH=<repo>/node_modules).

## Git rules

Each session works on its own designated branch, cut from the latest-work branch
named at the top of "State of the repo" (update that line every session). Push with
`git push -u origin <branch>` (retry with backoff on network failure). No PRs unless
the owner asks.

## LAUNCH DIRECTIVE (owner, 2026-08-10)

The owner is launching the business at **8 completed kits** with a **fully
functional backend**: kits delivered on purchase, plus all purchase-attached
content. Work sequence to launch (execute in order, continue across sessions):
1. Kits 6, 7, 8 (Track A complete; certificate promise becomes real).
2. Backend phase 1: Supabase schema + auth + gated member library serving all
   released kit files; staff invites with the 75-seat cap (DECISIONS.md).
3. Backend phase 2: Stripe checkout (School $1,499/yr, Individual $99/yr) +
   webhook provisioning + invoice/PO quote flow.
4. Backend phase 3: school dashboard, owner admin with View-as, demo school.
5. Batch 3 owner audit gate (Kits 5-8) + owner supplies env keys (Supabase,
   Stripe, Resend) + final launch checklist.
The old app-line branch (d1d2f... see `claude/ai-ready-school-build-sph7f5`,
commit d1d2d3b) contains a working reference implementation of auth, Stripe
webhook provisioning, and dashboards; adapt patterns, don't merge it.

## Backend (built 2026-08-10; graceful degradation without env keys)

All three phases of the launch directive's backend are implemented and building:

- **Data**: `supabase/schema.sql` (orgs w/ 75-seat default, profiles + auto-create
  trigger, licenses, invites, quote_requests, leads, rollout_steps; RLS everywhere;
  helper fns app_role/app_org). `supabase/seed.sql` = Spinozzi Demo School +
  owner-role snippets; doubles as the manual-provisioning template for PO sales.
- **Auth**: lib/env.ts (config booleans), lib/supabase/{server,client,admin}.ts,
  middleware.ts session refresh, lib/auth.ts (getSessionUser/requireAccess =
  server-side source of truth). Real /login (password + magic link, honors ?next=),
  /signup, /auth/callback, /auth/signout, /account. Header is session-aware.
- **Member library**: /library + /library/[slug] list released kits from
  lib/catalog.ts; lib/kit-files.ts is the file manifest; /api/download/[slug]/[file]
  streams in-repo kit files after requireAccess (manifest allowlist only;
  next.config.ts traces kit deliverables into the route, excludes src/tooling).
- **Payments**: /api/checkout (both memberships = yearly subscriptions; school
  checkout collects school name), /api/webhooks/stripe (signature-verified,
  idempotent provisionFromCheckout, syncSubscription revokes/restores on
  cancel/lapse). lib/provisioning.ts creates org + school_admin + license + rollout
  seed + welcome email w/ magic link. /welcome success page. Pricing page has live
  checkout buttons that degrade to friendly copy without keys.
- **Invoice/PO**: /invoice-request has a real form → quote_requests + owner email
  (lib/actions/quotes.ts), mailto fallback.
- **School dashboard** (/school): rollout checklist (toggle via
  lib/actions/rollout.ts), staff invites w/ 75-seat cap enforced at send AND accept
  (lib/actions/staff.ts; manual-link fallback when Resend absent), member/invite
  lists. Shared component components/school/dashboard.tsx.
- **Owner admin** (/admin): stats, school list w/ "View as school"
  (/admin/schools/[id] reuses the dashboard read-only), quote-request queue, lead
  count. Owner role comes from SQL (see seed.sql footer).

## Launch runbook (owner supplies keys; then this order)

1. Supabase project → run schema.sql, then seed.sql. Auth settings: set Site URL,
   allow {site}/auth/callback. Env: NEXT_PUBLIC_SUPABASE_URL,
   NEXT_PUBLIC_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY.
2. Stripe → two yearly Prices (School $1,499, Individual $99). Env:
   STRIPE_SECRET_KEY, STRIPE_PRICE_SCHOOL, STRIPE_PRICE_INDIVIDUAL. Webhook
   endpoint {site}/api/webhooks/stripe (checkout.session.completed,
   customer.subscription.updated/deleted) → STRIPE_WEBHOOK_SECRET.
3. Resend → RESEND_API_KEY, EMAIL_FROM (verified domain), OWNER_EMAIL.
4. NEXT_PUBLIC_SITE_URL = real domain. Sign up both owners → run the owner-role
   UPDATE in seed.sql.
5. Test: buy Individual with a Stripe test card → welcome email → library opens;
   buy School → dashboard → invite a staff email → accept → library opens;
   cancel the sub in Stripe → access flips off.

## Pending work, in order

1. **Batch 2 gate: PASSED 2026-08-08** (Kits 2-4; Kit 4 corrections now KIT_STANDARD
   rules). **Batch 3 gate: OPEN** — owner audits Kits 5-8 incl. four AI-drafted
   founders' notes. All kit files are pushed; nothing else blocks it.
2. **Legal-exposure audit: DONE 2026-08-10** — see docs/LEGAL_AUDIT.md for what was
   checked/fixed (incl. clipped legal footers on Kits 3-5 one-pagers, now rebuilt) and
   the six attorney items (entity formation first).
3. Owner placeholders whenever supplied: real domain + contact email in
   config/site.ts, real W-9 (public/vendor/w9-placeholder.pdf), About photo, env
   keys per the runbook above.
