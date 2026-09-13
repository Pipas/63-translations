#!/usr/bin/env node
//
// Turns the JSON in this repo into CSV files to upload to Google Sheets.
//
//   node scripts/export-csv.mjs pt-BR
//   node scripts/export-csv.mjs fr-FR --reference pt-PT
//   node scripts/export-csv.mjs es-ES --only 63 --out /tmp/csv
//
// Writes csv/<lang>/63.csv and csv/<lang>/general_packs.csv. If a translation
// for <lang> already exists, it is pre-filled so the sheet becomes a review
// rather than a blank slate; pass --blank to skip that.

import { mkdirSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { BOM, encodeCell, toCsv } from "./lib/csv.mjs";
import { indexById, readCardMap, readDropReasons } from "./lib/cardmap.mjs";
import {
  ROOT,
  SOURCE_LANG,
  SURFACES,
  flatten,
  isAppSurface,
  isLangCode,
  parseArgs,
  readJson,
  readJsonIfExists,
  surfacePath,
} from "./lib/translations.mjs";

const USAGE = `Usage: node scripts/export-csv.mjs <lang> [--reference <lang>[,<lang>]] [--only ${SURFACES.join("|")}] [--out <dir>] [--blank]

  <lang>       target language code, e.g. pt-BR, es-ES, fr-FR
  --reference  show these languages next to the English, read-only, e.g. --reference pt-PT
  --only       export just one surface
  --out        output directory (default: csv/)
  --blank      ignore any existing translation instead of pre-filling it`;

function main(argv) {
  const args = parseArgs(argv, { flags: ["blank", "help"], options: ["only", "out", "reference"] });
  const lang = args._[0];

  if (args.help || !lang) {
    console.log(USAGE);
    process.exit(args.help ? 0 : 1);
  }
  if (!isLangCode(lang)) {
    fail(`"${lang}" is not a <lang>-<REGION> code. Use something like pt-BR or es-ES.`);
  }
  if (lang === SOURCE_LANG) {
    fail(`${SOURCE_LANG} is the source language; export a target language instead.`);
  }
  if (args.only && !SURFACES.includes(args.only)) {
    fail(`--only must be one of: ${SURFACES.join(", ")}`);
  }

  const references = (args.reference ?? "")
    .split(",")
    .map((code) => code.trim())
    .filter(Boolean);
  for (const code of references) {
    if (!isLangCode(code)) fail(`--reference "${code}" is not a <lang>-<REGION> code.`);
    if (code === lang) fail(`--reference ${code} is the language being exported.`);
    if (!SURFACES.some((surface) => readJsonIfExists(surfacePath(surface, code)))) {
      fail(`--reference ${code}: no ${code}.json in any folder.`);
    }
  }

  const surfaces = args.only ? [args.only] : SURFACES;
  const outDir = path.resolve(args.out ? path.resolve(args.out) : path.join(ROOT, "csv"), lang);
  mkdirSync(outDir, { recursive: true });

  for (const surface of surfaces) {
    const rows = isAppSurface(surface)
      ? exportApp(surface, lang, references, args.blank)
      : exportCards(lang, references, args.blank);
    const file = path.join(outDir, `${surface}.csv`);
    writeFileSync(file, BOM + toCsv(rows));
    console.log(`  → ${path.relative(process.cwd(), file)} (${rows.length - 1} rows)`);
  }

  console.log(`
Next: File → Import → Upload each CSV into its own Google Sheet, choosing
"Detect automatically" for the separator, then share the sheet.

Translators fill in the empty columns and leave everything else alone. When
they're done: File → Download → CSV, drop the file back in ${path.relative(process.cwd(), outDir)}/,
and run:

  node scripts/import-csv.mjs ${lang}`);
}

/* --------------------------------------------------- app string surfaces ---- */

function exportApp(surface, lang, references, blank) {
  const english = flatten(readJson(surfacePath(surface, SOURCE_LANG)));
  const existing = blank ? null : readJsonIfExists(surfacePath(surface, lang));
  const known = new Map((existing ? flatten(existing) : []).map((entry) => [entry.key, entry.value]));

  const reference = references.map((code) => {
    const json = readJsonIfExists(surfacePath(surface, code));
    return { code, strings: new Map((json ? flatten(json) : []).map((entry) => [entry.key, entry.value])) };
  });

  let prefilled = 0;
  const rows = [["key", "english", ...reference.map((ref) => `${ref.code} (reference)`), lang, "notes"]];

  for (const { key, value } of english) {
    const current = known.get(key) ?? "";
    // A copy of the English string is not a translation; leave the cell empty.
    const translation = current && current !== value ? current : "";
    if (translation) prefilled += 1;
    rows.push([
      key,
      encodeCell(value),
      ...reference.map((ref) => encodeCell(ref.strings.get(key) ?? "")),
      encodeCell(translation),
      "",
    ]);
  }

  console.log(
    `${surface}/: ${english.length} strings` + (prefilled ? `, ${prefilled} pre-filled from ${lang}.json` : ""),
  );
  return rows;
}

/* ------------------------------------------------------- general_packs ---- */

function exportCards(lang, references, blank) {
  const english = readJson(surfacePath("general_packs", SOURCE_LANG));
  const map = readCardMap();
  const byId = indexById(map);
  const dropReasons = readDropReasons();

  const deck = (code) => {
    const json = readJsonIfExists(surfacePath("general_packs", code));
    return { code, exists: Boolean(json), name: json?.name ?? "", cards: new Map((json?.cards ?? []).map((c) => [c.id, c])) };
  };
  const target = blank ? { code: lang, exists: false, name: "", cards: new Map() } : deck(lang);
  const reference = references.map(deck);

  // `observations` reports on every language that has a deck, not just the ones
  // with columns in the sheet: a translator starting a new language wants to
  // know that a card was dropped from Portuguese, and why, whether or not they
  // asked to see the Portuguese.
  const others = translatedLanguages().filter((code) => code !== lang && !references.includes(code));
  const columns = [target, ...reference, ...others.map(deck)];

  const header = [
    "en_id",
    "en_title",
    "en_description",
    "en_points",
    ...reference.flatMap((ref) => [`${ref.code} title`, `${ref.code} description`]),
    "title",
    "description",
    "points",
    "not_for_kids",
    "drop",
    "notes",
    "observations",
  ];
  const rows = [header];

  // The deck name lives in a row of its own so it can be translated in the
  // sheet along with everything else. import-csv.mjs reads it back.
  rows.push([
    "PACK_NAME",
    encodeCell(english.name),
    "the name of the deck itself",
    "",
    ...reference.flatMap((ref) => [encodeCell(ref.name), ""]),
    encodeCell(target.name),
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  // Looking a card up in another language goes through card-map.json, since
  // the ids in the deck files themselves don't line up.
  const cardIn = (deckOf, entry) => {
    const id = entry?.ids?.[deckOf.code];
    return id ? deckOf.cards.get(id) ?? null : null;
  };

  const stale = [];
  const observationsFor = (entry, englishTitle) => {
    const notes = [];
    for (const column of columns) {
      if (!column.exists || cardIn(column, entry)) continue;
      const id = entry?.ids?.[column.code];
      if (id) {
        stale.push(`${englishTitle}: card-map.json points ${column.code} at ${id}, which isn't in that deck`);
        continue;
      }
      const reason = dropReasons.get(column.code)?.get(englishTitle);
      notes.push(reason ? `dropped in ${column.code} — ${reason}` : `no ${column.code} card`);
    }
    return notes.join(" · ");
  };

  const seen = new Set();
  let matched = 0;

  for (const card of english.cards) {
    const entry = byId.get(card.id) ?? null;
    if (entry) seen.add(entry);
    const current = cardIn(target, entry);
    if (current) matched += 1;

    rows.push([
      card.id,
      encodeCell(card.title),
      encodeCell(card.description),
      card.points,
      ...reference.flatMap((ref) => {
        const other = cardIn(ref, entry);
        return [encodeCell(other?.title ?? ""), encodeCell(other?.description ?? "")];
      }),
      encodeCell(current?.title ?? ""),
      encodeCell(current?.description ?? ""),
      // Pre-filled with the English difficulty, so the translator sees what
      // they're inheriting and can change it if the card lands differently in
      // their language.
      current ? current.points : card.points,
      // Same deal as points: inherited from the English, changeable if the
      // translation reads differently.
      kidsCell(current ?? card),
      "",
      "",
      observationsFor(entry, card.title),
    ]);
  }

  // Cards that exist in a translation but not in English. They're kept at the
  // bottom of the sheet rather than left out: two of them are candidates for
  // the English deck rather than local content.
  let extras = 0;
  for (const entry of map.cards) {
    if (seen.has(entry) || entry.ids[SOURCE_LANG]) continue;
    const current = cardIn(target, entry);
    const others = reference.map((ref) => cardIn(ref, entry));
    if (!current && others.every((other) => !other)) continue;
    extras += 1;
    const owners = columns.filter((column) => cardIn(column, entry));
    // Keyed on a reference language where there is one: the target's id may
    // still be provisional. import-csv.mjs reads the prefix back.
    const owner = owners.find((column) => column !== target) ?? owners[0];
    const where = owners.map((column) => column.code).join(", ");

    rows.push([
      `${owner.code}:${cardIn(owner, entry).id}`,
      "",
      `(no English card — exists in ${where})`,
      "",
      ...others.flatMap((other) => [encodeCell(other?.title ?? ""), encodeCell(other?.description ?? "")]),
      encodeCell(current?.title ?? ""),
      encodeCell(current?.description ?? ""),
      // No English card to inherit from, so the language that has it stands in.
      current ? current.points : cardIn(owner, entry).points,
      kidsCell(current ?? cardIn(owner, entry)),
      "",
      "",
      `no English card, only ${where}`,
    ]);
  }

  // Anything in the target deck that card-map.json has never heard of.
  const mapped = new Set(map.cards.map((entry) => entry.ids[lang]).filter(Boolean));
  const unmapped = [...target.cards.values()].filter((card) => !mapped.has(card.id));
  for (const card of unmapped) {
    rows.push([
      // Keyed on its own id so the card keeps it: without card-map.json there's
      // nothing else on the row that says which card this is.
      `${lang}:${card.id}`,
      "",
      `(not in card-map.json — run import-csv.mjs to record it)`,
      "",
      ...reference.flatMap(() => ["", ""]),
      encodeCell(card.title),
      encodeCell(card.description),
      card.points,
      kidsCell(card),
      "",
      "",
      "not matched to an English card",
    ]);
  }

  console.log(`general_packs/: ${english.cards.length} English cards`);
  if (target.exists) console.log(`  ${matched} already translated in ${lang}, ${english.cards.length - matched} to go`);
  if (extras > 0) console.log(`  ${extras} card${extras === 1 ? "" : "s"} with no English counterpart, appended at the end`);
  if (unmapped.length > 0) console.log(`  ${unmapped.length} ${lang} card${unmapped.length === 1 ? "" : "s"} not in card-map.json, appended at the end`);
  for (const message of new Set(stale)) console.log(`  ! ${message}`);
  if (reference.length > 0) console.log(`  reference: ${reference.map((ref) => ref.code).join(", ")}`);

  return rows;
}

function kidsCell(card) {
  return card.notForKids ? "yes" : "";
}

// Every language with a deck in general_packs/, source language aside.
function translatedLanguages() {
  return readdirSync(path.join(ROOT, "general_packs"))
    .filter((file) => file.endsWith(".json") && file !== "card-map.json")
    .map((file) => file.replace(/\.json$/, ""))
    .filter((code) => code !== SOURCE_LANG && isLangCode(code))
    .sort();
}

function fail(message) {
  console.error(`error: ${message}\n\n${USAGE}`);
  process.exit(1);
}

main(process.argv.slice(2));
