# `general_packs/`: the General card deck

The default deck that ships with the app.

## One deck, translated, minus what doesn't survive

Read this bit before anything else.

**English is the master list.** Every other language is a translation of it, minus the
cards that don't make the trip. So the decks overlap heavily, but not perfectly, and the
overlap only runs one way: cards in a translated deck come from English, while some English
cards have no counterpart in a given language.

Right now, the English deck has 230 cards, the Portuguese deck has 185, the Spanish (Spain)
draft has 209, and the Latin American Spanish draft has 208. Every retained card is a
translation of an English card: 45 were dropped from Portuguese, 21 from Spanish (Spain)
and 22 from Latin American Spanish.

Cards get dropped when:

- **The wordplay doesn't survive.** English sayings and puns whose whole appeal is how they
  sound: *The Friendzone*, *Live, Laugh, Love*, *Brain Freeze*. Translated literally,
  there's nothing left to guess.
- **There's no common word for it.** *A Spork*, *A Tumbleweed*. A card that has to be
  explained before it can be guessed is a dead 63 seconds.
- **It just wouldn't play well.** The translation is correct and the card still falls flat,
  because players wouldn't recognise the thing from the translated title or because the
  translation reads badly. Your judgement is enough here. Drop it and say so.

That last one is deliberately loose. A shorter deck that plays well beats a complete one
padded with cards nobody enjoys, so don't force a card through out of a sense of duty to
the English list.

Everything dropped from any translation is listed in [`DROPPED.md`](DROPPED.md), with the
reasoning.

### The card IDs don't line up, and that's fine

Even for cards that are direct translations, the `id` fields differ between languages.
They're database identities, assigned per card row, not shared keys. So you can't diff two
languages by ID or use IDs to work out what's missing. Match by meaning, or use
`DROPPED.md`.

If you need the pairing itself — which translated card is which English one —
[`card-map.json`](card-map.json) has it: one entry per card, one id per language. It's maintained by the CSV scripts in
[`scripts/`](../scripts), and it's a lookup table, not something to hand-edit while
translating.

**You don't have to do anything about this.** When you translate a card, keep whatever `id`
the English card had. Two cards in two files carrying the same ID is expected and causes no
problem here. When the translation is imported into the app, the maintainer generates fresh
IDs for the new cards, so nothing you submit is final anyway.

What that means in practice:

- **Translating a card?** Leave the English `id` on it.
- **Proposing a brand-new card?** Copy any existing `id`, or put something obviously
  made-up like `"new"`. It gets replaced.
- **Never** hand-craft an ID that looks real to make it unique. That's more likely to
  collide with a real row than a duplicate is.

Don't spend any effort on IDs. Spend it on the words.

### Cultural cards go elsewhere

**General should be general.** A card belongs in this deck if it works at a table in any
country once translated: history, science, films everyone's seen, objects everyone owns,
things everyone does. That's the bar.

Cards that only land in one country do **not** belong here, in any language. Don't add
Portuguese cards to the Portuguese deck because they're Portuguese, and don't keep an
English card that only means something in Britain. Country-specific material belongs in a
**community pack** built for that country and published through
[packs.63.pt](https://packs.63.pt), where players who want it can pick it.

## File format

Two fields: the pack name and the cards.

```json
{
  "name": "General",
  "cards": [
    {
      "description": "A long term skin disease that affects about 80% of teenagers in the western world. Misconceptions about its cause are common, and up until the 20th century masturbation was believed to be one.",
      "id": "b15166bdb3a88482",
      "title": "Acne",
      "points": 1
    }
  ]
}
```

| Field | What it is |
| --- | --- |
| `name` | The pack's display name. |
| `title` | What the team has to say. The whole title, in order, or it doesn't count. |
| `description` | A short description of the card, usually with a kicker. See below. |
| `points` | 1, 2 or 3. How hard the card is. Change it if the card lands differently in your language. |
| `id` | The card's row in the database. Leave it as you found it; the maintainer reissues these on import. See [above](#the-card-ids-dont-line-up-and-thats-fine). |
| `notForKids` | Optional. `true` hides the card while the app is in KIDS mode. Left out on every other card. See [below](#kids-mode). |

Everything else the app stores about a pack (colours, cover emoji, version, author,
language flags) has been stripped out. None of it is words, and it just gets in the way of
reading the deck.

## KIDS mode

The app has a KIDS mode for playing with children. General stays in the deck, minus the
cards marked `"notForKids": true`.

The bar is higher than "playable in a living room". Mark a card if its title **or its
description** involves sex or innuendo, drugs, alcohol, gambling, graphic violence, or
films and people meant for adults. The description counts because the clue-giver reads it,
and in KIDS mode the clue-giver might be ten. *Acne* is marked for its description alone.

When in doubt, mark it. A card hidden from kids costs nothing; a card that shouldn't have
been shown costs an awkward conversation.

**Translating a card?** Keep the flag the English card has. If your translation changes
what the card is about, add or remove it and say why in the notes.

## Titles

**The title is the answer.** Keep it to what people actually say out loud: "Home Alone",
not "Home Alone (1990 film)".

**Translate to what your language actually calls it**, not to the literal words. Films,
books and characters usually have an official local title, and that's the one on the card:
*Home Alone* is *Sozinho em Casa*, *Puss in Boots* is *O Gato das Botas*, *Pippi
Longstocking* is *Pipi das Meias Altas*. Where there's no local name, the English one
stays: *Hello Kitty*, *Space Jam*, *Tinder*.

**Keep it playable in a living room.** The bar is roughly what you'd say in front of
someone's parents. Anything spicier belongs in a dedicated pack.

## Descriptions

A description is **a short description of the card**: enough for a clue-giver who's never
heard of the subject to work with. One or two sentences, no more.

Most official cards then add a **kicker**: a second sentence with something funny or
genuinely interesting about the subject.

> **Acne**
> A long term skin disease that affects about 80% of teenagers in the western world.
> *Misconceptions about its cause are common, and up until the 20th century masturbation
> was believed to be one.*

The first sentence does the work. The kicker is why anyone enjoys reading the deck. Facts
carry the humour; the joke is in picking the right fact, not in writing a punchline. A
description should never read like a dictionary entry, and it should never be *only* a
kicker, because a clue-giver who doesn't know the card still needs the definition.

A card can ship without a kicker if there's nothing good to say. A card can't ship without
the description.

### Never use words from the title

**A description must not contain any word from the title, or any word derived from one.**
No plurals, no verb forms, no root-sharing cognates. Round 1 forbids the clue-giver from
saying those words, and they read the description out loud in their own words. A
description containing the answer is not just unhelpful, it makes the card unplayable as
written.

Work around it. Look at how the tutorial card does it:

> **Home Alone**
> A 1990 comedy film starring Macaulay Culkin that follows a left behind child fending off
> burglars from his family residence.

Not *home*, not *alone*. "Family residence" and "left behind" instead. The description is
clumsier than it would be otherwise, and that's the correct trade.

Derived forms count:

| Title | Banned in the description |
| --- | --- |
| Swimming | *swim*, *swimmer*, *swam*, *swims* |
| The Tooth Fairy | *tooth*, *teeth*, *fairy*, *fairies* |
| Photography | *photo*, *photograph*, *photographer* |

Function words are the one exception. Articles, prepositions and conjunctions (*the*, *of*,
*that*, *a*, *and*) don't count, matching the in-game rule that prepositions aren't
forbidden words. Only the meaningful words matter.

**Check this again after translating.** A description that was clean in English can break
the rule in your language, because the translated title and the translated description
converge on the same root. This is one of the two or three things most worth re-reading
before you submit.

The existing decks follow this closely but not perfectly, and a handful of older cards leak
a title word. Finding those is a genuinely useful contribution.
