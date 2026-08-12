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
      agenda: the starter prompt set (lib/prompts.ts) and the certificate
      design (/certificate). Kit 2's slide-28 title/chip touch is FIXED
      (2026-08-12), so it is off this agenda.
      Revised Kits 5-8 PDFs were delivered 2026-08-12 (Kit 5 as v2, after
      the owner caught the slide-23 chip overlap and the slides 19/20 lane
      contradiction). Kit 6's founders' note was reworded during its
      revision and needs an explicit read.
- [x] UNIVERSAL LAB-EXEMPLAR RETROFIT — COMPLETE 2026-08-12, all ten
      editions. Owner directive from the Kit 5 audit: Ms. Rivera follows one
      artifact through every lab step, shown large as primary slide content
      so a lost participant can copy her structure. Kits 5-8 were done at
      the Batch 3 gate; Kits 1-4 plus the Kit 1 and Kit 2 TpT editions
      landed in this pass, each verified independently (banned-term and
      em-dash greps, PDF text layers, rendered lab slides, TpT strings
      confirmed preserved) and committed per kit. Artifact per kit is
      recorded in kits/KIT_STANDARD.md. New kits build to this model from
      the start.
      OWNER GATE: Kits 1-4 lab slides are new presentation and have not
      been through an owner read. Their content is Batch-2-approved and
      unchanged; only the lab exemplar presentation moved.
- [x] OWNER: LLC FORMED — 2026-08-11. AI-READY SCHOOL LLC, New Jersey
      single-member (Adam), filed and paperwork in hand; EIN 42-4384815
      obtained same day; NJ-REG tax registration completed (0 employees, no
      sales tax registration for now — accountant to confirm NJ digital-
      product taxability). One follow-up from the EIN letter: it reads
      "AI-READY SCHOOL" without "LLC" — if the bank balks when opening the
      account, a name-correction letter to the IRS fixes it, no new EIN.
      NEXT, IN ORDER: (1) business bank account — DONE 2026-08-12, Relay
      (Thread Bank, Member FDIC), industry "Subscription and Membership
      Platforms", purpose "E-Commerce Sales"; set up Operating + Tax
      sub-accounts with a 30%-of-deposits auto-transfer rule, (2) Stripe
      business verification — NEXT, needs the Relay account + routing
      numbers (the ~2-day item that gates live payments), (3) real W-9 —
      UNBLOCKED now that the EIN exists, (4) E&O +
      general liability quote (bind the week the first sale closes; monthly
      billing ~$50-90; ask for earliest retroactive date; expect COI
      requests from school business offices). Owner decisions on record:
      annual subscription model confirmed; 5-year side-business horizon;
      target small private schools AND charters first (charter reference
      matters most for later public-district sales), districts later.
- [x] OWNER: real domain purchased 2026-08-12 — **ai-readyschool.com**
      (hyphenated; aireadyschool.com is TAKEN by an ACTIVE India-based
      ed-tech company operating as "AI Ready School" — K-12 AI platform,
      10,000+ claimed users, verified by fetch 2026-08-12). Consequences,
      all recorded in LEGAL_AUDIT: (1) trademark clearance is now URGENT —
      same name, same sector, they hold the exact-match .com; attorney
      knockout search before real marketing spend; (2) type-in and search
      leakage is real — people who HEAR the name will reach their site, so
      always print/say the hyphen and consider grabbing aireadyschool.org
      /.net defensively if free; (3) config/site.ts now carries the real
      domain; kit PDFs print it with a no-wrap guard so the hyphen never
      breaks across lines.

Phase 2 — as dependencies unlock
- [x] BUILD: member-experience release per docs/MEMBER_EXPERIENCE_SPEC.md —
      ALL BUILD WORK DONE 2026-08-11. What remains lives in the owner gates
      (starter prompt set review, rebuilt Kit 2 with Batch 3, certificate
      design sign-off, extended test drive). Sub-progress notes:
      - [x] schema additions (prompts, pd_progress, quote_requests columns)
            2026-08-11. RUN against the sandbox 2026-08-12 and verified:
            prompts + pd_progress tables exist with 4 RLS policies each,
            app_org_of() present, quote_requests.stripe_invoice_id present
            with the 5-value status constraint, profiles_select now allows
            same-building colleague visibility. The owner's Supabase PAT
            was used once and should be DELETED (runbook rule).
      - [x] prompt library UI + starter-seed pipeline, 2026-08-11 (/prompts)
      - [x] progress recording + certificate page/PDF, 2026-08-11
            (/certificate + roster on /school). The PDF is the browser's
            print-to-PDF against a print stylesheet, verified as a one-page
            landscape sheet; no server-side PDF dependency.
      - [x] Stripe Invoicing (quote queue action + invoice.paid webhook),
            2026-08-11. Sandbox webhook now CARRIES invoice.paid — done
            2026-08-12 by running setup-stripe.mjs against the new
            LLC sandbox account; Netlify's four Stripe env vars were
            repointed to it and the site redeployed.
      - [x] Kit 2 copy pass + rebuilds, 2026-08-11: prompt-doc references
            across all components + deck now point at the member-site prompt
            library (shared-doc fallback kept in the prep guide); rebuilt and
            visually verified; rides the Batch 3 owner gate
      - [x] starter prompt set drafted 2026-08-11, awaiting owner review.
            Ten prompts lifted from the published free prompt sheet plus
            Kit 2's reusable template; see starterPrompts in lib/prompts.ts.
- [ ] Owner extended test drive of the new features (spec's test plan)
- [ ] Attorney review of docs/LEGAL_AUDIT.md items (needs LLC; flag the new
      user-generated-content surface for the terms review). Name-collision
      question: see docs/NAME_CONTINGENCY.md — evidence log, quarterly
      USPTO watch protocol, bootstrap ladder (sale 1 insurance, sale 2 TM
      filing, sale 3 attorney hour), and the full if-a-letter-arrives
      playbook. Owner decision on record: proceeding under the name.
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
- [x] BUILD: Kit 1 "TpT edition" — DONE 2026-08-12 (kits/kit01-tpt/): TpT
      single-user license line w/ school-licensing pointer, certificate
      claims routed through membership (one-pager, script slide 29, deck
      slide + notes), References promise reworded for TpT re-downloads,
      domain printed with no-wrap guard. All 9 components rebuilt, changed
      pages + deck slide visually verified; a clipped one-pager legal block
      was caught and fixed in the pass. OWNER GATE: rides Batch 3.
      FLAG for Batch 3: Kit 1 member edition's 30-day plan still says
      "staff prompt doc" (predates the prompt library; Kit 2's pass didn't
      touch Kit 1) — owner decides if it gets the same library rewording.
- [x] De-ID Drills re-tiered to FREE — DONE 2026-08-12 per the owner's
      Swipe Test ruling (gate 0 below): tpt/LISTINGS.md moves it to free
      listing #6, packet license line updated for a free download and
      visually re-verified. The paid-micro slots now need artifact-first
      products (Parent Message Makeovers templates, sub-plan builder,
      rubric pack are the queued candidates).
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

QUALITY STANDARD — binding for ALL sold content (owner directive
2026-08-11: "mediocre content is a low bar"; outthink the major AI-school
players; novel but search-relevant; owner audits, edits, and feeds topics
from classroom experience):
  Six gates, every product, before it ships:
  0. SWIPE TEST (owner ruling 2026-08-12, from the De-ID Drills review):
     PAID products must contain tangible, usable classroom/planning
     documentation — templates the teacher fills and sends, plans they
     run, rubrics they grade with, materials that reach students or
     families. Training information, skill drills, and infographics are
     FREE-tier funnel content no matter how good; "helpful information is
     not a credit card swipe." The scripted PD kits pass (a runnable
     session with handouts IS the artifact); read-only products do not.
  1. MONDAY MORNING TEST — usable within 48 hours, ends in an artifact the
     teacher keeps (built rubric, finished letter, filled template), zero
     new signups required. Fails -> doesn't ship.
  2. NOVELTY GATE — search TpT for the target keyword BEFORE building; if
     the top results already do it, ship only with an angle visible in the
     listing's first two lines, or don't ship.
  3. EVERGREEN GATE — no UI screenshots, no tool-version dependencies;
     write to capabilities so content survives model churn.
  4. KIT-GRADE PRODUCTION — brand fixtures, visual verification, verified
     citations for factual claims, even on a $4 item.
  5. OWNER GATE — nothing uploads without owner audit; owner topic
     suggestions from the classroom jump the build queue.
  Content wedges (where the field is thin; build here, not in the
  commodity layer of prompt lists / tool tutorials / explainer decks):
  judgment-over-buttons (when NOT to use AI, verification habits);
  failure-first products (spot-the-error, "confidently wrong AI" drills);
  privacy DRILLS not lectures (One Hard Rule de-identification makeovers);
  the skeptic market (value for teachers who don't like AI); artifacts
  over information, always.

Phase 3 — launch cutover, strict order, one sitting (SSO stays ON until here)
- [x] Custom domain on Netlify + SSL — ai-readyschool.com attached and
      serving over HTTPS (2026-08-12); production branch now deploys the
      current work branch
- [ ] NEXT_PUBLIC_SITE_URL + Supabase auth site_url/redirects -> real domain
- [ ] Stripe LIVE: owner completes business verification (do this as soon as
      LLC + bank exist, it can take 2 days); run scripts/setup-stripe.mjs
      with the live key + real domain; swap the four Stripe env vars;
      upgrade Supabase to Pro ($25/mo)
- [ ] SSO OFF -> full public smoke test -> one real-card purchase + refund
      (this is the only place live webhook delivery can be proven)
- [ ] Announce. After launch: Tracks B-D kit batches; ClassLink SAML only on
      district demand.
- [ ] BUILD (owner request 2026-08-12): NJ principal outreach list — every
      private and charter school in New Jersey with principal/head name and
      best-available email, organized county by county (the owner works the
      list county-by-county starting at launch; goal 3 paying schools by
      Thanksgiving). Sources: NJDOE public school directory data (nonpublic
      + charter listings) as the spine, school websites for direct emails
      where the directory carries only office addresses. Deliverable: one
      spreadsheet, one tab per county — columns: school, type
      (private/charter), grades, principal/head name, email, phone, city.
      Ground rules: professional school contacts only; outreach emails carry
      truthful sender info and an opt-out line (CAN-SPAM); the sales motion
      is personalized one-by-one sends, never a blast.

## Fixed identifiers (safe to keep here; none are secrets)

- Netlify site: aischoolready, site_id 925ffbd9-b9d6-4f2c-9f60-175f88d1b70a,
  https://aischoolready.netlify.app, org account slug aspinozzi1.
  2026-08-12: custom domain ai-readyschool.com is ATTACHED with SSL (so the
  Phase 3 domain step is already half done); production branch repointed
  from claude/handoff-docs-review-dnghzx to
  claude/handoff-launch-docs-review-4u0dju and rebuilt — the deploy now
  carries the member-experience release and the new hero. Site still
  returns 401 to anonymous visitors (SSO on, as intended until cutover),
  so the deployed pages cannot be eyeballed until SSO comes off; the same
  commit was verified locally before pushing.
- Supabase project ref: jgdowlzklejdksgdswhj (org "AI Ready School")
- Stripe test products: metadata airs_slug in {school, individual};
  setup-stripe.mjs finds/creates by that metadata, so re-running is safe
- Stripe accounts (2026-08-12, after the LLC): the owner created a new
  Stripe account under the LLC. Its dashboard account is
  acct_1U3ajVCnL1ioLwAg; the TEST key belongs to its linked SANDBOX
  account acct_1U3ajvEOTcytyvlm ("AI-Ready School sandbox"). Sandbox
  objects do NOT carry over to live — at cutover, re-run setup-stripe.mjs
  with the LIVE key of the real account and swap the four env vars again.
  Sandbox now holds: School price price_1U3aurEOTcytyvlmDSEB169K
  ($1,499/yr), Individual price price_1U3aurEOTcytyvlmcfzgEFFU ($99/yr),
  and a webhook endpoint at https://ai-readyschool.com/api/webhooks/stripe
  carrying all four events INCLUDING invoice.paid. The August 10 sandbox
  is superseded; its objects are dead weight.
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
