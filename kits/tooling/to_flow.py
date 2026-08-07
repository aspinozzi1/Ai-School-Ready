#!/usr/bin/env python3
"""One-time transform: convert fixed .sheet documents to the flow layout.
Extracts each sheet's .body content and re-emits it inside the repeating-band
table. The Script's cover sheet is written to a separate *.cover.html."""
import re, sys, os

DOCS = {
    "Kit01_FacilitatorPrepGuide.html": {
        "subtitle": "Facilitator Prep Guide", "sections": {}},
    "Kit01_ParticipantHandout.html": {
        "subtitle": "Participant Handout", "sections": {}},
    "Kit01_30DayPlan.html": {
        "subtitle": "30-Day Implementation Plan", "sections": {}},
    "Kit01_References.html": {
        "subtitle": "References &amp; Further Reading", "sections": {}},
    "Kit01_FacilitatorScript.html": {
        "subtitle": "Word-for-Word Facilitator Script",
        "has_cover": True,
        "sections": {   # heading inserted before body N (0-based, after cover removed)
            1: "Segment 1 · Welcome &amp; why now — slides 1–4",
            2: "Segment 2 · What AI actually is — slides 5–9",
            3: "Segment 3 · The One Hard Rule — slides 10–15",
            4: "Segment 4 · Safe practice — slides 16–19",
            5: "Segment 5 · Hands-on lab — slides 20–23",
            6: "Segment 6 · Staying human &amp; our norms — slides 24–27",
            7: "Segment 7 · First 48 hours &amp; close — slides 28–30",
        }},
}

HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{title}</title>
<link rel="stylesheet" href="../../tooling/brand.css">
{extra_css}</head>
<body>
<table class="doc">
  <thead><tr><td>
    <div class="band">
      <img class="logo" src="../../../public/brand/logo-nav-dark.svg" alt="AI-Ready School">
      <div class="doc-tag">Kit 1 · Track A — AI Foundations<b>{subtitle}</b></div>
    </div>
  </td></tr></thead>
  <tfoot><tr><td class="foot-space"></td></tr></tfoot>
  <tbody><tr><td class="content-cell">
"""

FOOT = """  </td></tr></tbody>
</table>
<div class="fixed-foot">
  <div class="foot">
    <div class="brand-line">AI-Ready School<span> · </span>Built by Adam &amp; Katelyn Spinozzi — certified educators</div>
    <div>{subtitle_plain}</div>
  </div>
</div>
</body>
</html>
"""

src_dir = sys.argv[1]
for fname, cfg in DOCS.items():
    path = os.path.join(src_dir, fname)
    html = open(path).read()
    title = re.search(r"<title>(.*?)</title>", html).group(1)
    extra_css = ""
    m = re.search(r"(<style>.*?</style>)", html, re.S)
    if m:
        extra_css = m.group(1) + "\n"
    bodies = re.findall(r'<div class="body">(.*?)</div>\s*<div class="foot">', html, re.S)
    cover = None
    if cfg.get("has_cover"):
        cm = re.search(r'(<div class="sheet cover">.*?</div>\s*</div>\n</div>)', html, re.S)
        # fallback: grab from '<div class="sheet cover">' up to first '<!-- PAGE'
        cm = re.search(r'(<div class="sheet cover">.*?)\n\n<!-- ', html, re.S)
        cover = cm.group(1)
    out = HEAD.format(title=title, subtitle=cfg["subtitle"], extra_css=extra_css)
    for i, b in enumerate(bodies):
        if i in cfg["sections"]:
            out += f'\n<h2 class="segment-head">{cfg["sections"][i]}</h2>\n'
        out += b + "\n"
    out += FOOT.format(subtitle_plain=re.sub(r"&amp;", "&", cfg["subtitle"]))
    open(path, "w").write(out)
    print("flowed", fname, f"({len(bodies)} bodies)")
    if cover:
        cpath = path.replace(".html", ".cover.html")
        chtml = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>{title} — cover</title>
<link rel="stylesheet" href="../../tooling/brand.css">
</head>
<body>
{cover}
</body>
</html>
"""
        open(cpath, "w").write(chtml)
        print("cover ->", os.path.basename(cpath))
