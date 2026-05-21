"use client";

import { useEffect, type ReactNode } from "react";
import { loadGsap, loadGsapWithScrollTrigger, runAfterInteractive } from "@/lib/animation/loaders";

const HERO_VIDEO_SRC = "/videos/her-section-land.mp4";

/**
 * Attaches GSAP intro, scroll fades, deferred hero video, and terminal tilt.
 * Children are server-rendered (no hydration cost for hero markup).
 */
export function HeroSectionAnimations({ children }: { children: ReactNode }) {
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>(".hero-section");
    if (!hero) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    let cancelled = false;
    let termRY: ((v: number) => void) | null = null;
    let termRX: ((v: number) => void) | null = null;

    runAfterInteractive(() => {
      void (async () => {
        const terminal = hero.querySelector<HTMLElement>(".hero-terminal");
        const gsap = await loadGsap();
        if (cancelled || !terminal) return;

        termRY = gsap.quickTo(terminal, "rotationY", { duration: 0.7, ease: "power3.out" });
        termRX = gsap.quickTo(terminal, "rotationX", { duration: 0.7, ease: "power3.out" });
        gsap.set(terminal, { transformPerspective: 1400, transformStyle: "preserve-3d" });
      })();
    });

    let moveRaf = 0;
    let lastClientX = 0;
    let lastClientY = 0;

    const onMove = (e: MouseEvent) => {
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      if (moveRaf) return;
      moveRaf = requestAnimationFrame(() => {
        moveRaf = 0;
        const rect = hero.getBoundingClientRect();
        if (lastClientY > rect.bottom || lastClientY < rect.top) return;
        const tx = (lastClientX / window.innerWidth - 0.5) * 2;
        const ty = (lastClientY / window.innerHeight - 0.5) * 2;
        termRY?.(tx * -3);
        termRX?.(ty * 3);
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelled = true;
      if (moveRaf) cancelAnimationFrame(moveRaf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;
        const hero = document.querySelector<HTMLElement>(".hero-section");
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReduced) {
          gsap.set(".hero-char", { yPercent: 0, rotateX: 0 });
          gsap.set(".hero-verb-mask", { yPercent: 0 });
          gsap.set(".hero-desc", { opacity: 1, y: 0 });
          gsap.set(".hero-cta", { opacity: 1, y: 0 });
          gsap.set(".hero-terminal", { opacity: 1, y: 0, scale: 1 });
          gsap.set(".hero-terminal-line", { opacity: 1, x: 0 });
          gsap.set(".hero-scroll-hint", { opacity: 1, y: 0 });
          gsap.set(".hero-content-wrap", { y: 0, opacity: 1, scale: 1 });
          return;
        }

        const ctx = gsap.context(() => {
          const heroTl = gsap.timeline({ delay: 0.1 });

          heroTl.fromTo(
            gsap.utils.toArray(".hero-char"),
            { yPercent: 110, rotateX: -35 },
            {
              yPercent: 0,
              rotateX: 0,
              duration: 0.9,
              stagger: { each: 0.018, from: "start" },
              ease: "power4.out",
            },
            0,
          );
          heroTl.fromTo(
            ".hero-verb-mask",
            { yPercent: 100 },
            { yPercent: 0, duration: 0.85, ease: "power4.out" },
            0.2,
          );
          heroTl.fromTo(
            ".hero-desc",
            { y: 20 },
            { y: 0, duration: 0.8, ease: "power3.out" },
            0.7,
          );
          heroTl.fromTo(
            ".hero-cta",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            0.75,
          );
          heroTl.fromTo(
            ".hero-terminal",
            { opacity: 0, y: 30, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
            0.35,
          );
          heroTl.fromTo(
            ".hero-terminal-line",
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" },
            0.65,
          );
          heroTl.fromTo(
            ".hero-scroll-hint",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            1.5,
          );

          if (hero) {
            gsap.to(".hero-content-wrap", {
              y: -80,
              opacity: 0.4,
              scale: 0.98,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 1.0,
              },
            });
            gsap.to(".hero-scroll-hint", {
              opacity: 0,
              y: 20,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "15% top",
                scrub: 1.0,
              },
            });
          }
        });

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    runAfterInteractive(() => {
      const video = document.querySelector<HTMLVideoElement>(".hero-bg-video");
      if (!video || cancelled) return;
      if (window.matchMedia("(max-width: 768px)").matches) return;

      const source = document.createElement("source");
      source.src = HERO_VIDEO_SRC;
      source.type = "video/mp4";
      video.appendChild(source);

      const onReady = () => {
        video.classList.add("is-ready");
      };
      video.addEventListener("loadeddata", onReady, { once: true });
      video.load();
      void video.play().catch(() => {});
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return <>{children}</>;
}
