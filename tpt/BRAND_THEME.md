# Bright Scholar — the AI-Ready School brand theme

One theme across every TpT product: professional AND fun, school and AI
integrated. This file is the single source of truth; every generator
(kits, covers, pins, decks) implements it.

## The character: the intern

`public/brand/ai-buddy.svg`. The kits already teach that AI is a first-year
intern — drafts fast, doesn't know your students, never gets the final say.
The mascot IS that character: a friendly robot with an AI sparkle antenna and
a **pencil badge** on its chest, because the intern drafts and the teacher
decides. Flat fills, one heavy ink outline, friendly but not babyish.

Where it appears: every kit cover (bottom-right, via `brand-v3.css`, no HTML
edits), TpT covers, pins, and the deck title slide. Never inside worksheet
bodies — it brands the product, it doesn't decorate the content.

## Palette

| Token | Hex | Role |
|---|---|---|
| ink | `#17293B` | text, bands, the professional spine (v1 brand equity) |
| school blue | `#2D6CB5` | friendly primary: slide pills, kickers, table heads |
| teal | `#17BEBB` | the intern's colour: badges, checks, Rivera lines |
| sunny | `#FFC43D` | highlighter: h2 chips, band underline, rule borders |
| tomato | `#E4572E` | sparingly: warnings, ✘ marks, one rainbow stripe |
| cream | `#FFFDF8` | page ground |

Cover rainbow bar: tomato → sunny → teal → school blue, 0.24in, bottom edge.

## Type

- **Fredoka** (500/600) — display: h1-h3, cover titles, slide-cue pills.
  The friendly voice.
- **Nunito** (400-800) — body. Warm, fast to read, never slows a facilitator.
- Handwriting/script faces: **decorative only, never instructions.** Stage
  directions stay italic sans (measured: script faces read slower live).
- Decks ship as editable .pptx, so deck body type must be a universal font;
  Fredoka lives only on rendered images (cover slide art), not in text boxes.

## The three-layer loudness rule

What the reference stores actually do: loud storefront, clean printable.

1. **Pins / social (loudest)** — saturated field, outlined display type,
   doodles, fanned real pages. `tpt/make_pins.js`.
2. **Covers / listing images (middle)** — ink ground, Fredoka, sunny badge,
   rainbow bar, the intern. `tpt/make_covers.js` + kit cover pages.
3. **Kit interiors (professional + warm)** — `kits/tooling/brand-v3.css`
   ("Bright Scholar"): sunny h2 chips, rounded cards, blue slide pills,
   cream page. A principal can put it in front of a school board.

## Hard rules

- The One Hard Rule slab is always ink-on-navy with the sunny border — the
  loudest object in any interior document, everywhere the same.
- Admin one-pager and References stay at the quiet end of layer 3: same
  tokens, no extra play. Different reader, different job.
- Legal blocks are never trimmed to fit a page; marketing copy is.
- Every retrofit must hold v1 pagination (dry-run in `kits/_proto3/`,
  verify page counts + extracted text before touching a kit).
