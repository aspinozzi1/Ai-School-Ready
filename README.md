# AI-Ready School

Your school's AI plan, done. A self-serve product that takes a school from
"we have no AI plan" to "trained staff + a board-ready policy + a safe prompt
playbook."

This is a Next.js app (App Router) with Supabase (auth + database + file
storage), Stripe (payments), and Resend (email).

> **Setup guide for non-engineers:** the full, click-by-click deploy
> instructions live in [`docs/SETUP.md`](docs/SETUP.md). Start there.

## Quick start (for developers)

```bash
npm install
cp .env.example .env.local   # then fill in the values (see docs/SETUP.md)
npm run dev                  # http://localhost:3000
```

The **public marketing site runs with no configuration at all** — you only need
env vars once you want auth, payments, and dashboards.

## Scripts

| Command          | What it does                                             |
| ---------------- | -------------------------------------------------------- |
| `npm run dev`    | Run locally at http://localhost:3000                     |
| `npm run build`  | Production build                                         |
| `npm run start`  | Serve the production build                               |
| `npm run lint`   | Lint the code                                            |
| `npm run seed`   | Load sample recipes, resources, checklist, and the owner |

## Project structure

```
app/                     Routes (App Router)
  (public marketing pages), dashboard/, admin-school/, owner/, api/
components/               UI + layout components (shadcn-style)
config/site.ts           SINGLE SOURCE OF TRUTH: names, prices, copy, nav
content/blog/*.mdx       Blog posts (edit these to publish)
lib/                     Supabase clients, auth, Stripe, email, data access
supabase/schema.sql      Database tables + row-level security policies
scripts/seed.ts          Seed script (npm run seed)
docs/SETUP.md            Non-engineer deploy guide
```

## Tech stack

- **Next.js + TypeScript + Tailwind CSS** with shadcn-style UI components
- **Supabase** — auth (magic link + password), Postgres, row-level security, storage
- **Stripe Checkout** — one-time (Teacher Kit) + subscription (School License)
- **Resend** — transactional email
- **MDX** blog — just files in `content/blog/`, no CMS

## Not built yet (clean extension points)

These are intentionally left for later phases — see notes in the code:

- Cohort-Leader reseller / white-label portal (contact-only for now)
- Staff completion / analytics tracking
- A blog CMS (posts are MDX files today)

---

Built for a real K-12 educator. **One hard rule: zero student data, ever.**
