# THE GAME PLAN — owner directive 2026-09-21

> "I want content releasing everyday. This needs to grow and I need to become
> TpT leading authority. Also, I already have proven working software. Look at
> my repo woodshop-software... Let's use the engine in that to help guide how I
> teach teachers how to vibe code. I am using it all year and will be growing it
> as I go."

Four decisions were taken by the owner on 2026-09-21 and are binding:

1. **Cadence: 3 anchors + 4 satellites, seven days a week.**
2. **Woodshop: show the code, never name the school.**
3. **Ladder: both tiers, single-file first.**
4. **The woodshop app is a teaching example and is never sold.**

---

## THE ENGINE — what woodshop-software actually gives us

A private Next.js + Supabase application, live on Vercel, running a real Level
2/3 woodshop portfolio course for a full school year and growing as it goes.
Nine print-exact pages, teacher dashboard, roster, grading rubrics, template
authoring, five test files.

**This is the moat.** Anybody can write a blog post about vibe coding. Nobody
else on TPT has a year of real school software they are still shipping to. The
authority argument is not "I know about this" — it is **"this is running in my
building right now, here is the code, here is what broke."**

### The three artifacts worth the most

**1. `src/lib/names.ts` — privacy by construction.** A student's surname is
dropped in the teacher's browser *before anything transmits*, the server
rejects longer values, and **no column in the schema can hold one**. A test
asserts no surname survives, whatever the input. Three layers, each independent.

This is the single best teaching artifact in the account. It makes the
three-tier data rule concrete instead of advisory, it is better than what most
edtech vendors ship, and it is defensible in front of any administrator. It
earns a build-along, a PD session, and a free.

**2. `src/lib/calc.ts` — every total is computed, never typed.** Money runs in
whole cents. The hook is in the code comment: the course's own printed exemplar
says `10 × $8.44 = $80.44`. The software makes that class of error impossible.
Also: shop fractions (`1 1/8`, `6 5/16`) parsed to decimals for board-foot math
— the kind of thing AI gets wrong unless you tell it to get it right.

**3. `test/` — how you know it works.** Money, fractions, board feet, page
completion rules, name shortening. Teachers do not test. "How do you know it
works?" is the first question a skeptic asks and we are the only ones with an
answer on disk.

### How it is referenced, every time

- **Never name the school or the district.** "My high school woodshop course."
- Code excerpts, screenshots with de-identified data, and real decisions are all
  fair game — that is the proof and it is why the content is worth money.
- The repo stays private and is never linked from a listing.
- **The app is never sold and never given away.** No installs to support, no
  other school's data, no obligation. Teaching example only.

---

## THE LADDER — both tiers, single-file first

The line has been teaching one tier and calling it the whole ladder. Woodshop
proves there is a top, and the top is where nobody competes.

| Tier | What it is | Data lives | Price | Audience |
|---|---|---|---|---|
| **1 · One file** | A single HTML file, `localStorage`, opens in any browser | On one device, transmitted nowhere | $19–29 | Wide. The entry product. |
| **2 · Real software** | Accounts, a database, many students, a teacher view | On a server the teacher controls | $34–49 | Narrow, serious, unserved |

**Tier 1 stays the front door** and most products stay there. Tier 2 is
deliberately smaller and higher priced: most TPT buyers will not stand up a
Supabase project, and the ones who will are worth four times as much and have
nowhere else to go.

**The honest bridge between them is the sentence tier 1 cannot say:** a tool
that cannot hold a roster cannot run a course. That is the gap, that is when a
teacher needs tier 2, and the products should say so plainly rather than
pretending one file is always enough.

---

## THE CADENCE — seven a week, two kinds

| Day | Slot | Lane |
|---|---|---|
| **Sunday** | **ANCHOR** | A · Vibe Coding flagship |
| Monday | satellite | free, funnels into Sunday's anchor |
| Tuesday | satellite | free or small paid |
| **Wednesday** | **ANCHOR** | C · whole-school PD (two-Wednesday build) |
| Thursday | satellite | free, funnels into Friday |
| **Friday** | **ANCHOR** | B · Young Entrepreneurs |
| Saturday | satellite | free or small paid |

### Anchors — three a week, the current quality bar, unchanged

20–34 pages, working software included, all five gates, browser-tested. **The
bar does not move because the cadence did.** A drop shipped broken on 09-18 at
three a week; seven flagships a week would be a promise we could not keep, and
the owner chose this shape for that reason.

### Satellites — four a week, small and genuinely useful

3–6 pages. One idea, done properly. Each one **points at an anchor** with a
single store-internal callout and nothing else.

**Satellites are the ranking engine, not filler.** The store's binding
constraint has never been revenue — it is reviews and downloads, and a free is
the only ranking signal a store at zero can earn. A satellite that nobody would
download is a wasted day; it has to be worth having on its own.

**Most satellites come out of the woodshop repo**, which is why four a week is
sustainable: the source material is already written, already working, already
being extended all year. One subsystem, one satellite.

---

## WHAT DOMINATION ACTUALLY LOOKS LIKE, AND WHEN

Said plainly so nobody is disappointed at week three.

- **Volume is necessary and not sufficient.** TPT ranks on sales velocity,
  reviews and recency. 360 listings a year that nobody has reviewed is not
  authority; it is a large invisible catalog.
- **Reviews are the constraint.** As of 2026-09-21 the store had ~31 search
  visits in 30 days. The review-request pass across all 55 listings was
  completed today — the first structural action taken against that number.
- **Realistic timeline:** 3–6 months to meaningful ranking movement. Weeks, no.
- **`vibe coding` still measures "not enough data" on TPT.** Owning the category
  before it arrives is the bet; the monthly re-pull is how we learn whether it
  landed. Next due around 2026-10-11.
- **The differentiator is the engine, not the volume.** A competitor can copy a
  product in a week. They cannot copy a year of running software in their own
  building, and by the time they start we are twelve months ahead.

### What is actually earning

**Young Entrepreneurs has started converting** — the owner confirmed paid sales
on 2026-09-21. That is the first product family with revenue, and it changes the
priority: **find out which YE product sold and build more of that shape.** That
question is open and is the first thing the next research pulse should chase.

---

## THE FIRST NINETY DAYS

**Days 1–30 · Prove the engine converts.**
Review request on all 55 listings (**done 09-21**). Woodshop satellites begin.
Lane C session 3 ships. Find out which YE product sold. Re-pull `vibe coding`
around 10-11.

**Days 31–60 · Build the tier-2 door.**
First tier-2 product — the roster that cannot store a last name, built for real.
Priced $34–49. Lane C session 4 on student data, which is the woodshop privacy
design taught as PD.

**Days 61–90 · Consolidate.**
Bundles across tiers. A second YE unit shaped like whatever sold. Judge the
`vibe coding` bet on two months of monthly re-pulls rather than on hope.

---

## STANDING RULES ADDED BY THIS PLAN

- **Every satellite points at exactly one anchor**, with one callout, no more.
- **Never name the school, the district, or a student** in any product, ever.
- **The woodshop app is never sold, given away, or linked.**
- **A satellite still has to be worth downloading on its own.** Filler costs
  more than it earns, because a bad free earns a bad review.
- **The review request appears in every listing**, worded for free or paid.
