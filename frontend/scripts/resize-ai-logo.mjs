import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const input = join(publicDir, "images/AI-Bot/ai-logo.png");
const outWebp = join(publicDir, "images/AI-Bot/ai-logo.webp");
const outPng32 = join(publicDir, "images/AI-Bot/ai-logo-32.png");

const resizeOpts = { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } };

await sharp(input)
  .resize(64, 64, resizeOpts)
  .webp({ quality: 90 })
  .toFile(outWebp);
console.log("Wrote", outWebp);

await sharp(input)
  .resize(32, 32, resizeOpts)
  .png()
  .toFile(outPng32);
console.log("Wrote", outPng32);
