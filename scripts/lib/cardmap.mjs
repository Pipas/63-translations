// general_packs/card-map.json: which card in one language is which card in
// another.
//
// Card ids are per-row database identities and don't line up between languages
// (see general_packs/README.md), so nothing in the deck files themselves says
// that "Sleepwalking" and "Sonambulismo" are the same card. This file does.
// One entry per concept, holding one id per language:
//
//   { "title": "Acne", "ids": { "en-GB": "b151…", "pt-PT": "82a3…" } }
//
// An entry with no id for a language means that language has no such card:
// either dropped on purpose (DROPPED.md says why) or not translated yet. An
// entry with no `en-GB` id is a card that exists only in a translation.
//
// import-csv.mjs keeps this up to date as languages come back from the sheet.
// The pt-PT pairs were matched by hand, once, and checked against DROPPED.md.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { ROOT, SOURCE_LANG } from "./translations.mjs";

export const CARD_MAP = path.join(ROOT, "general_packs", "card-map.json");

export function readCardMap() {
  if (!existsSync(CARD_MAP)) return { source: SOURCE_LANG, languages: [SOURCE_LANG], cards: [] };
  return JSON.parse(readFileSync(CARD_MAP, "utf8"));
}

export function writeCardMap(map) {
  writeFileSync(CARD_MAP, JSON.stringify(map, null, 2) + "\n");
}

// Every id in the map, in any language, pointing at the entry that owns it.
export function indexById(map) {
  const index = new Map();
  for (const entry of map.cards) {
    for (const id of Object.values(entry.ids)) index.set(id, entry);
  }
  return index;
}

/* ------------------------------------------------------------ DROPPED ---- */

// Reads the reasons out of general_packs/DROPPED.md so the sheet can say why a
// card is missing from a language, rather than just that it is. The file is
// prose with `## \`lang\`` sections, `### reason` headings and single-column
// tables of card titles; anything it can't parse is simply not reported.
export function readDropReasons() {
  const file = path.join(ROOT, "general_packs", "DROPPED.md");
  const reasons = new Map();
  if (!existsSync(file)) return reasons;

  let lang = null;
  let reason = null;

  for (const line of readFileSync(file, "utf8").split("\n")) {
    const language = line.match(/^##\s+`([^`]+)`/);
    if (language) {
      lang = language[1];
      reason = null;
      if (!reasons.has(lang)) reasons.set(lang, new Map());
      continue;
    }
    const heading = line.match(/^###\s+(.+?)\s*$/);
    if (heading) {
      reason = heading[1];
      continue;
    }
    // Single-cell rows only: the "no English counterpart" table has two.
    const row = line.match(/^\|\s*([^|]+?)\s*\|\s*$/);
    if (row && lang && reason && !/^-+$/.test(row[1]) && row[1] !== "Card") {
      reasons.get(lang).set(row[1], reason);
    }
  }
  return reasons;
}
