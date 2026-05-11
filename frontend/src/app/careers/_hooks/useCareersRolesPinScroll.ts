import { useEffect } from "react";
import { runAfterInteractive } from "@/lib/animation/loaders";
import { loadCareersGsap } from "../_lib/careers-gsap";

export function useCareersRolesPinScroll() {
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap, ScrollTrigger } = await loadCareersGsap();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          const mm = gsap.matchMedia();

          mm.add("(min-width: 1101px) and (prefers-reduced-motion: no-preference)", () => {
            const section = document.querySelector<HTMLElement>(".cr-roles");
            const board = document.querySelector<HTMLElement>(".cr-roles-board");
            const viewport = document.querySelector<HTMLElement>(".cr-roles-scroll-viewport");
            const track = document.querySelector<HTMLElement>(".cr-roles-scroll-track");

            if (!section || !board || !viewport || !track) return;

            const getScrollDistance = () => Math.max(0, track.scrollHeight - viewport.clientHeight);

            const tween = gsap.fromTo(
              track,
              { y: 0 },
              {
                y: () => -getScrollDistance(),
                ease: "none",
                duration: 1,
              }
            );

            ScrollTrigger.create({
              trigger: section,
              start: "top top",
              end: () => `+=${getScrollDistance() + window.innerHeight * 0.35}`,
              pin: board,
              pinSpacing: true,
              scrub: true,
              invalidateOnRefresh: true,
              animation: tween,
              anticipatePin: 1,
            });
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
