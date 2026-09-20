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
  *tık tuzağı* competes with the English word. The subsequent cross-locale review leaves
  175 cards pending native review.
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

The unconfirmed Bob Usta catchphrase has been removed. Check whether
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

- `63/fr-FR.json` was translated directly from the current `en-GB` source.
- `general_packs/fr-FR.json` contains 190 translations of English General cards. It has no
  replacement cards or France-specific additions; 40 cards without one confident,
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
- `general_packs/de-DE.json` contains 184 translations of English General cards. It has no
  replacement cards or Germany-specific additions; 46 cards without one confident,
  playable German title were dropped and recorded in
  [`general_packs/DROPPED.md`](general_packs/DROPPED.md).
- General descriptions retain the English fact or joke wherever it survives naturally.
  The initial draft omitted kickers for *Onkel Ben* (the outdated rice-brand joke),
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

## Italian (`it-IT`)

The `it-IT` locale files in this repository are an **AI-generated draft**. They have not
yet been reviewed by a native Italian translator and should not be treated as final copy
until that review is complete.

### Scope and method

- The Italian files are translated directly from the current `en-GB` sources, using
  informal singular address (*tu*). Portuguese is used as the main human-reviewed
  reference for tone and repository conventions, never as the translation source.
- `63/it-IT.json`, `packs.63.pt/it-IT.json` and `emails/it-IT.json` preserve the English
  key order, placeholders, markup and line breaks. Italian singular and plural forms are
  kept in the pack editor wherever the English source defines a plural family.
- `general_packs/it-IT.json` contains 179 translations of English General cards, with no
  replacement cards or Italy-specific additions. The 51 cards without one confident,
  playable Italian title are dropped and recorded in
  [`general_packs/DROPPED.md`](general_packs/DROPPED.md).
- General descriptions retain a useful definition and a separate fact or joke wherever
  both survive naturally in Italian. The source exceptions for *Nothing* and *Déjà Vu*
  remain intentional.

### Italian terminology

The draft uses these equivalents consistently:

| English | Italian |
| --- | --- |
| card | carta |
| title | titolo |
| description | descrizione |
| pack | pacchetto |
| deck | mazzo |
| round | manche |
| turn | turno |
| team | squadra |
| points | punti |
| score | punteggio |
| clue | indizio |
| guess | indovinare |
| skip a card | passare |
| skip a screen | saltare |
| penalty | penalità |
| game mode | modalità di gioco |
| community pack | pacchetto della community |

### Point changes

- *The Sicilian Mafia* changes from 3 points to 2 as *La mafia siciliana*, because Italian
  players have especially direct clues such as *Cosa Nostra*, *Palermo* and *pizzo*.

### App label and review notes

Register `it-IT` in the app as **Italiano** with **🇮🇹**.

Native review should pay particular attention to compact mobile and website labels,
official Italian titles for films, television programmes, toys and games, and the
playability of English loanwords in the General deck. The pack import flow, collaboration
permissions, community submission states, email subject lengths, accessibility tooltips
and KIDS-mode text should also be checked in context. The official Italian title *Mamma,
ho perso l’aereo* exceeds the usual mobile title-length budget and needs an in-context
layout check.

## Dutch (`nl-NL`)

The `nl-NL` locale files in this repository are an **AI-generated draft**. They have not
yet been reviewed by a native Dutch translator and should not be treated as final copy
until that review is complete.

### Scope and method

- All four files are translated from the current `en-GB` sources, using informal singular
  address (*je/jij*), with Portuguese as the reference for tone and conventions. They
  preserve every key, placeholder, markup tag, plural pair and line break.
- `general_packs/nl-NL.json` has 195 cards, with no replacement cards or
  Netherlands-specific additions. The 35 cards without a stable, playable Dutch title are
  listed in [`general_packs/DROPPED.md`](general_packs/DROPPED.md).
- *Home Alone* keeps its English title, which is the title used in the Netherlands.
  *Niets* keeps its empty description and *Déjà vu* repeats its sentence on purpose.

### Dutch terminology

The draft uses informal singular address (*je/jij*) and these equivalents:

| English | Dutch |
| --- | --- |
| card | kaart |
| title | titel |
| description | beschrijving |
| pack | pack |
| deck | stapel |
| round | ronde |
| turn | beurt |
| team | team |
| points | punten |
| score | score |
| clue | aanwijzing |
| guess | raden |
| skip a card | passen |
| skip a screen | overslaan |
| penalty | straftijd |
| game mode | spelmodus |
| community pack | communitypack |

### Point changes

- *Aurora Borealis* changes from 3 points to 2 as *Het noorderlicht*, because the Dutch
  name is an everyday word and substantially easier to clue than the Latin English title.

### App label and review notes

Register `nl-NL` in the app as **Nederlands** with **🇳🇱**.

Native review should pay particular attention to compact mobile and website labels,
official Dutch titles for films, television programmes, toys and games, and the balance
between established English loanwords and Dutch wording in the General deck. The five
newer cards, accessibility tooltips, KIDS-mode text, pack import flow, collaboration
permissions, community submission states and email subject lengths should be checked in
context.

## Norwegian Bokmål (`nb-NO`)

The `nb-NO` locale files in this repository are an **AI-generated draft**. They have not
yet been reviewed by a native Norwegian translator and should not be treated as final copy
until that review is complete.

### Scope and method

- All four locale files were translated directly from the current `en-GB` sources, using
  informal singular address (*du*). The human-reviewed `pt-PT` files were used as the main
  reference for tone and product conventions, never as the translation source.
- `63/nb-NO.json`, `packs.63.pt/nb-NO.json` and `emails/nb-NO.json` preserve the English
  key order, placeholders, markup, plural pairs and line breaks. The nouns *kort* and
  *poeng* have identical indefinite singular and plural forms, so
  some `_one` and `_other` values are intentionally identical. Other nouns, such as
  *endring/endringer*, and adjectives still need distinct plural forms.
- `general_packs/nb-NO.json` contains 204 translations of English General cards and no
  replacement cards or Norway-specific additions. The 26 cards without one confident,
  playable Norwegian title are recorded in
  [`general_packs/DROPPED.md`](general_packs/DROPPED.md).
- The tutorial and General deck use *Alene hjemme*, the established Norwegian title of
  *Home Alone*. *Ingenting* keeps the source card's empty description, and *Déjà vu*
  intentionally repeats its sentence.
- Norwegian guillemets («…») are used consistently for quoted titles and text.

### Norwegian Bokmål terminology

The draft uses these equivalents consistently:

| English | Norwegian Bokmål |
| --- | --- |
| card | kort |
| title | tittel |
| description | beskrivelse |
| pack | pakke |
| deck | kortstokk |
| round | runde |
| turn | tur |
| team | lag |
| points | poeng |
| score | poengsum |
| clue | hint |
| guess | gjette |
| skip a card | passe |
| skip a screen | hoppe over |
| penalty | straffetid |
| game mode | spillmodus |
| community pack | fellesskapspakke |

### Point changes

- *Aurora Borealis* changes from 3 points to 2 as *Nordlyset*, because the everyday
  Norwegian title is substantially easier to clue than the Latin English title.
- *Pippi Longstocking* changes from 3 points to 2 as *Pippi Langstrømpe*, because the
  character is especially familiar to Norwegian players.

### App label and review notes

Register `nb-NO` in the app as **Norsk bokmål** with **🇳🇴**.

Native review should pay particular attention to compact mobile and website labels,
official Norwegian titles for films, television, toys and games, and the balance between
established English loanwords and Norwegian wording in the General deck. The KIDS-mode
text, accessibility tooltips, pack import flow, collaboration permissions, community
submission states and email subject lengths should also be checked in context. Cards with
competing or uncertain exact titles were dropped rather than shipped with wording that
could cost a team its turn.

## Cross-locale AI review — 2026-09-20

This pass reviewed every string in the eight AI draft locales across `63/`,
`general_packs/`, `packs.63.pt/` and `emails/`: **6,464 app/editor/email values and
1,535 existing card titles and descriptions**. Spanish regional differences were reviewed
against each other as well as the English source. This is an additional AI editorial
review, **not native-speaker approval**; the draft status is unchanged.

The review changed 195 app/editor/email values and 120 retained cards, including typography,
and removed 17 cards. No cards were added and no points or KIDS flags were changed.
The pre-existing announcement-string removals and Portuguese support-label edit were
preserved.

| Locale | App/editor/email values changed | Retained cards edited | Additional cards dropped | Cards remaining |
| --- | ---: | ---: | ---: | ---: |
| `tr-TR` | 18 | 12 | 1 | 175 |
| `es-ES` | 56 | 11 | 3 | 198 |
| `es-419` | 61 | 24 | 4 | 193 |
| `fr-FR` | 15 | 10 | 2 | 190 |
| `de-DE` | 13 | 13 | 1 | 184 |
| `it-IT` | 13 | 10 | 2 | 179 |
| `nl-NL` | 12 | 19 | 2 | 195 |
| `nb-NO` | 7 | 21 | 2 | 204 |

### Main findings and changes

- **Tutorial rules:** the Spain Spanish clue used *solo* and *casa*, both forbidden words
  in *Solo en casa*. It now describes a Christmas film about a child confronting burglars.
  German clue grammar and several instructions for marking and passing cards were repaired.
- **Names and numbers inserted at runtime:** count labels replace plural-dependent phrases
  in the app, which has no plural-key mechanism. French and Italian notifications now name
  the pack explicitly where a participle could otherwise seem to agree with its arbitrary
  title. Turkish avoids attaching pronunciation-dependent suffixes to names and numbers.
- **Turkish:** corrected *Yoksay* to *Yok say*, replaced literal *Yorumlayıcı dans* with
  *Serbest dans*, and made the Custom mode *Kendin yap* so it no longer shares *Özel* with
  private content. The Uncle Ben description no longer accidentally suggests Peter Parker
  is the deceased relative. The unconfirmed Bob Usta catchphrase was removed.
- **Spanish:** shortened UI text without abbreviating official names, aligned Latin American
  settings terminology around *configuración*, and used «…» consistently. The role-playing
  game is now *Dungeons & Dragons* rather than the local title of its TV adaptation.
- **French:** corrected *Un vieux en torse nu* to *Un vieux torse nu*, repaired pronoun
  references, and replaced literal phrasing such as a series having “harvested a cult”.
  The *ola* description no longer implies that its local name refers to Mexico.
- **German:** replaced the incomplete mode label *Eigener* with *Individuell*, removed
  *das Hinweisen*, and simplified repetitive or awkward card descriptions. Colour errors
  now use the same field names as the editor.
- **Italian:** clarified carrying time into the next round, corrected *disattivo*, and
  improved collaboration dates and moderation emails. Removed title-root leaks such as
  *dentisti/dentifricio* and *Photobombing/foto*.
- **Dutch:** corrected gender, article and idiom problems, including *een geanimeerd
  amfibie* and *het overgebleven punt*. “Unplayed” cards no longer read as “new” cards.
  Removed leaks such as *Clickbait/klikken* and *Avondmaal/maaltijd*. Collaboration
  permission descriptions now agree with their plural subject.
- **Norwegian Bokmål:** clarified time carry-over and replaced literal UI wording.
  Removed compounds and inflections that reveal title roots, including *Nordlyset/lysfenomen*,
  *Svigermor/moren*, *Legeskrift/håndskriften* and *senket/usenkelig*.
- **All editor locales:** where needed, minimum-card messages now specify the required
  total, rather than seeming to demand that many additional cards. Descriptions of tooth
  fairies use the pillow-and-coins motif without leaking the answer or implying that only
  molars are collected.

### Cultural fit and source checks

The additional drops and individual reasons are recorded in
[`general_packs/DROPPED.md`](general_packs/DROPPED.md). They include coined collective
names for the Friends characters, conflicting exact answers across Latin American
countries, *buzz cut* translations that instead suggest a shaved head, and expressions
whose exact wording or recognition remains uncertain. These are conservative playability
judgements, not claims that nobody in those regions uses the rejected wording.

Specific-name spot checks used publishers or rights holders:
[Wizards' Spanish D&D material](https://media.wizards.com/2021/wpn/marketing_materials/dnd_guides/SP_D%26D_Sales_Guide.pdf),
[Disney's Spanish Aladdín page](https://www.disney.es/peliculas/aladdin-2019/todo-lo-que-sabemos-hasta-ahora),
[Hasbro's Turkish Potato Head page](https://consumercare.hasbro.com/tr-tr/product/potato-head-mr-potato-head-classic-toy-for-kids-ages-2-and-up-includes-13-parts-and-pieces-to-create-funny-faces/C1D52A99-0713-431C-8018-EE82EE39AC2A)
and [Marmalade's Italian Cluedo listing](https://apps.apple.com/it/app/cluedo/id6447306697?platform=tv).
French waxing terminology was checked against
[Yves Rocher's treatment list](https://www.yves-rocher.fr/magasins-instituts-de-beaute/romans/liste-des-soins/epilations/S-FRYROC186/CC-23494),
which distinguishes *maillot brésilien* from *maillot intégral*.

Some inherited kickers were omitted when they no longer made sense after translation or
made an uncertain factual claim: German-word etymologies attached to translated words,
the outdated Uncle Ben rice-brand joke, the five-second-rule research claim, the claim
about Heimlich's first use of his technique, and the unqualified snooze-button health
claim. [Rutgers' report of its food-transfer study](https://www.eurekalert.org/news-releases/579114)
supports removing the suggestion that waiting five seconds is a reliable safety rule.
This was a language and playability review with targeted source checks, not an exhaustive
fact-check of every assertion inherited from English.

### Validation and remaining context checks

CSV export followed by dry-run import passed for every locale. Additional checks verified
exact string-key order, placeholder multisets, markup, `CHECK_ICON`, bullets, bold markers,
line-break counts and trailing email newlines. Retained card IDs, order, points and KIDS
flags match the pre-review files; every missing English card appears exactly once in
`DROPPED.md`, and the published counts agree. *Nothing* remains empty and *Déjà Vu* still
repeats its sentence deliberately.

The remaining CSV warnings were inspected:

| Locale | Length warnings kept for an in-context layout check |
| --- | --- |
| `tr-TR` | Editor `collaboration.copyEditLink`, `toast.editLinkCopied` |
| `es-ES`, `es-419` | App `common.ad_privacy`, `credits.special_thanks`; editor `auth.email` |
| `fr-FR` | App `rules.default_card.title`; editor `auth.resetPassword.title`, `auth.resetPassword.action`, `validation.required.email`, `collaboration.copyEditLink`, `dialog.unsavedChanges.title`, `toast.failedToUpdateUsername` |
| `de-DE` | App `rules.default_card.title` |
| `it-IT` | App `common.privacy_policy`, `rules.default_card.title`, `packs.add_packs` |
| `nl-NL`, `nb-NO` | None |

There are also eight expected empty-description warnings for *Nothing*, and one harmless
Italian title-word warning for *delle*, a permitted function word. The import tool labels
unchanged cognates, brands and symbols as “left in English”; those values were inspected.
It also reports absent deck cards as “untranslated” on this export/import path, even when
`DROPPED.md` contains their reasons; the separate drop-record comparison covers them.

No app rendering or real-device playtest was available in this translations-only repo.
Check the listed labels, inserted long player/pack names and standalone statistic units
in the actual layouts. The JSON-only app has no singular/plural keys for those units;
if the UI concatenates them directly after a number, the app may need plural support.
