//version 3
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────────

const SUB_SERVICES = [
  {
    num: "01",
    bin: "0001",
    title: "Custom Web Application Development",
    desc: "Production-grade web apps built for performance, scale, and long-term maintainability.",
    href: "/services/custom-software-digital-solutions/custom-web-application-development",
    accent: "#d4d4d8",
    tags: ["Next.js", "React", "Node", "Postgres"],
  },
  {
    num: "02",
    bin: "0010",
    title: "Mobile App Development",
    desc: "Native and cross-platform iOS & Android apps that feel fast and ship on schedule.",
    href: "/services/custom-software-digital-solutions/mobile-app-development-ios-android",
    accent: "#a3a3a3",
    tags: ["iOS", "Android", "React Native", "Swift"],
  },
  {
    num: "03",
    bin: "0011",
    title: "SaaS Product Development",
    desc: "Multi-tenant SaaS platforms with billing, auth, analytics, and growth loops baked in.",
    href: "/services/custom-software-digital-solutions/saas-product-development",
    accent: "#e5e5e5",
    tags: ["Multi-tenant", "Billing", "Auth", "Analytics"],
  },
  {
    num: "04",
    bin: "0100",
    title: "UI/UX Design Systems",
    desc: "Design systems, component libraries, and product UX engineered for consistency at scale.",
    href: "/services/custom-software-digital-solutions/ui-ux-design-systems",
    accent: "#737373",
    tags: ["Design Systems", "Figma", "Tokens", "A11y"],
  },
  {
    num: "05",
    bin: "0101",
    title: "CMS & Admin Panel Development",
    desc: "Content systems and internal tools that empower teams without slowing them down.",
    href: "/services/custom-software-digital-solutions/cms-admin-panel-development",
    accent: "#bdbdbd",
    tags: ["Headless CMS", "Admin UI", "RBAC", "Workflows"],
  },
  {
    num: "06",
    bin: "0110",
    title: "High-Performance Landing Pages",
    desc: "Pixel-perfect, conversion-tuned landing pages with sub-second load and SEO baked in.",
    href: "/services/custom-software-digital-solutions/high-performance-landing-pages",
    accent: "#8a8a8a",
    tags: ["Core Web Vitals", "SEO", "A/B Ready", "CRO"],
  },
];

const WE_BUILD = [
  { id: "saas",      bin: "01", label: "SaaS Platforms",       desc: "Multi-tenant products with billing, dashboards, and integrations." },
  { id: "dashboard", bin: "10", label: "Business Dashboards",  desc: "Real-time analytics surfaces wired to your live data." },
  { id: "mobile",    bin: "11", label: "Mobile Apps",          desc: "Native iOS, Android, and cross-platform consumer apps." },
  { id: "internal",  bin: "00", label: "Internal Tools",       desc: "Admin panels and ops tooling that replace spreadsheets." },
  { id: "mvp",       bin: "01", label: "MVPs",                 desc: "Ship-fast prototypes built on architecture that can scale." },
  { id: "market",    bin: "10", label: "Marketplaces",         desc: "Two-sided platforms with payments, search, and trust systems." },
];

const VALUE_PROPS = [
  {
    id: "performance",
    metric: "98%+",
    metricLabel: "Avg Lighthouse",
    title: "Performance that keeps users engaged",
    desc: "We build with runtime budgets in mind: fast pages, stable interactions, and measurable improvements (Lighthouse, Core Web Vitals, and real device testing).",
  },
  {
    id: "architecture",
    metric: "10×",
    metricLabel: "Growth headroom",
    title: "Architecture that scales as you grow",
    desc: "We design clean boundaries and observable systems so you can ship new features without rework. Fewer incidents, faster iteration, and less tech debt over time.",
  },
  {
    id: "design-system",
    metric: "1 system",
    metricLabel: "Design coverage",
    title: "Design systems that reduce UX friction",
    desc: "Tokens, reusable components, and consistent patterns across web, mobile, and internal tools. Your product stays coherent while teams move faster.",
  },
  {
    id: "delivery",
    metric: "Weekly",
    metricLabel: "Shipped iterations",
    title: "Delivery cadence that accelerates momentum",
    desc: "Weekly demos, feature-flagged deploys, and post-launch support. You learn faster, reduce rollout risk, and keep growth moving.",
  },
];

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
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredBuild, setHoveredBuild] = useState<number>(0);

  const isLenisScrollingRef = useRef(false);
  const hoverLockTimeoutRef = useRef<number | null>(null);
  const pendingHoveredBuildRef = useRef<number | null>(null);

  const marqueeLeftRef = useRef<HTMLDivElement>(null);
  const marqueeRightRef = useRef<HTMLDivElement>(null);
  const marqueeLeftTweenRef = useRef<gsap.core.Tween | null>(null);
  const marqueeRightTweenRef = useRef<gsap.core.Tween | null>(null);

  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", () => {
      isLenisScrollingRef.current = true;
      if (hoverLockTimeoutRef.current) window.clearTimeout(hoverLockTimeoutRef.current);
      hoverLockTimeoutRef.current = window.setTimeout(() => {
        const next = pendingHoveredBuildRef.current;
        pendingHoveredBuildRef.current = null;
        isLenisScrollingRef.current = false;
        if (typeof next === "number") {
          setHoveredBuild((prev) => (prev === next ? prev : next));
        }
      }, 150);
      ScrollTrigger.update();
    });
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      if (hoverLockTimeoutRef.current) window.clearTimeout(hoverLockTimeoutRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

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
        ".csd-hero-stage",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
        0.4
      );
      heroTl.fromTo(
        ".csd-hero-stage-card",
        { opacity: 0, y: 16, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
        0.7
      );
      heroTl.fromTo(
        ".csd-hero-marquee-row",
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" },
        1.1
      );

      const setupBatchReveal = (
        selector: string,
        fromVars: gsap.TweenVars,
        toVars: gsap.TweenVars,
        start: string
      ) => {
        const items = gsap.utils.toArray<HTMLElement>(selector);
        if (!items.length) return;
        gsap.set(items, fromVars);
        ScrollTrigger.batch(items, {
          start,
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, { ...toVars, stagger: 0.08, overwrite: true });
          },
        });
      };

      setupBatchReveal(".csd-sh", { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" }, "top 88%");
      setupBatchReveal(".csd-svc-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "top 90%");
      setupBatchReveal(".csd-build-row", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "top 92%");
      setupBatchReveal(".csd-vp-item", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "top 88%");
      setupBatchReveal(".csd-result-card", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "top 90%");
      setupBatchReveal(".csd-faq-row", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "top 92%");

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
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });

      gsap.fromTo(".csd-cta-inner",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: ".csd-cta-inner", start: "top 85%" } });
    });
    return () => ctx.revert();
  }, []);

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
            SECTION 1 — HERO (REDESIGNED)
            Light theme. Cinematic, confidence-first.
            Layout:
              - Top breadcrumb pill
              - Massive headline (3 lines, last italic)
              - Lead + dual CTA + key proof points (inline)
              - Right side: a "live system" stage with 3 stacked product
                surface cards (web app, mobile, dashboard) — feels like
                you're peeking at real shipped work, not abstract diagrams
              - Bottom strip: trust marquee with metrics + technology badges
        ═══════════════════════════════════════════════════════════════ */}
        <section className="csd-hero">
          {/* Background layers */}
          <div aria-hidden className="csd-hero-grid-bg" />
          <div aria-hidden className="csd-hero-gradient-orb csd-hero-orb-a" />
          <div aria-hidden className="csd-hero-gradient-orb csd-hero-orb-b" />
          <div aria-hidden className="csd-hero-corner csd-hero-corner-tl" />
          <div aria-hidden className="csd-hero-corner csd-hero-corner-tr" />
          <div aria-hidden className="csd-hero-corner csd-hero-corner-bl" />
          <div aria-hidden className="csd-hero-corner csd-hero-corner-br" />

          <div className="csd-hero-inner">
            <div className="csd-hero-main">
              {/* LEFT — headline + CTAs + inline proof */}
              <div className="csd-hero-left">
                <h1 className="csd-hero-title">
                  <div className="csd-h1-line">
                    {"Software".split("").map((c, i) => (
                      <span key={`l1-${i}`} className="csd-h1-char">{c === " " ? "\u00A0" : c}</span>
                    ))}
                  </div>
                  <div className="csd-h1-line">
                    {"engineered to".split("").map((c, i) => (
                      <span key={`l2-${i}`} className="csd-h1-char" style={{ whiteSpace: "pre" }}>{c === " " ? "\u00A0" : c}</span>
                    ))}
                  </div>
                  <div className="csd-h1-line">
                    <span className="csd-h1-italic">
                      {"compound value.".split("").map((c, i) => (
                        <span key={`l3i-${i}`} className="csd-h1-char">{c}</span>
                      ))}
                    </span>
                  </div>
                </h1>

                <p className="csd-hero-fade csd-hero-lead" style={{ opacity: 0 }}>
                  We design, build, and modernize web apps, mobile apps, SaaS platforms,
                  and internal tools that ship on schedule, scale cleanly, and stay
                  maintainable years after launch.
                </p>

                <div className="csd-hero-fade csd-hero-cta-row" style={{ opacity: 0 }}>
                  <Link href="/contact" className="csd-cta-primary">
                    <span style={{ position: "relative", zIndex: 2 }}>Plan my build</span>
                    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="csd-cta-arrow" style={{ position: "relative", zIndex: 2 }}>
                      <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a href="#capabilities" className="csd-cta-ghost-light">
                    <span>Explore capabilities</span>
                    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12">
                      <path d="M6 2.5v7M3 6.5 6 9.5 9 6.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>

              </div>

              {/* RIGHT — visual stage with stacked product surfaces */}
              <div className="csd-hero-right">
                <div className="csd-hero-stage" style={{ opacity: 0 }}>
                  {/* Background pattern inside stage */}
                  <div className="csd-hero-stage-bg" aria-hidden />

                  {/* Top status bar */}
                  <div className="csd-hero-stage-status" aria-hidden>
                    <div className="csd-hero-stage-status-left">
                      <span className="csd-hero-stage-status-dot" />
                      <span className="csd-hero-stage-status-text">Live · production builds</span>
                    </div>
                    <div className="csd-hero-stage-status-right">
                      <span>v4.2.1</span>
                    </div>
                  </div>

                  {/* Main row: SaaS card + Mobile card (aligned at top) */}
                  <div className="csd-hero-stage-row">
                    {/* SaaS dashboard card */}
                    <div className="csd-hero-stage-card csd-hero-stage-card-saas">
                      <div className="csd-hero-stage-card-head">
                        <div className="csd-hero-stage-card-dots">
                          <span /><span /><span />
                        </div>
                        <span className="csd-hero-stage-card-title">analytics.app</span>
                      </div>
                      <div className="csd-hero-stage-card-body">
                        <div className="csd-hero-stage-metric-row">
                          <div>
                            <div className="csd-hero-stage-metric-label">MRR</div>
                            <div className="csd-hero-stage-metric-value">$48.2K</div>
                            <div className="csd-hero-stage-metric-delta">↑ 12.4%</div>
                          </div>
                          <div>
                            <div className="csd-hero-stage-metric-label">Active</div>
                            <div className="csd-hero-stage-metric-value">2,847</div>
                            <div className="csd-hero-stage-metric-delta">↑ 8.1%</div>
                          </div>
                        </div>
                        <div className="csd-hero-stage-chart">
                          {[35, 52, 41, 68, 55, 78, 62, 88, 71, 94].map((h, i) => (
                            <span key={i} style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Mobile app frame */}
                    <div className="csd-hero-stage-card csd-hero-stage-card-mobile">
                      <div className="csd-hero-stage-mobile-notch" />
                      <div className="csd-hero-stage-mobile-body">
                        <div className="csd-hero-stage-mobile-greeting">Welcome back</div>
                        <div className="csd-hero-stage-mobile-user">Sarah K.</div>
                        <div className="csd-hero-stage-mobile-card">
                          <div className="csd-hero-stage-mobile-card-label">Balance</div>
                          <div className="csd-hero-stage-mobile-card-value">$12,840</div>
                        </div>
                        <div className="csd-hero-stage-mobile-list">
                          <div /><div /><div />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom row: terminal + badge inline */}
                  <div className="csd-hero-stage-bottom">
                    <div className="csd-hero-stage-card csd-hero-stage-card-code">
                      <div className="csd-hero-stage-card-head">
                        <div className="csd-hero-stage-card-dots">
                          <span /><span /><span />
                        </div>
                        <span className="csd-hero-stage-card-title">deploy.ts</span>
                      </div>
                      <div className="csd-hero-stage-code">
                        <div><span className="csd-code-mute">$</span> <span className="csd-code-cmd">build</span> <span className="csd-code-flag">--prod</span></div>
                        <div className="csd-code-mute">→ Compiled in 8.4s</div>
                        <div className="csd-code-mute">→ 0 errors · 0 warnings</div>
                        <div><span className="csd-code-ok">✓</span> <span className="csd-code-mute">deployed to edge</span></div>
                      </div>
                    </div>

                    <div className="csd-hero-stage-badge" aria-hidden>
                      <div className="csd-hero-stage-badge-pulse" />
                      <div>
                        <div className="csd-hero-stage-badge-k">UPTIME</div>
                        <div className="csd-hero-stage-badge-v">99.98%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 2 - CAPABILITIES */}
        <section id="capabilities" className="csd-cap-section">
          <div className="csd-cap-inner">
            <div className="csd-sh csd-cap-header">
              <div>
                <h2 className="csd-cap-h2">
                  Six disciplines.{" "}
                  <span className="csd-italic-mute">One senior team.</span>
                </h2>
              </div>
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
                  <span className="csd-cap-row-sweep" aria-hidden />
                  <div className="csd-cap-row-bin">
                    <span className="csd-cap-row-dot" style={{ background: s.accent }} />
                    <span>{s.bin}</span>
                  </div>
                  <div className="csd-cap-row-num">{s.num}</div>
                  <div className="csd-cap-row-body">
                    <h3 className="csd-cap-row-title">{s.title}</h3>
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
            SECTION — THE COST OF A POORLY BUILT APP
            Minimal layout: full-bleed image left, clean editorial text right.
            Inspired by editorial / consulting page treatments.
        ═══════════════════════════════════════════════════════════════ */}
        <section
          className="csd-cost-section"
          aria-labelledby="cost-heading"
          style={{ marginBottom: "clamp(40px, 6vw, 88px)" }}
        >
          <div className="csd-cost-grid">
            {/* LEFT — image */}
            <div className="csd-cost-media" aria-hidden>
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&auto=format&fit=crop"
                alt=""
                loading="lazy"
              />
              <div className="csd-cost-media-overlay" />
            </div>

            {/* RIGHT — content */}
            <div className="csd-cost-content csd-sh">
              <div className="csd-cost-eyebrow">The cost of a poorly built app</div>

              <h2 id="cost-heading" className="csd-cost-h2">
                Why it <span className="csd-cost-h2-accent">matters.</span>
              </h2>

              <p className="csd-cost-lead">
                Even leading companies waste millions on apps that don&apos;t convert.
                The pattern is consistent — and almost always preventable.
              </p>

              <ul className="csd-cost-list">
                <li>
                  <span className="csd-cost-list-mark" />
                  <div>
                    <strong>Cluttered interfaces</strong> frustrate users and drive
                    them to competitors within the first session.
                  </div>
                </li>
                <li>
                  <span className="csd-cost-list-mark" />
                  <div>
                    <strong>Slow performance</strong> kills retention — 53% of users
                    abandon sites that take longer than three seconds to load.
                  </div>
                </li>
                <li>
                  <span className="csd-cost-list-mark" />
                  <div>
                    <strong>Poor integration</strong> with back-end systems creates
                    silent operational drag and reduces team efficiency.
                  </div>
                </li>
                <li>
                  <span className="csd-cost-list-mark" />
                  <div>
                    <strong>Lack of analytics</strong> means decisions get made on
                    guesswork instead of evidence — and the roadmap suffers.
                  </div>
                </li>
              </ul>

              <p className="csd-cost-close">
                We design and engineer custom software to eliminate every one of these failure
                points — built for the audience you actually serve, with adoption,
                engagement, and ROI as the brief.
              </p>
            </div>
          </div>
        </section>

        {/* PROCESS */}
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
                      <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(48px, 6vh, 72px)", fontWeight: 500, color: "rgba(255,255,255,0.12)", lineHeight: 1, letterSpacing: "-0.04em", fontVariantNumeric: "tabular-nums" }}>
                        {step.num}
                      </span>
                      <span style={{ padding: "5px 12px", borderRadius: 999, border: "1px solid rgba(255,255,255,0.15)", fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.65)", letterSpacing: "0.04em" }}>
                        Phase {step.num}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 3.2vh, 40px)", fontWeight: 500, margin: "0 0 clamp(10px, 2vh, 20px)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "clamp(13px, 1.6vh, 15px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "clamp(14px, 2.5vh, 24px)" }}>
                    {step.points.map((p) => (
                      <li key={p} style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", padding: "clamp(5px, 1vh, 8px) 0", display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ width: 14, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div style={{ width: 300, flexShrink: 0, padding: "clamp(28px, 3.5vh, 44px) 36px", display: "flex", flexDirection: "column", justifyContent: "center", height: "clamp(340px, 58vh, 500px)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.8vh, 32px)", fontWeight: 500, margin: "0 0 20px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                  Every project. <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>No exceptions.</span>
                </h3>
                <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "12px 22px", background: "#fafaf9", color: "#0a0a0a", borderRadius: 999, fontSize: 13, fontWeight: 500, textDecoration: "none", alignSelf: "flex-start", marginTop: 4 }}>
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

        {/* WHAT WE BUILD */}
        <section className="csd-build-section">
          <div className="csd-build-inner">
            <div className="csd-build-grid">
              <div className="csd-build-left">
                <div className="csd-sh">
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
                        onMouseEnter={() => {
                          if (isLenisScrollingRef.current) {
                            pendingHoveredBuildRef.current = i;
                            return;
                          }
                          setHoveredBuild((prev) => (prev === i ? prev : i));
                        }}
                        onFocus={() => {
                          setHoveredBuild((prev) => (prev === i ? prev : i));
                        }}
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

              <div className="csd-build-right">
                <div className="csd-build-stage" aria-hidden>
                  <div className="csd-build-stage-grid" />
                  <BuildFrame index={0} active={hoveredBuild === 0} variant="saas"      label="SaaS" />
                  <BuildFrame index={1} active={hoveredBuild === 1} variant="dashboard" label="Dashboard" />
                  <BuildFrame index={2} active={hoveredBuild === 2} variant="mobile"    label="Mobile" />
                  <BuildFrame index={3} active={hoveredBuild === 3} variant="internal"  label="Internal" />
                  <BuildFrame index={4} active={hoveredBuild === 4} variant="mvp"       label="MVP" />
                  <BuildFrame index={5} active={hoveredBuild === 5} variant="market"    label="Market" />

                  <div className="csd-build-stage-badge">
                    <span className="csd-build-stage-badge-bin">{WE_BUILD[hoveredBuild].bin}</span>
                    <span>{WE_BUILD[hoveredBuild].label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHY TEAMS CHOOSE US */}
        <section className="csd-vp-section" aria-labelledby="csd-vp-title">
          <div className="csd-vp-grid">
            {/* LEFT — content */}
            <div className="csd-vp-content csd-sh">
              <h2 id="csd-vp-title" className="csd-vp-h2">
                Built for teams that <span className="csd-vp-h2-accent">measure outcomes.</span>
              </h2>

              <ul className="csd-vp-list" role="list">
                {VALUE_PROPS.map((v, i) => (
                  <li key={v.id} className="csd-vp-item">
                    <div className="csd-vp-item-num">
                      <span style={{ fontFamily: "var(--font-mono)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="csd-vp-item-body">
                      <div className="csd-vp-item-head">
                        <h3 className="csd-vp-item-title">{v.title}</h3>
                        <div className="csd-vp-item-metric">
                          <span className="csd-vp-item-metric-value">{v.metric}</span>
                          <span className="csd-vp-item-metric-label">{v.metricLabel}</span>
                        </div>
                      </div>
                      <p className="csd-vp-item-desc">{v.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT — image */}
            <div className="csd-vp-media" aria-hidden>
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop"
                alt=""
                loading="lazy"
              />
              <div className="csd-vp-media-overlay" />
              <div className="csd-vp-media-tag">
                <span className="csd-vp-media-tag-dot" />
                Engineered with intent
              </div>
            </div>
          </div>
        </section>

        {/* TECH MARQUEE */}
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

        {/* RESULTS */}
        <section className="csd-results-section">
          <div className="csd-results-inner">
            <div className="csd-sh csd-results-header">
              <div className="csd-results-header-left">
                <div className="csd-results-eyebrow">Selected outcomes</div>
                <h2 className="csd-results-h2">
                  We don&apos;t just build software.{" "}
                  <span className="csd-italic-mute">We deliver results.</span>
                </h2>
              </div>
              <p className="csd-results-lead">
                Numbers measured in production, not extrapolated from pitch decks.
                Each engagement below ran six months or longer.
              </p>
            </div>

            <div className="csd-results-row">
              {RESULTS.map((r, i) => (
                <div key={r.label} className="csd-result-card">
                  <div className="csd-result-card-top">
                    <span className="csd-result-card-index">
                      R—{String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="csd-result-card-dot" />
                  </div>
                  <div className="csd-result-card-metric">{r.metric}</div>
                  <div className="csd-result-card-label">{r.label}</div>
                  <div className="csd-result-card-divider" />
                  <div className="csd-result-card-project">{r.project}</div>
                  <p className="csd-result-card-desc">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQS */}
        <section className="csd-faq-section">
          <div className="csd-faq-layout">
            <div className="csd-faq-aside csd-sh">
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

        {/* FINAL CTA */}
        <section className="csd-cta-section">
          <div className="csd-cta-inner">
            <div className="csd-cta-grid">
              <div className="csd-cta-left">
                <div className="csd-cta-eyebrow">
                  <span className="csd-cta-eyebrow-dot" />
                  Available for new projects
                </div>

                <h2 className="csd-cta-h2">
                  Ready to build something{" "}
                  <span className="csd-cta-h2-accent">that lasts?</span>
                </h2>

                <p className="csd-cta-lead">
                  Free 30-minute discovery call. You&apos;ll talk directly with an
                  engineer and a strategist — no sales pitch, just a real conversation
                  about your problem and timeline.
                </p>

                <div className="csd-cta-actions">
                  <Link href="/contact" className="csd-cta-primary-light">
                    <span>Book a discovery call</span>
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                      <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <a href="mailto:hello@techbinaries.com" className="csd-cta-mail">
                    hello@techbinaries.com
                  </a>
                </div>
              </div>

              <div className="csd-cta-right">
                <dl className="csd-cta-meta">
                  <div className="csd-cta-meta-item">
                    <dt>Response time</dt>
                    <dd>Within 24h</dd>
                  </div>
                  <div className="csd-cta-meta-item">
                    <dt>Typical project</dt>
                    <dd>8–24 weeks</dd>
                  </div>
                  <div className="csd-cta-meta-item">
                    <dt>Engagement</dt>
                    <dd>Fixed or T&amp;M</dd>
                  </div>
                  <div className="csd-cta-meta-item">
                    <dt>Based in</dt>
                    <dd>Global · remote-first</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
        <SiteFooter />
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════════════
           SHARED PRIMITIVES
        ═══════════════════════════════════════════════════════════════ */
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

        .csd-cta-ghost-light {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 15px 26px;
          border: 1px solid rgba(10,10,10,0.18);
          color: rgba(10,10,10,0.78);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 999px;
          background: rgba(255,255,255,0.6);
          backdrop-filter: blur(8px);
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .csd-cta-ghost-light:hover {
          border-color: rgba(10,10,10,0.4);
          background: #fff;
          color: #0a0a0a;
        }

        .csd-ghost-dark:hover {
          border-color: rgba(255,255,255,0.45) !important;
          background: rgba(255,255,255,0.05) !important;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 1 — HERO (REDESIGNED, LIGHT)
        ═══════════════════════════════════════════════════════════════ */
        .csd-hero {
          position: relative;
          min-height: 100vh;
          background:
            radial-gradient(circle at 80% 18%, rgba(255,255,255,0.9), transparent 35%),
            radial-gradient(circle at 12% 85%, rgba(212,212,216,0.25), transparent 40%),
            linear-gradient(135deg, #f8f8f7 0%, #efefed 50%, #e7e5e4 100%);
          color: #0a0a0a;
          padding: 132px 20px 72px;
          overflow: hidden;
        }

        .csd-hero-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(10,10,10,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.04) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 90% 75% at 50% 38%, black 0%, transparent 92%);
          -webkit-mask-image: radial-gradient(ellipse 90% 75% at 50% 38%, black 0%, transparent 92%);
          pointer-events: none;
        }

        .csd-hero-gradient-orb {
          position: absolute;
          border-radius: 999px;
          pointer-events: none;
          filter: blur(60px);
        }
        .csd-hero-orb-a {
          width: 480px;
          height: 480px;
          right: -8%;
          top: 8%;
          background:
            radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(212,212,216,0.2) 60%, transparent 100%);
        }
        .csd-hero-orb-b {
          width: 320px;
          height: 320px;
          left: -8%;
          bottom: 8%;
          background:
            radial-gradient(circle, rgba(10,10,10,0.05) 0%, transparent 70%);
        }

        .csd-hero-corner {
          position: absolute;
          width: 24px;
          height: 24px;
          pointer-events: none;
        }
        .csd-hero-corner-tl {
          top: 100px; left: 24px;
          border-top: 1px solid rgba(10,10,10,0.18);
          border-left: 1px solid rgba(10,10,10,0.18);
        }
        .csd-hero-corner-tr {
          top: 100px; right: 24px;
          border-top: 1px solid rgba(10,10,10,0.18);
          border-right: 1px solid rgba(10,10,10,0.18);
        }
        .csd-hero-corner-bl {
          bottom: 24px; left: 24px;
          border-bottom: 1px solid rgba(10,10,10,0.18);
          border-left: 1px solid rgba(10,10,10,0.18);
        }
        .csd-hero-corner-br {
          bottom: 24px; right: 24px;
          border-bottom: 1px solid rgba(10,10,10,0.18);
          border-right: 1px solid rgba(10,10,10,0.18);
        }

        .csd-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 56px;
        }

        .csd-hero-crumb {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          align-self: flex-start;
          padding: 8px 16px;
          border: 1px solid rgba(10,10,10,0.1);
          border-radius: 999px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(12px);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.55);
        }
        .csd-hero-crumb-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #0a0a0a;
          box-shadow: 0 0 0 4px rgba(10,10,10,0.08);
          animation: csd-crumb-pulse 2.4s ease-in-out infinite;
        }
        @keyframes csd-crumb-pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(10,10,10,0.08); }
          50% { box-shadow: 0 0 0 6px rgba(10,10,10,0.12); }
        }
        .csd-hero-crumb-link {
          color: rgba(10,10,10,0.7);
          text-decoration: none;
          transition: color 0.2s;
        }
        .csd-hero-crumb-link:hover { color: #0a0a0a; }
        .csd-hero-crumb-sep { opacity: 0.4; }

        .csd-hero-main {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(440px, 0.95fr);
          gap: clamp(48px, 6vw, 88px);
          align-items: center;
        }

        .csd-hero-title {
          font-family: var(--font-display);
          font-size: clamp(48px, 7vw, 110px);
          font-weight: 500;
          line-height: 0.93;
          letter-spacing: -0.048em;
          margin: 0 0 32px;
          color: #0a0a0a;
        }
        .csd-h1-line {
          overflow: hidden;
          padding-bottom: 0.075em;
          display: block;
          white-space: nowrap;
        }
        .csd-h1-char {
          display: inline-block;
          will-change: transform;
        }
        .csd-h1-italic {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.5);
          display: inline-flex;
          background: linear-gradient(135deg, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.25) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .csd-hero-lead {
          font-size: 17px;
          color: rgba(10,10,10,0.62);
          max-width: 580px;
          line-height: 1.72;
          margin: 0 0 32px;
        }

        .csd-hero-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        .csd-hero-proof {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          padding-top: 28px;
          border-top: 1px solid rgba(10,10,10,0.1);
          max-width: 580px;
        }
        .csd-hero-proof-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .csd-hero-proof-k {
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 500;
          letter-spacing: -0.035em;
          line-height: 1;
          color: #0a0a0a;
          font-variant-numeric: tabular-nums;
        }
        .csd-hero-proof-v {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
        }

        /* HERO STAGE (right side) */
        .csd-hero-right {
          position: relative;
          align-self: stretch;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .csd-hero-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 0.96 / 1;
          background:
            linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
          border-radius: 28px;
          overflow: hidden;
          padding: 52px 28px 28px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-shadow:
            0 40px 100px -40px rgba(10,10,10,0.45),
            0 0 0 1px rgba(10,10,10,0.08);
        }
        .csd-hero-stage-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 32px 32px;
          opacity: 0.6;
        }
        .csd-hero-stage-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.06) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.04) 0%, transparent 50%);
        }

        .csd-hero-stage-status {
          position: absolute;
          top: 18px;
          left: 18px;
          right: 18px;
          z-index: 5;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: var(--font-mono);
          font-size: 10px;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.08em;
        }
        .csd-hero-stage-status-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .csd-hero-stage-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px rgba(74,222,128,0.6);
          animation: csd-status-pulse 2s ease-in-out infinite;
        }
        @keyframes csd-status-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .csd-hero-stage-status-text { text-transform: uppercase; }
        .csd-hero-stage-status-right { color: rgba(255,255,255,0.35); }

        .csd-hero-stage-row {
          display: grid;
          grid-template-columns: 1fr 38%;
          gap: 16px;
          align-items: stretch;
          flex: 1;
          min-height: 0;
        }

        .csd-hero-stage-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          backdrop-filter: blur(8px);
          overflow: hidden;
          box-shadow: 0 20px 40px -20px rgba(0,0,0,0.5);
        }

        .csd-hero-stage-card-saas {
          display: flex;
          flex-direction: column;
        }
        .csd-hero-stage-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          background: rgba(255,255,255,0.02);
        }
        .csd-hero-stage-card-dots {
          display: flex;
          gap: 5px;
        }
        .csd-hero-stage-card-dots span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255,255,255,0.18);
        }
        .csd-hero-stage-card-dots span:first-child { background: rgba(248,113,113,0.5); }
        .csd-hero-stage-card-dots span:nth-child(2) { background: rgba(251,191,36,0.5); }
        .csd-hero-stage-card-dots span:last-child { background: rgba(74,222,128,0.5); }
        .csd-hero-stage-card-title {
          font-family: var(--font-mono);
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.06em;
        }
        .csd-hero-stage-card-body {
          padding: 16px;
        }
        .csd-hero-stage-card-saas .csd-hero-stage-card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .csd-hero-stage-metric-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .csd-hero-stage-metric-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 4px;
        }
        .csd-hero-stage-metric-value {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 500;
          color: #fff;
          letter-spacing: -0.02em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .csd-hero-stage-metric-delta {
          font-family: var(--font-mono);
          font-size: 10px;
          color: #4ade80;
          margin-top: 4px;
        }
        .csd-hero-stage-chart {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 56px;
        }
        .csd-hero-stage-chart span {
          flex: 1;
          background: linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
          border-radius: 2px 2px 0 0;
          animation: csd-bar-rise 1.2s ease-out backwards;
        }
        .csd-hero-stage-chart span:nth-child(odd) {
          background: linear-gradient(180deg, rgba(74,222,128,0.7), rgba(74,222,128,0.2));
        }
        .csd-hero-stage-chart span:last-child {
          background: linear-gradient(180deg, #4ade80, rgba(74,222,128,0.4));
        }
        @keyframes csd-bar-rise {
          from { transform: scaleY(0); transform-origin: bottom; }
          to { transform: scaleY(1); transform-origin: bottom; }
        }

        .csd-hero-stage-card-mobile {
          border-radius: 22px;
          background: linear-gradient(160deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%);
          padding: 12px 12px 16px;
          display: flex;
          flex-direction: column;
        }
        .csd-hero-stage-mobile-notch {
          width: 36%;
          height: 6px;
          background: rgba(0,0,0,0.5);
          border-radius: 0 0 8px 8px;
          margin: 0 auto 14px;
        }
        .csd-hero-stage-mobile-body {
          padding: 0 4px;
        }
        .csd-hero-stage-mobile-greeting {
          font-size: 9px;
          color: rgba(255,255,255,0.4);
          letter-spacing: 0.04em;
        }
        .csd-hero-stage-mobile-user {
          font-family: var(--font-display);
          font-size: 13px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
        }
        .csd-hero-stage-mobile-card {
          background: linear-gradient(135deg, rgba(74,222,128,0.18), rgba(74,222,128,0.04));
          border: 1px solid rgba(74,222,128,0.25);
          border-radius: 10px;
          padding: 10px 12px;
          margin-bottom: 12px;
        }
        .csd-hero-stage-mobile-card-label {
          font-size: 8px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin-bottom: 4px;
        }
        .csd-hero-stage-mobile-card-value {
          font-family: var(--font-display);
          font-size: 16px;
          font-weight: 500;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .csd-hero-stage-mobile-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .csd-hero-stage-mobile-list div {
          height: 18px;
          background: rgba(255,255,255,0.05);
          border-radius: 6px;
        }
        .csd-hero-stage-mobile-list div:nth-child(2) { background: rgba(255,255,255,0.08); }

        .csd-hero-stage-bottom {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 14px;
          align-items: stretch;
        }
        .csd-hero-stage-card-code {
          min-width: 0;
        }
        .csd-hero-stage-code {
          padding: 14px 16px;
          font-family: var(--font-mono);
          font-size: 11px;
          line-height: 1.7;
          color: rgba(255,255,255,0.85);
        }
        .csd-hero-stage-code > div {
          opacity: 0;
          animation: csd-code-line 0.4s ease-out forwards;
        }
        .csd-hero-stage-code > div:nth-child(1) { animation-delay: 1.2s; }
        .csd-hero-stage-code > div:nth-child(2) { animation-delay: 1.5s; }
        .csd-hero-stage-code > div:nth-child(3) { animation-delay: 1.8s; }
        .csd-hero-stage-code > div:nth-child(4) { animation-delay: 2.1s; }
        @keyframes csd-code-line {
          from { opacity: 0; transform: translateX(-4px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .csd-code-mute { color: rgba(255,255,255,0.4); }
        .csd-code-cmd { color: #fff; }
        .csd-code-flag { color: #fbbf24; }
        .csd-code-ok { color: #4ade80; }

        .csd-hero-stage-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 0 18px;
          background: rgba(255,255,255,0.95);
          border-radius: 14px;
          box-shadow: 0 12px 32px -8px rgba(0,0,0,0.4);
          white-space: nowrap;
        }
        .csd-hero-stage-badge-pulse {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 0 0 rgba(74,222,128,0.6);
          animation: csd-badge-pulse 2s ease-in-out infinite;
        }
        @keyframes csd-badge-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0.6); }
          50% { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
        }
        .csd-hero-stage-badge-k {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.45);
          margin-bottom: 1px;
        }
        .csd-hero-stage-badge-v {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 500;
          color: #0a0a0a;
          letter-spacing: -0.01em;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        /* HERO bottom marquee */
        .csd-hero-marquee-row {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-top: 24px;
          border-top: 1px solid rgba(10,10,10,0.08);
        }
        .csd-hero-marquee-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.45);
        }
        .csd-hero-marquee-label-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #0a0a0a;
        }
        .csd-hero-marquee-track {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          align-items: center;
        }
        .csd-hero-marquee-item {
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: rgba(10,10,10,0.55);
          transition: color 0.2s;
        }
        .csd-hero-marquee-item:hover { color: #0a0a0a; }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 2 — CAPABILITIES
        ═══════════════════════════════════════════════════════════════ */
        .csd-cap-h2 {
          font-family: var(--font-display);
          font-size: clamp(26px, 3.2vw, 40px);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1.06;
          margin: 0;
          max-width: 760px;
        }
        .csd-cap-section {
          padding: 84px 20px;
          background: #fafaf9;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .csd-cap-inner { max-width: 1320px; margin: 0 auto; }
        .csd-cap-header {
          display: flex;
          justify-content: flex-start;
          align-items: flex-end;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .csd-cap-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(10,10,10,0.1);
        }
        .csd-cap-row {
          display: grid;
          grid-template-columns: 80px 56px 1fr 40px;
          gap: 18px;
          align-items: center;
          padding: 20px 16px;
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
          font-size: 26px;
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
          font-size: clamp(18px, 2.2vw, 26px);
          font-weight: 500;
          letter-spacing: -0.022em;
          line-height: 1.18;
          margin: 0;
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
           SECTION — COST OF A POORLY BUILT APP (minimal, editorial)
        ═══════════════════════════════════════════════════════════════ */
        .csd-cost-section {
          background: #f5f5f4;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          padding-left: clamp(14px, 2.4vw, 32px);
        }

        .csd-cost-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 0;
          align-items: stretch;
          min-height: 620px;
        }

        .csd-cost-media {
          position: relative;
          overflow: hidden;
          background: #0a0a0a;
          min-height: 480px;
          border-radius: clamp(20px, 2.4vw, 32px);
        }
        .csd-cost-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(1) contrast(1.05);
          transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .csd-cost-section:hover .csd-cost-media img {
          transform: scale(1.03);
        }
        .csd-cost-media-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.45) 100%);
          pointer-events: none;
        }
        .csd-cost-media-tag {
          position: absolute;
          top: 28px;
          left: 28px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 8px 14px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #0a0a0a;
        }
        .csd-cost-media-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0a0a0a;
        }

        .csd-cost-content {
          padding: clamp(56px, 7vw, 96px) clamp(32px, 5vw, 72px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fafaf9;
        }

        .csd-cost-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
          margin-bottom: 18px;
        }

        .csd-cost-h2 {
          font-family: var(--font-display);
          font-size: clamp(34px, 4.4vw, 56px);
          font-weight: 500;
          letter-spacing: -0.034em;
          line-height: 1.02;
          margin: 0 0 24px;
          color: #0a0a0a;
        }
        .csd-cost-h2-accent {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.5);
        }

        .csd-cost-lead {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(10,10,10,0.65);
          margin: 0 0 28px;
          max-width: 520px;
        }

        .csd-cost-list {
          list-style: none;
          padding: 0;
          margin: 0 0 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 540px;
        }
        .csd-cost-list li {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 14px;
          align-items: start;
          font-size: 15px;
          line-height: 1.62;
          color: rgba(10,10,10,0.7);
        }
        .csd-cost-list li strong {
          color: #0a0a0a;
          font-weight: 600;
        }
        .csd-cost-list-mark {
          position: relative;
          width: 18px;
          height: 22px;
          flex-shrink: 0;
        }
        .csd-cost-list-mark::before {
          content: "";
          position: absolute;
          top: 9px;
          left: 0;
          width: 12px;
          height: 1px;
          background: #0a0a0a;
        }
        .csd-cost-list-mark::after {
          content: "";
          position: absolute;
          top: 6px;
          left: 8px;
          width: 7px;
          height: 7px;
          border-top: 1px solid #0a0a0a;
          border-right: 1px solid #0a0a0a;
          transform: rotate(45deg);
        }

        .csd-cost-close {
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(10,10,10,0.62);
          margin: 0;
          padding-top: 24px;
          border-top: 1px solid rgba(10,10,10,0.1);
          max-width: 540px;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION — WHAT WE BUILD
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
        .csd-build-row:focus-visible { padding-left: 8px; }
        .csd-build-row[data-active="true"] { padding-left: 8px; }
        .csd-build-row-bin {
          font-family: var(--font-mono);
          font-size: 13px;
          color: rgba(10,10,10,0.4);
          letter-spacing: 0.04em;
          padding-top: 6px;
          transition: color 0.25s;
        }
        .csd-build-row[data-active="true"] .csd-build-row-bin { color: #d4d4d8; }
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
          background: #d4d4d8;
          transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .csd-build-row[data-active="true"] .csd-build-row-line { width: 100%; }

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
          contain: layout paint;
          will-change: transform, opacity;
          transform: scale(0.95) translateY(0);
          transition:
            opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          backdrop-filter: none;
        }
        .csd-build-frame[data-active="true"] {
          opacity: 1;
          z-index: 5;
          transform: scale(1.03) translateY(-4px);
          border-color: rgba(212,212,216,0.5);
          background: rgba(212,212,216,0.04);
          box-shadow: 0 24px 48px -20px rgba(212,212,216,0.35);
          backdrop-filter: blur(6px);
        }
        .csd-build-frame-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 10px;
        }
        .csd-build-frame-dots { display: flex; gap: 4px; }
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
          background: linear-gradient(90deg, #d4d4d8, rgba(212,212,216,0.3));
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
        .csd-bf-grid > div:nth-child(2) { background: rgba(212,212,216,0.4); }
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
          background: rgba(212,212,216,0.5);
        }
        .csd-bf-mobile-bar {
          height: 4px;
          background: rgba(255,255,255,0.12);
          border-radius: 2px;
        }
        .csd-bf-mobile-circle {
          width: 28px; height: 28px;
          border-radius: 50%;
          background: rgba(212,212,216,0.4);
          border: 2px solid rgba(212,212,216,0.7);
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
          background: rgba(212,212,216,0.18);
          color: #d4d4d8;
          border-radius: 999px;
          letter-spacing: 0.1em;
        }

        /* ═══════════════════════════════════════════════════════════════
           WHY TEAMS CHOOSE US — editorial split (content left, image right)
        ═══════════════════════════════════════════════════════════════ */
        .csd-vp-section {
          background: #fafaf9;
          border-top: 1px solid rgba(0,0,0,0.06);
          padding-right: clamp(14px, 2.4vw, 32px);
        }

        .csd-vp-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 0;
          align-items: stretch;
          min-height: 620px;
        }

        .csd-vp-content {
          padding: clamp(56px, 7vw, 96px) clamp(32px, 5vw, 72px) clamp(56px, 7vw, 96px) clamp(132px, 18vw, 270px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: #fafaf9;
        }

        .csd-vp-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
          margin-bottom: 18px;
        }

        .csd-vp-h2 {
          font-family: var(--font-display);
          font-size: clamp(34px, 4.4vw, 56px);
          font-weight: 500;
          letter-spacing: -0.034em;
          line-height: 1.02;
          margin: 0 0 26px;
          color: #0a0a0a;
          max-width: 520px;
        }
        .csd-vp-h2-accent {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.5);
        }

        .csd-vp-lead {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(10,10,10,0.62);
          margin: 0 0 40px;
          max-width: 540px;
          padding-bottom: 32px;
          border-bottom: 1px solid rgba(10,10,10,0.1);
        }

        .csd-vp-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 540px;
        }
        .csd-vp-item {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 14px;
          padding: 0;
          border-bottom: 0;
        }
        .csd-vp-item-num {
          position: relative;
          width: 18px;
          height: 22px;
          flex-shrink: 0;
        }
        .csd-vp-item-num span {
          display: none;
        }
        .csd-vp-item-num::before {
          content: "";
          position: absolute;
          top: 9px;
          left: 0;
          width: 12px;
          height: 1px;
          background: #0a0a0a;
        }
        .csd-vp-item-num::after {
          content: "";
          position: absolute;
          top: 6px;
          left: 8px;
          width: 7px;
          height: 7px;
          border-top: 1px solid #0a0a0a;
          border-right: 1px solid #0a0a0a;
          transform: rotate(45deg);
        }
        .csd-vp-item-body {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .csd-vp-item-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }
        .csd-vp-item-title {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.018em;
          line-height: 1.3;
          margin: 0;
          color: #0a0a0a;
          flex: 1;
          min-width: 220px;
        }
        .csd-vp-item-metric {
          display: inline-flex;
          align-items: baseline;
          gap: 8px;
          flex-shrink: 0;
        }
        .csd-vp-item-metric-value {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.025em;
          color: #0a0a0a;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .csd-vp-item-metric-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.45);
          white-space: nowrap;
        }
        .csd-vp-item-desc {
          font-size: 14px;
          line-height: 1.62;
          color: rgba(10,10,10,0.65);
          margin: 0;
        }

        /* RIGHT — image */
        .csd-vp-media {
          position: relative;
          align-self: center;
          justify-self: center;
          overflow: hidden;
          background: #0a0a0a;
          width: min(100%, 840px);
          height: 760px;
          min-height: 0;
          border-radius: clamp(20px, 2.4vw, 32px);
        }
        .csd-vp-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: grayscale(1) contrast(1.05);
          transition: transform 1.2s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .csd-vp-section:hover .csd-vp-media img {
          transform: scale(1.03);
        }
        .csd-vp-media-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(10,10,10,0.15) 0%, rgba(10,10,10,0.45) 100%);
          pointer-events: none;
        }
        .csd-vp-media-tag {
          display: none;
        }
        .csd-vp-media-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0a0a0a;
        }

        /* ═══════════════════════════════════════════════════════════════
           RESULTS — clean horizontal row (4 inline)
        ═══════════════════════════════════════════════════════════════ */
        .csd-results-section {
          padding: 140px 20px;
          background: #fafaf9;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .csd-results-inner { max-width: 1320px; margin: 0 auto; }

        .csd-results-header {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 60px;
          align-items: end;
          margin-bottom: 72px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(10,10,10,0.1);
        }
        .csd-results-header-left { display: flex; flex-direction: column; gap: 18px; }
        .csd-results-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
        }
        .csd-results-h2 {
          font-family: var(--font-display);
          font-size: clamp(34px, 4.4vw, 60px);
          font-weight: 500;
          letter-spacing: -0.034em;
          line-height: 1.02;
          margin: 0;
          max-width: 720px;
        }
        .csd-results-lead {
          font-size: 15px;
          color: rgba(10,10,10,0.6);
          line-height: 1.7;
          margin: 0;
          max-width: 380px;
          padding-bottom: 6px;
        }

        .csd-results-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid rgba(10,10,10,0.1);
          border-bottom: 1px solid rgba(10,10,10,0.1);
        }
        .csd-result-card {
          padding: 36px 32px 40px;
          display: flex;
          flex-direction: column;
          gap: 0;
          border-right: 1px solid rgba(10,10,10,0.1);
          position: relative;
          transition: background 0.3s ease;
        }
        .csd-result-card:last-child { border-right: 0; }
        .csd-result-card:hover { background: rgba(10,10,10,0.02); }
        .csd-result-card::before {
          content: "";
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 2px;
          background: #0a0a0a;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .csd-result-card:hover::before { transform: scaleX(1); }

        .csd-result-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 28px;
        }
        .csd-result-card-index {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: rgba(10,10,10,0.4);
        }
        .csd-result-card-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0a0a0a;
          opacity: 0.25;
          transition: opacity 0.3s, transform 0.3s;
        }
        .csd-result-card:hover .csd-result-card-dot {
          opacity: 1;
          transform: scale(1.2);
        }

        .csd-result-card-metric {
          font-family: var(--font-display);
          font-size: clamp(48px, 5.4vw, 80px);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 0.92;
          color: #0a0a0a;
          font-variant-numeric: tabular-nums;
          margin-bottom: 10px;
        }
        .csd-result-card-label {
          font-family: var(--font-display);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.012em;
          color: rgba(10,10,10,0.6);
          margin-bottom: 28px;
        }
        .csd-result-card-divider {
          height: 1px;
          background: rgba(10,10,10,0.1);
          margin-bottom: 18px;
        }
        .csd-result-card-project {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #0a0a0a;
          margin-bottom: 12px;
        }
        .csd-result-card-desc {
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(10,10,10,0.6);
          margin: 0;
        }

        /* ═══════════════════════════════════════════════════════════════
           FAQs
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
        .csd-faq-cta:hover { background: #0a0a0a; color: #fafaf9; }
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
        .csd-faq-row[data-open="true"] .csd-faq-a { grid-template-rows: 1fr; }
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
        .csd-faq-row[data-open="true"] .csd-faq-a-inner { padding-bottom: 28px; }

        /* ═══════════════════════════════════════════════════════════════
           FINAL CTA — light, minimal, sleek
        ═══════════════════════════════════════════════════════════════ */
        .csd-cta-section {
          padding: 0 20px 80px;
          background: #fafaf9;
          border-top: 1px solid rgba(0,0,0,0.06);
          padding-top: 64px;
        }

        .csd-cta-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: clamp(80px, 10vw, 140px) clamp(32px, 5vw, 88px);
          background: #f5f5f4;
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          opacity: 0;
        }

        /* subtle grid */
        .csd-cta-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(10,10,10,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 90%);
          pointer-events: none;
        }

        .csd-cta-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: clamp(48px, 6vw, 96px);
          align-items: end;
        }

        .csd-cta-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 7px 14px;
          background: #fff;
          border: 1px solid rgba(10,10,10,0.1);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.65);
          margin-bottom: 32px;
          align-self: flex-start;
          width: fit-content;
        }
        .csd-cta-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 0 4px rgba(22,163,74,0.12);
          animation: csd-cta-pulse 2.4s ease-in-out infinite;
        }
        @keyframes csd-cta-pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(22,163,74,0.12); }
          50% { box-shadow: 0 0 0 6px rgba(22,163,74,0.2); }
        }

        .csd-cta-h2 {
          font-family: var(--font-display);
          font-size: clamp(40px, 5.6vw, 80px);
          font-weight: 500;
          letter-spacing: -0.042em;
          line-height: 0.96;
          margin: 0 0 28px;
          color: #0a0a0a;
          max-width: 640px;
        }
        .csd-cta-h2-accent {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.45);
        }

        .csd-cta-lead {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(10,10,10,0.62);
          margin: 0 0 40px;
          max-width: 540px;
        }

        .csd-cta-actions {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .csd-cta-primary-light {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 28px;
          background: #0a0a0a;
          color: #fafaf9;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 999px;
          transition: background 0.25s, transform 0.25s;
        }
        .csd-cta-primary-light:hover {
          background: #262626;
          transform: translateX(2px);
        }
        .csd-cta-primary-light svg { transition: transform 0.25s; }
        .csd-cta-primary-light:hover svg { transform: translateX(2px); }

        .csd-cta-mail {
          font-size: 14px;
          font-weight: 500;
          color: rgba(10,10,10,0.65);
          text-decoration: none;
          border-bottom: 1px solid rgba(10,10,10,0.25);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .csd-cta-mail:hover {
          color: #0a0a0a;
          border-color: #0a0a0a;
        }

        /* RIGHT — meta */
        .csd-cta-right {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .csd-cta-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin: 0;
          border-top: 1px solid rgba(10,10,10,0.12);
          border-left: 1px solid rgba(10,10,10,0.12);
        }
        .csd-cta-meta-item {
          padding: 22px 24px;
          border-right: 1px solid rgba(10,10,10,0.12);
          border-bottom: 1px solid rgba(10,10,10,0.12);
          background: rgba(255,255,255,0.5);
        }
        .csd-cta-meta-item dt {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
          margin: 0 0 8px;
        }
        .csd-cta-meta-item dd {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 500;
          letter-spacing: -0.018em;
          color: #0a0a0a;
          margin: 0;
        }

        .marquee-track { will-change: transform; }

        /* ═══════════════════════════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .csd-hero-main {
            grid-template-columns: 1fr;
            gap: 64px;
          }
          .csd-hero-right { max-width: 720px; margin: 0 auto; width: 100%; }

          .csd-cap-row {
            grid-template-columns: 60px 50px 1fr 30px;
            gap: 18px;
          }

          .csd-cost-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .csd-cost-media {
            min-height: 360px;
            aspect-ratio: 16 / 9;
          }

          .csd-build-grid { grid-template-columns: 1fr; gap: 56px; }
          .csd-build-right { min-height: 480px; }

          /* WHY TEAMS CHOOSE US */
          .csd-vp-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .csd-vp-media {
            align-self: stretch;
            justify-self: stretch;
            width: 100%;
            height: auto;
            min-height: 360px;
            aspect-ratio: 16 / 9;
            margin: 0;
          }

          /* RESULTS */
          .csd-results-header {
            grid-template-columns: 1fr;
            gap: 24px;
            align-items: start;
          }
          .csd-results-row {
            grid-template-columns: 1fr 1fr;
          }
          .csd-result-card:nth-child(2) { border-right: 0; }
          .csd-result-card:nth-child(1),
          .csd-result-card:nth-child(2) {
            border-bottom: 1px solid rgba(10,10,10,0.1);
          }

          /* CTA */
          .csd-cta-grid {
            grid-template-columns: 1fr;
            gap: 56px;
            align-items: start;
          }

          .csd-faq-layout { grid-template-columns: 1fr; gap: 48px; }
          .csd-faq-aside { position: static; }
        }

        @media (max-width: 768px) {
          .csd-hero {
            padding: 120px 14px 60px;
            min-height: auto;
          }
          .csd-hero-title { font-size: clamp(40px, 13vw, 64px); }
          .csd-hero-proof {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .csd-hero-stage {
            padding: 44px 16px 16px;
            gap: 14px;
            aspect-ratio: 1.05 / 1;
          }
          .csd-hero-stage-row {
            grid-template-columns: 1fr 36%;
            gap: 12px;
          }
          .csd-hero-stage-bottom {
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .csd-hero-stage-badge {
            padding: 10px 14px;
            justify-content: flex-start;
          }
          .csd-hero-stage-badge-v { font-size: 13px; }
          .csd-hero-marquee-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
          .csd-hero-marquee-track { gap: 18px; }
          .csd-hero-marquee-item { font-size: 13px; }

          .csd-cap-section,
          .csd-build-section,
          .csd-faq-section {
            padding-left: 14px;
            padding-right: 14px;
            padding-top: 90px;
            padding-bottom: 90px;
          }
          .csd-cap-section {
            padding-top: 70px;
            padding-bottom: 70px;
          }

          .csd-cap-row {
            grid-template-columns: 1fr 30px;
            gap: 12px;
            padding: 22px 14px;
          }
          .csd-cap-row-bin,
          .csd-cap-row-num { display: none; }
          .csd-cap-row-title { font-size: 19px; }

          .csd-cost-media { min-height: 280px; aspect-ratio: 4 / 3; }
          .csd-cost-media-tag { top: 18px; left: 18px; padding: 6px 12px; font-size: 10px; }
          .csd-cost-content { padding: 56px 22px 64px; }
          .csd-cost-h2 { font-size: clamp(28px, 8vw, 38px); }
          .csd-cost-lead { font-size: 15px; }
          .csd-cost-list li { font-size: 14px; }

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

          /* WHY TEAMS CHOOSE US */
          .csd-vp-section { padding-right: 14px; }
          .csd-vp-content { padding: 56px 22px 64px; }
          .csd-vp-h2 { font-size: clamp(28px, 8vw, 38px); }
          .csd-vp-lead { font-size: 15px; }
          .csd-vp-list { gap: 12px; }
          .csd-vp-item { grid-template-columns: 18px 1fr; gap: 12px; padding: 0; }
          .csd-vp-item-title { font-size: 17px; min-width: 0; }
          .csd-vp-item-metric-value { font-size: 16px; }
          .csd-vp-media { min-height: 280px; aspect-ratio: 4 / 3; }

          /* RESULTS */
          .csd-results-section { padding: 90px 14px; }
          .csd-results-header { margin-bottom: 48px; padding-bottom: 28px; }
          .csd-results-row { grid-template-columns: 1fr; }
          .csd-result-card {
            border-right: 0 !important;
            border-bottom: 1px solid rgba(10,10,10,0.1);
            padding: 28px 22px 32px;
          }
          .csd-result-card:last-child { border-bottom: 0; }

          .csd-faq-q { grid-template-columns: 36px 1fr 26px; gap: 12px; padding: 20px 0; }
          .csd-faq-q-icon { width: 26px; height: 26px; }
          .csd-faq-a-inner { padding-left: 48px; font-size: 14px; }
          .csd-faq-row[data-open="true"] .csd-faq-a-inner { padding-bottom: 22px; }

          .csd-process-pin { height: auto !important; overflow: visible !important; }
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
          /* CTA */
          .csd-cta-section { padding: 48px 14px 56px; }
          .csd-cta-inner { padding: 56px 26px; border-radius: 18px; }
          .csd-cta-h2 { font-size: clamp(32px, 10vw, 48px); }
          .csd-cta-actions { gap: 16px; }
          .csd-cta-meta { grid-template-columns: 1fr; }
          .csd-cta-meta-item:last-child { border-bottom: 0; }
        }
      `}</style>
    </>
  );
}

// ────────────────────────────────────────────────────────────────────────────
// BuildFrame
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