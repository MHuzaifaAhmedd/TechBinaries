import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const jobs = [
  ["images/hero-poster.jpg", "images/hero-poster.webp"],
  ["images/product-land.png", "images/product-land.webp"],
  ["images/blogs/blogs-hero.png", "images/blogs/blogs-hero.webp"],
  ["images/about/about-hero-mobile.jpg", "images/about/about-hero-mobile.webp"],
  ["images/careers/careers-hero-section.jpeg", "images/careers/careers-hero-section.webp"],
  ["images/careers/careers-hero-section-mobile.jpeg", "images/careers/careers-hero-section-mobile.webp"],
  [
    "images/services/custom-software-development/cwad-service-hero-mobile.jpeg",
    "images/services/custom-software-development/cwad-service-hero-mobile.webp",
  ],
  [
    "images/services/custom-software-development/mobile-custom-software-service-hero.jpeg",
    "images/services/custom-software-development/mobile-custom-software-service-hero.webp",
  ],
];

for (const [relIn, relOut] of jobs) {
  const input = join(publicDir, relIn);
  const output = join(publicDir, relOut);
  await sharp(input).webp({ quality: 86 }).toFile(output);
  console.log("Wrote", relOut);
}
