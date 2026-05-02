// // Careers — Tech Binaries
// // Premium, editorial-feel careers page. Distinct from the service pages —
// // no hero form, no card grids, no service-page motifs. The visual language
// // here is: oversized typography, ticker marquees, accept/reject filing cards,
// // numbered manifesto, asymmetric image mosaic.
// //
// // Image assets expected at:
// //   /images/careers/careers-hero-section.jpeg          (desktop)
// //   /images/careers/careers-hero-section-mobile.jpeg   (mobile)
// "use client";

// import { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Lenis from "@studio-freight/lenis";
// import Image from "next/image";
// import Link from "next/link";
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";

// gsap.registerPlugin(ScrollTrigger);

// // ── DATA ──────────────────────────────────────────────────────────────────────

// const HERO = {
//   bin: "Careers",
//   index: "01 / 05",
//   // Headline split for character-by-character reveal
//   // Structured so the italic line breaks last for emphasis
//   headline1: "We write code.",
//   headline2: "We don't",
//   headlineItalic: "cut corners.",
//   lead:
//     "Most software shops take your brief, disappear for weeks, and deliver something that needs fixing before it's even live. Tech Binaries works differently. We're a team of engineers and builders who treat every line of code like it has our name on it — because it does.",
//   pullQuote:
//     "We're not looking for people who want a job. We're looking for people who want ownership.",
//   // Marquee values — short, repeatable, tone-setting
//   ticker: [
//     "Ownership",
//     "Precision",
//     "Craft",
//     "Honesty",
//     "Velocity",
//     "Standards",
//     "No-bullshit",
//     "Builders",
//   ],
// };

// const FILTER = {
//   bin: "Who gets in",
//   index: "02 / 05",
//   title: "We hire",
//   titleAccent: "deliberately.",
//   lead:
//     "We're a small, deliberate team. That means one wrong hire costs more than one open seat. We'd rather run lean with people who care than scale fast with people who don't.",
//   yes: {
//     label: "You'll fit right in if",
//     items: [
//       "You obsess over clean architecture",
//       "You lose sleep over broken builds",
//       "You get genuinely annoyed when something ships half-baked",
//       "You prefer hard truths over comfortable nonsense",
//       "You ship — and you stand behind what you ship",
//     ],
//   },
//   no: {
//     label: "This isn't for you if",
//     items: [
//       "You're looking for a place to coast",
//       "You think 'good enough' is good enough",
//       "You'd rather be busy than effective",
//       "You expect titles to do the work for you",
//       "You're allergic to feedback",
//     ],
//   },
// };

// const DNA = {
//   bin: "The standard",
//   index: "03 / 05",
//   title: "The Tech Binaries",
//   titleAccent: "standard.",
//   lead:
//     "Five non-negotiables. They're not posters on a wall — they're how we hire, how we ship, and how we tell each other the truth.",
//   values: [
//     {
//       n: "I",
//       head: "Precision over speed",
//       body: "We move fast, but we don't move sloppy. Quality isn't a phase — it's the default. A shipped feature that breaks under load is worse than a delayed one that holds.",
//     },
//     {
//       n: "II",
//       head: "Own the problem, not the task",
//       body: "Your job isn't to close tickets. It's to solve what's actually broken. Tickets are descriptions of problems — not contracts that limit your responsibility.",
//     },
//     {
//       n: "III",
//       head: "No rank, just results",
//       body: "The best idea wins, regardless of who said it. Junior engineers push back on architecture decisions here — that's expected, not tolerated.",
//     },
//     {
//       n: "IV",
//       head: "Sharpen or stagnate",
//       body: "The industry moves. Either you're keeping up or you're falling behind. We invest in people who invest in themselves — and we expect that investment to compound.",
//     },
//     {
//       n: "V",
//       head: "Say it straight",
//       body: "No politics, no ego protection, no sugarcoating. If something's wrong, we say it — and fix it. Direct feedback is a sign of respect; silence is the real disrespect.",
//     },
//   ],
// };

// const LIFE = {
//   bin: "What it's like",
//   index: "04 / 05",
//   title: "Working here,",
//   titleAccent: "honestly.",
//   lead:
//     "A short list because we'd rather over-deliver than over-promise. These are the things we actually do — not the things every careers page says.",
//   benefits: [
//     {
//       tag: "Real work",
//       h: "Real projects, real stakes",
//       d: "You'll work on software that actual businesses depend on. Production systems, real users, real revenue. Not internal tools no one uses.",
//       visual:
//         "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&auto=format&fit=crop",
//       visualAlt: "Team collaborating on production software",
//     },
//     {
//       tag: "Growth",
//       h: "We pay for your growth",
//       d: "Courses, certifications, conferences. If it makes you better, we'll back it. Our budget for learning isn't a perk — it's a line item.",
//       visual:
//         "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80&auto=format&fit=crop",
//       visualAlt: "Books and notebooks for continued learning",
//     },
//     {
//       tag: "Comp",
//       h: "Competitive salary + bonuses",
//       d: "Good work gets rewarded. Performance bonuses are paid against shipped outcomes — not just at annual reviews when budgets allow.",
//       visual:
//         "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&auto=format&fit=crop",
//       visualAlt: "Financial reward and compensation",
//     },
//     {
//       tag: "Boundaries",
//       h: "Work that respects your life",
//       d: "High standards during work hours. Your time outside them is yours. We don't message on weekends and we don't make heroes out of people who burn out.",
//       visual:
//         "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=80&auto=format&fit=crop",
//       visualAlt: "Quiet workspace with natural light",
//     },
//   ],
// };

// const APPLY = {
//   bin: "Apply",
//   index: "05 / 05",
//   // Headline split for character reveal
//   headlineLead: "Ready to work",
//   headlineItalic: "on something real?",
//   lead:
//     "We're always on the lookout for developers, engineers, and problem-solvers who want to build things that last. Browse current openings — or if you don't see your role, send your work directly. If you're good, we'll find a way.",
//   primaryCta: { label: "View open positions", href: "/careers/positions" },
//   email: "careers@techbinaries.com",
//   microMeta: [
//     { k: "Reply",     v: "Within 5 days" },
//     { k: "Process",   v: "3 conversations" },
//     { k: "Decision",  v: "Within 2 weeks" },
//     { k: "Location",  v: "Global · remote" },
//   ],
// };

// // ── COMPONENT ────────────────────────────────────────────────────────────────

// export default function CareersPage() {
//   const [activeValue, setActiveValue] = useState(0);
//   const lenisRef = useRef<Lenis | null>(null);

//   // Refs
//   const heroRef = useRef<HTMLElement | null>(null);
//   const tickerRef = useRef<HTMLDivElement | null>(null);
//   const valuesListRef = useRef<HTMLOListElement | null>(null);

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

//   // ── HERO INTRO + TICKER ──
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Hero character reveal
//       const tl = gsap.timeline({ delay: 0.2 });
//       const chars = gsap.utils.toArray<HTMLElement>(".cr-hero-char");
//       tl.fromTo(
//         chars,
//         { yPercent: 110, opacity: 0 },
//         {
//           yPercent: 0,
//           opacity: 1,
//           duration: 1,
//           stagger: { each: 0.014 },
//           ease: "power4.out",
//         },
//         0
//       );
//       tl.fromTo(
//         ".cr-hero-fade",
//         { opacity: 0, y: 24 },
//         { opacity: 1, y: 0, duration: 0.85, stagger: 0.1, ease: "power3.out" },
//         0.7
//       );
//       tl.fromTo(
//         ".cr-hero-meta",
//         { opacity: 0 },
//         { opacity: 1, duration: 0.6, ease: "power2.out" },
//         0.3
//       );

//       // Hero image parallax — gentle
//       gsap.to(".cr-hero-bg", {
//         yPercent: 12,
//         ease: "none",
//         scrollTrigger: {
//           trigger: ".cr-hero",
//           start: "top top",
//           end: "bottom top",
//           scrub: 0.6,
//         },
//       });

//       // Ticker marquee — infinite horizontal scroll
//       const ticker = tickerRef.current;
//       if (ticker) {
//         const inner = ticker.querySelector<HTMLDivElement>(".cr-ticker-track");
//         if (inner) {
//           // Calculate the width of one set, then animate by negative that
//           const firstChild = inner.children[0] as HTMLElement | null;
//           if (firstChild) {
//             const setWidth = firstChild.offsetWidth;
//             gsap.to(inner, {
//               x: -setWidth,
//               duration: 28,
//               ease: "none",
//               repeat: -1,
//             });
//           }
//         }
//       }
//     });
//     return () => ctx.revert();
//   }, []);

//   // ── SECTION REVEALS ──
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Generic reveal helper
//       const setupBatch = (
//         selector: string,
//         from: gsap.TweenVars,
//         to: gsap.TweenVars,
//         start = "top 86%"
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

//       // Section headers
//       setupBatch(
//         ".cr-sh",
//         { opacity: 0, y: 40 },
//         { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" }
//       );

//       // Filter cards (yes/no)
//       setupBatch(
//         ".cr-filter-card",
//         { opacity: 0, y: 30, scale: 0.97 },
//         { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
//         "top 82%"
//       );

//       // Filter list items — ladder reveal
//       gsap.utils.toArray<HTMLElement>(".cr-filter-card").forEach((card) => {
//         const items = card.querySelectorAll(".cr-filter-item");
//         gsap.fromTo(
//           items,
//           { opacity: 0, x: -16 },
//           {
//             opacity: 1,
//             x: 0,
//             duration: 0.55,
//             ease: "power3.out",
//             stagger: 0.07,
//             scrollTrigger: { trigger: card, start: "top 80%", once: true },
//           }
//         );
//       });

//       // DNA value rows
//       setupBatch(
//         ".cr-dna-row",
//         { opacity: 0, x: -28 },
//         { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" },
//         "top 88%"
//       );

//       // Life mosaic items
//       gsap.utils.toArray<HTMLElement>(".cr-life-item").forEach((el, i) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 40, scale: 0.98 },
//           {
//             opacity: 1,
//             y: 0,
//             scale: 1,
//             duration: 1,
//             ease: "power3.out",
//             delay: i % 2 === 0 ? 0 : 0.12,
//             scrollTrigger: { trigger: el, start: "top 84%", once: true },
//           }
//         );
//       });

//       // Apply hero — character reveal on scroll
//       const applyChars = gsap.utils.toArray<HTMLElement>(".cr-apply-char");
//       if (applyChars.length) {
//         gsap.fromTo(
//           applyChars,
//           { yPercent: 110, opacity: 0 },
//           {
//             yPercent: 0,
//             opacity: 1,
//             duration: 0.95,
//             stagger: { each: 0.013 },
//             ease: "power4.out",
//             scrollTrigger: { trigger: ".cr-apply", start: "top 75%", once: true },
//           }
//         );
//       }
//       // Apply rule sweep
//       gsap.fromTo(
//         ".cr-apply-rule",
//         { scaleX: 0 },
//         {
//           scaleX: 1,
//           duration: 1.1,
//           ease: "power3.out",
//           transformOrigin: "left center",
//           scrollTrigger: { trigger: ".cr-apply", start: "top 72%", once: true },
//         }
//       );
//       gsap.utils.toArray<HTMLElement>(".cr-apply-fade").forEach((el, i) => {
//         gsap.fromTo(
//           el,
//           { opacity: 0, y: 18 },
//           {
//             opacity: 1,
//             y: 0,
//             duration: 0.75,
//             ease: "power3.out",
//             delay: 0.5 + i * 0.08,
//             scrollTrigger: { trigger: ".cr-apply", start: "top 75%", once: true },
//           }
//         );
//       });
//     });
//     return () => ctx.revert();
//   }, []);

//   // ── DNA SCROLL-LINKED ACTIVE STATE ──
//   // As user scrolls through the manifesto, highlight the row in view.
//   useEffect(() => {
//     const list = valuesListRef.current;
//     if (!list) return;

//     const ctx = gsap.context(() => {
//       const rows = gsap.utils.toArray<HTMLElement>(".cr-dna-row", list);
//       if (!rows.length) return;

//       rows.forEach((row, i) => {
//         ScrollTrigger.create({
//           trigger: row,
//           start: "top 70%",
//           end: "bottom 30%",
//           onEnter: () => setActiveValue(i),
//           onEnterBack: () => setActiveValue(i),
//         });
//       });
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
//       {/* Grain overlay — same as service pages */}
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

//         <main id="main-content">
//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 1 — HERO (Opening Hook)
//             Full-bleed image, oversized typography, marquee ticker.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section ref={heroRef} className="cr-hero" aria-labelledby="cr-hero-title">
//           <div className="cr-hero-bg" aria-hidden>
//             <picture>
//               <source
//                 media="(max-width: 900px)"
//                 srcSet="/images/careers/careers-hero-section-mobile.jpeg"
//               />
//               <Image
//                 src="/images/careers/careers-hero-section.jpeg"
//                 alt=""
//                 fill
//                 priority
//                 sizes="100vw"
//                 className="cr-hero-photo"
//               />
//             </picture>
//             <div className="cr-hero-bg-overlay" />
//             <div className="cr-hero-bg-vignette" />
//           </div>

//           <div className="cr-hero-inner">
//             <div className="cr-hero-meta" style={{ opacity: 0 }}>
//               <span className="cr-hero-bin">
//                 <span className="cr-hero-bin-dot" />
//                 {HERO.bin}
//               </span>
//               <span className="cr-hero-index">{HERO.index}</span>
//             </div>

//             <h1 id="cr-hero-title" className="cr-hero-title">
//               <span className="cr-hero-line">
//                 {HERO.headline1.split("").map((c, i) => (
//                   <span key={`a-${i}`} className="cr-hero-char">
//                     {c === " " ? "\u00A0" : c}
//                   </span>
//                 ))}
//               </span>
//               <span className="cr-hero-line">
//                 {HERO.headline2.split("").map((c, i) => (
//                   <span key={`b-${i}`} className="cr-hero-char">
//                     {c === " " ? "\u00A0" : c}
//                   </span>
//                 ))}{" "}
//                 <span className="cr-hero-italic">
//                   {HERO.headlineItalic.split("").map((c, i) => (
//                     <span key={`c-${i}`} className="cr-hero-char">
//                       {c === " " ? "\u00A0" : c}
//                     </span>
//                   ))}
//                 </span>
//               </span>
//             </h1>

//             <div className="cr-hero-bottom">
//               <p className="cr-hero-fade cr-hero-lead" style={{ opacity: 0 }}>
//                 {HERO.lead}
//               </p>

//               <blockquote
//                 className="cr-hero-fade cr-hero-pull"
//                 style={{ opacity: 0 }}
//               >
//                 <span className="cr-hero-pull-mark" aria-hidden>
//                   ¶
//                 </span>
//                 <p>{HERO.pullQuote}</p>
//               </blockquote>
//             </div>
//           </div>

//           {/* Ticker marquee at the very bottom of hero */}
//           <div className="cr-ticker" ref={tickerRef} aria-hidden>
//             <div className="cr-ticker-track">
//               {/* Two consecutive sets so loop is seamless */}
//               {[0, 1].map((set) => (
//                 <div key={set} className="cr-ticker-set">
//                   {HERO.ticker.map((t, i) => (
//                     <span key={`${set}-${i}`} className="cr-ticker-item">
//                       <span>{t}</span>
//                       <span className="cr-ticker-dot" aria-hidden>
//                         ●
//                       </span>
//                     </span>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 2 — WHO GETS IN (Filing cards: yes / no)
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cr-filter" aria-labelledby="cr-filter-title">
//           <div className="cr-filter-inner">
//             <div className="cr-sh cr-section-head">
//               <div className="cr-section-meta">
//                 <span className="cr-section-bin">{FILTER.bin}</span>
//                 <span className="cr-section-rule" aria-hidden />
//                 <span className="cr-section-index">{FILTER.index}</span>
//               </div>
//               <h2 id="cr-filter-title" className="cr-h2">
//                 {FILTER.title}{" "}
//                 <span className="cr-italic-mute">{FILTER.titleAccent}</span>
//               </h2>
//               <p className="cr-h2-lead">{FILTER.lead}</p>
//             </div>

//             <div className="cr-filter-grid">
//               {/* YES card */}
//               <article
//                 className="cr-filter-card"
//                 data-tone="yes"
//                 aria-label="You'll fit right in if"
//               >
//                 <header className="cr-filter-card-head">
//                   <span className="cr-filter-stamp" aria-hidden>
//                     <svg width="18" height="18" viewBox="0 0 18 18">
//                       <path
//                         d="M4 9.5 L7.5 13 L14 5.5"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </span>
//                   <span className="cr-filter-card-label">{FILTER.yes.label}</span>
//                 </header>
//                 <ul className="cr-filter-list" role="list">
//                   {FILTER.yes.items.map((it, i) => (
//                     <li key={i} className="cr-filter-item">
//                       <span className="cr-filter-item-num">
//                         {String(i + 1).padStart(2, "0")}
//                       </span>
//                       <span className="cr-filter-item-text">{it}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </article>

//               {/* NO card */}
//               <article
//                 className="cr-filter-card"
//                 data-tone="no"
//                 aria-label="This isn't for you if"
//               >
//                 <header className="cr-filter-card-head">
//                   <span className="cr-filter-stamp" aria-hidden>
//                     <svg width="18" height="18" viewBox="0 0 18 18">
//                       <path
//                         d="M5 5 L13 13 M13 5 L5 13"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         strokeLinecap="round"
//                       />
//                     </svg>
//                   </span>
//                   <span className="cr-filter-card-label">{FILTER.no.label}</span>
//                 </header>
//                 <ul className="cr-filter-list" role="list">
//                   {FILTER.no.items.map((it, i) => (
//                     <li key={i} className="cr-filter-item">
//                       <span className="cr-filter-item-num">
//                         {String(i + 1).padStart(2, "0")}
//                       </span>
//                       <span className="cr-filter-item-text">{it}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </article>
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 3 — DNA / VALUES (Numbered manifesto)
//             Dark theme to break up the page rhythm.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cr-dna" aria-labelledby="cr-dna-title">
//           <div className="cr-dna-inner">
//             <div className="cr-sh cr-section-head cr-section-head--light">
//               <div className="cr-section-meta">
//                 <span className="cr-section-bin cr-section-bin--light">
//                   {DNA.bin}
//                 </span>
//                 <span className="cr-section-rule cr-section-rule--light" aria-hidden />
//                 <span className="cr-section-index cr-section-index--light">
//                   {DNA.index}
//                 </span>
//               </div>
//               <h2 id="cr-dna-title" className="cr-h2 cr-h2--light">
//                 {DNA.title}{" "}
//                 <span className="cr-italic-light">{DNA.titleAccent}</span>
//               </h2>
//               <p className="cr-h2-lead cr-h2-lead--light">{DNA.lead}</p>
//             </div>

//             <ol className="cr-dna-list" ref={valuesListRef}>
//               {DNA.values.map((v, i) => (
//                 <li
//                   key={v.n}
//                   className="cr-dna-row"
//                   data-active={activeValue === i ? "true" : "false"}
//                 >
//                   <div className="cr-dna-num" aria-hidden>
//                     <span>{v.n}</span>
//                   </div>
//                   <div className="cr-dna-body">
//                     <h3 className="cr-dna-head">{v.head}</h3>
//                     <p className="cr-dna-text">{v.body}</p>
//                   </div>
//                   <div className="cr-dna-line" aria-hidden />
//                 </li>
//               ))}
//             </ol>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 4 — WHAT WORKING HERE LOOKS LIKE
//             Asymmetric mosaic — each item alternates image-left / image-right.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cr-life" aria-labelledby="cr-life-title">
//           <div className="cr-life-inner">
//             <div className="cr-sh cr-section-head">
//               <div className="cr-section-meta">
//                 <span className="cr-section-bin">{LIFE.bin}</span>
//                 <span className="cr-section-rule" aria-hidden />
//                 <span className="cr-section-index">{LIFE.index}</span>
//               </div>
//               <h2 id="cr-life-title" className="cr-h2">
//                 {LIFE.title} <span className="cr-italic-mute">{LIFE.titleAccent}</span>
//               </h2>
//               <p className="cr-h2-lead">{LIFE.lead}</p>
//             </div>

//             <div className="cr-life-grid">
//               {LIFE.benefits.map((b, i) => (
//                 <article
//                   key={b.h}
//                   className="cr-life-item"
//                   data-side={i % 2 === 0 ? "L" : "R"}
//                 >
//                   <div className="cr-life-visual">
//                     <Image
//                       src={b.visual}
//                       alt={b.visualAlt}
//                       fill
//                       sizes="(max-width: 900px) 100vw, 45vw"
//                       className="cr-life-img"
//                     />
//                     <div className="cr-life-visual-overlay" />
//                     <span className="cr-life-tag">{b.tag}</span>
//                   </div>
//                   <div className="cr-life-body">
//                     <span className="cr-life-num" aria-hidden>
//                       {String(i + 1).padStart(2, "0")}
//                     </span>
//                     <h3 className="cr-life-h">{b.h}</h3>
//                     <p className="cr-life-d">{b.d}</p>
//                   </div>
//                 </article>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ═══════════════════════════════════════════════════════════════
//             SECTION 5 — APPLY (Open Roles + Fallback)
//             Editorial closing statement, single CTA, mailto fallback.
//         ═══════════════════════════════════════════════════════════════ */}
//         <section className="cr-apply" aria-labelledby="cr-apply-title">
//           <div className="cr-apply-inner">
//             <div className="cr-apply-top cr-apply-fade" style={{ opacity: 0 }}>
//               <span className="cr-apply-bin">{APPLY.bin}</span>
//               <span className="cr-apply-rule" aria-hidden />
//               <span className="cr-apply-index">{APPLY.index}</span>
//             </div>

//             <h2 id="cr-apply-title" className="cr-apply-title">
//               <span className="cr-apply-line">
//                 {APPLY.headlineLead.split("").map((c, i) => (
//                   <span key={`a-${i}`} className="cr-apply-char">
//                     {c === " " ? "\u00A0" : c}
//                   </span>
//                 ))}
//               </span>
//               <span className="cr-apply-line">
//                 <span className="cr-apply-italic">
//                   {APPLY.headlineItalic.split("").map((c, i) => (
//                     <span key={`b-${i}`} className="cr-apply-char">
//                       {c === " " ? "\u00A0" : c}
//                     </span>
//                   ))}
//                 </span>
//               </span>
//             </h2>

//             <p className="cr-apply-fade cr-apply-lead" style={{ opacity: 0 }}>
//               {APPLY.lead}
//             </p>

//             <div
//               className="cr-apply-fade cr-apply-actions"
//               style={{ opacity: 0 }}
//             >
//               <Link href={APPLY.primaryCta.href} className="cr-apply-btn">
//                 <span className="cr-apply-btn-label">
//                   {APPLY.primaryCta.label}
//                 </span>
//                 <span className="cr-apply-btn-arrow" aria-hidden>
//                   <svg width="14" height="14" viewBox="0 0 14 14">
//                     <path
//                       d="M3 7h8 M7 3l4 4-4 4"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.5"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                 </span>
//               </Link>

//               <a href={`mailto:${APPLY.email}`} className="cr-apply-mail">
//                 <span className="cr-apply-mail-k">or send your work to</span>
//                 <span className="cr-apply-mail-v">{APPLY.email}</span>
//               </a>
//             </div>

//             <dl className="cr-apply-fade cr-apply-meta" style={{ opacity: 0 }}>
//               {APPLY.microMeta.map((m) => (
//                 <div key={m.k} className="cr-apply-meta-row">
//                   <dt>{m.k}</dt>
//                   <dd>{m.v}</dd>
//                 </div>
//               ))}
//             </dl>
//           </div>
//         </section>
//         </main>

//         <SiteFooter />
//       </div>

//       <style>{`
//         /* ═══════════════════════════════════════════════════════════════
//            DESIGN TOKENS (page-scoped to avoid conflicts)
//         ═══════════════════════════════════════════════════════════════ */
//         .cr-h2 {
//           font-family: var(--font-display);
//           font-size: clamp(34px, 4.6vw, 64px);
//           font-weight: 500;
//           letter-spacing: -0.034em;
//           line-height: 1.02;
//           margin: 18px 0 18px;
//           max-width: 780px;
//         }
//         .cr-h2--light { color: #fafaf9; max-width: 820px; }
//         .cr-italic-mute {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(10,10,10,0.5);
//         }
//         .cr-italic-light {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(255,255,255,0.55);
//         }
//         .cr-h2-lead {
//           font-size: 16px;
//           color: rgba(10,10,10,0.62);
//           line-height: 1.7;
//           margin: 0;
//           max-width: 580px;
//         }
//         .cr-h2-lead--light {
//           color: rgba(255,255,255,0.62);
//           max-width: 580px;
//         }

//         .cr-section-head {
//           display: flex;
//           flex-direction: column;
//           gap: 0;
//           margin-bottom: clamp(48px, 6vw, 80px);
//         }
//         .cr-section-head--light .cr-h2 { color: #fafaf9; }

//         .cr-section-meta {
//           display: flex;
//           align-items: center;
//           gap: 16px;
//           margin-bottom: 4px;
//         }
//         .cr-section-bin {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.16em;
//           text-transform: uppercase;
//           color: #0a0a0a;
//           padding: 5px 11px;
//           border: 1px solid rgba(10,10,10,0.18);
//           border-radius: 999px;
//           white-space: nowrap;
//         }
//         .cr-section-bin--light {
//           color: #fafaf9;
//           border-color: rgba(255,255,255,0.25);
//         }
//         .cr-section-rule {
//           display: block;
//           flex: 1 1 auto;
//           height: 1px;
//           background: rgba(10,10,10,0.15);
//         }
//         .cr-section-rule--light { background: rgba(255,255,255,0.18); }
//         .cr-section-index {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           letter-spacing: 0.08em;
//           color: rgba(10,10,10,0.45);
//           white-space: nowrap;
//         }
//         .cr-section-index--light { color: rgba(255,255,255,0.45); }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 1 — HERO
//         ═══════════════════════════════════════════════════════════════ */
//         .cr-hero {
//           position: relative;
//           min-height: 100vh;
//           padding: clamp(150px, 17vh, 200px) 20px 96px;
//           background: #0a0a0a;
//           color: #fafaf9;
//           overflow: hidden;
//           isolation: isolate;
//         }
//         .cr-hero-bg {
//           position: absolute;
//           inset: -10% 0 0 0;
//           height: 110%;
//           z-index: 0;
//           will-change: transform;
//         }
//         .cr-hero-bg picture {
//           display: block;
//           position: relative;
//           width: 100%;
//           height: 100%;
//         }
//         .cr-hero-bg picture > span {
//           display: block !important;
//           width: 100%;
//           height: 100%;
//         }
//         .cr-hero-photo {
//           object-fit: cover;
//           object-position: center 30%;
//         }
//         .cr-hero-bg-overlay {
//           position: absolute;
//           inset: 0;
//           z-index: 1;
//           pointer-events: none;
//           background:
//             linear-gradient(180deg,
//               rgba(10,10,10,0.4) 0%,
//               rgba(10,10,10,0.55) 40%,
//               rgba(10,10,10,0.85) 100%
//             ),
//             linear-gradient(90deg,
//               rgba(10,10,10,0.55) 0%,
//               rgba(10,10,10,0.2) 60%,
//               rgba(10,10,10,0.1) 100%
//             );
//         }
//         .cr-hero-bg-vignette {
//           position: absolute;
//           inset: 0;
//           z-index: 1;
//           pointer-events: none;
//           background:
//             radial-gradient(ellipse 70% 60% at 25% 40%,
//               rgba(255,255,255,0.04) 0%,
//               transparent 70%
//             );
//           mix-blend-mode: screen;
//         }
//         .cr-hero-inner {
//           position: relative;
//           z-index: 2;
//           max-width: 1320px;
//           margin: 0 auto;
//           display: flex;
//           flex-direction: column;
//           height: 100%;
//         }

//         .cr-hero-meta {
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           margin-bottom: clamp(40px, 7vw, 80px);
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 500;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//         }
//         .cr-hero-bin {
//           display: inline-flex;
//           align-items: center;
//           gap: 10px;
//           padding: 6px 12px;
//           background: rgba(255,255,255,0.06);
//           border: 1px solid rgba(255,255,255,0.18);
//           border-radius: 999px;
//           color: #fafaf9;
//           backdrop-filter: blur(10px);
//           -webkit-backdrop-filter: blur(10px);
//         }
//         .cr-hero-bin-dot {
//           width: 6px;
//           height: 6px;
//           border-radius: 50%;
//           background: #16a34a;
//           box-shadow: 0 0 0 3px rgba(22,163,74,0.18);
//           animation: cr-pulse 1.8s ease-in-out infinite;
//         }
//         @keyframes cr-pulse {
//           0%, 100% { box-shadow: 0 0 0 3px rgba(22,163,74,0.18); }
//           50% { box-shadow: 0 0 0 6px rgba(22,163,74,0.05); }
//         }
//         .cr-hero-index {
//           color: rgba(255,255,255,0.55);
//         }

//         .cr-hero-title {
//           font-family: var(--font-display);
//           font-size: clamp(44px, 7.5vw, 116px);
//           font-weight: 500;
//           letter-spacing: -0.045em;
//           line-height: 0.94;
//           margin: 0 0 clamp(36px, 5vw, 64px);
//           color: #fff;
//           text-shadow: 0 12px 40px rgba(0,0,0,0.4);
//           max-width: 1100px;
//         }
//         .cr-hero-line {
//           display: block;
//           padding-bottom: 0.06em;
//           overflow: visible;
//         }
//         .cr-hero-char {
//           display: inline-block;
//           will-change: transform, opacity;
//         }
//         .cr-hero-italic {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(255,255,255,0.96);
//           display: inline-block;
//           padding: 0 0.06em;
//           background: rgba(255,255,255,0.06);
//           border-radius: 0.14em;
//           backdrop-filter: blur(2px);
//         }

//         .cr-hero-bottom {
//           display: grid;
//           grid-template-columns: 1.05fr 1fr;
//           gap: clamp(40px, 5vw, 96px);
//           align-items: end;
//           max-width: 1240px;
//         }
//         .cr-hero-lead {
//           font-size: clamp(15px, 1.2vw, 17px);
//           line-height: 1.72;
//           color: rgba(255,255,255,0.78);
//           margin: 0;
//           max-width: 520px;
//           text-shadow: 0 6px 20px rgba(0,0,0,0.3);
//         }
//         .cr-hero-pull {
//           margin: 0;
//           padding: 24px 28px 26px;
//           border-left: 2px solid #fafaf9;
//           background: rgba(255,255,255,0.04);
//           border-radius: 0 12px 12px 0;
//           backdrop-filter: blur(12px);
//           -webkit-backdrop-filter: blur(12px);
//           position: relative;
//           max-width: 520px;
//         }
//         .cr-hero-pull p {
//           font-family: var(--font-display);
//           font-size: clamp(17px, 1.6vw, 22px);
//           font-weight: 500;
//           letter-spacing: -0.02em;
//           line-height: 1.32;
//           color: #fafaf9;
//           margin: 0;
//         }
//         .cr-hero-pull-mark {
//           position: absolute;
//           top: 14px;
//           right: 18px;
//           font-family: var(--font-mono);
//           font-size: 18px;
//           color: rgba(255,255,255,0.3);
//           line-height: 1;
//         }

//         /* Ticker — bottom of hero */
//         .cr-ticker {
//           position: absolute;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           z-index: 2;
//           background: rgba(0,0,0,0.5);
//           backdrop-filter: blur(12px);
//           -webkit-backdrop-filter: blur(12px);
//           border-top: 1px solid rgba(255,255,255,0.08);
//           overflow: hidden;
//           height: 56px;
//           display: flex;
//           align-items: center;
//         }
//         .cr-ticker-track {
//           display: flex;
//           will-change: transform;
//         }
//         .cr-ticker-set {
//           display: flex;
//           flex-shrink: 0;
//         }
//         .cr-ticker-item {
//           display: inline-flex;
//           align-items: center;
//           gap: 22px;
//           padding: 0 22px;
//           font-family: var(--font-display);
//           font-size: clamp(14px, 1.4vw, 18px);
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           color: rgba(255,255,255,0.85);
//           white-space: nowrap;
//         }
//         .cr-ticker-dot {
//           font-size: 5px;
//           color: rgba(255,255,255,0.4);
//           line-height: 1;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 2 — FILTER (Yes / No filing cards)
//         ═══════════════════════════════════════════════════════════════ */
//         .cr-filter {
//           padding: clamp(96px, 12vw, 160px) 20px;
//           background: #fafaf9;
//           border-top: 1px solid rgba(10,10,10,0.06);
//         }
//         .cr-filter-inner { max-width: 1320px; margin: 0 auto; }

//         .cr-filter-grid {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: clamp(20px, 2vw, 28px);
//         }
//         .cr-filter-card {
//           position: relative;
//           padding: 32px 32px 36px;
//           background: #ffffff;
//           border: 1px solid rgba(10,10,10,0.08);
//           border-radius: 18px;
//           transition:
//             transform 0.4s cubic-bezier(0.22,1,0.36,1),
//             box-shadow 0.4s cubic-bezier(0.22,1,0.36,1),
//             border-color 0.3s ease;
//           box-shadow:
//             0 1px 2px rgba(10,10,10,0.04),
//             0 16px 48px -22px rgba(10,10,10,0.18);
//         }
//         .cr-filter-card:hover {
//           transform: translateY(-4px);
//           box-shadow:
//             0 4px 8px rgba(10,10,10,0.06),
//             0 32px 64px -28px rgba(10,10,10,0.28);
//         }
//         .cr-filter-card[data-tone="yes"]:hover {
//           border-color: rgba(22,163,74,0.35);
//         }
//         .cr-filter-card[data-tone="no"]:hover {
//           border-color: rgba(220,38,38,0.32);
//         }
//         .cr-filter-card-head {
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           padding-bottom: 22px;
//           margin-bottom: 24px;
//           border-bottom: 1px solid rgba(10,10,10,0.08);
//         }
//         .cr-filter-stamp {
//           width: 38px;
//           height: 38px;
//           flex-shrink: 0;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 12px;
//           transition: transform 0.4s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cr-filter-card[data-tone="yes"] .cr-filter-stamp {
//           background: rgba(22,163,74,0.1);
//           color: #16a34a;
//           border: 1px solid rgba(22,163,74,0.18);
//         }
//         .cr-filter-card[data-tone="no"] .cr-filter-stamp {
//           background: rgba(220,38,38,0.08);
//           color: #dc2626;
//           border: 1px solid rgba(220,38,38,0.18);
//         }
//         .cr-filter-card:hover .cr-filter-stamp { transform: rotate(-6deg); }
//         .cr-filter-card-label {
//           font-family: var(--font-display);
//           font-size: clamp(18px, 1.8vw, 22px);
//           font-weight: 500;
//           letter-spacing: -0.022em;
//           line-height: 1.2;
//           color: #0a0a0a;
//         }
//         .cr-filter-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           display: flex;
//           flex-direction: column;
//         }
//         .cr-filter-item {
//           display: grid;
//           grid-template-columns: 36px 1fr;
//           gap: 14px;
//           padding: 14px 0;
//           border-bottom: 1px solid rgba(10,10,10,0.06);
//         }
//         .cr-filter-item:last-child { border-bottom: 0; }
//         .cr-filter-item-num {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 500;
//           letter-spacing: 0.08em;
//           color: rgba(10,10,10,0.4);
//           padding-top: 3px;
//         }
//         .cr-filter-item-text {
//           font-size: 15px;
//           line-height: 1.55;
//           color: rgba(10,10,10,0.78);
//         }
//         .cr-filter-card[data-tone="no"] .cr-filter-item-text {
//           color: rgba(10,10,10,0.55);
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 3 — DNA / VALUES (numbered manifesto, dark)
//         ═══════════════════════════════════════════════════════════════ */
//         .cr-dna {
//           padding: clamp(96px, 12vw, 160px) 20px;
//           background: #0a0a0a;
//           color: #fafaf9;
//           position: relative;
//           overflow: hidden;
//         }
//         .cr-dna::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//           background-image:
//             linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
//           background-size: 64px 64px;
//           mask-image: radial-gradient(ellipse 80% 90% at 50% 30%, black 30%, transparent 100%);
//           -webkit-mask-image: radial-gradient(ellipse 80% 90% at 50% 30%, black 30%, transparent 100%);
//         }
//         .cr-dna-inner { position: relative; max-width: 1100px; margin: 0 auto; }

//         .cr-dna-list {
//           list-style: none;
//           padding: 0;
//           margin: 0;
//           counter-reset: dna;
//         }
//         .cr-dna-row {
//           display: grid;
//           grid-template-columns: 96px 1fr;
//           gap: clamp(20px, 3vw, 48px);
//           padding: clamp(28px, 4vw, 44px) 0;
//           align-items: start;
//           position: relative;
//           opacity: 0.5;
//           transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cr-dna-row[data-active="true"] { opacity: 1; }
//         .cr-dna-line {
//           position: absolute;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           height: 1px;
//           background: rgba(255,255,255,0.08);
//           transform: scaleX(0.3);
//           transform-origin: left center;
//           transition: transform 0.6s cubic-bezier(0.22,1,0.36,1),
//                       background 0.5s ease;
//         }
//         .cr-dna-row[data-active="true"] .cr-dna-line {
//           transform: scaleX(1);
//           background: rgba(255,255,255,0.18);
//         }
//         .cr-dna-row:first-child {
//           border-top: 1px solid rgba(255,255,255,0.12);
//         }
//         .cr-dna-num {
//           font-family: var(--font-display);
//           font-size: clamp(40px, 5vw, 68px);
//           font-weight: 500;
//           letter-spacing: -0.04em;
//           line-height: 0.95;
//           color: transparent;
//           -webkit-text-stroke: 1px rgba(255,255,255,0.4);
//           font-feature-settings: "tnum";
//           transition: color 0.5s, -webkit-text-stroke-color 0.5s;
//         }
//         .cr-dna-row[data-active="true"] .cr-dna-num {
//           color: #fafaf9;
//           -webkit-text-stroke-color: transparent;
//         }
//         .cr-dna-num span {
//           font-style: italic;
//           font-weight: 400;
//         }
//         .cr-dna-body {
//           padding-top: clamp(8px, 1.2vw, 18px);
//           max-width: 720px;
//         }
//         .cr-dna-head {
//           font-family: var(--font-display);
//           font-size: clamp(22px, 2.6vw, 36px);
//           font-weight: 500;
//           letter-spacing: -0.028em;
//           line-height: 1.12;
//           margin: 0 0 14px;
//           color: #fafaf9;
//         }
//         .cr-dna-text {
//           font-size: clamp(14.5px, 1.05vw, 16.5px);
//           line-height: 1.7;
//           color: rgba(255,255,255,0.62);
//           margin: 0;
//           max-width: 64ch;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 4 — LIFE (Asymmetric mosaic)
//         ═══════════════════════════════════════════════════════════════ */
//         .cr-life {
//           padding: clamp(96px, 12vw, 160px) 20px;
//           background: #f5f5f4;
//           border-top: 1px solid rgba(10,10,10,0.06);
//         }
//         .cr-life-inner { max-width: 1320px; margin: 0 auto; }

//         .cr-life-grid {
//           display: flex;
//           flex-direction: column;
//           gap: clamp(48px, 7vw, 96px);
//         }
//         .cr-life-item {
//           display: grid;
//           grid-template-columns: 1.05fr 1fr;
//           gap: clamp(32px, 5vw, 80px);
//           align-items: center;
//         }
//         .cr-life-item[data-side="R"] {
//           grid-template-columns: 1fr 1.05fr;
//         }
//         .cr-life-item[data-side="R"] .cr-life-visual { order: 2; }
//         .cr-life-item[data-side="R"] .cr-life-body { order: 1; }

//         .cr-life-visual {
//           position: relative;
//           aspect-ratio: 4 / 3;
//           border-radius: clamp(16px, 1.8vw, 22px);
//           overflow: hidden;
//           background: #0a0a0a;
//           box-shadow: 0 30px 80px -40px rgba(10,10,10,0.4);
//         }
//         .cr-life-img {
//           width: 100%;
//           height: 100%;
//           object-fit: cover;
//           filter: saturate(1.04) contrast(1.04);
//           transition: transform 1.2s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cr-life-item:hover .cr-life-img {
//           transform: scale(1.05);
//         }
//         .cr-life-visual-overlay {
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//           background:
//             linear-gradient(180deg, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.4) 100%);
//         }
//         .cr-life-tag {
//           position: absolute;
//           top: 18px;
//           left: 18px;
//           font-family: var(--font-mono);
//           font-size: 10px;
//           font-weight: 700;
//           letter-spacing: 0.16em;
//           text-transform: uppercase;
//           color: #0a0a0a;
//           background: rgba(255,255,255,0.95);
//           padding: 6px 11px;
//           border-radius: 999px;
//           backdrop-filter: blur(8px);
//         }

//         .cr-life-body {
//           display: flex;
//           flex-direction: column;
//           gap: 16px;
//           max-width: 520px;
//         }
//         .cr-life-num {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.14em;
//           color: rgba(10,10,10,0.4);
//         }
//         .cr-life-h {
//           font-family: var(--font-display);
//           font-size: clamp(24px, 2.8vw, 38px);
//           font-weight: 500;
//           letter-spacing: -0.028em;
//           line-height: 1.1;
//           margin: 0;
//           color: #0a0a0a;
//         }
//         .cr-life-d {
//           font-size: clamp(14.5px, 1.05vw, 16.5px);
//           line-height: 1.7;
//           color: rgba(10,10,10,0.62);
//           margin: 0;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            SECTION 5 — APPLY (editorial closing)
//         ═══════════════════════════════════════════════════════════════ */
//         .cr-apply {
//           padding: clamp(112px, 16vw, 200px) 20px clamp(96px, 12vw, 160px);
//           background: #fafaf9;
//           border-top: 1px solid rgba(10,10,10,0.08);
//           position: relative;
//         }
//         .cr-apply::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           pointer-events: none;
//           background:
//             radial-gradient(ellipse 70% 50% at 50% 0%, rgba(10,10,10,0.05) 0%, transparent 70%);
//         }
//         .cr-apply-inner {
//           position: relative;
//           max-width: 1100px;
//           margin: 0 auto;
//         }

//         .cr-apply-top {
//           display: flex;
//           align-items: center;
//           gap: 18px;
//           margin-bottom: clamp(36px, 5vw, 56px);
//         }
//         .cr-apply-bin {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 600;
//           letter-spacing: 0.16em;
//           text-transform: uppercase;
//           color: #0a0a0a;
//           padding: 6px 12px;
//           border: 1px solid rgba(10,10,10,0.18);
//           border-radius: 999px;
//           white-space: nowrap;
//         }
//         .cr-apply-rule {
//           display: block;
//           flex: 1 1 auto;
//           height: 1px;
//           background: #0a0a0a;
//           transform-origin: left center;
//           transform: scaleX(0);
//         }
//         .cr-apply-index {
//           font-family: var(--font-mono);
//           font-size: 11px;
//           font-weight: 500;
//           letter-spacing: 0.08em;
//           color: rgba(10,10,10,0.5);
//           white-space: nowrap;
//         }

//         .cr-apply-title {
//           font-family: var(--font-display);
//           font-size: clamp(40px, 7.5vw, 110px);
//           font-weight: 500;
//           letter-spacing: -0.045em;
//           line-height: 0.95;
//           margin: 0 0 clamp(32px, 4vw, 48px);
//           color: #0a0a0a;
//         }
//         .cr-apply-line {
//           display: block;
//           padding-bottom: 0.06em;
//           overflow: visible;
//         }
//         .cr-apply-char {
//           display: inline-block;
//           will-change: transform, opacity;
//         }
//         .cr-apply-italic {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(10,10,10,0.5);
//         }

//         .cr-apply-lead {
//           font-size: clamp(15px, 1.3vw, 17px);
//           color: rgba(10,10,10,0.65);
//           line-height: 1.7;
//           margin: 0 0 clamp(36px, 5vw, 56px);
//           max-width: 56ch;
//         }

//         .cr-apply-actions {
//           display: flex;
//           align-items: center;
//           flex-wrap: wrap;
//           gap: 28px 36px;
//           margin-bottom: clamp(48px, 6vw, 72px);
//         }
//         .cr-apply-btn {
//           display: inline-flex;
//           align-items: stretch;
//           padding: 0;
//           background: #0a0a0a;
//           color: #fafaf9;
//           text-decoration: none;
//           border-radius: 999px;
//           overflow: hidden;
//           font-size: 14px;
//           font-weight: 500;
//           letter-spacing: -0.005em;
//           transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cr-apply-btn:hover { transform: translateY(-2px); }
//         .cr-apply-btn-label { padding: 16px 14px 16px 24px; }
//         .cr-apply-btn-arrow {
//           padding: 0 22px 0 14px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           border-left: 1px solid rgba(255,255,255,0.18);
//           transition: background 0.3s, color 0.3s;
//         }
//         .cr-apply-btn:hover .cr-apply-btn-arrow {
//           background: #fafaf9;
//           color: #0a0a0a;
//         }

//         .cr-apply-mail {
//           display: inline-flex;
//           flex-direction: column;
//           gap: 2px;
//           color: #0a0a0a;
//           text-decoration: none;
//           line-height: 1.2;
//         }
//         .cr-apply-mail-k {
//           font-family: var(--font-mono);
//           font-size: 10px;
//           font-weight: 600;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.4);
//         }
//         .cr-apply-mail-v {
//           font-family: var(--font-display);
//           font-size: 17px;
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           color: #0a0a0a;
//           background-image: linear-gradient(currentColor, currentColor);
//           background-size: 100% 1px;
//           background-position: 0 100%;
//           background-repeat: no-repeat;
//           transition: background-size 0.35s cubic-bezier(0.22,1,0.36,1);
//         }
//         .cr-apply-mail:hover .cr-apply-mail-v { background-size: 0% 1px; }

//         .cr-apply-meta {
//           margin: 0;
//           padding: clamp(20px, 2.5vw, 28px) 0 0;
//           border-top: 1px solid rgba(10,10,10,0.12);
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 0;
//         }
//         .cr-apply-meta-row {
//           padding: 0 24px;
//           border-right: 1px solid rgba(10,10,10,0.08);
//           display: flex;
//           flex-direction: column;
//           gap: 6px;
//         }
//         .cr-apply-meta-row:first-child { padding-left: 0; }
//         .cr-apply-meta-row:last-child { border-right: 0; padding-right: 0; }
//         .cr-apply-meta-row dt {
//           font-family: var(--font-mono);
//           font-size: 10px;
//           font-weight: 600;
//           letter-spacing: 0.14em;
//           text-transform: uppercase;
//           color: rgba(10,10,10,0.45);
//           margin: 0;
//         }
//         .cr-apply-meta-row dd {
//           font-family: var(--font-display);
//           font-size: clamp(15px, 1.3vw, 17px);
//           font-weight: 500;
//           letter-spacing: -0.018em;
//           color: #0a0a0a;
//           margin: 0;
//         }

//         /* ═══════════════════════════════════════════════════════════════
//            RESPONSIVE
//         ═══════════════════════════════════════════════════════════════ */
//         @media (max-width: 1100px) {
//           .cr-hero-bottom {
//             grid-template-columns: 1fr;
//             gap: 32px;
//           }
//           .cr-hero-pull { max-width: 100%; }

//           .cr-filter-grid { grid-template-columns: 1fr; gap: 18px; }

//           .cr-dna-row { grid-template-columns: 72px 1fr; gap: 24px; padding: 32px 0; }

//           .cr-life-item,
//           .cr-life-item[data-side="R"] {
//             grid-template-columns: 1fr;
//             gap: 28px;
//           }
//           .cr-life-item[data-side="R"] .cr-life-visual { order: 0; }
//           .cr-life-item[data-side="R"] .cr-life-body { order: 1; }

//           .cr-apply-meta { grid-template-columns: repeat(2, 1fr); }
//           .cr-apply-meta-row {
//             padding: 18px 18px 18px 0;
//             border-right: 1px solid rgba(10,10,10,0.08);
//             border-bottom: 1px solid rgba(10,10,10,0.08);
//           }
//           .cr-apply-meta-row:nth-child(2) { border-right: 0; padding-right: 0; }
//           .cr-apply-meta-row:nth-child(3) { padding-left: 0; }
//           .cr-apply-meta-row:nth-child(3),
//           .cr-apply-meta-row:nth-child(4) { border-bottom: 0; }
//           .cr-apply-meta-row:first-child { padding-left: 0; }
//           .cr-apply-meta-row:last-child { padding-right: 0; }
//         }

//         @media (max-width: 768px) {
//           .cr-hero {
//             padding: clamp(110px, 16svh, 140px) 14px 92px;
//             min-height: 100svh;
//           }
//           .cr-hero-meta { margin-bottom: 32px; gap: 10px; }
//           .cr-hero-bin { font-size: 10px; padding: 5px 10px; }
//           .cr-hero-index { font-size: 10px; }
//           .cr-hero-title {
//             font-size: clamp(34px, 11vw, 56px);
//             line-height: 0.98;
//             margin-bottom: 32px;
//           }
//           .cr-hero-bottom { gap: 24px; }
//           .cr-hero-lead { font-size: 14.5px; line-height: 1.65; }
//           .cr-hero-pull { padding: 18px 22px 20px; border-radius: 0 10px 10px 0; }
//           .cr-hero-pull p { font-size: 16px; line-height: 1.4; }

//           .cr-ticker { height: 48px; }
//           .cr-ticker-item { font-size: 13px; padding: 0 16px; gap: 16px; }

//           .cr-filter,
//           .cr-dna,
//           .cr-life,
//           .cr-apply {
//             padding-left: 14px;
//             padding-right: 14px;
//           }

//           .cr-section-meta { gap: 12px; }
//           .cr-section-bin, .cr-section-bin--light { font-size: 10px; padding: 4px 10px; }
//           .cr-section-index, .cr-section-index--light { font-size: 10px; }

//           .cr-h2 {
//             font-size: clamp(28px, 8vw, 44px);
//             margin-top: 14px;
//           }
//           .cr-h2-lead { font-size: 14.5px; line-height: 1.65; }

//           .cr-filter-card { padding: 26px 22px 28px; border-radius: 14px; }
//           .cr-filter-stamp { width: 32px; height: 32px; border-radius: 10px; }
//           .cr-filter-card-label { font-size: 16px; }
//           .cr-filter-item { grid-template-columns: 28px 1fr; gap: 12px; padding: 12px 0; }
//           .cr-filter-item-text { font-size: 14px; line-height: 1.55; }

//           .cr-dna-row {
//             grid-template-columns: 56px 1fr;
//             gap: 16px;
//             padding: 26px 0;
//           }
//           .cr-dna-num { font-size: 36px; }
//           .cr-dna-head { font-size: 19px; margin-bottom: 10px; }
//           .cr-dna-text { font-size: 14px; line-height: 1.65; }

//           .cr-life-grid { gap: 56px; }
//           .cr-life-visual { aspect-ratio: 16 / 11; border-radius: 14px; }
//           .cr-life-tag { top: 12px; left: 12px; font-size: 9px; padding: 5px 9px; }
//           .cr-life-body { gap: 12px; }
//           .cr-life-h { font-size: 22px; line-height: 1.15; }
//           .cr-life-d { font-size: 14px; line-height: 1.65; }

//           .cr-apply { padding-top: clamp(80px, 14vw, 112px); }
//           .cr-apply-top { gap: 12px; margin-bottom: 28px; }
//           .cr-apply-title { font-size: clamp(34px, 11vw, 52px); }
//           .cr-apply-lead { font-size: 14.5px; margin-bottom: 32px; }
//           .cr-apply-actions { gap: 22px; margin-bottom: 36px; }
//           .cr-apply-btn-label { padding: 14px 12px 14px 22px; }
//           .cr-apply-btn-arrow { padding: 0 18px 0 12px; }
//           .cr-apply-mail-v { font-size: 16px; }
//           .cr-apply-meta { grid-template-columns: 1fr 1fr; }
//           .cr-apply-meta-row { padding: 14px 14px 14px 0; }
//           .cr-apply-meta-row:nth-child(odd) { padding-left: 0; }
//           .cr-apply-meta-row:nth-child(even) { padding-right: 0; border-right: 0; }
//           .cr-apply-meta-row dd { font-size: 15px; }
//         }

//         /* Reduced motion */
//         @media (prefers-reduced-motion: reduce) {
//           .cr-ticker-track { animation: none !important; }
//           .cr-life-img { transition: none; }
//           .cr-life-item:hover .cr-life-img { transform: none; }
//           .cr-hero-bin-dot { animation: none; }
//           .cr-dna-row { opacity: 1 !important; transition: none; }
//           .cr-dna-line { transform: scaleX(1) !important; }
//         }
//       `}</style>
//     </>
//   );
// }

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

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Image from "next/image";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

gsap.registerPlugin(ScrollTrigger);

// ── DATA ──────────────────────────────────────────────────────────────────────

const HERO = {
  // Headline split for character-by-character reveal
  // Structured so the italic line breaks last for emphasis
  // headline1: "We write code.",
  // headline2: "We don't",
  // headlineItalic: "cut corners.",
  headline1: "Is your best",
  headline2: "actually",
  headlineItalic: "your best?",
  lead:
    "Most software shops take your brief, disappear for weeks, and deliver something that needs fixing before it's even live. Tech Binaries works differently. We're a team of engineers and builders who treat every line of code like it has our name on it — because it does.",
  pullQuote:
    "We're not looking for people who want a job. We're looking for people who want ownership.",
  // Marquee values — short, repeatable, tone-setting
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
      body: "We move fast, but we don't move sloppy. Quality isn't a phase — it's the default. A shipped feature that breaks under load is worse than a delayed one that holds.",
      // Crosshair / target — precision
      glyph: (
        <>
          <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.35" />
          <circle cx="40" cy="40" r="18" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
          <circle cx="40" cy="40" r="6" fill="currentColor" />
          <line x1="40" y1="4" x2="40" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          <line x1="40" y1="66" x2="40" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          <line x1="4" y1="40" x2="14" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          <line x1="66" y1="40" x2="76" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.7" />
        </>
      ),
    },
    {
      n: "II",
      kicker: "Solve, don't close",
      head: "Own the problem, not the task",
      body: "Your job isn't to close tickets. It's to solve what's actually broken. Tickets are descriptions of problems — not contracts that limit your responsibility.",
      // Concentric squares — look beyond the brief
      glyph: (
        <>
          <rect x="14" y="14" width="52" height="52" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <rect x="22" y="22" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.55" />
          <rect x="32" y="32" width="16" height="16" fill="currentColor" />
          <line x1="40" y1="4" x2="40" y2="14" stroke="currentColor" strokeWidth="1" opacity="0.7" strokeDasharray="2 2" />
          <line x1="40" y1="66" x2="40" y2="76" stroke="currentColor" strokeWidth="1" opacity="0.7" strokeDasharray="2 2" />
        </>
      ),
    },
    {
      n: "III",
      kicker: "Best idea wins",
      head: "No rank, just results",
      body: "The best idea wins, regardless of who said it. Junior engineers push back on architecture decisions here — that's expected, not tolerated.",
      // Three nodes connected — flat hierarchy
      glyph: (
        <>
          <circle cx="40" cy="14" r="6" fill="currentColor" />
          <circle cx="14" cy="58" r="6" fill="currentColor" />
          <circle cx="66" cy="58" r="6" fill="currentColor" />
          <line x1="40" y1="20" x2="14" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          <line x1="40" y1="20" x2="66" y2="52" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          <line x1="20" y1="58" x2="60" y2="58" stroke="currentColor" strokeWidth="1" opacity="0.45" />
          <circle cx="40" cy="14" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <circle cx="14" cy="58" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <circle cx="66" cy="58" r="12" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </>
      ),
    },
    {
      n: "IV",
      kicker: "Compound or fade",
      head: "Sharpen or stagnate",
      body: "The industry moves. Either you're keeping up or you're falling behind. We invest in people who invest in themselves — and we expect that investment to compound.",
      // Ascending bars — growth
      glyph: (
        <>
          <rect x="10" y="50" width="10" height="20" fill="currentColor" opacity="0.35" />
          <rect x="26" y="40" width="10" height="30" fill="currentColor" opacity="0.55" />
          <rect x="42" y="26" width="10" height="44" fill="currentColor" opacity="0.75" />
          <rect x="58" y="10" width="10" height="60" fill="currentColor" />
          <line x1="6" y1="70" x2="74" y2="70" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </>
      ),
    },
    {
      n: "V",
      kicker: "Direct, not diplomatic",
      head: "Say it straight",
      body: "No politics, no ego protection, no sugarcoating. If something's wrong, we say it — and fix it. Direct feedback is a sign of respect; silence is the real disrespect.",
      // Straight arrow — directness
      glyph: (
        <>
          <line x1="6" y1="40" x2="68" y2="40" stroke="currentColor" strokeWidth="2" />
          <path d="M62 32 L72 40 L62 48" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="40" r="3" fill="currentColor" />
          <line x1="6" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1" opacity="0.3" />
          <line x1="6" y1="60" x2="40" y2="60" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        </>
      ),
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
      tag: "Real work",
      h: "Real projects, real stakes",
      d: "You'll work on software that actual businesses depend on. Production systems, real users, real revenue. Not internal tools no one uses.",
      visual:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Team collaborating on production software",
    },
    {
      tag: "Growth",
      h: "We pay for your growth",
      d: "Courses, certifications, conferences. If it makes you better, we'll back it. Our budget for learning isn't a perk — it's a line item.",
      visual:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Books and notebooks for continued learning",
    },
    {
      tag: "Comp",
      h: "Competitive salary + bonuses",
      d: "Good work gets rewarded. Performance bonuses are paid against shipped outcomes — not just at annual reviews when budgets allow.",
      visual:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Financial reward and compensation",
    },
    {
      tag: "Boundaries",
      h: "Work that respects your life",
      d: "High standards during work hours. Your time outside them is yours. We don't message on weekends and we don't make heroes out of people who burn out.",
      visual:
        "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&q=80&auto=format&fit=crop",
      visualAlt: "Quiet workspace with natural light",
    },
  ],
};

const APPLY = {
  // Headline split for character reveal
  headlineLead: "Ready to work",
  headlineItalic: "on something real?",
  lead:
    "We're always on the lookout for developers, engineers, and problem-solvers who want to build things that last. Browse current openings — or if you don't see your role, send your work directly. If you're good, we'll find a way.",
  primaryCta: { label: "View open positions", href: "/careers/positions" },
  email: "careers@techbinaries.com",
  microMeta: [
    { k: "Reply",     v: "Within 5 days" },
    { k: "Process",   v: "3 conversations" },
    { k: "Decision",  v: "Within 2 weeks" },
    { k: "Location",  v: "Global · remote" },
  ],
};

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const [activeValue, setActiveValue] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);

  // Refs
  const heroRef = useRef<HTMLElement | null>(null);
  const tickerRef = useRef<HTMLDivElement | null>(null);
  const valuesListRef = useRef<HTMLDivElement | null>(null);

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
      // Hero character reveal
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

      // Hero image parallax — gentle
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

      // Ticker marquee — infinite horizontal scroll
      const ticker = tickerRef.current;
      if (ticker) {
        const inner = ticker.querySelector<HTMLDivElement>(".cr-ticker-track");
        if (inner) {
          // Calculate the width of one set, then animate by negative that
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
      // Generic reveal helper
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

      // Section headers
      setupBatch(
        ".cr-sh",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.95, ease: "power3.out" }
      );

      // Filter — compact paired-row table reveal
      // Header fades in first, then rows ladder up from bottom
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

      // Life mosaic items
      gsap.utils.toArray<HTMLElement>(".cr-life-item").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            delay: i % 2 === 0 ? 0 : 0.12,
            scrollTrigger: { trigger: el, start: "top 84%", once: true },
          }
        );
      });

      // Apply hero — character reveal on scroll
      const applyChars = gsap.utils.toArray<HTMLElement>(".cr-apply-char");
      if (applyChars.length) {
        gsap.fromTo(
          applyChars,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: { each: 0.013 },
            ease: "power4.out",
            scrollTrigger: { trigger: ".cr-apply", start: "top 75%", once: true },
          }
        );
      }
      gsap.utils.toArray<HTMLElement>(".cr-apply-fade").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
            delay: 0.5 + i * 0.08,
            scrollTrigger: { trigger: ".cr-apply", start: "top 75%", once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // ── DNA — PINNED SEQUENTIAL REPLACEMENT (desktop only) ──
  // Section pins to viewport. Scroll progress maps 0→1 to active principle
  // index 0→4. Outgoing scene slides right + fades; incoming scene slides
  // up + fades in. CSS handles the per-state transforms via [data-rel].
  // Mobile (≤1100px or coarse pointer) gets stacked clean cards instead.
  useEffect(() => {
    const list = valuesListRef.current;
    if (!list) return;

    const mm = gsap.matchMedia();

    mm.add(
      "(min-width: 1101px) and (hover: hover) and (pointer: fine)",
      () => {
        const stage = document.querySelector<HTMLElement>(".cr-dna-stage");
        if (!stage) return;

        const totalScenes = DNA.values.length;
        // 0.85 viewport-heights of scroll per principle. Higher = slower beat.
        const distancePerScene = 0.85;
        const totalDistance = totalScenes * distancePerScene;

        const trigger = ScrollTrigger.create({
          trigger: stage,
          start: "top top",
          end: () => `+=${window.innerHeight * totalDistance}`,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const raw = self.progress * totalScenes;
            const idx = Math.min(totalScenes - 1, Math.max(0, Math.floor(raw)));
            setActiveValue((prev) => (prev === idx ? prev : idx));
          },
        });

        return () => {
          trigger.kill();
        };
      }
    );

    // Mobile / touch: stacked cards with simple fade-up reveal
    mm.add(
      "(max-width: 1100px), (hover: none), (pointer: coarse)",
      () => {
        const ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".cr-dna-card").forEach((el, i) => {
            gsap.fromTo(
              el,
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
                delay: i * 0.04,
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
      {/* Grain overlay — same as service pages */}
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
            SECTION 1 — HERO (Opening Hook)
            Full-bleed image, oversized typography, marquee ticker.
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
            {/* Invisible layout shim: same box model as the old tag so headline + body do not jump up */}
            <div
              className="cr-hero-meta cr-hero-meta--layout-only"
              aria-hidden="true"
            >
              <span className="cr-hero-bin">
                <span className="cr-hero-bin-dot" />
                Careers
              </span>
              <span className="cr-hero-index">01 / 05</span>
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

              <blockquote
                className="cr-hero-fade cr-hero-pull"
                style={{ opacity: 0 }}
              >
                <span className="cr-hero-pull-mark" aria-hidden>
                  ¶
                </span>
                <p>{HERO.pullQuote}</p>
              </blockquote>
            </div>
          </div>

          {/* Ticker marquee at the very bottom of hero */}
          <div className="cr-ticker" ref={tickerRef} aria-hidden>
            <div className="cr-ticker-track">
              {/* Two consecutive sets so loop is seamless */}
              {[0, 1].map((set) => (
                <div key={set} className="cr-ticker-set">
                  {HERO.ticker.map((t, i) => (
                    <span key={`${set}-${i}`} className="cr-ticker-item">
                      <span>{t}</span>
                      <span className="cr-ticker-dot" aria-hidden>
                        ●
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 2 — WHO GETS IN
            Compact split-row layout: two columns share a hairline divider,
            no card chrome, no oversized stamps. Hierarchy through type +
            color + a small symbol prefix per row.
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

            <div
              className="cr-filter-table"
              role="table"
              aria-label="Hiring signals comparison"
            >
              {/* Header row */}
              <div className="cr-filter-thead" role="row">
                <div
                  className="cr-filter-th cr-filter-th--yes"
                  role="columnheader"
                >
                  <span className="cr-filter-th-icon" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path
                        d="M3 7.5 L6 10 L11 4.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="cr-filter-th-label">{FILTER.yes.label}</span>
                </div>
                <div
                  className="cr-filter-th cr-filter-th--no"
                  role="columnheader"
                >
                  <span className="cr-filter-th-icon" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path
                        d="M4 4 L10 10 M10 4 L4 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  <span className="cr-filter-th-label">{FILTER.no.label}</span>
                </div>
              </div>

              {/* Body rows — paired signals */}
              <div className="cr-filter-tbody" role="rowgroup">
                {FILTER.yes.items.map((yesText, i) => {
                  const noText = FILTER.no.items[i];
                  if (noText === undefined) return null;
                  return (
                    <div key={i} className="cr-filter-row" role="row">
                      <div
                        className="cr-filter-cell cr-filter-cell--yes"
                        role="cell"
                      >
                        <span className="cr-filter-cell-bullet" aria-hidden />
                        <span className="cr-filter-cell-text">{yesText}</span>
                      </div>
                      <div
                        className="cr-filter-cell cr-filter-cell--no"
                        role="cell"
                      >
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
            Desktop: pinned scroll-jacking. One principle visible at a time.
            Sequential replacement — outgoing slides right + fades, incoming
            slides up from below + fades in. CSS handles state transitions
            via [data-rel="active|past|future"].
            Mobile: stacked clean cards, no pin, no scroll-jacking.
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cr-dna" aria-labelledby="cr-dna-title">
          <div className="cr-dna-stage">
            <div className="cr-dna-inner">
              <div className="cr-sh cr-section-head cr-section-head--light cr-dna-header">
                <h2 id="cr-dna-title" className="cr-h2 cr-h2--light">
                  {DNA.title}{" "}
                  <span className="cr-italic-light">{DNA.titleAccent}</span>
                </h2>
                <p className="cr-h2-lead cr-h2-lead--light">{DNA.lead}</p>
              </div>

              {/* DESKTOP — sequential replacement scenes (one visible at a time) */}
              <div className="cr-dna-scenes" ref={valuesListRef} aria-live="polite">
                {DNA.values.map((v, i) => {
                  const rel =
                    i === activeValue ? "active" :
                    i < activeValue ? "past" :
                    "future";
                  return (
                    <article
                      key={v.n}
                      className="cr-dna-scene"
                      data-rel={rel}
                      aria-hidden={rel !== "active"}
                    >
                      <div className="cr-dna-scene-grid">
                        {/* LEFT — meta + glyph */}
                        <div className="cr-dna-scene-aside">
                          <div className="cr-dna-scene-meta">
                            <span className="cr-dna-scene-num">{v.n}</span>
                            <span className="cr-dna-scene-divider" aria-hidden />
                            <span className="cr-dna-scene-kicker">{v.kicker}</span>
                          </div>
                          <div className="cr-dna-scene-glyph" aria-hidden>
                            <svg viewBox="0 0 80 80" width="100%" height="100%">
                              {v.glyph}
                            </svg>
                          </div>
                        </div>

                        {/* RIGHT — head + body */}
                        <div className="cr-dna-scene-content">
                          <h3 className="cr-dna-scene-head">{v.head}</h3>
                          <p className="cr-dna-scene-body">{v.body}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {/* Bottom progress strip — sticky to stage bottom */}
                <div className="cr-dna-progress" aria-hidden>
                  <div className="cr-dna-progress-bars">
                    {DNA.values.map((_, i) => (
                      <span
                        key={i}
                        className="cr-dna-progress-bar"
                        data-state={
                          i < activeValue ? "done" :
                          i === activeValue ? "active" :
                          "pending"
                        }
                      />
                    ))}
                  </div>
                  <div className="cr-dna-progress-meta">
                    <span className="cr-dna-progress-current">
                      {String(activeValue + 1).padStart(2, "0")}
                    </span>
                    <span className="cr-dna-progress-sep">/</span>
                    <span className="cr-dna-progress-total">
                      {String(DNA.values.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>

              {/* MOBILE — stacked cards (one per principle).
                  Hidden on desktop via CSS. */}
              <ol className="cr-dna-cards" role="list">
                {DNA.values.map((v) => (
                  <li key={v.n} className="cr-dna-card">
                    <div className="cr-dna-card-top">
                      <span className="cr-dna-card-num">{v.n}</span>
                      <span className="cr-dna-card-glyph" aria-hidden>
                        <svg viewBox="0 0 80 80" width="100%" height="100%">
                          {v.glyph}
                        </svg>
                      </span>
                    </div>
                    <span className="cr-dna-card-kicker">{v.kicker}</span>
                    <h3 className="cr-dna-card-head">{v.head}</h3>
                    <p className="cr-dna-card-body">{v.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 4 — WHAT WORKING HERE LOOKS LIKE
            Asymmetric mosaic — each item alternates image-left / image-right.
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
                <article
                  key={b.h}
                  className="cr-life-item"
                  data-side={i % 2 === 0 ? "L" : "R"}
                >
                  <div className="cr-life-visual">
                    <Image
                      src={b.visual}
                      alt={b.visualAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 45vw"
                      className="cr-life-img"
                    />
                    <div className="cr-life-visual-overlay" />
                    <span className="cr-life-tag">{b.tag}</span>
                  </div>
                  <div className="cr-life-body">
                    <span className="cr-life-num" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="cr-life-h">{b.h}</h3>
                    <p className="cr-life-d">{b.d}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            SECTION 5 — APPLY (Open Roles + Fallback)
            Editorial closing statement, single CTA, mailto fallback.
        ═══════════════════════════════════════════════════════════════ */}
        <section className="cr-apply" aria-labelledby="cr-apply-title">
          <div className="cr-apply-inner">
            <h2 id="cr-apply-title" className="cr-apply-title">
              <span className="cr-apply-line">
                {APPLY.headlineLead.split("").map((c, i) => (
                  <span key={`a-${i}`} className="cr-apply-char">
                    {c === " " ? "\u00A0" : c}
                  </span>
                ))}
              </span>
              <span className="cr-apply-line">
                <span className="cr-apply-italic">
                  {APPLY.headlineItalic.split("").map((c, i) => (
                    <span key={`b-${i}`} className="cr-apply-char">
                      {c === " " ? "\u00A0" : c}
                    </span>
                  ))}
                </span>
              </span>
            </h2>

            <p className="cr-apply-fade cr-apply-lead" style={{ opacity: 0 }}>
              {APPLY.lead}
            </p>

            <div
              className="cr-apply-fade cr-apply-actions"
              style={{ opacity: 0 }}
            >
              <Link href={APPLY.primaryCta.href} className="cr-apply-btn">
                <span className="cr-apply-btn-label">
                  {APPLY.primaryCta.label}
                </span>
                <span className="cr-apply-btn-arrow" aria-hidden>
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

              <a href={`mailto:${APPLY.email}`} className="cr-apply-mail">
                <span className="cr-apply-mail-k">or send your work to</span>
                <span className="cr-apply-mail-v">{APPLY.email}</span>
              </a>
            </div>

            <dl className="cr-apply-fade cr-apply-meta" style={{ opacity: 0 }}>
              {APPLY.microMeta.map((m) => (
                <div key={m.k} className="cr-apply-meta-row">
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <SiteFooter />
      </div>

      <style>{`
        /* ═══════════════════════════════════════════════════════════════
           DESIGN TOKENS (page-scoped to avoid conflicts)
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

        .cr-section-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 4px;
        }
        .cr-section-bin {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a0a0a;
          padding: 5px 11px;
          border: 1px solid rgba(10,10,10,0.18);
          border-radius: 999px;
          white-space: nowrap;
        }
        .cr-section-bin--light {
          color: #fafaf9;
          border-color: rgba(255,255,255,0.25);
        }
        .cr-section-rule {
          display: block;
          flex: 1 1 auto;
          height: 1px;
          background: rgba(10,10,10,0.15);
        }
        .cr-section-rule--light { background: rgba(255,255,255,0.18); }
        .cr-section-index {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.08em;
          color: rgba(10,10,10,0.45);
          white-space: nowrap;
        }
        .cr-section-index--light { color: rgba(255,255,255,0.45); }

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
        .cr-hero-bg picture {
          display: block;
          position: relative;
          width: 100%;
          height: 100%;
        }
        .cr-hero-bg picture > span {
          display: block !important;
          width: 100%;
          height: 100%;
        }
        .cr-hero-photo {
          object-fit: cover;
          object-position: center 30%;
        }
        .cr-hero-bg-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(180deg,
              rgba(10,10,10,0.4) 0%,
              rgba(10,10,10,0.55) 40%,
              rgba(10,10,10,0.85) 100%
            ),
            linear-gradient(90deg,
              rgba(10,10,10,0.55) 0%,
              rgba(10,10,10,0.2) 60%,
              rgba(10,10,10,0.1) 100%
            );
        }
        .cr-hero-bg-vignette {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 60% at 25% 40%,
              rgba(255,255,255,0.04) 0%,
              transparent 70%
            );
          mix-blend-mode: screen;
        }
        .cr-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1320px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .cr-hero-meta {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: clamp(40px, 7vw, 80px);
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }
        .cr-hero-meta--layout-only {
          visibility: hidden;
          pointer-events: none;
          user-select: none;
        }
        .cr-hero-meta--layout-only .cr-hero-bin-dot {
          animation: none;
        }
        .cr-hero-bin {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 12px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px;
          color: #fafaf9;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .cr-hero-bin-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.18);
          animation: cr-pulse 1.8s ease-in-out infinite;
        }
        @keyframes cr-pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(22,163,74,0.18); }
          50% { box-shadow: 0 0 0 6px rgba(22,163,74,0.05); }
        }
        .cr-hero-index {
          color: rgba(255,255,255,0.55);
        }

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
          display: flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0;
          padding-bottom: 0.02em;
          overflow: visible;
        }
        .cr-hero-char {
          display: inline-block;
          letter-spacing: -0.022em;
          will-change: transform, opacity;
        }
        .cr-hero-italic {
          font-style: italic;
          font-weight: 300;
          color: rgba(255,255,255,0.96);
          display: inline-flex;
          flex-wrap: wrap;
          align-items: baseline;
          gap: 0;
          padding: 0 0.06em;
          background: rgba(255,255,255,0.06);
          border-radius: 0.14em;
          backdrop-filter: blur(2px);
        }

        .cr-hero-bottom {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: clamp(40px, 5vw, 96px);
          align-items: end;
          max-width: 1240px;
        }
        .cr-hero-lead {
          font-size: clamp(15px, 1.2vw, 17px);
          line-height: 1.72;
          color: rgba(255,255,255,0.78);
          margin: 0;
          max-width: 520px;
          text-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }
        .cr-hero-pull {
          margin: 0;
          padding: 24px 28px 26px;
          border-left: 2px solid #fafaf9;
          background: rgba(255,255,255,0.04);
          border-radius: 0 12px 12px 0;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          position: relative;
          max-width: 520px;
        }
        .cr-hero-pull p {
          font-family: var(--font-display);
          font-size: clamp(17px, 1.6vw, 22px);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.32;
          color: #fafaf9;
          margin: 0;
        }
        .cr-hero-pull-mark {
          position: absolute;
          top: 14px;
          right: 18px;
          font-family: var(--font-mono);
          font-size: 18px;
          color: rgba(255,255,255,0.3);
          line-height: 1;
        }

        /* Ticker — bottom of hero */
        .cr-ticker {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 2;
          background: rgba(0,0,0,0.5);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-top: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          height: 56px;
          display: flex;
          align-items: center;
        }
        .cr-ticker-track {
          display: flex;
          will-change: transform;
        }
        .cr-ticker-set {
          display: flex;
          flex-shrink: 0;
        }
        .cr-ticker-item {
          display: inline-flex;
          align-items: center;
          gap: 22px;
          padding: 0 22px;
          font-family: var(--font-display);
          font-size: clamp(14px, 1.4vw, 18px);
          font-weight: 500;
          letter-spacing: -0.018em;
          color: rgba(255,255,255,0.85);
          white-space: nowrap;
        }
        .cr-ticker-dot {
          font-size: 5px;
          color: rgba(255,255,255,0.4);
          line-height: 1;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 2 — FILTER (compact paired-row comparison table)
           A two-column "table" with a center divider. Header row labels
           each column; subsequent rows align hire-signal pairs across.
           Tight, scannable, no oversized card chrome.
        ═══════════════════════════════════════════════════════════════ */
        .cr-filter {
          padding: clamp(72px, 9vw, 120px) 20px;
          background: #fafaf9;
          border-top: 1px solid rgba(10,10,10,0.06);
        }
        .cr-filter-inner { max-width: 1180px; margin: 0 auto; }

        .cr-filter-table {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-top: 1px solid rgba(10,10,10,0.12);
          border-bottom: 1px solid rgba(10,10,10,0.12);
          position: relative;
        }
        /* Vertical divider painted via pseudo-element */
        .cr-filter-table::before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: rgba(10,10,10,0.08);
          pointer-events: none;
        }

        /* Header */
        .cr-filter-thead {
          display: contents;
        }
        .cr-filter-th {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 18px clamp(20px, 3vw, 36px);
          border-bottom: 1px solid rgba(10,10,10,0.08);
          background: rgba(10,10,10,0.015);
        }
        .cr-filter-th-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          border: 1px solid;
        }
        .cr-filter-th--yes .cr-filter-th-icon {
          color: #16a34a;
          background: rgba(22,163,74,0.08);
          border-color: rgba(22,163,74,0.22);
        }
        .cr-filter-th--no .cr-filter-th-icon {
          color: rgba(10,10,10,0.5);
          background: rgba(10,10,10,0.04);
          border-color: rgba(10,10,10,0.14);
        }
        .cr-filter-th-label {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a0a0a;
        }
        .cr-filter-th--no .cr-filter-th-label {
          color: rgba(10,10,10,0.55);
        }

        /* Body rows */
        .cr-filter-tbody { display: contents; }
        .cr-filter-row {
          display: contents;
        }
        .cr-filter-cell {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 14px;
          align-items: start;
          padding: 18px clamp(20px, 3vw, 36px);
          border-bottom: 1px solid rgba(10,10,10,0.06);
          will-change: opacity, transform;
        }
        .cr-filter-row:last-child .cr-filter-cell { border-bottom: 0; }
        .cr-filter-cell-bullet {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          margin-top: 8px;
        }
        .cr-filter-cell--yes .cr-filter-cell-bullet {
          background: #16a34a;
          box-shadow: 0 0 0 3px rgba(22,163,74,0.15);
        }
        .cr-filter-cell--no .cr-filter-cell-bullet {
          background: rgba(10,10,10,0.3);
        }
        .cr-filter-cell-text {
          font-family: var(--font-display);
          font-size: clamp(14.5px, 1.05vw, 16px);
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.5;
          color: #0a0a0a;
        }
        .cr-filter-cell--no .cr-filter-cell-text {
          color: rgba(10,10,10,0.55);
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 3 — STANDARD (pinned sequential replacement)

           Layout philosophy:
           - .cr-dna-stage = the pinned element (height: 100vh)
           - .cr-dna-scenes = absolutely-positioned scene container
           - .cr-dna-scene = one principle, all stacked on top of each other
           - data-rel = "active" | "past" | "future" drives the transitions
           - Active is centered, fully visible
           - Past slides RIGHT + fades out
           - Future starts BELOW (translateY) + fades in when it becomes active
           - The previous + next states never animate at the same time —
             cleanest possible swap.
        ═══════════════════════════════════════════════════════════════ */
        .cr-dna {
          background: #0a0a0a;
          color: #fafaf9;
          position: relative;
          overflow: hidden;
        }
        .cr-dna-stage {
          height: 100vh;
          min-height: 640px;
          padding: clamp(120px, 16vh, 160px) 20px clamp(80px, 10vh, 120px);
          display: flex;
          align-items: stretch;
          position: relative;
          overflow: hidden;
        }
        /* Subtle grid texture */
        .cr-dna-stage::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 80% 90% at 50% 30%, black 30%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 80% 90% at 50% 30%, black 30%, transparent 100%);
        }
        .cr-dna-inner {
          position: relative;
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: clamp(36px, 5vh, 64px);
        }

        /* Header sits above the scenes; smaller than the page H2 default */
        .cr-dna-header {
          flex-shrink: 0;
          margin-bottom: 0;
        }
        .cr-dna-header .cr-h2 {
          font-size: clamp(28px, 3.4vw, 44px);
          margin: 12px 0 12px;
          max-width: 700px;
        }
        .cr-dna-header .cr-h2-lead {
          font-size: 14.5px;
          line-height: 1.6;
          max-width: 540px;
        }

        /* Scenes container — everything from the heading down lives here */
        .cr-dna-scenes {
          position: relative;
          flex: 1 1 auto;
          min-height: 0;
        }
        .cr-dna-scene {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          /* Default: hide via opacity + tiny z-index trick */
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
          transition:
            opacity 0.55s cubic-bezier(0.32, 0.72, 0.24, 1),
            transform 0.7s cubic-bezier(0.32, 0.72, 0.24, 1);
        }
        .cr-dna-scene[data-rel="active"] {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          pointer-events: auto;
          z-index: 2;
        }
        .cr-dna-scene[data-rel="past"] {
          opacity: 0;
          transform: translate3d(60px, 0, 0); /* slid right + faded */
          z-index: 1;
        }
        .cr-dna-scene[data-rel="future"] {
          opacity: 0;
          transform: translate3d(0, 32px, 0); /* waiting below */
          z-index: 1;
        }

        .cr-dna-scene-grid {
          width: 100%;
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: clamp(40px, 5vw, 88px);
          align-items: center;
        }

        /* LEFT — meta + glyph */
        .cr-dna-scene-aside {
          display: flex;
          flex-direction: column;
          gap: 28px;
          align-items: flex-start;
        }
        .cr-dna-scene-meta {
          display: inline-flex;
          align-items: center;
          gap: 14px;
        }
        .cr-dna-scene-num {
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          font-style: italic;
          letter-spacing: -0.02em;
          color: #fafaf9;
          padding: 5px 10px;
          border: 1px solid rgba(255,255,255,0.22);
          border-radius: 6px;
          line-height: 1;
          font-variant-numeric: tabular-nums;
        }
        .cr-dna-scene-divider {
          width: 18px;
          height: 1px;
          background: rgba(255,255,255,0.25);
        }
        .cr-dna-scene-kicker {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.65);
        }
        .cr-dna-scene-glyph {
          width: clamp(160px, 14vw, 220px);
          height: clamp(160px, 14vw, 220px);
          color: rgba(255,255,255,0.85);
          opacity: 0;
          transform: scale(0.94) rotate(-2deg);
          transition:
            opacity 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s,
            transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s;
        }
        .cr-dna-scene[data-rel="active"] .cr-dna-scene-glyph {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }

        /* RIGHT — head + body */
        .cr-dna-scene-content {
          max-width: 640px;
        }
        .cr-dna-scene-head {
          font-family: var(--font-display);
          font-size: clamp(32px, 4vw, 56px);
          font-weight: 500;
          letter-spacing: -0.038em;
          line-height: 1.04;
          color: #fafaf9;
          margin: 0 0 22px;
        }
        .cr-dna-scene-body {
          font-size: clamp(15px, 1.15vw, 18px);
          line-height: 1.7;
          color: rgba(255,255,255,0.7);
          margin: 0;
          max-width: 56ch;
        }

        /* Bottom progress strip */
        .cr-dna-progress {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          gap: 24px;
          padding: 18px 0;
          border-top: 1px solid rgba(255,255,255,0.08);
          z-index: 5;
        }
        .cr-dna-progress-bars {
          display: flex;
          gap: 6px;
          flex: 1 1 auto;
        }
        .cr-dna-progress-bar {
          height: 2px;
          flex: 1 1 0;
          border-radius: 999px;
          background: rgba(255,255,255,0.12);
          transition:
            background 0.55s cubic-bezier(0.32,0.72,0.24,1),
            transform 0.55s cubic-bezier(0.32,0.72,0.24,1);
          transform-origin: left center;
        }
        .cr-dna-progress-bar[data-state="done"] {
          background: rgba(255,255,255,0.55);
        }
        .cr-dna-progress-bar[data-state="active"] {
          background: #fafaf9;
          transform: scaleY(1.6);
        }
        .cr-dna-progress-meta {
          display: inline-flex;
          align-items: baseline;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255,255,255,0.7);
          font-variant-numeric: tabular-nums;
          flex-shrink: 0;
        }
        .cr-dna-progress-current { color: #fafaf9; }
        .cr-dna-progress-sep { opacity: 0.5; padding: 0 2px; }
        .cr-dna-progress-total { opacity: 0.6; }

        /* Hide mobile cards on desktop */
        .cr-dna-cards { display: none; }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 4 — LIFE (Asymmetric mosaic)
        ═══════════════════════════════════════════════════════════════ */
        .cr-life {
          padding: clamp(96px, 12vw, 160px) 20px;
          background: #f5f5f4;
          border-top: 1px solid rgba(10,10,10,0.06);
        }
        .cr-life-inner { max-width: 1320px; margin: 0 auto; }

        .cr-life-grid {
          display: flex;
          flex-direction: column;
          gap: clamp(48px, 7vw, 96px);
        }
        .cr-life-item {
          display: grid;
          grid-template-columns: 1.05fr 1fr;
          gap: clamp(32px, 5vw, 80px);
          align-items: center;
        }
        .cr-life-item[data-side="R"] {
          grid-template-columns: 1fr 1.05fr;
        }
        .cr-life-item[data-side="R"] .cr-life-visual { order: 2; }
        .cr-life-item[data-side="R"] .cr-life-body { order: 1; }

        .cr-life-visual {
          position: relative;
          aspect-ratio: 4 / 3;
          border-radius: clamp(16px, 1.8vw, 22px);
          overflow: hidden;
          background: #0a0a0a;
          box-shadow: 0 30px 80px -40px rgba(10,10,10,0.4);
        }
        .cr-life-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.04) contrast(1.04);
          transition: transform 1.2s cubic-bezier(0.22,1,0.36,1);
        }
        .cr-life-item:hover .cr-life-img {
          transform: scale(1.05);
        }
        .cr-life-visual-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(10,10,10,0.05) 0%, rgba(10,10,10,0.4) 100%);
        }
        .cr-life-tag {
          position: absolute;
          top: 18px;
          left: 18px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a0a0a;
          background: rgba(255,255,255,0.95);
          padding: 6px 11px;
          border-radius: 999px;
          backdrop-filter: blur(8px);
        }

        .cr-life-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 520px;
        }
        .cr-life-num {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          color: rgba(10,10,10,0.4);
        }
        .cr-life-h {
          font-family: var(--font-display);
          font-size: clamp(24px, 2.8vw, 38px);
          font-weight: 500;
          letter-spacing: -0.028em;
          line-height: 1.1;
          margin: 0;
          color: #0a0a0a;
        }
        .cr-life-d {
          font-size: clamp(14.5px, 1.05vw, 16.5px);
          line-height: 1.7;
          color: rgba(10,10,10,0.62);
          margin: 0;
        }

        /* ═══════════════════════════════════════════════════════════════
           SECTION 5 — APPLY (editorial closing)
        ═══════════════════════════════════════════════════════════════ */
        .cr-apply {
          padding: clamp(112px, 16vw, 200px) 20px clamp(96px, 12vw, 160px);
          background: #fafaf9;
          border-top: 1px solid rgba(10,10,10,0.08);
          position: relative;
        }
        .cr-apply::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 50% at 50% 0%, rgba(10,10,10,0.05) 0%, transparent 70%);
        }
        .cr-apply-inner {
          position: relative;
          max-width: 1100px;
          margin: 0 auto;
        }

        .cr-apply-top {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: clamp(36px, 5vw, 56px);
        }
        .cr-apply-bin {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #0a0a0a;
          padding: 6px 12px;
          border: 1px solid rgba(10,10,10,0.18);
          border-radius: 999px;
          white-space: nowrap;
        }
        .cr-apply-rule {
          display: block;
          flex: 1 1 auto;
          height: 1px;
          background: #0a0a0a;
          transform-origin: left center;
          transform: scaleX(0);
        }
        .cr-apply-index {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: rgba(10,10,10,0.5);
          white-space: nowrap;
        }

        .cr-apply-title {
          font-family: var(--font-display);
          font-size: clamp(40px, 7.5vw, 110px);
          font-weight: 500;
          letter-spacing: -0.045em;
          line-height: 0.95;
          margin: 0 0 clamp(32px, 4vw, 48px);
          color: #0a0a0a;
        }
        .cr-apply-line {
          display: block;
          padding-bottom: 0.06em;
          overflow: visible;
        }
        .cr-apply-char {
          display: inline-block;
          will-change: transform, opacity;
        }
        .cr-apply-italic {
          font-style: italic;
          font-weight: 400;
          color: rgba(10,10,10,0.5);
        }

        .cr-apply-lead {
          font-size: clamp(15px, 1.3vw, 17px);
          color: rgba(10,10,10,0.65);
          line-height: 1.7;
          margin: 0 0 clamp(36px, 5vw, 56px);
          max-width: 56ch;
        }

        .cr-apply-actions {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 28px 36px;
          margin-bottom: clamp(48px, 6vw, 72px);
        }
        .cr-apply-btn {
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
        .cr-apply-btn:hover { transform: translateY(-2px); }
        .cr-apply-btn-label { padding: 16px 14px 16px 24px; }
        .cr-apply-btn-arrow {
          padding: 0 22px 0 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-left: 1px solid rgba(255,255,255,0.18);
          transition: background 0.3s, color 0.3s;
        }
        .cr-apply-btn:hover .cr-apply-btn-arrow {
          background: #fafaf9;
          color: #0a0a0a;
        }

        .cr-apply-mail {
          display: inline-flex;
          flex-direction: column;
          gap: 2px;
          color: #0a0a0a;
          text-decoration: none;
          line-height: 1.2;
        }
        .cr-apply-mail-k {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.4);
        }
        .cr-apply-mail-v {
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
        .cr-apply-mail:hover .cr-apply-mail-v { background-size: 0% 1px; }

        .cr-apply-meta {
          margin: 0;
          padding: clamp(20px, 2.5vw, 28px) 0 0;
          border-top: 1px solid rgba(10,10,10,0.12);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .cr-apply-meta-row {
          padding: 0 24px;
          border-right: 1px solid rgba(10,10,10,0.08);
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cr-apply-meta-row:first-child { padding-left: 0; }
        .cr-apply-meta-row:last-child { border-right: 0; padding-right: 0; }
        .cr-apply-meta-row dt {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10,10,10,0.45);
          margin: 0;
        }
        .cr-apply-meta-row dd {
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
          .cr-hero-bottom {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .cr-hero-pull { max-width: 100%; }

          /* Filter — keep two-column structure but tighten */
          .cr-filter-th { padding: 14px 18px; }
          .cr-filter-cell { padding: 16px 18px; }

          /* DNA — release the pin, render as stacked clean cards.
             Hide desktop scenes + progress, show mobile cards. */
          .cr-dna-stage {
            height: auto;
            min-height: 0;
            padding: clamp(80px, 10vw, 128px) 20px;
            overflow: visible;
          }
          .cr-dna-stage::before { display: none; }
          .cr-dna-inner {
            gap: clamp(36px, 5vw, 56px);
          }
          .cr-dna-header .cr-h2 {
            font-size: clamp(34px, 4.6vw, 52px);
          }
          .cr-dna-header .cr-h2-lead { font-size: 16px; line-height: 1.7; }
          .cr-dna-scenes { display: none; }
          .cr-dna-cards {
            display: flex;
            flex-direction: column;
            gap: 14px;
            list-style: none;
            padding: 0;
            margin: 0;
          }
          .cr-dna-card {
            position: relative;
            padding: 28px 28px 30px;
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 16px;
            background: rgba(255,255,255,0.02);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            display: flex;
            flex-direction: column;
            gap: 14px;
            transition: border-color 0.3s ease, background 0.3s ease;
          }
          .cr-dna-card:hover {
            border-color: rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.035);
          }
          .cr-dna-card-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
          }
          .cr-dna-card-num {
            font-family: var(--font-display);
            font-size: 22px;
            font-weight: 500;
            font-style: italic;
            letter-spacing: -0.02em;
            color: #fafaf9;
            padding: 5px 10px;
            border: 1px solid rgba(255,255,255,0.22);
            border-radius: 6px;
            line-height: 1;
            font-variant-numeric: tabular-nums;
          }
          .cr-dna-card-glyph {
            width: 56px;
            height: 56px;
            color: rgba(255,255,255,0.7);
            flex-shrink: 0;
          }
          .cr-dna-card-kicker {
            font-family: var(--font-mono);
            font-size: 10.5px;
            font-weight: 600;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.55);
          }
          .cr-dna-card-head {
            font-family: var(--font-display);
            font-size: clamp(22px, 3vw, 28px);
            font-weight: 500;
            letter-spacing: -0.028em;
            line-height: 1.12;
            margin: 0;
            color: #fafaf9;
          }
          .cr-dna-card-body {
            font-size: 14.5px;
            line-height: 1.7;
            color: rgba(255,255,255,0.65);
            margin: 0;
          }

          .cr-life-item,
          .cr-life-item[data-side="R"] {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .cr-life-item[data-side="R"] .cr-life-visual { order: 0; }
          .cr-life-item[data-side="R"] .cr-life-body { order: 1; }

          .cr-apply-meta { grid-template-columns: repeat(2, 1fr); }
          .cr-apply-meta-row {
            padding: 18px 18px 18px 0;
            border-right: 1px solid rgba(10,10,10,0.08);
            border-bottom: 1px solid rgba(10,10,10,0.08);
          }
          .cr-apply-meta-row:nth-child(2) { border-right: 0; padding-right: 0; }
          .cr-apply-meta-row:nth-child(3) { padding-left: 0; }
          .cr-apply-meta-row:nth-child(3),
          .cr-apply-meta-row:nth-child(4) { border-bottom: 0; }
          .cr-apply-meta-row:first-child { padding-left: 0; }
          .cr-apply-meta-row:last-child { padding-right: 0; }
        }

        @media (max-width: 768px) {
          .cr-hero {
            padding: clamp(204px, 25svh, 226px) 14px 92px;
            min-height: 100svh;
          }
          .cr-hero-meta { margin-bottom: 32px; gap: 10px; }
          .cr-hero-bin { font-size: 10px; padding: 5px 10px; }
          .cr-hero-index { font-size: 10px; }
          .cr-hero-title {
            font-size: clamp(27px, 9.1vw, 44px);
            line-height: 0.98;
            margin-bottom: 32px;
          }
          .cr-hero-bottom { gap: 24px; }
          .cr-hero-lead { font-size: 14.5px; line-height: 1.65; }
          .cr-hero-pull { padding: 18px 22px 20px; border-radius: 0 10px 10px 0; }
          .cr-hero-pull p { font-size: 16px; line-height: 1.4; }

          .cr-ticker { height: 48px; }
          .cr-ticker-item { font-size: 13px; padding: 0 16px; gap: 16px; }

          .cr-filter,
          .cr-dna,
          .cr-life,
          .cr-apply {
            padding-left: 14px;
            padding-right: 14px;
          }

          .cr-section-meta { gap: 12px; }
          .cr-section-bin, .cr-section-bin--light { font-size: 10px; padding: 4px 10px; }
          .cr-section-index, .cr-section-index--light { font-size: 10px; }

          .cr-h2 {
            font-size: clamp(28px, 8vw, 44px);
            margin-top: 14px;
          }
          .cr-h2-lead { font-size: 14.5px; line-height: 1.65; }

          /* Filter — single-column stack on phones for max readability.
             We turn the table into two stacked sub-tables, each with its
             own header so the meaning of each column never gets lost. */
          .cr-filter-table {
            grid-template-columns: 1fr;
          }
          .cr-filter-table::before {
            display: none;
          }
          .cr-filter-th {
            padding: 14px 16px;
          }
          .cr-filter-cell {
            padding: 14px 16px;
          }
          /* Re-flow rows: yes-cell from row 1 sits right after header-yes,
             then no-cell from row 1 after header-no. Use grid-row to slot. */
          /* Simpler: make each row's two cells stack inside the row */
          .cr-filter-row {
            display: contents;
          }
          .cr-filter-cell {
            grid-template-columns: 14px 1fr;
            gap: 12px;
          }
          .cr-filter-cell-text { font-size: 14px; line-height: 1.5; }

          /* DNA mobile cards — tighter padding */
          .cr-dna-card { padding: 22px 20px 24px; gap: 12px; border-radius: 14px; }
          .cr-dna-card-num { font-size: 18px; padding: 4px 8px; }
          .cr-dna-card-glyph { width: 44px; height: 44px; }
          .cr-dna-card-kicker { font-size: 10px; }
          .cr-dna-card-head { font-size: 20px; line-height: 1.15; }
          .cr-dna-card-body { font-size: 13.5px; line-height: 1.65; }

          .cr-life-grid { gap: 56px; }
          .cr-life-visual { aspect-ratio: 16 / 11; border-radius: 14px; }
          .cr-life-tag { top: 12px; left: 12px; font-size: 9px; padding: 5px 9px; }
          .cr-life-body { gap: 12px; }
          .cr-life-h { font-size: 22px; line-height: 1.15; }
          .cr-life-d { font-size: 14px; line-height: 1.65; }

          .cr-apply { padding-top: clamp(80px, 14vw, 112px); }
          .cr-apply-top { gap: 12px; margin-bottom: 28px; }
          .cr-apply-title { font-size: clamp(34px, 11vw, 52px); }
          .cr-apply-lead { font-size: 14.5px; margin-bottom: 32px; }
          .cr-apply-actions { gap: 22px; margin-bottom: 36px; }
          .cr-apply-btn-label { padding: 14px 12px 14px 22px; }
          .cr-apply-btn-arrow { padding: 0 18px 0 12px; }
          .cr-apply-mail-v { font-size: 16px; }
          .cr-apply-meta { grid-template-columns: 1fr 1fr; }
          .cr-apply-meta-row { padding: 14px 14px 14px 0; }
          .cr-apply-meta-row:nth-child(odd) { padding-left: 0; }
          .cr-apply-meta-row:nth-child(even) { padding-right: 0; border-right: 0; }
          .cr-apply-meta-row dd { font-size: 15px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .cr-ticker-track { animation: none !important; }
          .cr-life-img { transition: none; }
          .cr-life-item:hover .cr-life-img { transform: none; }
          .cr-hero-bin-dot { animation: none; }
          /* DNA — disable scene transitions, show all stacked instantly.
             Falls back to mobile-card layout via CSS, regardless of width. */
          .cr-dna-scene,
          .cr-dna-scene[data-rel="active"],
          .cr-dna-scene[data-rel="past"],
          .cr-dna-scene[data-rel="future"] {
            transition: none !important;
          }
          .cr-dna-scene-glyph {
            transition: none !important;
          }
          .cr-dna-progress-bar { transition: none !important; }
        }
      `}</style>
    </>
  );
}