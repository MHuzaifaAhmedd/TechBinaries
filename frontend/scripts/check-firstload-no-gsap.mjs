import fs from "node:fs";
import path from "node:path";

const statsPath = path.join(process.cwd(), ".next", "diagnostics", "route-bundle-stats.json");
const stats = JSON.parse(fs.readFileSync(statsPath, "utf8"));

// Look for actual bundled library code paths, not dynamic-import specifiers.
const needles = [
  "node_modules/gsap",
  "gsap-core.js",
  "ScrollTrigger.js",
  "@studio-freight/lenis",
  "lenis.mjs",
];

const hits = [];

for (const r of stats) {
  for (const rel of r.firstLoadChunkPaths) {
    const normRel = rel.replace(/^[.]next[\\\\/]/, ".next" + path.sep).replace(/[\\\\/]/g, path.sep);
    const full = path.join(process.cwd(), normRel);
    const buf = fs.readFileSync(full);
    const text = buf.toString("utf8");
    for (const needle of needles) {
      if (text.includes(needle)) {
        hits.push({ route: r.route, chunk: rel, needle });
      }
    }
  }
}

if (hits.length) {
  console.log("FOUND needles in firstLoadChunkPaths:");
  for (const h of hits) console.log(`${h.route}\t${h.needle}\t${h.chunk}`);
  process.exit(1);
}

console.log("OK: no gsap/ScrollTrigger/lenis substrings found in any firstLoadChunkPaths chunks.");

