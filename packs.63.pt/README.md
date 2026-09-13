# `packs.63.pt/`: the pack editor

Every string on [packs.63.pt](https://packs.63.pt), the website where players build their
own card packs and submit them to the community browser in the app.

This is a website, not the game. Nothing here appears mid-turn with a timer running, so
there's more room than in [`63/`](../63) — but it's the first thing a would-be pack author
sees, and a pack that never gets made is a pack nobody plays. Read
[`GLOSSARY.md`](../GLOSSARY.md) before you start: *pack*, *deck* and *card* mean the same
things here as they do in the game, and must be translated the same way.

## File format

Nested JSON, grouped by namespace, exactly like `63/`. Strings are looked up by their dot
path: `common.cancel`, `pack.appearance.shuffleEmojis`.

```json
{
  "common": {
    "cancel": "Cancel"
  },
  "pack": {
    "appearance": {
      "shuffleEmojis": "Shuffle emojis"
    }
  }
}
```

Keep the nesting identical to `en-GB.json`. A flattened or re-grouped file won't resolve.

The 25 namespaces, largest first:

| Namespace | Strings | What's in it |
| --- | --- | --- |
| `pack` | 92 | The pack editor itself, including the cover and colour pickers, and importing and exporting cards. |
| `publish` | 69 | Sharing a pack, and its status in the community browser. |
| `card` | 63 | The card list: sorting, grouping, filtering, searching, selecting, drafts. |
| `auth` | 47 | Sign-in, registration, password reset, and their error messages. |
| `toast` | 31 | Confirmations and failures, one line each. |
| `dialog` | 26 | Confirmation dialogs. Titles are short, descriptions are prose. |
| `collaboration` | 23 | Inviting people to edit a pack together. |
| `validation` | 14 | Inline form errors. |
| `submit` | 14 | Submitting a pack for review, including the KIDS mode question. |
| `account` | 11 | Account settings. |
| `home` | 9 | The pack list. |
| `join` | 9 | Opening someone else's invite link. |
| `common` | 6 | Buttons shared across the site. |
| `licences` | 5 | The licences page. |
| `share` | 5 | Share links and app-store fallbacks. |
| `cookies` | 4 | The cookie banner. |
| `legal` | 3 | The legal index page. |
| `banner`, `community`, `emoji`, `menu`, `password`, `upgrade` | 2 each | Small, self-explanatory. |
| `changelog`, `guidelines` | 1 each | Page titles. |

## Placeholders

**Double braces: `{{count}}`, `{{name}}`, `{{date}}`.** Note that this is *not* the same as
`63/`, which uses single braces. Both files get read by different libraries. Copy whatever
the English row has and don't convert between the two.

```json
"cardCount_other": "{{count}} cards"     →     "{{count}} cartas"
```

Reorder within the sentence if your grammar needs it. Never rename, translate, or drop one.

**`<csv>…</csv>` and `<json>…</json>` in `pack.transfer.import.templateHint`.** The text
between the tags becomes a link that downloads that template. Translate the text inside,
keep both tags exactly as written, and keep each pair wrapped around the words that should
be the link.

## Plurals

Keys ending in `_one` and `_other` are the two plural forms English needs:

```json
"card": {
  "points_one": "{{count}} point",
  "points_other": "{{count}} points"
}
```

**This is the one place a translated file may have keys the English doesn't.** If your
language has more plural categories, add them: `_zero`, `_two`, `_few`, `_many`. Polish
needs `_few` and `_many`; Arabic uses all six. If your language has only one form, translate
both keys to the same string rather than deleting one — the key check wants them present.

There are 36 plural keys in `en-GB.json`. Everything else is a plain string.

## Tone

Same voice as the game: casual, direct, second person singular. In `pt-PT` that means *tu*,
never *você*.

Two things read differently from `63/`:

**Errors and validation** (`auth.errors.*`, `validation.*`) are the one place the site is
plain and unfunny. Someone is locked out of their account. Say what went wrong and what to
do about it, nothing else.

**`publish.*` and `submit.*`** are asking someone to share their work with strangers and
have it reviewed. Encouraging, never pushy, and honest about what review means. Don't
promise a pack will be accepted.

## Sentence case

UI text is sentence case in both languages: only the first word and proper nouns are
capitalised. *Create account*, not *Create Account*. Proper nouns that stay capitalised:
*Google*, *App Store*, *Google Play*, and the game's name, *63*.

## Punctuation

Terminal punctuation depends on what the string is, and the English is already consistent
about it. Match what the English row does:

- **No full stop** on buttons, labels, titles, menu items, placeholders, chips, short toasts
  and inline validation errors.
- **Full sentence punctuation** on prose: error messages, descriptions, hints, subtitles,
  and anything more than one sentence.
