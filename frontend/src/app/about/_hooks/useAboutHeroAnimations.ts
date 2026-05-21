"use client";

import { useEffect } from "react";
import { loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";

export function useAboutHeroAnimations(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({ delay: 0.2 });
          const chars = gsap.utils.toArray<HTMLElement>(".ab-hero-char");

          tl.fromTo(
            chars,
            { yPercent: 115, opacity: 0, rotateZ: 4 },
            {
              yPercent: 0,
              opacity: 1,
              rotateZ: 0,
              duration: 1.15,
              stagger: { each: 0.018 },
              ease: "expo.out",
            },
            0
          );
          tl.fromTo(
            ".ab-hero-eyebrow",
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            0.1
          );
          tl.fromTo(
            ".ab-hero-fade",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.95, stagger: 0.1, ease: "power3.out" },
            0.7
          );
          tl.fromTo(
            ".ab-hero-stat",
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              stagger: 0.08,
              ease: "expo.out",
            },
            0.95
          );
          tl.fromTo(
            ".ab-hero-frame",
            { scaleX: 0 },
            { scaleX: 1, duration: 1.4, ease: "expo.inOut" },
            0.35
          );
          tl.fromTo(
            ".ab-hero-scrollcue",
            { opacity: 0 },
            { opacity: 1, duration: 0.8, ease: "power2.out" },
            1.3
          );

          gsap.to(".ab-hero-media-inner", {
            yPercent: 25,
            scale: 1.14,
            ease: "none",
            scrollTrigger: {
              trigger: ".ab-hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          });

          gsap.to(".ab-hero-overlay", {
            opacity: 1.4,
            ease: "none",
            scrollTrigger: {
              trigger: ".ab-hero",
              start: "top top",
              end: "bottom top",
              scrub: 1.0,
            },
          });

          gsap.to(".ab-hero-content", {
            yPercent: -22,
            ease: "none",
            scrollTrigger: {
              trigger: ".ab-hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });

          gsap.to(".ab-hero-content", {
            opacity: 0,
            filter: "blur(8px)",
            ease: "none",
            scrollTrigger: {
              trigger: ".ab-hero",
              start: "20% top",
              end: "bottom 30%",
              scrub: 1.0,
            },
          });

          gsap.utils.toArray<HTMLElement>(".ab-hero-stat-num").forEach((el) => {
            const text = el.textContent ?? "";
            const match = text.match(/(\d+)/);
            if (!match) return;
            const target = parseInt(match[1], 10);
            const suffix = text.replace(match[1], "");
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              delay: 1.1,
              ease: "expo.out",
              onUpdate: () => {
                el.textContent = `${Math.round(obj.v)}${suffix}`;
              },
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
  }, [enabled]);
}
