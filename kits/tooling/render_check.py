#!/usr/bin/env python3
"""Render every page of the given PDFs to PNG for visual inspection.
Usage: python3 kits/tooling/render_check.py out_dir file.pdf [...]"""
import sys, os
import fitz

out_dir = sys.argv[1]
os.makedirs(out_dir, exist_ok=True)
for pdf_path in sys.argv[2:]:
    doc = fitz.open(pdf_path)
    base = os.path.splitext(os.path.basename(pdf_path))[0]
    for i, page in enumerate(doc):
        pix = page.get_pixmap(dpi=110)
        p = os.path.join(out_dir, f"{base}_p{i+1:02d}.png")
        pix.save(p)
        print(p)
