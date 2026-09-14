# `scripts/`: JSON ⇄ CSV for Google Sheets

For translators who'd rather work in a spreadsheet than in JSON on GitHub.

Two scripts, no dependencies, Node 18 or newer. Nothing here ships with the app; it's a
maintainer tool for getting words in and out of the repo.

```bash
node scripts/export-csv.mjs pt-BR --reference pt-PT   # JSON  → csv/pt-BR/*.csv
node scripts/import-csv.mjs pt-BR                     # csv/pt-BR/*.csv → JSON
```

## The loop

1. **Export.** `node scripts/export-csv.mjs es-ES` writes one CSV per folder:
   `csv/es-ES/63.csv`, `csv/es-ES/packs.63.pt.csv`, `csv/es-ES/emails.csv` and
   `csv/es-ES/general_packs.csv`.
2. **Upload.** In Google Sheets: *File → Import → Upload*, one sheet per CSV, separator
   *Detect automatically*. Share it with whoever's translating.
3. **They translate.** They fill in one column per file and leave the rest alone.
4. **Download.** *File → Download → Comma-separated values*, and put the file back in
   `csv/es-ES/` under its original name.
5. **Import.** `node scripts/import-csv.mjs es-ES` writes `63/es-ES.json`,
   `packs.63.pt/es-ES.json`, `emails/es-ES.json`, `general_packs/es-ES.json` and
   `general_packs/card-map.json`,
   and prints everything worth a second look. A surface with no CSV in the folder is
   skipped, so exporting and importing `--only 63` works fine on its own.
6. **Check and commit.** Import prints anything worth a second look; read that before
   opening the PR.

`csv/` is gitignored. The JSON is the source of truth; the CSVs are scratch.

## Showing another language next to the English

`--reference pt-PT` adds read-only columns with the Portuguese for every row. A translator
who reads Portuguese better than English, or who wants to see how a card was handled once
already, gets both. It takes more than one: `--reference pt-PT,es-ES`.

Reference columns are never read back on import. Only the target language's columns are.

## `63.csv`, `packs.63.pt.csv` and `emails.csv` — the app strings

These folders hold the same shape of JSON, so they get the same shape of sheet:

| Column | |
| --- | --- |
| `key` | Dot path, e.g. `common.start_turn`. Don't touch. |
| `english` | The source string. Don't touch. |
| `<lang> (reference)` | Only with `--reference`. Another language, for comparison. Don't touch. |
| `<lang>` | **The translation.** The only column to fill in. |
| `notes` | Anything the translator wants to flag. Printed on import, never shipped. |

One row per string: 302 for `63`, 448 for `packs.63.pt`, 51 for `emails`. Every key must survive, so a row
left blank imports as the English string rather than a hole in the file, and the import
prints the count.

**Line breaks are written `\n`**, as two characters, to keep every row on one line. Import
turns them back into real breaks, and also accepts a real in-cell break (alt+enter) if
someone types one.

**Adding rows.** Import rebuilds the file from the English, so a row whose `key` isn't in
`en-GB.json` is dropped with a warning. The one exception is `packs.63.pt`, where a
translator can add plural forms English doesn't have — a `card.points_few` row is kept as
long as `card.points_one` or `card.points_other` exists. Import counts those separately.

## `general_packs.csv` — the card deck

| Column | |
| --- | --- |
| `en_id` | Which card this row is. Don't touch. |
| `en_title`, `en_description`, `en_points` | The English card. Don't touch. |
| `<lang> title`, `<lang> description` | Only with `--reference`. Don't touch. |
| `title`, `description` | **The translation.** |
| `points` | 1, 2 or 3, copied from the English. Change it if the card is harder or easier in this language. |
| `not_for_kids` | `yes` if the card is hidden in KIDS mode, copied from the English. Clear it or set it if the translation changes that. See [`general_packs/README.md`](../general_packs/README.md#kids-mode). |
| `drop` | `yes` if the card shouldn't exist in this language. |
| `notes` | Why it was dropped, or anything else. |
| `observations` | Auto-filled: what happened to this card in other languages. |

The card's own id for this language isn't in the sheet at all — `card-map.json` holds it,
and import puts it back. Nothing good comes of a translator editing an id.

The first row is special: `en_id` is `PACK_NAME` and its `title` cell is the translated name
of the deck itself (*General* → *Geral*).

A deck is **expected to be shorter than the English one**. Cards get dropped when the
wordplay doesn't survive or there's no common word for the thing — see
[`general_packs/README.md`](../general_packs/README.md). Rows marked `drop` are left out of
the JSON, and import prints them as a Markdown table ready to paste into
[`DROPPED.md`](../general_packs/DROPPED.md). A row with `drop` set but no reason gets
flagged, because `DROPPED.md` wants one.

Rows left entirely blank are counted as untranslated and skipped. New cards can be added at
the bottom: fill in `title` and `description`, leave everything else empty.

### The `observations` column

Auto-filled from [`card-map.json`](../general_packs/card-map.json) and `DROPPED.md`, for
every language that has a deck — not just the ones with columns in the sheet. Someone
starting a new language wants to know a card was dropped from Portuguese, and why, whether
or not they asked to see the Portuguese:

```
dropped in pt-PT — English idiom or wordplay
no pt-PT card
no English card, only pt-PT
```

It's there so a blank row explains itself: *The Friendzone* has no Portuguese translation
because it was dropped, not because someone forgot.

## `card-map.json` — which card is which

Card ids are per-row database identities and **don't line up between languages**. Nothing
in the deck files says that "Sleepwalking" and "Sonambulismo" are the same card, so
[`general_packs/card-map.json`](../general_packs/card-map.json) does: one entry per card,
one id per language.

```json
{ "title": "Acne", "ids": { "en-GB": "b15166bd…", "pt-PT": "82a3e9c1…" } }
```

A missing language means that language has no such card — dropped, or not translated yet.
An entry with no `en-GB` id is a card that exists only in a translation; there are two of
those in `pt-PT`.

The 178 `en-GB` ↔ `pt-PT` pairs were matched by hand, once, and reconciled against
`DROPPED.md`: 178 translated + 47 dropped = the 225 English cards, and 178 + 2 Portuguese-only
= the 180 Portuguese ones. Everything after that is maintained by `import-csv.mjs`, which
records what each language calls each card as it comes back from the sheet.

This is what makes the round trip work at all: it's how a re-export pre-fills the
Portuguese, how `observations` knows what was dropped where, and how a card keeps its
identity across languages that don't share ids.

**Cards with no id yet.** A card added in the sheet, or translated from one of the
Portuguese-only cards, has no id to inherit. It gets `new-1`, `new-2`, … — deliberately
fake, and replaced when the maintainer imports the pack into the app and real ids get
issued. Update `card-map.json` when that happens; the next export will otherwise say a
mapped id isn't in the deck any more, which is exactly the warning you want.

## What import checks

Warnings never rewrite anything, they just print. `--strict` refuses to write if there are
any; `--dry-run` reports and writes nothing regardless.

For the string folders: missing or invented placeholders, a lost `CHECK_ICON`, a
changed number of line breaks, unpaired `**bold**` markers, translations over the length
budget, rows whose key isn't in `en-GB.json`, duplicate keys.

Two of those are per-folder. Placeholders are matched with that folder's syntax — `{count}`
in `63/`, `{{count}}` in the other two — so swapping one style for the other reads as both
a missing and an invented placeholder. And the length budget is tighter for `63/`
(~120% of the English) than for `packs.63.pt/` (~180%) or `emails/` (~220%), because a phone button truncates
where a web page wraps. Both budgets also allow a flat few characters on top, so a short
label isn't flagged for being one word longer.

For `general_packs/`: `points` outside 1–3, a description with no title, a title with no
description, and **title words leaking into the description** — the rule that makes a card
unplayable. That last check is a heuristic: it folds accents, ignores short words, and
matches on word stems, so it both misses things and occasionally cries wolf. Treat a hit as
a reason to re-read the card.

## Re-exporting a language that already exists

Export pre-fills the translation columns from the existing JSON, so the sheet becomes a
review pass instead of a blank slate. `--blank` skips that.

Import doesn't reorder a deck it has seen before: cards keep the position they had, and
newly translated ones go on the end. Re-importing a language nobody has touched produces no
diff at all.

## Options

```
node scripts/export-csv.mjs <lang> [--reference <lang>[,<lang>]] [--only <surface>] [--out <dir>] [--blank]
node scripts/import-csv.mjs <lang> [--only <surface>] [--in <dir>] [--strict] [--dry-run]
```

`<lang>` is a `<lang>-<REGION>` code: `pt-BR`, `es-ES`, `fr-FR`.

`<surface>` is a folder name: `63`, `packs.63.pt` or `general_packs`. Omit `--only` to do
all three.
