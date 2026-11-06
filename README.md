# Baza Wiedzy AI

Osobista baza wiedzy o AI: prompty, skille, kursy i zasoby, pogrupowane w kategorie, ze śledzeniem postępów nauki.

**Strona:** https://fotonacjanet.github.io/baza-wiedzy-ai/
Można ją zainstalować jak aplikację („Dodaj do ekranu głównego” na telefonie, ikona instalacji w Chrome/Edge na komputerze). Działa też offline.

## Dodawanie materiałów

Otwórz Claude Code z tym repozytorium i napisz: `Dodaj do bazy: …`. Claude dobierze kategorię i opis, zapisze plik
i wyśle zmianę. Zasady, których się trzyma, są w [CLAUDE.md](CLAUDE.md).

## Struktura

- `kategorie.json`: lista kategorii (kolejność = kolejność na stronie)
- `wpisy/<kategoria>/<wpis>.md`: wpisy jako pliki Markdown (folder można otworzyć w Obsidianie)
- `site/`: wygląd strony (HTML, ikony, tryb offline)
- `build.mjs`: składa stronę do `dist/` (`node build.mjs`, sprawdza też błędy we wpisach)
- `.github/workflows/pages.yml`: automatyczna publikacja na GitHub Pages po każdym pushu
