// News image entry: copies the bundled image to the output directory.
// The program is deterministic: it writes the same bytes on every run.
// It verifies the copy by comparing byte counts, so a truncated write
// fails loudly instead of shipping a corrupt image.
import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);
if (statSync(source).size !== statSync(target).size) {
  throw new Error("entry.png copy is incomplete");
}
