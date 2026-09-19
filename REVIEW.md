# Review: `nl-NL` localisation (final pass)

This pass checks the `nl-NL` files after the fixes from the second review. The Dutch files
are still uncommitted, so each fix was checked against the current file contents rather
than a diff.

This review is AI-generated too. It doesn't replace a native Dutch review. Remove this file
before the branch is merged (see `AGENTS.md`).

## Verdict

**Ready for native review after two small fixes.** Everything from the first two reviews
is in, and the quotation fix is correct. The stricter pass over the deck found two kickers
that add facts that aren't in the English.

## Checks: all pass

- **String folders.** `63/` (311), `packs.63.pt/` (448) and `emails/` (51) have every
  `en-GB` key, in the same order, with no extras.
- **Placeholders and markup** match on every string.
- **Deck.** `general_packs/nl-NL.json` has 197 cards, with no duplicate or unknown ids,
  in English order. `notForKids` matches on every card. Points match on every card
  except the documented *Het noorderlicht* change (3 → 2).
- **Dropped cards.** The 33 missing cards are exactly the 33 in the `nl-NL` section of
  `DROPPED.md`. Every drop reason is read by `readDropReasons()`.
- **Counts** are 197 / 33 in `README.md`, `general_packs/README.md`, `DROPPED.md` and
  `AI_TRANSLATIONS.md`.
- **Warnings.** The dry-run import reports only the expected one: *Niets* has no
  description.
- **Quotes.** The locale uses `“…”` and `…` in all four files, with no straight quotes
  left. The nine broken `’…’` quotes in the deck are now `“…”`, including the title *De juf
  “mama” noemen*. Apostrophes inside words (*zo’n*, *’s nachts*) are correct.
- **Title-word leaks.** Every description was checked against its title's word roots,
  which is stricter than the import script's check. There are no leaks. The only hits
  were false positives (*Kryptoniet*/*niet*, *Waar*/*waarin*, *overlopen*/*over*).

## Fix

### 1. Two kickers add facts that aren't in the English

`AGENTS.md` says: *"Facts. Don't invent them. Translate the English fact or leave the
kicker out."*

| Card | English kicker | Dutch kicker | Fix |
| --- | --- | --- | --- |
| **De friendzone** | A list of joke alternative names (*Ally Area, Buddy Belt…*), which only works in English | *Wie er eenmaal in zit, komt er zelden meer uit.* This is a new claim. | Cut the second sentence. `it-IT` did the same. |
| **Een hitlersnorretje** | *Also famously adorned the face of Charlie Chaplin!* | *Charlie Chaplin droeg hem ook, **en die was er eerder mee**.* This adds a claim about who had it first. | `Ook Charlie Chaplin droeg er beroemd genoeg een.` |

### 2. Bob de Bouwer kicker

*Kunnen wij het maken? Nou en of!* is unconfirmed. I believe the Dutch
theme song goes *Kunnen wij het maken? Ja, wij kunnen het!*, but I can't confirm the exact
line. A quote that might be wrong shouldn't ship. Either confirm the line, or cut the kicker
and end the description at *…over een aannemer en zijn pratende voertuigen.*

## Optional

- **Pippi Langkous (3 points).** Points were copied from English and not re-judged for
  Dutch players. Pippi is very well known in the Netherlands, so 2 is arguably fairer. If
  you change it, record it next to *Het noorderlicht*.
- **Uncle Ben.** The rice was sold as *Uncle Ben's* in the Netherlands, but Spider-Man's
  uncle is *oom Ben* in Dutch. The card's *Kies zelf maar* makes that acceptable.

## For the native reviewer

Nobody has checked the deck's retained titles against Dutch usage. The rule that decided
what was dropped was *drop when unsure*. The cards most worth a native look are the
English loanwords that were kept, where the choice between Dutch and English affects
whether players say the exact title:

- *Brain freeze*, *Een guilty pleasure*, *Good cop, bad cop*, *Netflix and chill*
- *Broekzakbellen*, *Een monobrauw*, *6-7*

## Before merging

- [x] Fix the *Friendzone* and *Hitlersnorretje* kickers.
- [x] Cut the *Bob de Bouwer* kicker (the line couldn't be confirmed; the title is kept).
- [x] Re-run `export-csv.mjs` and `import-csv.mjs --dry-run`.
- [ ] Get a native Dutch review.
- [ ] Remove `REVIEW.md`.
