"use client";

import { useEffect, type RefObject } from "react";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";

export function useAboutCapabilitiesDesktopScroll(
  capRef: RefObject<HTMLElement | null>,
  isMobile: boolean,
  onActiveIndexChange: (index: number) => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled || isMobile) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          const section = capRef.current;
          if (!section) return;

          const pinEl = section.querySelector<HTMLElement>(".ab-cap-pin");
          if (!pinEl) return;

          const cards = gsap.utils.toArray<HTMLElement>(".ab-cap-card");
          const total = cards.length;
          if (!total) return;
          const segments = total - 1;
          const holdRatio = 0.35;

          cards.forEach((card, i) => {
            if (i === 0) {
              gsap.set(card, {
                yPercent: 0,
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                zIndex: 10,
              });
            } else {
              gsap.set(card, {
                yPercent: 100,
                scale: 1,
                opacity: 0,
                filter: "blur(0px)",
                zIndex: 10 + i,
              });
            }
          });

          gsap.fromTo(
            ".ab-cap-header > *",
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.1,
              ease: "expo.out",
              scrollTrigger: {
                trigger: pinEl,
                start: "top 70%",
                once: true,
              },
            }
          );

          const masterTL = gsap.timeline({
            scrollTrigger: {
              trigger: pinEl,
              start: "top top",
              end: () => `+=${window.innerHeight * 0.9 * (segments + 1)}`,
              scrub: 1,
              pin: pinEl,
              pinSpacing: true,
              anticipatePin: 1,
              fastScrollEnd: false,
              invalidateOnRefresh: true,
              onUpdate: (self: { progress: number }) => {
                const raw = self.progress * segments;
                const idx = Math.min(total - 1, Math.round(raw));
                onActiveIndexChange(idx);
              },
            },
          });

          for (let i = 0; i < segments; i++) {
            const current = cards[i];
            const next = cards[i + 1];
            const segStart = i;
            const transStart = segStart + holdRatio;
            const transEnd = segStart + 1;

            masterTL.to(
              current,
              {
                yPercent: -8,
                scale: 0.92,
                opacity: 0,
                filter: "blur(6px)",
                ease: "power2.inOut",
              },
              transStart
            );

            masterTL.fromTo(
              next,
              { yPercent: 100, scale: 1, opacity: 0, filter: "blur(4px)" },
              {
                yPercent: 0,
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                ease: "power2.inOut",
              },
              transStart
            );

            const innerEls = next.querySelectorAll<HTMLElement>(
              ".ab-cap-card-tag, .ab-cap-card-deliv, .ab-cap-card-stat-block, .ab-cap-card-rule"
            );
            masterTL.fromTo(
              innerEls,
              { opacity: 0, y: 20 },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.04,
                ease: "power3.out",
              },
              transEnd - 0.3
            );
          }

          const firstInner = cards[0].querySelectorAll<HTMLElement>(
            ".ab-cap-card-tag, .ab-cap-card-deliv, .ab-cap-card-stat-block, .ab-cap-card-rule"
          );
          gsap.fromTo(
            firstInner,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.06,
              ease: "expo.out",
              scrollTrigger: {
                trigger: ".ab-cap",
                start: "top 60%",
                once: true,
              },
            }
          );

          gsap.to(".ab-cap-arc-fill", {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
              trigger: pinEl,
              start: "top top",
              end: () => `+=${window.innerHeight * 0.9 * (segments + 1)}`,
              scrub: 0.8,
              invalidateOnRefresh: true,
            },
          });

        }, capRef);

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [capRef, isMobile, onActiveIndexChange, enabled]);
}
