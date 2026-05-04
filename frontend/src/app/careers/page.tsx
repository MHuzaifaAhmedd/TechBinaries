//version 3
// Careers — Tech Binaries
// Premium, editorial-feel careers page. Distinct from the service pages —
// no hero form, no card grids, no service-page motifs. The visual language
// here is: oversized typography, ticker marquees, accept/reject filing cards,
// numbered manifesto, asymmetric image mosaic.
//
// Image assets expected at:
//   /images/careers/careers-hero-section.jpeg          (desktop)
//   /images/careers/careers-hero-section-mobile.jpeg   (mobile)
"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────────

const HERO = {
  headline1: "Is your best",
  headline2: "actually",
  headlineItalic: "your best?",
  lead:
    "Most software shops take your brief, disappear for weeks, and deliver something that needs fixing before it's even live. Tech Binaries works differently. We're a team of engineers and builders who treat every line of code like it has our name on it — because it does.",
  pullQuote:
    "We're not looking for people who want a job. We're looking for people who want ownership.",
  ticker: [
    "Ownership",
    "Precision",
    "Craft",
    "Honesty",
    "Velocity",
    "Standards",
    "No-bullshit",
    "Builders",
  ],
};

const FILTER = {
  title: "We hire",
  titleAccent: "deliberately.",
  lead:
    "We're a small, deliberate team. That means one wrong hire costs more than one open seat. We'd rather run lean with people who care than scale fast with people who don't.",
  yes: {
    label: "You'll fit right in if",
    items: [
      "You obsess over clean architecture",
      "You lose sleep over broken builds",
      "You get genuinely annoyed when something ships half-baked",
      "You prefer hard truths over comfortable nonsense",
      "You ship — and you stand behind what you ship",
    ],
  },
  no: {
    label: "This isn't for you if",
    items: [
      "You're looking for a place to coast",
      "You think 'good enough' is good enough",
      "You'd rather be busy than effective",
      "You expect titles to do the work for you",
      "You're allergic to feedback",
    ],
  },
};

const DNA = {
  title: "The Tech Binaries",
  titleAccent: "standard.",
  lead:
    "Five non-negotiables. They're not posters on a wall — they're how we hire, how we ship, and how we tell each other the truth.",
  values: [
    {
      n: "I",
      kicker: "Quality is the default",
      head: "Precision over speed",
      body: "We move fast, but we don't move sloppy.",
      visual:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80&auto=format&fit=crop",
      visualAlt: "Developer focused on code quality at a workstation",
    },
    {
      n: "II",
      kicker: "Solve, don't close",
      head: "Own the problem",
      body: "Your job isn't to close tickets. It's to solve what's actually broken.",
      visual:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format&fit=crop",
      visualAlt: "Team collaborating at a table with laptops",
    },
    {
      n: "III",
      kicker: "Best idea wins",
      head: "No rank, just results",
      body: "The best idea wins — junior engineers push back on architecture here.",
      visual:
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80&auto=format&fit=crop",
      visualAlt: "Team in a meeting discussing ideas together",
    },
    {
      n: "IV",
      kicker: "Compound or fade",
      head: "Sharpen or stagnate",
      body: "The industry moves. Either you're keeping up or you're falling behind.",
      visual:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80&auto=format&fit=crop",
      visualAlt: "Open book and notes representing continuous learning",
    },
    {
      n: "V",
      kicker: "Direct, not diplomatic",
      head: "Say it straight",
      body: "No politics, no sugarcoating. Direct feedback is a sign of respect.",
      visual:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop",
      visualAlt: "Colleagues having a direct, candid conversation",
    },
  ],
};

const LIFE = {
  title: "Working here,",
  titleAccent: "honestly.",
  lead:
    "A short list because we'd rather over-deliver than over-promise. These are the things we actually do — not the things every careers page says.",
  benefits: [
    {
      h: "Real projects, real stakes",
      d: "You'll work on software that actual businesses depend on. Production systems, real users, real revenue. Not internal tools no one uses.",
      visual:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Team collaborating on production software",
    },
    {
      h: "We pay for your growth",
      d: "Courses, certifications, conferences. If it makes you better, we'll back it. Our budget for learning isn't a perk — it's a line item.",
      visual:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Books and notebooks for continued learning",
    },
    {
      h: "Competitive salary + bonuses",
      d: "Good work gets rewarded. Performance bonuses are paid against shipped outcomes — not just at annual reviews when budgets allow.",
      visual:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Financial reward and compensation",
    },
    {
      h: "Work that respects your life",
      d: "High standards during work hours. Your time outside them is yours. We don't message on weekends and we don't make heroes out of people who burn out.",
      visual:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Quiet workspace with natural light",
    },
  ],
};

const OPENINGS = {
  title: "Open roles,",
  titleAccent: "right now.",
  lead: "We're not hiring to fill seats. Each role below exists because we have real work that needs a specific kind of person.",
  roles: [
    {
      id: "senior-fullstack",
      title: "Senior Full-Stack Engineer",
      dept: "Engineering",
      type: "Full-time",
      location: "Remote / Karachi",
      tags: ["React", "Node.js", "PostgreSQL"],
      blurb: "Own entire product surfaces end-to-end. You'll architect features, review code, and ship — not hand off.",
    },
    {
      id: "backend-engineer",
      title: "Backend Engineer",
      dept: "Engineering",
      type: "Full-time",
      location: "Remote / Karachi",
      tags: ["Node.js", "TypeScript", "AWS"],
      blurb: "Design and scale the systems our clients depend on. High ownership, zero politics.",
    },
    {
      id: "product-designer",
      title: "Product Designer",
      dept: "Design",
      type: "Full-time",
      location: "Remote",
      tags: ["Figma", "Systems", "Prototyping"],
      blurb: "From wireframe to shipped UI. You'll work directly with engineers — no hand-off limbo.",
    },
    {
      id: "devops-engineer",
      title: "DevOps / Platform Engineer",
      dept: "Infrastructure",
      type: "Full-time",
      location: "Remote",
      tags: ["AWS", "Terraform", "CI/CD"],
      blurb: "Build and own the infrastructure that keeps everything running. Reliability is the product here.",
    },
    {
      id: "project-manager",
      title: "Technical Project Manager",
      dept: "Delivery",
      type: "Full-time",
      location: "Karachi",
      tags: ["Agile", "Client-facing", "Technical"],
      blurb: "Keep complex projects honest. You'll need enough technical depth to call out scope creep before it ships.",
    },
  ],
};

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [activeValue, setActiveValue] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  const heroRef = useRef<HTMLElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const dnaStageRef = useRef<HTMLDivElement | null>(null);
  const dnaCursorRingRef = useRef<HTMLDivElement | null>(null);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
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

  // ── HERO INTRO + TICKER ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      const chars = gsap.utils.toArray<HTMLElement>(".cr-hero-char");
      tl.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: { each: 0.014 },
          ease: "power4.out",
        },
        0
      );
      tl.fromTo(
        ".cr-hero-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
        0.7
      );

      gsap.to(".cr-hero-bg", {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: ".cr-hero",
          start: "top top",
          end: "bottom top",
          scrub: 0.6,
        },
      });

      const ticker = tickerRef.current;
      if (ticker) {
        const inner = ticker.querySelector<HTMLDivElement>(".cr-ticker-track");
        if (inner) {
          const firstChild = inner.children[0] as HTMLElement | null;
          if (firstChild) {
            const setWidth = firstChild.offsetWidth;
            gsap.to(inner, {
              x: -setWidth,
              duration: 28,
              ease: "none",
              repeat: -1,
            });
          }
        }
      }
    });
    return () => ctx.revert();
  }, []);

  // ── SECTION REVEALS ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const setupBatch = (
        selector: string,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
        start = "top 86%"
      ) => {
        const items = gsap.utils.toArray<HTMLElement>(selector);
        if (!items.length) return;
        gsap.set(items, from);
        ScrollTrigger.batch(items, {
          start,
          once: true,
          onEnter: (batch) =>
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
          scrollTrigger: { trigger: ".cr-filter-table", start: "top 86%", once: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".cr-filter-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            delay: 0.15 + i * 0.06,
            scrollTrigger: { trigger: ".cr-filter-table", start: "top 86%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // Life mosaic reveal
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let io: IntersectionObserver | null = null;
    const raf = requestAnimationFrame(() => {
      const items = document.querySelectorAll<HTMLElement>(".cr-life-item");
      if (!items.length) return;

      const shiftPx = () => Math.min(window.innerWidth * 0.26, 220);

      const playRow = (el: HTMLElement) => {
        if (el.dataset.lifeReveal === "1") return;
        el.dataset.lifeReveal = "1";
        io?.unobserve(el);
        const visual = el.querySelector<HTMLElement>(".cr-life-visual");
        const body = el.querySelector<HTMLElement>(".cr-life-body");
        if (!visual || !body) return;
        const isL = el.getAttribute("data-side") === "L";
        const px = shiftPx();
        gsap.fromTo(
          visual,
          { x: isL ? -px : px, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.05, ease: "power3.out" }
        );
        gsap.fromTo(
          body,
          { x: isL ? px : -px, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.05, ease: "power3.out", delay: 0.08 }
        );
      };

      io = new IntersectionObserver(
        (entries) => {
          for (const ent of entries) {
            if (!ent.isIntersecting) continue;
            playRow(ent.target as HTMLElement);
          }
        },
        { threshold: 0.14, rootMargin: "0px 0px 8% 0px" }
      );

      items.forEach((el) => io!.observe(el));
    });

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  // ── DNA — FULL-WIDTH SCROLL-DRIVEN CARD ENTRY ──
  // Each principle gets a large card that enters the viewport with cinematic
  // momentum: it arrives from the left trailing a slight rotation and blur,
  // snaps into place, then the next one pushes it out as scroll continues.
  useEffect(() => {
    const stage = dnaStageRef.current;
    if (!stage) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1101px) and (hover: hover) and (pointer: fine)",
      () => {
        const totalScenes = DNA.values.length;
        // Each scene gets 1 viewport-height of scroll distance
        const scrollPerScene = 1.0;
        const totalDistance = totalScenes * scrollPerScene;

        let currentActive = -1;
        let lastDnaScrollProgress = 0;

        const updateDnaCursorRing = (progress: number) => {
          const ring = dnaCursorRingRef.current;
          if (!ring) return;
          const arc = ring.querySelector<SVGCircleElement>("[data-ring-arc]");
          if (arc) arc.setAttribute("stroke-dashoffset", String(1 - progress));
          const pct = ring.querySelector("[data-ring-pct]");
          if (pct) pct.textContent = String(Math.round(progress * 100));
        };

        const onStageMove = (e: MouseEvent) => {
          const ring = dnaCursorRingRef.current;
          if (!ring) return;
          ring.style.left = `${e.clientX}px`;
          ring.style.top = `${e.clientY}px`;
          ring.dataset.visible = "true";
          updateDnaCursorRing(lastDnaScrollProgress);
        };

        const onStageLeave = () => {
          const ring = dnaCursorRingRef.current;
          if (ring) ring.dataset.visible = "false";
        };

        // Initial state: all cards invisible, stacked behind
        const cards = gsap.utils.toArray<HTMLElement>(".cr-dna-full-card");
        gsap.set(cards, {
          xPercent: 100,
          opacity: 0,
          rotateY: 8,
          scale: 0.94,
          filter: "blur(10px)",
          transformOrigin: "left center",
        });

        const showCard = (idx: number, prevIdx: number) => {
          if (idx === currentActive) return;
          currentActive = idx;
          setActiveValue(idx);

          cards.forEach((card, i) => {
            if (i === idx) {
              // Enter: sweeps in from right with rotation and blur dissolve
              gsap.killTweensOf(card);
              gsap.fromTo(
                card,
                {
                  xPercent: 72,
                  opacity: 0,
                  rotateY: 10,
                  scale: 0.92,
                  filter: "blur(14px)",
                  transformOrigin: "left center",
                },
                {
                  xPercent: 0,
                  opacity: 1,
                  rotateY: 0,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 1.05,
                  ease: "expo.out",
                  clearProps: "filter",
                }
              );

              // Image reveal: slow ken-burns from right
              const img = card.querySelector<HTMLElement>(".cr-dna-full-card-img-wrap");
              if (img) {
                gsap.fromTo(
                  img,
                  { xPercent: 6, scale: 1.08 },
                  { xPercent: 0, scale: 1, duration: 1.4, ease: "expo.out" }
                );
              }

              // Text stagger
              const texts = card.querySelectorAll<HTMLElement>(".cr-dna-full-card-text-line");
              gsap.fromTo(
                texts,
                { yPercent: 110, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.9,
                  ease: "power4.out",
                  stagger: 0.07,
                  delay: 0.18,
                }
              );
            } else if (i === prevIdx) {
              // Exit: previous card slides left + fades
              gsap.killTweensOf(card);
              gsap.to(card, {
                xPercent: -55,
                opacity: 0,
                scale: 0.96,
                filter: "blur(6px)",
                duration: 0.7,
                ease: "power3.in",
                onComplete: () => {
                  gsap.set(card, { xPercent: 100, opacity: 0, filter: "blur(10px)", scale: 0.94, rotateY: 8 });
                },
              });
            } else {
              // Others: reset off-screen
              gsap.set(card, { xPercent: 100, opacity: 0, filter: "blur(10px)", scale: 0.94, rotateY: 8 });
            }
          });
        };

        const trigger = ScrollTrigger.create({
          trigger: stage,
          /* Slight offset so the pinned block is not flush to the viewport top */
          start: "top 24px",
          end: () => `+=${window.innerHeight * totalDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.4,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            lastDnaScrollProgress = self.progress;
            updateDnaCursorRing(self.progress);

            const raw = self.progress * totalScenes;
            const idx = Math.min(totalScenes - 1, Math.max(0, Math.floor(raw)));
            showCard(idx, currentActive === idx ? -99 : currentActive);

            // Progress dots
            document.querySelectorAll<HTMLElement>(".cr-dna-dot").forEach((dot, i) => {
              dot.dataset.active = i === idx ? "true" : "false";
            });

            // Counter
            const counter = document.querySelector<HTMLElement>(".cr-dna-counter-num");
            if (counter) counter.textContent = String(idx + 1).padStart(2, "0");
          },
          onEnter: () => {
            // Trigger first card
            showCard(0, -1);
            updateDnaCursorRing(trigger.progress ?? 0);
          },
        });

        stage.addEventListener("mousemove", onStageMove);
        stage.addEventListener("mouseleave", onStageLeave);
        requestAnimationFrame(() => {
          lastDnaScrollProgress = trigger.progress ?? 0;
          updateDnaCursorRing(lastDnaScrollProgress);
        });

        return () => {
          stage.removeEventListener("mousemove", onStageMove);
          stage.removeEventListener("mouseleave", onStageLeave);
          trigger.kill();
        };
      }
    );

    // Mobile: simple stacked reveal
    mm.add(
      "(max-width: 1100px), (hover: none), (pointer: coarse)",
      () => {
        const ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".cr-dna-mobile-card").forEach((el, i) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 32 },
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
                delay: i * 0.05,
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              }
            );
          });
        });
        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      {/* Grain overlay */}
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

      {/* DNA (desktop fine pointer): cursor ring = 0–100% over pinned “standard” scroll */}
      <div
        ref={dnaCursorRingRef}
        className="cr-dna-cursor-ring"
        data-visible="false"
        aria-hidden="true"
      >
        <div className="cr-dna-cursor-ring-inner">
          <svg
            className="cr-dna-cursor-ring-svg"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            aria-hidden
          >
            <circle
              cx="28"
              cy="28"
              r="22"
              fill="none"
              stroke="rgba(250,250,249,0.14)"
              strokeWidth="2"
            />
            <circle
              data-ring-arc
              cx="28"
              cy="28"
              r="22"
              fill="none"
              stroke="#fafaf9"
              strokeWidth="2"
              strokeLinecap="round"
              transform="rotate(-90 28 28)"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="1"
            />
          </svg>
          <span className="cr-dna-cursor-ring-pct" data-ring-pct>
            0
          </span>
        </div>
      </div>

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
        <section ref={heroRef} className="cr-hero" aria-labelledby="cr-hero-title">
          <div className="cr-hero-bg" aria-hidden>
            <picture>
              <source
                media="(max-width: 900px)"
                srcSet="/images/careers/careers-hero-section-mobile.jpeg"
              />
              <Image
                src="/images/careers/careers-hero-section.jpeg"
                alt=""
                fill
                priority
                sizes="100vw"
                className="cr-hero-photo"
              />
            </picture>
            <div className="cr-hero-bg-overlay" />
            <div className="cr-hero-bg-vignette" />
          </div>

          <div className="cr-hero-inner">
            <div className="cr-hero-meta cr-hero-meta--layout-only" aria-hidden="true">
              <span className="cr-hero-bin">
                <span className="cr-hero-bin-dot" />
                Careers
              </span>
              <span className="cr-hero-index">01 / 04</span>
            </div>

            <h1 id="cr-hero-title" className="cr-hero-title">
              <span className="cr-hero-line">
                {HERO.headline1.split("").map((c, i) => (
                  <span key={`a-${i}`} className="cr-hero-char">
                    {c === " " ? "\u00A0" : c}
                  </span>
                ))}
              </span>
              <span className="cr-hero-line">
                {HERO.headline2.split("").map((c, i) => (
                  <span key={`b-${i}`} className="cr-hero-char">
                    {c === " " ? "\u00A0" : c}
                  </span>
                ))}{" "}
                <span className="cr-hero-italic">
                  {HERO.headlineItalic.split("").map((c, i) => (
                    <span key={`c-${i}`} className="cr-hero-char">
                      {c === " " ? "\u00A0" : c}
                    </span>
                  ))}
                </span>
              </span>
            </h1>

            <div className="cr-hero-bottom">
              <p className="cr-hero-fade cr-hero-lead" style={{ opacity: 0 }}>
                {HERO.lead}
              </p>
              <blockquote className="cr-hero-fade cr-hero-pull" style={{ opacity: 0 }}>
                <span className="cr-hero-pull-mark" aria-hidden>¶</span>
                <p>{HERO.pullQuote}</p>
              </blockquote>
            </div>
          </div>

          <div className="cr-ticker" ref={tickerRef} aria-hidden>
            <div className="cr-ticker-track">
              {[0, 1].map((set) => (
                <div key={set} className="cr-ticker-set">
                  {HERO.ticker.map((t, i) => (
                    <span key={`${set}-${i}`} className="cr-ticker-item">
                      <span>{t}</span>
                      <span className="cr-ticker-dot" aria-hidden>●</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — WHO GETS IN
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cr-filter" aria-labelledby="cr-filter-title">
          <div className="cr-filter-inner">
            <div className="cr-sh cr-section-head">
              <h2 id="cr-filter-title" className="cr-h2">
                {FILTER.title}{" "}
                <span className="cr-italic-mute">{FILTER.titleAccent}</span>
              </h2>
              <p className="cr-h2-lead">{FILTER.lead}</p>
            </div>

            <div className="cr-filter-table" role="table" aria-label="Hiring signals comparison">
              <div className="cr-filter-thead" role="row">
                <div className="cr-filter-th cr-filter-th--yes" role="columnheader">
                  <span className="cr-filter-th-icon" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path d="M3 7.5 L6 10 L11 4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="cr-filter-th-label">{FILTER.yes.label}</span>
                </div>
                <div className="cr-filter-th cr-filter-th--no" role="columnheader">
                  <span className="cr-filter-th-icon" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path d="M4 4 L10 10 M10 4 L4 10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="cr-filter-th-label">{FILTER.no.label}</span>
                </div>
              </div>

              <div className="cr-filter-tbody" role="rowgroup">
                {FILTER.yes.items.map((yesText, i) => {
                  const noText = FILTER.no.items[i];
                  if (noText === undefined) return null;
                  return (
                    <div key={i} className="cr-filter-row" role="row">
                      <div className="cr-filter-cell cr-filter-cell--yes" role="cell">
                        <span className="cr-filter-cell-bullet" aria-hidden />
                        <span className="cr-filter-cell-text">{yesText}</span>
                      </div>
                      <div className="cr-filter-cell cr-filter-cell--no" role="cell">
                        <span className="cr-filter-cell-bullet" aria-hidden />
                        <span className="cr-filter-cell-text">{noText}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — THE TECH BINARIES STANDARD
            Desktop: full-width pinned scroll. Each principle = one large
            cinematic card that enters from the right with rotation + blur
            dissolve.
            Mobile: stacked cards.
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cr-dna" aria-labelledby="cr-dna-title">
          <div className="cr-dna-stage" ref={dnaStageRef}>

            <div className="cr-dna-inner">
              {/* Header row: title left, lead right — inline baseline */}
              <div className="cr-sh cr-section-head cr-dna-header">
                <h2 id="cr-dna-title" className="cr-h2 cr-h2--light">
                  {DNA.title}{" "}
                  <span className="cr-italic-light">{DNA.titleAccent}</span>
                </h2>
                <p className="cr-h2-lead cr-h2-lead--light cr-dna-header-lead">{DNA.lead}</p>
              </div>

              {/* ── DESKTOP: FULL-WIDTH CARD STAGE ── */}
              <div className="cr-dna-card-stage" aria-live="polite">

                {/* Cards layer — absolutely positioned, each takes full stage */}
                <div className="cr-dna-cards-layer">
                  {DNA.values.map((v, i) => (
                    <article
                      key={v.n}
                      className="cr-dna-full-card"
                      aria-hidden={activeValue !== i}
                      style={{ perspective: "1200px" }}
                    >
                      {/* Image panel — left ~55% */}
                      <div className="cr-dna-full-card-img-wrap">
                        <Image
                          src={v.visual}
                          alt={v.visualAlt}
                          fill
                          sizes="(min-width: 1101px) 60vw, 100vw"
                          className="cr-dna-full-card-img"
                          priority={i === 0}
                        />
                        <div className="cr-dna-full-card-img-overlay" />
                      </div>

                      {/* Text panel — right ~45% */}
                      <div className="cr-dna-full-card-copy">
                        {/* Kicker */}
                        <div className="cr-dna-full-card-text-line" style={{ overflow: "hidden" }}>
                          <span className="cr-dna-full-card-kicker">{v.kicker}</span>
                        </div>

                        {/* Heading */}
                        <div className="cr-dna-full-card-text-line" style={{ overflow: "hidden" }}>
                          <h3 className="cr-dna-full-card-head">{v.head}</h3>
                        </div>

                        {/* Rule */}
                        <div className="cr-dna-full-card-text-line" style={{ overflow: "hidden" }}>
                          <div className="cr-dna-full-card-rule" />
                        </div>

                        {/* Body */}
                        <div className="cr-dna-full-card-text-line" style={{ overflow: "hidden" }}>
                          <p className="cr-dna-full-card-body">{v.body}</p>
                        </div>

                        {/* Roman numeral — decorative, bottom-right of copy */}
                        <div className="cr-dna-full-card-text-line cr-dna-full-card-roman-wrap" style={{ overflow: "hidden" }}>
                          <span className="cr-dna-full-card-roman" aria-hidden>{v.n}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Progress / nav — bottom strip */}
                <div className="cr-dna-progress-strip" aria-hidden>
                  <div className="cr-dna-dots">
                    {DNA.values.map((_, i) => (
                      <span key={i} className="cr-dna-dot" data-active={i === activeValue ? "true" : "false"} />
                    ))}
                  </div>
                  <div className="cr-dna-counter">
                    <span className="cr-dna-counter-num">{String(activeValue + 1).padStart(2, "0")}</span>
                    <span className="cr-dna-counter-sep">/</span>
                    <span className="cr-dna-counter-total">05</span>
                  </div>
                  <div className="cr-dna-progress-bar">
                    <div
                      className="cr-dna-progress-fill"
                      style={{ width: `${((activeValue + 1) / DNA.values.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* ── MOBILE: STACKED CARDS ── */}
              <ol className="cr-dna-mobile-list" role="list">
                {DNA.values.map((v) => (
                  <li key={v.n} className="cr-dna-mobile-card">
                    <div className="cr-dna-mobile-visual">
                      <Image
                        src={v.visual}
                        alt={v.visualAlt}
                        fill
                        sizes="(max-width: 1100px) 100vw, 400px"
                        className="cr-dna-mobile-img"
                      />
                      <div className="cr-dna-mobile-overlay" />
                      <span className="cr-dna-mobile-kicker-tag">{v.kicker}</span>
                      <span className="cr-dna-mobile-roman" aria-hidden>{v.n}</span>
                    </div>
                    <div className="cr-dna-mobile-text">
                      <h3 className="cr-dna-mobile-head">{v.head}</h3>
                      <p className="cr-dna-mobile-body">{v.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — WHAT WORKING HERE LOOKS LIKE
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cr-life" aria-labelledby="cr-life-title">
          <div className="cr-life-inner">
            <div className="cr-sh cr-section-head">
              <h2 id="cr-life-title" className="cr-h2">
                {LIFE.title} <span className="cr-italic-mute">{LIFE.titleAccent}</span>
              </h2>
              <p className="cr-h2-lead">{LIFE.lead}</p>
            </div>

            <div className="cr-life-grid">
              {LIFE.benefits.map((b, i) => (
                <article key={b.h} className="cr-life-item" data-side={i % 2 === 0 ? "L" : "R"}>
                  <div className="cr-life-visual">
                    <Image
                      src={b.visual}
                      alt={b.visualAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 45vw"
                      className="cr-life-img"
                    />
                    <div className="cr-life-visual-overlay" />
                  </div>
                  <div className="cr-life-body">
                    <h3 className="cr-life-h">{b.h}</h3>
                    <p className="cr-life-d">{b.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 — OPEN ROLES
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cr-roles" aria-labelledby="cr-roles-title">
          <div className="cr-roles-inner">
            <div className="cr-sh cr-section-head">
              <h2 id="cr-roles-title" className="cr-h2">
                {OPENINGS.title}{" "}
                <span className="cr-italic-mute">{OPENINGS.titleAccent}</span>
              </h2>
              <p className="cr-h2-lead">{OPENINGS.lead}</p>
            </div>

            <div className="cr-roles-list" role="list">
              {OPENINGS.roles.map((role, i) => (
                <article
                  key={role.id}
                  className="cr-role-row"
                  role="listitem"
                  style={{ "--i": i } as CSSProperties}
                >
                  {/* Left: dept badge + title */}
                  <div className="cr-role-left">
                    <span className="cr-role-dept">{role.dept}</span>
                    <h3 className="cr-role-title">{role.title}</h3>
                  </div>

                  {/* Mid: meta + tags */}
                  <div className="cr-role-mid">
                    <div className="cr-role-meta">
                      <span className="cr-role-meta-item">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3"/>
                          <path d="M6 12C6 12 2 8.5 2 5a4 4 0 0 1 8 0c0 3.5-4 7-4 7Z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
                        </svg>
                        {role.location}
                      </span>
                      <span className="cr-role-dot" aria-hidden />
                      <span className="cr-role-meta-item">{role.type}</span>
                    </div>
                    <div className="cr-role-tags" aria-label="Required skills">
                      {role.tags.map((tag) => (
                        <span key={tag} className="cr-role-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Right: blurb + CTA */}
                  <div className="cr-role-right">
                    <p className="cr-role-blurb">{role.blurb}</p>
                    <a
                      href={`/careers/${role.id}`}
                      className="cr-role-cta"
                      aria-label={`Apply for ${role.title}`}
                    >
                      <span>Apply</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                        <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {/* Bottom note */}
            <p className="cr-roles-footnote">
              Don&apos;t see your role?{" "}
              <a href="mailto:careers@techbinaries.com" className="cr-roles-footnote-link">
                Send us your CV anyway.
              </a>{" "}
              We keep good people on file.
            </p>
          </div>
        </section>

        <SiteFooter />
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════════════
           DESIGN TOKENS
        ═══════════════════════════════════════════════════════════════ */
        .cr-h2 {
          font-family: var(--font-display);
          font-size: clamp(34px, 4.6vw, 64px);
          font-weight: 500;
          letter-spacing: -0.034em;
          line-height: 1.02;
          margin: 18px 0 18px;
          max-width: 780px;
        }
        .cr-h2--light { color: #fafaf9; max-width: 820px; }
        .cr-italic-mute {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.5);
        }
        .cr-italic-light {
          font-style: italic;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
        }
        .cr-h2-lead {
          font-size: 16px;
          color: rgba(10,10,10,0.62);
          line-height: 1.7;
          margin: 0;
          max-width: 580px;
        }
        .cr-h2-lead--light {
          color: rgba(255,255,255,0.62);
          max-width: 580px;
        }
        .cr-section-head {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: clamp(48px, 6vw, 80px);
        }
        .cr-section-head--light .cr-h2 { color: #fafaf9; }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 1 — HERO
        ═══════════════════════════════════════════════════════════════ */
        .cr-hero {
          position: relative;
          min-height: 100vh;
          padding: clamp(252px, 26.5vh, 304px) 20px 96px;
          background: #0a0a0a;
          color: #fafaf9;
          overflow: hidden;
          isolation: isolate;
        }
        .cr-hero-bg {
          position: absolute;
          inset: -10% 0 0 0;
          height: 110%;
          z-index: 0;
          will-change: transform;
        }
        .cr-hero-bg picture { display: block; position: relative; width: 100%; height: 100%; }
        .cr-hero-bg picture > span { display: block !important; width: 100%; height: 100%; }
        .cr-hero-photo { object-fit: cover; object-position: center 30%; }
        .cr-hero-bg-overlay {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background:
            linear-gradient(180deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.85) 100%),
            linear-gradient(90deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.2) 60%, rgba(10,10,10,0.1) 100%);
        }
        .cr-hero-bg-vignette {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background: radial-gradient(ellipse 70% 60% at 25% 40%, rgba(255,255,255,0.04) 0%, transparent 70%);
          mix-blend-mode: screen;
        }
        .cr-hero-inner {
          position: relative; z-index: 2; max-width: 1320px; margin: 0 auto;
          display: flex; flex-direction: column; height: 100%;
        }
        .cr-hero-meta {
          display: flex; align-items: center; gap: 14px;
          margin-bottom: clamp(40px, 7vw, 80px);
          font-family: var(--font-mono); font-size: 11px; font-weight: 500;
          letter-spacing: 0.14em; text-transform: uppercase;
        }
        .cr-hero-meta--layout-only { visibility: hidden; pointer-events: none; user-select: none; }
        .cr-hero-meta--layout-only .cr-hero-bin-dot { animation: none; }
        .cr-hero-bin {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 6px 12px;
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px; color: #fafaf9;
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        }
        .cr-hero-bin-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.18);
          animation: cr-pulse 1.8s ease-in-out infinite;
        }
        @keyframes cr-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(22,163,74,0.18); }
          50% { box-shadow: 0 0 0 6px rgba(22,163,74,0.05); }
        }
        .cr-hero-index { color: rgba(255,255,255,0.55); }
        .cr-hero-title {
          font-family: var(--font-display);
          font-size: clamp(36px, 6.1vw, 94px);
          font-weight: 400;
          letter-spacing: -0.058em;
          word-spacing: -0.14em;
          line-height: 0.88;
          margin: 0 0 clamp(36px, 5vw, 64px);
          color: #fff;
          text-shadow: 0 12px 40px rgba(0,0,0,0.4);
          max-width: 1100px;
        }
        .cr-hero-line {
          display: flex; flex-wrap: wrap; align-items: baseline; gap: 0;
          padding-bottom: 0.02em; overflow: visible;
        }
        .cr-hero-char { display: inline-block; letter-spacing: -0.022em; will-change: transform, opacity; }
        .cr-hero-italic {
          font-style: italic; font-weight: 300; color: rgba(255,255,255,0.96);
          display: inline-flex; flex-wrap: wrap; align-items: baseline; gap: 0;
          padding: 0 0.06em;
          background: rgba(255,255,255,0.06); border-radius: 0.14em;
          backdrop-filter: blur(2px);
        }
        .cr-hero-bottom {
          display: grid; grid-template-columns: 1.05fr 1fr;
          gap: clamp(40px, 5vw, 96px); align-items: end; max-width: 1240px;
        }
        .cr-hero-lead {
          font-size: clamp(15px, 1.2vw, 17px); line-height: 1.72;
          color: rgba(255,255,255,0.78); margin: 0; max-width: 520px;
          text-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .cr-hero-pull {
          margin: 0; padding: 24px 28px 26px;
          border-left: 2px solid #fafaf9;
          background: rgba(255,255,255,0.04); border-radius: 0 12px 12px 0;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          position: relative; max-width: 520px;
        }
        .cr-hero-pull p {
          font-family: var(--font-display);
          font-size: clamp(17px, 1.6vw, 22px); font-weight: 500;
          letter-spacing: -0.02em; line-height: 1.32; color: #fafaf9; margin: 0;
        }
        .cr-hero-pull-mark {
          position: absolute; top: 14px; right: 18px;
          font-family: var(--font-mono); font-size: 18px;
          color: rgba(255,255,255,0.3); line-height: 1;
        }
        .cr-ticker {
          position: absolute; left: 0; right: 0; bottom: 0; z-index: 2;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255,255,255,0.08);
          overflow: hidden; height: 56px; display: flex; align-items: center;
        }
        .cr-ticker-track { display: flex; will-change: transform; }
        .cr-ticker-set { display: flex; flex-shrink: 0; }
        .cr-ticker-item {
          display: inline-flex; align-items: center; gap: 22px; padding: 0 22px;
          font-family: var(--font-display); font-size: clamp(14px, 1.4vw, 18px);
          font-weight: 500; letter-spacing: -0.018em;
          color: rgba(255,255,255,0.85); white-space: nowrap;
        }
        .cr-ticker-dot { font-size: 5px; color: rgba(255,255,255,0.4); line-height: 1; }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 2 — FILTER
        ═══════════════════════════════════════════════════════════════ */
        .cr-filter {
          padding: clamp(72px, 9vw, 120px) 20px;
          background: #fafaf9;
          border-top: 1px solid rgba(10,10,10,0.06);
        }
        .cr-filter-inner { max-width: 1180px; margin: 0 auto; }
        .cr-filter-table {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0;
          border-top: 1px solid rgba(10,10,10,0.12);
          border-bottom: 1px solid rgba(10,10,10,0.12);
          position: relative;
        }
        .cr-filter-table::before {
          content: ""; position: absolute; top: 0; bottom: 0; left: 50%;
          width: 1px; background: rgba(10,10,10,0.08); pointer-events: none;
        }
        .cr-filter-thead { display: contents; }
        .cr-filter-th {
          display: flex; align-items: center; gap: 10px;
          padding: 18px clamp(20px, 3vw, 36px);
          border-bottom: 1px solid rgba(10,10,10,0.08);
          background: rgba(10,10,10,0.015);
        }
        .cr-filter-th-icon {
          width: 24px; height: 24px; flex-shrink: 0;
          display: inline-flex; align-items: center; justify-content: center;
          border-radius: 7px; border: 1px solid;
        }
        .cr-filter-th--yes .cr-filter-th-icon {
          color: #16a34a; background: rgba(22,163,74,0.08); border-color: rgba(22,163,74,0.22);
        }
        .cr-filter-th--no .cr-filter-th-icon {
          color: rgba(10,10,10,0.5); background: rgba(10,10,10,0.04); border-color: rgba(10,10,10,0.14);
        }
        .cr-filter-th-label {
          font-family: var(--font-mono); font-size: 11px; font-weight: 600;
          letter-spacing: 0.16em; text-transform: uppercase; color: #0a0a0a;
        }
        .cr-filter-th--no .cr-filter-th-label { color: rgba(10,10,10,0.55); }
        .cr-filter-tbody { display: contents; }
        .cr-filter-row { display: contents; }
        .cr-filter-cell {
          display: grid; grid-template-columns: 18px 1fr; gap: 14px;
          align-items: start; padding: 18px clamp(20px, 3vw, 36px);
          border-bottom: 1px solid rgba(10,10,10,0.06);
          will-change: opacity, transform;
        }
        .cr-filter-row:last-child .cr-filter-cell { border-bottom: 0; }
        .cr-filter-cell-bullet {
          width: 6px; height: 6px; border-radius: 50%; margin-top: 8px;
        }
        .cr-filter-cell--yes .cr-filter-cell-bullet {
          background: #16a34a; box-shadow: 0 0 0 3px rgba(22,163,74,0.15);
        }
        .cr-filter-cell--no .cr-filter-cell-bullet { background: rgba(10,10,10,0.3); }
        .cr-filter-cell-text {
          font-family: var(--font-display); font-size: clamp(14.5px, 1.05vw, 16px);
          font-weight: 500; letter-spacing: -0.01em; line-height: 1.5; color: #0a0a0a;
        }
        .cr-filter-cell--no .cr-filter-cell-text { color: rgba(10,10,10,0.55); }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 3 — DNA STANDARD
           Full-width pinned card scroll. Cards are large, cinematic.
        ═══════════════════════════════════════════════════════════════ */
        .cr-dna {
          background: #0a0a0a;
          color: #fafaf9;
          position: relative;
          overflow: hidden;
        }

        .cr-dna-stage {
          position: relative;
          z-index: 1;
          height: 100vh;
          min-height: 640px;
          display: flex;
          align-items: stretch;
          overflow: hidden;
        }

        /* Subtle grid texture */
        .cr-dna-stage::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 90% at 50% 30%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 90% at 50% 30%, black 30%, transparent 100%);
        }

        /* Custom ring follows pointer; 0–100% = full pinned “standard” scroll (desktop fine pointer) */
        @media (min-width: 1101px) and (hover: hover) and (pointer: fine) {
          .cr-dna-stage,
          .cr-dna-stage * {
            cursor: none !important;
          }
        }
        .cr-dna-cursor-ring {
          position: fixed;
          left: 0;
          top: 0;
          width: 56px;
          height: 56px;
          margin: 0;
          padding: 0;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: opacity 0.14s ease;
        }
        .cr-dna-cursor-ring[data-visible="true"] {
          opacity: 1;
        }
        .cr-dna-cursor-ring-inner {
          position: relative;
          width: 56px;
          height: 56px;
        }
        .cr-dna-cursor-ring-svg {
          display: block;
          filter: drop-shadow(0 4px 16px rgba(0, 0, 0, 0.55));
        }
        .cr-dna-cursor-ring-pct {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.02em;
          color: #fafaf9;
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }
        @media (max-width: 1100px) {
          .cr-dna-cursor-ring {
            display: none !important;
          }
        }

        .cr-dna-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: clamp(88px, 11vh, 128px) clamp(20px, 4vw, 56px) clamp(52px, 7vh, 80px);
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3vh, 44px);
        }

        /* Title + lead: inline baseline on desktop */
        .cr-dna-header {
          flex-shrink: 0;
          margin-bottom: 0;
          flex-direction: row;
          flex-wrap: wrap;
          align-items: baseline;
          column-gap: clamp(12px, 2vw, 28px);
          row-gap: 8px;
        }
        .cr-dna-header .cr-h2 {
          font-size: clamp(28px, 3.2vw, 46px);
          margin: 0;
          flex: 0 0 auto;
          max-width: none;
          width: max-content;
          line-height: 1.05;
        }
        .cr-dna-header-lead {
          font-size: 14.5px;
          line-height: 1.35;
          margin: 0;
          flex: 0 1 auto;
          min-width: 0;
          max-width: min(52ch, 100%);
          transform: translateY(calc(-0.18em - 2px));
        }
        @media (min-width: 1101px) {
          .cr-dna-header { width: 100%; }
          .cr-dna-header-lead { margin-left: auto; }
          /* Pinned desktop: tiny bit more air above title + lead (was too much at 108–172px) */
          .cr-dna-inner {
            padding-top: clamp(96px, 11.8vh, 138px);
          }
          /* Inset the DNA card + progress — narrower / shorter than full-bleed */
          .cr-dna-card-stage {
            padding-block: clamp(18px, 2.4vh, 36px);
          }
          .cr-dna-cards-layer {
            width: calc(100% - clamp(56px, 7vw, 112px));
            margin-inline: auto;
          }
          .cr-dna-progress-strip {
            width: calc(100% - clamp(56px, 7vw, 112px));
            margin-inline: auto;
            box-sizing: border-box;
          }
        }

        /* Full-width card stage — the heart of the section */
        .cr-dna-card-stage {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
          display: flex;
          flex-direction: column;
        }

        /* Cards layer — absolutely stacked */
        .cr-dna-cards-layer {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
          overflow: hidden;
          border-radius: 20px;
          /* Perspective on container for 3D children */
          perspective: 1400px;
          perspective-origin: 50% 40%;
          transform-style: preserve-3d;
        }

        /* Individual full-width card */
        .cr-dna-full-card {
          position: absolute;
          inset: 0;
          display: grid;
          /* Image: 58% | Copy: 42% */
          grid-template-columns: 1.38fr 1fr;
          border-radius: 20px;
          overflow: hidden;
          will-change: transform, opacity, filter;
          transform-style: preserve-3d;
          /* Glass card border */
          border: 1px solid rgba(255,255,255,0.09);
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.5) inset,
            0 40px 100px -30px rgba(0,0,0,0.85),
            0 8px 32px -8px rgba(0,0,0,0.6);
        }

        /* Image panel */
        .cr-dna-full-card-img-wrap {
          position: relative;
          overflow: hidden;
          will-change: transform;
        }
        .cr-dna-full-card-img {
          object-fit: cover;
          transition: transform 8s ease;
        }
        .cr-dna-full-card:hover .cr-dna-full-card-img {
          transform: scale(1.03);
        }
        .cr-dna-full-card-img-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, transparent 55%, rgba(10,10,12,0.92) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.45) 100%);
        }

        /* Copy panel */
        .cr-dna-full-card-copy {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(16px, 2.2vh, 28px);
          padding: clamp(32px, 5vh, 60px) clamp(28px, 4vw, 56px);
          background:
            linear-gradient(
              148deg,
              rgba(14,14,16,0.97) 0%,
              rgba(10,10,12,0.99) 100%
            );
          overflow: hidden;
        }

        /* Sheen on copy panel */
        .cr-dna-full-card-copy::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          pointer-events: none;
        }

        .cr-dna-full-card-kicker {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: clamp(9px, 0.72vw, 11px);
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          padding: 6px 12px;
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          width: fit-content;
        }

        .cr-dna-full-card-head {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.4vw, 54px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1.02;
          color: #fafaf9;
          margin: 0;
        }

        .cr-dna-full-card-rule {
          width: 48px;
          height: 1px;
          background: rgba(255,255,255,0.22);
          border-radius: 999px;
        }

        .cr-dna-full-card-body {
          font-size: clamp(14px, 1.1vw, 17px);
          line-height: 1.72;
          color: rgba(255,255,255,0.65);
          margin: 0;
          max-width: 38ch;
        }

        .cr-dna-full-card-roman-wrap {
          margin-top: auto;
        }
        .cr-dna-full-card-roman {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(52px, 8vw, 110px);
          font-weight: 400;
          letter-spacing: -0.03em;
          line-height: 0.85;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,0.1);
          display: block;
          user-select: none;
        }

        /* Progress strip — bottom of card stage */
        .cr-dna-progress-strip {
          display: flex;
          align-items: center;
          gap: 16px;
          padding-top: clamp(14px, 2vh, 22px);
          flex-shrink: 0;
        }
        .cr-dna-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cr-dna-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          transition: background 0.4s ease, transform 0.4s ease, width 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .cr-dna-dot[data-active="true"] {
          background: #fafaf9;
          width: 22px;
          border-radius: 999px;
          transform: none;
        }
        .cr-dna-counter {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.45);
          display: flex;
          align-items: center;
          gap: 5px;
          margin-left: auto;
        }
        .cr-dna-counter-num { color: #fafaf9; }
        .cr-dna-counter-sep { opacity: 0.4; }
        .cr-dna-progress-bar {
          width: 80px;
          height: 1px;
          background: rgba(255,255,255,0.12);
          border-radius: 999px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cr-dna-progress-fill {
          height: 100%;
          background: #fafaf9;
          border-radius: 999px;
          transition: width 0.6s cubic-bezier(0.22,1,0.36,1);
        }

        /* Hide mobile list on desktop */
        .cr-dna-mobile-list { display: none; }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 4 — LIFE
        ═══════════════════════════════════════════════════════════════ */
        .cr-life {
          padding: clamp(96px, 12vw, 160px) 20px;
          background: #f5f5f4;
          border-top: 1px solid rgba(10,10,10,0.06);
          overflow-x: clip;
        }
        .cr-life-inner { max-width: 1320px; margin: 0 auto; }
        .cr-life-grid { display: flex; flex-direction: column; gap: clamp(48px, 7vw, 96px); }
        .cr-life-item {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
        }
        .cr-life-item[data-side="R"] { grid-template-columns: 1fr 1.05fr; }
        .cr-life-item[data-side="R"] .cr-life-visual { order: 2; }
        .cr-life-item[data-side="R"] .cr-life-body { order: 1; }
        .cr-life-visual {
          position: relative; aspect-ratio: 4 / 3;
          border-radius: clamp(16px, 1.8vw, 22px);
          overflow: hidden; background: #0a0a0a;
          box-shadow: 0 30px 80px -40px rgba(10,10,10,0.4);
        }
        .cr-life-img {
          width: 100%; height: 100%; object-fit: cover;
          filter: saturate(1.04) contrast(1.04);
          transition: transform 1.2s cubic-bezier(0.22,1,0.36,1);
        }
        .cr-life-item:hover .cr-life-img { transform: scale(1.05); }
        .cr-life-visual-overlay {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(180deg, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.4) 100%);
        }
        .cr-life-body { display: flex; flex-direction: column; gap: 16px; max-width: 520px; }
        .cr-life-h {
          font-family: var(--font-display);
          font-size: clamp(24px, 2.8vw, 38px);
          font-weight: 500; letter-spacing: -0.028em; line-height: 1.1;
          margin: 0; color: #0a0a0a;
        }
        .cr-life-d {
          font-size: clamp(14.5px, 1.05vw, 16.5px);
          line-height: 1.7; color: rgba(10,10,10,0.62); margin: 0;
        }

        /* ═══════════════════════════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .cr-hero-bottom { grid-template-columns: 1fr; gap: 32px; }
          .cr-hero-pull { max-width: 100%; }
          .cr-filter-th { padding: 14px 18px; }
          .cr-filter-cell { padding: 16px 18px; }

          /* DNA: release pin, show mobile list */
          .cr-dna-stage {
            height: auto;
            min-height: 0;
            overflow: visible;
          }
          .cr-dna-stage::before { display: none; }
          .cr-dna-inner {
            padding: clamp(72px, 9vw, 112px) 20px clamp(56px, 7vw, 88px);
            gap: clamp(32px, 5vw, 52px);
          }
          .cr-dna-header .cr-h2 { font-size: clamp(34px, 4.6vw, 52px); width: auto; max-width: 100%; }
          .cr-dna-header-lead { font-size: 16px; line-height: 1.7; min-width: 0; max-width: none; }
          .cr-dna-card-stage { display: none; }

          .cr-dna-mobile-list {
            display: flex;
            flex-direction: column;
            gap: 14px;
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .cr-dna-mobile-card {
            position: relative;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            background: rgba(12,12,14,0.65);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
          .cr-dna-mobile-visual { position: relative; width: 100%; aspect-ratio: 16 / 10; flex-shrink: 0; }
          .cr-dna-mobile-img { object-fit: cover; }
          .cr-dna-mobile-overlay {
            position: absolute; inset: 0; pointer-events: none;
            background: linear-gradient(180deg, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.55) 100%);
          }
          .cr-dna-mobile-kicker-tag {
            position: absolute; left: 14px; bottom: 12px; right: 56px; z-index: 1;
            font-family: var(--font-mono); font-size: 9px; font-weight: 700;
            letter-spacing: 0.16em; text-transform: uppercase;
            color: rgba(250,250,249,0.92); text-shadow: 0 1px 12px rgba(0,0,0,0.85);
          }
          .cr-dna-mobile-roman {
            position: absolute; right: 12px; top: 12px; z-index: 1;
            font-family: var(--font-mono); font-size: 13px; font-weight: 600;
            letter-spacing: 0.1em; color: #fafaf9;
            padding: 6px 10px; border: 1px solid rgba(255,255,255,0.28);
            border-radius: 8px; background: rgba(0,0,0,0.42);
            backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
          }
          .cr-dna-mobile-text { padding: 22px 26px 26px; display: flex; flex-direction: column; gap: 12px; }
          .cr-dna-mobile-head {
            font-family: var(--font-display); font-size: clamp(22px, 3vw, 28px);
            font-weight: 500; letter-spacing: -0.028em; line-height: 1.12;
            margin: 0; color: #fafaf9;
          }
          .cr-dna-mobile-body { font-size: 14.5px; line-height: 1.7; color: rgba(255,255,255,0.65); margin: 0; }

          .cr-life-item, .cr-life-item[data-side="R"] { grid-template-columns: 1fr; gap: 28px; }
          .cr-life-item[data-side="R"] .cr-life-visual { order: 0; }
          .cr-life-item[data-side="R"] .cr-life-body { order: 1; }
        }

        @media (max-width: 768px) {
          .cr-hero { padding: clamp(204px, 25svh, 226px) 14px 92px; min-height: 100svh; }
          .cr-hero-meta { margin-bottom: 32px; gap: 10px; }
          .cr-hero-bin { font-size: 10px; padding: 5px 10px; }
          .cr-hero-index { font-size: 10px; }
          .cr-hero-title { font-size: clamp(27px, 9.1vw, 44px); line-height: 0.98; margin-bottom: 32px; }
          .cr-hero-bottom { gap: 24px; }
          .cr-hero-lead { font-size: 14.5px; line-height: 1.65; }
          .cr-hero-pull { padding: 18px 22px 20px; border-radius: 0 10px 10px 0; }
          .cr-hero-pull p { font-size: 16px; line-height: 1.4; }
          .cr-ticker { height: 48px; }
          .cr-ticker-item { font-size: 13px; padding: 0 16px; gap: 16px; }

          .cr-filter, .cr-dna, .cr-life { padding-left: 14px; padding-right: 14px; }
          .cr-h2 { font-size: clamp(28px, 8vw, 44px); margin-top: 14px; }
          .cr-h2-lead { font-size: 14.5px; line-height: 1.65; }

          .cr-filter-table { grid-template-columns: 1fr; }
          .cr-filter-table::before { display: none; }
          .cr-filter-th { padding: 14px 16px; }
          .cr-filter-cell { padding: 14px 16px; grid-template-columns: 14px 1fr; gap: 12px; }
          .cr-filter-cell-text { font-size: 14px; }

          .cr-dna-inner { padding: 60px 14px 52px; }
          .cr-dna-mobile-card { border-radius: 14px; }
          .cr-dna-mobile-visual { aspect-ratio: 16 / 11; }
          .cr-dna-mobile-text { padding: 18px 18px 22px; gap: 10px; }
          .cr-dna-mobile-head { font-size: 20px; }
          .cr-dna-mobile-body { font-size: 13.5px; }

          .cr-life-grid { gap: 56px; }
          .cr-life-visual { aspect-ratio: 16 / 11; border-radius: 14px; }
          .cr-life-body { gap: 12px; }
          .cr-life-h { font-size: 22px; }
          .cr-life-d { font-size: 14px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .cr-ticker-track { animation: none !important; }
          .cr-life-img { transition: none; }
          .cr-life-item:hover .cr-life-img { transform: none; }
          .cr-hero-bin-dot { animation: none; }
          .cr-dna-full-card { transition: none !important; }
          .cr-dna-progress-fill { transition: none; }
          .cr-dna-cursor-ring {
            display: none !important;
          }
          .cr-dna-stage,
          .cr-dna-stage * {
            cursor: revert !important;
          }
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 5 — OPEN ROLES
        ═══════════════════════════════════════════════════════════════ */
        .cr-roles {
          padding: clamp(96px, 12vw, 160px) 20px;
          background: #fafaf9;
          border-top: 1px solid rgba(10,10,10,0.06);
        }
        .cr-roles-inner { max-width: 1180px; margin: 0 auto; }

        .cr-roles-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(10,10,10,0.1);
        }

        .cr-role-row {
          display: grid;
          grid-template-columns: 1.1fr 1fr 1.2fr;
          gap: clamp(24px, 3vw, 48px);
          align-items: center;
          padding: clamp(28px, 3.5vw, 40px) 0;
          border-bottom: 1px solid rgba(10,10,10,0.08);
          transition: background 0.2s ease;
          position: relative;
        }
        .cr-role-row::before {
          content: "";
          position: absolute;
          inset: 0 -20px;
          border-radius: 12px;
          background: rgba(10,10,10,0.025);
          opacity: 0;
          transition: opacity 0.2s ease;
          pointer-events: none;
        }
        .cr-role-row:hover::before { opacity: 1; }

        /* Left */
        .cr-role-left { display: flex; flex-direction: column; gap: 8px; }
        .cr-role-dept {
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.4);
        }
        .cr-role-title {
          font-family: var(--font-display);
          font-size: clamp(17px, 1.5vw, 22px);
          font-weight: 500;
          letter-spacing: -0.022em;
          line-height: 1.15;
          color: #0a0a0a;
          margin: 0;
        }

        /* Mid */
        .cr-role-mid { display: flex; flex-direction: column; gap: 12px; }
        .cr-role-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .cr-role-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: rgba(10,10,10,0.55);
          font-weight: 400;
        }
        .cr-role-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(10,10,10,0.25); flex-shrink: 0;
        }
        .cr-role-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .cr-role-tag {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.06em;
          padding: 4px 9px;
          border-radius: 6px;
          background: rgba(10,10,10,0.05);
          border: 1px solid rgba(10,10,10,0.09);
          color: rgba(10,10,10,0.6);
        }

        /* Right */
        .cr-role-right {
          display: flex;
          flex-direction: column;
          gap: 18px;
          align-items: flex-start;
        }
        .cr-role-blurb {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(10,10,10,0.58);
          margin: 0;
          max-width: 38ch;
        }
        .cr-role-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #0a0a0a;
          text-decoration: none;
          padding: 9px 18px;
          border: 1px solid rgba(10,10,10,0.18);
          border-radius: 999px;
          transition: background 0.18s ease, border-color 0.18s ease, gap 0.18s ease;
          white-space: nowrap;
        }
        .cr-role-cta:hover {
          background: #0a0a0a;
          border-color: #0a0a0a;
          color: #fafaf9;
          gap: 10px;
        }
        .cr-role-cta:hover svg { color: #fafaf9; }

        /* Footnote */
        .cr-roles-footnote {
          margin-top: clamp(40px, 5vw, 64px);
          font-size: 14px;
          color: rgba(10,10,10,0.45);
          text-align: center;
        }
        .cr-roles-footnote-link {
          color: #0a0a0a;
          text-decoration: underline;
          text-underline-offset: 3px;
          text-decoration-color: rgba(10,10,10,0.3);
          transition: text-decoration-color 0.15s ease;
        }
        .cr-roles-footnote-link:hover {
          text-decoration-color: #0a0a0a;
        }

        /* Responsive — roles */
        @media (max-width: 1100px) {
          .cr-role-row {
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
          }
          .cr-role-left { grid-column: 1 / 2; }
          .cr-role-mid { grid-column: 2 / 3; }
          .cr-role-right { grid-column: 1 / -1; padding-top: 4px; flex-direction: row; align-items: center; }
          .cr-role-blurb { flex: 1; }
          .cr-role-cta { flex-shrink: 0; }
        }
        @media (max-width: 768px) {
          .cr-roles { padding-left: 14px; padding-right: 14px; }
          .cr-role-row {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            gap: 16px;
            padding: 24px 0;
          }
          .cr-role-left { grid-column: auto; }
          .cr-role-mid { grid-column: auto; }
          .cr-role-right {
            grid-column: auto;
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
          .cr-role-row::before { inset: 0 -14px; }
        }
      `}</style>
    </>
  );
}