#!/usr/bin/env python3
"""US English gate. The store sells to American teachers; British spellings in
product text, listing copy or pin copy read as an error to every buyer.
Scans reader-facing content and fails on any British form.
Usage: check_us_english.py [paths...]   (defaults to the product + listing set)"""
import re, sys, pathlib, json

PAIRS = [
    (r'practis(e|es|ed|ing)\b', 'practice/practices/practiced/practicing'),
    (r'colour(s|ed|ing|ful)?\b', 'color'),
    (r'programme(s)?\b', 'program'),
    (r'recognis(e|es|ed|ing)\b', 'recognize'),
    (r'summaris(e|es|ed|ing)\b', 'summarize'),
    (r'analys(e|es|ed|ing)\b', 'analyze'),
    (r'organis(e|es|ed|ing)\b', 'organize'),
    (r'labell(ed|ing)\b', 'labeled/labeling'),
    (r'centre(s|d)?\b', 'center'),
    (r'favourite\b', 'favorite'),
    (r'behaviour(s|al)?\b', 'behavior'),
    (r'apologis(e|ed)\b', 'apologize'),
    (r'whilst\b', 'while'),
    (r'catalogue\b', 'catalog'),
    (r'\bmaths\b', 'math'),
    (r'\bgrey\b', 'gray'),
]
DEFAULTS = ['kits', 'tpt/listings.json', 'tpt/make_pins.js', 'tpt/make_covers.js',
            'tpt/make_previews.js', 'tpt/make_listing_extras.js']
EXTS = {'.html', '.js', '.json', '.txt'}
# CSS custom properties and class names legitimately use --grey/.grey
SKIP_LINE = re.compile(r'--grey|var\(--|\.grey\b|greyscale')

def files(paths):
    for p in paths:
        q = pathlib.Path(p)
        if q.is_file() and q.suffix in EXTS: yield q
        elif q.is_dir():
            for f in q.rglob('*'):
                if f.suffix in EXTS and 'node_modules' not in f.parts: yield f

hits = []
for f in files(sys.argv[1:] or DEFAULTS):
    try: text = f.read_text()
    except Exception: continue
    for i, line in enumerate(text.splitlines(), 1):
        if SKIP_LINE.search(line): continue
        for pat, fix in PAIRS:
            for m in re.finditer(pat, line, re.I):
                hits.append((str(f), i, m.group(0), fix))
for f, i, word, fix in hits:
    print(f'{f}:{i}  "{word}"  -> use {fix}')
print(f'british spellings: {len(hits)}')
sys.exit(1 if hits else 0)
