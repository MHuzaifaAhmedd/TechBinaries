import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, type MutableRefObject } from "react";

export type UseCwaLenisResult = {
  lenisRef: MutableRefObject<Lenis | null>;
};

export function useCwaLenis(): UseCwaLenisResult {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
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
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return { lenisRef };
}
