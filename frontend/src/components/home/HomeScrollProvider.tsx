"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type MutableRefObject,
  type ReactNode,
} from "react";
import type Lenis from "@studio-freight/lenis";
import {
  loadGsapWithScrollTrigger,
  loadLenisCtor,
  runAfterInteractive,
} from "@/lib/animation/loaders";
import { DEFAULT_LENIS_OPTIONS } from "@/lib/animation/lenis-config";
import { scheduleScrollTriggerRefresh } from "@/lib/animation/refreshScrollTrigger";
import { setLenisInstance } from "@/lib/scroll-control";

export type HomeScrollRefs = {
  lenisRef: MutableRefObject<Lenis | null>;
  capProgrammaticScrollRef: MutableRefObject<boolean>;
};

const HomeScrollContext = createContext<HomeScrollRefs | null>(null);

export function useHomeScrollRefs(): HomeScrollRefs {
  const ctx = useContext(HomeScrollContext);
  if (!ctx) {
    throw new Error("useHomeScrollRefs must be used within HomeScrollProvider");
  }
  return ctx;
}

/**
 * Minimal client boundary: Lenis smooth scroll, shared GSAP scroll animations,
 * and scroll restoration — without forcing the entire home page into one bundle.
 */
export function HomeScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const capProgrammaticScrollRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const run = async () => {
      const [LenisCtorUnknown, { gsap, ScrollTrigger }] = await Promise.all([
        loadLenisCtor(),
        loadGsapWithScrollTrigger(),
      ]);

      if (cancelled) return;

      const LenisCtor = LenisCtorUnknown as unknown as new (opts: unknown) => Lenis;
      const lenis = new LenisCtor({ ...DEFAULT_LENIS_OPTIONS });

      lenisRef.current = lenis as Lenis;
      lenis.on("scroll", ScrollTrigger.update);
      setLenisInstance(lenis as Lenis);

      const ticker = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(ticker);
      gsap.ticker.lagSmoothing(0);

      cleanup = () => {
        gsap.ticker.remove(ticker);
        lenis.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
      };
    };

    runAfterInteractive(() => {
      void run();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    const run = async () => {
      const { gsap } = await loadGsapWithScrollTrigger();
      if (cancelled) return;

      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el: HTMLElement) => {
          const raw = el.dataset.val || "";
          const m = raw.match(/^([\d.]+)(.*)$/);
          if (!m) return;
          const target = parseFloat(m[1]);
          const suffix = m[2];
          const isInt = Number.isInteger(target);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
            onUpdate: () => {
              el.textContent =
                (isInt ? Math.round(obj.v).toString() : obj.v.toFixed(1)) + suffix;
            },
          });
        });

        gsap.utils.toArray<HTMLElement>(".sh").forEach((el: HTMLElement) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 38 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 88%" },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>(".tag").forEach((el: HTMLElement) => {
          gsap.fromTo(
            el,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 92%" },
            },
          );
        });
      });

      revert = () => ctx.revert();
    };

    runAfterInteractive(() => {
      void run();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;
    let ScrollTrigger: { refresh?: (safe?: boolean) => void; update?: () => void } | null =
      null;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const resetView = () => {
      capProgrammaticScrollRef.current = false;
      const lenis = lenisRef.current;
      lenis?.stop();
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true, force: true });
      lenis?.resize();
      requestAnimationFrame(() => {
        ScrollTrigger?.refresh?.(true);
        ScrollTrigger?.update?.();
        lenis?.start();
      });
    };

    resetView();

    const handlePageShow = () => resetView();
    const handlePageHide = () => lenisRef.current?.stop();

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);

    runAfterInteractive(() => {
      void loadGsapWithScrollTrigger().then(({ ScrollTrigger: st }) => {
        if (cancelled) return;
        ScrollTrigger = st;
      });
    });

    return () => {
      cancelled = true;
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", handlePageHide);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    let cancelled = false;
    fonts.ready.then(async () => {
      if (cancelled) return;
      scheduleScrollTriggerRefresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <HomeScrollContext.Provider value={{ lenisRef, capProgrammaticScrollRef }}>
      {children}
    </HomeScrollContext.Provider>
  );
}
