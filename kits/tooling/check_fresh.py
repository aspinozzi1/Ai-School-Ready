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

"Newer" means the GIT COMMIT time, not the filesystem mtime (fix 2026-09-10).
Git does not preserve mtimes: a clone or pull stamps every file with checkout
time, in whatever order git happens to write them. Comparing mtimes after a
pull therefore compares noise. On 2026-09-10 that made this gate report all 48
drops stale -- one of them by 12 milliseconds -- when git times showed the drop
was built 23 minutes after its listing and was perfectly fresh. A gate that
flags everything is a gate people stop reading, so it now asks git.

Files with uncommitted changes (modified or untracked) fall back to mtime,
which is correct for them: a file just rebuilt in the working tree is the
freshest thing there is, and its last commit time describes an older version
that no longer exists on disk.
"""
import json
import os
import re
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

_git_cache = {}

def _dirty_paths():
    """Repo-relative paths with uncommitted changes, staged or not, plus untracked."""
    try:
        out = subprocess.run(['git', '-C', ROOT, 'status', '--porcelain', '-uall'],
                             capture_output=True, text=True, timeout=20).stdout
    except (OSError, subprocess.SubprocessError):
        return set()
    paths = set()
    for line in out.splitlines():
        if len(line) > 3:
            # Rename entries look like "R  old -> new"; the new path is what is on disk.
            paths.add(line[3:].split(' -> ')[-1].strip().strip('"'))
    return paths

DIRTY = _dirty_paths()

def _git_time(rel):
    """Unix timestamp of the last commit touching rel, or None if uncommitted."""
    if rel in _git_cache:
        return _git_cache[rel]
    try:
        out = subprocess.run(
            ['git', '-C', ROOT, 'log', '-1', '--format=%ct', '--', rel],
            capture_output=True, text=True, timeout=15).stdout.strip()
        val = int(out) if out else None
    except (OSError, ValueError, subprocess.SubprocessError):
        val = None
    _git_cache[rel] = val
    return val

def mt(p):
    full = os.path.join(ROOT, p)
    if not os.path.exists(full):
        return None
    # Two clocks, and each is wrong on its own:
    #   mtime  -- git does not preserve it, so after a pull every file looks
    #             equally new and real staleness hides (the 48-false-alarm bug).
    #   git    -- a rebuild that happens to produce byte-identical output makes
    #             no commit, so a genuinely current file keeps an old date.
    # Take the later of the two. A file is stale only when BOTH say it is, which
    # is the case that actually matters: never rebuilt and never recommitted.
    #
    # Known limitation, stated rather than hidden: this cannot catch a derived
    # file that was rebuilt from a stale source and so carries a fresh mtime
    # with old content. Rebuild in dependency order (pinsrc, extras, previews,
    # drops) and that case does not arise.
    mtime = os.path.getmtime(full)
    if p in DIRTY:
        return mtime
    g = _git_time(p)
    return max(g, mtime) if g else mtime

LISTINGS_PATH = os.path.join(ROOT, 'tpt/listings.json')
EXTRAS_PATH = os.path.join(ROOT, 'tpt/make_listing_extras.js')
_EXTRAS_LINES = open(EXTRAS_PATH).read().split('\n') if os.path.exists(EXTRAS_PATH) else []

def _extras_entry_time(thumbnail_path):
    """Git/mtime of the make_listing_extras.js line that actually draws this
    "-whats-inside" thumbnail.

    The card's text is a hardcoded call in make_listing_extras.js
    (`whatsInside('Name', 'Accent', [...])`), not a read of listings.json, so
    that line is the thumbnail's real source. Comparing against all of
    listings.json instead (tried first) flagged every older thumbnail stale
    the moment a 2026-09-12 commit re-escaped every description's em dash to
    \\u2014 across the whole file -- a byte-for-byte cosmetic change to every
    listing that would have falsely invalidated 16 correct thumbnails.
    Blaming the one matching line in the generator file isolates the check to
    edits that could actually change what the thumbnail shows.
    """
    basename = os.path.splitext(os.path.basename(thumbnail_path))[0]
    marker = f"'{basename}'"
    line_no = None
    for i, line in enumerate(_EXTRAS_LINES):
        if marker in line:
            line_no = i
            break
    if line_no is None:
        return None
    if 'tpt/make_listing_extras.js' in DIRTY:
        return os.path.getmtime(EXTRAS_PATH)
    try:
        out = subprocess.run(
            ['git', '-C', ROOT, 'blame', '--line-porcelain', '-L', f'{line_no + 1},{line_no + 1}',
             '--', 'tpt/make_listing_extras.js'],
            capture_output=True, text=True, timeout=20).stdout
    except (OSError, subprocess.SubprocessError):
        return None
    m = re.search(r'^committer-time (\d+)', out, re.M)
    return int(m.group(1)) if m else None

listings = json.load(open(LISTINGS_PATH))['listings']
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
    # Not every thumbnail derives from the product PDF. The "-whats-inside"
    # card is drawn from a hardcoded call in make_listing_extras.js, so it
    # goes stale when THAT call changes, not when the PDF does. Checking it
    # against the PDF flagged a correct, byte-identical file on 2026-09-11.
    deps += [(t, (_extras_entry_time(t) or pm) if t.endswith('-whats-inside.png') else pm)
             for t in l.get('thumbnails', [])]
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
