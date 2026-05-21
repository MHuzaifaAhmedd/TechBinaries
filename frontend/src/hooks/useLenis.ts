"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "@studio-freight/lenis";
import type { LenisOptions } from "@studio-freight/lenis";
import { DEFAULT_LENIS_OPTIONS } from "@/lib/animation/lenis-config";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";
import { setLenisInstance } from "@/lib/scroll-control";

export type UseLenisHookOptions = Partial<LenisOptions> & {
  /** When false, Lenis is not initialized (SSR-safe default path). */
  enabled?: boolean;
  /** Registers the instance with `@/lib/scroll-control` helpers. */
  syncScrollControl?: boolean;
};

function toLenisOptions(options: UseLenisHookOptions): LenisOptions {
  const { enabled: _enabled, syncScrollControl: _sync, ...lenisOptions } = options;
  return { ...DEFAULT_LENIS_OPTIONS, ...lenisOptions };
}

export function useLenis(options: UseLenisHookOptions = {}): Lenis | null {
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const enabled = options.enabled ?? true;
  const syncScrollControl = options.syncScrollControl ?? false;
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!enabled) {
      setLenis(null);
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLenis(null);
      return;
    }

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const [{ gsap, ScrollTrigger }, lenisModule] = await Promise.all([
          loadGsapWithScrollTrigger(),
          import("@studio-freight/lenis"),
        ]);
        if (cancelled) return;

        const LenisCtor = lenisModule.default;
        const instance = new LenisCtor(toLenisOptions(optionsRef.current));

        setLenis(instance);
        if (syncScrollControl) {
          setLenisInstance(instance);
        }

        instance.on("scroll", () => ScrollTrigger.update());
        const ticker = (time: number) => instance.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          gsap.ticker.remove(ticker);
          instance.destroy();
          setLenis(null);
          if (syncScrollControl) {
            setLenisInstance(null);
          }
        };
      })();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [enabled, syncScrollControl]);

  return lenis;
}
