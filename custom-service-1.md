// Custom Web Application Development — Sub-service page
// Reusable layout: replace DATA constants for other sub-services.
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
// Swap these constants when reusing this template for another sub-service.

const PAGE = {
  parent: { label: "Custom Software Development", href: "/services/custom-software-development" },
  bin: "0001",
  eyebrow: "Custom Web Application Development",
  // Headline split into 3 parts; the third renders italic.
  headline1: "Web applications",
  headline2: "engineered for",
  headlineItalic: "performance.",
  lead:
    "Production-grade web apps built on modern stacks — Next.js, React, Node, and Postgres — tuned for speed, resilience, and the kind of architecture that won't need a rewrite in two years.",
  heroImage:
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80&auto=format&fit=crop",
  heroImageAlt: "Engineering team collaborating on a custom web application architecture",
};

// Section 2 — Why a Custom Web App Is a Growth Engine (4 value props, image-left + content-right)
const GROWTH = {
  image:
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1400&q=80&auto=format&fit=crop",
  imageAlt: "Custom web application interface on a high-resolution display",
  title: "A custom web app is a",
  titleAccent: "growth engine.",
  lead:
    "Off-the-shelf software flattens you against competitors. A purpose-built web application becomes the operational backbone — faster to evolve, cheaper to scale, and aligned to how your business actually works.",
  points: [
    {
      k: "Speed",
      v: "Sub-second load times",
      d: "Edge-rendered pages, optimized bundles, and disciplined runtime budgets keep first interaction under a second on real devices.",
    },
    {
      k: "Scale",
      v: "10× headroom built in",
      d: "Stateless services, queue-backed workers, and observability from day one mean traffic spikes don't become incidents.",
    },
    {
      k: "Ownership",
      v: "Your code, your IP",
      d: "Full source, infrastructure, and credentials transfer to you. No vendor lock-in, no licensing tax, no surprises at renewal.",
    },
    {
      k: "Velocity",
      v: "Weekly shippable builds",
      d: "Feature-flagged releases and CI/CD pipelines let your team ship to production every week without rollout anxiety.",
    },
  ],
};

// Section 3 — The Cost of Neglecting Web Performance (content-left + image-right)
const COST = {
  image:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format&fit=crop",
  imageAlt: "Analytics dashboard showing performance metrics and conversion data",
  title: "The cost of getting it",
  titleAccent: "wrong.",
  lead:
    "Most failed web apps don't fail at launch — they fail in the first 90 days. The pattern is consistent and almost always preventable.",
  items: [
    {
      h: "Bloated bundles",
      d: "Megabytes of unused JavaScript collapse mobile performance and quietly kill conversion on slower networks.",
    },
    {
      h: "Brittle architecture",
      d: "A single shared database and tightly coupled services make every new feature a coordination tax instead of a velocity gain.",
    },
    {
      h: "Missing observability",
      d: "Without structured logs, traces, and real-user monitoring, you discover regressions from customer tickets — not dashboards.",
    },
    {
      h: "No accessibility baseline",
      d: "Skipping WCAG and keyboard support narrows your audience, exposes you to legal risk, and makes refactors far more expensive later.",
    },
  ],
  close:
    "We engineer around every one of these failure modes — performance, architecture, observability, and accessibility are non-negotiable defaults, not upsells.",
};

// Section 4 — How We Build (process steps, condensed)
const PROCESS = [
  {
    num: "01",
    title: "Discovery & architecture",
    d: "Stakeholder interviews, technical audit, and a written architecture brief. Two-week sprint, fixed price.",
  },
  {
    num: "02",
    title: "UX & interface design",
    d: "Flows, wireframes, and high-fidelity UI tied to a design token system that scales with your product.",
  },
  {
    num: "03",
    title: "Engineering sprints",
    d: "Two-week sprints, weekly demos, CI/CD from day one. You see working software every Friday.",
  },
  {
    num: "04",
    title: "QA & performance",
    d: "Automated test suites, cross-device QA, Lighthouse budgets, and load testing before any production traffic.",
  },
  {
    num: "05",
    title: "Launch & monitor",
    d: "Phased rollout with feature flags, real-user monitoring, and a rollback plan written before go-live.",
  },
  {
    num: "06",
    title: "Iterate & support",
    d: "SLA-backed retainer covering bug fixes, security patches, and roadmap work. You're never locked in.",
  },
];

// Section 5 — Stack
const STACK = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { group: "Backend", items: ["Node.js", "Python", "Go", "GraphQL"] },
  { group: "Data", items: ["PostgreSQL", "Redis", "Elasticsearch", "S3"] },
  { group: "Infra", items: ["AWS", "GCP", "Docker", "Terraform"] },
];

// Section 6 — FAQs
const FAQS = [
  {
    q: "How much does a custom web application cost?",
    a: "Most custom web app builds fall between $40K and $180K depending on scope, integrations, and team size. We provide fixed-price proposals after a paid two-week discovery sprint so the budget is locked before engineering begins.",
  },
  {
    q: "How long does it take to build?",
    a: "MVPs typically take 8–12 weeks. Full production builds run 14–22 weeks. We share a detailed milestone schedule during the proposal phase, with weekly demos you can hold us to.",
  },
  {
    q: "What stack do you use?",
    a: "TypeScript end-to-end is our default — React or Next.js on the frontend, Node on the backend, Postgres for data, and AWS or GCP for infrastructure. We choose tooling based on your problem, not because it's trendy.",
  },
  {
    q: "Do you handle design too?",
    a: "Yes. UX flows, wireframes, high-fidelity UI, and a design token system are part of the standard engagement. If you have a design partner already, we plug in cleanly with Figma handoff.",
  },
  {
    q: "What happens after launch?",
    a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and feature work. Many clients keep us on as a fractional engineering team. All code and infrastructure transfer to you on day one.",
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function CustomWebAppPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis smooth scroll (matches main service page)
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

  // Reveal animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero intro — character split on headline
      const heroTl = gsap.timeline({ delay: 0.1 });
      const chars = gsap.utils.toArray<HTMLElement>(".cwa-h1-char");
      heroTl.fromTo(
        chars,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.85,
          stagger: { each: 0.018 },
          ease: "power4.out",
        },
        0
      );
      heroTl.fromTo(
        ".cwa-hero-fade",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.55
      );
      heroTl.fromTo(
        ".cwa-hero-media",
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
        0.4
      );

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
          onEnter: (batch) =>
            gsap.to(batch, { ...to, stagger: 0.08, overwrite: true }),
        });
      };

      setupBatch(".cwa-sh", { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" });
      setupBatch(".cwa-growth-item", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
      setupBatch(".cwa-cost-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
      setupBatch(".cwa-process-row", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "top 90%");
      setupBatch(".cwa-stack-col", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
      setupBatch(".cwa-faq-row", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "top 92%");

      gsap.fromTo(
        ".cwa-cta-inner",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".cwa-cta-inner", start: "top 85%" },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      {/* Grain overlay — matches main service page */}
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
            SECTION 1 — HERO (split: copy left, image right)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-hero" aria-labelledby="cwa-hero-title">
          <div className="cwa-hero-inner">
            <div className="cwa-hero-grid">
              {/* LEFT — copy */}
              <div className="cwa-hero-copy">
                {/* Breadcrumb */}
                <nav className="cwa-crumb" aria-label="Breadcrumb">
                  <Link href="/services" className="cwa-crumb-link">Services</Link>
                  <span className="cwa-crumb-sep" aria-hidden>/</span>
                  <Link href={PAGE.parent.href} className="cwa-crumb-link">
                    {PAGE.parent.label}
                  </Link>
                  <span className="cwa-crumb-sep" aria-hidden>/</span>
                  <span className="cwa-crumb-current">Custom Web Application</span>
                </nav>

                {/* Eyebrow */}
                <div className="cwa-hero-fade cwa-eyebrow" style={{ opacity: 0 }}>
                  <span className="cwa-eyebrow-bin">{PAGE.bin}</span>
                  <span className="cwa-eyebrow-dot" />
                  <span>{PAGE.eyebrow}</span>
                </div>

                {/* Headline with character split */}
                <h1 id="cwa-hero-title" className="cwa-hero-title">
                  <span className="cwa-h1-line">
                    {PAGE.headline1.split("").map((c, i) => (
                      <span key={`a-${i}`} className="cwa-h1-char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </span>
                  <span className="cwa-h1-line">
                    {PAGE.headline2.split("").map((c, i) => (
                      <span key={`b-${i}`} className="cwa-h1-char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </span>
                  <span className="cwa-h1-line">
                    <span className="cwa-h1-italic">
                      {PAGE.headlineItalic.split("").map((c, i) => (
                        <span key={`c-${i}`} className="cwa-h1-char">
                          {c === " " ? "\u00A0" : c}
                        </span>
                      ))}
                    </span>
                  </span>
                </h1>

                <p className="cwa-hero-fade cwa-hero-lead" style={{ opacity: 0 }}>
                  {PAGE.lead}
                </p>

                <div className="cwa-hero-fade cwa-hero-cta-row" style={{ opacity: 0 }}>
                  <Link href="/contact" className="cwa-cta-primary">
                    <span>Plan my build</span>
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
                  </Link>
                  <a href="#process" className="cwa-cta-ghost">
                    See our process
                  </a>
                </div>

                {/* Mini proof strip */}
                <dl className="cwa-hero-fade cwa-hero-proof" style={{ opacity: 0 }}>
                  <div>
                    <dt>Avg Lighthouse</dt>
                    <dd>98+</dd>
                  </div>
                  <div>
                    <dt>Time to MVP</dt>
                    <dd>8–12 wks</dd>
                  </div>
                  <div>
                    <dt>Stack</dt>
                    <dd>TS · Node · PG</dd>
                  </div>
                </dl>
              </div>

              {/* RIGHT — image */}
              <div className="cwa-hero-media" aria-hidden style={{ opacity: 0 }}>
                <img src={PAGE.heroImage} alt={PAGE.heroImageAlt} />
                <div className="cwa-hero-media-overlay" />
                <div className="cwa-hero-media-tag">
                  <span className="cwa-hero-media-tag-dot" />
                  Engineered with intent
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — WHY A CUSTOM WEB APP IS A GROWTH ENGINE
            Layout: image LEFT, content RIGHT
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-split-section" aria-labelledby="cwa-growth-title">
          <div className="cwa-split-grid">
            {/* LEFT — image */}
            <div className="cwa-split-media" aria-hidden>
              <img src={GROWTH.image} alt={GROWTH.imageAlt} loading="lazy" />
              <div className="cwa-split-media-overlay" />
            </div>

            {/* RIGHT — content */}
            <div className="cwa-split-content cwa-sh">
              <h2 id="cwa-growth-title" className="cwa-h2">
                {GROWTH.title} <span className="cwa-italic-mute">{GROWTH.titleAccent}</span>
              </h2>
              <p className="cwa-h2-lead">{GROWTH.lead}</p>

              <ul className="cwa-growth-list" role="list">
                {GROWTH.points.map((p, i) => (
                  <li key={p.k} className="cwa-growth-item">
                    <div className="cwa-growth-num">
                      <span style={{ fontFamily: "var(--font-mono)" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="cwa-growth-body">
                      <div className="cwa-growth-head">
                        <h3 className="cwa-growth-title">{p.k}</h3>
                        <span className="cwa-growth-metric">{p.v}</span>
                      </div>
                      <p className="cwa-growth-desc">{p.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 3 — THE COST OF GETTING IT WRONG
            Layout: content LEFT, image RIGHT (mirror of section 2)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-split-section cwa-split-section--alt" aria-labelledby="cwa-cost-title">
          <div className="cwa-split-grid cwa-split-grid--reverse">
            {/* LEFT — content */}
            <div className="cwa-split-content cwa-sh">
              <h2 id="cwa-cost-title" className="cwa-h2">
                {COST.title} <span className="cwa-italic-mute">{COST.titleAccent}</span>
              </h2>
              <p className="cwa-h2-lead">{COST.lead}</p>

              <ul className="cwa-cost-list" role="list">
                {COST.items.map((c) => (
                  <li key={c.h} className="cwa-cost-item">
                    <span className="cwa-cost-mark" aria-hidden />
                    <div>
                      <strong>{c.h}.</strong> {c.d}
                    </div>
                  </li>
                ))}
              </ul>

              <p className="cwa-cost-close">{COST.close}</p>
            </div>

            {/* RIGHT — image */}
            <div className="cwa-split-media" aria-hidden>
              <img src={COST.image} alt={COST.imageAlt} loading="lazy" />
              <div className="cwa-split-media-overlay" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — HOW WE BUILD (compact process list)
        ═══════════════════════════════════════════════════════════════ */}
        <section id="process" className="cwa-process-section" aria-labelledby="cwa-process-title">
          <div className="cwa-process-inner">
            <div className="cwa-sh cwa-process-header">
              <h2 id="cwa-process-title" className="cwa-h2 cwa-h2-light">
                How we build —{" "}
                <span className="cwa-italic-light">six phases, one team.</span>
              </h2>
              <p className="cwa-h2-lead cwa-h2-lead-light">
                A delivery rhythm refined across 150+ shipped products. No surprises,
                no shipping and praying.
              </p>
            </div>

            <ol className="cwa-process-list">
              {PROCESS.map((s) => (
                <li key={s.num} className="cwa-process-row">
                  <span className="cwa-process-num">{s.num}</span>
                  <h3 className="cwa-process-title">{s.title}</h3>
                  <p className="cwa-process-desc">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 — STACK (clean grouped grid)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-stack-section" aria-labelledby="cwa-stack-title">
          <div className="cwa-stack-inner">
            <div className="cwa-sh cwa-stack-header">
              <h2 id="cwa-stack-title" className="cwa-h2">
                Tooling we <span className="cwa-italic-mute">trust.</span>
              </h2>
              <p className="cwa-h2-lead">
                Mature, production-ready stacks — picked for your problem, not
                because they're new.
              </p>
            </div>

            <div className="cwa-stack-grid">
              {STACK.map((g) => (
                <div key={g.group} className="cwa-stack-col">
                  <div className="cwa-stack-group">{g.group}</div>
                  <ul className="cwa-stack-items" role="list">
                    {g.items.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ))}
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
                Real questions from real prospects. If yours isn't here, send us a
                note — we answer every inquiry within 24 hours.
              </p>
              <Link href="/contact" className="cwa-faq-cta">
                Ask us anything
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
              </Link>
            </div>

            <div className="cwa-faq-list">
              {FAQS.map((f, i) => {
                const isOpen = openFaq === i;
                return (
                  <div
                    key={i}
                    className="cwa-faq-row"
                    data-open={isOpen ? "true" : "false"}
                  >
                    <button
                      type="button"
                      className="cwa-faq-q"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      suppressHydrationWarning
                    >
                      <span className="cwa-faq-q-num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="cwa-faq-q-text">{f.q}</span>
                      <span className="cwa-faq-q-icon" aria-hidden>
                        <svg width="14" height="14" viewBox="0 0 14 14">
                          <path
                            d="M3 7h8 M7 3v8"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
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
            SECTION 7 — FINAL CTA
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cwa-cta-section" aria-labelledby="cwa-cta-title">
          <div className="cwa-cta-inner">
            <div className="cwa-cta-grid">
              <div className="cwa-cta-left">
                <h2 id="cwa-cta-title" className="cwa-cta-h2">
                  Ready to ship a web app{" "}
                  <span className="cwa-cta-h2-accent">that lasts?</span>
                </h2>
                <p className="cwa-cta-lead">
                  Free 30-minute discovery call. You'll talk directly with an
                  engineer and a strategist — no sales pitch, just a real
                  conversation about your problem and timeline.
                </p>
                <div className="cwa-cta-actions">
                  <Link href="/contact" className="cwa-cta-primary-light">
                    <span>Book a discovery call</span>
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
                  </Link>
                  <a href="mailto:hello@techbinaries.com" className="cwa-cta-mail">
                    hello@techbinaries.com
                  </a>
                </div>
              </div>

              <div className="cwa-cta-right">
                <dl className="cwa-cta-meta">
                  <div className="cwa-cta-meta-item">
                    <dt>Response time</dt>
                    <dd>Within 24h</dd>
                  </div>
                  <div className="cwa-cta-meta-item">
                    <dt>MVP timeline</dt>
                    <dd>8–12 weeks</dd>
                  </div>
                  <div className="cwa-cta-meta-item">
                    <dt>Engagement</dt>
                    <dd>Fixed or T&amp;M</dd>
                  </div>
                  <div className="cwa-cta-meta-item">
                    <dt>Based in</dt>
                    <dd>Global · remote</dd>
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
           SHARED PRIMITIVES (mirror of main service page)
        ═══════════════════════════════════════════════════════════════ */
        .cwa-h2 {
          font-family: var(--font-display);
          font-size: clamp(32px, 4.4vw, 60px);
          font-weight: 500;
          letter-spacing: -0.032em;
          line-height: 1.02;
          margin: 0 0 18px;
          max-width: 620px;
        }
        .cwa-h2-light { color: #fafaf9; max-width: 760px; }
        .cwa-italic-mute {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.5);
        }
        .cwa-italic-light {
          font-style: italic;
          font-weight: 400;
          color: rgba(255,255,255,0.6);
        }
        .cwa-h2-lead {
          font-size: 16px;
          color: rgba(10,10,10,0.62);
          line-height: 1.7;
          margin: 0 0 32px;
          max-width: 540px;
        }
        .cwa-h2-lead-light { color: rgba(255,255,255,0.62); max-width: 460px; }

        .cwa-cta-primary {
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
          transition: background 0.25s, transform 0.25s;
        }
        .cwa-cta-primary:hover {
          background: #262626;
          transform: translateY(-1px);
        }
        .cwa-cta-primary svg { transition: transform 0.25s ease; }
        .cwa-cta-primary:hover svg { transform: translateX(2px); }

        .cwa-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 24px;
          border: 1px solid rgba(10,10,10,0.85);
          color: #0a0a0a;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 999px;
          transition: background 0.2s, color 0.2s;
        }
        .cwa-cta-ghost:hover {
          background: #0a0a0a;
          color: #fafaf9;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 1 — HERO
        ═══════════════════════════════════════════════════════════════ */
        .cwa-hero {
          position: relative;
          padding: clamp(140px, 18vh, 200px) 20px clamp(64px, 8vh, 96px);
          background: #fafaf9;
          overflow: hidden;
        }
        .cwa-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(10,10,10,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 90%);
          pointer-events: none;
        }
        .cwa-hero-inner {
          position: relative;
          max-width: 1320px;
          margin: 0 auto;
        }
        .cwa-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          gap: clamp(40px, 5vw, 88px);
          align-items: center;
        }
        .cwa-hero-copy { min-width: 0; }

        /* Breadcrumb */
        .cwa-crumb {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.06em;
          color: rgba(10,10,10,0.5);
          margin-bottom: 28px;
        }
        .cwa-crumb-link {
          color: rgba(10,10,10,0.55);
          text-decoration: none;
          transition: color 0.2s;
        }
        .cwa-crumb-link:hover { color: #0a0a0a; }
        .cwa-crumb-sep { opacity: 0.4; }
        .cwa-crumb-current { color: #0a0a0a; }

        /* Eyebrow pill */
        .cwa-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 7px 14px 7px 10px;
          border: 1px solid rgba(10,10,10,0.12);
          background: rgba(255,255,255,0.7);
          border-radius: 999px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.7);
          margin-bottom: 24px;
        }
        .cwa-eyebrow-bin {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 2px 8px;
          background: #0a0a0a;
          color: #fafaf9;
          border-radius: 999px;
          letter-spacing: 0.1em;
        }
        .cwa-eyebrow-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(10,10,10,0.4);
        }

        /* Headline with character split */
        .cwa-hero-title {
          font-family: var(--font-display);
          font-size: clamp(38px, 5.4vw, 78px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.99;
          margin: 0 0 24px;
          color: #0a0a0a;
        }
        .cwa-h1-line {
          display: block;
          padding-bottom: 0.05em;
          overflow: visible;
        }
        .cwa-h1-char {
          display: inline-block;
          will-change: transform;
        }
        .cwa-h1-italic {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.55);
        }

        .cwa-hero-lead {
          font-size: 16px;
          color: rgba(10,10,10,0.65);
          line-height: 1.72;
          max-width: 540px;
          margin: 0 0 32px;
        }

        .cwa-hero-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 48px;
        }

        /* Hero proof strip */
        .cwa-hero-proof {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: 0;
          margin: 0;
          border-top: 1px solid rgba(10,10,10,0.1);
          padding-top: 24px;
          max-width: 540px;
        }
        .cwa-hero-proof > div {
          padding-right: 32px;
          border-right: 1px solid rgba(10,10,10,0.08);
        }
        .cwa-hero-proof > div:not(:first-child) { padding-left: 32px; }
        .cwa-hero-proof > div:last-child { border-right: 0; padding-right: 0; }
        .cwa-hero-proof dt {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
          margin: 0 0 6px;
        }
        .cwa-hero-proof dd {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.025em;
          color: #0a0a0a;
          margin: 0;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }

        /* Hero media */
        .cwa-hero-media {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 24px;
          overflow: hidden;
          background: #0a0a0a;
          box-shadow: 0 40px 90px -50px rgba(0,0,0,0.4);
        }
        .cwa-hero-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.06) contrast(1.04);
          transition: transform 1.4s cubic-bezier(0.22,1,0.36,1);
        }
        .cwa-hero-media:hover img { transform: scale(1.04); }
        .cwa-hero-media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.4) 100%);
          pointer-events: none;
        }
        .cwa-hero-media-tag {
          position: absolute;
          bottom: 22px;
          left: 22px;
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
        .cwa-hero-media-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.18);
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 2 / 3 — SPLIT (image + content)
        ═══════════════════════════════════════════════════════════════ */
        .cwa-split-section {
          background: #f5f5f4;
          padding-left: max(clamp(14px, 2.4vw, 32px), env(safe-area-inset-left, 0px));
          padding-right: max(clamp(14px, 2.4vw, 32px), env(safe-area-inset-right, 0px));
          padding-top: clamp(56px, 7vw, 88px);
          padding-bottom: clamp(56px, 7vw, 88px);
        }
        .cwa-split-section--alt { background: #fafaf9; }

        .cwa-split-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: clamp(32px, 4vw, 72px);
          align-items: stretch;
          max-width: 1320px;
          margin: 0 auto;
          min-height: 560px;
        }
        .cwa-split-grid--reverse { grid-template-columns: 1.05fr 0.95fr; }

        .cwa-split-media {
          position: relative;
          overflow: hidden;
          background: #0a0a0a;
          border-radius: clamp(20px, 2.4vw, 28px);
          min-height: 420px;
        }
        .cwa-split-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(1.06) contrast(1.04);
          transition: transform 1.2s cubic-bezier(0.22,1,0.36,1);
        }
        .cwa-split-section:hover .cwa-split-media img { transform: scale(1.03); }
        .cwa-split-media-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(10,10,10,0.12) 0%, rgba(10,10,10,0.42) 100%);
          pointer-events: none;
        }

        .cwa-split-content {
          padding: clamp(32px, 4vw, 56px) clamp(8px, 2vw, 24px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Section 2 — growth list */
        .cwa-growth-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
          max-width: 560px;
        }
        .cwa-growth-item {
          display: grid;
          grid-template-columns: 36px 1fr;
          gap: 16px;
          padding: 18px 0;
          border-top: 1px solid rgba(10,10,10,0.1);
        }
        .cwa-growth-item:last-child { border-bottom: 1px solid rgba(10,10,10,0.1); }
        .cwa-growth-num {
          font-family: var(--font-mono);
          font-size: 11px;
          color: rgba(10,10,10,0.45);
          letter-spacing: 0.06em;
          padding-top: 4px;
        }
        .cwa-growth-body {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          column-gap: 20px;
          row-gap: 8px;
          align-items: start;
        }
        .cwa-growth-head { display: contents; }
        .cwa-growth-title {
          font-family: var(--font-display);
          font-size: 19px;
          font-weight: 500;
          letter-spacing: -0.018em;
          line-height: 1.2;
          margin: 0;
          color: #0a0a0a;
          grid-column: 1;
        }
        .cwa-growth-metric {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: rgba(10,10,10,0.55);
          padding: 4px 10px;
          background: rgba(10,10,10,0.05);
          border-radius: 999px;
          white-space: nowrap;
          grid-column: 2;
          grid-row: 1;
          justify-self: end;
        }
        .cwa-growth-desc {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(10,10,10,0.62);
          margin: 0;
          grid-column: 1 / -1;
          max-width: 46ch;
        }

        /* Section 3 — cost list */
        .cwa-cost-list {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-width: 540px;
        }
        .cwa-cost-item {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 14px;
          align-items: start;
          font-size: 14.5px;
          line-height: 1.62;
          color: rgba(10,10,10,0.7);
        }
        .cwa-cost-item strong {
          color: #0a0a0a;
          font-weight: 600;
        }
        .cwa-cost-mark {
          position: relative;
          width: 18px;
          height: 22px;
          flex-shrink: 0;
        }
        .cwa-cost-mark::before {
          content: "";
          position: absolute;
          top: 9px;
          left: 0;
          width: 12px;
          height: 1px;
          background: #0a0a0a;
        }
        .cwa-cost-mark::after {
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
        .cwa-cost-close {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(10,10,10,0.6);
          margin: 0;
          padding-top: 22px;
          border-top: 1px solid rgba(10,10,10,0.1);
          max-width: 540px;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 4 — PROCESS (dark, grid)
        ═══════════════════════════════════════════════════════════════ */
        .cwa-process-section {
          padding: clamp(80px, 10vw, 140px) 20px;
          background: #0a0a0a;
          color: #fafaf9;
          position: relative;
          overflow: hidden;
        }
        .cwa-process-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .cwa-process-inner {
          position: relative;
          max-width: 1320px;
          margin: 0 auto;
        }
        .cwa-process-header {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: clamp(48px, 6vw, 72px);
        }
        .cwa-process-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          border-left: 1px solid rgba(255,255,255,0.1);
        }
        .cwa-process-row {
          padding: 32px 28px 36px;
          border-right: 1px solid rgba(255,255,255,0.1);
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          gap: 14px;
          background: rgba(255,255,255,0.01);
          transition: background 0.3s ease;
          position: relative;
        }
        .cwa-process-row:hover { background: rgba(255,255,255,0.03); }
        .cwa-process-num {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 500;
          letter-spacing: -0.04em;
          color: rgba(255,255,255,0.25);
          font-variant-numeric: tabular-nums;
          line-height: 1;
        }
        .cwa-process-title {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.18;
          margin: 0;
          color: #fafaf9;
        }
        .cwa-process-desc {
          font-size: 14px;
          line-height: 1.65;
          color: rgba(255,255,255,0.6);
          margin: 0;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 5 — STACK
        ═══════════════════════════════════════════════════════════════ */
        .cwa-stack-section {
          padding: clamp(80px, 10vw, 130px) 20px;
          background: #fafaf9;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .cwa-stack-inner {
          max-width: 1320px;
          margin: 0 auto;
        }
        .cwa-stack-header {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: clamp(40px, 5vw, 56px);
        }
        .cwa-stack-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid rgba(10,10,10,0.1);
          border-left: 1px solid rgba(10,10,10,0.1);
        }
        .cwa-stack-col {
          padding: 28px 26px 30px;
          border-right: 1px solid rgba(10,10,10,0.1);
          border-bottom: 1px solid rgba(10,10,10,0.1);
          background: #fafaf9;
          transition: background 0.3s ease;
        }
        .cwa-stack-col:hover { background: rgba(10,10,10,0.025); }
        .cwa-stack-group {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.5);
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(10,10,10,0.08);
        }
        .cwa-stack-items {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .cwa-stack-items li {
          font-family: var(--font-display);
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -0.018em;
          color: #0a0a0a;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 6 — FAQs
        ═══════════════════════════════════════════════════════════════ */
        .cwa-faq-section {
          padding: clamp(80px, 10vw, 140px) 20px;
          background: #f5f5f4;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .cwa-faq-layout {
          max-width: 1320px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 80px;
          align-items: start;
        }
        .cwa-faq-aside { position: sticky; top: 120px; }
        .cwa-faq-lead { margin-bottom: 24px; }
        .cwa-faq-cta {
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
        .cwa-faq-cta:hover { background: #0a0a0a; color: #fafaf9; }

        .cwa-faq-list {
          display: flex;
          flex-direction: column;
          border-top: 1px solid rgba(10,10,10,0.1);
        }
        .cwa-faq-row { border-bottom: 1px solid rgba(10,10,10,0.1); }
        .cwa-faq-q {
          width: 100%;
          display: grid;
          grid-template-columns: 50px 1fr 30px;
          align-items: center;
          gap: 16px;
          padding: 22px 0;
          background: transparent;
          border: 0;
          cursor: pointer;
          text-align: left;
          color: #0a0a0a;
          font-family: var(--font-display);
        }
        .cwa-faq-q-num {
          font-family: var(--font-mono);
          font-size: 12px;
          font-weight: 500;
          color: rgba(10,10,10,0.4);
          letter-spacing: 0.06em;
        }
        .cwa-faq-q-text {
          font-family: var(--font-display);
          font-size: clamp(16px, 1.5vw, 20px);
          font-weight: 500;
          letter-spacing: -0.018em;
          line-height: 1.32;
        }
        .cwa-faq-q-icon {
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(10,10,10,0.18);
          border-radius: 50%;
          color: #0a0a0a;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      background 0.25s, color 0.25s, border-color 0.25s;
        }
        .cwa-faq-row[data-open="true"] .cwa-faq-q-icon {
          transform: rotate(45deg);
          background: #0a0a0a;
          color: #fafaf9;
          border-color: #0a0a0a;
        }
        .cwa-faq-a {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .cwa-faq-row[data-open="true"] .cwa-faq-a { grid-template-rows: 1fr; }
        .cwa-faq-a-inner {
          overflow: hidden;
          padding-left: 66px;
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.7;
          color: rgba(10,10,10,0.65);
          padding-bottom: 0;
          transition: padding-bottom 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .cwa-faq-row[data-open="true"] .cwa-faq-a-inner { padding-bottom: 26px; }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 7 — FINAL CTA
        ═══════════════════════════════════════════════════════════════ */
        .cwa-cta-section {
          padding: 64px 20px 80px;
          background: #fafaf9;
        }
        .cwa-cta-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: clamp(72px, 9vw, 120px) clamp(32px, 5vw, 80px);
          background: #0a0a0a;
          color: #fafaf9;
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          opacity: 0;
        }
        .cwa-cta-inner::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 90%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 90%);
          pointer-events: none;
        }
        .cwa-cta-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: clamp(48px, 6vw, 96px);
          align-items: end;
        }
        .cwa-cta-h2 {
          font-family: var(--font-display);
          font-size: clamp(36px, 5.2vw, 72px);
          font-weight: 500;
          letter-spacing: -0.04em;
          line-height: 0.98;
          margin: 0 0 24px;
          color: #fafaf9;
          max-width: 620px;
        }
        .cwa-cta-h2-accent {
          font-style: italic;
          font-weight: 400;
          color: rgba(255,255,255,0.55);
        }
        .cwa-cta-lead {
          font-size: 16px;
          line-height: 1.7;
          color: rgba(255,255,255,0.65);
          margin: 0 0 36px;
          max-width: 520px;
        }
        .cwa-cta-actions {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .cwa-cta-primary-light {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 15px 28px;
          background: #fafaf9;
          color: #0a0a0a;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          border-radius: 999px;
          transition: background 0.25s, transform 0.25s;
        }
        .cwa-cta-primary-light:hover {
          background: #e7e5e4;
          transform: translateX(2px);
        }
        .cwa-cta-primary-light svg { transition: transform 0.25s; }
        .cwa-cta-primary-light:hover svg { transform: translateX(2px); }

        .cwa-cta-mail {
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.65);
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.25);
          padding-bottom: 2px;
          transition: color 0.2s, border-color 0.2s;
        }
        .cwa-cta-mail:hover {
          color: #fafaf9;
          border-color: #fafaf9;
        }

        .cwa-cta-right {
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }
        .cwa-cta-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          margin: 0;
          border-top: 1px solid rgba(255,255,255,0.12);
          border-left: 1px solid rgba(255,255,255,0.12);
        }
        .cwa-cta-meta-item {
          padding: 22px 24px;
          border-right: 1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.02);
        }
        .cwa-cta-meta-item dt {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          margin: 0 0 8px;
        }
        .cwa-cta-meta-item dd {
          font-family: var(--font-display);
          font-size: 17px;
          font-weight: 500;
          letter-spacing: -0.018em;
          color: #fafaf9;
          margin: 0;
        }

        /* ═══════════════════════════════════════════════════════════════
           RESPONSIVE
        ═══════════════════════════════════════════════════════════════ */
        @media (max-width: 1100px) {
          .cwa-hero-grid {
            grid-template-columns: 1fr;
            gap: 56px;
          }
          .cwa-hero-media {
            max-width: 640px;
            margin: 0 auto;
            width: 100%;
            aspect-ratio: 16 / 10;
          }

          .cwa-split-grid,
          .cwa-split-grid--reverse {
            grid-template-columns: 1fr;
            min-height: auto;
          }
          .cwa-split-grid--reverse .cwa-split-content { order: 2; }
          .cwa-split-grid--reverse .cwa-split-media { order: 1; }
          .cwa-split-media {
            min-height: 320px;
            aspect-ratio: 16 / 9;
          }

          .cwa-process-list { grid-template-columns: repeat(2, 1fr); }
          .cwa-stack-grid { grid-template-columns: repeat(2, 1fr); }

          .cwa-faq-layout { grid-template-columns: 1fr; gap: 48px; }
          .cwa-faq-aside { position: static; }

          .cwa-cta-grid {
            grid-template-columns: 1fr;
            gap: 48px;
            align-items: start;
          }
        }

        @media (max-width: 768px) {
          .cwa-hero {
            padding: 120px 14px 60px;
          }
          .cwa-hero-title {
            font-size: clamp(30px, 8vw, 44px);
          }
          .cwa-hero-lead { font-size: 15px; margin-bottom: 24px; }
          .cwa-hero-cta-row { gap: 10px; margin-bottom: 32px; }
          .cwa-hero-proof {
            grid-template-columns: 1fr 1fr;
            gap: 0;
          }
          .cwa-hero-proof > div {
            padding: 14px 16px;
            border-right: 1px solid rgba(10,10,10,0.08);
            border-bottom: 1px solid rgba(10,10,10,0.08);
          }
          .cwa-hero-proof > div:nth-child(2) { border-right: 0; }
          .cwa-hero-proof > div:nth-child(3) {
            border-bottom: 0;
            grid-column: 1 / -1;
            border-right: 0;
          }
          .cwa-hero-proof > div:not(:first-child) { padding-left: 16px; }

          .cwa-split-section {
            padding-left: max(14px, env(safe-area-inset-left, 0px));
            padding-right: max(14px, env(safe-area-inset-right, 0px));
            padding-top: 60px;
            padding-bottom: 60px;
          }
          .cwa-split-content { padding: 32px 0 0; }
          .cwa-split-media { aspect-ratio: 4 / 3; min-height: 280px; }

          .cwa-growth-body {
            grid-template-columns: 1fr;
            row-gap: 8px;
          }
          .cwa-growth-metric {
            grid-row: auto;
            justify-self: start;
          }

          .cwa-process-section {
            padding: 72px 14px;
          }
          .cwa-process-list { grid-template-columns: 1fr; }
          .cwa-process-row { padding: 26px 22px 28px; }

          .cwa-stack-section { padding: 72px 14px; }
          .cwa-stack-grid { grid-template-columns: 1fr 1fr; }
          .cwa-stack-col { padding: 22px 18px 24px; }
          .cwa-stack-items li { font-size: 16px; }

          .cwa-faq-section { padding: 72px 14px; }
          .cwa-faq-q {
            grid-template-columns: 36px 1fr 26px;
            gap: 12px;
            padding: 18px 0;
          }
          .cwa-faq-q-icon { width: 26px; height: 26px; }
          .cwa-faq-a-inner { padding-left: 48px; font-size: 14px; }
          .cwa-faq-row[data-open="true"] .cwa-faq-a-inner { padding-bottom: 22px; }

          .cwa-cta-section { padding: 48px 14px 56px; }
          .cwa-cta-inner { padding: 56px 26px; border-radius: 18px; }
          .cwa-cta-h2 { font-size: clamp(28px, 9vw, 42px); }
          .cwa-cta-meta { grid-template-columns: 1fr; }
          .cwa-cta-meta-item:last-child { border-bottom: 0; }
        }
      `}</style>
    </>
  );
}