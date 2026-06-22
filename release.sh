#!/usr/bin/env bash
# Maestro release — ALWAYS packages the FULL ESM tree. maestro.mjs imports several sibling .mjs files
# (combat/mixer/morphwindow/meta/director/engine/soundscapes); a partial zip makes those 404 on the
# server and the ENTIRE module fails to load (no button, no settings, no engine). This script zips the
# whole scripts/ + styles/ + templates/ and then VERIFIES every imported sibling actually made it in.
# Usage: ./release.sh <version> "<title>" "<notes>"
set -e
VER="$1"; TITLE="$2"; NOTES="$3"
[ -z "$VER" ] && { echo "usage: ./release.sh <version> \"<title>\" \"<notes>\""; exit 1; }

sed -i '' "s/\"version\": \"[^\"]*\"/\"version\": \"$VER\"/" module.json
node --check scripts/maestro.mjs

rm -f module.zip
EXTRA=""; [ -f README.md ] && EXTRA="$EXTRA README.md"; [ -f NOTICE.md ] && EXTRA="$EXTRA NOTICE.md"
zip -qr module.zip module.json scripts styles templates $EXTRA

# Gate: every `from "./X.mjs"` import across the scripts must be present in the archive.
for f in $(grep -hoE 'from "\./[a-zA-Z0-9_-]+\.mjs"' scripts/*.mjs | sed -E 's/.*\.\/([a-zA-Z0-9_-]+)\.mjs"/\1/' | sort -u); do
  unzip -l module.zip | grep -q "scripts/$f.mjs" || { echo "✗ MISSING scripts/$f.mjs — release aborted"; exit 1; }
done
echo "✓ package complete — all imported script files present"

git add -A && git commit -q -m "$VER — $TITLE"
git tag "v$VER" && git push -q origin HEAD && git push -q origin "v$VER"
gh release create "v$VER" module.json module.zip --title "v$VER — $TITLE" --notes "$NOTES"
echo "✅ v$VER released"
