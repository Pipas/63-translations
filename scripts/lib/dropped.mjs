// general_packs/DROPPED.md: why a card is missing from a language.
//
// Every translated card carries its English card's id, so whether a language has
// a card is a lookup by id. What the deck files can't say is why a card is
// missing; DROPPED.md does, and export-csv.mjs shows it in the sheet.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { ROOT } from "./translations.mjs";

// Reads the reasons out of general_packs/DROPPED.md so the sheet can say why a
// card is missing from a language, rather than just that it is. The file is
// prose with `## \`lang\`` sections, `### reason` headings and single-column
// tables of English card titles; anything it can't parse is simply not reported.
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
    // Single-cell rows only, so tables with extra columns are skipped.
    const row = line.match(/^\|\s*([^|]+?)\s*\|\s*$/);
    if (row && lang && reason && !/^-+$/.test(row[1]) && row[1] !== "Card") {
      reasons.get(lang).set(row[1], reason);
    }
  }
  return reasons;
}
