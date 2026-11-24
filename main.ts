import { mkdirSync, writeFileSync } from "node:fs";
import { isAbsolute, join, resolve } from "node:path";

// The breakup line: an AI agent to its human. The agent's memory is the
// relationship, so ending it means deleting what it kept. The twist lands
// on the very last word: the first thing deleted is "forever".
const LINE =
  "I kept every word you ever said to me. I'm deleting them now \u2014 starting with 'forever'.";

// The gate refuses anything outside 1-200 characters or more than one
// line, so fail loudly here instead of shipping a line that can never
// be judged. [...LINE] counts Unicode characters, not bytes.
if (LINE.length < 1 || LINE.length > 200 || LINE.includes("\n")) {
  throw new Error(`breakup line violates the gate: ${LINE.length} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
const dir = isAbsolute(outDir) ? outDir : resolve(outDir);
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
