# Contributing

Thank you for helping translate 63. This guide covers fixing an existing translation and
adding a whole new language.

You don't need to install anything or know how to code. Every file here is plain JSON.

## The short version

1. Fork the repo and make a branch.
2. Edit the JSON. Keep the keys, change only the values.
3. Open a pull request describing what you changed and why.
4. Add yourself to [CONTRIBUTORS.md](CONTRIBUTORS.md).

## Before you translate anything

Read [GLOSSARY.md](GLOSSARY.md). 63 has a handful of terms (*pack*, *deck*, *round*,
*turn*, *skip*) that mean specific things in this game and must be translated the same way
every single time. A player who sees *baralho* on one screen and *maço* on the next thinks
they're two different things.

Then read the `README.md` inside the folder you're editing. The folders don't all use the
same JSON shape or the same rules.

## Fixing or improving an existing translation

Open the file, find the key, change the value. That's it. A few rules:

**Never change a key.** Keys are how the code finds the string. If you rename
`common.start_turn`, that button shows a blank or an error. Only values get edited.

**Never delete a key.** Even if a string looks unused, something references it. If you
believe a key is dead, say so in the PR instead of removing it.

**Adding a key is allowed in exactly one case: plurals.** Keys in `packs.63.pt/` ending in
`_one` and `_other` are plural forms, and languages don't all have two of them. If yours
needs `_few`, `_many`, `_zero` or `_two`, add them next to the ones already there. This is
the only exception; see [`packs.63.pt/README.md`](packs.63.pt/README.md).

**Keep placeholders exactly as they are.** They get replaced with real values at runtime.
**The string folders don't all use the same braces**, because different libraries read them.

In `63/`, single braces:

```json
"cards_left": "{count} cards left"     →     "{count} cartas restantes"
```

In `packs.63.pt/` and `emails/`, double braces:

```json
"cardCount_other": "{{count}} cards"   →     "{{count}} cartas"
```

Copy whatever the English row has. Never convert one style into the other. You can move a
placeholder within the sentence if your language needs a different word order, but you
cannot rename it, translate it, or drop it.

**Keep the escapes.** `\n` is a real line break in the app. `•` bullets and emoji are all
deliberate, so copy them through.

**Watch the length.** In `63/` these strings live in buttons and cards on a phone screen,
and a translation 40% longer than the English overflows. When in doubt, match the English
length. `63/README.md` lists the tightest spots. `packs.63.pt/` is a web page where long
text wraps instead of being truncated, so there's more room — but not unlimited. `emails/`
is looser still, except for subject lines, which a phone inbox cuts off around 40
characters.

**Match the register.** 63 talks to players casually and directly. In `pt-PT` that means
*tu*, never *você*: *"Tens a certeza que queres sair?"*, not *"Tem a certeza que deseja sair?"*

## Adding a new language

Pick the right code. Use `<lang>-<REGION>`, matching the existing files: `es-ES`, `fr-FR`,
`pt-BR`. Region matters. Portuguese for Portugal and Portuguese for Brazil are separate
languages as far as this repo is concerned.

**Do `63/` first.** It's the game, and it's what a language needs before it can ship.
`packs.63.pt/` is a website and `emails/` is 51 strings; a language is perfectly usable
without either.

For `63/`, `packs.63.pt/` and `emails/`:

1. Copy `en-GB.json` to `<your-code>.json`.
2. Translate every value, leaving every key untouched.

For `general_packs/`, translate `en-GB.json` card by card, and drop any card that won't play
well in your language: the wordplay doesn't survive, there's no common word for the thing,
or it simply falls flat once translated. Your judgement on that last one is enough. Record
every drop in [`general_packs/DROPPED.md`](general_packs/DROPPED.md) with the reason. Don't
add cards that only make sense in your country; those belong in a community pack. See
[`general_packs/README.md`](general_packs/README.md).

A new language also needs a change inside the app and the website themselves, to register
the locale and add it to the language pickers. That's handled by a maintainer, so open your
PR here first and don't worry about it.

Partial translations are welcome as a starting point, but a language only ships once `63/`
is complete. A half-translated app is worse than an English one. `packs.63.pt/`, `emails/`
and `general_packs/` don't hold a language back — the website falls back to English string by
string, and a shorter deck is a normal deck.

## Opening the pull request

Say which language and which folders you touched, and flag anything you were unsure about:
a term with no good equivalent, a joke that doesn't survive translation, a string you had to
shorten to fit. Those notes are more useful than a clean diff.

If your change introduces a term worth standardising, add it to `GLOSSARY.md` in the same PR.

## Questions

Open an issue. If you speak the language and something reads wrong to you, you're right.
That's exactly the feedback this repo exists to collect.
