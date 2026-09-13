# Review: Spanish translations (`es-ES`, `es-419`), second pass

This is a second review of the uncommitted work on the `es` branch, done after the fixes
from the first review. It covers the new `es-ES.json` and `es-419.json` files in all four
folders, plus `AI_TRANSLATIONS.md`, `README.md`, `general_packs/README.md`,
`general_packs/DROPPED.md` and `general_packs/card-map.json`.

**Summary:** most of the first review has been fixed. The General deck now has kickers
again, but many of them just repeat the first sentence, which is now the biggest problem.
`es-419` is better adapted, but still has Spain-only card titles and one grammar bug that
appears in several places. As part of this pass, 13 cards were dropped from `es-ES` and 14
from `es-419` (see [Cards dropped in this pass](#cards-dropped-in-this-pass)).

## What checks out

- **Strict folders:** both Spanish files in `63/`, `packs.63.pt/` and `emails/` have exactly
  the English keys. Placeholders, `CHECK_ICON`, `**bold**`, `<csv>`/`<json>` tags and `\n`
  counts all match `en-GB`.
- **General deck:** every card maps to an English id, in English order, with no
  duplicates. Points and `notForKids` match English on every card.
- **`card-map.json`** now has Spanish entries, and they agree with the deck files and
  `DROPPED.md`.
- **Fixed since the first review:**
  - *uniceja*
  - *Calcetines con dedos*
  - *Omitir* for skipping the tutorial
  - *Mi pobre angelito* in the `es-419` tutorial, with matching forbidden words
  - *No se pudo…* forms in `es-419`
  - *Ingresa* and *Revisa*
  - `es-419` uses "" quotation marks consistently
  - the Buzz Cut and Pool Noodle title-word leaks
  - the card counts in the READMEs
- **Title-word check:** `import-csv.mjs --dry-run es-ES` flags no leaks. One real leak was
  found by hand (see item 3).

## Cards dropped in this pass

These were dropped because they wouldn't play at a Spanish-speaking table. Each is recorded
in `DROPPED.md`, and `card-map.json` and the counts in the READMEs were updated to match.

| Card | Dropped from | Why |
| --- | --- | --- |
| The Elephant in the Room | both | An anglicism that appears in the press, not something people say. |
| Schadenfreude | both | A German word that few Spanish speakers know. |
| A Pinky Promise | both | Not a set phrase in Spain, and patchy in Latin America. |
| Mary Jane | both | The card is about English slang for marijuana, which Spanish doesn't use. |
| Double Dipping | both | *Mojar dos veces* isn't a recognised phrase, and the joke depends on *Seinfeld*. |
| A Butt Dial | both | No set phrase. *Llamada de bolsillo* isn't something people say. |
| A Bucket List | both | *Lista de deseos* means a wishlist, and the kicker explained the English idiom. |
| 9 to 5 | both | Office hours aren't 9 to 5 in Spain or Latin America, and the film had a different title. |
| 3 Kids in a Trenchcoat | both | An English-language internet meme. |
| A Participation Trophy | both | A US custom, and there's no set Spanish phrase for it. |
| Jimmy Fallon's Laugh | both | Fallon isn't widely known in Spanish-speaking countries. |
| Big Bird | both | Spain (*Caponata*) and Mexico (*Abelardo*) had local characters instead, so no Spanish title is recognised. |
| Super Bowl Halftime Show | `es-ES` | Too long, and not a fixed phrase in Spain. (`es-419` keeps it; see item 4.) |
| Hungry Hungry Hippos | `es-419` | *Tragabolas* is the Spain name, and Latin America has no single name. |
| A Pool Noodle | `es-419` | The name changes by country, and *flotador tubular* is made up. |

Also, the Spanish sections of `DROPPED.md` used two-column tables. `readDropReasons()` in
`scripts/lib/cardmap.mjs` only reads single-column tables under `### reason` headings, so
the `observations` column never showed the Spanish reasons. Those sections now use the
same layout as `pt-PT`, and the export shows the reasons.

**Would play, but not restored:** *The Friendzone* is widely used in Spanish (*me mandó a
la friendzone*). It was dropped because of its kicker, but it could come back with a new
one.

## Problems, most important first

### 1. Many restored kickers repeat the first sentence

The kickers are back, but about 44 cards now say the same thing twice. The first sentence
had already absorbed the English kicker, and then the kicker was added again:

> **Uncle Sam:** *Personificación de Estados Unidos que protagoniza el famoso cartel militar
> de «I WANT YOU». Su imagen más célebre aparece en el cartel militar de 1917 con el
> mensaje «I WANT YOU».*

Three of them are word-for-word duplicates:

- **Clickbait:** *¡Lo que ocurrió después te sorprenderá!* appears twice.
- **Dopamine:** *¡Lo recibirás al acertar esta carta! Es justo lo que obtendrás cuando por
  fin aciertes esta carta.*
- **Fight Club:** *sospechosamente parecida a la segunda* appears in both sentences.

*Déjà vu* is the exception: the English repeats itself on purpose, as a joke.

Affected cards, in both files unless marked:

- YMCA
- Uncle Sam
- A Falling Piano
- Piggy Bank
- Van Gogh's Ear
- Snapchat Filters
- The Hammer and Sickle
- Curling
- Kung Fu Panda 3
- Sancho Panza
- Joan of Arc
- YOLO
- Albus Dumbledore
- Caviar
- Tutankhamun
- Clickbait
- Indiana Jones' Whip
- Zorro
- Hercule Poirot
- A Hitler Moustache
- Bollywood
- Transylvania (the kicker's *Desde entonces* has nothing to refer to)
- Brazilian Wax
- Bearded Dragon
- Cats
- Asterix and Obelix
- Internet Explorer
- Cybertruck
- The First Rule of Fight Club
- Shaking a Polaroid Picture
- Schrödinger's Cat
- Leg Day
- Big Mac's Secret Sauce
- Dopamine
- Gangnam Style
- A Mullet
- The Loch Ness Monster
- A Pool Noodle (`es-ES`)
- A Plastic Bag in the Wind
- Microwaving Fish at Work
- Wearing Sunglasses Indoors
- The Snooze Button
- The Devil on Your Shoulder
- A Rubber Duck

**Fix:** trim the first sentence back to a plain definition, and let the kicker carry the
fact or joke.

### 2. `es-419`: "de el" instead of "del"

This is a mechanical replacement bug. It should read *del equipo de revisión*.

- `emails/es-419.json`:
  - `communityPackApproved.reviewerNote`
  - `communityPackRejected.intro.update`
  - `communityPackRejected.intro.new`
  - `communityPackRejected.text.reviewerNote`
- `packs.63.pt/es-419.json`: `publish.community.approved.reviewerNote`

### 3. Card errors in both files

- **Microwaving Fish at Work:**
  - *Recalentar* shares a root with *Calentar* in the title, so the description leaks a
    title word.
  - *Marisco* means shellfish, not fish.
- **The Last Straw / *La gota que colma el vaso*:** the kicker still explains the English
  proverb about hay and a camel's back. The Spanish saying is about a drop of water, so the
  kicker needs rewriting.
- **Mr. Potato Head:** in Spain the toy is sold as *Mr. Potato*, not *Sr. Patata*.
- ***Aladdín* card (`es-ES`):** *animados por computadora* should use *ordenador*.
- **An Evil Twin:** *La mía sería «36»* should be *El mío*, because *gemelo* is masculine.
- **Uncle Ben:** the rice brand is *Uncle Ben's* (now *Ben's Original*) in Spanish-speaking
  markets, so the *Tío Ben* joke doesn't work. Consider dropping the rice half of the
  description.
- **MacGyver:** "used as a verb" is true in English, not Spanish.

### 4. `es-419` still uses Spain titles and words

Of the 208 `es-419` cards, only 10 have a different title from `es-ES`, and 191 have the
same description word for word. These titles aren't what Latin American players say:

| Card | Current `es-419` | Latin American |
| --- | --- | --- |
| Piggy Bank | *Una hucha* | *Una alcancía* |
| Pull a Rabbit Out of a Hat | *…de la chistera* | *…del sombrero* (the description then needs to avoid *sombrero*) |
| Clark Kent Without Glasses | *…sin gafas* | *…sin lentes* |
| Bono's Sunglasses | *Las gafas de Bono* | *Los lentes de Bono* |
| Wearing Sunglasses Indoors | *Llevar gafas de sol…* | *Usar lentes de sol…* (the description uses *lentes*) |
| The First Rule of Fight Club | *…del club de la lucha* | *…del club de la pelea* |
| Dungeons & Dragons | *Dragones y mazmorras* | *Calabozos y dragones* |
| The Floor Is Lava | *El suelo es lava* | *El piso es lava* (the Netflix LatAm title; the description uses *piso*) |
| Hide and Seek | *El escondite* | *Las escondidas* |
| A Hot Dog Eating Contest | *…perritos calientes* | *…hot dogs* |
| Super Bowl Halftime Show | *El espectáculo del descanso de la Super Bowl* | *El show de medio tiempo del Super Bowl* |
| Pushing a Pull Door | *…que pone "tirar"* | *…que dice "jalar"* (varies by country) |
| The Last Straw | *La gota que colma el vaso* | *La gota que derramó el vaso* |

Strings to fix:

- **Report a pack:** *Denunciar* in `packs.report_*` (`63/`) should be *Reportar*, the
  usual app wording in Latin America.
- **Spain-style past tense still left:**
  - `packs.63.pt` → `auth.forgotPassword`: *¿Has olvidado…?* → *¿Olvidaste tu contraseña?*
  - `packs.63.pt` → `auth.resetEmailSentDescription`: *Hemos enviado* → *Te enviamos*
  - `emails` → `communityPackFeatured.*` (3 strings): *Hemos elegido* → *Elegimos*
  - `63` → `rules.example_card_4.description`: *Ha pasado* → *Pasó*
- **Colonel Mustard:** the description says *Cluedo*. The game is called *Clue* in Latin
  America.

### 5. Titles that are hard to say or guess (both files)

A card only counts when the whole title is said, so titles should be what people naturally
say:

- **Clickbait:** *Cebo de clics* → *Clickbait*. Almost nobody says *cebo de clics*.
- **Stepping on Lego:** *Pisar una pieza de Lego* → *Pisar un Lego*.
- **Leg Day:** *El día de piernas* → *El día de pierna*. Gym slang uses the singular.
- **The Conga Line:** *Una fila de conga* → *La conga*. *Hacer la conga* is the natural
  phrase.
- **Uno Reverse Card:** *La carta Cambio de sentido de UNO* is long. Consider *El cambio de
  sentido del UNO*.
- **Needs a native opinion:**
  - *Un final en suspense* (people often just say *cliffhanger*)
  - *Hacer un photobomb*
  - *Un concurso de miradas*
  - *El verano del 69* (the song has no Spanish title; *Summer of '69*?)
  - *Netflix and chill* (young players know it, older ones may not)

### 6. UI

- **`common.end_game`:** *Fin de partida* is the button that ends the game, but it reads as
  a label and almost matches `common.game_over` (*Fin de la partida*). *Terminar* or
  *Acabar partida* would read as an action. (The first review suggested *Fin de partida*;
  that was a mistake.)
- **`card.groupBy.none` (`packs.63.pt`):** *Nada* → *Ninguno* or *Sin agrupar*.
- **`es-419`:** *Ajustes* could be *Configuración*. This is minor, since both are
  understood.

### 7. Tooling and product blockers

- **The CSV scripts reject `es-419`.** `isLangCode()` in `scripts/lib/translations.mjs`
  only accepts `xx-XX`, so both export and import fail with *"es-419" is not a
  <lang>-<REGION> code*. A translator can't use the spreadsheet workflow for Latin American
  Spanish. It also means `card-map.json` was edited by hand, which its README says not to
  do. **Fix:** allow a numeric UN M49 region, e.g. `/^[a-z]{2}-([A-Z]{2}|\d{3})$/`.
- **The packs.63.pt language picker has no Spanish option.** `account.language` only has
  `account.english` and `account.portuguese`, so Spanish can't be selected until `en-GB`
  gets a key like `account.spanish`. It's worth checking whether the app's language list is
  hard-coded too.

## Suggested order

1. Remove the repeated kickers (item 1) and fix *de el* (item 2).
2. Fix the card errors (item 3) and the `es-419` titles and wording (item 4).
3. Let the scripts accept `es-419` (item 7), so native review can use the spreadsheet
   workflow.
4. Leave titles that need an opinion and UI wording (items 5 and 6) to the native reviewer.
