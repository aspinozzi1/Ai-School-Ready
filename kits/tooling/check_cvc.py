#!/usr/bin/env python3
"""CVC rule check. Two passes:
 1. Every word tagged class="w" in the HTML is exactly three letters, a vowel
    in the middle, consonants either side (no blends, no digraphs).
 2. If a units JSON is given (--units file.json), every word in each unit's
    word lists carries that unit's vowel — so unit 3 can't leak a short-a word.
Usage: check_cvc.py <src.html> [--units units.json]"""
import sys, re, json, pathlib
V = set('aeiou')
args = [a for a in sys.argv[1:] if not a.startswith('--')]
src = pathlib.Path(args[0]).read_text()
found = re.findall(r'class="[^"]*\b(?:word|w)\b[^"]*"[^>]*>([a-z]+)<', src)
bad = [w for w in found if not (len(w) == 3 and w[1] in V
                                and w[0] not in V and w[2] not in V)]
print(f"pass 1 — words checked: {len(found)}  unique: {len(set(found))}")
print("        violations:", sorted(set(bad)) if bad else "none")
leaks = []
if '--units' in sys.argv:
    u = json.loads(pathlib.Path(sys.argv[sys.argv.index('--units') + 1]).read_text())
    for unit in u:
        words = [w for k in ('pics', 'plain', 'sbox', 'probe') for w in unit[k]]
        words += [w for _, ws in unit['fams'] for w in ws]
        off = sorted({w for w in words if w[1] != unit['v']})
        if off:
            leaks.append((unit['name'], off))
    print(f"pass 2 — {len(u)} units checked for vowel purity")
    print("        leaks:", leaks if leaks else "none")
sys.exit(1 if bad or leaks or not found else 0)
