import type Lenis from "@studio-freight/lenis";
import { useEffect, useRef, type MutableRefObject } from "react";
import {
  loadGsapWithScrollTrigger,
  loadLenisCtor,
  runAfterInteractive,
} from "@/lib/animation/loaders";
import { DEFAULT_LENIS_OPTIONS } from "@/lib/animation/lenis-config";

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
            ...DEFAULT_LENIS_OPTIONS,
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
