# Canva sources — Bright Scholar

HTML page sources for the Canva side of the Bright Scholar brand
(see `tpt/BRAND_THEME.md`, the single source of truth). Each file is
imported into Canva via the Connect import API (raw GitHub URL); every
`data-document-role="page"` element becomes one editable Canva page.

| File | Canva design | Size |
|---|---|---|
| `intern-canvas.html` | blank canvas the mascot is rebuilt on as **native editable vector shapes** | 1000×1050 |
| `brand-kit.html` | Bright Scholar Brand Kit (cover, palette, type, mascot, loudness system) | 1920×1080 ×5 |
| `covers.html` | TPT cover templates (paid kit + free resource variants) | 1000×1000 ×2 |
| `pins.html` | Pinterest pin templates (teal / school blue / tomato fields) | 1000×1500 ×3 |

Fonts: Fredoka (display), Nunito (body), Luckiest Guy (layer-1 pin display) —
all present in Canva's font library, so imported text stays on-brand and editable.

The mascot (`public/brand/ai-buddy.svg`) is inlined in each page and also
uploaded to the Canva media library as a standalone asset.
