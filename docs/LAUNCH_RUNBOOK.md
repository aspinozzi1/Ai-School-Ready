# LAUNCH RUNBOOK — the pasteable to-do list

This file is the single source of truth for getting from the working sandbox
to a live, paying product. The owner pastes the prompt below into any fresh
Claude session; the session reads this file, finds the first unchecked task
it can act on, and continues. Sessions UPDATE THE STATUS BOARD in this file
(check the box, add the date) and push, so the next session starts current.

## The prompt the owner pastes (copy exactly, fill the brackets)

    Read docs/HANDOFF.md and docs/LAUNCH_RUNBOOK.md on branch
    claude/handoff-docs-review-dnghzx and continue the launch plan.
    Work on this branch only; never push to main.
    Status updates since last session: [what happened, e.g. "LLC approved,
    EIN 12-3456789" / "domain is aireadyschool.com" / "Batch 3 audit passed"
    / "nothing new, continue the build"]
    Credentials for this session: [see "Credentials by task" below for what
    the next task needs]

## Status board (sessions: keep this current)

Phase 1 — parallel, owner is the critical path
- [x] Sandbox infrastructure (Supabase schema+seed, Stripe test products +
      webhook, Netlify deploy behind SSO) — 2026-08-10, verified
- [x] Member-experience spec locked — 2026-08-10, docs/MEMBER_EXPERIENCE_SPEC.md
- [ ] Owner 10-minute sandbox test drive (docs/TEST_DRIVE.md) + webhook
      replay by Claude (SSO blocks Stripe->site delivery; see Playbook A)
- [ ] Batch 3 owner audit: Kits 5-8 + founders' notes (+ rebuilt Kit 2 when
      the build's copy pass lands)
- [ ] OWNER: LLC formed + EIN obtained. NEW JERSEY (owner-corrected
      2026-08-10): file online at njportal.com, $125, approval ~1 business
      day; EIN instant online after; then bank account + Stripe business
      verification (allow 3-5 days filing-to-live-payments total)
- [ ] OWNER: real domain purchased (name: ____________)

Phase 2 — as dependencies unlock
- [ ] BUILD: member-experience release per docs/MEMBER_EXPERIENCE_SPEC.md
      (schema -> prompt library -> progress/certificate -> Stripe Invoicing;
      Kit 2 copy pass + rebuilds routed to the Batch 3 gate). 5-7 sessions
      of work; sub-progress notes go here:
      - [ ] schema additions (prompts, pd_progress, quote_requests columns)
      - [ ] prompt library UI + starter-seed pipeline
      - [ ] progress recording + certificate page/PDF
      - [ ] Stripe Invoicing (quote queue action + invoice.paid webhook)
      - [ ] Kit 2 copy pass + rebuilds (owner gate with Batch 3)
      - [ ] starter prompt set drafted (owner gate item)
- [ ] Owner extended test drive of the new features (spec's test plan)
- [ ] Attorney review of docs/LEGAL_AUDIT.md items (needs LLC; flag the new
      user-generated-content surface for the terms review)
- [ ] Resend: verify real domain, set EMAIL_FROM (needs domain)
- [ ] Supabase Auth -> custom SMTP via Resend (needs the above; built-in
      mailer is rate-limited to a few emails/hour and will fail onboarding)
- [ ] Rotate ALL secrets from the 2026-08 setup sessions (service_role,
      Netlify token, Resend key; DELETE the Supabase personal access token
      outright). Do before live Stripe keys exist.
- [ ] Placeholders: real W-9 (needs EIN), real contact email in
      config/site.ts, About photo, both owners signed up + owner role SQL
      (seed.sql footer)

Phase 3 — launch cutover, strict order, one sitting (SSO stays ON until here)
- [ ] Custom domain on Netlify + SSL
- [ ] NEXT_PUBLIC_SITE_URL + Supabase auth site_url/redirects -> real domain
- [ ] Stripe LIVE: owner completes business verification (do this as soon as
      LLC + bank exist, it can take 2 days); run scripts/setup-stripe.mjs
      with the live key + real domain; swap the four Stripe env vars;
      upgrade Supabase to Pro ($25/mo)
- [ ] SSO OFF -> full public smoke test -> one real-card purchase + refund
      (this is the only place live webhook delivery can be proven)
- [ ] Announce. After launch: Tracks B-D kit batches; ClassLink SAML only on
      district demand.

## Fixed identifiers (safe to keep here; none are secrets)

- Netlify site: aischoolready, site_id 925ffbd9-b9d6-4f2c-9f60-175f88d1b70a,
  https://aischoolready.netlify.app, org account slug aspinozzi1
- Supabase project ref: jgdowlzklejdksgdswhj (org "AI Ready School")
- Stripe test products: metadata airs_slug in {school, individual};
  setup-stripe.mjs finds/creates by that metadata, so re-running is safe
- Launch-plan artifact (visual version of this list):
  https://claude.ai/code/artifact/a68e583e-6adf-45db-8d5d-48216bfe408c
  (republish with the Artifact tool passing url=<that> to update in place)

## Credentials by task (owner supplies per session; NEVER commit these)

| Task | Needs |
| --- | --- |
| Deploys, env vars, SSO toggle | Netlify personal access token |
| Schema/auth-config changes | Supabase Management PAT (delete after use) or dashboard SQL paste |
| Webhook replay, Stripe Invoicing build/test | Stripe secret key (test) |
| Stripe live cutover | Stripe LIVE secret key |
| Email delivery testing | Resend API key |

The secrets used in the 2026-08-10 sessions are considered exposed; after
rotation, old values in prior transcripts are dead. Supply fresh values.

## Operational playbooks (hard-won; read before redoing)

**A. Webhook replay while SSO is on.** Stripe cannot reach the protected
site. To complete a sandbox purchase: run the app locally (`npm start`,
.env.local mirroring the Netlify vars but NEXT_PUBLIC_SITE_URL set to the
DEPLOY URL so emailed links point at the real site), fetch the pending
event from Stripe (`GET /v1/events`), compute the Stripe-Signature yourself
(HMAC-SHA256 of "<ts>.<payload>" with STRIPE_WEBHOOK_SECRET), POST to
localhost:3000/api/webhooks/stripe. Provisioning writes to the shared
Supabase, so the deployed site picks it up.

**B. Netlify gotchas.** (1) Changing the production branch: PATCH the site
with {"repo":{"provider":"github","repo_path":"aspinozzi1/Ai-School-Ready",
"repo_branch":...,"cmd":"npm run build","dir":".next","installation_id":
145923113,"allowed_branches":[...]}} — repo_url or build_settings-only
forms are silently ignored. (2) Secrets scanner: Turbopack writes env
values into .next/cache; netlify.toml's SECRETS_SCAN_OMIT_PATHS
(".next/cache/**,.netlify/**") is the fix, do not delete it. (3) Secret
env vars reject context "all": set per-context values (production,
deploy-preview, branch-deploy).

**C. Supabase management API.** SQL can be run without the dashboard:
POST https://api.supabase.com/v1/projects/<ref>/database/query with a PAT
(use curl; plain urllib gets Cloudflare-blocked). Auth config lives at
/v1/projects/<ref>/config/auth (site_url, uri_allow_list). Redirect
allow-list entries need a trailing * to survive ?next= query strings.

**D. Stripe webhook endpoints.** setup-stripe.mjs matches endpoints by
exact URL and will NOT return a secret for an existing endpoint; to rotate
or re-point, delete the endpoint first, then re-run. When the Stripe
Invoicing build lands, the endpoint needs the invoice.paid event added
(delete + re-create with the script, or edit in the dashboard).

**E. Kit rebuild rules.** Any kit copy change (e.g. Kit 2 prompt-doc pass)
follows kits/KIT_STANDARD.md: edit src/, rebuild PDFs (kits/tooling), deck
via deck.js, visual verification, and an owner gate before "released."

## Standing rules

- All work on claude/handoff-docs-review-dnghzx (or a branch cut from it,
  updating HANDOFF's latest-branch line). Never push to main. No PRs
  unless the owner asks.
- SSO stays ON until the Phase 3 cutover. The site being 401 to anonymous
  visitors (and to Stripe) before launch is intentional.
- Owner gates are hard stops. Do not mark gated items done without the
  owner's explicit pass.
