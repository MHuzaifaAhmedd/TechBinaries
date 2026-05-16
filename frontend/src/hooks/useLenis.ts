"use client";

/* ─────────────────────────────────────────────────────────────────────────
   useLenis
   ────────
   Mounts a Lenis smooth-scroll instance and wires it into GSAP's ticker so
   ScrollTrigger reads from the smoothed scroll position. Mount this hook
   exactly once near the top of a page that needs smooth scroll.
   ──────────────────────────────────────────────────────────────────────── */

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenisInstance } from "@/lib/scroll-control";

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);
    setLenisInstance(lenis);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, []);
}
