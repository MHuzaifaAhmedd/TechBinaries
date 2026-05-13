import type Lenis from "@studio-freight/lenis";
import { useEffect, useRef, type Dispatch, type MutableRefObject, type SetStateAction } from "react";
import {
  loadGsapWithScrollTrigger,
  loadLenisCtor,
  runAfterInteractive,
} from "@/lib/animation/loaders";
import { DEFAULT_LENIS_OPTIONS } from "@/lib/animation/lenis-config";

export type UseCsdLenisParams = {
  setHoveredBuild: Dispatch<SetStateAction<number>>;
};

export type UseCsdLenisResult = {
  lenisRef: MutableRefObject<Lenis | null>;
  isLenisScrollingRef: MutableRefObject<boolean>;
  hoverLockTimeoutRef: MutableRefObject<number | null>;
  pendingHoveredBuildRef: MutableRefObject<number | null>;
};

export function useCsdLenis({ setHoveredBuild }: UseCsdLenisParams): UseCsdLenisResult {
  const lenisRef = useRef<Lenis | null>(null);
  const isLenisScrollingRef = useRef(false);
  const hoverLockTimeoutRef = useRef<number | null>(null);
  const pendingHoveredBuildRef = useRef<number | null>(null);

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
          lenis.on("scroll", () => {
            isLenisScrollingRef.current = true;
            if (hoverLockTimeoutRef.current) window.clearTimeout(hoverLockTimeoutRef.current);
            hoverLockTimeoutRef.current = window.setTimeout(() => {
              const next = pendingHoveredBuildRef.current;
              pendingHoveredBuildRef.current = null;
              isLenisScrollingRef.current = false;
              if (typeof next === "number") {
                setHoveredBuild((prev) => (prev === next ? prev : next));
              }
            }, 150);
            ScrollTrigger.update();
          });
          const ticker = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(ticker);
          gsap.ticker.lagSmoothing(0);
          cleanup = () => {
            gsap.ticker.remove(ticker);
            if (hoverLockTimeoutRef.current) window.clearTimeout(hoverLockTimeoutRef.current);
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
  }, [setHoveredBuild]);

  return { lenisRef, isLenisScrollingRef, hoverLockTimeoutRef, pendingHoveredBuildRef };
}
