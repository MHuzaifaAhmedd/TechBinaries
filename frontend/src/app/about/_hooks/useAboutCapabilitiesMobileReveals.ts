"use client";

import { useEffect } from "react";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";

export function useAboutCapabilitiesMobileReveals(isMobile: boolean, enabled = true) {
  useEffect(() => {
    if (!enabled || !isMobile) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".ab-cap-mobile-card").forEach((card) => {
            gsap.fromTo(
              card,
              { opacity: 0, y: 60 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          });
        });

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [isMobile, enabled]);
}
