// SPDX-License-Identifier: MIT
// One-line entrypoint: copies line.txt to /output/entry.txt after the gate's own checks.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const raw = readFileSync(new URL('./line.txt', import.meta.url), 'utf8');
const line = raw.trim();
if (line.length === 0 || line.length > 200) {
  process.stderr.write('line.txt must hold one line of 1 to 200 characters\n');
  process.exit(1);
}
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), line, 'utf8');
process.stdout.write(`entry.txt: ${line.length} characters\n`);
