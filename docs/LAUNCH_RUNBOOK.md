# LAUNCH RUNBOOK — the pasteable to-do list

This file is the single source of truth for getting from the working sandbox
to a live, paying product. The owner pastes the prompt below into any fresh
Claude session; the session reads this file, finds the first unchecked task
it can act on, and continues. Sessions UPDATE THE STATUS BOARD in this file
(check the box, add the date) and push, so the next session starts current.

## The prompt the owner pastes (copy exactly, fill the brackets)

    Read docs/HANDOFF.md and docs/LAUNCH_RUNBOOK.md on branch
    claude/handoff-launch-docs-review-4u0dju and continue the launch plan.
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
- [ ] Batch 3 owner audit: Kits 5-8 + founders' notes + rebuilt Kit 2 (copy
      pass landed 2026-08-11; nothing blocks this sitting). Also on the
      agenda: the starter prompt set (lib/prompts.ts), the certificate
      design (/certificate), and slide 28's title/chip touch in Kit 2's deck
- [x] OWNER: LLC FORMED — 2026-08-11. AI-READY SCHOOL LLC, New Jersey
      single-member (Adam), filed and paperwork in hand; EIN 42-4384815
      obtained same day; NJ-REG tax registration completed (0 employees, no
      sales tax registration for now — accountant to confirm NJ digital-
      product taxability). One follow-up from the EIN letter: it reads
      "AI-READY SCHOOL" without "LLC" — if the bank balks when opening the
      account, a name-correction letter to the IRS fixes it, no new EIN.
      NEXT, IN ORDER: (1) business bank account (bring formation doc + EIN
      letter), (2) Stripe business verification the same day (the ~2-day
      item), (3) real W-9 — UNBLOCKED now that the EIN exists, (4) E&O +
      general liability quote (bind the week the first sale closes; monthly
      billing ~$50-90; ask for earliest retroactive date; expect COI
      requests from school business offices). Owner decisions on record:
      annual subscription model confirmed; 5-year side-business horizon;
      target small private schools AND charters first (charter reference
      matters most for later public-district sales), districts later.
- [ ] OWNER: real domain purchased (name: ____________)

Phase 2 — as dependencies unlock
- [x] BUILD: member-experience release per docs/MEMBER_EXPERIENCE_SPEC.md —
      ALL BUILD WORK DONE 2026-08-11. What remains lives in the owner gates
      (starter prompt set review, rebuilt Kit 2 with Batch 3, certificate
      design sign-off, extended test drive). Sub-progress notes:
      - [x] schema additions (prompts, pd_progress, quote_requests columns)
            2026-08-11. NOT YET RUN against the sandbox: re-run
            supabase/schema.sql in the Supabase SQL editor (idempotent) or
            nothing below works. Do this before the next test drive.
      - [x] prompt library UI + starter-seed pipeline, 2026-08-11 (/prompts)
      - [x] progress recording + certificate page/PDF, 2026-08-11
            (/certificate + roster on /school). The PDF is the browser's
            print-to-PDF against a print stylesheet, verified as a one-page
            landscape sheet; no server-side PDF dependency.
      - [x] Stripe Invoicing (quote queue action + invoice.paid webhook),
            2026-08-11. The sandbox webhook endpoint predates invoice.paid:
            add that event in the Stripe dashboard, or delete the endpoint
            and re-run scripts/setup-stripe.mjs, before testing the PO flow.
      - [x] Kit 2 copy pass + rebuilds, 2026-08-11: prompt-doc references
            across all components + deck now point at the member-site prompt
            library (shared-doc fallback kept in the prep guide); rebuilt and
            visually verified; rides the Batch 3 owner gate
      - [x] starter prompt set drafted 2026-08-11, awaiting owner review.
            Ten prompts lifted from the published free prompt sheet plus
            Kit 2's reusable template; see starterPrompts in lib/prompts.ts.
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

TpT channel (owner decision 2026-08-11: TpT is top-of-funnel; full catalog
stays membership-only)
- [ ] BUILD: Kit 1 "TpT edition" — license line changes from
      within-the-purchasing-school to TpT's single-teacher license; member-site
      references point outward. Edit src, rebuild, visual verify per
      KIT_STANDARD; OWNER GATE rides the Batch 3 sitting
- [ ] OWNER: TpT seller account under the LLC (needs bank account + W-9)
- [ ] Listing copy drafted: 5 free resources + paid Kit 1 (~$24-39); check
      current TpT seller handbook on off-site promotion + AI disclosure
- [ ] PUBLISH: all listings go live the same day as the domain (footers in
      every PDF point at the site; do not send traffic to the SSO wall)
- [ ] BUILD: launch backlog BEFORE the store opens — 5 free listings + 2-3
      micro-products + the Kit 1 TpT edition, so the store opens full and
      the weekly drip starts from a running start. Micro-products are
      derivatives of already-audited kits (prompt card decks, cheat sheets,
      template packs), built in tpt/ with kit tooling + visual verification,
      each with TpT-spec cover images and paste-ready listing copy (keyword
      title, description, price, tags)
- [ ] OWNER + CLAUDE: weekly TpT listing factory (owner request 2026-08-11).
      Cadence after launch: Claude generates one listing package per week
      (product PDF + covers + listing copy, committed to tpt/ for review);
      owner reviews (~15 min, fast gate: derivatives of audited kits) and
      uploads (~10 min; TpT has no seller API, publishing is always manual).
      Start the automation only AFTER the store is live — owner says "turn
      on the weekly TpT factory" and the session schedules a recurring
      weekly Routine (fresh session, this branch, standalone prompt: build
      next package per the pricing ladder in this section). Do not start
      before launch; pre-launch inventory just stacks unreviewed.
      Pricing ladder (owner-endorsed 2026-08-11): free items $0; micros
      $3-6; micro bundles $10-15; Kit 1 full session $19-25; Kits 3-8 NEVER
      on TpT (membership-only; scarcity is the pointer to the site).
      Research note 2026-08-11: TpT has NO dedicated AI-content policy;
      the governing rule is the IP/rights warranty (we clear it: Anthropic
      assigns output rights, citations verified, PROVENANCE.md per kit).
      Listings lead with "built and audited by two certified teachers,"
      never with the AI. Take the paid seller tier (~80% payout) on day one;
      payouts are monthly for the prior month.

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

**E1. Known issue: `npm run lint` is broken on this branch.** ESLint 9 cannot
load the eslint-config-next config it extends ("Converting circular structure
to JSON"). It fails on an untouched checkout, so it is not something a session
introduced. `npm run build` type-checks and is the real gate. Worth fixing
before wiring CI back up, but it blocks nothing today.

**E. Kit rebuild rules.** Any kit copy change (e.g. Kit 2 prompt-doc pass)
follows kits/KIT_STANDARD.md: edit src/, rebuild PDFs (kits/tooling), deck
via deck.js, visual verification, and an owner gate before "released."

## Standing rules

- All work on claude/handoff-launch-docs-review-4u0dju (or a branch cut from
  it, updating HANDOFF's latest-branch line and the pasteable prompt above).
  Never push to main. No PRs unless the owner asks.
  Branch lineage: handoff-launch-docs-review-4u0dju continues
  handoff-docs-review-dnghzx, which continues ai-ready-school-platform-g8zikw.
  A session handed a branch cut from the OLD app line
  (ai-ready-school-build-sph7f5, commit d1d2d3b) has the replaced product and
  none of this work: re-cut from the branch named above before doing anything.
- SSO stays ON until the Phase 3 cutover. The site being 401 to anonymous
  visitors (and to Stripe) before launch is intentional.
- Owner gates are hard stops. Do not mark gated items done without the
  owner's explicit pass.
