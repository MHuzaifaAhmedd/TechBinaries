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
    href: "/services/custom-software-development/custom-web-application-development",
    accent: "#d4d4d8",
    tags: ["Next.js", "React", "Node", "Postgres"],
  },
  {
    num: "02",
    bin: "0010",
    title: "iOS App Development",
    desc: "Native Swift and cross-platform iOS experiences tuned for performance, polish, and App Store readiness.",
    href: "/services/custom-software-development/ios-app-development",
    accent: "#a3a3a3",
    tags: ["Swift", "UIKit", "SwiftUI", "React Native"],
  },
  {
    num: "03",
    bin: "0011",
    title: "Android App Development",
    desc: "Kotlin-first Android apps and shared codebases that feel native and scale with your product roadmap.",
    href: "/services/custom-software-development/android-app-development",
    accent: "#b8b8b8",
    tags: ["Kotlin", "Jetpack", "Play Store", "React Native"],
  },
  {
    num: "04",
    bin: "0100",
    title: "SaaS Product Development",
    desc: "Multi-tenant SaaS platforms with billing, auth, analytics, and growth loops baked in.",
    href: "/services/custom-software-development/saas-product-development",
    accent: "#e5e5e5",
    tags: ["Multi-tenant", "Billing", "Auth", "Analytics"],
  },
  {
    num: "05",
    bin: "0101",
    title: "UI/UX Design Systems",
    desc: "Design systems, component libraries, and product UX engineered for consistency at scale.",
    href: "/services/custom-software-development/ui-ux-design-systems",
    accent: "#737373",
    tags: ["Design Systems", "Figma", "Tokens", "A11y"],
  },
  {
    num: "06",
    bin: "0110",
    title: "CMS & Admin Panel Development",
    desc: "Content systems and internal tools that empower teams without slowing them down.",
    href: "/services/custom-software-development/cms-admin-panel-development",
    accent: "#bdbdbd",
    tags: ["Headless CMS", "Admin UI", "RBAC", "Workflows"],
  },
  {
    num: "07",
    bin: "0111",
    title: "High-Performance Landing Pages",
    desc: "Pixel-perfect, conversion-tuned landing pages with sub-second load and SEO baked in.",
    href: "/services/custom-software-development/high-performance-landing-page-development",
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
    desc: "Runtime budgets, stable interactions, and measurable gains across Lighthouse, Core Web Vitals, and real-device testing.",
  },
  {
    id: "architecture",
    metric: "10×",
    metricLabel: "Growth headroom",
    title: "Architecture that scales as you grow",
    desc: "Clear boundaries and observability let you ship faster with fewer incidents and less rework.",
  },
  {
    id: "design-system",
    metric: "1 system",
    metricLabel: "Design coverage",
    title: "Design systems that reduce UX friction",
    desc: "Tokens and reusable components keep web, mobile, and internal tools consistent as teams scale.",
  },
  {
    id: "delivery",
    metric: "Weekly",
    metricLabel: "Shipped iterations",
    title: "Delivery cadence that accelerates momentum",
    desc: "Weekly demos and feature-flagged releases help you learn quickly and reduce rollout risk.",
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

const HERO_PHONE_COUNTRY_CODES = [
  "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
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
      const headlineChars = gsap.utils.toArray<HTMLElement>(
        ".csd-h1-lines-desktop .csd-h1-char, .csd-h1-lines-mobile .csd-h1-char"
      );
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
          <div className="csd-hero-video-wrap" aria-hidden>
            <video
              className="csd-hero-video"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source
                src="/videos/hero-services-csds-video.mp4"
                type="video/mp4"
                media="(min-width: 901px)"
              />
            </video>
            {/* Static hero on narrow viewports only; desktop/laptop keep video above */}
            <img
              className="csd-hero-mobile-bg"
              src="/images/services/custom-software-development/mobile-custom-software-service-hero.jpeg"
              alt=""
              decoding="async"
              fetchPriority="high"
            />
            <div className="csd-hero-video-overlay" />
          </div>

          <div className="csd-hero-inner">
            <div className="csd-hero-main">
              {/* LEFT — mobile: spacer pushes copy lower over image; same headline & copy as desktop */}
              <div className="csd-hero-left">
                <div className="csd-hero-mobile-spacer" aria-hidden />

                <h1 className="csd-hero-title">
                  <span className="csd-h1-lines-desktop" aria-hidden={isMobile}>
                    <div className="csd-h1-line">
                      {"Custom software".split("").map((c, i) => (
                        <span key={`l1-${i}`} className="csd-h1-char">{c === " " ? "\u00A0" : c}</span>
                      ))}
                    </div>
                    <div className="csd-h1-line">
                      {"built for speed,".split("").map((c, i) => (
                        <span key={`l2-${i}`} className="csd-h1-char" style={{ whiteSpace: "pre" }}>{c === " " ? "\u00A0" : c}</span>
                      ))}
                    </div>
                    <div className="csd-h1-line">
                      <span className="csd-h1-italic">
                        {"scale & growth.".split("").map((c, i) => (
                          <span key={`l3i-${i}`} className="csd-h1-char">{c}</span>
                        ))}
                      </span>
                    </div>
                  </span>
                  <span className="csd-h1-lines-mobile" aria-hidden={!isMobile}>
                    <div className="csd-h1-line csd-h1-line-mobile">
                      {"Custom software built for".split("").map((c, i) => (
                        <span key={`m1-${i}`} className="csd-h1-char">{c === " " ? "\u00A0" : c}</span>
                      ))}
                    </div>
                    <div className="csd-h1-line csd-h1-line-mobile">
                      {"speed, ".split("").map((c, i) => (
                        <span key={`m2-${i}`} className="csd-h1-char">{c === " " ? "\u00A0" : c}</span>
                      ))}
                      <span className="csd-h1-italic">
                        {"scale & growth.".split("").map((c, i) => (
                          <span key={`m3i-${i}`} className="csd-h1-char">{c}</span>
                        ))}
                      </span>
                    </div>
                  </span>
                </h1>

                <p className="csd-hero-fade csd-hero-lead" style={{ opacity: 0 }}>
                  We design, build, and modernize web apps, mobile apps, SaaS platforms,
                  and internal tools that launch fast, perform reliably, and stay easy
                  to scale as your business grows.
                </p>

                <div className="csd-hero-fade csd-hero-cta-row" style={{ opacity: 0 }}>
                  <Link href="/contact" className="csd-cta-primary">
                    <span style={{ position: "relative", zIndex: 2 }}>Plan my build</span>
                    <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="csd-cta-arrow" style={{ position: "relative", zIndex: 2 }}>
                      <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>

              </div>

              <div className="csd-hero-right">
                <div className="csd-hero-form-shell" style={{ opacity: 0 }}>
                  <h3 className="csd-hero-form-title">Share Your Requirements</h3>
                  <p className="csd-hero-form-subtitle">
                    Tell our experts about your goals and get a tailored consultation plan.
                  </p>

                  <form className="csd-hero-form" onSubmit={(e) => e.preventDefault()}>
                    <label className="csd-hero-form-field">
                      <span>Name</span>
                      <input type="text" placeholder="Your name" />
                    </label>

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

                    <label className="csd-hero-form-field">
                      <span>Budget Range</span>
                      <select defaultValue="">
                        <option value="" disabled>Select a budget range</option>
                        <option value="under-10k">Under $10k</option>
                        <option value="10k-25k">$10k - $25k</option>
                        <option value="25k-50k">$25k - $50k</option>
                        <option value="50k-plus">$50k+</option>
                      </select>
                    </label>

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
          background: #ffffff;
          color: #0a0a0a;
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
          background: linear-gradient(90deg, #e7e5e4, #ffffff);
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
          border: 1px solid rgba(255,255,255,0.36);
          color: rgba(255,255,255,0.96);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 999px;
          background: rgba(255,255,255,0.16);
          backdrop-filter: blur(8px);
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .csd-cta-ghost-light:hover {
          border-color: rgba(255,255,255,0.68);
          background: rgba(255,255,255,0.24);
          color: #fff;
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
          background: #e7e5e4;
          color: #fff;
          padding: clamp(150px, 17vh, 190px) 20px 56px;
          overflow: hidden;
        }

        .csd-hero-video-wrap {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .csd-hero-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: saturate(1.08) contrast(1.04);
        }

        .csd-hero-mobile-bg {
          display: none;
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 28%;
          filter: saturate(1.08) contrast(1.04);
        }

        @media (max-width: 900px) {
          .csd-hero-video {
            display: none;
          }
          .csd-hero-mobile-bg {
            display: block;
          }
          .csd-hero-video-overlay {
            background:
              linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.78) 55%, rgba(0,0,0,0.88) 100%),
              linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 100%);
          }
        }

        .csd-hero-video-overlay {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.58) 44%, rgba(0,0,0,0.34) 68%, rgba(0,0,0,0.24) 100%),
            linear-gradient(180deg, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.5) 100%);
        }

        /* Zoom background video to crop baked-in corner watermark (ultra-wide >1920px unchanged) */
        @media (max-width: 1920px) and (min-width: 769px) {
          .csd-hero-video {
            transform: scale(1.12);
            transform-origin: 42% 34%;
            will-change: transform;
          }
        }
        @media (max-width: 1280px) and (min-width: 769px) {
          .csd-hero-video {
            transform: scale(1.17);
            transform-origin: 40% 32%;
          }
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
          grid-template-columns: minmax(0, 1.15fr) minmax(420px, 0.85fr);
          gap: clamp(32px, 4vw, 64px);
          align-items: center;
          min-height: calc(100vh - 246px);
        }
        .csd-hero-left {
          min-width: 0;
          max-width: 780px;
          transform: translateY(clamp(22px, 4vh, 48px));
        }

        .csd-hero-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 4.5vw, 72px);
          font-weight: 500;
          line-height: 0.98;
          letter-spacing: -0.045em;
          margin: 0 0 26px;
          color: #fff;
          max-width: 720px;
          text-shadow: 0 10px 30px rgba(0,0,0,0.34);
        }

        .csd-hero-mobile-spacer {
          display: none;
        }

        .csd-h1-lines-desktop {
          display: block;
        }
        .csd-h1-lines-mobile {
          display: none;
        }

        .csd-h1-line {
          overflow: visible;
          padding-bottom: 0.075em;
          display: block;
          white-space: nowrap;
          width: 100%;
        }
        .csd-h1-char {
          display: inline-block;
          will-change: transform;
        }
        .csd-h1-italic {
          font-style: italic;
          font-weight: 400;
          color: rgba(255,255,255,0.96);
          display: inline-block;
          white-space: nowrap;
          padding: 0 0.08em;
          border-radius: 0.16em;
          background: rgba(255,255,255,0.08);
          text-shadow: 0 8px 24px rgba(0,0,0,0.36);
        }

        .csd-hero-lead {
          font-size: 17px;
          color: rgba(255,255,255,0.84);
          max-width: 600px;
          line-height: 1.7;
          margin: 0 0 32px;
          text-shadow: 0 6px 18px rgba(0,0,0,0.28);
        }

        @media (max-width: 900px) {
          .csd-hero {
            padding: clamp(96px, 14svh, 128px) 14px 0;
          }
          .csd-hero-mobile-spacer {
            display: block;
            flex: 1 1 auto;
            min-height: min(26vh, 220px);
            max-height: 44vh;
          }
          .csd-hero-left {
            display: flex;
            flex-direction: column;
            min-height: min(58svh, 580px);
            transform: none;
            max-width: none;
          }
          .csd-hero-title {
            font-size: clamp(28px, 7vw, 40px);
            line-height: 1.02;
            margin-bottom: 16px;
          }
          .csd-h1-lines-desktop {
            display: none;
          }
          .csd-h1-lines-mobile {
            display: block;
          }
          .csd-hero-lead {
            font-size: 15px;
            line-height: 1.62;
            margin-bottom: 24px;
            max-width: none;
          }
          .csd-hero-inner {
            gap: 0;
          }
          .csd-hero-main {
            min-height: auto;
            gap: 0;
          }
          .csd-hero-right {
            align-self: stretch;
            width: 100%;
            margin-top: 0;
            align-items: stretch;
          }
          .csd-hero-form-shell {
            max-width: none;
            width: calc(100% + 28px);
            margin-left: -14px;
            margin-right: -14px;
            border-radius: 22px 22px 0 0;
            padding: 32px 20px 40px;
            border-left: none;
            border-right: none;
            background: linear-gradient(180deg, #070707 0%, #121212 50%, #0a0a0a 100%);
            box-shadow: 0 -20px 60px -20px rgba(0,0,0,0.5);
          }
          .csd-hero-form-subtitle {
            max-width: none;
          }
          .csd-hero-form {
            gap: 22px;
          }
          .csd-hero-form-field input,
          .csd-hero-form-field select,
          .csd-hero-form-field textarea {
            border: none;
            border-radius: 0;
            background: transparent;
            border-bottom: 1px solid rgba(255,255,255,0.42);
            padding: 10px 0 14px;
            box-shadow: none;
          }
          .csd-hero-form-field textarea {
            min-height: 100px;
          }
          .csd-hero-form-field input:focus,
          .csd-hero-form-field select:focus,
          .csd-hero-form-field textarea:focus {
            border-bottom-color: rgba(96, 165, 250, 0.95);
            box-shadow: none;
            background: transparent;
          }
          .csd-hero-form-field select {
            background-position:
              calc(100% - 2px) calc(1em + 8px),
              calc(100% + 1px) calc(1em + 8px);
          }

          .csd-hero-form-field--phone .csd-hero-phone-row {
            border: none;
            border-radius: 0;
            background: transparent;
            border-bottom: 1px solid rgba(255,255,255,0.42);
            box-shadow: none;
            overflow: visible;
          }
          .csd-hero-form-field--phone:focus-within .csd-hero-phone-row {
            border-bottom-color: rgba(96, 165, 250, 0.95);
            box-shadow: none;
            background: transparent;
          }
          .csd-hero-form-field--phone .csd-hero-phone-sep {
            align-self: center;
            height: 1.15em;
            margin: 0 10px 0 0;
            background: rgba(255,255,255,0.38);
          }
          .csd-hero-form-field--phone .csd-hero-phone-cc,
          .csd-hero-form-field--phone .csd-hero-phone-num {
            border-bottom: none !important;
            padding: 10px 0 14px !important;
          }
          .csd-hero-form-field--phone .csd-hero-phone-cc {
            min-width: 72px;
            max-width: 96px;
            padding-right: 22px !important;
            color: rgba(255,255,255,0.72) !important;
            background-position:
              calc(100% - 2px) calc(1em + 6px),
              calc(100% + 1px) calc(1em + 6px);
          }
          .csd-hero-form-field--phone .csd-hero-phone-cc:focus,
          .csd-hero-form-field--phone .csd-hero-phone-num:focus {
            border-bottom: none !important;
          }

          .csd-hero-form-captcha input {
            border: none;
            border-radius: 0;
            border-bottom: 1px solid rgba(255,255,255,0.42);
            background: transparent;
            width: 56px;
            padding: 8px 0;
          }
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

        /* HERO FORM (right side) */
        .csd-hero-right {
          position: relative;
          align-self: stretch;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .csd-hero-form-shell {
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
        .csd-hero-form-title {
          margin: 0;
          font-family: var(--font-display);
          font-size: clamp(26px, 2.6vw, 36px);
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #fff;
          line-height: 1.05;
        }
        .csd-hero-form-subtitle {
          margin: 10px 0 20px;
          color: rgba(255,255,255,0.72);
          font-size: 14px;
          line-height: 1.6;
          max-width: 44ch;
        }
        .csd-hero-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .csd-hero-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .csd-hero-form-field {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .csd-hero-form-field span {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.07em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.74);
        }

        .csd-hero-phone-row {
          display: flex;
          align-items: stretch;
          width: 100%;
          border: none;
          border-radius: 0;
          background: transparent;
          border-bottom: 1px solid rgba(255,255,255,0.42);
          overflow: visible;
          transition: border-color 0.2s;
        }
        .csd-hero-form-field--phone:focus-within .csd-hero-phone-row {
          border-bottom-color: rgba(96, 165, 250, 0.95);
          box-shadow: none;
          background: transparent;
        }
        .csd-hero-phone-sep {
          width: 1px;
          align-self: center;
          height: 1.15em;
          background: rgba(255,255,255,0.38);
          flex-shrink: 0;
          margin: 0 10px 0 0;
        }

        .csd-hero-form-field input,
        .csd-hero-form-field select,
        .csd-hero-form-field textarea {
          width: 100%;
          border: none;
          border-radius: 0;
          background: transparent;
          color: #fff;
          border-bottom: 1px solid rgba(255,255,255,0.42);
          padding: 10px 0 14px;
          font-size: 14px;
          outline: none;
          box-shadow: none;
          transition: border-color 0.2s;
        }
        .csd-hero-form-field textarea {
          resize: vertical;
          min-height: 92px;
        }
        .csd-hero-form-field input::placeholder,
        .csd-hero-form-field textarea::placeholder {
          color: rgba(255,255,255,0.45);
        }
        .csd-hero-form-field select {
          color: rgba(255,255,255,0.75);
          appearance: none;
          background-color: transparent;
          background-image:
            linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.72) 50%),
            linear-gradient(135deg, rgba(255,255,255,0.72) 50%, transparent 50%);
          background-position:
            calc(100% - 4px) calc(1em + 6px),
            calc(100% - 0px) calc(1em + 6px);
          background-size: 5px 5px, 5px 5px;
          background-repeat: no-repeat;
        }
        .csd-hero-form-field select:invalid {
          color: rgba(255,255,255,0.65);
        }
        .csd-hero-form-field select option {
          color: #0a0a0a;
          background: #ffffff;
        }
        .csd-hero-form-field select option[disabled] {
          color: rgba(10,10,10,0.55);
        }
        .csd-hero-form-field input:focus,
        .csd-hero-form-field select:focus,
        .csd-hero-form-field textarea:focus {
          border-bottom-color: rgba(96, 165, 250, 0.95);
          box-shadow: none;
          background: transparent;
        }

        .csd-hero-form-field--phone .csd-hero-phone-cc,
        .csd-hero-form-field--phone .csd-hero-phone-num {
          width: auto !important;
          border: none !important;
          border-radius: 0 !important;
          background: transparent !important;
          box-shadow: none !important;
        }
        .csd-hero-form-field--phone .csd-hero-phone-cc {
          flex: 0 0 auto;
          min-width: 84px;
          max-width: 110px;
          padding: 10px 26px 14px 0 !important;
          color: rgba(255,255,255,0.78) !important;
        }
        .csd-hero-form-field--phone .csd-hero-phone-num {
          flex: 1 1 auto;
          min-width: 0;
          padding: 10px 0 14px 0 !important;
        }
        .csd-hero-form-field--phone .csd-hero-phone-cc:focus,
        .csd-hero-form-field--phone .csd-hero-phone-num:focus {
          box-shadow: none !important;
          border: none !important;
          background: transparent !important;
        }

        /* Chrome / Edge autofill: keep dark shell + light text (no yellow/blue fill) */
        .csd-hero-form input:-webkit-autofill,
        .csd-hero-form input:-webkit-autofill:hover,
        .csd-hero-form input:-webkit-autofill:focus,
        .csd-hero-form input:-webkit-autofill:active,
        .csd-hero-form textarea:-webkit-autofill,
        .csd-hero-form textarea:-webkit-autofill:hover,
        .csd-hero-form textarea:-webkit-autofill:focus,
        .csd-hero-form textarea:-webkit-autofill:active,
        .csd-hero-form select:-webkit-autofill,
        .csd-hero-form select:-webkit-autofill:hover,
        .csd-hero-form select:-webkit-autofill:focus,
        .csd-hero-form select:-webkit-autofill:active {
          -webkit-text-fill-color: rgba(255, 255, 255, 0.95) !important;
          caret-color: #fff;
          transition: background-color 99999s ease-out 0s;
          -webkit-box-shadow: 0 0 0 1000px #0c0c0c inset !important;
          box-shadow: 0 0 0 1000px #0c0c0c inset !important;
        }
        .csd-hero-form input:autofill,
        .csd-hero-form textarea:autofill,
        .csd-hero-form select:autofill {
          -webkit-text-fill-color: rgba(255, 255, 255, 0.95);
          color: rgba(255, 255, 255, 0.95) !important;
        }

        .csd-hero-form-field--phone .csd-hero-phone-cc:-webkit-autofill,
        .csd-hero-form-field--phone .csd-hero-phone-cc:-webkit-autofill:hover,
        .csd-hero-form-field--phone .csd-hero-phone-cc:-webkit-autofill:focus,
        .csd-hero-form-field--phone .csd-hero-phone-num:-webkit-autofill,
        .csd-hero-form-field--phone .csd-hero-phone-num:-webkit-autofill:hover,
        .csd-hero-form-field--phone .csd-hero-phone-num:-webkit-autofill:focus {
          -webkit-text-fill-color: rgba(255, 255, 255, 0.95) !important;
          -webkit-box-shadow: 0 0 0 1000px #0c0c0c inset !important;
          box-shadow: 0 0 0 1000px #0c0c0c inset !important;
        }

        .csd-hero-form-foot {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 6px;
        }
        .csd-hero-form-captcha {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.85);
          font-weight: 600;
          flex-shrink: 0;
        }
        .csd-hero-form-captcha input {
          width: 56px;
          border: none;
          border-radius: 0;
          background: transparent;
          color: #fff;
          border-bottom: 1px solid rgba(255,255,255,0.42);
          padding: 8px 0 10px;
          outline: none;
          box-shadow: none;
          transition: border-color 0.2s;
        }
        .csd-hero-form-captcha input:focus {
          border-bottom-color: rgba(96, 165, 250, 0.95);
        }
        .csd-hero-form-submit {
          border: none;
          border-radius: 999px;
          padding: 12px 20px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: #fff;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          box-shadow: 0 10px 24px -10px rgba(37,99,235,0.8);
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .csd-hero-form-submit:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 28px -12px rgba(37,99,235,0.9);
        }
        .csd-hero-form-note {
          margin: 2px 0 0;
          font-size: 12px;
          color: rgba(255,255,255,0.62);
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
          padding-left: max(clamp(14px, 2.4vw, 32px), env(safe-area-inset-left, 0px));
          padding-right: max(clamp(14px, 2.4vw, 32px), env(safe-area-inset-right, 0px));
        }

        .csd-cost-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 0;
          align-items: stretch;
          min-height: 620px;
          width: 100%;
          box-sizing: border-box;
        }

        .csd-cost-media {
          position: relative;
          overflow: hidden;
          background: #0a0a0a;
          min-height: 480px;
          min-width: 0;
          border-radius: clamp(20px, 2.4vw, 32px);
        }
        .csd-cost-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: saturate(1.08) contrast(1.04);
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
          max-width: 540px;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION — WHAT WE BUILD
        ═══════════════════════════════════════════════════════════════ */
        .csd-build-section {
          padding: 140px 20px;
          background: #f5f5f4;
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
          padding-left: max(clamp(14px, 2.4vw, 32px), env(safe-area-inset-left, 0px));
          padding-right: max(clamp(14px, 2.4vw, 32px), env(safe-area-inset-right, 0px));
        }

        .csd-vp-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 0;
          align-items: stretch;
          min-height: 620px;
          width: 100%;
          box-sizing: border-box;
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
          gap: 10px;
          max-width: 540px;
        }
        .csd-vp-item {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 14px;
          padding: 16px 0 14px;
          border-top: 1px solid rgba(10,10,10,0.1);
        }
        .csd-vp-item:last-child {
          border-bottom: 1px solid rgba(10,10,10,0.1);
        }
        .csd-vp-item-num {
          position: relative;
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }
        .csd-vp-item-num span {
          display: none;
        }
        .csd-vp-item-num::before {
          content: "";
          position: absolute;
          top: 7px;
          left: 0;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(10,10,10,0.75);
        }
        .csd-vp-item-num::after {
          content: none;
        }
        .csd-vp-item-body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          column-gap: 20px;
          row-gap: 8px;
          align-items: start;
          min-width: 0;
        }
        .csd-vp-item-head {
          display: contents;
        }
        .csd-vp-item-title {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 500;
          letter-spacing: -0.018em;
          line-height: 1.24;
          margin: 0;
          color: #0a0a0a;
          min-width: 0;
          grid-column: 1;
        }
        .csd-vp-item-metric {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
          flex-shrink: 0;
          grid-column: 2;
          grid-row: 1 / span 2;
          margin-top: 2px;
          text-align: right;
          padding-left: 12px;
        }
        .csd-vp-item-metric-value {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.03em;
          color: #0a0a0a;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .csd-vp-item-metric-label {
          font-size: 8px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.45);
          white-space: nowrap;
        }
        .csd-vp-item-desc {
          font-size: 14px;
          line-height: 1.52;
          color: rgba(10,10,10,0.62);
          margin: 0;
          max-width: 42ch;
          grid-column: 1;
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
          min-width: 0;
          border-radius: clamp(20px, 2.4vw, 32px);
        }
        .csd-vp-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: saturate(1.08) contrast(1.04);
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
          align-items: start;
          margin-bottom: 56px;
          padding-bottom: 28px;
        }
        .csd-results-header-left { display: flex; flex-direction: column; gap: 18px; }
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
          padding-top: 6px;
        }

        .csd-results-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid rgba(10,10,10,0.1);
          border-bottom: 1px solid rgba(10,10,10,0.1);
        }
        .csd-result-card {
          padding: 28px 32px 36px;
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
            min-height: auto;
          }
          .csd-hero-left {
            max-width: 760px;
          }
          .csd-hero-right { max-width: 720px; margin: 0 auto; width: 100%; }
          .csd-hero-form-shell { max-width: 100%; }

          .csd-cap-row {
            grid-template-columns: 60px 50px 1fr 30px;
            gap: 18px;
          }

          .csd-cost-grid {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .csd-cost-media {
            width: 100%;
            max-width: 100%;
            justify-self: stretch;
            margin-inline: 0;
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
            max-width: 100%;
            height: auto;
            min-height: 360px;
            min-width: 0;
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

        @media (max-width: 1100px) and (min-width: 901px) {
          .csd-hero-left {
            transform: translateY(18px);
          }
        }

        @media (max-width: 768px) {
          .csd-hero {
            padding: 130px 14px 60px;
            min-height: auto;
          }
          .csd-hero-left { transform: none; }
          .csd-hero-title {
            font-size: clamp(24px, 6.6vw, 36px);
            max-width: 100%;
            margin-bottom: 16px;
            line-height: 1.03;
          }
          .csd-hero-lead {
            font-size: 14px;
            line-height: 1.58;
            margin-bottom: 20px;
          }
          .csd-hero-proof {
            grid-template-columns: 1fr 1fr;
            gap: 20px;
          }
          .csd-hero-form-shell {
            padding: 28px 18px 40px;
            border-radius: 22px 22px 0 0;
            width: calc(100% + 28px);
            margin-left: -14px;
            margin-right: -14px;
          }
          .csd-hero-form-grid { grid-template-columns: 1fr; }
          .csd-hero-form-foot {
            flex-direction: column;
            align-items: stretch;
          }
          .csd-hero-form-submit { width: 100%; }
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

          .csd-cost-section {
            padding-left: max(14px, env(safe-area-inset-left, 0px));
            padding-right: max(14px, env(safe-area-inset-right, 0px));
          }
          .csd-cost-media { min-height: 280px; aspect-ratio: 4 / 3; }
          .csd-cost-media-tag { top: 18px; left: 18px; padding: 6px 12px; font-size: 10px; }
          .csd-cost-content { padding: 56px 0 64px; }
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
          .csd-vp-section {
            padding-left: max(14px, env(safe-area-inset-left, 0px));
            padding-right: max(14px, env(safe-area-inset-right, 0px));
          }
          .csd-vp-content { padding: 56px 0 64px; }
          .csd-vp-h2 { font-size: clamp(28px, 8vw, 38px); }
          .csd-vp-lead { font-size: 15px; }
          .csd-vp-list { gap: 12px; }
          .csd-vp-item { grid-template-columns: 14px 1fr; gap: 12px; padding: 14px 0; }
          .csd-vp-item-body {
            grid-template-columns: 1fr;
            row-gap: 8px;
          }
          .csd-vp-item-title { font-size: 17px; min-width: 0; }
          .csd-vp-item-metric {
            grid-column: 1;
            grid-row: auto;
            flex-direction: row;
            align-items: baseline;
            justify-content: flex-start;
            gap: 8px;
            padding-left: 0;
            margin-top: 0;
            text-align: left;
          }
          .csd-vp-item-metric-value { font-size: 16px; }
          .csd-vp-item-desc { max-width: 100%; }
          .csd-vp-media {
            min-height: 280px;
            aspect-ratio: 4 / 3;
            width: 100%;
            max-width: 100%;
            justify-self: stretch;
            margin-inline: 0;
          }

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
