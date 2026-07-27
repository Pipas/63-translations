# Contributing

Thank you for helping translate 63. This guide covers fixing an existing translation and
adding a whole new language.

You don't need to install anything or know how to code. Every file here is plain JSON.

## The short version

1. Fork the repo and make a branch.
2. Edit the JSON. Keep the keys, change only the values.
3. Check your JSON is valid and the keys still match. See [Checking your work](#checking-your-work).
4. Open a pull request describing what you changed and why.
5. Add yourself to [CONTRIBUTORS.md](CONTRIBUTORS.md).

## Before you translate anything

Read [GLOSSARY.md](GLOSSARY.md). 63 has a handful of terms (*pack*, *deck*, *round*,
*turn*, *skip*) that mean specific things in this game and must be translated the same way
every single time. A player who sees *baralho* on one screen and *maço* on the next thinks
they're two different things.

Then read the `README.md` inside the folder you're editing. The two folders use different
JSON shapes and have different rules.

## Fixing or improving an existing translation

Open the file, find the key, change the value. That's it. A few rules:

**Never change a key.** Keys are how the code finds the string. If you rename
`common.start_turn`, that button shows a blank or an error. Only values get edited.

**Never delete a key.** Even if a string looks unused, something references it. If you
believe a key is dead, say so in the PR instead of removing it.

**Keep placeholders exactly as they are.** They get replaced with real values at runtime:

In `63/` they look like `{count}` and `{name}`, single braces:

```json
"cards_left": "{count} cards left"     →     "{count} cartas restantes"
```

You can move a placeholder within the sentence if your language needs a different word
order. You cannot rename it, translate it, or drop it.

**Keep the escapes.** `\n` is a real line break in the app. `•` bullets and emoji are all
deliberate, so copy them through.

**Watch the length.** These strings live in buttons and cards on a phone screen, and a
translation 40% longer than the English overflows. When in doubt, match the English length.
Some strings have hard constraints documented in the folder README; `63/README.md` has a
list.

**Match the register.** 63 talks to players casually and directly. In `pt-PT` that means
*tu*, never *você*: *"Tens a certeza que queres sair?"*, not *"Tem a certeza que deseja sair?"*

## Adding a new language

Pick the right code. Use `<lang>-<REGION>`, matching the existing files: `es-ES`, `fr-FR`,
`pt-BR`. Region matters. Portuguese for Portugal and Portuguese for Brazil are separate
languages as far as this repo is concerned.

For `63/`:

1. Copy `en-UK.json` to `<your-code>.json`.
2. Translate every value, leaving every key untouched.
3. Run the key check (below) against `en-UK.json`.

For `general_packs/`, translate `en-UK.json` card by card, and drop any card that won't play
well in your language: the wordplay doesn't survive, there's no common word for the thing,
or it simply falls flat once translated. Your judgement on that last one is enough. Record
every drop in [`general_packs/DROPPED.md`](general_packs/DROPPED.md) with the reason. Don't
add cards that only make sense in your country; those belong in a community pack. See
[`general_packs/README.md`](general_packs/README.md).

A new language also needs a change inside the app itself, to register the locale and add it
to the language picker. That's handled by a maintainer, so open your PR here first and
don't worry about it.

Partial translations are welcome as a starting point, but a language only ships once `63/`
is complete. A half-translated app is worse than an English one.

## Checking your work

Two things must hold: the JSON must parse, and the keys must match `en-UK.json` exactly.

Validate the JSON, every file at once:

```bash
find . -name "*.json" -exec sh -c 'python3 -m json.tool "$1" > /dev/null && echo "ok  $1" || echo "BAD $1"' _ {} \;
```

Compare the app strings against the source language:

```bash
python3 - <<'EOF'
import json, sys, pathlib

def flatten(obj, prefix=""):
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from flatten(v, f"{prefix}.{k}" if prefix else k)
    else:
        yield prefix

ok = True
src = set(flatten(json.load(open("63/en-UK.json"))))
for path in sorted(pathlib.Path("63").glob("*.json")):
    if path.name == "en-UK.json":
        continue
    keys = set(flatten(json.load(path.open())))
    missing, extra = sorted(src - keys), sorted(keys - src)
    if missing or extra:
        ok = False
        print(path)
        for k in missing: print(f"  missing: {k}")
        for k in extra:   print(f"  extra:   {k}")
    else:
        print(f"ok  {path}")
sys.exit(0 if ok else 1)
EOF
```

Both should come back clean before you open the PR. `general_packs/` is deliberately left
out of the key check, because those decks aren't supposed to match.

Finally, read your translation out loud. Most bad translations are grammatically correct
and sound like nothing a person would say.

## Opening the pull request

Say which language and which folders you touched, and flag anything you were unsure about:
a term with no good equivalent, a joke that doesn't survive translation, a string you had to
shorten to fit. Those notes are more useful than a clean diff.

If your change introduces a term worth standardising, add it to `GLOSSARY.md` in the same PR.

## Questions

Open an issue. If you speak the language and something reads wrong to you, you're right.
That's exactly the feedback this repo exists to collect.
