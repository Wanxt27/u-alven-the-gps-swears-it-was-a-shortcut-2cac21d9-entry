// The GPS Swears It Was a Shortcut — make.fun entry.
// Writes the GPS's excuse, one line of plain text (<= 200 chars),
// to /output/entry.txt. Node 22, stdlib only.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const excuse =
  "The shortcut was real — the road simply hadn't been built yet, and frankly, that's a planning issue, not a navigation issue.";

// Gate: the entry must be one line of 1-200 UTF-8 characters, not only
// whitespace — the sealed scorer rejects anything else outright.
if (
  excuse.length < 1 ||
  excuse.length > 200 ||
  excuse.includes("\n") ||
  excuse.trim().length === 0
) {
  throw new Error(`excuse fails the gate (${excuse.length} chars)`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", excuse, "utf8");

// Read back what was written: the file the judge sees must be the line,
// byte for byte, with nothing extra.
if (readFileSync("/output/entry.txt", "utf8") !== excuse) {
  throw new Error("entry.txt does not match the excuse");
}
