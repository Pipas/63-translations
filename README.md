# 63 Translations

Central home for the translatable strings in **63**: the mobile game and the card deck that
ships with it.

If you want to help translate 63 into your language, or fix something that reads badly in
a language you speak, this is the only repo you need.

> **Start here:** [CONTRIBUTING.md](CONTRIBUTING.md) · [GLOSSARY.md](GLOSSARY.md) · [CONTRIBUTORS.md](CONTRIBUTORS.md)

## Languages

| Code | Language | Status |
| --- | --- | --- |
| `en-GB` | English (British) | Complete, source language |
| `pt-PT` | Portuguese (Portugal) | Complete |

Adding a new language means adding one file per folder below, named with the same
`<lang>-<REGION>.json` convention. A partial language is welcome — see
[Where to start](#whats-in-each-folder) below for which folder is worth your time first.

## What's in each folder

| Folder | What it translates | Size |
| --- | --- | --- |
| [`63/`](63) | The 63 mobile game (iOS + Android) | ~288 strings |
| [`packs.63.pt/`](packs.63.pt) | The pack editor at [packs.63.pt](https://packs.63.pt) | ~352 strings |
| [`emails/`](emails) | The emails 63 sends | ~51 strings |
| [`general_packs/`](general_packs) | The General card deck shipped with the app | 230 EN / 185 PT cards |

Each folder has its own `README.md` with the file format, the key conventions, and the
gotchas specific to that surface. **Read it before you start editing.** The folders don't
all use the same JSON shape or the same rules.

[`63/`](63), [`packs.63.pt/`](packs.63.pt) and [`emails/`](emails) are strict translations:
every key that exists in `en-GB.json` must exist in the translated file with the same
shape. They share that shape but not a placeholder syntax — `63/` uses `{count}`, the other
two use `{{count}}` — and `packs.63.pt/` is the only folder where plural keys let a
translation have keys the English doesn't.

[`general_packs/`](general_packs) is translated too, but not key-for-key, so the key check
doesn't apply to it and a translated deck is expected to be shorter than the English one.
It has its own rules about what to drop, what belongs in General at all, and how to write a
card. Read [`general_packs/README.md`](general_packs/README.md) before touching it.

**Start with [`63/`](63).** It's the game itself, and it's what a language needs before it
can ship. [`packs.63.pt/`](packs.63.pt) is a website most players never open, and
[`emails/`](emails) is 51 strings you can do in an evening — both can follow later.

Everything in these folders is text a player sees. The moderation tooling and the emails
that go to maintainers aren't here at all — they stay English, in the app's own repo, so
nobody spends an evening translating a screen only maintainers will ever open.

The strings for the site at [63.pt](https://63.pt) aren't here yet.

## How changes reach players

This repo is the source of truth for 63's translations. New releases are generated from
what's here, so once your change is merged it ships with the next one.

`63/` and `general_packs/` go out with the next app release on the App Store and Google
Play. `packs.63.pt/` and `emails/` go out with the next deploy of the website and its
backend, which is usually sooner.

The website reads these files as they are — same nested JSON, same `<lang>-<REGION>` names —
so syncing is a straight copy. A brand new language still needs registering in the site and
adding to its language picker; that's a maintainer's job, so open your PR here and don't
worry about it.

## Credit

Translators are credited in the app. Every language that ships puts its translators on the
in-game credits screen, alongside the people who wrote the cards and built the game.

Add yourself to [CONTRIBUTORS.md](CONTRIBUTORS.md) in the same pull request as your
translation, and it carries through to the app from there.

## About 63

63 is a party word-guessing game: one phone, two teams, three rounds. Players pass the
phone around and take turns getting their team to guess cards, first by describing them,
then with one word, then with mime. It's free on iOS and Android, made in Portugal 🇵🇹.
