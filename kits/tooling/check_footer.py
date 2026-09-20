#!/usr/bin/env python3
"""Flag page content that runs past the sheet's bottom padding.

Why this exists, separately from check_overlap.py: `.sheet` is a fixed
11in box with `overflow:hidden`, and `.foot` is absolutely positioned on
top of it. So an overfull page does not push anything anywhere -- the
excess is silently clipped at the paper edge and the footer paints
straight through whatever is still visible. Nothing errors, nothing
reflows, and the PDF renders.

check_overlap.py compares TEXT blocks against each other, so it cannot
see this: the thing crossing the footer is usually a card BORDER (a
drawing) or a write-on rule, and the clipped part is not in the file at
all. Drop 54 shipped with two student pages broken this way and all four
gates passed.

Usage: python3 kits/tooling/check_footer.py file.pdf [...]
"""
import sys
import fitz

PAGE_H, PAGE_W = 792.0, 612.0
BOTTOM = PAGE_H - 0.5 * 72          # .sheet bottom padding: 36pt
FOOTER_WORDS = ('Bright Scholar', 'AI-Ready School', 'certified teachers')

CHROME = 32.0       # tallest bottom bar in the design system (9, 13, 26, 31pt)

def is_backdrop(r):
    """Page chrome, not content: the sheet background or a bottom bar.

    Bars vary by template -- the product sheet draws four 13pt segments,
    the preview one full-width 31pt band -- so a width test alone calls
    each segment a violation. That produced 52 false alarms on the CVC
    binder and 5 on this product's own preview before the rule was
    written this way: chrome is anything lying wholly inside the bottom
    band, anything bottom-aligned and shorter than the band, or the
    sheet background itself."""
    if r.y0 >= PAGE_H - CHROME:                       # wholly in the band
        return True
    if r.y1 >= PAGE_H - 1 and r.height <= CHROME:     # bottom-aligned bar
        return True
    return r.width > 0.9 * PAGE_W and r.height > 0.9 * PAGE_H

def is_footer_text(t):
    t = t.strip()
    return (any(w in t for w in FOOTER_WORDS)
            or ' · ' in t and len(t) < 60 and t.count('\n') == 0)

flags = 0
for path in sys.argv[1:]:
    doc = fitz.open(path)
    for i, page in enumerate(doc, 1):
        worst = []
        for b in page.get_text('blocks'):
            t = b[4].strip().replace('\n', ' ')
            if t and not is_footer_text(t) and b[3] > BOTTOM:
                worst.append((b[3], 'text', t[:46]))
        for d in page.get_drawings():
            r = d['rect']
            if r.y1 > BOTTOM and r.height > 2 and r.width > 20 and not is_backdrop(r):
                worst.append((r.y1, 'box', f'{r.width:.0f}x{r.height:.0f}pt starting at y={r.y0:.0f}'))
        if worst:
            flags += 1
            y, kind, what = max(worst)
            over = y - BOTTOM
            clipped = ' AND IS CLIPPED BY THE PAGE EDGE' if y > PAGE_H else ''
            print(f'{path}  page {i}: {kind} runs {over:.0f}pt past the '
                  f'bottom margin{clipped} -- {what}')
print('footer collisions:', flags)
sys.exit(1 if flags else 0)
