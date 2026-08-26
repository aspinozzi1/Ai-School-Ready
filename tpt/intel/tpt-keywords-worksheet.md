# TPT Keywords worksheet — the primary meter

TPT's seller dashboard now has a **TPT Keywords** tab
(teacherspayteachers.com/Dashboard/Site-Search-Analytics) showing what
buyers search *inside TPT*: 30-day search count, a **Resources** count
(how many products compete for that phrase), an Opportunity rating
(Challenging / Moderate / Promising / Strong), and a related-keywords
table of phrases educators search in the same sitting.

**There is no API or MCP for this tool.** The owner runs the lookups by
hand and pastes the results (a screenshot is fine) into the session.

## Meter hierarchy (owner directive 2026-08-26)

1. **TPT Keywords — PRIMARY.** It measures the actual marketplace we
   sell in. Its Resources count is the real competition number: the
   "under ~3,000 competitors" rule maps to the **`<1K` and `1K–3K`**
   buckets. Its Opportunity rating is TPT's own verdict.
2. **Mangools/KWFinder — SECONDARY (Google demand).** Useful for broad
   phrases and for Pinterest/Google discovery copy; misleading for
   hyper-niche teacher phrases (see mangools-howto.md).
3. **WebSearch / browse pages — context** (formats, seasonality).

Every validation row records which meter produced it. A phrase that
looks dead on Google can be strong on TPT, and vice versa.

## The weekly loop

- **Saturday pulse** writes `tpt/intel/lookups-YYYY-Www-monday.md` — the
  term list for Monday's planned products — and SENDS it to the owner.
- Owner runs the lookups in the TPT Keywords tab, pastes results back.
- **Sunday deep dive** folds whatever came back into the Monday brief's
  validation table (TPT numbers outrank Google numbers).
- **Monday pulse** writes `lookups-YYYY-Www-wednesday.md` for the
  Wednesday lanes and sends it; **Tuesday compile** folds it in.
- Anything not returned in time: proceed on the other meters and mark
  the row `meter: google/context only` in the brief.

## What to ask for, per term

Search count (30 days) · Resources bucket · Opportunity rating · and the
top few related keywords with their own numbers — the related list is
where the best long-tail titles come from.

## Standing data captured from the owner's dashboard (2026-08-26)

| Phrase | Searches (30d) | Resources | Opportunity |
|---|---|---|---|
| digital citizenship | 2,553 | 3K–8K | **Strong** |
| ai | 848 | 40K–75K | Moderate |
| artificial intelligence | 702 | 3K–8K | **Promising** |
| media literacy | 654 | 20K–40K | Moderate |
| ai ethics | 101 | **1K–3K** | Moderate |
| ai prompts | 101 | 3K–8K | Moderate |
| ai literacy middle school | 8 | 3K–8K | Challenging |
| ai grade 7 | 7 | 3K–8K | Challenging |
| emergency ai sub plans | 5 | **< 1K** | Moderate |
| ai bellringers | 4 | 3K–8K | Challenging |

**Readings that should steer production:**

- **"digital citizenship" (2,553 searches, Strong) is the biggest signal
  in this data.** It is an established, high-traffic TPT category that
  our AI-safety content already belongs to — the privacy posters, the
  one-hard-rule material, "Don't Type That", the fact-checking lesson.
  Retag and retitle toward digital citizenship wording where honest, and
  build for that phrase deliberately. This is likely a bigger door into
  our catalog than "AI" itself.
- **"artificial intelligence" (702, Promising) beats bare "ai"** (848 but
  40K–75K competitors). Spell it out in titles/tags, don't rely on "AI".
- **"ai ethics" sits in the 1K–3K bucket** — genuinely low competition
  with real searches. A strong candidate for a dedicated product.
- **Hyper-specific AI phrases are traps**: "ai bellringers", "ai grade 7",
  "ai literacy middle school" all show single-digit searches against
  3K–8K resources = Challenging. Don't build for them.
- **"emergency ai sub plans": 5 searches but < 1K resources.** Tiny
  demand, near-zero competition — fine as a free funnel item (we have
  one), never as a paid bet.
- Lesson that generalizes: **qualify a big phrase, don't invent a niche
  one.** Ride "digital citizenship" and "artificial intelligence"; skip
  invented compounds nobody types.

---

# TPT Keywords pull #2 — 2026-08-26 (owner-run). PRIMARY METER.

## Seed: digital citizenship — 2,644 searches · 3K–8K resources · **Strong**

| Related keyword | Searches | Resources | Opportunity |
|---|---|---|---|
| library | 5,735 | 75K–150K | Moderate |
| computer science | 2,349 | 75K–150K | Moderate |
| technology | 1,485 | 150K–300K | Challenging |
| **internet safety** | **760** | **3K–8K** | **Promising** |
| **digital footprint** | **572** | **1K–3K** | **Promising** |
| digital literacy | 486 | 150K–300K | Challenging |
| **online safety** | **386** | **3K–8K** | **Promising** |
| digital citizenship worksheets | 104 | 1K–3K | Moderate |
| digital citizenship worksheet | 33 | 3K–8K | Challenging |

## Seed: artificial intelligence — 733 searches · 3K–8K · **Promising**

| Related keyword | Searches | Resources | Opportunity |
|---|---|---|---|
| ai | 848 | 40K–75K | Moderate |
| coding | 793 | 20K–40K | Moderate |
| **ai and ay worksheets** | **522** | 3K–8K | Promising |
| ai literacy | 170 | 8K–20K | Moderate |
| ai lesson | 60 | 8K–20K | Challenging |
| ai lessons | 25 | 8K–20K | Very Difficult |
| ai worksheets | 24 | 8K–20K | Very Difficult |
| artificial intelligence activities | 16 | 3K–8K | Challenging |
| artificial intelligence worksheet | 3 | 1K–3K | Challenging |

## Seed: ai ethics — 101 searches · 1K–3K · Moderate

---

# What this data changes (read before planning any batch)

## 1. THE "ai" TRAP — do not target bare "ai" on TPT

**"ai and ay worksheets" — 522 searches** — is a *phonics* query. "ai"
and "ay" are vowel teams; primary teachers search them constantly. That
contamination explains the whole shape of the "ai" row: 848 searches
against 40K–75K resources, most of which are phonics worksheets we will
never outrank and whose searchers do not want us.

**Rules that follow:**
- Never lead a title or tag with bare **"ai"**. Always **"artificial
  intelligence"** or a qualified phrase ("AI for teachers", "ChatGPT").
- Ignore the "ai" search count in every future analysis — it is not our
  audience.
- Audit existing tags for bare "ai" and replace them.

## 2. AI-qualified long-tails are traps, confirmed by TPT's own ratings

"ai lesson" (60/Challenging), "ai lessons" (25/**Very Difficult**),
"ai worksheets" (24/Very Difficult), "artificial intelligence
activities" (16/Challenging), "artificial intelligence worksheet"
(3/Challenging). Tiny demand, brutal competition. **Do not build for
these phrases.** The pattern holds from pull #1: qualify a big phrase,
never invent a small one.

## 3. The real door into this catalog is DIGITAL CITIZENSHIP

Four phrases in one family, all Promising-or-Strong, all in reachable
competition buckets:

| Phrase | Searches | Resources | Verdict |
|---|---|---|---|
| digital citizenship | 2,644 | 3K–8K | Strong |
| internet safety | 760 | 3K–8K | Promising |
| **digital footprint** | **572** | **1K–3K** | **best ratio in all our data** |
| online safety | 386 | 3K–8K | Promising |

That is **~4,300 monthly searches** in a family our student-privacy and
AI-safety material legitimately belongs to — versus 733 for
"artificial intelligence" and effectively nothing for teacher-PD phrasing.

**"digital footprint" is the single best opportunity we have found:**
572 searches against only 1K–3K competing resources.

## 4. The strategic correction: we are missing the student-facing side

These are searches by teachers shopping for **classroom resources for
students**. Our catalog is overwhelmingly **adult-facing** (staff PD,
teacher planning, parent letters) — genuinely valuable, sold to a buyer
who mostly does not arrive through TPT search.

We should not abandon the PD line; it is the high-margin flagship and
serves admins and coaches. But the **traffic engine must include
student-facing digital-citizenship-plus-AI resources**, which is exactly
the trailblazer intersection we already own the expertise for:

- AI + digital footprint (what AI tools do with what you type)
- AI + internet safety (chatbots, deepfakes, what's real)
- AI + online safety for the AI era
- AI honesty/academic integrity for students (student-facing version of
  what we teach staff)

## 5. Immediate retitle/retag candidates (existing catalog)

These already-published frees belong to the digital-citizenship family
and are currently titled away from it:

- **Don't Type That: 10 Things That Count as Student PII** → carry
  "digital citizenship" and "internet safety" in tags; consider a title
  that includes digital citizenship wording.
- **Is It True? Teaching Kids to Fact-Check AI** (ages 9–12) → this is a
  digital-citizenship/media-literacy product; tag accordingly.
- **AI Tool Safety Checklist** → "online safety", "internet safety".
- **Our Family AI Rules poster** → "internet safety", "digital citizenship".

Retagging costs minutes and may matter more than any single new product
this month.

---

# Pull #2b — related list from the AI-side seeds (same session)

| Related keyword | Searches | Resources | Opportunity |
|---|---|---|---|
| digital citizenship | 2,553 | 3K–8K | **Strong** |
| **fluency passages 3rd grade** | **1,087** | 20K–40K | Moderate |
| ai | 848 | 40K–75K | Moderate |
| ai literacy | 170 | 8K–20K | Moderate |
| ai prompts | 101 | 3K–8K | Moderate |
| ai grade 7 | 7 | 3K–8K | Challenging |
| emergency ai sub plans | 5 | < 1K | Moderate |
| ai bellringers | 4 | 3K–8K | Challenging |

**Two confirmations:**

1. **The phonics contamination is real and large.** "fluency passages
   3rd grade" (1,087 searches) surfacing as a co-search alongside AI
   seeds — together with "ai and ay worksheets" (522) — means a
   substantial share of TPT's "ai" traffic is primary reading teachers,
   not artificial-intelligence shoppers. Bare "ai" is confirmed dead to
   us as a target term.

2. **TPT itself keeps pairing our subject with digital citizenship.**
   "digital citizenship" appears as a top related keyword from *every*
   AI-side seed we have pulled (2,553–2,644 searches, Strong, every
   time). TPT's own co-search graph is telling us where AI-safety
   material belongs in this marketplace. Build there.

---

# Pull #3 — sub plans family (owner-run, 2026-08-26). This is the Week-2 jackpot.

Seed (sub plans): **20,817 searches** · 300K–500K resources · Promising

| Related keyword | Searches | Resources | Opportunity |
|---|---|---|---|
| back to school | 266,393 | >500K | Strong |
| **sub binder** | **13,284** | **8K–20K** | **Strong** |
| **emergency sub plans** | **10,258** | 40K–75K | Promising |
| **substitute binder** | **5,631** | **3K–8K** | **Promising** |
| sub plans template | 3,313 | 20K–40K | Promising |
| sub plans first grade | 1,044 | 150K–300K | Challenging |
| sub plans 2nd grade | 915 | 75K–150K | Moderate |
| sub plans kindergarten | 747 | 75K–150K | Challenging |

## What this decides for Monday's (Week 2) drop — binding

1. **"substitute binder" is the best volume-to-competition ratio of any
   phrase we've validated**: 5,631 searches vs 3K–8K resources,
   Promising. "sub binder" is 2.3× bigger (13,284, Strong) at 8K–20K.
   **The Week-2 mid product IS a substitute binder** — retitle the
   planned "Sub-Plan Builder" to lead with binder wording, e.g.
   "Substitute Binder with AI | Build Your Emergency Sub Plans in 15
   Minutes" (validate ≤80 chars at build). Carry: sub binder, substitute
   binder, emergency sub plans, sub plans template in tags.
2. **"emergency sub plans" (10,258, Promising)** — our existing FREE
   emergency-sub-plans resource sits on a genuinely huge phrase. Its
   title already leads with it; add "sub binder" cross-tags and make it
   funnel hard to the new paid binder.
3. **Grade-qualified sub plans are the same trap as ai-* compounds**
   (Challenging at 75K–300K resources): don't chase them.
4. Product shape guidance: buyers want a BINDER — printable
   tabbed/sectioned, fill-in pages, plus our differentiator (the AI
   master prompts that draft the day). Editable > static where feasible.
5. "back to school" (266K, Strong) is a seasonal tag to ride on every
   relevant listing this month, not a phrase to title against.

---

# Pull #4 — classroom procedures + parent communication (owner-run, 2026-08-26)

## Seed: classroom procedures — 4,293 searches · 20K–40K resources · Promising

| Related keyword | Searches | Resources | Opportunity |
|---|---|---|---|
| first day of school activities | 220,997 | >500K | Strong |
| meet the teacher | 115,102 | >500K | Strong |
| classroom rules | 18,509 | 150K–300K | Promising |
| classroom expectations | 8,655 | — | Moderate |
| **classroom procedures and routines powerpoint** | **3,997** | **3K–8K** | **Strong** |
| **classroom procedures checklist** | **1,598** | **1K–3K** | **Strong** |
| classroom procedures slides | 742 | 8K–20K | Moderate |
| classroom procedures visuals | 234 | 3K–8K | Moderate |

## Seed: parent communication — 1,195 searches · 75K–150K resources · Moderate

| Related keyword | Searches | Resources | Opportunity |
|---|---|---|---|
| **parent questionnaire back to school** | **12,534** | **3K–8K** | **Strong** |
| take home folder | 11,603 | 8K–20K | Strong |
| **parent communication log** | **7,570** | **3K–8K** | **Strong** |
| happy mail | 4,488 | 3K–8K | Strong |
| communication log | 4,254 | 8K–20K | Promising |
| **parent contact log** | **2,348** | **3K–8K** | **Strong** |
| parent communication folder | 325 | 3K–8K | Promising |
| parent communication form | 204 | 75K–150K | Very Difficult |

## What pull #4 decides — binding

1. **"classroom procedures checklist" (1,598 · 1K–3K · Strong) is a
   perfect open phrase** — real volume, under the 3,000-resource line,
   Strong. Checklists are native to our format. → Week-2/3 Lane-1 FREE:
   a classroom procedures checklist (with an AI twist in the body, not
   the title). Tag-carry: classroom procedures, classroom expectations,
   classroom rules.
2. **Slides demand is real**: "classroom procedures and routines
   powerpoint" (3,997 · 3K–8K · Strong). We ship PDFs today; an
   *editable slides* variant of the routines material goes on the
   calendar as a paid product. (Matches the Mangools pulse finding —
   editable slides/posters is where the money sits in this family.)
3. **Parent Message Makeovers is titled against the wrong phrase.**
   Its head phrase "parent communication" is weak (1,195 searches vs
   75K–150K resources). The traffic is in the LOG family: parent
   communication log 7,570/3K–8K/Strong + parent contact log
   2,348/3K–8K/Strong + communication log 4,254. → Retag the $12 kit
   toward the log family, and **build a Parent Communication Log
   (printable + editable) as a companion product** — strongly validated,
   natural funnel into Makeovers.
4. **"parent questionnaire back to school" (12,534 · 3K–8K · Strong)**
   — huge seasonal phrase, low competition, tiny product to make.
   Fast-track a free (or $3–4) parent questionnaire while the BTS
   window is open; funnel to Parent Message Makeovers.
5. "meet the teacher" (115K) and "first day of school activities"
   (221K) are seasonal tag-riders on relevant listings, never title
   targets.

---

# Pull #5 — entrepreneurship + financial literacy (owner-run, 2026-08-26). Lane-3 validation.

## Seed: entrepreneurship — 1,153 searches · 3K–8K resources · Promising

| Related keyword | Searches | Resources | Opportunity |
|---|---|---|---|
| personal finance | 1,560 | 8K–20K | Promising |
| business | 753 | 75K–150K | Moderate |
| marketing | 649 | 20K–40K | Challenging |
| intro to business | 511 | 8K–20K | Moderate |
| denise leigh | 485 | < 1K | Promising |
| **shark tank** | **403** | **3K–8K** | **Promising** |
| **entrepreneurship activities** | **367** | **3K–8K** | **Promising** |
| entrepreneurship curriculum | 74 | 1K–3K | Moderate |
| entrepreneurship posters | 26 | < 1K | Moderate |
| entrepreneurship interactive notebook | 11 | < 1K | Moderate |

## Seed: financial literacy — 1,986 searches · 40K–75K resources · Moderate

| Related keyword | Searches | Resources | Opportunity |
|---|---|---|---|
| money | 5,557 | 300K–500K | Moderate |
| economics | 1,849 | 75K–150K | Moderate |
| personal finance | 1,560 | 8K–20K | Promising |
| budgeting | 943 | 8K–20K | Promising |
| financial literacy high school | 881 | 20K–40K | Moderate |
| consumer math | 644 | 8K–20K | Moderate |
| **personal finance curriculum** | **601** | **1K–3K** | **Promising** |
| financial literacy middle school | 502 | 20K–40K | Moderate |
| **financial literacy curriculum** | **388** | **3K–8K** | **Promising** |

## What pull #5 decides — binding

1. **The seed itself is the title phrase.** "entrepreneurship"
   (1,153 · 3K–8K · Promising) is directly usable — unlike "ai" it is
   clean and low-competition. Lane-3 paid titles lead with
   *entrepreneurship / entrepreneur*, never "business" (753 vs
   75K–150K = trap) or "marketing" (Challenging).
2. **Shark-tank pitch demand is validated** (403 · 3K–8K · Promising).
   Launch-It already ends in a pitch day — add "shark tank" style
   wording to its tags/description, and a dedicated *pitch competition
   kit* joins the Lane-3 backlog.
3. **The money bridge**: personal finance (1,560 · 8K–20K · Promising),
   budgeting (943 · Promising), and the open phrase **"personal finance
   curriculum" (601 · 1K–3K · Promising)** — a kids' money/budgeting
   unit inside the YE line is strongly validated. Backlog: "My First
   Budget" (ages 9–12) targeting personal finance + budgeting.
4. "financial literacy" head term is a tag, not a title (40K–75K
   resources). Grade-qualified financial literacy = Moderate at
   20K–40K, skip as titles.

---

# Pull #6 — deaf and hard of hearing + self advocacy (owner-run, 2026-08-26). Lane-4 validation.

## Seed: deaf and hard of hearing — 46 searches · 3K–8K resources · Challenging

Related keywords are all micro-volume: DHH games 5, DHH itinerant 5,
writing worksheets for DHH 5, asl back to school for DHH 4, DHH pass 4,
teacher of the deaf and hard of hearing back to school 4, DHH
activities 3 (1K–3K, Challenging), DHH bulletin board 3, DHH speech
therapy 3 (1K–3K, Challenging), iep goals and DHH 3 — everything else
< 1K resources, Moderate. Chart note: DHH searches were near zero all
summer and only started ramping Aug 17 — classic itinerant-TOD
back-to-school pattern.

## Seed: self advocacy — 1,237 searches · 8K–20K resources · Promising

| Related keyword | Searches | Resources | Opportunity |
|---|---|---|---|
| social skills | 6,169 | >500K | Moderate |
| **executive functioning** | **3,440** | **8K–20K** | **Promising** |
| emotional regulation | 3,357 | 40K–75K | Moderate |
| problem solving | 2,070 | >500K | Challenging |
| perspective taking | 1,575 | 8K–20K | Promising |
| asking for help | 607 | 40K–75K | Challenging |
| **self advocacy activities** | **382** | **3K–8K** | **Promising** |
| **self advocacy worksheets** | **358** | **1K–3K** | **Promising** |
| self advocacy game | 94 | < 1K | Promising |

## What pull #6 decides — binding for the Deaf Education lane

1. **DHH is a service niche, not a search niche — and that's fine.**
   46 searches/month on the head term means nobody wins deaf-ed on
   search volume. The lane's discovery strategy is therefore:
   **title against the "self advocacy" family, tag against the DHH
   long-tails.** Self-advocacy IS the core curriculum for DHH students
   in general education — the market and the mission point at the same
   product.
2. **"self advocacy worksheets" (358 · 1K–3K · Promising) is the
   lane's open phrase**, with "self advocacy activities"
   (382 · 3K–8K) beside it and the seed (1,237 · 8K–20K · Promising)
   as the head. First-wave deaf-ed titles lead with self-advocacy
   wording, e.g. "Self-Advocacy Worksheets for Deaf & Hard of Hearing
   Students | Classroom Kit" — DHH in the subtitle half, never the
   lead.
3. **Own every DHH long-tail with tags.** They are all < 1K–3K
   resources; with 13 tag slots per listing we can blanket: deaf and
   hard of hearing, teacher of the deaf, DHH itinerant, iep goals deaf
   and hard of hearing, hearing device check, asl back to school. Cost:
   zero. Ceiling: the whole micro-market.
4. **"executive functioning" (3,440 · 8K–20K · Promising) is the
   crossover door** — an executive-functioning/self-advocacy checklist
   product serves DHH students, the broader SPED market, and our
   checklist house style at once. Backlog it for Lane 4.
5. **Timing confirms Wednesday Sep 2 is right**: DHH search interest
   turned on Aug 17 and is climbing — itinerant TODs are planning
   caseloads NOW. First wave ships into a rising curve.
6. "asking for help", "social skills", "problem solving" = tags only
   (Challenging or >500K resources).

---

# Pull #7 — homeschool curriculum (owner-run, 2026-08-26). Lane-2 validation.

## Seed: homeschool curriculum — 289 searches · 300K–500K resources · Challenging

| Related keyword | Searches | Resources | Opportunity |
|---|---|---|---|
| homeschool | 3,177 | >500K | Challenging |
| **homeschool planner** | **2,415** | **20K–40K** | **Promising** |
| preschool curriculum | 2,327 | 150K–300K | Moderate |
| curriculum | 2,107 | >500K | Challenging |
| full year curriculum | 910 | 20K–40K | Moderate |
| homeschool schedule | 841 | 20K–40K | Moderate |
| back to school | 266,393 | >500K | Strong |

## What pull #7 decides — binding for the Homeschool lane

1. **Homeschool head terms are traps on TPT.** "homeschool" (3,177 vs
   >500K, Challenging) and "homeschool curriculum" (289 vs 300K–500K,
   Challenging) confirm TPT's core buyers are classroom teachers;
   homeschoolers search here less and face a wall of inventory.
2. **The one door is the PLANNER: "homeschool planner"
   (2,415 · 20K–40K · Promising)**, backed by "homeschool schedule"
   (841 · Moderate). Lane-2 titles lead with *planner / planning*
   wording — which our "Homeschool AI Planning Pack" already does.
   → Retag it toward: homeschool planner, homeschool schedule, full
   year curriculum; keep "homeschool curriculum" only as a tag.
3. Lane-2 sizing check: this family is 5–10× smaller than the
   classroom families (procedures, sub plans, parent comm). Keeps its
   Monday slot, but Lane 1 stays the revenue engine — matches the
   existing 5-free/1-mid/1-high vs 2-free/1-paid split. No change.
