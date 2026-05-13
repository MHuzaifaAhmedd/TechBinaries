import { useEffect } from "react";
import { runAfterInteractive } from "@/lib/animation/loaders";
import { loadCareersGsap } from "../_lib/careers-gsap";

type TweenTarget = Parameters<(typeof import("gsap"))["gsap"]["to"]>[0];

export function useCareersSectionReveals() {
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap, ScrollTrigger } = await loadCareersGsap();
        if (cancelled) return;
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReduced) {
          gsap.set(".cr-sh", { opacity: 1, y: 0 });
          gsap.set(".cr-filter-thead", { opacity: 1, y: 0 });
          gsap.set(".cr-filter-row", { opacity: 1, y: 0 });
          return;
        }

        const ctx = gsap.context(() => {
          const setupBatch = (
            selector: string,
            from: Record<string, unknown>,
            to: Record<string, unknown>,
            start = "top 86%"
          ) => {
            const items = gsap.utils.toArray(selector) as HTMLElement[];
            if (!items.length) return;
            gsap.set(items, from);
            ScrollTrigger.batch(items, {
              start,
              once: true,
              onEnter: (batch: TweenTarget) =>
                gsap.to(batch, { ...to, stagger: 0.08, overwrite: true }),
            });
          };

          setupBatch(
            ".cr-sh",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" }
          );

          gsap.fromTo(
            ".cr-filter-thead",
            { opacity: 0, y: 14 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".cr-filter-table",
                start: "top 86%",
                once: true,
              },
            }
          );
          (gsap.utils.toArray(".cr-filter-row") as HTMLElement[]).forEach((row, i) => {
            gsap.fromTo(
              row,
              { opacity: 0, y: 12 },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: "power3.out",
                delay: 0.15 + i * 0.06,
                scrollTrigger: {
                  trigger: ".cr-filter-table",
                  start: "top 86%",
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
  }, []);
}
