/* ─────────────────────────────────────────────────────────────────────────
   GSAP singleton — register plugins exactly once.

   IMPORTANT NOTE on SplitText:
   ────────────────────────────
   GSAP's official `SplitText` is a GreenSock Club plugin (paid). If you have
   a Club license, swap the import below with the real plugin:

     import { SplitText } from "gsap/SplitText";
     gsap.registerPlugin(SplitText);

   Otherwise we use the lightweight in-house splitter that mirrors the part
   of the SplitText API we actually consume (`.chars`, `.words`, `.lines`,
   `.revert()`). It's enough to drive every animation in this module.
   ──────────────────────────────────────────────────────────────────────── */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./splitTextFallback";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger, SplitText };
