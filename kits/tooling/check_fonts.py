#!/usr/bin/env python3
"""Gate: every shipping PDF must actually embed the Bright Scholar faces.

Usage: check_fonts.py [file.pdf ...]      (default: all PDFs under UPLOAD/)

Why this exists (audit 2026-09-11). The brand fonts were never committed to
the repo -- they came from an ephemeral scratchpad or a node_modules that may
or may not exist in a given container. When they were missing, Chromium
silently substituted Liberation Sans and the build "succeeded". Three
containers produced three different results and nothing noticed:

  Wednesday 09-09 drop ....... LiberationSans only -- no brand face at all
  Sunday 09-06 drop .......... Inter (that container had node_modules)
  CVC binder (the reference) . LuckiestGuy, but NOT Fredoka and NOT Nunito

A silent fallback is the worst kind of failure: the PDF opens, the gates pass,
and the product just looks wrong. This gate makes that state loud.

A PDF passes when it embeds at least one brand face and NO fallback face.
Fallbacks are the tell: their presence means some run of text found no brand
font. Documents that legitimately carry no text (pure image pages) pass.
"""
import re
import sys
import pathlib

try:
    import pymupdf
except ImportError:  # older name
    import fitz as pymupdf

BRAND = ('fredoka', 'nunito', 'luckiestguy', 'luckiest guy')
# Substitutes Chromium reaches for when a declared face is unavailable.
FALLBACK = ('liberation', 'freesans', 'notosans', 'arial',
            'helvetica', 'timesnewroman', 'inter')
# Monospace is a deliberate choice, not a substitution: code and prompt blocks
# need a fixed-pitch face and the Bright Scholar set has none. Allowed on its own,
# never as a stand-in for body text -- a PDF with ONLY a mono face still fails the
# "no brand face" check below. (Added 2026-09-12 with the build-along line, which
# prints code a teacher has to read character by character.)
ALLOWED_MONO = ('dejavusansmono', 'couriernew', 'liberationmono')

def faces(doc):
    out = set()
    for i in range(doc.page_count):
        for f in doc.get_page_fonts(i):
            name = f[3].split('+')[-1].strip()
            if name:
                out.add(name)
    return out

def main(argv):
    paths = [pathlib.Path(a) for a in argv if not a.startswith('-')]
    if not paths:
        root = pathlib.Path(__file__).resolve().parents[2]
        paths = sorted((root / 'UPLOAD').rglob('*.pdf'))
        print(f"(no paths given — scanning {len(paths)} PDFs under UPLOAD/)")
    bad = 0
    for p in paths:
        try:
            doc = pymupdf.open(p)
        except Exception as e:                      # noqa: BLE001 - report, don't crash the gate
            print(f"UNREADABLE {p}: {e}")
            bad += 1
            continue
        found = faces(doc)
        norm = {re.sub(r'[^a-z]', '', f.lower()) for f in found}
        has_brand = any(any(b.replace(' ', '') in n for b in BRAND) for n in norm)
        subs = sorted({f for f in found
                       if any(fb in re.sub(r'[^a-z]', '', f.lower()) for fb in FALLBACK)
                       and not any(m in re.sub(r'[^a-z]', '', f.lower())
                                   for m in ALLOWED_MONO)})
        if not found:
            continue                                 # no text at all - nothing to check
        if subs:
            print(f"FALLBACK {p.name}: substituted {', '.join(subs)}"
                  f"{' (brand faces also present)' if has_brand else ''}")
            bad += 1
        elif not has_brand:
            print(f"NO BRAND FACE {p.name}: embeds {', '.join(sorted(found))}")
            bad += 1
    print('font failures:', bad)
    return 1 if bad else 0

if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
