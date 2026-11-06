---
tytul: "Anatomia skilla Claude"
rodzaj: skill
streszczenie: "Z czego składa się skill i jak napisać opis, żeby model wiedział, kiedy go użyć. Wpis startowy od Claude."
link: ""
tagi: ["claude","skill","od Claude"]
dodano: 2026-11-06
---
## Budowa
Skill to folder z plikiem `SKILL.md`, a obok opcjonalne skrypty, szablony i pliki referencyjne.

```
---
name: raport-tygodniowy
description: Tworzy raport tygodniowy sprzedaży z pliku Excel. Użyj, gdy użytkownik prosi o raport tygodniowy, podsumowanie sprzedaży lub wkleja plik z danymi sprzedaży.
---

# Raport tygodniowy

## Kroki
1. Wczytaj plik i sprawdź kolumny: data, produkt, kwota.
2. Policz sumy per produkt i zmianę tydzień do tygodnia.
3. Wypełnij szablon z pliku template.md.

## Zasady
- Kwoty w PLN, separator tysięcy spacją.
- Zawsze dodaj 3 wnioski na górze.
```

## Na co uważać
- **description** decyduje, kiedy skill się uruchomi: opisz konkretne sytuacje i słowa, które padają w prośbie.
- Jeden skill = jedno powtarzalne zadanie.
- Długie materiały trzymaj w osobnych plikach, a w SKILL.md tylko wskaż, kiedy je czytać.
- Testuj na 3–5 prawdziwych prośbach i poprawiaj opis.
