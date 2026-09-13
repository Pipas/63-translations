# `63/`: the 63 mobile game

Every string in the app: menus, settings, the in-game HUD, and the full interactive
tutorial.

This is the highest-stakes folder in the repo. These strings are on a phone screen, in
buttons, mid-game, with a 63-second timer running. Read [`GLOSSARY.md`](../GLOSSARY.md)
before you start.

## File format

Nested JSON, grouped by namespace. Strings are looked up by their dot path:
`common.start_turn`, `rules.round1.subtitle`.

```json
{
  "common": {
    "start_turn": "Start turn",
    "cards_left": "{count} cards left"
  },
  "mode": {
    "classic": {
      "title": "Classic",
      "description": "Standard 63 ruleset. Three rounds, two teams and one winner!"
    }
  }
}
```

The eight top-level namespaces:

| Namespace | What's in it |
| --- | --- |
| `common` | Buttons, labels, settings, dialogs. The bulk of the UI. |
| `mode` | The five game modes and their descriptions. |
| `rules` | The interactive tutorial. Long-form, the most personality. |
| `support` | The support/donation screen. |
| `credits` | Credit line labels only. The names themselves live in the app, not here. |
| `deck` | Deck-building screen. |
| `packs` | Pack selection and the "make your own" CTA. |
| `post_game` | End-of-game results. |

Keep the nesting identical to `en-GB.json`. A flattened or re-grouped file won't resolve.

## Placeholders and markup

**`{count}`, `{name}`, single braces.** Replaced at runtime.

```json
"cards_left": "{count} cards left"     →     "{count} cartas restantes"
```

Reorder within the sentence if your grammar needs it. Never rename, translate, or drop one.

**`{kids}` in `deck.kids_mode_label`.** Swapped for the *KIDS* wordmark on the deck
screen. Keep it exactly once, wherever the word belongs in your language: `"{kids} mode"` →
`"Modo {kids}"`.

**`**bold**` in `rules.*`.** Renders as bold in the tutorial. Put the emphasis on the
equivalent word in your language, and keep the asterisks paired:

```json
"During a **turn**, the team in play guesses as many cards as they can"
"Durante um **turno**, a equipa em jogo tenta adivinhar o maior número de cartas"
```

**`CHECK_ICON` in `rules.controls.guess_text`.** Substituted with the ✓ button graphic.
Leave it in caps, exactly as written, and place it where the icon should appear.

**`\n` is a real line break.** Almost always deliberate layout: a two-line button label, a
paragraph break in a tooltip. Keep the same number of them.

**`•` bullets** appear inside `common.rounds_tooltip`. Keep the list structure.

## Length constraints

Strings here sit in fixed-size buttons and cards. A translation much longer than the
English will overflow or get truncated on a small phone.

General rule: **stay within about 120% of the English length**, and shorter is safer.

The tightest spots:

### Button labels

`common.start_turn`, `common.end_turn`, `common.end_round`, `common.end_game`,
`common.leave_game`, `common.start_game` all sit in buttons. One or two words. If your
language can't do it in two words, pick the shortest phrasing that still makes sense.

### Mode titles

`mode.*.title` shows in the mode picker. Single word wherever possible. See how `pt-PT`
used *Relâmpago* for *Blitz* and *Amigável* for *Chill*.

### `rules.round*.subtitle`

The round name shown large during play. Two or three words at most.

## Tone

The tutorial (`rules.*`) has the most voice in the whole product: asides, jokes, and a few
cards that flash by too fast to read on purpose (`rules.example_card_2` through
`example_card_5`). Those are meant to be funny. Translate the joke, not the sentence. A
literal rendering of a joke that doesn't work in your language is worse than a different
joke that does.

Everything outside `rules.*` is plain and functional. Don't add enthusiasm the English
doesn't have.