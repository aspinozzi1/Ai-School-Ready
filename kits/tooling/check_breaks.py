#!/usr/bin/env python3
"""Find paragraphs or sections split across a page boundary.

Usage:  python3 kits/tooling/check_breaks.py file.pdf [...]

House rule (owner audit 2026-08-07, reaffirmed 2026-08-24): no sentence or
paragraph splits across pages, and no heading stranded at the bottom of a
page. This checks the rendered geometry: for each page boundary, the last
content line of the page and the first content line of the next.

Heuristics (tuned to the brand.css layout, Letter with header/footer bands):
- mid-paragraph split: last content line does not end in terminal
  punctuation (.!?:;") and the next page's first content line starts with a
  lowercase letter or is an obvious continuation;
- orphan heading: the page's last content line is heading-sized text.

Exit code 1 when anything is flagged, so it can gate a build. Expect to eye
each flag before "fixing": list items and table rows can false-positive.
"""
import sys
import re
import pymupdf

TERMINAL = re.compile(r'[.!?:;"”’)\]]\s*$')
FOOT_Y = 740      # content below this is the footer band (Letter = 792pt)
HEAD_Y = 52       # content above this is the header band

def content_lines(page):
    lines = []
    for block in page.get_text('dict')['blocks']:
        if block.get('type') != 0:
            continue
        for line in block['lines']:
            y = line['bbox'][1]
            if y < HEAD_Y or y > FOOT_Y:
                continue
            text = ''.join(s['text'] for s in line['spans']).strip()
            if not text:
                continue
            size = max(s['size'] for s in line['spans'])
            lines.append((y, text, size))
    lines.sort(key=lambda t: t[0])
    return lines

def is_plate(page):
    # full-bleed image page (previews, cover plates): overlay text only, no flow
    for img in page.get_images(full=True):
        try:
            for r in page.get_image_rects(img[0]):
                if r.width > 500 and r.height > 700:
                    return True
        except Exception:
            pass
    return False

def split_cards(page, nxt):
    # A split card/callout/letter renders as a box clipped at the bottom of
    # the content area (brand.css table layout: y1 ~= FOOT_Y; plain layouts:
    # y1 = page bottom) whose continuation opens the next page at content top
    # with the same width. Match the pair, not either half alone: every page
    # has full-height frame rects, and a legit card can happen to end low.
    def rects(p):
        # width < 590 drops full-page-width frames and header/footer bands
        return [d['rect'] for d in p.get_drawings()
                if 200 < d['rect'].width < 590 and d['rect'].height > 10]
    clipped = [r for r in rects(page)
               if r.y1 >= FOOT_Y - 2 and r.y0 > HEAD_Y + 5 and r.height > 24]
    cont = [r for r in rects(nxt) if r.y0 <= 85 and r.y1 < FOOT_Y - 2]
    hits = []
    for r in clipped:
        if any(abs(c.width - r.width) <= 4 for c in cont):
            hits.append(r)
    return hits

flags = 0
for path in sys.argv[1:]:
    doc = pymupdf.open(path)
    for i in range(len(doc) - 1):
        if is_plate(doc[i]) or is_plate(doc[i + 1]):
            continue
        for r in split_cards(doc[i], doc[i + 1]):
            print(f'{path} p{i+1}->p{i+2}  SPLIT CARD/BOX at y={r.y0:.0f} (h={r.height:.0f})')
            flags += 1
        cur, nxt = content_lines(doc[i]), content_lines(doc[i + 1])
        if not cur or not nxt:
            continue
        last_y, last_text, last_size = cur[-1]
        first_text = nxt[0][1]
        if last_size >= 13.5:
            print(f'{path} p{i+1}->p{i+2}  ORPHAN HEADING: "{last_text[:70]}"')
            flags += 1
            continue
        if not TERMINAL.search(last_text) and (first_text[:1].islower() or last_text.endswith('-')):
            print(f'{path} p{i+1}->p{i+2}  SPLIT PARAGRAPH: "...{last_text[-60:]}" -> "{first_text[:60]}..."')
            flags += 1
print('flags:', flags)
sys.exit(1 if flags else 0)
