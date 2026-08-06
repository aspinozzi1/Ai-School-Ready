# Setup & Deploy Guide (written for a non-engineer)

This guide takes you from zero to a live site. Follow it top to bottom. It uses
free plans throughout. Budget about **30–45 minutes**.

You'll create three free accounts and paste some keys into one file. That's it —
no coding.

- **Supabase** — accounts, database, file storage
- **Stripe** — payments
- **Resend** — sends emails (welcome, invites)

> **Tip:** keep a scratch note open. You'll copy ~8 keys, and it helps to paste
> them somewhere first, then move them into the app all at once.

---

## 0. Before you start

You need [Node.js](https://nodejs.org) version 20 or newer installed (the "LTS"
download). To check, open a terminal in this project folder and run:

```bash
node --version   # should print v20 or higher
npm install      # installs the app's dependencies (run once)
```

Then make your own copy of the settings file:

```bash
cp .env.example .env.local
```

You'll fill in `.env.local` as you go. **Never share this file** — it holds your
secret keys.

---

## 1. Supabase (accounts + database + files)

1. Go to [supabase.com](https://supabase.com) → **Start your project** → sign in.
2. Click **New project**. Pick a name and a strong database password (save it).
   Choose the region closest to your schools. Wait ~2 minutes for it to finish.
3. In the left sidebar, open **Project Settings → API**. You'll see:
   - **Project URL** → paste into `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (click reveal) → paste into `SUPABASE_SERVICE_ROLE_KEY`
     ⚠️ This one is secret — treat it like a password.
4. Now create the database tables. In the sidebar open **SQL Editor → New query**.
   Open the file [`supabase/schema.sql`](../supabase/schema.sql) in this project,
   copy **all** of it, paste it into the editor, and click **Run**. You should see
   "Success." (You can re-run it any time — it's safe.)
5. Turn on email login. Open **Authentication → Providers → Email** and make sure
   **Email** is enabled. (Magic links and passwords both use this.)
6. Tell Supabase your site address. Open **Authentication → URL Configuration**:
   - **Site URL**: `http://localhost:3000` for now (change to your real URL after
     you deploy — see Step 6).
   - Under **Redirect URLs**, add `http://localhost:3000/**` (and later your real
     URL, e.g. `https://your-site.vercel.app/**`).

Also set:
- `OWNER_EMAIL` in `.env.local` → **your** email. The seed script makes this
  account the Owner (full admin).

---

## 2. Resend (email)

1. Go to [resend.com](https://resend.com) → sign up (free).
2. Open **API Keys → Create API Key**. Copy it → paste into `RESEND_API_KEY`.
3. For now you can leave `EMAIL_FROM` as the default (`onboarding@resend.dev`),
   which works for testing. Later, to send from your own domain, add and verify
   your domain under **Domains**, then set `EMAIL_FROM` to something like
   `AI-Ready School <hello@yourdomain.com>`.

---

## 3. Stripe (payments) — TEST mode first

You'll build everything in **test mode** (fake cards, no real money), then flip
to live at the end.

1. Go to [stripe.com](https://stripe.com) → sign up / log in.
2. Make sure the **Test mode** toggle (top right) is **ON**.
3. Create the two products. Open **Product catalog → Add product**:
   - **Teacher Kit** — price **$49**, **One time**. Save. Click the price and copy
     its **Price ID** (starts `price_...`) → paste into `STRIPE_PRICE_TEACHER_KIT`.
   - **School License** — price **$999**, **Recurring → Yearly**. Save. Copy its
     **Price ID** → paste into `STRIPE_PRICE_SCHOOL_LICENSE`.
4. Get your secret key. Open **Developers → API keys**. Copy the **Secret key**
   (starts `sk_test_...`) → paste into `STRIPE_SECRET_KEY`.
5. Set up the webhook (this is how a purchase unlocks access). Two options:

   **A) For local testing** — use the Stripe CLI (easiest):
   ```bash
   # Install: https://stripe.com/docs/stripe-cli  then:
   stripe login
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
   The CLI prints a **webhook signing secret** (starts `whsec_...`). Paste it into
   `STRIPE_WEBHOOK_SECRET`. Keep this command running while you test.

   **B) For production** — see Step 6 below (you'll add a webhook endpoint in the
   Stripe dashboard once you have a live URL).

---

## 4. Load the sample data

With your Supabase and (optionally) email keys in `.env.local`, run:

```bash
npm run seed
```

This loads the 10 sample Cookbook recipes, the download-center files (as
placeholder PDFs you can replace later), and makes your `OWNER_EMAIL` the Owner.

---

## 5. Run it locally

```bash
npm run dev
```

Open **http://localhost:3000**. To try a purchase end to end:
- Make sure `stripe listen` (Step 3.5A) is running in another terminal.
- Go to **/pricing**, click a buy button, and use Stripe's test card
  **4242 4242 4242 4242**, any future date, any CVC, any ZIP.
- Watch the `stripe listen` terminal light up — that's the webhook creating the
  account. Check your email for the set-password link.

Log in as the Owner: go to **/login**, enter your `OWNER_EMAIL`, and use
**"Email me a magic link."** You'll land in the Owner Admin at **/owner**.

---

## 6. Deploy to Vercel

1. Push this project to a GitHub repo (if it isn't already).
2. Go to [vercel.com](https://vercel.com) → **Add New → Project** → import your
   repo. Framework preset: **Next.js** (auto-detected). Click **Deploy** once — it
   will build. (It's fine if a few things don't work yet; env vars come next.)
3. In your Vercel project, open **Settings → Environment Variables** and add
   **every** variable from your `.env.local` — same names, same values — **except**
   set `NEXT_PUBLIC_SITE_URL` to your real Vercel URL
   (e.g. `https://your-site.vercel.app`).
4. Add the **production Stripe webhook**. In Stripe (**Developers → Webhooks →
   Add endpoint**):
   - Endpoint URL: `https://your-site.vercel.app/api/webhooks/stripe`
   - Events to send: `checkout.session.completed`,
     `customer.subscription.updated`, `customer.subscription.deleted`
   - Save, then copy the endpoint's **Signing secret** (`whsec_...`) and update
     `STRIPE_WEBHOOK_SECRET` in Vercel.
5. Update Supabase **Authentication → URL Configuration**: set **Site URL** to your
   Vercel URL and add `https://your-site.vercel.app/**` to **Redirect URLs**.
6. Redeploy (Vercel → **Deployments → ⋯ → Redeploy**) so the new env vars take
   effect. Run `npm run seed` once more if you switched to a fresh database.

Your site is live. 🎉

---

## 7. Going LIVE with real payments

When you're ready to accept real money:

1. In Stripe, switch **Test mode OFF** (top right).
2. Recreate the two products (Teacher Kit, School License) in live mode and copy
   the new **live Price IDs**.
3. **Developers → API keys**: copy the **live** secret key (`sk_live_...`).
4. Add a **live** webhook endpoint (same URL, same 3 events) and copy its live
   signing secret.
5. In Vercel, update these four variables with the **live** values:
   `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_TEACHER_KIT`,
   `STRIPE_PRICE_SCHOOL_LICENSE`. Redeploy.

That's the only change to go live — everything else stays the same.

---

## 8. Editing your content later

- **Prices, product names, headlines, FAQ, nav** → all in one file:
  [`config/site.ts`](../config/site.ts). Change text there and it updates
  everywhere. (If you change a **price number**, also update the matching Stripe
  product so they agree.)
- **Blog posts** → add or edit `.mdx` files in
  [`content/blog/`](../content/blog). Each file's top block (the part between the
  `---` lines) sets the title, date, and category.
- **Cookbook recipes & downloads** → manage them without touching code in the
  **Owner Admin → Resources** page. Upload your real Governance Pack / PD deck /
  handout there to replace the placeholders.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Sign-in does nothing / "not connected" note | Supabase keys missing or wrong in `.env.local` (or Vercel). Double-check Step 1.3. |
| Purchase works but no account/email | The webhook isn't reaching the app. Locally: is `stripe listen` running? In prod: is the webhook endpoint URL + `STRIPE_WEBHOOK_SECRET` correct (Step 6.4)? |
| Magic-link / confirmation link goes to the wrong place | Update Supabase **Redirect URLs** and **Site URL** (Steps 1.6 / 6.5). |
| Downloads say "not configured" | `SUPABASE_SERVICE_ROLE_KEY` is missing, or you haven't run `npm run seed`. |
| Emails never arrive | Check `RESEND_API_KEY`. Until you verify a domain, use `onboarding@resend.dev` as the sender and check spam. |
| "No space" / build errors after editing | Run `npm install` again, then `npm run build`. |

Still stuck? The app is designed to **degrade gracefully** — the public marketing
site always works even if a key is missing, so you can deploy first and wire up
payments/accounts after.
