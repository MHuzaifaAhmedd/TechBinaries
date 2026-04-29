"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────────

const SUB_SERVICES = [
  {
    num: "01",
    bin: "0001",
    title: "Custom Web Application Development",
    desc: "Production-grade web apps built for performance, scale, and long-term maintainability.",
    href: "/services/custom-software-digital-solutions/custom-web-application-development",
    accent: "#f472b6",
    tags: ["Next.js", "React", "Node", "Postgres"],
  },
  {
    num: "02",
    bin: "0010",
    title: "Mobile App Development",
    desc: "Native and cross-platform iOS & Android apps that feel fast and ship on schedule.",
    href: "/services/custom-software-digital-solutions/mobile-app-development-ios-android",
    accent: "#a3e635",
    tags: ["iOS", "Android", "React Native", "Swift"],
  },
  {
    num: "03",
    bin: "0011",
    title: "SaaS Product Development",
    desc: "Multi-tenant SaaS platforms with billing, auth, analytics, and growth loops baked in.",
    href: "/services/custom-software-digital-solutions/saas-product-development",
    accent: "#38bdf8",
    tags: ["Multi-tenant", "Billing", "Auth", "Analytics"],
  },
  {
    num: "04",
    bin: "0100",
    title: "UI/UX Design Systems",
    desc: "Design systems, component libraries, and product UX engineered for consistency at scale.",
    href: "/services/custom-software-digital-solutions/ui-ux-design-systems",
    accent: "#fbbf24",
    tags: ["Design Systems", "Figma", "Tokens", "A11y"],
  },
  {
    num: "05",
    bin: "0101",
    title: "CMS & Admin Panel Development",
    desc: "Content systems and internal tools that empower teams without slowing them down.",
    href: "/services/custom-software-digital-solutions/cms-admin-panel-development",
    accent: "#c084fc",
    tags: ["Headless CMS", "Admin UI", "RBAC", "Workflows"],
  },
  {
    num: "06",
    bin: "0110",
    title: "High-Performance Landing Pages",
    desc: "Pixel-perfect, conversion-tuned landing pages with sub-second load and SEO baked in.",
    href: "/services/custom-software-digital-solutions/high-performance-landing-pages",
    accent: "#fb7185",
    tags: ["Core Web Vitals", "SEO", "A/B Ready", "CRO"],
  },
];

// "What We Build" — concrete product types, paired with binary IDs.
// Visual treatment: left column = text, right column = animated browser/device frames.
const WE_BUILD = [
  { id: "saas",      bin: "01", label: "SaaS Platforms",       desc: "Multi-tenant products with billing, dashboards, and integrations." },
  { id: "dashboard", bin: "10", label: "Business Dashboards",  desc: "Real-time analytics surfaces wired to your live data." },
  { id: "mobile",    bin: "11", label: "Mobile Apps",          desc: "Native iOS, Android, and cross-platform consumer apps." },
  { id: "internal",  bin: "00", label: "Internal Tools",       desc: "Admin panels and ops tooling that replace spreadsheets." },
  { id: "mvp",       bin: "01", label: "MVPs",                 desc: "Ship-fast prototypes built on architecture that can scale." },
  { id: "market",    bin: "10", label: "Marketplaces",         desc: "Two-sided platforms with payments, search, and trust systems." },
];

// Value props — "10 principles" framing (binary nod) but only 4 surface,
// each with its own binary code and metric.
const VALUE_PROPS = [
  {
    bin: "01",
    title: "Performance is a feature, not a phase.",
    desc: "Every line of code is measured. Lighthouse scores, Core Web Vitals, and runtime budgets are non-negotiable, baked into CI from day one — not bolted on before launch.",
    metric: "98",
    metricUnit: "+",
    metricLabel: "Avg Lighthouse",
  },
  {
    bin: "10",
    title: "Architecture for the system you'll need in two years.",
    desc: "We design for the load you'll have, not the prototype you have today. Clean boundaries, observable systems, sane defaults that don't need to be rewritten when you 10x.",
    metric: "10",
    metricUnit: "×",
    metricLabel: "Traffic headroom",
  },
  {
    bin: "11",
    title: "One source of truth. Every surface coherent.",
    desc: "Design systems and component libraries that make your product feel consistent across mobile, web, and admin — without designers and engineers fighting the same battles every sprint.",
    metric: "1",
    metricUnit: "",
    metricLabel: "Design system",
  },
  {
    bin: "00",
    title: "Ship weekly. No ceremony, no surprises.",
    desc: "Weekly demos. Production deploys behind feature flags. You stay close to the work and ship without the drama of quarterly big-bang releases.",
    metric: "7",
    metricUnit: "d",
    metricLabel: "Sprint cadence",
  },
];

// Process — kept identical to landing page treatment, extended to 6 phases.
const PROCESS = [
  { num: "01", title: "Discovery",   desc: "Deep-dive into your business, users, and technical landscape to uncover what actually needs to be built.", points: ["Stakeholder interviews", "Technical audit", "Opportunity mapping"] },
  { num: "02", title: "Design",      desc: "We design the experience — flows, wireframes, and high-fidelity UI — before a single line of production code is written.", points: ["UX flows & wireframes", "High-fidelity UI", "Design tokens"] },
  { num: "03", title: "Development", desc: "Agile sprints with weekly demos. You stay close to the work. We ship fast without cutting corners.", points: ["Weekly demos", "CI/CD pipeline", "Code review"] },
  { num: "04", title: "Testing",     desc: "Automated and manual QA across devices, browsers, and edge cases. Performance, accessibility, and security baked in.", points: ["Automated test suites", "Cross-device QA", "Performance budgets"] },
  { num: "05", title: "Launch",      desc: "Phased rollout with monitoring, observability, and rollback plans. We don't ship and pray.", points: ["Phased rollout", "Monitoring & alerts", "Rollback ready"] },
  { num: "06", title: "Support",     desc: "Post-launch support, iteration, and growth. We don't disappear after go-live.", points: ["SLA-backed support", "Continuous improvement", "Roadmap planning"] },
];

const TECH = [
  "React", "Next.js", "TypeScript", "Vue", "Svelte", "Tailwind",
  "Node.js", "Python", "Go", "Rust", "GraphQL", "PostgreSQL",
  "Swift", "Kotlin", "React Native", "Flutter",
  "AWS", "GCP", "Kubernetes", "Docker", "Terraform", "Redis",
];

// Results — outcomes, paired with the project shape so each card tells a story.
const RESULTS = [
  { metric: "43%",  label: "Faster page loads", project: "FinEdge · Trading dashboard",       desc: "Migrated from a legacy SPA to an edge-rendered Next.js stack. LCP dropped from 3.4s to 1.9s in the first sprint." },
  { metric: "2.4×", label: "Conversion lift",   project: "NovaRetail · Checkout flow",        desc: "Re-architected the checkout funnel with progressive enhancement and inline validation. Cart-to-purchase rate doubled." },
  { metric: "$4M",  label: "Annual savings",    project: "ShipFast · Logistics engine",       desc: "Replaced a hand-tuned routing heuristic with an ML-powered optimization service. Fuel + ops costs cut in year one." },
  { metric: "2M+",  label: "Users served",      project: "MedCore · Patient platform",        desc: "Designed a multi-region, HIPAA-compliant architecture from scratch. Scaled to 2M+ MAU without a single major incident." },
];

const FAQS = [
  { q: "How much does custom software development cost?",          a: "Most projects fall between $40K and $250K depending on scope, team size, and timeline. We provide fixed-price proposals after a paid discovery sprint so there are no surprises mid-build. For exploratory MVPs, we also offer time-and-materials engagements with weekly cost ceilings." },
  { q: "How long does it take to build a custom application?",     a: "MVPs typically take 8–12 weeks. Full production builds run 16–24 weeks. We share a detailed Gantt during the proposal phase, with weekly milestones you can hold us to. Tight deadlines are doable when scope is clear — we'll tell you honestly what fits." },
  { q: "What technologies do you specialize in?",                  a: "Our default stack is TypeScript end-to-end (React, Next.js, Node), Postgres, and AWS or GCP. For mobile we ship native (Swift, Kotlin) when performance matters and React Native when speed-to-market wins. We choose tooling based on your problem, not because it's trendy." },
  { q: "Do you handle the entire process or just one part?",       a: "Both. We can own discovery → design → engineering → launch → support end-to-end, or we can plug into your existing team in any of those phases. Most clients start with a discovery sprint and expand the engagement based on what's working." },
  { q: "What happens after the product launches?",                 a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and small feature work. Many clients keep us on as a fractional engineering team. You're never locked in — all code, infrastructure, and credentials transfer to you." },
  { q: "Can you work with our existing team or codebase?",         a: "Yes. We do legacy modernization, codebase audits, and team augmentation. We're comfortable inheriting messy code, untangling architecture, and shipping alongside your engineers. No ego, no rewrites for the sake of rewriting." },
  { q: "How do you handle data security and compliance?",          a: "SOC 2-aligned engineering practices by default. We've shipped HIPAA, PCI-DSS, and GDPR-compliant systems. Security reviews, penetration testing, and threat modeling are part of our standard delivery, not an upsell." },
  { q: "Do you sign NDAs before discovery calls?",                 a: "Of course. Send us your NDA before the call and we'll have it back signed within the day. We also have a mutual NDA template if you'd prefer to use ours." },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function CustomSoftwarePage() {
  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Mobile breakpoint
  const [isMobile, setIsMobile] = useState(false);

  // "What we build" hover state — drives which device mockup is highlighted
  // in the right column. Keyboard-accessible via tab focus.
  const [hoveredBuild, setHoveredBuild] = useState<number>(0);

  // Live binary stream in hero — ticking string of 0s and 1s for atmosphere.
  // Generated client-side to avoid hydration mismatch.
  const [binaryStream, setBinaryStream] = useState<string>("");
  useEffect(() => {
    // Seed an initial string so the hero isn't empty on first paint
    const seed = Array.from({ length: 280 }, () => (Math.random() > 0.5 ? "1" : "0")).join("");
    setBinaryStream(seed);
    const id = setInterval(() => {
      setBinaryStream((prev) => {
        // Shift one char off the front, append a new bit at the end
        const next = (Math.random() > 0.5 ? "1" : "0");
        return prev.slice(1) + next;
      });
    }, 120);
    return () => clearInterval(id);
  }, []);

  // Tech marquee refs
  const marqueeLeftRef = useRef<HTMLDivElement>(null);
  const marqueeRightRef = useRef<HTMLDivElement>(null);
  const marqueeLeftTweenRef = useRef<gsap.core.Tween | null>(null);
  const marqueeRightTweenRef = useRef<gsap.core.Tween | null>(null);

  // Lenis
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
      // ── HERO: split-character intro ──
      const heroTl = gsap.timeline({ delay: 0.1 });
      const headlineChars = gsap.utils.toArray<HTMLElement>(".csd-h1-char");
      heroTl.fromTo(
        headlineChars,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.85, stagger: { each: 0.018 }, ease: "power4.out" },
        0
      );
      heroTl.fromTo(
        ".csd-hero-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.55
      );
      heroTl.fromTo(
        ".csd-hero-binary-frame",
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
        0.4
      );

      // ── Section header reveals ──
      gsap.utils.toArray<HTMLElement>(".csd-sh").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 38 },
          { opacity: 1, y: 0, duration: 0.95, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });

      // ── Service cards stagger ──
      gsap.utils.toArray<HTMLElement>(".csd-svc-card").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: (i % 3) * 0.08,
            scrollTrigger: { trigger: el, start: "top 90%" } });
      });

      // ── "What we build" rows ──
      gsap.utils.toArray<HTMLElement>(".csd-build-row").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.6, ease: "power3.out", delay: i * 0.06,
            scrollTrigger: { trigger: el, start: "top 92%" } });
      });

      // ── Value prop columns (each card animates in) ──
      gsap.utils.toArray<HTMLElement>(".csd-vp-card").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: i * 0.08,
            scrollTrigger: { trigger: el, start: "top 88%" } });
      });

      // ── Results cards ──
      gsap.utils.toArray<HTMLElement>(".csd-result-card").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: (i % 2) * 0.08,
            scrollTrigger: { trigger: el, start: "top 90%" } });
      });

      // ── FAQ rows ──
      gsap.utils.toArray<HTMLElement>(".csd-faq-row").forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out", delay: i * 0.04,
            scrollTrigger: { trigger: el, start: "top 92%" } });
      });

      // ── Process: horizontal pin (desktop only) ──
      const processTrack = document.querySelector<HTMLElement>(".csd-process-track");
      const processPin = document.querySelector<HTMLElement>(".csd-process-pin");
      const mm = gsap.matchMedia();
      mm.add("(min-width: 769px)", () => {
        if (!processTrack || !processPin) return;
        const getScrollDistance = () => processTrack.scrollWidth - window.innerWidth + 80;
        gsap.to(processTrack, {
          x: () => -getScrollDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: processPin,
            start: "top top",
            end: () => `+=${getScrollDistance()}`,
            pin: true, pinSpacing: true,
            scrub: 0.8, invalidateOnRefresh: true,
          },
        });
      });

      // ── CTA fade ──
      gsap.fromTo(".csd-cta-inner",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".csd-cta-inner", start: "top 85%" } });
    });
    return () => ctx.revert();
  }, []);

  // Tech marquee
  useEffect(() => {
    const left = marqueeLeftRef.current;
    const right = marqueeRightRef.current;
    if (!left || !right) return;

    gsap.set(left, { xPercent: 0 });
    gsap.set(right, { xPercent: -50 });

    const leftTween = gsap.to(left, { xPercent: -50, duration: 55, ease: "none", repeat: -1 });
    const rightTween = gsap.to(right, { xPercent: 0, duration: 60, ease: "none", repeat: -1 });
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
    const lt = marqueeLeftTweenRef.current;
    const rt = marqueeRightTweenRef.current;
    if (lt) gsap.to(lt, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
    if (rt) gsap.to(rt, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
  };
  const handleTechMarqueeLeave = () => {
    const lt = marqueeLeftTweenRef.current;
    const rt = marqueeRightTweenRef.current;
    if (lt) gsap.to(lt, { timeScale: 1, duration: 0.45, ease: "power2.out" });
    if (rt) gsap.to(rt, { timeScale: 1, duration: 0.45, ease: "power2.out" });
  };

  // Refresh ScrollTrigger after fonts load
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    fonts.ready.then(() => { ScrollTrigger.refresh(); });
  }, []);

  return (
    <>
      {/* GRAIN OVERLAY */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px", opacity: 0.028, mixBlendMode: "multiply",
        }}
      />

      <div style={{ background: "#fafaf9", color: "#0a0a0a", fontFamily: "var(--font-body)", overflowX: "hidden" }}>
        <SiteHeader />

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 1 — HERO
            DIFFERENT from landing page:
              - DARK background (landing is paper). Inverts the page weight.
              - Left = headline + tag-block of micro-services
              - Right = giant binary-typography display ("01" punching through)
                that ties into the brand mark from your homepage Signal OS.
              - No rotating-word gimmick. No code terminal mockup.
        ═══════════════════════════════════════════════════════════════ */}
        <section className="csd-hero">
          {/* Subtle grid background */}
          <div aria-hidden className="csd-hero-grid-bg" />

          {/* Faint live binary stream — atmospheric, not a focal point */}
          <div aria-hidden className="csd-hero-stream">
            <div className="csd-hero-stream-line">{binaryStream}</div>
          </div>

          <div className="csd-hero-inner">
            {/* Top meta row */}
            <div className="csd-hero-meta">
              <div className="csd-hero-meta-item csd-hero-fade">
                <span className="csd-hero-meta-dot" />
                <span>Custom Software &amp; Digital Solutions</span>
              </div>
              <div className="csd-hero-meta-item csd-hero-fade" style={{ opacity: 0 }}>
                <span style={{ opacity: 0.55 }}>CAT</span>
                <span style={{ opacity: 0.4 }}>·</span>
                <span style={{ fontFamily: "var(--font-mono)" }}>03 / 03</span>
              </div>
            </div>

            {/* Main grid */}
            <div className="csd-hero-main">
              {/* LEFT */}
              <div className="csd-hero-left">
                <h1 className="csd-hero-title">
                  <div className="csd-h1-line">
                    {"From".split("").map((c, i) => (
                      <span key={`l1-${i}`} className="csd-h1-char">{c === " " ? "\u00A0" : c}</span>
                    ))}
                    <span className="csd-h1-bracket">[</span>
                    <span className="csd-h1-binary">0</span>
                    <span className="csd-h1-bracket">]</span>
                  </div>
                  <div className="csd-h1-line">
                    {"to production".split("").map((c, i) => (
                      <span key={`l2-${i}`} className="csd-h1-char" style={{ whiteSpace: "pre" }}>{c === " " ? "\u00A0" : c}</span>
                    ))}
                  </div>
                  <div className="csd-h1-line">
                    {"in ".split("").map((c, i) => (
                      <span key={`l3-${i}`} className="csd-h1-char">{c === " " ? "\u00A0" : c}</span>
                    ))}
                    <span className="csd-h1-italic">
                      {"binary".split("").map((c, i) => (
                        <span key={`l3i-${i}`} className="csd-h1-char">{c}</span>
                      ))}
                    </span>
                    {".".split("").map((c, i) => (
                      <span key={`l3p-${i}`} className="csd-h1-char csd-h1-period">{c}</span>
                    ))}
                  </div>
                </h1>

                <p className="csd-hero-fade csd-hero-lead" style={{ opacity: 0 }}>
                  Production-grade web apps, mobile apps, SaaS platforms, and internal
                  tools — engineered for startups, scale-ups, and enterprises.
                  We turn your problem into a system, not a spec doc.
                </p>

                {/* Service chips */}
                <div className="csd-hero-fade csd-hero-chips" style={{ opacity: 0 }}>
                  {SUB_SERVICES.map((s) => (
                    <a key={s.num} href={`#cap-${s.num}`} className="csd-hero-chip">
                      <span className="csd-hero-chip-dot" style={{ background: s.accent }} />
                      <span>{s.title.replace(" Development", "").replace(" (iOS & Android)", "")}</span>
                    </a>
                  ))}
                </div>

                {/* CTAs */}
                <div className="csd-hero-fade csd-hero-cta-row" style={{ opacity: 0 }}>
                  <Link href="/contact" className="csd-cta-primary">
                    <span style={{ position: "relative", zIndex: 2 }}>Start a project</span>
                    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="csd-cta-arrow" style={{ position: "relative", zIndex: 2 }}>
                      <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a href="#capabilities" className="csd-cta-ghost">
                    <span>See capabilities</span>
                    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12">
                      <path d="M6 2.5v7M3 6.5 6 9.5 9 6.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* RIGHT — giant binary mark, evolved from your Signal OS card */}
              <div className="csd-hero-right">
                <div className="csd-hero-binary-frame" style={{ opacity: 0 }}>
                  {/* Frame chrome */}
                  <div className="csd-hero-binary-chrome">
                    <div className="csd-hero-binary-chrome-left">
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#a3e635" }} />
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: "0.12em" }}>
                        BUILD :: ACTIVE
                      </span>
                    </div>
                    <div className="csd-hero-binary-chrome-right">
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "rgba(255,255,255,0.4)" }}>v4.2.1</span>
                    </div>
                  </div>

                  {/* The binary mark */}
                  <div className="csd-hero-binary-stage" aria-hidden>
                    {/* Concentric rings (echo of Signal OS) */}
                    <div className="csd-hero-ring csd-hero-ring-1" />
                    <div className="csd-hero-ring csd-hero-ring-2" />
                    <div className="csd-hero-ring csd-hero-ring-3" />

                    {/* The "10" itself */}
                    <div className="csd-hero-mark">
                      <span className="csd-hero-mark-1">1</span>
                      <span className="csd-hero-mark-0">0</span>
                    </div>

                    {/* Floating annotation labels */}
                    <span className="csd-hero-anno csd-hero-anno-tl">design</span>
                    <span className="csd-hero-anno csd-hero-anno-tr">build</span>
                    <span className="csd-hero-anno csd-hero-anno-bl">ship</span>
                    <span className="csd-hero-anno csd-hero-anno-br">scale</span>

                    {/* Crosshair lines */}
                    <span className="csd-hero-cross-x" />
                    <span className="csd-hero-cross-y" />
                  </div>

                  {/* Footer caption */}
                  <div className="csd-hero-binary-footer">
                    <div>
                      <div className="csd-hero-binary-foot-k">PRINCIPLE</div>
                      <div className="csd-hero-binary-foot-v">Every product is a series of binary decisions made well.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom counter strip */}
            <div className="csd-hero-fade csd-hero-counter" style={{ opacity: 0 }}>
              {[
                { k: "Products shipped", v: "150+" },
                { k: "Avg Lighthouse", v: "98" },
                { k: "Time to MVP", v: "8 wk" },
                { k: "Senior team", v: "100%" },
              ].map((it, i) => (
                <div key={it.k} className="csd-hero-counter-cell">
                  <div className="csd-hero-counter-k">
                    <span style={{ opacity: 0.4, fontFamily: "var(--font-mono)", marginRight: 8 }}>{String(i + 1).padStart(2, "0")}</span>
                    {it.k}
                  </div>
                  <div className="csd-hero-counter-v">{it.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — SERVICES SNAPSHOT
            DIFFERENT treatment: each service is a wide HORIZONTAL ROW,
            not a card grid. Binary code on the left, large display title,
            description + tags, and a hover line that fills.
            Reads like a manifest of capabilities, not a generic service grid.
        ═══════════════════════════════════════════════════════════════ */}
        <section id="capabilities" className="csd-cap-section">
          <div className="csd-cap-inner">
            <div className="csd-sh csd-cap-header">
              <div>
                <div className="csd-eyebrow">
                  <span className="csd-eyebrow-line" />
                  <span style={{ fontFamily: "var(--font-mono)" }}>0010</span>
                  <span>Capabilities</span>
                </div>
                <h2 className="csd-h2">
                  Six disciplines.{" "}
                  <span className="csd-italic-mute">One senior team.</span>
                </h2>
              </div>
              <p className="csd-h2-lead">
                Each capability links to a dedicated overview. Combine several
                into one engagement — most clients do.
              </p>
            </div>

            <div className="csd-cap-list">
              {SUB_SERVICES.map((s) => (
                <Link
                  key={s.num}
                  id={`cap-${s.num}`}
                  href={s.href}
                  className="csd-svc-card csd-cap-row"
                  style={{ ["--svc-accent" as never]: s.accent }}
                >
                  {/* Hover sweep */}
                  <span className="csd-cap-row-sweep" aria-hidden />

                  <div className="csd-cap-row-bin">
                    <span className="csd-cap-row-dot" style={{ background: s.accent }} />
                    <span>{s.bin}</span>
                  </div>

                  <div className="csd-cap-row-num">{s.num}</div>

                  <div className="csd-cap-row-body">
                    <h3 className="csd-cap-row-title">{s.title}</h3>
                    <p className="csd-cap-row-desc">{s.desc}</p>
                  </div>

                  <div className="csd-cap-row-tags">
                    {s.tags.map((t) => <span key={t}>{t}</span>)}
                  </div>

                  <div className="csd-cap-row-arrow" aria-hidden>
                    <svg width="20" height="20" viewBox="0 0 20 20">
                      <path d="M5 10h10M10 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — WHAT WE BUILD
            Image RIGHT, text LEFT. Left = numbered hover list of product
            types. Right = animated device frame (browser/dashboard/phone)
            that switches based on which row is hovered/focused.
        ═══════════════════════════════════════════════════════════════ */}
        <section className="csd-build-section">
          <div className="csd-build-inner">
            <div className="csd-build-grid">
              {/* LEFT — text + interactive list */}
              <div className="csd-build-left">
                <div className="csd-sh">
                  <div className="csd-eyebrow">
                    <span className="csd-eyebrow-line" />
                    <span style={{ fontFamily: "var(--font-mono)" }}>0011</span>
                    <span>What we build</span>
                  </div>
                  <h2 className="csd-h2">
                    Real products,{" "}
                    <span className="csd-italic-mute">not slides.</span>
                  </h2>
                  <p className="csd-h2-lead csd-build-lead">
                    Service categories are abstract. Here&apos;s what they
                    actually become in production — hover any row to see it.
                  </p>
                </div>

                <ul className="csd-build-list" role="list">
                  {WE_BUILD.map((b, i) => {
                    const active = hoveredBuild === i;
                    return (
                      <li
                        key={b.id}
                        className="csd-build-row"
                        data-active={active ? "true" : "false"}
                        onMouseEnter={() => setHoveredBuild(i)}
                        onFocus={() => setHoveredBuild(i)}
                        tabIndex={0}
                      >
                        <span className="csd-build-row-bin">
                          <span style={{ fontFamily: "var(--font-mono)" }}>{b.bin}</span>
                        </span>
                        <span className="csd-build-row-label">{b.label}</span>
                        <span className="csd-build-row-desc">{b.desc}</span>
                        <span className="csd-build-row-line" />
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* RIGHT — animated device viz tied to hover state */}
              <div className="csd-build-right">
                <div className="csd-build-stage" aria-hidden>
                  {/* Background grid */}
                  <div className="csd-build-stage-grid" />

                  {/* Floating frames */}
                  <BuildFrame index={0} active={hoveredBuild === 0} variant="saas"      label="SaaS" />
                  <BuildFrame index={1} active={hoveredBuild === 1} variant="dashboard" label="Dashboard" />
                  <BuildFrame index={2} active={hoveredBuild === 2} variant="mobile"    label="Mobile" />
                  <BuildFrame index={3} active={hoveredBuild === 3} variant="internal"  label="Internal" />
                  <BuildFrame index={4} active={hoveredBuild === 4} variant="mvp"       label="MVP" />
                  <BuildFrame index={5} active={hoveredBuild === 5} variant="market"    label="Market" />

                  {/* Active label badge */}
                  <div className="csd-build-stage-badge">
                    <span className="csd-build-stage-badge-bin">{WE_BUILD[hoveredBuild].bin}</span>
                    <span>{WE_BUILD[hoveredBuild].label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — VALUE PROPOSITION
            Heavy binary theme. Each principle is a CARD with a giant
            binary code, a sharp claim, and a measurable metric.
            Image LEFT (binary mark visual), text RIGHT (4 cards in 2x2).
        ═══════════════════════════════════════════════════════════════ */}
        <section className="csd-vp-section">
          <div className="csd-vp-inner">
            <div className="csd-vp-grid">
              {/* LEFT — visual: stylized "principles" card with rotating binary */}
              <div className="csd-vp-left">
                <div className="csd-sh">
                  <div className="csd-eyebrow csd-eyebrow-light">
                    <span className="csd-eyebrow-line" />
                    <span style={{ fontFamily: "var(--font-mono)" }}>0100</span>
                    <span>Principles</span>
                  </div>
                  <h2 className="csd-h2 csd-h2-light">
                    Why teams<br />
                    <span className="csd-italic-light">choose us.</span>
                  </h2>
                  <p className="csd-h2-lead csd-h2-lead-light">
                    Anyone can list adjectives. Below are the operating
                    principles that show up in the code we ship.
                  </p>
                </div>

                {/* Visual treatment — vertical binary "tape" */}
                <div className="csd-vp-tape" aria-hidden>
                  <div className="csd-vp-tape-track">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} className="csd-vp-tape-cell">
                        <span>{i % 2 === 0 ? "1" : "0"}</span>
                        <span className="csd-vp-tape-dot" />
                      </div>
                    ))}
                  </div>
                  <div className="csd-vp-tape-mask" />
                </div>
              </div>

              {/* RIGHT — 4 principle cards in 2x2 grid */}
              <div className="csd-vp-right">
                {VALUE_PROPS.map((v) => (
                  <div key={v.bin} className="csd-vp-card">
                    <div className="csd-vp-card-top">
                      <span className="csd-vp-card-bin">{v.bin}</span>
                      <span className="csd-vp-card-metric">
                        <span className="csd-vp-card-metric-num">{v.metric}</span>
                        <span className="csd-vp-card-metric-unit">{v.metricUnit}</span>
                      </span>
                    </div>
                    <div className="csd-vp-card-metric-label">{v.metricLabel}</div>
                    <h3 className="csd-vp-card-title">{v.title}</h3>
                    <p className="csd-vp-card-desc">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 — PROCESS (UNCHANGED — pinned horizontal as on landing)
        ═══════════════════════════════════════════════════════════════ */}
        <section
          className="csd-process-pin"
          style={{
            padding: 0, background: "#0a0a0a", color: "#fafaf9",
            height: isMobile ? "auto" : "100vh",
            overflow: isMobile ? "visible" : "hidden",
            position: "relative", display: "flex", flexDirection: "column",
          }}
        >
          <div
            aria-hidden
            style={{
              position: "absolute", inset: 0,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "60px 60px", pointerEvents: "none",
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
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(32px, 4.5vw, 72px)", fontWeight: 500,
                  letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
                }}
              >
                Our <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>process.</span>
              </h2>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 320, lineHeight: 1.65, margin: 0, textAlign: "right", flexShrink: 0 }}>
              Six phases. One team. A way of working refined<br />across 150+ shipped products.
            </p>
          </div>

          <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
            <div
              className="csd-process-track"
              style={{
                display: "flex", gap: 20,
                paddingLeft: 20, paddingRight: 112,
                willChange: "transform", alignItems: "stretch",
              }}
            >
              {PROCESS.map((step, i) => (
                <div
                  key={i}
                  className="csd-process-card"
                  style={{
                    width: "clamp(320px, 28vw, 440px)", flexShrink: 0,
                    padding: "clamp(28px, 3.5vh, 44px) 36px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20, background: "rgba(255,255,255,0.02)",
                    display: "flex", flexDirection: "column", justifyContent: "space-between",
                    height: "clamp(340px, 58vh, 500px)",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(24px, 4vh, 48px)" }}>
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
                          color: "rgba(255,255,255,0.65)", letterSpacing: "0.04em",
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
                    <p style={{ fontSize: "clamp(13px, 1.6vh, 15px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "clamp(14px, 2.5vh, 24px)" }}>
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
                  Every project. <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>No exceptions.</span>
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
              <div style={{ position: "absolute", bottom: 20, left: 32, fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(255,255,255,0.25)" }} />
                Scroll
              </div>
              <div style={{ position: "absolute", bottom: 20, right: 32, fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontVariantNumeric: "tabular-nums" }}>
                06 phases
              </div>
            </>
          )}
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 6 — TECH STACK (UNCHANGED — same marquee as landing)
        ═══════════════════════════════════════════════════════════════ */}
        <section
          className="csd-tech-marquee"
          onMouseEnter={handleTechMarqueeEnter}
          onMouseLeave={handleTechMarqueeLeave}
          style={{ padding: "120px 0", borderTop: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", background: "#fafaf9" }}
        >
          <div className="csd-sh" style={{ maxWidth: 1320, margin: "0 auto 56px", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40, flexWrap: "wrap" }}>
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.8vw, 56px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>
                Tools we <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>trust.</span>
              </h2>
            </div>
            <p style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", maxWidth: 380, lineHeight: 1.65, margin: 0 }}>
              Mature, battle-tested tooling — picked for your problem, not because it&apos;s new.
            </p>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ overflow: "hidden" }}>
              <div ref={marqueeLeftRef} className="marquee-track" style={{ display: "flex", width: "max-content", gap: 0 }}>
                {[...TECH, ...TECH].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 24px", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.4vw, 34px)", fontWeight: 500, color: "#0a0a0a", letterSpacing: "-0.025em" }}>{t}</span>
                    <span aria-hidden style={{ width: 8, height: 8, background: "#0a0a0a", borderRadius: "50%", opacity: 0.2 }} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ overflow: "hidden", marginTop: 20 }}>
              <div ref={marqueeRightRef} className="marquee-track" style={{ display: "flex", width: "max-content", gap: 0 }}>
                {[...TECH.slice().reverse(), ...TECH.slice().reverse()].map((t, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 24px", flexShrink: 0 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.4vw, 34px)", fontWeight: 400, fontStyle: "italic", color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.2)", letterSpacing: "-0.025em" }}>{t}</span>
                    <span aria-hidden style={{ width: 8, height: 8, border: "1px solid rgba(0,0,0,0.2)", borderRadius: "50%" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 7 — RESULTS / IMPACT
            Image LEFT (the metric, huge), text RIGHT (project + story).
            Each result is a wide horizontal panel with the number doing
            the heavy visual lifting. Reads as evidence, not a stat grid.
        ═══════════════════════════════════════════════════════════════ */}
        <section className="csd-results-section">
          <div className="csd-results-inner">
            <div className="csd-sh csd-results-header">
              <div>
                <div className="csd-eyebrow">
                  <span className="csd-eyebrow-line" />
                  <span style={{ fontFamily: "var(--font-mono)" }}>0111</span>
                  <span>Outcomes</span>
                </div>
                <h2 className="csd-h2">
                  We don&apos;t just build software.{" "}
                  <span className="csd-italic-mute">We deliver results.</span>
                </h2>
              </div>
              <p className="csd-h2-lead">
                Selected outcomes from recent engagements. Numbers measured
                in production, not extrapolated from pitch decks.
              </p>
            </div>

            <div className="csd-results-list">
              {RESULTS.map((r, i) => (
                <div key={r.label} className="csd-result-card">
                  {/* Left = the number */}
                  <div className="csd-result-num-wrap">
                    <div className="csd-result-index">
                      <span style={{ fontFamily: "var(--font-mono)" }}>R-{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="csd-result-metric">{r.metric}</div>
                    <div className="csd-result-label">{r.label}</div>
                  </div>
                  {/* Right = the story */}
                  <div className="csd-result-story">
                    <div className="csd-result-project">
                      <span className="csd-result-project-dot" />
                      {r.project}
                    </div>
                    <p className="csd-result-desc">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 8 — FAQs
        ═══════════════════════════════════════════════════════════════ */}
        <section className="csd-faq-section">
          <div className="csd-faq-layout">
            <div className="csd-faq-aside csd-sh">
              <div className="csd-eyebrow">
                <span className="csd-eyebrow-line" />
                <span style={{ fontFamily: "var(--font-mono)" }}>1000</span>
                <span>Questions</span>
              </div>
              <h2 className="csd-h2">
                Frequently <span className="csd-italic-mute">asked.</span>
              </h2>
              <p className="csd-h2-lead csd-faq-lead">
                Real questions from real prospects. If yours isn&apos;t here,
                send us a note — we answer every inquiry within 24 hours.
              </p>
              <Link href="/contact" className="csd-faq-cta">
                Ask us anything
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                  <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="csd-faq-list">
              {FAQS.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} className="csd-faq-row" data-open={isOpen ? "true" : "false"}>
                    <button
                      type="button" className="csd-faq-q"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      suppressHydrationWarning
                    >
                      <span className="csd-faq-q-num">{String(i + 1).padStart(2, "0")}</span>
                      <span className="csd-faq-q-text">{f.q}</span>
                      <span className="csd-faq-q-icon" aria-hidden>
                        <svg width="14" height="14" viewBox="0 0 14 14">
                          <path d="M3 7h8 M7 3v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
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
        ═══════════════════════════════════════════════════════════════ */}
        <section style={{ padding: "0 20px 64px", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 64 }}>
          <div
            className="csd-cta-inner"
            style={{
              borderRadius: 28, overflow: "hidden",
              padding: "92px 56px", position: "relative",
              background: "#0a0a0a", color: "#fafaf9",
              opacity: 0, maxWidth: 1320, margin: "0 auto",
            }}
          >
            <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
            <div aria-hidden style={{ position: "absolute", top: "-20%", right: "-10%", width: 560, height: 560, background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

            {/* Big floating binary mark in CTA — ties the page back to the hero */}
            <div aria-hidden className="csd-cta-mark">
              <span>1</span><span>0</span>
            </div>

            <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 84px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.94, margin: "0 0 28px" }}>
                Ready to build something{" "}
                <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>that lasts?</span>
              </h2>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.58)", maxWidth: 540, lineHeight: 1.62, margin: "0 0 36px" }}>
                Free 30-minute discovery call. You&apos;ll talk directly with an engineer
                and a strategist. No sales pitch — just a real conversation about your
                problem, your timeline, and whether we&apos;re the right team for it.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", background: "#fafaf9", color: "#0a0a0a", textDecoration: "none", fontSize: 14, fontWeight: 500, borderRadius: 999, transition: "transform 0.2s" }}>
                  Book a discovery call <span aria-hidden>→</span>
                </Link>
                <a href="mailto:hello@techbinaries.com" className="csd-ghost-dark" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14, fontWeight: 500, borderRadius: 999, transition: "background 0.2s, border-color 0.2s" }}>
                  hello@techbinaries.com
                </a>
              </div>
              <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                {[
                  { k: "Response time",   v: "Within 24h" },
                  { k: "Typical project", v: "8–24 weeks" },
                  { k: "Engagement type", v: "Fixed or T&M" },
                ].map((it) => (
                  <div key={it.k}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{it.k}</div>
                    <div style={{ fontSize: 15, color: "#fafaf9", fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.01em" }}>{it.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════════════
           SHARED PRIMITIVES
        ═══════════════════════════════════════════════════════════════ */
        .csd-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 18px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
        }
        .csd-eyebrow-line {
          width: 24px;
          height: 1px;
          background: rgba(10,10,10,0.3);
        }
        .csd-eyebrow-light {
          color: rgba(255,255,255,0.55);
        }
        .csd-eyebrow-light .csd-eyebrow-line {
          background: rgba(255,255,255,0.3);
        }
        .csd-h2 {
          font-family: var(--font-display);
          font-size: clamp(32px, 4.4vw, 64px);
          font-weight: 500;
          letter-spacing: -0.032em;
          line-height: 1.02;
          margin: 0 0 16px;
          max-width: 760px;
        }
        .csd-h2-light { color: #fafaf9; }
        .csd-italic-mute {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.55);
        }
        .csd-italic-light {
          font-style: italic;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
        }
        .csd-h2-lead {
          font-size: 15px;
          color: rgba(10,10,10,0.58);
          line-height: 1.65;
          margin: 0;
          max-width: 460px;
        }
        .csd-h2-lead-light { color: rgba(255,255,255,0.6); }

        .csd-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 28px;
          background: #0a0a0a;
          color: #fafaf9;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 999px;
          position: relative;
          overflow: hidden;
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

        .csd-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 26px;
          border: 1px solid rgba(255,255,255,0.18);
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 999px;
          background: transparent;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .csd-cta-ghost:hover {
          border-color: rgba(255,255,255,0.45);
          background: rgba(255,255,255,0.05);
          color: #fafaf9;
        }
        .csd-ghost-dark:hover {
          border-color: rgba(255,255,255,0.45) !important;
          background: rgba(255,255,255,0.05) !important;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 1 — HERO
        ═══════════════════════════════════════════════════════════════ */
        .csd-hero {
          position: relative;
          min-height: 100vh;
          background: #0a0a0a;
          color: #fafaf9;
          padding: 140px 20px 60px;
          overflow: hidden;
        }
        .csd-hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 40%, black 0%, transparent 90%);
          pointer-events: none;
        }
        .csd-hero-stream {
          position: absolute;
          left: 0; right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 16px;
          overflow: hidden;
          pointer-events: none;
          opacity: 0.32;
        }
        .csd-hero-stream-line {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.4);
          white-space: nowrap;
          mask-image: linear-gradient(90deg, transparent, black 20%, black 80%, transparent);
          -webkit-mask-image: linear-gradient(90deg, transparent, black 20%, black 80%, transparent);
        }

        .csd-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          min-height: calc(100vh - 200px);
        }

        .csd-hero-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 24px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }
        .csd-hero-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.6);
        }
        .csd-hero-meta-dot {
          width: 8px; height: 8px;
          background: #f472b6;
          border-radius: 50%;
          box-shadow: 0 0 0 4px rgba(244,114,182,0.18);
        }

        .csd-hero-main {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 64px;
          align-items: center;
          flex: 1;
        }

        /* Left side */
        .csd-hero-title {
          font-family: var(--font-display);
          font-size: clamp(44px, 6.8vw, 108px);
          font-weight: 500;
          line-height: 0.92;
          letter-spacing: -0.04em;
          margin: 0 0 36px;
          color: #fafaf9;
        }
        .csd-h1-line {
          overflow: hidden;
          padding-bottom: 0.06em;
          display: flex;
          flex-wrap: nowrap;
          align-items: baseline;
        }
        .csd-h1-char {
          display: inline-block;
          will-change: transform;
        }
        .csd-h1-bracket {
          display: inline-block;
          color: rgba(255,255,255,0.3);
          font-weight: 400;
          margin: 0 0.04em;
          font-style: italic;
        }
        .csd-h1-binary {
          display: inline-block;
          color: #f472b6;
          font-family: var(--font-mono);
          font-weight: 500;
          font-size: 0.85em;
          letter-spacing: 0;
          animation: csd-binary-flip 2.4s steps(1) infinite;
        }
        @keyframes csd-binary-flip {
          0%, 49% { content: "0"; }
          50%, 100% { content: "1"; }
        }
        .csd-h1-binary::after {
          content: "1";
          animation: csd-binary-show 2.4s steps(1) infinite;
        }
        .csd-h1-binary {
          font-size: 0;
        }
        .csd-h1-binary::before {
          content: "0";
          font-size: clamp(44px, 6.8vw, 108px);
          font-family: var(--font-mono);
          color: #f472b6;
          animation: csd-binary-toggle 2.4s steps(1) infinite;
        }
        .csd-h1-binary::after { display: none; }
        @keyframes csd-binary-toggle {
          0%, 49% { content: "0"; }
          50%, 100% { content: "1"; }
        }
        .csd-h1-italic {
          font-style: italic;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
          display: inline-flex;
        }
        .csd-h1-period {
          color: #f472b6 !important;
        }

        .csd-hero-lead {
          font-size: 17px;
          color: rgba(255,255,255,0.6);
          max-width: 520px;
          line-height: 1.65;
          margin: 0 0 32px;
        }

        .csd-hero-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 32px;
          max-width: 600px;
        }
        .csd-hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.75);
          text-decoration: none;
          background: rgba(255,255,255,0.02);
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .csd-hero-chip:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.3);
          color: #fafaf9;
        }
        .csd-hero-chip-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .csd-hero-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* Right side — binary mark */
        .csd-hero-right { position: relative; }
        .csd-hero-binary-frame {
          position: relative;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          background: rgba(255,255,255,0.02);
          overflow: hidden;
          box-shadow: 0 30px 70px -30px rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
        }
        .csd-hero-binary-chrome {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        .csd-hero-binary-chrome-left,
        .csd-hero-binary-chrome-right {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .csd-hero-binary-stage {
          position: relative;
          aspect-ratio: 1.05 / 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .csd-hero-ring {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50%;
          aspect-ratio: 1;
        }
        .csd-hero-ring-1 { width: 56%; animation: csd-spin 22s linear infinite; }
        .csd-hero-ring-2 { width: 76%; animation: csd-spin 32s linear infinite reverse; border-color: rgba(244,114,182,0.16); }
        .csd-hero-ring-3 { width: 96%; animation: csd-spin 48s linear infinite; border-color: rgba(255,255,255,0.05); }
        .csd-hero-ring-1::after,
        .csd-hero-ring-2::after {
          content: "";
          position: absolute;
          top: -3px; left: 50%;
          width: 6px; height: 6px;
          margin-left: -3px;
          background: #f472b6;
          border-radius: 50%;
          box-shadow: 0 0 14px rgba(244,114,182,0.6);
        }
        .csd-hero-ring-2::after {
          background: #fafaf9;
          box-shadow: 0 0 14px rgba(255,255,255,0.6);
        }
        @keyframes csd-spin { to { transform: rotate(360deg); } }

        .csd-hero-mark {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: clamp(10px, 2vw, 24px);
          font-family: var(--font-display);
          font-size: clamp(110px, 16vw, 220px);
          font-weight: 500;
          letter-spacing: -0.1em;
          line-height: 0.8;
        }
        .csd-hero-mark-1 {
          color: #fafaf9;
          animation: csd-mark-1 4.8s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
        .csd-hero-mark-0 {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.3);
          animation: csd-mark-0 4.8s cubic-bezier(0.76, 0, 0.24, 1) infinite;
        }
        @keyframes csd-mark-1 {
          0%, 100% { transform: translateX(0); }
          45%, 55% { transform: translateX(8px); color: #f472b6; }
        }
        @keyframes csd-mark-0 {
          0%, 100% { transform: translateX(0) scale(1); }
          45%, 55% { transform: translateX(-8px) scale(1.04); -webkit-text-stroke-color: rgba(244,114,182,0.5); }
        }

        .csd-hero-anno {
          position: absolute;
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          padding: 4px 10px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          background: rgba(10,10,10,0.6);
          backdrop-filter: blur(6px);
        }
        .csd-hero-anno-tl { top: 14%;  left: 8%; }
        .csd-hero-anno-tr { top: 14%;  right: 8%; }
        .csd-hero-anno-bl { bottom: 14%; left: 8%; }
        .csd-hero-anno-br { bottom: 14%; right: 8%; }

        .csd-hero-cross-x,
        .csd-hero-cross-y {
          position: absolute;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent);
          pointer-events: none;
        }
        .csd-hero-cross-x { left: 0; right: 0; top: 50%; height: 1px; }
        .csd-hero-cross-y { top: 0; bottom: 0; left: 50%; width: 1px;
          background: linear-gradient(180deg, transparent, rgba(255,255,255,0.06), transparent); }

        .csd-hero-binary-footer {
          padding: 18px 22px 22px;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
        }
        .csd-hero-binary-foot-k {
          font-family: var(--font-mono);
          font-size: 10px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.16em;
          margin-bottom: 4px;
        }
        .csd-hero-binary-foot-v {
          font-family: var(--font-display);
          font-size: 14px;
          color: rgba(255,255,255,0.85);
          font-style: italic;
          line-height: 1.4;
        }

        .csd-hero-counter {
          margin-top: 64px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.08);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .csd-hero-counter-cell {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .csd-hero-counter-k {
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
        }
        .csd-hero-counter-v {
          font-family: var(--font-display);
          font-size: clamp(22px, 2.4vw, 30px);
          font-weight: 500;
          letter-spacing: -0.025em;
          color: #fafaf9;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 2 — CAPABILITIES (horizontal rows)
        ═══════════════════════════════════════════════════════════════ */
        .csd-cap-section {
          padding: 140px 20px;
          background: #fafaf9;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .csd-cap-inner { max-width: 1320px; margin: 0 auto; }
        .csd-cap-header {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 40px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }

        .csd-cap-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(10,10,10,0.1);
        }
        .csd-cap-row {
          display: grid;
          grid-template-columns: 80px 60px 1fr 280px 40px;
          gap: 28px;
          align-items: center;
          padding: 32px 24px;
          border-bottom: 1px solid rgba(10,10,10,0.1);
          text-decoration: none;
          color: #0a0a0a;
          position: relative;
          overflow: hidden;
          transition: background 0.3s ease;
        }
        .csd-cap-row-sweep {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 4px;
          background: var(--svc-accent);
          transform: scaleY(0);
          transform-origin: top center;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .csd-cap-row:hover {
          background: rgba(10,10,10,0.025);
        }
        .csd-cap-row:hover .csd-cap-row-sweep {
          transform: scaleY(1);
        }
        .csd-cap-row-bin {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          color: rgba(10,10,10,0.55);
          letter-spacing: 0.04em;
        }
        .csd-cap-row-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
        }
        .csd-cap-row-num {
          font-family: var(--font-display);
          font-size: 36px;
          font-weight: 500;
          letter-spacing: -0.04em;
          color: transparent;
          -webkit-text-stroke: 1px rgba(10,10,10,0.3);
          font-variant-numeric: tabular-nums;
          line-height: 1;
          transition: color 0.3s, -webkit-text-stroke-color 0.3s;
        }
        .csd-cap-row:hover .csd-cap-row-num {
          color: #0a0a0a;
          -webkit-text-stroke-color: transparent;
        }
        .csd-cap-row-title {
          font-family: var(--font-display);
          font-size: clamp(22px, 2.4vw, 30px);
          font-weight: 500;
          letter-spacing: -0.022em;
          line-height: 1.18;
          margin: 0 0 6px;
        }
        .csd-cap-row-desc {
          font-size: 14px;
          color: rgba(10,10,10,0.6);
          line-height: 1.55;
          margin: 0;
          max-width: 580px;
        }
        .csd-cap-row-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          justify-content: flex-end;
        }
        .csd-cap-row-tags span {
          padding: 4px 10px;
          border: 1px solid rgba(10,10,10,0.12);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(10,10,10,0.7);
          letter-spacing: 0.02em;
          background: #fff;
        }
        .csd-cap-row-arrow {
          color: rgba(10,10,10,0.35);
          transition: transform 0.3s, color 0.3s;
        }
        .csd-cap-row:hover .csd-cap-row-arrow {
          color: #0a0a0a;
          transform: translateX(4px);
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 3 — WHAT WE BUILD
        ═══════════════════════════════════════════════════════════════ */
        .csd-build-section {
          padding: 140px 20px;
          background: #f5f5f4;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .csd-build-inner { max-width: 1320px; margin: 0 auto; }
        .csd-build-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 80px;
          align-items: stretch;
        }
        .csd-build-lead { margin-bottom: 40px; }

        .csd-build-list {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid rgba(10,10,10,0.1);
        }
        .csd-build-row {
          display: grid;
          grid-template-columns: 60px 1fr;
          column-gap: 18px;
          row-gap: 6px;
          align-items: baseline;
          padding: 22px 0 22px;
          border-bottom: 1px solid rgba(10,10,10,0.1);
          position: relative;
          cursor: pointer;
          outline: none;
          transition: padding-left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .csd-build-row:focus-visible {
          padding-left: 8px;
        }
        .csd-build-row[data-active="true"] {
          padding-left: 8px;
        }
        .csd-build-row-bin {
          font-family: var(--font-mono);
          font-size: 13px;
          color: rgba(10,10,10,0.4);
          letter-spacing: 0.04em;
          padding-top: 6px;
          transition: color 0.25s;
        }
        .csd-build-row[data-active="true"] .csd-build-row-bin {
          color: #f472b6;
        }
        .csd-build-row-label {
          font-family: var(--font-display);
          font-size: clamp(22px, 2.6vw, 32px);
          font-weight: 500;
          letter-spacing: -0.024em;
          line-height: 1.1;
          color: #0a0a0a;
        }
        .csd-build-row-desc {
          grid-column: 2;
          font-size: 14px;
          color: rgba(10,10,10,0.6);
          line-height: 1.55;
          max-width: 520px;
        }
        .csd-build-row-line {
          position: absolute;
          left: 0; bottom: -1px;
          width: 0;
          height: 2px;
          background: #f472b6;
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .csd-build-row[data-active="true"] .csd-build-row-line {
          width: 100%;
        }

        /* Right stage */
        .csd-build-right {
          position: relative;
          min-height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .csd-build-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 0.95 / 1;
          background: #0a0a0a;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 40px 90px -50px rgba(0,0,0,0.5);
        }
        .csd-build-stage-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .csd-build-frame {
          position: absolute;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 14px;
          opacity: 0.35;
          transform: scale(0.95) translateY(0);
          transition:
            opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
            border-color 0.5s,
            background 0.5s,
            box-shadow 0.5s;
          backdrop-filter: blur(6px);
        }
        .csd-build-frame[data-active="true"] {
          opacity: 1;
          z-index: 5;
          transform: scale(1.03) translateY(-4px);
          border-color: rgba(244,114,182,0.5);
          background: rgba(244,114,182,0.04);
          box-shadow: 0 24px 48px -20px rgba(244,114,182,0.35);
        }
        .csd-build-frame-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
        }
        .csd-build-frame-dots {
          display: flex;
          gap: 4px;
        }
        .csd-build-frame-dots span {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }
        .csd-build-frame-name {
          font-family: var(--font-mono);
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .csd-build-frame-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        /* Frame variants */
        .csd-build-frame-saas      { top: 8%;  left: 5%;  width: 48%; }
        .csd-build-frame-dashboard { top: 12%; right: 4%; width: 44%; }
        .csd-build-frame-mobile    { top: 38%; left: 38%; width: 26%; aspect-ratio: 0.5; padding: 10px; }
        .csd-build-frame-internal  { bottom: 8%; left: 6%;  width: 42%; }
        .csd-build-frame-mvp       { bottom: 18%; right: 6%; width: 38%; }
        .csd-build-frame-market    { bottom: 4%; right: 22%; width: 36%; }

        .csd-bf-bar {
          height: 6px;
          background: rgba(255,255,255,0.12);
          border-radius: 2px;
        }
        .csd-bf-bar-pink {
          height: 6px;
          background: linear-gradient(90deg, #f472b6, rgba(244,114,182,0.3));
          border-radius: 2px;
        }
        .csd-bf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
        }
        .csd-bf-grid > div {
          aspect-ratio: 1.4;
          background: rgba(255,255,255,0.08);
          border-radius: 3px;
        }
        .csd-bf-grid > div:nth-child(2) { background: rgba(244,114,182,0.4); }
        .csd-bf-chart {
          display: flex;
          align-items: flex-end;
          gap: 3px;
          height: 50px;
        }
        .csd-bf-chart > span {
          flex: 1;
          background: rgba(255,255,255,0.14);
          border-radius: 2px 2px 0 0;
        }
        .csd-bf-chart > span:nth-child(odd) {
          background: rgba(244,114,182,0.5);
        }
        .csd-bf-mobile-bar {
          height: 4px;
          background: rgba(255,255,255,0.12);
          border-radius: 2px;
        }
        .csd-bf-mobile-circle {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(244,114,182,0.4);
          border: 2px solid rgba(244,114,182,0.7);
          margin: 8px auto;
        }

        .csd-build-stage-badge {
          position: absolute;
          bottom: 22px;
          left: 22px;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px 10px 12px;
          background: rgba(10,10,10,0.85);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 999px;
          backdrop-filter: blur(10px);
          font-family: var(--font-display);
          font-size: 14px;
          color: #fafaf9;
          letter-spacing: -0.01em;
        }
        .csd-build-stage-badge-bin {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 3px 8px;
          background: rgba(244,114,182,0.18);
          color: #f472b6;
          border-radius: 999px;
          letter-spacing: 0.1em;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 4 — VALUE PROPOSITION
        ═══════════════════════════════════════════════════════════════ */
        .csd-vp-section {
          padding: 140px 20px;
          background: #0a0a0a;
          color: #fafaf9;
          position: relative;
          overflow: hidden;
        }
        .csd-vp-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 0%, transparent 90%);
          pointer-events: none;
        }
        .csd-vp-inner {
          max-width: 1320px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .csd-vp-grid {
          display: grid;
          grid-template-columns: 0.85fr 1.15fr;
          gap: 80px;
          align-items: stretch;
        }
        .csd-vp-left {
          display: flex;
          flex-direction: column;
        }
        .csd-vp-tape {
          margin-top: 48px;
          flex: 1;
          position: relative;
          min-height: 400px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 18px;
          overflow: hidden;
          background:
            linear-gradient(135deg, rgba(244,114,182,0.04), rgba(255,255,255,0.01));
        }
        .csd-vp-tape-track {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          animation: csd-tape-scroll 30s linear infinite;
        }
        @keyframes csd-tape-scroll {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .csd-vp-tape-cell {
          flex-shrink: 0;
          padding: 14px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-family: var(--font-mono);
          font-size: 24px;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          letter-spacing: 0.06em;
        }
        .csd-vp-tape-cell:nth-child(odd) {
          color: rgba(244,114,182,0.7);
        }
        .csd-vp-tape-cell:nth-child(3n) {
          color: rgba(255,255,255,0.4);
        }
        .csd-vp-tape-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }
        .csd-vp-tape-cell:nth-child(odd) .csd-vp-tape-dot {
          background: #f472b6;
        }
        .csd-vp-tape-mask {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg,
            rgba(10,10,10,1) 0%,
            transparent 15%,
            transparent 85%,
            rgba(10,10,10,1) 100%);
        }

        .csd-vp-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          align-content: start;
        }
        .csd-vp-card {
          padding: 28px 28px 32px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          background: rgba(255,255,255,0.02);
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-height: 280px;
          transition: background 0.3s, border-color 0.3s, transform 0.3s;
        }
        .csd-vp-card:hover {
          background: rgba(255,255,255,0.04);
          border-color: rgba(255,255,255,0.2);
          transform: translateY(-2px);
        }
        .csd-vp-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
        }
        .csd-vp-card-bin {
          font-family: var(--font-mono);
          font-size: 13px;
          font-weight: 500;
          color: #f472b6;
          padding: 5px 11px;
          border: 1px solid rgba(244,114,182,0.3);
          border-radius: 6px;
          background: rgba(244,114,182,0.06);
          letter-spacing: 0.08em;
        }
        .csd-vp-card-metric {
          display: inline-flex;
          align-items: baseline;
          gap: 2px;
          font-family: var(--font-display);
          color: #fafaf9;
        }
        .csd-vp-card-metric-num {
          font-size: 44px;
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 1;
        }
        .csd-vp-card-metric-unit {
          font-size: 22px;
          font-weight: 400;
          color: rgba(255,255,255,0.5);
        }
        .csd-vp-card-metric-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          text-align: right;
          margin-bottom: 18px;
        }
        .csd-vp-card-title {
          font-family: var(--font-display);
          font-size: clamp(20px, 2vw, 26px);
          font-weight: 500;
          letter-spacing: -0.022em;
          line-height: 1.18;
          margin: 0 0 10px;
          color: #fafaf9;
        }
        .csd-vp-card-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255,255,255,0.6);
          margin: 0;
          margin-top: auto;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 7 — RESULTS
        ═══════════════════════════════════════════════════════════════ */
        .csd-results-section {
          padding: 140px 20px;
          background: #f5f5f4;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .csd-results-inner { max-width: 1320px; margin: 0 auto; }
        .csd-results-header {
          display: flex;
          justify-content: space-between;
          align-items: end;
          gap: 40px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }

        .csd-results-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .csd-result-card {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 24px;
          padding: 32px 32px 36px;
          background: #fff;
          border: 1px solid rgba(10,10,10,0.1);
          border-radius: 22px;
          align-items: start;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        .csd-result-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; bottom: 0;
          width: 3px;
          background: #f472b6;
          transform: scaleY(0);
          transform-origin: top;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .csd-result-card:hover {
          transform: translateY(-4px);
          border-color: rgba(10,10,10,0.22);
          box-shadow: 0 24px 50px -28px rgba(10,10,10,0.22);
        }
        .csd-result-card:hover::before {
          transform: scaleY(1);
        }
        .csd-result-num-wrap {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .csd-result-index {
          font-size: 11px;
          color: rgba(10,10,10,0.4);
          letter-spacing: 0.12em;
          margin-bottom: 8px;
        }
        .csd-result-metric {
          font-family: var(--font-display);
          font-size: clamp(56px, 7vw, 96px);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 0.92;
          color: #0a0a0a;
          font-variant-numeric: tabular-nums;
        }
        .csd-result-label {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 500;
          letter-spacing: -0.012em;
          color: rgba(10,10,10,0.65);
          margin-top: 4px;
        }
        .csd-result-story {
          padding-top: 28px;
        }
        .csd-result-project {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.55);
          margin-bottom: 14px;
          padding: 5px 12px;
          border: 1px solid rgba(10,10,10,0.12);
          border-radius: 999px;
          background: rgba(10,10,10,0.02);
        }
        .csd-result-project-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #f472b6;
        }
        .csd-result-desc {
          font-size: 14.5px;
          line-height: 1.65;
          color: rgba(10,10,10,0.62);
          margin: 0;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 8 — FAQs
        ═══════════════════════════════════════════════════════════════ */
        .csd-faq-section {
          padding: 140px 20px;
          background: #fafaf9;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .csd-faq-layout {
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 80px;
          align-items: start;
        }
        .csd-faq-aside { position: sticky; top: 120px; }
        .csd-faq-lead { margin-bottom: 28px; }
        .csd-faq-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border: 1px solid rgba(0,0,0,0.85);
          color: #0a0a0a;
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          border-radius: 999px;
          transition: background 0.2s, color 0.2s;
        }
        .csd-faq-cta:hover {
          background: #0a0a0a;
          color: #fafaf9;
        }
        .csd-faq-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(10,10,10,0.1);
        }
        .csd-faq-row { border-bottom: 1px solid rgba(10,10,10,0.1); }
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
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 500;
          color: rgba(10,10,10,0.4);
          letter-spacing: 0.06em;
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

        /* CTA mark */
        .csd-cta-mark {
          position: absolute;
          right: 8%;
          bottom: -6%;
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.4vw, 18px);
          font-family: var(--font-display);
          font-size: clamp(180px, 22vw, 380px);
          font-weight: 500;
          letter-spacing: -0.1em;
          line-height: 0.8;
          opacity: 0.07;
          pointer-events: none;
          z-index: 0;
        }
        .csd-cta-mark span:first-child { color: #fafaf9; }
        .csd-cta-mark span:last-child {
          color: transparent;
          -webkit-text-stroke: 2px rgba(255,255,255,0.6);
        }

        /* Marquee */
        .marquee-track { will-change: transform; }

        /* ═══════════════════════════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .csd-hero-main { grid-template-columns: 1fr; gap: 56px; }
          .csd-hero-counter { grid-template-columns: repeat(2, 1fr); }

          .csd-cap-row {
            grid-template-columns: 60px 50px 1fr 30px;
            gap: 18px;
          }
          .csd-cap-row-tags { display: none; }

          .csd-build-grid { grid-template-columns: 1fr; gap: 56px; }
          .csd-build-right { min-height: 480px; }

          .csd-vp-grid { grid-template-columns: 1fr; gap: 48px; }
          .csd-vp-tape { min-height: 240px; }

          .csd-results-list { grid-template-columns: 1fr; }
          .csd-result-card { grid-template-columns: 200px 1fr; }

          .csd-faq-layout { grid-template-columns: 1fr; gap: 48px; }
          .csd-faq-aside { position: static; }
        }
        @media (max-width: 768px) {
          .csd-hero { padding: 120px 14px 60px; min-height: auto; }
          .csd-hero-main { gap: 40px; }
          .csd-hero-counter { grid-template-columns: 1fr 1fr; gap: 16px; padding-top: 18px; }
          .csd-hero-anno { font-size: 9px; padding: 3px 8px; }
          .csd-hero-binary-stage { aspect-ratio: 1.2 / 1; }

          .csd-cap-section,
          .csd-build-section,
          .csd-vp-section,
          .csd-results-section,
          .csd-faq-section {
            padding-left: 14px;
            padding-right: 14px;
            padding-top: 90px;
            padding-bottom: 90px;
          }

          .csd-cap-row {
            grid-template-columns: 1fr 30px;
            gap: 12px;
            padding: 22px 14px;
          }
          .csd-cap-row-bin,
          .csd-cap-row-num { display: none; }
          .csd-cap-row-title { font-size: 19px; }

          .csd-build-list { border-top: none; }
          .csd-build-row {
            grid-template-columns: 40px 1fr;
            padding: 18px 0;
          }
          .csd-build-row-bin { font-size: 11px; padding-top: 4px; }
          .csd-build-row-label { font-size: 19px; }
          .csd-build-row-desc { font-size: 13px; }

          .csd-build-right { min-height: 360px; }
          .csd-build-frame-saas      { width: 56%; }
          .csd-build-frame-dashboard { width: 50%; }
          .csd-build-frame-mobile    { width: 30%; }
          .csd-build-frame-internal  { width: 50%; }
          .csd-build-frame-mvp       { width: 44%; }
          .csd-build-frame-market    { width: 42%; }

          .csd-vp-right { grid-template-columns: 1fr; }
          .csd-vp-card { min-height: auto; }
          .csd-vp-tape { min-height: 200px; }

          .csd-result-card {
            grid-template-columns: 1fr;
            padding: 26px 22px 28px;
            gap: 12px;
          }
          .csd-result-story { padding-top: 4px; }

          .csd-faq-q { grid-template-columns: 36px 1fr 26px; gap: 12px; padding: 20px 0; }
          .csd-faq-q-icon { width: 26px; height: 26px; }
          .csd-faq-a-inner { padding-left: 48px; font-size: 14px; }
          .csd-faq-row[data-open="true"] .csd-faq-a-inner { padding-bottom: 22px; }

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
          .csd-cta-inner { padding: 64px 26px !important; border-radius: 18px !important; }
          .csd-cta-inner > div > div[style*="repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
            gap: 18px !important;
          }
        }
      `}</style>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// BuildFrame — small device/window mockup component used inside the
// "What we build" stage. Kept inline to this file so the page is one drop-in.
// ────────────────────────────────────────────────────────────────────────────
type BuildVariant = "saas" | "dashboard" | "mobile" | "internal" | "mvp" | "market";

function BuildFrame({
  index,
  active,
  variant,
  label,
}: {
  index: number;
  active: boolean;
  variant: BuildVariant;
  label: string;
}) {
  return (
    <div
      className={`csd-build-frame csd-build-frame-${variant}`}
      data-active={active ? "true" : "false"}
      style={{ ["--idx" as never]: index }}
    >
      <div className="csd-build-frame-head">
        <div className="csd-build-frame-dots">
          <span /><span /><span />
        </div>
        <span className="csd-build-frame-name">{label}</span>
      </div>
      <div className="csd-build-frame-body">
        {variant === "saas" && (
          <>
            <div className="csd-bf-bar-pink" style={{ width: "70%" }} />
            <div className="csd-bf-bar" style={{ width: "100%" }} />
            <div className="csd-bf-bar" style={{ width: "85%" }} />
            <div className="csd-bf-bar" style={{ width: "60%" }} />
          </>
        )}
        {variant === "dashboard" && (
          <>
            <div className="csd-bf-grid">
              <div /><div /><div />
              <div /><div /><div />
            </div>
            <div className="csd-bf-chart">
              <span style={{ height: "30%" }} />
              <span style={{ height: "60%" }} />
              <span style={{ height: "45%" }} />
              <span style={{ height: "80%" }} />
              <span style={{ height: "55%" }} />
              <span style={{ height: "90%" }} />
              <span style={{ height: "65%" }} />
            </div>
          </>
        )}
        {variant === "mobile" && (
          <>
            <div className="csd-bf-mobile-circle" />
            <div className="csd-bf-mobile-bar" style={{ width: "80%", margin: "0 auto" }} />
            <div className="csd-bf-mobile-bar" style={{ width: "60%", margin: "4px auto 0" }} />
            <div style={{ height: 8 }} />
            <div className="csd-bf-bar-pink" style={{ width: "100%" }} />
          </>
        )}
        {variant === "internal" && (
          <>
            <div className="csd-bf-bar" style={{ width: "100%" }} />
            <div className="csd-bf-bar" style={{ width: "100%" }} />
            <div className="csd-bf-bar-pink" style={{ width: "55%" }} />
            <div className="csd-bf-bar" style={{ width: "100%" }} />
            <div className="csd-bf-bar" style={{ width: "75%" }} />
          </>
        )}
        {variant === "mvp" && (
          <>
            <div className="csd-bf-bar-pink" style={{ width: "40%" }} />
            <div className="csd-bf-bar" style={{ width: "100%" }} />
            <div className="csd-bf-bar" style={{ width: "100%" }} />
          </>
        )}
        {variant === "market" && (
          <div className="csd-bf-grid">
            <div /><div /><div />
            <div /><div /><div />
          </div>
        )}
      </div>
    </div>
  );
}