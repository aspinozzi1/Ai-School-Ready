#!/usr/bin/env python3
"""Merge KitXX_*.cover.pdf in front of its main PDF, then delete the cover PDF."""
import sys, os, glob
import fitz
kit = sys.argv[1]
for cover in glob.glob(os.path.join(kit, "*.cover.pdf")):
    main = cover.replace(".cover.pdf", ".pdf")
    tmp = main + ".tmp"
    out = fitz.open()
    with fitz.open(cover) as d:
        out.insert_pdf(d)
    with fitz.open(main) as d:
        out.insert_pdf(d)
    out.save(tmp, deflate=True)
    out.close()
    os.replace(tmp, main)
    os.remove(cover)
    print("merged cover into", os.path.basename(main))
