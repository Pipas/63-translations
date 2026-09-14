# Review: Spanish translations (`es-ES`, `es-419`)

Newest first: the [third pass](#third-pass) of commit `168559d`, then the
[second pass](#second-pass).

# Third pass

The `tr-TR` work set a rule for the deck, and this pass applies it to Spanish: **drop a card
unless we're confident of its exact title.** The team has to say the whole title, so a card
whose wording varies by speaker or country costs a turn.

## Second pass: fixed

| Item | Status |
| --- | --- |
| 1. Repeated kickers | All 44 listed cards fixed, including the three word-for-word duplicates (*Clickbait*, *Dopamina*, *Fight Club*). Eight cards that weren't on the list still repeat; see [Must fix](#must-fix). |
| 2. *de el* | Fixed in all five strings: *del equipo de revisión*. |
| 3. Card errors | All fixed: *Calentar pescado…* (no *recalentar*, no *marisco*), *La gota…* kicker, *Mr. Potato*, *ordenador* / *computadora*, *El mío*, *Tío Ben*, and MacGyver no longer claims a verb. The MacGyver rewrite now repeats itself (see below). |
| 4. `es-419` titles | All 13 titles changed: *alcancía*, *del sombrero*, *sin lentes*, *Los lentes de Bono*, *Usar lentes de sol*, *club de la pelea*, *Calabozos y dragones*, *El piso es lava*, *Las escondidas*, *hot dogs*, *show de medio tiempo*, *jalar*, *derramó*. |
| 4. `es-419` strings | Fixed: *Reportar*, *¿Olvidaste…?*, *Te enviamos*, *Elegimos* (3 strings), *Pasó*, *Clue*. |
| 5. Hard titles | Fixed: *Clickbait*, *Pisar un Lego*, *El día de pierna*, *La conga*, *El cambio de sentido del UNO*. The native-opinion titles are listed in `AI_TRANSLATIONS.md`. |
| 6. UI | Fixed: *Terminar*, *Sin agrupar*, *Configuración* in `es-419`. |
| 7. Tooling | Fixed: `isLangCode()` accepts `es-419`, and `packs.63.pt` has `account.spanish`. Whether the app's own language list is hard-coded can't be checked from this repo. |

The structural checks were re-run:

- **Strict folders:** both Spanish files in `63/`, `packs.63.pt/` and `emails/` match `en-GB`
  on keys, order, placeholders, tags, `**bold**`, `CHECK_ICON` and `\n`.
- **General deck:** `es-ES` has 209 cards and `es-419` has 208. Neither has duplicate or
  unknown IDs, both are in English order, and points and `notForKids` match English on
  every card. The missing cards are exactly the ones listed in `DROPPED.md`.
- **Title words:** an automated stem check finds no leaks. The one hit, *segundos* /
  *según*, is a false positive.

## Must fix

### 1. Déjà vu still repeats its sentence

The second pass called the repetition a deliberate joke. It isn't: `main` has since fixed
the English source (in the `tr-TR` merge) to *"…Its exact cause remains uncertain, despite
the experience being reported across cultures."* When this branch is merged, `en-GB` gets
that fix, but both Spanish cards still say the same sentence twice.

Suggested kicker: *Su causa exacta sigue sin estar clara, aunque se ha descrito en muchas
culturas.*

### 2. Un doble: the kicker is now false

> *El término viene del alemán, significa literalmente «duplicado ambulante»…*

That was true of *doppelgänger*, but the title is now *Un doble*, which isn't German.
Suggested: *En alemán se dice doppelgänger, literalmente «el que camina doble», y
antiguamente se consideraba un mal presagio.*

### 3. Eight kickers still repeat the first sentence

In both files:

| Card | Repeated |
| --- | --- |
| MacGyver | *ingenio* and *soluciones improvisadas* appear in both sentences |
| Pelusa del ombligo | *casi siempre de color azul* … *por qué casi siempre es azul* |
| Una uniceja | *como el de Frida Kahlo. Frida Kahlo convirtió…* |
| Hot Wheels | *con miles de modelos distintos* … *unas veinte mil variaciones* |
| Corte al cero | *habitual entre reclutas militares. Antes se imponía a los reclutas…* |
| Capitán Jack Sparrow | *Johnny Depp* in both sentences |
| El papamóvil | *Vehículo blindado* … *cristal blindado* |
| Una estafa piramidal | *Modelo de negocio ilegal* … *Como es ilegal en muchos países*, which also contradicts itself |

### 4. Wrong wording (both files)

- **Aurora boreal:** *antepasados espirituales* means "spiritual ancestors". Use *los
  espíritus de sus antepasados*.
- **Kung Fu Panda 3:** *Jack Black pone voz a Po en la versión original mientras el
  protagonista aprende el poder del chi* joins two unrelated facts with *mientras*. Suggested
  split: *Po, con la voz original de Jack Black, se reencuentra con su familia biológica
  para aprender el poder del chi.*

## Drop

### From both files

| Card (EN) | Title | Why |
| --- | --- | --- |
| A Cliffhanger | Un final en suspense | Not a set phrase. People say *cliffhanger* or *dejarlo en suspenso*, and `es-419` would say *suspenso*, not *suspense*. Also dropped from `pt-PT` and `tr-TR`. |
| Photobombing | Hacer un photobomb | A Spanglish construction with competing forms (*photobombear*, *colarse en la foto*). Also dropped from `tr-TR`. |
| A Staring Contest | Un concurso de miradas | *Duelo de miradas* is at least as common, and the description already uses *Duelo*. Also dropped from `tr-TR`. |
| Netflix and Chill | Netflix and chill | Known to young players, not a whole table, and the kicker repeats *eufemismo*. Also dropped from `pt-PT` and `tr-TR`. |
| A Man Bun | Un moño masculino | Competes with *moño de hombre* and *man bun*, and is *chongo* in Mexico. Also dropped from `pt-PT`. |
| A Crash Test Dummy | Un muñeco de pruebas de choque | Competes with *maniquí de pruebas* and *dummy*. Also dropped from `pt-PT`. |
| The Devil on Your Shoulder | El diablo sobre tu hombro | The usual forms are *el diablito en el hombro* or *el demonio en el hombro*. |
| Go Directly to Jail | Ve directamente a la cárcel | A 3-point title whose exact wording depends on the edition (*Ve* or *Vaya*, and whether *directamente* is there). Also dropped from `tr-TR`. |

### From `es-419` only

The name splits by country, the same reason *A Pool Noodle* was dropped.

| Card (EN) | `es-419` title | Why |
| --- | --- | --- |
| The Tooth Fairy | El Ratón de los Dientes | Said in Mexico. Argentina, Colombia, Venezuela, Peru and Chile say *el Ratón Pérez*. |
| The Monster in the Wardrobe | El monstruo del armario | *Clóset* in Mexico and much of the region, *ropero* in the south. |
| The Ghost of Christmas Past | El fantasma de las Navidades pasadas | This is the Spain form. Latin America says *la Navidad pasada*, and the translations differ. |

That takes `es-ES` from 209 to 201 and `es-419` from 208 to 197.

## Should fix

| Where | Change | Why |
| --- | --- | --- |
| Summer of '69 (both) | *El verano del 69* → *Summer of '69* | The song has no Spanish title and is known by its English name. `tr-TR` keeps the English too. |
| A Crop Top (both) | *Un top corto* → *Un crop top* | *Crop top* is the everyday term in fashion and on social media, and the description doesn't use *top*. |
| Elevator Music (`es-419`) | *Música de ascensor* → *Música de elevador* | Then change the description's *elevadores* to *ascensores*. |
| Good Cop, Bad Cop (`es-419`) | *Poli bueno, poli malo* → *Policía bueno, policía malo* | *Poli* is Spain slang. |
| The Last Slice of Pizza (`es-419`) | *El último trozo de pizza* → *El último pedazo de pizza* | *Trozo* is rarely used for pizza in Latin America. |
| ¿Dónde está Wally? (`es-ES`) | *lentes* → *gafas* | Spain wording. |
| `es-419` descriptions | *cremallera* → *cierre* (La bragueta abierta); *Oriente Próximo* → *Medio Oriente* (Aladdín); *aparcamientos* → *estacionamientos* (bolsa de plástico) | Spain words left in otherwise-adapted text. |

## Before merging into `main`

`main` now has the `tr-TR` merge, and a trial merge of `es` into it conflicts in three
files:

- **`AI_TRANSLATIONS.md`:** both branches created it (add/add). Combine them into one file
  with a Turkish section and a Spanish section.
- **`README.md`:** the language table and card counts. Keep both the `tr-TR` and Spanish
  rows.
- **`general_packs/README.md`:** the card-count sentence. Include Portuguese, Turkish and
  both Spanish decks.

`general_packs/DROPPED.md` merges cleanly, but check that it ends up with all four language
sections.

After the drops above, update:

- the `es-ES` and `es-419` sections of `DROPPED.md`
- `card-map.json`, by re-running the scripts now that they accept `es-419`, instead of
  editing it by hand
- the card counts
- the native-review list in `AI_TRANSLATIONS.md`, which currently names *Un final en
  suspense*, *Hacer un photobomb*, *Un concurso de miradas*, *El verano del 69* and *Netflix
  and chill*, all dropped or renamed above

As with `tr-TR`, remove this `REVIEW.md` before merging.

# Second pass

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
