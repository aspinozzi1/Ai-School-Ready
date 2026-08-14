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

MIN_SIDE = 3.0     # points of overlap on both axes before it counts
MIN_AREA = 150.0   # square points; below this it is kerning noise, not a collision


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


def collisions(pdf):
    doc = pymupdf.open(pdf)
    found = []
    for pno, page in enumerate(doc, start=1):
        blocks = [b for b in page.get_text('blocks') if b[6] == 0 and b[4].strip()]
        for i in range(len(blocks)):
            for j in range(i + 1, len(blocks)):
                a, b = blocks[i], blocks[j]
                dx = min(a[2], b[2]) - max(a[0], b[0])
                dy = min(a[3], b[3]) - max(a[1], b[1])
                if dx > MIN_SIDE and dy > MIN_SIDE and dx * dy > MIN_AREA:
                    found.append((pno, dx * dy,
                                  ' '.join(a[4].split())[:44],
                                  ' '.join(b[4].split())[:44]))
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
