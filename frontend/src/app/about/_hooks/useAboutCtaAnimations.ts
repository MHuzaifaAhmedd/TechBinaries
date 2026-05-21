"use client";

import { useEffect, type RefObject } from "react";
import { ABOUT_MOBILE_MEDIA_QUERY } from "../_lib/about-constants";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";
import { scheduleScrollTriggerRefresh } from "@/lib/animation/refreshScrollTrigger";

export function useAboutCtaAnimations(
  marqueeRef: RefObject<HTMLDivElement | null>,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const narrow = window.matchMedia(ABOUT_MOBILE_MEDIA_QUERY).matches;
          const staticReveal = narrow || prefersReduce;

          if (staticReveal) {
            gsap.set(".ab-cta-inner", { opacity: 1, scale: 1, y: 0 });
            gsap.set(".ab-cta-char", { opacity: 1, yPercent: 0 });
            gsap.set(".ab-cta-after", { opacity: 1, y: 0 });
          } else {
            gsap.fromTo(
              ".ab-cta-frame",
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 1.4,
                ease: "expo.inOut",
                scrollTrigger: { trigger: ".ab-cta", start: "top 80%", once: true },
              }
            );

            gsap.fromTo(
              ".ab-cta-inner",
              { opacity: 0, scale: 0.94, y: 30 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.3,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: ".ab-cta",
                  start: "top 85%",
                  once: true,
                  invalidateOnRefresh: true,
                },
              }
            );

            gsap.fromTo(
              ".ab-cta-char",
              { opacity: 0, yPercent: 100 },
              {
                opacity: 1,
                yPercent: 0,
                duration: 1.05,
                stagger: 0.025,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: ".ab-cta-headline",
                  start: "top 90%",
                  once: true,
                  invalidateOnRefresh: true,
                },
              }
            );

            gsap.fromTo(
              ".ab-cta-after",
              { opacity: 0, y: 26 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: ".ab-cta-headline",
                  start: "top 90%",
                  once: true,
                  invalidateOnRefresh: true,
                },
                delay: 0.4,
              }
            );

            gsap.to(".ab-cta-headline", {
              yPercent: -10,
              ease: "none",
              scrollTrigger: {
                trigger: ".ab-cta",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            });

            gsap.to(".ab-cta-grid-pattern", {
              backgroundPosition: "80px 80px",
              ease: "none",
              scrollTrigger: {
                trigger: ".ab-cta",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5,
              },
            });
          }

          if (!prefersReduce) {
            gsap.to(".ab-cta-orb-a", {
              xPercent: 22,
              yPercent: -16,
              duration: 14,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
            gsap.to(".ab-cta-orb-b", {
              xPercent: -26,
              yPercent: 20,
              duration: 18,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
            gsap.to(".ab-cta-orb-c", {
              xPercent: 14,
              yPercent: 22,
              duration: 22,
              ease: "sine.inOut",
              repeat: -1,
              yoyo: true,
            });
          }

          const track =
            !prefersReduce &&
            marqueeRef.current?.querySelector<HTMLElement>(".ab-cta-marquee-track");
          if (track) {
            const firstSet = track.children[0];
            if (firstSet instanceof HTMLElement) {
              const w = firstSet.offsetWidth;
              gsap.to(track, {
                x: -w,
                duration: 32,
                ease: "none",
                repeat: -1,
              });
            }
          }
        });

        queueMicrotask(() => scheduleScrollTriggerRefresh());
        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [marqueeRef, enabled]);
}
