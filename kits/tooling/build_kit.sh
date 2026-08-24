#!/usr/bin/env bash
# Build all PDFs for a kit. Usage: kits/tooling/build_kit.sh kits/kit01
set -euo pipefail
KIT="$1"
node kits/tooling/build_pdf.js "$KIT"/src/*.html
python3 kits/tooling/merge_covers.py "$KIT"
