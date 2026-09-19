# AI-generated translations

## Turkish (`tr-TR`)

The `tr-TR` locale files in this repository are an **AI-generated draft**. They have not
yet been reviewed by a native Turkish translator and should not be treated as final copy
until that review is complete.

## Scope and method

- `63/tr-TR.json` was translated directly from the `en-GB` source file.
- `general_packs/tr-TR.json` remains a translation of the English General deck. It contains
  no replacement cards or Turkey-specific additions; cards that did not survive
  translation were dropped and recorded in [`general_packs/DROPPED.md`](general_packs/DROPPED.md).
- General descriptions retain a useful definition and a separate factual or comic kicker
  wherever the English card has both. *Hiçbir Şey* intentionally keeps the source card's
  empty description because the absence is the joke.
- A source-based title audit checked retained media names, games, sports, brands and idioms
  against Turkish publishers, rights holders, public institutions and established usage.
  It corrected *Curling*, *Aladdin'in Sihirli Halısı*, *Jan Dark* and *Orak ve Çekiç*. Four
  cards with several competing Turkish names were dropped, including *Clickbait*, where
  *tık tuzağı* competes with the English word, leaving 176 cards pending native review.
- Automated checks confirm matching keys, placeholders, markup and line breaks in the app
  file, and unchanged IDs and KIDS flags on every retained General card. Points were lowered
  for *Kuzey Işıkları* and raised for *Papamobil*, *Çarpışma Testi Mankeni* and
  *Dungeons & Dragons* to reflect their difficulty in Turkish.
- `packs.63.pt/tr-TR.json` and `emails/tr-TR.json` were translated directly from the
  current `en-GB` sources. Turkish does not pluralise nouns after numbers, so paired
  plural keys use the same noun forms while preserving every source placeholder. Markup
  and plain-text email line breaks are also unchanged.

## Turkish terminology

The draft uses these equivalents consistently:

| English | Turkish |
| --- | --- |
| card | kart |
| title | başlık |
| description | açıklama |
| pack | paket |
| deck | deste |
| round | tur |
| turn | sıra |
| team | takım |
| points | puan |
| score | skor |
| clue | ipucu |
| guess | bilmek |
| skip a card | geç |
| skip a screen | atla |
| penalty | ceza |
| game mode | oyun modu |
| community pack | topluluk paketi |

## App label and review notes

Register `tr-TR` in the app as **Türkçe** with **🇹🇷**.

Native review should pay particular attention to short mobile and website labels, email
subjects, the official Turkish titles used for films, television programmes, toys and
games in the General deck, and the playability of newer internet terms. The pack import
flow, collaboration permissions and community submission states should be checked in
context. `rules.home.call_to_action` (*Karşında*) should also be checked in the actual
tutorial layout.

No native reviewer was available, so every General card whose exact Turkish title could not
be confirmed was dropped rather than shipped with an uncertain title. Those cards are listed
in [`general_packs/DROPPED.md`](general_packs/DROPPED.md) with the question a native speaker
needs to answer before adding each one back.

Two details also need an in-context native check: confirm whether Bob Usta's Turkish-dub
catchphrase is *Halledebilir miyiz?* or *Yapabilir miyiz?*, and check whether
`post_game.skips_unit` (*geçme*) reads naturally after a number on the stats screen.

## Spanish (`es-ES` and `es-419`)

The `es-ES` and `es-419` locale files in this repository are **AI-generated drafts**.
They have not yet been reviewed by a native Spanish translator and should not be treated
as final copy until that review is complete.

### Scope and method

- `es-ES` was translated directly from the `en-GB` source files first.
- `es-419` was then derived from the completed `es-ES` draft, with regional vocabulary,
  forms of address and locally used media titles changed where appropriate.
- The General deck contains no replacement cards or country-specific additions. Cards
  without a single confident, playable title were dropped and recorded in
  [`general_packs/DROPPED.md`](general_packs/DROPPED.md).
- General descriptions retain a useful definition and a separate factual or comic kicker
  wherever the English card has both.
- Automated checks confirm matching keys, placeholders, markup and line breaks in the
  strict locale files, and unchanged IDs, points and KIDS flags on retained General cards.

### App labels and review notes

Register `es-419` in the app as **Español (Latinoamérica)**. Because the locale represents
many countries rather than one, use a neutral globe symbol such as **🌎** instead of a
single national flag. Register `es-ES` as **Español (España)** with **🇪🇸**.

Native review should pay particular attention to short mobile labels, official localised
titles in the General deck, and vocabulary that varies between Latin American countries.
As with the Turkish draft, cards whose exact title could not be confirmed were dropped
rather than shipped with wording that could cost a team its turn.

## French (`fr-FR`)

The `fr-FR` locale files in this repository are an **AI-generated draft**. They have not
yet been reviewed by a native French translator and should not be treated as final copy
until that review is complete.

### Scope and method

- `63/fr-FR.json` was translated directly from the current `en-GB` source. An older partial
  draft in `csv/fr-FR/` was reviewed as a reference, then brought up to date with the new
  accessibility and KIDS-mode strings.
- `general_packs/fr-FR.json` contains 192 translations of English General cards. It has no
  replacement cards or France-specific additions; 38 cards without one confident,
  playable French title were dropped and recorded in
  [`general_packs/DROPPED.md`](general_packs/DROPPED.md).
- General descriptions keep a useful definition and a separate fact or joke where the
  English card has both. *Rien* intentionally keeps the source card's empty description.
- `packs.63.pt/fr-FR.json` and `emails/fr-FR.json` were translated directly from the
  current `en-GB` sources. They keep the website's plural families and markup, and the
  transactional emails preserve every placeholder and plain-text line break.

### French terminology

The draft uses casual, direct second-person singular forms and these equivalents:

| English | French |
| --- | --- |
| card | carte |
| title | titre |
| description | description |
| pack | pack |
| deck | paquet |
| round | manche |
| turn | tour |
| team | équipe |
| points | points |
| score | score |
| clue | indice |
| guess | deviner |
| skip a card | passer |
| skip a screen | ignorer |
| penalty | pénalité |
| game mode | mode de jeu |
| community pack | pack communautaire |

### Point changes

- *A Tongue Twister* changes from 2 points to 3 as *Un virelangue*, because the standard
  French term is less familiar than its English counterpart.

### App label and review notes

Register `fr-FR` in the app as **Français** with **🇫🇷**.

Native review should pay particular attention to short mobile and website labels, email
subject lengths, and official French titles for films, television, toys and games. The
accessibility tooltips, the KIDS-mode text, the pack import flow and the community
submission states should also be checked in context. The official French title *Maman,
j'ai raté l'avion !* exceeds the usual title-length budget and needs an in-context layout
check.

## German (`de-DE`)

The `de-DE` locale files in this repository are an **AI-generated draft**. They have not
yet been reviewed by a native German translator and should not be treated as final copy
until that review is complete.

### Scope and method

- `63/de-DE.json`, `packs.63.pt/de-DE.json` and `emails/de-DE.json` were translated
  directly from the current `en-GB` sources, using informal singular address (*du*).
- `general_packs/de-DE.json` contains 185 translations of English General cards. It has no
  replacement cards or Germany-specific additions; 45 cards without one confident,
  playable German title were dropped and recorded in
  [`general_packs/DROPPED.md`](general_packs/DROPPED.md).
- General descriptions retain the English fact or joke wherever it survives naturally.
  The kickers were omitted only for *Onkel Ben* (the outdated rice-brand joke),
  *Doppelgänger* and *Schadenfreude* (English explanations of German words). *Nichts*
  intentionally keeps the source card's empty description, and *Déjà-vu* intentionally
  repeats its sentence.
- A source-based spot check confirmed key German release and character names, including
  *Kevin – Allein zu Haus*, *Der gestiefelte Kater* and *Und täglich grüßt das Murmeltier*.
- IDs, points and KIDS flags are unchanged on every retained General card.

### German terminology

The draft consistently uses these equivalents:

| English | German |
| --- | --- |
| card | Karte |
| title | Titel |
| description | Beschreibung |
| pack | Pack |
| deck | Stapel |
| round | Runde |
| turn | Zug |
| team | Team |
| points | Punkte |
| score | Punktestand |
| clue | Hinweis |
| guess | erraten |
| skip a card | auslassen |
| skip a screen | überspringen |
| penalty | Strafe |
| game mode | Spielmodus |
| community pack | Community-Pack |

### Point changes

No point values were changed in the German draft.

### App label and review notes

Register `de-DE` in the app as **Deutsch** with **🇩🇪**.

Native review should pay particular attention to compact mobile labels, compounds and
hyphenation, official German titles for films, television programmes, toys and games, and
the mix of established English loanwords with German equivalents in the General deck. The
pack import flow, collaboration permissions, community submission states, email subject
lengths and accessibility tooltips should be checked in context.
