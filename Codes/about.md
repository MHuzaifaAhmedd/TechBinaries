"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────────

const HERO = {
  eyebrow: "About — Tech Binaries",
  headline1: "We build",
  headline2: "with",
  headlineItalic: "intent.",
  lead:
    "A small team focused on meaningful, high-impact software. We don't chase trends or pad timelines — we ship work we'd put our own name on.",
  // Stats that sit beneath the headline — data-driven proof points
  stats: [
    { n: "12+", l: "years compounding" },
    { n: "40+", l: "products shipped" },
    { n: "98%", l: "client retention" },
  ],
  videoSrc: "/videos/about/about-hero.mp4",
  videoPoster: "/images/about/about-hero-poster.jpg",
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
      head: "Software that earns its keep.",
      body: "We see a future where digital products are measured by the value they create — not the surface they cover. Calm interfaces. Honest performance. Things that age well.",
      meta: ["Long-term thinking", "Restraint over reach", "Outcomes, not output"],
    },
    {
      n: "02",
      kicker: "Mission",
      head: "Build the thing right, then build the right thing.",
      body: "We pair engineering rigor with product judgment. Every release ships behind a clear thesis. If we can't explain why it matters in one sentence, it isn't ready.",
      meta: ["Thesis-driven shipping", "Rigor + judgment", "Clarity before code"],
    },
    {
      n: "03",
      kicker: "Principles",
      head: "Five rules we don't break.",
      body: "Quality is the default. Solve, don't close. Best idea wins. Compound or fade. Direct, not diplomatic. Posters on a wall don't ship — these do.",
      list: [
        "Quality is the default",
        "Solve, don't close",
        "Best idea wins",
        "Compound or fade",
        "Direct, not diplomatic",
      ],
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
      n: "I",
      head: "Product Engineering",
      body: "Web and mobile applications built end-to-end — architecture, implementation, infrastructure, observability. Type-safe by default.",
      tags: ["Next.js", "React Native", "Postgres", "tRPC", "Observability"],
      stat: "End-to-end",
      statLabel: "From schema to shipped",
    },
    {
      n: "II",
      head: "Web Platforms",
      body: "Marketing sites, content systems, and storefronts that load fast, rank well, and stay editable by humans without a deploy.",
      tags: ["Headless CMS", "Edge", "SEO", "i18n", "A11y"],
      stat: "<1.2s",
      statLabel: "Median LCP",
    },
    {
      n: "III",
      head: "Growth Systems",
      body: "Analytics, experimentation, lifecycle messaging, and the data plumbing underneath — designed so the metrics you watch are the ones that matter.",
      tags: ["Warehouse", "Experiments", "Lifecycle", "Attribution"],
      stat: "1 source",
      statLabel: "Of truth, always",
    },
    {
      n: "IV",
      head: "Performance & Optimization",
      body: "Bundle audits, Core Web Vitals work, database tuning, render pipelines. Speed is a feature; we treat it like one.",
      tags: ["CWV", "Bundle audit", "DB tuning", "Caching"],
      stat: "p95",
      statLabel: "Is the only honest metric",
    },
  ],
};

const CTA = {
  eyebrow: "Start the conversation",
  headline: "Let's build something",
  headlineItalic: "that matters.",
  lead:
    "Tell us what you're working on. We'll tell you, honestly, whether we're the right team for it.",
  cta: "Start a conversation",
  // Marquee phrases under the CTA — sets tone, fills the closing moment
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
  const [isMobile, setIsMobile] = useState(false);

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

    const lenis = new Lenis({
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
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── HERO INTRO + DEEP PARALLAX ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Multi-layer character reveal
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

      // 2. PARALLAX — 3 layers move at different speeds
      // Background video: slow drift + scale up
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

      // Mid-layer (overlay tint deepens as we exit)
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

      // Foreground content: faster upward, then blur exit
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

      // Number counter on hero stats
      gsap.utils.toArray<HTMLElement>(".ab-hero-stat-num").forEach((el) => {
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
    return () => ctx.revert();
  }, []);

  // ── SECTION 2 — PILLARS: PINNED HORIZONTAL FEEL + RICH REVEAL ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
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

      // Decorative sweeping line under header
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

      // Cards reveal — each card animates: lift in + numeral counts up + meta cascades
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
          card.querySelectorAll(".ab-pillar-num-big"),
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.9, ease: "expo.out" },
          "-=0.85"
        );
        tl.fromTo(
          card.querySelectorAll(".ab-pillar-meta-item, .ab-pillar-list li"),
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

      // Parallax — numeral background slides at different speed than card body
      gsap.utils.toArray<HTMLElement>(".ab-pillar-card").forEach((card) => {
        const numeral = card.querySelector(".ab-pillar-num-big");
        if (!numeral) return;
        gsap.to(numeral, {
          yPercent: -30,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // 3D tilt — desktop only
      const cards = gsap.utils.toArray<HTMLElement>(".ab-pillar-card");
      const isFinePointer =
        window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (!isFinePointer) return;

      cards.forEach((card) => {
        const inner = card.querySelector<HTMLElement>(".ab-pillar-inner");
        const sheen = card.querySelector<HTMLElement>(".ab-pillar-sheen");
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
          if (sheen) {
            sheen.style.setProperty("--sx", `${(x + 0.5) * 100}%`);
            sheen.style.setProperty("--sy", `${(y + 0.5) * 100}%`);
          }
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
    return () => ctx.revert();
  }, []);

  // ── SECTION 3 — CAPABILITIES: PINNED REVEAL + ACTIVE TRACKER ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left text reveal
      gsap.fromTo(
        ".ab-cap-left > *",
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.95,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ".ab-cap-grid",
            start: "top 80%",
            once: true,
          },
        }
      );

      // Each cap item reveals individually, with kicker number scaling in
      gsap.utils.toArray<HTMLElement>(".ab-cap-item").forEach((item, idx) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
            once: true,
          },
        });
        tl.fromTo(
          item,
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "expo.out",
            delay: idx * 0.08,
          }
        );
        tl.fromTo(
          item.querySelectorAll(".ab-cap-num"),
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
          "-=0.6"
        );
        tl.fromTo(
          item.querySelectorAll(".ab-cap-tag"),
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.5"
        );
        tl.fromTo(
          item.querySelectorAll(".ab-cap-stat-block"),
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.6, ease: "expo.out" },
          "-=0.6"
        );
      });

      // Vertical progress fill
      gsap.fromTo(
        ".ab-cap-progress-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".ab-cap",
            start: "top 60%",
            end: "bottom 70%",
            scrub: true,
          },
        }
      );

      // Section label parallax
      gsap.to(".ab-cap-section-label", {
        yPercent: -40,
        ease: "none",
        scrollTrigger: {
          trigger: ".ab-cap",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Active item tracker — highlight whichever item is centered
      const items = gsap.utils.toArray<HTMLElement>(".ab-cap-item");
      items.forEach((item, i) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          onToggle: (self) => {
            item.dataset.active = self.isActive ? "true" : "false";
            const label = document.querySelector<HTMLElement>(
              ".ab-cap-active-label"
            );
            const num = document.querySelector<HTMLElement>(
              ".ab-cap-active-num"
            );
            if (self.isActive) {
              if (label)
                label.textContent = CAPABILITIES.items[i].head.toUpperCase();
              if (num)
                num.textContent = String(i + 1).padStart(2, "0");
            }
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // ── SECTION 4 — CTA: SCALE-IN, ORB DRIFT, HEADLINE PARALLAX, MARQUEE ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Eyebrow + frame reveal
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

      // Whole inner block fades + scales in
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
            start: "top 75%",
            once: true,
          },
        }
      );

      // Headline characters cascade
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
            start: "top 80%",
            once: true,
          },
        }
      );

      // Lead + button cascade
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
            start: "top 70%",
            once: true,
          },
          delay: 0.4,
        }
      );

      // Drifting gradient orbs
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

      // Headline parallax — moves slower than scroll
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

      // Background grid drift
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

      // Marquee — infinite horizontal scroll
      const track = marqueeRef.current?.querySelector<HTMLElement>(
        ".ab-cta-marquee-track"
      );
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
    return () => ctx.revert();
  }, []);

  // Refresh ScrollTrigger after fonts load
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      {/* Subtle grain */}
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
            SECTION 1 — HERO (Cinematic + multi-layer parallax + counters)
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

          {/* Decorative corner frames */}
          <div className="ab-hero-frames" aria-hidden>
            <span className="ab-hero-frame ab-hero-frame--top" />
            <span className="ab-hero-frame ab-hero-frame--bottom" />
          </div>

          <div className="ab-hero-content" ref={heroContentRef}>
            <div className="ab-hero-inner">
              <div className="ab-hero-eyebrow-row">
                <span className="ab-hero-eyebrow" style={{ opacity: 0 }}>
                  <span className="ab-hero-eyebrow-dot" aria-hidden />
                  {HERO.eyebrow}
                </span>
                <span className="ab-hero-coords" style={{ opacity: 0 }}>
                  N 24.86° / E 67.00°
                </span>
              </div>

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
            SECTION 2 — PILLARS (Editorial cards w/ parallax numerals,
            metadata cascades, sheen, 3D tilt)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="ab-pillars" aria-labelledby="ab-pillars-title">
          <div className="ab-pillars-bg" aria-hidden>
            <div className="ab-pillars-grid-pattern" />
          </div>

          <div className="ab-pillars-inner">
            <div className="ab-pillars-head">
              <span className="ab-eyebrow">{PILLARS.eyebrow}</span>
              <h2 id="ab-pillars-title" className="ab-h2">
                {PILLARS.title}{" "}
                <span className="ab-italic-mute">{PILLARS.titleAccent}</span>
              </h2>
              <p className="ab-h2-lead">{PILLARS.lead}</p>
            </div>

            <div className="ab-pillars-divider" aria-hidden>
              <span className="ab-pillars-divider-line" />
              <span className="ab-pillars-divider-mark">§ 01 — 03</span>
              <span className="ab-pillars-divider-line" />
            </div>

            <div className="ab-pillars-grid">
              {PILLARS.items.map((item) => (
                <article key={item.n} className="ab-pillar-card">
                  {/* Massive numeral that parallax-drifts inside the card */}
                  <span className="ab-pillar-num-big" aria-hidden>
                    {item.n}
                  </span>
                  <span className="ab-pillar-sheen" aria-hidden />

                  <div className="ab-pillar-inner">
                    <div className="ab-pillar-top">
                      <span className="ab-pillar-num">{item.n}</span>
                      <span className="ab-pillar-kicker">
                        <span className="ab-pillar-kicker-dot" aria-hidden />
                        {item.kicker}
                      </span>
                    </div>
                    <h3 className="ab-pillar-head">{item.head}</h3>
                    <p className="ab-pillar-body">{item.body}</p>

                    {/* Either metadata chips (Vision/Mission) or rules list (Principles) */}
                    {item.list ? (
                      <ul className="ab-pillar-list">
                        {item.list.map((li, i) => (
                          <li key={i}>
                            <span className="ab-pillar-list-num">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="ab-pillar-list-text">{li}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
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
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — CAPABILITIES (Tracker + tags + stats per row)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="ab-cap" aria-labelledby="ab-cap-title">
          {/* Background section label — parallax */}
          <span className="ab-cap-section-label" aria-hidden>
            Practices
          </span>

          {/* Vertical progress indicator */}
          <div className="ab-cap-progress" aria-hidden>
            <div className="ab-cap-progress-track">
              <div className="ab-cap-progress-fill" />
            </div>
          </div>

          {/* Active item tracker — sticky in viewport */}
          <div className="ab-cap-tracker" aria-hidden>
            <span className="ab-cap-active-num">01</span>
            <span className="ab-cap-tracker-bar" />
            <span className="ab-cap-active-label">PRODUCT ENGINEERING</span>
          </div>

          <div className="ab-cap-inner">
            <div className="ab-cap-grid">
              <div className="ab-cap-left">
                <span className="ab-eyebrow">{CAPABILITIES.eyebrow}</span>
                <h2 id="ab-cap-title" className="ab-h2">
                  {CAPABILITIES.title}{" "}
                  <span className="ab-italic-mute">
                    {CAPABILITIES.titleAccent}
                  </span>
                </h2>
                <p className="ab-h2-lead">{CAPABILITIES.lead}</p>

                <div className="ab-cap-meta">
                  <div className="ab-cap-meta-row">
                    <span className="ab-cap-meta-key">Practices</span>
                    <span className="ab-cap-meta-val">04</span>
                  </div>
                  <div className="ab-cap-meta-row">
                    <span className="ab-cap-meta-key">Standard</span>
                    <span className="ab-cap-meta-val">Production-grade</span>
                  </div>
                  <div className="ab-cap-meta-row">
                    <span className="ab-cap-meta-key">Stack</span>
                    <span className="ab-cap-meta-val">Type-safe by default</span>
                  </div>
                </div>
              </div>

              <ol className="ab-cap-list" role="list">
                {CAPABILITIES.items.map((item) => (
                  <li key={item.n} className="ab-cap-item" data-active="false">
                    <a
                      href="#"
                      className="ab-cap-link"
                      onClick={(e) => e.preventDefault()}
                    >
                      <div className="ab-cap-row">
                        <span className="ab-cap-num">{item.n}</span>
                        <div className="ab-cap-text">
                          <h3 className="ab-cap-head">
                            <span className="ab-cap-head-text">{item.head}</span>
                            <span className="ab-cap-arrow" aria-hidden>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                  d="M4 10h12M11 5l5 5-5 5"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                          </h3>
                          <p className="ab-cap-body">{item.body}</p>

                          <div className="ab-cap-tags">
                            {item.tags.map((t, i) => (
                              <span key={i} className="ab-cap-tag">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Right-side stat block */}
                        <div className="ab-cap-stat-block">
                          <span className="ab-cap-stat">{item.stat}</span>
                          <span className="ab-cap-stat-label">
                            {item.statLabel}
                          </span>
                        </div>
                      </div>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — CTA (Cinematic close: 3 orbs, char headline,
            framed entrance, marquee tail)
        ═══════════════════════════════════════════════════════════════ */}
        <section ref={ctaRef} className="ab-cta" aria-labelledby="ab-cta-title">
          <div className="ab-cta-bg" aria-hidden>
            <div className="ab-cta-orb ab-cta-orb-a" />
            <div className="ab-cta-orb ab-cta-orb-b" />
            <div className="ab-cta-orb ab-cta-orb-c" />
            <div className="ab-cta-grid-pattern" />
            <div className="ab-cta-vignette" />
          </div>

          {/* Top frame line */}
          <span className="ab-cta-frame ab-cta-frame--top" aria-hidden />

          <div className="ab-cta-inner">
            <span className="ab-eyebrow ab-eyebrow--light">{CTA.eyebrow}</span>

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

            <p className="ab-cta-after ab-cta-lead" style={{ opacity: 0 }}>
              {CTA.lead}
            </p>

            <div className="ab-cta-after ab-cta-actions" style={{ opacity: 0 }}>
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

          {/* Bottom frame line */}
          <span className="ab-cta-frame ab-cta-frame--bottom" aria-hidden />

          {/* Marquee tail */}
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
        .ab-eyebrow--light { color: rgba(255,255,255,0.65); }
        .ab-eyebrow::before {
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
          color: rgba(255,255,255,0.6);
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

        /* Decorative corner frame lines */
        .ab-hero-frames {
          position: absolute;
          inset: clamp(80px, 10vh, 120px) clamp(20px, 3vw, 40px);
          z-index: 2;
          pointer-events: none;
        }
        .ab-hero-frame {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(255,255,255,0.18);
          transform-origin: left center;
        }
        .ab-hero-frame--top { top: 0; }
        .ab-hero-frame--bottom { bottom: 0; }

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

        .ab-hero-eyebrow-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: clamp(36px, 5vw, 56px);
        }
        .ab-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 7px 14px 7px 12px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #fafaf9;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .ab-hero-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #fafaf9;
          box-shadow: 0 0 0 3px rgba(250,250,249,0.16);
          animation: ab-pulse 2.2s ease-in-out infinite;
        }
        .ab-hero-coords {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.45);
        }
        @keyframes ab-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(250,250,249,0.16); }
          50% { box-shadow: 0 0 0 6px rgba(250,250,249,0.04); }
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
          flex-wrap: wrap;
          align-items: baseline;
          padding: 0 0.04em;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.08) 0%,
            rgba(255,255,255,0.02) 100%
          );
          border-radius: 0.12em;
          backdrop-filter: blur(2px);
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
           SECTION 2 — PILLARS (Editorial cards w/ parallax numerals)
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
        }
        .ab-pillars-head {
          text-align: center;
          margin-bottom: clamp(48px, 6vw, 72px);
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ab-pillars-head .ab-eyebrow::before { display: none; }
        .ab-pillars-head .ab-h2 { max-width: 22ch; }
        .ab-pillars-head .ab-h2-lead { text-align: center; max-width: 60ch; }

        /* Decorative section divider with mark in the middle */
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
          height: 1px;
          background: rgba(10,10,10,0.18);
          transform-origin: left center;
        }
        .ab-pillars-divider-line:last-child {
          transform-origin: right center;
        }
        .ab-pillars-divider-mark {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
          padding: 0 4px;
          white-space: nowrap;
        }

        .ab-pillars-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(20px, 2vw, 28px);
          perspective: 1500px;
        }
        .ab-pillar-card {
          position: relative;
          will-change: transform, opacity;
          transform-style: preserve-3d;
          overflow: hidden;
          border-radius: 20px;
        }
        /* Massive numeral that lives behind the content and parallax-drifts */
        .ab-pillar-num-big {
          position: absolute;
          right: -8%;
          bottom: -22%;
          z-index: 0;
          font-family: var(--font-display);
          font-size: clamp(180px, 22vw, 320px);
          font-weight: 400;
          font-style: italic;
          letter-spacing: -0.04em;
          line-height: 1;
          color: rgba(10,10,10,0.04);
          pointer-events: none;
          user-select: none;
          will-change: transform;
        }
        /* Sheen following cursor */
        .ab-pillar-sheen {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.4s ease;
          background: radial-gradient(
            circle at var(--sx, 50%) var(--sy, 50%),
            rgba(10,10,10,0.04) 0%,
            transparent 50%
          );
        }
        .ab-pillar-card:hover .ab-pillar-sheen { opacity: 1; }

        .ab-pillar-inner {
          position: relative;
          z-index: 2;
          padding: clamp(32px, 3vw, 44px) clamp(28px, 2.6vw, 36px);
          background: linear-gradient(180deg, #ffffff 0%, #fdfdfc 100%);
          border: 1px solid rgba(10,10,10,0.08);
          border-radius: 20px;
          height: 100%;
          min-height: 440px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          transition:
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.45s ease,
            box-shadow 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
          transform-style: preserve-3d;
        }
        .ab-pillar-card:hover .ab-pillar-inner {
          transform: translateY(-6px) translateZ(0);
          border-color: rgba(10,10,10,0.16);
          box-shadow:
            0 1px 0 rgba(255,255,255,1) inset,
            0 30px 70px -28px rgba(10,10,10,0.22),
            0 10px 30px -14px rgba(10,10,10,0.1);
        }

        .ab-pillar-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(10,10,10,0.07);
        }
        .ab-pillar-num {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: rgba(10,10,10,0.4);
        }
        .ab-pillar-kicker {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #0a0a0a;
          padding: 6px 11px 6px 9px;
          border: 1px solid rgba(10,10,10,0.14);
          border-radius: 6px;
          background: rgba(10,10,10,0.025);
        }
        .ab-pillar-kicker-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0a0a0a;
        }
        .ab-pillar-head {
          font-family: var(--font-display);
          font-size: clamp(20px, 1.8vw, 26px);
          font-weight: 500;
          letter-spacing: -0.024em;
          line-height: 1.18;
          margin: 0;
          color: #0a0a0a;
        }
        .ab-pillar-body {
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(10,10,10,0.62);
          margin: 0;
        }

        /* Metadata chip list (Vision/Mission cards) */
        .ab-pillar-meta {
          margin: auto 0 0;
          padding: 18px 0 0;
          list-style: none;
          border-top: 1px solid rgba(10,10,10,0.06);
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .ab-pillar-meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(10,10,10,0.7);
          will-change: opacity, transform;
        }
        .ab-pillar-meta-mark {
          color: rgba(10,10,10,0.35);
          font-size: 9px;
        }

        /* Numbered rules list (Principles card) */
        .ab-pillar-list {
          margin: auto 0 0;
          padding: 18px 0 0;
          list-style: none;
          border-top: 1px solid rgba(10,10,10,0.06);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ab-pillar-list li {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 12px;
          align-items: center;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 500;
          color: rgba(10,10,10,0.78);
          will-change: opacity, transform;
        }
        .ab-pillar-list-num {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(10,10,10,0.4);
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 3 — CAPABILITIES (Tracker + tags + per-row stats)
        ═══════════════════════════════════════════════════════════════ */
        .ab-cap {
          position: relative;
          padding: clamp(96px, 13vw, 160px) 24px;
          background: #f5f5f4;
          border-top: 1px solid rgba(10,10,10,0.06);
          overflow: hidden;
        }
        /* Massive parallax background label */
        .ab-cap-section-label {
          position: absolute;
          right: -3%;
          top: 8%;
          z-index: 0;
          font-family: var(--font-display);
          font-size: clamp(140px, 22vw, 320px);
          font-weight: 400;
          font-style: italic;
          letter-spacing: -0.04em;
          line-height: 1;
          color: rgba(10,10,10,0.04);
          pointer-events: none;
          user-select: none;
          will-change: transform;
          white-space: nowrap;
        }

        .ab-cap-progress {
          position: absolute;
          left: clamp(20px, 3vw, 44px);
          top: clamp(96px, 13vw, 160px);
          bottom: clamp(96px, 13vw, 160px);
          width: 1px;
          z-index: 1;
        }
        .ab-cap-progress-track {
          position: sticky;
          top: 18vh;
          width: 1px;
          height: 64vh;
          background: rgba(10,10,10,0.08);
          overflow: hidden;
        }
        .ab-cap-progress-fill {
          width: 100%;
          height: 100%;
          background: #0a0a0a;
          transform-origin: top center;
          transform: scaleY(0);
        }

        /* Sticky active-item tracker — top-left corner */
        .ab-cap-tracker {
          position: sticky;
          top: 24px;
          left: 0;
          z-index: 3;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-left: clamp(60px, 6vw, 96px);
          margin-bottom: -56px;
          padding: 8px 14px;
          background: rgba(245,245,244,0.85);
          border: 1px solid rgba(10,10,10,0.1);
          border-radius: 999px;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a0a0a;
          width: max-content;
        }
        .ab-cap-active-num {
          color: rgba(10,10,10,0.45);
        }
        .ab-cap-tracker-bar {
          width: 1px;
          height: 12px;
          background: rgba(10,10,10,0.2);
        }

        .ab-cap-inner {
          position: relative;
          z-index: 1;
          max-width: 1320px;
          margin: 0 auto;
          padding-left: clamp(20px, 3vw, 44px);
        }
        .ab-cap-grid {
          display: grid;
          grid-template-columns: minmax(280px, 0.85fr) minmax(420px, 1.15fr);
          gap: clamp(48px, 6vw, 96px);
          align-items: start;
        }
        .ab-cap-left {
          position: sticky;
          top: 18vh;
          display: flex;
          flex-direction: column;
        }
        .ab-cap-left .ab-h2 { max-width: 14ch; }

        .ab-cap-meta {
          margin-top: clamp(28px, 3vw, 40px);
          padding-top: 24px;
          border-top: 1px solid rgba(10,10,10,0.1);
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .ab-cap-meta-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
        }
        .ab-cap-meta-key {
          color: rgba(10,10,10,0.45);
          text-transform: uppercase;
        }
        .ab-cap-meta-val {
          color: #0a0a0a;
          font-weight: 600;
        }

        .ab-cap-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
        }
        .ab-cap-item {
          border-top: 1px solid rgba(10,10,10,0.1);
          will-change: opacity, transform;
          transition: background 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-cap-item:last-child {
          border-bottom: 1px solid rgba(10,10,10,0.1);
        }
        .ab-cap-item[data-active="true"] {
          background: linear-gradient(90deg, rgba(10,10,10,0.025) 0%, transparent 80%);
        }
        .ab-cap-link {
          display: block;
          padding: clamp(28px, 3vw, 44px) 0;
          color: inherit;
          text-decoration: none;
          position: relative;
          transition: padding 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-cap-link::before {
          content: "";
          position: absolute;
          left: 0;
          right: 100%;
          bottom: -1px;
          height: 1px;
          background: #0a0a0a;
          transition: right 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ab-cap-item:hover .ab-cap-link {
          padding-left: 12px;
        }
        .ab-cap-item:hover .ab-cap-link::before,
        .ab-cap-item[data-active="true"] .ab-cap-link::before {
          right: 0;
        }

        .ab-cap-row {
          display: grid;
          grid-template-columns: 56px 1fr auto;
          gap: clamp(20px, 2.5vw, 32px);
          align-items: start;
        }
        .ab-cap-num {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(10,10,10,0.4);
          padding-top: 6px;
          will-change: opacity, transform;
        }
        .ab-cap-item[data-active="true"] .ab-cap-num,
        .ab-cap-item:hover .ab-cap-num {
          color: #0a0a0a;
        }
        .ab-cap-text {
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 0;
        }
        .ab-cap-head {
          font-family: var(--font-display);
          font-size: clamp(24px, 2.6vw, 38px);
          font-weight: 500;
          letter-spacing: -0.028em;
          line-height: 1.12;
          margin: 0;
          color: #0a0a0a;
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .ab-cap-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(10,10,10,0.18);
          color: rgba(10,10,10,0.55);
          opacity: 0;
          transform: translateX(-10px) rotate(-30deg);
          transition:
            opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.4s ease,
            color 0.4s ease,
            border-color 0.4s ease;
        }
        .ab-cap-item:hover .ab-cap-arrow {
          opacity: 1;
          transform: translateX(0) rotate(0);
          background: #0a0a0a;
          color: #fafaf9;
          border-color: #0a0a0a;
        }
        .ab-cap-body {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(10,10,10,0.6);
          margin: 0;
          max-width: 50ch;
        }

        .ab-cap-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 4px;
        }
        .ab-cap-tag {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.65);
          padding: 5px 9px;
          border: 1px solid rgba(10,10,10,0.12);
          border-radius: 5px;
          background: rgba(255,255,255,0.5);
          will-change: opacity, transform;
          transition: all 0.3s ease;
        }
        .ab-cap-item:hover .ab-cap-tag {
          border-color: rgba(10,10,10,0.22);
          background: #ffffff;
          color: #0a0a0a;
        }

        .ab-cap-stat-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
          padding-left: 24px;
          border-left: 1px solid rgba(10,10,10,0.1);
          padding-top: 4px;
          min-width: 140px;
          will-change: opacity, transform;
        }
        .ab-cap-stat {
          font-family: var(--font-display);
          font-size: clamp(22px, 2vw, 30px);
          font-weight: 500;
          font-style: italic;
          letter-spacing: -0.02em;
          line-height: 1;
          color: #0a0a0a;
        }
        .ab-cap-stat-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.45);
          text-align: right;
          line-height: 1.4;
          max-width: 16ch;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 4 — CTA (Cinematic close)
        ═══════════════════════════════════════════════════════════════ */
        .ab-cta {
          position: relative;
          padding: clamp(120px, 16vw, 200px) 24px clamp(80px, 10vw, 140px);
          background: #0a0a0a;
          color: #fafaf9;
          overflow: hidden;
          isolation: isolate;
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

        /* Frame lines — top + bottom of CTA */
        .ab-cta-frame {
          position: absolute;
          left: clamp(20px, 3vw, 40px);
          right: clamp(20px, 3vw, 40px);
          height: 1px;
          background: rgba(255,255,255,0.18);
          z-index: 1;
          transform-origin: left center;
        }
        .ab-cta-frame--top { top: clamp(60px, 8vw, 100px); }
        .ab-cta-frame--bottom { bottom: 64px; }

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
          line-height: 0.94;
          margin: 0 0 clamp(28px, 3.5vw, 44px);
          color: #fff;
          max-width: 18ch;
          will-change: transform;
        }
        .ab-cta-headline-line {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: baseline;
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
          flex-wrap: wrap;
          padding: 0 0.04em;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.06) 0%,
            rgba(255,255,255,0.01) 100%
          );
          border-radius: 0.1em;
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
        /* Shine sweep on hover */
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

        /* Marquee tail */
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
        @media (max-width: 1100px) {
          .ab-pillars-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .ab-pillar-inner {
            padding: 32px 28px;
            min-height: 0;
          }
          .ab-pillar-num-big {
            font-size: clamp(160px, 32vw, 260px);
          }

          .ab-cap-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          .ab-cap-left { position: static; }
          .ab-cap-progress { display: none; }
          .ab-cap-tracker { display: none; }
          .ab-cap-inner { padding-left: 0; }
          .ab-cap-row {
            grid-template-columns: 36px 1fr;
            gap: 18px;
          }
          .ab-cap-stat-block {
            grid-column: 1 / -1;
            flex-direction: row;
            align-items: baseline;
            border-left: 0;
            border-top: 1px solid rgba(10,10,10,0.1);
            padding-left: 0;
            padding-top: 16px;
            margin-top: 6px;
            justify-content: space-between;
            min-width: 0;
            width: 100%;
          }
          .ab-cap-stat-label { text-align: left; max-width: 30ch; }
        }

        @media (max-width: 768px) {
          .ab-hero {
            padding: 0 16px;
            min-height: 100svh;
          }
          .ab-hero-content {
            padding: clamp(120px, 22svh, 160px) 0 90px;
          }
          .ab-hero-eyebrow-row { flex-direction: column; align-items: flex-start; gap: 10px; }
          .ab-hero-eyebrow { font-size: 10px; padding: 5px 11px 5px 9px; }
          .ab-hero-coords { font-size: 9.5px; }
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
          .ab-hero-frames { inset: clamp(60px, 8vh, 90px) 16px; }

          .ab-pillars,
          .ab-cap,
          .ab-cta {
            padding-left: 16px;
            padding-right: 16px;
          }
          .ab-h2 { font-size: clamp(30px, 8.5vw, 48px); }
          .ab-h2-lead { font-size: 14.5px; line-height: 1.65; }

          .ab-pillars-divider-mark { font-size: 9.5px; }
          .ab-pillar-top { padding-bottom: 14px; }
          .ab-pillar-head { font-size: 19px; }
          .ab-pillar-body { font-size: 14px; }
          .ab-pillar-num-big { font-size: clamp(140px, 50vw, 220px); }

          .ab-cap-section-label { font-size: clamp(120px, 38vw, 200px); }
          .ab-cap-link { padding: 24px 0; }
          .ab-cap-num { font-size: 11px; padding-top: 4px; }
          .ab-cap-head { font-size: 22px; gap: 10px; }
          .ab-cap-arrow {
            width: 28px; height: 28px;
            opacity: 1;
            transform: translateX(0) rotate(0);
            background: transparent;
            color: rgba(10,10,10,0.5);
            border-color: rgba(10,10,10,0.18);
          }
          .ab-cap-body { font-size: 14px; }
          .ab-cap-tag { font-size: 9.5px; padding: 4px 7px; }
          .ab-cap-stat { font-size: 20px; }
          .ab-cap-stat-label { font-size: 9.5px; }

          .ab-cta { padding-bottom: 90px; }
          .ab-cta-headline { font-size: clamp(36px, 11vw, 64px); }
          .ab-cta-lead { font-size: 14.5px; }
          .ab-cta-actions { flex-direction: column; width: 100%; max-width: 320px; }
          .ab-cta-button,
          .ab-cta-button-ghost { width: 100%; justify-content: center; padding: 16px 22px; font-size: 14px; }
          .ab-cta-marquee { height: 48px; }
          .ab-cta-marquee-item { font-size: 13px; padding: 0 16px; gap: 16px; }
          .ab-cta-frame--bottom { bottom: 56px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .ab-hero-eyebrow-dot,
          .ab-hero-scrollcue-dot { animation: none; }
          .ab-hero-media-inner,
          .ab-hero-content,
          .ab-cap-section-label,
          .ab-pillar-num-big,
          .ab-cta-headline { transform: none !important; }
          .ab-cta-orb { animation: none; transform: none !important; }
          .ab-cta-marquee-track { transform: none !important; }
          .ab-pillar-card:hover .ab-pillar-inner { transform: none; }
          .ab-cta-button:hover { transform: none; }
        }
      `}</style>
    </>
  );
}