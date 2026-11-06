#!/usr/bin/env bash
# Synchronizacja: eksport z Claude -> pliki -> build -> commit -> push.
# Użycie: bash narzedzia/synchronizuj.sh <katalog-eksportu>
set -euo pipefail
cd "$(dirname "$0")/.."
EXPORT_DIR="${1:?Podaj katalog eksportu}"
git pull -q --rebase origin main
node narzedzia/sync-z-claude.mjs "$EXPORT_DIR"
node build.mjs
if [ -z "$(git status --porcelain)" ]; then
  echo "Brak zmian"
  exit 0
fi
COUNT="$(git status --porcelain | wc -l | tr -d ' ')"
git status --porcelain
git add -A
git -c user.name=fotonacjanet -c user.email=fotonacjanet@gmail.com commit -q -m "Synchronizacja z claude.ai: ${COUNT} zmian"
for DELAY in 0 2 4 8 16; do
  sleep "$DELAY"
  if git push -q origin main; then
    echo "Wysłano ${COUNT} zmian na GitHuba"
    exit 0
  fi
done
echo "Nie udało się wysłać zmian" >&2
exit 1
