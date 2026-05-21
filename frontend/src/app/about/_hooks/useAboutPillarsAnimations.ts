"use client";

import { useEffect } from "react";
import { ABOUT_FINE_POINTER_MEDIA_QUERY } from "../_lib/about-constants";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";

export function useAboutPillarsAnimations(enabled = true) {
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
            ".ab-pillars-head > *",
            { opacity: 0, y: 44 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              stagger: 0.12,
              ease: "expo.out",
              scrollTrigger: {
                trigger: ".ab-pillars-head",
                start: "top 82%",
                once: true,
              },
            }
          );

          gsap.fromTo(
            ".ab-pillars-divider-line",
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 1.6,
              ease: "expo.inOut",
              scrollTrigger: {
                trigger: ".ab-pillars-divider",
                start: "top 85%",
                once: true,
              },
            }
          );

          gsap.utils.toArray<HTMLElement>(".ab-pillar-card").forEach((card, idx) => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                once: true,
              },
            });
            tl.fromTo(
              card,
              { opacity: 0, y: 80, rotateX: 8 },
              {
                opacity: 1,
                y: 0,
                rotateX: 0,
                duration: 1.1,
                ease: "expo.out",
                delay: idx * 0.08,
              }
            );
            tl.fromTo(
              card.querySelectorAll(
                ".ab-pillar-overlay-head, .ab-pillar-overlay-body, .ab-pillar-meta-item"
              ),
              { opacity: 0, x: 24 },
              {
                opacity: 1,
                x: 0,
                duration: 0.6,
                stagger: 0.06,
                ease: "power3.out",
              },
              "-=0.6"
            );
          });

          const cards = gsap.utils.toArray<HTMLElement>(".ab-pillar-card");
          const isFinePointer = window.matchMedia(ABOUT_FINE_POINTER_MEDIA_QUERY).matches;
          if (!isFinePointer) return;

          const listenerCleanup: Array<{
            card: HTMLElement;
            onMove: (e: MouseEvent) => void;
            onLeave: () => void;
          }> = [];

          cards.forEach((card) => {
            const inner = card.querySelector<HTMLElement>(".ab-pillar-inner");
            if (!inner) return;

            const onMove = (e: MouseEvent) => {
              card.style.willChange = "transform";
              inner.style.willChange = "transform";
              const rect = card.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              gsap.to(inner, {
                rotationY: x * 7,
                rotationX: -y * 7,
                duration: 0.6,
                ease: "power3.out",
                transformPerspective: 1100,
                transformOrigin: "center",
              });
            };

            const onLeave = () => {
              card.style.willChange = "auto";
              inner.style.willChange = "auto";
              gsap.to(inner, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.85,
                ease: "power3.out",
              });
            };

            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
            listenerCleanup.push({ card, onMove, onLeave });
          });

          return () => {
            listenerCleanup.forEach(({ card, onMove, onLeave }) => {
              card.removeEventListener("mousemove", onMove);
              card.removeEventListener("mouseleave", onLeave);
            });
          };
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
