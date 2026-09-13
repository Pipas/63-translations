// Minimal RFC 4180 CSV, no dependencies.
//
// Cell values are round-tripped through `encodeCell`/`decodeCell` so that every
// row stays on a single line in the sheet: a real line break inside a string
// becomes the two characters \n. Google Sheets does allow multi-line cells
// (alt+enter), so `decodeCell` accepts both forms on the way back.

const NEEDS_QUOTES = /[",\r\n]|^\s|\s$/;

export function toCsv(rows) {
  return rows.map((row) => row.map(quote).join(",")).join("\r\n") + "\r\n";
}

function quote(value) {
  const str = value == null ? "" : String(value);
  return NEEDS_QUOTES.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
}

export function fromCsv(text) {
  const input = text.replace(/^﻿/, "");
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;
  let i = 0;

  while (i < input.length) {
    const char = input[i];

    if (quoted) {
      if (char === '"') {
        if (input[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        quoted = false;
        i += 1;
        continue;
      }
      field += char;
      i += 1;
      continue;
    }

    if (char === '"' && field === "") {
      quoted = true;
      i += 1;
      continue;
    }
    if (char === ",") {
      row.push(field);
      field = "";
      i += 1;
      continue;
    }
    if (char === "\r" || char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
      i += char === "\r" && input[i + 1] === "\n" ? 2 : 1;
      continue;
    }
    field += char;
    i += 1;
  }

  if (field !== "" || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function isBlank(row) {
  return row.every((cell) => cell.trim() === "");
}

// Reads a CSV into objects keyed by header name, so translators can reorder or
// add columns in the sheet without breaking the import.
export function readTable(text) {
  const rows = fromCsv(text);
  if (rows.length === 0) return { headers: [], records: [] };
  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const records = [];

  rows.slice(1).forEach((cells, index) => {
    if (isBlank(cells)) return;
    // Row number as Google Sheets shows it — counted before blank rows are
    // skipped — so a warning points at a row the translator can find.
    const record = { __row: index + 2 };
    headers.forEach((header, column) => {
      record[header] = decodeCell(cells[column] ?? "");
    });
    records.push(record);
  });

  return { headers, records };
}

export function encodeCell(value) {
  return String(value).replace(/\\/g, "\\\\").replace(/\r?\n/g, "\\n");
}

export function decodeCell(value) {
  // Trimmed before decoding rather than after. Stray spaces picked up in the
  // sheet are real whitespace and should go, but a deliberate trailing newline
  // arrives as the two characters \n — trimming the decoded string would eat
  // it, which silently truncates the plain-text email bodies in emails/.
  const input = value.trim();
  let out = "";
  for (let i = 0; i < input.length; i += 1) {
    if (input[i] === "\\" && input[i + 1] === "n") {
      out += "\n";
      i += 1;
    } else if (input[i] === "\\" && input[i + 1] === "\\") {
      out += "\\";
      i += 1;
    } else if (input[i] === "\r") {
      if (input[i + 1] === "\n") i += 1;
      out += "\n";
    } else {
      out += input[i];
    }
  }
  return out;
}

// UTF-8 BOM: without it Excel mangles accented characters. Sheets strips it.
export const BOM = "﻿";
