import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the directory that contains this script, so entry.png is read
// from next to the script itself and never from the process working
// directory (the grader may invoke the program from anywhere).
const scriptDir = dirname(fileURLToPath(import.meta.url));
const inputPath = join(scriptDir, "entry.png");

// The grader sets MAKEFUN_OUTPUT_DIR; fall back to /output when unset.
const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

const bytes = readFileSync(inputPath);

// --- Validation -----------------------------------------------------------

// 1. Size: at most 1 MiB.
const MAX_BYTES = 1024 * 1024;
if (bytes.length > MAX_BYTES) {
  throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB limit`);
}

// 2. Magic bytes: PNG signature or JPEG SOI marker.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);
const isPng = bytes.subarray(0, 8).equals(PNG_MAGIC);
const isJpeg = bytes.subarray(0, 3).equals(JPEG_MAGIC);
if (!isPng && !isJpeg) {
  throw new Error("entry.png is neither a PNG nor a JPEG file");
}

// 3. Dimensions: at most 1024 x 1024.
let width: number;
let height: number;
if (isPng) {
  // PNG: width and height are big-endian uint32 at offsets 16 and 20,
  // right after the 8-byte signature and the IHDR chunk header.
  if (bytes.subarray(12, 16).toString("ascii") !== "IHDR") {
    throw new Error("PNG file has no IHDR chunk");
  }
  width = bytes.readUInt32BE(16);
  height = bytes.readUInt32BE(20);
} else {
  // JPEG: scan markers for a Start Of Frame segment (SOF0/SOF1/SOF2).
  let offset = 2;
  width = 0;
  height = 0;
  while (offset + 9 < bytes.length) {
    if (bytes[offset] !== 0xff) break;
    const marker = bytes[offset + 1];
    const length = bytes.readUInt16BE(offset + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      height = bytes.readUInt16BE(offset + 5);
      width = bytes.readUInt16BE(offset + 7);
      break;
    }
    offset += 2 + length;
  }
  if (width === 0 || height === 0) {
    throw new Error("could not read JPEG dimensions");
  }
}
if (width > 1024 || height > 1024) {
  throw new Error(`image is ${width}x${height}, over the 1024x1024 limit`);
}

// 4. SHA-256 digest of the exact bytes, printed so the copy can be verified.
const digest = createHash("sha256").update(bytes).digest("hex");

const outPath = join(outDir, "entry.png");
writeFileSync(outPath, bytes);

// 5. Post-write verification: read the written file back and compare its
// SHA-256 digest with the input digest, so a short or corrupted write
// fails loudly instead of shipping a bad image.
const written = readFileSync(outPath);
const writtenDigest = createHash("sha256").update(written).digest("hex");
if (writtenDigest !== digest) {
  throw new Error(
    `written file digest ${writtenDigest} does not match input digest ${digest}`,
  );
}

console.log(`Image: ${width}x${height}, ${bytes.length} bytes`);
console.log(`SHA-256: ${digest}`);
console.log(`Wrote ${outPath}`);
