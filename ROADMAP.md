# AI-Ready School — Roadmap

Living plan for the product. Founders: **Adam Spinozzi** (8-yr HS Woodshop/CTE,
grades 10-12) and **Katelyn Spinozzi** (10-yr preschool). Our edge: together we
span the entire K-12 arc, from a child's first classroom to career-ready teens.

Positioning: **AI safety/policy is the wedge (Tier 1); classroom impact and
student opportunity are where it scales.**

---

## ✅ Shipped in this pass (launch content + Prompt Packs)
- **Prompt Packs** — Cookbook organized by **subject & grade**: new `subject`
  field on recipes, grouped/filterable browser, and the Owner "Add recipe" form
  updated to match. (Run the DB migration in `supabase/schema.sql`.)
- **Real content library** — a privacy-safe Cookbook across subjects/grades
  (incl. CTE and Early Childhood), plus **real starter governance documents**:
  AI Acceptable-Use Policy, FERPA one-pager, Family Letter, Staff AI Agreement,
  Teacher Quick-Start, Facilitator PD outline, Rollout Playbook.
- **About page** — real founder bios and story (Adam + Katelyn).
- **Blog** — 5 posts with **individual bylines** (Adam → CTE/older; Katelyn →
  early childhood) and author-bio cards.

## 🚀 Launch checklist (before sharing widely)
- [ ] Run the `subject` migration + re-seed (or add content via Owner Admin).
- [ ] Upload any final PDFs to Downloads (Owner → Manage resources).
- [ ] Final copy pass: Home, How It Works, Pricing, FAQ.
- [ ] Confirm at least one working download + a few prompts on every screen.
- [ ] (When selling) connect Stripe; (for email) connect Resend; custom domain.

---

## 🧩 Content pillars (PD tracks beyond safety)
- [ ] **AI in the classroom, by subject/department** — ELA, Math, Science, Social
      Studies, World Languages, Arts, PE/Health, **CTE/Woodshop (Adam)**,
      **Early Childhood (Katelyn)**, SPED.
- [ ] **AI for accessibility & equity** — IEP/504 support, multilingual learners,
      UDL, differentiation, assistive tech.
- [ ] **Student opportunity & AI literacy** — responsible student use, career/
      future-readiness, age-appropriate by grade band.
- [ ] **Grade-band tracks** — Early Childhood → Elementary → Middle → High.
- [ ] **Role-based tracks** — teachers, admins/leaders, counselors, coaches,
      paras, IT.
- [ ] **Teacher productivity** (privacy-safe) — feedback, planning, comms.
- [ ] **Family/community engagement** — "AI night for parents," newsletters.

## 💰 Ways it scales / monetizes
- [ ] Live & virtual PD sessions/workshops (bookable).
- [ ] On-demand video PD library (self-paced modules).
- [ ] Cohort courses + "AI-Ready Educator" certificate/badges.
- [ ] Monthly content drops (new subject packs = recurring value).
- [ ] District/enterprise licensing (multi-school, seats).
- [ ] Cohort-Leader / reseller / affiliate program.
- [ ] Keynote / conference booking page.

## 🛠️ Admin-editable everything (mini-CMS) — NEXT BUILD
> These share one underlying pattern (DB-backed content + an admin form), so
> build them together.
- [ ] **About page editor** — edit the founders' story/bios/mission from Owner
      admin, no code. (Requested.)
- [ ] **Blog editor** — write/edit/delete posts in-admin (move posts to DB).
- [ ] **Marketing copy editor** — make Home / How It Works / Pricing editable.
- [ ] **Course/module builder** — assemble tracks from lessons.
- [ ] **Staff progress + completion certificates** — who finished which PD.
- [ ] **Prompt packs/collections** — (started) keep extending grouping as it grows.

---

## 🎓 Credentialing — Act 48 & beyond (passive, self-paced)
Design principle: **100% self-paced and automated — no live/in-person delivery.**

- **Format is fine, structure is the requirement.** Online/asynchronous PD can
  qualify; a bare script/PDF cannot. To count, wrap content as a course with:
  learning objectives → an application task → an **auto-graded quiz or
  auto-accepted artifact** → an **auto-issued certificate** → **auto-logged hours**.
- **Passive for the founders:** the platform verifies completion and issues
  certificates automatically. One-time build + one-time provider approval, then
  hands-off.

To do:
- [ ] **Decide the path:** partner with an **Intermediate Unit** (fastest to
      "Act 48-eligible"); explore **PDE-approved provider** status; and/or a
      **university grad-credit** partnership.
- [ ] **Confirm with PDE + local IUs**: current requirements, how self-paced vs.
      self-directed hours are classified, and any caps. (Verify — rules change.)
- [ ] **Build the credentialing engine:** module completion → auto-certificate
      (provider #, hours, date) → hour roster export for PERMS.
- [ ] **Design it state-agnostic** so it extends to CEUs/clock hours/university
      credit for national growth.
- [ ] Add an **"Act 48 / PD credit"** value prop to Pricing + How It Works once
      approved.

---

## 🔧 Backlog / infra
- [ ] Real Stripe payments (Pricing → charge → auto-provision). Test with a
      100%-off promo code before going live.
- [ ] Custom domain + Resend transactional email.
- [ ] Optional: a second **test "teacher"** account to preview the teacher view.
