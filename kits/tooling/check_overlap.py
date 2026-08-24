#!/usr/bin/env python3
"""Find slides where two pieces of text render on top of each other.

Usage:  python3 kits/tooling/check_overlap.py kits/kit03/Kit03_PresentationDeck.pptx
        python3 kits/tooling/check_overlap.py somewhere/deck.pdf

Why this exists: pptxgenjs never wraps or shrinks text to fit its box, so a
long title, a long kicker, or a card line that outgrew its slot silently
prints through whatever sits beneath it. The owner caught a deck full of
these in the 2026-08-14 audit; the eye misses them at thumbnail size, so we
check the rendered geometry instead.

A .pptx is converted with LibreOffice first (same path the QA pass uses).
Exit code is 1 when anything overlaps, so this can gate a build.

Expect a few false positives from stacked stat blocks (a big number with a
caption tucked under it). Look at the slide before "fixing" one.
"""
import os
import subprocess
import sys
import tempfile

import pymupdf

MIN_SIDE = 3.0    # points of overlap on both axes before it counts
MIN_AREA = 60.0   # square points; below this it is kerning noise, not a collision


def as_pdf(path):
    if path.lower().endswith('.pdf'):
        return path, None
    tmp = tempfile.mkdtemp(prefix='overlapqa-')
    subprocess.run(
        ['libreoffice', '--headless', '--convert-to', 'pdf', '--outdir', tmp, path],
        check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    out = os.path.join(tmp, os.path.splitext(os.path.basename(path))[0] + '.pdf')
    if not os.path.exists(out):
        raise SystemExit('could not convert %s' % path)
    return out, tmp


def text_lines(page):
    """Every rendered line of text with its own tight box.

    Compare lines, not blocks. A block's box carries paragraph padding, so two
    text frames stacked inside one card overlap at block level while rendering
    perfectly; that noise buried the real hits when this ran block-wise. Line
    boxes hug the glyphs, so an intersection means ink genuinely printed over
    ink. Checked against a known-bad build: line level found all 16 real
    collisions and none of the stacked-card false positives.
    """
    out = []
    for block in page.get_text('dict')['blocks']:
        if block.get('type') != 0:
            continue
        for line in block.get('lines', []):
            text = ''.join(s['text'] for s in line['spans']).strip()
            if text:
                out.append((pymupdf.Rect(line['bbox']), text))
    return out


def collisions(pdf):
    doc = pymupdf.open(pdf)
    found = []
    for pno, page in enumerate(doc, start=1):
        lines = text_lines(page)
        for i in range(len(lines)):
            for j in range(i + 1, len(lines)):
                hit = lines[i][0] & lines[j][0]
                if hit.is_empty:
                    continue
                if (hit.width > MIN_SIDE and hit.height > MIN_SIDE
                        and hit.get_area() > MIN_AREA):
                    found.append((pno, hit.get_area(),
                                  lines[i][1][:44], lines[j][1][:44]))
    doc.close()
    return found


def main(argv):
    if not argv:
        raise SystemExit(__doc__)
    total = 0
    for target in argv:
        pdf, tmp = as_pdf(target)
        hits = collisions(pdf)
        total += len(hits)
        name = os.path.basename(target)
        if hits:
            print('%s: %d overlapping text blocks' % (name, len(hits)))
            for pno, area, one, two in hits:
                print('   slide %-3d area=%-7d %-46s || %s' % (pno, round(area), one, two))
        else:
            print('%s: clean' % name)
        if tmp:
            subprocess.run(['rm', '-rf', tmp], check=False)
    return 1 if total else 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
