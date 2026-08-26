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
