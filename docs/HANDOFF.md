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
  the repo; Phase 2+ (Supabase auth, member library, Stripe, invoice/PO flow,
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

## State of the repo (branch: claude/ai-ready-school-platform-g8zikw)

- `kits/KIT_STANDARD.md` — binding standard for all kits (voice, lengths, pagination,
  founders' note, legal fixtures, build mechanics). Kit 1 + this file are the template.
- `kits/kit01..kit04/` — complete (9 components each, built PDFs + PPTX,
  RESEARCH_LOG.md, PROVENANCE.md). Kits 1-3 founder-approved content; Kit 4 note
  pending owner review. Kits marked "released" in lib/catalog.ts (1-4).
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

Work on branch claude/ai-ready-school-platform-g8zikw only. Push with
`git push -u origin claude/ai-ready-school-platform-g8zikw` (retry with backoff on
network failure). No PRs unless the owner asks.

## Pending work, in order

1. **Batch 2 gate**: owner reviews Kits 2-4 (including Kit 4's AI-drafted founders'
   note). On approval → build Kits 5-8 (Batch 3).
2. **Part II Phase 2**: Supabase auth + member library + 5 free-resource PDFs + tools
   directory (12-15 entries, factual). Then Stripe (card + invoice/PO flow),
   certificates, school dashboard with progress roll-up, owner admin with View-as
   switcher, seed "Spinozzi Demo School."
3. Owner placeholders (above) whenever supplied.
