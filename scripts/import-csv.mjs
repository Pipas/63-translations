#!/usr/bin/env node
//
// Turns the filled-in CSVs back into the JSON files this repo ships.
//
//   node scripts/import-csv.mjs pt-BR
//   node scripts/import-csv.mjs fr-FR --only 63 --dry-run
//
// Reads csv/<lang>/63.csv and csv/<lang>/general_packs.csv and writes
// 63/<lang>.json and general_packs/<lang>.json. Everything it can check from
// the English source (placeholders, line breaks, length, title words leaking
// into a description) is reported; --strict refuses to write if anything is
// flagged.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { readTable } from "./lib/csv.mjs";
import {
  ROOT,
  SOURCE_LANG,
  SURFACES,
  buildNested,
  checkString,
  flatten,
  isAppSurface,
  isDropped,
  isYes,
  isLangCode,
  makeCard,
  parseArgs,
  parsePoints,
  pluralBase,
  readJson,
  readJsonIfExists,
  setPath,
  surfacePath,
  titleWordsInDescription,
  writeJsonText,
} from "./lib/translations.mjs";

const USAGE = `Usage: node scripts/import-csv.mjs <lang> [--only ${SURFACES.join("|")}] [--in <dir>] [--strict] [--dry-run]

  <lang>      language code the CSVs were exported for, e.g. pt-BR
  --only      import just one surface
  --in        directory holding one <surface>.csv per surface under <lang>/ (default: csv/)
  --strict    exit without writing if anything is flagged
  --dry-run   report only, write nothing`;

const warnings = [];
const notes = [];

function warn(where, message) {
  warnings.push(`${where}: ${message}`);
}

// Anything the translator wrote in the notes column: worth reading, never a
// reason to refuse the import.
function note(where, message) {
  notes.push(`${where}: ${message}`);
}

function main(argv) {
  const args = parseArgs(argv, { flags: ["strict", "dry-run", "help"], options: ["only", "in"] });
  const lang = args._[0];

  if (args.help || !lang) {
    console.log(USAGE);
    process.exit(args.help ? 0 : 1);
  }
  if (!isLangCode(lang)) {
    fail(`"${lang}" is not a <lang>-<REGION> code. Use something like pt-BR or es-ES.`);
  }
  if (lang === SOURCE_LANG) {
    fail(`${SOURCE_LANG} is the source language and is not imported.`);
  }
  if (args.only && !SURFACES.includes(args.only)) {
    fail(`--only must be one of: ${SURFACES.join(", ")}`);
  }

  const inDir = path.resolve(args.in ? path.resolve(args.in) : path.join(ROOT, "csv"), lang);
  const surfaces = (args.only ? [args.only] : SURFACES).filter((surface) => {
    const file = path.join(inDir, `${surface}.csv`);
    if (existsSync(file)) return true;
    console.log(`skipping ${surface}/: no ${path.relative(process.cwd(), file)}`);
    return false;
  });

  if (surfaces.length === 0) fail(`nothing to import from ${path.relative(process.cwd(), inDir)}`);

  const outputs = [];
  for (const surface of surfaces) {
    const table = readTable(readFileSync(path.join(inDir, `${surface}.csv`), "utf8"));
    const json = isAppSurface(surface) ? importApp(surface, lang, table) : importCards(lang, table);
    outputs.push([surfacePath(surface, lang), writeJsonText(json)]);
  }

  if (notes.length > 0) {
    console.log(`\n${notes.length} note${notes.length === 1 ? "" : "s"} from the translator:`);
    for (const message of notes) console.log(`  ${message}`);
  }
  if (warnings.length > 0) {
    console.log(`\n${warnings.length} thing${warnings.length === 1 ? "" : "s"} to look at:`);
    for (const message of warnings) console.log(`  ${message}`);
  }

  if (args.strict && warnings.length > 0) {
    console.error("\nnothing written (--strict)");
    process.exit(1);
  }
  if (args["dry-run"]) {
    console.log("\nnothing written (--dry-run)");
    return;
  }

  console.log("");
  for (const [file, contents] of outputs) {
    writeFileSync(file, contents);
    console.log(`  wrote ${path.relative(process.cwd(), file)}`);
  }
  console.log(`
Now check the result the way CONTRIBUTING.md describes: the JSON must parse and
each app-string ${lang}.json must have the keys of its ${SOURCE_LANG}.json.`);
}

/* --------------------------------------------------- app string surfaces ---- */

function importApp(surface, lang, { headers, records }) {
  const csv = `${surface}.csv`;
  requireColumns(csv, headers, ["key", "english"]);
  const column = translationColumn(csv, headers, lang);

  const byKey = new Map();
  for (const record of records) {
    if (!record.key) continue;
    if (byKey.has(record.key)) warn(`${csv} row ${record.__row}`, `duplicate key ${record.key}, using the last one`);
    byKey.set(record.key, record);
  }

  const english = readJson(surfacePath(surface, SOURCE_LANG));
  const seen = new Set();
  const pluralBases = new Set(flatten(english).map((entry) => pluralBase(entry.key)).filter(Boolean));
  let translated = 0;
  let missing = 0;

  const result = buildNested(english, (key, source) => {
    seen.add(key);
    const record = byKey.get(key);
    const value = record ? record[column] : "";

    if (!record) {
      warn(csv, `no row for ${key}, kept the English`);
      missing += 1;
      return source;
    }
    if (!value) {
      missing += 1;
      return source; // Every key must exist for the app to resolve it.
    }

    translated += 1;
    for (const problem of checkString(source, value, surface)) warn(`${csv} row ${record.__row}`, `${key}: ${problem}`);
    if (record.notes) note(`${csv} row ${record.__row}`, `${key}: ${record.notes}`);
    return value;
  });

  // A language with more plural categories than English needs keys English
  // doesn't have — Polish wants _few and _many where English has only _one and
  // _other. Rows added at the bottom of the sheet for a plural that already
  // exists are kept; anything else really is a typo.
  let extraPlurals = 0;
  for (const [key, record] of byKey) {
    if (seen.has(key)) continue;
    const value = record[column];
    const base = pluralBase(key);
    if (base && pluralBases.has(base) && value) {
      setPath(result, key, value);
      extraPlurals += 1;
      if (record.notes) note(`${csv} row ${record.__row}`, `${key}: ${record.notes}`);
      continue;
    }
    warn(csv, `unknown key ${key}, ignored`);
  }

  console.log(
    `${surface}/: ${translated} translated, ${missing} left in English` +
      (extraPlurals ? `, ${extraPlurals} extra plural form${extraPlurals === 1 ? "" : "s"}` : ""),
  );
  return result;
}

/* ------------------------------------------------------- general_packs ---- */

function importCards(lang, { headers, records }) {
  requireColumns("general_packs.csv", headers, ["title", "description"]);

  const english = readJson(surfacePath("general_packs", SOURCE_LANG));
  const englishById = new Map(english.cards.map((card) => [card.id, card]));

  let name = english.name;
  const cards = [];
  const dropped = [];
  const provisional = [];
  let untranslated = 0;

  // What this language's deck already says about a card, for columns an older
  // sheet doesn't have.
  const previous = readJsonIfExists(surfacePath("general_packs", lang));
  const previousById = new Map((previous?.cards ?? []).map((card) => [card.id, card]));

  for (const record of records) {
    const where = `general_packs.csv row ${record.__row}`;

    if (record.en_id === "PACK_NAME" || record.id === "PACK_NAME") {
      if (record.title) name = record.title;
      else warn(where, `no ${lang} name for the deck, kept "${english.name}"`);
      continue;
    }

    // en_id is the card's id, which is the same in every language. Sheets
    // exported before ids were shared may say `<lang>:<id>`; the id is the part
    // after the colon.
    const ref = (record.en_id ?? "").split(":").pop();
    const source = englishById.get(ref);
    const label = record.en_title || record.title || ref || `row ${record.__row}`;

    if (isDropped(record.drop)) {
      dropped.push({ card: record.en_title || label, reason: record.notes || "no reason given" });
      if (!record.notes) warn(where, `${label}: dropped with no reason — DROPPED.md wants one`);
      continue;
    }
    if (!record.title && !record.description) {
      untranslated += 1;
      continue;
    }
    if (!record.title) {
      warn(where, `${label}: a description with no title, skipped — the title is the answer`);
      untranslated += 1;
      continue;
    }
    if (!record.description) {
      // Kept rather than dropped: the deck has at least one deliberately empty
      // description, and losing a translator's row is worse than a warning.
      warn(where, `${record.title}: no description — a clue-giver who doesn't know the card has nothing to work with`);
    }

    const points = parsePoints(record.points, source ? source.points : parsePoints(record.en_points, 1));
    if (points === null) {
      warn(where, `${label}: points "${record.points}" is not 1, 2 or 3 — using 1`);
    }

    // Sheets exported before the column existed don't have it; those keep
    // whatever the card already had, in this language or else in English.
    const notForKids = headers.includes("not_for_kids")
      ? isYes(record.not_for_kids)
      : Boolean(previousById.get(ref)?.notForKids ?? source?.notForKids);

    const leaks = titleWordsInDescription(record.title, record.description);
    if (leaks.length > 0) {
      warn(where, `${record.title}: the description contains the title word${leaks.length > 1 ? "s" : ""} ${leaks.join(", ")}`);
    }
    if (record.notes) note(where, `${record.title}: ${record.notes}`);

    // A card uses the same id in every language. A row with no id — a card added
    // at the bottom of the sheet — gets an obviously fake one until the card
    // exists in the app and has a real id.
    const id = ref || `new-${provisional.length + 1}`;
    if (id.startsWith("new-")) provisional.push([where, `${record.title}: no id yet, using "${id}"`]);

    cards.push(makeCard({ description: record.description, id, points: points ?? 1, title: record.title, notForKids }));
  }

  console.log(`general_packs/: ${cards.length} cards, ${dropped.length} dropped, ${untranslated} untranslated`);
  if (provisional.length > 0) {
    console.log(`  ${provisional.length} card${provisional.length === 1 ? " has" : "s have"} no id yet — the app issues real ones on import`);
    for (const [where, message] of provisional) warn(where, message);
  }

  if (dropped.length > 0) {
    console.log(`\nDropped cards — paste into general_packs/DROPPED.md under \`${lang}\`:\n`);
    console.log("| Card | Reason |");
    console.log("| --- | --- |");
    for (const entry of dropped) console.log(`| ${entry.card} | ${entry.reason} |`);
  }

  // The sheet is in English deck order, which may not be this deck's order.
  // Cards it already had stay where they were and newly translated ones go on
  // the end, so re-importing a language doesn't shuffle a file that hasn't
  // changed.
  const position = new Map((previous?.cards ?? []).map((card, index) => [card.id, index]));
  const kept = cards.filter((card) => position.has(card.id)).sort((a, b) => position.get(a.id) - position.get(b.id));
  const added = cards.filter((card) => !position.has(card.id));

  return { name, cards: [...kept, ...added] };
}

/* -------------------------------------------------------------- utils ---- */

function requireColumns(file, headers, required) {
  const absent = required.filter((column) => !headers.includes(column));
  if (absent.length > 0) {
    fail(`${file} is missing the column${absent.length > 1 ? "s" : ""} ${absent.join(", ")}. Was it exported by export-csv.mjs?`);
  }
}

// The translation column is named after the language, but a translator may have
// renamed it; fall back to "translation" and then to the first column that
// isn't part of the scaffolding. Reference columns are never the target, and
// "guidance" is a column older exports had, in sheets that may still be open.
function translationColumn(file, headers, lang) {
  const off = (header) => ["key", "english", "notes", "guidance"].includes(header) || header.endsWith("(reference)");
  for (const candidate of [lang.toLowerCase(), "translation", headers.find((header) => !off(header))]) {
    if (candidate && headers.includes(candidate) && !off(candidate)) return candidate;
  }
  fail(`${file} has no "${lang}" column to read the translation from.`);
}

function fail(message) {
  console.error(`error: ${message}\n\n${USAGE}`);
  process.exit(1);
}

main(process.argv.slice(2));
