

//version 5
//version 5 — based on user's version 4 with three updates:
//  Task 1: Mobile responsiveness for "growth engine" pinned section
//  Task 2: Custom progress-ring cursor for the pinned scroll-jacking
//  Task 3: New minimal final CTA design (replaces landing-page-style block)

// Custom Web Application Development — Premium sub-service template
// Reusable layout: replace DATA constants for other sub-services.
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SERVICE_CATEGORIES } from "@/data/serviceCategories";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────────

const PAGE = {
  headline1: "Web apps",
  headline2: "engineered for",
  headlineItalic: "performance.",
  lead:
    "Production-grade web applications built on modern stacks — Next.js, React, Node, Postgres — tuned for speed, resilience, and architecture that won't need a rewrite in two years.",
};

const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
];

const GROWTH = {
  kicker: "Why custom",
  title: "A custom web app is a",
  titleAccent: "growth engine.",
  lead:
    "Off-the-shelf software flattens you against competitors. A purpose-built web application becomes the operational backbone — faster to evolve, cheaper to scale, aligned to how your business actually works.",
  pillars: [
    {
      n: "01",
      k: "Speed",
      v: "Sub-second load",
      d: "Edge-rendered pages, optimized bundles, and runtime budgets keep first interaction under a second on real devices.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Performance metrics dashboard showing fast load times",
    },
    {
      n: "02",
      k: "Scale",
      v: "10× headroom",
      d: "Stateless services, queue-backed workers, and observability from day one. Traffic spikes don't become incidents.",
      image:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Server infrastructure visualization showing distributed scale",
    },
    {
      n: "03",
      k: "Ownership",
      v: "Your code, your IP",
      d: "Full source, infrastructure, credentials transfer to you. No vendor lock-in, no licensing tax, no surprises at renewal.",
      image:
        "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "Source code on a developer's monitor representing code ownership",
    },
    {
      n: "04",
      k: "Velocity",
      v: "Weekly releases",
      d: "Feature-flagged deploys and CI/CD pipelines let your team ship to production every week without rollout anxiety.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&auto=format&fit=crop",
      imageAlt: "CI/CD pipeline and code deployment workflow",
    },
  ],
};

const COST = {
  image:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=80&auto=format&fit=crop",
  imageAlt:
    "Product owner reviewing web analytics and KPIs on a laptop after shipping a web application",
  kicker: "What goes wrong",
  title: "The cost of getting it",
  titleAccent: "wrong.",
  lead:
    "Most failed web apps don't fail at launch — they fail in the first 90 days. The pattern is consistent and almost always preventable.",
  failures: [
    {
      stat: "53%",
      label: "Bounce above 3s",
      h: "Bloated bundles",
      d: "Megabytes of unused JavaScript collapse mobile performance and quietly kill conversion on slower networks.",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Developer building a web application with HTML and JavaScript visible on a laptop screen",
      theme: "perf",
    },
    {
      stat: "4.2×",
      label: "Slower velocity",
      h: "Brittle architecture",
      d: "Tightly coupled services and shared databases turn every new feature into a coordination tax.",
      image:
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Engineering team collaborating on architecture and APIs for a web platform",
      theme: "arch",
    },
    {
      stat: "67%",
      label: "Bugs found by users",
      h: "Missing observability",
      d: "Without structured logs, traces, and RUM, you discover regressions from customer tickets — not dashboards.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Monitoring dashboard with charts for uptime and errors on a live web service",
      theme: "obs",
    },
    {
      stat: "26%",
      label: "Excluded users",
      h: "No accessibility",
      d: "Skipping WCAG and keyboard support narrows your audience and makes refactors dramatically more expensive.",
      image:
        "https://images.unsplash.com/photo-1574887427561-d3d5d58c9273?w=900&q=80&auto=format&fit=crop",
      imageAlt:
        "Person using a refreshable braille display—assistive technology for accessing web and digital content",
      theme: "a11y",
    },
  ],
  close:
    "We engineer around every one of these failure modes — performance, architecture, observability, accessibility — as defaults, not upsells.",
};

const PROCESS = [
  { num: "01", title: "Discovery & architecture",  d: "Stakeholder interviews, technical audit, written architecture brief.",   meta: "2 weeks · fixed price" },
  { num: "02", title: "UX & interface design",      d: "Flows, wireframes, high-fidelity UI tied to a token-based design system.", meta: "2–4 weeks"            },
  { num: "03", title: "Engineering sprints",        d: "Two-week sprints, weekly demos, CI/CD from day one. Working software every Friday.", meta: "8–16 weeks"   },
  { num: "04", title: "QA & performance",           d: "Automated suites, cross-device QA, Lighthouse budgets, load testing before traffic.", meta: "Continuous" },
  { num: "05", title: "Launch & monitor",           d: "Phased rollout with feature flags, real-user monitoring, rollback plan written before go-live.", meta: "1–2 weeks" },
  { num: "06", title: "Iterate & support",          d: "SLA-backed retainer covering bug fixes, security patches, roadmap work.", meta: "Ongoing"               },
];

const STACK = [
  { group: "Frontend", items: [
    { name: "Next.js",    v: "15.x", role: "App framework"     },
    { name: "React",      v: "19",   role: "UI library"        },
    { name: "TypeScript", v: "5.x",  role: "Type system"       },
    { name: "Tailwind",   v: "4.x",  role: "Styling"           },
  ]},
  { group: "Backend", items: [
    { name: "Node.js",    v: "22 LTS", role: "Runtime"         },
    { name: "Python",     v: "3.12",   role: "Services / ML"   },
    { name: "Go",         v: "1.23",   role: "High-throughput" },
    { name: "GraphQL",    v: "—",      role: "API contract"    },
  ]},
  { group: "Data", items: [
    { name: "PostgreSQL", v: "17",  role: "Primary store"    },
    { name: "Redis",      v: "7.x", role: "Cache · queues"   },
    { name: "Elasticsearch", v: "8.x", role: "Search"        },
    { name: "S3",         v: "—",   role: "Object storage"   },
  ]},
  { group: "Infra", items: [
    { name: "AWS",        v: "—",   role: "Primary cloud"    },
    { name: "GCP",        v: "—",   role: "Alt cloud"        },
    { name: "Docker",     v: "—",   role: "Containers"       },
    { name: "Terraform",  v: "1.x", role: "IaC"              },
  ]},
];

const FAQS = [
  { q: "How much does a custom web application cost?", a: "Most builds fall between $40K and $180K depending on scope, integrations, and team size. We provide fixed-price proposals after a paid two-week discovery sprint, so the budget is locked before engineering begins." },
  { q: "How long does it take to build?",              a: "MVPs typically take 8–12 weeks. Full production builds run 14–22 weeks. We share a detailed milestone schedule during proposal, with weekly demos you can hold us to." },
  { q: "What stack do you use?",                       a: "TypeScript end-to-end is our default — React or Next.js on the frontend, Node on the backend, Postgres for data, AWS or GCP for infrastructure. We choose tooling based on your problem, not because it's trendy." },
  { q: "Do you handle design too?",                    a: "Yes. UX flows, wireframes, high-fidelity UI, and a design token system are part of the standard engagement. If you have a design partner already, we plug in cleanly with Figma handoff." },
  { q: "What happens after launch?",                   a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and feature work. Many clients keep us on as a fractional engineering team. All code and infrastructure transfer to you on day one." },
];

// CTA — Task 3: replacement design data
const CTA = {
  // Headline split for animation
  headline: "Let's build the web app",
  headlineItalic: "you actually want.",
  lead:
    "Free 30-minute discovery call. You'll talk directly with an engineer and a strategist — no sales pitch, just a real conversation about your problem and timeline.",
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  email: "hello@techbinaries.com",
  rows: [
    { k: "Response",    v: "Within 24h"      },
    { k: "MVP timeline", v: "8–12 weeks"     },
    { k: "Engagement",  v: "Fixed or T&M"    },
    { k: "Based",       v: "Global · remote" },
  ],
};

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function CustomWebAppPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activePillar, setActivePillar] = useState(0);
  const [activeStack, setActiveStack] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const pillarListRef = useRef<HTMLOListElement | null>(null);

  // Task 2 refs — for the custom progress-ring cursor
  const stageRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorRingRef = useRef<SVGCircleElement | null>(null);
  const cursorIndexRef = useRef<HTMLSpanElement | null>(null);

  const [heroServiceOpen, setHeroServiceOpen] = useState(false);
  const [heroService, setHeroService] = useState<{ href: string; label: string } | null>(null);
  const [heroServiceMenuBox, setHeroServiceMenuBox] = useState<{
    top: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);
  const [isHeroNarrow, setIsHeroNarrow] = useState(false);
  /** Matches hero narrow layout breakpoint (two-line headline, same as parent CSD page). */
  const [isMobile, setIsMobile] = useState(false);
  const heroServiceBtnRef = useRef<HTMLButtonElement>(null);
  const heroServiceMenuRef = useRef<HTMLDivElement>(null);
  const heroServiceSheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsHeroNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const measureHeroServiceMenu = () => {
    const btn = heroServiceBtnRef.current;
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const gap = 4;
    const top = r.bottom + gap;
    const spaceBelow = window.innerHeight - top - 12;
    const maxHeight = Math.min(280, Math.max(120, spaceBelow));
    setHeroServiceMenuBox({ top, left: r.left, width: r.width, maxHeight });
  };

  const openHeroServiceMenu = () => {
    const narrow =
      typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;
    setIsHeroNarrow(narrow);
    if (narrow) {
      setHeroServiceMenuBox(null);
      setHeroServiceOpen(true);
      return;
    }
    measureHeroServiceMenu();
    setHeroServiceOpen(true);
  };

  const closeHeroServiceMenu = () => {
    setHeroServiceOpen(false);
    setHeroServiceMenuBox(null);
  };

  useLayoutEffect(() => {
    if (!heroServiceOpen) return;
    const menu = heroServiceMenuRef.current;
    if (menu) menu.scrollTop = 0;
  }, [heroServiceOpen]);

  useEffect(() => {
    if (!heroServiceOpen || isHeroNarrow) return;
    const onMove = () => measureHeroServiceMenu();
    window.addEventListener("scroll", onMove, true);
    window.addEventListener("resize", onMove);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", onMove);
    vv?.addEventListener("scroll", onMove);
    const lenis = lenisRef.current;
    const offLenis = lenis?.on("scroll", onMove);
    return () => {
      window.removeEventListener("scroll", onMove, true);
      window.removeEventListener("resize", onMove);
      vv?.removeEventListener("resize", onMove);
      vv?.removeEventListener("scroll", onMove);
      offLenis?.();
    };
  }, [heroServiceOpen, isHeroNarrow]);

  useEffect(() => {
    if (!heroServiceOpen || !isHeroNarrow) return;
    const lenis = lenisRef.current;
    lenis?.stop();
    return () => {
      lenis?.start();
    };
  }, [heroServiceOpen, isHeroNarrow]);

  useEffect(() => {
    if (!heroServiceOpen) return;
    if (!isHeroNarrow) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [heroServiceOpen, isHeroNarrow]);

  useEffect(() => {
    if (!heroServiceOpen) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (heroServiceBtnRef.current?.contains(t)) return;
      if (heroServiceMenuRef.current?.contains(t)) return;
      if (heroServiceSheetRef.current?.contains(t)) return;
      closeHeroServiceMenu();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeHeroServiceMenu();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [heroServiceOpen]);

  useEffect(() => {
    if (!heroServiceOpen) return;
    if (isHeroNarrow) {
      setHeroServiceMenuBox(null);
    } else {
      measureHeroServiceMenu();
    }
  }, [isHeroNarrow, heroServiceOpen]);

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

  // Animated counter
  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = gsap.utils.toArray<HTMLElement>(".cwa-count");
      counters.forEach((el) => {
        const target = parseFloat(el.dataset.target || "0");
        const suffix = el.dataset.suffix || "";
        const decimals = parseInt(el.dataset.decimals || "0", 10);
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => {
                el.textContent = obj.v.toFixed(decimals) + suffix;
              },
            });
          },
        });
      });
    });
    return () => ctx.revert();
  }, []);

  // ── PINNED SCROLL-JACKING + PROGRESS-RING CURSOR (TASK 2) ──
  // Desktop only. The .cwa-growth-stage element pins to the viewport.
  // Scroll progress drives:
  //   1) `activePillar` (existing behavior)
  //   2) The progress-ring cursor — visible while pin is active and the user's
  //      cursor is over the stage. The ring shows progress within the *current*
  //      pillar (not total), so it fills, snaps to next, fills again ×4.
  // Mobile falls back to natural scroll with no pin and no cursor (Task 1).
  useEffect(() => {
    const list = pillarListRef.current;
    if (!list) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 1101px) and (hover: hover) and (pointer: fine)",
        isTouchOrSmall: "(max-width: 1100px), (hover: none), (pointer: coarse)",
      },
      (context) => {
        const { isDesktop, isTouchOrSmall } = context.conditions as {
          isDesktop: boolean;
          isTouchOrSmall: boolean;
        };

        // ── DESKTOP: pin + progress-ring cursor ──
        if (isDesktop) {
          const stage = stageRef.current;
          if (!stage) return;

          const rows = gsap.utils.toArray<HTMLElement>(".cwa-pillar-row", list);
          if (!rows.length) return;

          const totalScenes = rows.length;
          const distancePerPillar = 1; // viewport-heights per pillar
          const totalDistance = totalScenes * distancePerPillar;

          // Ring math — circumference for SVG stroke-dashoffset progress
          const ring = cursorRingRef.current;
          const RADIUS = 22;
          const CIRC = 2 * Math.PI * RADIUS;
          if (ring) {
            ring.style.strokeDasharray = `${CIRC}`;
            ring.style.strokeDashoffset = `${CIRC}`;
          }

          // Cursor follow — quickTo for buttery 60fps positioning
          const cursorEl = cursorRef.current;
          let xTo: ((v: number) => void) | null = null;
          let yTo: ((v: number) => void) | null = null;
          if (cursorEl) {
            xTo = gsap.quickTo(cursorEl, "x", { duration: 0.18, ease: "power3.out" });
            yTo = gsap.quickTo(cursorEl, "y", { duration: 0.18, ease: "power3.out" });
          }

          let isInsideStage = false;

          const handleMove = (e: MouseEvent) => {
            if (!cursorEl || !xTo || !yTo) return;
            xTo(e.clientX);
            yTo(e.clientY);
          };
          const handleEnter = () => {
            isInsideStage = true;
            if (cursorEl) cursorEl.setAttribute("data-visible", "true");
          };
          const handleLeave = () => {
            isInsideStage = false;
            if (cursorEl) cursorEl.setAttribute("data-visible", "false");
          };

          stage.addEventListener("mousemove", handleMove);
          stage.addEventListener("mouseenter", handleEnter);
          stage.addEventListener("mouseleave", handleLeave);

          const trigger = ScrollTrigger.create({
            trigger: stage,
            start: "top top",
            end: () => `+=${window.innerHeight * totalDistance}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const raw = self.progress * totalScenes;
              const idx = Math.min(totalScenes - 1, Math.max(0, Math.floor(raw)));
              setActivePillar((prev) => (prev === idx ? prev : idx));

              // Per-pillar progress (0 → 1) for ring fill
              const localProgress = Math.min(1, Math.max(0, raw - idx));
              if (ring) {
                ring.style.strokeDashoffset = `${CIRC * (1 - localProgress)}`;
              }
              if (cursorIndexRef.current) {
                cursorIndexRef.current.textContent = `${String(idx + 1).padStart(2, "0")}/${String(totalScenes).padStart(2, "0")}`;
              }
            },
            onEnter: () => {
              if (cursorEl && isInsideStage) cursorEl.setAttribute("data-visible", "true");
            },
            onLeave: () => {
              if (cursorEl) cursorEl.setAttribute("data-visible", "false");
            },
            onEnterBack: () => {
              if (cursorEl && isInsideStage) cursorEl.setAttribute("data-visible", "true");
            },
            onLeaveBack: () => {
              if (cursorEl) cursorEl.setAttribute("data-visible", "false");
            },
          });

          return () => {
            stage.removeEventListener("mousemove", handleMove);
            stage.removeEventListener("mouseenter", handleEnter);
            stage.removeEventListener("mouseleave", handleLeave);
            trigger.kill();
          };
        }

        // ── MOBILE / TOUCH: natural scroll, no pin, no cursor ──
        if (isTouchOrSmall) {
          const rows = gsap.utils.toArray<HTMLElement>(".cwa-pillar-row", list);
          if (!rows.length) return;

          const trigger = ScrollTrigger.create({
            trigger: list,
            start: "top center",
            end: "bottom center",
            onUpdate: (self) => {
              const idx = Math.min(
                rows.length - 1,
                Math.max(0, Math.floor(self.progress * rows.length))
              );
              setActivePillar((prev) => (prev === idx ? prev : idx));
            },
          });

          return () => {
            trigger.kill();
          };
        }
      }
    );

    return () => mm.revert();
  }, []);

  // Reveal & scroll-linked animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── HERO INTRO ──
      const heroTl = gsap.timeline({ delay: 0.15 });
      const chars = gsap.utils.toArray<HTMLElement>(".cwa-h1-char");
      heroTl.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.9, stagger: { each: 0.018 }, ease: "power4.out" },
        0
      );
      heroTl.fromTo(
        ".cwa-hero-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
        0.55
      );
      heroTl.fromTo(
        ".cwa-hero-copy",
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
        0.3
      );
      heroTl.fromTo(
        ".csd-hero-form-shell",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
        0.4
      );
      heroTl.fromTo(
        ".csd-hero-form-field",
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
        0.7
      );

      // ── SECTION HEADER REVEALS ──
      const setupBatch = (
        selector: string,
        from: gsap.TweenVars,
        to: gsap.TweenVars,
        start = "top 88%"
      ) => {
        const items = gsap.utils.toArray<HTMLElement>(selector);
        if (!items.length) return;
        gsap.set(items, from);
        ScrollTrigger.batch(items, {
          start,
          once: true,
          onEnter: (batch) => gsap.to(batch, { ...to, stagger: 0.08, overwrite: true }),
        });
      };
      setupBatch(".cwa-sh", { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" });
      setupBatch(".cwa-faq-row", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "top 92%");

      // ── COST: scrub-driven stat reveal ──
      gsap.utils.toArray<HTMLElement>(".cwa-fail-card").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
      });

      // ── PROCESS: scrub progress line + numbered reveal ──
      const processSection = document.querySelector<HTMLElement>(".cwa-process-section");
      const processLine = document.querySelector<HTMLElement>(".cwa-process-line-fill");
      if (processSection && processLine) {
        gsap.fromTo(processLine,
          { scaleY: 0 },
          {
            scaleY: 1, ease: "none", transformOrigin: "top center",
            scrollTrigger: {
              trigger: processSection,
              start: "top 60%",
              end: "bottom 60%",
              scrub: 0.5,
            },
          });
      }
      gsap.utils.toArray<HTMLElement>(".cwa-proc-step").forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          });
      });

      // ── STACK reveal ──
      gsap.utils.toArray<HTMLElement>(".cwa-stack-line").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 14 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
            delay: i * 0.04,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
      });

      // ── FINAL CTA (Task 3) — character-split headline + reveal ──
      const ctaChars = gsap.utils.toArray<HTMLElement>(".cwa-ncta-char");
      if (ctaChars.length) {
        gsap.fromTo(ctaChars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0, opacity: 1, duration: 0.9,
            stagger: { each: 0.014 }, ease: "power4.out",
            scrollTrigger: { trigger: ".cwa-ncta", start: "top 75%", once: true },
          });
      }
      gsap.utils.toArray<HTMLElement>(".cwa-ncta-fade").forEach((el, i) => {
        gsap.fromTo(el,
          { opacity: 0, y: 18 },
          {
            opacity: 1, y: 0, duration: 0.75, ease: "power3.out",
            delay: 0.4 + i * 0.08,
            scrollTrigger: { trigger: ".cwa-ncta", start: "top 75%", once: true },
          });
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  const heroServiceOptionNodes = SERVICE_CATEGORIES.map((cat) => (
    <div key={cat.id} className="csd-hero-service-dd-group">
      <div className="csd-hero-service-dd-group-label" aria-hidden>
        {cat.title}
      </div>
      <button
        type="button"
        role="option"
        aria-selected={heroService?.href === cat.href}
        className="csd-hero-service-dd-option"
        onClick={() => {
          setHeroService({ href: cat.href, label: `${cat.title} (overview)` });
          closeHeroServiceMenu();
        }}
      >
        {cat.title} (overview)
      </button>
      {cat.links.map((link) => (
        <button
          key={link.href}
          type="button"
          role="option"
          aria-selected={heroService?.href === link.href}
          className="csd-hero-service-dd-option"
          onClick={() => {
            setHeroService({ href: link.href, label: link.label });
            closeHeroServiceMenu();
          }}
        >
          {link.label}
        </button>
      ))}
    </div>
  ));

  return (
    <>
      {/* Grain overlay */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px", opacity: 0.028, mixBlendMode: "multiply",
        }}
      />

      {/* TASK 2: Progress-ring cursor (desktop only, hidden by default) */}
      <div className="cwa-cursor" ref={cursorRef} aria-hidden data-visible="false">
        <svg className="cwa-cursor-svg" viewBox="0 0 56 56" width="56" height="56">
          <circle
            className="cwa-cursor-track"
            cx="28" cy="28" r="22"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="2"
          />
          <circle
            className="cwa-cursor-ring"
            ref={cursorRingRef}
            cx="28" cy="28" r="22"
            fill="none"
            stroke="#fafaf9"
            strokeWidth="2"
            strokeLinecap="round"
            transform="rotate(-90 28 28)"
          />
        </svg>
        <span className="cwa-cursor-index" ref={cursorIndexRef}>01/04</span>
        <span className="cwa-cursor-dot" aria-hidden />
      </div>

      <div style={{ background: "#fafaf9", color: "#0a0a0a", fontFamily: "var(--font-body)", overflowX: "hidden" }}>
        <SiteHeader />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — HERO
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-hero" aria-labelledby="cwa-hero-title">
          <div className="cwa-hero-video-wrap" aria-hidden>
            <video className="cwa-hero-bg-video" autoPlay muted loop playsInline preload="metadata">
              <source
                src="/videos/services/Custom%20Software%20Development/custom-web-application-development/service-cwad-hero.mp4"
                type="video/mp4"
                media="(min-width: 901px)"
              />
            </video>
            <Image
              className="cwa-hero-mobile-bg"
              src="/images/services/custom-software-development/cwad-service-hero-mobile.jpeg"
              alt=""
              fill
              sizes="100vw"
              decoding="async"
              preload
            />
            <div className="cwa-hero-bg-overlay" />
            <div className="cwa-hero-bg-spotlight" />
          </div>

          <div className="cwa-hero-inner">
            <div className="csd-hero-main">
              <div className="csd-hero-left">
                <div className="csd-hero-mobile-spacer" aria-hidden />
                <div className="cwa-hero-copy">
                  <h1 id="cwa-hero-title" className="cwa-hero-title">
                    <span className="cwa-h1-lines-desktop" aria-hidden={isMobile}>
                      <span className="cwa-h1-line">
                        {PAGE.headline1.split("").map((c, i) => (
                          <span key={`a-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
                        ))}
                      </span>
                      <span className="cwa-h1-line">
                        {PAGE.headline2.split("").map((c, i) => (
                          <span key={`b-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
                        ))}
                      </span>
                      <span className="cwa-h1-line">
                        <span className="cwa-h1-italic">
                          {PAGE.headlineItalic.split("").map((c, i) => (
                            <span key={`c-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
                          ))}
                        </span>
                      </span>
                    </span>
                    <span className="cwa-h1-lines-mobile" aria-hidden={!isMobile}>
                      <span className="cwa-h1-line cwa-h1-line-mobile">
                        {`${PAGE.headline1} engineered`.split("").map((c, i) => (
                          <span key={`m1-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
                        ))}
                      </span>
                      <span className="cwa-h1-line cwa-h1-line-mobile">
                        {"for ".split("").map((c, i) => (
                          <span key={`m2-${i}`} className="cwa-h1-char" style={{ whiteSpace: "pre" }}>{c === " " ? "\u00A0" : c}</span>
                        ))}
                        <span className="cwa-h1-italic">
                          {PAGE.headlineItalic.split("").map((c, i) => (
                            <span key={`m3i-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
                          ))}
                        </span>
                      </span>
                    </span>
                  </h1>

                  <p className="cwa-hero-fade cwa-hero-lead" style={{ opacity: 0 }}>
                    {PAGE.lead}
                  </p>

                  <div className="cwa-hero-fade cwa-hero-cta-row" style={{ opacity: 0 }}>
                    <Link href="/contact" className="csd-cta-primary">
                      <span style={{ position: "relative", zIndex: 2 }}>Plan my build</span>
                      <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="csd-cta-arrow" style={{ position: "relative", zIndex: 2 }}>
                        <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="csd-hero-right">
                <div className="csd-hero-form-shell" style={{ opacity: 0 }}>
                  <h3 className="csd-hero-form-title">Share Your Requirements</h3>
                  <p className="csd-hero-form-subtitle">
                    Tell our experts about your goals and get a tailored consultation plan.
                  </p>

                  <form className="csd-hero-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="csd-hero-form-grid">
                      <label className="csd-hero-form-field">
                        <span>First Name</span>
                        <input
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          autoComplete="given-name"
                        />
                      </label>
                      <label className="csd-hero-form-field">
                        <span>Last Name</span>
                        <input
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          autoComplete="family-name"
                        />
                      </label>
                    </div>

                    <div className="csd-hero-form-grid">
                      <label className="csd-hero-form-field csd-hero-form-field--phone">
                        <span>Contact Number</span>
                        <div className="csd-hero-phone-row">
                          <select
                            className="csd-hero-phone-cc"
                            name="countryCode"
                            aria-label="Country calling code"
                            defaultValue="+92"
                          >
                            {HERO_PHONE_COUNTRY_CODES.map((code) => (
                              <option key={code} value={code}>
                                {code}
                              </option>
                            ))}
                          </select>
                          <span className="csd-hero-phone-sep" aria-hidden />
                          <input
                            className="csd-hero-phone-num"
                            type="tel"
                            name="phoneNational"
                            placeholder="Enter Your Number*"
                            autoComplete="tel-national"
                            aria-label="Phone number"
                            required
                          />
                        </div>
                      </label>
                      <label className="csd-hero-form-field">
                        <span>Work Email</span>
                        <input type="email" placeholder="Enter your email address" />
                      </label>
                    </div>

                    <div className="csd-hero-form-grid">
                      <label className="csd-hero-form-field">
                        <span>Budget Range</span>
                        <select name="budgetRange" defaultValue="">
                          <option value="" disabled>Select a budget range</option>
                          <option value="under-10k">Under $10k</option>
                          <option value="10k-25k">$10k - $25k</option>
                          <option value="25k-50k">$25k - $50k</option>
                          <option value="50k-plus">$50k+</option>
                        </select>
                      </label>
                      <label className="csd-hero-form-field">
                        <span>Services</span>
                        <div className="csd-hero-service-dd">
                          <input
                            type="hidden"
                            name="serviceInterest"
                            value={heroService?.href ?? ""}
                          />
                          <button
                            ref={heroServiceBtnRef}
                            type="button"
                            className={`csd-hero-service-dd-trigger${heroService ? "" : " csd-hero-service-dd-trigger--placeholder"}`}
                            aria-expanded={heroServiceOpen}
                            aria-haspopup="listbox"
                            aria-controls="cwa-hero-service-listbox"
                            id="cwa-hero-service-trigger"
                            aria-label="Service you are interested in"
                            onClick={() =>
                              heroServiceOpen ? closeHeroServiceMenu() : openHeroServiceMenu()
                            }
                          >
                            <span className="csd-hero-service-dd-value">
                              {heroService ? heroService.label : "Select a service"}
                            </span>
                            <span
                              className={`csd-hero-service-dd-chevron${heroServiceOpen ? " csd-hero-service-dd-chevron--open" : ""}`}
                              aria-hidden
                            />
                          </button>
                        </div>
                      </label>
                    </div>

                    <label className="csd-hero-form-field">
                      <span>Describe your project</span>
                      <textarea rows={3} placeholder="Describe your project" />
                    </label>

                    <div className="csd-hero-form-foot">
                      <div className="csd-hero-form-captcha">
                        <span>5 + 2 =</span>
                        <input type="text" inputMode="numeric" aria-label="Simple captcha answer" />
                      </div>
                      <button type="submit" className="csd-hero-form-submit">
                        Schedule a Technical Consultation
                      </button>
                    </div>
                    <p className="csd-hero-form-note">Fast, high-touch engagement under strict NDA protection.</p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — WHY A CUSTOM WEB APP IS A GROWTH ENGINE
            Pinned scroll-jacking on desktop with progress-ring cursor.
            On mobile/tablet/touch: natural scroll, image stacks above text.
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-growth" aria-labelledby="cwa-growth-title">
          <div className="cwa-growth-stage" ref={stageRef}>
            <div className="cwa-growth-inner">
              <div className="cwa-sh cwa-section-head cwa-growth-head-inline">
                <h2 id="cwa-growth-title" className="cwa-h2">
                  {GROWTH.title} <span className="cwa-italic-mute">{GROWTH.titleAccent}</span>
                </h2>
                <p className="cwa-h2-lead">{GROWTH.lead}</p>
              </div>

              <div className="cwa-growth-grid">
                {/* LEFT — media with crossfading per-pillar images */}
                <div className="cwa-growth-media-wrap">
                  <div className="cwa-growth-media">
                    <div className="cwa-growth-media-stack" aria-hidden>
                      {GROWTH.pillars.map((p, i) => (
                        <Image
                          key={p.n}
                          src={p.image}
                          alt={p.imageAlt}
                          fill
                          sizes="(max-width: 900px) 100vw, 46vw"
                          loading={i === 0 ? "eager" : "lazy"}
                          className="cwa-growth-media-img"
                          data-active={activePillar === i ? "true" : "false"}
                        />
                      ))}
                    </div>
                    <div className="cwa-growth-media-overlay" />

                    <div className="cwa-growth-media-progress" aria-hidden>
                      {GROWTH.pillars.map((_, i) => (
                        <span key={i} data-active={activePillar === i ? "true" : "false"} />
                      ))}
                    </div>

                    <div className="cwa-growth-media-active">
                      <div className="cwa-growth-media-active-num">
                        {GROWTH.pillars[activePillar].n}
                      </div>
                      <div className="cwa-growth-media-active-body">
                        <div className="cwa-growth-media-active-k">
                          {GROWTH.pillars[activePillar].k}
                        </div>
                        <div className="cwa-growth-media-active-v">
                          {GROWTH.pillars[activePillar].v}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT — pillars */}
                <ol className="cwa-pillar-list" ref={pillarListRef}>
                  {GROWTH.pillars.map((p, i) => (
                    <li
                      key={p.n}
                      className="cwa-pillar-row"
                      data-active={activePillar === i ? "true" : "false"}
                    >
                      <div className="cwa-pillar-marker">
                        <span className="cwa-pillar-marker-num">{p.n}</span>
                        <span className="cwa-pillar-marker-line" aria-hidden />
                      </div>
                      <div className="cwa-pillar-body">
                        <div className="cwa-pillar-head">
                          <h3 className="cwa-pillar-title">{p.k}</h3>
                          <span className="cwa-pillar-metric">{p.v}</span>
                        </div>
                        <p className="cwa-pillar-desc">{p.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — COST OF GETTING IT WRONG
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-cost" aria-labelledby="cwa-cost-title">
          <div className="cwa-cost-inner">
            <div className="cwa-cost-split">
              <div className="cwa-cost-content cwa-sh">
                <h2 id="cwa-cost-title" className="cwa-h2">
                  {COST.title} <span className="cwa-italic-mute">{COST.titleAccent}</span>
                </h2>
                <p className="cwa-h2-lead">{COST.lead}</p>

                <p className="cwa-cost-close">{COST.close}</p>
              </div>

              <div className="cwa-cost-media" aria-hidden>
                <Image
                  src={COST.image}
                  alt={COST.imageAlt}
                  fill
                  className="cwa-cost-media-img"
                  sizes="(max-width: 900px) 100vw, 46vw"
                  loading="lazy"
                />
                <div className="cwa-cost-media-overlay" />
              </div>
            </div>

            <div className="cwa-fail-grid">
              {COST.failures.map((f) => (
                <article
                  key={f.h}
                  className="cwa-fail-card"
                  data-theme={f.theme}
                >
                  <div className="cwa-fail-card-visual">
                    <Image
                      src={f.image}
                      alt={f.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 25vw"
                      loading="lazy"
                      className="cwa-fail-card-img"
                    />
                    <div className="cwa-fail-card-visual-grad" aria-hidden />
                    <span className="cwa-fail-card-arrow" aria-hidden>
                      ↗
                    </span>
                  </div>
                  <div className="cwa-fail-card-body">
                    <div className="cwa-fail-card-metric">
                      <span className="cwa-fail-card-stat">{f.stat}</span>
                      <span className="cwa-fail-card-label">{f.label}</span>
                    </div>
                    <h3 className="cwa-fail-card-h">{f.h}</h3>
                    <p className="cwa-fail-card-d">{f.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — HOW WE BUILD (timeline w/ scrub progress line)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="process" className="cwa-process-section" aria-labelledby="cwa-process-title">
          <div className="cwa-process-inner">
            <div className="cwa-sh cwa-section-head cwa-section-head--light">
              <h2 id="cwa-process-title" className="cwa-h2 cwa-h2-light">
                How we build —{" "}
                <span className="cwa-italic-light">six phases, one team.</span>
              </h2>
              <p className="cwa-h2-lead cwa-h2-lead-light">
                A delivery rhythm refined across 150+ shipped products.
                No surprises, no shipping and praying.
              </p>
            </div>

            <div className="cwa-process-timeline">
              <div className="cwa-process-line" aria-hidden>
                <div className="cwa-process-line-fill" />
              </div>

              <ol className="cwa-process-steps">
                {PROCESS.map((s, i) => (
                  <li key={s.num} className="cwa-proc-step" data-side={i % 2 === 0 ? "L" : "R"}>
                    <div className="cwa-proc-step-marker" aria-hidden>
                      <span className="cwa-proc-step-marker-num">{s.num}</span>
                    </div>
                    <div className="cwa-proc-step-card">
                      <div className="cwa-proc-step-head">
                        <h3 className="cwa-proc-step-title">{s.title}</h3>
                        <span className="cwa-proc-step-meta">{s.meta}</span>
                      </div>
                      <p className="cwa-proc-step-desc">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 — STACK (interactive code window)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-stack-section" aria-labelledby="cwa-stack-title">
          <div className="cwa-stack-inner">
            <div className="cwa-sh cwa-section-head">
              <h2 id="cwa-stack-title" className="cwa-h2">
                Tooling we <span className="cwa-italic-mute">trust.</span>
              </h2>
              <p className="cwa-h2-lead">
                Mature, production-ready stacks — picked for your problem,
                not because they&apos;re new.
              </p>
            </div>

            <div className="cwa-stack-window" role="tabpanel">
              <div className="cwa-stack-window-chrome">
                <div className="cwa-stack-window-dots">
                  <span /><span /><span />
                </div>
                <div className="cwa-stack-window-title">stack.config.ts</div>
                <div className="cwa-stack-window-meta">— typescript</div>
              </div>

              <div className="cwa-stack-window-body">
                <div className="cwa-stack-tabs" role="tablist" aria-label="Stack categories">
                  {STACK.map((g, i) => (
                    <button
                      key={g.group}
                      type="button"
                      role="tab"
                      aria-selected={activeStack === i}
                      className="cwa-stack-tab"
                      data-active={activeStack === i ? "true" : "false"}
                      onClick={() => setActiveStack(i)}
                    >
                      <span className="cwa-stack-tab-bin">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{g.group}</span>
                    </button>
                  ))}
                </div>

                <div className="cwa-stack-code">
                  <div className="cwa-stack-line cwa-stack-line-pre">
                    <span className="cwa-stack-ln">1</span>
                    <span><span className="cwa-syn-key">export const</span> <span className="cwa-syn-var">stack</span> = {"{"}</span>
                  </div>
                  <div className="cwa-stack-line cwa-stack-line-pre">
                    <span className="cwa-stack-ln">2</span>
                    <span>  <span className="cwa-syn-prop">{STACK[activeStack].group.toLowerCase()}</span>: [</span>
                  </div>

                  {STACK[activeStack].items.map((it, i) => (
                    <div key={`${activeStack}-${it.name}`} className="cwa-stack-line cwa-stack-line-item">
                      <span className="cwa-stack-ln">{i + 3}</span>
                      <span className="cwa-stack-line-content">
                        <span className="cwa-stack-line-indent">    </span>
                        <span className="cwa-syn-brace">{"{"}</span>
                        <span className="cwa-syn-prop"> name</span>
                        <span className="cwa-syn-punct">: </span>
                        <span className="cwa-syn-str">&quot;{it.name}&quot;</span>
                        <span className="cwa-syn-punct">, </span>
                        <span className="cwa-syn-prop">v</span>
                        <span className="cwa-syn-punct">: </span>
                        <span className="cwa-syn-str">&quot;{it.v}&quot;</span>
                        <span className="cwa-syn-punct">, </span>
                        <span className="cwa-syn-prop">role</span>
                        <span className="cwa-syn-punct">: </span>
                        <span className="cwa-syn-str">&quot;{it.role}&quot;</span>
                        <span className="cwa-syn-brace"> {"}"}</span>
                        <span className="cwa-syn-punct">,</span>
                      </span>
                    </div>
                  ))}

                  <div className="cwa-stack-line cwa-stack-line-pre">
                    <span className="cwa-stack-ln">{STACK[activeStack].items.length + 3}</span>
                    <span>  ],</span>
                  </div>
                  <div className="cwa-stack-line cwa-stack-line-pre">
                    <span className="cwa-stack-ln">{STACK[activeStack].items.length + 4}</span>
                    <span>{"}"} <span className="cwa-syn-punct">as const</span><span className="cwa-syn-cursor" aria-hidden /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 — FAQs
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-faq-section" aria-labelledby="cwa-faq-title">
          <div className="cwa-faq-layout">
            <div className="cwa-faq-aside cwa-sh">
              <h2 id="cwa-faq-title" className="cwa-h2">
                Frequently <span className="cwa-italic-mute">asked.</span>
              </h2>
              <p className="cwa-h2-lead cwa-faq-lead">
                Real questions from real prospects. If yours isn&apos;t here, send us a
                note — we answer every inquiry within 24 hours.
              </p>
              <Link href="/contact" className="cwa-faq-cta">
                Ask us anything
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>

            <div className="cwa-faq-list">
              {FAQS.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="cwa-faq-row" data-open={isOpen ? "true" : "false"}>
                    <button
                      type="button"
                      className="cwa-faq-q"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      suppressHydrationWarning
                    >
                      <span className="cwa-faq-q-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="cwa-faq-q-text">{f.q}</span>
                      <span className="cwa-faq-q-icon" aria-hidden>
                        <svg width="14" height="14" viewBox="0 0 14 14">
                          <path d="M3 7h8 M7 3v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                      </span>
                    </button>
                    <div className="cwa-faq-a">
                      <div className="cwa-faq-a-inner">{f.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 — FINAL CTA (Task 3)
            Flat section bg; gray gradient only on .cwa-ncta-card.
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-ncta" aria-labelledby="cwa-ncta-title">
          <div className="cwa-ncta-inner">
            <div className="cwa-ncta-card">
              <h2 id="cwa-ncta-title" className="cwa-ncta-title">
                <span className="cwa-ncta-head">
                  {CTA.headline.split("").map((c, i) => (
                    <span key={`h-${i}`} className="cwa-ncta-char">
                      {c === " " ? "\u00A0" : c}
                    </span>
                  ))}
                  {" "}
                  <span className="cwa-ncta-italic">
                    {CTA.headlineItalic.split("").map((c, i) => (
                      <span key={`i-${i}`} className="cwa-ncta-char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </span>
                </span>
              </h2>

              <p className="cwa-ncta-lead cwa-ncta-fade">{CTA.lead}</p>

              <div className="cwa-ncta-actions cwa-ncta-fade">
                <Link href={CTA.primaryCta.href} className="cwa-ncta-btn">
                  <span className="cwa-ncta-btn-label">{CTA.primaryCta.label}</span>
                  <span className="cwa-ncta-btn-arrow" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path
                        d="M3 7h8 M7 3l4 4-4 4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>

                <a href={`mailto:${CTA.email}`} className="cwa-ncta-mail">
                  <span className="cwa-ncta-mail-k">or email</span>
                  <span className="cwa-ncta-mail-v">{CTA.email}</span>
                </a>
              </div>

              <dl className="cwa-ncta-rows cwa-ncta-fade">
                {CTA.rows.map((r) => (
                  <div key={r.k} className="cwa-ncta-row">
                    <dt>{r.k}</dt>
                    <dd>{r.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>

      {heroServiceOpen && typeof document !== "undefined"
        ? createPortal(
            isHeroNarrow ? (
              <>
                <div
                  className="csd-hero-service-dd-backdrop"
                  aria-hidden
                  onPointerDown={(e) => {
                    e.preventDefault();
                    closeHeroServiceMenu();
                  }}
                />
                <div
                  ref={heroServiceSheetRef}
                  className="csd-hero-service-dd-sheet"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="cwa-hero-service-sheet-title"
                >
                  <div className="csd-hero-service-dd-sheet-grab" aria-hidden />
                  <div className="csd-hero-service-dd-sheet-head">
                    <span id="cwa-hero-service-sheet-title">Services</span>
                    <button
                      type="button"
                      className="csd-hero-service-dd-sheet-close"
                      aria-label="Close service picker"
                      onClick={closeHeroServiceMenu}
                    >
                      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
                        <path
                          d="M5 5l8 8M13 5l-8 8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div
                    ref={heroServiceMenuRef}
                    id="cwa-hero-service-listbox"
                    className="csd-hero-service-dd-menu csd-hero-service-dd-menu--sheet"
                    role="listbox"
                    aria-labelledby="cwa-hero-service-trigger"
                    data-lenis-prevent
                    data-lenis-prevent-wheel
                    data-lenis-prevent-touch
                  >
                    {heroServiceOptionNodes}
                  </div>
                </div>
              </>
            ) : heroServiceMenuBox ? (
              <div
                ref={heroServiceMenuRef}
                id="cwa-hero-service-listbox"
                className="csd-hero-service-dd-menu"
                role="listbox"
                aria-labelledby="cwa-hero-service-trigger"
                data-lenis-prevent
                data-lenis-prevent-wheel
                data-lenis-prevent-touch
                style={{
                  position: "fixed",
                  top: heroServiceMenuBox.top,
                  left: heroServiceMenuBox.left,
                  width: heroServiceMenuBox.width,
                  maxHeight: heroServiceMenuBox.maxHeight,
                  zIndex: 10050,
                }}
              >
                {heroServiceOptionNodes}
              </div>
            ) : null,
            document.body
          )
        : null}

      <style>{`
        /* ═══════════════════════════════════════════════════════════════
           DESIGN TOKENS
        ═══════════════════════════════════════════════════════════════ */
        .cwa-sh,
        .cwa-h1-line,
        .cwa-pillar-row,
        .cwa-fail-card,
        .cwa-proc-step,
        .cwa-stack-line,
        .cwa-faq-row {
          will-change: transform, opacity;
        }

        .cwa-h2 {
          font-family: var(--font-display);
          font-size: clamp(34px, 4.6vw, 64px);
          font-weight: 500;
          letter-spacing: -0.034em;
          line-height: 1.02;
          margin: 0 0 18px;
          max-width: 680px;
        }
        .cwa-h2-light { color: #fafaf9; max-width: 760px; }
        .cwa-italic-mute { font-style: italic; font-weight: 400; color: rgba(10,10,10,0.5); }
        .cwa-italic-light { font-style: italic; font-weight: 400; color: rgba(255,255,255,0.6); }
        .cwa-h2-lead {
          font-size: 16px;
          color: rgba(10,10,10,0.62);
          line-height: 1.7;
          margin: 0;
          max-width: 540px;
        }
        .cwa-h2-lead-light { color: rgba(255,255,255,0.62); max-width: 480px; }

        .cwa-section-head {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: clamp(48px, 6vw, 80px);
        }
        .cwa-section-head--light .cwa-h2 { color: #fafaf9; }

        /* ═══════════════════════════════════════════════════════════════
           TASK 2 — PROGRESS-RING CURSOR (desktop only)
        ═══════════════════════════════════════════════════════════════ */
        .cwa-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 56px;
          height: 56px;
          margin: -28px 0 0 -28px;
          pointer-events: none;
          z-index: 9998;
          opacity: 0;
          transform: translate3d(-100px, -100px, 0);
          transition: opacity 0.35s cubic-bezier(0.22,1,0.36,1);
          mix-blend-mode: difference;
          display: none; /* shown only on desktop via media query below */
        }
        @media (min-width: 1101px) and (hover: hover) and (pointer: fine) {
          .cwa-cursor { display: block; }
        }
        .cwa-cursor[data-visible="true"] { opacity: 1; }
        .cwa-cursor-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }
        .cwa-cursor-ring {
          transition: stroke-dashoffset 0.15s linear;
        }
        .cwa-cursor-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 4px;
          height: 4px;
          margin: -2px 0 0 -2px;
          border-radius: 50%;
          background: #fafaf9;
        }
        .cwa-cursor-index {
          position: absolute;
          top: 100%;
          left: 50%;
          margin-top: 10px;
          transform: translateX(-50%);
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #fafaf9;
          background: rgba(10,10,10,0.85);
          padding: 4px 8px;
          border-radius: 999px;
          white-space: nowrap;
        }

        /* When the cursor is over the pinned stage, hide the native cursor.
           We only do this where the custom cursor is supported. */
        @media (min-width: 1101px) and (hover: hover) and (pointer: fine) {
          .cwa-growth-stage,
          .cwa-growth-stage * {
            cursor: none !important;
          }
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 1 — HERO
        ═══════════════════════════════════════════════════════════════ */
        .cwa-hero {
          position: relative;
          min-height: 100vh;
          padding: clamp(150px, 17vh, 190px) 20px 56px;
          background: #0a0a0a;
          overflow: hidden;
        }
        .cwa-hero-video-wrap {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .cwa-hero-bg-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          pointer-events: none;
        }
        .cwa-hero-mobile-bg {
          display: none;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 28%;
          z-index: 0;
          pointer-events: none;
        }
        .cwa-hero-bg-overlay {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.64) 36%, rgba(0,0,0,0.42) 62%, rgba(0,0,0,0.24) 82%, rgba(0,0,0,0.16) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.58) 100%);
        }
        .cwa-hero-bg-spotlight {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: radial-gradient(1000px 520px at 18% 36%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 34%, transparent 72%);
          mix-blend-mode: screen;
        }
        .cwa-hero-inner {
          position: relative;
          max-width: 1320px;
          margin: 0 auto;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 56px;
        }
        .cwa-hero .csd-hero-main {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(420px, 0.85fr);
          gap: clamp(32px, 4vw, 64px);
          align-items: center;
          min-height: calc(100vh - 246px);
        }
        .cwa-hero .csd-hero-left {
          min-width: 0;
          max-width: 780px;
          transform: translateY(clamp(22px, 4vh, 48px));
        }
        .cwa-hero .csd-hero-mobile-spacer { display: none; }
        .cwa-hero-copy { min-width: 0; }

        .cwa-hero .csd-hero-right {
          position: relative;
          align-self: stretch;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cwa-hero .csd-hero-form-shell {
          position: relative;
          width: 100%;
          max-width: 540px;
          margin-left: auto;
          padding: 28px 26px 24px;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(10px);
          background:
            linear-gradient(145deg, rgba(12,12,12,0.68) 0%, rgba(12,12,12,0.45) 100%);
          box-shadow:
            0 36px 84px -32px rgba(0,0,0,0.62),
            inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .cwa-hero .csd-hero-form-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(26px, 2.6vw, 36px);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.05;
        }
        .cwa-hero .csd-hero-form-subtitle {
          margin: 10px 0 20px;
          color: rgba(255,255,255,0.72);
          font-size: 14px;
          line-height: 1.6;
          max-width: 44ch;
        }
        .cwa-hero .csd-hero-form { display: flex; flex-direction: column; gap: 18px; }
        .cwa-hero .csd-hero-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .cwa-hero .csd-hero-form-field { display: flex; flex-direction: column; gap: 8px; }
        .cwa-hero .csd-hero-form-field span {
          font-size: 11px; font-weight: 600; letter-spacing: 0.07em;
          text-transform: uppercase; color: rgba(255,255,255,0.74);
        }
        .cwa-hero .csd-hero-phone-row {
          display: flex; align-items: stretch; width: 100%;
          border: none; border-radius: 0; background: transparent;
          border-bottom: 1px solid rgba(255,255,255,0.42);
          overflow: visible; transition: border-color 0.2s;
        }
        .cwa-hero .csd-hero-form-field--phone:focus-within .csd-hero-phone-row {
          border-bottom-color: rgba(96, 165, 250, 0.95);
        }
        .cwa-hero .csd-hero-phone-sep {
          width: 1px; align-self: center; height: 1.15em;
          background: rgba(255,255,255,0.38); flex-shrink: 0; margin: 0 10px 0 0;
        }
        .cwa-hero .csd-hero-form-field input,
        .cwa-hero .csd-hero-form-field select,
        .cwa-hero .csd-hero-form-field textarea {
          width: 100%; border: none; border-radius: 0; background: transparent;
          color: #fff; border-bottom: 1px solid rgba(255,255,255,0.42);
          padding: 10px 0 14px; font-size: 14px; outline: none; box-shadow: none;
          transition: border-color 0.2s;
        }
        .cwa-hero .csd-hero-form-field textarea { resize: vertical; min-height: 92px; }
        .cwa-hero .csd-hero-form-field input::placeholder,
        .cwa-hero .csd-hero-form-field textarea::placeholder { color: rgba(255,255,255,0.45); }
        .cwa-hero .csd-hero-form-field select {
          color: rgba(255,255,255,0.75); appearance: none; background-color: transparent;
          background-image:
            linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.72) 50%),
            linear-gradient(135deg, rgba(255,255,255,0.72) 50%, transparent 50%);
          background-position: calc(100% - 4px) calc(1em + 6px), calc(100% - 0px) calc(1em + 6px);
          background-size: 5px 5px, 5px 5px; background-repeat: no-repeat;
        }
        .cwa-hero .csd-hero-form-field select:invalid { color: rgba(255,255,255,0.65); }
        .cwa-hero .csd-hero-form-field select option { color: #0a0a0a; background: #ffffff; }
        .cwa-hero .csd-hero-form-field select option[disabled] { color: rgba(10,10,10,0.55); }
        .cwa-hero .csd-hero-form-field input:focus,
        .cwa-hero .csd-hero-form-field select:focus,
        .cwa-hero .csd-hero-form-field textarea:focus {
          border-bottom-color: rgba(96, 165, 250, 0.95);
        }

        .cwa-hero .csd-hero-service-dd {
          position: relative;
          width: 100%;
        }
        .cwa-hero .csd-hero-service-dd-trigger {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          width: 100%;
          margin: 0;
          border: none;
          border-radius: 0;
          background: transparent;
          color: #fff;
          border-bottom: 1px solid rgba(255,255,255,0.42);
          padding: 10px 0 14px;
          font-size: 14px;
          line-height: 1.3;
          text-align: left;
          cursor: pointer;
          outline: none;
          box-shadow: none;
          transition: border-color 0.2s;
        }
        .cwa-hero .csd-hero-service-dd-trigger--placeholder {
          color: rgba(255,255,255,0.65);
        }
        .cwa-hero .csd-hero-service-dd-trigger:focus-visible,
        .cwa-hero .csd-hero-service-dd-trigger:hover {
          border-bottom-color: rgba(96, 165, 250, 0.95);
        }
        .cwa-hero .csd-hero-service-dd-value {
          flex: 1;
          min-width: 0;
        }
        .cwa-hero .csd-hero-service-dd-chevron {
          flex-shrink: 0;
          width: 0;
          height: 0;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
          border-top: 5px solid rgba(255,255,255,0.72);
          transform: translateY(1px);
          transition: transform 0.2s ease;
        }
        .cwa-hero .csd-hero-service-dd-chevron--open {
          transform: rotate(180deg) translateY(-1px);
        }
        .csd-hero-service-dd-menu {
          box-sizing: border-box;
          overflow-y: auto;
          overflow-x: hidden;
          overscroll-behavior: contain;
          touch-action: pan-y;
          -webkit-overflow-scrolling: touch;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.28);
          padding: 6px 0 8px;
        }
        .csd-hero-service-dd-group {
          padding: 0 0 4px;
        }
        .csd-hero-service-dd-group-label {
          padding: 8px 14px 4px;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.45);
        }
        .csd-hero-service-dd-option {
          display: block;
          width: 100%;
          border: none;
          background: transparent;
          text-align: left;
          padding: 9px 14px;
          font-size: 13px;
          line-height: 1.35;
          color: #0a0a0a;
          cursor: pointer;
          transition: background 0.12s ease;
        }
        .csd-hero-service-dd-option:hover,
        .csd-hero-service-dd-option:focus-visible {
          background: rgba(59, 130, 246, 0.12);
          outline: none;
        }
        .csd-hero-service-dd-option[aria-selected="true"] {
          background: rgba(59, 130, 246, 0.18);
        }
        .csd-hero-service-dd-backdrop {
          position: fixed;
          inset: 0;
          z-index: 10049;
          background: rgba(0, 0, 0, 0.5);
          touch-action: none;
        }
        .csd-hero-service-dd-sheet {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 10050;
          display: flex;
          flex-direction: column;
          max-height: min(85dvh, 620px);
          background: #fff;
          border-radius: 18px 18px 0 0;
          box-shadow: 0 -12px 48px rgba(0, 0, 0, 0.35);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        .csd-hero-service-dd-sheet-grab {
          flex-shrink: 0;
          width: 40px;
          height: 5px;
          margin: 10px auto 6px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.15);
        }
        .csd-hero-service-dd-sheet-head {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 4px 12px 12px 18px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: #0a0a0a;
        }
        .csd-hero-service-dd-sheet-close {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          margin: 0;
          padding: 0;
          border: none;
          border-radius: 10px;
          background: transparent;
          color: rgba(10, 10, 10, 0.55);
          cursor: pointer;
        }
        .csd-hero-service-dd-sheet-close:hover,
        .csd-hero-service-dd-sheet-close:focus-visible {
          background: rgba(0, 0, 0, 0.06);
          color: #0a0a0a;
          outline: none;
        }
        .csd-hero-service-dd-menu--sheet {
          flex: 1 1 auto;
          min-height: 0;
          max-height: none;
          border: none;
          border-radius: 0;
          box-shadow: none;
          padding: 4px 0 12px;
        }

        .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc,
        .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num {
          width: auto !important; border: none !important; border-radius: 0 !important;
          background: transparent !important; box-shadow: none !important;
        }
        .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc {
          flex: 0 0 auto; min-width: 84px; max-width: 110px;
          padding: 10px 26px 14px 0 !important; color: rgba(255,255,255,0.78) !important;
        }
        .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num {
          flex: 1 1 auto; min-width: 0; padding: 10px 0 14px 0 !important;
        }
        .cwa-hero .csd-hero-form input:-webkit-autofill,
        .cwa-hero .csd-hero-form input:-webkit-autofill:hover,
        .cwa-hero .csd-hero-form input:-webkit-autofill:focus,
        .cwa-hero .csd-hero-form input:-webkit-autofill:active,
        .cwa-hero .csd-hero-form textarea:-webkit-autofill,
        .cwa-hero .csd-hero-form textarea:-webkit-autofill:hover,
        .cwa-hero .csd-hero-form textarea:-webkit-autofill:focus,
        .cwa-hero .csd-hero-form textarea:-webkit-autofill:active,
        .cwa-hero .csd-hero-form select:-webkit-autofill,
        .cwa-hero .csd-hero-form select:-webkit-autofill:hover,
        .cwa-hero .csd-hero-form select:-webkit-autofill:focus,
        .cwa-hero .csd-hero-form select:-webkit-autofill:active {
          -webkit-text-fill-color: rgba(255, 255, 255, 0.95) !important;
          caret-color: #fff;
          transition: background-color 99999s ease-out 0s;
          -webkit-box-shadow: 0 0 0 1000px #0c0c0c inset !important;
          box-shadow: 0 0 0 1000px #0c0c0c inset !important;
        }
        .cwa-hero .csd-hero-form-foot { display: flex; align-items: center; gap: 12px; margin-top: 6px; }
        .cwa-hero .csd-hero-form-captcha {
          display: inline-flex; align-items: center; gap: 10px;
          color: rgba(255,255,255,0.85); font-weight: 600; flex-shrink: 0;
        }
        .cwa-hero .csd-hero-form-captcha input {
          width: 56px; border: none; border-radius: 0; background: transparent;
          color: #fff; border-bottom: 1px solid rgba(255,255,255,0.42);
          padding: 8px 0 10px; outline: none; box-shadow: none; transition: border-color 0.2s;
        }
        .cwa-hero .csd-hero-form-captcha input:focus { border-bottom-color: rgba(96, 165, 250, 0.95); }
        .cwa-hero .csd-hero-form-submit {
          border: none; border-radius: 999px; padding: 12px 20px;
          font-size: 13px; font-weight: 700; letter-spacing: 0.01em;
          color: #fff; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          box-shadow: 0 10px 24px -10px rgba(37,99,235,0.8); cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .cwa-hero .csd-hero-form-submit:hover {
          transform: translateY(-1px); box-shadow: 0 14px 28px -12px rgba(37,99,235,0.9);
        }
        .cwa-hero .csd-hero-form-note { margin: 2px 0 0; font-size: 12px; color: rgba(255,255,255,0.62); }

        .cwa-hero-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 4.5vw, 72px);
          font-weight: 500; line-height: 0.98; letter-spacing: -0.045em;
          margin: 0 0 26px; color: #fff; max-width: 720px;
          text-shadow: 0 10px 30px rgba(0,0,0,0.34);
        }
        .cwa-h1-lines-desktop { display: block; }
        .cwa-h1-lines-mobile { display: none; }
        .cwa-h1-line {
          overflow: visible; padding-bottom: 0.075em; display: block;
          white-space: nowrap; width: 100%;
        }
        .cwa-h1-char { display: inline-block; will-change: transform; }
        .cwa-h1-italic {
          font-style: italic; font-weight: 400; color: rgba(255,255,255,0.96);
          display: inline-block; white-space: nowrap; padding: 0 0.08em;
          border-radius: 0.16em; background: rgba(255,255,255,0.08);
          text-shadow: 0 8px 24px rgba(0,0,0,0.36);
        }
        .cwa-hero-lead {
          font-size: 17px; color: rgba(255,255,255,0.84); max-width: 600px;
          line-height: 1.7; margin: 0 0 32px;
          text-shadow: 0 6px 18px rgba(0,0,0,0.28);
        }
        .cwa-hero-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
        .cwa-hero .csd-cta-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 15px 28px; background: #ffffff; color: #0a0a0a;
          text-decoration: none; font-size: 14px; font-weight: 500;
          border-radius: 999px; position: relative; overflow: hidden;
        }
        .cwa-hero .csd-cta-primary::before {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(90deg, #e7e5e4, #ffffff);
          transform: translateX(-101%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 1;
        }
        .cwa-hero .csd-cta-primary:hover::before { transform: translateX(0); }
        .cwa-hero .csd-cta-primary:hover .csd-cta-arrow { transform: translateX(2px); }
        .cwa-hero .csd-cta-arrow { transition: transform 0.25s ease; }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 2 — GROWTH (pinned scroll-jacking with image crossfade)
        ═══════════════════════════════════════════════════════════════ */
        .cwa-growth {
          background: #f5f5f4;
          border-top: 1px solid rgba(10,10,10,0.06);
        }
        .cwa-growth-stage {
          height: 100vh;
          min-height: 720px;
          display: flex;
          align-items: center;
          padding: clamp(40px, 6vh, 80px) 20px;
          overflow: hidden;
        }
        .cwa-growth-inner {
          max-width: 1320px;
          margin: 0 auto;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: clamp(24px, 3.5vh, 48px);
        }
        .cwa-growth-head-inline {
          flex-direction: row; align-items: flex-end;
          justify-content: space-between; gap: clamp(28px, 4vw, 64px);
          margin-bottom: 0;
        }
        .cwa-growth-head-inline .cwa-h2 {
          margin: 0; flex: 0 1 680px;
          font-size: clamp(28px, 3.4vw, 48px);
        }
        .cwa-growth-head-inline .cwa-h2-lead {
          flex: 0 1 520px; margin: 0; transform: translateY(-6px);
          font-size: 14px; line-height: 1.6;
        }
        .cwa-growth-grid {
          display: grid;
          grid-template-columns: 1fr 1.05fr;
          gap: clamp(40px, 5vw, 88px);
          align-items: center;
          flex: 1 1 auto;
          min-height: 0;
        }
        .cwa-growth-media-wrap {
          align-self: stretch;
          display: flex;
          align-items: center;
          min-height: 0;
        }
        .cwa-growth-media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          max-height: 65vh;
          margin: 0 auto;
          border-radius: clamp(20px, 2.4vw, 28px);
          overflow: hidden;
          background: #0a0a0a;
          box-shadow: 0 50px 100px -50px rgba(10,10,10,0.4);
        }
        .cwa-growth-media-stack {
          position: absolute;
          inset: 0;
        }
        .cwa-growth-media-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.06) contrast(1.04);
          opacity: 0;
          transform: scale(1.04);
          transition:
            opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
            transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }
        .cwa-growth-media-img[data-active="true"] {
          opacity: 1;
          transform: scale(1);
        }
        .cwa-growth-media-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.7) 100%);
          pointer-events: none;
          z-index: 1;
        }
        .cwa-growth-media-progress {
          position: absolute;
          top: 22px;
          right: 22px;
          display: flex;
          gap: 6px;
          z-index: 2;
        }
        .cwa-growth-media-progress span {
          width: 18px;
          height: 3px;
          border-radius: 999px;
          background: rgba(255,255,255,0.25);
          transition: background 0.4s, width 0.4s;
        }
        .cwa-growth-media-progress span[data-active="true"] {
          background: #fafaf9;
          width: 28px;
        }
        .cwa-growth-media-active {
          position: absolute;
          left: 22px; right: 22px; bottom: 22px;
          padding: 18px 20px;
          background: rgba(10,10,10,0.5);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          color: #fafaf9;
          display: flex;
          gap: 18px;
          align-items: center;
          z-index: 2;
          transition: background 0.4s ease;
        }
        .cwa-growth-media-active-num {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 500;
          letter-spacing: -0.04em;
          color: rgba(255,255,255,0.4);
          line-height: 1;
          font-variant-numeric: tabular-nums;
          transition: color 0.4s ease;
        }
        .cwa-growth-media-active-body {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .cwa-growth-media-active-k {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1;
        }
        .cwa-growth-media-active-v {
          font-size: 12px;
          color: rgba(255,255,255,0.65);
        }

        .cwa-pillar-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          align-self: center;
          width: 100%;
        }
        .cwa-pillar-row {
          display: grid;
          grid-template-columns: 48px 1fr;
          gap: 20px;
          padding: 18px 0 20px;
          border-bottom: 1px solid rgba(10,10,10,0.1);
          opacity: 0.32;
          transform: translateX(-8px);
          transition:
            opacity 0.55s cubic-bezier(0.22,1,0.36,1),
            transform 0.55s cubic-bezier(0.22,1,0.36,1);
        }
        .cwa-pillar-row:first-child { border-top: 1px solid rgba(10,10,10,0.1); }
        .cwa-pillar-row[data-active="true"] {
          opacity: 1;
          transform: translateX(0);
        }

        .cwa-pillar-marker {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .cwa-pillar-marker-num {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 500;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(10,10,10,0.3);
          font-variant-numeric: tabular-nums;
          line-height: 1;
          transition: color 0.5s, -webkit-text-stroke-color 0.5s;
        }
        .cwa-pillar-row[data-active="true"] .cwa-pillar-marker-num {
          color: #0a0a0a;
          -webkit-text-stroke-color: transparent;
        }
        .cwa-pillar-marker-line {
          width: 1px;
          height: 22px;
          background: rgba(10,10,10,0.15);
          transition: background 0.5s, height 0.5s;
        }
        .cwa-pillar-row[data-active="true"] .cwa-pillar-marker-line {
          background: #0a0a0a;
          height: 38px;
        }

        .cwa-pillar-body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          column-gap: 22px;
          row-gap: 8px;
          align-items: start;
        }
        .cwa-pillar-head { display: contents; }
        .cwa-pillar-title {
          font-family: var(--font-display);
          font-size: clamp(18px, 1.9vw, 24px);
          font-weight: 500;
          letter-spacing: -0.022em;
          line-height: 1.18;
          margin: 0;
          color: #0a0a0a;
          grid-column: 1;
        }
        .cwa-pillar-metric {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: rgba(10,10,10,0.6);
          padding: 5px 10px;
          background: rgba(10,10,10,0.05);
          border: 1px solid rgba(10,10,10,0.08);
          border-radius: 999px;
          white-space: nowrap;
          grid-column: 2;
          justify-self: end;
          transition: background 0.4s, color 0.4s, border-color 0.4s;
        }
        .cwa-pillar-row[data-active="true"] .cwa-pillar-metric {
          background: #0a0a0a;
          color: #fafaf9;
          border-color: #0a0a0a;
        }
        .cwa-pillar-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(10,10,10,0.65);
          margin: 0;
          grid-column: 1 / -1;
          max-width: 52ch;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 3 — COST
        ═══════════════════════════════════════════════════════════════ */
        .cwa-cost {
          padding: clamp(80px, 10vw, 140px) 20px;
          background: #fafaf9;
          border-top: 1px solid rgba(10,10,10,0.06);
        }
        .cwa-cost-inner { max-width: 1320px; margin: 0 auto; }
        .cwa-cost-split {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: clamp(40px, 5vw, 88px);
          align-items: stretch;
          margin-bottom: clamp(48px, 6vw, 72px);
        }
        .cwa-cost-content {
          display: flex; flex-direction: column; gap: 18px;
          padding: clamp(20px, 3vw, 40px) 0;
        }
        .cwa-cost-content .cwa-h2 { margin: 0; }
        .cwa-cost-content .cwa-h2-lead { margin: 0; }
        .cwa-cost-close {
          font-size: 14.5px; line-height: 1.7; color: rgba(10,10,10,0.6);
          margin: 16px 0 0; padding-top: 22px;
          border-top: 1px solid rgba(10,10,10,0.1); max-width: 540px;
        }
        .cwa-cost-media {
          position: relative; overflow: hidden; background: #0a0a0a;
          border-radius: clamp(20px, 2.4vw, 28px); min-height: 420px;
        }
        .cwa-cost-media img,
        .cwa-cost-media-img {
          width: 100%; height: 100%; object-fit: cover;
          filter: saturate(1.06) contrast(1.04);
          transition: transform 1.2s cubic-bezier(0.22,1,0.36,1);
        }
        @media (hover: hover) {
          .cwa-cost-media:hover img,
          .cwa-cost-media:hover .cwa-cost-media-img { transform: scale(1.04); }
        }
        .cwa-cost-media-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,10,10,0.12) 0%, rgba(10,10,10,0.55) 100%);
          pointer-events: none;
        }

        .cwa-fail-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 22px;
          margin-top: clamp(8px, 2vw, 20px);
        }
        .cwa-fail-card {
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid rgba(10, 10, 10, 0.07);
          box-shadow:
            0 1px 2px rgba(10, 10, 10, 0.04),
            0 12px 40px -18px rgba(10, 10, 10, 0.18);
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.35s ease;
        }
        .cwa-fail-card:hover {
          transform: translateY(-6px);
          box-shadow:
            0 4px 8px rgba(10, 10, 10, 0.06),
            0 28px 56px -24px rgba(10, 10, 10, 0.28);
          border-color: rgba(10, 10, 10, 0.12);
        }
        .cwa-fail-card-visual {
          position: relative;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #e8e8e6;
        }
        .cwa-fail-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.02);
          transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .cwa-fail-card:hover .cwa-fail-card-img {
          transform: scale(1.08);
        }
        .cwa-fail-card-visual-grad {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(10, 10, 10, 0.05) 0%,
            rgba(10, 10, 10, 0.35) 100%
          );
          transition: opacity 0.4s ease;
        }
        .cwa-fail-card[data-theme="perf"] .cwa-fail-card-visual-grad {
          background: linear-gradient(
            145deg,
            rgba(180, 83, 9, 0.15) 0%,
            rgba(10, 10, 10, 0.5) 100%
          );
        }
        .cwa-fail-card[data-theme="arch"] .cwa-fail-card-visual-grad {
          background: linear-gradient(
            145deg,
            rgba(30, 58, 138, 0.2) 0%,
            rgba(10, 10, 10, 0.55) 100%
          );
        }
        .cwa-fail-card[data-theme="obs"] .cwa-fail-card-visual-grad {
          background: linear-gradient(
            145deg,
            rgba(5, 150, 105, 0.18) 0%,
            rgba(10, 10, 10, 0.52) 100%
          );
        }
        .cwa-fail-card[data-theme="a11y"] .cwa-fail-card-visual-grad {
          background: linear-gradient(
            145deg,
            rgba(124, 58, 237, 0.14) 0%,
            rgba(10, 10, 10, 0.48) 100%
          );
        }
        .cwa-fail-card-arrow {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
          color: #fafaf9;
          border-radius: 10px;
          background: rgba(10, 10, 10, 0.35);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: color 0.3s, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.3s ease;
        }
        .cwa-fail-card:hover .cwa-fail-card-arrow {
          background: rgba(255, 255, 255, 0.95);
          color: #0a0a0a;
          transform: translate(3px, -3px);
        }
        .cwa-fail-card-body {
          padding: 22px 22px 26px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 0;
          background: linear-gradient(180deg, #ffffff 0%, #fafaf9 100%);
        }
        .cwa-fail-card-metric {
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 10px 14px;
          margin-bottom: 14px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.07);
        }
        .cwa-fail-card-stat {
          font-family: var(--font-display);
          font-size: clamp(36px, 3.8vw, 52px);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 0.95;
          color: #0a0a0a;
          font-variant-numeric: tabular-nums;
        }
        .cwa-fail-card-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.48);
          max-width: 140px;
          line-height: 1.35;
        }
        .cwa-fail-card-h {
          font-family: var(--font-display);
          font-size: clamp(16px, 1.35vw, 18px);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.25;
          color: #0a0a0a;
          margin: 0 0 10px;
        }
        .cwa-fail-card-d {
          font-size: 13.5px;
          line-height: 1.65;
          color: rgba(10, 10, 10, 0.58);
          margin: 0;
          flex: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .cwa-fail-card {
            transition-duration: 0.01ms;
          }
          .cwa-fail-card:hover {
            transform: none;
          }
          .cwa-fail-card:hover .cwa-fail-card-img {
            transform: scale(1.02);
          }
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 4 — PROCESS
        ═══════════════════════════════════════════════════════════════ */
        .cwa-process-section {
          padding: clamp(80px, 10vw, 140px) 20px;
          background: #0a0a0a; color: #fafaf9;
          position: relative; overflow: hidden;
        }
        .cwa-process-section::before {
          content: ""; position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }
        .cwa-process-inner { position: relative; max-width: 1100px; margin: 0 auto; }
        .cwa-process-section .cwa-section-head {
          margin-bottom: clamp(64px, 8vw, 96px);
          align-items: center; text-align: center;
        }
        .cwa-process-section .cwa-h2 { max-width: 700px; }
        .cwa-process-section .cwa-h2-lead { max-width: 540px; }

        .cwa-process-timeline { position: relative; padding: 20px 0; }
        .cwa-process-line {
          position: absolute; left: 50%; top: 0; bottom: 0;
          width: 1px; background: rgba(255,255,255,0.08); transform: translateX(-50%);
        }
        .cwa-process-line-fill {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 100%);
          transform-origin: top center; transform: scaleY(0);
        }
        .cwa-process-steps {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column;
          gap: clamp(48px, 7vw, 88px); position: relative;
        }
        .cwa-proc-step {
          position: relative;
          display: grid; grid-template-columns: 1fr 60px 1fr;
          align-items: center; gap: 0;
        }
        .cwa-proc-step-marker { grid-column: 2; display: flex; justify-content: center; z-index: 2; }
        .cwa-proc-step-marker-num {
          font-family: var(--font-mono); font-size: 11px; font-weight: 600;
          letter-spacing: 0.06em; color: rgba(255,255,255,0.85);
          padding: 6px 12px; background: #0a0a0a;
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 999px; white-space: nowrap;
        }
        .cwa-proc-step-card {
          padding: 28px 30px 30px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px; backdrop-filter: blur(8px);
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .cwa-proc-step-card:hover {
          background: rgba(255,255,255,0.045);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }
        .cwa-proc-step[data-side="L"] .cwa-proc-step-card {
          grid-column: 1; margin-right: 32px; text-align: right;
        }
        .cwa-proc-step[data-side="R"] .cwa-proc-step-card {
          grid-column: 3; margin-left: 32px; text-align: left;
        }
        .cwa-proc-step-head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
        .cwa-proc-step[data-side="L"] .cwa-proc-step-head { align-items: flex-end; }
        .cwa-proc-step[data-side="R"] .cwa-proc-step-head { align-items: flex-start; }
        .cwa-proc-step-title {
          font-family: var(--font-display); font-size: clamp(18px, 1.9vw, 22px);
          font-weight: 500; letter-spacing: -0.02em; line-height: 1.2;
          margin: 0; color: #fafaf9;
        }
        .cwa-proc-step-meta {
          font-family: var(--font-mono); font-size: 10px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.45);
        }
        .cwa-proc-step-desc {
          font-size: 14px; line-height: 1.65; color: rgba(255,255,255,0.65);
          margin: 0; max-width: 36ch;
        }
        .cwa-proc-step[data-side="L"] .cwa-proc-step-desc { margin-left: auto; }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 5 — STACK
        ═══════════════════════════════════════════════════════════════ */
        .cwa-stack-section {
          padding: clamp(80px, 10vw, 140px) 20px;
          background: #fafaf9;
          border-top: 1px solid rgba(10,10,10,0.06);
        }
        .cwa-stack-inner { max-width: 1320px; margin: 0 auto; }
        .cwa-stack-window {
          background: linear-gradient(160deg, #0a0a0a 0%, #141414 100%);
          color: #fafaf9; border-radius: 18px; overflow: hidden;
          box-shadow:
            0 60px 120px -40px rgba(10,10,10,0.4),
            inset 0 1px 0 rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
        }
        .cwa-stack-window-chrome {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .cwa-stack-window-dots { display: flex; gap: 6px; }
        .cwa-stack-window-dots span { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.15); }
        .cwa-stack-window-dots span:first-child { background: rgba(248,113,113,0.5); }
        .cwa-stack-window-dots span:nth-child(2) { background: rgba(250,204,21,0.5); }
        .cwa-stack-window-dots span:nth-child(3) { background: rgba(74,222,128,0.5); }
        .cwa-stack-window-title { font-family: var(--font-mono); font-size: 12px; color: rgba(255,255,255,0.7); margin-left: 8px; }
        .cwa-stack-window-meta { font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.35); }
        .cwa-stack-window-body { display: grid; grid-template-columns: 220px 1fr; }
        .cwa-stack-tabs {
          display: flex; flex-direction: column; padding: 18px 0;
          border-right: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.015);
        }
        .cwa-stack-tab {
          background: transparent; border: 0;
          color: rgba(255,255,255,0.55);
          font-family: var(--font-display); font-size: 14px; font-weight: 500;
          letter-spacing: -0.012em;
          padding: 14px 24px; text-align: left; cursor: pointer;
          display: flex; align-items: center; gap: 14px; position: relative;
          transition: color 0.25s, background 0.25s;
        }
        .cwa-stack-tab:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.02); }
        .cwa-stack-tab[data-active="true"] { color: #fafaf9; background: rgba(255,255,255,0.04); }
        .cwa-stack-tab[data-active="true"]::before {
          content: ""; position: absolute; left: 0; top: 8px; bottom: 8px;
          width: 2px; background: #fafaf9; border-radius: 0 2px 2px 0;
        }
        .cwa-stack-tab-bin {
          font-family: var(--font-mono); font-size: 10px; font-weight: 500;
          color: rgba(255,255,255,0.35); letter-spacing: 0.06em;
        }
        .cwa-stack-tab[data-active="true"] .cwa-stack-tab-bin { color: rgba(255,255,255,0.7); }
        .cwa-stack-code { padding: 22px 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.85; min-height: 320px; }
        .cwa-stack-line { display: grid; grid-template-columns: 56px 1fr; align-items: center; padding: 0 22px; }
        .cwa-stack-ln {
          color: rgba(255,255,255,0.18); font-size: 11px; text-align: right;
          padding-right: 18px; user-select: none;
        }
        .cwa-stack-line-pre { color: rgba(255,255,255,0.7); }
        .cwa-stack-line-item { color: rgba(255,255,255,0.85); transition: background 0.2s; }
        .cwa-stack-line-item:hover { background: rgba(255,255,255,0.02); }
        .cwa-stack-line-content { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cwa-stack-line-indent { color: transparent; }
        .cwa-syn-key { color: #c084fc; }
        .cwa-syn-var { color: #60a5fa; }
        .cwa-syn-prop { color: #f9a8d4; }
        .cwa-syn-str { color: #86efac; }
        .cwa-syn-punct { color: rgba(255,255,255,0.4); }
        .cwa-syn-brace { color: rgba(255,255,255,0.55); }
        .cwa-syn-cursor {
          display: inline-block; width: 7px; height: 14px;
          background: rgba(255,255,255,0.7); margin-left: 4px;
          vertical-align: middle; animation: cwa-blink 1s step-end infinite;
        }
        @keyframes cwa-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 6 — FAQs
        ═══════════════════════════════════════════════════════════════ */
        .cwa-faq-section {
          padding: clamp(80px, 10vw, 140px) 20px;
          background: #f5f5f4;
          border-top: 1px solid rgba(10,10,10,0.06);
        }
        .cwa-faq-layout {
          max-width: 1320px; margin: 0 auto;
          display: grid; grid-template-columns: 380px 1fr;
          gap: 80px; align-items: start;
        }
        .cwa-faq-aside { position: sticky; top: 120px; display: flex; flex-direction: column; gap: 14px; }
        .cwa-faq-aside .cwa-h2 { margin: 0; }
        .cwa-faq-aside .cwa-h2-lead { margin: 0 0 10px; }
        .cwa-faq-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 12px 22px; border: 1px solid rgba(0,0,0,0.85);
          color: #0a0a0a; text-decoration: none;
          font-size: 13px; font-weight: 500; border-radius: 999px;
          transition: background 0.2s, color 0.2s; align-self: flex-start;
        }
        .cwa-faq-cta:hover { background: #0a0a0a; color: #fafaf9; }
        .cwa-faq-list { display: flex; flex-direction: column; border-top: 1px solid rgba(10,10,10,0.1); }
        .cwa-faq-row { border-bottom: 1px solid rgba(10,10,10,0.1); }
        .cwa-faq-q {
          width: 100%;
          display: grid; grid-template-columns: 50px 1fr 30px;
          align-items: center; gap: 16px; padding: 22px 0;
          background: transparent; border: 0; cursor: pointer;
          text-align: left; color: #0a0a0a; font-family: var(--font-display);
        }
        .cwa-faq-q-num {
          font-family: var(--font-mono); font-size: 12px; font-weight: 500;
          color: rgba(10,10,10,0.4); letter-spacing: 0.06em;
        }
        .cwa-faq-q-text {
          font-family: var(--font-display);
          font-size: clamp(16px, 1.5vw, 20px);
          font-weight: 500; letter-spacing: -0.018em; line-height: 1.32;
        }
        .cwa-faq-q-icon {
          width: 30px; height: 30px;
          display: inline-flex; align-items: center; justify-content: center;
          border: 1px solid rgba(10,10,10,0.18);
          border-radius: 50%; color: #0a0a0a;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      background 0.25s, color 0.25s, border-color 0.25s;
        }
        .cwa-faq-row[data-open="true"] .cwa-faq-q-icon {
          transform: rotate(45deg); background: #0a0a0a; color: #fafaf9; border-color: #0a0a0a;
        }
        .cwa-faq-a {
          display: grid; grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .cwa-faq-row[data-open="true"] .cwa-faq-a { grid-template-rows: 1fr; }
        .cwa-faq-a-inner {
          overflow: hidden; padding-left: 66px;
          font-family: var(--font-body); font-size: 15px;
          line-height: 1.7; color: rgba(10,10,10,0.65);
          padding-bottom: 0;
          transition: padding-bottom 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .cwa-faq-row[data-open="true"] .cwa-faq-a-inner { padding-bottom: 26px; }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 7 — FINAL CTA (Task 3)
           Section stays flat off-white; gradient lives only on .cwa-ncta-card.
        ═══════════════════════════════════════════════════════════════ */
        .cwa-ncta {
          padding:
            clamp(56px, 7vw, 88px)
            20px
            clamp(48px, 6vw, 72px);
          background: #fafaf9;
          border-top: 1px solid rgba(10,10,10,0.08);
          position: relative;
        }
        .cwa-ncta::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(ellipse 60% 50% at 50% 0%, rgba(10,10,10,0.04) 0%, transparent 70%);
        }
        .cwa-ncta-inner {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Card — top bloom + linear fade to section color; no bottom shadow/radial so edge blends to white */
        .cwa-ncta-card {
          border-radius: 18px 18px 0 0;
          padding: clamp(28px, 4.2vw, 44px) clamp(24px, 3.5vw, 40px);
          margin-top: clamp(12px, 2vw, 28px);
          margin-bottom: clamp(18px, 3.5vw, 32px);
          background:
            radial-gradient(ellipse 115% 62% at 50% -8%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.12) 38%, transparent 62%),
            linear-gradient(
              180deg,
              #e9e8e6 0%,
              #e7e6e3 10%,
              #e5e4e1 22%,
              #e6e5e2 34%,
              #eae9e7 46%,
              #ecebe9 56%,
              #eeecea 66%,
              #f1f0ed 76%,
              #f5f4f2 86%,
              #f8f7f5 93%,
              #fafaf9 100%
            );
          border-top: 1px solid rgba(10,10,10,0.06);
          border-left: 1px solid rgba(10,10,10,0.06);
          border-right: 1px solid rgba(10,10,10,0.06);
          border-bottom: none;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.72);
        }

        /* Headline — character-split for ticker-style reveal; scale matches a closing CTA, not a hero */
        .cwa-ncta-title {
          font-family: var(--font-display);
          font-size: clamp(28px, 3.4vw, 44px);
          font-weight: 500;
          letter-spacing: -0.032em;
          line-height: 1.14;
          margin: 0 0 clamp(14px, 2vw, 22px);
          max-width: 22em;
          color: #0a0a0a;
        }
        .cwa-ncta-head {
          display: inline;
        }
        .cwa-ncta-char {
          display: inline-block;
          will-change: transform, opacity;
        }
        .cwa-ncta-italic {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.5);
        }

        /* Lead paragraph */
        .cwa-ncta-lead {
          font-size: clamp(15px, 1.25vw, 16px);
          color: rgba(10,10,10,0.65);
          line-height: 1.65;
          margin: 0 0 clamp(22px, 3vw, 32px);
          max-width: 52ch;
        }

        /* Actions row — primary button + email anchor */
        .cwa-ncta-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 22px 32px;
          margin-bottom: clamp(22px, 3vw, 30px);
        }
        .cwa-ncta-btn {
          display: inline-flex;
          align-items: stretch;
          padding: 0;
          background: #0a0a0a;
          color: #fafaf9;
          text-decoration: none;
          border-radius: 999px;
          overflow: hidden;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.005em;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
        }
        .cwa-ncta-btn:hover { transform: translateY(-2px); }
        .cwa-ncta-btn-label {
          padding: 16px 14px 16px 24px;
        }
        .cwa-ncta-btn-arrow {
          padding: 0 22px 0 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-left: 1px solid rgba(255,255,255,0.18);
          transition: background 0.3s, color 0.3s;
        }
        .cwa-ncta-btn:hover .cwa-ncta-btn-arrow {
          background: #fafaf9;
          color: #0a0a0a;
        }

        .cwa-ncta-mail {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          color: #0a0a0a;
          text-decoration: none;
          line-height: 1.2;
        }
        .cwa-ncta-mail-k {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.4);
        }
        .cwa-ncta-mail-v {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 500;
          letter-spacing: -0.018em;
          color: #0a0a0a;
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 100% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .cwa-ncta-mail:hover .cwa-ncta-mail-v {
          background-size: 0% 1px;
        }

        /* Metric strip — inside card; no bottom rule so it fades into section white */
        .cwa-ncta-rows {
          margin: 0;
          padding: clamp(18px, 2.2vw, 26px) 0 0;
          border-top: 1px solid rgba(10,10,10,0.1);
          border-bottom: none;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .cwa-ncta-row {
          padding: 0 24px;
          border-right: 1px solid rgba(10,10,10,0.08);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cwa-ncta-row:first-child { padding-left: 0; }
        .cwa-ncta-row:last-child { border-right: 0; padding-right: 0; }
        .cwa-ncta-row dt {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.45);
          margin: 0;
        }
        .cwa-ncta-row dd {
          font-family: var(--font-display);
          font-size: clamp(15px, 1.3vw, 17px);
          font-weight: 500;
          letter-spacing: -0.018em;
          color: #0a0a0a;
          margin: 0;
        }

        /* ═══════════════════════════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .cwa-hero .csd-hero-main {
            grid-template-columns: 1fr; gap: 64px; min-height: auto;
          }
          .cwa-hero .csd-hero-left { max-width: 760px; }
          .cwa-hero .csd-hero-right { max-width: 720px; margin: 0 auto; width: 100%; }
          .cwa-hero .csd-hero-form-shell { max-width: 100%; }

          /* TASK 1: Mobile/tablet treatment of growth section.
             Release the pin layout — natural flow, image first then text.
             No 100vh stage, no clamped image height, no sticky-cursor styles. */
          .cwa-growth-stage {
            height: auto;
            min-height: 0;
            padding: clamp(72px, 9vw, 120px) 20px;
            overflow: visible;
          }
          .cwa-growth-inner { gap: clamp(40px, 5vw, 64px); }
          .cwa-growth-head-inline {
            flex-direction: column; align-items: flex-start; gap: 14px;
          }
          .cwa-growth-head-inline .cwa-h2 {
            flex: initial; margin: 0; transform: none;
            font-size: clamp(34px, 4.6vw, 64px);
          }
          .cwa-growth-head-inline .cwa-h2-lead {
            flex: initial; margin: 0; transform: none;
            font-size: 16px; line-height: 1.7;
          }
          .cwa-growth-grid { grid-template-columns: 1fr; gap: 40px; align-items: start; }
          .cwa-growth-media-wrap { position: static; align-self: stretch; }
          .cwa-growth-media {
            aspect-ratio: 16 / 11; max-width: 720px; max-height: none; margin: 0 auto;
          }
          /* Restore comfortable pillar sizing on smaller screens */
          .cwa-pillar-row {
            grid-template-columns: 56px 1fr;
            gap: 22px;
            padding: 32px 0 36px;
            opacity: 0.42;
            transform: none;
          }
          .cwa-pillar-row[data-active="true"] { transform: none; }
          .cwa-pillar-marker-line { height: 30px; }
          .cwa-pillar-row[data-active="true"] .cwa-pillar-marker-line { height: 50px; }
          .cwa-pillar-title { font-size: clamp(22px, 2.4vw, 30px); }
          .cwa-pillar-metric { font-size: 11px; padding: 6px 12px; }
          .cwa-pillar-desc { font-size: 15px; line-height: 1.7; }

          .cwa-cost-split {
            grid-template-columns: 1fr;
            gap: 40px;
            width: 100%;
          }
          .cwa-cost-split > * { min-width: 0; }
          .cwa-cost-media {
            min-height: 320px;
            aspect-ratio: 16 / 9;
            width: 100%;
            max-width: 100%;
            justify-self: stretch;
          }
          /* Photo is composed with the laptop on the right; center crop reads as off-balance on narrow viewports */
          .cwa-cost-media-img { object-position: right center; }
          .cwa-fail-grid { grid-template-columns: repeat(2, 1fr); }

          .cwa-process-steps { padding-left: 48px; }
          .cwa-process-line { left: 22px; transform: none; }
          .cwa-proc-step { grid-template-columns: 1fr; }
          .cwa-proc-step-marker {
            position: absolute; left: -38px; top: 18px; grid-column: 1;
          }
          .cwa-proc-step[data-side="L"] .cwa-proc-step-card,
          .cwa-proc-step[data-side="R"] .cwa-proc-step-card {
            grid-column: 1; margin: 0; text-align: left;
          }
          .cwa-proc-step[data-side="L"] .cwa-proc-step-head,
          .cwa-proc-step[data-side="R"] .cwa-proc-step-head { align-items: flex-start; }
          .cwa-proc-step[data-side="L"] .cwa-proc-step-desc { margin-left: 0; }

          .cwa-stack-window-body { grid-template-columns: 1fr; }
          .cwa-stack-tabs {
            flex-direction: row; overflow-x: auto; padding: 0;
            border-right: 0; border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .cwa-stack-tab { padding: 16px 20px; flex-shrink: 0; }
          .cwa-stack-tab[data-active="true"]::before {
            top: auto; bottom: 0; left: 20px; right: 20px;
            width: auto; height: 2px; border-radius: 2px 2px 0 0;
          }

          .cwa-faq-layout { grid-template-columns: 1fr; gap: 48px; }
          .cwa-faq-aside { position: static; }

          /* CTA tablet — 2x2 metric strip */
          .cwa-ncta-rows { grid-template-columns: repeat(2, 1fr); gap: 0; }
          .cwa-ncta-row {
            padding: 18px 18px 18px 0;
            border-right: 1px solid rgba(10,10,10,0.08);
            border-bottom: 1px solid rgba(10,10,10,0.08);
          }
          .cwa-ncta-row:nth-child(2) { border-right: 0; padding-right: 0; }
          .cwa-ncta-row:nth-child(3) { padding-left: 0; }
          .cwa-ncta-row:nth-child(3),
          .cwa-ncta-row:nth-child(4) { border-bottom: 0; }
          .cwa-ncta-row:first-child { padding-left: 0; }
          .cwa-ncta-row:last-child { padding-right: 0; }
        }

        @media (max-width: 1100px) and (min-width: 901px) {
          .cwa-hero .csd-hero-left { transform: translateY(18px); }
        }

        @media (max-width: 900px) {
          .cwa-hero-bg-video { display: none; }
          .cwa-hero-mobile-bg { display: block; }
          .cwa-hero-bg-overlay {
            background:
              linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.78) 55%, rgba(0,0,0,0.88) 100%),
              linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 100%);
          }
          .cwa-hero { padding: clamp(96px, 14svh, 128px) 14px 0; }
          .cwa-hero .csd-hero-mobile-spacer {
            display: block; flex: 1 1 auto;
            min-height: min(26vh, 220px); max-height: 44vh;
          }
          .cwa-hero .csd-hero-left {
            display: flex; flex-direction: column;
            min-height: min(58svh, 580px); transform: none; max-width: none;
          }
          .cwa-hero-title { font-size: clamp(30px, 7.2vw, 42px); line-height: 1.02; margin-bottom: 16px; }
          .cwa-h1-lines-desktop { display: none; }
          .cwa-h1-lines-mobile { display: block; }
          .cwa-hero-lead { font-size: 15px; line-height: 1.62; margin-bottom: 24px; max-width: none; }
          .cwa-hero-inner { gap: 0; }
          .cwa-hero .csd-hero-main { min-height: auto; gap: 0; }
          .cwa-hero .csd-hero-right {
            align-self: stretch; width: 100%; margin-top: 0; align-items: stretch;
          }
          .cwa-hero .csd-hero-form-shell {
            max-width: none; width: 100%; margin: 0 auto;
            border-radius: 22px; padding: 32px 20px 40px;
          }
          .cwa-hero .csd-hero-form-subtitle { max-width: none; }
          .cwa-hero .csd-hero-form { gap: 22px; }
        }

        @media (max-width: 768px) {
          .cwa-hero { padding: 130px 14px 60px; min-height: auto; }
          .cwa-hero .csd-hero-left { transform: none; }
          .cwa-hero-title {
            font-size: clamp(26px, 7vw, 38px);
            max-width: 100%; margin-bottom: 16px; line-height: 1.03;
          }
          .cwa-hero-lead { font-size: 14px; line-height: 1.58; margin-bottom: 20px; }
          .cwa-hero-cta-row { gap: 10px; margin-bottom: 40px; }
          .cwa-hero .csd-hero-form-grid { grid-template-columns: 1fr; }
          .cwa-hero .csd-hero-form-foot { flex-direction: column; align-items: stretch; }
          .cwa-hero .csd-hero-form-submit { width: 100%; }
          .cwa-hero .csd-hero-form-shell {
            padding: 28px 18px 40px; border-radius: 22px; width: 100%;
            margin-left: auto; margin-right: auto;
          }

          .cwa-growth, .cwa-cost, .cwa-stack-section, .cwa-faq-section, .cwa-process-section, .cwa-ncta {
            padding-left: 14px; padding-right: 14px;
          }

          /* TASK 1: Mobile-specific growth tightening */
          .cwa-growth-stage {
            padding: 64px 14px;
          }
          .cwa-growth-head-inline .cwa-h2 {
            font-size: clamp(28px, 7vw, 38px);
          }
          .cwa-growth-head-inline .cwa-h2-lead {
            font-size: 14.5px; line-height: 1.65;
          }
          .cwa-growth-grid { gap: 32px; }
          .cwa-growth-media {
            aspect-ratio: 4 / 3;
            border-radius: 16px;
          }
          /* Disable image scale-in transition on mobile so swapping is instant
             — the slow scale-in feels laggy on touch devices and the user
             never sits on a single pillar long enough to need it. */
          .cwa-growth-media-img {
            transition: opacity 0.4s ease;
            transform: none;
          }
          .cwa-growth-media-img[data-active="true"] {
            transform: none;
          }
          .cwa-growth-media-progress { top: 14px; right: 14px; }
          .cwa-growth-media-progress span { width: 14px; }
          .cwa-growth-media-progress span[data-active="true"] { width: 22px; }
          .cwa-growth-media-active {
            left: 14px; right: 14px; bottom: 14px;
            padding: 12px 14px; gap: 14px;
            border-radius: 10px;
          }
          .cwa-growth-media-active-num { font-size: 28px; }
          .cwa-growth-media-active-k { font-size: 16px; }
          .cwa-growth-media-active-v { font-size: 11.5px; }

          .cwa-pillar-list { border: 0; }
          .cwa-pillar-row {
            grid-template-columns: 36px 1fr;
            gap: 14px;
            padding: 22px 0 24px;
          }
          .cwa-pillar-marker-num { font-size: 20px; }
          .cwa-pillar-marker-line { height: 22px; }
          .cwa-pillar-row[data-active="true"] .cwa-pillar-marker-line { height: 36px; }
          .cwa-pillar-body {
            grid-template-columns: 1fr;
            row-gap: 8px;
            column-gap: 12px;
          }
          .cwa-pillar-title { font-size: 18px; }
          .cwa-pillar-metric {
            grid-row: auto;
            justify-self: start;
            font-size: 10.5px;
            padding: 4px 10px;
          }
          .cwa-pillar-desc { font-size: 13.5px; line-height: 1.62; }
          /* Reduce motion impact on mobile — no transform shift when active */
          .cwa-pillar-row { opacity: 0.55; transform: none; }
          .cwa-pillar-row[data-active="true"] { opacity: 1; transform: none; }

          /* Cost section: constrain inner width so media aligns with padded section edge */
          .cwa-cost-inner { width: 100%; box-sizing: border-box; }
          .cwa-cost-media {
            margin-left: auto;
            margin-right: auto;
          }

          .cwa-fail-grid { grid-template-columns: 1fr; gap: 18px; }
          .cwa-fail-card-body { padding: 20px 18px 22px; }
          .cwa-fail-card-visual { aspect-ratio: 16 / 9; }

          .cwa-process-steps { padding-left: 36px; }
          .cwa-process-line { left: 14px; }
          .cwa-proc-step-marker { left: -30px; }
          .cwa-proc-step-card { padding: 22px 22px 24px; }

          .cwa-stack-tab { padding: 14px 16px; font-size: 13px; }
          .cwa-stack-code { font-size: 11.5px; min-height: 280px; padding: 16px 0; }
          .cwa-stack-line { padding: 0 14px; grid-template-columns: 36px 1fr; }
          .cwa-stack-ln { padding-right: 12px; }

          .cwa-faq-q { grid-template-columns: 36px 1fr 26px; gap: 12px; padding: 18px 0; }
          .cwa-faq-q-icon { width: 26px; height: 26px; }
          .cwa-faq-a-inner { padding-left: 48px; font-size: 14px; }

          /* CTA mobile — single column metrics, larger tap targets */
          .cwa-ncta {
            padding-top: clamp(48px, 10vw, 72px);
            padding-bottom: clamp(44px, 9vw, 64px);
          }
          .cwa-ncta-card {
            border-radius: 14px 14px 0 0;
            padding: 24px 18px 26px;
            margin-top: clamp(8px, 3vw, 20px);
            margin-bottom: clamp(14px, 4vw, 24px);
          }
          .cwa-ncta-title { font-size: clamp(24px, 6.2vw, 32px); max-width: none; }
          .cwa-ncta-lead { font-size: 14.5px; margin-bottom: 22px; }
          .cwa-ncta-actions { gap: 18px; }
          .cwa-ncta-btn-label { padding: 14px 12px 14px 22px; }
          .cwa-ncta-btn-arrow { padding: 0 18px 0 12px; }
          .cwa-ncta-mail-v { font-size: 16px; }
          .cwa-ncta-rows { grid-template-columns: 1fr 1fr; }
          .cwa-ncta-row { padding: 14px 14px 14px 0; }
          .cwa-ncta-row:nth-child(odd) { padding-left: 0; }
          .cwa-ncta-row:nth-child(even) { padding-right: 0; border-right: 0; }
          .cwa-ncta-row dd { font-size: 15px; }
        }

        /* Reduced motion — disable cursor follow & heavy transitions */
        @media (prefers-reduced-motion: reduce) {
          .cwa-cursor { display: none !important; }
          .cwa-growth-stage, .cwa-growth-stage * { cursor: auto !important; }
          .cwa-growth-media-img { transition: opacity 0.2s ease; transform: none; }
          .cwa-growth-media-img[data-active="true"] { transform: none; }
          .cwa-pillar-row { transition: opacity 0.2s ease; transform: none !important; }
        }
      `}</style>
    </>
  );
}