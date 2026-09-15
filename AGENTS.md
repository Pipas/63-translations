# AGENTS.md: adding a translation to 63

Instructions for an AI agent adding a new language to this repo, such as `fr-FR`. They
come from the `tr-TR`, `es-ES` and `es-419` drafts, which went through several rounds of
review. Every rule below exists because a draft got it wrong at least once.

The human docs are still the source of truth. Read these before writing any JSON:

1. [`README.md`](README.md): what each folder is and how changes ship.
2. [`CONTRIBUTING.md`](CONTRIBUTING.md): keys, placeholders, length and register.
3. [`GLOSSARY.md`](GLOSSARY.md): the game terms that must always be translated the same way.
4. The `README.md` in every folder you touch, especially
   [`general_packs/README.md`](general_packs/README.md).
5. [`general_packs/DROPPED.md`](general_packs/DROPPED.md) and
   [`AI_TRANSLATIONS.md`](AI_TRANSLATIONS.md), to see how earlier languages were handled.

## Working agreement

- **Branch.** Work on a branch named after the locale (`fr-FR`). Never commit to `main`.
  The maintainer squash-merges.
- **Locale codes.** Use `<lang>-<REGION>`, for example `fr-FR`. A multi-country variant uses
  a UN M49 region code, for example `es-419`.
- **English is the source.** Translate from `en-GB`. Use other languages only as a reference
  for how a problem was solved.
- **Order.** Do `63/` first, then `general_packs/`, then `packs.63.pt/` and `emails/`.
- **Existing French work.** `csv/fr-FR/` already has an older, partial French spreadsheet.
  `csv/` is gitignored and that sheet predates current keys and cards, so use it as a
  reference only. The JSON is what ships.
- **It's a draft.** Say clearly that the files are AI-generated and need native review.
  Don't claim otherwise.
- **When unsure, drop.** For General cards, a card you're unsure about is dropped, not
  shipped with a note (see [Dropping cards](#dropping-cards)).

## 1. Decide your terminology first

Before touching JSON, pick one equivalent for every term in `GLOSSARY.md`: card, title,
description, pack, deck, round, turn, team, points, score, clue, guess, skip (a card), skip
(a screen), penalty, game mode and community pack. Write the table into
`AI_TRANSLATIONS.md` and use it everywhere.

Earlier drafts went wrong in these ways:

- **One word, one meaning.** `tr-TR` used *Özel* for the Custom mode, custom rounds and
  private packs, which suggests the three are related. Pick a different word for each
  concept.
- **Skip has two actions.** Skipping a card and skipping the tutorial are different. `tr-TR`
  uses *geç* and *atla*; `es-ES` uses *Omitir* for the tutorial.
- **Deck and pack must differ.** See `GLOSSARY.md`.
- **Register.** Casual and direct, second person singular (*tu* in French). Decide once.

## 2. The string folders: `63/`, `packs.63.pt/`, `emails/`

These are key-for-key translations. The file must match `en-GB.json` exactly: the same keys,
nesting and order.

- **Placeholders.** `63/` uses `{count}`; `packs.63.pt/` and `emails/` use `{{count}}`.
  Copy each one exactly. You may move it within the sentence, but never rename, translate
  or drop it.
- **Markup.** Keep `**bold**` paired. Leave `CHECK_ICON` as it is. Keep the same number of
  `\n` (email `text` values end with one), keep the `•` bullets, and keep `<csv>…</csv>` and
  `<json>…</json>` around the words that should be links.
- **Plurals.** In `packs.63.pt/` only, add plural forms your language needs (`_zero`,
  `_two`, `_few`, `_many`). Never delete `_one` or `_other`.
- **Length.** In `63/`, stay within about 120% of the English. Buttons, mode titles and
  round names are the tightest.

### Grammar that depends on runtime values

A placeholder is filled in at runtime, so don't write grammar that only works for some
values. `tr-TR` shipped `"{name}'den"` and `"T{round}'de"`, whose suffixes are wrong for
most names and numbers.

- Rephrase so no word has to agree with the placeholder: `"{name} tarafından"`,
  `"{round}. turda"`.
- **French:** avoid `de {name}`, which should become `d'` before a vowel. Use `par {name}`.
  Watch gender and number agreement with `{count}` and `{name}` too.

### The tutorial (`rules.*`)

- **The example card.** `rules.default_card` is *Home Alone*. Use the official local title,
  and make `rules.round1.info` list that title's words as the forbidden ones.
- **The example clue must follow its own rule.** `rules.round1.clue1` can't contain any
  word from the local title. `tr-TR` used *evde* in the clue, then said *evde* was
  forbidden.
- **Jokes.** The example cards that flash past are jokes. Translate the joke, not the
  sentence.

### Other string lessons

- **The KIDS mode name.** `{kids}` renders the English **KIDS** wordmark. Every string that
  names the mode must use the same form (*KIDS modu*, not *ÇOCUK modu* next to the logo).
- **Labels followed by a name.** In `credits.*`, labels like *by* and *Developed with* are
  followed by a name. If your word order would put the name first, write them as labels
  (*Design :*).
- **Variants.** If you're writing a regional variant, adapt every string, not only the
  cards. `es-419` needed fixes for Spain-style past tenses (*Hemos enviado* → *Te
  enviamos*) and app wording (*Denunciar* → *Reportar*).
- **Mechanical replacements.** If you derive one variant from another, check for
  replacement bugs. `es-419` ended up with *de el* where it needed *del*.
- **Typography.** Pick one quotation style for the locale and use it in every file.
  `es-419` mixed « » and "". For `fr-FR`, use « » and a no-break space (U+00A0) before
  `: ; ! ?`.

## 3. The General deck: `general_packs/<lang>.json`

### File rules

- **Name.** Set `"name"` to the translated deck name (*Genel*, *Général*).
- **One card per English card kept.** Keep the English `id` and the English order.
- **Points.** Copy `points`. Change them only if the card is clearly easier or harder in
  your language, and say which ones changed and why in `AI_TRANSLATIONS.md`. For example,
  *Aurora Borealis* 3 → *Kuzey Işıkları* 2, *Papamobil* 1 → 2.
- **KIDS flag.** Copy `notForKids` unless the translation changes what the card is about.
- **No new cards.** Don't add cards that only work in your country. Those belong in a
  community pack.

### Titles: the team must say the exact title

A card only counts when the whole title is said, in order. So the title must be **the one
wording players in that country would actually say**. Dictionary-correct isn't enough.

- **Official local titles.** Use them for films, books, TV, toys and games: *Bugün Aslında
  Dündü*, *Atrapado en el tiempo* / *Hechizo del tiempo*, *Mr. Potato* / *Señor Cara de
  Papa*.
- **English where that's what people say.** Keep the English name when locals use it:
  *Moonwalk*, *Grumpy Cat*, *Dungeons & Dragons*, *Clickbait*, *Summer of '69*. Songs keep
  their English titles.
- **Idioms.** Use the local idiom, not a calque: *La gota que colma el vaso*, *Bardağı
  Taşıran Son Damla*.
- **Everyday phrasing.** Use the form people actually say: *Çoraplı Sandalet*, not *Çorap ve
  Sandalet*; *Pisar un Lego*, not *Pisar una pieza de Lego*; *El día de pierna*, not
  *piernas*.
- **Articles.** Only use one if speakers would say it. `tr-TR` had *Bir Teletabi* ("A
  Teletubby"), which forced the team to say *bir*.
- **Regional variants.** A variant like `es-419` needs its own titles, not the Spain ones:
  *alcancía*, *lentes*, *Las escondidas*, *Policía bueno, policía malo*.
- **Sources settle names, not phrases.** A publisher, distributor, rights holder or
  encyclopedia is the right authority for the name of a specific thing: a film, book, show,
  toy, game or sport. A children's game with an established name counts too (the French
  Wikipedia calls *The Floor Is Lava* *Le sol est en lave*). For idioms, slang and everyday
  situations, the authority is what players say, not what the press, fact-checkers or
  public institutions write. `tr-TR` briefly had *Tık Tuzağı* for *Clickbait*, the term
  fact-checking sites use, while most people just say *clickbait*.
- **Don't make the best clue a title word.** Every word in the title is forbidden in round 1.
  `tr-TR` briefly had *Klon Koyun Dolly*, which banned *klon* ("clone") on a card where that
  is the obvious clue. Keep the title to the name people use (*Koyun Dolly*).

### Dropping cards

Drop a card unless you're confident it plays well. **A shorter deck that plays well beats
a complete one.** Earlier drafts dropped 29 to 54 of the 230 cards. Drop when:

- **The phrase doesn't survive.** English idioms, wordplay and slang with no local
  equivalent (*One-Trick Pony*, *Double Dipping*, *Netflix and Chill*).
- **The title is coined.** A translation nobody says: *En Heyecanlı Yerde Bitmek* for *A
  Cliffhanger*, *Friends Ekibi*.
- **The wording competes.** Several natural wordings, so players would often miss the exact
  one (*concurso* / *duelo de miradas*, *5* / *3 saniye kuralı*).
- **It depends on an edition.** The exact text varies, as with Monopoly's *Go Directly to
  Jail*.
- **The reference is local or niche.** US-specific or weakly known references (*Super Bowl
  Halftime Show*, *Mr. Worldwide*, *Colonel Mustard* where Cluedo isn't played).
- **A regional variant splits.** The name differs across its countries: *Ratón Pérez* /
  *Ratón de los Dientes*, *clóset* / *ropero*.
- **The meaning changes.** The translation means something else locally. A Turkish pinky
  hook means you're *cross* with someone, not a promise.
- **Reviews disagree on the title.** If two careful reviews pick different titles, the
  wording isn't stable, so drop the card rather than settle on one. `fr-FR` switched *A Dad
  Joke* between *Une blague de tonton* and *Une blague de papa*, and dropped it. Don't flip
  a title back and forth.

If a native speaker would need to confirm the card, drop it now. It can come back later.

### Descriptions

A description is one plain definition sentence followed by an optional kicker (a fun fact
or joke), as in `general_packs/README.md`.

- **No title words.** A description can't contain a word from the title or a word with the
  same root (plurals, verb forms, derivations). Function words are fine. Check again after
  translating, because translations bring roots together. Real leaks from earlier drafts:
  - *Internet Explorer* → *internet tarayıcısı*
  - *Calentar pescado* → *recalentar*
  - *Bob Usta* → *ustasıyla*
  - *Bardağı Taşıran* → *taşması*

  If you change a title, re-check its description.
- **The kicker must add something.** It can't restate the first sentence. `es-ES` had
  about 50 cards saying the same fact twice (*Clickbait*, *Dopamina*, *MacGyver*,
  *Pelusa del ombligo*). Put the definition in sentence one and the fact or joke in sentence
  two. Don't repeat names or key words across them.
- **The kicker must be true of the translated title.** When *Doppelganger* became *Un
  doble*, "the word comes from German" became false. When a local idiom replaced *The Last
  Straw*, the English hay-and-camel explanation no longer applied.
- **English-only jokes.** Cut or replace a kicker that only works in English. *Uncle Ben*'s
  rice-brand joke was dropped.
- **Facts.** Don't invent them. Translate the English fact or leave the kicker out.
- **Local words.** Use them in descriptions too: `es-419` still had *cremallera*, *Oriente
  Próximo* and *aparcamientos*.

### Cards whose joke is the format

- **Nothing** has an empty description. Keep it `""`.
- **Déjà Vu** says the same sentence twice on purpose, because the card gives you déjà vu.
  Translate the sentence and write it twice. Don't "fix" it.

## 4. Records to update

- **`general_packs/DROPPED.md`:** add a `` ## `fr-FR` `` section. Open with a count
  sentence (*"**N of the 230 English cards have no French counterpart.** The remaining M
  are…"*). Then use `### <reason>` headings, each followed by a **single-column** table of
  **English** card titles. `readDropReasons()` in `scripts/lib/dropped.mjs` only reads
  single-column rows; a wider table is ignored by the spreadsheet export. List each missing
  card exactly once.
- **`README.md`:** add a row to the language table (*AI-generated draft — native review
  required*) and update the General card counts.
- **`general_packs/README.md`:** update the card-count sentence.
- **`AI_TRANSLATIONS.md`:** add a section for the language in the same shape as the Turkish
  and Spanish ones: scope and method, the terminology table, points changes, the app
  label and flag to register (*Français*, 🇫🇷), and anything still to check in context.

## 5. Check before you hand it over

Run the structural checks through the CSV round trip. Export writes the current JSON to a
spreadsheet, and a dry-run import runs every check without writing anything:

```bash
node scripts/export-csv.mjs fr-FR --out /tmp/63-check
node scripts/import-csv.mjs fr-FR --in /tmp/63-check --dry-run
```

Read every warning. It checks placeholders, `CHECK_ICON`, line breaks, bold pairs and
length in the string folders, and points, empty fields and **title-word leaks** in the
deck. The leak check is a heuristic. The empty-description warning on *Nothing* is
expected, and long strings are worth shortening.

Then check these by hand, which the scripts can't:

- [ ] Every string key from `en-GB` is present, in the same order.
- [ ] The deck keeps English ids, order, points and KIDS flags, apart from documented points
      changes.
- [ ] Every dropped card is in `DROPPED.md`, and nothing listed there is still in the deck.
- [ ] Each title is the one way locals say it, or the card is dropped.
- [ ] No description contains a title word or a word with the same root.
- [ ] No kicker repeats its first sentence, except *Déjà Vu*.
- [ ] Every kicker is still true for the translated title.
- [ ] The tutorial clue avoids the local *Home Alone* title words.
- [ ] Placeholder sentences read correctly for any value (names, numbers 1–10).
- [ ] One quotation style and one term per concept throughout.
- [ ] The counts in `README.md`, `general_packs/README.md` and `DROPPED.md` agree.

Put review notes in a `REVIEW.md` on the branch if you want, but remove it before the branch
is merged.
