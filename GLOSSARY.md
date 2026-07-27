# Glossary

The terms below are 63's vocabulary. They mean something specific inside the game, and
they must be translated the **same way every time**, in every folder of this repo.

Consistency matters more than elegance here. A player who sees one word for *deck* on the
deck screen and a different one in the rules will assume they're two different things. Pick
the word once, then use it everywhere, even where a synonym would read better in isolation.

If you're adding a language, work through this file first and decide your equivalents
before you touch any JSON.

## Core game terms

| Term | What it means |
| --- | --- |
| **Card** | One thing to guess. Has a title, a description, and a point value. |
| **Title** | The words on the card that the team has to say to score. |
| **Description** | The line under the title. A short definition, usually with a kicker. See [`general_packs/README.md`](general_packs/README.md). |
| **Pack** | A themed collection of cards (General, Movies, Music). Chosen before a game. |
| **Deck** | The shuffled set of cards assembled for one game, drawn from the selected packs. |
| **Round** | One of the three passes through the deck, each with its own clue-giving rule. |
| **Turn** | One player's 63 seconds of giving clues. Many turns make a round. |
| **Team** | A group of players. Two by default. |
| **Points** | What a guessed card is worth. Harder cards are worth more. |
| **Score** | A team's running total. |
| **Clue** | What the clue-giver says (or mimes) to get their team to the title. |
| **Guess** | To correctly say a card's title. Also the button that marks it correct. |
| **Skip** (a card) | To give up on a card and draw the next one. |
| **Skip** (a screen) | To dismiss the tutorial. A different action from skipping a card, and worth a different word if your language has one. |
| **Penalty** | Seconds deducted from the timer when a card is skipped. |
| **Game mode** | A named bundle of settings: Classic, Chill, Competitive, Blitz, Custom. |
| **Community pack** | A pack built and published by a player at [packs.63.pt](https://packs.63.pt), rather than one that ships with the app. Where country-specific cards belong. |

**Deck vs Pack.** A pack is what you *choose*; a deck is what you *play*. One game's deck is
built from several packs. If your language has one natural word for both, invent a
distinction. Mixing them up is the single easiest way to confuse a player.

**"Pack" often survives untranslated.** It does in `pt-PT`, where the app says *Novo pack*,
*Editar pack*, *Eliminar pack*. If the English word is already what people say in your
language, keep it rather than reaching for a translation that collides with *deck*.

## The three rounds

Each round's name is a rule, not a label. Translate the meaning, not the words.

| Round | Name | Rule |
| --- | --- | --- |
| 1 | **Forbidden words** | Describe freely, but never say a word from the title. |
| 2 | **One word only** | A single word as the entire clue. No sounds, no gestures. |
| 3 | **Charades** | No words at all. Gestures and sounds only. |

## Game modes

Mode names are product names. They show up in the mode picker, so keep them short and
punchy; a literal translation that runs long will break the layout.

| Mode | What it is |
| --- | --- |
| **Classic** | The standard ruleset. Three rounds, two teams, one winner. |
| **Chill** | No points, no penalties, everyone plays together. |
| **Competitive** | Skipping carries a penalty. |
| **Blitz** | Fewer cards, less time, no skipping. |
| **Custom** | Build your own mode. |

Go for the mood over the dictionary. `pt-PT` renders *Chill* as *Amigável* (friendly) and
*Blitz* as *Relâmpago* (lightning), neither of which is literal, and both of which land.

## Voice and register

63 talks to the player directly and casually, like a friend explaining a game at a table.


## Things that are not words

Some strings contain markup that must survive translation intact:

| Token | Where | Meaning |
| --- | --- | --- |
| `**text**` | `63/rules.*` | Renders bold in the tutorial. Move the emphasis to the right word in your language, but keep the asterisks paired. |
| `CHECK_ICON` | `63/rules.controls.guess_text` | Replaced with the ✓ button image at runtime. Leave it exactly as-is, in caps. |
| `{count}`, `{name}` | `63/` | Runtime values. Reorder if your grammar needs it; never rename or translate. |
| `\n` | everywhere | A real line break. Usually deliberate layout, not filler. |
| `•` | `63/common.rounds_tooltip` | Bullet list inside a tooltip. |
