#!/usr/bin/env python3
"""Gate: no derived asset may be older than the product PDF it was made from.

Usage: python3 kits/tooling/check_fresh.py          (run from repo root)

Why this exists (owner audit 2026-08-24): the Back-to-School pack's product
PDF was fixed, but the preview page renders in tpt/pinsrc/ had been made from
the pre-fix PDF and shipped stale — the live TPT preview showed the old page
break. Every derived asset must be rebuilt whenever its source PDF changes.

Checks, driven by tpt/listings.json:
- every previewShots render in tpt/pinsrc/ is newer than the listing's product;
- every preview PDF in tpt/previews/ is newer than its product AND its shots;
- every thumbnail in tpt/extras/ is newer than the product;
- every drop zip is newer than everything that goes into it.
"""
import json
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def mt(p):
    p = os.path.join(ROOT, p)
    return os.path.getmtime(p) if os.path.exists(p) else None

listings = json.load(open(os.path.join(ROOT, 'tpt/listings.json')))['listings']
stale = 0
for l in listings:
    if not l.get('product'):
        continue
    pm = mt(l['product'])
    if pm is None:
        print(f"MISSING product: {l['product']}")
        stale += 1
        continue
    deps = [(f"tpt/pinsrc/{s}", pm) for s in l.get('previewShots', [])]
    deps += [(t, pm) for t in l.get('thumbnails', [])]
    shot_times = [mt(f"tpt/pinsrc/{s}") for s in l.get('previewShots', [])]
    preview = f"tpt/previews/{l['id']}-preview.pdf"
    deps.append((preview, max([pm] + [t for t in shot_times if t])))
    drop = f"UPLOAD/drops/drop-{l['order']:02d}-{l['id']}.zip"
    pv = mt(preview)
    deps.append((drop, max([pm] + [t for t in shot_times if t] + ([pv] if pv else []))))
    for path, src_time in deps:
        t = mt(path)
        if t is None:
            print(f"MISSING {path}  (listing {l['id']})")
            stale += 1
        elif t < src_time:
            print(f"STALE   {path}  is older than its source (listing {l['id']}) — rebuild it")
            stale += 1
print('stale/missing:', stale)
sys.exit(1 if stale else 0)
