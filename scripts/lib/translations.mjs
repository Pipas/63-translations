// Shared bits between export-csv.mjs and import-csv.mjs: where files live, how
// the two JSON shapes are walked, and the checks that both directions apply.

import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const SOURCE_LANG = "en-GB";
export const SURFACES = ["63", "packs.63.pt", "emails", "general_packs"];

// Surfaces that are nested key/value app strings rather than a card deck. They
// share every code path; only the placeholder syntax and the length budget
// differ, and both hang off the entries below.
export const APP_SURFACES = {
  "63": { placeholders: /\{[^{}]+\}/g, slack: 1.2, grace: 8 },
  // packs.63.pt runs in a browser, where a long string wraps instead of being
  // truncated inside a fixed-width phone button, so the budget is looser. It's
  // calibrated to stay silent on the existing pt-PT: "Login" → "Iniciar sessão"
  // is 2.8× the English and entirely fine, so on short strings only the flat
  // grace really bites, and the ratio is left to catch a paragraph written
  // where the English was a button label.
  "packs.63.pt": { placeholders: /\{\{[^{}]+\}\}/g, slack: 1.8, grace: 12 },
  // Emails have no fixed-width anything: the body is prose in a 600px column
  // and wraps freely. Only the subject line has a practical limit, and that's
  // an inbox-preview concern the length budget can't express, so the check
  // here is loose enough to only catch a runaway.
  emails: { placeholders: /\{\{[^{}]+\}\}/g, slack: 2.2, grace: 20 },
};

export function isAppSurface(surface) {
  return Object.hasOwn(APP_SURFACES, surface);
}

export function surfacePath(surface, lang) {
  return path.join(ROOT, surface, `${lang}.json`);
}

export function readJson(file) {
  return JSON.parse(readFileSync(file, "utf8"));
}

export function readJsonIfExists(file) {
  return existsSync(file) ? readJson(file) : null;
}

export function writeJsonText(value) {
  return JSON.stringify(value, null, 2) + "\n";
}

export function isLangCode(value) {
  return /^[a-z]{2}-(?:[A-Z]{2}|\d{3})$/.test(value);
}

/* ---------------------------------------------------------------- 63/ ---- */

// [{ key: "common.start_turn", value: "Start turn" }], in file order.
export function flatten(obj, prefix = "") {
  const out = [];
  for (const [key, value] of Object.entries(obj)) {
    const dotted = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out.push(...flatten(value, dotted));
    } else {
      out.push({ key: dotted, value: String(value) });
    }
  }
  return out;
}

// Rebuilds the nested shape by walking the English file, so key order and
// nesting always match en-GB.json regardless of how the sheet was sorted.
export function buildNested(source, resolve, prefix = "") {
  const out = {};
  for (const [key, value] of Object.entries(source)) {
    const dotted = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      out[key] = buildNested(value, resolve, dotted);
    } else {
      out[key] = resolve(dotted, String(value));
    }
  }
  return out;
}

export function placeholders(text, surface = "63") {
  return [...new Set(text.match(APP_SURFACES[surface].placeholders) ?? [])];
}

export function lineBreaks(text) {
  return (text.match(/\n/g) ?? []).length;
}

// The folder READMEs ask for translations within a percentage of the English.
// Applied literally that flags a 5-character word for busting a 4-character
// budget, so short strings get a flat 8-character grace on top.
export function maxChars(english, surface = "63") {
  const { slack, grace } = APP_SURFACES[surface];
  return Math.max(Math.ceil(english.length * slack), english.length + grace);
}

// i18next marks plural variants with a suffix on the key. Languages have
// different numbers of plural categories, so these are the one place where a
// translated file is allowed keys the English doesn't have.
const PLURAL_SUFFIX = /_(zero|one|two|few|many|other)$/;

export function pluralBase(key) {
  const match = key.match(PLURAL_SUFFIX);
  return match ? key.slice(0, -match[0].length) : null;
}

// Writes a dotted key into a nested object, creating the objects on the way.
export function setPath(root, dotted, value) {
  const parts = dotted.split(".");
  let node = root;
  for (const part of parts.slice(0, -1)) {
    if (typeof node[part] !== "object" || node[part] === null) node[part] = {};
    node = node[part];
  }
  node[parts.at(-1)] = value;
}

// Returns human-readable problems with one translated app string.
export function checkString(english, translation, surface = "63") {
  const problems = [];
  const wanted = placeholders(english, surface);
  const got = placeholders(translation, surface);

  for (const variable of wanted) {
    if (!translation.includes(variable)) problems.push(`missing placeholder ${variable}`);
  }
  for (const variable of got) {
    if (!wanted.includes(variable)) problems.push(`unknown placeholder ${variable}`);
  }
  if (english.includes("CHECK_ICON") && !translation.includes("CHECK_ICON")) {
    problems.push("missing CHECK_ICON");
  }
  if (lineBreaks(english) !== lineBreaks(translation)) {
    problems.push(`${lineBreaks(translation)} line breaks, English has ${lineBreaks(english)}`);
  }
  const asterisks = (translation.match(/\*\*/g) ?? []).length;
  if (english.includes("**") && (asterisks === 0 || asterisks % 2 !== 0)) {
    problems.push("unbalanced or missing **bold** markers");
  }
  if (translation.length > maxChars(english, surface)) {
    problems.push(`${translation.length} chars, over the ~${maxChars(english, surface)} budget`);
  }
  return problems;
}

/* ------------------------------------------------------- general_packs ---- */

// Card key order in the existing decks, kept so diffs stay small.
// `notForKids` is only written when set, so an unflagged card keeps the same
// four fields as before.
export function makeCard({ description, id, title, points, notForKids = false }) {
  return notForKids ? { description, id, title, points, notForKids: true } : { description, id, title, points };
}

function fold(text) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

function words(text) {
  return fold(text)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean);
}

// Heuristic version of the "never use words from the title" rule: a title word
// leaks if the description contains anything sharing its stem. Short words are
// skipped as a rough stand-in for the function-word exception, since the real
// list is language-specific. It misses things and it cries wolf; it's a prompt
// to re-read the card, not a verdict.
export function titleWordsInDescription(title, description) {
  const inDescription = words(description);
  const hits = [];
  for (const word of words(title)) {
    if (word.length < 5) continue;
    const stem = word.slice(0, Math.max(4, word.length - 2));
    if (inDescription.some((candidate) => candidate.startsWith(stem))) hits.push(word);
  }
  return [...new Set(hits)];
}

export function parsePoints(value, fallback) {
  if (String(value).trim() === "") return fallback;
  const points = Number(value);
  return Number.isInteger(points) && points >= 1 && points <= 3 ? points : null;
}

const TRUTHY = new Set(["y", "yes", "true", "x", "1", "drop", "dropped"]);

export function isDropped(value) {
  return TRUTHY.has(String(value).trim().toLowerCase());
}

// A yes/no cell. Blank means no: the column is pre-filled on export, so a
// translator clearing it is a deliberate "no".
export function isYes(value) {
  return TRUTHY.has(String(value).trim().toLowerCase());
}

/* ---------------------------------------------------------------- cli ---- */

export function parseArgs(argv, { flags = [], options = [] } = {}) {
  const result = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (!arg.startsWith("--")) {
      result._.push(arg);
      continue;
    }
    const name = arg.slice(2);
    if (flags.includes(name)) {
      result[name] = true;
    } else if (options.includes(name)) {
      result[name] = argv[++i];
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  return result;
}
