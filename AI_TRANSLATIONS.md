# AI-generated Turkish translation

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
- Automated checks confirm matching keys, placeholders, markup and line breaks in the app
  file, and unchanged IDs and KIDS flags on every retained General card. Points were lowered
  for *Kuzey Işıkları* and raised for *Papamobil*, *Çarpışma Testi Mankeni* and
  *Dungeons & Dragons* to reflect their difficulty in Turkish.
- `packs.63.pt/` and `emails/` are intentionally outside this draft's scope.

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

Native review should pay particular attention to short mobile labels, the official Turkish
titles used for films, television programmes, toys and games in the General deck, and the
playability of newer internet terms. `rules.home.call_to_action` (*Karşında*) should also be
checked in the actual tutorial layout.

No native reviewer was available, so every General card whose exact Turkish title could not
be confirmed was dropped rather than shipped with an uncertain title. Those cards are listed
in [`general_packs/DROPPED.md`](general_packs/DROPPED.md) with the question a native speaker
needs to answer before adding each one back.

Two details also need an in-context native check: confirm whether Bob Usta's Turkish-dub
catchphrase is *Halledebilir miyiz?* or *Yapabilir miyiz?*, and check whether
`post_game.skips_unit` (*geçme*) reads naturally after a number on the stats screen.
