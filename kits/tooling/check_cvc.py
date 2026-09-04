#!/usr/bin/env python3
"""Mechanical rule check for the short-a CVC unit: every word must be
exactly three letters, middle letter 'a', first and last letters consonants
(no blends, no digraphs). Run before shipping any CVC unit."""
import sys, re, pathlib
V = set('aeiou')
src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else
                   'kits/bestseller-binder/src/cvc-unit1-short-a.html').read_text()
# words are tagged in the source as <span class="w">cat</span> or class="word"
found = re.findall(r'class="[^"]*\b(?:word|w)\b[^"]*"[^>]*>([a-z]+)<', src)
bad = [w for w in found if not (len(w) == 3 and w[1] == 'a'
                                and w[0] not in V and w[2] not in V)]
print(f"words checked: {len(found)}   unique: {len(set(found))}")
print("violations:", bad if bad else "none")
sys.exit(1 if bad or not found else 0)
