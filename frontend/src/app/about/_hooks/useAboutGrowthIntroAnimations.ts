"use client";

import { useEffect } from "react";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";

export function useAboutGrowthIntroAnimations(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          gsap.fromTo(
            ".ab-growth-intro-aside > *",
            { opacity: 0, y: 36 },
            {
              opacity: 1,
              y: 0,
              duration: 0.95,
              stagger: 0.1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: ".ab-growth-intro-layout",
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".ab-growth-intro-panel",
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 1.05,
              ease: "expo.out",
              scrollTrigger: {
                trigger: ".ab-growth-intro-panel",
                start: "top 84%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".ab-growth-intro-tag",
            { opacity: 0, y: 16 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".ab-growth-intro-tags",
                start: "top 88%",
                once: true,
              },
            }
          );
        });

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [enabled]);
}
