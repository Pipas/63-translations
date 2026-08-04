# `emails/`: the emails 63 sends

Six transactional emails, sent when something happens to a pack someone
submitted to the community library, plus the password reset for
[packs.63.pt](https://packs.63.pt).

These are the only strings in this repo that land in someone's inbox rather than on a
screen they're already looking at. Someone reads a subject line in a list of twenty other
subject lines and decides whether to open it. That's the whole job.

## File format

Nested JSON, grouped by email, exactly like [`63/`](../63) and
[`packs.63.pt/`](../packs.63.pt). Strings are looked up by dot path:
`passwordReset.subject`, `communityPackRemoved.intro.withReason`.

```json
{
  "passwordReset": {
    "subject": "Reset your packs.63.pt password",
    "heading": "Reset your password"
  }
}
```

Keep the nesting identical to `en-GB.json`.

| Email | Strings | Sent when |
| --- | --- | --- |
| `communityPackRejected` | 13 | A moderator rejects a pack, or rejects an update to a live one. |
| `communityPackRemoved` | 9 | A published pack is taken down. |
| `communityPackApproved` | 8 | A pack is approved and goes live. |
| `communityPackFeatured` | 7 | A pack is picked as featured. |
| `communityPackSubmittedAuthor` | 7 | Someone submits a pack — the "we got it" receipt. |
| `passwordReset` | 7 | Someone asks to reset their password. |

The emails maintainers get — new submission, pack reported — aren't here. They stay
English, in the app's own repo, because only maintainers ever read them.

## The keys inside each email

Every email is built from the same handful of parts, so once you've done one the rest go
quickly:

| Key | What it is |
| --- | --- |
| `subject` | The subject line. **The one that matters most.** |
| `preheader` | The grey preview text next to the subject in an inbox. One short sentence. |
| `heading` | The big line at the top of the email body. |
| `intro` | The paragraph under the heading. Contains most of the meaning. |
| `cta` | The button label. Two or three words. |
| `caption` | Small print under the button. |
| `text` | **The entire plain-text version of the email**, newlines and all. |

`text` is not a caption — it's the whole email again, for clients that don't render HTML.
It repeats what the HTML parts say. Translate it as a piece of writing, not key by key, and
keep it consistent with the parts above it.

## Line breaks

`\n` is a real line break, and the `text` values are full of them — including one at the
very end. **Keep the same number, in the same places, including the trailing one.** The
import checks this and will tell you if the count drifted.

In a spreadsheet these appear as the two characters `\n` so each email stays on one row.
Don't turn them into real line breaks with alt+enter; it works, but it makes the sheet
miserable to read.

## Placeholders

Double braces, same as [`packs.63.pt/`](../packs.63.pt) and unlike `63/`:

```json
"subject": "\"{{packName}}\" is live"     →     "\"{{packName}}\" está publicado"
```

`{{packName}}` is a pack title someone chose, `{{url}}` is a link, `{{reason}}` is a
moderator's note. Never rename, translate, or drop one — a dropped `{{url}}` means an email
with no way to act on it.

## Length

Looser than anywhere else in this repo: an email body is prose in a wrapping column, so say
what needs saying. The exception is `subject`, which gets cut off in a phone inbox at
roughly 35–40 characters. Front-load it: what happened, then which pack.

## Tone

Same voice as everything else — casual, direct, *tu* in `pt-PT`. But these arrive
unannounced, so they're a little more careful than the website.

The two that need the most thought:

**`communityPackRejected` and `communityPackRemoved`** are telling someone their work was
turned down. Be straight about what happened, don't apologise theatrically, and make it
obvious they can fix it and submit again. Never imply they did something wrong on purpose.

**`passwordReset`** goes to someone who is possibly locked out and possibly worried. Plain,
short, no jokes. It also goes to people who *didn't* ask for it, so the line telling them
they can ignore it has to be unmissable.

## Sentence case

Same as the rest of the project: only the first word and proper nouns are capitalised —
including in subject lines and button labels. *Reset your password*, not *Reset Your
Password*.
