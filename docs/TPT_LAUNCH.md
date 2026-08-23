# TpT launch sequence — AI-Ready School

Owner decision, 2026-08-17: **TpT only.** No membership site, no direct school
sales, no invoicing. The brand name AI-Ready School stays. The LLC of that name is
no longer the owner's; it was repurposed for another of his businesses.

This file supersedes the school-sales half of `docs/LAUNCH_RUNBOOK.md`. The runbook's
Phase 3 cutover, Stripe live keys, Supabase Pro, SSO cutover, and NJ principal
outreach are all **cancelled**, not deferred.

## The timing fact that shapes everything

It is mid-August. Back-to-school is the single biggest buying window of the TpT year
and it is happening right now. Every week of delay costs more in August than it will
in November. The sequence below is built to get a full-looking store live inside a
week, not to get one perfect product live in a month.

## Entity, money, and the name

Nothing in the kits claims an LLC. Every legal line reads "© Adam & Katelyn
Spinozzi · AI-Ready School," which is a personal copyright under a trade name. That
is correct for selling as an individual and needs no edits.

- **Sell as yourself** (sole proprietor) with "AI-Ready School" as the store name.
  TpT sellers are overwhelmingly individuals; a store name is not an entity claim.
- **The W-9 must match who actually receives the money.** Use the owner's SSN, or the
  EIN of a business he currently owns. **Do not use the old AI-Ready School LLC EIN
  (42-4384815)**, which now belongs to a different business. Pick one and never change it.
- **No liability shield now.** Previously the LLC provided one. For selling PDFs the
  practical exposure is low, and every kit already carries the informational-not-legal-
  advice line, but this is a real change from the earlier plan and the owner should know it.
- **The name collision is unchanged**: `docs/NAME_CONTINGENCY.md` documents the active
  India-based "AI Ready School" and the owner's decision to proceed. A public TpT
  storefront raises visibility, so the quarterly USPTO watch in that file still matters.

## Account setup: take Premium on day one

| | Basic | Premium |
|---|---|---|
| Cost | $29 one time | $59.95 / year |
| You keep | 55% | 80% |
| Transaction fee | $0.30 per resource | none on orders $3+ |

On a $24 kit that is **$12.90 versus $19.20**, a difference of $6.30 a sale. Premium
pays for itself in about ten kit sales a year. The $29 Basic fee is **non-refundable and
does not credit toward Premium later**, so starting Basic and upgrading wastes it.

## What ships, and in what order

### Week 0, day 1 — open with eight products, not one

A store with one product looks abandoned. Publish everything already built and verified:

**Six free** (the follower engine): the five free resources in `kits/free-resources/`
plus **De-ID Drills** (`kits/tpt-deid-drills/`), which the owner re-tiered to free under
the Swipe Test.

**Two paid at $24**: Kit 1 and Kit 2 TpT editions (`kits/kit01-tpt/`, `kits/kit02-tpt/`).
Both are built, verified, and carry correct TpT licensing.

Free products are not charity here. They are how a new store gets followers, and
followers are who get notified every time you post something new. That notification is
the entire growth mechanism on TpT.

### Week 0, day 2 — the bundle

List the **Kit 1 + Kit 2 bundle at $39** (versus $48 apart). Bundles raise the average
order and TpT surfaces them well.

### Weeks 1 through 6 — one kit per week, highest demand first

Each needs a TpT edition built first (see the conversion recipe below).

| Week | Product | Why this order |
|---|---|---|
| 1 | **Kit 5 · Academic Integrity** | Highest-demand topic in K-12 right now. Every school is arguing about AI and cheating. |
| 2 | **Kit 4 · Assessment** | Grading is the loudest pain point, and the kit ends in materials a teacher uses that week. |
| 3 | **Kit 3 · Planning & Differentiation** | Broadest audience; differentiation is an evergreen search term. |
| 4 | **Kit 7 · Workload** | "Win back an hour" sells itself in October, when teachers are tired. |
| 5 | **Kit 6 · Communication** | Evergreen, and conferences season makes it timely. |
| 6 | **Kit 8 · School AI Culture** | Leadership-facing, smallest audience, so it goes last. |

### Week 7 — the anchor product

**Track A Complete, all eight kits, $99-129** versus roughly $192 apart. This becomes
the store's flagship and the thing a principal buys with building funds.

### Week 8 onward — the weekly rhythm

One new listing a week, alternating **free, paid, free, paid**. Free items keep pulling
followers; paid items convert them. New paid items come from micro-products derived from
kits already built, and every paid micro must pass the owner's Swipe Test: tangible
classroom documentation, not training material or infographics.

Queued paid micro candidates: Parent Message Makeovers template pack (from Kit 6), the
sub-plan and exit-ticket template pack (from Kit 7), the rubric and question-bank pack
(from Kit 4).

## The weekly routine (about 90 minutes of owner time)

1. **Audit** the week's product (I build it; the owner gates it). ~30 min.
2. **Upload and list**: file, cover, title, description, tags, price. ~20 min.
3. **Answer questions and reviews.** Reviews drive ranking, and buyers earn TpT credit
   for leaving them, so ask for feedback inside the product. ~15 min.
4. **Freshen one old listing**: a better thumbnail, a sharper first two lines, an added
   keyword. TpT rewards recent activity, and this is the cheapest ranking work there is.
   ~15 min.
5. **Update one existing kit file** when a fix lands. Updates notify every past buyer,
   which puts the store back in front of people who already trust it. ~10 min.

## The conversion recipe: member edition to TpT edition

Kits 3-8 each carry 5-8 references that break on TpT. The changes, per kit:

- The license line becomes the TpT single-user line used in `kits/kit01-tpt/`.
- The References re-download promise replaces the "member schools" update promise.
- Membership, school-wide licensing, and certificate-through-membership framing comes
  out or is reworded.
- The domain stays but prints with the no-wrap guard.
- Rebuild all nine components, re-merge the script cover, run `check_overlap.py`,
  confirm text layers and legal lines, and view the changed pages.

## The website question

Every kit PDF footer prints **ai-readyschool.com**. Going TpT-only does not remove those
footers, so the domain must resolve to something or the products point at nothing.
Cheapest honest answer: **one landing page** that says what AI-Ready School is, hosts the
free library, and links to the TpT store. It costs almost nothing, makes the printed
footers true, and gives an email list that TpT does not let you own.

## Cancelled, explicitly

Stripe live keys · Supabase Pro · SSO cutover · the member site's prompt library,
progress tracking, and certificate · school invoicing and PO handling · the NJ principal
outreach list. All of it was built for a direct-sales motion that is no longer the plan.
The code stays in the repo; it just is not launched.
