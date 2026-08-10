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

4. **Vercel** (to actually see the site): vercel.com → Account Settings →
   Tokens → create a token. With it, Claude deploys the branch, sets every
   env var, and hands back a private preview URL. (Alternative: import the
   GitHub repo in the Vercel dashboard yourself and paste the env vars from
   `.env.example`.)

## What Claude does with those

1. Runs `supabase/schema.sql` + `seed.sql` (if given the connection string).
2. Runs `scripts/setup-stripe.mjs` → creates both yearly prices + the webhook
   endpoint pointed at the deploy URL, capturing the signing secret.
3. Sets all env vars on Vercel and deploys the branch.
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

When the test passes, launch = swapping in live Stripe keys, the real domain,
and the placeholders (HANDOFF runbook).
