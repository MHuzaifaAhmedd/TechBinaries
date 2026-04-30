"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────────

// The six sub-services under "Custom Software & Digital Solutions".
// Each links to its own dedicated subpage. Order intentionally moves from
// most-comprehensive (web apps, mobile, SaaS) → enabling layers (UX, CMS, LPs).
const SUB_SERVICES = [
  {
    num: "01",
    title: "Custom Web Application Development",
    desc: "Production-grade web apps built for performance, scale, and long-term maintainability.",
    href: "/services/custom-software-digital-solutions/custom-web-application-development",
    accent: "#f472b6",
    tags: ["Next.js", "React", "Node", "Postgres"],
  },
  {
    num: "02",
    title: "Mobile App Development",
    desc: "Native and cross-platform iOS & Android apps that feel fast and ship on schedule.",
    href: "/services/custom-software-digital-solutions/mobile-app-development-ios-android",
    accent: "#a3e635",
    tags: ["iOS", "Android", "React Native", "Swift"],
  },
  {
    num: "03",
    title: "SaaS Product Development",
    desc: "Multi-tenant SaaS platforms with billing, auth, analytics, and growth loops baked in.",
    href: "/services/custom-software-digital-solutions/saas-product-development",
    accent: "#38bdf8",
    tags: ["Multi-tenant", "Billing", "Auth", "Analytics"],
  },
  {
    num: "04",
    title: "UI/UX Design Systems",
    desc: "Design systems, component libraries, and product UX engineered for consistency at scale.",
    href: "/services/custom-software-digital-solutions/ui-ux-design-systems",
    accent: "#fbbf24",
    tags: ["Design Systems", "Figma", "Tokens", "A11y"],
  },
  {
    num: "05",
    title: "CMS & Admin Panel Development",
    desc: "Content systems and internal tools that empower teams without slowing them down.",
    href: "/services/custom-software-digital-solutions/cms-admin-panel-development",
    accent: "#c084fc",
    tags: ["Headless CMS", "Admin UI", "RBAC", "Workflows"],
  },
  {
    num: "06",
    title: "High-Performance Landing Pages",
    desc: "Pixel-perfect, conversion-tuned landing pages with sub-second load and SEO baked in.",
    href: "/services/custom-software-digital-solutions/high-performance-landing-pages",
    accent: "#fb7185",
    tags: ["Core Web Vitals", "SEO", "A/B Ready", "CRO"],
  },
];

// "What We Actually Build" — translates abstract service names into concrete
// product types clients can recognize themselves in. Each is intentionally
// short — recognition, not marketing copy.
const WE_BUILD = [
  {
    label: "SaaS Platforms",
    desc: "Multi-tenant products with billing, dashboards, and integrations.",
    glyph: "◐",
  },
  {
    label: "Business Dashboards",
    desc: "Real-time analytics surfaces wired to your live data.",
    glyph: "◑",
  },
  {
    label: "Mobile Apps",
    desc: "Native iOS, Android, and cross-platform consumer apps.",
    glyph: "◒",
  },
  {
    label: "Internal Tools",
    desc: "Admin panels and ops tooling that replace spreadsheets.",
    glyph: "◓",
  },
  {
    label: "MVPs",
    desc: "Ship-fast prototypes built on architecture that can scale.",
    glyph: "◔",
  },
  {
    label: "Marketplaces",
    desc: "Two-sided platforms with payments, search, and trust systems.",
    glyph: "◕",
  },
];

// Why Choose Us — focuses on *how* we work, not generic adjectives.
// Each pairs a sharp claim with the operating principle behind it.
const VALUE_PROPS = [
  {
    num: "01",
    title: "Performance-first development",
    desc: "Every line of code is measured. Lighthouse scores, Core Web Vitals, and runtime budgets are non-negotiable, not afterthoughts.",
    metric: "98+",
    metricLabel: "Avg. Lighthouse",
  },
  {
    num: "02",
    title: "Scalable architecture by default",
    desc: "We design for the system you'll need in two years, not the prototype you have today. Clean boundaries, observable systems, sane defaults.",
    metric: "10×",
    metricLabel: "Traffic headroom",
  },
  {
    num: "03",
    title: "Clean UX systems",
    desc: "Component libraries and design tokens that make your product feel coherent across every surface — mobile, web, admin.",
    metric: "1",
    metricLabel: "Source of truth",
  },
  {
    num: "04",
    title: "Fast iteration cycles",
    desc: "Weekly demos. Production deploys behind feature flags. You stay close to the work and ship without ceremony.",
    metric: "7d",
    metricLabel: "Sprint cadence",
  },
];

// Process — mirrors the landing page exactly (same horizontal-pinned UX),
// but extended to 6 phases per the brief: Discovery → Design → Dev →
// Testing → Launch → Support.
const PROCESS = [
  {
    num: "01",
    title: "Discovery",
    desc: "Deep-dive into your business, users, and technical landscape to uncover what actually needs to be built.",
    points: ["Stakeholder interviews", "Technical audit", "Opportunity mapping"],
  },
  {
    num: "02",
    title: "Design",
    desc: "We design the experience — flows, wireframes, and high-fidelity UI — before a single line of production code is written.",
    points: ["UX flows & wireframes", "High-fidelity UI", "Design tokens"],
  },
  {
    num: "03",
    title: "Development",
    desc: "Agile sprints with weekly demos. You stay close to the work. We ship fast without cutting corners.",
    points: ["Weekly demos", "CI/CD pipeline", "Code review"],
  },
  {
    num: "04",
    title: "Testing",
    desc: "Automated and manual QA across devices, browsers, and edge cases. Performance, accessibility, and security baked in.",
    points: ["Automated test suites", "Cross-device QA", "Performance budgets"],
  },
  {
    num: "05",
    title: "Launch",
    desc: "Phased rollout with monitoring, observability, and rollback plans. We don't ship and pray.",
    points: ["Phased rollout", "Monitoring & alerts", "Rollback ready"],
  },
  {
    num: "06",
    title: "Support",
    desc: "Post-launch support, iteration, and growth. We don't disappear after go-live.",
    points: ["SLA-backed support", "Continuous improvement", "Roadmap planning"],
  },
];

// Tech stack — matched to the marquee on the landing page (same UI), but
// curated to what *actually* applies to custom software builds. Grouped
// conceptually but rendered as a continuous marquee per the brief.
const TECH = [
  // Frontend
  "React", "Next.js", "TypeScript", "Vue", "Svelte", "Tailwind",
  // Backend
  "Node.js", "Python", "Go", "Rust", "GraphQL", "PostgreSQL",
  // Mobile
  "Swift", "Kotlin", "React Native", "Flutter",
  // Cloud / Infra
  "AWS", "GCP", "Kubernetes", "Docker", "Terraform", "Redis",
];

// Results — outcomes, not vanity metrics. Each pairs a number with the
// shape of the win, so the section reads as proof not boast.
const RESULTS = [
  {
    metric: "43%",
    label: "Faster page loads",
    desc: "Average performance improvement after migrating clients to our build pipeline and edge-cached architecture.",
  },
  {
    metric: "2.4×",
    label: "Conversion lift",
    desc: "Median uplift on landing pages and onboarding flows we've redesigned and re-engineered for measured outcomes.",
  },
  {
    metric: "$4M",
    label: "Annual savings",
    desc: "Operational cost reduced for a logistics client through a custom route-optimization platform we shipped in year one.",
  },
  {
    metric: "2M+",
    label: "Users served",
    desc: "A SaaS product we architected scaled from beta to two million monthly active users without a major incident.",
  },
];

// FAQs — written to capture long-tail intent and remove buying friction.
// Each answer is direct, no hedging, no marketing fluff.
const FAQS = [
  {
    q: "How much does custom software development cost?",
    a: "Most projects fall between $40K and $250K depending on scope, team size, and timeline. We provide fixed-price proposals after a paid discovery sprint so there are no surprises mid-build. For exploratory MVPs, we also offer time-and-materials engagements with weekly cost ceilings.",
  },
  {
    q: "How long does it take to build a custom application?",
    a: "MVPs typically take 8–12 weeks. Full production builds run 16–24 weeks. We share a detailed Gantt during the proposal phase, with weekly milestones you can hold us to. Tight deadlines are doable when scope is clear — we'll tell you honestly what fits.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "Our default stack is TypeScript end-to-end (React, Next.js, Node), Postgres, and AWS or GCP. For mobile we ship native (Swift, Kotlin) when performance matters and React Native when speed-to-market wins. We choose tooling based on your problem, not because it's trendy.",
  },
  {
    q: "Do you handle the entire process or just one part?",
    a: "Both. We can own discovery → design → engineering → launch → support end-to-end, or we can plug into your existing team in any of those phases. Most clients start with a discovery sprint and expand the engagement based on what's working.",
  },
  {
    q: "What happens after the product launches?",
    a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and small feature work. Many clients keep us on as a fractional engineering team. You're never locked in — all code, infrastructure, and credentials transfer to you.",
  },
  {
    q: "Can you work with our existing team or codebase?",
    a: "Yes. We do legacy modernization, codebase audits, and team augmentation. We're comfortable inheriting messy code, untangling architecture, and shipping alongside your engineers. No ego, no rewrites for the sake of rewriting.",
  },
  {
    q: "How do you handle data security and compliance?",
    a: "SOC 2-aligned engineering practices by default. We've shipped HIPAA, PCI-DSS, and GDPR-compliant systems. Security reviews, penetration testing, and threat modeling are part of our standard delivery, not an upsell.",
  },
  {
    q: "Do you sign NDAs before discovery calls?",
    a: "Of course. Send us your NDA before the call and we'll have it back signed within the day. We also have a mutual NDA template if you'd prefer to use ours.",
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function CustomSoftwarePage() {
  // Hero rotating word — same pattern as the home page hero, but the words
  // are nouns describing what we ship, not verbs. Keeps the heading dynamic
  // without echoing the homepage exactly.
  const HERO_NOUNS = ["software", "platforms", "products", "systems", "experiences"];
  const [rotatingNoun, setRotatingNoun] = useState(0);

  // FAQ accordion — only one open at a time, pure state, no animation lib.
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Mobile breakpoint — used to fork the Process section's UX (pinned on
  // desktop, vertical stack on mobile).
  const [isMobile, setIsMobile] = useState(false);

  // Tech marquee refs (same pattern as landing page).
  const marqueeLeftRef = useRef<HTMLDivElement>(null);
  const marqueeRightRef = useRef<HTMLDivElement>(null);
  const marqueeLeftTweenRef = useRef<gsap.core.Tween | null>(null);
  const marqueeRightTweenRef = useRef<gsap.core.Tween | null>(null);

  // Lenis smooth scroll — matches landing page so transitions between
  // pages feel consistent.
  const lenisRef = useRef<Lenis | null>(null);

  // Mobile detector
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Hero rotating noun
  useEffect(() => {
    const id = setInterval(() => {
      setRotatingNoun((v) => (v + 1) % HERO_NOUNS.length);
    }, 2600);
    return () => clearInterval(id);
  }, [HERO_NOUNS.length]);

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
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── HERO intro ──
      const heroTl = gsap.timeline({ delay: 0.15 });
      const headlineChars = gsap.utils.toArray<HTMLElement>(".csd-hero-char");
      heroTl.fromTo(
        headlineChars,
        { yPercent: 110, rotateX: -35, opacity: 0 },
        {
          yPercent: 0, rotateX: 0, opacity: 1,
          duration: 0.9,
          stagger: { each: 0.018, from: "start" },
          ease: "power4.out",
        },
        0
      );
      heroTl.fromTo(
        ".csd-hero-noun-mask",
        { yPercent: 100 },
        { yPercent: 0, duration: 0.85, ease: "power4.out" },
        0.2
      );
      heroTl.fromTo(
        ".csd-hero-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.7
      );

      // ── Section header fade-ins ──
      gsap.utils.toArray<HTMLElement>(".csd-sh").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 38 },
          {
            opacity: 1, y: 0, duration: 0.95, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // ── Service cards stagger ──
      gsap.utils.toArray<HTMLElement>(".csd-svc-card").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
            delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: el, start: "top 90%" },
          }
        );
      });

      // ── "What we build" tile reveal ──
      gsap.utils.toArray<HTMLElement>(".csd-build-tile").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
            delay: (i % 3) * 0.06,
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });

      // ── Value props stagger ──
      gsap.utils.toArray<HTMLElement>(".csd-value-row").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, x: -30 },
          {
            opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
            delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // ── Results metrics count-up ──
      gsap.utils.toArray<HTMLElement>(".csd-result-num").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      // ── FAQs ──
      gsap.utils.toArray<HTMLElement>(".csd-faq-row").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 14 },
          {
            opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
            delay: i * 0.04,
            scrollTrigger: { trigger: el, start: "top 92%" },
          }
        );
      });

      // ── Process: horizontal pin (desktop only) ──
      const processTrack = document.querySelector<HTMLElement>(".csd-process-track");
      const processPin = document.querySelector<HTMLElement>(".csd-process-pin");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        if (!processTrack || !processPin) return;
        const getScrollDistance = () =>
          processTrack.scrollWidth - window.innerWidth + 80;
        gsap.to(processTrack, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: processPin,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      // ── CTA fade ──
      gsap.fromTo(
        ".csd-cta-inner",
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".csd-cta-inner", start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  // Tech marquee — same pattern as landing page
  useEffect(() => {
    const left = marqueeLeftRef.current;
    const right = marqueeRightRef.current;
    if (!left || !right) return;

    gsap.set(left, { xPercent: 0 });
    gsap.set(right, { xPercent: -50 });

    const leftTween = gsap.to(left, {
      xPercent: -50,
      duration: 55,
      ease: "none",
      repeat: -1,
    });
    const rightTween = gsap.to(right, {
      xPercent: 0,
      duration: 60,
      ease: "none",
      repeat: -1,
    });

    marqueeLeftTweenRef.current = leftTween;
    marqueeRightTweenRef.current = rightTween;

    return () => {
      marqueeLeftTweenRef.current = null;
      marqueeRightTweenRef.current = null;
      leftTween.kill();
      rightTween.kill();
    };
  }, []);

  const handleTechMarqueeEnter = () => {
    const leftTween = marqueeLeftTweenRef.current;
    const rightTween = marqueeRightTweenRef.current;
    if (leftTween) gsap.to(leftTween, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
    if (rightTween) gsap.to(rightTween, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
  };

  const handleTechMarqueeLeave = () => {
    const leftTween = marqueeLeftTweenRef.current;
    const rightTween = marqueeRightTweenRef.current;
    if (leftTween) gsap.to(leftTween, { timeScale: 1, duration: 0.45, ease: "power2.out" });
    if (rightTween) gsap.to(rightTween, { timeScale: 1, duration: 0.45, ease: "power2.out" });
  };

  // Refresh ScrollTrigger after fonts load
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    fonts.ready.then(() => {
      ScrollTrigger.refresh();
    });
  }, []);

  return (
    <>
      {/* ── GRAIN OVERLAY (matches landing page texture) ── */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
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
            "Custom Software & Digital Solutions" positioning + first impression.
            Mirrors the landing-page hero treatment: rotating word, dot grid,
            crosshair marks, two CTAs. Personalized noun list to differentiate.
        ═══════════════════════════════════════════════════════════════ */}
        <section
          className="csd-hero"
          style={{
            minHeight: "calc(100vh - 40px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "140px 20px 80px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Dot grid */}
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(rgba(0,0,0,0.09) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage: "radial-gradient(ellipse 75% 65% at 35% 45%, black 0%, transparent 95%)",
              WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 35% 45%, black 0%, transparent 95%)",
              pointerEvents: "none",
            }}
          />

          {/* Crosshair corner marks */}
          {[
            { top: 140, left: 40, b: "Top", r: "Left" },
            { top: 140, right: 40, b: "Top", r: "Right" },
            { bottom: 40, left: 40, b: "Bottom", r: "Left" },
            { bottom: 40, right: 40, b: "Bottom", r: "Right" },
          ].map((c, i) => (
            <div
              key={i}
              aria-hidden
              style={{
                position: "absolute",
                top: c.top, left: c.left, right: c.right, bottom: c.bottom,
                width: 10, height: 10,
                borderTop: c.b === "Top" ? "1px solid rgba(0,0,0,0.22)" : undefined,
                borderBottom: c.b === "Bottom" ? "1px solid rgba(0,0,0,0.22)" : undefined,
                borderLeft: c.r === "Left" ? "1px solid rgba(0,0,0,0.22)" : undefined,
                borderRight: c.r === "Right" ? "1px solid rgba(0,0,0,0.22)" : undefined,
                pointerEvents: "none",
              }}
            />
          ))}

          <div style={{ maxWidth: 1320, width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>
            {/* Breadcrumb / category eyebrow */}
            <div
              className="csd-hero-fade"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 36,
                opacity: 0,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "rgba(10,10,10,0.5)",
              }}
            >
              <span
                style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#f472b6",
                  boxShadow: "0 0 0 4px rgba(244,114,182,0.18)",
                }}
              />
              <Link href="/services" style={{ color: "inherit", textDecoration: "none" }}>
                Services
              </Link>
              <span style={{ opacity: 0.4 }}>/</span>
              <span style={{ color: "#0a0a0a" }}>Custom Software &amp; Digital Solutions</span>
            </div>

            <div className="csd-hero-grid">
              {/* LEFT — headline + body + CTAs */}
              <div>
                <h1
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(40px, 5.6vw, 92px)",
                    fontWeight: 500,
                    lineHeight: 0.96,
                    letterSpacing: "-0.032em",
                    margin: "0 0 36px",
                  }}
                >
                  <div style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
                    {"Custom".split("").map((c, i) => (
                      <span
                        key={`l1-${i}`}
                        className="csd-hero-char"
                        style={{ display: "inline-block", willChange: "transform" }}
                      >
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      overflow: "hidden",
                      paddingBottom: "0.08em",
                      display: "flex",
                      flexWrap: "nowrap",
                      alignItems: "baseline",
                      gap: "0.22em",
                    }}
                  >
                    <span style={{ display: "inline-flex", overflow: "hidden", flexShrink: 0 }}>
                      {/* Word: italic rotating noun ("software / platforms / products …") */}
                    </span>
                    <span
                      aria-live="polite"
                      style={{
                        position: "relative",
                        display: "inline-block",
                        overflow: "visible",
                        verticalAlign: "bottom",
                        minWidth: "8.5ch",
                        paddingRight: "0.12em",
                      }}
                    >
                      <span className="csd-hero-noun-mask" style={{ display: "inline-block", willChange: "transform" }}>
                        {HERO_NOUNS.map((v, i) => (
                          <span
                            key={v}
                            style={{
                              display: "block",
                              fontStyle: "italic",
                              fontWeight: 400,
                              color: "rgba(0,0,0,0.62)",
                              whiteSpace: "nowrap",
                              transform: `translateY(${(i - rotatingNoun) * 100}%)`,
                              transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
                              position: i === 0 ? "relative" : "absolute",
                              top: 0,
                              left: 0,
                            }}
                          >
                            {v}
                          </span>
                        ))}
                      </span>
                    </span>
                  </div>
                  <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
                    {"engineered for".split("").map((c, i) => (
                      <span
                        key={`l3-${i}`}
                        className="csd-hero-char"
                        style={{ display: "inline-block", willChange: "transform" }}
                      >
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </div>
                  <div className="csd-hero-line-final" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                    {"the long run.".split("").map((c, i) => (
                      <span
                        key={`l4-${i}`}
                        className="csd-hero-char"
                        style={{
                          display: "inline-block",
                          willChange: "transform",
                          color: c === "." ? "rgba(0,0,0,0.28)" : "inherit",
                          whiteSpace: "pre",
                        }}
                      >
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </div>
                </h1>

                <p
                  className="csd-hero-fade"
                  style={{
                    fontSize: 17,
                    color: "rgba(0,0,0,0.6)",
                    maxWidth: 540,
                    lineHeight: 1.65,
                    margin: "0 0 36px",
                    fontWeight: 400,
                    opacity: 0,
                  }}
                >
                  We design and build production-grade web apps, mobile apps, SaaS platforms,
                  and internal tools for startups, growth-stage businesses, and enterprises.
                  Engineered to ship fast, scale cleanly, and stay maintainable for years.
                </p>

                <div
                  className="csd-hero-fade"
                  style={{ display: "flex", gap: 12, opacity: 0, flexWrap: "wrap" }}
                >
                  <Link
                    href="/contact"
                    className="csd-cta-primary"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "15px 28px",
                      background: "#0a0a0a",
                      color: "#fafaf9",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 500,
                      borderRadius: 999,
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <span style={{ position: "relative", zIndex: 2 }}>Start a project</span>
                    <svg
                      aria-hidden
                      width="12" height="12" viewBox="0 0 12 12"
                      className="csd-cta-arrow"
                      style={{ position: "relative", zIndex: 2, flexShrink: 0 }}
                    >
                      <path
                        d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                  <a
                    href="#capabilities"
                    className="csd-cta-secondary"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "15px 28px",
                      border: "1px solid rgba(0,0,0,0.18)",
                      color: "#0a0a0a",
                      textDecoration: "none",
                      fontSize: 14,
                      fontWeight: 500,
                      borderRadius: 999,
                      background: "rgba(255,255,255,0.5)",
                      transition: "background 0.2s, border-color 0.2s",
                    }}
                  >
                    Explore capabilities
                  </a>
                </div>
              </div>

              {/* RIGHT — visual: stacked stat cards instead of repeating the homepage terminal */}
              <div
                className="csd-hero-side csd-hero-fade"
                style={{ opacity: 0, position: "relative" }}
              >
                <div className="csd-hero-stats">
                  {[
                    { k: "Products shipped", v: "150+", note: "Across SaaS, mobile, and platforms" },
                    { k: "Avg. Lighthouse", v: "98", note: "Performance, never an afterthought" },
                    { k: "Time to MVP", v: "8 wk", note: "From kickoff to production" },
                    { k: "Senior team", v: "100%", note: "No juniors hidden in the bench" },
                  ].map((it) => (
                    <div key={it.k} className="csd-hero-stat">
                      <div className="csd-hero-stat-label">{it.k}</div>
                      <div className="csd-hero-stat-value">{it.v}</div>
                      <div className="csd-hero-stat-note">{it.note}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — SERVICES SNAPSHOT
            Six sub-services, each linking to its own dedicated page.
            Grid of cards — clear, scannable, SEO hub.
        ═══════════════════════════════════════════════════════════════ */}
        <section
          id="capabilities"
          style={{
            padding: "120px 20px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "#fafaf9",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div
              className="csd-sh"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                gap: 40,
                flexWrap: "wrap",
                marginBottom: 56,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
                    textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
                    marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
                  }}
                >
                  <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
                  Our capabilities
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 4.4vw, 64px)",
                    fontWeight: 500,
                    letterSpacing: "-0.032em",
                    lineHeight: 1.02,
                    margin: 0,
                    maxWidth: 760,
                  }}
                >
                  Six disciplines.{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
                    One senior team.
                  </span>
                </h2>
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(0,0,0,0.58)",
                  maxWidth: 380,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Pick the capability you need — or combine several into a single
                end-to-end engagement. Each links to a dedicated overview.
              </p>
            </div>

            <div className="csd-svc-grid">
              {SUB_SERVICES.map((s) => (
                <Link
                  key={s.num}
                  href={s.href}
                  className="csd-svc-card"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <article>
                    <div className="csd-svc-card-top">
                      <span
                        className="csd-svc-dot"
                        style={{
                          background: s.accent,
                          boxShadow: `0 0 0 4px ${s.accent}1a`,
                        }}
                      />
                      <span className="csd-svc-num">{s.num}</span>
                    </div>
                    <h3 className="csd-svc-title">{s.title}</h3>
                    <p className="csd-svc-desc">{s.desc}</p>
                    <div className="csd-svc-tags">
                      {s.tags.map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="csd-svc-cta">
                      Learn more
                      <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                        <path
                          d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — WHAT WE ACTUALLY BUILD
            Translates abstract service names into concrete product types.
            Image-on-left + grid-on-right layout for visual variety.
        ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "120px 20px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "#f5f5f4",
            position: "relative",
          }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div className="csd-build-layout">
              <div className="csd-build-left csd-sh">
                <div
                  style={{
                    fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
                    textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
                    marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
                  }}
                >
                  <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
                  What we build
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 4vw, 56px)",
                    fontWeight: 500,
                    letterSpacing: "-0.032em",
                    lineHeight: 1.02,
                    margin: "0 0 24px",
                  }}
                >
                  Real products,{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
                    not slides.
                  </span>
                </h2>
                <p
                  style={{
                    fontSize: 16, color: "rgba(0,0,0,0.62)",
                    lineHeight: 1.7, margin: "0 0 36px", maxWidth: 460,
                  }}
                >
                  Service categories are abstract. Here's what they actually become
                  in production — the product shapes we ship most often, in the
                  order clients usually find us.
                </p>

                {/* Inline visual: stylized "product shape" stack — pure SVG, no asset */}
                <div className="csd-build-visual" aria-hidden>
                  <div className="csd-build-visual-card csd-build-visual-card-1">
                    <div className="csd-build-visual-bar" />
                    <div className="csd-build-visual-bar" style={{ width: "60%" }} />
                    <div className="csd-build-visual-bar" style={{ width: "85%" }} />
                  </div>
                  <div className="csd-build-visual-card csd-build-visual-card-2">
                    <div className="csd-build-visual-grid">
                      <div /><div /><div /><div /><div /><div />
                    </div>
                  </div>
                  <div className="csd-build-visual-card csd-build-visual-card-3">
                    <div className="csd-build-visual-chart">
                      <span style={{ height: "30%" }} />
                      <span style={{ height: "55%" }} />
                      <span style={{ height: "40%" }} />
                      <span style={{ height: "75%" }} />
                      <span style={{ height: "60%" }} />
                      <span style={{ height: "90%" }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="csd-build-right">
                {WE_BUILD.map((b, i) => (
                  <div key={b.label} className="csd-build-tile">
                    <div className="csd-build-tile-top">
                      <span className="csd-build-tile-glyph">{b.glyph}</span>
                      <span className="csd-build-tile-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="csd-build-tile-label">{b.label}</div>
                    <div className="csd-build-tile-desc">{b.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — VALUE PROPOSITION
            Why us. Each row: number + claim + supporting metric.
            Numbered horizontal rows, mirrors the operational tone.
        ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "120px 20px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "#fafaf9",
          }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div
              className="csd-sh"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                gap: 40,
                flexWrap: "wrap",
                marginBottom: 64,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
                    textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
                    marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
                  }}
                >
                  <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
                  Why teams choose us
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 4.4vw, 64px)",
                    fontWeight: 500,
                    letterSpacing: "-0.032em",
                    lineHeight: 1.02,
                    margin: 0,
                    maxWidth: 760,
                  }}
                >
                  How we work,{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
                    not what we claim.
                  </span>
                </h2>
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(0,0,0,0.58)",
                  maxWidth: 380,
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Anyone can list adjectives. These are the operating principles
                that show up in every line of code we ship.
              </p>
            </div>

            <div className="csd-value-list">
              {VALUE_PROPS.map((v) => (
                <div key={v.num} className="csd-value-row">
                  <div className="csd-value-num">{v.num}</div>
                  <div className="csd-value-body">
                    <h3 className="csd-value-title">{v.title}</h3>
                    <p className="csd-value-desc">{v.desc}</p>
                  </div>
                  <div className="csd-value-metric">
                    <div className="csd-value-metric-num">{v.metric}</div>
                    <div className="csd-value-metric-label">{v.metricLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 — PROCESS (horizontal pinned scroll)
            Mirrors the landing-page Process UI exactly, extended to 6 phases.
        ═══════════════════════════════════════════════════════════════ */}
        <section
          className="csd-process-pin"
          style={{
            padding: 0, background: "#0a0a0a", color: "#fafaf9",
            height: isMobile ? "auto" : "100vh",
            overflow: isMobile ? "visible" : "hidden",
            position: "relative",
            display: "flex", flexDirection: "column",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
              pointerEvents: "none",
            }}
          />

          <div
            style={{
              position: "relative", zIndex: 2, flexShrink: 0,
              padding: "clamp(80px, 12vh, 140px) 20px clamp(20px, 3vh, 40px)",
              display: "flex", justifyContent: "space-between", alignItems: "flex-end",
              gap: 40, flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
                  marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
                }}
              >
                <span style={{ width: 16, height: 1, background: "rgba(255,255,255,0.25)" }} />
                Our process
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 4.5vw, 72px)", fontWeight: 500,
                  letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
                }}
              >
                Six phases.{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
                  Every project.
                </span>
              </h2>
            </div>
            <p
              style={{
                fontSize: 14, color: "rgba(255,255,255,0.5)",
                maxWidth: 320, lineHeight: 1.65, margin: 0,
                textAlign: "right", flexShrink: 0,
              }}
            >
              From discovery to long-term support — a way of working refined
              across 150+ shipped products.
            </p>
          </div>

          <div
            style={{
              flex: 1, minHeight: 0,
              display: "flex", alignItems: "center",
              position: "relative", zIndex: 1,
            }}
          >
            <div
              className="csd-process-track"
              style={{
                display: "flex", gap: 20,
                paddingLeft: 20, paddingRight: 112,
                willChange: "transform",
                alignItems: "stretch",
              }}
            >
              {PROCESS.map((step, i) => (
                <div
                  key={i}
                  className="csd-process-card"
                  style={{
                    width: "clamp(320px, 28vw, 440px)",
                    flexShrink: 0,
                    padding: "clamp(28px, 3.5vh, 44px) 36px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20, background: "rgba(255,255,255,0.02)",
                    display: "flex", flexDirection: "column",
                    justifyContent: "space-between",
                    height: "clamp(340px, 58vh, 500px)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginBottom: "clamp(24px, 4vh, 48px)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "clamp(48px, 6vh, 72px)", fontWeight: 500,
                          color: "rgba(255,255,255,0.12)",
                          lineHeight: 1, letterSpacing: "-0.04em",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {step.num}
                      </span>
                      <span
                        style={{
                          padding: "5px 12px", borderRadius: 999,
                          border: "1px solid rgba(255,255,255,0.15)",
                          fontSize: 11, fontWeight: 500,
                          color: "rgba(255,255,255,0.65)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Phase {step.num}
                      </span>
                    </div>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(26px, 3.2vh, 40px)", fontWeight: 500,
                        margin: "0 0 clamp(10px, 2vh, 20px)",
                        letterSpacing: "-0.02em", lineHeight: 1,
                      }}
                    >
                      {step.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(13px, 1.6vh, 15px)",
                        color: "rgba(255,255,255,0.6)",
                        lineHeight: 1.65, margin: 0,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>

                  <ul
                    style={{
                      listStyle: "none", padding: 0, margin: 0,
                      borderTop: "1px solid rgba(255,255,255,0.08)",
                      paddingTop: "clamp(14px, 2.5vh, 24px)",
                    }}
                  >
                    {step.points.map((p) => (
                      <li
                        key={p}
                        style={{
                          fontSize: 13, color: "rgba(255,255,255,0.7)",
                          padding: "clamp(5px, 1vh, 8px) 0",
                          display: "flex", alignItems: "center", gap: 12,
                        }}
                      >
                        <span style={{ width: 14, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div
                style={{
                  width: 300, flexShrink: 0,
                  padding: "clamp(28px, 3.5vh, 44px) 36px",
                  display: "flex", flexDirection: "column", justifyContent: "center",
                  height: "clamp(340px, 58vh, 500px)",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 2.8vh, 32px)", fontWeight: 500,
                    margin: "0 0 20px",
                    letterSpacing: "-0.025em", lineHeight: 1.1,
                  }}
                >
                  Every project.{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
                    No exceptions.
                  </span>
                </h3>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "12px 22px", background: "#fafaf9", color: "#0a0a0a",
                    borderRadius: 999, fontSize: 13, fontWeight: 500,
                    textDecoration: "none", alignSelf: "flex-start", marginTop: 4,
                  }}
                >
                  Start yours →
                </Link>
              </div>
            </div>
          </div>

          {!isMobile && (
            <>
              <div
                style={{
                  position: "absolute", bottom: 20, left: 32,
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
                  display: "flex", alignItems: "center", gap: 10,
                }}
              >
                <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(255,255,255,0.25)" }} />
                Scroll
              </div>
              <div
                style={{
                  position: "absolute", bottom: 20, right: 32,
                  fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
                  textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                06 phases
              </div>
            </>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 — TECH STACK (marquee, mirrors landing page)
        ═══════════════════════════════════════════════════════════════ */}
        <section
          className="csd-tech-marquee"
          onMouseEnter={handleTechMarqueeEnter}
          onMouseLeave={handleTechMarqueeLeave}
          style={{
            padding: "120px 0", borderTop: "1px solid rgba(0,0,0,0.06)",
            overflow: "hidden", background: "#fafaf9",
          }}
        >
          <div
            className="csd-sh"
            style={{
              maxWidth: 1320, margin: "0 auto 56px", padding: "0 20px",
              display: "flex", justifyContent: "space-between", alignItems: "end",
              gap: 40, flexWrap: "wrap",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
                  marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
                }}
              >
                <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
                Technology stack
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 3.8vw, 56px)", fontWeight: 500,
                  letterSpacing: "-0.03em", lineHeight: 1, margin: 0,
                }}
              >
                Tools we{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
                  trust.
                </span>
              </h2>
            </div>
            <p
              style={{
                fontSize: 14, color: "rgba(0,0,0,0.55)",
                maxWidth: 380, lineHeight: 1.65, margin: 0,
              }}
            >
              Mature, battle-tested tooling — picked for your problem, not because it&apos;s new.
            </p>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ overflow: "hidden" }}>
              <div
                ref={marqueeLeftRef}
                className="marquee-track"
                style={{ display: "flex", width: "max-content", gap: 0 }}
              >
                {[...TECH, ...TECH].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 28,
                      padding: "0 24px", flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(20px, 2.4vw, 34px)",
                        fontWeight: 500, color: "#0a0a0a",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {t}
                    </span>
                    <span
                      aria-hidden
                      style={{
                        width: 8, height: 8, background: "#0a0a0a",
                        borderRadius: "50%", opacity: 0.2,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ overflow: "hidden", marginTop: 20 }}>
              <div
                ref={marqueeRightRef}
                className="marquee-track"
                style={{ display: "flex", width: "max-content", gap: 0 }}
              >
                {[...TECH.slice().reverse(), ...TECH.slice().reverse()].map((t, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: 28,
                      padding: "0 24px", flexShrink: 0,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(20px, 2.4vw, 34px)",
                        fontWeight: 400, fontStyle: "italic",
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(0,0,0,0.2)",
                        letterSpacing: "-0.025em",
                      }}
                    >
                      {t}
                    </span>
                    <span
                      aria-hidden
                      style={{
                        width: 8, height: 8,
                        border: "1px solid rgba(0,0,0,0.2)",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 — RESULTS / IMPACT
            Outcome-shaped numbers. Each card pairs metric + context.
        ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "120px 20px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "#f5f5f4",
          }}
        >
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div
              className="csd-sh"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                gap: 40, flexWrap: "wrap",
                marginBottom: 56,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
                    textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
                    marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
                  }}
                >
                  <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
                  Outcomes
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(32px, 4.4vw, 64px)",
                    fontWeight: 500,
                    letterSpacing: "-0.032em",
                    lineHeight: 1.02, margin: 0,
                    maxWidth: 760,
                  }}
                >
                  We don&apos;t just build software.{" "}
                  <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
                    We deliver results.
                  </span>
                </h2>
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(0,0,0,0.58)",
                  maxWidth: 380,
                  lineHeight: 1.65, margin: 0,
                }}
              >
                Selected outcomes from recent engagements. Numbers measured
                in production, not extrapolated from pitch decks.
              </p>
            </div>

            <div className="csd-results-grid">
              {RESULTS.map((r, i) => (
                <div key={r.label} className="csd-result-card csd-result-num">
                  <div className="csd-result-index">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="csd-result-metric">{r.metric}</div>
                  <div className="csd-result-label">{r.label}</div>
                  <div className="csd-result-desc">{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 — FAQs
            Long-tail SEO + objection handler. Accordion, one open at a time.
        ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "120px 20px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            background: "#fafaf9",
          }}
        >
          <div className="csd-faq-layout" style={{ maxWidth: 1320, margin: "0 auto" }}>
            <div className="csd-faq-aside csd-sh">
              <div
                style={{
                  fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
                  textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
                  marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
                }}
              >
                <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
                Questions
              </div>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 3.6vw, 52px)",
                  fontWeight: 500,
                  letterSpacing: "-0.032em",
                  lineHeight: 1.02,
                  margin: "0 0 20px",
                }}
              >
                Frequently{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
                  asked.
                </span>
              </h2>
              <p
                style={{
                  fontSize: 15, color: "rgba(0,0,0,0.6)",
                  lineHeight: 1.7, margin: "0 0 28px",
                }}
              >
                Real questions from real prospects. If yours isn&apos;t here,
                send us a note — we answer every inquiry within 24 hours.
              </p>
              <Link
                href="/contact"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "12px 22px",
                  border: "1px solid rgba(0,0,0,0.85)",
                  color: "#0a0a0a", textDecoration: "none",
                  fontSize: 13, fontWeight: 500, borderRadius: 999,
                  transition: "background 0.2s, color 0.2s",
                }}
                className="csd-faq-cta"
              >
                Ask us anything
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path
                    d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                    fill="none" stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div className="csd-faq-list">
              {FAQS.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="csd-faq-row"
                    data-open={isOpen ? "true" : "false"}
                  >
                    <button
                      type="button"
                      className="csd-faq-q"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                    >
                      <span className="csd-faq-q-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="csd-faq-q-text">{f.q}</span>
                      <span className="csd-faq-q-icon" aria-hidden>
                        <svg width="14" height="14" viewBox="0 0 14 14">
                          <path
                            d="M3 7h8 M7 3v8"
                            fill="none" stroke="currentColor" strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                    </button>
                    <div className="csd-faq-a">
                      <div className="csd-faq-a-inner">{f.a}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 9 — FINAL CTA
            Closing argument. Mirrors landing-page CTA treatment.
        ═══════════════════════════════════════════════════════════════ */}
        <section
          style={{
            padding: "0 20px 64px",
            borderTop: "1px solid rgba(0,0,0,0.06)",
            paddingTop: 64,
          }}
        >
          <div
            className="csd-cta-inner"
            style={{
              borderRadius: 28, overflow: "hidden",
              padding: "92px 56px", position: "relative",
              background: "#0a0a0a", color: "#fafaf9",
              opacity: 0, maxWidth: 1320, margin: "0 auto",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0,
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
                pointerEvents: "none",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute", top: "-20%", right: "-10%",
                width: 560, height: 560,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)",
                pointerEvents: "none",
              }}
            />

            <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(40px, 6vw, 84px)", fontWeight: 500,
                  letterSpacing: "-0.04em", lineHeight: 0.94,
                  margin: "0 0 28px",
                }}
              >
                Ready to build something{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
                  that lasts?
                </span>
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "rgba(255,255,255,0.58)",
                  maxWidth: 540, lineHeight: 1.62,
                  margin: "0 0 36px",
                }}
              >
                Free 30-minute discovery call. You&apos;ll talk directly with an engineer
                and a strategist. No sales pitch — just a real conversation about your
                problem, your timeline, and whether we&apos;re the right team for it.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link
                  href="/contact"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 26px", background: "#fafaf9", color: "#0a0a0a",
                    textDecoration: "none", fontSize: 14, fontWeight: 500,
                    borderRadius: 999, transition: "transform 0.2s",
                  }}
                >
                  Book a discovery call
                  <span aria-hidden>→</span>
                </Link>
                <a
                  href="mailto:hello@techbinaries.com"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 10,
                    padding: "14px 26px",
                    border: "1px solid rgba(255,255,255,0.2)",
                    color: "rgba(255,255,255,0.85)",
                    textDecoration: "none", fontSize: 14, fontWeight: 500,
                    borderRadius: 999,
                    transition: "background 0.2s, border-color 0.2s",
                  }}
                  className="csd-ghost-dark"
                >
                  hello@techbinaries.com
                </a>
              </div>

              <div
                style={{
                  marginTop: 56, paddingTop: 24,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
                }}
              >
                {[
                  { k: "Response time", v: "Within 24h" },
                  { k: "Typical project", v: "8–24 weeks" },
                  { k: "Engagement type", v: "Fixed or T&M" },
                ].map((it) => (
                  <div key={it.k}>
                    <div
                      style={{
                        fontSize: 10, color: "rgba(255,255,255,0.45)",
                        fontWeight: 500, letterSpacing: "0.12em",
                        textTransform: "uppercase", marginBottom: 6,
                      }}
                    >
                      {it.k}
                    </div>
                    <div
                      style={{
                        fontSize: 15, color: "#fafaf9",
                        fontFamily: "var(--font-display)",
                        fontWeight: 500, letterSpacing: "-0.01em",
                      }}
                    >
                      {it.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          STYLES
      ═══════════════════════════════════════════════════════════════ */}
      <style>{`
        /* ── HERO ── */
        .csd-hero-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 48px;
          align-items: start;
        }
        .csd-hero-side { padding-top: 60px; }
        .csd-hero-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: rgba(0,0,0,0.08);
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 22px 48px -28px rgba(10,10,10,0.18);
        }
        .csd-hero-stat {
          background: #fff;
          padding: 22px 22px 24px;
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-height: 138px;
        }
        .csd-hero-stat-label {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
        }
        .csd-hero-stat-value {
          font-family: var(--font-display);
          font-size: 38px;
          font-weight: 500;
          letter-spacing: -0.035em;
          line-height: 1;
          color: #0a0a0a;
          font-variant-numeric: tabular-nums;
        }
        .csd-hero-stat-note {
          font-size: 12px;
          line-height: 1.45;
          color: rgba(10,10,10,0.55);
          margin-top: auto;
        }

        .csd-cta-primary::before {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #262626, #0a0a0a);
          transform: translateX(-101%);
          transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
          z-index: 1;
        }
        .csd-cta-primary:hover::before { transform: translateX(0); }
        .csd-cta-primary:hover .csd-cta-arrow { transform: translateX(2px); }
        .csd-cta-arrow { transition: transform 0.25s ease; }
        .csd-cta-secondary:hover {
          border-color: rgba(0,0,0,0.4) !important;
          background: rgba(255,255,255,0.85) !important;
        }
        .csd-ghost-dark:hover {
          border-color: rgba(255,255,255,0.45) !important;
          background: rgba(255,255,255,0.05) !important;
        }

        /* ── SERVICE CARDS ── */
        .csd-svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .csd-svc-card article {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 32px 30px 28px;
          border: 1px solid rgba(10,10,10,0.1);
          border-radius: 20px;
          background: #fff;
          height: 100%;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.25s, box-shadow 0.35s;
          position: relative;
          overflow: hidden;
        }
        .csd-svc-card:hover article {
          transform: translateY(-4px);
          border-color: rgba(10,10,10,0.2);
          box-shadow: 0 22px 44px -28px rgba(10,10,10,0.22);
        }
        .csd-svc-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .csd-svc-dot { width: 10px; height: 10px; border-radius: 50%; }
        .csd-svc-num {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 500;
          color: rgba(10,10,10,0.4);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.04em;
        }
        .csd-svc-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.022em;
          line-height: 1.15;
          margin: 4px 0 0;
          color: #0a0a0a;
        }
        .csd-svc-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(10,10,10,0.6);
          margin: 0;
        }
        .csd-svc-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          margin-top: 6px;
        }
        .csd-svc-tags span {
          padding: 4px 10px;
          border: 1px solid rgba(10,10,10,0.1);
          border-radius: 999px;
          font-size: 10.5px;
          font-weight: 500;
          color: rgba(10,10,10,0.65);
          letter-spacing: 0.02em;
        }
        .csd-svc-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: auto;
          padding-top: 18px;
          border-top: 1px solid rgba(10,10,10,0.08);
          font-size: 13px;
          font-weight: 500;
          color: rgba(10,10,10,0.7);
          transition: color 0.2s, gap 0.25s;
        }
        .csd-svc-card:hover .csd-svc-cta { color: #0a0a0a; gap: 12px; }

        /* ── WHAT WE BUILD ── */
        .csd-build-layout {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: start;
        }
        .csd-build-visual {
          margin-top: 32px;
          position: relative;
          height: 280px;
        }
        .csd-build-visual-card {
          position: absolute;
          background: #fff;
          border: 1px solid rgba(10,10,10,0.1);
          border-radius: 14px;
          padding: 18px 18px 16px;
          box-shadow: 0 18px 40px -24px rgba(10,10,10,0.18);
        }
        .csd-build-visual-card-1 {
          top: 0; left: 0;
          width: 220px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .csd-build-visual-card-2 {
          top: 30px; left: 200px;
          width: 200px;
        }
        .csd-build-visual-card-3 {
          top: 130px; left: 60px;
          width: 240px;
        }
        .csd-build-visual-bar {
          height: 8px;
          background: linear-gradient(90deg, #0a0a0a 0%, #f472b6 100%);
          border-radius: 4px;
          opacity: 0.85;
        }
        .csd-build-visual-bar:nth-child(1) { width: 100%; }
        .csd-build-visual-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .csd-build-visual-grid > div {
          aspect-ratio: 1;
          background: rgba(10,10,10,0.06);
          border-radius: 6px;
        }
        .csd-build-visual-grid > div:nth-child(1) { background: #f472b6; opacity: 0.85; }
        .csd-build-visual-grid > div:nth-child(5) { background: #0a0a0a; }
        .csd-build-visual-chart {
          display: flex;
          align-items: flex-end;
          gap: 6px;
          height: 90px;
          padding-top: 4px;
        }
        .csd-build-visual-chart span {
          flex: 1;
          background: linear-gradient(180deg, #0a0a0a 0%, rgba(10,10,10,0.4) 100%);
          border-radius: 3px 3px 0 0;
        }
        .csd-build-visual-chart span:last-child {
          background: linear-gradient(180deg, #f472b6 0%, rgba(244,114,182,0.4) 100%);
        }

        .csd-build-right {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: rgba(10,10,10,0.1);
          border: 1px solid rgba(10,10,10,0.1);
          border-radius: 18px;
          overflow: hidden;
        }
        .csd-build-tile {
          background: #fafaf9;
          padding: 26px 24px 24px;
          min-height: 170px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: background 0.25s;
        }
        .csd-build-tile:hover { background: #fff; }
        .csd-build-tile-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }
        .csd-build-tile-glyph {
          font-size: 18px;
          color: #f472b6;
        }
        .csd-build-tile-num {
          font-family: var(--font-display);
          font-size: 12px;
          color: rgba(10,10,10,0.4);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.04em;
        }
        .csd-build-tile-label {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 500;
          letter-spacing: -0.018em;
          color: #0a0a0a;
          line-height: 1.15;
        }
        .csd-build-tile-desc {
          font-size: 13px;
          line-height: 1.55;
          color: rgba(10,10,10,0.58);
        }

        /* ── VALUE PROPS ── */
        .csd-value-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(10,10,10,0.1);
        }
        .csd-value-row {
          display: grid;
          grid-template-columns: 80px 1fr 200px;
          gap: 40px;
          padding: 32px 0;
          border-bottom: 1px solid rgba(10,10,10,0.1);
          align-items: start;
          transition: background 0.25s;
        }
        .csd-value-row:hover { background: rgba(10,10,10,0.015); }
        .csd-value-num {
          font-family: var(--font-display);
          font-size: 56px;
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.9;
          color: transparent;
          -webkit-text-stroke: 1px rgba(10,10,10,0.35);
          font-variant-numeric: tabular-nums;
          padding-top: 6px;
        }
        .csd-value-title {
          font-family: var(--font-display);
          font-size: clamp(22px, 2.4vw, 32px);
          font-weight: 500;
          letter-spacing: -0.024em;
          line-height: 1.15;
          margin: 0 0 12px;
          color: #0a0a0a;
        }
        .csd-value-desc {
          font-size: 15px;
          line-height: 1.65;
          color: rgba(10,10,10,0.62);
          margin: 0;
          max-width: 560px;
        }
        .csd-value-metric {
          text-align: right;
          padding-top: 12px;
        }
        .csd-value-metric-num {
          font-family: var(--font-display);
          font-size: 38px;
          font-weight: 500;
          letter-spacing: -0.035em;
          line-height: 1;
          color: #0a0a0a;
          font-variant-numeric: tabular-nums;
        }
        .csd-value-metric-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
          margin-top: 8px;
        }

        /* ── RESULTS ── */
        .csd-results-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .csd-result-card {
          background: #fff;
          border: 1px solid rgba(10,10,10,0.1);
          border-radius: 18px;
          padding: 28px 26px 30px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 230px;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(0.22,1,0.36,1),
                      border-color 0.25s,
                      box-shadow 0.3s;
        }
        .csd-result-card:hover {
          transform: translateY(-4px);
          border-color: rgba(10,10,10,0.22);
          box-shadow: 0 22px 44px -28px rgba(10,10,10,0.2);
        }
        .csd-result-index {
          font-family: var(--font-display);
          font-size: 12px;
          color: rgba(10,10,10,0.4);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.04em;
          margin-bottom: 6px;
        }
        .csd-result-metric {
          font-family: var(--font-display);
          font-size: clamp(40px, 4.4vw, 60px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.95;
          color: #0a0a0a;
          font-variant-numeric: tabular-nums;
        }
        .csd-result-label {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 500;
          letter-spacing: -0.015em;
          color: #0a0a0a;
          margin-top: 4px;
        }
        .csd-result-desc {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(10,10,10,0.6);
          margin-top: auto;
        }

        /* ── FAQs ── */
        .csd-faq-layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 80px;
          align-items: start;
        }
        .csd-faq-aside { position: sticky; top: 120px; }
        .csd-faq-cta:hover {
          background: #0a0a0a;
          color: #fafaf9;
        }
        .csd-faq-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(10,10,10,0.1);
        }
        .csd-faq-row {
          border-bottom: 1px solid rgba(10,10,10,0.1);
        }
        .csd-faq-q {
          width: 100%;
          display: grid;
          grid-template-columns: 50px 1fr 30px;
          align-items: center;
          gap: 16px;
          padding: 24px 0;
          background: transparent;
          border: 0;
          cursor: pointer;
          text-align: left;
          color: #0a0a0a;
          font-family: var(--font-display);
        }
        .csd-faq-q-num {
          font-size: 13px;
          font-weight: 500;
          color: rgba(10,10,10,0.4);
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.04em;
        }
        .csd-faq-q-text {
          font-family: var(--font-display);
          font-size: clamp(17px, 1.6vw, 21px);
          font-weight: 500;
          letter-spacing: -0.018em;
          line-height: 1.3;
        }
        .csd-faq-q-icon {
          width: 30px; height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(10,10,10,0.18);
          border-radius: 50%;
          color: #0a0a0a;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      background 0.25s, color 0.25s, border-color 0.25s;
        }
        .csd-faq-row[data-open="true"] .csd-faq-q-icon {
          transform: rotate(45deg);
          background: #0a0a0a;
          color: #fafaf9;
          border-color: #0a0a0a;
        }
        .csd-faq-a {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .csd-faq-row[data-open="true"] .csd-faq-a {
          grid-template-rows: 1fr;
        }
        .csd-faq-a-inner {
          overflow: hidden;
          padding-left: 66px;
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.7;
          color: rgba(10,10,10,0.65);
          padding-bottom: 0;
          transition: padding-bottom 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .csd-faq-row[data-open="true"] .csd-faq-a-inner {
          padding-bottom: 28px;
        }

        /* ── MARQUEE ── */
        .marquee-track { will-change: transform; }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .csd-hero-grid { grid-template-columns: 1fr; gap: 56px; }
          .csd-hero-side { padding-top: 0; }
          .csd-svc-grid { grid-template-columns: repeat(2, 1fr); }
          .csd-build-layout { grid-template-columns: 1fr; gap: 56px; }
          .csd-build-visual { max-width: 460px; }
          .csd-results-grid { grid-template-columns: repeat(2, 1fr); }
          .csd-faq-layout { grid-template-columns: 1fr; gap: 48px; }
          .csd-faq-aside { position: static; }
          .csd-value-row { grid-template-columns: 60px 1fr 140px; gap: 24px; }
          .csd-value-num { font-size: 44px; }
          .csd-value-metric-num { font-size: 30px; }
        }
        @media (max-width: 768px) {
          .csd-hero { padding: 120px 14px 60px !important; min-height: auto !important; }
          .csd-hero-line-final { white-space: normal !important; }
          .csd-hero-stats { grid-template-columns: 1fr; }
          .csd-hero-stat { min-height: auto; padding: 18px 18px 20px; }

          .csd-svc-grid { grid-template-columns: 1fr; }
          .csd-svc-card article { padding: 26px 22px 22px; }

          .csd-build-right { grid-template-columns: 1fr; }
          .csd-build-tile { min-height: auto; }
          .csd-build-visual { display: none; }

          .csd-value-row {
            grid-template-columns: 1fr;
            gap: 14px;
            padding: 24px 0;
          }
          .csd-value-num {
            font-size: 36px;
            padding-top: 0;
          }
          .csd-value-metric { text-align: left; padding-top: 0; }
          .csd-value-metric-num { font-size: 28px; }

          .csd-process-pin {
            height: auto !important;
            overflow: visible !important;
          }
          .csd-process-pin > div:first-of-type { padding: 80px 14px 32px !important; }
          .csd-process-track {
            flex-direction: column !important;
            padding: 0 14px 60px !important;
            transform: none !important;
            gap: 16px !important;
            width: 100% !important;
          }
          .csd-process-track > div { flex: 1 1 auto !important; }
          .csd-process-card {
            width: 100% !important;
            height: auto !important;
            min-height: 320px !important;
          }

          .csd-results-grid { grid-template-columns: 1fr; }

          .csd-faq-q { grid-template-columns: 36px 1fr 26px; gap: 12px; padding: 20px 0; }
          .csd-faq-q-icon { width: 26px; height: 26px; }
          .csd-faq-a-inner { padding-left: 48px; font-size: 14px; }
          .csd-faq-row[data-open="true"] .csd-faq-a-inner { padding-bottom: 22px; }

          .csd-cta-inner { padding: 64px 26px !important; border-radius: 18px !important; }
          .csd-cta-inner > div > div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }
        @media (max-width: 480px) {
          section { padding-left: 14px; padding-right: 14px; }
        }
      `}</style>
    </>
  );
}