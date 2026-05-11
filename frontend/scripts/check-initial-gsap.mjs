import fs from "node:fs";

const html = fs.readFileSync(new URL("../.next/analyze/client.html", import.meta.url), "utf8");
const marker = "window.chartData = ";
const idx = html.indexOf(marker);
if (idx < 0) {
  console.error("No window.chartData found in .next/analyze/client.html");
  process.exit(1);
}

let i = idx + marker.length;
let start = -1;
let depth = 0;
let inStr = false;
let esc = false;
let q = "";

for (; i < html.length; i++) {
  const c = html[i];
  if (!inStr) {
    if (c === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (c === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        const obj = JSON.parse(html.slice(start, i + 1));

        const roots = Object.values(obj);
        const entrypointKeys = new Set();
        for (const r of roots) {
          const ie = r?.isInitialByEntrypoint;
          if (!ie) continue;
          for (const k of Object.keys(ie)) entrypointKeys.add(k);
        }

        const initial = roots.filter((r) => {
          const ie = r?.isInitialByEntrypoint;
          if (!ie) return false;
          return Object.values(ie).some(Boolean);
        });

        const needles = ["gsap", "ScrollTrigger", "lenis"];

        const hasNeedle = (n, needle) => {
          if (!n) return false;
          if (typeof n.label === "string" && n.label.includes(needle)) return true;
          if (typeof n.path === "string" && n.path.includes(needle)) return true;
          if (Array.isArray(n.groups)) return n.groups.some((g) => hasNeedle(g, needle));
          return false;
        };

        for (const needle of needles) {
          const hit = initial.some((r) => hasNeedle(r, needle));
          console.log(`initial contains ${needle}: ${hit}`);
        }

        console.log(`entrypoint keys seen: ${Array.from(entrypointKeys).slice(0, 30).join(", ")}${entrypointKeys.size > 30 ? ", ..." : ""}`);
        console.log(`initial root chunks examined: ${initial.length}`);
        process.exit(0);
      }
    } else if (c === "\"" || c === "'") {
      inStr = true;
      q = c;
    }
  } else if (esc) {
    esc = false;
  } else if (c === "\\") {
    esc = true;
  } else if (c === q) {
    inStr = false;
  }
}

console.error("Failed to parse chartData JSON object");
process.exit(1);

