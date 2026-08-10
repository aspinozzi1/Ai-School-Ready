# Build decisions log

Decisions made with the owner that refine the master brief. Part II must honor these.

## 2026-08-07 — School license scope & seat cap (owner-directed)

**Problem:** nothing stops a district from buying one $1,499 School Membership and
sharing it across every building.

**Decision:** a School Membership covers **one school building** and includes up to
**75 staff seats** (config value `schoolSeatLimit` in `/config/site.ts`, editable).
75 is generous — larger than nearly any single school's certificated staff — so a
legitimate school never feels the cap, but a district cannot stretch one license
across buildings.

**Implementation (Part II):**
- `organizations.seat_limit` (default from config) + enforcement in the invite flow:
  the system refuses invite #76 with a friendly screen — "Your membership covers one
  school of up to 75 staff. Multiple schools or a district? Contact us for district
  pricing." No owner labor involved.
- Seat usage shown on `/school/staff` ("42 of 75 seats used") so admins self-manage.
- Pricing page copy: "All-access for your whole staff — one school building, up to
  75 staff accounts."
- Terms of service: license scope = one school site; district use requires a
  district agreement.
- Quote PDF / invoice description carries the same one-school language so business
  offices see the scope before purchase.
- The "District or multiple schools? Contact us" path on pricing is the upsell for
  multi-building buyers (per master brief A5.4).

**Deliberately NOT doing:** per-seat pricing, IP/domain policing, or any manual
verification; all would add owner labor or purchase friction. The cap + clear
license language + the contact-us path is enough.

## 2026-08-07 — Em dash rule is brand-wide (owner-directed)

Em dashes are the most visible AI tell. The rule set for kits in
`kits/KIT_STANDARD.md` applies to EVERYTHING the brand produces, including all
Part II surfaces: website copy, portal/dashboard text, emails, certificates,
quote PDFs, blog posts, FAQ answers, error and empty-state messages.

- Default punctuation: periods, colons, commas, semicolons, parentheses.
- An em dash is allowed only where the hard break is the point; a page or
  document earns at most one or two.
- Labels, titles, and headings use ":" or "·", never an em dash.
- En dashes in numeric ranges (45–60 min, 2023–24) are fine.
- Where the master brief's locked copy contains em dashes, the builder recasts
  the punctuation while keeping the words (pending owner override).

## 2026-08-07 — Breathing room is brand-wide (owner-directed)

Nothing sits tight against chrome. In kit PDFs: ~0.5in clear space between the navy
band and content at the top of every page (including continuation pages) and ~0.35in
above the footer band; enforced in kits/tooling/brand.css. Part II must carry the same
principle: generous padding between nav/header bars, page content, and footers on every
website and portal page, email, certificate, and quote PDF. When content and whitespace
compete, whitespace wins; add a page instead of compressing.

## 2026-08-10 — Decks must be self-standing (owner-directed)

**Problem:** the decks leaned on the script for meaning. A presenter who isn't
great, or an audience member reviewing the file, could be left in the dark.

**Decision:** every deck must direct the PD on its own. Full tests recorded in
`kits/KIT_STANDARD.md` ("Self-standing decks"): complete claims on teaching
slides, on-slide context for every number, on-slide answers for practice slides,
visible steps/timing for labs, and speaker notes that open with the content to
deliver rather than stage directions only.

**Audit outcome (Kits 1–5):** Kits 3–5 already met the bar. Kit 1 slide 19 and
Kit 2 slide 13 had audience-practice answers only in the notes; both gained
on-slide answer strips. Five stage-direction-only notes across Kits 1–4 were
rewritten to lead with "Say:" delivery content. All decks rebuilt and
re-inspected.
