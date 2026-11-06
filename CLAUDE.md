# Baza Wiedzy AI — instrukcja dla Claude

To repozytorium to osobista baza wiedzy o AI użytkownika. Strona (GitHub Pages) buduje się sama z plików
w `wpisy/` po każdym pushu na `main`. Rozmawiaj z użytkownikiem po polsku.

## Gdy użytkownik wkleja materiał („dodaj do bazy…”)

1. **Dobierz kategorię** z `kategorie.json` (pole `id` = nazwa folderu w `wpisy/`). Jeśli żadna nie pasuje,
   zaproponuj nową kategorię i dodaj ją do `kategorie.json` (pola: `id`, `name`, `opis`, `kolor` = odcień 0–359,
   inny niż istniejące) oraz utwórz folder.
2. **Dobierz rodzaj**: `notatka`, `kurs`, `zasob` (artykuł, repozytorium, strona), `prompt`, `skill`, `narzedzie`.
3. **Utwórz plik** `wpisy/<kategoria>/<krotka-nazwa>.md` (małe litery, myślniki, bez polskich znaków;
   nazwa pliku musi być unikalna w całej bazie) w formacie:

   ```markdown
   ---
   tytul: "Tytuł wpisu"
   rodzaj: prompt
   streszczenie: "1–2 zdania: o czym to jest i po co."
   link: "https://… albo pusty"
   tagi: ["tag1","tag2"]
   dodano: RRRR-MM-DD
   ---
   Treść w Markdown: ## nagłówki, - listy, **pogrubienie**.
   Prompty i kod zawsze w bloku ``` … ``` (strona dodaje przycisk Kopiuj).
   ```

   Wartości tekstowe w nagłówku zapisuj jako napisy JSON (w cudzysłowach, `\"` w środku).
4. **Prompty wklejaj dosłownie**, bez poprawiania. Nad blokiem możesz dodać krótką sekcję „Budowa promptu”,
   która pomaga się z niego uczyć.
5. **Nie zmyślaj** treści, których użytkownik nie podał. Brakujące elementy oznacz jako „do uzupełnienia”.
   Jeśli dodajesz coś od siebie, dodaj tag `od Claude`.
6. Uruchom `node build.mjs`. Musi wypisać `OK`. Jeśli wypisze błędy, popraw je.
7. Zrób commit (`Dodaj: <tytuł>`) i push na `main`. Strona zaktualizuje się po około minucie.
8. Odpowiedz krótko: jaki wpis, w której kategorii, i link do strony.

Przy kilku materiałach naraz utwórz kilka plików i zrób jeden commit.
