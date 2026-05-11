import type Lenis from "@studio-freight/lenis";
import { useEffect, useRef, type MutableRefObject } from "react";
import {
  loadGsapWithScrollTrigger,
  loadLenisCtor,
  runAfterInteractive,
} from "@/lib/animation/loaders";

export type UseCwaLenisResult = {
  lenisRef: MutableRefObject<Lenis | null>;
};

export function useCwaLenis(): UseCwaLenisResult {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    runAfterInteractive(() => {
      void Promise.all([loadLenisCtor(), loadGsapWithScrollTrigger()]).then(
        ([LenisCtor, { gsap, ScrollTrigger }]) => {
          if (cancelled) return;
          const lenis = new LenisCtor({
            duration: 1.1,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            wheelMultiplier: 1,
            touchMultiplier: 1.4,
            smoothWheel: true,
          }) as Lenis;
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
        }
      );
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return { lenisRef };
}
