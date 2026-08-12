# Test drive: running the full site pre-launch (sandbox mode)

Goal: click through the real site — checkout, provisioning, library, invites —
with Stripe in sandbox, before the Batch 3 kit audit and before going live.
No LLC/domain/W-9 needed for this; the deploy is a private preview URL.

## What the owner creates (10–15 minutes, one time)

1. **Supabase** (free): supabase.com → New project (any name/region; note the
   database password). Then from **Project Settings → API**, grab:
   - Project URL
   - `anon` public key
   - `service_role` key
   Optionally also the **connection string** (Settings → Database) — with it,
   Claude can run the schema for you; without it, you paste
   `supabase/schema.sql` then `supabase/seed.sql` into the SQL Editor yourself
   (one paste each, in that order).

2. **Stripe sandbox**: dashboard.stripe.com → create/open a Sandbox →
   **Developers → API keys** → copy the **secret key** (`sk_test_...`).
   That's all — products, prices, and the webhook are created automatically by
   `scripts/setup-stripe.mjs`.

3. **Resend** (optional for this test): resend.com → API key (`re_...`).
   Without a verified domain Resend only delivers to your own signup email,
   which is fine for testing; skip it entirely and invite links appear
   on-screen for copy-paste instead.

4. **Netlify** (to actually see the site): the repo is already connected to
   the `aischoolready` site on the owner's team. Claude needs a personal
   access token (User settings → Applications → New access token) to set the
   production branch to `claude/handoff-docs-review-dnghzx`, set env vars,
   trigger the deploy, and verify. Keep the site's access protection
   (password/SSO) ON until launch — the deploy is a private preview.

## What Claude does with those

1. Runs `supabase/schema.sql` + `seed.sql` (if given the connection string).
2. Runs `scripts/setup-stripe.mjs` → creates both yearly prices + the webhook
   endpoint pointed at the deploy URL, capturing the signing secret.
3. Sets all env vars on Netlify (names per `.env.example`; also set Supabase
   Auth's site_url and redirect allow-list to the deploy URL + /auth/callback)
   and deploys the branch. `netlify.toml` in the repo carries the build config,
   including the secrets-scanner cache exclusion Netlify needs with Turbopack.
4. Smoke-tests every route, then hands over the URL and the test script below.

## The 10-minute test script (owner, in a browser)

Use Stripe's test card: **4242 4242 4242 4242**, any future expiry, any CVC.

1. **Individual purchase**: Pricing → Start your membership → pay with the
   test card → land on /welcome → check email (or sign in) → library open,
   download a kit file.
2. **School purchase**: Pricing → Pay by card → enter a school name → pay →
   sign in → Account → School dashboard → seat count shows 1 of 75.
3. **Invites**: dashboard → paste a second email you control → invite →
   accept from that email (or copy the on-screen link into an incognito
   window) → that account opens the library without paying.
4. **Seat cap**: paste 76 emails (any junk list) → blocked with the seats
   message.
5. **Revocation**: Stripe dashboard → cancel the school's subscription
   (immediately) → school accounts lose library access.
6. **Quote flow**: /invoice-request → submit → appears in /admin quote queue
   (make yourself owner first: run the owner UPDATE at the bottom of
   supabase/seed.sql with your email).
7. **Owner admin**: /admin → stats populated → "View as school" opens the
   demo school.

Note for databases that previously ran the OLD product line's schema: run
`supabase/reconcile-old-product-db.sql` BEFORE schema.sql (see that file's
header), or use a fresh Supabase project and skip it.

## The extended test drive: member-experience features (2026-08-12)

Everything below is live on the deploy (schema run 2026-08-12; Stripe
sandbox is the new LLC account with invoice.paid on the webhook). Do the
10-minute script above first; these steps continue from its accounts.
Reality check before you start: the site is behind SSO, so STRIPE CANNOT
DELIVER WEBHOOKS to it. Any step marked [webhook] needs Claude's replay
(Playbook A in the runbook): do the Stripe action, then tell Claude
"replay the webhook" in a session with the Stripe test key, and continue.
The checkout steps in the 10-minute script are [webhook] steps too.

**A. Prompt library (as a school admin from step 2 or 3):**
1. Header/account → Prompt library → the founder starter set is waiting
   (10 prompts tagged "Starter").
2. Filter by Task = Assessment → 3 starter prompts remain. Search "rubric"
   → 1. Copy button → paste somewhere → full prompt text arrived.
3. Add a prompt: the no-student-information notice is displayed; saving
   requires ticking the confirmation. Save one real prompt you'd use.
4. Sign in as the invited teacher (step 3 account) → Prompt library →
   your prompt is there with your name on it; the teacher can add their
   own but gets no Edit/Delete on YOURS (author/admin only).
5. As the admin: edit the teacher's prompt (admins can) → change sticks.

**B. Progress and the certificate:**
1. /school → "PD progress" roster: educators down the side, kits 1-8
   across. Tick all 8 for yourself → the row shows 8/8 + "Certificate."
2. /certificate → the certificate renders with your name and today's
   date → "Download or print" → save as PDF → one clean landscape page.
3. Set the name that prints (the name form under the certificate) if your
   profile shows an email instead of a name.
4. As the invited TEACHER (school member): /certificate shows progress
   read-only; there are no checkboxes to self-report (that's the locked
   rule: admins record for school staff).
5. As an INDIVIDUAL member (the step-1 account): /certificate DOES allow
   self-ticking. Tick all 8 → certificate appears for them too.
6. Un-tick a kit on the roster → the teacher's certificate reverts to
   progress view (record correction works).

**C. Stripe Invoicing (the purchase-order path) [webhook]:**
1. /invoice-request → submit a fake school (use an email you control).
2. /admin → quote queue → the request shows "new" → click Create invoice
   → confirm. Status flips to "invoiced" and a hosted-invoice link
   appears. Open it: a real Stripe invoice, net 30, $1,499.
3. Pay it with the test card on the hosted page → tell Claude to replay
   the invoice.paid webhook → the school is provisioned exactly like a
   card sale (org, admin welcome email/link, rollout checklist, prompt
   library pre-seeded) and the quote flips to "won."
4. Second pass, the mailed-check story: repeat 1-2 with another fake
   school, then in the Stripe dashboard mark that invoice "paid outside
   Stripe" (Mark as paid → paid outside Stripe) → replay → same
   provisioning. That's card, ACH, and check in one flow, proven.

**D. One security spot-check (worth 60 seconds):**
As the plain teacher account, try to open /admin and /api/download of a
kit file while logged out. Both should refuse. As an Individual member,
the school dashboard should not exist for you.

Findings go to Claude in plain words ("B4 let me self-tick as a school
teacher, that's wrong"). When A-D pass and the Batch 3 gate passes, the
runbook's Phase 3 cutover is everything that remains.

When the test passes, launch = swapping in live Stripe keys, the real domain,
and the placeholders (HANDOFF runbook).
