//version 3
"use client";

import { useEffect, useRef, useState } from "react";
import type Lenis from "@studio-freight/lenis";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { loadGsapWithScrollTrigger, loadLenisCtor, runAfterInteractive } from "@/lib/animation/loaders";

// ── DATA ──────────────────────────────────────────────────────────────────────

const HERO = {
  eyebrow: "About — Tech Binaries",
  headline1: "We build",
  headline2: "with",
  headlineItalic: "intent.",
  lead:
    "A small team focused on meaningful, high-impact software. We don't chase trends or pad timelines — we ship work we'd put our own name on.",
  stats: [
    { n: "12+", l: "years compounding" },
    { n: "40+", l: "products shipped" },
    { n: "98%", l: "client retention" },
  ],
  videoSrc: "/videos/about/about-hero.mp4",
  videoPoster: "/images/about/about-hero-mobile.jpg",
  mobileImage: "/images/about/about-hero-mobile.jpg",
};

const PILLARS = {
  eyebrow: "What guides us",
  title: "Three lenses,",
  titleAccent: "one focus.",
  lead:
    "Vision, mission, and the principles we hold in tension. Each one informs how we choose work, how we structure teams, and how we know when something is finished.",
  items: [
    {
      n: "01",
      kicker: "Vision",
      image: "/images/about/tlof-card-image0.jpeg",
      head: "Software that earns its keep.",
      body: "Products should prove value over time through calm UX and reliable performance.",
      meta: ["Long-term thinking", "Restraint over reach", "Outcomes over output"],
    },
    {
      n: "02",
      kicker: "Mission",
      image: "/images/about/tlof-card-image1.jpeg",
      head: "Build the thing right, then build the right thing.",
      body: "We combine engineering rigor and product judgment to ship with clear intent.",
      meta: ["Thesis-driven shipping", "Rigor + judgment", "Clarity before code"],
    },
    {
      n: "03",
      kicker: "Principles",
      image: "/images/about/tlof-card-image2.jpeg",
      head: "Five rules we don't break.",
      body: "A few non-negotiables guide every decision, every sprint, and every release.",
      meta: ["Quality is the default", "Best idea wins", "Direct, not diplomatic"],
    },
  ],
};

const CAPABILITIES = {
  eyebrow: "What we do",
  title: "Four practices.",
  titleAccent: "One standard.",
  lead:
    "We don't try to be everything. We're deep in a few disciplines and we keep them sharp by working on real production systems with real consequences.",
  items: [
    {
      n: "01",
      roman: "I",
      head: "Product Engineering",
      shortHead: "Product",
      body: "Web and mobile applications built end-to-end — architecture, implementation, infrastructure, observability. Type-safe by default, instrumented from day one.",
      tags: ["Next.js", "React Native", "Postgres", "tRPC", "Observability"],
      stat: "End-to-end",
      statLabel: "From schema to shipped",
      accent: "#d4c4a8",
      coverSrc: "/images/about/fpos-card-image0.jpeg",
      deliverables: ["Architecture", "Implementation", "Infrastructure", "Monitoring"],
    },
    {
      n: "02",
      roman: "II",
      head: "Web Platforms",
      shortHead: "Platforms",
      body: "Marketing sites, content systems, and storefronts that load fast, rank well, and stay editable by humans without a deploy.",
      tags: ["Headless CMS", "Edge", "SEO", "i18n", "A11y"],
      stat: "<1.2s",
      statLabel: "Median LCP, in production",
      accent: "#b8c4d4",
      coverSrc: "/images/about/fpos-card-image1.jpeg",
      deliverables: ["Headless CMS", "Edge runtime", "SEO foundations", "Author tooling"],
    },
    {
      n: "03",
      roman: "III",
      head: "Growth Systems",
      shortHead: "Growth",
      body: "Analytics, experimentation, lifecycle messaging, and the data plumbing underneath — designed so the metrics you watch are the ones that matter.",
      tags: ["Warehouse", "Experiments", "Lifecycle", "Attribution"],
      stat: "1 source",
      statLabel: "Of truth, always",
      accent: "#c4b8a8",
      coverSrc: "/images/about/fpos-card-image2.jpeg",
      deliverables: ["Warehouse", "Experiments", "Lifecycle flows", "Attribution"],
    },
    {
      n: "04",
      roman: "IV",
      head: "Performance & Optimization",
      shortHead: "Performance",
      body: "Bundle audits, Core Web Vitals work, database tuning, render pipelines. Speed is a feature; we treat it like one.",
      tags: ["CWV", "Bundle audit", "DB tuning", "Caching"],
      stat: "p95",
      statLabel: "Is the only honest metric",
      accent: "#a8b8c4",
      coverSrc: "/images/about/fpos-card-image3.jpeg",
      deliverables: ["CWV audit", "Bundle work", "DB tuning", "Caching strategy"],
    },
  ],
};

const CTA = {
  headline: "Let's build something",
  headlineItalic: "that matters.",
  lead:
    "Tell us what you're working on. We'll tell you, honestly, whether we're the right team for it.",
  cta: "Start a conversation",
  marquee: [
    "Built with intent",
    "Shipped with rigor",
    "Honest engineering",
    "No vanity metrics",
    "Quality is the default",
    "Compound or fade",
  ],
};

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const lenisRef = useRef<Lenis | null>(null);

  // Refs
  const heroRef = useRef<HTMLElement | null>(null);
  const heroMediaRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const capRef = useRef<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCapIndex, setActiveCapIndex] = useState(0);

  // Mobile detection
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // ── LENIS SMOOTH SCROLL ──
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const [LenisCtorUnknown, { gsap, ScrollTrigger }] = await Promise.all([
          loadLenisCtor(),
          loadGsapWithScrollTrigger(),
        ]);
        if (cancelled) return;

        const LenisCtor = LenisCtorUnknown as unknown as new (opts: unknown) => Lenis;
        const lenis = new LenisCtor({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          wheelMultiplier: 1,
          touchMultiplier: 1.4,
          smoothWheel: true,
        });

        lenisRef.current = lenis;
        lenis.on("scroll", () => ScrollTrigger.update());
        const ticker = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);

        cleanup = () => {
          gsap.ticker.remove(ticker);
          lenis.destroy();
          lenisRef.current = null;
        };
      })();
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  // ── HERO INTRO + DEEP PARALLAX ──
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          const tl = gsap.timeline({ delay: 0.2 });
          const chars = gsap.utils.toArray(".ab-hero-char") as HTMLElement[];
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
              scrub: true,
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
              scrub: true,
            },
          });

          (gsap.utils.toArray(".ab-hero-stat-num") as HTMLElement[]).forEach((el) => {
            const text = el.textContent || "";
            const match = text.match(/(\d+)/);
            if (!match) return;
            const target = parseInt(match[1]);
            const suffix = text.replace(match[1], "");
            const obj = { v: 0 };
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              delay: 1.1,
              ease: "expo.out",
              onUpdate: () => {
                el.textContent = Math.round(obj.v) + suffix;
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
  }, []);

  // ── PILLARS ──
  useEffect(() => {
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

          (gsap.utils.toArray(".ab-pillar-card") as HTMLElement[]).forEach((card, idx) => {
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

          const cards = gsap.utils.toArray(".ab-pillar-card") as HTMLElement[];
          const isFinePointer =
            window.matchMedia("(hover: hover) and (pointer: fine)").matches;
          if (!isFinePointer) return;

          cards.forEach((card) => {
            const inner = card.querySelector<HTMLElement>(".ab-pillar-inner");
            if (!inner) return;

            const onMove = (e: MouseEvent) => {
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
              gsap.to(inner, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.85,
                ease: "power3.out",
              });
            };

            card.addEventListener("mousemove", onMove);
            card.addEventListener("mouseleave", onLeave);
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

  // ═════════════════════════════════════════════════════════════════════════
  // ── SECTION 3 — CAPABILITIES (REBUILT)
  //   Concept: pinned stacking-card deck. Each card slides up from below,
  //   the previous card scales/fades back to form a depth stack. Side
  //   panel tracks active state with morphing index, giant numeral that
  //   scrambles between practices, and an arc progress meter.
  // ═════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (isMobile) return; // mobile gets a different layout (no pinning)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap, ScrollTrigger } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          const section = capRef.current;
          if (!section) return;

          const pinEl = section.querySelector<HTMLElement>(".ab-cap-pin");
          if (!pinEl) return;

          const cards = gsap.utils.toArray(".ab-cap-card") as HTMLElement[];
          const total = cards.length;
          if (!total) return;
          const segments = total - 1;

          // Initial state — first card visible, rest below
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

          // Header reveal — pre-pin
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

          // Build the pinned timeline
          // Total scroll distance scales with viewport so pin lock feels stable
          const holdRatio = 0.35; // portion of each segment spent holding the card

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
                // Active index based on progress
                const raw = self.progress * segments;
                const idx = Math.min(total - 1, Math.round(raw));
                setActiveCapIndex(idx);
              },
            },
          });

          // For each transition between card i and i+1
          for (let i = 0; i < segments; i++) {
            const current = cards[i];
            const next = cards[i + 1];
            const segStart = i; // each segment is 1 unit on the timeline
            const transStart = segStart + holdRatio; // hold first, then transition
            const transEnd = segStart + 1;

            // Current card recedes — scales down, fades, blurs, stacks back
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

            // Next card rises into place
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

            // Per-card internal element reveal (tags, stat, etc) on entry
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

          // Animate first card's internal elements on initial pin entry
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

          // Arc progress meter — fills as we move through segments
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

          // Keep plugin referenced for this context lifetime.
          void ScrollTrigger;
        }, capRef);

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, [isMobile]);

  // Mobile fallback animation for capabilities
  useEffect(() => {
    if (!isMobile) return;
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          (gsap.utils.toArray(".ab-cap-mobile-card") as HTMLElement[]).forEach((card) => {
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
  }, [isMobile]);

  // ── CTA ──
  useEffect(() => {
    let cancelled = false;
    let revert: (() => void) | undefined;

    runAfterInteractive(() => {
      void (async () => {
        const { gsap, ScrollTrigger } = await loadGsapWithScrollTrigger();
        if (cancelled) return;

        const ctx = gsap.context(() => {
          const prefersReduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          const narrow = window.matchMedia("(max-width: 900px)").matches;
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
            const firstSet = track.children[0] as HTMLElement | null;
            if (firstSet) {
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

        queueMicrotask(() => ScrollTrigger.refresh());

        revert = () => ctx.revert();
      })();
    });

    return () => {
      cancelled = true;
      revert?.();
    };
  }, []);

  // Refresh ScrollTrigger after fonts load
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    let cancelled = false;
    fonts.ready.then(async () => {
      if (cancelled) return;
      const { ScrollTrigger } = await loadGsapWithScrollTrigger();
      ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9997,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
          opacity: 0.028,
          mixBlendMode: "multiply",
        }}
      />

      <div
        style={{
          background: "#fafaf9",
          color: "#0a0a0a",
          fontFamily: "var(--font-body)",
          overflowX: "hidden",
        }}
      >
        <SiteHeader />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ═══════════════════════════════════════════════════════════════ */}
        <section ref={heroRef} className="ab-hero" aria-labelledby="ab-hero-title">
          <div className="ab-hero-media" ref={heroMediaRef} aria-hidden>
            <div className="ab-hero-media-inner">
              {!isMobile ? (
                <video
                  className="ab-hero-video"
                  src={HERO.videoSrc}
                  poster={HERO.videoPoster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <Image
                  src={HERO.mobileImage}
                  alt=""
                  fill
                  priority
                  sizes="100vw"
                  className="ab-hero-photo"
                />
              )}
            </div>
            <div className="ab-hero-overlay" />
            <div className="ab-hero-vignette" />
          </div>

          <div className="ab-hero-content" ref={heroContentRef}>
            <div className="ab-hero-inner">
              <h1 id="ab-hero-title" className="ab-hero-title">
                <span className="ab-hero-line">
                  {HERO.headline1.split("").map((c, i) => (
                    <span key={`a-${i}`} className="ab-hero-char-wrap">
                      <span className="ab-hero-char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    </span>
                  ))}
                </span>
                <span className="ab-hero-line">
                  {HERO.headline2.split("").map((c, i) => (
                    <span key={`b-${i}`} className="ab-hero-char-wrap">
                      <span className="ab-hero-char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    </span>
                  ))}
                  <span className="ab-hero-char-wrap">
                    <span className="ab-hero-char">{"\u00A0"}</span>
                  </span>
                  <span className="ab-hero-italic">
                    {HERO.headlineItalic.split("").map((c, i) => (
                      <span key={`c-${i}`} className="ab-hero-char-wrap">
                        <span className="ab-hero-char">
                          {c === " " ? "\u00A0" : c}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>

              <div className="ab-hero-bottom">
                <p className="ab-hero-fade ab-hero-lead" style={{ opacity: 0 }}>
                  {HERO.lead}
                </p>

                <div className="ab-hero-stats">
                  {HERO.stats.map((s, i) => (
                    <div key={i} className="ab-hero-stat" style={{ opacity: 0 }}>
                      <span className="ab-hero-stat-num">{s.n}</span>
                      <span className="ab-hero-stat-label">{s.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ab-hero-scrollcue" style={{ opacity: 0 }} aria-hidden>
              <span className="ab-hero-scrollcue-label">Scroll</span>
              <span className="ab-hero-scrollcue-line">
                <span className="ab-hero-scrollcue-dot" />
              </span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — PILLARS
        ═══════════════════════════════════════════════════════════════ */}
        <section className="ab-pillars" aria-labelledby="ab-pillars-title">
          <div className="ab-pillars-bg" aria-hidden>
            <div className="ab-pillars-grid-pattern" />
          </div>

          <div className="ab-pillars-inner">
            <div className="ab-pillars-head">
              <h2 id="ab-pillars-title" className="ab-h2">
                {PILLARS.title}{" "}
                <span className="ab-italic-mute">{PILLARS.titleAccent}</span>
              </h2>
              <p className="ab-h2-lead">{PILLARS.lead}</p>
            </div>

            <div className="ab-pillars-divider" aria-hidden>
              <span className="ab-pillars-divider-line" />
              <span className="ab-pillars-divider-mark">
                <Image
                  src="/images/black-TB.png"
                  alt="TechBinaries logo"
                  width={34}
                  height={34}
                  className="ab-pillars-divider-logo"
                />
              </span>
              <span className="ab-pillars-divider-line" />
            </div>

            <div className="ab-pillars-grid">
              {PILLARS.items.map((item) => (
                <article key={item.n} className="ab-pillar-card">
                  <div className="ab-pillar-inner">
                    <Image
                      src={item.image}
                      alt={item.head}
                      fill
                      className="ab-pillar-image"
                      sizes="(max-width: 1100px) 100vw, 33vw"
                    />
                    <div className="ab-pillar-teaser" aria-hidden>
                      <span className="ab-pillar-teaser-kicker">
                        <span className="ab-pillar-teaser-kicker-num">{item.n}</span>
                        <span className="ab-pillar-teaser-kicker-text">{item.kicker}</span>
                      </span>
                      <span className="ab-pillar-teaser-cta">
                        <span className="ab-pillar-teaser-dot" />
                        Explore
                        <span className="ab-pillar-teaser-arrow" aria-hidden>
                          ↗
                        </span>
                      </span>
                    </div>
                    <div className="ab-pillar-overlay">
                      <div className="ab-pillar-overlay-top">
                        <span className="ab-pillar-num">{item.n}</span>
                        <span className="ab-pillar-kicker">{item.kicker}</span>
                      </div>
                      <h3 className="ab-pillar-overlay-head">{item.head}</h3>
                      <p className="ab-pillar-overlay-body">{item.body}</p>
                      <ul className="ab-pillar-meta">
                        {item.meta?.map((m, i) => (
                          <li key={i} className="ab-pillar-meta-item">
                            <span className="ab-pillar-meta-mark" aria-hidden>
                              ▸
                            </span>
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — CAPABILITIES (REBUILT — pinned stacking deck)
        ═══════════════════════════════════════════════════════════════ */}
        <section ref={capRef} className="ab-cap" aria-labelledby="ab-cap-title">
          {/* The pinned area — now contains the header too */}
          <div className="ab-cap-pin">
            <div className="ab-cap-pin-bg" aria-hidden>
              <div className="ab-cap-grain" />
            </div>

            {/* Header now lives INSIDE pin so it stays visible while pinned */}
            <div className="ab-cap-header">
              <h2 id="ab-cap-title" className="ab-cap-h2">
                {CAPABILITIES.title}{" "}
                <span className="ab-italic-mute">
                  {CAPABILITIES.titleAccent}
                </span>
              </h2>
              <p className="ab-cap-lead">{CAPABILITIES.lead}</p>
            </div>

            <div className="ab-cap-pin-inner">
              {/* LEFT — Index rail */}
              <aside className="ab-cap-rail" aria-hidden>
                <div className="ab-cap-rail-top">
                  <span className="ab-cap-rail-eyebrow">
                    <span className="ab-cap-rail-mark" /> Index
                  </span>
                  <ul className="ab-cap-rail-list">
                    {CAPABILITIES.items.map((item, i) => (
                      <li
                        key={item.n}
                        className={`ab-cap-rail-item ${
                          activeCapIndex === i ? "is-active" : ""
                        } ${activeCapIndex > i ? "is-past" : ""}`}
                      >
                        <span className="ab-cap-rail-num">{item.n}</span>
                        <span className="ab-cap-rail-bar">
                          <span className="ab-cap-rail-bar-fill" />
                        </span>
                        <span className="ab-cap-rail-label">{item.shortHead}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Arc progress meter */}
                <div className="ab-cap-arc">
                  <svg viewBox="0 0 120 120" className="ab-cap-arc-svg">
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      className="ab-cap-arc-track"
                      fill="none"
                      stroke="rgba(10,10,10,0.08)"
                      strokeWidth="1"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="52"
                      className="ab-cap-arc-fill"
                      fill="none"
                      stroke="#0a0a0a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="326.7"
                      strokeDashoffset="326.7"
                      transform="rotate(-90 60 60)"
                    />
                    <text
                      x="60"
                      y="56"
                      textAnchor="middle"
                      className="ab-cap-arc-num"
                    >
                      {String(activeCapIndex + 1).padStart(2, "0")}
                    </text>
                    <text
                      x="60"
                      y="72"
                      textAnchor="middle"
                      className="ab-cap-arc-denom"
                    >
                      / {String(CAPABILITIES.items.length).padStart(2, "0")}
                    </text>
                  </svg>
                </div>
              </aside>

              {/* RIGHT — Stacking card stage */}
              <div className="ab-cap-stage">
                {CAPABILITIES.items.map((item, i) => (
                  <article
                    key={item.n}
                    className="ab-cap-card"
                    data-index={i}
                    style={
                      {
                        "--card-accent": item.accent,
                      } as React.CSSProperties
                    }
                  >
                    <div className="ab-cap-card-layout">
                      <figure className="ab-cap-card-figure">
                        <span className="ab-cap-card-accent-bar" aria-hidden />
                        <div className="ab-cap-card-figure-mask">
                          <Image
                            src={item.coverSrc}
                            alt=""
                            fill
                            sizes="(max-width: 1200px) 100vw, 32vw"
                            className="ab-cap-card-photo"
                            draggable={false}
                          />
                          <span className="ab-cap-card-figure-tone" aria-hidden />
                        </div>
                      </figure>

                      <div className="ab-cap-card-sheet">
                        <header className="ab-cap-card-rail-head">
                          <div className="ab-cap-card-rail-meta">
                            <span className="ab-cap-card-rail-roman">{item.roman}</span>
                            <span className="ab-cap-card-rail-slash" aria-hidden>
                              /
                            </span>
                            <span className="ab-cap-card-rail-practice">
                              Practice {item.n}
                            </span>
                          </div>
                          <div className="ab-cap-card-stat-block">
                            <span className="ab-cap-card-stat">{item.stat}</span>
                            <span className="ab-cap-card-stat-label">
                              {item.statLabel}
                            </span>
                          </div>
                        </header>

                        <span className="ab-cap-card-rule" aria-hidden />

                        <div className="ab-cap-card-body">
                          <h3 className="ab-cap-card-head">{item.head}</h3>
                          <p className="ab-cap-card-copy">{item.body}</p>
                        </div>

                        <div className="ab-cap-card-delivs">
                          {item.deliverables.map((d, di) => (
                            <div key={di} className="ab-cap-card-deliv">
                              <span className="ab-cap-card-deliv-num">
                                {String(di + 1).padStart(2, "0")}
                              </span>
                              <span className="ab-cap-card-deliv-label">{d}</span>
                            </div>
                          ))}
                        </div>

                        <div className="ab-cap-card-tags">
                          {item.tags.map((t, ti) => (
                            <span key={ti} className="ab-cap-card-tag">
                              {t}
                            </span>
                          ))}
                        </div>

                        <footer className="ab-cap-card-footer">
                          <span className="ab-cap-card-footer-mark">●</span>
                          <span className="ab-cap-card-footer-text">
                            {item.shortHead.toUpperCase()} — TECH BINARIES
                          </span>
                          <span className="ab-cap-card-footer-page">
                            {item.n} / 04
                          </span>
                        </footer>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Scroll hint */}
            <div className="ab-cap-scrollhint" aria-hidden>
              <span className="ab-cap-scrollhint-label">
                Scroll to advance
              </span>
              <span className="ab-cap-scrollhint-arrow">↓</span>
            </div>
          </div>

          {/* Mobile fallback — simple stacked cards */}
          <div className="ab-cap-mobile">
            {CAPABILITIES.items.map((item) => (
              <article
                key={item.n}
                className="ab-cap-mobile-card"
                style={
                  {
                    "--card-accent": item.accent,
                  } as React.CSSProperties
                }
              >
                <div className="ab-cap-mobile-figure">
                  <span className="ab-cap-mobile-accent-bar" aria-hidden />
                  <div className="ab-cap-mobile-figure-mask">
                    <Image
                      src={item.coverSrc}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 100vw, 28vw"
                      className="ab-cap-mobile-photo"
                      draggable={false}
                    />
                    <span className="ab-cap-mobile-figure-tone" aria-hidden />
                  </div>
                </div>
                <div className="ab-cap-mobile-sheet">
                  <div className="ab-cap-mobile-top">
                    <span className="ab-cap-mobile-num">{item.n}</span>
                    <span className="ab-cap-mobile-roman">{item.roman}</span>
                  </div>
                  <h3 className="ab-cap-mobile-head">{item.head}</h3>
                  <p className="ab-cap-mobile-body">{item.body}</p>
                  <div className="ab-cap-mobile-stat">
                    <span className="ab-cap-mobile-stat-val">{item.stat}</span>
                    <span className="ab-cap-mobile-stat-lbl">
                      {item.statLabel}
                    </span>
                  </div>
                  <div className="ab-cap-mobile-tags">
                    {item.tags.map((t, ti) => (
                      <span key={ti} className="ab-cap-mobile-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — CTA
        ═══════════════════════════════════════════════════════════════ */}
        <section ref={ctaRef} className="ab-cta" aria-labelledby="ab-cta-title">
          <div className="ab-cta-bg" aria-hidden>
            <div className="ab-cta-orb ab-cta-orb-a" />
            <div className="ab-cta-orb ab-cta-orb-b" />
            <div className="ab-cta-orb ab-cta-orb-c" />
            <div className="ab-cta-grid-pattern" />
            <div className="ab-cta-vignette" />
          </div>

          <span className="ab-cta-frame ab-cta-frame--top" aria-hidden />

          <div className="ab-cta-inner">
            <h2 id="ab-cta-title" className="ab-cta-headline">
              <span className="ab-cta-headline-line">
                {CTA.headline.split("").map((c, i) => (
                  <span key={`h-${i}`} className="ab-cta-char-wrap">
                    <span className="ab-cta-char">
                      {c === " " ? "\u00A0" : c}
                    </span>
                  </span>
                ))}
              </span>
              <span className="ab-cta-headline-line">
                <span className="ab-italic-light">
                  {CTA.headlineItalic.split("").map((c, i) => (
                    <span key={`i-${i}`} className="ab-cta-char-wrap">
                      <span className="ab-cta-char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    </span>
                  ))}
                </span>
              </span>
            </h2>

            <p className="ab-cta-after ab-cta-lead">
              {CTA.lead}
            </p>

            <div className="ab-cta-after ab-cta-actions">
              <a href="/contact" className="ab-cta-button">
                <span className="ab-cta-button-label">{CTA.cta}</span>
                <span className="ab-cta-button-arrow" aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M3.5 9h11M9.5 4l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="ab-cta-button-shine" aria-hidden />
              </a>

              <a href="/work" className="ab-cta-button-ghost">
                <span>See the work</span>
              </a>
            </div>
          </div>

          <span className="ab-cta-frame ab-cta-frame--bottom" aria-hidden />

          <div className="ab-cta-marquee" ref={marqueeRef} aria-hidden>
            <div className="ab-cta-marquee-track">
              {[0, 1].map((set) => (
                <div key={set} className="ab-cta-marquee-set">
                  {CTA.marquee.map((m, i) => (
                    <span key={i} className="ab-cta-marquee-item">
                      <span>{m}</span>
                      <span className="ab-cta-marquee-dot" aria-hidden>
                        ●
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════════════
           DESIGN TOKENS
        ═══════════════════════════════════════════════════════════════ */
        .ab-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.55);
          margin-bottom: 22px;
        }
        .ab-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0a0a0a;
          box-shadow: 0 0 0 3px rgba(10,10,10,0.08);
          animation: ab-pulse-dark 2.4s ease-in-out infinite;
        }
        @keyframes ab-pulse-dark {
          0%, 100% { box-shadow: 0 0 0 3px rgba(10,10,10,0.1); }
          50% { box-shadow: 0 0 0 7px rgba(10,10,10,0.02); }
        }
        .ab-eyebrow--light { color: rgba(255,255,255,0.65); }
        .ab-eyebrow:not(:has(.ab-eyebrow-dot))::before {
          content: "";
          width: 28px;
          height: 1px;
          background: currentColor;
          opacity: 0.6;
        }

        .ab-h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 5.2vw, 72px);
          font-weight: 500;
          letter-spacing: -0.038em;
          line-height: 1.0;
          margin: 0 0 22px;
          max-width: 18ch;
        }
        .ab-italic-mute {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.45);
        }
        .ab-italic-light {
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.82);
        }
        .ab-h2-lead {
          font-size: clamp(15px, 1.15vw, 17px);
          color: rgba(10,10,10,0.62);
          line-height: 1.7;
          margin: 0;
          max-width: 56ch;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 1 — HERO
        ═══════════════════════════════════════════════════════════════ */
        .ab-hero {
          position: relative;
          min-height: 100vh;
          padding: 0 24px;
          background: #0a0a0a;
          color: #fafaf9;
          overflow: hidden;
          isolation: isolate;
          display: flex;
          flex-direction: column;
        }
        .ab-hero-media {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
        }
        .ab-hero-media-inner {
          position: absolute;
          inset: -8% -2% -2% -2%;
          will-change: transform;
          transform-origin: center center;
        }
        .ab-hero-video,
        .ab-hero-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 35%;
        }
        .ab-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 1;
          background:
            linear-gradient(180deg,
              rgba(10,10,10,0.45) 0%,
              rgba(10,10,10,0.55) 50%,
              rgba(10,10,10,0.85) 100%
            ),
            linear-gradient(90deg,
              rgba(10,10,10,0.5) 0%,
              rgba(10,10,10,0.15) 55%,
              rgba(10,10,10,0.05) 100%
            );
        }
        .ab-hero-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 28% 45%,
              rgba(255,255,255,0.05) 0%,
              transparent 70%
            );
          mix-blend-mode: screen;
        }
        .ab-hero-content {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(140px, 18vh, 200px) 0 clamp(80px, 10vh, 120px);
          will-change: transform, opacity, filter;
        }
        .ab-hero-inner {
          max-width: 1320px;
          width: 100%;
          margin: 0 auto;
        }
        .ab-hero-title {
          font-family: var(--font-display);
          font-size: clamp(44px, 8vw, 128px);
          font-weight: 400;
          letter-spacing: -0.05em;
          line-height: 0.92;
          margin: 0 0 clamp(40px, 5vw, 64px);
          color: #fff;
          max-width: 14ch;
          text-shadow: 0 12px 50px rgba(0,0,0,0.4);
        }
        .ab-hero-line {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          padding-bottom: 0.04em;
          overflow: visible;
        }
        .ab-hero-char-wrap {
          display: inline-block;
          overflow: hidden;
          line-height: 1;
          padding-bottom: 0.12em;
        }
        .ab-hero-char {
          display: inline-block;
          will-change: transform, opacity;
        }
        .ab-hero-italic {
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.94);
          display: inline-flex;
          flex-wrap: nowrap;
          white-space: nowrap;
          align-items: baseline;
          padding: 0 0.04em;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.08) 0%,
            rgba(255,255,255,0.02) 100%
          );
          border-radius: 0.12em;
          backdrop-filter: blur(2px);
        }
        .ab-hero-italic .ab-hero-char-wrap {
          overflow: visible;
          padding-inline: 0.02em;
        }
        .ab-hero-bottom {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: end;
          max-width: 1180px;
        }
        .ab-hero-lead {
          font-size: clamp(15px, 1.25vw, 18px);
          line-height: 1.7;
          color: rgba(255,255,255,0.78);
          margin: 0;
          max-width: 52ch;
          text-shadow: 0 6px 22px rgba(0,0,0,0.3);
        }
        .ab-hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2vw, 28px);
          padding: 24px 0;
          border-top: 1px solid rgba(255,255,255,0.14);
          border-bottom: 1px solid rgba(255,255,255,0.14);
        }
        .ab-hero-stat {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .ab-hero-stat-num {
          font-family: var(--font-display);
          font-size: clamp(24px, 2.6vw, 36px);
          font-weight: 500;
          letter-spacing: -0.034em;
          line-height: 1;
          color: #fafaf9;
        }
        .ab-hero-stat-label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .ab-hero-scrollcue {
          position: absolute;
          bottom: clamp(28px, 4vh, 48px);
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          z-index: 3;
        }
        .ab-hero-scrollcue-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .ab-hero-scrollcue-line {
          position: relative;
          width: 1px;
          height: 44px;
          background: rgba(255,255,255,0.18);
          overflow: hidden;
        }
        .ab-hero-scrollcue-dot {
          position: absolute;
          top: -10px;
          left: -1px;
          width: 3px;
          height: 12px;
          background: #fafaf9;
          border-radius: 2px;
          animation: ab-scroll 2.2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }
        @keyframes ab-scroll {
          0% { transform: translateY(0); opacity: 0; }
          25% { opacity: 1; }
          75% { opacity: 1; }
          100% { transform: translateY(54px); opacity: 0; }
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 2 — PILLARS (unchanged)
        ═══════════════════════════════════════════════════════════════ */
        .ab-pillars {
          position: relative;
          padding: clamp(96px, 13vw, 160px) 24px;
          background: #fafaf9;
          border-top: 1px solid rgba(10,10,10,0.06);
          overflow: hidden;
        }
        .ab-pillars-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .ab-pillars-grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(10,10,10,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 100%);
        }
        .ab-pillars-inner {
          position: relative;
          z-index: 1;
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
          min-width: 0;
          box-sizing: border-box;
        }
        .ab-pillars-head {
          text-align: center;
          margin-bottom: clamp(48px, 6vw, 72px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ab-pillars-head .ab-h2 { max-width: 22ch; }
        .ab-pillars-head .ab-h2-lead { text-align: center; max-width: 60ch; }
        .ab-pillars-divider {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: clamp(56px, 7vw, 88px);
          max-width: 1080px;
          margin-left: auto;
          margin-right: auto;
        }
        .ab-pillars-divider-line {
          flex: 1;
          height: 6px;
          position: relative;
          background: transparent;
          overflow: hidden;
          transform-origin: left center;
        }
        .ab-pillars-divider-line::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(10,10,10,0.34);
          clip-path: polygon(0 0, 100% 36%, 100% 64%, 0 100%);
        }
        .ab-pillars-divider-line:last-child {
          transform-origin: right center;
        }
        .ab-pillars-divider-line:last-child::before {
          clip-path: polygon(0 36%, 100% 0, 100% 100%, 0 64%);
        }
        .ab-pillars-divider-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0 2px;
          white-space: nowrap;
        }
        .ab-pillars-divider-logo {
          display: block;
          width: clamp(24px, 2.2vw, 34px);
          height: auto;
          object-fit: contain;
          opacity: 0.92;
        }
        .ab-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: clamp(20px, 2vw, 28px);
          perspective: 1500px;
          width: 100%;
          min-width: 0;
        }
        .ab-pillar-card {
          position: relative;
          will-change: transform, opacity;
          transform-style: preserve-3d;
          border-radius: 20px;
          aspect-ratio: 4 / 5;
          min-height: 460px;
          min-width: 0;
          width: 100%;
          max-width: 100%;
          box-sizing: border-box;
        }
        .ab-pillar-inner {
          position: relative;
          z-index: 1;
          border: 0;
          border-radius: 20px;
          height: 100%;
          width: 100%;
          max-width: 100%;
          min-width: 0;
          overflow: hidden;
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
          transform-style: preserve-3d;
          background: transparent;
        }
        .ab-pillar-card:hover .ab-pillar-inner {
          transform: translateY(0) translateZ(0);
          box-shadow: 0 24px 44px rgba(10,10,10,0.2);
        }
        .ab-pillar-image {
          object-fit: cover;
          object-position: center;
          transform: scale(1);
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-pillar-card:hover .ab-pillar-image {
          transform: scale(1.04);
        }
        .ab-pillar-overlay {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 52%;
          padding: clamp(16px, 2vw, 24px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-width: 0;
          box-sizing: border-box;
          background: linear-gradient(180deg, rgba(10,10,10,0.06) 0%, rgba(10,10,10,0.85) 20%, rgba(10,10,10,0.94) 100%);
          color: #fafaf9;
          transform: translateY(100%);
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-pillar-card:hover .ab-pillar-overlay {
          transform: translateY(0);
        }
        .ab-pillar-teaser {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 14px;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          color: #fafaf9;
          pointer-events: none;
          transition: opacity 0.32s ease;
        }
        .ab-pillar-card:hover .ab-pillar-teaser {
          opacity: 0;
        }
        .ab-pillar-teaser-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid rgba(250,250,249,0.22);
          background: linear-gradient(180deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.56) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.24);
        }
        .ab-pillar-teaser-kicker-num {
          font-family: var(--font-mono);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(250,250,249,0.68);
        }
        .ab-pillar-teaser-kicker-text {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(250,250,249,0.96);
        }
        .ab-pillar-teaser-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          min-height: 34px;
          padding: 0 12px;
          border-radius: 999px;
          border: 1px solid rgba(250,250,249,0.22);
          background: linear-gradient(180deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.56) 100%);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.24);
          font-family: var(--font-mono);
          font-size: 9.5px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(250,250,249,0.92);
          transition: transform 0.35s ease, border-color 0.3s ease;
        }
        .ab-pillar-card:hover .ab-pillar-teaser-cta {
          transform: translateX(3px);
          border-color: rgba(250,250,249,0.4);
        }
        .ab-pillar-teaser-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: rgba(250,250,249,0.9);
          box-shadow: 0 0 0 0 rgba(250,250,249,0.5);
          animation: ab-pillar-dot 1.8s ease-out infinite;
        }
        .ab-pillar-teaser-arrow {
          font-size: 11px;
          line-height: 1;
          transform: translateY(-0.5px);
          color: rgba(250,250,249,0.9);
        }
        @keyframes ab-pillar-dot {
          0% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(250,250,249,0.45); }
          70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(250,250,249,0); }
          100% { transform: scale(0.9); box-shadow: 0 0 0 0 rgba(250,250,249,0); }
        }
        .ab-pillar-overlay-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(250,250,249,0.18);
          min-width: 0;
        }
        .ab-pillar-num {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: rgba(250,250,249,0.72);
        }
        .ab-pillar-kicker {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fafaf9;
          padding: 5px 10px;
          border: 1px solid rgba(250,250,249,0.26);
          border-radius: 6px;
          background: rgba(250,250,249,0.09);
          max-width: 100%;
          box-sizing: border-box;
        }
        .ab-pillar-overlay-head {
          font-family: var(--font-display);
          font-size: clamp(18px, 1.7vw, 24px);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin: 0;
          color: #fafaf9;
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .ab-pillar-overlay-body {
          font-size: 13px;
          line-height: 1.45;
          color: rgba(250,250,249,0.82);
          margin: 0;
          max-width: min(42ch, 100%);
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .ab-pillar-meta {
          margin: auto 0 0;
          padding: 8px 0 0;
          list-style: none;
          border-top: 1px solid rgba(250,250,249,0.16);
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .ab-pillar-meta-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(250,250,249,0.82);
          will-change: opacity, transform;
          min-width: 0;
          overflow-wrap: anywhere;
        }
        .ab-pillar-meta-mark {
          color: rgba(250,250,249,0.6);
          font-size: 9px;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 3 — CAPABILITIES (REBUILT)
           Pinned stacking-card deck w/ rail, arc meter, drifting numeral
        ═══════════════════════════════════════════════════════════════ */
        .ab-cap {
          position: relative;
          background: #f5f5f4;
          border-top: 1px solid rgba(10,10,10,0.06);
          color: #0a0a0a;
        }

        /* Pre-pin header */
        .ab-cap-header {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
          padding: clamp(60px, 9vh, 96px) clamp(24px, 4vw, 64px) clamp(20px, 3vh, 32px);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ab-cap-h2 {
          font-family: var(--font-display);
          font-size: clamp(32px, 4.6vw, 64px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1;
          margin: 0 0 16px;
          max-width: none;
          white-space: nowrap;
        }
        .ab-cap-lead {
          font-size: clamp(14px, 1vw, 16px);
          color: rgba(10,10,10,0.62);
          line-height: 1.6;
          margin: 0;
          max-width: 60ch;
        }

        /* Pinned area */
        .ab-cap-pin {
          position: relative;
          height: 100vh;
          overflow: hidden;
          background: #f5f5f4;
          display: flex;
          flex-direction: column;
        }

        .ab-cap-pin-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .ab-cap-grain {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(10,10,10,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.018) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 20%, transparent 90%);
        }

        .ab-cap-pin-inner {
          position: relative;
          z-index: 2;
          flex: 1;
          min-height: 0;
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          padding: clamp(8px, 1.5vh, 20px) clamp(18px, 3vw, 40px) clamp(56px, 8vh, 80px);
          display: grid;
          grid-template-columns: minmax(170px, 220px) 1fr;
          gap: clamp(20px, 2.4vw, 36px);
          align-items: stretch;
          transform: none;
        }

        /* LEFT RAIL */
        .ab-cap-rail {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8px 0;
        }
        .ab-cap-rail-top {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }
        .ab-cap-rail-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
        }
        .ab-cap-rail-mark {
          width: 6px;
          height: 6px;
          background: #0a0a0a;
          border-radius: 50%;
        }
        .ab-cap-rail-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .ab-cap-rail-item {
          display: grid;
          grid-template-columns: 32px 28px 1fr;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-top: 1px solid rgba(10,10,10,0.08);
          transition:
            color 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            padding-left 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-cap-rail-item:last-child {
          border-bottom: 1px solid rgba(10,10,10,0.08);
        }
        .ab-cap-rail-num {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(10,10,10,0.4);
          transition: color 0.5s ease;
        }
        .ab-cap-rail-bar {
          position: relative;
          width: 28px;
          height: 1px;
          background: rgba(10,10,10,0.18);
          overflow: hidden;
        }
        .ab-cap-rail-bar-fill {
          position: absolute;
          inset: 0;
          background: #0a0a0a;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-cap-rail-label {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 500;
          letter-spacing: -0.014em;
          color: rgba(10,10,10,0.45);
          transition: color 0.5s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-cap-rail-item.is-past .ab-cap-rail-num,
        .ab-cap-rail-item.is-past .ab-cap-rail-label {
          color: rgba(10,10,10,0.32);
        }
        .ab-cap-rail-item.is-past .ab-cap-rail-bar-fill {
          transform: scaleX(1);
          background: rgba(10,10,10,0.5);
        }
        .ab-cap-rail-item.is-active {
          padding-left: 6px;
        }
        .ab-cap-rail-item.is-active .ab-cap-rail-num,
        .ab-cap-rail-item.is-active .ab-cap-rail-label {
          color: #0a0a0a;
        }
        .ab-cap-rail-item.is-active .ab-cap-rail-label {
          font-style: italic;
        }
        .ab-cap-rail-item.is-active .ab-cap-rail-bar-fill {
          transform: scaleX(1);
        }

        /* Arc progress meter */
        .ab-cap-arc {
          width: 120px;
          height: 120px;
          position: relative;
        }
        .ab-cap-arc-svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .ab-cap-arc-num {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          fill: #0a0a0a;
        }
        .ab-cap-arc-denom {
          font-family: var(--font-mono);
          font-size: 9px;
          letter-spacing: 0.12em;
          fill: rgba(10,10,10,0.5);
        }

        /* RIGHT — STAGE w/ stacking cards */
        .ab-cap-stage {
          position: relative;
          height: 100%;
          min-height: 280px;
          padding: 0;
          perspective: 2000px;
        }
        /* Capability slide — editorial (photo strip + typography; no deco sidebar) */
        .ab-cap-card {
          position: absolute;
          inset: 0;
          background: #fafaf9;
          border-radius: 10px;
          border: 1px solid rgba(10,10,10,0.12);
          padding: 0;
          display: block;
          will-change: transform, opacity, filter;
          transform-origin: center bottom;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.92) inset,
            0 28px 64px -40px rgba(10,10,10,0.22);
          overflow: hidden;
          isolation: isolate;
        }
        .ab-cap-card-layout {
          height: 100%;
          display: grid;
          grid-template-columns: minmax(0, 0.94fr) minmax(0, 1.4fr);
          align-items: stretch;
          position: relative;
          z-index: 1;
        }
        .ab-cap-card-figure {
          margin: 0;
          padding: 0;
          position: relative;
          min-height: 0;
          align-self: stretch;
          background: #eae9e8;
        }
        .ab-cap-card-accent-bar {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 5px;
          background: var(--card-accent, #d4c4a8);
          z-index: 3;
          pointer-events: none;
        }
        .ab-cap-card-figure-mask {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .ab-cap-card-photo {
          object-fit: cover;
          filter: saturate(0.88) contrast(1.04);
          transform: scale(1.02);
          transform-origin: center;
        }
        .ab-cap-card-figure-tone {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(125deg,
              color-mix(in srgb, var(--card-accent, #d4c4a8) 28%, transparent) 0%,
              transparent 55%
            ),
            linear-gradient(to top,
              rgba(10,10,10,0.22) 0%,
              transparent 42%
            );
          mix-blend-mode: multiply;
          pointer-events: none;
        }
        .ab-cap-card-sheet {
          padding:
            clamp(22px, 2.8vw, 36px)
            clamp(22px, 3.2vw, 40px)
            clamp(20px, 2.6vw, 32px);
          display: flex;
          flex-direction: column;
          gap: clamp(14px, 1.6vw, 18px);
          min-width: 0;
          justify-content: space-between;
        }
        .ab-cap-card-rail-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }
        .ab-cap-card-rail-meta {
          display: flex;
          align-items: baseline;
          gap: 10px;
          flex-wrap: wrap;
        }
        .ab-cap-card-rail-roman {
          font-family: var(--font-display);
          font-size: clamp(26px, 2.75vw, 40px);
          font-weight: 400;
          font-style: italic;
          letter-spacing: -0.04em;
          line-height: 1;
          color: #0a0a0a;
        }
        .ab-cap-card-rail-slash {
          font-family: var(--font-mono);
          font-size: 14px;
          font-weight: 500;
          color: rgba(10,10,10,0.28);
          line-height: 1;
          transform: translateY(-2px);
        }
        .ab-cap-card-rail-practice {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.48);
          line-height: 1;
        }
        .ab-cap-card-stat-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
          padding-left: 16px;
          border-left: 1px solid rgba(10,10,10,0.14);
          will-change: opacity, transform;
        }
        .ab-cap-card-stat {
          font-family: var(--font-display);
          font-size: clamp(20px, 2vw, 28px);
          font-weight: 500;
          font-style: italic;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #0a0a0a;
        }
        .ab-cap-card-stat-label {
          font-family: var(--font-mono);
          font-size: 8.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.48);
          text-align: right;
          line-height: 1.45;
          max-width: 20ch;
        }
        .ab-cap-card-rule {
          display: block;
          height: 1px;
          background: linear-gradient(
            90deg,
            rgba(10,10,10,0.19) 0%,
            rgba(10,10,10,0.07) 70%,
            transparent 100%
          );
          will-change: opacity, transform;
          flex-shrink: 0;
        }
        .ab-cap-card-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex-shrink: 0;
        }
        .ab-cap-card-head {
          font-family: var(--font-display);
          font-size: clamp(24px, 2.85vw, 38px);
          font-weight: 500;
          letter-spacing: -0.038em;
          line-height: 1.04;
          margin: 0;
          color: #0a0a0a;
          max-width: 18ch;
        }
        .ab-cap-card-copy {
          font-size: clamp(12.5px, 0.92vw, 14.5px);
          line-height: 1.6;
          color: rgba(10,10,10,0.62);
          margin: 0;
          max-width: 56ch;
        }
        .ab-cap-card-delivs {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px 16px;
          padding: clamp(12px, 1.35vw, 16px) 0;
          border-top: 1px solid rgba(10,10,10,0.1);
          border-bottom: 1px solid rgba(10,10,10,0.1);
        }
        .ab-cap-card-deliv {
          display: flex;
          flex-direction: column;
          gap: 6px;
          will-change: opacity, transform;
          min-width: 0;
        }
        .ab-cap-card-deliv-num {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(10,10,10,0.38);
        }
        .ab-cap-card-deliv-label {
          font-family: var(--font-display);
          font-size: clamp(11px, 0.92vw, 12.5px);
          font-weight: 500;
          letter-spacing: -0.012em;
          line-height: 1.35;
          color: #0a0a0a;
        }
        .ab-cap-card-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0;
          align-items: baseline;
          row-gap: 4px;
        }
        .ab-cap-card-tags .ab-cap-card-tag:not(:first-child)::before {
          content: "·";
          margin: 0 8px;
          color: rgba(10,10,10,0.28);
          font-weight: 500;
          font-size: 12px;
        }
        .ab-cap-card-tag {
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.58);
          will-change: opacity, transform;
          border: none;
          border-radius: 0;
          background: transparent;
          padding: 0;
        }
        .ab-cap-card-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 12px;
          padding-top: 6px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.42);
          flex-shrink: 0;
        }
        .ab-cap-card-footer-mark {
          font-size: 6px;
          color: rgba(10,10,10,0.5);
        }
        .ab-cap-card-footer-text {
          flex: 1;
          min-width: 0;
        }
        .ab-cap-card-footer-page {
          color: #0a0a0a;
          font-weight: 600;
        }

        /* Scroll hint */
        .ab-cap-scrollhint {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 3;
          padding: 8px 14px;
          background: rgba(255,255,255,0.6);
          border: 1px solid rgba(10,10,10,0.08);
          border-radius: 999px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.55);
          pointer-events: none;
        }
        .ab-cap-scrollhint-arrow {
          font-size: 12px;
          animation: ab-cap-arrow 1.8s ease-in-out infinite;
        }
        @keyframes ab-cap-arrow {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(3px); opacity: 0.5; }
        }

        /* Mobile fallback */
        .ab-cap-mobile {
          display: none;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 4 — CTA
        ═══════════════════════════════════════════════════════════════ */
        .ab-cta {
          position: relative;
          padding: clamp(120px, 16vw, 200px) 24px clamp(80px, 10vw, 140px);
          background: #0a0a0a;
          color: #fafaf9;
          overflow: hidden;
          isolation: isolate;
        }
        /* Hidden until GSAP reveal on wider viewports only; mobile stays visible (no ScrollTrigger fade). */
        @media (min-width: 901px) {
          .ab-cta .ab-cta-after {
            opacity: 0;
          }
        }
        .ab-cta-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .ab-cta-orb {
          position: absolute;
          width: 60vw;
          height: 60vw;
          max-width: 760px;
          max-height: 760px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.55;
          will-change: transform;
        }
        .ab-cta-orb-a {
          top: -12%;
          left: -10%;
          background: radial-gradient(circle,
            rgba(120,140,180,0.35) 0%,
            rgba(70,80,110,0.15) 50%,
            transparent 70%
          );
        }
        .ab-cta-orb-b {
          bottom: -18%;
          right: -10%;
          background: radial-gradient(circle,
            rgba(180,160,140,0.32) 0%,
            rgba(110,90,70,0.12) 50%,
            transparent 70%
          );
        }
        .ab-cta-orb-c {
          top: 30%;
          left: 40%;
          width: 40vw;
          height: 40vw;
          max-width: 540px;
          max-height: 540px;
          opacity: 0.4;
          background: radial-gradient(circle,
            rgba(140,120,180,0.22) 0%,
            transparent 65%
          );
        }
        .ab-cta-grid-pattern {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 100% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 100% at 50% 50%, black 30%, transparent 100%);
        }
        .ab-cta-vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 90% 70% at 50% 50%,
              transparent 30%,
              rgba(10,10,10,0.4) 100%
            );
        }
        .ab-cta-frame {
          display: none;
        }
        .ab-cta-inner {
          position: relative;
          z-index: 2;
          max-width: 1080px;
          margin: 0 auto;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          will-change: transform, opacity;
        }
        .ab-cta-headline {
          font-family: var(--font-display);
          font-size: clamp(44px, 7.4vw, 112px);
          font-weight: 400;
          letter-spacing: -0.046em;
          line-height: 1;
          margin: 0 0 clamp(28px, 3.5vw, 44px);
          color: #fff;
          max-width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.04em;
          will-change: transform;
        }
        .ab-cta-headline-line {
          display: inline-flex;
          flex-wrap: nowrap;
          justify-content: center;
          align-items: baseline;
          white-space: nowrap;
          padding-bottom: 0.04em;
          overflow: visible;
        }
        .ab-cta-char-wrap {
          display: inline-block;
          overflow: hidden;
          line-height: 1;
          padding-bottom: 0.14em;
        }
        .ab-cta-char {
          display: inline-block;
          will-change: transform, opacity;
        }
        .ab-cta-headline .ab-italic-light {
          display: inline-flex;
          align-items: baseline;
          flex-wrap: nowrap;
          white-space: nowrap;
          padding: 0 0.04em;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.1) 0%,
            rgba(255,255,255,0.03) 100%
          );
          border-radius: 0.1em;
        }
        .ab-cta-headline .ab-italic-light .ab-cta-char-wrap {
          overflow: visible;
          padding-bottom: 0.08em;
        }
        .ab-cta-headline .ab-italic-light .ab-cta-char {
          line-height: 1.08;
          text-shadow: 0 0 10px rgba(255,255,255,0.08);
        }
        .ab-cta-lead {
          font-size: clamp(15px, 1.2vw, 18px);
          line-height: 1.7;
          color: rgba(255,255,255,0.66);
          margin: 0 0 clamp(36px, 5vw, 56px);
          max-width: 56ch;
        }
        .ab-cta-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .ab-cta-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          padding: 18px 28px;
          background: #fafaf9;
          color: #0a0a0a;
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.012em;
          border-radius: 999px;
          text-decoration: none;
          overflow: hidden;
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.4s ease;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.5) inset,
            0 16px 40px -16px rgba(0,0,0,0.5);
        }
        .ab-cta-button:hover {
          transform: scale(1.05);
          background: #ffffff;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.7) inset,
            0 26px 52px -16px rgba(0,0,0,0.6);
        }
        .ab-cta-button-label,
        .ab-cta-button-arrow {
          position: relative;
          z-index: 1;
        }
        .ab-cta-button-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #0a0a0a;
          color: #fafaf9;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-cta-button:hover .ab-cta-button-arrow {
          transform: translateX(4px) rotate(-2deg);
        }
        .ab-cta-button-shine {
          position: absolute;
          inset: 0;
          z-index: 0;
          background: linear-gradient(110deg,
            transparent 30%,
            rgba(10,10,10,0.06) 50%,
            transparent 70%
          );
          transform: translateX(-100%);
          transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-cta-button:hover .ab-cta-button-shine {
          transform: translateX(100%);
        }
        .ab-cta-button-ghost {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 18px 24px;
          color: rgba(255,255,255,0.7);
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.012em;
          text-decoration: none;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.04);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition:
            color 0.4s ease,
            background 0.4s ease,
            border-color 0.4s ease,
            transform 0.4s ease;
        }
        .ab-cta-button-ghost:hover {
          color: #fafaf9;
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.32);
          transform: translateY(-1px);
        }
        .ab-cta-marquee {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          height: 56px;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.3);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        .ab-cta-marquee-track {
          display: flex;
          will-change: transform;
        }
        .ab-cta-marquee-set {
          display: flex;
          flex-shrink: 0;
        }
        .ab-cta-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 22px;
          padding: 0 22px;
          font-family: var(--font-display);
          font-size: clamp(13px, 1.2vw, 16px);
          font-weight: 500;
          font-style: italic;
          letter-spacing: -0.014em;
          color: rgba(255,255,255,0.78);
          white-space: nowrap;
        }
        .ab-cta-marquee-dot {
          font-size: 5px;
          color: rgba(255,255,255,0.35);
          line-height: 1;
        }

        /* ═══════════════════════════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════════════════════════ */
        @media (max-width: 1920px) and (min-width: 901px) {
          .ab-hero-video {
            transform: scale(1.12);
            transform-origin: 42% 34%;
            will-change: transform;
          }
        }

        @media (max-width: 1280px) and (min-width: 901px) {
          .ab-hero-video {
            transform: scale(1.17);
            transform-origin: 40% 32%;
          }
        }

        @media (max-width: 1200px) {
          .ab-cap-pin-inner {
            grid-template-columns: minmax(180px, 220px) 1fr;
            gap: 32px;
          }
          .ab-cap-card-layout {
            grid-template-columns: 1fr;
          }
          .ab-cap-card-figure {
            aspect-ratio: 16 / 11;
            max-height: 260px;
          }
          .ab-cap-card-sheet {
            flex: 1;
            min-height: 0;
          }
          .ab-cap-card-delivs {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 1100px) {
          .ab-pillars-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }
          .ab-pillar-card { min-height: 520px; }
          .ab-pillar-overlay {
            transform: translateY(0);
            height: 56%;
          }
          .ab-pillar-teaser { display: none; }
          .ab-pillars {
            overflow: visible;
          }
        }

        /* Mobile — capabilities: show section header + flat stacked cards (pin deck hidden) */
        @media (max-width: 900px) {
          .ab-cap-pin {
            display: flex;
            flex-direction: column;
            height: auto !important;
            min-height: 0 !important;
            overflow: visible;
          }
          .ab-cap-pin-bg,
          .ab-cap-pin-inner,
          .ab-cap-scrollhint {
            display: none !important;
          }
          .ab-cap-header {
            padding: clamp(48px, 10vw, 72px) 16px clamp(28px, 6vw, 40px);
          }
          .ab-cap-mobile {
            display: flex;
            flex-direction: column;
            gap: 16px;
            max-width: 720px;
            margin: 0 auto;
            padding: 0 16px clamp(80px, 12vw, 120px);
          }
          .ab-cap-mobile-card {
            position: relative;
            background: #fafaf9;
            border-radius: 12px;
            padding: 0;
            display: flex;
            flex-direction: column;
            gap: 0;
            border: 1px solid rgba(10,10,10,0.12);
            box-shadow:
              0 1px 0 rgba(255,255,255,0.9) inset,
              0 20px 46px -34px rgba(10,10,10,0.2);
            overflow: hidden;
            will-change: opacity, transform;
          }
          .ab-cap-mobile-figure {
            position: relative;
            width: 100%;
            aspect-ratio: 16 / 10;
            background: #eae9e8;
            flex-shrink: 0;
          }
          .ab-cap-mobile-accent-bar {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            width: 5px;
            background: var(--card-accent, #d4c4a8);
            z-index: 3;
            pointer-events: none;
          }
          .ab-cap-mobile-figure-mask {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }
          .ab-cap-mobile-photo {
            object-fit: cover;
            filter: saturate(0.88) contrast(1.04);
          }
          .ab-cap-mobile-figure-tone {
            position: absolute;
            inset: 0;
            background:
              linear-gradient(125deg,
                color-mix(in srgb, var(--card-accent, #d4c4a8) 26%, transparent) 0%,
                transparent 55%
              ),
              linear-gradient(to top,
                rgba(10,10,10,0.14) 0%,
                transparent 45%
              );
            mix-blend-mode: multiply;
            pointer-events: none;
          }
          .ab-cap-mobile-sheet {
            padding: 22px 22px 24px;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
          .ab-cap-mobile-top {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
          }
          .ab-cap-mobile-num {
            font-family: var(--font-mono);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.16em;
            color: rgba(10,10,10,0.55);
          }
          .ab-cap-mobile-roman {
            font-family: var(--font-display);
            font-size: 32px;
            font-weight: 400;
            font-style: italic;
            letter-spacing: -0.04em;
            color: #0a0a0a;
            line-height: 1;
          }
          .ab-cap-mobile-head {
            font-family: var(--font-display);
            font-size: clamp(22px, 6vw, 28px);
            font-weight: 500;
            letter-spacing: -0.028em;
            line-height: 1.1;
            margin: 0;
            color: #0a0a0a;
            position: relative;
          }
          .ab-cap-mobile-body {
            font-size: 14px;
            line-height: 1.6;
            color: rgba(10,10,10,0.62);
            margin: 0;
            position: relative;
          }
          .ab-cap-mobile-stat {
            display: flex;
            align-items: baseline;
            gap: 12px;
            padding: 12px 0;
            border-top: 1px solid rgba(10,10,10,0.1);
            border-bottom: 1px solid rgba(10,10,10,0.1);
            position: relative;
          }
          .ab-cap-mobile-stat-val {
            font-family: var(--font-display);
            font-size: 22px;
            font-weight: 500;
            font-style: italic;
            letter-spacing: -0.02em;
            color: #0a0a0a;
          }
          .ab-cap-mobile-stat-lbl {
            font-family: var(--font-mono);
            font-size: 10px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: rgba(10,10,10,0.5);
          }
          .ab-cap-mobile-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 0;
            align-items: baseline;
          }
          .ab-cap-mobile-tags .ab-cap-mobile-tag:not(:first-child)::before {
            content: "·";
            margin: 0 7px;
            color: rgba(10,10,10,0.26);
            font-weight: 600;
          }
          .ab-cap-mobile-tag {
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: rgba(10,10,10,0.58);
            padding: 0;
            border: none;
            background: transparent;
          }
        }

        @media (max-width: 768px) {
          .ab-hero {
            padding: 0 16px;
            min-height: 100svh;
          }
          .ab-hero-content {
            padding: clamp(120px, 22svh, 160px) 0 90px;
          }
          .ab-hero-title {
            font-size: clamp(38px, 11vw, 64px);
            line-height: 0.98;
            margin-bottom: 32px;
          }
          .ab-hero-bottom { grid-template-columns: 1fr; gap: 28px; }
          .ab-hero-lead { font-size: 14.5px; line-height: 1.65; }
          .ab-hero-stats { padding: 18px 0; gap: 12px; }
          .ab-hero-stat-num { font-size: 22px; }
          .ab-hero-stat-label { font-size: 9.5px; }
          .ab-hero-scrollcue { display: none; }

          .ab-pillars,
          .ab-cta {
            padding-left: 16px;
            padding-right: 16px;
          }
          .ab-pillar-kicker {
            letter-spacing: 0.12em;
            font-size: 9px;
          }
          .ab-h2 { font-size: clamp(30px, 8.5vw, 48px); }
          .ab-h2-lead { font-size: 14.5px; line-height: 1.65; }
          .ab-cap-h2 { font-size: clamp(30px, 9vw, 48px); }
          .ab-cap-h2 { white-space: normal; }
          .ab-cap-lead { font-size: 14.5px; }
          .ab-cap-header { padding-inline: 16px; }

          .ab-pillars-divider-logo { width: 22px; }
          .ab-pillar-overlay { padding: 16px; }
          .ab-pillar-overlay-head { font-size: 19px; }
          .ab-pillar-overlay-body { font-size: 12.5px; }

          .ab-cta { padding-bottom: 90px; }
          .ab-cta-headline { font-size: clamp(28px, 9.6vw, 56px); }
          .ab-cta-lead { font-size: 14.5px; }
          .ab-cta-actions { flex-direction: column; width: 100%; max-width: 320px; }
          .ab-cta-button,
          .ab-cta-button-ghost { width: 100%; justify-content: center; padding: 16px 22px; font-size: 14px; }
          .ab-cta-marquee { height: 48px; }
          .ab-cta-marquee-item { font-size: 13px; padding: 0 16px; gap: 16px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ab-hero-scrollcue-dot,
          .ab-eyebrow-dot,
          .ab-pillar-teaser-dot { animation: none; }
          .ab-hero-media-inner,
          .ab-hero-content,
          .ab-cap-bignum,
          .ab-cap-bg-label,
          .ab-pillar-image,
          .ab-cta-headline { transform: none !important; }
          .ab-cta-orb { animation: none; transform: none !important; }
          .ab-cta-marquee-track { transform: none !important; }
          .ab-pillar-card:hover .ab-pillar-inner { transform: none; }
          .ab-cta-button:hover { transform: none; }
          .ab-cap-card { position: relative !important; opacity: 1 !important; transform: none !important; filter: none !important; margin-bottom: 16px; }
          .ab-cap-pin { height: auto !important; }
        }
      `}</style>
    </>
  );
}