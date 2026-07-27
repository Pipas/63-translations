# 63 Translations

Central home for the translatable strings in **63**: the mobile game and the card deck that
ships with it.

If you want to help translate 63 into your language, or fix something that reads badly in
a language you speak, this is the only repo you need.

> **Start here:** [CONTRIBUTING.md](CONTRIBUTING.md) · [GLOSSARY.md](GLOSSARY.md) · [CONTRIBUTORS.md](CONTRIBUTORS.md)

## Languages

| Code | Language | Status |
| --- | --- | --- |
| `en-UK` | English (British) | Complete, source language |
| `pt-PT` | Portuguese (Portugal) | Complete |

Adding a new language means adding one file per folder below, named with the same
`<lang>-<REGION>.json` convention.

## What's in each folder

| Folder | What it translates | Size |
| --- | --- | --- |
| [`63/`](63) | The 63 mobile game (iOS + Android) | ~288 strings |
| [`general_packs/`](general_packs) | The General card deck shipped with the app | 225 EN / 180 PT cards |

Each folder has its own `README.md` with the file format, the key conventions, and the
gotchas specific to that surface. **Read it before you start editing.** The two folders use
different JSON shapes and different rules.

[`63/`](63) is a strict translation: every key that exists in `en-UK.json` must exist in
`pt-PT.json` with the same shape.

[`general_packs/`](general_packs) is translated too, but not key-for-key, so the key check
doesn't apply to it and a translated deck is expected to be shorter than the English one.
It has its own rules about what to drop, what belongs in General at all, and how to write a
card. Read [`general_packs/README.md`](general_packs/README.md) before touching it.

The strings for the pack editor at [packs.63.pt](https://packs.63.pt) and the site at
[63.pt](https://63.pt) aren't here yet. They're coming in a later commit.

## How changes reach players

This repo is the source of truth for 63's translations. New releases of the app are
generated from what's here, so once your change is merged it ships with the next release.

## Credit

Translators are credited in the app. Every language that ships puts its translators on the
in-game credits screen, alongside the people who wrote the cards and built the game.

Add yourself to [CONTRIBUTORS.md](CONTRIBUTORS.md) in the same pull request as your
translation, and it carries through to the app from there.

## About 63

63 is a party word-guessing game: one phone, two teams, three rounds. Players pass the
phone around and take turns getting their team to guess cards, first by describing them,
then with one word, then with mime. It's free on iOS and Android, made in Portugal 🇵🇹.
