import { useEffect, useRef } from "react";
import type Lenis from "@studio-freight/lenis";
import { loadLenisCtor, runAfterInteractive } from "@/lib/animation/loaders";
import { loadCareersGsap } from "../_lib/careers-gsap";

export function useCareersLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const [LenisCtorUnknown, { gsap, ScrollTrigger }] = await Promise.all([
          loadLenisCtor(),
          loadCareersGsap(),
        ]);

        if (cancelled) return;

        const LenisCtor = LenisCtorUnknown as unknown as new (opts: unknown) => Lenis;

        const lenis = new LenisCtor({
          duration: 1.1,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 1,
          touchMultiplier: 1.4,
          smoothWheel: true,
        });

        lenisRef.current = lenis;
        lenis.on("scroll", () => ScrollTrigger.update());

        const ticker = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          gsap.ticker.remove(ticker);
          lenis.destroy();
          lenisRef.current = null;
        };
      })();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return lenisRef;
}
