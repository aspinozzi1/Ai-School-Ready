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

---

# Pull #8 — CVC / reading intervention / phonics intervention (owner-run, 2026-09-03)
Run for the **Friday compete lane**. Different question from the win lanes:
we need demand and buyer intent, not low competition.

## Seed: cvc words — 10,412 · 150K–300K · Moderate

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **cvc words worksheets** | **7,473** | **40K–75K** | **Promising** | **130** |
| addition and subtraction within 20 | 15,959 | 40K–75K | Promising | 278 |
| sight words | 14,545 | 150K–300K | Moderate | 65 |
| phonics | 13,705 | >500K | Moderate | 23 |
| cvc | 6,411 | 150K–300K | Moderate | 28 |
| letter sounds | 4,325 | 150K–300K | Moderate | 19 |
| cvc worksheets | 2,961 | 40K–75K | Moderate | 52 |
| **cvc word list** | **1,262** | **8K–20K** | **Promising** | **90** |
| cvc words with pictures | 821 | 40K–75K | Moderate | 14 |
| cvc words free | 207 | 8K–20K | Moderate | 15 |

## Seed: reading intervention — 2,765 · 150K–300K · Moderate

| Related | Searches | Resources | Opportunity |
|---|---|---|---|
| reading comprehension passages and questions | 34,571 | 300K–500K | Promising |
| reading comprehension | 21,555 | >500K | Promising |
| reading | 11,993 | >500K | Moderate |
| science of reading | 2,983 | >500K | Challenging |
| math intervention | 2,622 | 150K–300K | Moderate |
| reading fluency | 2,619 | 150K–300K | Moderate |
| intervention | 1,362 | >500K | Challenging |
| phonics intervention | 751 | 75K–150K | Moderate |
| **reading intervention binder** | **255** | **3K–8K** | **Promising** |

## Seed: phonics intervention — 789 · 75K–150K · Moderate

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **ufli** | **17,926** | **20K–40K** | **Strong** | **597** |
| **my nerdy teacher** | 10,720 | 1K–3K | Strong | 5,360 (a seller's store name) |
| phonics worksheets | 6,141 | 150K–300K | Moderate | 27 |
| phonics games | 1,805 | 150K–300K | Challenging | 8 |
| **flying through phonics ufli** | 1,557 | <1K | Strong | (a specific product line) |
| writing intervention | 546 | 75K–150K | Challenging | 5 |
| free phonics intervention | 8 | 3K–8K | Challenging | 1 |

## What pull #8 decides

1. **Friday's lead phrase is "cvc words worksheets"** — 7,473 searches at
   40K–75K, Promising. Highest intent + best badge in the CVC family.
   The bare head "cvc words" (10,412) sits at 150K–300K/Moderate: more
   volume, far worse odds. Title leads with the worksheets phrase.
2. **"reading intervention binder" (255 · 3K–8K · Promising)** is tiny in
   volume but is the exact format phrase at low competition — perfect as
   a secondary phrase in the title tail and a tag, not the lead.
3. **"cvc word list" (1,262 · 8K–20K · Promising)** — a genuinely open
   companion phrase. A free CVC word-list download is a strong funnel
   into the paid units. Backlog it.
4. **UFLI is the single biggest opportunity in the entire dataset so far
   — and it needs an owner decision.** 17,926 searches against only
   20K–40K resources with a **Strong** badge is a win score of ~597,
   roughly 5× "cvc words worksheets". UFLI Foundations is a real,
   widely-adopted phonics program whose scope and sequence is published,
   and a large TPT cottage industry sells supplements for it. Two things
   make this a decision rather than a build: it is a **named program and
   a trademark**, and our own authoring standard forbids claiming
   alignment we have not actually grounded. Doing it properly means
   working from the published sequence and labelling ourselves a
   supplement, not an affiliate. Do not build against it until the owner
   rules.
5. **"addition and subtraction within 20" (15,959 · 40K–75K · Promising,
   score 278)** — the math equivalent of our CVC opening, and the second
   Friday format when the CVC binder is done. "math intervention" (2,622,
   Moderate) is the weak head; the within-20 phrase is the door.
6. Ignore "my nerdy teacher" and "flying through phonics ufli" as
   targets — those are a store name and a specific product line; people
   searching them want that seller, not us.

---

# Pulls #9–#10 — sight words + progress monitoring (owner-run, 2026-09-03)

## Seed: sight words — 15,043 · 150K–300K · Moderate

| Related | Searches | Resources | Opportunity |
|---|---|---|---|
| **morning work** | **70,345** | >500K | **Promising** |
| cvc words | 10,043 | 150K–300K | Moderate |
| sight word practice | 6,043 | 150K–300K | Moderate |
| sight words worksheets | 2,579 | 75K–150K | Moderate |
| sight words kindergarten | 1,325 | 150K–300K | Challenging |
| sight word list | 1,246 | 20K–40K | Moderate |
| sight word flash cards | 967 | 20K–40K | Moderate |
| sight words list | 373 | 20K–40K | Challenging |
| sight words free | 180 | 20K–40K | Challenging |

**Verdict: sight words is the weaker twin of CVC.** Every phrase in the
family is Moderate or Challenging — not one Promising. This confirms
leading Friday with the CVC family instead. Sight words stays a tag.

**"morning work" (70,345 · Promising despite >500K resources, score 117)**
is a genuine compete-lane target and matches the "Morning Adapted Work
Binder" among the owner's screenshotted best-sellers. Backlog it as a
Friday format.

## Seed: progress monitoring — 2,010 · 20K–40K · Moderate

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **iep goal tracking** | **4,768** | **3K–8K** | **Strong** | **867** |
| **progress monitoring tracking sheet** | **4,174** | **3K–8K** | **Strong** | **759** |
| data tracker | 7,386 | 20K–40K | Strong | 246 |
| progress monitoring forms special education | 1,300 | 3K–8K | Promising | 236 |
| progress monitoring google sheets | 319 | 1K–3K | Promising | 160 |
| iep progress monitoring | 859 | 8K–20K | Promising | 61 |
| data tracking | 1,596 | 40K–75K | Moderate | 27 |
| data collection | 1,357 | 40K–75K | Moderate | 24 |
| progress monitoring iep | 35 | 3K–8K | Challenging | 6 |
| progress monitoring math | 61 | 8K–20K | Challenging | 4 |

## What pulls #9–#10 decide — this is the biggest finding since pull #4

1. **"iep goal tracking" (4,768 · 3K–8K · Strong) scores 867 — the second
   highest number in the entire dataset**, behind only the parent
   questionnaire (2,279). **"progress monitoring tracking sheet"
   (4,174 · 3K–8K · Strong) scores 759.** Both clear the under-3,000
   filter comfortably on the badge and sit in a resource band we can
   rank in.
2. **This family is the closest possible fit to what makes us different.**
   Our whole differentiator is turning collected data into next steps —
   the Growth Eval and the Group Snapshot already exist and already work.
   A data-tracking product is that capability sold directly, instead of
   bolted onto a phonics binder.
3. **These belong on SUNDAY, not Friday.** They are win-lane scores, not
   compete-lane. Put them at the top of `winnable-niches.md`, above take
   home folder (829) and happy mail (816).
4. Recommended first build: an **IEP Goal & Progress Monitoring Tracker**
   — goal pages, weekly data sheets, graph pages, plus the AI synthesis
   page ("here are six weeks of scores on this goal, de-identified —
   summarise the trend, say whether the goal is on pace, and draft the
   progress-report sentence"). That last step is the exact chore SPED
   teachers dread most, and no competitor is doing it.
5. **Caveat before building:** IEP work touches legally-binding
   documents. The product must be a *tracking tool*, never advice about
   what a goal should say or whether a student qualifies, and the AI
   half must stay de-identified. Same posture as the deaf-ed lane:
   pedagogy and paperwork support, never a legal or clinical opinion.
6. "data tracker" (7,386 · 20K–40K · Strong) is the broad-audience
   sibling — bigger, more crowded, worth a second product once the IEP
   one lands.

---

# Pull #11 — special education (owner-run, 2026-09-03)

## Seed: special education — 8,550 · >500K · Moderate

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| back to school | 259,703 | >500K | Strong | 433 |
| first day of school activities | 238,492 | >500K | Strong | 397 |
| all about me | 168,899 | 150K–300K | Strong | 751 |
| life skills | 10,397 | >500K | Moderate | 17 |
| autism | 4,648 | 150K–300K | Moderate | 21 |
| **special education morning meeting slides** | **2,006** | **3K–8K** | **Promising** | **365** |
| special education task boxes | 1,456 | 20K–40K | Moderate | 49 |
| **special education teacher planner** | **874** | **8K–20K** | **Promising** | **62** |
| special education visuals | 757 | 300K–500K | Challenging | 2 |
| special education free | 151 | 75K–150K | Very Difficult | 1 |

## What pull #11 decides

1. **"special education" itself is a tag, never a title** — 8,550 searches
   against >500K resources, Moderate. Confirms the deaf-ed lane's
   existing strategy of titling on self-advocacy and tagging SPED.
2. **"special education morning meeting slides" (2,006 · 3K–8K ·
   Promising, score 365)** is the one open door in this family — and it
   is the *third* independent signal this week pointing at **editable
   slides** as a format we don't yet produce (after "classroom
   procedures and routines powerpoint" 3,997/Strong and the general
   slides demand). Three separate families asking for slides is now a
   tooling decision, not a coincidence: **building a slides pipeline is
   worth a week of engineering.**
3. **"all about me" (168,899 · 150K–300K · Strong, score 751)** — enormous
   volume with a Strong badge. It is seasonal (back-to-school) and
   crowded, but the score is real. A compete-lane candidate for next
   August, not now; noted so we don't rediscover it late.
4. "special education teacher planner" (874 · 8K–20K · Promising) is a
   modest but clean opening that pairs naturally with the IEP tracker.
5. Confirmed traps: special education visuals (Challenging at
   300K–500K), special education free (Very Difficult), life skills and
   autism (Moderate at >150K).

---

# Pulls #12–#13 — iep data collection sheets · iep binder (owner-run, 2026-09-05)
Run against Friday's Priority 1 list. **These contain the largest single
finding in the dataset to date.**

## Seed: iep data collection sheets — 4,438 · 3K–8K · **Strong** · score **807**

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **iep at a glance** | **9,199** | **1K–3K** | **Strong** | **4,600** |
| **iep goal tracking** | **4,787** | **3K–8K** | **Strong** | **870** |
| **iep data tracker** | **1,586** | **1K–3K** | **Strong** | **793** |
| **iep binder** | **2,685** | **3K–8K** | **Strong** | **488** |
| data collection sheets | 2,622 | 8K–20K | Promising | 187 |
| iep data collection | 545 | 3K–8K | Moderate | 99 |
| iep data collection sheets free | 30 | <1K | Moderate | 60 |
| iep | 2,887 | 40K–75K | Moderate | 50 |

## Seed: iep binder — 2,702 · 3K–8K · **Strong** · score **491**

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **iep at a glance** | **9,199** | **1K–3K** | **Strong** | **4,600** |
| **iep snapshot** | **2,552** | **1K–3K** | **Strong** | **1,276** |
| **iep goal tracking** | **4,787** | **3K–8K** | **Strong** | **870** |
| **iep organization binder** | **408** | **<1K** | **Promising** | **816** |
| **iep data collection sheets** | **4,397** | **3K–8K** | **Strong** | **799** |
| **iep binder cover** | **930** | **1K–3K** | **Strong** | **465** |
| student iep binder | 285 | 3K–8K | Promising | 52 |
| iep | 2,887 | 40K–75K | Moderate | 50 |
| special education | 8,094 | >500K | Moderate | 13 |
| special education binder | 402 | 20K–40K | Moderate | 13 |

**Small drift between views, recorded rather than smoothed over:** the
seed pages report `iep data collection sheets` at 4,438 and `iep binder`
at 2,702, while the related-keyword tables show 4,397 and 2,685 for the
same phrases. Under 1% either way — TPT is aggregating over slightly
different windows. Seed-page numbers are treated as authoritative here.
Also note `special education` reads 8,094 today against 8,550 in pull
#11 two days ago; these figures move, so a stale number is worth
re-pulling before it decides anything.

## What pulls #12–#13 decide — bigger than pull #4

1. **`iep at a glance` (9,199 · 1K–3K · Strong) scores 4,600 — double
   the best number we had ever seen** (parent questionnaire, 2,279) and
   more than five times the phrase we were about to build on. It appears
   in *both* seeds' related lists, which means TPT sees it as central to
   how this whole family is searched, not as a fringe long-tail.
2. **`iep snapshot` (2,552 · 1K–3K · Strong, score 1,276) is the same
   artifact under a different name.** Two independent phrases, both
   Strong, both in the thin 1K–3K shelf, both describing a one-page
   student summary. Combined they are the clearest opening in the
   catalog.
3. **The shelf is genuinely thin.** 1K–3K resources against 9,199
   searches is the rarest shape in our data: real volume, little
   inventory, Strong badge. Every other big number we have found sat
   behind 20K+ competing products.
4. **`iep organization binder` (408 · <1K · Promising) scores 816** on a
   tiny search count, because almost nothing serves it. Worth a tag and
   a bundle name, not a title of its own.
5. **`iep binder` (2,702 · 3K–8K · Strong) scores 491** — respectable
   and Strong-badged, but *not* the headline we hoped for on Friday. The
   binder framing is justified by the price comparables ($37–$44 for
   binder-shaped products), not by this phrase's score. Bundle framing:
   yes. Lead title: no.
6. **The title question from Friday is now answered properly, and my
   Saturday reasoning on it was too confident.** The deep dive argued
   against "data collection" wording from the bare head term
   (`data collection`, 1,357 · 40K–75K · Moderate, score 24). The
   long-tail behaves completely differently: `iep data collection
   sheets` is 4,438 · 3K–8K · **Strong**, score **807** — nearly level
   with `iep goal tracking` at 870. The conclusion survives (goal
   tracking still leads by 63 points) but the reasoning behind it did
   not: a weak head term says nothing reliable about its long-tail.
   **Use both phrases in the title, not one.**
7. **Guardrail note, and it is a serious one.** An at-a-glance sheet is
   a container for a named student's confidential IEP data — the most
   sensitive artifact we have ever designed. See the brief for the
   handling requirements this imposes. The AI half in particular cannot
   work the way it does elsewhere.

---

# Pulls #14–#15 — iep meeting checklist · behavior tracking sheet (owner-run, 2026-09-05)

## Seed: iep meeting checklist — 382 · 1K–3K · Promising · score **191**

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **iep at a glance** | **9,199** | **1K–3K** | **Strong** | **4,600** |
| **iep data collection sheets** | **4,397** | **3K–8K** | **Strong** | **799** |
| **iep binder** | **2,685** | **3K–8K** | **Strong** | **488** |
| iep meeting agenda | 236 | <1K | Promising | 472 |
| iep checklist | 742 | 3K–8K | Promising | 135 |
| iep meeting notes | 391 | 3K–8K | Promising | 71 |
| iep | 2,887 | 40K–75K | Moderate | 50 |
| iep meeting | 155 | 8K–20K | Moderate | 11 |

**`iep at a glance` now appears in three separate seeds' related lists.**
Not a fringe long-tail — it is how this family is searched.

## Seed: behavior tracking sheet — 1,203 · 3K–8K · Promising · score **219**

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **free behavior tracker** | **1,322** | **<1K** | **Strong** | **2,644** |
| **abc data sheet** | **2,152** | **1K–3K** | **Strong** | **1,076** |
| **behavior tracker** | **10,030** | **8K–20K** | **Strong** | **716** |
| **behavior chart** | **19,284** | **20K–40K** | **Strong** | **643** |
| behavior data tracking sheet | 1,085 | 3K–8K | Promising | 197 |
| student behavior tracker | 952 | 3K–8K | Promising | 173 |
| behavior tracking | 917 | 8K–20K | Promising | 66 |
| behavior tracking sheet free | 10 | <1K | Moderate | 20 |
| behavior sheet | 485 | 20K–40K | Challenging | 16 |

## What pulls #14–#15 decide

1. **The IEP-meeting free is dead — and the data killed it, not a hunch.**
   `iep meeting checklist` scores **191**; the whole meeting cluster is
   weak (agenda 472 on 236 searches, notes 71, meeting 11). Saturday's
   brief guessed this was the free to cut if time ran short. It was
   right, and now it is measured. **Cut it.**

2. **`free behavior tracker` scores 2,644 — the second best number in the
   entire dataset**, behind only `iep at a glance`. 1,322 searches
   against **under 1,000 competing resources**, Strong badge.
   The word *free* is in the query: these teachers are looking for a
   free download, which is exactly what our free lane is for. A free
   listing is the cheapest thing we build and this is the highest-scoring
   free target we have ever found.

3. **`abc data sheet` (2,152 · 1K–3K · Strong) scores 1,076.** ABC —
   antecedent, behavior, consequence — is the standard structure for
   recording an incident before writing a behavior plan. Thin shelf,
   Strong badge, real professional need. A paid product in its own right.

4. **The behavior family is broad as well as deep**: `behavior tracker`
   10,030 (716) and `behavior chart` 19,284 (643) both carry Strong
   badges at high volume. Compare `classroom rules` — 18,509 searches at
   score 82. Similar volume, completely different opportunity.

5. **This is a second family worth holding, not a one-off.** It sits
   beside the IEP data family rather than competing with it: the same
   special education and classroom-management buyer needs both, so the
   two cross-sell. Recommend the behavior pack as the next lane-5 build
   after today.

---

# Pull #16 — homeschool record keeping (owner-run, 2026-09-05)

## Seed: homeschool record keeping — 269 · 1K–3K · Promising · score **135**

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **homeschool attendance sheet** | **655** | **<1K** | **Promising** | **1,310** |
| homeschool planner | 2,034 | 20K–40K | Promising | 68 |
| homeschool portfolio | 209 | 3K–8K | Moderate | 38 |
| homeschool schedule | 667 | 20K–40K | Moderate | 22 |
| homeschool daily log | 16 | 1K–3K | Challenging | 8 |
| homeschool | 2,835 | >500K | Challenging | 5 |
| homeschool trackers | 26 | 20K–40K | Very Difficult | 1 |

## What pull #16 decides — lane 2 finally has a real door

1. **`homeschool attendance sheet` (655 · <1K · Promising) scores
   1,310** — **nineteen times** the planner it replaces. Under 1,000
   competing resources is the thinnest shelf in our entire dataset
   alongside `free behavior tracker`. Attendance records are legally
   required for homeschoolers in many states, which is the kind of
   must-do search that converts rather than browses.

2. **The planner is not just weak, it is shrinking.** `homeschool
   planner` reads **2,034** today against **2,415** in pull #7 on
   2026-09-03 — down 16% — and its score has slipped from 81 to **68**.
   We built two products against that phrase. Both keep their listings,
   but nothing further should be built on it.

3. **This reverses the lane-2 decision made hours earlier.** The
   Saturday deep dive recommended lane 2 sit out this week, explicitly
   because the three replacement doors were unrun and a third planner
   re-cut was not worth shipping. One of those three came back at 1,310.
   **Lane 2 is back in today's drop**, and the reasoning that put it out
   is the same reasoning that puts it back: the ranking decides.

4. **Keep the lane's size honest.** Pull #7's finding still holds — the
   homeschool family is 5–10× smaller than the classroom families, and
   655 searches is modest in absolute terms. The score is excellent
   because the shelf is nearly bare, not because the demand is large.
   The right response is a free or a low-priced item that owns an empty
   shelf, not a flagship.

5. Everything else in this seed is a trap: `homeschool` (5),
   `homeschool trackers` (1, Very Difficult), `homeschool daily log`
   (8, Challenging). The record-keeping seed itself scores 135 and is a
   tag, not a title. **`attendance sheet` is the whole finding.**

---

# Pulls #17–#19 — service minute tracker · homeschool transcript · student data binder (owner-run, 2026-09-05)

Three mostly negative results. They are worth as much as the positive
ones: each closes an open question and prevents a wasted build.

## Seed: service minute tracker — **13** · <1K · Moderate · score 26

Dead. Thirteen searches in a month.

**This was my speculative pick and it was wrong.** Friday's list put it
in Priority 2 on the strength of back-to-school resource roundups
pairing service minute tracking with progress monitoring. That signal
did not survive contact with TPT's data. **A practitioner blog
mentioning a chore is not evidence that teachers search for a product to
solve it.** Worth remembering the next time a web roundup looks
persuasive: the roundup is written by one person; the search data is
thousands of teachers.

## Seed: homeschool transcript — **50** · 1K–3K · Moderate · score 25

Dead, and it settles lane 2. Friday's list ranked transcript as a
serious contender against attendance sheet — "high-stakes document,
parents pay for certainty." Wrong: 50 searches, Moderate.
**`homeschool attendance sheet` (1,310) is lane 2's door, and it is the
only one.** Transcript and record keeping (135) are both out.

## Seed: student data binder — 1,465 · 8K–20K · Moderate · score **105**

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **sub binder** | **16,738** | **8K–20K** | **Strong** | **1,196** |
| data binder cover | 1,547 | 3K–8K | Promising | 281 |
| data tracker | 7,316 | 20K–40K | Strong | 244 |
| data binder | 2,170 | 8K–20K | Promising | 155 |
| student data binder cover | 633 | 3K–8K | Promising | 115 |
| free data binder | 220 | 1K–3K | Moderate | 110 |
| student data tracker | 2,601 | 20K–40K | Promising | 87 |
| student data tracking sheets | 1,062 | 8K–20K | Moderate | 76 |
| teacher data binder | 407 | 8K–20K | Moderate | 29 |
| student data | 748 | 300K–500K | Challenging | 2 |

## What pulls #17–#19 decide

1. **Do not widen the tracker to general education.** This was Friday's
   question #8: does the IEP data product's frame stretch to any teacher
   tracking any goal, tripling the audience? **No.** The general-ed
   version of this family tops out at 281 (`data binder cover`) and its
   head phrase carries a Moderate badge. The IEP version of the same
   idea scores **4,600**. The specificity *is* the opportunity — widening
   the title would trade a 4,600 phrase for a 105 one.

2. **`sub binder` grew 26% and is in season.** 16,738 searches today
   against 13,284 in the 08-26 pull, still 8K–20K and Strong — score up
   to **1,196**. We already sell the Substitute Binder ($8, shipped
   08-30). This is not a new build; it is a signal that an existing
   listing's phrase is strengthening right when substitute season ramps.
   **Action: refresh that listing's tags and description toward
   `sub binder` as the lead phrase, and consider a seasonal push.**
   Cheapest win available — the product already exists.

3. **`data tracker` (7,316 · 20K–40K · Strong, 244)** holds up as the
   broad sibling but is a tag, not a title. Unchanged from pull #10.

4. **Three of Friday's fifteen phrases are now closed as dead ends**
   (service minute tracker, homeschool transcript, student data binder).
   That is a good evening's work: the list is doing its job when it
   kills ideas as efficiently as it finds them.

---

# Pull #20 — classroom newsletter (owner-run, 2026-09-05)

## Seed: classroom newsletter — 1,603 · 20K–40K · Moderate · score **53**

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **weekly newsletter template editable** | **6,688** | **3K–8K** | **Strong** | **1,216** |
| **newsletter template editable** | **9,854** | **8K–20K** | **Strong** | **704** |
| meet the teacher | 66,280 | 150K–300K | Strong | 295 |
| weekly newsletter | 3,801 | 8K–20K | Promising | 272 |
| newsletter | 8,597 | 40K–75K | Promising | 150 |
| classroom newsletter template | 885 | 8K–20K | Promising | 63 |
| teacher newsletter | 639 | 20K–40K | Moderate | 21 |
| classroom newsletter free | 3 | 3K–8K | Challenging | 0.5 |
| classroom news | 80 | 300K–500K | Very Difficult | 0.2 |

## What pull #20 decides — the theme was right, the format was wrong

1. **The head phrase is a trap, as expected.** `classroom newsletter`
   scores **53** on a Moderate badge. It held one test slot on Friday's
   list precisely so it could fail cheaply, and it did.

2. **But one word changes everything: EDITABLE.**

   | Phrase | Score | Badge |
   |---|---|---|
   | classroom newsletter | 53 | Moderate |
   | newsletter template editable | **704** | **Strong** |
   | weekly newsletter template editable | **1,216** | **Strong** |

   Same topic, ~23× the score, and the badge flips from Moderate to
   Strong. Teachers are not shopping for a newsletter. They are shopping
   for a newsletter **they can type into**.

3. **This is the fourth independent signal for editable formats**, and
   the strongest yet:
   - classroom procedures and routines powerpoint — 3,997 · Strong (727)
   - special education morning meeting slides — 2,006 · Promising (365)
   - newsletter template editable — 9,854 · Strong (**704**)
   - weekly newsletter template editable — 6,688 · Strong (**1,216**)

   Four families, four different audiences, one missing capability.
   **We cannot ship any of them today** — we produce flat PDF. This is
   now the clearest case in the data for the engineering week already
   scheduled for 09-07.

4. **"Free" is not a magic word.** `classroom newsletter free` returns
   **3 searches** at Challenging, while `free behavior tracker` returns
   1,322 at Strong. Teachers hunt for free *tools*; they do not hunt for
   free *stationery*. Do not generalize the behavior-free finding into a
   rule that prefixing "free" helps anywhere.

5. **`meet the teacher` (66,280 · 150K–300K · Strong, 295)** — another
   seasonal giant. Tag only, next August, same as `all about me` and
   `back to school`. Recorded so we do not rediscover it late.

6. **Nothing here changes today's drop.** Every phrase worth having
   requires an editable artifact we cannot yet produce. The newsletter
   theme comes back the week the pipeline ships, and it comes back
   titled on `editable`, not on `classroom newsletter`.

---

# Pulls #21–#22 — open house · parent teacher conference forms (owner-run, 2026-09-05)

## Seed: open house — 19,358 · 40K–75K · Strong · score **337**

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **open house stations** | **3,920** | **1K–3K** | **Strong** | **1,960** |
| **all about me** | **167,556** | **75K–150K** | **Strong** | **1,489** |
| **open house scavenger hunt** | **2,371** | **1K–3K** | **Strong** | **1,186** |
| open house forms | 7,297 | 8K–20K | Strong | 521 |
| back to school | 242,633 | >500K | Strong | 404 |
| first day of school activities | 228,281 | >500K | Strong | 380 |
| open house slides | 4,775 | 8K–20K | Promising | 341 |
| meet the teacher | 66,280 | 150K–300K | Strong | 295 |
| back to school night | 10,687 | 40K–75K | Promising | 186 |
| open house activities | 1,693 | 8K–20K | Moderate | 121 |

## Seed: parent teacher conference forms — 2,212 · 8K–20K · Promising · score **158**

| Related | Searches | Resources | Opportunity | Win score |
|---|---|---|---|---|
| **parent teacher conference sign up** | **685** | **<1K** | **Promising** | **1,370** |
| parent communication log | 7,545 | 8K–20K | Strong | 539 |
| conference sign up | 331 | 1K–3K | Promising | 166 |
| parent teacher communication log | 705 | 3K–8K | Promising | 128 |
| parent teacher conference form editable | 632 | 3K–8K | Promising | 115 |
| parent teacher conference reminder | 136 | 1K–3K | Moderate | 68 |
| parent teacher conference | 583 | 8K–20K | Moderate | 42 |
| parent teacher conference forms free | 14 | 1K–3K | Challenging | 7 |
| free parent teacher conference forms | 8 | 1K–3K | Challenging | 4 |

## What pulls #21–#22 decide — two great families, opposite timing

1. **Open house scores beautifully and we have missed the window.**
   `open house stations` **1,960** and `open house scavenger hunt`
   **1,186**, both Strong on a 1K–3K shelf. Excellent numbers. But look
   at the trend line, not the total: searches peaked around Aug 19 at
   ~1,250/day and have fallen to roughly 100/day by Sep 4. The 19,358
   monthly figure is a receipt for a season that is closing, not a
   forecast. **Building this today lands at the tail.**
   → **Log for JULY.** Open house products must be listed by late July
   to catch the ramp. Put it at the top of the summer queue with the
   scores attached so next year's decision is already made.

2. **Parent teacher conference sign up scores 1,370 and the timing is
   exactly right.** 685 searches against **under 1K resources**.
   Conferences run late October into November, so a September or early
   October build lands ahead of the ramp rather than behind it.
   → **Strong candidate for next Sunday's lane-1 build**, and it sits in
   the family-communication cluster where we already hold two products.

3. **Win scores move, and one of ours moved against us.** Our shipped
   Parent Communication Log ($6) validated at 7,570 · **3K–8K** ·
   Strong, score 1,376. Today the same phrase reads 7,545 · **8K–20K** ·
   Strong — score **539**. Search volume is flat; the shelf filled up.
   Meanwhile `all about me` moved the other way: 150K–300K in pull #11,
   **75K–150K** today, score 751 → **1,489**.
   **This is a real limitation of the method.** A win score is a
   snapshot of a shelf that other sellers are actively stocking, not a
   permanent property of a phrase. Any score older than a few weeks
   should be re-pulled before it decides a build, and the ranking table
   should carry the date each row was measured.

4. **"Free" fails again, twice.** `parent teacher conference forms free`
   14 searches, `free parent teacher conference forms` 8 — both
   Challenging. Third and fourth confirmations that the behavior-tracker
   result does not generalize.

5. **`all about me` at 1,489 is now the strongest seasonal row we hold**,
   but it is squarely an August product. Same July queue as open house.

---

# Pulls #23–#27 — Wednesday lanes 3 & 4 Priority 1 (owner-run, 2026-09-08)

The list asked one question: **do lanes 3 and 4 have a thin shelf
anywhere?** Answer: lane 3 no, lane 4 exactly one.

| Seed | Searches | Resources | Badge | Score | Verdict |
|---|---|---|---|---|---|
| market day | 89 | 8K–20K | Moderate | **6** | dead |
| classroom economy | 1,022 | 8K–20K | Promising | **73** | too crowded to surface |
| dhh | 135 | 1K–3K | Moderate | **68** | fails the badge filter |
| **deaf awareness month** | **274** | **<1K** | **Promising** | **274** | **BUILD — in season now** |
| audiogram | 32 | <1K | Promising | **64** | empty room — tags, not a product |

## Seed: market day — 89 · 8K–20K · Moderate · score 6
`market day project` 4 · 1K–3K · Challenging (2).

**We already built a Market Day unit.** The phrase gets 89 searches a
month against an 8K–20K shelf. This is the clearest evidence in the
whole dataset for why the validate-before-build rule exists, and it is
our own product. Nothing to fix — the unit is decent and it stays
listed — but it will not be found, and no further lane-3 work should
assume market day is a door.

## Seed: classroom economy — 1,022 · 8K–20K · Promising · score 73

| Related | Searches | Resources | Badge | Score |
|---|---|---|---|---|
| classroom jobs | 28,414 | 40K–75K | Strong | 494 |
| class economy | 366 | 3K–8K | Promising | 67 |
| classroom economy system | 334 | 3K–8K | Promising | 61 |
| classroom money | 1,123 | 150K–300K | Challenging | 5 |
| classroom store | 497 | 150K–300K | Challenging | 3 |

`classroom jobs` has the volume (28,414, Strong) but sits on a 40K–75K
shelf — unreachable for an unranked store. Everything else is small or
Challenging. **Lane 3 has no thin shelf.**

## Seed: dhh — 135 · 1K–3K · Moderate · score 68
Only two related terms returned: `deaf` 155 · 75K–150K · Very Difficult,
and `back to school`.

**The abbreviation hypothesis was half right.** The shelf under `dhh`
*is* thin (1K–3K) — but the badge is Moderate and the volume is 135, so
it fails the hard filter. Worth keeping as a tag, which we already do.
Not worth a retitle.

## Seed: deaf awareness month — 274 · **<1K** · **Promising** · score 274

| Related | Searches | Resources | Badge | Score |
|---|---|---|---|---|
| **hispanic heritage month** | **30,720** | 20K–40K | Strong | **1,024** |
| asl | 2,319 | 20K–40K | Promising | 116 |
| asl posters | 274 | 3K–8K | Promising | 50 |
| deaf culture | 106 | 3K–8K | Moderate | 35 |
| deaf awareness | 161 | 3K–8K | Moderate | 29 |
| american sign language | 492 | 20K–40K | Moderate | 25 |
| deaf awareness month bulletin board | 5 | <1K | Moderate | 10 |
| asl bulletin board | 24 | 3K–8K | Challenging | 8 |
| deaf history | 33 | 20K–40K | Challenging | 2 |
| deaf | 155 | 75K–150K | Very Difficult | 2 |

**This is the one build.** Under 1K resources, Promising badge, and the
trend line shows it going live *right now*: essentially flat through
August, then climbing to roughly 50 searches/day between Aug 31 and
Sep 4. September is Deaf Awareness Month. The demand is happening this
week.

Score 274 is modest by our recent standards, but on the corrected
doctrine — a thin shelf is where an unranked store can actually appear —
it beats every lane-3 row by a factor of four or more.

## Seed: audiogram — 32 · <1K · Promising · score 64

| Related | Searches | Resources | Badge | Score |
|---|---|---|---|---|
| speech banana audiogram | 36 | <1K | Promising | 72 |
| audiograms | 10 | <1K | Moderate | 20 |
| audiogram of familiar sounds | 7 | <1K | Moderate | 14 |
| understanding audiogram | 5 | <1K | Moderate | 10 |
| blank audiogram | 3 | <1K | Moderate | 6 |

**Empty room, and the list predicted this exact failure mode**
("does going more specific find open water, or just an empty room?").
Every shelf is <1K, but the whole cluster is about 93 searches a month.
Thin shelf plus no demand is not an opportunity.

Two things worth keeping: `speech banana audiogram` (36) slightly
*exceeds* its own head term, and the speech banana — the region of an
audiogram where speech sounds fall — is a standard teacher-training
visual. **It earns a page inside a gen-ed briefing, and the cluster
earns tags. It does not earn a listing.**

## Hispanic Heritage Month — recommending we do not build it

`hispanic heritage month` returned **30,720 · 20K–40K · Strong, score
1,024**, and it runs Sept 15 – Oct 15, starting in about a week.

**Recommend no, on two grounds.**

The business one: a 20K–40K shelf is not somewhere an unranked store
surfaces, and one week is not enough time to build something good.

The one that actually decides it: **this is outside our competence.**
Our lines are AI practice, special education, deaf education and
classroom operations. Hispanic Heritage Month content is culturally
significant material that deserves authors with relevant expertise and
lived experience. Producing it because a keyword scored well would be
both bad business and disrespectful. Logged as *not our lane* rather
than as a July backlog item.
