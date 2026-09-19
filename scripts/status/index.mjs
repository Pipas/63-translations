import { existsSync, readdirSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";

// Rewrites the tables that repeat what `status.json` already says: the
// Languages table in README.md and the Localisation table in CONTRIBUTORS.md.
//
// `status.json` is the source of truth for two things the app reads over the
// air: whether a language has had a native review (it stops showing players
// the "this is an AI translation" notice) and who translated it (the credits
// screen). Both used to need an app release, so they have to live somewhere a
// script can read, not only in prose.
//
// Which folders a language covers isn't in there, because the folders
// themselves already know: that's read off disk.
//
// Usage (from the repo root):
//   node scripts/status/index.mjs [--dry-run]

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "../..");

// Every folder a language can appear in, in the order the README lists them.
const FOLDERS = ["63", "packs.63.pt", "general_packs", "emails"];

const MARKER_START = "<!-- generated from status.json -->";
const MARKER_END = "<!-- end generated -->";

function parseArgs(argv) {
  const args = { dryRun: false };
  for (const arg of argv) {
    if (arg === "--dry-run") args.dryRun = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

function coverage(tag) {
  return FOLDERS.filter((folder) => existsSync(join(ROOT, folder, `${tag}.json`)));
}

// The sentence the README shows. A draft says so first: an unreviewed language
// being complete matters less than it not having been read by a person yet.
function statusText(tag, entry) {
  const folders = coverage(tag);
  if (!entry.reviewed) return "AI-generated draft — native review required";
  if (entry.source) return "Complete, source language";
  if (folders.length === FOLDERS.length) return "Complete";
  return folders.map((f) => `\`${f}/\``).join(" and ") + " only";
}

function languagesTable(status) {
  const rows = Object.entries(status).map(
    ([tag, entry]) => `| \`${tag}\` | ${entry.name} | ${statusText(tag, entry)} |`,
  );
  return ["| Code | Language | Status |", "| --- | --- | --- |", ...rows].join("\n");
}

// One row per person, with every language they worked on, in the order
// status.json lists the languages.
function localisationTable(status) {
  const byName = new Map();
  for (const [tag, entry] of Object.entries(status)) {
    for (const name of entry.translators ?? []) {
      if (!byName.has(name)) byName.set(name, []);
      byName.get(name).push(tag);
    }
  }
  const rows = [...byName].map(([name, tags]) => `| ${name} | ${tags.map((t) => `\`${t}\``).join(", ")} |`);
  return ["| Name | Languages |", "| --- | --- |", ...rows].join("\n");
}

// Replaces whatever sits between the two markers. The markers are added by
// hand once, so the script never has to guess where a table starts.
function replaceBlock(markdown, table, where) {
  const start = markdown.indexOf(MARKER_START);
  const end = markdown.indexOf(MARKER_END);
  if (start === -1 || end === -1) {
    throw new Error(`${where} has no ${MARKER_START} / ${MARKER_END} pair around its table.`);
  }
  return markdown.slice(0, start + MARKER_START.length) + "\n\n" + table + "\n\n" + markdown.slice(end);
}

async function rewrite(file, table, dryRun) {
  const path = join(ROOT, file);
  const current = await readFile(path, "utf8");
  const next = replaceBlock(current, table, file);
  if (current === next) {
    console.log(`${file}: unchanged`);
    return;
  }
  console.log(`${file}: updated`);
  if (!dryRun) await writeFile(path, next);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const status = JSON.parse(await readFile(join(ROOT, "status.json"), "utf8"));

  const known = new Set(readdirSync(join(ROOT, "63")).filter((f) => f.endsWith(".json")).map((f) => f.slice(0, -5)));
  const missing = [...known].filter((tag) => !(tag in status));
  if (missing.length > 0) throw new Error(`In 63/ but not status.json: ${missing.join(", ")}`);

  for (const [tag, entry] of Object.entries(status)) {
    if (typeof entry.reviewed !== "boolean") throw new Error(`${tag}: "reviewed" must be true or false`);
    if (!Array.isArray(entry.translators)) throw new Error(`${tag}: "translators" must be a list`);
    if (!entry.name) throw new Error(`${tag}: no "name"`);
  }

  await rewrite("README.md", languagesTable(status), args.dryRun);
  await rewrite("CONTRIBUTORS.md", localisationTable(status), args.dryRun);

  if (args.dryRun) console.log("\nDry run, nothing written.");
}

main().catch((err) => {
  console.error(err.message ?? err);
  process.exit(1);
});
