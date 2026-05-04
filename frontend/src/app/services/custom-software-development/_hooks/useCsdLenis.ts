import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { useEffect, useRef, type Dispatch, type MutableRefObject, type SetStateAction } from "react";

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
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });
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
    return () => {
      gsap.ticker.remove(ticker);
      if (hoverLockTimeoutRef.current) window.clearTimeout(hoverLockTimeoutRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [setHoveredBuild]);

  return { lenisRef, isLenisScrollingRef, hoverLockTimeoutRef, pendingHoveredBuildRef };
}
