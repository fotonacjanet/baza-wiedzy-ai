# Baza Wiedzy AI — instrukcja dla Claude

Osobista baza wiedzy o AI użytkownika. Rozmawiaj po polsku.

## Jak to działa

- **Źródło prawdy:** baza aplikacji w Claude, https://claude.ai/artifact/EtkjZspqEfrthsttidJ3WU
  (kolekcje `categories` i `entries`, zapis narzędziem ArtifactData).
- **To repozytorium to kopia.** Routine „Baza Wiedzy AI: synchronizacja z GitHubem”
  (trig_0191FFfLTQ1sJbzdpSLTQZTL) kilka razy dziennie eksportuje bazę, uruchamia
  `node narzedzia/sync-z-claude.mjs <eksport>` i `node build.mjs`, a potem robi push. GitHub Pages publikuje `dist/`.
- **Nie edytuj ręcznie** plików w `wpisy/` ani `kategorie.json`: następna synchronizacja je nadpisze.
  Zmiany wyglądu strony robisz w `site/`, a reguły budowania w `build.mjs`.

## Gdy użytkownik wkleja materiał („dodaj do bazy…”)

1. Odczytaj kategorie (`ArtifactData list categories`). Dobierz pasującą. Jeśli żadna nie pasuje, zaproponuj
   nową: dokument w `categories` z polami `name`, `desc`, `hue` (0–359, inny niż istniejące), `order`.
2. Dobierz rodzaj (`kind`): `notatka`, `kurs`, `zasob` (artykuł, repozytorium, strona), `prompt`, `skill`, `narzedzie`.
3. Zapisz dokument w `entries` (doc_id: krótka nazwa, małe litery i myślniki, bez polskich znaków, unikalna):
   `title`, `category` (id kategorii), `kind`, `summary` (1–2 zdania), `body` (Markdown), `url` (lub ""),
   `tags` (tablica), `createdAt` i `updatedAt` (ms od epoki).
   W `body` prompty i kod zawsze w bloku ``` … ``` (strona dodaje przycisk Kopiuj).
4. Prompty wklejaj dosłownie. Nad blokiem możesz dodać krótką sekcję „Budowa promptu”, która pomaga się uczyć.
5. Nie zmyślaj treści, których użytkownik nie podał. Brakujące elementy oznacz jako „do uzupełnienia”.
   Jeśli dodajesz coś od siebie, dodaj tag `od Claude`.
6. Przy edycji istniejącego wpisu podawaj `if_version` z ostatniego odczytu.
7. Jeśli użytkownik chce mieć zmianę od razu na GitHubie, uruchom routine (`fire_trigger`) albo wykonaj kroki synchronizacji sam.
8. Odpowiedz krótko: jaki wpis, w której kategorii.
