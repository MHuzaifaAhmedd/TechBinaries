// // Custom Web Application Development — Sub-service page
// // Reusable layout: replace DATA constants for other sub-services.
// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import Link from "next/link";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";

// gsap.registerPlugin(ScrollTrigger);

// // ── DATA ──────────────────────────────────────────────────────────────────────
// // Swap these constants when reusing this template for another sub-service.

// const PAGE = {
//   parent: { label: "Custom Software Development", href: "/services/custom-software-development" },
//   bin: "0001",
//   eyebrow: "Custom Web Application Development",
//   // Headline split into 3 parts; the third renders italic.
//   headline1: "Web applications",
//   headline2: "engineered for",
//   headlineItalic: "performance.",
//   lead:
//     "Production-grade web apps built on modern stacks — Next.js, React, Node, and Postgres — tuned for speed, resilience, and the kind of architecture that won't need a rewrite in two years.",
//   heroImage:
//     "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1600&q=80&auto=format&fit=crop",
//   heroImageAlt: "Engineering team collaborating on a custom web application architecture",
// };

// // Section 2 — Why a Custom Web App Is a Growth Engine (4 value props, image-left + content-right)
// const GROWTH = {
//   image:
//     "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1400&q=80&auto=format&fit=crop",
//   imageAlt: "Custom web application interface on a high-resolution display",
//   title: "A custom web app is a",
//   titleAccent: "growth engine.",
//   lead:
//     "Off-the-shelf software flattens you against competitors. A purpose-built web application becomes the operational backbone — faster to evolve, cheaper to scale, and aligned to how your business actually works.",
//   points: [
//     {
//       k: "Speed",
//       v: "Sub-second load times",
//       d: "Edge-rendered pages, optimized bundles, and disciplined runtime budgets keep first interaction under a second on real devices.",
//     },
//     {
//       k: "Scale",
//       v: "10× headroom built in",
//       d: "Stateless services, queue-backed workers, and observability from day one mean traffic spikes don't become incidents.",
//     },
//     {
//       k: "Ownership",
//       v: "Your code, your IP",
//       d: "Full source, infrastructure, and credentials transfer to you. No vendor lock-in, no licensing tax, no surprises at renewal.",
//     },
//     {
//       k: "Velocity",
//       v: "Weekly shippable builds",
//       d: "Feature-flagged releases and CI/CD pipelines let your team ship to production every week without rollout anxiety.",
//     },
//   ],
// };

// // Section 3 — The Cost of Neglecting Web Performance (content-left + image-right)
// const COST = {
//   image:
//     "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format&fit=crop",
//   imageAlt: "Analytics dashboard showing performance metrics and conversion data",
//   title: "The cost of getting it",
//   titleAccent: "wrong.",
//   lead:
//     "Most failed web apps don't fail at launch — they fail in the first 90 days. The pattern is consistent and almost always preventable.",
//   items: [
//     {
//       h: "Bloated bundles",
//       d: "Megabytes of unused JavaScript collapse mobile performance and quietly kill conversion on slower networks.",
//     },
//     {
//       h: "Brittle architecture",
//       d: "A single shared database and tightly coupled services make every new feature a coordination tax instead of a velocity gain.",
//     },
//     {
//       h: "Missing observability",
//       d: "Without structured logs, traces, and real-user monitoring, you discover regressions from customer tickets — not dashboards.",
//     },
//     {
//       h: "No accessibility baseline",
//       d: "Skipping WCAG and keyboard support narrows your audience, exposes you to legal risk, and makes refactors far more expensive later.",
//     },
//   ],
//   close:
//     "We engineer around every one of these failure modes — performance, architecture, observability, and accessibility are non-negotiable defaults, not upsells.",
// };

// // Section 4 — How We Build (process steps, condensed)
// const PROCESS = [
//   {
//     num: "01",
//     title: "Discovery & architecture",
//     d: "Stakeholder interviews, technical audit, and a written architecture brief. Two-week sprint, fixed price.",
//   },
//   {
//     num: "02",
//     title: "UX & interface design",
//     d: "Flows, wireframes, and high-fidelity UI tied to a design token system that scales with your product.",
//   },
//   {
//     num: "03",
//     title: "Engineering sprints",
//     d: "Two-week sprints, weekly demos, CI/CD from day one. You see working software every Friday.",
//   },
//   {
//     num: "04",
//     title: "QA & performance",
//     d: "Automated test suites, cross-device QA, Lighthouse budgets, and load testing before any production traffic.",
//   },
//   {
//     num: "05",
//     title: "Launch & monitor",
//     d: "Phased rollout with feature flags, real-user monitoring, and a rollback plan written before go-live.",
//   },
//   {
//     num: "06",
//     title: "Iterate & support",
//     d: "SLA-backed retainer covering bug fixes, security patches, and roadmap work. You're never locked in.",
//   },
// ];

// // Section 5 — Stack
// const STACK = [
//   { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
//   { group: "Backend", items: ["Node.js", "Python", "Go", "GraphQL"] },
//   { group: "Data", items: ["PostgreSQL", "Redis", "Elasticsearch", "S3"] },
//   { group: "Infra", items: ["AWS", "GCP", "Docker", "Terraform"] },
// ];

// // Section 6 — FAQs
// const FAQS = [
//   {
//     q: "How much does a custom web application cost?",
//     a: "Most custom web app builds fall between $40K and $180K depending on scope, integrations, and team size. We provide fixed-price proposals after a paid two-week discovery sprint so the budget is locked before engineering begins.",
//   },
//   {
//     q: "How long does it take to build?",
//     a: "MVPs typically take 8–12 weeks. Full production builds run 14–22 weeks. We share a detailed milestone schedule during the proposal phase, with weekly demos you can hold us to.",
//   },
//   {
//     q: "What stack do you use?",
//     a: "TypeScript end-to-end is our default — React or Next.js on the frontend, Node on the backend, Postgres for data, and AWS or GCP for infrastructure. We choose tooling based on your problem, not because it's trendy.",
//   },
//   {
//     q: "Do you handle design too?",
//     a: "Yes. UX flows, wireframes, high-fidelity UI, and a design token system are part of the standard engagement. If you have a design partner already, we plug in cleanly with Figma handoff.",
//   },
//   {
//     q: "What happens after launch?",
//     a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and feature work. Many clients keep us on as a fractional engineering team. All code and infrastructure transfer to you on day one.",
//   },
// ];

// // ── COMPONENT ─────────────────────────────────────────────────────────────────

// export default function CustomWebAppPage() {
//   const [openFaq, setOpenFaq] = useState<number | null>(0);
//   const lenisRef = useRef<Lenis | null>(null);

//   // Lenis smooth scroll (matches main service page)
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.1,
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       wheelMultiplier: 1,
//       touchMultiplier: 1.4,
//       smoothWheel: true,
//     });
//     lenisRef.current = lenis;
//     lenis.on("scroll", () => ScrollTrigger.update());
//     const ticker = (time: number) => lenis.raf(time * 1000);
//     gsap.ticker.add(ticker);
//     gsap.ticker.lagSmoothing(0);
//     return () => {
//       gsap.ticker.remove(ticker);
//       lenis.destroy();
//       lenisRef.current = null;
//     };
//   }, []);

//   // Reveal animations
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Hero intro — character split on headline
//       const heroTl = gsap.timeline({ delay: 0.1 });
//       const chars = gsap.utils.toArray<HTMLElement>(".cwa-h1-char");
//       heroTl.fromTo(
//         chars,
//         { yPercent: 110, opacity: 0 },
//         {
//           yPercent: 0,
//           opacity: 1,
//           duration: 0.85,
//           stagger: { each: 0.018 },
//           ease: "power4.out",
//         },
//         0
//       );
//       heroTl.fromTo(
//         ".cwa-hero-fade",
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
//         0.55
//       );
//       heroTl.fromTo(
//         ".cwa-hero-media",
//         { opacity: 0, scale: 0.96 },
//         { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
//         0.4
//       );

//       const setupBatch = (
//         selector: string,
//         from: gsap.TweenVars,
//         to: gsap.TweenVars,
//         start = "top 88%"
//       ) => {
//         const items = gsap.utils.toArray<HTMLElement>(selector);
//         if (!items.length) return;
//         gsap.set(items, from);
//         ScrollTrigger.batch(items, {
//           start,
//           once: true,
//           onEnter: (batch) =>
//             gsap.to(batch, { ...to, stagger: 0.08, overwrite: true }),
//         });
//       };

//       setupBatch(".cwa-sh", { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" });
//       setupBatch(".cwa-growth-item", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
//       setupBatch(".cwa-cost-item", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
//       setupBatch(".cwa-process-row", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "top 90%");
//       setupBatch(".cwa-stack-col", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
//       setupBatch(".cwa-faq-row", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "top 92%");

//       gsap.fromTo(
//         ".cwa-cta-inner",
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1,
//           y: 0,
//           duration: 1,
//           ease: "power3.out",
//           scrollTrigger: { trigger: ".cwa-cta-inner", start: "top 85%" },
//         }
//       );
//     });
//     return () => ctx.revert();
//   }, []);

//   useEffect(() => {
//     const fonts = "fonts" in document ? document.fonts : undefined;
//     if (!fonts?.ready) return;
//     fonts.ready.then(() => ScrollTrigger.refresh());
//   }, []);

//   return (
//     <>
//       {/* Grain overlay — matches main service page */}
//       <div
//         aria-hidden
//         style={{
//           position: "fixed",
//           inset: 0,
//           pointerEvents: "none",
//           zIndex: 9997,
//           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: "180px 180px",
//           opacity: 0.028,
//           mixBlendMode: "multiply",
//         }}
//       />

//       <div
//         style={{
//           background: "#fafaf9",
//           color: "#0a0a0a",
//           fontFamily: "var(--font-body)",
//           overflowX: "hidden",
//         }}
//       >
//         <SiteHeader />

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 1 — HERO (split: copy left, image right)
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-hero" aria-labelledby="cwa-hero-title">
//           <div className="cwa-hero-inner">
//             <div className="cwa-hero-grid">
//               {/* LEFT — copy */}
//               <div className="cwa-hero-copy">
//                 {/* Breadcrumb */}
//                 <nav className="cwa-crumb" aria-label="Breadcrumb">
//                   <Link href="/services" className="cwa-crumb-link">Services</Link>
//                   <span className="cwa-crumb-sep" aria-hidden>/</span>
//                   <Link href={PAGE.parent.href} className="cwa-crumb-link">
//                     {PAGE.parent.label}
//                   </Link>
//                   <span className="cwa-crumb-sep" aria-hidden>/</span>
//                   <span className="cwa-crumb-current">Custom Web Application</span>
//                 </nav>

//                 {/* Eyebrow */}
//                 <div className="cwa-hero-fade cwa-eyebrow" style={{ opacity: 0 }}>
//                   <span className="cwa-eyebrow-bin">{PAGE.bin}</span>
//                   <span className="cwa-eyebrow-dot" />
//                   <span>{PAGE.eyebrow}</span>
//                 </div>

//                 {/* Headline with character split */}
//                 <h1 id="cwa-hero-title" className="cwa-hero-title">
//                   <span className="cwa-h1-line">
//                     {PAGE.headline1.split("").map((c, i) => (
//                       <span key={`a-${i}`} className="cwa-h1-char">
//                         {c === " " ? "\u00A0" : c}
//                       </span>
//                     ))}
//                   </span>
//                   <span className="cwa-h1-line">
//                     {PAGE.headline2.split("").map((c, i) => (
//                       <span key={`b-${i}`} className="cwa-h1-char">
//                         {c === " " ? "\u00A0" : c}
//                       </span>
//                     ))}
//                   </span>
//                   <span className="cwa-h1-line">
//                     <span className="cwa-h1-italic">
//                       {PAGE.headlineItalic.split("").map((c, i) => (
//                         <span key={`c-${i}`} className="cwa-h1-char">
//                           {c === " " ? "\u00A0" : c}
//                         </span>
//                       ))}
//                     </span>
//                   </span>
//                 </h1>

//                 <p className="cwa-hero-fade cwa-hero-lead" style={{ opacity: 0 }}>
//                   {PAGE.lead}
//                 </p>

//                 <div className="cwa-hero-fade cwa-hero-cta-row" style={{ opacity: 0 }}>
//                   <Link href="/contact" className="cwa-cta-primary">
//                     <span>Plan my build</span>
//                     <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
//                       <path
//                         d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="1.4"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </Link>
//                   <a href="#process" className="cwa-cta-ghost">
//                     See our process
//                   </a>
//                 </div>

//                 {/* Mini proof strip */}
//                 <dl className="cwa-hero-fade cwa-hero-proof" style={{ opacity: 0 }}>
//                   <div>
//                     <dt>Avg Lighthouse</dt>
//                     <dd>98+</dd>
//                   </div>
//                   <div>
//                     <dt>Time to MVP</dt>
//                     <dd>8–12 wks</dd>
//                   </div>
//                   <div>
//                     <dt>Stack</dt>
//                     <dd>TS · Node · PG</dd>
//                   </div>
//                 </dl>
//               </div>

//               {/* RIGHT — image */}
//               <div className="cwa-hero-media" aria-hidden style={{ opacity: 0 }}>
//                 <img src={PAGE.heroImage} alt={PAGE.heroImageAlt} />
//                 <div className="cwa-hero-media-overlay" />
//                 <div className="cwa-hero-media-tag">
//                   <span className="cwa-hero-media-tag-dot" />
//                   Engineered with intent
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 2 — WHY A CUSTOM WEB APP IS A GROWTH ENGINE
//             Layout: image LEFT, content RIGHT
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-split-section" aria-labelledby="cwa-growth-title">
//           <div className="cwa-split-grid">
//             {/* LEFT — image */}
//             <div className="cwa-split-media" aria-hidden>
//               <img src={GROWTH.image} alt={GROWTH.imageAlt} loading="lazy" />
//               <div className="cwa-split-media-overlay" />
//             </div>

//             {/* RIGHT — content */}
//             <div className="cwa-split-content cwa-sh">
//               <h2 id="cwa-growth-title" className="cwa-h2">
//                 {GROWTH.title} <span className="cwa-italic-mute">{GROWTH.titleAccent}</span>
//               </h2>
//               <p className="cwa-h2-lead">{GROWTH.lead}</p>

//               <ul className="cwa-growth-list" role="list">
//                 {GROWTH.points.map((p, i) => (
//                   <li key={p.k} className="cwa-growth-item">
//                     <div className="cwa-growth-num">
//                       <span style={{ fontFamily: "var(--font-mono)" }}>
//                         {String(i + 1).padStart(2, "0")}
//                       </span>
//                     </div>
//                     <div className="cwa-growth-body">
//                       <div className="cwa-growth-head">
//                         <h3 className="cwa-growth-title">{p.k}</h3>
//                         <span className="cwa-growth-metric">{p.v}</span>
//                       </div>
//                       <p className="cwa-growth-desc">{p.d}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 3 — THE COST OF GETTING IT WRONG
//             Layout: content LEFT, image RIGHT (mirror of section 2)
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-split-section cwa-split-section--alt" aria-labelledby="cwa-cost-title">
//           <div className="cwa-split-grid cwa-split-grid--reverse">
//             {/* LEFT — content */}
//             <div className="cwa-split-content cwa-sh">
//               <h2 id="cwa-cost-title" className="cwa-h2">
//                 {COST.title} <span className="cwa-italic-mute">{COST.titleAccent}</span>
//               </h2>
//               <p className="cwa-h2-lead">{COST.lead}</p>

//               <ul className="cwa-cost-list" role="list">
//                 {COST.items.map((c) => (
//                   <li key={c.h} className="cwa-cost-item">
//                     <span className="cwa-cost-mark" aria-hidden />
//                     <div>
//                       <strong>{c.h}.</strong> {c.d}
//                     </div>
//                   </li>
//                 ))}
//               </ul>

//               <p className="cwa-cost-close">{COST.close}</p>
//             </div>

//             {/* RIGHT — image */}
//             <div className="cwa-split-media" aria-hidden>
//               <img src={COST.image} alt={COST.imageAlt} loading="lazy" />
//               <div className="cwa-split-media-overlay" />
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 4 — HOW WE BUILD (compact process list)
//         ═══════════════════════════════════════════════════════════════ */}
//         <section id="process" className="cwa-process-section" aria-labelledby="cwa-process-title">
//           <div className="cwa-process-inner">
//             <div className="cwa-sh cwa-process-header">
//               <h2 id="cwa-process-title" className="cwa-h2 cwa-h2-light">
//                 How we build —{" "}
//                 <span className="cwa-italic-light">six phases, one team.</span>
//               </h2>
//               <p className="cwa-h2-lead cwa-h2-lead-light">
//                 A delivery rhythm refined across 150+ shipped products. No surprises,
//                 no shipping and praying.
//               </p>
//             </div>

//             <ol className="cwa-process-list">
//               {PROCESS.map((s) => (
//                 <li key={s.num} className="cwa-process-row">
//                   <span className="cwa-process-num">{s.num}</span>
//                   <h3 className="cwa-process-title">{s.title}</h3>
//                   <p className="cwa-process-desc">{s.d}</p>
//                 </li>
//               ))}
//             </ol>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 5 — STACK (clean grouped grid)
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-stack-section" aria-labelledby="cwa-stack-title">
//           <div className="cwa-stack-inner">
//             <div className="cwa-sh cwa-stack-header">
//               <h2 id="cwa-stack-title" className="cwa-h2">
//                 Tooling we <span className="cwa-italic-mute">trust.</span>
//               </h2>
//               <p className="cwa-h2-lead">
//                 Mature, production-ready stacks — picked for your problem, not
//                 because they're new.
//               </p>
//             </div>

//             <div className="cwa-stack-grid">
//               {STACK.map((g) => (
//                 <div key={g.group} className="cwa-stack-col">
//                   <div className="cwa-stack-group">{g.group}</div>
//                   <ul className="cwa-stack-items" role="list">
//                     {g.items.map((t) => (
//                       <li key={t}>{t}</li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 6 — FAQs
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-faq-section" aria-labelledby="cwa-faq-title">
//           <div className="cwa-faq-layout">
//             <div className="cwa-faq-aside cwa-sh">
//               <h2 id="cwa-faq-title" className="cwa-h2">
//                 Frequently <span className="cwa-italic-mute">asked.</span>
//               </h2>
//               <p className="cwa-h2-lead cwa-faq-lead">
//                 Real questions from real prospects. If yours isn't here, send us a
//                 note — we answer every inquiry within 24 hours.
//               </p>
//               <Link href="/contact" className="cwa-faq-cta">
//                 Ask us anything
//                 <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
//                   <path
//                     d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.4"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </Link>
//             </div>

//             <div className="cwa-faq-list">
//               {FAQS.map((f, i) => {
//                 const isOpen = openFaq === i;
//                 return (
//                   <div
//                     key={i}
//                     className="cwa-faq-row"
//                     data-open={isOpen ? "true" : "false"}
//                   >
//                     <button
//                       type="button"
//                       className="cwa-faq-q"
//                       onClick={() => setOpenFaq(isOpen ? null : i)}
//                       aria-expanded={isOpen}
//                       suppressHydrationWarning
//                     >
//                       <span className="cwa-faq-q-num">
//                         {String(i + 1).padStart(2, "0")}
//                       </span>
//                       <span className="cwa-faq-q-text">{f.q}</span>
//                       <span className="cwa-faq-q-icon" aria-hidden>
//                         <svg width="14" height="14" viewBox="0 0 14 14">
//                           <path
//                             d="M3 7h8 M7 3v8"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeWidth="1.4"
//                             strokeLinecap="round"
//                           />
//                         </svg>
//                       </span>
//                     </button>
//                     <div className="cwa-faq-a">
//                       <div className="cwa-faq-a-inner">{f.a}</div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 7 — FINAL CTA
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-cta-section" aria-labelledby="cwa-cta-title">
//           <div className="cwa-cta-inner">
//             <div className="cwa-cta-grid">
//               <div className="cwa-cta-left">
//                 <h2 id="cwa-cta-title" className="cwa-cta-h2">
//                   Ready to ship a web app{" "}
//                   <span className="cwa-cta-h2-accent">that lasts?</span>
//                 </h2>
//                 <p className="cwa-cta-lead">
//                   Free 30-minute discovery call. You'll talk directly with an
//                   engineer and a strategist — no sales pitch, just a real
//                   conversation about your problem and timeline.
//                 </p>
//                 <div className="cwa-cta-actions">
//                   <Link href="/contact" className="cwa-cta-primary-light">
//                     <span>Book a discovery call</span>
//                     <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
//                       <path
//                         d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="1.4"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </Link>
//                   <a href="mailto:hello@techbinaries.com" className="cwa-cta-mail">
//                     hello@techbinaries.com
//                   </a>
//                 </div>
//               </div>

//               <div className="cwa-cta-right">
//                 <dl className="cwa-cta-meta">
//                   <div className="cwa-cta-meta-item">
//                     <dt>Response time</dt>
//                     <dd>Within 24h</dd>
//                   </div>
//                   <div className="cwa-cta-meta-item">
//                     <dt>MVP timeline</dt>
//                     <dd>8–12 weeks</dd>
//                   </div>
//                   <div className="cwa-cta-meta-item">
//                     <dt>Engagement</dt>
//                     <dd>Fixed or T&amp;M</dd>
//                   </div>
//                   <div className="cwa-cta-meta-item">
//                     <dt>Based in</dt>
//                     <dd>Global · remote</dd>
//                   </div>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </section>

//         <SiteFooter />
//       </div>

//       <style>{`
//         /* ═══════════════════════════════════════════════════════════════
//            SHARED PRIMITIVES (mirror of main service page)
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-h2 {
//           font-family: var(--font-display);
//           font-size: clamp(32px, 4.4vw, 60px);
//           font-weight: 500;
//           letter-spacing: -0.032em;
//           line-height: 1.02;
//           margin: 0 0 18px;
//           max-width: 620px;
//         }
//         .cwa-h2-light { color: #fafaf9; max-width: 760px; }
//         .cwa-italic-mute {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(10,10,10,0.5);
//         }
//         .cwa-italic-light {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(255,255,255,0.6);
//         }
//         .cwa-h2-lead {
//           font-size: 16px;
//           color: rgba(10,10,10,0.62);
//           line-height: 1.7;
//           margin: 0 0 32px;
//           max-width: 540px;
//         }
//         .cwa-h2-lead-light { color: rgba(255,255,255,0.62); max-width: 460px; }

//         .cwa-cta-primary {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 15px 28px;
//           background: #0a0a0a;
//           color: #fafaf9;
//           text-decoration: none;
//           font-size: 14px;
//           font-weight: 500;
//           border-radius: 999px;
//           transition: background 0.25s, transform 0.25s;
//         }
//         .cwa-cta-primary:hover {
//           background: #262626;
//           transform: translateY(-1px);
//         }
//         .cwa-cta-primary svg { transition: transform 0.25s ease; }
//         .cwa-cta-primary:hover svg { transform: translateX(2px); }

//         .cwa-cta-ghost {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 14px 24px;
//           border: 1px solid rgba(10,10,10,0.85);
//           color: #0a0a0a;
//           text-decoration: none;
//           font-size: 14px;
//           font-weight: 500;
//           border-radius: 999px;
//           transition: background 0.2s, color 0.2s;
//         }
//         .cwa-cta-ghost:hover {
//           background: #0a0a0a;
//           color: #fafaf9;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 1 — HERO
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-hero {
//           position: relative;
//           padding: clamp(140px, 18vh, 200px) 20px clamp(64px, 8vh, 96px);
//           background: #fafaf9;
//           overflow: hidden;
//         }
//         .cwa-hero::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(10,10,10,0.025) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(10,10,10,0.025) 1px, transparent 1px);
//           background-size: 64px 64px;
//           mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 90%);
//           -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 0%, transparent 90%);
//           pointer-events: none;
//         }
//         .cwa-hero-inner {
//           position: relative;
//           max-width: 1320px;
//           margin: 0 auto;
//         }
//         .cwa-hero-grid {
//           display: grid;
//           grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
//           gap: clamp(40px, 5vw, 88px);
//           align-items: center;
//         }
//         .cwa-hero-copy { min-width: 0; }

//         /* Breadcrumb */
//         .cwa-crumb {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           font-family: var(--font-mono);
//           font-size: 11px;
//           letter-spacing: 0.06em;
//           color: rgba(10,10,10,0.5);
//           margin-bottom: 28px;
//         }
//         .cwa-crumb-link {
//           color: rgba(10,10,10,0.55);
//           text-decoration: none;
//           transition: color 0.2s;
//         }
//         .cwa-crumb-link:hover { color: #0a0a0a; }
//         .cwa-crumb-sep { opacity: 0.4; }
//         .cwa-crumb-current { color: #0a0a0a; }

//         /* Eyebrow pill */
//         .cwa-eyebrow {
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           padding: 7px 14px 7px 10px;
//           border: 1px solid rgba(10,10,10,0.12);
//           background: rgba(255,255,255,0.7);
//           border-radius: 999px;
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.7);
//           margin-bottom: 24px;
//         }
//         .cwa-eyebrow-bin {
//           font-family: var(--font-mono);
//           font-size: 10px;
//           padding: 2px 8px;
//           background: #0a0a0a;
//           color: #fafaf9;
//           border-radius: 999px;
//           letter-spacing: 0.1em;
//         }
//         .cwa-eyebrow-dot {
//           width: 4px;
//           height: 4px;
//           border-radius: 50%;
//           background: rgba(10,10,10,0.4);
//         }

//         /* Headline with character split */
//         .cwa-hero-title {
//           font-family: var(--font-display);
//           font-size: clamp(38px, 5.4vw, 78px);
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           line-height: 0.99;
//           margin: 0 0 24px;
//           color: #0a0a0a;
//         }
//         .cwa-h1-line {
//           display: block;
//           padding-bottom: 0.05em;
//           overflow: visible;
//         }
//         .cwa-h1-char {
//           display: inline-block;
//           will-change: transform;
//         }
//         .cwa-h1-italic {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(10,10,10,0.55);
//         }

//         .cwa-hero-lead {
//           font-size: 16px;
//           color: rgba(10,10,10,0.65);
//           line-height: 1.72;
//           max-width: 540px;
//           margin: 0 0 32px;
//         }

//         .cwa-hero-cta-row {
//           display: flex;
//           gap: 12px;
//           flex-wrap: wrap;
//           margin-bottom: 48px;
//         }

//         /* Hero proof strip */
//         .cwa-hero-proof {
//           display: grid;
//           grid-template-columns: repeat(3, auto);
//           gap: 0;
//           margin: 0;
//           border-top: 1px solid rgba(10,10,10,0.1);
//           padding-top: 24px;
//           max-width: 540px;
//         }
//         .cwa-hero-proof > div {
//           padding-right: 32px;
//           border-right: 1px solid rgba(10,10,10,0.08);
//         }
//         .cwa-hero-proof > div:not(:first-child) { padding-left: 32px; }
//         .cwa-hero-proof > div:last-child { border-right: 0; padding-right: 0; }
//         .cwa-hero-proof dt {
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.5);
//           margin: 0 0 6px;
//         }
//         .cwa-hero-proof dd {
//           font-family: var(--font-display);
//           font-size: 22px;
//           font-weight: 500;
//           letter-spacing: -0.025em;
//           color: #0a0a0a;
//           margin: 0;
//           line-height: 1;
//           font-variant-numeric: tabular-nums;
//         }

//         /* Hero media */
//         .cwa-hero-media {
//           position: relative;
//           aspect-ratio: 4 / 5;
//           border-radius: 24px;
//           overflow: hidden;
//           background: #0a0a0a;
//           box-shadow: 0 40px 90px -50px rgba(0,0,0,0.4);
//         }
//         .cwa-hero-media img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           filter: saturate(1.06) contrast(1.04);
//           transition: transform 1.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-hero-media:hover img { transform: scale(1.04); }
//         .cwa-hero-media-overlay {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.4) 100%);
//           pointer-events: none;
//         }
//         .cwa-hero-media-tag {
//           position: absolute;
//           bottom: 22px;
//           left: 22px;
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           padding: 8px 14px;
//           background: rgba(255,255,255,0.95);
//           backdrop-filter: blur(8px);
//           border-radius: 999px;
//           font-size: 11px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: #0a0a0a;
//         }
//         .cwa-hero-media-tag-dot {
//           width: 6px;
//           height: 6px;
//           border-radius: 50%;
//           background: #16a34a;
//           box-shadow: 0 0 0 3px rgba(22,163,74,0.18);
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 2 / 3 — SPLIT (image + content)
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-split-section {
//           background: #f5f5f4;
//           padding-left: max(clamp(14px, 2.4vw, 32px), env(safe-area-inset-left, 0px));
//           padding-right: max(clamp(14px, 2.4vw, 32px), env(safe-area-inset-right, 0px));
//           padding-top: clamp(56px, 7vw, 88px);
//           padding-bottom: clamp(56px, 7vw, 88px);
//         }
//         .cwa-split-section--alt { background: #fafaf9; }

//         .cwa-split-grid {
//           display: grid;
//           grid-template-columns: 0.95fr 1.05fr;
//           gap: clamp(32px, 4vw, 72px);
//           align-items: stretch;
//           max-width: 1320px;
//           margin: 0 auto;
//           min-height: 560px;
//         }
//         .cwa-split-grid--reverse { grid-template-columns: 1.05fr 0.95fr; }

//         .cwa-split-media {
//           position: relative;
//           overflow: hidden;
//           background: #0a0a0a;
//           border-radius: clamp(20px, 2.4vw, 28px);
//           min-height: 420px;
//         }
//         .cwa-split-media img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           display: block;
//           filter: saturate(1.06) contrast(1.04);
//           transition: transform 1.2s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-split-section:hover .cwa-split-media img { transform: scale(1.03); }
//         .cwa-split-media-overlay {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(180deg, rgba(10,10,10,0.12) 0%, rgba(10,10,10,0.42) 100%);
//           pointer-events: none;
//         }

//         .cwa-split-content {
//           padding: clamp(32px, 4vw, 56px) clamp(8px, 2vw, 24px);
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//         }

//         /* Section 2 — growth list */
//         .cwa-growth-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: flex;
//           flex-direction: column;
//           gap: 0;
//           max-width: 560px;
//         }
//         .cwa-growth-item {
//           display: grid;
//           grid-template-columns: 36px 1fr;
//           gap: 16px;
//           padding: 18px 0;
//           border-top: 1px solid rgba(10,10,10,0.1);
//         }
//         .cwa-growth-item:last-child { border-bottom: 1px solid rgba(10,10,10,0.1); }
//         .cwa-growth-num {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           color: rgba(10,10,10,0.45);
//           letter-spacing: 0.06em;
//           padding-top: 4px;
//         }
//         .cwa-growth-body {
//           display: grid;
//           grid-template-columns: minmax(0, 1fr) auto;
//           column-gap: 20px;
//           row-gap: 8px;
//           align-items: start;
//         }
//         .cwa-growth-head { display: contents; }
//         .cwa-growth-title {
//           font-family: var(--font-display);
//           font-size: 19px;
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           line-height: 1.2;
//           margin: 0;
//           color: #0a0a0a;
//           grid-column: 1;
//         }
//         .cwa-growth-metric {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 500;
//           letter-spacing: 0.04em;
//           color: rgba(10,10,10,0.55);
//           padding: 4px 10px;
//           background: rgba(10,10,10,0.05);
//           border-radius: 999px;
//           white-space: nowrap;
//           grid-column: 2;
//           grid-row: 1;
//           justify-self: end;
//         }
//         .cwa-growth-desc {
//           font-size: 14px;
//           line-height: 1.6;
//           color: rgba(10,10,10,0.62);
//           margin: 0;
//           grid-column: 1 / -1;
//           max-width: 46ch;
//         }

//         /* Section 3 — cost list */
//         .cwa-cost-list {
//           list-style: none;
//           padding: 0;
//           margin: 0 0 28px;
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//           max-width: 540px;
//         }
//         .cwa-cost-item {
//           display: grid;
//           grid-template-columns: 18px 1fr;
//           gap: 14px;
//           align-items: start;
//           font-size: 14.5px;
//           line-height: 1.62;
//           color: rgba(10,10,10,0.7);
//         }
//         .cwa-cost-item strong {
//           color: #0a0a0a;
//           font-weight: 600;
//         }
//         .cwa-cost-mark {
//           position: relative;
//           width: 18px;
//           height: 22px;
//           flex-shrink: 0;
//         }
//         .cwa-cost-mark::before {
//           content: "";
//           position: absolute;
//           top: 9px;
//           left: 0;
//           width: 12px;
//           height: 1px;
//           background: #0a0a0a;
//         }
//         .cwa-cost-mark::after {
//           content: "";
//           position: absolute;
//           top: 6px;
//           left: 8px;
//           width: 7px;
//           height: 7px;
//           border-top: 1px solid #0a0a0a;
//           border-right: 1px solid #0a0a0a;
//           transform: rotate(45deg);
//         }
//         .cwa-cost-close {
//           font-size: 14px;
//           line-height: 1.7;
//           color: rgba(10,10,10,0.6);
//           margin: 0;
//           padding-top: 22px;
//           border-top: 1px solid rgba(10,10,10,0.1);
//           max-width: 540px;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 4 — PROCESS (dark, grid)
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-process-section {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #0a0a0a;
//           color: #fafaf9;
//           position: relative;
//           overflow: hidden;
//         }
//         .cwa-process-section::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
//           background-size: 60px 60px;
//           pointer-events: none;
//         }
//         .cwa-process-inner {
//           position: relative;
//           max-width: 1320px;
//           margin: 0 auto;
//         }
//         .cwa-process-header {
//           display: flex;
//           flex-direction: column;
//           gap: 0;
//           margin-bottom: clamp(48px, 6vw, 72px);
//         }
//         .cwa-process-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 0;
//           border-top: 1px solid rgba(255,255,255,0.1);
//           border-left: 1px solid rgba(255,255,255,0.1);
//         }
//         .cwa-process-row {
//           padding: 32px 28px 36px;
//           border-right: 1px solid rgba(255,255,255,0.1);
//           border-bottom: 1px solid rgba(255,255,255,0.1);
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//           background: rgba(255,255,255,0.01);
//           transition: background 0.3s ease;
//           position: relative;
//         }
//         .cwa-process-row:hover { background: rgba(255,255,255,0.03); }
//         .cwa-process-num {
//           font-family: var(--font-display);
//           font-size: 28px;
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           color: rgba(255,255,255,0.25);
//           font-variant-numeric: tabular-nums;
//           line-height: 1;
//         }
//         .cwa-process-title {
//           font-family: var(--font-display);
//           font-size: 22px;
//           font-weight: 500;
//           letter-spacing: -0.02em;
//           line-height: 1.18;
//           margin: 0;
//           color: #fafaf9;
//         }
//         .cwa-process-desc {
//           font-size: 14px;
//           line-height: 1.65;
//           color: rgba(255,255,255,0.6);
//           margin: 0;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 5 — STACK
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-stack-section {
//           padding: clamp(80px, 10vw, 130px) 20px;
//           background: #fafaf9;
//           border-top: 1px solid rgba(0,0,0,0.06);
//         }
//         .cwa-stack-inner {
//           max-width: 1320px;
//           margin: 0 auto;
//         }
//         .cwa-stack-header {
//           display: flex;
//           flex-direction: column;
//           gap: 0;
//           margin-bottom: clamp(40px, 5vw, 56px);
//         }
//         .cwa-stack-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 0;
//           border-top: 1px solid rgba(10,10,10,0.1);
//           border-left: 1px solid rgba(10,10,10,0.1);
//         }
//         .cwa-stack-col {
//           padding: 28px 26px 30px;
//           border-right: 1px solid rgba(10,10,10,0.1);
//           border-bottom: 1px solid rgba(10,10,10,0.1);
//           background: #fafaf9;
//           transition: background 0.3s ease;
//         }
//         .cwa-stack-col:hover { background: rgba(10,10,10,0.025); }
//         .cwa-stack-group {
//           font-size: 11px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.5);
//           margin-bottom: 20px;
//           padding-bottom: 14px;
//           border-bottom: 1px solid rgba(10,10,10,0.08);
//         }
//         .cwa-stack-items {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }
//         .cwa-stack-items li {
//           font-family: var(--font-display);
//           font-size: 18px;
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           color: #0a0a0a;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 6 — FAQs
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-faq-section {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #f5f5f4;
//           border-top: 1px solid rgba(0,0,0,0.06);
//         }
//         .cwa-faq-layout {
//           max-width: 1320px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: 360px 1fr;
//           gap: 80px;
//           align-items: start;
//         }
//         .cwa-faq-aside { position: sticky; top: 120px; }
//         .cwa-faq-lead { margin-bottom: 24px; }
//         .cwa-faq-cta {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 12px 22px;
//           border: 1px solid rgba(0,0,0,0.85);
//           color: #0a0a0a;
//           text-decoration: none;
//           font-size: 13px;
//           font-weight: 500;
//           border-radius: 999px;
//           transition: background 0.2s, color 0.2s;
//         }
//         .cwa-faq-cta:hover { background: #0a0a0a; color: #fafaf9; }

//         .cwa-faq-list {
//           display: flex;
//           flex-direction: column;
//           border-top: 1px solid rgba(10,10,10,0.1);
//         }
//         .cwa-faq-row { border-bottom: 1px solid rgba(10,10,10,0.1); }
//         .cwa-faq-q {
//           width: 100%;
//           display: grid;
//           grid-template-columns: 50px 1fr 30px;
//           align-items: center;
//           gap: 16px;
//           padding: 22px 0;
//           background: transparent;
//           border: 0;
//           cursor: pointer;
//           text-align: left;
//           color: #0a0a0a;
//           font-family: var(--font-display);
//         }
//         .cwa-faq-q-num {
//           font-family: var(--font-mono);
//           font-size: 12px;
//           font-weight: 500;
//           color: rgba(10,10,10,0.4);
//           letter-spacing: 0.06em;
//         }
//         .cwa-faq-q-text {
//           font-family: var(--font-display);
//           font-size: clamp(16px, 1.5vw, 20px);
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           line-height: 1.32;
//         }
//         .cwa-faq-q-icon {
//           width: 30px;
//           height: 30px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           border: 1px solid rgba(10,10,10,0.18);
//           border-radius: 50%;
//           color: #0a0a0a;
//           transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
//                       background 0.25s, color 0.25s, border-color 0.25s;
//         }
//         .cwa-faq-row[data-open="true"] .cwa-faq-q-icon {
//           transform: rotate(45deg);
//           background: #0a0a0a;
//           color: #fafaf9;
//           border-color: #0a0a0a;
//         }
//         .cwa-faq-a {
//           display: grid;
//           grid-template-rows: 0fr;
//           transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-faq-row[data-open="true"] .cwa-faq-a { grid-template-rows: 1fr; }
//         .cwa-faq-a-inner {
//           overflow: hidden;
//           padding-left: 66px;
//           font-family: var(--font-body);
//           font-size: 15px;
//           line-height: 1.7;
//           color: rgba(10,10,10,0.65);
//           padding-bottom: 0;
//           transition: padding-bottom 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-faq-row[data-open="true"] .cwa-faq-a-inner { padding-bottom: 26px; }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 7 — FINAL CTA
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-cta-section {
//           padding: 64px 20px 80px;
//           background: #fafaf9;
//         }
//         .cwa-cta-inner {
//           max-width: 1320px;
//           margin: 0 auto;
//           padding: clamp(72px, 9vw, 120px) clamp(32px, 5vw, 80px);
//           background: #0a0a0a;
//           color: #fafaf9;
//           border-radius: 28px;
//           position: relative;
//           overflow: hidden;
//           opacity: 0;
//         }
//         .cwa-cta-inner::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
//           background-size: 56px 56px;
//           mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 90%);
//           -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 90%);
//           pointer-events: none;
//         }
//         .cwa-cta-grid {
//           position: relative;
//           z-index: 1;
//           display: grid;
//           grid-template-columns: 1.3fr 1fr;
//           gap: clamp(48px, 6vw, 96px);
//           align-items: end;
//         }
//         .cwa-cta-h2 {
//           font-family: var(--font-display);
//           font-size: clamp(36px, 5.2vw, 72px);
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           line-height: 0.98;
//           margin: 0 0 24px;
//           color: #fafaf9;
//           max-width: 620px;
//         }
//         .cwa-cta-h2-accent {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(255,255,255,0.55);
//         }
//         .cwa-cta-lead {
//           font-size: 16px;
//           line-height: 1.7;
//           color: rgba(255,255,255,0.65);
//           margin: 0 0 36px;
//           max-width: 520px;
//         }
//         .cwa-cta-actions {
//           display: flex;
//           align-items: center;
//           gap: 24px;
//           flex-wrap: wrap;
//         }
//         .cwa-cta-primary-light {
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           padding: 15px 28px;
//           background: #fafaf9;
//           color: #0a0a0a;
//           text-decoration: none;
//           font-size: 14px;
//           font-weight: 500;
//           border-radius: 999px;
//           transition: background 0.25s, transform 0.25s;
//         }
//         .cwa-cta-primary-light:hover {
//           background: #e7e5e4;
//           transform: translateX(2px);
//         }
//         .cwa-cta-primary-light svg { transition: transform 0.25s; }
//         .cwa-cta-primary-light:hover svg { transform: translateX(2px); }

//         .cwa-cta-mail {
//           font-size: 14px;
//           font-weight: 500;
//           color: rgba(255,255,255,0.65);
//           text-decoration: none;
//           border-bottom: 1px solid rgba(255,255,255,0.25);
//           padding-bottom: 2px;
//           transition: color 0.2s, border-color 0.2s;
//         }
//         .cwa-cta-mail:hover {
//           color: #fafaf9;
//           border-color: #fafaf9;
//         }

//         .cwa-cta-right {
//           display: flex;
//           flex-direction: column;
//           align-items: stretch;
//         }
//         .cwa-cta-meta {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 0;
//           margin: 0;
//           border-top: 1px solid rgba(255,255,255,0.12);
//           border-left: 1px solid rgba(255,255,255,0.12);
//         }
//         .cwa-cta-meta-item {
//           padding: 22px 24px;
//           border-right: 1px solid rgba(255,255,255,0.12);
//           border-bottom: 1px solid rgba(255,255,255,0.12);
//           background: rgba(255,255,255,0.02);
//         }
//         .cwa-cta-meta-item dt {
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.5);
//           margin: 0 0 8px;
//         }
//         .cwa-cta-meta-item dd {
//           font-family: var(--font-display);
//           font-size: 17px;
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           color: #fafaf9;
//           margin: 0;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            RESPONSIVE
//         ═══════════════════════════════════════════════════════════════ */
//         @media (max-width: 1100px) {
//           .cwa-hero-grid {
//             grid-template-columns: 1fr;
//             gap: 56px;
//           }
//           .cwa-hero-media {
//             max-width: 640px;
//             margin: 0 auto;
//             width: 100%;
//             aspect-ratio: 16 / 10;
//           }

//           .cwa-split-grid,
//           .cwa-split-grid--reverse {
//             grid-template-columns: 1fr;
//             min-height: auto;
//           }
//           .cwa-split-grid--reverse .cwa-split-content { order: 2; }
//           .cwa-split-grid--reverse .cwa-split-media { order: 1; }
//           .cwa-split-media {
//             min-height: 320px;
//             aspect-ratio: 16 / 9;
//           }

//           .cwa-process-list { grid-template-columns: repeat(2, 1fr); }
//           .cwa-stack-grid { grid-template-columns: repeat(2, 1fr); }

//           .cwa-faq-layout { grid-template-columns: 1fr; gap: 48px; }
//           .cwa-faq-aside { position: static; }

//           .cwa-cta-grid {
//             grid-template-columns: 1fr;
//             gap: 48px;
//             align-items: start;
//           }
//         }

//         @media (max-width: 768px) {
//           .cwa-hero {
//             padding: 120px 14px 60px;
//           }
//           .cwa-hero-title {
//             font-size: clamp(30px, 8vw, 44px);
//           }
//           .cwa-hero-lead { font-size: 15px; margin-bottom: 24px; }
//           .cwa-hero-cta-row { gap: 10px; margin-bottom: 32px; }
//           .cwa-hero-proof {
//             grid-template-columns: 1fr 1fr;
//             gap: 0;
//           }
//           .cwa-hero-proof > div {
//             padding: 14px 16px;
//             border-right: 1px solid rgba(10,10,10,0.08);
//             border-bottom: 1px solid rgba(10,10,10,0.08);
//           }
//           .cwa-hero-proof > div:nth-child(2) { border-right: 0; }
//           .cwa-hero-proof > div:nth-child(3) {
//             border-bottom: 0;
//             grid-column: 1 / -1;
//             border-right: 0;
//           }
//           .cwa-hero-proof > div:not(:first-child) { padding-left: 16px; }

//           .cwa-split-section {
//             padding-left: max(14px, env(safe-area-inset-left, 0px));
//             padding-right: max(14px, env(safe-area-inset-right, 0px));
//             padding-top: 60px;
//             padding-bottom: 60px;
//           }
//           .cwa-split-content { padding: 32px 0 0; }
//           .cwa-split-media { aspect-ratio: 4 / 3; min-height: 280px; }

//           .cwa-growth-body {
//             grid-template-columns: 1fr;
//             row-gap: 8px;
//           }
//           .cwa-growth-metric {
//             grid-row: auto;
//             justify-self: start;
//           }

//           .cwa-process-section {
//             padding: 72px 14px;
//           }
//           .cwa-process-list { grid-template-columns: 1fr; }
//           .cwa-process-row { padding: 26px 22px 28px; }

//           .cwa-stack-section { padding: 72px 14px; }
//           .cwa-stack-grid { grid-template-columns: 1fr 1fr; }
//           .cwa-stack-col { padding: 22px 18px 24px; }
//           .cwa-stack-items li { font-size: 16px; }

//           .cwa-faq-section { padding: 72px 14px; }
//           .cwa-faq-q {
//             grid-template-columns: 36px 1fr 26px;
//             gap: 12px;
//             padding: 18px 0;
//           }
//           .cwa-faq-q-icon { width: 26px; height: 26px; }
//           .cwa-faq-a-inner { padding-left: 48px; font-size: 14px; }
//           .cwa-faq-row[data-open="true"] .cwa-faq-a-inner { padding-bottom: 22px; }

//           .cwa-cta-section { padding: 48px 14px 56px; }
//           .cwa-cta-inner { padding: 56px 26px; border-radius: 18px; }
//           .cwa-cta-h2 { font-size: clamp(28px, 9vw, 42px); }
//           .cwa-cta-meta { grid-template-columns: 1fr; }
//           .cwa-cta-meta-item:last-child { border-bottom: 0; }
//         }
//       `}</style>
//     </>
//   );
// }


//version 2
// Custom Web Application Development — Premium sub-service template
// Reusable layout: replace DATA constants for other sub-services.
// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import Link from "next/link";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";

// gsap.registerPlugin(ScrollTrigger);

// // ── DATA ──────────────────────────────────────────────────────────────────────

// const PAGE = {
//   headline1: "Web apps",
//   headline2: "engineered for",
//   headlineItalic: "performance.",
//   lead:
//     "Production-grade web applications built on modern stacks — Next.js, React, Node, Postgres — tuned for speed, resilience, and architecture that won't need a rewrite in two years.",
// };

// const HERO_PHONE_COUNTRY_CODES = [
//   "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
// ];

// const GROWTH = {
//   image:
//     "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1400&q=80&auto=format&fit=crop",
//   imageAlt: "Custom web application interface on a high-resolution display",
//   kicker: "Why custom",
//   title: "A custom web app is a",
//   titleAccent: "growth engine.",
//   lead:
//     "Off-the-shelf software flattens you against competitors. A purpose-built web application becomes the operational backbone — faster to evolve, cheaper to scale, aligned to how your business actually works.",
//   pillars: [
//     { n: "01", k: "Speed",      v: "Sub-second load",     d: "Edge-rendered pages, optimized bundles, and runtime budgets keep first interaction under a second on real devices." },
//     { n: "02", k: "Scale",      v: "10× headroom",        d: "Stateless services, queue-backed workers, and observability from day one. Traffic spikes don't become incidents." },
//     { n: "03", k: "Ownership",  v: "Your code, your IP",  d: "Full source, infrastructure, credentials transfer to you. No vendor lock-in, no licensing tax, no surprises at renewal." },
//     { n: "04", k: "Velocity",   v: "Weekly releases",     d: "Feature-flagged deploys and CI/CD pipelines let your team ship to production every week without rollout anxiety." },
//   ],
// };

// const COST = {
//   image:
//     "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format&fit=crop",
//   imageAlt: "Analytics dashboard showing performance metrics",
//   kicker: "What goes wrong",
//   title: "The cost of getting it",
//   titleAccent: "wrong.",
//   lead:
//     "Most failed web apps don't fail at launch — they fail in the first 90 days. The pattern is consistent and almost always preventable.",
//   failures: [
//     { stat: "53%",   label: "Bounce above 3s",     h: "Bloated bundles",          d: "Megabytes of unused JavaScript collapse mobile performance and quietly kill conversion on slower networks." },
//     { stat: "4.2×",  label: "Slower velocity",     h: "Brittle architecture",     d: "Tightly coupled services and shared databases turn every new feature into a coordination tax." },
//     { stat: "67%",   label: "Bugs found by users", h: "Missing observability",    d: "Without structured logs, traces, and RUM, you discover regressions from customer tickets — not dashboards." },
//     { stat: "26%",   label: "Excluded users",      h: "No accessibility",         d: "Skipping WCAG and keyboard support narrows your audience and makes refactors dramatically more expensive." },
//   ],
//   close:
//     "We engineer around every one of these failure modes — performance, architecture, observability, accessibility — as defaults, not upsells.",
// };

// const PROCESS = [
//   { num: "01", title: "Discovery & architecture",  d: "Stakeholder interviews, technical audit, written architecture brief.",   meta: "2 weeks · fixed price" },
//   { num: "02", title: "UX & interface design",      d: "Flows, wireframes, high-fidelity UI tied to a token-based design system.", meta: "2–4 weeks"            },
//   { num: "03", title: "Engineering sprints",        d: "Two-week sprints, weekly demos, CI/CD from day one. Working software every Friday.", meta: "8–16 weeks"   },
//   { num: "04", title: "QA & performance",           d: "Automated suites, cross-device QA, Lighthouse budgets, load testing before traffic.", meta: "Continuous" },
//   { num: "05", title: "Launch & monitor",           d: "Phased rollout with feature flags, real-user monitoring, rollback plan written before go-live.", meta: "1–2 weeks" },
//   { num: "06", title: "Iterate & support",          d: "SLA-backed retainer covering bug fixes, security patches, roadmap work.", meta: "Ongoing"               },
// ];

// const STACK = [
//   { group: "Frontend", items: [
//     { name: "Next.js",    v: "15.x", role: "App framework"     },
//     { name: "React",      v: "19",   role: "UI library"        },
//     { name: "TypeScript", v: "5.x",  role: "Type system"       },
//     { name: "Tailwind",   v: "4.x",  role: "Styling"           },
//   ]},
//   { group: "Backend", items: [
//     { name: "Node.js",    v: "22 LTS", role: "Runtime"         },
//     { name: "Python",     v: "3.12",   role: "Services / ML"   },
//     { name: "Go",         v: "1.23",   role: "High-throughput" },
//     { name: "GraphQL",    v: "—",      role: "API contract"    },
//   ]},
//   { group: "Data", items: [
//     { name: "PostgreSQL", v: "17",  role: "Primary store"    },
//     { name: "Redis",      v: "7.x", role: "Cache · queues"   },
//     { name: "Elasticsearch", v: "8.x", role: "Search"        },
//     { name: "S3",         v: "—",   role: "Object storage"   },
//   ]},
//   { group: "Infra", items: [
//     { name: "AWS",        v: "—",   role: "Primary cloud"    },
//     { name: "GCP",        v: "—",   role: "Alt cloud"        },
//     { name: "Docker",     v: "—",   role: "Containers"       },
//     { name: "Terraform",  v: "1.x", role: "IaC"              },
//   ]},
// ];

// const FAQS = [
//   { q: "How much does a custom web application cost?", a: "Most builds fall between $40K and $180K depending on scope, integrations, and team size. We provide fixed-price proposals after a paid two-week discovery sprint, so the budget is locked before engineering begins." },
//   { q: "How long does it take to build?",              a: "MVPs typically take 8–12 weeks. Full production builds run 14–22 weeks. We share a detailed milestone schedule during proposal, with weekly demos you can hold us to." },
//   { q: "What stack do you use?",                       a: "TypeScript end-to-end is our default — React or Next.js on the frontend, Node on the backend, Postgres for data, AWS or GCP for infrastructure. We choose tooling based on your problem, not because it's trendy." },
//   { q: "Do you handle design too?",                    a: "Yes. UX flows, wireframes, high-fidelity UI, and a design token system are part of the standard engagement. If you have a design partner already, we plug in cleanly with Figma handoff." },
//   { q: "What happens after launch?",                   a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and feature work. Many clients keep us on as a fractional engineering team. All code and infrastructure transfer to you on day one." },
// ];

// // ── COMPONENT ─────────────────────────────────────────────────────────────────

// export default function CustomWebAppPage() {
//   const [openFaq, setOpenFaq] = useState<number | null>(0);
//   const [activePillar, setActivePillar] = useState(0);
//   const [activeStack, setActiveStack] = useState(0);
//   const lenisRef = useRef<Lenis | null>(null);

//   // Lenis smooth scroll
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.1,
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       wheelMultiplier: 1,
//       touchMultiplier: 1.4,
//       smoothWheel: true,
//     });
//     lenisRef.current = lenis;
//     lenis.on("scroll", () => ScrollTrigger.update());
//     const ticker = (time: number) => lenis.raf(time * 1000);
//     gsap.ticker.add(ticker);
//     gsap.ticker.lagSmoothing(0);
//     return () => {
//       gsap.ticker.remove(ticker);
//       lenis.destroy();
//       lenisRef.current = null;
//     };
//   }, []);

//   // Animated counter
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const counters = gsap.utils.toArray<HTMLElement>(".cwa-count");
//       counters.forEach((el) => {
//         const target = parseFloat(el.dataset.target || "0");
//         const suffix = el.dataset.suffix || "";
//         const decimals = parseInt(el.dataset.decimals || "0", 10);
//         const obj = { v: 0 };
//         ScrollTrigger.create({
//           trigger: el,
//           start: "top 85%",
//           once: true,
//           onEnter: () => {
//             gsap.to(obj, {
//               v: target,
//               duration: 1.6,
//               ease: "power2.out",
//               onUpdate: () => {
//                 el.textContent = obj.v.toFixed(decimals) + suffix;
//               },
//             });
//           },
//         });
//       });
//     });
//     return () => ctx.revert();
//   }, []);

//   // Reveal & scroll-linked animations
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // ── HERO INTRO ──
//       const heroTl = gsap.timeline({ delay: 0.15 });
//       const chars = gsap.utils.toArray<HTMLElement>(".cwa-h1-char");
//       heroTl.fromTo(
//         chars,
//         { yPercent: 110, opacity: 0 },
//         { yPercent: 0, opacity: 1, duration: 0.9, stagger: { each: 0.018 }, ease: "power4.out" },
//         0
//       );
//       heroTl.fromTo(
//         ".cwa-hero-fade",
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
//         0.55
//       );
//       heroTl.fromTo(
//         ".cwa-hero-copy",
//         { opacity: 0, scale: 0.95 },
//         { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
//         0.3
//       );
//       heroTl.fromTo(
//         ".csd-hero-form-shell",
//         { opacity: 0, y: 30 },
//         { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
//         0.4
//       );
//       heroTl.fromTo(
//         ".csd-hero-form-field",
//         { opacity: 0, y: 16, scale: 0.96 },
//         { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
//         0.7
//       );

//       // ── SECTION HEADER REVEALS ──
//       const setupBatch = (
//         selector: string,
//         from: gsap.TweenVars,
//         to: gsap.TweenVars,
//         start = "top 88%"
//       ) => {
//         const items = gsap.utils.toArray<HTMLElement>(selector);
//         if (!items.length) return;
//         gsap.set(items, from);
//         ScrollTrigger.batch(items, {
//           start,
//           once: true,
//           onEnter: (batch) => gsap.to(batch, { ...to, stagger: 0.08, overwrite: true }),
//         });
//       };
//       setupBatch(".cwa-sh", { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" });
//       setupBatch(".cwa-faq-row", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "top 92%");

//       // ── GROWTH (sticky-sync): pillars highlight one-at-a-time as you scroll ──
//       const pillarItems = gsap.utils.toArray<HTMLElement>(".cwa-pillar-row");
//       pillarItems.forEach((el, i) => {
//         ScrollTrigger.create({
//           trigger: el,
//           start: "top 70%",
//           end: "bottom 30%",
//           onEnter:    () => setActivePillar(i),
//           onEnterBack:() => setActivePillar(i),
//         });
//       });

//       // ── COST: scrub-driven stat reveal ──
//       gsap.utils.toArray<HTMLElement>(".cwa-fail-card").forEach((el) => {
//         gsap.fromTo(el,
//           { opacity: 0, y: 32 },
//           {
//             opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
//             scrollTrigger: { trigger: el, start: "top 88%", once: true },
//           });
//       });

//       // ── PROCESS: scrub progress line + numbered reveal ──
//       const processSection = document.querySelector<HTMLElement>(".cwa-process-section");
//       const processLine = document.querySelector<HTMLElement>(".cwa-process-line-fill");
//       if (processSection && processLine) {
//         gsap.fromTo(processLine,
//           { scaleY: 0 },
//           {
//             scaleY: 1, ease: "none", transformOrigin: "top center",
//             scrollTrigger: {
//               trigger: processSection,
//               start: "top 60%",
//               end: "bottom 60%",
//               scrub: 0.5,
//             },
//           });
//       }
//       gsap.utils.toArray<HTMLElement>(".cwa-proc-step").forEach((el) => {
//         gsap.fromTo(el,
//           { opacity: 0, x: -30 },
//           {
//             opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
//             scrollTrigger: { trigger: el, start: "top 82%", once: true },
//           });
//       });

//       // ── STACK reveal ──
//       gsap.utils.toArray<HTMLElement>(".cwa-stack-line").forEach((el, i) => {
//         gsap.fromTo(el,
//           { opacity: 0, y: 14 },
//           {
//             opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
//             delay: i * 0.04,
//             scrollTrigger: { trigger: el, start: "top 90%", once: true },
//           });
//       });

//       // ── FINAL CTA ──
//       gsap.fromTo(".cwa-cta-inner",
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1, y: 0, duration: 1, ease: "power3.out",
//           scrollTrigger: { trigger: ".cwa-cta-inner", start: "top 85%" },
//         });
//     });
//     return () => ctx.revert();
//   }, []);

//   useEffect(() => {
//     const fonts = "fonts" in document ? document.fonts : undefined;
//     if (!fonts?.ready) return;
//     fonts.ready.then(() => ScrollTrigger.refresh());
//   }, []);

//   return (
//     <>
//       {/* Grain overlay */}
//       <div
//         aria-hidden
//         style={{
//           position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
//           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: "180px 180px", opacity: 0.028, mixBlendMode: "multiply",
//         }}
//       />

//       <div style={{ background: "#fafaf9", color: "#0a0a0a", fontFamily: "var(--font-body)", overflowX: "hidden" }}>
//         <SiteHeader />

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 1 — HERO
//             Signature interaction: animated "system canvas" on the right
//             with cursor-following spotlight, simulating a live web app
//             being built. Better than a stock photo.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-hero" aria-labelledby="cwa-hero-title">
//           <div className="cwa-hero-video-wrap" aria-hidden>
//             <video className="cwa-hero-bg-video" autoPlay muted loop playsInline preload="metadata">
//               <source
//                 src="/videos/services/Custom%20Software%20Development/custom-web-application-development/service-cwad-hero.mp4"
//                 type="video/mp4"
//                 media="(min-width: 901px)"
//               />
//             </video>
//             <img
//               className="cwa-hero-mobile-bg"
//               src="/images/services/custom-software-development/cwad-service-hero-mobile.jpeg"
//               alt=""
//               decoding="async"
//               fetchPriority="high"
//             />
//             <div className="cwa-hero-bg-overlay" />
//             <div className="cwa-hero-bg-spotlight" />
//           </div>

//           <div className="cwa-hero-inner">
//             <div className="csd-hero-main">
//               <div className="csd-hero-left">
//                 <div className="csd-hero-mobile-spacer" aria-hidden />
//                 <div className="cwa-hero-copy">
//                   <h1 id="cwa-hero-title" className="cwa-hero-title">
//                     <span className="cwa-h1-line">
//                       {PAGE.headline1.split("").map((c, i) => (
//                         <span key={`a-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
//                       ))}
//                     </span>
//                     <span className="cwa-h1-line">
//                       {PAGE.headline2.split("").map((c, i) => (
//                         <span key={`b-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
//                       ))}
//                     </span>
//                     <span className="cwa-h1-line">
//                       <span className="cwa-h1-italic">
//                         {PAGE.headlineItalic.split("").map((c, i) => (
//                           <span key={`c-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
//                         ))}
//                       </span>
//                     </span>
//                   </h1>

//                   <p className="cwa-hero-fade cwa-hero-lead" style={{ opacity: 0 }}>
//                     {PAGE.lead}
//                   </p>

//                   <div className="cwa-hero-fade cwa-hero-cta-row" style={{ opacity: 0 }}>
//                     <Link href="/contact" className="csd-cta-primary">
//                       <span style={{ position: "relative", zIndex: 2 }}>Plan my build</span>
//                       <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="csd-cta-arrow" style={{ position: "relative", zIndex: 2 }}>
//                         <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               <div className="csd-hero-right">
//                 <div className="csd-hero-form-shell" style={{ opacity: 0 }}>
//                   <h3 className="csd-hero-form-title">Share Your Requirements</h3>
//                   <p className="csd-hero-form-subtitle">
//                     Tell our experts about your goals and get a tailored consultation plan.
//                   </p>

//                   <form className="csd-hero-form" onSubmit={(e) => e.preventDefault()}>
//                     <label className="csd-hero-form-field">
//                       <span>Name</span>
//                       <input type="text" placeholder="Your name" />
//                     </label>

//                     <div className="csd-hero-form-grid">
//                       <label className="csd-hero-form-field csd-hero-form-field--phone">
//                         <span>Contact Number</span>
//                         <div className="csd-hero-phone-row">
//                           <select
//                             className="csd-hero-phone-cc"
//                             name="countryCode"
//                             aria-label="Country calling code"
//                             defaultValue="+92"
//                           >
//                             {HERO_PHONE_COUNTRY_CODES.map((code) => (
//                               <option key={code} value={code}>
//                                 {code}
//                               </option>
//                             ))}
//                           </select>
//                           <span className="csd-hero-phone-sep" aria-hidden />
//                           <input
//                             className="csd-hero-phone-num"
//                             type="tel"
//                             name="phoneNational"
//                             placeholder="Enter Your Number*"
//                             autoComplete="tel-national"
//                             aria-label="Phone number"
//                             required
//                           />
//                         </div>
//                       </label>
//                       <label className="csd-hero-form-field">
//                         <span>Work Email</span>
//                         <input type="email" placeholder="Enter your email address" />
//                       </label>
//                     </div>

//                     <label className="csd-hero-form-field">
//                       <span>Budget Range</span>
//                       <select defaultValue="">
//                         <option value="" disabled>Select a budget range</option>
//                         <option value="under-10k">Under $10k</option>
//                         <option value="10k-25k">$10k - $25k</option>
//                         <option value="25k-50k">$25k - $50k</option>
//                         <option value="50k-plus">$50k+</option>
//                       </select>
//                     </label>

//                     <label className="csd-hero-form-field">
//                       <span>Describe your project</span>
//                       <textarea rows={3} placeholder="Describe your project" />
//                     </label>

//                     <div className="csd-hero-form-foot">
//                       <div className="csd-hero-form-captcha">
//                         <span>5 + 2 =</span>
//                         <input type="text" inputMode="numeric" aria-label="Simple captcha answer" />
//                       </div>
//                       <button type="submit" className="csd-hero-form-submit">
//                         Schedule a Technical Consultation
//                       </button>
//                     </div>
//                     <p className="csd-hero-form-note">Fast, high-touch engagement under strict NDA protection.</p>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 2 — WHY A CUSTOM WEB APP IS A GROWTH ENGINE
//             Sticky-sync layout: sticky image LEFT, scrollable pillar list RIGHT.
//             As the user scrolls each pillar, the image stays anchored and a
//             counter / accent updates. Premium "long-form" pattern.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-growth" aria-labelledby="cwa-growth-title">
//           <div className="cwa-growth-inner">
//             <div className="cwa-sh cwa-section-head cwa-growth-head-inline">
//               <h2 id="cwa-growth-title" className="cwa-h2">
//                 {GROWTH.title} <span className="cwa-italic-mute">{GROWTH.titleAccent}</span>
//               </h2>
//               <p className="cwa-h2-lead">{GROWTH.lead}</p>
//             </div>

//             <div className="cwa-growth-grid">
//               {/* LEFT — sticky media */}
//               <div className="cwa-growth-media-wrap">
//                 <div className="cwa-growth-media">
//                   <img src={GROWTH.image} alt={GROWTH.imageAlt} loading="lazy" />
//                   <div className="cwa-growth-media-overlay" />

//                   <div className="cwa-growth-media-progress" aria-hidden>
//                     {GROWTH.pillars.map((_, i) => (
//                       <span key={i} data-active={activePillar === i ? "true" : "false"} />
//                     ))}
//                   </div>

//                   <div className="cwa-growth-media-active">
//                     <div className="cwa-growth-media-active-num">
//                       {GROWTH.pillars[activePillar].n}
//                     </div>
//                     <div className="cwa-growth-media-active-body">
//                       <div className="cwa-growth-media-active-k">
//                         {GROWTH.pillars[activePillar].k}
//                       </div>
//                       <div className="cwa-growth-media-active-v">
//                         {GROWTH.pillars[activePillar].v}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT — pillars */}
//               <ol className="cwa-pillar-list">
//                 {GROWTH.pillars.map((p, i) => (
//                   <li
//                     key={p.n}
//                     className="cwa-pillar-row"
//                     data-active={activePillar === i ? "true" : "false"}
//                   >
//                     <div className="cwa-pillar-marker">
//                       <span className="cwa-pillar-marker-num">{p.n}</span>
//                       <span className="cwa-pillar-marker-line" aria-hidden />
//                     </div>
//                     <div className="cwa-pillar-body">
//                       <div className="cwa-pillar-head">
//                         <h3 className="cwa-pillar-title">{p.k}</h3>
//                         <span className="cwa-pillar-metric">{p.v}</span>
//                       </div>
//                       <p className="cwa-pillar-desc">{p.d}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ol>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 3 — COST OF GETTING IT WRONG
//             Layout: content LEFT, image RIGHT. Below the split, a 4-card
//             "failure mode" row with hard stats — reads like a research finding.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-cost" aria-labelledby="cwa-cost-title">
//           <div className="cwa-cost-inner">
//             <div className="cwa-cost-split">
//               <div className="cwa-cost-content cwa-sh">
//                 <h2 id="cwa-cost-title" className="cwa-h2">
//                   {COST.title} <span className="cwa-italic-mute">{COST.titleAccent}</span>
//                 </h2>
//                 <p className="cwa-h2-lead">{COST.lead}</p>

//                 <p className="cwa-cost-close">{COST.close}</p>
//               </div>

//               <div className="cwa-cost-media" aria-hidden>
//                 <img src={COST.image} alt={COST.imageAlt} loading="lazy" />
//                 <div className="cwa-cost-media-overlay" />
//                 <div className="cwa-cost-media-tag">
//                   <span className="cwa-cost-media-tag-pulse" />
//                   Failure modes · 90-day
//                 </div>
//               </div>
//             </div>

//             <div className="cwa-fail-grid">
//               {COST.failures.map((f, i) => (
//                 <article key={f.h} className="cwa-fail-card">
//                   <div className="cwa-fail-card-top">
//                     <span className="cwa-fail-card-idx">F—{String(i + 1).padStart(2, "0")}</span>
//                     <span className="cwa-fail-card-arrow" aria-hidden>↗</span>
//                   </div>
//                   <div className="cwa-fail-card-stat">{f.stat}</div>
//                   <div className="cwa-fail-card-label">{f.label}</div>
//                   <div className="cwa-fail-card-divider" />
//                   <h3 className="cwa-fail-card-h">{f.h}</h3>
//                   <p className="cwa-fail-card-d">{f.d}</p>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 4 — HOW WE BUILD (timeline w/ scrub progress line)
//             Vertical timeline with a scroll-linked progress fill, dark theme.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section id="process" className="cwa-process-section" aria-labelledby="cwa-process-title">
//           <div className="cwa-process-inner">
//             <div className="cwa-sh cwa-section-head cwa-section-head--light">
//               <h2 id="cwa-process-title" className="cwa-h2 cwa-h2-light">
//                 How we build —{" "}
//                 <span className="cwa-italic-light">six phases, one team.</span>
//               </h2>
//               <p className="cwa-h2-lead cwa-h2-lead-light">
//                 A delivery rhythm refined across 150+ shipped products.
//                 No surprises, no shipping and praying.
//               </p>
//             </div>

//             <div className="cwa-process-timeline">
//               <div className="cwa-process-line" aria-hidden>
//                 <div className="cwa-process-line-fill" />
//               </div>

//               <ol className="cwa-process-steps">
//                 {PROCESS.map((s, i) => (
//                   <li key={s.num} className="cwa-proc-step" data-side={i % 2 === 0 ? "L" : "R"}>
//                     <div className="cwa-proc-step-marker" aria-hidden>
//                       <span className="cwa-proc-step-marker-num">{s.num}</span>
//                     </div>
//                     <div className="cwa-proc-step-card">
//                       <div className="cwa-proc-step-head">
//                         <h3 className="cwa-proc-step-title">{s.title}</h3>
//                         <span className="cwa-proc-step-meta">{s.meta}</span>
//                       </div>
//                       <p className="cwa-proc-step-desc">{s.d}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ol>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 5 — STACK (interactive code window)
//             Tabs for Frontend / Backend / Data / Infra. Each tab shows
//             a code-window-style listing with name, version, role.
//             Cursor blinks. Feels like inspecting a real package.json.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-stack-section" aria-labelledby="cwa-stack-title">
//           <div className="cwa-stack-inner">
//             <div className="cwa-sh cwa-section-head">
//               <h2 id="cwa-stack-title" className="cwa-h2">
//                 Tooling we <span className="cwa-italic-mute">trust.</span>
//               </h2>
//               <p className="cwa-h2-lead">
//                 Mature, production-ready stacks — picked for your problem,
//                 not because they're new.
//               </p>
//             </div>

//             <div className="cwa-stack-window" role="tabpanel">
//               <div className="cwa-stack-window-chrome">
//                 <div className="cwa-stack-window-dots">
//                   <span /><span /><span />
//                 </div>
//                 <div className="cwa-stack-window-title">stack.config.ts</div>
//                 <div className="cwa-stack-window-meta">— typescript</div>
//               </div>

//               <div className="cwa-stack-window-body">
//                 <div className="cwa-stack-tabs" role="tablist" aria-label="Stack categories">
//                   {STACK.map((g, i) => (
//                     <button
//                       key={g.group}
//                       type="button"
//                       role="tab"
//                       aria-selected={activeStack === i}
//                       className="cwa-stack-tab"
//                       data-active={activeStack === i ? "true" : "false"}
//                       onClick={() => setActiveStack(i)}
//                     >
//                       <span className="cwa-stack-tab-bin">
//                         {String(i + 1).padStart(2, "0")}
//                       </span>
//                       <span>{g.group}</span>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="cwa-stack-code">
//                   <div className="cwa-stack-line cwa-stack-line-pre">
//                     <span className="cwa-stack-ln">1</span>
//                     <span><span className="cwa-syn-key">export const</span> <span className="cwa-syn-var">stack</span> = {"{"}</span>
//                   </div>
//                   <div className="cwa-stack-line cwa-stack-line-pre">
//                     <span className="cwa-stack-ln">2</span>
//                     <span>  <span className="cwa-syn-prop">{STACK[activeStack].group.toLowerCase()}</span>: [</span>
//                   </div>

//                   {STACK[activeStack].items.map((it, i) => (
//                     <div key={`${activeStack}-${it.name}`} className="cwa-stack-line cwa-stack-line-item">
//                       <span className="cwa-stack-ln">{i + 3}</span>
//                       <span className="cwa-stack-line-content">
//                         <span className="cwa-stack-line-indent">    </span>
//                         <span className="cwa-syn-brace">{"{"}</span>
//                         <span className="cwa-syn-prop"> name</span>
//                         <span className="cwa-syn-punct">: </span>
//                         <span className="cwa-syn-str">"{it.name}"</span>
//                         <span className="cwa-syn-punct">, </span>
//                         <span className="cwa-syn-prop">v</span>
//                         <span className="cwa-syn-punct">: </span>
//                         <span className="cwa-syn-str">"{it.v}"</span>
//                         <span className="cwa-syn-punct">, </span>
//                         <span className="cwa-syn-prop">role</span>
//                         <span className="cwa-syn-punct">: </span>
//                         <span className="cwa-syn-str">"{it.role}"</span>
//                         <span className="cwa-syn-brace"> {"}"}</span>
//                         <span className="cwa-syn-punct">,</span>
//                       </span>
//                     </div>
//                   ))}

//                   <div className="cwa-stack-line cwa-stack-line-pre">
//                     <span className="cwa-stack-ln">{STACK[activeStack].items.length + 3}</span>
//                     <span>  ],</span>
//                   </div>
//                   <div className="cwa-stack-line cwa-stack-line-pre">
//                     <span className="cwa-stack-ln">{STACK[activeStack].items.length + 4}</span>
//                     <span>{"}"} <span className="cwa-syn-punct">as const</span><span className="cwa-syn-cursor" aria-hidden /></span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 6 — FAQs
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-faq-section" aria-labelledby="cwa-faq-title">
//           <div className="cwa-faq-layout">
//             <div className="cwa-faq-aside cwa-sh">
//               <h2 id="cwa-faq-title" className="cwa-h2">
//                 Frequently <span className="cwa-italic-mute">asked.</span>
//               </h2>
//               <p className="cwa-h2-lead cwa-faq-lead">
//                 Real questions from real prospects. If yours isn't here, send us a
//                 note — we answer every inquiry within 24 hours.
//               </p>
//               <Link href="/contact" className="cwa-faq-cta">
//                 Ask us anything
//                 <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
//                   <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </Link>
//             </div>

//             <div className="cwa-faq-list">
//               {FAQS.map((f, i) => {
//                 const isOpen = openFaq === i;
//                 return (
//                   <div key={i} className="cwa-faq-row" data-open={isOpen ? "true" : "false"}>
//                     <button
//                       type="button"
//                       className="cwa-faq-q"
//                       onClick={() => setOpenFaq(isOpen ? null : i)}
//                       aria-expanded={isOpen}
//                       suppressHydrationWarning
//                     >
//                       <span className="cwa-faq-q-num">{String(i + 1).padStart(2, "0")}</span>
//                       <span className="cwa-faq-q-text">{f.q}</span>
//                       <span className="cwa-faq-q-icon" aria-hidden>
//                         <svg width="14" height="14" viewBox="0 0 14 14">
//                           <path d="M3 7h8 M7 3v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
//                         </svg>
//                       </span>
//                     </button>
//                     <div className="cwa-faq-a">
//                       <div className="cwa-faq-a-inner">{f.a}</div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 7 — FINAL CTA
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-cta-section" aria-labelledby="cwa-cta-title">
//           <div className="cwa-cta-inner">
//             <div className="cwa-cta-grid">
//               <div className="cwa-cta-left">
//                 <h2 id="cwa-cta-title" className="cwa-cta-h2">
//                   Ready to ship a web app{" "}
//                   <span className="cwa-cta-h2-accent">that lasts?</span>
//                 </h2>
//                 <p className="cwa-cta-lead">
//                   Free 30-minute discovery call. You'll talk directly with an
//                   engineer and a strategist — no sales pitch, just a real
//                   conversation about your problem and timeline.
//                 </p>
//                 <div className="cwa-cta-actions">
//                   <Link href="/contact" className="cwa-cta-primary-light">
//                     <span>Book a discovery call</span>
//                     <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
//                       <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </Link>
//                   <a href="mailto:hello@techbinaries.com" className="cwa-cta-mail">
//                     hello@techbinaries.com
//                   </a>
//                 </div>
//               </div>

//               <div className="cwa-cta-right">
//                 <dl className="cwa-cta-meta">
//                   <div className="cwa-cta-meta-item">
//                     <dt>Response time</dt>
//                     <dd>Within 24h</dd>
//                   </div>
//                   <div className="cwa-cta-meta-item">
//                     <dt>MVP timeline</dt>
//                     <dd>8–12 weeks</dd>
//                   </div>
//                   <div className="cwa-cta-meta-item">
//                     <dt>Engagement</dt>
//                     <dd>Fixed or T&amp;M</dd>
//                   </div>
//                   <div className="cwa-cta-meta-item">
//                     <dt>Based in</dt>
//                     <dd>Global · remote</dd>
//                   </div>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </section>

//         <SiteFooter />
//       </div>

//       <style>{`
//         /* ═══════════════════════════════════════════════════════════════
//            DESIGN TOKENS (consistent across all sub-services)
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-sh,
//         .cwa-h1-line,
//         .cwa-pillar-row,
//         .cwa-fail-card,
//         .cwa-proc-step,
//         .cwa-stack-line,
//         .cwa-faq-row,
//         .cwa-cta-inner {
//           will-change: transform, opacity;
//         }

//         /* shared headings */
//         .cwa-h2 {
//           font-family: var(--font-display);
//           font-size: clamp(34px, 4.6vw, 64px);
//           font-weight: 500;
//           letter-spacing: -0.034em;
//           line-height: 1.02;
//           margin: 0 0 18px;
//           max-width: 680px;
//         }
//         .cwa-h2-light { color: #fafaf9; max-width: 760px; }
//         .cwa-italic-mute { font-style: italic; font-weight: 400; color: rgba(10,10,10,0.5); }
//         .cwa-italic-light { font-style: italic; font-weight: 400; color: rgba(255,255,255,0.6); }
//         .cwa-h2-lead {
//           font-size: 16px;
//           color: rgba(10,10,10,0.62);
//           line-height: 1.7;
//           margin: 0;
//           max-width: 540px;
//         }
//         .cwa-h2-lead-light { color: rgba(255,255,255,0.62); max-width: 480px; }

//         /* section kicker */
//         .cwa-section-head {
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//           margin-bottom: clamp(48px, 6vw, 80px);
//         }
//         .cwa-section-head--light .cwa-h2 { color: #fafaf9; }
//         .cwa-section-kicker {
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 500;
//           letter-spacing: 0.18em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.55);
//         }
//         .cwa-section-kicker--light { color: rgba(255,255,255,0.55); }
//         .cwa-section-kicker-dot {
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: currentColor;
//           opacity: 0.6;
//         }

//         /* primary CTA — magnetic-feel hover */
//         .cwa-cta-primary {
//           position: relative;
//           display: inline-flex;
//           align-items: center;
//           gap: 0;
//           padding: 0;
//           background: #0a0a0a;
//           color: #fafaf9;
//           text-decoration: none;
//           font-size: 14px;
//           font-weight: 500;
//           border-radius: 999px;
//           overflow: hidden;
//           transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-cta-primary::before {
//           content: "";
//           position: absolute; inset: 0;
//           background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%);
//           transform: scale(0);
//           transform-origin: center;
//           border-radius: 999px;
//           transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
//           z-index: 0;
//         }
//         .cwa-cta-primary:hover { transform: translateY(-2px); }
//         .cwa-cta-primary:hover::before { transform: scale(1.05); }
//         .cwa-cta-primary-label {
//           position: relative;
//           z-index: 1;
//           padding: 15px 12px 15px 26px;
//         }
//         .cwa-cta-primary-arrow {
//           position: relative;
//           z-index: 1;
//           padding: 15px 24px 15px 8px;
//           display: inline-flex;
//           align-items: center;
//           transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-cta-primary:hover .cwa-cta-primary-arrow { transform: translateX(4px); }

//         .cwa-cta-ghost {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 14px 24px;
//           border: 1px solid rgba(10,10,10,0.85);
//           color: #0a0a0a;
//           text-decoration: none;
//           font-size: 14px;
//           font-weight: 500;
//           border-radius: 999px;
//           transition: background 0.25s, color 0.25s;
//         }
//         .cwa-cta-ghost:hover { background: #0a0a0a; color: #fafaf9; }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 1 — HERO
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-hero {
//           position: relative;
//           min-height: 100vh;
//           padding: clamp(150px, 17vh, 190px) 20px 56px;
//           background: #0a0a0a;
//           overflow: hidden;
//         }
//         .cwa-hero-video-wrap {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//           z-index: 0;
//         }
//         .cwa-hero-bg-video {
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           object-position: center;
//           z-index: 0;
//           pointer-events: none;
//         }
//         .cwa-hero-mobile-bg {
//           display: none;
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           object-position: center 28%;
//           z-index: 0;
//           pointer-events: none;
//         }
//         .cwa-hero-bg-overlay {
//           position: absolute;
//           inset: 0;
//           z-index: 0;
//           pointer-events: none;
//           background:
//             linear-gradient(90deg, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.64) 36%, rgba(0,0,0,0.42) 62%, rgba(0,0,0,0.24) 82%, rgba(0,0,0,0.16) 100%),
//             linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.58) 100%);
//         }
//         .cwa-hero-bg-spotlight {
//           position: absolute;
//           inset: 0;
//           z-index: 0;
//           pointer-events: none;
//           background: radial-gradient(1000px 520px at 18% 36%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 34%, transparent 72%);
//           mix-blend-mode: screen;
//         }
//         .cwa-hero-inner {
//           position: relative;
//           max-width: 1320px;
//           margin: 0 auto;
//           z-index: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 56px;
//         }
//         .cwa-hero .csd-hero-main {
//           display: grid;
//           grid-template-columns: minmax(0, 1.15fr) minmax(420px, 0.85fr);
//           gap: clamp(32px, 4vw, 64px);
//           align-items: center;
//           min-height: calc(100vh - 246px);
//         }
//         .cwa-hero .csd-hero-left {
//           min-width: 0;
//           max-width: 780px;
//           transform: translateY(clamp(22px, 4vh, 48px));
//         }
//         .cwa-hero .csd-hero-mobile-spacer {
//           display: none;
//         }
//         .cwa-hero-copy { min-width: 0; }

//         /* HERO FORM — same as Custom Software Development service page (scoped) */
//         .cwa-hero .csd-hero-right {
//           position: relative;
//           align-self: stretch;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .cwa-hero .csd-hero-form-shell {
//           position: relative;
//           width: 100%;
//           max-width: 540px;
//           margin-left: auto;
//           padding: 28px 26px 24px;
//           border-radius: 20px;
//           overflow: hidden;
//           border: 1px solid rgba(255,255,255,0.2);
//           backdrop-filter: blur(10px);
//           background:
//             linear-gradient(145deg, rgba(12,12,12,0.68) 0%, rgba(12,12,12,0.45) 100%);
//           box-shadow:
//             0 36px 84px -32px rgba(0,0,0,0.62),
//             inset 0 1px 0 rgba(255,255,255,0.18);
//         }
//         .cwa-hero .csd-hero-form-title {
//           margin: 0;
//           font-family: var(--font-display);
//           font-size: clamp(26px, 2.6vw, 36px);
//           font-weight: 500;
//           letter-spacing: -0.03em;
//           color: #fff;
//           line-height: 1.05;
//         }
//         .cwa-hero .csd-hero-form-subtitle {
//           margin: 10px 0 20px;
//           color: rgba(255,255,255,0.72);
//           font-size: 14px;
//           line-height: 1.6;
//           max-width: 44ch;
//         }
//         .cwa-hero .csd-hero-form {
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//         }
//         .cwa-hero .csd-hero-form-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 12px;
//         }
//         .cwa-hero .csd-hero-form-field {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }
//         .cwa-hero .csd-hero-form-field span {
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.07em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.74);
//         }
//         .cwa-hero .csd-hero-phone-row {
//           display: flex;
//           align-items: stretch;
//           width: 100%;
//           border: none;
//           border-radius: 0;
//           background: transparent;
//           border-bottom: 1px solid rgba(255,255,255,0.42);
//           overflow: visible;
//           transition: border-color 0.2s;
//         }
//         .cwa-hero .csd-hero-form-field--phone:focus-within .csd-hero-phone-row {
//           border-bottom-color: rgba(96, 165, 250, 0.95);
//           box-shadow: none;
//           background: transparent;
//         }
//         .cwa-hero .csd-hero-phone-sep {
//           width: 1px;
//           align-self: center;
//           height: 1.15em;
//           background: rgba(255,255,255,0.38);
//           flex-shrink: 0;
//           margin: 0 10px 0 0;
//         }
//         .cwa-hero .csd-hero-form-field input,
//         .cwa-hero .csd-hero-form-field select,
//         .cwa-hero .csd-hero-form-field textarea {
//           width: 100%;
//           border: none;
//           border-radius: 0;
//           background: transparent;
//           color: #fff;
//           border-bottom: 1px solid rgba(255,255,255,0.42);
//           padding: 10px 0 14px;
//           font-size: 14px;
//           outline: none;
//           box-shadow: none;
//           transition: border-color 0.2s;
//         }
//         .cwa-hero .csd-hero-form-field textarea {
//           resize: vertical;
//           min-height: 92px;
//         }
//         .cwa-hero .csd-hero-form-field input::placeholder,
//         .cwa-hero .csd-hero-form-field textarea::placeholder {
//           color: rgba(255,255,255,0.45);
//         }
//         .cwa-hero .csd-hero-form-field select {
//           color: rgba(255,255,255,0.75);
//           appearance: none;
//           background-color: transparent;
//           background-image:
//             linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.72) 50%),
//             linear-gradient(135deg, rgba(255,255,255,0.72) 50%, transparent 50%);
//           background-position:
//             calc(100% - 4px) calc(1em + 6px),
//             calc(100% - 0px) calc(1em + 6px);
//           background-size: 5px 5px, 5px 5px;
//           background-repeat: no-repeat;
//         }
//         .cwa-hero .csd-hero-form-field select:invalid {
//           color: rgba(255,255,255,0.65);
//         }
//         .cwa-hero .csd-hero-form-field select option {
//           color: #0a0a0a;
//           background: #ffffff;
//         }
//         .cwa-hero .csd-hero-form-field select option[disabled] {
//           color: rgba(10,10,10,0.55);
//         }
//         .cwa-hero .csd-hero-form-field input:focus,
//         .cwa-hero .csd-hero-form-field select:focus,
//         .cwa-hero .csd-hero-form-field textarea:focus {
//           border-bottom-color: rgba(96, 165, 250, 0.95);
//           box-shadow: none;
//           background: transparent;
//         }
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc,
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num {
//           width: auto !important;
//           border: none !important;
//           border-radius: 0 !important;
//           background: transparent !important;
//           box-shadow: none !important;
//         }
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc {
//           flex: 0 0 auto;
//           min-width: 84px;
//           max-width: 110px;
//           padding: 10px 26px 14px 0 !important;
//           color: rgba(255,255,255,0.78) !important;
//         }
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num {
//           flex: 1 1 auto;
//           min-width: 0;
//           padding: 10px 0 14px 0 !important;
//         }
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc:focus,
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num:focus {
//           box-shadow: none !important;
//           border: none !important;
//           background: transparent !important;
//         }
//         .cwa-hero .csd-hero-form input:-webkit-autofill,
//         .cwa-hero .csd-hero-form input:-webkit-autofill:hover,
//         .cwa-hero .csd-hero-form input:-webkit-autofill:focus,
//         .cwa-hero .csd-hero-form input:-webkit-autofill:active,
//         .cwa-hero .csd-hero-form textarea:-webkit-autofill,
//         .cwa-hero .csd-hero-form textarea:-webkit-autofill:hover,
//         .cwa-hero .csd-hero-form textarea:-webkit-autofill:focus,
//         .cwa-hero .csd-hero-form textarea:-webkit-autofill:active,
//         .cwa-hero .csd-hero-form select:-webkit-autofill,
//         .cwa-hero .csd-hero-form select:-webkit-autofill:hover,
//         .cwa-hero .csd-hero-form select:-webkit-autofill:focus,
//         .cwa-hero .csd-hero-form select:-webkit-autofill:active {
//           -webkit-text-fill-color: rgba(255, 255, 255, 0.95) !important;
//           caret-color: #fff;
//           transition: background-color 99999s ease-out 0s;
//           -webkit-box-shadow: 0 0 0 1000px #0c0c0c inset !important;
//           box-shadow: 0 0 0 1000px #0c0c0c inset !important;
//         }
//         .cwa-hero .csd-hero-form input:autofill,
//         .cwa-hero .csd-hero-form textarea:autofill,
//         .cwa-hero .csd-hero-form select:autofill {
//           -webkit-text-fill-color: rgba(255, 255, 255, 0.95);
//           color: rgba(255, 255, 255, 0.95) !important;
//         }
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc:-webkit-autofill,
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc:-webkit-autofill:hover,
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc:-webkit-autofill:focus,
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num:-webkit-autofill,
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num:-webkit-autofill:hover,
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num:-webkit-autofill:focus {
//           -webkit-text-fill-color: rgba(255, 255, 255, 0.95) !important;
//           -webkit-box-shadow: 0 0 0 1000px #0c0c0c inset !important;
//           box-shadow: 0 0 0 1000px #0c0c0c inset !important;
//         }
//         .cwa-hero .csd-hero-form-foot {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           margin-top: 6px;
//         }
//         .cwa-hero .csd-hero-form-captcha {
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           color: rgba(255,255,255,0.85);
//           font-weight: 600;
//           flex-shrink: 0;
//         }
//         .cwa-hero .csd-hero-form-captcha input {
//           width: 56px;
//           border: none;
//           border-radius: 0;
//           background: transparent;
//           color: #fff;
//           border-bottom: 1px solid rgba(255,255,255,0.42);
//           padding: 8px 0 10px;
//           outline: none;
//           box-shadow: none;
//           transition: border-color 0.2s;
//         }
//         .cwa-hero .csd-hero-form-captcha input:focus {
//           border-bottom-color: rgba(96, 165, 250, 0.95);
//         }
//         .cwa-hero .csd-hero-form-submit {
//           border: none;
//           border-radius: 999px;
//           padding: 12px 20px;
//           font-size: 13px;
//           font-weight: 700;
//           letter-spacing: 0.01em;
//           color: #fff;
//           background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
//           box-shadow: 0 10px 24px -10px rgba(37,99,235,0.8);
//           cursor: pointer;
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }
//         .cwa-hero .csd-hero-form-submit:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 14px 28px -12px rgba(37,99,235,0.9);
//         }
//         .cwa-hero .csd-hero-form-note {
//           margin: 2px 0 0;
//           font-size: 12px;
//           color: rgba(255,255,255,0.62);
//         }

//         .cwa-crumb {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           font-family: var(--font-mono);
//           font-size: 11px;
//           letter-spacing: 0.06em;
//           color: rgba(10,10,10,0.5);
//           margin-bottom: 28px;
//         }
//         .cwa-crumb-link { color: rgba(10,10,10,0.55); text-decoration: none; transition: color 0.2s; }
//         .cwa-crumb-link:hover { color: #0a0a0a; }
//         .cwa-crumb-sep { opacity: 0.4; }
//         .cwa-crumb-current { color: #0a0a0a; }

//         .cwa-eyebrow {
//           display: inline-flex;
//           align-items: center;
//           gap: 12px;
//           padding: 7px 16px 7px 8px;
//           border: 1px solid rgba(10,10,10,0.12);
//           background: rgba(255,255,255,0.7);
//           border-radius: 999px;
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.7);
//           margin-bottom: 24px;
//         }
//         .cwa-eyebrow-bin {
//           font-family: var(--font-mono);
//           font-size: 10px;
//           padding: 3px 9px;
//           background: #0a0a0a;
//           color: #fafaf9;
//           border-radius: 999px;
//           letter-spacing: 0.1em;
//         }
//         .cwa-eyebrow-line {
//           width: 14px;
//           height: 1px;
//           background: rgba(10,10,10,0.25);
//         }

//         .cwa-hero-title {
//           font-family: var(--font-display);
//           font-size: clamp(40px, 4.5vw, 72px);
//           font-weight: 500;
//           line-height: 0.98;
//           letter-spacing: -0.045em;
//           margin: 0 0 26px;
//           color: #fff;
//           max-width: 720px;
//           text-shadow: 0 10px 30px rgba(0,0,0,0.34);
//         }
//         .cwa-h1-line {
//           overflow: visible;
//           padding-bottom: 0.075em;
//           display: block;
//           white-space: nowrap;
//           width: 100%;
//         }
//         .cwa-h1-char { display: inline-block; will-change: transform; }
//         .cwa-h1-italic {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(255,255,255,0.96);
//           display: inline-block;
//           white-space: nowrap;
//           padding: 0 0.08em;
//           border-radius: 0.16em;
//           background: rgba(255,255,255,0.08);
//           text-shadow: 0 8px 24px rgba(0,0,0,0.36);
//         }

//         .cwa-hero-lead {
//           font-size: 17px;
//           color: rgba(255,255,255,0.84);
//           max-width: 600px;
//           line-height: 1.7;
//           margin: 0 0 32px;
//           text-shadow: 0 6px 18px rgba(0,0,0,0.28);
//         }

//         .cwa-hero-cta-row {
//           display: flex;
//           gap: 12px;
//           flex-wrap: wrap;
//           margin-bottom: 48px;
//         }
//         .cwa-hero .csd-cta-primary {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 15px 28px;
//           background: #ffffff;
//           color: #0a0a0a;
//           text-decoration: none;
//           font-size: 14px;
//           font-weight: 500;
//           border-radius: 999px;
//           position: relative;
//           overflow: hidden;
//         }
//         .cwa-hero .csd-cta-primary::before {
//           content: "";
//           position: absolute; inset: 0;
//           background: linear-gradient(90deg, #e7e5e4, #ffffff);
//           transform: translateX(-101%);
//           transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
//           z-index: 1;
//         }
//         .cwa-hero .csd-cta-primary:hover::before { transform: translateX(0); }
//         .cwa-hero .csd-cta-primary:hover .csd-cta-arrow { transform: translateX(2px); }
//         .cwa-hero .csd-cta-arrow { transition: transform 0.25s ease; }

//         /* hero metrics — 4-up bordered */
//         .cwa-hero-metrics {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 0;
//           margin: 0;
//           border-top: 1px solid rgba(10,10,10,0.1);
//           padding-top: 24px;
//           max-width: 600px;
//         }
//         .cwa-hero-metric {
//           padding-right: 18px;
//           border-right: 1px solid rgba(10,10,10,0.08);
//         }
//         .cwa-hero-metric:not(:first-child) { padding-left: 18px; }
//         .cwa-hero-metric:last-child { border-right: 0; padding-right: 0; }
//         .cwa-hero-metric dd {
//           font-family: var(--font-display);
//           font-size: clamp(20px, 1.9vw, 26px);
//           font-weight: 500;
//           letter-spacing: -0.028em;
//           color: #0a0a0a;
//           margin: 0 0 4px;
//           line-height: 1;
//           font-variant-numeric: tabular-nums;
//         }
//         .cwa-hero-metric dt {
//           font-size: 10px;
//           font-weight: 600;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.5);
//           margin: 0;
//         }

//         /* hero canvas (signature interaction) */
//         .cwa-hero-canvas {
//           position: relative;
//           aspect-ratio: 16 / 17;
//           border-radius: 22px;
//           overflow: hidden;
//           background: linear-gradient(160deg, #0a0a0a 0%, #141414 100%);
//           color: #fafaf9;
//           box-shadow:
//             0 60px 120px -50px rgba(10,10,10,0.45),
//             inset 0 1px 0 rgba(255,255,255,0.06);
//           --mx: 50%;
//           --my: 50%;
//         }
//         .cwa-hero-canvas-spot {
//           position: absolute;
//           inset: 0;
//           background: radial-gradient(circle 280px at var(--mx) var(--my),
//             rgba(255,255,255,0.06) 0%,
//             rgba(255,255,255,0) 60%);
//           pointer-events: none;
//           transition: background 0.1s ease;
//         }
//         .cwa-hero-canvas-grid {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
//           background-size: 32px 32px;
//           mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
//           -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 30%, transparent 100%);
//           pointer-events: none;
//         }
//         .cwa-hero-canvas-chrome {
//           position: relative;
//           z-index: 2;
//           display: grid;
//           grid-template-columns: auto 1fr auto;
//           align-items: center;
//           gap: 14px;
//           padding: 14px 18px;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//         }
//         .cwa-hero-canvas-dots { display: flex; gap: 6px; }
//         .cwa-hero-canvas-dots span {
//           width: 9px; height: 9px;
//           border-radius: 50%;
//           background: rgba(255,255,255,0.12);
//         }
//         .cwa-hero-canvas-dots span:first-child { background: rgba(248, 113, 113, 0.5); }
//         .cwa-hero-canvas-dots span:nth-child(2) { background: rgba(250, 204, 21, 0.5); }
//         .cwa-hero-canvas-dots span:nth-child(3) { background: rgba(74, 222, 128, 0.5); }
//         .cwa-hero-canvas-url {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           color: rgba(255,255,255,0.55);
//           padding: 6px 12px;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.06);
//           border-radius: 6px;
//           text-align: center;
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           justify-content: center;
//         }
//         .cwa-hero-canvas-url-lock {
//           color: rgba(74, 222, 128, 0.7);
//           font-size: 8px;
//         }
//         .cwa-hero-canvas-meta {
//           font-family: var(--font-mono);
//           font-size: 10px;
//           color: rgba(255,255,255,0.4);
//           letter-spacing: 0.04em;
//         }
//         .cwa-hero-canvas-body {
//           position: relative;
//           z-index: 2;
//           padding: 22px 22px 18px;
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//           height: calc(100% - 50px);
//         }
//         .cwa-hero-canvas-row {
//           display: grid;
//           grid-template-columns: 56px 1fr auto auto;
//           align-items: center;
//           gap: 12px;
//           padding: 10px 14px;
//           background: rgba(255,255,255,0.025);
//           border: 1px solid rgba(255,255,255,0.05);
//           border-radius: 8px;
//           font-family: var(--font-mono);
//           font-size: 12px;
//           color: rgba(255,255,255,0.7);
//           will-change: opacity, transform;
//         }
//         .cwa-hcr-label {
//           font-size: 10px;
//           font-weight: 700;
//           color: rgba(96, 165, 250, 0.85);
//           letter-spacing: 0.06em;
//         }
//         .cwa-hcr-path { color: rgba(255,255,255,0.78); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
//         .cwa-hcr-stat {
//           font-size: 10px;
//           font-weight: 700;
//           padding: 2px 6px;
//           border-radius: 4px;
//         }
//         .cwa-hcr-stat.ok {
//           color: rgba(74, 222, 128, 0.95);
//           background: rgba(74, 222, 128, 0.1);
//         }
//         .cwa-hcr-time {
//           font-size: 10px;
//           color: rgba(255,255,255,0.4);
//           font-variant-numeric: tabular-nums;
//         }
//         .cwa-hero-canvas-divider {
//           height: 1px;
//           background: rgba(255,255,255,0.06);
//           margin: 4px 0;
//         }
//         .cwa-hero-canvas-stats {
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }
//         .cwa-hero-canvas-stats > .cwa-hero-canvas-row:first-child {
//           grid-template-columns: 1fr 1fr 1fr;
//           padding: 14px;
//         }
//         .cwa-hcs-block { display: flex; flex-direction: column; gap: 4px; }
//         .cwa-hcs-k {
//           font-size: 9px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.4);
//         }
//         .cwa-hcs-v {
//           font-family: var(--font-display);
//           font-size: 18px;
//           font-weight: 500;
//           letter-spacing: -0.02em;
//           color: rgba(255,255,255,0.95);
//           font-variant-numeric: tabular-nums;
//         }
//         .cwa-hcs-v-good { color: rgba(74, 222, 128, 0.9); }
//         .cwa-hero-canvas-bars {
//           display: flex;
//           align-items: flex-end;
//           gap: 4px;
//           height: 56px;
//           width: 100%;
//           padding: 0;
//         }
//         .cwa-hero-canvas-stats > .cwa-hero-canvas-row:last-child {
//           grid-template-columns: 1fr;
//           padding: 12px 14px;
//         }
//         .cwa-hero-canvas-bars span {
//           flex: 1;
//           background: linear-gradient(180deg, rgba(96, 165, 250, 0.5) 0%, rgba(96, 165, 250, 0.15) 100%);
//           border-radius: 1px 1px 0 0;
//           min-width: 4px;
//           animation: cwa-bar-pulse 3s ease-in-out infinite;
//         }
//         .cwa-hero-canvas-bars span:nth-child(odd) { animation-delay: 0.3s; }
//         .cwa-hero-canvas-bars span:nth-child(3n) { animation-delay: 0.6s; }
//         @keyframes cwa-bar-pulse {
//           0%, 100% { opacity: 0.7; }
//           50% { opacity: 1; }
//         }

//         .cwa-hero-canvas-foot {
//           margin-top: auto;
//           grid-template-columns: auto auto 1fr auto !important;
//           font-size: 11px !important;
//           color: rgba(255,255,255,0.55) !important;
//           padding: 8px 14px !important;
//         }
//         .cwa-hcf-pulse {
//           width: 7px; height: 7px;
//           border-radius: 50%;
//           background: rgba(74, 222, 128, 0.95);
//           box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.18);
//           animation: cwa-pulse 1.8s ease-in-out infinite;
//         }
//         @keyframes cwa-pulse {
//           0%, 100% { box-shadow: 0 0 0 3px rgba(74, 222, 128, 0.18); }
//           50% { box-shadow: 0 0 0 6px rgba(74, 222, 128, 0.05); }
//         }
//         .cwa-hcf-spacer { flex: 1; }
//         .cwa-hcf-build {
//           font-family: var(--font-mono);
//           font-size: 10px;
//           color: rgba(255,255,255,0.35);
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 2 — GROWTH (sticky-sync)
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-growth {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #f5f5f4;
//           border-top: 1px solid rgba(10,10,10,0.06);
//         }
//         .cwa-growth-inner {
//           max-width: 1320px;
//           margin: 0 auto;
//         }
//         .cwa-growth-head-inline {
//           flex-direction: row;
//           align-items: flex-end;
//           justify-content: space-between;
//           gap: clamp(28px, 4vw, 64px);
//         }
//         .cwa-growth-head-inline .cwa-h2 {
//           margin: 0;
//           flex: 0 1 680px;
//         }
//         .cwa-growth-head-inline .cwa-h2-lead {
//           flex: 0 1 560px;
//           margin: 0 0 28px;
//           transform: translateY(-10px);
//         }
//         .cwa-growth-grid {
//           display: grid;
//           grid-template-columns: 1fr 1.05fr;
//           gap: clamp(40px, 5vw, 88px);
//           align-items: start;
//         }
//         .cwa-growth-media-wrap {
//           position: sticky;
//           top: 100px;
//           align-self: start;
//         }
//         .cwa-growth-media {
//           position: relative;
//           aspect-ratio: 4 / 5;
//           border-radius: clamp(20px, 2.4vw, 28px);
//           overflow: hidden;
//           background: #0a0a0a;
//           box-shadow: 0 50px 100px -50px rgba(10,10,10,0.4);
//         }
//         .cwa-growth-media img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           filter: saturate(1.06) contrast(1.04);
//         }
//         .cwa-growth-media-overlay {
//           position: absolute;
//           inset: 0;
//           background:
//             linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.7) 100%);
//           pointer-events: none;
//         }
//         .cwa-growth-media-tag {
//           position: absolute;
//           top: 22px;
//           left: 22px;
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           padding: 8px 14px;
//           background: rgba(255,255,255,0.95);
//           border-radius: 999px;
//           font-size: 11px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: #0a0a0a;
//         }
//         .cwa-growth-media-tag-dot {
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: #16a34a;
//           box-shadow: 0 0 0 3px rgba(22,163,74,0.18);
//           animation: cwa-pulse 1.8s ease-in-out infinite;
//         }
//         .cwa-growth-media-progress {
//           position: absolute;
//           top: 22px;
//           right: 22px;
//           display: flex;
//           gap: 6px;
//         }
//         .cwa-growth-media-progress span {
//           width: 18px;
//           height: 3px;
//           border-radius: 999px;
//           background: rgba(255,255,255,0.25);
//           transition: background 0.4s, width 0.4s;
//         }
//         .cwa-growth-media-progress span[data-active="true"] {
//           background: #fafaf9;
//           width: 28px;
//         }
//         .cwa-growth-media-active {
//           position: absolute;
//           left: 22px; right: 22px; bottom: 22px;
//           padding: 18px 20px;
//           background: rgba(10,10,10,0.5);
//           backdrop-filter: blur(16px);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 14px;
//           color: #fafaf9;
//           display: flex;
//           gap: 18px;
//           align-items: center;
//         }
//         .cwa-growth-media-active-num {
//           font-family: var(--font-display);
//           font-size: 36px;
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           color: rgba(255,255,255,0.4);
//           line-height: 1;
//           font-variant-numeric: tabular-nums;
//         }
//         .cwa-growth-media-active-body {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }
//         .cwa-growth-media-active-k {
//           font-family: var(--font-display);
//           font-size: 18px;
//           font-weight: 500;
//           letter-spacing: -0.02em;
//           line-height: 1;
//         }
//         .cwa-growth-media-active-v {
//           font-size: 12px;
//           color: rgba(255,255,255,0.65);
//         }

//         .cwa-pillar-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: flex;
//           flex-direction: column;
//         }
//         .cwa-pillar-row {
//           display: grid;
//           grid-template-columns: 56px 1fr;
//           gap: 22px;
//           padding: 32px 0 36px;
//           border-bottom: 1px solid rgba(10,10,10,0.1);
//           opacity: 0.42;
//           transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-pillar-row:first-child { border-top: 1px solid rgba(10,10,10,0.1); }
//         .cwa-pillar-row[data-active="true"] { opacity: 1; }

//         .cwa-pillar-marker {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 8px;
//         }
//         .cwa-pillar-marker-num {
//           font-family: var(--font-display);
//           font-size: 26px;
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           color: transparent;
//           -webkit-text-stroke: 1px rgba(10,10,10,0.3);
//           font-variant-numeric: tabular-nums;
//           line-height: 1;
//           transition: color 0.5s, -webkit-text-stroke-color 0.5s;
//         }
//         .cwa-pillar-row[data-active="true"] .cwa-pillar-marker-num {
//           color: #0a0a0a;
//           -webkit-text-stroke-color: transparent;
//         }
//         .cwa-pillar-marker-line {
//           width: 1px;
//           height: 30px;
//           background: rgba(10,10,10,0.15);
//           transition: background 0.5s, height 0.5s;
//         }
//         .cwa-pillar-row[data-active="true"] .cwa-pillar-marker-line {
//           background: #0a0a0a;
//           height: 50px;
//         }

//         .cwa-pillar-body {
//           display: grid;
//           grid-template-columns: minmax(0, 1fr) auto;
//           column-gap: 22px;
//           row-gap: 12px;
//           align-items: start;
//         }
//         .cwa-pillar-head { display: contents; }
//         .cwa-pillar-title {
//           font-family: var(--font-display);
//           font-size: clamp(22px, 2.4vw, 30px);
//           font-weight: 500;
//           letter-spacing: -0.022em;
//           line-height: 1.18;
//           margin: 0;
//           color: #0a0a0a;
//           grid-column: 1;
//         }
//         .cwa-pillar-metric {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 500;
//           letter-spacing: 0.06em;
//           color: rgba(10,10,10,0.6);
//           padding: 6px 12px;
//           background: rgba(10,10,10,0.05);
//           border: 1px solid rgba(10,10,10,0.08);
//           border-radius: 999px;
//           white-space: nowrap;
//           grid-column: 2;
//           justify-self: end;
//           transition: background 0.4s, color 0.4s, border-color 0.4s;
//         }
//         .cwa-pillar-row[data-active="true"] .cwa-pillar-metric {
//           background: #0a0a0a;
//           color: #fafaf9;
//           border-color: #0a0a0a;
//         }
//         .cwa-pillar-desc {
//           font-size: 15px;
//           line-height: 1.7;
//           color: rgba(10,10,10,0.65);
//           margin: 0;
//           grid-column: 1 / -1;
//           max-width: 52ch;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 3 — COST
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-cost {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #fafaf9;
//           border-top: 1px solid rgba(10,10,10,0.06);
//         }
//         .cwa-cost-inner { max-width: 1320px; margin: 0 auto; }

//         .cwa-cost-split {
//           display: grid;
//           grid-template-columns: 1.05fr 0.95fr;
//           gap: clamp(40px, 5vw, 88px);
//           align-items: stretch;
//           margin-bottom: clamp(48px, 6vw, 72px);
//         }
//         .cwa-cost-content {
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//           padding: clamp(20px, 3vw, 40px) 0;
//         }
//         .cwa-cost-content .cwa-h2 { margin: 0; }
//         .cwa-cost-content .cwa-h2-lead { margin: 0; }
//         .cwa-cost-close {
//           font-size: 14.5px;
//           line-height: 1.7;
//           color: rgba(10,10,10,0.6);
//           margin: 16px 0 0;
//           padding-top: 22px;
//           border-top: 1px solid rgba(10,10,10,0.1);
//           max-width: 540px;
//         }
//         .cwa-cost-media {
//           position: relative;
//           overflow: hidden;
//           background: #0a0a0a;
//           border-radius: clamp(20px, 2.4vw, 28px);
//           min-height: 420px;
//         }
//         .cwa-cost-media img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           filter: saturate(1.06) contrast(1.04);
//           transition: transform 1.2s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-cost-media:hover img { transform: scale(1.04); }
//         .cwa-cost-media-overlay {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(180deg, rgba(10,10,10,0.12) 0%, rgba(10,10,10,0.55) 100%);
//           pointer-events: none;
//         }
//         .cwa-cost-media-tag {
//           position: absolute;
//           bottom: 22px;
//           left: 22px;
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           padding: 8px 14px;
//           background: rgba(255,255,255,0.95);
//           border-radius: 999px;
//           font-size: 11px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: #0a0a0a;
//         }
//         .cwa-cost-media-tag-pulse {
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: #ef4444;
//           box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
//           animation: cwa-pulse 1.8s ease-in-out infinite;
//         }

//         .cwa-fail-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 0;
//           border-top: 1px solid rgba(10,10,10,0.1);
//           border-left: 1px solid rgba(10,10,10,0.1);
//         }
//         .cwa-fail-card {
//           padding: 32px 28px 36px;
//           border-right: 1px solid rgba(10,10,10,0.1);
//           border-bottom: 1px solid rgba(10,10,10,0.1);
//           display: flex;
//           flex-direction: column;
//           background: #fafaf9;
//           position: relative;
//           transition: background 0.3s ease;
//           overflow: hidden;
//         }
//         .cwa-fail-card::before {
//           content: "";
//           position: absolute;
//           left: 0; right: 0; top: 0;
//           height: 2px;
//           background: #0a0a0a;
//           transform: scaleX(0);
//           transform-origin: left;
//           transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-fail-card:hover { background: rgba(10,10,10,0.025); }
//         .cwa-fail-card:hover::before { transform: scaleX(1); }
//         .cwa-fail-card-top {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 20px;
//         }
//         .cwa-fail-card-idx {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 500;
//           letter-spacing: 0.1em;
//           color: rgba(10,10,10,0.4);
//         }
//         .cwa-fail-card-arrow {
//           font-size: 14px;
//           color: rgba(10,10,10,0.3);
//           transition: color 0.3s, transform 0.3s;
//         }
//         .cwa-fail-card:hover .cwa-fail-card-arrow {
//           color: #0a0a0a;
//           transform: translate(2px, -2px);
//         }
//         .cwa-fail-card-stat {
//           font-family: var(--font-display);
//           font-size: clamp(40px, 4.4vw, 60px);
//           font-weight: 500;
//           letter-spacing: -0.045em;
//           line-height: 0.92;
//           color: #0a0a0a;
//           font-variant-numeric: tabular-nums;
//           margin-bottom: 8px;
//         }
//         .cwa-fail-card-label {
//           font-size: 11px;
//           font-weight: 700;
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.55);
//           margin-bottom: 22px;
//         }
//         .cwa-fail-card-divider {
//           height: 1px;
//           background: rgba(10,10,10,0.1);
//           margin-bottom: 16px;
//         }
//         .cwa-fail-card-h {
//           font-family: var(--font-display);
//           font-size: 17px;
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           line-height: 1.2;
//           color: #0a0a0a;
//           margin: 0 0 8px;
//         }
//         .cwa-fail-card-d {
//           font-size: 13.5px;
//           line-height: 1.62;
//           color: rgba(10,10,10,0.6);
//           margin: 0;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 4 — PROCESS (timeline)
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-process-section {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #0a0a0a;
//           color: #fafaf9;
//           position: relative;
//           overflow: hidden;
//         }
//         .cwa-process-section::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
//           background-size: 60px 60px;
//           mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
//           -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
//           pointer-events: none;
//         }
//         .cwa-process-inner {
//           position: relative;
//           max-width: 1100px;
//           margin: 0 auto;
//         }
//         .cwa-process-section .cwa-section-head { margin-bottom: clamp(64px, 8vw, 96px); align-items: center; text-align: center; }
//         .cwa-process-section .cwa-h2 { max-width: 700px; }
//         .cwa-process-section .cwa-h2-lead { max-width: 540px; }

//         .cwa-process-timeline {
//           position: relative;
//           padding: 20px 0;
//         }
//         .cwa-process-line {
//           position: absolute;
//           left: 50%;
//           top: 0;
//           bottom: 0;
//           width: 1px;
//           background: rgba(255,255,255,0.08);
//           transform: translateX(-50%);
//         }
//         .cwa-process-line-fill {
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 100%);
//           transform-origin: top center;
//           transform: scaleY(0);
//         }
//         .cwa-process-steps {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: flex;
//           flex-direction: column;
//           gap: clamp(48px, 7vw, 88px);
//           position: relative;
//         }
//         .cwa-proc-step {
//           position: relative;
//           display: grid;
//           grid-template-columns: 1fr 60px 1fr;
//           align-items: center;
//           gap: 0;
//         }
//         .cwa-proc-step-marker {
//           grid-column: 2;
//           display: flex;
//           justify-content: center;
//           z-index: 2;
//         }
//         .cwa-proc-step-marker-num {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.06em;
//           color: rgba(255,255,255,0.85);
//           padding: 6px 12px;
//           background: #0a0a0a;
//           border: 1px solid rgba(255,255,255,0.2);
//           border-radius: 999px;
//           white-space: nowrap;
//         }
//         .cwa-proc-step-card {
//           padding: 28px 30px 30px;
//           background: rgba(255,255,255,0.025);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 14px;
//           backdrop-filter: blur(8px);
//           transition: background 0.3s, border-color 0.3s, transform 0.3s;
//         }
//         .cwa-proc-step-card:hover {
//           background: rgba(255,255,255,0.045);
//           border-color: rgba(255,255,255,0.15);
//           transform: translateY(-2px);
//         }
//         .cwa-proc-step[data-side="L"] .cwa-proc-step-card {
//           grid-column: 1;
//           margin-right: 32px;
//           text-align: right;
//         }
//         .cwa-proc-step[data-side="R"] .cwa-proc-step-card {
//           grid-column: 3;
//           margin-left: 32px;
//           text-align: left;
//         }
//         .cwa-proc-step-head {
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//           margin-bottom: 12px;
//         }
//         .cwa-proc-step[data-side="L"] .cwa-proc-step-head { align-items: flex-end; }
//         .cwa-proc-step[data-side="R"] .cwa-proc-step-head { align-items: flex-start; }
//         .cwa-proc-step-title {
//           font-family: var(--font-display);
//           font-size: clamp(18px, 1.9vw, 22px);
//           font-weight: 500;
//           letter-spacing: -0.02em;
//           line-height: 1.2;
//           margin: 0;
//           color: #fafaf9;
//         }
//         .cwa-proc-step-meta {
//           font-family: var(--font-mono);
//           font-size: 10px;
//           font-weight: 500;
//           letter-spacing: 0.08em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.45);
//         }
//         .cwa-proc-step-desc {
//           font-size: 14px;
//           line-height: 1.65;
//           color: rgba(255,255,255,0.65);
//           margin: 0;
//           max-width: 36ch;
//         }
//         .cwa-proc-step[data-side="L"] .cwa-proc-step-desc { margin-left: auto; }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 5 — STACK (code window)
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-stack-section {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #fafaf9;
//           border-top: 1px solid rgba(10,10,10,0.06);
//         }
//         .cwa-stack-inner { max-width: 1320px; margin: 0 auto; }

//         .cwa-stack-window {
//           background: linear-gradient(160deg, #0a0a0a 0%, #141414 100%);
//           color: #fafaf9;
//           border-radius: 18px;
//           overflow: hidden;
//           box-shadow:
//             0 60px 120px -40px rgba(10,10,10,0.4),
//             inset 0 1px 0 rgba(255,255,255,0.06);
//           border: 1px solid rgba(255,255,255,0.06);
//         }
//         .cwa-stack-window-chrome {
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           padding: 14px 22px;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           background: rgba(255,255,255,0.02);
//         }
//         .cwa-stack-window-dots { display: flex; gap: 6px; }
//         .cwa-stack-window-dots span {
//           width: 10px; height: 10px;
//           border-radius: 50%;
//           background: rgba(255,255,255,0.15);
//         }
//         .cwa-stack-window-dots span:first-child { background: rgba(248,113,113,0.5); }
//         .cwa-stack-window-dots span:nth-child(2) { background: rgba(250,204,21,0.5); }
//         .cwa-stack-window-dots span:nth-child(3) { background: rgba(74,222,128,0.5); }
//         .cwa-stack-window-title {
//           font-family: var(--font-mono);
//           font-size: 12px;
//           color: rgba(255,255,255,0.7);
//           margin-left: 8px;
//         }
//         .cwa-stack-window-meta {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           color: rgba(255,255,255,0.35);
//         }
//         .cwa-stack-window-body {
//           display: grid;
//           grid-template-columns: 220px 1fr;
//         }
//         .cwa-stack-tabs {
//           display: flex;
//           flex-direction: column;
//           padding: 18px 0;
//           border-right: 1px solid rgba(255,255,255,0.06);
//           background: rgba(255,255,255,0.015);
//         }
//         .cwa-stack-tab {
//           background: transparent;
//           border: 0;
//           color: rgba(255,255,255,0.55);
//           font-family: var(--font-display);
//           font-size: 14px;
//           font-weight: 500;
//           letter-spacing: -0.012em;
//           padding: 14px 24px;
//           text-align: left;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           position: relative;
//           transition: color 0.25s, background 0.25s;
//         }
//         .cwa-stack-tab:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.02); }
//         .cwa-stack-tab[data-active="true"] {
//           color: #fafaf9;
//           background: rgba(255,255,255,0.04);
//         }
//         .cwa-stack-tab[data-active="true"]::before {
//           content: "";
//           position: absolute;
//           left: 0; top: 8px; bottom: 8px;
//           width: 2px;
//           background: #fafaf9;
//           border-radius: 0 2px 2px 0;
//         }
//         .cwa-stack-tab-bin {
//           font-family: var(--font-mono);
//           font-size: 10px;
//           font-weight: 500;
//           color: rgba(255,255,255,0.35);
//           letter-spacing: 0.06em;
//         }
//         .cwa-stack-tab[data-active="true"] .cwa-stack-tab-bin { color: rgba(255,255,255,0.7); }

//         .cwa-stack-code {
//           padding: 22px 0;
//           font-family: var(--font-mono);
//           font-size: 13px;
//           line-height: 1.85;
//           min-height: 320px;
//         }
//         .cwa-stack-line {
//           display: grid;
//           grid-template-columns: 56px 1fr;
//           align-items: center;
//           padding: 0 22px;
//         }
//         .cwa-stack-ln {
//           color: rgba(255,255,255,0.18);
//           font-size: 11px;
//           text-align: right;
//           padding-right: 18px;
//           user-select: none;
//         }
//         .cwa-stack-line-pre { color: rgba(255,255,255,0.7); }
//         .cwa-stack-line-item {
//           color: rgba(255,255,255,0.85);
//           transition: background 0.2s;
//         }
//         .cwa-stack-line-item:hover {
//           background: rgba(255,255,255,0.02);
//         }
//         .cwa-stack-line-content { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//         .cwa-stack-line-indent { color: transparent; }
//         .cwa-syn-key   { color: #c084fc; }
//         .cwa-syn-var   { color: #60a5fa; }
//         .cwa-syn-prop  { color: #f9a8d4; }
//         .cwa-syn-str   { color: #86efac; }
//         .cwa-syn-punct { color: rgba(255,255,255,0.4); }
//         .cwa-syn-brace { color: rgba(255,255,255,0.55); }
//         .cwa-syn-cursor {
//           display: inline-block;
//           width: 7px;
//           height: 14px;
//           background: rgba(255,255,255,0.7);
//           margin-left: 4px;
//           vertical-align: middle;
//           animation: cwa-blink 1s step-end infinite;
//         }
//         @keyframes cwa-blink {
//           0%, 50% { opacity: 1; }
//           51%, 100% { opacity: 0; }
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 6 — FAQs
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-faq-section {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #f5f5f4;
//           border-top: 1px solid rgba(10,10,10,0.06);
//         }
//         .cwa-faq-layout {
//           max-width: 1320px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: 380px 1fr;
//           gap: 80px;
//           align-items: start;
//         }
//         .cwa-faq-aside { position: sticky; top: 120px; display: flex; flex-direction: column; gap: 14px; }
//         .cwa-faq-aside .cwa-h2 { margin: 0; }
//         .cwa-faq-aside .cwa-h2-lead { margin: 0 0 10px; }
//         .cwa-faq-cta {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 12px 22px;
//           border: 1px solid rgba(0,0,0,0.85);
//           color: #0a0a0a;
//           text-decoration: none;
//           font-size: 13px;
//           font-weight: 500;
//           border-radius: 999px;
//           transition: background 0.2s, color 0.2s;
//           align-self: flex-start;
//         }
//         .cwa-faq-cta:hover { background: #0a0a0a; color: #fafaf9; }

//         .cwa-faq-list {
//           display: flex;
//           flex-direction: column;
//           border-top: 1px solid rgba(10,10,10,0.1);
//         }
//         .cwa-faq-row { border-bottom: 1px solid rgba(10,10,10,0.1); }
//         .cwa-faq-q {
//           width: 100%;
//           display: grid;
//           grid-template-columns: 50px 1fr 30px;
//           align-items: center;
//           gap: 16px;
//           padding: 22px 0;
//           background: transparent;
//           border: 0;
//           cursor: pointer;
//           text-align: left;
//           color: #0a0a0a;
//           font-family: var(--font-display);
//         }
//         .cwa-faq-q-num {
//           font-family: var(--font-mono);
//           font-size: 12px;
//           font-weight: 500;
//           color: rgba(10,10,10,0.4);
//           letter-spacing: 0.06em;
//         }
//         .cwa-faq-q-text {
//           font-family: var(--font-display);
//           font-size: clamp(16px, 1.5vw, 20px);
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           line-height: 1.32;
//         }
//         .cwa-faq-q-icon {
//           width: 30px; height: 30px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           border: 1px solid rgba(10,10,10,0.18);
//           border-radius: 50%;
//           color: #0a0a0a;
//           transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
//                       background 0.25s, color 0.25s, border-color 0.25s;
//         }
//         .cwa-faq-row[data-open="true"] .cwa-faq-q-icon {
//           transform: rotate(45deg);
//           background: #0a0a0a;
//           color: #fafaf9;
//           border-color: #0a0a0a;
//         }
//         .cwa-faq-a {
//           display: grid;
//           grid-template-rows: 0fr;
//           transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-faq-row[data-open="true"] .cwa-faq-a { grid-template-rows: 1fr; }
//         .cwa-faq-a-inner {
//           overflow: hidden;
//           padding-left: 66px;
//           font-family: var(--font-body);
//           font-size: 15px;
//           line-height: 1.7;
//           color: rgba(10,10,10,0.65);
//           padding-bottom: 0;
//           transition: padding-bottom 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-faq-row[data-open="true"] .cwa-faq-a-inner { padding-bottom: 26px; }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 7 — FINAL CTA
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-cta-section {
//           padding: 64px 20px 80px;
//           background: #fafaf9;
//         }
//         .cwa-cta-inner {
//           max-width: 1320px;
//           margin: 0 auto;
//           padding: clamp(72px, 9vw, 120px) clamp(32px, 5vw, 80px);
//           background: #0a0a0a;
//           color: #fafaf9;
//           border-radius: 28px;
//           position: relative;
//           overflow: hidden;
//         }
//         .cwa-cta-inner::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
//           background-size: 56px 56px;
//           mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 90%);
//           -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 90%);
//           pointer-events: none;
//         }
//         .cwa-cta-grid {
//           position: relative;
//           z-index: 1;
//           display: grid;
//           grid-template-columns: 1.3fr 1fr;
//           gap: clamp(48px, 6vw, 96px);
//           align-items: end;
//         }
//         .cwa-cta-left .cwa-section-kicker { margin-bottom: 18px; }
//         .cwa-cta-h2 {
//           font-family: var(--font-display);
//           font-size: clamp(36px, 5.2vw, 72px);
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           line-height: 0.98;
//           margin: 0 0 24px;
//           color: #fafaf9;
//           max-width: 620px;
//         }
//         .cwa-cta-h2-accent { font-style: italic; font-weight: 400; color: rgba(255,255,255,0.55); }
//         .cwa-cta-lead {
//           font-size: 16px;
//           line-height: 1.7;
//           color: rgba(255,255,255,0.65);
//           margin: 0 0 36px;
//           max-width: 520px;
//         }
//         .cwa-cta-actions { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
//         .cwa-cta-primary-light {
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           padding: 15px 28px;
//           background: #fafaf9;
//           color: #0a0a0a;
//           text-decoration: none;
//           font-size: 14px;
//           font-weight: 500;
//           border-radius: 999px;
//           transition: background 0.25s, transform 0.25s;
//         }
//         .cwa-cta-primary-light:hover { background: #e7e5e4; transform: translateY(-2px); }
//         .cwa-cta-primary-light svg { transition: transform 0.25s; }
//         .cwa-cta-primary-light:hover svg { transform: translateX(2px); }
//         .cwa-cta-mail {
//           font-size: 14px;
//           font-weight: 500;
//           color: rgba(255,255,255,0.65);
//           text-decoration: none;
//           border-bottom: 1px solid rgba(255,255,255,0.25);
//           padding-bottom: 2px;
//           transition: color 0.2s, border-color 0.2s;
//         }
//         .cwa-cta-mail:hover { color: #fafaf9; border-color: #fafaf9; }
//         .cwa-cta-right { display: flex; flex-direction: column; align-items: stretch; }
//         .cwa-cta-meta {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 0;
//           margin: 0;
//           border-top: 1px solid rgba(255,255,255,0.12);
//           border-left: 1px solid rgba(255,255,255,0.12);
//         }
//         .cwa-cta-meta-item {
//           padding: 22px 24px;
//           border-right: 1px solid rgba(255,255,255,0.12);
//           border-bottom: 1px solid rgba(255,255,255,0.12);
//           background: rgba(255,255,255,0.02);
//         }
//         .cwa-cta-meta-item dt {
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(255,255,255,0.5);
//           margin: 0 0 8px;
//         }
//         .cwa-cta-meta-item dd {
//           font-family: var(--font-display);
//           font-size: 17px;
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           color: #fafaf9;
//           margin: 0;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            RESPONSIVE
//         ═══════════════════════════════════════════════════════════════ */
//         @media (max-width: 1100px) {
//           .cwa-hero .csd-hero-main {
//             grid-template-columns: 1fr;
//             gap: 64px;
//             min-height: auto;
//           }
//           .cwa-hero .csd-hero-left { max-width: 760px; }
//           .cwa-hero .csd-hero-right { max-width: 720px; margin: 0 auto; width: 100%; }
//           .cwa-hero .csd-hero-form-shell { max-width: 100%; }
//           .cwa-hero-canvas { max-width: 580px; margin: 0 auto; width: 100%; aspect-ratio: 16 / 17; }

//           .cwa-growth-head-inline {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 14px;
//           }
//           .cwa-growth-head-inline .cwa-h2,
//           .cwa-growth-head-inline .cwa-h2-lead {
//             flex: initial;
//             margin: 0;
//             transform: none;
//           }

//           .cwa-growth-grid { grid-template-columns: 1fr; gap: 48px; }
//           .cwa-growth-media-wrap { position: static; }
//           .cwa-growth-media { aspect-ratio: 16 / 11; max-width: 720px; margin: 0 auto; }

//           .cwa-cost-split { grid-template-columns: 1fr; gap: 40px; }
//           .cwa-cost-media { min-height: 320px; aspect-ratio: 16 / 9; }
//           .cwa-fail-grid { grid-template-columns: repeat(2, 1fr); }

//           .cwa-process-steps { padding-left: 48px; }
//           .cwa-process-line { left: 22px; transform: none; }
//           .cwa-proc-step {
//             grid-template-columns: 1fr;
//           }
//           .cwa-proc-step-marker {
//             position: absolute;
//             left: -38px;
//             top: 18px;
//             grid-column: 1;
//           }
//           .cwa-proc-step[data-side="L"] .cwa-proc-step-card,
//           .cwa-proc-step[data-side="R"] .cwa-proc-step-card {
//             grid-column: 1;
//             margin: 0;
//             text-align: left;
//           }
//           .cwa-proc-step[data-side="L"] .cwa-proc-step-head,
//           .cwa-proc-step[data-side="R"] .cwa-proc-step-head { align-items: flex-start; }
//           .cwa-proc-step[data-side="L"] .cwa-proc-step-desc { margin-left: 0; }

//           .cwa-stack-window-body { grid-template-columns: 1fr; }
//           .cwa-stack-tabs {
//             flex-direction: row;
//             overflow-x: auto;
//             padding: 0;
//             border-right: 0;
//             border-bottom: 1px solid rgba(255,255,255,0.06);
//           }
//           .cwa-stack-tab { padding: 16px 20px; flex-shrink: 0; }
//           .cwa-stack-tab[data-active="true"]::before {
//             top: auto; bottom: 0; left: 20px; right: 20px;
//             width: auto; height: 2px;
//             border-radius: 2px 2px 0 0;
//           }

//           .cwa-faq-layout { grid-template-columns: 1fr; gap: 48px; }
//           .cwa-faq-aside { position: static; }
//           .cwa-cta-grid { grid-template-columns: 1fr; gap: 48px; align-items: start; }
//         }

//         @media (max-width: 1100px) and (min-width: 901px) {
//           .cwa-hero .csd-hero-left {
//             transform: translateY(18px);
//           }
//         }

//         @media (max-width: 900px) {
//           .cwa-hero-bg-video {
//             display: none;
//           }
//           .cwa-hero-mobile-bg {
//             display: block;
//           }
//           .cwa-hero-bg-overlay {
//             background:
//               linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.78) 55%, rgba(0,0,0,0.88) 100%),
//               linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 100%);
//           }
//           .cwa-hero {
//             padding: clamp(96px, 14svh, 128px) 14px 0;
//           }
//           .cwa-hero .csd-hero-mobile-spacer {
//             display: block;
//             flex: 1 1 auto;
//             min-height: min(26vh, 220px);
//             max-height: 44vh;
//           }
//           .cwa-hero .csd-hero-left {
//             display: flex;
//             flex-direction: column;
//             min-height: min(58svh, 580px);
//             transform: none;
//             max-width: none;
//           }
//           .cwa-hero-title {
//             font-size: clamp(28px, 7vw, 40px);
//             line-height: 1.02;
//             margin-bottom: 16px;
//           }
//           .cwa-hero-lead {
//             font-size: 15px;
//             line-height: 1.62;
//             margin-bottom: 24px;
//             max-width: none;
//           }
//           .cwa-hero-inner {
//             gap: 0;
//           }
//           .cwa-hero .csd-hero-main {
//             min-height: auto;
//             gap: 0;
//           }
//           .cwa-hero .csd-hero-right {
//             align-self: stretch;
//             width: 100%;
//             margin-top: 0;
//             align-items: stretch;
//           }
//           .cwa-hero .csd-hero-form-shell {
//             max-width: none;
//             width: 100%;
//             margin: 0 auto;
//             border-radius: 22px;
//             padding: 32px 20px 40px;
//             border: 1px solid rgba(255,255,255,0.2);
//             backdrop-filter: blur(10px);
//             -webkit-backdrop-filter: blur(10px);
//             background:
//               linear-gradient(145deg, rgba(12,12,12,0.68) 0%, rgba(12,12,12,0.45) 100%);
//             box-shadow:
//               0 36px 84px -32px rgba(0,0,0,0.62),
//               inset 0 1px 0 rgba(255,255,255,0.18);
//           }
//           .cwa-hero .csd-hero-form-subtitle {
//             max-width: none;
//           }
//           .cwa-hero .csd-hero-form {
//             gap: 22px;
//           }
//           .cwa-hero .csd-hero-form-field input,
//           .cwa-hero .csd-hero-form-field select,
//           .cwa-hero .csd-hero-form-field textarea {
//             border: none;
//             border-radius: 0;
//             background: transparent;
//             border-bottom: 1px solid rgba(255,255,255,0.42);
//             padding: 10px 0 14px;
//             box-shadow: none;
//           }
//           .cwa-hero .csd-hero-form-field textarea {
//             min-height: 100px;
//           }
//           .cwa-hero .csd-hero-form-field input:focus,
//           .cwa-hero .csd-hero-form-field select:focus,
//           .cwa-hero .csd-hero-form-field textarea:focus {
//             border-bottom-color: rgba(96, 165, 250, 0.95);
//             box-shadow: none;
//             background: transparent;
//           }
//           .cwa-hero .csd-hero-form-field select {
//             background-position:
//               calc(100% - 2px) calc(1em + 8px),
//               calc(100% + 1px) calc(1em + 8px);
//           }
//           .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-row {
//             border: none;
//             border-radius: 0;
//             background: transparent;
//             border-bottom: 1px solid rgba(255,255,255,0.42);
//             box-shadow: none;
//             overflow: visible;
//           }
//           .cwa-hero .csd-hero-form-field--phone:focus-within .csd-hero-phone-row {
//             border-bottom-color: rgba(96, 165, 250, 0.95);
//             box-shadow: none;
//             background: transparent;
//           }
//           .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-sep {
//             align-self: center;
//             height: 1.15em;
//             margin: 0 10px 0 0;
//             background: rgba(255,255,255,0.38);
//           }
//           .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc,
//           .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num {
//             border-bottom: none !important;
//             padding: 10px 0 14px !important;
//           }
//           .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc {
//             min-width: 72px;
//             max-width: 96px;
//             padding-right: 22px !important;
//             color: rgba(255,255,255,0.72) !important;
//             background-position:
//               calc(100% - 2px) calc(1em + 6px),
//               calc(100% + 1px) calc(1em + 6px);
//           }
//           .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc:focus,
//           .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num:focus {
//             border-bottom: none !important;
//           }
//           .cwa-hero .csd-hero-form-captcha input {
//             border: none;
//             border-radius: 0;
//             border-bottom: 1px solid rgba(255,255,255,0.42);
//             background: transparent;
//             width: 56px;
//             padding: 8px 0;
//           }
//         }

//         @media (max-width: 768px) {
//           .cwa-hero {
//             padding: 130px 14px 60px;
//             min-height: auto;
//           }
//           .cwa-hero .csd-hero-left { transform: none; }
//           .cwa-hero-title {
//             font-size: clamp(24px, 6.6vw, 36px);
//             max-width: 100%;
//             margin-bottom: 16px;
//             line-height: 1.03;
//           }
//           .cwa-hero-lead {
//             font-size: 14px;
//             line-height: 1.58;
//             margin-bottom: 20px;
//           }
//           .cwa-hero-cta-row { gap: 10px; margin-bottom: 40px; }
//           .cwa-hero .csd-hero-form-grid { grid-template-columns: 1fr; }
//           .cwa-hero .csd-hero-form-foot {
//             flex-direction: column;
//             align-items: stretch;
//           }
//           .cwa-hero .csd-hero-form-submit { width: 100%; }
//           .cwa-hero .csd-hero-form-shell {
//             padding: 28px 18px 40px;
//             border-radius: 22px;
//             width: 100%;
//             margin-left: auto;
//             margin-right: auto;
//           }
//           .cwa-hero-metrics { grid-template-columns: repeat(2, 1fr); }
//           .cwa-hero-metric { padding: 14px 16px; border-right: 1px solid rgba(255,255,255,0.18); border-bottom: 1px solid rgba(255,255,255,0.18); }
//           .cwa-hero-metric:not(:first-child) { padding-left: 16px; }
//           .cwa-hero-metric:nth-child(2) { border-right: 0; }
//           .cwa-hero-metric:nth-child(3),
//           .cwa-hero-metric:nth-child(4) { border-bottom: 0; }
//           .cwa-hero-metric:nth-child(4) { border-right: 0; }

//           .cwa-hero-canvas-row { grid-template-columns: 44px 1fr auto auto; gap: 8px; padding: 8px 12px; font-size: 11px; }
//           .cwa-hero-canvas-stats > .cwa-hero-canvas-row:first-child { padding: 12px; }
//           .cwa-hcs-v { font-size: 16px; }

//           .cwa-growth, .cwa-cost, .cwa-stack-section, .cwa-faq-section, .cwa-process-section { padding-left: 14px; padding-right: 14px; }

//           .cwa-pillar-row { grid-template-columns: 40px 1fr; gap: 16px; padding: 24px 0 26px; }
//           .cwa-pillar-marker-num { font-size: 22px; }
//           .cwa-pillar-body {
//             grid-template-columns: 1fr;
//             row-gap: 10px;
//           }
//           .cwa-pillar-metric { grid-row: auto; justify-self: start; }

//           .cwa-fail-grid { grid-template-columns: 1fr; }
//           .cwa-fail-card:nth-child(odd) { border-right: 0; }
//           .cwa-fail-card { border-right: 0 !important; padding: 26px 22px 28px; }

//           .cwa-process-steps { padding-left: 36px; }
//           .cwa-process-line { left: 14px; }
//           .cwa-proc-step-marker { left: -30px; }
//           .cwa-proc-step-card { padding: 22px 22px 24px; }

//           .cwa-stack-tab { padding: 14px 16px; font-size: 13px; }
//           .cwa-stack-code { font-size: 11.5px; min-height: 280px; padding: 16px 0; }
//           .cwa-stack-line { padding: 0 14px; grid-template-columns: 36px 1fr; }
//           .cwa-stack-ln { padding-right: 12px; }

//           .cwa-faq-q { grid-template-columns: 36px 1fr 26px; gap: 12px; padding: 18px 0; }
//           .cwa-faq-q-icon { width: 26px; height: 26px; }
//           .cwa-faq-a-inner { padding-left: 48px; font-size: 14px; }

//           .cwa-cta-section { padding: 48px 14px 56px; }
//           .cwa-cta-inner { padding: 56px 26px; border-radius: 18px; }
//           .cwa-cta-h2 { font-size: clamp(28px, 9vw, 42px); }
//           .cwa-cta-meta { grid-template-columns: 1fr; }
//           .cwa-cta-meta-item:last-child { border-bottom: 0; }
//         }
//       `}</style>
//     </>
//   );
// }

//version 3

// Custom Web Application Development — Premium sub-service template
// Reusable layout: replace DATA constants for other sub-services.
// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import Link from "next/link";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";

// gsap.registerPlugin(ScrollTrigger);

// // ── DATA ──────────────────────────────────────────────────────────────────────

// const PAGE = {
//   headline1: "Web apps",
//   headline2: "engineered for",
//   headlineItalic: "performance.",
//   lead:
//     "Production-grade web applications built on modern stacks — Next.js, React, Node, Postgres — tuned for speed, resilience, and architecture that won't need a rewrite in two years.",
// };

// const HERO_PHONE_COUNTRY_CODES = [
//   "+92", "+1", "+44", "+971", "+91", "+61", "+49", "+966", "+65", "+86",
// ];

// const GROWTH = {
//   kicker: "Why custom",
//   title: "A custom web app is a",
//   titleAccent: "growth engine.",
//   lead:
//     "Off-the-shelf software flattens you against competitors. A purpose-built web application becomes the operational backbone — faster to evolve, cheaper to scale, aligned to how your business actually works.",
//   pillars: [
//     {
//       n: "01",
//       k: "Speed",
//       v: "Sub-second load",
//       d: "Edge-rendered pages, optimized bundles, and runtime budgets keep first interaction under a second on real devices.",
//       image:
//         "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&q=80&auto=format&fit=crop",
//       imageAlt: "Performance metrics dashboard showing fast load times",
//     },
//     {
//       n: "02",
//       k: "Scale",
//       v: "10× headroom",
//       d: "Stateless services, queue-backed workers, and observability from day one. Traffic spikes don't become incidents.",
//       image:
//         "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&q=80&auto=format&fit=crop",
//       imageAlt: "Server infrastructure visualization showing distributed scale",
//     },
//     {
//       n: "03",
//       k: "Ownership",
//       v: "Your code, your IP",
//       d: "Full source, infrastructure, credentials transfer to you. No vendor lock-in, no licensing tax, no surprises at renewal.",
//       image:
//         "https://images.unsplash.com/photo-1633409361618-c73427e4e206?w=1400&q=80&auto=format&fit=crop",
//       imageAlt: "Source code on a developer's monitor representing code ownership",
//     },
//     {
//       n: "04",
//       k: "Velocity",
//       v: "Weekly releases",
//       d: "Feature-flagged deploys and CI/CD pipelines let your team ship to production every week without rollout anxiety.",
//       image:
//         "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1400&q=80&auto=format&fit=crop",
//       imageAlt: "CI/CD pipeline and code deployment workflow",
//     },
//   ],
// };

// const COST = {
//   image:
//     "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&q=80&auto=format&fit=crop",
//   imageAlt: "Analytics dashboard showing performance metrics",
//   kicker: "What goes wrong",
//   title: "The cost of getting it",
//   titleAccent: "wrong.",
//   lead:
//     "Most failed web apps don't fail at launch — they fail in the first 90 days. The pattern is consistent and almost always preventable.",
//   failures: [
//     { stat: "53%",   label: "Bounce above 3s",     h: "Bloated bundles",          d: "Megabytes of unused JavaScript collapse mobile performance and quietly kill conversion on slower networks." },
//     { stat: "4.2×",  label: "Slower velocity",     h: "Brittle architecture",     d: "Tightly coupled services and shared databases turn every new feature into a coordination tax." },
//     { stat: "67%",   label: "Bugs found by users", h: "Missing observability",    d: "Without structured logs, traces, and RUM, you discover regressions from customer tickets — not dashboards." },
//     { stat: "26%",   label: "Excluded users",      h: "No accessibility",         d: "Skipping WCAG and keyboard support narrows your audience and makes refactors dramatically more expensive." },
//   ],
//   close:
//     "We engineer around every one of these failure modes — performance, architecture, observability, accessibility — as defaults, not upsells.",
// };

// const PROCESS = [
//   { num: "01", title: "Discovery & architecture",  d: "Stakeholder interviews, technical audit, written architecture brief.",   meta: "2 weeks · fixed price" },
//   { num: "02", title: "UX & interface design",      d: "Flows, wireframes, high-fidelity UI tied to a token-based design system.", meta: "2–4 weeks"            },
//   { num: "03", title: "Engineering sprints",        d: "Two-week sprints, weekly demos, CI/CD from day one. Working software every Friday.", meta: "8–16 weeks"   },
//   { num: "04", title: "QA & performance",           d: "Automated suites, cross-device QA, Lighthouse budgets, load testing before traffic.", meta: "Continuous" },
//   { num: "05", title: "Launch & monitor",           d: "Phased rollout with feature flags, real-user monitoring, rollback plan written before go-live.", meta: "1–2 weeks" },
//   { num: "06", title: "Iterate & support",          d: "SLA-backed retainer covering bug fixes, security patches, roadmap work.", meta: "Ongoing"               },
// ];

// const STACK = [
//   { group: "Frontend", items: [
//     { name: "Next.js",    v: "15.x", role: "App framework"     },
//     { name: "React",      v: "19",   role: "UI library"        },
//     { name: "TypeScript", v: "5.x",  role: "Type system"       },
//     { name: "Tailwind",   v: "4.x",  role: "Styling"           },
//   ]},
//   { group: "Backend", items: [
//     { name: "Node.js",    v: "22 LTS", role: "Runtime"         },
//     { name: "Python",     v: "3.12",   role: "Services / ML"   },
//     { name: "Go",         v: "1.23",   role: "High-throughput" },
//     { name: "GraphQL",    v: "—",      role: "API contract"    },
//   ]},
//   { group: "Data", items: [
//     { name: "PostgreSQL", v: "17",  role: "Primary store"    },
//     { name: "Redis",      v: "7.x", role: "Cache · queues"   },
//     { name: "Elasticsearch", v: "8.x", role: "Search"        },
//     { name: "S3",         v: "—",   role: "Object storage"   },
//   ]},
//   { group: "Infra", items: [
//     { name: "AWS",        v: "—",   role: "Primary cloud"    },
//     { name: "GCP",        v: "—",   role: "Alt cloud"        },
//     { name: "Docker",     v: "—",   role: "Containers"       },
//     { name: "Terraform",  v: "1.x", role: "IaC"              },
//   ]},
// ];

// const FAQS = [
//   { q: "How much does a custom web application cost?", a: "Most builds fall between $40K and $180K depending on scope, integrations, and team size. We provide fixed-price proposals after a paid two-week discovery sprint, so the budget is locked before engineering begins." },
//   { q: "How long does it take to build?",              a: "MVPs typically take 8–12 weeks. Full production builds run 14–22 weeks. We share a detailed milestone schedule during proposal, with weekly demos you can hold us to." },
//   { q: "What stack do you use?",                       a: "TypeScript end-to-end is our default — React or Next.js on the frontend, Node on the backend, Postgres for data, AWS or GCP for infrastructure. We choose tooling based on your problem, not because it's trendy." },
//   { q: "Do you handle design too?",                    a: "Yes. UX flows, wireframes, high-fidelity UI, and a design token system are part of the standard engagement. If you have a design partner already, we plug in cleanly with Figma handoff." },
//   { q: "What happens after launch?",                   a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and feature work. Many clients keep us on as a fractional engineering team. All code and infrastructure transfer to you on day one." },
// ];

// // ── COMPONENT ─────────────────────────────────────────────────────────────────

// export default function CustomWebAppPage() {
//   const [openFaq, setOpenFaq] = useState<number | null>(0);
//   const [activePillar, setActivePillar] = useState(0);
//   const [activeStack, setActiveStack] = useState(0);
//   const lenisRef = useRef<Lenis | null>(null);
//   const pillarListRef = useRef<HTMLOListElement | null>(null);

//   // Lenis smooth scroll
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.1,
//       easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       wheelMultiplier: 1,
//       touchMultiplier: 1.4,
//       smoothWheel: true,
//     });
//     lenisRef.current = lenis;
//     lenis.on("scroll", () => ScrollTrigger.update());
//     const ticker = (time: number) => lenis.raf(time * 1000);
//     gsap.ticker.add(ticker);
//     gsap.ticker.lagSmoothing(0);
//     return () => {
//       gsap.ticker.remove(ticker);
//       lenis.destroy();
//       lenisRef.current = null;
//     };
//   }, []);

//   // Animated counter
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       const counters = gsap.utils.toArray<HTMLElement>(".cwa-count");
//       counters.forEach((el) => {
//         const target = parseFloat(el.dataset.target || "0");
//         const suffix = el.dataset.suffix || "";
//         const decimals = parseInt(el.dataset.decimals || "0", 10);
//         const obj = { v: 0 };
//         ScrollTrigger.create({
//           trigger: el,
//           start: "top 85%",
//           once: true,
//           onEnter: () => {
//             gsap.to(obj, {
//               v: target,
//               duration: 1.6,
//               ease: "power2.out",
//               onUpdate: () => {
//                 el.textContent = obj.v.toFixed(decimals) + suffix;
//               },
//             });
//           },
//         });
//       });
//     });
//     return () => ctx.revert();
//   }, []);

//   // ── STICKY-SYNC PILLAR TRACKING ──
//   // Uses a single master ScrollTrigger with onUpdate to compute which pillar
//   // is in view based on scroll progress. This handles BOTH directions and
//   // avoids the gap/overlap problems of per-element triggers.
//   useEffect(() => {
//     const list = pillarListRef.current;
//     if (!list) return;

//     const ctx = gsap.context(() => {
//       const rows = gsap.utils.toArray<HTMLElement>(".cwa-pillar-row", list);
//       if (!rows.length) return;

//       const trigger = ScrollTrigger.create({
//         trigger: list,
//         // Activation zone: when the list's top reaches viewport center,
//         // until the list's bottom reaches viewport center.
//         start: "top center",
//         end: "bottom center",
//         onUpdate: (self) => {
//           // Map progress (0 → 1) to pillar index (0 → rows.length - 1)
//           const idx = Math.min(
//             rows.length - 1,
//             Math.max(0, Math.floor(self.progress * rows.length))
//           );
//           setActivePillar((prev) => (prev === idx ? prev : idx));
//         },
//       });

//       return () => trigger.kill();
//     });

//     return () => ctx.revert();
//   }, []);

//   // Reveal & scroll-linked animations
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // ── HERO INTRO ──
//       const heroTl = gsap.timeline({ delay: 0.15 });
//       const chars = gsap.utils.toArray<HTMLElement>(".cwa-h1-char");
//       heroTl.fromTo(
//         chars,
//         { yPercent: 110, opacity: 0 },
//         { yPercent: 0, opacity: 1, duration: 0.9, stagger: { each: 0.018 }, ease: "power4.out" },
//         0
//       );
//       heroTl.fromTo(
//         ".cwa-hero-fade",
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out" },
//         0.55
//       );
//       heroTl.fromTo(
//         ".cwa-hero-copy",
//         { opacity: 0, scale: 0.95 },
//         { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
//         0.3
//       );
//       heroTl.fromTo(
//         ".csd-hero-form-shell",
//         { opacity: 0, y: 30 },
//         { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" },
//         0.4
//       );
//       heroTl.fromTo(
//         ".csd-hero-form-field",
//         { opacity: 0, y: 16, scale: 0.96 },
//         { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
//         0.7
//       );

//       // ── SECTION HEADER REVEALS ──
//       const setupBatch = (
//         selector: string,
//         from: gsap.TweenVars,
//         to: gsap.TweenVars,
//         start = "top 88%"
//       ) => {
//         const items = gsap.utils.toArray<HTMLElement>(selector);
//         if (!items.length) return;
//         gsap.set(items, from);
//         ScrollTrigger.batch(items, {
//           start,
//           once: true,
//           onEnter: (batch) => gsap.to(batch, { ...to, stagger: 0.08, overwrite: true }),
//         });
//       };
//       setupBatch(".cwa-sh", { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" });
//       setupBatch(".cwa-faq-row", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "top 92%");

//       // ── COST: scrub-driven stat reveal ──
//       gsap.utils.toArray<HTMLElement>(".cwa-fail-card").forEach((el) => {
//         gsap.fromTo(el,
//           { opacity: 0, y: 32 },
//           {
//             opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
//             scrollTrigger: { trigger: el, start: "top 88%", once: true },
//           });
//       });

//       // ── PROCESS: scrub progress line + numbered reveal ──
//       const processSection = document.querySelector<HTMLElement>(".cwa-process-section");
//       const processLine = document.querySelector<HTMLElement>(".cwa-process-line-fill");
//       if (processSection && processLine) {
//         gsap.fromTo(processLine,
//           { scaleY: 0 },
//           {
//             scaleY: 1, ease: "none", transformOrigin: "top center",
//             scrollTrigger: {
//               trigger: processSection,
//               start: "top 60%",
//               end: "bottom 60%",
//               scrub: 0.5,
//             },
//           });
//       }
//       gsap.utils.toArray<HTMLElement>(".cwa-proc-step").forEach((el) => {
//         gsap.fromTo(el,
//           { opacity: 0, x: -30 },
//           {
//             opacity: 1, x: 0, duration: 0.7, ease: "power3.out",
//             scrollTrigger: { trigger: el, start: "top 82%", once: true },
//           });
//       });

//       // ── STACK reveal ──
//       gsap.utils.toArray<HTMLElement>(".cwa-stack-line").forEach((el, i) => {
//         gsap.fromTo(el,
//           { opacity: 0, y: 14 },
//           {
//             opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
//             delay: i * 0.04,
//             scrollTrigger: { trigger: el, start: "top 90%", once: true },
//           });
//       });

//       // ── FINAL CTA ──
//       gsap.fromTo(".cwa-cta-inner",
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1, y: 0, duration: 1, ease: "power3.out",
//           scrollTrigger: { trigger: ".cwa-cta-inner", start: "top 85%" },
//         });
//     });
//     return () => ctx.revert();
//   }, []);

//   useEffect(() => {
//     const fonts = "fonts" in document ? document.fonts : undefined;
//     if (!fonts?.ready) return;
//     fonts.ready.then(() => ScrollTrigger.refresh());
//   }, []);

//   return (
//     <>
//       {/* Grain overlay */}
//       <div
//         aria-hidden
//         style={{
//           position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
//           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
//           backgroundSize: "180px 180px", opacity: 0.028, mixBlendMode: "multiply",
//         }}
//       />

//       <div style={{ background: "#fafaf9", color: "#0a0a0a", fontFamily: "var(--font-body)", overflowX: "hidden" }}>
//         <SiteHeader />

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 1 — HERO
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-hero" aria-labelledby="cwa-hero-title">
//           <div className="cwa-hero-video-wrap" aria-hidden>
//             <video className="cwa-hero-bg-video" autoPlay muted loop playsInline preload="metadata">
//               <source
//                 src="/videos/services/Custom%20Software%20Development/custom-web-application-development/service-cwad-hero.mp4"
//                 type="video/mp4"
//                 media="(min-width: 901px)"
//               />
//             </video>
//             <img
//               className="cwa-hero-mobile-bg"
//               src="/images/services/custom-software-development/cwad-service-hero-mobile.jpeg"
//               alt=""
//               decoding="async"
//               fetchPriority="high"
//             />
//             <div className="cwa-hero-bg-overlay" />
//             <div className="cwa-hero-bg-spotlight" />
//           </div>

//           <div className="cwa-hero-inner">
//             <div className="csd-hero-main">
//               <div className="csd-hero-left">
//                 <div className="csd-hero-mobile-spacer" aria-hidden />
//                 <div className="cwa-hero-copy">
//                   <h1 id="cwa-hero-title" className="cwa-hero-title">
//                     <span className="cwa-h1-line">
//                       {PAGE.headline1.split("").map((c, i) => (
//                         <span key={`a-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
//                       ))}
//                     </span>
//                     <span className="cwa-h1-line">
//                       {PAGE.headline2.split("").map((c, i) => (
//                         <span key={`b-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
//                       ))}
//                     </span>
//                     <span className="cwa-h1-line">
//                       <span className="cwa-h1-italic">
//                         {PAGE.headlineItalic.split("").map((c, i) => (
//                           <span key={`c-${i}`} className="cwa-h1-char">{c === " " ? "\u00A0" : c}</span>
//                         ))}
//                       </span>
//                     </span>
//                   </h1>

//                   <p className="cwa-hero-fade cwa-hero-lead" style={{ opacity: 0 }}>
//                     {PAGE.lead}
//                   </p>

//                   <div className="cwa-hero-fade cwa-hero-cta-row" style={{ opacity: 0 }}>
//                     <Link href="/contact" className="csd-cta-primary">
//                       <span style={{ position: "relative", zIndex: 2 }}>Plan my build</span>
//                       <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="csd-cta-arrow" style={{ position: "relative", zIndex: 2 }}>
//                         <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//                       </svg>
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               <div className="csd-hero-right">
//                 <div className="csd-hero-form-shell" style={{ opacity: 0 }}>
//                   <h3 className="csd-hero-form-title">Share Your Requirements</h3>
//                   <p className="csd-hero-form-subtitle">
//                     Tell our experts about your goals and get a tailored consultation plan.
//                   </p>

//                   <form className="csd-hero-form" onSubmit={(e) => e.preventDefault()}>
//                     <label className="csd-hero-form-field">
//                       <span>Name</span>
//                       <input type="text" placeholder="Your name" />
//                     </label>

//                     <div className="csd-hero-form-grid">
//                       <label className="csd-hero-form-field csd-hero-form-field--phone">
//                         <span>Contact Number</span>
//                         <div className="csd-hero-phone-row">
//                           <select
//                             className="csd-hero-phone-cc"
//                             name="countryCode"
//                             aria-label="Country calling code"
//                             defaultValue="+92"
//                           >
//                             {HERO_PHONE_COUNTRY_CODES.map((code) => (
//                               <option key={code} value={code}>
//                                 {code}
//                               </option>
//                             ))}
//                           </select>
//                           <span className="csd-hero-phone-sep" aria-hidden />
//                           <input
//                             className="csd-hero-phone-num"
//                             type="tel"
//                             name="phoneNational"
//                             placeholder="Enter Your Number*"
//                             autoComplete="tel-national"
//                             aria-label="Phone number"
//                             required
//                           />
//                         </div>
//                       </label>
//                       <label className="csd-hero-form-field">
//                         <span>Work Email</span>
//                         <input type="email" placeholder="Enter your email address" />
//                       </label>
//                     </div>

//                     <label className="csd-hero-form-field">
//                       <span>Budget Range</span>
//                       <select defaultValue="">
//                         <option value="" disabled>Select a budget range</option>
//                         <option value="under-10k">Under $10k</option>
//                         <option value="10k-25k">$10k - $25k</option>
//                         <option value="25k-50k">$25k - $50k</option>
//                         <option value="50k-plus">$50k+</option>
//                       </select>
//                     </label>

//                     <label className="csd-hero-form-field">
//                       <span>Describe your project</span>
//                       <textarea rows={3} placeholder="Describe your project" />
//                     </label>

//                     <div className="csd-hero-form-foot">
//                       <div className="csd-hero-form-captcha">
//                         <span>5 + 2 =</span>
//                         <input type="text" inputMode="numeric" aria-label="Simple captcha answer" />
//                       </div>
//                       <button type="submit" className="csd-hero-form-submit">
//                         Schedule a Technical Consultation
//                       </button>
//                     </div>
//                     <p className="csd-hero-form-note">Fast, high-touch engagement under strict NDA protection.</p>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 2 — WHY A CUSTOM WEB APP IS A GROWTH ENGINE
//             Sticky-sync layout: sticky image LEFT, scrollable pillar list RIGHT.
//             Each pillar has its own image — they crossfade as the user scrolls.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-growth" aria-labelledby="cwa-growth-title">
//           <div className="cwa-growth-inner">
//             <div className="cwa-sh cwa-section-head cwa-growth-head-inline">
//               <h2 id="cwa-growth-title" className="cwa-h2">
//                 {GROWTH.title} <span className="cwa-italic-mute">{GROWTH.titleAccent}</span>
//               </h2>
//               <p className="cwa-h2-lead">{GROWTH.lead}</p>
//             </div>

//             <div className="cwa-growth-grid">
//               {/* LEFT — sticky media with crossfading per-pillar images */}
//               <div className="cwa-growth-media-wrap">
//                 <div className="cwa-growth-media">
//                   {/* Stacked images, only active one is visible */}
//                   <div className="cwa-growth-media-stack" aria-hidden>
//                     {GROWTH.pillars.map((p, i) => (
//                       <img
//                         key={p.n}
//                         src={p.image}
//                         alt={p.imageAlt}
//                         loading={i === 0 ? "eager" : "lazy"}
//                         className="cwa-growth-media-img"
//                         data-active={activePillar === i ? "true" : "false"}
//                       />
//                     ))}
//                   </div>
//                   <div className="cwa-growth-media-overlay" />

//                   <div className="cwa-growth-media-progress" aria-hidden>
//                     {GROWTH.pillars.map((_, i) => (
//                       <span key={i} data-active={activePillar === i ? "true" : "false"} />
//                     ))}
//                   </div>

//                   <div className="cwa-growth-media-active">
//                     <div className="cwa-growth-media-active-num">
//                       {GROWTH.pillars[activePillar].n}
//                     </div>
//                     <div className="cwa-growth-media-active-body">
//                       <div className="cwa-growth-media-active-k">
//                         {GROWTH.pillars[activePillar].k}
//                       </div>
//                       <div className="cwa-growth-media-active-v">
//                         {GROWTH.pillars[activePillar].v}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT — pillars */}
//               <ol className="cwa-pillar-list" ref={pillarListRef}>
//                 {GROWTH.pillars.map((p, i) => (
//                   <li
//                     key={p.n}
//                     className="cwa-pillar-row"
//                     data-active={activePillar === i ? "true" : "false"}
//                   >
//                     <div className="cwa-pillar-marker">
//                       <span className="cwa-pillar-marker-num">{p.n}</span>
//                       <span className="cwa-pillar-marker-line" aria-hidden />
//                     </div>
//                     <div className="cwa-pillar-body">
//                       <div className="cwa-pillar-head">
//                         <h3 className="cwa-pillar-title">{p.k}</h3>
//                         <span className="cwa-pillar-metric">{p.v}</span>
//                       </div>
//                       <p className="cwa-pillar-desc">{p.d}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ol>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 3 — COST OF GETTING IT WRONG
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-cost" aria-labelledby="cwa-cost-title">
//           <div className="cwa-cost-inner">
//             <div className="cwa-cost-split">
//               <div className="cwa-cost-content cwa-sh">
//                 <h2 id="cwa-cost-title" className="cwa-h2">
//                   {COST.title} <span className="cwa-italic-mute">{COST.titleAccent}</span>
//                 </h2>
//                 <p className="cwa-h2-lead">{COST.lead}</p>

//                 <p className="cwa-cost-close">{COST.close}</p>
//               </div>

//               <div className="cwa-cost-media" aria-hidden>
//                 <img src={COST.image} alt={COST.imageAlt} loading="lazy" />
//                 <div className="cwa-cost-media-overlay" />
//                 <div className="cwa-cost-media-tag">
//                   <span className="cwa-cost-media-tag-pulse" />
//                   Failure modes · 90-day
//                 </div>
//               </div>
//             </div>

//             <div className="cwa-fail-grid">
//               {COST.failures.map((f, i) => (
//                 <article key={f.h} className="cwa-fail-card">
//                   <div className="cwa-fail-card-top">
//                     <span className="cwa-fail-card-idx">F—{String(i + 1).padStart(2, "0")}</span>
//                     <span className="cwa-fail-card-arrow" aria-hidden>↗</span>
//                   </div>
//                   <div className="cwa-fail-card-stat">{f.stat}</div>
//                   <div className="cwa-fail-card-label">{f.label}</div>
//                   <div className="cwa-fail-card-divider" />
//                   <h3 className="cwa-fail-card-h">{f.h}</h3>
//                   <p className="cwa-fail-card-d">{f.d}</p>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 4 — HOW WE BUILD (timeline w/ scrub progress line)
//         ═══════════════════════════════════════════════════════════════ */}
//         <section id="process" className="cwa-process-section" aria-labelledby="cwa-process-title">
//           <div className="cwa-process-inner">
//             <div className="cwa-sh cwa-section-head cwa-section-head--light">
//               <h2 id="cwa-process-title" className="cwa-h2 cwa-h2-light">
//                 How we build —{" "}
//                 <span className="cwa-italic-light">six phases, one team.</span>
//               </h2>
//               <p className="cwa-h2-lead cwa-h2-lead-light">
//                 A delivery rhythm refined across 150+ shipped products.
//                 No surprises, no shipping and praying.
//               </p>
//             </div>

//             <div className="cwa-process-timeline">
//               <div className="cwa-process-line" aria-hidden>
//                 <div className="cwa-process-line-fill" />
//               </div>

//               <ol className="cwa-process-steps">
//                 {PROCESS.map((s, i) => (
//                   <li key={s.num} className="cwa-proc-step" data-side={i % 2 === 0 ? "L" : "R"}>
//                     <div className="cwa-proc-step-marker" aria-hidden>
//                       <span className="cwa-proc-step-marker-num">{s.num}</span>
//                     </div>
//                     <div className="cwa-proc-step-card">
//                       <div className="cwa-proc-step-head">
//                         <h3 className="cwa-proc-step-title">{s.title}</h3>
//                         <span className="cwa-proc-step-meta">{s.meta}</span>
//                       </div>
//                       <p className="cwa-proc-step-desc">{s.d}</p>
//                     </div>
//                   </li>
//                 ))}
//               </ol>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 5 — STACK (interactive code window)
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-stack-section" aria-labelledby="cwa-stack-title">
//           <div className="cwa-stack-inner">
//             <div className="cwa-sh cwa-section-head">
//               <h2 id="cwa-stack-title" className="cwa-h2">
//                 Tooling we <span className="cwa-italic-mute">trust.</span>
//               </h2>
//               <p className="cwa-h2-lead">
//                 Mature, production-ready stacks — picked for your problem,
//                 not because they're new.
//               </p>
//             </div>

//             <div className="cwa-stack-window" role="tabpanel">
//               <div className="cwa-stack-window-chrome">
//                 <div className="cwa-stack-window-dots">
//                   <span /><span /><span />
//                 </div>
//                 <div className="cwa-stack-window-title">stack.config.ts</div>
//                 <div className="cwa-stack-window-meta">— typescript</div>
//               </div>

//               <div className="cwa-stack-window-body">
//                 <div className="cwa-stack-tabs" role="tablist" aria-label="Stack categories">
//                   {STACK.map((g, i) => (
//                     <button
//                       key={g.group}
//                       type="button"
//                       role="tab"
//                       aria-selected={activeStack === i}
//                       className="cwa-stack-tab"
//                       data-active={activeStack === i ? "true" : "false"}
//                       onClick={() => setActiveStack(i)}
//                     >
//                       <span className="cwa-stack-tab-bin">
//                         {String(i + 1).padStart(2, "0")}
//                       </span>
//                       <span>{g.group}</span>
//                     </button>
//                   ))}
//                 </div>

//                 <div className="cwa-stack-code">
//                   <div className="cwa-stack-line cwa-stack-line-pre">
//                     <span className="cwa-stack-ln">1</span>
//                     <span><span className="cwa-syn-key">export const</span> <span className="cwa-syn-var">stack</span> = {"{"}</span>
//                   </div>
//                   <div className="cwa-stack-line cwa-stack-line-pre">
//                     <span className="cwa-stack-ln">2</span>
//                     <span>  <span className="cwa-syn-prop">{STACK[activeStack].group.toLowerCase()}</span>: [</span>
//                   </div>

//                   {STACK[activeStack].items.map((it, i) => (
//                     <div key={`${activeStack}-${it.name}`} className="cwa-stack-line cwa-stack-line-item">
//                       <span className="cwa-stack-ln">{i + 3}</span>
//                       <span className="cwa-stack-line-content">
//                         <span className="cwa-stack-line-indent">    </span>
//                         <span className="cwa-syn-brace">{"{"}</span>
//                         <span className="cwa-syn-prop"> name</span>
//                         <span className="cwa-syn-punct">: </span>
//                         <span className="cwa-syn-str">"{it.name}"</span>
//                         <span className="cwa-syn-punct">, </span>
//                         <span className="cwa-syn-prop">v</span>
//                         <span className="cwa-syn-punct">: </span>
//                         <span className="cwa-syn-str">"{it.v}"</span>
//                         <span className="cwa-syn-punct">, </span>
//                         <span className="cwa-syn-prop">role</span>
//                         <span className="cwa-syn-punct">: </span>
//                         <span className="cwa-syn-str">"{it.role}"</span>
//                         <span className="cwa-syn-brace"> {"}"}</span>
//                         <span className="cwa-syn-punct">,</span>
//                       </span>
//                     </div>
//                   ))}

//                   <div className="cwa-stack-line cwa-stack-line-pre">
//                     <span className="cwa-stack-ln">{STACK[activeStack].items.length + 3}</span>
//                     <span>  ],</span>
//                   </div>
//                   <div className="cwa-stack-line cwa-stack-line-pre">
//                     <span className="cwa-stack-ln">{STACK[activeStack].items.length + 4}</span>
//                     <span>{"}"} <span className="cwa-syn-punct">as const</span><span className="cwa-syn-cursor" aria-hidden /></span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 6 — FAQs
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-faq-section" aria-labelledby="cwa-faq-title">
//           <div className="cwa-faq-layout">
//             <div className="cwa-faq-aside cwa-sh">
//               <h2 id="cwa-faq-title" className="cwa-h2">
//                 Frequently <span className="cwa-italic-mute">asked.</span>
//               </h2>
//               <p className="cwa-h2-lead cwa-faq-lead">
//                 Real questions from real prospects. If yours isn't here, send us a
//                 note — we answer every inquiry within 24 hours.
//               </p>
//               <Link href="/contact" className="cwa-faq-cta">
//                 Ask us anything
//                 <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
//                   <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//               </Link>
//             </div>

//             <div className="cwa-faq-list">
//               {FAQS.map((f, i) => {
//                 const isOpen = openFaq === i;
//                 return (
//                   <div key={i} className="cwa-faq-row" data-open={isOpen ? "true" : "false"}>
//                     <button
//                       type="button"
//                       className="cwa-faq-q"
//                       onClick={() => setOpenFaq(isOpen ? null : i)}
//                       aria-expanded={isOpen}
//                       suppressHydrationWarning
//                     >
//                       <span className="cwa-faq-q-num">{String(i + 1).padStart(2, "0")}</span>
//                       <span className="cwa-faq-q-text">{f.q}</span>
//                       <span className="cwa-faq-q-icon" aria-hidden>
//                         <svg width="14" height="14" viewBox="0 0 14 14">
//                           <path d="M3 7h8 M7 3v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
//                         </svg>
//                       </span>
//                     </button>
//                     <div className="cwa-faq-a">
//                       <div className="cwa-faq-a-inner">{f.a}</div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 7 — FINAL CTA
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cwa-cta-section" aria-labelledby="cwa-cta-title">
//           <div className="cwa-cta-inner">
//             <div className="cwa-cta-grid">
//               <div className="cwa-cta-left">
//                 <h2 id="cwa-cta-title" className="cwa-cta-h2">
//                   Ready to ship a web app{" "}
//                   <span className="cwa-cta-h2-accent">that lasts?</span>
//                 </h2>
//                 <p className="cwa-cta-lead">
//                   Free 30-minute discovery call. You'll talk directly with an
//                   engineer and a strategist — no sales pitch, just a real
//                   conversation about your problem and timeline.
//                 </p>
//                 <div className="cwa-cta-actions">
//                   <Link href="/contact" className="cwa-cta-primary-light">
//                     <span>Book a discovery call</span>
//                     <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
//                       <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </Link>
//                   <a href="mailto:hello@techbinaries.com" className="cwa-cta-mail">
//                     hello@techbinaries.com
//                   </a>
//                 </div>
//               </div>

//               <div className="cwa-cta-right">
//                 <dl className="cwa-cta-meta">
//                   <div className="cwa-cta-meta-item">
//                     <dt>Response time</dt>
//                     <dd>Within 24h</dd>
//                   </div>
//                   <div className="cwa-cta-meta-item">
//                     <dt>MVP timeline</dt>
//                     <dd>8–12 weeks</dd>
//                   </div>
//                   <div className="cwa-cta-meta-item">
//                     <dt>Engagement</dt>
//                     <dd>Fixed or T&amp;M</dd>
//                   </div>
//                   <div className="cwa-cta-meta-item">
//                     <dt>Based in</dt>
//                     <dd>Global · remote</dd>
//                   </div>
//                 </dl>
//               </div>
//             </div>
//           </div>
//         </section>

//         <SiteFooter />
//       </div>

//       <style>{`
//         /* ═══════════════════════════════════════════════════════════════
//            DESIGN TOKENS
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-sh,
//         .cwa-h1-line,
//         .cwa-pillar-row,
//         .cwa-fail-card,
//         .cwa-proc-step,
//         .cwa-stack-line,
//         .cwa-faq-row,
//         .cwa-cta-inner {
//           will-change: transform, opacity;
//         }

//         .cwa-h2 {
//           font-family: var(--font-display);
//           font-size: clamp(34px, 4.6vw, 64px);
//           font-weight: 500;
//           letter-spacing: -0.034em;
//           line-height: 1.02;
//           margin: 0 0 18px;
//           max-width: 680px;
//         }
//         .cwa-h2-light { color: #fafaf9; max-width: 760px; }
//         .cwa-italic-mute { font-style: italic; font-weight: 400; color: rgba(10,10,10,0.5); }
//         .cwa-italic-light { font-style: italic; font-weight: 400; color: rgba(255,255,255,0.6); }
//         .cwa-h2-lead {
//           font-size: 16px;
//           color: rgba(10,10,10,0.62);
//           line-height: 1.7;
//           margin: 0;
//           max-width: 540px;
//         }
//         .cwa-h2-lead-light { color: rgba(255,255,255,0.62); max-width: 480px; }

//         .cwa-section-head {
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//           margin-bottom: clamp(48px, 6vw, 80px);
//         }
//         .cwa-section-head--light .cwa-h2 { color: #fafaf9; }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 1 — HERO
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-hero {
//           position: relative;
//           min-height: 100vh;
//           padding: clamp(150px, 17vh, 190px) 20px 56px;
//           background: #0a0a0a;
//           overflow: hidden;
//         }
//         .cwa-hero-video-wrap {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//           z-index: 0;
//         }
//         .cwa-hero-bg-video {
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           object-position: center;
//           z-index: 0;
//           pointer-events: none;
//         }
//         .cwa-hero-mobile-bg {
//           display: none;
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           object-position: center 28%;
//           z-index: 0;
//           pointer-events: none;
//         }
//         .cwa-hero-bg-overlay {
//           position: absolute;
//           inset: 0;
//           z-index: 0;
//           pointer-events: none;
//           background:
//             linear-gradient(90deg, rgba(0,0,0,0.76) 0%, rgba(0,0,0,0.64) 36%, rgba(0,0,0,0.42) 62%, rgba(0,0,0,0.24) 82%, rgba(0,0,0,0.16) 100%),
//             linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.58) 100%);
//         }
//         .cwa-hero-bg-spotlight {
//           position: absolute;
//           inset: 0;
//           z-index: 0;
//           pointer-events: none;
//           background: radial-gradient(1000px 520px at 18% 36%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 34%, transparent 72%);
//           mix-blend-mode: screen;
//         }
//         .cwa-hero-inner {
//           position: relative;
//           max-width: 1320px;
//           margin: 0 auto;
//           z-index: 1;
//           display: flex;
//           flex-direction: column;
//           gap: 56px;
//         }
//         .cwa-hero .csd-hero-main {
//           display: grid;
//           grid-template-columns: minmax(0, 1.15fr) minmax(420px, 0.85fr);
//           gap: clamp(32px, 4vw, 64px);
//           align-items: center;
//           min-height: calc(100vh - 246px);
//         }
//         .cwa-hero .csd-hero-left {
//           min-width: 0;
//           max-width: 780px;
//           transform: translateY(clamp(22px, 4vh, 48px));
//         }
//         .cwa-hero .csd-hero-mobile-spacer { display: none; }
//         .cwa-hero-copy { min-width: 0; }

//         .cwa-hero .csd-hero-right {
//           position: relative;
//           align-self: stretch;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .cwa-hero .csd-hero-form-shell {
//           position: relative;
//           width: 100%;
//           max-width: 540px;
//           margin-left: auto;
//           padding: 28px 26px 24px;
//           border-radius: 20px;
//           overflow: hidden;
//           border: 1px solid rgba(255,255,255,0.2);
//           backdrop-filter: blur(10px);
//           background:
//             linear-gradient(145deg, rgba(12,12,12,0.68) 0%, rgba(12,12,12,0.45) 100%);
//           box-shadow:
//             0 36px 84px -32px rgba(0,0,0,0.62),
//             inset 0 1px 0 rgba(255,255,255,0.18);
//         }
//         .cwa-hero .csd-hero-form-title {
//           margin: 0;
//           font-family: var(--font-display);
//           font-size: clamp(26px, 2.6vw, 36px);
//           font-weight: 500;
//           letter-spacing: -0.03em;
//           color: #fff;
//           line-height: 1.05;
//         }
//         .cwa-hero .csd-hero-form-subtitle {
//           margin: 10px 0 20px;
//           color: rgba(255,255,255,0.72);
//           font-size: 14px;
//           line-height: 1.6;
//           max-width: 44ch;
//         }
//         .cwa-hero .csd-hero-form { display: flex; flex-direction: column; gap: 18px; }
//         .cwa-hero .csd-hero-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
//         .cwa-hero .csd-hero-form-field { display: flex; flex-direction: column; gap: 8px; }
//         .cwa-hero .csd-hero-form-field span {
//           font-size: 11px; font-weight: 600; letter-spacing: 0.07em;
//           text-transform: uppercase; color: rgba(255,255,255,0.74);
//         }
//         .cwa-hero .csd-hero-phone-row {
//           display: flex; align-items: stretch; width: 100%;
//           border: none; border-radius: 0; background: transparent;
//           border-bottom: 1px solid rgba(255,255,255,0.42);
//           overflow: visible; transition: border-color 0.2s;
//         }
//         .cwa-hero .csd-hero-form-field--phone:focus-within .csd-hero-phone-row {
//           border-bottom-color: rgba(96, 165, 250, 0.95);
//         }
//         .cwa-hero .csd-hero-phone-sep {
//           width: 1px; align-self: center; height: 1.15em;
//           background: rgba(255,255,255,0.38); flex-shrink: 0; margin: 0 10px 0 0;
//         }
//         .cwa-hero .csd-hero-form-field input,
//         .cwa-hero .csd-hero-form-field select,
//         .cwa-hero .csd-hero-form-field textarea {
//           width: 100%; border: none; border-radius: 0; background: transparent;
//           color: #fff; border-bottom: 1px solid rgba(255,255,255,0.42);
//           padding: 10px 0 14px; font-size: 14px; outline: none; box-shadow: none;
//           transition: border-color 0.2s;
//         }
//         .cwa-hero .csd-hero-form-field textarea { resize: vertical; min-height: 92px; }
//         .cwa-hero .csd-hero-form-field input::placeholder,
//         .cwa-hero .csd-hero-form-field textarea::placeholder { color: rgba(255,255,255,0.45); }
//         .cwa-hero .csd-hero-form-field select {
//           color: rgba(255,255,255,0.75); appearance: none; background-color: transparent;
//           background-image:
//             linear-gradient(45deg, transparent 50%, rgba(255,255,255,0.72) 50%),
//             linear-gradient(135deg, rgba(255,255,255,0.72) 50%, transparent 50%);
//           background-position: calc(100% - 4px) calc(1em + 6px), calc(100% - 0px) calc(1em + 6px);
//           background-size: 5px 5px, 5px 5px; background-repeat: no-repeat;
//         }
//         .cwa-hero .csd-hero-form-field select:invalid { color: rgba(255,255,255,0.65); }
//         .cwa-hero .csd-hero-form-field select option { color: #0a0a0a; background: #ffffff; }
//         .cwa-hero .csd-hero-form-field select option[disabled] { color: rgba(10,10,10,0.55); }
//         .cwa-hero .csd-hero-form-field input:focus,
//         .cwa-hero .csd-hero-form-field select:focus,
//         .cwa-hero .csd-hero-form-field textarea:focus {
//           border-bottom-color: rgba(96, 165, 250, 0.95);
//         }
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc,
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num {
//           width: auto !important; border: none !important; border-radius: 0 !important;
//           background: transparent !important; box-shadow: none !important;
//         }
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-cc {
//           flex: 0 0 auto; min-width: 84px; max-width: 110px;
//           padding: 10px 26px 14px 0 !important; color: rgba(255,255,255,0.78) !important;
//         }
//         .cwa-hero .csd-hero-form-field--phone .csd-hero-phone-num {
//           flex: 1 1 auto; min-width: 0; padding: 10px 0 14px 0 !important;
//         }
//         .cwa-hero .csd-hero-form input:-webkit-autofill,
//         .cwa-hero .csd-hero-form input:-webkit-autofill:hover,
//         .cwa-hero .csd-hero-form input:-webkit-autofill:focus,
//         .cwa-hero .csd-hero-form input:-webkit-autofill:active,
//         .cwa-hero .csd-hero-form textarea:-webkit-autofill,
//         .cwa-hero .csd-hero-form textarea:-webkit-autofill:hover,
//         .cwa-hero .csd-hero-form textarea:-webkit-autofill:focus,
//         .cwa-hero .csd-hero-form textarea:-webkit-autofill:active,
//         .cwa-hero .csd-hero-form select:-webkit-autofill,
//         .cwa-hero .csd-hero-form select:-webkit-autofill:hover,
//         .cwa-hero .csd-hero-form select:-webkit-autofill:focus,
//         .cwa-hero .csd-hero-form select:-webkit-autofill:active {
//           -webkit-text-fill-color: rgba(255, 255, 255, 0.95) !important;
//           caret-color: #fff;
//           transition: background-color 99999s ease-out 0s;
//           -webkit-box-shadow: 0 0 0 1000px #0c0c0c inset !important;
//           box-shadow: 0 0 0 1000px #0c0c0c inset !important;
//         }
//         .cwa-hero .csd-hero-form-foot { display: flex; align-items: center; gap: 12px; margin-top: 6px; }
//         .cwa-hero .csd-hero-form-captcha {
//           display: inline-flex; align-items: center; gap: 10px;
//           color: rgba(255,255,255,0.85); font-weight: 600; flex-shrink: 0;
//         }
//         .cwa-hero .csd-hero-form-captcha input {
//           width: 56px; border: none; border-radius: 0; background: transparent;
//           color: #fff; border-bottom: 1px solid rgba(255,255,255,0.42);
//           padding: 8px 0 10px; outline: none; box-shadow: none; transition: border-color 0.2s;
//         }
//         .cwa-hero .csd-hero-form-captcha input:focus { border-bottom-color: rgba(96, 165, 250, 0.95); }
//         .cwa-hero .csd-hero-form-submit {
//           border: none; border-radius: 999px; padding: 12px 20px;
//           font-size: 13px; font-weight: 700; letter-spacing: 0.01em;
//           color: #fff; background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
//           box-shadow: 0 10px 24px -10px rgba(37,99,235,0.8); cursor: pointer;
//           transition: transform 0.2s ease, box-shadow 0.2s ease;
//         }
//         .cwa-hero .csd-hero-form-submit:hover {
//           transform: translateY(-1px); box-shadow: 0 14px 28px -12px rgba(37,99,235,0.9);
//         }
//         .cwa-hero .csd-hero-form-note { margin: 2px 0 0; font-size: 12px; color: rgba(255,255,255,0.62); }

//         .cwa-hero-title {
//           font-family: var(--font-display);
//           font-size: clamp(40px, 4.5vw, 72px);
//           font-weight: 500; line-height: 0.98; letter-spacing: -0.045em;
//           margin: 0 0 26px; color: #fff; max-width: 720px;
//           text-shadow: 0 10px 30px rgba(0,0,0,0.34);
//         }
//         .cwa-h1-line {
//           overflow: visible; padding-bottom: 0.075em; display: block;
//           white-space: nowrap; width: 100%;
//         }
//         .cwa-h1-char { display: inline-block; will-change: transform; }
//         .cwa-h1-italic {
//           font-style: italic; font-weight: 400; color: rgba(255,255,255,0.96);
//           display: inline-block; white-space: nowrap; padding: 0 0.08em;
//           border-radius: 0.16em; background: rgba(255,255,255,0.08);
//           text-shadow: 0 8px 24px rgba(0,0,0,0.36);
//         }
//         .cwa-hero-lead {
//           font-size: 17px; color: rgba(255,255,255,0.84); max-width: 600px;
//           line-height: 1.7; margin: 0 0 32px;
//           text-shadow: 0 6px 18px rgba(0,0,0,0.28);
//         }
//         .cwa-hero-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 48px; }
//         .cwa-hero .csd-cta-primary {
//           display: inline-flex; align-items: center; gap: 8px;
//           padding: 15px 28px; background: #ffffff; color: #0a0a0a;
//           text-decoration: none; font-size: 14px; font-weight: 500;
//           border-radius: 999px; position: relative; overflow: hidden;
//         }
//         .cwa-hero .csd-cta-primary::before {
//           content: ""; position: absolute; inset: 0;
//           background: linear-gradient(90deg, #e7e5e4, #ffffff);
//           transform: translateX(-101%);
//           transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
//           z-index: 1;
//         }
//         .cwa-hero .csd-cta-primary:hover::before { transform: translateX(0); }
//         .cwa-hero .csd-cta-primary:hover .csd-cta-arrow { transform: translateX(2px); }
//         .cwa-hero .csd-cta-arrow { transition: transform 0.25s ease; }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 2 — GROWTH (sticky-sync with image crossfade)
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-growth {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #f5f5f4;
//           border-top: 1px solid rgba(10,10,10,0.06);
//         }
//         .cwa-growth-inner { max-width: 1320px; margin: 0 auto; }
//         .cwa-growth-head-inline {
//           flex-direction: row; align-items: flex-end;
//           justify-content: space-between; gap: clamp(28px, 4vw, 64px);
//         }
//         .cwa-growth-head-inline .cwa-h2 { margin: 0; flex: 0 1 680px; }
//         .cwa-growth-head-inline .cwa-h2-lead {
//           flex: 0 1 560px; margin: 0 0 28px; transform: translateY(-10px);
//         }
//         .cwa-growth-grid {
//           display: grid;
//           grid-template-columns: 1fr 1.05fr;
//           gap: clamp(40px, 5vw, 88px);
//           align-items: start;
//         }
//         .cwa-growth-media-wrap {
//           position: sticky;
//           top: 100px;
//           align-self: start;
//         }
//         .cwa-growth-media {
//           position: relative;
//           aspect-ratio: 4 / 5;
//           border-radius: clamp(20px, 2.4vw, 28px);
//           overflow: hidden;
//           background: #0a0a0a;
//           box-shadow: 0 50px 100px -50px rgba(10,10,10,0.4);
//         }
//         /* Stacked images — only data-active is visible, smooth crossfade */
//         .cwa-growth-media-stack {
//           position: absolute;
//           inset: 0;
//         }
//         .cwa-growth-media-img {
//           position: absolute;
//           inset: 0;
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           filter: saturate(1.06) contrast(1.04);
//           opacity: 0;
//           transform: scale(1.04);
//           transition:
//             opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
//             transform 1.4s cubic-bezier(0.22, 1, 0.36, 1);
//           will-change: opacity, transform;
//         }
//         .cwa-growth-media-img[data-active="true"] {
//           opacity: 1;
//           transform: scale(1);
//         }
//         .cwa-growth-media-overlay {
//           position: absolute;
//           inset: 0;
//           background:
//             linear-gradient(180deg, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.7) 100%);
//           pointer-events: none;
//           z-index: 1;
//         }
//         .cwa-growth-media-progress {
//           position: absolute;
//           top: 22px;
//           right: 22px;
//           display: flex;
//           gap: 6px;
//           z-index: 2;
//         }
//         .cwa-growth-media-progress span {
//           width: 18px;
//           height: 3px;
//           border-radius: 999px;
//           background: rgba(255,255,255,0.25);
//           transition: background 0.4s, width 0.4s;
//         }
//         .cwa-growth-media-progress span[data-active="true"] {
//           background: #fafaf9;
//           width: 28px;
//         }
//         .cwa-growth-media-active {
//           position: absolute;
//           left: 22px; right: 22px; bottom: 22px;
//           padding: 18px 20px;
//           background: rgba(10,10,10,0.5);
//           backdrop-filter: blur(16px);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 14px;
//           color: #fafaf9;
//           display: flex;
//           gap: 18px;
//           align-items: center;
//           z-index: 2;
//           transition: background 0.4s ease;
//         }
//         .cwa-growth-media-active-num {
//           font-family: var(--font-display);
//           font-size: 36px;
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           color: rgba(255,255,255,0.4);
//           line-height: 1;
//           font-variant-numeric: tabular-nums;
//           transition: color 0.4s ease;
//         }
//         .cwa-growth-media-active-body {
//           display: flex;
//           flex-direction: column;
//           gap: 4px;
//         }
//         .cwa-growth-media-active-k {
//           font-family: var(--font-display);
//           font-size: 18px;
//           font-weight: 500;
//           letter-spacing: -0.02em;
//           line-height: 1;
//         }
//         .cwa-growth-media-active-v {
//           font-size: 12px;
//           color: rgba(255,255,255,0.65);
//         }

//         .cwa-pillar-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: flex;
//           flex-direction: column;
//         }
//         .cwa-pillar-row {
//           display: grid;
//           grid-template-columns: 56px 1fr;
//           gap: 22px;
//           padding: 32px 0 36px;
//           border-bottom: 1px solid rgba(10,10,10,0.1);
//           opacity: 0.42;
//           transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-pillar-row:first-child { border-top: 1px solid rgba(10,10,10,0.1); }
//         .cwa-pillar-row[data-active="true"] { opacity: 1; }

//         .cwa-pillar-marker {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 8px;
//         }
//         .cwa-pillar-marker-num {
//           font-family: var(--font-display);
//           font-size: 26px;
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           color: transparent;
//           -webkit-text-stroke: 1px rgba(10,10,10,0.3);
//           font-variant-numeric: tabular-nums;
//           line-height: 1;
//           transition: color 0.5s, -webkit-text-stroke-color 0.5s;
//         }
//         .cwa-pillar-row[data-active="true"] .cwa-pillar-marker-num {
//           color: #0a0a0a;
//           -webkit-text-stroke-color: transparent;
//         }
//         .cwa-pillar-marker-line {
//           width: 1px;
//           height: 30px;
//           background: rgba(10,10,10,0.15);
//           transition: background 0.5s, height 0.5s;
//         }
//         .cwa-pillar-row[data-active="true"] .cwa-pillar-marker-line {
//           background: #0a0a0a;
//           height: 50px;
//         }

//         .cwa-pillar-body {
//           display: grid;
//           grid-template-columns: minmax(0, 1fr) auto;
//           column-gap: 22px;
//           row-gap: 12px;
//           align-items: start;
//         }
//         .cwa-pillar-head { display: contents; }
//         .cwa-pillar-title {
//           font-family: var(--font-display);
//           font-size: clamp(22px, 2.4vw, 30px);
//           font-weight: 500;
//           letter-spacing: -0.022em;
//           line-height: 1.18;
//           margin: 0;
//           color: #0a0a0a;
//           grid-column: 1;
//         }
//         .cwa-pillar-metric {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 500;
//           letter-spacing: 0.06em;
//           color: rgba(10,10,10,0.6);
//           padding: 6px 12px;
//           background: rgba(10,10,10,0.05);
//           border: 1px solid rgba(10,10,10,0.08);
//           border-radius: 999px;
//           white-space: nowrap;
//           grid-column: 2;
//           justify-self: end;
//           transition: background 0.4s, color 0.4s, border-color 0.4s;
//         }
//         .cwa-pillar-row[data-active="true"] .cwa-pillar-metric {
//           background: #0a0a0a;
//           color: #fafaf9;
//           border-color: #0a0a0a;
//         }
//         .cwa-pillar-desc {
//           font-size: 15px;
//           line-height: 1.7;
//           color: rgba(10,10,10,0.65);
//           margin: 0;
//           grid-column: 1 / -1;
//           max-width: 52ch;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 3 — COST
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-cost {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #fafaf9;
//           border-top: 1px solid rgba(10,10,10,0.06);
//         }
//         .cwa-cost-inner { max-width: 1320px; margin: 0 auto; }
//         .cwa-cost-split {
//           display: grid;
//           grid-template-columns: 1.05fr 0.95fr;
//           gap: clamp(40px, 5vw, 88px);
//           align-items: stretch;
//           margin-bottom: clamp(48px, 6vw, 72px);
//         }
//         .cwa-cost-content {
//           display: flex; flex-direction: column; gap: 18px;
//           padding: clamp(20px, 3vw, 40px) 0;
//         }
//         .cwa-cost-content .cwa-h2 { margin: 0; }
//         .cwa-cost-content .cwa-h2-lead { margin: 0; }
//         .cwa-cost-close {
//           font-size: 14.5px; line-height: 1.7; color: rgba(10,10,10,0.6);
//           margin: 16px 0 0; padding-top: 22px;
//           border-top: 1px solid rgba(10,10,10,0.1); max-width: 540px;
//         }
//         .cwa-cost-media {
//           position: relative; overflow: hidden; background: #0a0a0a;
//           border-radius: clamp(20px, 2.4vw, 28px); min-height: 420px;
//         }
//         .cwa-cost-media img {
//           width: 100%; height: 100%; object-fit: cover;
//           filter: saturate(1.06) contrast(1.04);
//           transition: transform 1.2s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-cost-media:hover img { transform: scale(1.04); }
//         .cwa-cost-media-overlay {
//           position: absolute; inset: 0;
//           background: linear-gradient(180deg, rgba(10,10,10,0.12) 0%, rgba(10,10,10,0.55) 100%);
//           pointer-events: none;
//         }
//         .cwa-cost-media-tag {
//           position: absolute; bottom: 22px; left: 22px;
//           display: inline-flex; align-items: center; gap: 10px;
//           padding: 8px 14px; background: rgba(255,255,255,0.95);
//           border-radius: 999px; font-size: 11px; font-weight: 700;
//           letter-spacing: 0.14em; text-transform: uppercase; color: #0a0a0a;
//         }
//         .cwa-cost-media-tag-pulse {
//           width: 6px; height: 6px; border-radius: 50%;
//           background: #ef4444; box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
//           animation: cwa-pulse 1.8s ease-in-out infinite;
//         }
//         @keyframes cwa-pulse {
//           0%, 100% { box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2); }
//           50% { box-shadow: 0 0 0 6px rgba(239, 68, 68, 0.05); }
//         }

//         .cwa-fail-grid {
//           display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
//           border-top: 1px solid rgba(10,10,10,0.1);
//           border-left: 1px solid rgba(10,10,10,0.1);
//         }
//         .cwa-fail-card {
//           padding: 32px 28px 36px;
//           border-right: 1px solid rgba(10,10,10,0.1);
//           border-bottom: 1px solid rgba(10,10,10,0.1);
//           display: flex; flex-direction: column;
//           background: #fafaf9; position: relative;
//           transition: background 0.3s ease; overflow: hidden;
//         }
//         .cwa-fail-card::before {
//           content: ""; position: absolute; left: 0; right: 0; top: 0;
//           height: 2px; background: #0a0a0a;
//           transform: scaleX(0); transform-origin: left;
//           transition: transform 0.5s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-fail-card:hover { background: rgba(10,10,10,0.025); }
//         .cwa-fail-card:hover::before { transform: scaleX(1); }
//         .cwa-fail-card-top {
//           display: flex; justify-content: space-between; align-items: center;
//           margin-bottom: 20px;
//         }
//         .cwa-fail-card-idx {
//           font-family: var(--font-mono); font-size: 11px; font-weight: 500;
//           letter-spacing: 0.1em; color: rgba(10,10,10,0.4);
//         }
//         .cwa-fail-card-arrow {
//           font-size: 14px; color: rgba(10,10,10,0.3);
//           transition: color 0.3s, transform 0.3s;
//         }
//         .cwa-fail-card:hover .cwa-fail-card-arrow {
//           color: #0a0a0a; transform: translate(2px, -2px);
//         }
//         .cwa-fail-card-stat {
//           font-family: var(--font-display);
//           font-size: clamp(40px, 4.4vw, 60px);
//           font-weight: 500; letter-spacing: -0.045em;
//           line-height: 0.92; color: #0a0a0a;
//           font-variant-numeric: tabular-nums; margin-bottom: 8px;
//         }
//         .cwa-fail-card-label {
//           font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
//           text-transform: uppercase; color: rgba(10,10,10,0.55); margin-bottom: 22px;
//         }
//         .cwa-fail-card-divider { height: 1px; background: rgba(10,10,10,0.1); margin-bottom: 16px; }
//         .cwa-fail-card-h {
//           font-family: var(--font-display); font-size: 17px; font-weight: 500;
//           letter-spacing: -0.018em; line-height: 1.2; color: #0a0a0a; margin: 0 0 8px;
//         }
//         .cwa-fail-card-d { font-size: 13.5px; line-height: 1.62; color: rgba(10,10,10,0.6); margin: 0; }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 4 — PROCESS
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-process-section {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #0a0a0a; color: #fafaf9;
//           position: relative; overflow: hidden;
//         }
//         .cwa-process-section::before {
//           content: ""; position: absolute; inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
//           background-size: 60px 60px;
//           mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
//           -webkit-mask-image: radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%);
//           pointer-events: none;
//         }
//         .cwa-process-inner { position: relative; max-width: 1100px; margin: 0 auto; }
//         .cwa-process-section .cwa-section-head {
//           margin-bottom: clamp(64px, 8vw, 96px);
//           align-items: center; text-align: center;
//         }
//         .cwa-process-section .cwa-h2 { max-width: 700px; }
//         .cwa-process-section .cwa-h2-lead { max-width: 540px; }

//         .cwa-process-timeline { position: relative; padding: 20px 0; }
//         .cwa-process-line {
//           position: absolute; left: 50%; top: 0; bottom: 0;
//           width: 1px; background: rgba(255,255,255,0.08); transform: translateX(-50%);
//         }
//         .cwa-process-line-fill {
//           position: absolute; inset: 0;
//           background: linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.2) 100%);
//           transform-origin: top center; transform: scaleY(0);
//         }
//         .cwa-process-steps {
//           list-style: none; padding: 0; margin: 0;
//           display: flex; flex-direction: column;
//           gap: clamp(48px, 7vw, 88px); position: relative;
//         }
//         .cwa-proc-step {
//           position: relative;
//           display: grid; grid-template-columns: 1fr 60px 1fr;
//           align-items: center; gap: 0;
//         }
//         .cwa-proc-step-marker { grid-column: 2; display: flex; justify-content: center; z-index: 2; }
//         .cwa-proc-step-marker-num {
//           font-family: var(--font-mono); font-size: 11px; font-weight: 600;
//           letter-spacing: 0.06em; color: rgba(255,255,255,0.85);
//           padding: 6px 12px; background: #0a0a0a;
//           border: 1px solid rgba(255,255,255,0.2);
//           border-radius: 999px; white-space: nowrap;
//         }
//         .cwa-proc-step-card {
//           padding: 28px 30px 30px;
//           background: rgba(255,255,255,0.025);
//           border: 1px solid rgba(255,255,255,0.08);
//           border-radius: 14px; backdrop-filter: blur(8px);
//           transition: background 0.3s, border-color 0.3s, transform 0.3s;
//         }
//         .cwa-proc-step-card:hover {
//           background: rgba(255,255,255,0.045);
//           border-color: rgba(255,255,255,0.15);
//           transform: translateY(-2px);
//         }
//         .cwa-proc-step[data-side="L"] .cwa-proc-step-card {
//           grid-column: 1; margin-right: 32px; text-align: right;
//         }
//         .cwa-proc-step[data-side="R"] .cwa-proc-step-card {
//           grid-column: 3; margin-left: 32px; text-align: left;
//         }
//         .cwa-proc-step-head { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; }
//         .cwa-proc-step[data-side="L"] .cwa-proc-step-head { align-items: flex-end; }
//         .cwa-proc-step[data-side="R"] .cwa-proc-step-head { align-items: flex-start; }
//         .cwa-proc-step-title {
//           font-family: var(--font-display); font-size: clamp(18px, 1.9vw, 22px);
//           font-weight: 500; letter-spacing: -0.02em; line-height: 1.2;
//           margin: 0; color: #fafaf9;
//         }
//         .cwa-proc-step-meta {
//           font-family: var(--font-mono); font-size: 10px; font-weight: 500;
//           letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.45);
//         }
//         .cwa-proc-step-desc {
//           font-size: 14px; line-height: 1.65; color: rgba(255,255,255,0.65);
//           margin: 0; max-width: 36ch;
//         }
//         .cwa-proc-step[data-side="L"] .cwa-proc-step-desc { margin-left: auto; }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 5 — STACK
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-stack-section {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #fafaf9;
//           border-top: 1px solid rgba(10,10,10,0.06);
//         }
//         .cwa-stack-inner { max-width: 1320px; margin: 0 auto; }
//         .cwa-stack-window {
//           background: linear-gradient(160deg, #0a0a0a 0%, #141414 100%);
//           color: #fafaf9; border-radius: 18px; overflow: hidden;
//           box-shadow:
//             0 60px 120px -40px rgba(10,10,10,0.4),
//             inset 0 1px 0 rgba(255,255,255,0.06);
//           border: 1px solid rgba(255,255,255,0.06);
//         }
//         .cwa-stack-window-chrome {
//           display: flex; align-items: center; gap: 14px;
//           padding: 14px 22px;
//           border-bottom: 1px solid rgba(255,255,255,0.06);
//           background: rgba(255,255,255,0.02);
//         }
//         .cwa-stack-window-dots { display: flex; gap: 6px; }
//         .cwa-stack-window-dots span { width: 10px; height: 10px; border-radius: 50%; background: rgba(255,255,255,0.15); }
//         .cwa-stack-window-dots span:first-child { background: rgba(248,113,113,0.5); }
//         .cwa-stack-window-dots span:nth-child(2) { background: rgba(250,204,21,0.5); }
//         .cwa-stack-window-dots span:nth-child(3) { background: rgba(74,222,128,0.5); }
//         .cwa-stack-window-title { font-family: var(--font-mono); font-size: 12px; color: rgba(255,255,255,0.7); margin-left: 8px; }
//         .cwa-stack-window-meta { font-family: var(--font-mono); font-size: 11px; color: rgba(255,255,255,0.35); }
//         .cwa-stack-window-body { display: grid; grid-template-columns: 220px 1fr; }
//         .cwa-stack-tabs {
//           display: flex; flex-direction: column; padding: 18px 0;
//           border-right: 1px solid rgba(255,255,255,0.06);
//           background: rgba(255,255,255,0.015);
//         }
//         .cwa-stack-tab {
//           background: transparent; border: 0;
//           color: rgba(255,255,255,0.55);
//           font-family: var(--font-display); font-size: 14px; font-weight: 500;
//           letter-spacing: -0.012em;
//           padding: 14px 24px; text-align: left; cursor: pointer;
//           display: flex; align-items: center; gap: 14px; position: relative;
//           transition: color 0.25s, background 0.25s;
//         }
//         .cwa-stack-tab:hover { color: rgba(255,255,255,0.85); background: rgba(255,255,255,0.02); }
//         .cwa-stack-tab[data-active="true"] { color: #fafaf9; background: rgba(255,255,255,0.04); }
//         .cwa-stack-tab[data-active="true"]::before {
//           content: ""; position: absolute; left: 0; top: 8px; bottom: 8px;
//           width: 2px; background: #fafaf9; border-radius: 0 2px 2px 0;
//         }
//         .cwa-stack-tab-bin {
//           font-family: var(--font-mono); font-size: 10px; font-weight: 500;
//           color: rgba(255,255,255,0.35); letter-spacing: 0.06em;
//         }
//         .cwa-stack-tab[data-active="true"] .cwa-stack-tab-bin { color: rgba(255,255,255,0.7); }
//         .cwa-stack-code { padding: 22px 0; font-family: var(--font-mono); font-size: 13px; line-height: 1.85; min-height: 320px; }
//         .cwa-stack-line { display: grid; grid-template-columns: 56px 1fr; align-items: center; padding: 0 22px; }
//         .cwa-stack-ln {
//           color: rgba(255,255,255,0.18); font-size: 11px; text-align: right;
//           padding-right: 18px; user-select: none;
//         }
//         .cwa-stack-line-pre { color: rgba(255,255,255,0.7); }
//         .cwa-stack-line-item { color: rgba(255,255,255,0.85); transition: background 0.2s; }
//         .cwa-stack-line-item:hover { background: rgba(255,255,255,0.02); }
//         .cwa-stack-line-content { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
//         .cwa-stack-line-indent { color: transparent; }
//         .cwa-syn-key { color: #c084fc; }
//         .cwa-syn-var { color: #60a5fa; }
//         .cwa-syn-prop { color: #f9a8d4; }
//         .cwa-syn-str { color: #86efac; }
//         .cwa-syn-punct { color: rgba(255,255,255,0.4); }
//         .cwa-syn-brace { color: rgba(255,255,255,0.55); }
//         .cwa-syn-cursor {
//           display: inline-block; width: 7px; height: 14px;
//           background: rgba(255,255,255,0.7); margin-left: 4px;
//           vertical-align: middle; animation: cwa-blink 1s step-end infinite;
//         }
//         @keyframes cwa-blink {
//           0%, 50% { opacity: 1; }
//           51%, 100% { opacity: 0; }
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 6 — FAQs
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-faq-section {
//           padding: clamp(80px, 10vw, 140px) 20px;
//           background: #f5f5f4;
//           border-top: 1px solid rgba(10,10,10,0.06);
//         }
//         .cwa-faq-layout {
//           max-width: 1320px; margin: 0 auto;
//           display: grid; grid-template-columns: 380px 1fr;
//           gap: 80px; align-items: start;
//         }
//         .cwa-faq-aside { position: sticky; top: 120px; display: flex; flex-direction: column; gap: 14px; }
//         .cwa-faq-aside .cwa-h2 { margin: 0; }
//         .cwa-faq-aside .cwa-h2-lead { margin: 0 0 10px; }
//         .cwa-faq-cta {
//           display: inline-flex; align-items: center; gap: 8px;
//           padding: 12px 22px; border: 1px solid rgba(0,0,0,0.85);
//           color: #0a0a0a; text-decoration: none;
//           font-size: 13px; font-weight: 500; border-radius: 999px;
//           transition: background 0.2s, color 0.2s; align-self: flex-start;
//         }
//         .cwa-faq-cta:hover { background: #0a0a0a; color: #fafaf9; }
//         .cwa-faq-list { display: flex; flex-direction: column; border-top: 1px solid rgba(10,10,10,0.1); }
//         .cwa-faq-row { border-bottom: 1px solid rgba(10,10,10,0.1); }
//         .cwa-faq-q {
//           width: 100%;
//           display: grid; grid-template-columns: 50px 1fr 30px;
//           align-items: center; gap: 16px; padding: 22px 0;
//           background: transparent; border: 0; cursor: pointer;
//           text-align: left; color: #0a0a0a; font-family: var(--font-display);
//         }
//         .cwa-faq-q-num {
//           font-family: var(--font-mono); font-size: 12px; font-weight: 500;
//           color: rgba(10,10,10,0.4); letter-spacing: 0.06em;
//         }
//         .cwa-faq-q-text {
//           font-family: var(--font-display);
//           font-size: clamp(16px, 1.5vw, 20px);
//           font-weight: 500; letter-spacing: -0.018em; line-height: 1.32;
//         }
//         .cwa-faq-q-icon {
//           width: 30px; height: 30px;
//           display: inline-flex; align-items: center; justify-content: center;
//           border: 1px solid rgba(10,10,10,0.18);
//           border-radius: 50%; color: #0a0a0a;
//           transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
//                       background 0.25s, color 0.25s, border-color 0.25s;
//         }
//         .cwa-faq-row[data-open="true"] .cwa-faq-q-icon {
//           transform: rotate(45deg); background: #0a0a0a; color: #fafaf9; border-color: #0a0a0a;
//         }
//         .cwa-faq-a {
//           display: grid; grid-template-rows: 0fr;
//           transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-faq-row[data-open="true"] .cwa-faq-a { grid-template-rows: 1fr; }
//         .cwa-faq-a-inner {
//           overflow: hidden; padding-left: 66px;
//           font-family: var(--font-body); font-size: 15px;
//           line-height: 1.7; color: rgba(10,10,10,0.65);
//           padding-bottom: 0;
//           transition: padding-bottom 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cwa-faq-row[data-open="true"] .cwa-faq-a-inner { padding-bottom: 26px; }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 7 — FINAL CTA
//         ═══════════════════════════════════════════════════════════════ */
//         .cwa-cta-section { padding: 64px 20px 80px; background: #fafaf9; }
//         .cwa-cta-inner {
//           max-width: 1320px; margin: 0 auto;
//           padding: clamp(72px, 9vw, 120px) clamp(32px, 5vw, 80px);
//           background: #0a0a0a; color: #fafaf9;
//           border-radius: 28px; position: relative; overflow: hidden;
//         }
//         .cwa-cta-inner::before {
//           content: ""; position: absolute; inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
//           background-size: 56px 56px;
//           mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 90%);
//           -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 0%, transparent 90%);
//           pointer-events: none;
//         }
//         .cwa-cta-grid {
//           position: relative; z-index: 1;
//           display: grid; grid-template-columns: 1.3fr 1fr;
//           gap: clamp(48px, 6vw, 96px); align-items: end;
//         }
//         .cwa-cta-h2 {
//           font-family: var(--font-display);
//           font-size: clamp(36px, 5.2vw, 72px);
//           font-weight: 500; letter-spacing: -0.04em; line-height: 0.98;
//           margin: 0 0 24px; color: #fafaf9; max-width: 620px;
//         }
//         .cwa-cta-h2-accent { font-style: italic; font-weight: 400; color: rgba(255,255,255,0.55); }
//         .cwa-cta-lead {
//           font-size: 16px; line-height: 1.7; color: rgba(255,255,255,0.65);
//           margin: 0 0 36px; max-width: 520px;
//         }
//         .cwa-cta-actions { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
//         .cwa-cta-primary-light {
//           display: inline-flex; align-items: center; gap: 10px;
//           padding: 15px 28px; background: #fafaf9; color: #0a0a0a;
//           text-decoration: none; font-size: 14px; font-weight: 500;
//           border-radius: 999px;
//           transition: background 0.25s, transform 0.25s;
//         }
//         .cwa-cta-primary-light:hover { background: #e7e5e4; transform: translateY(-2px); }
//         .cwa-cta-primary-light svg { transition: transform 0.25s; }
//         .cwa-cta-primary-light:hover svg { transform: translateX(2px); }
//         .cwa-cta-mail {
//           font-size: 14px; font-weight: 500; color: rgba(255,255,255,0.65);
//           text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.25);
//           padding-bottom: 2px; transition: color 0.2s, border-color 0.2s;
//         }
//         .cwa-cta-mail:hover { color: #fafaf9; border-color: #fafaf9; }
//         .cwa-cta-right { display: flex; flex-direction: column; align-items: stretch; }
//         .cwa-cta-meta {
//           display: grid; grid-template-columns: 1fr 1fr; gap: 0; margin: 0;
//           border-top: 1px solid rgba(255,255,255,0.12);
//           border-left: 1px solid rgba(255,255,255,0.12);
//         }
//         .cwa-cta-meta-item {
//           padding: 22px 24px;
//           border-right: 1px solid rgba(255,255,255,0.12);
//           border-bottom: 1px solid rgba(255,255,255,0.12);
//           background: rgba(255,255,255,0.02);
//         }
//         .cwa-cta-meta-item dt {
//           font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
//           text-transform: uppercase; color: rgba(255,255,255,0.5); margin: 0 0 8px;
//         }
//         .cwa-cta-meta-item dd {
//           font-family: var(--font-display); font-size: 17px; font-weight: 500;
//           letter-spacing: -0.018em; color: #fafaf9; margin: 0;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            RESPONSIVE
//         ═══════════════════════════════════════════════════════════════ */
//         @media (max-width: 1100px) {
//           .cwa-hero .csd-hero-main {
//             grid-template-columns: 1fr; gap: 64px; min-height: auto;
//           }
//           .cwa-hero .csd-hero-left { max-width: 760px; }
//           .cwa-hero .csd-hero-right { max-width: 720px; margin: 0 auto; width: 100%; }
//           .cwa-hero .csd-hero-form-shell { max-width: 100%; }

//           .cwa-growth-head-inline {
//             flex-direction: column; align-items: flex-start; gap: 14px;
//           }
//           .cwa-growth-head-inline .cwa-h2,
//           .cwa-growth-head-inline .cwa-h2-lead {
//             flex: initial; margin: 0; transform: none;
//           }
//           .cwa-growth-grid { grid-template-columns: 1fr; gap: 48px; }
//           .cwa-growth-media-wrap { position: static; }
//           .cwa-growth-media { aspect-ratio: 16 / 11; max-width: 720px; margin: 0 auto; }

//           .cwa-cost-split { grid-template-columns: 1fr; gap: 40px; }
//           .cwa-cost-media { min-height: 320px; aspect-ratio: 16 / 9; }
//           .cwa-fail-grid { grid-template-columns: repeat(2, 1fr); }

//           .cwa-process-steps { padding-left: 48px; }
//           .cwa-process-line { left: 22px; transform: none; }
//           .cwa-proc-step { grid-template-columns: 1fr; }
//           .cwa-proc-step-marker {
//             position: absolute; left: -38px; top: 18px; grid-column: 1;
//           }
//           .cwa-proc-step[data-side="L"] .cwa-proc-step-card,
//           .cwa-proc-step[data-side="R"] .cwa-proc-step-card {
//             grid-column: 1; margin: 0; text-align: left;
//           }
//           .cwa-proc-step[data-side="L"] .cwa-proc-step-head,
//           .cwa-proc-step[data-side="R"] .cwa-proc-step-head { align-items: flex-start; }
//           .cwa-proc-step[data-side="L"] .cwa-proc-step-desc { margin-left: 0; }

//           .cwa-stack-window-body { grid-template-columns: 1fr; }
//           .cwa-stack-tabs {
//             flex-direction: row; overflow-x: auto; padding: 0;
//             border-right: 0; border-bottom: 1px solid rgba(255,255,255,0.06);
//           }
//           .cwa-stack-tab { padding: 16px 20px; flex-shrink: 0; }
//           .cwa-stack-tab[data-active="true"]::before {
//             top: auto; bottom: 0; left: 20px; right: 20px;
//             width: auto; height: 2px; border-radius: 2px 2px 0 0;
//           }

//           .cwa-faq-layout { grid-template-columns: 1fr; gap: 48px; }
//           .cwa-faq-aside { position: static; }
//           .cwa-cta-grid { grid-template-columns: 1fr; gap: 48px; align-items: start; }
//         }

//         @media (max-width: 1100px) and (min-width: 901px) {
//           .cwa-hero .csd-hero-left { transform: translateY(18px); }
//         }

//         @media (max-width: 900px) {
//           .cwa-hero-bg-video { display: none; }
//           .cwa-hero-mobile-bg { display: block; }
//           .cwa-hero-bg-overlay {
//             background:
//               linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.78) 55%, rgba(0,0,0,0.88) 100%),
//               linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 100%);
//           }
//           .cwa-hero { padding: clamp(96px, 14svh, 128px) 14px 0; }
//           .cwa-hero .csd-hero-mobile-spacer {
//             display: block; flex: 1 1 auto;
//             min-height: min(26vh, 220px); max-height: 44vh;
//           }
//           .cwa-hero .csd-hero-left {
//             display: flex; flex-direction: column;
//             min-height: min(58svh, 580px); transform: none; max-width: none;
//           }
//           .cwa-hero-title { font-size: clamp(28px, 7vw, 40px); line-height: 1.02; margin-bottom: 16px; }
//           .cwa-hero-lead { font-size: 15px; line-height: 1.62; margin-bottom: 24px; max-width: none; }
//           .cwa-hero-inner { gap: 0; }
//           .cwa-hero .csd-hero-main { min-height: auto; gap: 0; }
//           .cwa-hero .csd-hero-right {
//             align-self: stretch; width: 100%; margin-top: 0; align-items: stretch;
//           }
//           .cwa-hero .csd-hero-form-shell {
//             max-width: none; width: 100%; margin: 0 auto;
//             border-radius: 22px; padding: 32px 20px 40px;
//           }
//           .cwa-hero .csd-hero-form-subtitle { max-width: none; }
//           .cwa-hero .csd-hero-form { gap: 22px; }
//         }

//         @media (max-width: 768px) {
//           .cwa-hero { padding: 130px 14px 60px; min-height: auto; }
//           .cwa-hero .csd-hero-left { transform: none; }
//           .cwa-hero-title {
//             font-size: clamp(24px, 6.6vw, 36px);
//             max-width: 100%; margin-bottom: 16px; line-height: 1.03;
//           }
//           .cwa-hero-lead { font-size: 14px; line-height: 1.58; margin-bottom: 20px; }
//           .cwa-hero-cta-row { gap: 10px; margin-bottom: 40px; }
//           .cwa-hero .csd-hero-form-grid { grid-template-columns: 1fr; }
//           .cwa-hero .csd-hero-form-foot { flex-direction: column; align-items: stretch; }
//           .cwa-hero .csd-hero-form-submit { width: 100%; }
//           .cwa-hero .csd-hero-form-shell {
//             padding: 28px 18px 40px; border-radius: 22px; width: 100%;
//             margin-left: auto; margin-right: auto;
//           }

//           .cwa-growth, .cwa-cost, .cwa-stack-section, .cwa-faq-section, .cwa-process-section {
//             padding-left: 14px; padding-right: 14px;
//           }

//           .cwa-pillar-row { grid-template-columns: 40px 1fr; gap: 16px; padding: 24px 0 26px; }
//           .cwa-pillar-marker-num { font-size: 22px; }
//           .cwa-pillar-body { grid-template-columns: 1fr; row-gap: 10px; }
//           .cwa-pillar-metric { grid-row: auto; justify-self: start; }

//           .cwa-fail-grid { grid-template-columns: 1fr; }
//           .cwa-fail-card:nth-child(odd) { border-right: 0; }
//           .cwa-fail-card { border-right: 0 !important; padding: 26px 22px 28px; }

//           .cwa-process-steps { padding-left: 36px; }
//           .cwa-process-line { left: 14px; }
//           .cwa-proc-step-marker { left: -30px; }
//           .cwa-proc-step-card { padding: 22px 22px 24px; }

//           .cwa-stack-tab { padding: 14px 16px; font-size: 13px; }
//           .cwa-stack-code { font-size: 11.5px; min-height: 280px; padding: 16px 0; }
//           .cwa-stack-line { padding: 0 14px; grid-template-columns: 36px 1fr; }
//           .cwa-stack-ln { padding-right: 12px; }

//           .cwa-faq-q { grid-template-columns: 36px 1fr 26px; gap: 12px; padding: 18px 0; }
//           .cwa-faq-q-icon { width: 26px; height: 26px; }
//           .cwa-faq-a-inner { padding-left: 48px; font-size: 14px; }

//           .cwa-cta-section { padding: 48px 14px 56px; }
//           .cwa-cta-inner { padding: 56px 26px; border-radius: 18px; }
//           .cwa-cta-h2 { font-size: clamp(28px, 9vw, 42px); }
//           .cwa-cta-meta { grid-template-columns: 1fr; }
//           .cwa-cta-meta-item:last-child { border-bottom: 0; }
//         }
//       `}</style>
//     </>
//   );
// }

