# Baza Wiedzy AI

Osobista baza wiedzy o AI: prompty, skille, kursy i zasoby, pogrupowane w kategorie, ze śledzeniem postępów nauki.

**Strona:** https://fotonacjanet.github.io/baza-wiedzy-ai/
Można ją zainstalować jak aplikację („Dodaj do ekranu głównego” na telefonie, ikona instalacji w Chrome/Edge na komputerze). Działa też offline.

## Dodawanie materiałów

Wpisy dodajesz i edytujesz w aplikacji w Claude: https://claude.ai/artifact/EtkjZspqEfrthsttidJ3WU
(sam albo pisząc do Claude „Dodaj do bazy: …”). To repozytorium jest jej kopią: routine w Claude Code
synchronizuje je około 8:45, 13:45, 19:45 i 22:45 (czasu polskiego), a w aplikacji jest przycisk „Wyślij na GitHub”
do synchronizacji od razu. **Nie edytuj plików w `wpisy/` ręcznie**, bo synchronizacja je nadpisze.

## Struktura

- `kategorie.json`: lista kategorii (kolejność = kolejność na stronie)
- `wpisy/<kategoria>/<wpis>.md`: wpisy jako pliki Markdown (folder można otworzyć w Obsidianie)
- `site/`: wygląd strony (HTML, ikony, tryb offline)
- `narzedzia/sync-z-claude.mjs`: przepisuje eksport bazy z Claude na pliki w `wpisy/`
- `build.mjs`: składa stronę do `dist/` (`node build.mjs`, sprawdza też błędy we wpisach)
- `.github/workflows/pages.yml`: automatyczna publikacja na GitHub Pages po każdym pushu
