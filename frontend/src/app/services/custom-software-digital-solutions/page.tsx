// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import Link from "next/link";
// import SiteHeader from "@/components/SiteHeader";

// gsap.registerPlugin(ScrollTrigger);

// // ── DATA ──────────────────────────────────────────────────────────────────────

// // The six sub-services under "Custom Software & Digital Solutions".
// // Each links to its own dedicated subpage. Order intentionally moves from
// // most-comprehensive (web apps, mobile, SaaS) → enabling layers (UX, CMS, LPs).
// const SUB_SERVICES = [
//   {
//     num: "01",
//     title: "Custom Web Application Development",
//     desc: "Production-grade web apps built for performance, scale, and long-term maintainability.",
//     href: "/services/custom-software-digital-solutions/custom-web-application-development",
//     accent: "#f472b6",
//     tags: ["Next.js", "React", "Node", "Postgres"],
//   },
//   {
//     num: "02",
//     title: "Mobile App Development",
//     desc: "Native and cross-platform iOS & Android apps that feel fast and ship on schedule.",
//     href: "/services/custom-software-digital-solutions/mobile-app-development-ios-android",
//     accent: "#a3e635",
//     tags: ["iOS", "Android", "React Native", "Swift"],
//   },
//   {
//     num: "03",
//     title: "SaaS Product Development",
//     desc: "Multi-tenant SaaS platforms with billing, auth, analytics, and growth loops baked in.",
//     href: "/services/custom-software-digital-solutions/saas-product-development",
//     accent: "#38bdf8",
//     tags: ["Multi-tenant", "Billing", "Auth", "Analytics"],
//   },
//   {
//     num: "04",
//     title: "UI/UX Design Systems",
//     desc: "Design systems, component libraries, and product UX engineered for consistency at scale.",
//     href: "/services/custom-software-digital-solutions/ui-ux-design-systems",
//     accent: "#fbbf24",
//     tags: ["Design Systems", "Figma", "Tokens", "A11y"],
//   },
//   {
//     num: "05",
//     title: "CMS & Admin Panel Development",
//     desc: "Content systems and internal tools that empower teams without slowing them down.",
//     href: "/services/custom-software-digital-solutions/cms-admin-panel-development",
//     accent: "#c084fc",
//     tags: ["Headless CMS", "Admin UI", "RBAC", "Workflows"],
//   },
//   {
//     num: "06",
//     title: "High-Performance Landing Pages",
//     desc: "Pixel-perfect, conversion-tuned landing pages with sub-second load and SEO baked in.",
//     href: "/services/custom-software-digital-solutions/high-performance-landing-pages",
//     accent: "#fb7185",
//     tags: ["Core Web Vitals", "SEO", "A/B Ready", "CRO"],
//   },
// ];

// // "What We Actually Build" — translates abstract service names into concrete
// // product types clients can recognize themselves in. Each is intentionally
// // short — recognition, not marketing copy.
// const WE_BUILD = [
//   {
//     label: "SaaS Platforms",
//     desc: "Multi-tenant products with billing, dashboards, and integrations.",
//     glyph: "◐",
//   },
//   {
//     label: "Business Dashboards",
//     desc: "Real-time analytics surfaces wired to your live data.",
//     glyph: "◑",
//   },
//   {
//     label: "Mobile Apps",
//     desc: "Native iOS, Android, and cross-platform consumer apps.",
//     glyph: "◒",
//   },
//   {
//     label: "Internal Tools",
//     desc: "Admin panels and ops tooling that replace spreadsheets.",
//     glyph: "◓",
//   },
//   {
//     label: "MVPs",
//     desc: "Ship-fast prototypes built on architecture that can scale.",
//     glyph: "◔",
//   },
//   {
//     label: "Marketplaces",
//     desc: "Two-sided platforms with payments, search, and trust systems.",
//     glyph: "◕",
//   },
// ];

// // Why Choose Us — focuses on *how* we work, not generic adjectives.
// // Each pairs a sharp claim with the operating principle behind it.
// const VALUE_PROPS = [
//   {
//     num: "01",
//     title: "Performance-first development",
//     desc: "Every line of code is measured. Lighthouse scores, Core Web Vitals, and runtime budgets are non-negotiable, not afterthoughts.",
//     metric: "98+",
//     metricLabel: "Avg. Lighthouse",
//   },
//   {
//     num: "02",
//     title: "Scalable architecture by default",
//     desc: "We design for the system you'll need in two years, not the prototype you have today. Clean boundaries, observable systems, sane defaults.",
//     metric: "10×",
//     metricLabel: "Traffic headroom",
//   },
//   {
//     num: "03",
//     title: "Clean UX systems",
//     desc: "Component libraries and design tokens that make your product feel coherent across every surface — mobile, web, admin.",
//     metric: "1",
//     metricLabel: "Source of truth",
//   },
//   {
//     num: "04",
//     title: "Fast iteration cycles",
//     desc: "Weekly demos. Production deploys behind feature flags. You stay close to the work and ship without ceremony.",
//     metric: "7d",
//     metricLabel: "Sprint cadence",
//   },
// ];

// // Process — mirrors the landing page exactly (same horizontal-pinned UX),
// // but extended to 6 phases per the brief: Discovery → Design → Dev →
// // Testing → Launch → Support.
// const PROCESS = [
//   {
//     num: "01",
//     title: "Discovery",
//     desc: "Deep-dive into your business, users, and technical landscape to uncover what actually needs to be built.",
//     points: ["Stakeholder interviews", "Technical audit", "Opportunity mapping"],
//   },
//   {
//     num: "02",
//     title: "Design",
//     desc: "We design the experience — flows, wireframes, and high-fidelity UI — before a single line of production code is written.",
//     points: ["UX flows & wireframes", "High-fidelity UI", "Design tokens"],
//   },
//   {
//     num: "03",
//     title: "Development",
//     desc: "Agile sprints with weekly demos. You stay close to the work. We ship fast without cutting corners.",
//     points: ["Weekly demos", "CI/CD pipeline", "Code review"],
//   },
//   {
//     num: "04",
//     title: "Testing",
//     desc: "Automated and manual QA across devices, browsers, and edge cases. Performance, accessibility, and security baked in.",
//     points: ["Automated test suites", "Cross-device QA", "Performance budgets"],
//   },
//   {
//     num: "05",
//     title: "Launch",
//     desc: "Phased rollout with monitoring, observability, and rollback plans. We don't ship and pray.",
//     points: ["Phased rollout", "Monitoring & alerts", "Rollback ready"],
//   },
//   {
//     num: "06",
//     title: "Support",
//     desc: "Post-launch support, iteration, and growth. We don't disappear after go-live.",
//     points: ["SLA-backed support", "Continuous improvement", "Roadmap planning"],
//   },
// ];

// // Tech stack — matched to the marquee on the landing page (same UI), but
// // curated to what *actually* applies to custom software builds. Grouped
// // conceptually but rendered as a continuous marquee per the brief.
// const TECH = [
//   // Frontend
//   "React", "Next.js", "TypeScript", "Vue", "Svelte", "Tailwind",
//   // Backend
//   "Node.js", "Python", "Go", "Rust", "GraphQL", "PostgreSQL",
//   // Mobile
//   "Swift", "Kotlin", "React Native", "Flutter",
//   // Cloud / Infra
//   "AWS", "GCP", "Kubernetes", "Docker", "Terraform", "Redis",
// ];

// // Results — outcomes, not vanity metrics. Each pairs a number with the
// // shape of the win, so the section reads as proof not boast.
// const RESULTS = [
//   {
//     metric: "43%",
//     label: "Faster page loads",
//     desc: "Average performance improvement after migrating clients to our build pipeline and edge-cached architecture.",
//   },
//   {
//     metric: "2.4×",
//     label: "Conversion lift",
//     desc: "Median uplift on landing pages and onboarding flows we've redesigned and re-engineered for measured outcomes.",
//   },
//   {
//     metric: "$4M",
//     label: "Annual savings",
//     desc: "Operational cost reduced for a logistics client through a custom route-optimization platform we shipped in year one.",
//   },
//   {
//     metric: "2M+",
//     label: "Users served",
//     desc: "A SaaS product we architected scaled from beta to two million monthly active users without a major incident.",
//   },
// ];

// // FAQs — written to capture long-tail intent and remove buying friction.
// // Each answer is direct, no hedging, no marketing fluff.
// const FAQS = [
//   {
//     q: "How much does custom software development cost?",
//     a: "Most projects fall between $40K and $250K depending on scope, team size, and timeline. We provide fixed-price proposals after a paid discovery sprint so there are no surprises mid-build. For exploratory MVPs, we also offer time-and-materials engagements with weekly cost ceilings.",
//   },
//   {
//     q: "How long does it take to build a custom application?",
//     a: "MVPs typically take 8–12 weeks. Full production builds run 16–24 weeks. We share a detailed Gantt during the proposal phase, with weekly milestones you can hold us to. Tight deadlines are doable when scope is clear — we'll tell you honestly what fits.",
//   },
//   {
//     q: "What technologies do you specialize in?",
//     a: "Our default stack is TypeScript end-to-end (React, Next.js, Node), Postgres, and AWS or GCP. For mobile we ship native (Swift, Kotlin) when performance matters and React Native when speed-to-market wins. We choose tooling based on your problem, not because it's trendy.",
//   },
//   {
//     q: "Do you handle the entire process or just one part?",
//     a: "Both. We can own discovery → design → engineering → launch → support end-to-end, or we can plug into your existing team in any of those phases. Most clients start with a discovery sprint and expand the engagement based on what's working.",
//   },
//   {
//     q: "What happens after the product launches?",
//     a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and small feature work. Many clients keep us on as a fractional engineering team. You're never locked in — all code, infrastructure, and credentials transfer to you.",
//   },
//   {
//     q: "Can you work with our existing team or codebase?",
//     a: "Yes. We do legacy modernization, codebase audits, and team augmentation. We're comfortable inheriting messy code, untangling architecture, and shipping alongside your engineers. No ego, no rewrites for the sake of rewriting.",
//   },
//   {
//     q: "How do you handle data security and compliance?",
//     a: "SOC 2-aligned engineering practices by default. We've shipped HIPAA, PCI-DSS, and GDPR-compliant systems. Security reviews, penetration testing, and threat modeling are part of our standard delivery, not an upsell.",
//   },
//   {
//     q: "Do you sign NDAs before discovery calls?",
//     a: "Of course. Send us your NDA before the call and we'll have it back signed within the day. We also have a mutual NDA template if you'd prefer to use ours.",
//   },
// ];

// // ── COMPONENT ─────────────────────────────────────────────────────────────────

// export default function CustomSoftwarePage() {
//   // Hero rotating word — same pattern as the home page hero, but the words
//   // are nouns describing what we ship, not verbs. Keeps the heading dynamic
//   // without echoing the homepage exactly.
//   const HERO_NOUNS = ["software", "platforms", "products", "systems", "experiences"];
//   const [rotatingNoun, setRotatingNoun] = useState(0);

//   // FAQ accordion — only one open at a time, pure state, no animation lib.
//   const [openFaq, setOpenFaq] = useState<number | null>(0);

//   // Mobile breakpoint — used to fork the Process section's UX (pinned on
//   // desktop, vertical stack on mobile).
//   const [isMobile, setIsMobile] = useState(false);

//   // Tech marquee refs (same pattern as landing page).
//   const marqueeLeftRef = useRef<HTMLDivElement>(null);
//   const marqueeRightRef = useRef<HTMLDivElement>(null);
//   const marqueeLeftTweenRef = useRef<gsap.core.Tween | null>(null);
//   const marqueeRightTweenRef = useRef<gsap.core.Tween | null>(null);

//   // Lenis smooth scroll — matches landing page so transitions between
//   // pages feel consistent.
//   const lenisRef = useRef<Lenis | null>(null);

//   // Mobile detector
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const mq = window.matchMedia("(max-width: 900px)");
//     const update = () => setIsMobile(mq.matches);
//     update();
//     mq.addEventListener("change", update);
//     return () => mq.removeEventListener("change", update);
//   }, []);

//   // Hero rotating noun
//   useEffect(() => {
//     const id = setInterval(() => {
//       setRotatingNoun((v) => (v + 1) % HERO_NOUNS.length);
//     }, 2600);
//     return () => clearInterval(id);
//   }, [HERO_NOUNS.length]);

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
//     lenis.on("scroll", ScrollTrigger.update);
//     const ticker = (time: number) => lenis.raf(time * 1000);
//     gsap.ticker.add(ticker);
//     gsap.ticker.lagSmoothing(0);
//     return () => {
//       gsap.ticker.remove(ticker);
//       lenis.destroy();
//       lenisRef.current = null;
//     };
//   }, []);

//   // GSAP animations
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // ── HERO intro ──
//       const heroTl = gsap.timeline({ delay: 0.15 });
//       const headlineChars = gsap.utils.toArray<HTMLElement>(".csd-hero-char");
//       heroTl.fromTo(
//         headlineChars,
//         { yPercent: 110, rotateX: -35, opacity: 0 },
//         {
//           yPercent: 0, rotateX: 0, opacity: 1,
//           duration: 0.9,
//           stagger: { each: 0.018, from: "start" },
//           ease: "power4.out",
//         },
//         0
//       );
//       heroTl.fromTo(
//         ".csd-hero-noun-mask",
//         { yPercent: 100 },
//         { yPercent: 0, duration: 0.85, ease: "power4.out" },
//         0.2
//       );
//       heroTl.fromTo(
//         ".csd-hero-fade",
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
//         0.7
//       );

//       // ── Section header fade-ins ──
//       gsap.utils.toArray<HTMLElement>(".csd-sh").forEach((el) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 38 },
//           {
//             opacity: 1, y: 0, duration: 0.95, ease: "power3.out",
//             scrollTrigger: { trigger: el, start: "top 88%" },
//           }
//         );
//       });

//       // ── Service cards stagger ──
//       gsap.utils.toArray<HTMLElement>(".csd-svc-card").forEach((el, i) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 30 },
//           {
//             opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
//             delay: (i % 3) * 0.08,
//             scrollTrigger: { trigger: el, start: "top 90%" },
//           }
//         );
//       });

//       // ── "What we build" tile reveal ──
//       gsap.utils.toArray<HTMLElement>(".csd-build-tile").forEach((el, i) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 24 },
//           {
//             opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
//             delay: (i % 3) * 0.06,
//             scrollTrigger: { trigger: el, start: "top 92%" },
//           }
//         );
//       });

//       // ── Value props stagger ──
//       gsap.utils.toArray<HTMLElement>(".csd-value-row").forEach((el, i) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, x: -30 },
//           {
//             opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
//             delay: i * 0.08,
//             scrollTrigger: { trigger: el, start: "top 88%" },
//           }
//         );
//       });

//       // ── Results metrics count-up ──
//       gsap.utils.toArray<HTMLElement>(".csd-result-num").forEach((el) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 16 },
//           {
//             opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
//             scrollTrigger: { trigger: el, start: "top 88%" },
//           }
//         );
//       });

//       // ── FAQs ──
//       gsap.utils.toArray<HTMLElement>(".csd-faq-row").forEach((el, i) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 14 },
//           {
//             opacity: 1, y: 0, duration: 0.5, ease: "power3.out",
//             delay: i * 0.04,
//             scrollTrigger: { trigger: el, start: "top 92%" },
//           }
//         );
//       });

//       // ── Process: horizontal pin (desktop only) ──
//       const processTrack = document.querySelector<HTMLElement>(".csd-process-track");
//       const processPin = document.querySelector<HTMLElement>(".csd-process-pin");
//       const mm = gsap.matchMedia();
//       mm.add("(min-width: 769px)", () => {
//         if (!processTrack || !processPin) return;
//         const getScrollDistance = () =>
//           processTrack.scrollWidth - window.innerWidth + 80;
//         gsap.to(processTrack, {
//           x: () => -getScrollDistance(),
//           ease: "none",
//           scrollTrigger: {
//             trigger: processPin,
//             start: "top top",
//             end: () => `+=${getScrollDistance()}`,
//             pin: true,
//             pinSpacing: true,
//             scrub: 0.8,
//             invalidateOnRefresh: true,
//           },
//         });
//       });

//       // ── CTA fade ──
//       gsap.fromTo(
//         ".csd-cta-inner",
//         { opacity: 0, y: 50 },
//         {
//           opacity: 1, y: 0, duration: 1, ease: "power3.out",
//           scrollTrigger: { trigger: ".csd-cta-inner", start: "top 85%" },
//         }
//       );
//     });
//     return () => ctx.revert();
//   }, []);

//   // Tech marquee — same pattern as landing page
//   useEffect(() => {
//     const left = marqueeLeftRef.current;
//     const right = marqueeRightRef.current;
//     if (!left || !right) return;

//     gsap.set(left, { xPercent: 0 });
//     gsap.set(right, { xPercent: -50 });

//     const leftTween = gsap.to(left, {
//       xPercent: -50,
//       duration: 55,
//       ease: "none",
//       repeat: -1,
//     });
//     const rightTween = gsap.to(right, {
//       xPercent: 0,
//       duration: 60,
//       ease: "none",
//       repeat: -1,
//     });

//     marqueeLeftTweenRef.current = leftTween;
//     marqueeRightTweenRef.current = rightTween;

//     return () => {
//       marqueeLeftTweenRef.current = null;
//       marqueeRightTweenRef.current = null;
//       leftTween.kill();
//       rightTween.kill();
//     };
//   }, []);

//   const handleTechMarqueeEnter = () => {
//     const leftTween = marqueeLeftTweenRef.current;
//     const rightTween = marqueeRightTweenRef.current;
//     if (leftTween) gsap.to(leftTween, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
//     if (rightTween) gsap.to(rightTween, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
//   };

//   const handleTechMarqueeLeave = () => {
//     const leftTween = marqueeLeftTweenRef.current;
//     const rightTween = marqueeRightTweenRef.current;
//     if (leftTween) gsap.to(leftTween, { timeScale: 1, duration: 0.45, ease: "power2.out" });
//     if (rightTween) gsap.to(rightTween, { timeScale: 1, duration: 0.45, ease: "power2.out" });
//   };

//   // Refresh ScrollTrigger after fonts load
//   useEffect(() => {
//     const fonts = "fonts" in document ? document.fonts : undefined;
//     if (!fonts?.ready) return;
//     fonts.ready.then(() => {
//       ScrollTrigger.refresh();
//     });
//   }, []);

//   return (
//     <>
//       {/* ── GRAIN OVERLAY (matches landing page texture) ── */}
//       <div
//         aria-hidden
//         style={{
//           position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9997,
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
//             SECTION 1 — HERO
//             "Custom Software & Digital Solutions" positioning + first impression.
//             Mirrors the landing-page hero treatment: rotating word, dot grid,
//             crosshair marks, two CTAs. Personalized noun list to differentiate.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           className="csd-hero"
//           style={{
//             minHeight: "calc(100vh - 40px)",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             padding: "140px 20px 80px",
//             position: "relative",
//             overflow: "hidden",
//           }}
//         >
//           {/* Dot grid */}
//           <div
//             aria-hidden
//             style={{
//               position: "absolute", inset: 0,
//               backgroundImage: "radial-gradient(rgba(0,0,0,0.09) 1px, transparent 1px)",
//               backgroundSize: "32px 32px",
//               maskImage: "radial-gradient(ellipse 75% 65% at 35% 45%, black 0%, transparent 95%)",
//               WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 35% 45%, black 0%, transparent 95%)",
//               pointerEvents: "none",
//             }}
//           />

//           {/* Crosshair corner marks */}
//           {[
//             { top: 140, left: 40, b: "Top", r: "Left" },
//             { top: 140, right: 40, b: "Top", r: "Right" },
//             { bottom: 40, left: 40, b: "Bottom", r: "Left" },
//             { bottom: 40, right: 40, b: "Bottom", r: "Right" },
//           ].map((c, i) => (
//             <div
//               key={i}
//               aria-hidden
//               style={{
//                 position: "absolute",
//                 top: c.top, left: c.left, right: c.right, bottom: c.bottom,
//                 width: 10, height: 10,
//                 borderTop: c.b === "Top" ? "1px solid rgba(0,0,0,0.22)" : undefined,
//                 borderBottom: c.b === "Bottom" ? "1px solid rgba(0,0,0,0.22)" : undefined,
//                 borderLeft: c.r === "Left" ? "1px solid rgba(0,0,0,0.22)" : undefined,
//                 borderRight: c.r === "Right" ? "1px solid rgba(0,0,0,0.22)" : undefined,
//                 pointerEvents: "none",
//               }}
//             />
//           ))}

//           <div style={{ maxWidth: 1320, width: "100%", margin: "0 auto", position: "relative", zIndex: 1 }}>
//             {/* Breadcrumb / category eyebrow */}
//             <div
//               className="csd-hero-fade"
//               style={{
//                 display: "inline-flex",
//                 alignItems: "center",
//                 gap: 10,
//                 marginBottom: 36,
//                 opacity: 0,
//                 fontSize: 12,
//                 fontWeight: 600,
//                 letterSpacing: "0.16em",
//                 textTransform: "uppercase",
//                 color: "rgba(10,10,10,0.5)",
//               }}
//             >
//               <span
//                 style={{
//                   width: 8, height: 8, borderRadius: "50%",
//                   background: "#f472b6",
//                   boxShadow: "0 0 0 4px rgba(244,114,182,0.18)",
//                 }}
//               />
//               <Link href="/services" style={{ color: "inherit", textDecoration: "none" }}>
//                 Services
//               </Link>
//               <span style={{ opacity: 0.4 }}>/</span>
//               <span style={{ color: "#0a0a0a" }}>Custom Software &amp; Digital Solutions</span>
//             </div>

//             <div className="csd-hero-grid">
//               {/* LEFT — headline + body + CTAs */}
//               <div>
//                 <h1
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: "clamp(40px, 5.6vw, 92px)",
//                     fontWeight: 500,
//                     lineHeight: 0.96,
//                     letterSpacing: "-0.032em",
//                     margin: "0 0 36px",
//                   }}
//                 >
//                   <div style={{ overflow: "hidden", paddingBottom: "0.08em" }}>
//                     {"Custom".split("").map((c, i) => (
//                       <span
//                         key={`l1-${i}`}
//                         className="csd-hero-char"
//                         style={{ display: "inline-block", willChange: "transform" }}
//                       >
//                         {c === " " ? "\u00A0" : c}
//                       </span>
//                     ))}
//                   </div>
//                   <div
//                     style={{
//                       overflow: "hidden",
//                       paddingBottom: "0.08em",
//                       display: "flex",
//                       flexWrap: "nowrap",
//                       alignItems: "baseline",
//                       gap: "0.22em",
//                     }}
//                   >
//                     <span style={{ display: "inline-flex", overflow: "hidden", flexShrink: 0 }}>
//                       {/* Word: italic rotating noun ("software / platforms / products …") */}
//                     </span>
//                     <span
//                       aria-live="polite"
//                       style={{
//                         position: "relative",
//                         display: "inline-block",
//                         overflow: "visible",
//                         verticalAlign: "bottom",
//                         minWidth: "8.5ch",
//                         paddingRight: "0.12em",
//                       }}
//                     >
//                       <span className="csd-hero-noun-mask" style={{ display: "inline-block", willChange: "transform" }}>
//                         {HERO_NOUNS.map((v, i) => (
//                           <span
//                             key={v}
//                             style={{
//                               display: "block",
//                               fontStyle: "italic",
//                               fontWeight: 400,
//                               color: "rgba(0,0,0,0.62)",
//                               whiteSpace: "nowrap",
//                               transform: `translateY(${(i - rotatingNoun) * 100}%)`,
//                               transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
//                               position: i === 0 ? "relative" : "absolute",
//                               top: 0,
//                               left: 0,
//                             }}
//                           >
//                             {v}
//                           </span>
//                         ))}
//                       </span>
//                     </span>
//                   </div>
//                   <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
//                     {"engineered for".split("").map((c, i) => (
//                       <span
//                         key={`l3-${i}`}
//                         className="csd-hero-char"
//                         style={{ display: "inline-block", willChange: "transform" }}
//                       >
//                         {c === " " ? "\u00A0" : c}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="csd-hero-line-final" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
//                     {"the long run.".split("").map((c, i) => (
//                       <span
//                         key={`l4-${i}`}
//                         className="csd-hero-char"
//                         style={{
//                           display: "inline-block",
//                           willChange: "transform",
//                           color: c === "." ? "rgba(0,0,0,0.28)" : "inherit",
//                           whiteSpace: "pre",
//                         }}
//                       >
//                         {c === " " ? "\u00A0" : c}
//                       </span>
//                     ))}
//                   </div>
//                 </h1>

//                 <p
//                   className="csd-hero-fade"
//                   style={{
//                     fontSize: 17,
//                     color: "rgba(0,0,0,0.6)",
//                     maxWidth: 540,
//                     lineHeight: 1.65,
//                     margin: "0 0 36px",
//                     fontWeight: 400,
//                     opacity: 0,
//                   }}
//                 >
//                   We design and build production-grade web apps, mobile apps, SaaS platforms,
//                   and internal tools for startups, growth-stage businesses, and enterprises.
//                   Engineered to ship fast, scale cleanly, and stay maintainable for years.
//                 </p>

//                 <div
//                   className="csd-hero-fade"
//                   style={{ display: "flex", gap: 12, opacity: 0, flexWrap: "wrap" }}
//                 >
//                   <Link
//                     href="/contact"
//                     className="csd-cta-primary"
//                     style={{
//                       display: "inline-flex",
//                       alignItems: "center",
//                       gap: 8,
//                       padding: "15px 28px",
//                       background: "#0a0a0a",
//                       color: "#fafaf9",
//                       textDecoration: "none",
//                       fontSize: 14,
//                       fontWeight: 500,
//                       borderRadius: 999,
//                       position: "relative",
//                       overflow: "hidden",
//                     }}
//                   >
//                     <span style={{ position: "relative", zIndex: 2 }}>Start a project</span>
//                     <svg
//                       aria-hidden
//                       width="12" height="12" viewBox="0 0 12 12"
//                       className="csd-cta-arrow"
//                       style={{ position: "relative", zIndex: 2, flexShrink: 0 }}
//                     >
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
//                   <a
//                     href="#capabilities"
//                     className="csd-cta-secondary"
//                     style={{
//                       display: "inline-flex",
//                       alignItems: "center",
//                       gap: 8,
//                       padding: "15px 28px",
//                       border: "1px solid rgba(0,0,0,0.18)",
//                       color: "#0a0a0a",
//                       textDecoration: "none",
//                       fontSize: 14,
//                       fontWeight: 500,
//                       borderRadius: 999,
//                       background: "rgba(255,255,255,0.5)",
//                       transition: "background 0.2s, border-color 0.2s",
//                     }}
//                   >
//                     Explore capabilities
//                   </a>
//                 </div>
//               </div>

//               {/* RIGHT — visual: stacked stat cards instead of repeating the homepage terminal */}
//               <div
//                 className="csd-hero-side csd-hero-fade"
//                 style={{ opacity: 0, position: "relative" }}
//               >
//                 <div className="csd-hero-stats">
//                   {[
//                     { k: "Products shipped", v: "150+", note: "Across SaaS, mobile, and platforms" },
//                     { k: "Avg. Lighthouse", v: "98", note: "Performance, never an afterthought" },
//                     { k: "Time to MVP", v: "8 wk", note: "From kickoff to production" },
//                     { k: "Senior team", v: "100%", note: "No juniors hidden in the bench" },
//                   ].map((it) => (
//                     <div key={it.k} className="csd-hero-stat">
//                       <div className="csd-hero-stat-label">{it.k}</div>
//                       <div className="csd-hero-stat-value">{it.v}</div>
//                       <div className="csd-hero-stat-note">{it.note}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 2 — SERVICES SNAPSHOT
//             Six sub-services, each linking to its own dedicated page.
//             Grid of cards — clear, scannable, SEO hub.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           id="capabilities"
//           style={{
//             padding: "120px 20px",
//             borderTop: "1px solid rgba(0,0,0,0.06)",
//             background: "#fafaf9",
//             position: "relative",
//           }}
//         >
//           <div style={{ maxWidth: 1320, margin: "0 auto" }}>
//             <div
//               className="csd-sh"
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "end",
//                 gap: 40,
//                 flexWrap: "wrap",
//                 marginBottom: 56,
//               }}
//             >
//               <div>
//                 <div
//                   style={{
//                     fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
//                     textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
//                     marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
//                   }}
//                 >
//                   <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
//                   Our capabilities
//                 </div>
//                 <h2
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: "clamp(32px, 4.4vw, 64px)",
//                     fontWeight: 500,
//                     letterSpacing: "-0.032em",
//                     lineHeight: 1.02,
//                     margin: 0,
//                     maxWidth: 760,
//                   }}
//                 >
//                   Six disciplines.{" "}
//                   <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
//                     One senior team.
//                   </span>
//                 </h2>
//               </div>
//               <p
//                 style={{
//                   fontSize: 15,
//                   color: "rgba(0,0,0,0.58)",
//                   maxWidth: 380,
//                   lineHeight: 1.65,
//                   margin: 0,
//                 }}
//               >
//                 Pick the capability you need — or combine several into a single
//                 end-to-end engagement. Each links to a dedicated overview.
//               </p>
//             </div>

//             <div className="csd-svc-grid">
//               {SUB_SERVICES.map((s) => (
//                 <Link
//                   key={s.num}
//                   href={s.href}
//                   className="csd-svc-card"
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   <article>
//                     <div className="csd-svc-card-top">
//                       <span
//                         className="csd-svc-dot"
//                         style={{
//                           background: s.accent,
//                           boxShadow: `0 0 0 4px ${s.accent}1a`,
//                         }}
//                       />
//                       <span className="csd-svc-num">{s.num}</span>
//                     </div>
//                     <h3 className="csd-svc-title">{s.title}</h3>
//                     <p className="csd-svc-desc">{s.desc}</p>
//                     <div className="csd-svc-tags">
//                       {s.tags.map((t) => (
//                         <span key={t}>{t}</span>
//                       ))}
//                     </div>
//                     <div className="csd-svc-cta">
//                       Learn more
//                       <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
//                         <path
//                           d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="1.4"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </div>
//                   </article>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 3 — WHAT WE ACTUALLY BUILD
//             Translates abstract service names into concrete product types.
//             Image-on-left + grid-on-right layout for visual variety.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             padding: "120px 20px",
//             borderTop: "1px solid rgba(0,0,0,0.06)",
//             background: "#f5f5f4",
//             position: "relative",
//           }}
//         >
//           <div style={{ maxWidth: 1320, margin: "0 auto" }}>
//             <div className="csd-build-layout">
//               <div className="csd-build-left csd-sh">
//                 <div
//                   style={{
//                     fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
//                     textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
//                     marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
//                   }}
//                 >
//                   <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
//                   What we build
//                 </div>
//                 <h2
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: "clamp(32px, 4vw, 56px)",
//                     fontWeight: 500,
//                     letterSpacing: "-0.032em",
//                     lineHeight: 1.02,
//                     margin: "0 0 24px",
//                   }}
//                 >
//                   Real products,{" "}
//                   <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
//                     not slides.
//                   </span>
//                 </h2>
//                 <p
//                   style={{
//                     fontSize: 16, color: "rgba(0,0,0,0.62)",
//                     lineHeight: 1.7, margin: "0 0 36px", maxWidth: 460,
//                   }}
//                 >
//                   Service categories are abstract. Here's what they actually become
//                   in production — the product shapes we ship most often, in the
//                   order clients usually find us.
//                 </p>

//                 {/* Inline visual: stylized "product shape" stack — pure SVG, no asset */}
//                 <div className="csd-build-visual" aria-hidden>
//                   <div className="csd-build-visual-card csd-build-visual-card-1">
//                     <div className="csd-build-visual-bar" />
//                     <div className="csd-build-visual-bar" style={{ width: "60%" }} />
//                     <div className="csd-build-visual-bar" style={{ width: "85%" }} />
//                   </div>
//                   <div className="csd-build-visual-card csd-build-visual-card-2">
//                     <div className="csd-build-visual-grid">
//                       <div /><div /><div /><div /><div /><div />
//                     </div>
//                   </div>
//                   <div className="csd-build-visual-card csd-build-visual-card-3">
//                     <div className="csd-build-visual-chart">
//                       <span style={{ height: "30%" }} />
//                       <span style={{ height: "55%" }} />
//                       <span style={{ height: "40%" }} />
//                       <span style={{ height: "75%" }} />
//                       <span style={{ height: "60%" }} />
//                       <span style={{ height: "90%" }} />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="csd-build-right">
//                 {WE_BUILD.map((b, i) => (
//                   <div key={b.label} className="csd-build-tile">
//                     <div className="csd-build-tile-top">
//                       <span className="csd-build-tile-glyph">{b.glyph}</span>
//                       <span className="csd-build-tile-num">
//                         {String(i + 1).padStart(2, "0")}
//                       </span>
//                     </div>
//                     <div className="csd-build-tile-label">{b.label}</div>
//                     <div className="csd-build-tile-desc">{b.desc}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 4 — VALUE PROPOSITION
//             Why us. Each row: number + claim + supporting metric.
//             Numbered horizontal rows, mirrors the operational tone.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             padding: "120px 20px",
//             borderTop: "1px solid rgba(0,0,0,0.06)",
//             background: "#fafaf9",
//           }}
//         >
//           <div style={{ maxWidth: 1320, margin: "0 auto" }}>
//             <div
//               className="csd-sh"
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "end",
//                 gap: 40,
//                 flexWrap: "wrap",
//                 marginBottom: 64,
//               }}
//             >
//               <div>
//                 <div
//                   style={{
//                     fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
//                     textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
//                     marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
//                   }}
//                 >
//                   <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
//                   Why teams choose us
//                 </div>
//                 <h2
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: "clamp(32px, 4.4vw, 64px)",
//                     fontWeight: 500,
//                     letterSpacing: "-0.032em",
//                     lineHeight: 1.02,
//                     margin: 0,
//                     maxWidth: 760,
//                   }}
//                 >
//                   How we work,{" "}
//                   <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
//                     not what we claim.
//                   </span>
//                 </h2>
//               </div>
//               <p
//                 style={{
//                   fontSize: 15,
//                   color: "rgba(0,0,0,0.58)",
//                   maxWidth: 380,
//                   lineHeight: 1.65,
//                   margin: 0,
//                 }}
//               >
//                 Anyone can list adjectives. These are the operating principles
//                 that show up in every line of code we ship.
//               </p>
//             </div>

//             <div className="csd-value-list">
//               {VALUE_PROPS.map((v) => (
//                 <div key={v.num} className="csd-value-row">
//                   <div className="csd-value-num">{v.num}</div>
//                   <div className="csd-value-body">
//                     <h3 className="csd-value-title">{v.title}</h3>
//                     <p className="csd-value-desc">{v.desc}</p>
//                   </div>
//                   <div className="csd-value-metric">
//                     <div className="csd-value-metric-num">{v.metric}</div>
//                     <div className="csd-value-metric-label">{v.metricLabel}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 5 — PROCESS (horizontal pinned scroll)
//             Mirrors the landing-page Process UI exactly, extended to 6 phases.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           className="csd-process-pin"
//           style={{
//             padding: 0, background: "#0a0a0a", color: "#fafaf9",
//             height: isMobile ? "auto" : "100vh",
//             overflow: isMobile ? "visible" : "hidden",
//             position: "relative",
//             display: "flex", flexDirection: "column",
//           }}
//         >
//           <div
//             aria-hidden
//             style={{
//               position: "absolute", inset: 0,
//               backgroundImage:
//                 "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
//               backgroundSize: "60px 60px",
//               pointerEvents: "none",
//             }}
//           />

//           <div
//             style={{
//               position: "relative", zIndex: 2, flexShrink: 0,
//               padding: "clamp(80px, 12vh, 140px) 20px clamp(20px, 3vh, 40px)",
//               display: "flex", justifyContent: "space-between", alignItems: "flex-end",
//               gap: 40, flexWrap: "wrap",
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
//                   textTransform: "uppercase", color: "rgba(255,255,255,0.4)",
//                   marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
//                 }}
//               >
//                 <span style={{ width: 16, height: 1, background: "rgba(255,255,255,0.25)" }} />
//                 Our process
//               </div>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: "clamp(32px, 4.5vw, 72px)", fontWeight: 500,
//                   letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
//                 }}
//               >
//                 Six phases.{" "}
//                 <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
//                   Every project.
//                 </span>
//               </h2>
//             </div>
//             <p
//               style={{
//                 fontSize: 14, color: "rgba(255,255,255,0.5)",
//                 maxWidth: 320, lineHeight: 1.65, margin: 0,
//                 textAlign: "right", flexShrink: 0,
//               }}
//             >
//               From discovery to long-term support — a way of working refined
//               across 150+ shipped products.
//             </p>
//           </div>

//           <div
//             style={{
//               flex: 1, minHeight: 0,
//               display: "flex", alignItems: "center",
//               position: "relative", zIndex: 1,
//             }}
//           >
//             <div
//               className="csd-process-track"
//               style={{
//                 display: "flex", gap: 20,
//                 paddingLeft: 20, paddingRight: 112,
//                 willChange: "transform",
//                 alignItems: "stretch",
//               }}
//             >
//               {PROCESS.map((step, i) => (
//                 <div
//                   key={i}
//                   className="csd-process-card"
//                   style={{
//                     width: "clamp(320px, 28vw, 440px)",
//                     flexShrink: 0,
//                     padding: "clamp(28px, 3.5vh, 44px) 36px",
//                     border: "1px solid rgba(255,255,255,0.08)",
//                     borderRadius: 20, background: "rgba(255,255,255,0.02)",
//                     display: "flex", flexDirection: "column",
//                     justifyContent: "space-between",
//                     height: "clamp(340px, 58vh, 500px)",
//                   }}
//                 >
//                   <div>
//                     <div
//                       style={{
//                         display: "flex", justifyContent: "space-between",
//                         alignItems: "center", marginBottom: "clamp(24px, 4vh, 48px)",
//                       }}
//                     >
//                       <span
//                         style={{
//                           fontFamily: "var(--font-display)",
//                           fontSize: "clamp(48px, 6vh, 72px)", fontWeight: 500,
//                           color: "rgba(255,255,255,0.12)",
//                           lineHeight: 1, letterSpacing: "-0.04em",
//                           fontVariantNumeric: "tabular-nums",
//                         }}
//                       >
//                         {step.num}
//                       </span>
//                       <span
//                         style={{
//                           padding: "5px 12px", borderRadius: 999,
//                           border: "1px solid rgba(255,255,255,0.15)",
//                           fontSize: 11, fontWeight: 500,
//                           color: "rgba(255,255,255,0.65)",
//                           letterSpacing: "0.04em",
//                         }}
//                       >
//                         Phase {step.num}
//                       </span>
//                     </div>
//                     <h3
//                       style={{
//                         fontFamily: "var(--font-display)",
//                         fontSize: "clamp(26px, 3.2vh, 40px)", fontWeight: 500,
//                         margin: "0 0 clamp(10px, 2vh, 20px)",
//                         letterSpacing: "-0.02em", lineHeight: 1,
//                       }}
//                     >
//                       {step.title}
//                     </h3>
//                     <p
//                       style={{
//                         fontSize: "clamp(13px, 1.6vh, 15px)",
//                         color: "rgba(255,255,255,0.6)",
//                         lineHeight: 1.65, margin: 0,
//                       }}
//                     >
//                       {step.desc}
//                     </p>
//                   </div>

//                   <ul
//                     style={{
//                       listStyle: "none", padding: 0, margin: 0,
//                       borderTop: "1px solid rgba(255,255,255,0.08)",
//                       paddingTop: "clamp(14px, 2.5vh, 24px)",
//                     }}
//                   >
//                     {step.points.map((p) => (
//                       <li
//                         key={p}
//                         style={{
//                           fontSize: 13, color: "rgba(255,255,255,0.7)",
//                           padding: "clamp(5px, 1vh, 8px) 0",
//                           display: "flex", alignItems: "center", gap: 12,
//                         }}
//                       >
//                         <span style={{ width: 14, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
//                         {p}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}

//               <div
//                 style={{
//                   width: 300, flexShrink: 0,
//                   padding: "clamp(28px, 3.5vh, 44px) 36px",
//                   display: "flex", flexDirection: "column", justifyContent: "center",
//                   height: "clamp(340px, 58vh, 500px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: "clamp(22px, 2.8vh, 32px)", fontWeight: 500,
//                     margin: "0 0 20px",
//                     letterSpacing: "-0.025em", lineHeight: 1.1,
//                   }}
//                 >
//                   Every project.{" "}
//                   <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
//                     No exceptions.
//                   </span>
//                 </h3>
//                 <Link
//                   href="/contact"
//                   style={{
//                     display: "inline-flex", alignItems: "center", gap: 10,
//                     padding: "12px 22px", background: "#fafaf9", color: "#0a0a0a",
//                     borderRadius: 999, fontSize: 13, fontWeight: 500,
//                     textDecoration: "none", alignSelf: "flex-start", marginTop: 4,
//                   }}
//                 >
//                   Start yours →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {!isMobile && (
//             <>
//               <div
//                 style={{
//                   position: "absolute", bottom: 20, left: 32,
//                   fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
//                   textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
//                   display: "flex", alignItems: "center", gap: 10,
//                 }}
//               >
//                 <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(255,255,255,0.25)" }} />
//                 Scroll
//               </div>
//               <div
//                 style={{
//                   position: "absolute", bottom: 20, right: 32,
//                   fontSize: 11, fontWeight: 600, letterSpacing: "0.18em",
//                   textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
//                   fontVariantNumeric: "tabular-nums",
//                 }}
//               >
//                 06 phases
//               </div>
//             </>
//           )}
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 6 — TECH STACK (marquee, mirrors landing page)
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           className="csd-tech-marquee"
//           onMouseEnter={handleTechMarqueeEnter}
//           onMouseLeave={handleTechMarqueeLeave}
//           style={{
//             padding: "120px 0", borderTop: "1px solid rgba(0,0,0,0.06)",
//             overflow: "hidden", background: "#fafaf9",
//           }}
//         >
//           <div
//             className="csd-sh"
//             style={{
//               maxWidth: 1320, margin: "0 auto 56px", padding: "0 20px",
//               display: "flex", justifyContent: "space-between", alignItems: "end",
//               gap: 40, flexWrap: "wrap",
//             }}
//           >
//             <div>
//               <div
//                 style={{
//                   fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
//                   textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
//                   marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
//                 }}
//               >
//                 <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
//                 Technology stack
//               </div>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: "clamp(32px, 3.8vw, 56px)", fontWeight: 500,
//                   letterSpacing: "-0.03em", lineHeight: 1, margin: 0,
//                 }}
//               >
//                 Tools we{" "}
//                 <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
//                   trust.
//                 </span>
//               </h2>
//             </div>
//             <p
//               style={{
//                 fontSize: 14, color: "rgba(0,0,0,0.55)",
//                 maxWidth: 380, lineHeight: 1.65, margin: 0,
//               }}
//             >
//               Mature, battle-tested tooling — picked for your problem, not because it&apos;s new.
//             </p>
//           </div>

//           <div style={{ position: "relative" }}>
//             <div style={{ overflow: "hidden" }}>
//               <div
//                 ref={marqueeLeftRef}
//                 className="marquee-track"
//                 style={{ display: "flex", width: "max-content", gap: 0 }}
//               >
//                 {[...TECH, ...TECH].map((t, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       display: "flex", alignItems: "center", gap: 28,
//                       padding: "0 24px", flexShrink: 0,
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontFamily: "var(--font-display)",
//                         fontSize: "clamp(20px, 2.4vw, 34px)",
//                         fontWeight: 500, color: "#0a0a0a",
//                         letterSpacing: "-0.025em",
//                       }}
//                     >
//                       {t}
//                     </span>
//                     <span
//                       aria-hidden
//                       style={{
//                         width: 8, height: 8, background: "#0a0a0a",
//                         borderRadius: "50%", opacity: 0.2,
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div style={{ overflow: "hidden", marginTop: 20 }}>
//               <div
//                 ref={marqueeRightRef}
//                 className="marquee-track"
//                 style={{ display: "flex", width: "max-content", gap: 0 }}
//               >
//                 {[...TECH.slice().reverse(), ...TECH.slice().reverse()].map((t, i) => (
//                   <div
//                     key={i}
//                     style={{
//                       display: "flex", alignItems: "center", gap: 28,
//                       padding: "0 24px", flexShrink: 0,
//                     }}
//                   >
//                     <span
//                       style={{
//                         fontFamily: "var(--font-display)",
//                         fontSize: "clamp(20px, 2.4vw, 34px)",
//                         fontWeight: 400, fontStyle: "italic",
//                         color: "transparent",
//                         WebkitTextStroke: "1px rgba(0,0,0,0.2)",
//                         letterSpacing: "-0.025em",
//                       }}
//                     >
//                       {t}
//                     </span>
//                     <span
//                       aria-hidden
//                       style={{
//                         width: 8, height: 8,
//                         border: "1px solid rgba(0,0,0,0.2)",
//                         borderRadius: "50%",
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 7 — RESULTS / IMPACT
//             Outcome-shaped numbers. Each card pairs metric + context.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             padding: "120px 20px",
//             borderTop: "1px solid rgba(0,0,0,0.06)",
//             background: "#f5f5f4",
//           }}
//         >
//           <div style={{ maxWidth: 1320, margin: "0 auto" }}>
//             <div
//               className="csd-sh"
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "end",
//                 gap: 40, flexWrap: "wrap",
//                 marginBottom: 56,
//               }}
//             >
//               <div>
//                 <div
//                   style={{
//                     fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
//                     textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
//                     marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
//                   }}
//                 >
//                   <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
//                   Outcomes
//                 </div>
//                 <h2
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: "clamp(32px, 4.4vw, 64px)",
//                     fontWeight: 500,
//                     letterSpacing: "-0.032em",
//                     lineHeight: 1.02, margin: 0,
//                     maxWidth: 760,
//                   }}
//                 >
//                   We don&apos;t just build software.{" "}
//                   <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
//                     We deliver results.
//                   </span>
//                 </h2>
//               </div>
//               <p
//                 style={{
//                   fontSize: 15,
//                   color: "rgba(0,0,0,0.58)",
//                   maxWidth: 380,
//                   lineHeight: 1.65, margin: 0,
//                 }}
//               >
//                 Selected outcomes from recent engagements. Numbers measured
//                 in production, not extrapolated from pitch decks.
//               </p>
//             </div>

//             <div className="csd-results-grid">
//               {RESULTS.map((r, i) => (
//                 <div key={r.label} className="csd-result-card csd-result-num">
//                   <div className="csd-result-index">
//                     {String(i + 1).padStart(2, "0")}
//                   </div>
//                   <div className="csd-result-metric">{r.metric}</div>
//                   <div className="csd-result-label">{r.label}</div>
//                   <div className="csd-result-desc">{r.desc}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 8 — FAQs
//             Long-tail SEO + objection handler. Accordion, one open at a time.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             padding: "120px 20px",
//             borderTop: "1px solid rgba(0,0,0,0.06)",
//             background: "#fafaf9",
//           }}
//         >
//           <div className="csd-faq-layout" style={{ maxWidth: 1320, margin: "0 auto" }}>
//             <div className="csd-faq-aside csd-sh">
//               <div
//                 style={{
//                   fontSize: 12, fontWeight: 600, letterSpacing: "0.16em",
//                   textTransform: "uppercase", color: "rgba(10,10,10,0.5)",
//                   marginBottom: 14, display: "inline-flex", alignItems: "center", gap: 10,
//                 }}
//               >
//                 <span style={{ width: 16, height: 1, background: "rgba(10,10,10,0.3)" }} />
//                 Questions
//               </div>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: "clamp(32px, 3.6vw, 52px)",
//                   fontWeight: 500,
//                   letterSpacing: "-0.032em",
//                   lineHeight: 1.02,
//                   margin: "0 0 20px",
//                 }}
//               >
//                 Frequently{" "}
//                 <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>
//                   asked.
//                 </span>
//               </h2>
//               <p
//                 style={{
//                   fontSize: 15, color: "rgba(0,0,0,0.6)",
//                   lineHeight: 1.7, margin: "0 0 28px",
//                 }}
//               >
//                 Real questions from real prospects. If yours isn&apos;t here,
//                 send us a note — we answer every inquiry within 24 hours.
//               </p>
//               <Link
//                 href="/contact"
//                 style={{
//                   display: "inline-flex", alignItems: "center", gap: 8,
//                   padding: "12px 22px",
//                   border: "1px solid rgba(0,0,0,0.85)",
//                   color: "#0a0a0a", textDecoration: "none",
//                   fontSize: 13, fontWeight: 500, borderRadius: 999,
//                   transition: "background 0.2s, color 0.2s",
//                 }}
//                 className="csd-faq-cta"
//               >
//                 Ask us anything
//                 <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
//                   <path
//                     d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
//                     fill="none" stroke="currentColor" strokeWidth="1.4"
//                     strokeLinecap="round" strokeLinejoin="round"
//                   />
//                 </svg>
//               </Link>
//             </div>

//             <div className="csd-faq-list">
//               {FAQS.map((f, i) => {
//                 const isOpen = openFaq === i;
//                 return (
//                   <div
//                     key={i}
//                     className="csd-faq-row"
//                     data-open={isOpen ? "true" : "false"}
//                   >
//                     <button
//                       type="button"
//                       className="csd-faq-q"
//                       onClick={() => setOpenFaq(isOpen ? null : i)}
//                       aria-expanded={isOpen}
//                     >
//                       <span className="csd-faq-q-num">
//                         {String(i + 1).padStart(2, "0")}
//                       </span>
//                       <span className="csd-faq-q-text">{f.q}</span>
//                       <span className="csd-faq-q-icon" aria-hidden>
//                         <svg width="14" height="14" viewBox="0 0 14 14">
//                           <path
//                             d="M3 7h8 M7 3v8"
//                             fill="none" stroke="currentColor" strokeWidth="1.4"
//                             strokeLinecap="round"
//                           />
//                         </svg>
//                       </span>
//                     </button>
//                     <div className="csd-faq-a">
//                       <div className="csd-faq-a-inner">{f.a}</div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 9 — FINAL CTA
//             Closing argument. Mirrors landing-page CTA treatment.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           style={{
//             padding: "0 20px 64px",
//             borderTop: "1px solid rgba(0,0,0,0.06)",
//             paddingTop: 64,
//           }}
//         >
//           <div
//             className="csd-cta-inner"
//             style={{
//               borderRadius: 28, overflow: "hidden",
//               padding: "92px 56px", position: "relative",
//               background: "#0a0a0a", color: "#fafaf9",
//               opacity: 0, maxWidth: 1320, margin: "0 auto",
//             }}
//           >
//             <div
//               aria-hidden
//               style={{
//                 position: "absolute", inset: 0,
//                 backgroundImage:
//                   "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
//                 backgroundSize: "48px 48px",
//                 pointerEvents: "none",
//               }}
//             />
//             <div
//               aria-hidden
//               style={{
//                 position: "absolute", top: "-20%", right: "-10%",
//                 width: 560, height: 560,
//                 background:
//                   "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)",
//                 pointerEvents: "none",
//               }}
//             />

//             <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: "clamp(40px, 6vw, 84px)", fontWeight: 500,
//                   letterSpacing: "-0.04em", lineHeight: 0.94,
//                   margin: "0 0 28px",
//                 }}
//               >
//                 Ready to build something{" "}
//                 <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>
//                   that lasts?
//                 </span>
//               </h2>
//               <p
//                 style={{
//                   fontSize: 15,
//                   color: "rgba(255,255,255,0.58)",
//                   maxWidth: 540, lineHeight: 1.62,
//                   margin: "0 0 36px",
//                 }}
//               >
//                 Free 30-minute discovery call. You&apos;ll talk directly with an engineer
//                 and a strategist. No sales pitch — just a real conversation about your
//                 problem, your timeline, and whether we&apos;re the right team for it.
//               </p>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//                 <Link
//                   href="/contact"
//                   style={{
//                     display: "inline-flex", alignItems: "center", gap: 10,
//                     padding: "14px 26px", background: "#fafaf9", color: "#0a0a0a",
//                     textDecoration: "none", fontSize: 14, fontWeight: 500,
//                     borderRadius: 999, transition: "transform 0.2s",
//                   }}
//                 >
//                   Book a discovery call
//                   <span aria-hidden>→</span>
//                 </Link>
//                 <a
//                   href="mailto:hello@techbinaries.com"
//                   style={{
//                     display: "inline-flex", alignItems: "center", gap: 10,
//                     padding: "14px 26px",
//                     border: "1px solid rgba(255,255,255,0.2)",
//                     color: "rgba(255,255,255,0.85)",
//                     textDecoration: "none", fontSize: 14, fontWeight: 500,
//                     borderRadius: 999,
//                     transition: "background 0.2s, border-color 0.2s",
//                   }}
//                   className="csd-ghost-dark"
//                 >
//                   hello@techbinaries.com
//                 </a>
//               </div>

//               <div
//                 style={{
//                   marginTop: 56, paddingTop: 24,
//                   borderTop: "1px solid rgba(255,255,255,0.08)",
//                   display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24,
//                 }}
//               >
//                 {[
//                   { k: "Response time", v: "Within 24h" },
//                   { k: "Typical project", v: "8–24 weeks" },
//                   { k: "Engagement type", v: "Fixed or T&M" },
//                 ].map((it) => (
//                   <div key={it.k}>
//                     <div
//                       style={{
//                         fontSize: 10, color: "rgba(255,255,255,0.45)",
//                         fontWeight: 500, letterSpacing: "0.12em",
//                         textTransform: "uppercase", marginBottom: 6,
//                       }}
//                     >
//                       {it.k}
//                     </div>
//                     <div
//                       style={{
//                         fontSize: 15, color: "#fafaf9",
//                         fontFamily: "var(--font-display)",
//                         fontWeight: 500, letterSpacing: "-0.01em",
//                       }}
//                     >
//                       {it.v}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>

//       {/* ═══════════════════════════════════════════════════════════════
//           STYLES
//       ═══════════════════════════════════════════════════════════════ */}
//       <style>{`
//         /* ── HERO ── */
//         .csd-hero-grid {
//           display: grid;
//           grid-template-columns: 1.5fr 1fr;
//           gap: 48px;
//           align-items: start;
//         }
//         .csd-hero-side { padding-top: 60px; }
//         .csd-hero-stats {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1px;
//           background: rgba(0,0,0,0.08);
//           border: 1px solid rgba(0,0,0,0.08);
//           border-radius: 18px;
//           overflow: hidden;
//           box-shadow: 0 22px 48px -28px rgba(10,10,10,0.18);
//         }
//         .csd-hero-stat {
//           background: #fff;
//           padding: 22px 22px 24px;
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//           min-height: 138px;
//         }
//         .csd-hero-stat-label {
//           font-size: 10.5px;
//           font-weight: 600;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.5);
//         }
//         .csd-hero-stat-value {
//           font-family: var(--font-display);
//           font-size: 38px;
//           font-weight: 500;
//           letter-spacing: -0.035em;
//           line-height: 1;
//           color: #0a0a0a;
//           font-variant-numeric: tabular-nums;
//         }
//         .csd-hero-stat-note {
//           font-size: 12px;
//           line-height: 1.45;
//           color: rgba(10,10,10,0.55);
//           margin-top: auto;
//         }

//         .csd-cta-primary::before {
//           content: "";
//           position: absolute; inset: 0;
//           background: linear-gradient(90deg, #262626, #0a0a0a);
//           transform: translateX(-101%);
//           transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
//           z-index: 1;
//         }
//         .csd-cta-primary:hover::before { transform: translateX(0); }
//         .csd-cta-primary:hover .csd-cta-arrow { transform: translateX(2px); }
//         .csd-cta-arrow { transition: transform 0.25s ease; }
//         .csd-cta-secondary:hover {
//           border-color: rgba(0,0,0,0.4) !important;
//           background: rgba(255,255,255,0.85) !important;
//         }
//         .csd-ghost-dark:hover {
//           border-color: rgba(255,255,255,0.45) !important;
//           background: rgba(255,255,255,0.05) !important;
//         }

//         /* ── SERVICE CARDS ── */
//         .csd-svc-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 16px;
//         }
//         .csd-svc-card article {
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//           padding: 32px 30px 28px;
//           border: 1px solid rgba(10,10,10,0.1);
//           border-radius: 20px;
//           background: #fff;
//           height: 100%;
//           transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
//                       border-color 0.25s, box-shadow 0.35s;
//           position: relative;
//           overflow: hidden;
//         }
//         .csd-svc-card:hover article {
//           transform: translateY(-4px);
//           border-color: rgba(10,10,10,0.2);
//           box-shadow: 0 22px 44px -28px rgba(10,10,10,0.22);
//         }
//         .csd-svc-card-top {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }
//         .csd-svc-dot { width: 10px; height: 10px; border-radius: 50%; }
//         .csd-svc-num {
//           font-family: var(--font-display);
//           font-size: 13px;
//           font-weight: 500;
//           color: rgba(10,10,10,0.4);
//           font-variant-numeric: tabular-nums;
//           letter-spacing: 0.04em;
//         }
//         .csd-svc-title {
//           font-family: var(--font-display);
//           font-size: 22px;
//           font-weight: 500;
//           letter-spacing: -0.022em;
//           line-height: 1.15;
//           margin: 4px 0 0;
//           color: #0a0a0a;
//         }
//         .csd-svc-desc {
//           font-size: 14px;
//           line-height: 1.6;
//           color: rgba(10,10,10,0.6);
//           margin: 0;
//         }
//         .csd-svc-tags {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 5px;
//           margin-top: 6px;
//         }
//         .csd-svc-tags span {
//           padding: 4px 10px;
//           border: 1px solid rgba(10,10,10,0.1);
//           border-radius: 999px;
//           font-size: 10.5px;
//           font-weight: 500;
//           color: rgba(10,10,10,0.65);
//           letter-spacing: 0.02em;
//         }
//         .csd-svc-cta {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           margin-top: auto;
//           padding-top: 18px;
//           border-top: 1px solid rgba(10,10,10,0.08);
//           font-size: 13px;
//           font-weight: 500;
//           color: rgba(10,10,10,0.7);
//           transition: color 0.2s, gap 0.25s;
//         }
//         .csd-svc-card:hover .csd-svc-cta { color: #0a0a0a; gap: 12px; }

//         /* ── WHAT WE BUILD ── */
//         .csd-build-layout {
//           display: grid;
//           grid-template-columns: 1fr 1.2fr;
//           gap: 80px;
//           align-items: start;
//         }
//         .csd-build-visual {
//           margin-top: 32px;
//           position: relative;
//           height: 280px;
//         }
//         .csd-build-visual-card {
//           position: absolute;
//           background: #fff;
//           border: 1px solid rgba(10,10,10,0.1);
//           border-radius: 14px;
//           padding: 18px 18px 16px;
//           box-shadow: 0 18px 40px -24px rgba(10,10,10,0.18);
//         }
//         .csd-build-visual-card-1 {
//           top: 0; left: 0;
//           width: 220px;
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//         }
//         .csd-build-visual-card-2 {
//           top: 30px; left: 200px;
//           width: 200px;
//         }
//         .csd-build-visual-card-3 {
//           top: 130px; left: 60px;
//           width: 240px;
//         }
//         .csd-build-visual-bar {
//           height: 8px;
//           background: linear-gradient(90deg, #0a0a0a 0%, #f472b6 100%);
//           border-radius: 4px;
//           opacity: 0.85;
//         }
//         .csd-build-visual-bar:nth-child(1) { width: 100%; }
//         .csd-build-visual-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 6px;
//         }
//         .csd-build-visual-grid > div {
//           aspect-ratio: 1;
//           background: rgba(10,10,10,0.06);
//           border-radius: 6px;
//         }
//         .csd-build-visual-grid > div:nth-child(1) { background: #f472b6; opacity: 0.85; }
//         .csd-build-visual-grid > div:nth-child(5) { background: #0a0a0a; }
//         .csd-build-visual-chart {
//           display: flex;
//           align-items: flex-end;
//           gap: 6px;
//           height: 90px;
//           padding-top: 4px;
//         }
//         .csd-build-visual-chart span {
//           flex: 1;
//           background: linear-gradient(180deg, #0a0a0a 0%, rgba(10,10,10,0.4) 100%);
//           border-radius: 3px 3px 0 0;
//         }
//         .csd-build-visual-chart span:last-child {
//           background: linear-gradient(180deg, #f472b6 0%, rgba(244,114,182,0.4) 100%);
//         }

//         .csd-build-right {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 1px;
//           background: rgba(10,10,10,0.1);
//           border: 1px solid rgba(10,10,10,0.1);
//           border-radius: 18px;
//           overflow: hidden;
//         }
//         .csd-build-tile {
//           background: #fafaf9;
//           padding: 26px 24px 24px;
//           min-height: 170px;
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           transition: background 0.25s;
//         }
//         .csd-build-tile:hover { background: #fff; }
//         .csd-build-tile-top {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 6px;
//         }
//         .csd-build-tile-glyph {
//           font-size: 18px;
//           color: #f472b6;
//         }
//         .csd-build-tile-num {
//           font-family: var(--font-display);
//           font-size: 12px;
//           color: rgba(10,10,10,0.4);
//           font-variant-numeric: tabular-nums;
//           letter-spacing: 0.04em;
//         }
//         .csd-build-tile-label {
//           font-family: var(--font-display);
//           font-size: 19px;
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           color: #0a0a0a;
//           line-height: 1.15;
//         }
//         .csd-build-tile-desc {
//           font-size: 13px;
//           line-height: 1.55;
//           color: rgba(10,10,10,0.58);
//         }

//         /* ── VALUE PROPS ── */
//         .csd-value-list {
//           display: flex;
//           flex-direction: column;
//           border-top: 1px solid rgba(10,10,10,0.1);
//         }
//         .csd-value-row {
//           display: grid;
//           grid-template-columns: 80px 1fr 200px;
//           gap: 40px;
//           padding: 32px 0;
//           border-bottom: 1px solid rgba(10,10,10,0.1);
//           align-items: start;
//           transition: background 0.25s;
//         }
//         .csd-value-row:hover { background: rgba(10,10,10,0.015); }
//         .csd-value-num {
//           font-family: var(--font-display);
//           font-size: 56px;
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           line-height: 0.9;
//           color: transparent;
//           -webkit-text-stroke: 1px rgba(10,10,10,0.35);
//           font-variant-numeric: tabular-nums;
//           padding-top: 6px;
//         }
//         .csd-value-title {
//           font-family: var(--font-display);
//           font-size: clamp(22px, 2.4vw, 32px);
//           font-weight: 500;
//           letter-spacing: -0.024em;
//           line-height: 1.15;
//           margin: 0 0 12px;
//           color: #0a0a0a;
//         }
//         .csd-value-desc {
//           font-size: 15px;
//           line-height: 1.65;
//           color: rgba(10,10,10,0.62);
//           margin: 0;
//           max-width: 560px;
//         }
//         .csd-value-metric {
//           text-align: right;
//           padding-top: 12px;
//         }
//         .csd-value-metric-num {
//           font-family: var(--font-display);
//           font-size: 38px;
//           font-weight: 500;
//           letter-spacing: -0.035em;
//           line-height: 1;
//           color: #0a0a0a;
//           font-variant-numeric: tabular-nums;
//         }
//         .csd-value-metric-label {
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.5);
//           margin-top: 8px;
//         }

//         /* ── RESULTS ── */
//         .csd-results-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 16px;
//         }
//         .csd-result-card {
//           background: #fff;
//           border: 1px solid rgba(10,10,10,0.1);
//           border-radius: 18px;
//           padding: 28px 26px 30px;
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//           min-height: 230px;
//           position: relative;
//           overflow: hidden;
//           transition: transform 0.3s cubic-bezier(0.22,1,0.36,1),
//                       border-color 0.25s,
//                       box-shadow 0.3s;
//         }
//         .csd-result-card:hover {
//           transform: translateY(-4px);
//           border-color: rgba(10,10,10,0.22);
//           box-shadow: 0 22px 44px -28px rgba(10,10,10,0.2);
//         }
//         .csd-result-index {
//           font-family: var(--font-display);
//           font-size: 12px;
//           color: rgba(10,10,10,0.4);
//           font-variant-numeric: tabular-nums;
//           letter-spacing: 0.04em;
//           margin-bottom: 6px;
//         }
//         .csd-result-metric {
//           font-family: var(--font-display);
//           font-size: clamp(40px, 4.4vw, 60px);
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           line-height: 0.95;
//           color: #0a0a0a;
//           font-variant-numeric: tabular-nums;
//         }
//         .csd-result-label {
//           font-family: var(--font-display);
//           font-size: 17px;
//           font-weight: 500;
//           letter-spacing: -0.015em;
//           color: #0a0a0a;
//           margin-top: 4px;
//         }
//         .csd-result-desc {
//           font-size: 13px;
//           line-height: 1.6;
//           color: rgba(10,10,10,0.6);
//           margin-top: auto;
//         }

//         /* ── FAQs ── */
//         .csd-faq-layout {
//           display: grid;
//           grid-template-columns: 360px 1fr;
//           gap: 80px;
//           align-items: start;
//         }
//         .csd-faq-aside { position: sticky; top: 120px; }
//         .csd-faq-cta:hover {
//           background: #0a0a0a;
//           color: #fafaf9;
//         }
//         .csd-faq-list {
//           display: flex;
//           flex-direction: column;
//           border-top: 1px solid rgba(10,10,10,0.1);
//         }
//         .csd-faq-row {
//           border-bottom: 1px solid rgba(10,10,10,0.1);
//         }
//         .csd-faq-q {
//           width: 100%;
//           display: grid;
//           grid-template-columns: 50px 1fr 30px;
//           align-items: center;
//           gap: 16px;
//           padding: 24px 0;
//           background: transparent;
//           border: 0;
//           cursor: pointer;
//           text-align: left;
//           color: #0a0a0a;
//           font-family: var(--font-display);
//         }
//         .csd-faq-q-num {
//           font-size: 13px;
//           font-weight: 500;
//           color: rgba(10,10,10,0.4);
//           font-variant-numeric: tabular-nums;
//           letter-spacing: 0.04em;
//         }
//         .csd-faq-q-text {
//           font-family: var(--font-display);
//           font-size: clamp(17px, 1.6vw, 21px);
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           line-height: 1.3;
//         }
//         .csd-faq-q-icon {
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
//         .csd-faq-row[data-open="true"] .csd-faq-q-icon {
//           transform: rotate(45deg);
//           background: #0a0a0a;
//           color: #fafaf9;
//           border-color: #0a0a0a;
//         }
//         .csd-faq-a {
//           display: grid;
//           grid-template-rows: 0fr;
//           transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .csd-faq-row[data-open="true"] .csd-faq-a {
//           grid-template-rows: 1fr;
//         }
//         .csd-faq-a-inner {
//           overflow: hidden;
//           padding-left: 66px;
//           font-family: var(--font-body);
//           font-size: 15px;
//           line-height: 1.7;
//           color: rgba(10,10,10,0.65);
//           padding-bottom: 0;
//           transition: padding-bottom 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .csd-faq-row[data-open="true"] .csd-faq-a-inner {
//           padding-bottom: 28px;
//         }

//         /* ── MARQUEE ── */
//         .marquee-track { will-change: transform; }

//         /* ── RESPONSIVE ── */
//         @media (max-width: 1100px) {
//           .csd-hero-grid { grid-template-columns: 1fr; gap: 56px; }
//           .csd-hero-side { padding-top: 0; }
//           .csd-svc-grid { grid-template-columns: repeat(2, 1fr); }
//           .csd-build-layout { grid-template-columns: 1fr; gap: 56px; }
//           .csd-build-visual { max-width: 460px; }
//           .csd-results-grid { grid-template-columns: repeat(2, 1fr); }
//           .csd-faq-layout { grid-template-columns: 1fr; gap: 48px; }
//           .csd-faq-aside { position: static; }
//           .csd-value-row { grid-template-columns: 60px 1fr 140px; gap: 24px; }
//           .csd-value-num { font-size: 44px; }
//           .csd-value-metric-num { font-size: 30px; }
//         }
//         @media (max-width: 768px) {
//           .csd-hero { padding: 120px 14px 60px !important; min-height: auto !important; }
//           .csd-hero-line-final { white-space: normal !important; }
//           .csd-hero-stats { grid-template-columns: 1fr; }
//           .csd-hero-stat { min-height: auto; padding: 18px 18px 20px; }

//           .csd-svc-grid { grid-template-columns: 1fr; }
//           .csd-svc-card article { padding: 26px 22px 22px; }

//           .csd-build-right { grid-template-columns: 1fr; }
//           .csd-build-tile { min-height: auto; }
//           .csd-build-visual { display: none; }

//           .csd-value-row {
//             grid-template-columns: 1fr;
//             gap: 14px;
//             padding: 24px 0;
//           }
//           .csd-value-num {
//             font-size: 36px;
//             padding-top: 0;
//           }
//           .csd-value-metric { text-align: left; padding-top: 0; }
//           .csd-value-metric-num { font-size: 28px; }

//           .csd-process-pin {
//             height: auto !important;
//             overflow: visible !important;
//           }
//           .csd-process-pin > div:first-of-type { padding: 80px 14px 32px !important; }
//           .csd-process-track {
//             flex-direction: column !important;
//             padding: 0 14px 60px !important;
//             transform: none !important;
//             gap: 16px !important;
//             width: 100% !important;
//           }
//           .csd-process-track > div { flex: 1 1 auto !important; }
//           .csd-process-card {
//             width: 100% !important;
//             height: auto !important;
//             min-height: 320px !important;
//           }

//           .csd-results-grid { grid-template-columns: 1fr; }

//           .csd-faq-q { grid-template-columns: 36px 1fr 26px; gap: 12px; padding: 20px 0; }
//           .csd-faq-q-icon { width: 26px; height: 26px; }
//           .csd-faq-a-inner { padding-left: 48px; font-size: 14px; }
//           .csd-faq-row[data-open="true"] .csd-faq-a-inner { padding-bottom: 22px; }

//           .csd-cta-inner { padding: 64px 26px !important; border-radius: 18px !important; }
//           .csd-cta-inner > div > div[style*="repeat(3, 1fr)"] {
//             grid-template-columns: 1fr !important;
//             gap: 18px !important;
//           }
//         }
//         @media (max-width: 480px) {
//           section { padding-left: 14px; padding-right: 14px; }
//         }
//       `}</style>
//     </>
//   );
// }


//version 2

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

// const SUB_SERVICES = [
//   {
//     num: "01",
//     bin: "0001",
//     title: "Custom Web Application Development",
//     desc: "Production-grade web apps built for performance, scale, and long-term maintainability.",
//     href: "/services/custom-software-digital-solutions/custom-web-application-development",
//     accent: "#d4d4d8",
//     tags: ["Next.js", "React", "Node", "Postgres"],
//   },
//   {
//     num: "02",
//     bin: "0010",
//     title: "Mobile App Development",
//     desc: "Native and cross-platform iOS & Android apps that feel fast and ship on schedule.",
//     href: "/services/custom-software-digital-solutions/mobile-app-development-ios-android",
//     accent: "#a3a3a3",
//     tags: ["iOS", "Android", "React Native", "Swift"],
//   },
//   {
//     num: "03",
//     bin: "0011",
//     title: "SaaS Product Development",
//     desc: "Multi-tenant SaaS platforms with billing, auth, analytics, and growth loops baked in.",
//     href: "/services/custom-software-digital-solutions/saas-product-development",
//     accent: "#e5e5e5",
//     tags: ["Multi-tenant", "Billing", "Auth", "Analytics"],
//   },
//   {
//     num: "04",
//     bin: "0100",
//     title: "UI/UX Design Systems",
//     desc: "Design systems, component libraries, and product UX engineered for consistency at scale.",
//     href: "/services/custom-software-digital-solutions/ui-ux-design-systems",
//     accent: "#737373",
//     tags: ["Design Systems", "Figma", "Tokens", "A11y"],
//   },
//   {
//     num: "05",
//     bin: "0101",
//     title: "CMS & Admin Panel Development",
//     desc: "Content systems and internal tools that empower teams without slowing them down.",
//     href: "/services/custom-software-digital-solutions/cms-admin-panel-development",
//     accent: "#bdbdbd",
//     tags: ["Headless CMS", "Admin UI", "RBAC", "Workflows"],
//   },
//   {
//     num: "06",
//     bin: "0110",
//     title: "High-Performance Landing Pages",
//     desc: "Pixel-perfect, conversion-tuned landing pages with sub-second load and SEO baked in.",
//     href: "/services/custom-software-digital-solutions/high-performance-landing-pages",
//     accent: "#8a8a8a",
//     tags: ["Core Web Vitals", "SEO", "A/B Ready", "CRO"],
//   },
// ];

// // "What We Build" — concrete product types, paired with binary IDs.
// // Visual treatment: left column = text, right column = animated browser/device frames.
// const WE_BUILD = [
//   { id: "saas",      bin: "01", label: "SaaS Platforms",       desc: "Multi-tenant products with billing, dashboards, and integrations." },
//   { id: "dashboard", bin: "10", label: "Business Dashboards",  desc: "Real-time analytics surfaces wired to your live data." },
//   { id: "mobile",    bin: "11", label: "Mobile Apps",          desc: "Native iOS, Android, and cross-platform consumer apps." },
//   { id: "internal",  bin: "00", label: "Internal Tools",       desc: "Admin panels and ops tooling that replace spreadsheets." },
//   { id: "mvp",       bin: "01", label: "MVPs",                 desc: "Ship-fast prototypes built on architecture that can scale." },
//   { id: "market",    bin: "10", label: "Marketplaces",         desc: "Two-sided platforms with payments, search, and trust systems." },
// ];

// const VALUE_PROPS = [
//   {
//     id: "performance",
//     metric: "98%+",
//     metricLabel: "Avg Lighthouse",
//     title: "Performance that keeps users engaged",
//     desc: "We build with runtime budgets in mind: fast pages, stable interactions, and measurable improvements (Lighthouse, Core Web Vitals, and real device testing).",
//   },
//   {
//     id: "architecture",
//     metric: "10×",
//     metricLabel: "Growth headroom",
//     title: "Architecture that scales as you grow",
//     desc: "We design clean boundaries and observable systems so you can ship new features without rework. Fewer incidents, faster iteration, and less tech debt over time.",
//   },
//   {
//     id: "design-system",
//     metric: "1 system",
//     metricLabel: "Design coverage",
//     title: "Design systems that reduce UX friction",
//     desc: "Tokens, reusable components, and consistent patterns across web, mobile, and internal tools. Your product stays coherent while teams move faster.",
//   },
//   {
//     id: "delivery",
//     metric: "Weekly",
//     metricLabel: "Shipped iterations",
//     title: "Delivery cadence that accelerates momentum",
//     desc: "Weekly demos, feature-flagged deploys, and post-launch support. You learn faster, reduce rollout risk, and keep growth moving.",
//   },
// ];

// // Process — kept identical to landing page treatment, extended to 6 phases.
// const PROCESS = [
//   { num: "01", title: "Discovery",   desc: "Deep-dive into your business, users, and technical landscape to uncover what actually needs to be built.", points: ["Stakeholder interviews", "Technical audit", "Opportunity mapping"] },
//   { num: "02", title: "Design",      desc: "We design the experience — flows, wireframes, and high-fidelity UI — before a single line of production code is written.", points: ["UX flows & wireframes", "High-fidelity UI", "Design tokens"] },
//   { num: "03", title: "Development", desc: "Agile sprints with weekly demos. You stay close to the work. We ship fast without cutting corners.", points: ["Weekly demos", "CI/CD pipeline", "Code review"] },
//   { num: "04", title: "Testing",     desc: "Automated and manual QA across devices, browsers, and edge cases. Performance, accessibility, and security baked in.", points: ["Automated test suites", "Cross-device QA", "Performance budgets"] },
//   { num: "05", title: "Launch",      desc: "Phased rollout with monitoring, observability, and rollback plans. We don't ship and pray.", points: ["Phased rollout", "Monitoring & alerts", "Rollback ready"] },
//   { num: "06", title: "Support",     desc: "Post-launch support, iteration, and growth. We don't disappear after go-live.", points: ["SLA-backed support", "Continuous improvement", "Roadmap planning"] },
// ];

// const TECH = [
//   "React", "Next.js", "TypeScript", "Vue", "Svelte", "Tailwind",
//   "Node.js", "Python", "Go", "Rust", "GraphQL", "PostgreSQL",
//   "Swift", "Kotlin", "React Native", "Flutter",
//   "AWS", "GCP", "Kubernetes", "Docker", "Terraform", "Redis",
// ];

// // Results — outcomes, paired with the project shape so each card tells a story.
// const RESULTS = [
//   { metric: "43%",  label: "Faster page loads", project: "FinEdge · Trading dashboard",       desc: "Migrated from a legacy SPA to an edge-rendered Next.js stack. LCP dropped from 3.4s to 1.9s in the first sprint." },
//   { metric: "2.4×", label: "Conversion lift",   project: "NovaRetail · Checkout flow",        desc: "Re-architected the checkout funnel with progressive enhancement and inline validation. Cart-to-purchase rate doubled." },
//   { metric: "$4M",  label: "Annual savings",    project: "ShipFast · Logistics engine",       desc: "Replaced a hand-tuned routing heuristic with an ML-powered optimization service. Fuel + ops costs cut in year one." },
//   { metric: "2M+",  label: "Users served",      project: "MedCore · Patient platform",        desc: "Designed a multi-region, HIPAA-compliant architecture from scratch. Scaled to 2M+ MAU without a single major incident." },
// ];

// const FAQS = [
//   { q: "How much does custom software development cost?",          a: "Most projects fall between $40K and $250K depending on scope, team size, and timeline. We provide fixed-price proposals after a paid discovery sprint so there are no surprises mid-build. For exploratory MVPs, we also offer time-and-materials engagements with weekly cost ceilings." },
//   { q: "How long does it take to build a custom application?",     a: "MVPs typically take 8–12 weeks. Full production builds run 16–24 weeks. We share a detailed Gantt during the proposal phase, with weekly milestones you can hold us to. Tight deadlines are doable when scope is clear — we'll tell you honestly what fits." },
//   { q: "What technologies do you specialize in?",                  a: "Our default stack is TypeScript end-to-end (React, Next.js, Node), Postgres, and AWS or GCP. For mobile we ship native (Swift, Kotlin) when performance matters and React Native when speed-to-market wins. We choose tooling based on your problem, not because it's trendy." },
//   { q: "Do you handle the entire process or just one part?",       a: "Both. We can own discovery → design → engineering → launch → support end-to-end, or we can plug into your existing team in any of those phases. Most clients start with a discovery sprint and expand the engagement based on what's working." },
//   { q: "What happens after the product launches?",                 a: "We offer SLA-backed maintenance retainers covering monitoring, security patches, bug fixes, and small feature work. Many clients keep us on as a fractional engineering team. You're never locked in — all code, infrastructure, and credentials transfer to you." },
//   { q: "Can you work with our existing team or codebase?",         a: "Yes. We do legacy modernization, codebase audits, and team augmentation. We're comfortable inheriting messy code, untangling architecture, and shipping alongside your engineers. No ego, no rewrites for the sake of rewriting." },
//   { q: "How do you handle data security and compliance?",          a: "SOC 2-aligned engineering practices by default. We've shipped HIPAA, PCI-DSS, and GDPR-compliant systems. Security reviews, penetration testing, and threat modeling are part of our standard delivery, not an upsell." },
//   { q: "Do you sign NDAs before discovery calls?",                 a: "Of course. Send us your NDA before the call and we'll have it back signed within the day. We also have a mutual NDA template if you'd prefer to use ours." },
// ];

// // ── COMPONENT ─────────────────────────────────────────────────────────────────

// export default function CustomSoftwarePage() {
//   // FAQ accordion
//   const [openFaq, setOpenFaq] = useState<number | null>(0);

//   // Mobile breakpoint
//   const [isMobile, setIsMobile] = useState(false);

//   // "What we build" hover state — drives which device mockup is highlighted
//   // in the right column. Keyboard-accessible via tab focus.
//   const [hoveredBuild, setHoveredBuild] = useState<number>(0);

//   // Prevent hover-driven re-renders while the page is scrolling.
//   // When the pointer stays in place, as sections move under it React can
//   // fire multiple mouseenter events quickly -> causes jank.
//   const isLenisScrollingRef = useRef(false);
//   const hoverLockTimeoutRef = useRef<number | null>(null);
//   const pendingHoveredBuildRef = useRef<number | null>(null);

//   // Tech marquee refs
//   const marqueeLeftRef = useRef<HTMLDivElement>(null);
//   const marqueeRightRef = useRef<HTMLDivElement>(null);
//   const marqueeLeftTweenRef = useRef<gsap.core.Tween | null>(null);
//   const marqueeRightTweenRef = useRef<gsap.core.Tween | null>(null);

//   // Lenis
//   const lenisRef = useRef<Lenis | null>(null);

//   // Mobile detector
//   useEffect(() => {
//     if (typeof window === "undefined") return;
//     const mq = window.matchMedia("(max-width: 900px)");
//     const update = () => setIsMobile(mq.matches);
//     update();
//     mq.addEventListener("change", update);
//     return () => mq.removeEventListener("change", update);
//   }, []);

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
//     lenis.on("scroll", () => {
//       isLenisScrollingRef.current = true;
//       if (hoverLockTimeoutRef.current) window.clearTimeout(hoverLockTimeoutRef.current);
//       hoverLockTimeoutRef.current = window.setTimeout(() => {
//         const next = pendingHoveredBuildRef.current;
//         pendingHoveredBuildRef.current = null;
//         isLenisScrollingRef.current = false;
//         if (typeof next === "number") {
//           setHoveredBuild((prev) => (prev === next ? prev : next));
//         }
//       }, 150);
//       ScrollTrigger.update();
//     });
//     const ticker = (time: number) => lenis.raf(time * 1000);
//     gsap.ticker.add(ticker);
//     gsap.ticker.lagSmoothing(0);
//     return () => {
//       gsap.ticker.remove(ticker);
//       if (hoverLockTimeoutRef.current) window.clearTimeout(hoverLockTimeoutRef.current);
//       lenis.destroy();
//       lenisRef.current = null;
//     };
//   }, []);

//   // GSAP animations
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // ── HERO: split-character intro ──
//       const heroTl = gsap.timeline({ delay: 0.1 });
//       const headlineChars = gsap.utils.toArray<HTMLElement>(".csd-h1-char");
//       heroTl.fromTo(
//         headlineChars,
//         { yPercent: 110, opacity: 0 },
//         { yPercent: 0, opacity: 1, duration: 0.85, stagger: { each: 0.018 }, ease: "power4.out" },
//         0
//       );
//       heroTl.fromTo(
//         ".csd-hero-fade",
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
//         0.55
//       );
//       heroTl.fromTo(
//         ".csd-hero-binary-frame",
//         { opacity: 0, scale: 0.97 },
//         { opacity: 1, scale: 1, duration: 1.1, ease: "power3.out" },
//         0.4
//       );

//       // Batched reveals reduce per-element ScrollTrigger load and keep scroll smooth.
//       const setupBatchReveal = (
//         selector: string,
//         fromVars: gsap.TweenVars,
//         toVars: gsap.TweenVars,
//         start: string
//       ) => {
//         const items = gsap.utils.toArray<HTMLElement>(selector);
//         if (!items.length) return;
//         gsap.set(items, fromVars);
//         ScrollTrigger.batch(items, {
//           start,
//           once: true,
//           onEnter: (batch) => {
//             gsap.to(batch, {
//               ...toVars,
//               stagger: 0.08,
//               overwrite: true,
//             });
//           },
//         });
//       };

//       setupBatchReveal(".csd-sh", { opacity: 0, y: 38 }, { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" }, "top 88%");
//       setupBatchReveal(".csd-svc-card", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "top 90%");
//       setupBatchReveal(".csd-build-row", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "top 92%");
//       setupBatchReveal(".csd-vp-card", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "top 88%");
//       setupBatchReveal(".csd-result-card", { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "top 90%");
//       setupBatchReveal(".csd-faq-row", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, "top 92%");

//       // ── Process: horizontal pin (desktop only) ──
//       const processTrack = document.querySelector<HTMLElement>(".csd-process-track");
//       const processPin = document.querySelector<HTMLElement>(".csd-process-pin");
//       const mm = gsap.matchMedia();
//       mm.add("(min-width: 769px)", () => {
//         if (!processTrack || !processPin) return;
//         const getScrollDistance = () => processTrack.scrollWidth - window.innerWidth + 80;
//         gsap.to(processTrack, {
//           x: () => -getScrollDistance(),
//           ease: "none",
//           scrollTrigger: {
//             trigger: processPin,
//             start: "top top",
//             end: () => `+=${getScrollDistance()}`,
//             pin: true,
//             pinSpacing: true,
//             anticipatePin: 1,
//             scrub: 0.8,
//             invalidateOnRefresh: true,
//           },
//         });
//       });

//       // ── CTA fade ──
//       gsap.fromTo(".csd-cta-inner",
//         { opacity: 0, y: 50 },
//         { opacity: 1, y: 0, duration: 1, ease: "power3.out",
//           scrollTrigger: { trigger: ".csd-cta-inner", start: "top 85%" } });
//     });
//     return () => ctx.revert();
//   }, []);

//   // Tech marquee
//   useEffect(() => {
//     const left = marqueeLeftRef.current;
//     const right = marqueeRightRef.current;
//     if (!left || !right) return;

//     gsap.set(left, { xPercent: 0 });
//     gsap.set(right, { xPercent: -50 });

//     const leftTween = gsap.to(left, { xPercent: -50, duration: 55, ease: "none", repeat: -1 });
//     const rightTween = gsap.to(right, { xPercent: 0, duration: 60, ease: "none", repeat: -1 });
//     marqueeLeftTweenRef.current = leftTween;
//     marqueeRightTweenRef.current = rightTween;

//     return () => {
//       marqueeLeftTweenRef.current = null;
//       marqueeRightTweenRef.current = null;
//       leftTween.kill();
//       rightTween.kill();
//     };
//   }, []);

//   const handleTechMarqueeEnter = () => {
//     const lt = marqueeLeftTweenRef.current;
//     const rt = marqueeRightTweenRef.current;
//     if (lt) gsap.to(lt, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
//     if (rt) gsap.to(rt, { timeScale: 0.35, duration: 0.45, ease: "power2.out" });
//   };
//   const handleTechMarqueeLeave = () => {
//     const lt = marqueeLeftTweenRef.current;
//     const rt = marqueeRightTweenRef.current;
//     if (lt) gsap.to(lt, { timeScale: 1, duration: 0.45, ease: "power2.out" });
//     if (rt) gsap.to(rt, { timeScale: 1, duration: 0.45, ease: "power2.out" });
//   };

//   // Refresh ScrollTrigger after fonts load
//   useEffect(() => {
//     const fonts = "fonts" in document ? document.fonts : undefined;
//     if (!fonts?.ready) return;
//     fonts.ready.then(() => { ScrollTrigger.refresh(); });
//   }, []);

//   return (
//     <>
//       {/* GRAIN OVERLAY */}
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

//         {/* SECTION 1 - HERO */}
//         <section className="csd-hero">
//           <div aria-hidden className="csd-hero-grid-bg" />
//           <div aria-hidden className="csd-hero-orb csd-hero-orb-a" />
//           <div aria-hidden className="csd-hero-orb csd-hero-orb-b" />

//           <div className="csd-hero-inner">
//             <div className="csd-hero-main">
//               <div className="csd-hero-left">
//                 <h1 className="csd-hero-title">
//                   <div className="csd-h1-line">
//                     {"Software".split("").map((c, i) => (
//                       <span key={`l1-${i}`} className="csd-h1-char">{c === " " ? "\u00A0" : c}</span>
//                     ))}
//                   </div>
//                   <div className="csd-h1-line">
//                     {"built around".split("").map((c, i) => (
//                       <span key={`l2-${i}`} className="csd-h1-char" style={{ whiteSpace: "pre" }}>{c === " " ? "\u00A0" : c}</span>
//                     ))}
//                   </div>
//                   <div className="csd-h1-line">
//                     <span className="csd-h1-italic">
//                       {"your workflow.".split("").map((c, i) => (
//                         <span key={`l3i-${i}`} className="csd-h1-char">{c}</span>
//                       ))}
//                     </span>
//                   </div>
//                 </h1>

//                 <p className="csd-hero-fade csd-hero-lead" style={{ opacity: 0 }}>
//                   We design, build, and modernize web apps, mobile apps, SaaS platforms,
//                   admin panels, and customer-facing systems that match your operations,
//                   integrate with your stack, and stay maintainable after launch.
//                 </p>

//                 <div className="csd-hero-fade csd-hero-cta-row" style={{ opacity: 0 }}>
//                   <Link href="/contact" className="csd-cta-primary">
//                     <span style={{ position: "relative", zIndex: 2 }}>Plan my build</span>
//                     <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" className="csd-cta-arrow" style={{ position: "relative", zIndex: 2 }}>
//                       <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </Link>
//                   <a href="#capabilities" className="csd-cta-ghost">
//                     <span>Explore capabilities</span>
//                     <svg aria-hidden width="12" height="12" viewBox="0 0 12 12">
//                       <path d="M6 2.5v7M3 6.5 6 9.5 9 6.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </a>
//                 </div>

//               </div>

//               <div className="csd-hero-right">
//                 <div className="csd-hero-binary-frame" style={{ opacity: 0 }}>
//                   <div className="csd-hero-card-head">
//                     <div>
//                       <span className="csd-hero-card-eyebrow">Delivery Blueprint</span>
//                       <h2>From business need to shipped product</h2>
//                     </div>
//                   </div>

//                   <div className="csd-hero-blueprint">
//                     <div className="csd-hero-blueprint-main">
//                       {[
//                         ["01", "Map", "Users, workflows, data, constraints"],
//                         ["02", "Model", "Architecture, UX flows, delivery plan"],
//                         ["03", "Build", "Frontend, backend, integrations, QA"],
//                         ["04", "Launch", "Monitoring, handoff, iteration"],
//                       ].map(([num, title, body]) => (
//                         <div key={num} className="csd-hero-step">
//                           <span>{num}</span>
//                           <div>
//                             <strong>{title}</strong>
//                             <p>{body}</p>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Footer caption */}
//                   <div className="csd-hero-binary-footer">
//                     <div>
//                       <div className="csd-hero-binary-foot-k">PRINCIPLE</div>
//                       <div className="csd-hero-binary-foot-v">Every product is a series of binary decisions made well.</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 2 — SERVICES SNAPSHOT
//             DIFFERENT treatment: each service is a wide HORIZONTAL ROW,
//             not a card grid. Binary code on the left, large display title,
//             description + tags, and a hover line that fills.
//             Reads like a manifest of capabilities, not a generic service grid.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section id="capabilities" className="csd-cap-section">
//           <div className="csd-cap-inner">
//             <div className="csd-sh csd-cap-header">
//               <div>
//                 <h2 className="csd-cap-h2">
//                   Six disciplines.{" "}
//                   <span className="csd-italic-mute">One senior team.</span>
//                 </h2>
//               </div>
//             </div>

//             <div className="csd-cap-list">
//               {SUB_SERVICES.map((s) => (
//                 <Link
//                   key={s.num}
//                   id={`cap-${s.num}`}
//                   href={s.href}
//                   className="csd-svc-card csd-cap-row"
//                   style={{ ["--svc-accent" as never]: s.accent }}
//                 >
//                   {/* Hover sweep */}
//                   <span className="csd-cap-row-sweep" aria-hidden />

//                   <div className="csd-cap-row-bin">
//                     <span className="csd-cap-row-dot" style={{ background: s.accent }} />
//                     <span>{s.bin}</span>
//                   </div>

//                   <div className="csd-cap-row-num">{s.num}</div>

//                   <div className="csd-cap-row-body">
//                     <h3 className="csd-cap-row-title">{s.title}</h3>
//                   </div>

//                   <div className="csd-cap-row-arrow" aria-hidden>
//                     <svg width="20" height="20" viewBox="0 0 20 20">
//                       <path d="M5 10h10M10 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 5 — PROCESS
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           className="csd-process-pin"
//           style={{
//             padding: 0, background: "#0a0a0a", color: "#fafaf9",
//             height: isMobile ? "auto" : "100vh",
//             overflow: isMobile ? "visible" : "hidden",
//             position: "relative", display: "flex", flexDirection: "column",
//           }}
//         >
//           <div
//             aria-hidden
//             style={{
//               position: "absolute", inset: 0,
//               backgroundImage:
//                 "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
//               backgroundSize: "60px 60px", pointerEvents: "none",
//             }}
//           />
//           <div
//             style={{
//               position: "relative", zIndex: 2, flexShrink: 0,
//               padding: "clamp(80px, 12vh, 140px) 20px clamp(20px, 3vh, 40px)",
//               display: "flex", justifyContent: "space-between", alignItems: "flex-end",
//               gap: 40, flexWrap: "wrap",
//             }}
//           >
//             <div>
//               <h2
//                 style={{
//                   fontFamily: "var(--font-display)",
//                   fontSize: "clamp(32px, 4.5vw, 72px)", fontWeight: 500,
//                   letterSpacing: "-0.035em", lineHeight: 0.95, margin: 0,
//                 }}
//               >
//                 Our <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>process.</span>
//               </h2>
//             </div>
//             <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", maxWidth: 320, lineHeight: 1.65, margin: 0, textAlign: "right", flexShrink: 0 }}>
//               Six phases. One team. A way of working refined<br />across 150+ shipped products.
//             </p>
//           </div>

//           <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
//             <div
//               className="csd-process-track"
//               style={{
//                 display: "flex", gap: 20,
//                 paddingLeft: 20, paddingRight: 112,
//                 willChange: "transform", alignItems: "stretch",
//               }}
//             >
//               {PROCESS.map((step, i) => (
//                 <div
//                   key={i}
//                   className="csd-process-card"
//                   style={{
//                     width: "clamp(320px, 28vw, 440px)", flexShrink: 0,
//                     padding: "clamp(28px, 3.5vh, 44px) 36px",
//                     border: "1px solid rgba(255,255,255,0.08)",
//                     borderRadius: 20, background: "rgba(255,255,255,0.02)",
//                     display: "flex", flexDirection: "column", justifyContent: "space-between",
//                     height: "clamp(340px, 58vh, 500px)",
//                   }}
//                 >
//                   <div>
//                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "clamp(24px, 4vh, 48px)" }}>
//                       <span
//                         style={{
//                           fontFamily: "var(--font-display)",
//                           fontSize: "clamp(48px, 6vh, 72px)", fontWeight: 500,
//                           color: "rgba(255,255,255,0.12)",
//                           lineHeight: 1, letterSpacing: "-0.04em",
//                           fontVariantNumeric: "tabular-nums",
//                         }}
//                       >
//                         {step.num}
//                       </span>
//                       <span
//                         style={{
//                           padding: "5px 12px", borderRadius: 999,
//                           border: "1px solid rgba(255,255,255,0.15)",
//                           fontSize: 11, fontWeight: 500,
//                           color: "rgba(255,255,255,0.65)", letterSpacing: "0.04em",
//                         }}
//                       >
//                         Phase {step.num}
//                       </span>
//                     </div>
//                     <h3
//                       style={{
//                         fontFamily: "var(--font-display)",
//                         fontSize: "clamp(26px, 3.2vh, 40px)", fontWeight: 500,
//                         margin: "0 0 clamp(10px, 2vh, 20px)",
//                         letterSpacing: "-0.02em", lineHeight: 1,
//                       }}
//                     >
//                       {step.title}
//                     </h3>
//                     <p style={{ fontSize: "clamp(13px, 1.6vh, 15px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0 }}>
//                       {step.desc}
//                     </p>
//                   </div>
//                   <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "clamp(14px, 2.5vh, 24px)" }}>
//                     {step.points.map((p) => (
//                       <li
//                         key={p}
//                         style={{
//                           fontSize: 13, color: "rgba(255,255,255,0.7)",
//                           padding: "clamp(5px, 1vh, 8px) 0",
//                           display: "flex", alignItems: "center", gap: 12,
//                         }}
//                       >
//                         <span style={{ width: 14, height: 1, background: "rgba(255,255,255,0.2)", flexShrink: 0 }} />
//                         {p}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//               <div
//                 style={{
//                   width: 300, flexShrink: 0,
//                   padding: "clamp(28px, 3.5vh, 44px) 36px",
//                   display: "flex", flexDirection: "column", justifyContent: "center",
//                   height: "clamp(340px, 58vh, 500px)",
//                 }}
//               >
//                 <h3
//                   style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: "clamp(22px, 2.8vh, 32px)", fontWeight: 500,
//                     margin: "0 0 20px",
//                     letterSpacing: "-0.025em", lineHeight: 1.1,
//                   }}
//                 >
//                   Every project. <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>No exceptions.</span>
//                 </h3>
//                 <Link
//                   href="/contact"
//                   style={{
//                     display: "inline-flex", alignItems: "center", gap: 10,
//                     padding: "12px 22px", background: "#fafaf9", color: "#0a0a0a",
//                     borderRadius: 999, fontSize: 13, fontWeight: 500,
//                     textDecoration: "none", alignSelf: "flex-start", marginTop: 4,
//                   }}
//                 >
//                   Start yours →
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {!isMobile && (
//             <>
//               <div style={{ position: "absolute", bottom: 20, left: 32, fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", gap: 10 }}>
//                 <span style={{ display: "inline-block", width: 28, height: 1, background: "rgba(255,255,255,0.25)" }} />
//                 Scroll
//               </div>
//               <div style={{ position: "absolute", bottom: 20, right: 32, fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", fontVariantNumeric: "tabular-nums" }}>
//                 06 phases
//               </div>
//             </>
//           )}
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 3 — WHAT WE BUILD
//             Image RIGHT, text LEFT. Left = numbered hover list of product
//             types. Right = animated device frame (browser/dashboard/phone)
//             that switches based on which row is hovered/focused.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="csd-build-section">
//           <div className="csd-build-inner">
//             <div className="csd-build-grid">
//               {/* LEFT — text + interactive list */}
//               <div className="csd-build-left">
//                 <div className="csd-sh">
//                   <h2 className="csd-h2">
//                     Real products,{" "}
//                     <span className="csd-italic-mute">not slides.</span>
//                   </h2>
//                   <p className="csd-h2-lead csd-build-lead">
//                     Service categories are abstract. Here&apos;s what they
//                     actually become in production — hover any row to see it.
//                   </p>
//                 </div>

//                 <ul className="csd-build-list" role="list">
//                   {WE_BUILD.map((b, i) => {
//                     const active = hoveredBuild === i;
//                     return (
//                       <li
//                         key={b.id}
//                         className="csd-build-row"
//                         data-active={active ? "true" : "false"}
//                         onMouseEnter={() => {
//                           if (isLenisScrollingRef.current) {
//                             pendingHoveredBuildRef.current = i;
//                             return;
//                           }
//                           setHoveredBuild((prev) => (prev === i ? prev : i));
//                         }}
//                         onFocus={() => {
//                           setHoveredBuild((prev) => (prev === i ? prev : i));
//                         }}
//                         tabIndex={0}
//                       >
//                         <span className="csd-build-row-bin">
//                           <span style={{ fontFamily: "var(--font-mono)" }}>{b.bin}</span>
//                         </span>
//                         <span className="csd-build-row-label">{b.label}</span>
//                         <span className="csd-build-row-desc">{b.desc}</span>
//                         <span className="csd-build-row-line" />
//                       </li>
//                     );
//                   })}
//                 </ul>
//               </div>

//               {/* RIGHT — animated device viz tied to hover state */}
//               <div className="csd-build-right">
//                 <div className="csd-build-stage" aria-hidden>
//                   {/* Background grid */}
//                   <div className="csd-build-stage-grid" />

//                   {/* Floating frames */}
//                   <BuildFrame index={0} active={hoveredBuild === 0} variant="saas"      label="SaaS" />
//                   <BuildFrame index={1} active={hoveredBuild === 1} variant="dashboard" label="Dashboard" />
//                   <BuildFrame index={2} active={hoveredBuild === 2} variant="mobile"    label="Mobile" />
//                   <BuildFrame index={3} active={hoveredBuild === 3} variant="internal"  label="Internal" />
//                   <BuildFrame index={4} active={hoveredBuild === 4} variant="mvp"       label="MVP" />
//                   <BuildFrame index={5} active={hoveredBuild === 5} variant="market"    label="Market" />

//                   {/* Active label badge */}
//                   <div className="csd-build-stage-badge">
//                     <span className="csd-build-stage-badge-bin">{WE_BUILD[hoveredBuild].bin}</span>
//                     <span>{WE_BUILD[hoveredBuild].label}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 4 — WHY TEAMS CHOOSE US
//             Clean, minimal cards that explain how we drive growth.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="csd-vp-section" aria-labelledby="csd-vp-title">
//           <div className="csd-vp-inner">
//             <div className="csd-vp-grid">
//               <div className="csd-vp-left">
//                 <div className="csd-sh">
//                   <h2 id="csd-vp-title" className="csd-h2 csd-h2-light">
//                     Why teams <span className="csd-italic-light">choose us</span>.
//                   </h2>

//                   <p className="csd-h2-lead csd-h2-lead-light">
//                     We help businesses grow through reliable delivery: faster performance, scalable architecture,
//                     consistent UX, and a cadence your team can trust.
//                   </p>
//                 </div>
//               </div>

//               <div className="csd-vp-right" role="list" aria-label="What drives growth">
//                 {VALUE_PROPS.map((v) => (
//                   <div key={v.id} className="csd-vp-card" role="listitem">
//                     <div className="csd-vp-card-pill" aria-hidden>
//                       <span className="csd-vp-card-pill-value">{v.metric}</span>
//                       <span className="csd-vp-card-pill-label">{v.metricLabel}</span>
//                     </div>
//                     <h3 className="csd-vp-card-title">{v.title}</h3>
//                     <p className="csd-vp-card-desc">{v.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 6 — TECH STACK (UNCHANGED — same marquee as landing)
//         ═══════════════════════════════════════════════════════════════ */}
//         <section
//           className="csd-tech-marquee"
//           onMouseEnter={handleTechMarqueeEnter}
//           onMouseLeave={handleTechMarqueeLeave}
//           style={{ padding: "120px 0", borderTop: "1px solid rgba(0,0,0,0.06)", overflow: "hidden", background: "#fafaf9" }}
//         >
//           <div className="csd-sh" style={{ maxWidth: 1320, margin: "0 auto 56px", padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "end", gap: 40, flexWrap: "wrap" }}>
//             <div>
//               <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.8vw, 56px)", fontWeight: 500, letterSpacing: "-0.03em", lineHeight: 1, margin: 0 }}>
//                 Tools we <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>trust.</span>
//               </h2>
//             </div>
//             <p style={{ fontSize: 14, color: "rgba(0,0,0,0.55)", maxWidth: 380, lineHeight: 1.65, margin: 0 }}>
//               Mature, battle-tested tooling — picked for your problem, not because it&apos;s new.
//             </p>
//           </div>
//           <div style={{ position: "relative" }}>
//             <div style={{ overflow: "hidden" }}>
//               <div ref={marqueeLeftRef} className="marquee-track" style={{ display: "flex", width: "max-content", gap: 0 }}>
//                 {[...TECH, ...TECH].map((t, i) => (
//                   <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 24px", flexShrink: 0 }}>
//                     <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.4vw, 34px)", fontWeight: 500, color: "#0a0a0a", letterSpacing: "-0.025em" }}>{t}</span>
//                     <span aria-hidden style={{ width: 8, height: 8, background: "#0a0a0a", borderRadius: "50%", opacity: 0.2 }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div style={{ overflow: "hidden", marginTop: 20 }}>
//               <div ref={marqueeRightRef} className="marquee-track" style={{ display: "flex", width: "max-content", gap: 0 }}>
//                 {[...TECH.slice().reverse(), ...TECH.slice().reverse()].map((t, i) => (
//                   <div key={i} style={{ display: "flex", alignItems: "center", gap: 28, padding: "0 24px", flexShrink: 0 }}>
//                     <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.4vw, 34px)", fontWeight: 400, fontStyle: "italic", color: "transparent", WebkitTextStroke: "1px rgba(0,0,0,0.2)", letterSpacing: "-0.025em" }}>{t}</span>
//                     <span aria-hidden style={{ width: 8, height: 8, border: "1px solid rgba(0,0,0,0.2)", borderRadius: "50%" }} />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 7 — RESULTS / IMPACT
//             Image LEFT (the metric, huge), text RIGHT (project + story).
//             Each result is a wide horizontal panel with the number doing
//             the heavy visual lifting. Reads as evidence, not a stat grid.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="csd-results-section">
//           <div className="csd-results-inner">
//             <div className="csd-sh csd-results-header">
//               <div>
//                 <h2 className="csd-h2">
//                   We don&apos;t just build software.{" "}
//                   <span className="csd-italic-mute">We deliver results.</span>
//                 </h2>
//               </div>
//               <p className="csd-h2-lead">
//                 Selected outcomes from recent engagements. Numbers measured
//                 in production, not extrapolated from pitch decks.
//               </p>
//             </div>

//             <div className="csd-results-list">
//               {RESULTS.map((r, i) => (
//                 <div key={r.label} className="csd-result-card">
//                   {/* Left = the number */}
//                   <div className="csd-result-num-wrap">
//                     <div className="csd-result-index">
//                       <span style={{ fontFamily: "var(--font-mono)" }}>R-{String(i + 1).padStart(2, "0")}</span>
//                     </div>
//                     <div className="csd-result-metric">{r.metric}</div>
//                     <div className="csd-result-label">{r.label}</div>
//                   </div>
//                   {/* Right = the story */}
//                   <div className="csd-result-story">
//                     <div className="csd-result-project">
//                       <span className="csd-result-project-dot" />
//                       {r.project}
//                     </div>
//                     <p className="csd-result-desc">{r.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 8 — FAQs
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="csd-faq-section">
//           <div className="csd-faq-layout">
//             <div className="csd-faq-aside csd-sh">
//               <h2 className="csd-h2">
//                 Frequently <span className="csd-italic-mute">asked.</span>
//               </h2>
//               <p className="csd-h2-lead csd-faq-lead">
//                 Real questions from real prospects. If yours isn&apos;t here,
//                 send us a note — we answer every inquiry within 24 hours.
//               </p>
//               <Link href="/contact" className="csd-faq-cta">
//                 Ask us anything
//                 <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
//                   <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
//                 </svg>
//               </Link>
//             </div>

//             <div className="csd-faq-list">
//               {FAQS.map((f, i) => {
//                 const isOpen = openFaq === i;
//                 return (
//                   <div key={i} className="csd-faq-row" data-open={isOpen ? "true" : "false"}>
//                     <button
//                       type="button" className="csd-faq-q"
//                       onClick={() => setOpenFaq(isOpen ? null : i)}
//                       aria-expanded={isOpen}
//                       suppressHydrationWarning
//                     >
//                       <span className="csd-faq-q-num">{String(i + 1).padStart(2, "0")}</span>
//                       <span className="csd-faq-q-text">{f.q}</span>
//                       <span className="csd-faq-q-icon" aria-hidden>
//                         <svg width="14" height="14" viewBox="0 0 14 14">
//                           <path d="M3 7h8 M7 3v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
//                         </svg>
//                       </span>
//                     </button>
//                     <div className="csd-faq-a">
//                       <div className="csd-faq-a-inner">{f.a}</div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 9 — FINAL CTA
//         ═══════════════════════════════════════════════════════════════ */}
//         <section style={{ padding: "0 20px 64px", borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 64 }}>
//           <div
//             className="csd-cta-inner"
//             style={{
//               borderRadius: 28, overflow: "hidden",
//               padding: "92px 56px", position: "relative",
//               background: "#0a0a0a", color: "#fafaf9",
//               opacity: 0, maxWidth: 1320, margin: "0 auto",
//             }}
//           >
//             <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "48px 48px", pointerEvents: "none" }} />
//             <div aria-hidden style={{ position: "absolute", top: "-20%", right: "-10%", width: 560, height: 560, background: "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)", pointerEvents: "none" }} />

//             {/* Big floating binary mark in CTA — ties the page back to the hero */}
//             <div aria-hidden className="csd-cta-mark">
//               <span>1</span><span>0</span>
//             </div>

//             <div style={{ position: "relative", zIndex: 1, maxWidth: 760 }}>
//               <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(40px, 6vw, 84px)", fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 0.94, margin: "0 0 28px" }}>
//                 Ready to build something{" "}
//                 <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.6)" }}>that lasts?</span>
//               </h2>
//               <p style={{ fontSize: 15, color: "rgba(255,255,255,0.58)", maxWidth: 540, lineHeight: 1.62, margin: "0 0 36px" }}>
//                 Free 30-minute discovery call. You&apos;ll talk directly with an engineer
//                 and a strategist. No sales pitch — just a real conversation about your
//                 problem, your timeline, and whether we&apos;re the right team for it.
//               </p>
//               <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
//                 <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", background: "#fafaf9", color: "#0a0a0a", textDecoration: "none", fontSize: 14, fontWeight: 500, borderRadius: 999, transition: "transform 0.2s" }}>
//                   Book a discovery call <span aria-hidden>→</span>
//                 </Link>
//                 <a href="mailto:hello@techbinaries.com" className="csd-ghost-dark" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 26px", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: 14, fontWeight: 500, borderRadius: 999, transition: "background 0.2s, border-color 0.2s" }}>
//                   hello@techbinaries.com
//                 </a>
//               </div>
//               <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
//                 {[
//                   { k: "Response time",   v: "Within 24h" },
//                   { k: "Typical project", v: "8–24 weeks" },
//                   { k: "Engagement type", v: "Fixed or T&M" },
//                 ].map((it) => (
//                   <div key={it.k}>
//                     <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>{it.k}</div>
//                     <div style={{ fontSize: 15, color: "#fafaf9", fontFamily: "var(--font-display)", fontWeight: 500, letterSpacing: "-0.01em" }}>{it.v}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>
//         <SiteFooter />
//       </div>

//       <style>{`
//         /* ═══════════════════════════════════════════════════════════════
//            SHARED PRIMITIVES
//         ═══════════════════════════════════════════════════════════════ */
//         .csd-eyebrow {
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 18px;
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.16em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.5);
//         }
//         .csd-eyebrow-line {
//           width: 24px;
//           height: 1px;
//           background: rgba(10,10,10,0.3);
//         }
//         .csd-eyebrow-light {
//           color: rgba(255,255,255,0.55);
//         }
//         .csd-eyebrow-light .csd-eyebrow-line {
//           background: rgba(255,255,255,0.3);
//         }
//         .csd-h2 {
//           font-family: var(--font-display);
//           font-size: clamp(32px, 4.4vw, 64px);
//           font-weight: 500;
//           letter-spacing: -0.032em;
//           line-height: 1.02;
//           margin: 0 0 16px;
//           max-width: 760px;
//         }
//         .csd-h2-light { color: #fafaf9; }
//         .csd-italic-mute {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(10,10,10,0.55);
//         }
//         .csd-italic-light {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(255,255,255,0.6);
//         }
//         .csd-h2-lead {
//           font-size: 15px;
//           color: rgba(10,10,10,0.58);
//           line-height: 1.65;
//           margin: 0;
//           max-width: 460px;
//         }
//         .csd-h2-lead-light { color: rgba(255,255,255,0.6); }

//         .csd-cta-primary {
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
//           position: relative;
//           overflow: hidden;
//         }
//         .csd-cta-primary::before {
//           content: "";
//           position: absolute; inset: 0;
//           background: linear-gradient(90deg, #262626, #0a0a0a);
//           transform: translateX(-101%);
//           transition: transform 0.5s cubic-bezier(0.76, 0, 0.24, 1);
//           z-index: 1;
//         }
//         .csd-cta-primary:hover::before { transform: translateX(0); }
//         .csd-cta-primary:hover .csd-cta-arrow { transform: translateX(2px); }
//         .csd-cta-arrow { transition: transform 0.25s ease; }

//         .csd-cta-ghost {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 15px 26px;
//           border: 1px solid rgba(255,255,255,0.18);
//           color: rgba(255,255,255,0.85);
//           text-decoration: none;
//           font-size: 14px;
//           font-weight: 500;
//           border-radius: 999px;
//           background: transparent;
//           transition: border-color 0.2s, background 0.2s, color 0.2s;
//         }
//         .csd-cta-ghost:hover {
//           border-color: rgba(255,255,255,0.45);
//           background: rgba(255,255,255,0.05);
//           color: #fafaf9;
//         }
//         .csd-ghost-dark:hover {
//           border-color: rgba(255,255,255,0.45) !important;
//           background: rgba(255,255,255,0.05) !important;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 1 - HERO
//         ═══════════════════════════════════════════════════════════════ */
//         .csd-hero {
//           position: relative;
//           min-height: 100vh;
//           background:
//             radial-gradient(circle at 84% 18%, rgba(212,212,216,0.18), transparent 28%),
//             linear-gradient(135deg, #f8f8f7 0%, #efefed 48%, #e7e5e4 100%);
//           color: #0a0a0a;
//           padding: 132px 20px 72px;
//           overflow: hidden;
//         }
//         .csd-hero-grid-bg {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(10,10,10,0.045) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(10,10,10,0.045) 1px, transparent 1px);
//           background-size: 72px 72px;
//           mask-image: radial-gradient(ellipse 85% 72% at 50% 28%, black 0%, transparent 88%);
//           -webkit-mask-image: radial-gradient(ellipse 85% 72% at 50% 28%, black 0%, transparent 88%);
//           pointer-events: none;
//         }
//         .csd-hero-orb {
//           position: absolute;
//           border-radius: 999px;
//           pointer-events: none;
//           filter: blur(10px);
//         }
//         .csd-hero-orb-a {
//           width: 340px;
//           height: 340px;
//           right: 5%;
//           top: 14%;
//           background: rgba(255,255,255,0.72);
//           border: 1px solid rgba(10,10,10,0.06);
//         }
//         .csd-hero-orb-b {
//           width: 220px;
//           height: 220px;
//           left: -70px;
//           bottom: 12%;
//           background: rgba(10,10,10,0.04);
//         }

//         .csd-hero-inner {
//           position: relative;
//           z-index: 1;
//           max-width: 1320px;
//           margin: 0 auto;
//           display: flex;
//           flex-direction: column;
//           min-height: calc(100vh - 204px);
//         }

//         .csd-hero-meta {
//           display: inline-flex;
//           align-items: center;
//           gap: 12px;
//           align-self: flex-start;
//           margin-bottom: 54px;
//           padding: 9px 14px;
//           border: 1px solid rgba(10,10,10,0.09);
//           border-radius: 999px;
//           background: rgba(255,255,255,0.62);
//           backdrop-filter: blur(12px);
//           font-size: 11px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.52);
//         }
//         .csd-hero-back {
//           color: rgba(10,10,10,0.72);
//           text-decoration: none;
//           transition: color 0.2s ease;
//         }
//         .csd-hero-back:hover { color: #0a0a0a; }
//         .csd-hero-meta-divider {
//           width: 4px;
//           height: 4px;
//           border-radius: 50%;
//           background: rgba(10,10,10,0.28);
//         }

//         .csd-hero-main {
//           display: grid;
//           grid-template-columns: minmax(0, 1.02fr) minmax(420px, 0.98fr);
//           gap: clamp(44px, 6vw, 84px);
//           align-items: center;
//           flex: 1;
//         }

//         .csd-hero-kicker {
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           margin-bottom: 22px;
//           font-size: 12px;
//           font-weight: 700;
//           letter-spacing: 0.16em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.56);
//         }
//         .csd-hero-kicker-dot {
//           width: 9px;
//           height: 9px;
//           border-radius: 999px;
//           background: #0a0a0a;
//           box-shadow: 0 0 0 6px rgba(10,10,10,0.08);
//         }
//         .csd-hero-title {
//           font-family: var(--font-display);
//           font-size: clamp(48px, 6.6vw, 106px);
//           font-weight: 500;
//           line-height: 0.93;
//           letter-spacing: -0.048em;
//           margin: 0 0 34px;
//           color: #0a0a0a;
//         }
//         .csd-h1-line {
//           overflow: hidden;
//           padding-bottom: 0.075em;
//           display: block;
//           white-space: nowrap;
//         }
//         .csd-h1-char {
//           display: inline-block;
//           will-change: transform;
//         }
//         .csd-h1-italic {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(10,10,10,0.52);
//           display: inline-flex;
//         }

//         .csd-hero-lead {
//           font-size: 17px;
//           color: rgba(10,10,10,0.62);
//           max-width: 620px;
//           line-height: 1.72;
//           margin: 0 0 32px;
//         }
//         .csd-hero-cta-row {
//           display: flex;
//           gap: 12px;
//           flex-wrap: wrap;
//         }
//         .csd-hero .csd-cta-ghost {
//           border-color: rgba(10,10,10,0.14);
//           color: rgba(10,10,10,0.72);
//           background: rgba(255,255,255,0.56);
//         }
//         .csd-hero .csd-cta-ghost:hover {
//           border-color: rgba(10,10,10,0.28);
//           background: #fff;
//           color: #0a0a0a;
//         }

//         .csd-hero-right { position: relative; }
//         .csd-hero-binary-frame {
//           position: relative;
//           overflow: hidden;
//           border: 1px solid rgba(10,10,10,0.08);
//           border-radius: 24px;
//           background: #fff;
//           box-shadow: 0 24px 60px -48px rgba(10,10,10,0.32);
//         }
//         .csd-hero-binary-frame::before {
//           content: none;
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(10,10,10,0.035) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(10,10,10,0.035) 1px, transparent 1px);
//           background-size: 34px 34px;
//           pointer-events: none;
//           mask-image: linear-gradient(180deg, black, transparent 78%);
//           -webkit-mask-image: linear-gradient(180deg, black, transparent 78%);
//         }
//         .csd-hero-card-head {
//           position: relative;
//           z-index: 1;
//           display: flex;
//           justify-content: space-between;
//           align-items: flex-start;
//           gap: 20px;
//           padding: 22px 24px 16px;
//           border-bottom: 1px solid rgba(10,10,10,0.08);
//         }
//         .csd-hero-card-eyebrow {
//           display: block;
//           margin-bottom: 9px;
//           font-size: 10px;
//           font-weight: 800;
//           letter-spacing: 0.16em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.42);
//         }
//         .csd-hero-card-head h2 {
//           font-family: var(--font-display);
//           font-size: clamp(24px, 2.6vw, 34px);
//           font-weight: 500;
//           letter-spacing: -0.03em;
//           line-height: 1.06;
//           margin: 0;
//           max-width: 430px;
//         }

//         .csd-hero-blueprint {
//           position: relative;
//           z-index: 1;
//           padding: 16px 20px 20px;
//         }
//         .csd-hero-blueprint-main {
//           display: grid;
//           gap: 4px;
//         }
//         .csd-hero-step {
//           display: grid;
//           grid-template-columns: 38px 1fr;
//           gap: 12px;
//           align-items: start;
//           padding: 14px 0;
//           border-bottom: 1px solid rgba(10,10,10,0.08);
//         }
//         .csd-hero-step:last-child { border-bottom: none; }
//         .csd-hero-step > span {
//           display: grid;
//           place-items: center;
//           width: 32px;
//           height: 32px;
//           border-radius: 9px;
//           border: 1px solid rgba(10,10,10,0.12);
//           background: rgba(10,10,10,0.03);
//           color: rgba(10,10,10,0.72);
//           font-family: var(--font-mono);
//           font-size: 10px;
//           letter-spacing: 0.08em;
//         }
//         .csd-hero-step strong {
//           display: block;
//           margin-bottom: 2px;
//           font-family: var(--font-display);
//           font-size: 18px;
//           font-weight: 500;
//           letter-spacing: -0.02em;
//           color: #0a0a0a;
//         }
//         .csd-hero-step p {
//           margin: 0;
//           font-size: 13px;
//           line-height: 1.45;
//           color: rgba(10,10,10,0.56);
//         }
//         .csd-hero-binary-footer {
//           position: relative;
//           z-index: 1;
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 20px;
//           padding: 14px 24px 18px;
//           border-top: 1px solid rgba(10,10,10,0.08);
//           background: rgba(10,10,10,0.015);
//         }
//         .csd-hero-binary-foot-k {
//           font-size: 10px;
//           font-weight: 800;
//           letter-spacing: 0.16em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.42);
//           margin-bottom: 4px;
//         }
//         .csd-hero-binary-foot-v {
//           max-width: 430px;
//           font-size: 13px;
//           line-height: 1.4;
//           color: rgba(10,10,10,0.64);
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 2 — CAPABILITIES (horizontal rows)
//         ═══════════════════════════════════════════════════════════════ */
//         .csd-cap-h2 {
//           font-family: var(--font-display);
//           font-size: clamp(26px, 3.2vw, 40px);
//           font-weight: 500;
//           letter-spacing: -0.03em;
//           line-height: 1.06;
//           margin: 0;
//           max-width: 760px;
//         }
//         .csd-cap-section {
//           padding: 84px 20px;
//           background: #fafaf9;
//           border-top: 1px solid rgba(0,0,0,0.06);
//         }
//         .csd-cap-inner { max-width: 1320px; margin: 0 auto; }
//         .csd-cap-header {
//           display: flex;
//           justify-content: flex-start;
//           align-items: flex-end;
//           gap: 16px;
//           flex-wrap: wrap;
//           margin-bottom: 24px;
//         }

//         .csd-cap-list {
//           display: flex;
//           flex-direction: column;
//           border-top: 1px solid rgba(10,10,10,0.1);
//         }
//         .csd-cap-row {
//           display: grid;
//           grid-template-columns: 80px 56px 1fr 40px;
//           gap: 18px;
//           align-items: center;
//           padding: 20px 16px;
//           border-bottom: 1px solid rgba(10,10,10,0.1);
//           text-decoration: none;
//           color: #0a0a0a;
//           position: relative;
//           overflow: hidden;
//           transition: background 0.3s ease;
//         }
//         .csd-cap-row-sweep {
//           position: absolute;
//           left: 0; top: 0; bottom: 0;
//           width: 4px;
//           background: var(--svc-accent);
//           transform: scaleY(0);
//           transform-origin: top center;
//           transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
//         }
//         .csd-cap-row:hover {
//           background: rgba(10,10,10,0.025);
//         }
//         .csd-cap-row:hover .csd-cap-row-sweep {
//           transform: scaleY(1);
//         }
//         .csd-cap-row-bin {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 500;
//           color: rgba(10,10,10,0.55);
//           letter-spacing: 0.04em;
//         }
//         .csd-cap-row-dot {
//           width: 8px; height: 8px;
//           border-radius: 50%;
//         }
//         .csd-cap-row-num {
//           font-family: var(--font-display);
//           font-size: 26px;
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           color: transparent;
//           -webkit-text-stroke: 1px rgba(10,10,10,0.3);
//           font-variant-numeric: tabular-nums;
//           line-height: 1;
//           transition: color 0.3s, -webkit-text-stroke-color 0.3s;
//         }
//         .csd-cap-row:hover .csd-cap-row-num {
//           color: #0a0a0a;
//           -webkit-text-stroke-color: transparent;
//         }
//         .csd-cap-row-title {
//           font-family: var(--font-display);
//           font-size: clamp(18px, 2.2vw, 26px);
//           font-weight: 500;
//           letter-spacing: -0.022em;
//           line-height: 1.18;
//           margin: 0;
//         }
//         .csd-cap-row-desc {
//           font-size: 14px;
//           color: rgba(10,10,10,0.6);
//           line-height: 1.55;
//           margin: 0;
//           max-width: 580px;
//         }
//         .csd-cap-row-tags {
//           display: flex;
//           flex-wrap: wrap;
//           gap: 5px;
//           justify-content: flex-end;
//         }
//         .csd-cap-row-tags span {
//           padding: 4px 10px;
//           border: 1px solid rgba(10,10,10,0.12);
//           border-radius: 999px;
//           font-size: 11px;
//           font-weight: 500;
//           color: rgba(10,10,10,0.7);
//           letter-spacing: 0.02em;
//           background: #fff;
//         }
//         .csd-cap-row-arrow {
//           color: rgba(10,10,10,0.35);
//           transition: transform 0.3s, color 0.3s;
//         }
//         .csd-cap-row:hover .csd-cap-row-arrow {
//           color: #0a0a0a;
//           transform: translateX(4px);
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 3 — WHAT WE BUILD
//         ═══════════════════════════════════════════════════════════════ */
//         .csd-build-section {
//           padding: 140px 20px;
//           background: #f5f5f4;
//           border-top: 1px solid rgba(0,0,0,0.06);
//         }
//         .csd-build-inner { max-width: 1320px; margin: 0 auto; }
//         .csd-build-grid {
//           display: grid;
//           grid-template-columns: 1fr 1.1fr;
//           gap: 80px;
//           align-items: stretch;
//         }
//         .csd-build-lead { margin-bottom: 40px; }

//         .csd-build-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           border-top: 1px solid rgba(10,10,10,0.1);
//         }
//         .csd-build-row {
//           display: grid;
//           grid-template-columns: 60px 1fr;
//           column-gap: 18px;
//           row-gap: 6px;
//           align-items: baseline;
//           padding: 22px 0 22px;
//           border-bottom: 1px solid rgba(10,10,10,0.1);
//           position: relative;
//           cursor: pointer;
//           outline: none;
//           transition: padding-left 0.3s cubic-bezier(0.22, 1, 0.36, 1);
//         }
//         .csd-build-row:focus-visible {
//           padding-left: 8px;
//         }
//         .csd-build-row[data-active="true"] {
//           padding-left: 8px;
//         }
//         .csd-build-row-bin {
//           font-family: var(--font-mono);
//           font-size: 13px;
//           color: rgba(10,10,10,0.4);
//           letter-spacing: 0.04em;
//           padding-top: 6px;
//           transition: color 0.25s;
//         }
//         .csd-build-row[data-active="true"] .csd-build-row-bin {
//           color: #d4d4d8;
//         }
//         .csd-build-row-label {
//           font-family: var(--font-display);
//           font-size: clamp(22px, 2.6vw, 32px);
//           font-weight: 500;
//           letter-spacing: -0.024em;
//           line-height: 1.1;
//           color: #0a0a0a;
//         }
//         .csd-build-row-desc {
//           grid-column: 2;
//           font-size: 14px;
//           color: rgba(10,10,10,0.6);
//           line-height: 1.55;
//           max-width: 520px;
//         }
//         .csd-build-row-line {
//           position: absolute;
//           left: 0; bottom: -1px;
//           width: 0;
//           height: 2px;
//           background: #d4d4d8;
//           transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
//         }
//         .csd-build-row[data-active="true"] .csd-build-row-line {
//           width: 100%;
//         }

//         /* Right stage */
//         .csd-build-right {
//           position: relative;
//           min-height: 560px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
//         .csd-build-stage {
//           position: relative;
//           width: 100%;
//           aspect-ratio: 0.95 / 1;
//           background: #0a0a0a;
//           border-radius: 28px;
//           overflow: hidden;
//           box-shadow: 0 40px 90px -50px rgba(0,0,0,0.5);
//         }
//         .csd-build-stage-grid {
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
//           background-size: 32px 32px;
//         }

//         .csd-build-frame {
//           position: absolute;
//           background: rgba(255,255,255,0.04);
//           border: 1px solid rgba(255,255,255,0.1);
//           border-radius: 12px;
//           padding: 14px;
//           opacity: 0.35;
//           contain: layout paint;
//           will-change: transform, opacity;
//           transform: scale(0.95) translateY(0);
//           transition:
//             opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1),
//             transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
//           /* backdrop-filter is expensive; only enable it for the active frame */
//           backdrop-filter: none;
//         }
//         .csd-build-frame[data-active="true"] {
//           opacity: 1;
//           z-index: 5;
//           transform: scale(1.03) translateY(-4px);
//           border-color: rgba(212,212,216,0.5);
//           background: rgba(212,212,216,0.04);
//           box-shadow: 0 24px 48px -20px rgba(212,212,216,0.35);
//           backdrop-filter: blur(6px);
//         }
//         .csd-build-frame-head {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 8px;
//           margin-bottom: 10px;
//         }
//         .csd-build-frame-dots {
//           display: flex;
//           gap: 4px;
//         }
//         .csd-build-frame-dots span {
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: rgba(255,255,255,0.2);
//         }
//         .csd-build-frame-name {
//           font-family: var(--font-mono);
//           font-size: 9px;
//           color: rgba(255,255,255,0.4);
//           letter-spacing: 0.12em;
//           text-transform: uppercase;
//         }
//         .csd-build-frame-body {
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//         }

//         /* Frame variants */
//         .csd-build-frame-saas      { top: 8%;  left: 5%;  width: 48%; }
//         .csd-build-frame-dashboard { top: 12%; right: 4%; width: 44%; }
//         .csd-build-frame-mobile    { top: 38%; left: 38%; width: 26%; aspect-ratio: 0.5; padding: 10px; }
//         .csd-build-frame-internal  { bottom: 8%; left: 6%;  width: 42%; }
//         .csd-build-frame-mvp       { bottom: 18%; right: 6%; width: 38%; }
//         .csd-build-frame-market    { bottom: 4%; right: 22%; width: 36%; }

//         .csd-bf-bar {
//           height: 6px;
//           background: rgba(255,255,255,0.12);
//           border-radius: 2px;
//         }
//         .csd-bf-bar-pink {
//           height: 6px;
//           background: linear-gradient(90deg, #d4d4d8, rgba(212,212,216,0.3));
//           border-radius: 2px;
//         }
//         .csd-bf-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 4px;
//         }
//         .csd-bf-grid > div {
//           aspect-ratio: 1.4;
//           background: rgba(255,255,255,0.08);
//           border-radius: 3px;
//         }
//         .csd-bf-grid > div:nth-child(2) { background: rgba(212,212,216,0.4); }
//         .csd-bf-chart {
//           display: flex;
//           align-items: flex-end;
//           gap: 3px;
//           height: 50px;
//         }
//         .csd-bf-chart > span {
//           flex: 1;
//           background: rgba(255,255,255,0.14);
//           border-radius: 2px 2px 0 0;
//         }
//         .csd-bf-chart > span:nth-child(odd) {
//           background: rgba(212,212,216,0.5);
//         }
//         .csd-bf-mobile-bar {
//           height: 4px;
//           background: rgba(255,255,255,0.12);
//           border-radius: 2px;
//         }
//         .csd-bf-mobile-circle {
//           width: 28px; height: 28px;
//           border-radius: 50%;
//           background: rgba(212,212,216,0.4);
//           border: 2px solid rgba(212,212,216,0.7);
//           margin: 8px auto;
//         }

//         .csd-build-stage-badge {
//           position: absolute;
//           bottom: 22px;
//           left: 22px;
//           z-index: 10;
//           display: inline-flex;
//           align-items: center;
//           gap: 12px;
//           padding: 10px 16px 10px 12px;
//           background: rgba(10,10,10,0.85);
//           border: 1px solid rgba(255,255,255,0.15);
//           border-radius: 999px;
//           backdrop-filter: blur(10px);
//           font-family: var(--font-display);
//           font-size: 14px;
//           color: #fafaf9;
//           letter-spacing: -0.01em;
//         }
//         .csd-build-stage-badge-bin {
//           font-family: var(--font-mono);
//           font-size: 10px;
//           padding: 3px 8px;
//           background: rgba(212,212,216,0.18);
//           color: #d4d4d8;
//           border-radius: 999px;
//           letter-spacing: 0.1em;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 4 — WHY TEAMS CHOOSE US
//            Clean, minimal layout (no heavy binary visuals).
//         ═══════════════════════════════════════════════════════════════ */
//         .csd-vp-section {
//           padding: 110px 20px;
//           background: #fafaf9;
//           color: #0a0a0a;
//           position: relative;
//           overflow: hidden;
//           border-top: 1px solid rgba(0,0,0,0.06);
//         }

//         .csd-vp-section::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(10,10,10,0.02) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(10,10,10,0.02) 1px, transparent 1px);
//           background-size: 72px 72px;
//           pointer-events: none;
//           mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 85%);
//           -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 85%);
//         }

//         /* Light-theme typography inside the section */
//         .csd-vp-section .csd-h2-light { color: #0a0a0a; }
//         .csd-vp-section .csd-italic-light { color: rgba(10,10,10,0.6); }
//         .csd-vp-section .csd-h2-lead-light { color: rgba(10,10,10,0.58); }

//         .csd-vp-inner {
//           max-width: 1320px;
//           margin: 0 auto;
//           position: relative;
//           z-index: 1;
//         }

//         .csd-vp-grid {
//           display: grid;
//           grid-template-columns: 0.95fr 1.05fr;
//           gap: 64px;
//           align-items: start;
//         }

//         .csd-vp-left {
//           display: flex;
//           flex-direction: column;
//           gap: 18px;
//         }

//         .csd-vp-right {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//           align-content: start;
//         }

//         .csd-vp-card {
//           padding: 22px 22px 24px;
//           border: 1px solid rgba(0,0,0,0.08);
//           border-radius: 16px;
//           background: rgba(255,255,255,0.9);
//           display: flex;
//           flex-direction: column;
//           gap: 10px;
//           min-height: 0;
//           transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s, background 0.2s;
//         }

//         .csd-vp-card:hover {
//           transform: translateY(-2px);
//           border-color: rgba(0,0,0,0.18);
//           box-shadow: 0 14px 32px rgba(10,10,10,0.08);
//           background: #fff;
//         }

//         .csd-vp-card-pill {
//           display: flex;
//           align-items: baseline;
//           justify-content: space-between;
//           gap: 12px;
//           padding: 10px 12px;
//           border-radius: 999px;
//           border: 1px solid rgba(0,0,0,0.08);
//           background: rgba(10,10,10,0.02);
//         }

//         .csd-vp-card-pill-value {
//           font-family: var(--font-display);
//           font-size: 22px;
//           font-weight: 500;
//           letter-spacing: -0.03em;
//           line-height: 1;
//           color: #0a0a0a;
//         }

//         .csd-vp-card-pill-label {
//           font-size: 11px;
//           font-weight: 700;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.45);
//           white-space: nowrap;
//         }

//         .csd-vp-card-title {
//           font-family: var(--font-display);
//           font-size: 20px;
//           font-weight: 500;
//           letter-spacing: -0.02em;
//           line-height: 1.25;
//           margin: 0;
//           color: #0a0a0a;
//         }

//         .csd-vp-card-desc {
//           font-size: 14.5px;
//           line-height: 1.7;
//           color: rgba(10,10,10,0.62);
//           margin: 0;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 7 — RESULTS
//         ═══════════════════════════════════════════════════════════════ */
//         .csd-results-section {
//           padding: 140px 20px;
//           background: #f5f5f4;
//           border-top: 1px solid rgba(0,0,0,0.06);
//         }
//         .csd-results-inner { max-width: 1320px; margin: 0 auto; }
//         .csd-results-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: end;
//           gap: 40px;
//           flex-wrap: wrap;
//           margin-bottom: 56px;
//         }

//         .csd-results-list {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }
//         .csd-result-card {
//           display: grid;
//           grid-template-columns: 240px 1fr;
//           gap: 24px;
//           padding: 32px 32px 36px;
//           background: #fff;
//           border: 1px solid rgba(10,10,10,0.1);
//           border-radius: 22px;
//           align-items: start;
//           transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
//           position: relative;
//           overflow: hidden;
//         }
//         .csd-result-card::before {
//           content: "";
//           position: absolute;
//           top: 0; left: 0; bottom: 0;
//           width: 3px;
//           background: #f472b6;
//           transform: scaleY(0);
//           transform-origin: top;
//           transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
//         }
//         .csd-result-card:hover {
//           transform: translateY(-4px);
//           border-color: rgba(10,10,10,0.22);
//           box-shadow: 0 24px 50px -28px rgba(10,10,10,0.22);
//         }
//         .csd-result-card:hover::before {
//           transform: scaleY(1);
//         }
//         .csd-result-num-wrap {
//           display: flex;
//           flex-direction: column;
//           gap: 8px;
//         }
//         .csd-result-index {
//           font-size: 11px;
//           color: rgba(10,10,10,0.4);
//           letter-spacing: 0.12em;
//           margin-bottom: 8px;
//         }
//         .csd-result-metric {
//           font-family: var(--font-display);
//           font-size: clamp(56px, 7vw, 96px);
//           font-weight: 500;
//           letter-spacing: -0.045em;
//           line-height: 0.92;
//           color: #0a0a0a;
//           font-variant-numeric: tabular-nums;
//         }
//         .csd-result-label {
//           font-family: var(--font-display);
//           font-size: 16px;
//           font-weight: 500;
//           letter-spacing: -0.012em;
//           color: rgba(10,10,10,0.65);
//           margin-top: 4px;
//         }
//         .csd-result-story {
//           padding-top: 28px;
//         }
//         .csd-result-project {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.55);
//           margin-bottom: 14px;
//           padding: 5px 12px;
//           border: 1px solid rgba(10,10,10,0.12);
//           border-radius: 999px;
//           background: rgba(10,10,10,0.02);
//         }
//         .csd-result-project-dot {
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: #f472b6;
//         }
//         .csd-result-desc {
//           font-size: 14.5px;
//           line-height: 1.65;
//           color: rgba(10,10,10,0.62);
//           margin: 0;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 8 — FAQs
//         ═══════════════════════════════════════════════════════════════ */
//         .csd-faq-section {
//           padding: 140px 20px;
//           background: #fafaf9;
//           border-top: 1px solid rgba(0,0,0,0.06);
//         }
//         .csd-faq-layout {
//           max-width: 1320px;
//           margin: 0 auto;
//           display: grid;
//           grid-template-columns: 360px 1fr;
//           gap: 80px;
//           align-items: start;
//         }
//         .csd-faq-aside { position: sticky; top: 120px; }
//         .csd-faq-lead { margin-bottom: 28px; }
//         .csd-faq-cta {
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
//         .csd-faq-cta:hover {
//           background: #0a0a0a;
//           color: #fafaf9;
//         }
//         .csd-faq-list {
//           display: flex;
//           flex-direction: column;
//           border-top: 1px solid rgba(10,10,10,0.1);
//         }
//         .csd-faq-row { border-bottom: 1px solid rgba(10,10,10,0.1); }
//         .csd-faq-q {
//           width: 100%;
//           display: grid;
//           grid-template-columns: 50px 1fr 30px;
//           align-items: center;
//           gap: 16px;
//           padding: 24px 0;
//           background: transparent;
//           border: 0;
//           cursor: pointer;
//           text-align: left;
//           color: #0a0a0a;
//           font-family: var(--font-display);
//         }
//         .csd-faq-q-num {
//           font-family: var(--font-mono);
//           font-size: 12px;
//           font-weight: 500;
//           color: rgba(10,10,10,0.4);
//           letter-spacing: 0.06em;
//         }
//         .csd-faq-q-text {
//           font-family: var(--font-display);
//           font-size: clamp(17px, 1.6vw, 21px);
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           line-height: 1.3;
//         }
//         .csd-faq-q-icon {
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
//         .csd-faq-row[data-open="true"] .csd-faq-q-icon {
//           transform: rotate(45deg);
//           background: #0a0a0a;
//           color: #fafaf9;
//           border-color: #0a0a0a;
//         }
//         .csd-faq-a {
//           display: grid;
//           grid-template-rows: 0fr;
//           transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .csd-faq-row[data-open="true"] .csd-faq-a {
//           grid-template-rows: 1fr;
//         }
//         .csd-faq-a-inner {
//           overflow: hidden;
//           padding-left: 66px;
//           font-family: var(--font-body);
//           font-size: 15px;
//           line-height: 1.7;
//           color: rgba(10,10,10,0.65);
//           padding-bottom: 0;
//           transition: padding-bottom 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .csd-faq-row[data-open="true"] .csd-faq-a-inner {
//           padding-bottom: 28px;
//         }

//         /* CTA mark */
//         .csd-cta-mark {
//           position: absolute;
//           right: 8%;
//           bottom: -6%;
//           display: flex;
//           align-items: center;
//           gap: clamp(8px, 1.4vw, 18px);
//           font-family: var(--font-display);
//           font-size: clamp(180px, 22vw, 380px);
//           font-weight: 500;
//           letter-spacing: -0.1em;
//           line-height: 0.8;
//           opacity: 0.07;
//           pointer-events: none;
//           z-index: 0;
//         }
//         .csd-cta-mark span:first-child { color: #fafaf9; }
//         .csd-cta-mark span:last-child {
//           color: transparent;
//           -webkit-text-stroke: 2px rgba(255,255,255,0.6);
//         }

//         /* Marquee */
//         .marquee-track { will-change: transform; }

//         /* ═══════════════════════════════════════════════════════════════
//            RESPONSIVE
//         ═══════════════════════════════════════════════════════════════ */
//         @media (max-width: 1100px) {
//           .csd-cap-row {
//             grid-template-columns: 60px 50px 1fr 30px;
//             gap: 18px;
//           }
//           .csd-cap-row-tags { display: none; }

//           .csd-build-grid { grid-template-columns: 1fr; gap: 56px; }
//           .csd-build-right { min-height: 480px; }

//           .csd-vp-grid { grid-template-columns: 1fr; gap: 48px; }
//           .csd-vp-tape { min-height: 240px; }

//           .csd-results-list { grid-template-columns: 1fr; }
//           .csd-result-card { grid-template-columns: 200px 1fr; }

//           .csd-faq-layout { grid-template-columns: 1fr; gap: 48px; }
//           .csd-faq-aside { position: static; }
//         }
//         @media (max-width: 900px) {
//           .csd-hero-main { grid-template-columns: 1fr; gap: 56px; }
//           .csd-hero-right { max-width: 760px; }
//         }
//         @media (max-width: 768px) {
//           .csd-hero { padding: 120px 14px 60px; min-height: auto; }
//           .csd-hero-inner { min-height: auto; }
//           .csd-hero-meta {
//             max-width: 100%;
//             align-items: flex-start;
//             border-radius: 18px;
//             line-height: 1.35;
//           }
//           .csd-hero-title { font-size: clamp(40px, 13vw, 62px); }
//           .csd-hero-main { gap: 40px; }
//           .csd-hero-card-head,
//           .csd-hero-binary-footer {
//             padding-left: 20px;
//             padding-right: 20px;
//           }
//           .csd-hero-blueprint { grid-template-columns: 1fr; padding: 18px; }
//           .csd-hero-binary-footer {
//             align-items: flex-start;
//             flex-direction: column;
//           }
//           .csd-hero-binary-foot-v { text-align: left; }

//           .csd-cap-section,
//           .csd-build-section,
//           .csd-vp-section,
//           .csd-results-section,
//           .csd-faq-section {
//             padding-left: 14px;
//             padding-right: 14px;
//             padding-top: 90px;
//             padding-bottom: 90px;
//           }

//           /* Make just the 6-sub-service section more compact */
//           .csd-cap-section {
//             padding-top: 70px;
//             padding-bottom: 70px;
//           }

//           .csd-cap-row {
//             grid-template-columns: 1fr 30px;
//             gap: 12px;
//             padding: 22px 14px;
//           }
//           .csd-cap-row-bin,
//           .csd-cap-row-num { display: none; }
//           .csd-cap-row-title { font-size: 19px; }

//           .csd-build-list { border-top: none; }
//           .csd-build-row {
//             grid-template-columns: 40px 1fr;
//             padding: 18px 0;
//           }
//           .csd-build-row-bin { font-size: 11px; padding-top: 4px; }
//           .csd-build-row-label { font-size: 19px; }
//           .csd-build-row-desc { font-size: 13px; }

//           .csd-build-right { min-height: 360px; }
//           .csd-build-frame-saas      { width: 56%; }
//           .csd-build-frame-dashboard { width: 50%; }
//           .csd-build-frame-mobile    { width: 30%; }
//           .csd-build-frame-internal  { width: 50%; }
//           .csd-build-frame-mvp       { width: 44%; }
//           .csd-build-frame-market    { width: 42%; }

//           .csd-vp-right { grid-template-columns: 1fr; }
//           .csd-vp-card { min-height: auto; }
//           .csd-vp-tape { min-height: 200px; }

//           .csd-result-card {
//             grid-template-columns: 1fr;
//             padding: 26px 22px 28px;
//             gap: 12px;
//           }
//           .csd-result-story { padding-top: 4px; }

//           .csd-faq-q { grid-template-columns: 36px 1fr 26px; gap: 12px; padding: 20px 0; }
//           .csd-faq-q-icon { width: 26px; height: 26px; }
//           .csd-faq-a-inner { padding-left: 48px; font-size: 14px; }
//           .csd-faq-row[data-open="true"] .csd-faq-a-inner { padding-bottom: 22px; }

//           .csd-process-pin {
//             height: auto !important;
//             overflow: visible !important;
//           }
//           .csd-process-pin > div:first-of-type { padding: 80px 14px 32px !important; }
//           .csd-process-track {
//             flex-direction: column !important;
//             padding: 0 14px 60px !important;
//             transform: none !important;
//             gap: 16px !important;
//             width: 100% !important;
//           }
//           .csd-process-track > div { flex: 1 1 auto !important; }
//           .csd-process-card {
//             width: 100% !important;
//             height: auto !important;
//             min-height: 320px !important;
//           }
//           .csd-cta-inner { padding: 64px 26px !important; border-radius: 18px !important; }
//           .csd-cta-inner > div > div[style*="repeat(3, 1fr)"] {
//             grid-template-columns: 1fr !important;
//             gap: 18px !important;
//           }
//         }
//       `}</style>
//     </>
//   );
// }

// // ────────────────────────────────────────────────────────────────────────────
// // BuildFrame — small device/window mockup component used inside the
// // "What we build" stage. Kept inline to this file so the page is one drop-in.
// // ────────────────────────────────────────────────────────────────────────────
// type BuildVariant = "saas" | "dashboard" | "mobile" | "internal" | "mvp" | "market";

// function BuildFrame({
//   index,
//   active,
//   variant,
//   label,
// }: {
//   index: number;
//   active: boolean;
//   variant: BuildVariant;
//   label: string;
// }) {
//   return (
//     <div
//       className={`csd-build-frame csd-build-frame-${variant}`}
//       data-active={active ? "true" : "false"}
//       style={{ ["--idx" as never]: index }}
//     >
//       <div className="csd-build-frame-head">
//         <div className="csd-build-frame-dots">
//           <span /><span /><span />
//         </div>
//         <span className="csd-build-frame-name">{label}</span>
//       </div>
//       <div className="csd-build-frame-body">
//         {variant === "saas" && (
//           <>
//             <div className="csd-bf-bar-pink" style={{ width: "70%" }} />
//             <div className="csd-bf-bar" style={{ width: "100%" }} />
//             <div className="csd-bf-bar" style={{ width: "85%" }} />
//             <div className="csd-bf-bar" style={{ width: "60%" }} />
//           </>
//         )}
//         {variant === "dashboard" && (
//           <>
//             <div className="csd-bf-grid">
//               <div /><div /><div />
//               <div /><div /><div />
//             </div>
//             <div className="csd-bf-chart">
//               <span style={{ height: "30%" }} />
//               <span style={{ height: "60%" }} />
//               <span style={{ height: "45%" }} />
//               <span style={{ height: "80%" }} />
//               <span style={{ height: "55%" }} />
//               <span style={{ height: "90%" }} />
//               <span style={{ height: "65%" }} />
//             </div>
//           </>
//         )}
//         {variant === "mobile" && (
//           <>
//             <div className="csd-bf-mobile-circle" />
//             <div className="csd-bf-mobile-bar" style={{ width: "80%", margin: "0 auto" }} />
//             <div className="csd-bf-mobile-bar" style={{ width: "60%", margin: "4px auto 0" }} />
//             <div style={{ height: 8 }} />
//             <div className="csd-bf-bar-pink" style={{ width: "100%" }} />
//           </>
//         )}
//         {variant === "internal" && (
//           <>
//             <div className="csd-bf-bar" style={{ width: "100%" }} />
//             <div className="csd-bf-bar" style={{ width: "100%" }} />
//             <div className="csd-bf-bar-pink" style={{ width: "55%" }} />
//             <div className="csd-bf-bar" style={{ width: "100%" }} />
//             <div className="csd-bf-bar" style={{ width: "75%" }} />
//           </>
//         )}
//         {variant === "mvp" && (
//           <>
//             <div className="csd-bf-bar-pink" style={{ width: "40%" }} />
//             <div className="csd-bf-bar" style={{ width: "100%" }} />
//             <div className="csd-bf-bar" style={{ width: "100%" }} />
//           </>
//         )}
//         {variant === "market" && (
//           <div className="csd-bf-grid">
//             <div /><div /><div />
//             <div /><div /><div />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
      setupBatchReveal(".csd-vp-card", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "top 88%");
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
          <div className="csd-vp-inner">
            <div className="csd-vp-grid">
              <div className="csd-vp-left">
                <div className="csd-sh">
                  <h2 id="csd-vp-title" className="csd-h2 csd-h2-light">
                    Why teams <span className="csd-italic-light">choose us</span>.
                  </h2>
                  <p className="csd-h2-lead csd-h2-lead-light">
                    We help businesses grow through reliable delivery: faster performance, scalable architecture,
                    consistent UX, and a cadence your team can trust.
                  </p>
                </div>
              </div>

              <div className="csd-vp-right" role="list" aria-label="What drives growth">
                {VALUE_PROPS.map((v) => (
                  <div key={v.id} className="csd-vp-card" role="listitem">
                    <div className="csd-vp-card-pill" aria-hidden>
                      <span className="csd-vp-card-pill-value">{v.metric}</span>
                      <span className="csd-vp-card-pill-label">{v.metricLabel}</span>
                    </div>
                    <h3 className="csd-vp-card-title">{v.title}</h3>
                    <p className="csd-vp-card-desc">{v.desc}</p>
                  </div>
                ))}
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
              <div>
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
                  <div className="csd-result-num-wrap">
                    <div className="csd-result-index">
                      <span style={{ fontFamily: "var(--font-mono)" }}>R-{String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="csd-result-metric">{r.metric}</div>
                    <div className="csd-result-label">{r.label}</div>
                  </div>
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
           VALUE PROPS
        ═══════════════════════════════════════════════════════════════ */
        .csd-vp-section {
          padding: 110px 20px;
          background: #fafaf9;
          color: #0a0a0a;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .csd-vp-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(10,10,10,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10,10,10,0.02) 1px, transparent 1px);
          background-size: 72px 72px;
          pointer-events: none;
          mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 50% 0%, black 0%, transparent 85%);
        }
        .csd-vp-section .csd-h2-light { color: #0a0a0a; }
        .csd-vp-section .csd-italic-light { color: rgba(10,10,10,0.6); }
        .csd-vp-section .csd-h2-lead-light { color: rgba(10,10,10,0.58); }

        .csd-vp-inner {
          max-width: 1320px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        .csd-vp-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 64px;
          align-items: start;
        }
        .csd-vp-left {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .csd-vp-right {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          align-content: start;
        }
        .csd-vp-card {
          padding: 22px 22px 24px;
          border: 1px solid rgba(0,0,0,0.08);
          border-radius: 16px;
          background: rgba(255,255,255,0.9);
          display: flex;
          flex-direction: column;
          gap: 10px;
          min-height: 0;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .csd-vp-card:hover {
          transform: translateY(-2px);
          border-color: rgba(0,0,0,0.18);
          box-shadow: 0 14px 32px rgba(10,10,10,0.08);
          background: #fff;
        }
        .csd-vp-card-pill {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.08);
          background: rgba(10,10,10,0.02);
        }
        .csd-vp-card-pill-value {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1;
          color: #0a0a0a;
        }
        .csd-vp-card-pill-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.45);
          white-space: nowrap;
        }
        .csd-vp-card-title {
          font-family: var(--font-display);
          font-size: 20px;
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.25;
          margin: 0;
          color: #0a0a0a;
        }
        .csd-vp-card-desc {
          font-size: 14.5px;
          line-height: 1.7;
          color: rgba(10,10,10,0.62);
          margin: 0;
        }

        /* ═══════════════════════════════════════════════════════════════
           RESULTS
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
        .csd-result-card:hover::before { transform: scaleY(1); }
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
        .csd-result-story { padding-top: 28px; }
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

          .csd-vp-grid { grid-template-columns: 1fr; gap: 48px; }

          .csd-results-list { grid-template-columns: 1fr; }
          .csd-result-card { grid-template-columns: 200px 1fr; }

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
          .csd-vp-section,
          .csd-results-section,
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

          .csd-vp-right { grid-template-columns: 1fr; }
          .csd-vp-card { min-height: auto; }

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