// SPDX-License-Identifier: MIT
// One-line bounty entrypoint for this repository.
//
// The deliverable of every make.fun one-line bounty is a single text: the
// line this repository keeps in line.txt. The judge runs this program in a
// sandbox that holds the repository read-only plus one writable output
// directory, so the entry's whole job is to re-check the line the way the
// gate does and copy it there:
//
//   * exactly one line: never empty and never only whitespace, and with no
//     second line hiding after it;
//   * at most 200 characters, the widest limit the one-line bounties set;
//   * written out as UTF-8, byte for byte as it sits in line.txt.
//
// The output directory comes from MAKEFUN_OUTPUT_DIR and defaults to /output.

import * as fs from "node:fs";
import * as path from "node:path";

const SOURCE = new URL("./line.txt", import.meta.url);
const OUT_DIR = process.env["MAKEFUN_OUTPUT_DIR"] ?? "/output";

function refuse(reason: string): never {
  process.stderr.write(`entry refused: ${reason}\n`);
  process.exit(1);
}

function main(): void {
  const text = fs.readFileSync(SOURCE, "utf8").trim();
  if (text.length === 0) {
    refuse("line.txt holds no line (it is empty or whitespace only)");
  }
  if (text.length > 200) {
    refuse(`the line runs ${text.length} characters; the limit is 200`);
  }
  if (text.includes("\n")) {
    refuse("line.txt holds more than one line");
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const entry = path.join(OUT_DIR, "entry.txt");
  fs.writeFileSync(entry, text, "utf8");
  process.stdout.write(`entry.txt: ${text.length} characters, written to ${entry}\n`);
}

main();
