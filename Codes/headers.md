// // "use client";

// // import { useEffect, useRef, useState } from "react";

// // /* ──────────────────────────────────────────────────────────────────────────
// //    SiteHeader

// //    A reusable header for the entire marketing site. Drop <SiteHeader /> at
// //    the top of any page inside the main layout and it will handle itself.

// //    Design notes
// //    ────────────
// //    • The "Services" item opens a mega-menu on hover (desktop) / tap (mobile).
// //      This is the pattern used by every serious software studio site
// //      (Thoughtbot, Work & Co, EPAM, ustwo) because a flat link can't do
// //      justice to 6 distinct capabilities.

// //    • Scroll behavior: the header is transparent at the top of the page and
// //      switches to a frosted "compact" state after 24px of scroll. This keeps
// //      the hero feeling spacious and signals scroll progress without
// //      shouting about it.

// //    • Typography: all text uses var(--font-display) / var(--font-body) from
// //      globals.css. No hardcoded font-family in this file — change fonts once
// //      in globals.css and everything updates.

// //    • Mobile: a full-height drawer with an accordion for Services. The
// //      trigger is a 3-line burger that morphs into an X.
// //    ────────────────────────────────────────────────────────────────────────── */

// // // ── Nav data ────────────────────────────────────────────────────────────────

// // type SubItem = {
// //   num: string;
// //   title: string;
// //   desc: string;
// //   href: string;
// //   accent: string;
// // };

// // const SERVICES: SubItem[] = [
// //   {
// //     num: "01",
// //     title: "Product Engineering",
// //     desc: "Full-stack web & platform builds, zero to production.",
// //     href: "/services/product-engineering",
// //     accent: "#a3e635",
// //   },
// //   {
// //     num: "02",
// //     title: "Mobile Development",
// //     desc: "Native & cross-platform apps for iOS and Android.",
// //     href: "/services/mobile",
// //     accent: "#38bdf8",
// //   },
// //   {
// //     num: "03",
// //     title: "Cloud & DevOps",
// //     desc: "Infrastructure, CI/CD and reliability engineering.",
// //     href: "/services/cloud-devops",
// //     accent: "#f472b6",
// //   },
// //   {
// //     num: "04",
// //     title: "AI & Data Engineering",
// //     desc: "LLMs, pipelines, recommendation and ranking systems.",
// //     href: "/services/ai-data",
// //     accent: "#fbbf24",
// //   },
// //   {
// //     num: "05",
// //     title: "UX/UI Design",
// //     desc: "Design systems, research and interaction design.",
// //     href: "/services/design",
// //     accent: "#c084fc",
// //   },
// //   {
// //     num: "06",
// //     title: "Tech Strategy & CTO",
// //     desc: "Fractional leadership, audits and technical due diligence.",
// //     href: "/services/strategy",
// //     accent: "#fafaf9",
// //   },
// // ];

// // type NavItem = {
// //   label: string;
// //   href: string;
// //   mega?: boolean;
// // };

// // const NAV: NavItem[] = [
// //   { label: "Home", href: "/" },
// //   { label: "Services", href: "/services", mega: true },
// //   { label: "Insights", href: "/insights" },
// //   { label: "About", href: "/about" },
// //   { label: "Careers", href: "/careers" },
// // ];

// // // ── Component ───────────────────────────────────────────────────────────────

// // export default function SiteHeader() {
// //   const [scrolled, setScrolled] = useState(false);
// //   const [megaOpen, setMegaOpen] = useState(false);
// //   const [mobileOpen, setMobileOpen] = useState(false);
// //   const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
// //   const [time, setTime] = useState("");

// //   // Hover intent — a short delay before closing so users can move the
// //   // cursor diagonally from trigger → panel without the menu collapsing.
// //   const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

// //   // Scroll → compact state
// //   useEffect(() => {
// //     const onScroll = () => setScrolled(window.scrollY > 24);
// //     onScroll();
// //     window.addEventListener("scroll", onScroll, { passive: true });
// //     return () => window.removeEventListener("scroll", onScroll);
// //   }, []);

// //   // Live Karachi time (studio signal)
// //   useEffect(() => {
// //     const tick = () => {
// //       const d = new Date();
// //       const hh = d.getHours().toString().padStart(2, "0");
// //       const mm = d.getMinutes().toString().padStart(2, "0");
// //       setTime(`${hh}:${mm}`);
// //     };
// //     tick();
// //     const id = setInterval(tick, 30_000);
// //     return () => clearInterval(id);
// //   }, []);

// //   // Lock body scroll when the mobile drawer is open
// //   useEffect(() => {
// //     if (mobileOpen) {
// //       const prev = document.body.style.overflow;
// //       document.body.style.overflow = "hidden";
// //       return () => {
// //         document.body.style.overflow = prev;
// //       };
// //     }
// //   }, [mobileOpen]);

// //   // Close drawers on Escape
// //   useEffect(() => {
// //     const onKey = (e: KeyboardEvent) => {
// //       if (e.key === "Escape") {
// //         setMegaOpen(false);
// //         setMobileOpen(false);
// //       }
// //     };
// //     window.addEventListener("keydown", onKey);
// //     return () => window.removeEventListener("keydown", onKey);
// //   }, []);

// //   const openMega = () => {
// //     if (closeTimer.current) clearTimeout(closeTimer.current);
// //     setMegaOpen(true);
// //   };
// //   const scheduleCloseMega = () => {
// //     if (closeTimer.current) clearTimeout(closeTimer.current);
// //     closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
// //   };

// //   return (
// //     <>
// //       <header
// //         className="site-header"
// //         data-scrolled={scrolled ? "true" : "false"}
// //         onMouseLeave={scheduleCloseMega}
// //       >
// //         <div className="site-header__inner">
// //           {/* ── Logo ── */}
// //           <a href="/" className="site-header__brand" aria-label="TechBinaries — home">
// //             <span className="site-header__mark" aria-hidden>
// //               <span className="site-header__mark-inner" />
// //             </span>
// //             <span className="site-header__wordmark font-display">
// //               techbinaries<span className="site-header__dot">.</span>
// //             </span>
// //           </a>

// //           {/* ── Primary nav (desktop) ── */}
// //           <nav className="site-header__nav" aria-label="Primary">
// //             {NAV.map((item) => {
// //               if (item.mega) {
// //                 return (
// //                   <div
// //                     key={item.label}
// //                     className="site-header__nav-item"
// //                     onMouseEnter={openMega}
// //                     onFocus={openMega}
// //                   >
// //                     <button
// //                       type="button"
// //                       className="site-header__nav-link"
// //                       aria-haspopup="true"
// //                       aria-expanded={megaOpen}
// //                       onClick={() => setMegaOpen((v) => !v)}
// //                     >
// //                       {item.label}
// //                       <svg
// //                         aria-hidden
// //                         width="10"
// //                         height="10"
// //                         viewBox="0 0 10 10"
// //                         className="site-header__chevron"
// //                         data-open={megaOpen ? "true" : "false"}
// //                       >
// //                         <path
// //                           d="M2 3.5 L5 6.5 L8 3.5"
// //                           fill="none"
// //                           stroke="currentColor"
// //                           strokeWidth="1.4"
// //                           strokeLinecap="round"
// //                           strokeLinejoin="round"
// //                         />
// //                       </svg>
// //                     </button>
// //                   </div>
// //                 );
// //               }
// //               return (
// //                 <a key={item.label} href={item.href} className="site-header__nav-link">
// //                   {item.label}
// //                 </a>
// //               );
// //             })}
// //           </nav>

// //           {/* ── Right cluster: status + CTA + mobile trigger ── */}
// //           <div className="site-header__right">
// //             <div className="site-header__status" aria-label="Studio status">
// //               <span className="site-header__status-dot" />
// //               <span className="site-header__status-time">{time || "—"}</span>
// //               <span className="site-header__status-city">KHI</span>
// //             </div>

// //             <a href="/contact" className="site-header__cta">
// //               <span>Contact us</span>
// //               <svg
// //                 aria-hidden
// //                 width="12"
// //                 height="12"
// //                 viewBox="0 0 12 12"
// //                 className="site-header__cta-arrow"
// //               >
// //                 <path
// //                   d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   strokeWidth="1.4"
// //                   strokeLinecap="round"
// //                   strokeLinejoin="round"
// //                 />
// //               </svg>
// //             </a>

// //             <button
// //               type="button"
// //               className="site-header__burger"
// //               aria-label={mobileOpen ? "Close menu" : "Open menu"}
// //               aria-expanded={mobileOpen}
// //               onClick={() => setMobileOpen((v) => !v)}
// //               data-open={mobileOpen ? "true" : "false"}
// //             >
// //               <span />
// //               <span />
// //               <span />
// //             </button>
// //           </div>
// //         </div>

// //         {/* ── Mega menu ── */}
// //         <div
// //           className="site-header__mega"
// //           data-open={megaOpen ? "true" : "false"}
// //           onMouseEnter={openMega}
// //           onMouseLeave={scheduleCloseMega}
// //           aria-hidden={!megaOpen}
// //         >
// //           <div className="site-header__mega-inner">
// //             <div className="site-header__mega-left">
// //               <div className="eyebrow">What we do</div>
// //               <h3 className="site-header__mega-title font-display">
// //                 Six capabilities.
// //                 <br />
// //                 <span className="site-header__mega-title-italic">One senior team.</span>
// //               </h3>
// //               <p className="site-header__mega-lead">
// //                 From zero-to-one product work to steady-state scale engineering — we
// //                 meet you where you are and ship what actually matters.
// //               </p>
// //               <a href="/services" className="site-header__mega-all">
// //                 View all capabilities
// //                 <svg aria-hidden width="12" height="12" viewBox="0 0 12 12">
// //                   <path
// //                     d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     strokeWidth="1.4"
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                   />
// //                 </svg>
// //               </a>
// //             </div>

// //             <ul className="site-header__mega-grid" role="list">
// //               {SERVICES.map((s) => (
// //                 <li key={s.num}>
// //                   <a href={s.href} className="site-header__mega-card">
// //                     <div className="site-header__mega-card-top">
// //                       <span
// //                         className="site-header__mega-card-dot"
// //                         style={{ background: s.accent }}
// //                       />
// //                       <span className="site-header__mega-card-num">{s.num}</span>
// //                     </div>
// //                     <div className="site-header__mega-card-title font-display">
// //                       {s.title}
// //                     </div>
// //                     <div className="site-header__mega-card-desc">{s.desc}</div>
// //                     <span className="site-header__mega-card-arrow" aria-hidden>
// //                       →
// //                     </span>
// //                   </a>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       </header>

// //       {/* ── Mobile drawer ── */}
// //       <div
// //         className="site-drawer"
// //         data-open={mobileOpen ? "true" : "false"}
// //         aria-hidden={!mobileOpen}
// //       >
// //         <div className="site-drawer__scrim" onClick={() => setMobileOpen(false)} />
// //         <div className="site-drawer__panel" role="dialog" aria-modal="true">
// //           <nav className="site-drawer__nav">
// //             {NAV.map((item) => {
// //               if (item.mega) {
// //                 return (
// //                   <div key={item.label} className="site-drawer__group">
// //                     <button
// //                       type="button"
// //                       className="site-drawer__link"
// //                       onClick={() => setMobileServicesOpen((v) => !v)}
// //                       aria-expanded={mobileServicesOpen}
// //                     >
// //                       <span>{item.label}</span>
// //                       <span
// //                         className="site-drawer__chev"
// //                         data-open={mobileServicesOpen ? "true" : "false"}
// //                       >
// //                         +
// //                       </span>
// //                     </button>
// //                     <div
// //                       className="site-drawer__sub"
// //                       data-open={mobileServicesOpen ? "true" : "false"}
// //                     >
// //                       {SERVICES.map((s) => (
// //                         <a
// //                           key={s.num}
// //                           href={s.href}
// //                           className="site-drawer__sublink"
// //                           onClick={() => setMobileOpen(false)}
// //                         >
// //                           <span
// //                             className="site-drawer__sub-dot"
// //                             style={{ background: s.accent }}
// //                           />
// //                           <span>
// //                             <span className="site-drawer__sub-num">{s.num}</span>
// //                             {s.title}
// //                           </span>
// //                         </a>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 );
// //               }
// //               return (
// //                 <a
// //                   key={item.label}
// //                   href={item.href}
// //                   className="site-drawer__link"
// //                   onClick={() => setMobileOpen(false)}
// //                 >
// //                   <span>{item.label}</span>
// //                   <span className="site-drawer__arrow" aria-hidden>
// //                     →
// //                   </span>
// //                 </a>
// //               );
// //             })}
// //             <a
// //               href="/contact"
// //               className="site-drawer__link"
// //               onClick={() => setMobileOpen(false)}
// //             >
// //               <span>Contact us</span>
// //               <span className="site-drawer__arrow" aria-hidden>
// //                 →
// //               </span>
// //             </a>
// //           </nav>

// //           <div className="site-drawer__foot">
// //             <a href="mailto:hello@techbinaries.com" className="site-drawer__cta">
// //               hello@techbinaries.com
// //             </a>
// //             <div className="site-drawer__status">
// //               <span className="site-header__status-dot" />
// //               <span className="site-header__status-time">{time || "—"}</span>
// //               <span className="site-header__status-city">KHI</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ── Styles ────────────────────────────────────────────────────── */}
// //       <style>{`
// //         /* Tokens local to the header — kept narrow so the global tokens in
// //            globals.css stay the source of truth for type + color. */
// //         .site-header {
// //           position: fixed;
// //           top: 0; left: 0; right: 0;
// //           z-index: 80;
// //           height: var(--header-height);
// //           transition:
// //             height 0.35s cubic-bezier(0.22, 1, 0.36, 1),
// //             background 0.35s ease,
// //             backdrop-filter 0.35s ease,
// //             border-color 0.35s ease;
// //           background: transparent;
// //           border-bottom: 1px solid transparent;
// //         }
// //         .site-header[data-scrolled="true"] {
// //           height: var(--header-height-compact);
// //           background: rgba(250, 250, 249, 0.78);
// //           backdrop-filter: saturate(180%) blur(20px);
// //           -webkit-backdrop-filter: saturate(180%) blur(20px);
// //           border-bottom-color: var(--color-line);
// //         }

// //         .site-header__inner {
// //           max-width: 1320px;
// //           height: 100%;
// //           margin: 0 auto;
// //           padding: 0 32px;
// //           display: grid;
// //           grid-template-columns: auto 1fr auto;
// //           align-items: center;
// //           gap: 24px;
// //         }

// //         /* ── Brand ── */
// //         .site-header__brand {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 10px;
// //           text-decoration: none;
// //           color: var(--color-ink);
// //         }
// //         .site-header__mark {
// //           position: relative;
// //           width: 22px; height: 22px;
// //           border: 1.6px solid var(--color-ink);
// //           border-radius: 50%;
// //           display: inline-flex;
// //           align-items: center;
// //           justify-content: center;
// //         }
// //         .site-header__mark-inner {
// //           width: 8px; height: 8px;
// //           background: var(--color-ink);
// //           border-radius: 50%;
// //         }
// //         .site-header__wordmark {
// //           font-weight: 600;
// //           font-size: 16px;
// //           letter-spacing: -0.01em;
// //         }
// //         .site-header__dot {
// //           color: rgba(10, 10, 10, 0.25);
// //         }

// //         /* ── Primary nav ── */
// //         .site-header__nav {
// //           display: flex;
// //           justify-content: center;
// //           align-items: center;
// //           gap: 2px;
// //         }
// //         .site-header__nav-item { position: relative; }

// //         .site-header__nav-link {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 6px;
// //           padding: 9px 14px;
// //           border: 0;
// //           background: transparent;
// //           color: rgba(10, 10, 10, 0.6);
// //           font-family: var(--font-body);
// //           font-size: 14px;
// //           font-weight: 500;
// //           letter-spacing: -0.005em;
// //           text-decoration: none;
// //           border-radius: 999px;
// //           cursor: pointer;
// //           transition: color 0.2s ease, background 0.2s ease;
// //         }
// //         .site-header__nav-link:hover,
// //         .site-header__nav-link:focus-visible {
// //           color: var(--color-ink);
// //           background: rgba(10, 10, 10, 0.04);
// //           outline: none;
// //         }
// //         .site-header__chevron {
// //           transition: transform 0.25s ease;
// //           color: currentColor;
// //           opacity: 0.7;
// //         }
// //         .site-header__chevron[data-open="true"] {
// //           transform: rotate(180deg);
// //         }

// //         /* ── Right cluster ── */
// //         .site-header__right {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 16px;
// //         }

// //         .site-header__status {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 8px;
// //           padding: 6px 12px;
// //           border: 1px solid var(--color-line);
// //           border-radius: 999px;
// //           font-family: var(--font-body);
// //           font-size: 12px;
// //           color: rgba(10, 10, 10, 0.6);
// //           background: rgba(255, 255, 255, 0.4);
// //         }
// //         .site-header__status-dot {
// //           width: 6px; height: 6px;
// //           border-radius: 50%;
// //           background: #16a34a;
// //           box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.18);
// //           animation: tb-pulse 2s ease-out infinite;
// //         }
// //         @keyframes tb-pulse {
// //           0%   { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.35); }
// //           70%  { box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); }
// //           100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
// //         }
// //         .site-header__status-time {
// //           font-variant-numeric: tabular-nums;
// //           color: var(--color-ink);
// //           font-weight: 500;
// //         }
// //         .site-header__status-city {
// //           opacity: 0.5;
// //           letter-spacing: 0.02em;
// //         }

// //         .site-header__cta {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 8px;
// //           padding: 10px 18px;
// //           background: var(--color-ink);
// //           color: var(--color-paper);
// //           border-radius: 999px;
// //           font-family: var(--font-body);
// //           font-size: 13px;
// //           font-weight: 500;
// //           letter-spacing: -0.005em;
// //           text-decoration: none;
// //           transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), background 0.2s;
// //         }
// //         .site-header__cta:hover { background: #1a1a1a; }
// //         .site-header__cta:hover .site-header__cta-arrow {
// //           transform: translateX(2px);
// //         }
// //         .site-header__cta-arrow { transition: transform 0.25s ease; }

// //         /* ── Burger (mobile) ── */
// //         .site-header__burger {
// //           display: none;
// //           width: 40px; height: 40px;
// //           border: 1px solid var(--color-line);
// //           border-radius: 10px;
// //           background: rgba(255,255,255,0.6);
// //           cursor: pointer;
// //           position: relative;
// //           padding: 0;
// //         }
// //         .site-header__burger span {
// //           position: absolute;
// //           left: 10px; right: 10px;
// //           height: 1.5px;
// //           background: var(--color-ink);
// //           border-radius: 2px;
// //           transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
// //                       opacity 0.2s ease,
// //                       top 0.35s cubic-bezier(0.22,1,0.36,1);
// //         }
// //         .site-header__burger span:nth-child(1) { top: 13px; }
// //         .site-header__burger span:nth-child(2) { top: 19px; }
// //         .site-header__burger span:nth-child(3) { top: 25px; }
// //         .site-header__burger[data-open="true"] span:nth-child(1) {
// //           top: 19px; transform: rotate(45deg);
// //         }
// //         .site-header__burger[data-open="true"] span:nth-child(2) { opacity: 0; }
// //         .site-header__burger[data-open="true"] span:nth-child(3) {
// //           top: 19px; transform: rotate(-45deg);
// //         }

// //         /* ── Mega menu ── */
// //         .site-header__mega {
// //           position: absolute;
// //           top: 100%;
// //           left: 0; right: 0;
// //           background: rgba(250, 250, 249, 0.92);
// //           backdrop-filter: saturate(180%) blur(24px);
// //           -webkit-backdrop-filter: saturate(180%) blur(24px);
// //           border-bottom: 1px solid var(--color-line);
// //           border-top: 1px solid var(--color-line);
// //           opacity: 0;
// //           visibility: hidden;
// //           transform: translateY(-6px);
// //           transition:
// //             opacity 0.3s cubic-bezier(0.22,1,0.36,1),
// //             transform 0.3s cubic-bezier(0.22,1,0.36,1),
// //             visibility 0s linear 0.3s;
// //           pointer-events: none;
// //         }
// //         .site-header__mega[data-open="true"] {
// //           opacity: 1;
// //           visibility: visible;
// //           transform: translateY(0);
// //           pointer-events: auto;
// //           transition:
// //             opacity 0.3s cubic-bezier(0.22,1,0.36,1),
// //             transform 0.3s cubic-bezier(0.22,1,0.36,1),
// //             visibility 0s linear 0s;
// //         }

// //         .site-header__mega-inner {
// //           max-width: 1320px;
// //           margin: 0 auto;
// //           padding: 40px 32px 44px;
// //           display: grid;
// //           grid-template-columns: 0.9fr 1.6fr;
// //           gap: 56px;
// //           align-items: start;
// //         }

// //         .site-header__mega-left { max-width: 340px; }
// //         .site-header__mega-title {
// //           font-size: 34px;
// //           font-weight: 500;
// //           line-height: 1.05;
// //           letter-spacing: -0.03em;
// //           margin: 16px 0 16px;
// //         }
// //         .site-header__mega-title-italic {
// //           font-style: italic;
// //           font-weight: 400;
// //           color: rgba(10, 10, 10, 0.55);
// //         }
// //         .site-header__mega-lead {
// //           font-family: var(--font-body);
// //           font-size: 14px;
// //           line-height: 1.65;
// //           color: rgba(10, 10, 10, 0.6);
// //           margin: 0 0 24px;
// //         }
// //         .site-header__mega-all {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 8px;
// //           font-family: var(--font-body);
// //           font-size: 13px;
// //           font-weight: 500;
// //           text-decoration: none;
// //           color: var(--color-ink);
// //           padding: 9px 16px;
// //           border: 1px solid var(--color-ink);
// //           border-radius: 999px;
// //           transition: background 0.2s, color 0.2s;
// //         }
// //         .site-header__mega-all:hover {
// //           background: var(--color-ink);
// //           color: var(--color-paper);
// //         }

// //         .site-header__mega-grid {
// //           list-style: none;
// //           margin: 0;
// //           padding: 0;
// //           display: grid;
// //           grid-template-columns: repeat(3, 1fr);
// //           gap: 4px;
// //         }

// //         .site-header__mega-card {
// //           position: relative;
// //           display: block;
// //           padding: 18px 18px 22px;
// //           border-radius: 14px;
// //           text-decoration: none;
// //           color: var(--color-ink);
// //           transition: background 0.25s ease;
// //         }
// //         .site-header__mega-card:hover {
// //           background: rgba(10, 10, 10, 0.04);
// //         }
// //         .site-header__mega-card-top {
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           margin-bottom: 14px;
// //         }
// //         .site-header__mega-card-dot {
// //           width: 10px; height: 10px;
// //           border-radius: 50%;
// //           box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.04);
// //         }
// //         .site-header__mega-card-num {
// //           font-family: var(--font-display);
// //           font-size: 12px;
// //           font-weight: 500;
// //           color: rgba(10, 10, 10, 0.4);
// //           font-variant-numeric: tabular-nums;
// //         }
// //         .site-header__mega-card-title {
// //           font-size: 16px;
// //           font-weight: 500;
// //           letter-spacing: -0.015em;
// //           margin-bottom: 6px;
// //         }
// //         .site-header__mega-card-desc {
// //           font-family: var(--font-body);
// //           font-size: 13px;
// //           line-height: 1.55;
// //           color: rgba(10, 10, 10, 0.55);
// //         }
// //         .site-header__mega-card-arrow {
// //           position: absolute;
// //           top: 18px; right: 18px;
// //           font-size: 14px;
// //           color: rgba(10, 10, 10, 0.3);
// //           opacity: 0;
// //           transform: translate(-4px, 0);
// //           transition: opacity 0.25s, transform 0.25s;
// //         }
// //         .site-header__mega-card:hover .site-header__mega-card-arrow {
// //           opacity: 1;
// //           transform: translate(0, 0);
// //           color: var(--color-ink);
// //         }

// //         /* ── Mobile drawer ── */
// //         .site-drawer {
// //           position: fixed;
// //           inset: 0;
// //           z-index: 90;
// //           pointer-events: none;
// //         }
// //         .site-drawer[data-open="true"] { pointer-events: auto; }
// //         .site-drawer__scrim {
// //           position: absolute;
// //           inset: 0;
// //           background: rgba(10, 10, 10, 0.35);
// //           opacity: 0;
// //           transition: opacity 0.3s ease;
// //         }
// //         .site-drawer[data-open="true"] .site-drawer__scrim { opacity: 1; }

// //         .site-drawer__panel {
// //           position: absolute;
// //           top: 0; right: 0; bottom: 0;
// //           width: min(420px, 100%);
// //           background: var(--color-paper);
// //           border-left: 1px solid var(--color-line);
// //           padding: calc(var(--header-height-compact) + 16px) 24px 24px;
// //           display: flex;
// //           flex-direction: column;
// //           justify-content: space-between;
// //           transform: translateX(100%);
// //           transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
// //           overflow-y: auto;
// //         }
// //         .site-drawer[data-open="true"] .site-drawer__panel {
// //           transform: translateX(0);
// //         }

// //         .site-drawer__nav {
// //           display: flex;
// //           flex-direction: column;
// //         }
// //         .site-drawer__link {
// //           display: flex;
// //           align-items: center;
// //           justify-content: space-between;
// //           gap: 12px;
// //           padding: 18px 4px;
// //           font-family: var(--font-display);
// //           font-size: 26px;
// //           font-weight: 500;
// //           letter-spacing: -0.02em;
// //           color: var(--color-ink);
// //           border: 0;
// //           border-bottom: 1px solid var(--color-line);
// //           background: transparent;
// //           text-decoration: none;
// //           text-align: left;
// //           cursor: pointer;
// //           width: 100%;
// //         }
// //         .site-drawer__arrow {
// //           font-size: 18px;
// //           color: rgba(10, 10, 10, 0.3);
// //         }
// //         .site-drawer__chev {
// //           width: 28px; height: 28px;
// //           display: inline-flex;
// //           align-items: center;
// //           justify-content: center;
// //           border: 1px solid var(--color-line);
// //           border-radius: 50%;
// //           font-size: 16px;
// //           font-weight: 400;
// //           color: var(--color-ink);
// //           transition: transform 0.3s ease, background 0.2s ease;
// //         }
// //         .site-drawer__chev[data-open="true"] {
// //           transform: rotate(45deg);
// //           background: var(--color-ink);
// //           color: var(--color-paper);
// //         }

// //         .site-drawer__sub {
// //           max-height: 0;
// //           overflow: hidden;
// //           transition: max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
// //         }
// //         .site-drawer__sub[data-open="true"] {
// //           max-height: 600px;
// //         }
// //         .site-drawer__sublink {
// //           display: flex;
// //           align-items: center;
// //           gap: 14px;
// //           padding: 14px 4px;
// //           font-family: var(--font-body);
// //           font-size: 15px;
// //           font-weight: 500;
// //           color: rgba(10, 10, 10, 0.72);
// //           text-decoration: none;
// //           border-bottom: 1px solid var(--color-line);
// //         }
// //         .site-drawer__sub-dot {
// //           width: 8px; height: 8px;
// //           border-radius: 50%;
// //           flex-shrink: 0;
// //         }
// //         .site-drawer__sub-num {
// //           font-family: var(--font-display);
// //           font-size: 12px;
// //           color: rgba(10, 10, 10, 0.4);
// //           margin-right: 10px;
// //           font-variant-numeric: tabular-nums;
// //         }

// //         .site-drawer__foot {
// //           padding-top: 24px;
// //           display: flex;
// //           flex-direction: column;
// //           gap: 14px;
// //         }
// //         .site-drawer__cta {
// //           display: inline-flex;
// //           align-items: center;
// //           justify-content: center;
// //           padding: 14px 22px;
// //           background: var(--color-ink);
// //           color: var(--color-paper);
// //           border-radius: 999px;
// //           font-family: var(--font-body);
// //           font-size: 14px;
// //           font-weight: 500;
// //           text-decoration: none;
// //         }
// //         .site-drawer__status {
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 8px;
// //           align-self: flex-start;
// //           padding: 6px 12px;
// //           border: 1px solid var(--color-line);
// //           border-radius: 999px;
// //           font-family: var(--font-body);
// //           font-size: 12px;
// //           color: rgba(10, 10, 10, 0.6);
// //         }

// //         /* ── Responsive ── */
// //         @media (max-width: 1024px) {
// //           .site-header__mega-inner {
// //             grid-template-columns: 1fr;
// //             gap: 32px;
// //             padding: 28px 24px 32px;
// //           }
// //           .site-header__mega-grid { grid-template-columns: repeat(2, 1fr); }
// //           .site-header__mega-title { font-size: 28px; }
// //         }
// //         @media (max-width: 900px) {
// //           .site-header__inner { padding: 0 20px; gap: 12px; }
// //           .site-header__nav { display: none; }
// //           .site-header__status { display: none; }
// //           .site-header__cta { display: none; }
// //           .site-header__burger { display: inline-flex; align-items: center; justify-content: center; }
// //           /* On mobile we never show the mega menu — the drawer takes over */
// //           .site-header__mega { display: none; }
// //         }
// //         @media (max-width: 480px) {
// //           .site-header__wordmark { font-size: 15px; }
// //         }
// //       `}</style>
// //     </>
// //   );
// // }

// //version 2

// "use client";

// import Image from "next/image";
// import { useEffect, useRef, useState } from "react";

// /* ──────────────────────────────────────────────────────────────────────────
//    SiteHeader

//    A reusable header for the entire marketing site. Drop <SiteHeader /> at
//    the top of any page inside the main layout and it will handle itself.

//    Design notes
//    ────────────
//    • The "Services" item opens a mega-menu on hover (desktop) / tap (mobile).
//      This is the pattern used by every serious software studio site
//      (Thoughtbot, Work & Co, EPAM, ustwo) because a flat link can't do
//      justice to 6 distinct capabilities.

//    • Scroll behavior: the header is transparent at the top of the page and
//      switches to a frosted "compact" state after 24px of scroll. This keeps
//      the hero feeling spacious and signals scroll progress without
//      shouting about it.

//    • Typography: all text uses var(--font-display) / var(--font-body) from
//      globals.css. No hardcoded font-family in this file — change fonts once
//      in globals.css and everything updates.

//    • Mobile: a full-height drawer with an accordion for Services. The
//      trigger is a 3-line burger that morphs into an X.
//    ────────────────────────────────────────────────────────────────────────── */

// // ── Nav data ────────────────────────────────────────────────────────────────

// type SubItem = {
//   num: string;
//   title: string;
//   desc: string;
//   href: string;
//   accent: string;
// };

// const SERVICES: SubItem[] = [
//   {
//     num: "01",
//     title: "Product Engineering",
//     desc: "Full-stack web & platform builds, zero to production.",
//     href: "/services/product-engineering",
//     accent: "#a3e635",
//   },
//   {
//     num: "02",
//     title: "Mobile Development",
//     desc: "Native & cross-platform apps for iOS and Android.",
//     href: "/services/mobile",
//     accent: "#38bdf8",
//   },
//   {
//     num: "03",
//     title: "Cloud & DevOps",
//     desc: "Infrastructure, CI/CD and reliability engineering.",
//     href: "/services/cloud-devops",
//     accent: "#f472b6",
//   },
//   {
//     num: "04",
//     title: "AI & Data Engineering",
//     desc: "LLMs, pipelines, recommendation and ranking systems.",
//     href: "/services/ai-data",
//     accent: "#fbbf24",
//   },
//   {
//     num: "05",
//     title: "UX/UI Design",
//     desc: "Design systems, research and interaction design.",
//     href: "/services/design",
//     accent: "#c084fc",
//   },
//   {
//     num: "06",
//     title: "Tech Strategy & CTO",
//     desc: "Fractional leadership, audits and technical due diligence.",
//     href: "/services/strategy",
//     accent: "#fafaf9",
//   },
// ];

// type NavItem = {
//   label: string;
//   href: string;
//   mega?: boolean;
// };

// const NAV: NavItem[] = [
//   { label: "Home", href: "/" },
//   { label: "Services", href: "/services", mega: true },
//   { label: "Insights", href: "/insights" },
//   { label: "About", href: "/about" },
//   { label: "Careers", href: "/careers" },
// ];

// // ── Component ───────────────────────────────────────────────────────────────

// export default function SiteHeader() {
//   const [scrolled, setScrolled] = useState(false);
//   const [megaOpen, setMegaOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

//   // Hover intent — a short delay before closing so users can move the
//   // cursor diagonally from trigger → panel without the menu collapsing.
//   const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Scroll → compact state
//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24);
//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   // Lock body scroll when the mobile drawer is open
//   useEffect(() => {
//     if (mobileOpen) {
//       const prev = document.body.style.overflow;
//       document.body.style.overflow = "hidden";
//       return () => {
//         document.body.style.overflow = prev;
//       };
//     }
//   }, [mobileOpen]);

//   // Close drawers on Escape
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if (e.key === "Escape") {
//         setMegaOpen(false);
//         setMobileOpen(false);
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   const openMega = () => {
//     if (closeTimer.current) clearTimeout(closeTimer.current);
//     setMegaOpen(true);
//   };
//   const scheduleCloseMega = () => {
//     if (closeTimer.current) clearTimeout(closeTimer.current);
//     closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
//   };

//   return (
//     <>
//       <header
//         className="site-header"
//         data-scrolled={scrolled ? "true" : "false"}
//         onMouseLeave={scheduleCloseMega}
//       >
//         <div className="site-header__inner">
//           {/* ── Logo ── */}
//           <a href="/" className="site-header__brand" aria-label="TechBinaries — home">
//             <span className="site-header__brand-logo-wrap" aria-hidden>
//               <Image
//                 src="/images/header-logo.png"
//                 alt="TechBinaries"
//                 fill
//                 className="site-header__brand-logo"
//                 sizes="(max-width: 480px) 170px, 220px"
//                 priority
//               />
//             </span>
//           </a>

//           {/* ── Primary nav (desktop) ── */}
//           <nav className="site-header__nav" aria-label="Primary">
//             {NAV.map((item) => {
//               if (item.mega) {
//                 return (
//                   <div
//                     key={item.label}
//                     className="site-header__nav-item"
//                     onMouseEnter={openMega}
//                     onFocus={openMega}
//                   >
//                     <button
//                       type="button"
//                       className="site-header__nav-link"
//                       aria-haspopup="true"
//                       aria-expanded={megaOpen}
//                       onClick={() => setMegaOpen((v) => !v)}
//                     >
//                       {item.label}
//                       <svg
//                         aria-hidden
//                         width="10"
//                         height="10"
//                         viewBox="0 0 10 10"
//                         className="site-header__chevron"
//                         data-open={megaOpen ? "true" : "false"}
//                       >
//                         <path
//                           d="M2 3.5 L5 6.5 L8 3.5"
//                           fill="none"
//                           stroke="currentColor"
//                           strokeWidth="1.4"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 );
//               }
//               return (
//                 <a key={item.label} href={item.href} className="site-header__nav-link">
//                   {item.label}
//                 </a>
//               );
//             })}
//           </nav>

//           {/* ── Right cluster: status + CTA + mobile trigger ── */}
//           <div className="site-header__right">
//             <a href="/contact" className="site-header__cta">
//               <span>Contact us</span>
//               <svg
//                 aria-hidden
//                 width="12"
//                 height="12"
//                 viewBox="0 0 12 12"
//                 className="site-header__cta-arrow"
//               >
//                 <path
//                   d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.4"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </a>

//             <button
//               type="button"
//               className="site-header__burger"
//               aria-label={mobileOpen ? "Close menu" : "Open menu"}
//               aria-expanded={mobileOpen}
//               onClick={() => setMobileOpen((v) => !v)}
//               data-open={mobileOpen ? "true" : "false"}
//             >
//               <span />
//               <span />
//               <span />
//             </button>
//           </div>
//         </div>

//         {/* ── Mega menu ── */}
//         <div
//           className="site-header__mega"
//           data-open={megaOpen ? "true" : "false"}
//           onMouseEnter={openMega}
//           onMouseLeave={scheduleCloseMega}
//           aria-hidden={!megaOpen}
//         >
//           <div className="site-header__mega-inner">
//             <div className="site-header__mega-left">
//               <div className="eyebrow">What we do</div>
//               <h3 className="site-header__mega-title font-display">
//                 Six capabilities.
//                 <br />
//                 <span className="site-header__mega-title-italic">One senior team.</span>
//               </h3>
//               <p className="site-header__mega-lead">
//                 From zero-to-one product work to steady-state scale engineering — we
//                 meet you where you are and ship what actually matters.
//               </p>
//               <a href="/services" className="site-header__mega-all">
//                 View all capabilities
//                 <svg aria-hidden width="12" height="12" viewBox="0 0 12 12">
//                   <path
//                     d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="1.4"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   />
//                 </svg>
//               </a>
//             </div>

//             <ul className="site-header__mega-grid" role="list">
//               {SERVICES.map((s) => (
//                 <li key={s.num}>
//                   <a href={s.href} className="site-header__mega-card">
//                     <div className="site-header__mega-card-top">
//                       <span
//                         className="site-header__mega-card-dot"
//                         style={{ background: s.accent }}
//                       />
//                       <span className="site-header__mega-card-num">{s.num}</span>
//                     </div>
//                     <div className="site-header__mega-card-title font-display">
//                       {s.title}
//                     </div>
//                     <div className="site-header__mega-card-desc">{s.desc}</div>
//                     <span className="site-header__mega-card-arrow" aria-hidden>
//                       →
//                     </span>
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </header>

//       {/* ── Mobile drawer ── */}
//       <div
//         className="site-drawer"
//         data-open={mobileOpen ? "true" : "false"}
//         aria-hidden={!mobileOpen}
//       >
//         <div className="site-drawer__scrim" onClick={() => setMobileOpen(false)} />
//         <div className="site-drawer__panel" role="dialog" aria-modal="true">
//           <nav className="site-drawer__nav">
//             {NAV.map((item) => {
//               if (item.mega) {
//                 return (
//                   <div key={item.label} className="site-drawer__group">
//                     <button
//                       type="button"
//                       className="site-drawer__link"
//                       onClick={() => setMobileServicesOpen((v) => !v)}
//                       aria-expanded={mobileServicesOpen}
//                     >
//                       <span>{item.label}</span>
//                       <span
//                         className="site-drawer__chev"
//                         data-open={mobileServicesOpen ? "true" : "false"}
//                       >
//                         +
//                       </span>
//                     </button>
//                     <div
//                       className="site-drawer__sub"
//                       data-open={mobileServicesOpen ? "true" : "false"}
//                     >
//                       {SERVICES.map((s) => (
//                         <a
//                           key={s.num}
//                           href={s.href}
//                           className="site-drawer__sublink"
//                           onClick={() => setMobileOpen(false)}
//                         >
//                           <span
//                             className="site-drawer__sub-dot"
//                             style={{ background: s.accent }}
//                           />
//                           <span>
//                             <span className="site-drawer__sub-num">{s.num}</span>
//                             {s.title}
//                           </span>
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 );
//               }
//               return (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   className="site-drawer__link"
//                   onClick={() => setMobileOpen(false)}
//                 >
//                   <span>{item.label}</span>
//                   <span className="site-drawer__arrow" aria-hidden>
//                     →
//                   </span>
//                 </a>
//               );
//             })}
//             <a
//               href="/contact"
//               className="site-drawer__link"
//               onClick={() => setMobileOpen(false)}
//             >
//               <span>Contact us</span>
//               <span className="site-drawer__arrow" aria-hidden>
//                 →
//               </span>
//             </a>
//           </nav>

//           <div className="site-drawer__foot">
//             <a href="mailto:hello@techbinaries.com" className="site-drawer__cta">
//               hello@techbinaries.com
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* ── Styles ────────────────────────────────────────────────────── */}
//       <style>{`
//         /* Tokens local to the header — kept narrow so the global tokens in
//            globals.css stay the source of truth for type + color. */
//         .site-header {
//           position: fixed;
//           top: 0; left: 0; right: 0;
//           z-index: 80;
//           height: var(--header-height);
//           transition:
//             height 0.35s cubic-bezier(0.22, 1, 0.36, 1),
//             background 0.35s ease,
//             backdrop-filter 0.35s ease,
//             border-color 0.35s ease;
//           background: transparent;
//           border-bottom: 1px solid transparent;
//         }
//         .site-header[data-scrolled="true"] {
//           height: var(--header-height-compact);
//           background: rgba(250, 250, 249, 0.78);
//           backdrop-filter: saturate(180%) blur(20px);
//           -webkit-backdrop-filter: saturate(180%) blur(20px);
//           border-bottom-color: var(--color-line);
//         }

//         .site-header__inner {
//           max-width: 1320px;
//           height: 100%;
//           margin: 0 auto;
//           padding: 0 20px;
//           display: grid;
//           grid-template-columns: auto 1fr auto;
//           align-items: center;
//           gap: 24px;
//         }

//         /* ── Brand ── */
//         .site-header__brand {
//           display: inline-flex;
//           align-items: center;
//           text-decoration: none;
//           color: var(--color-ink);
//           margin-left: -14px;
//         }
//         .site-header__brand-logo-wrap {
//           position: relative;
//           width: 280px;
//           height: 56px;
//           overflow: hidden;
//           display: block;
//         }
//         .site-header__brand-logo {
//           object-fit: cover;
//           object-position: center;
//           /* Provided asset is a light logo; force dark rendering on light header */
//           filter: brightness(0) saturate(100%);
//         }

//         /* ── Primary nav ── */
//         .site-header__nav {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           gap: 16px;
//         }
//         .site-header__nav-item { position: relative; }

//         .site-header__nav-link {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 11px 18px;
//           border: 0;
//           background: transparent;
//           color: rgba(10, 10, 10, 0.6);
//           font-family: var(--font-body);
//           font-size: 16px;
//           font-weight: 500;
//           letter-spacing: -0.005em;
//           text-decoration: none;
//           border-radius: 999px;
//           cursor: pointer;
//           transition: color 0.2s ease, background 0.2s ease;
//         }
//         .site-header__nav-link:hover,
//         .site-header__nav-link:focus-visible {
//           color: var(--color-ink);
//           background: rgba(10, 10, 10, 0.04);
//           outline: none;
//         }
//         .site-header__chevron {
//           transition: transform 0.25s ease;
//           color: currentColor;
//           opacity: 0.7;
//         }
//         .site-header__chevron[data-open="true"] {
//           transform: rotate(180deg);
//         }

//         /* ── Right cluster ── */
//         .site-header__right {
//           display: inline-flex;
//           align-items: center;
//           gap: 16px;
//         }

//         .site-header__status {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 6px 12px;
//           border: 1px solid var(--color-line);
//           border-radius: 999px;
//           font-family: var(--font-body);
//           font-size: 12px;
//           color: rgba(10, 10, 10, 0.6);
//           background: rgba(255, 255, 255, 0.4);
//         }
//         .site-header__status-dot {
//           width: 6px; height: 6px;
//           border-radius: 50%;
//           background: #16a34a;
//           box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.18);
//           animation: tb-pulse 2s ease-out infinite;
//         }
//         @keyframes tb-pulse {
//           0%   { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.35); }
//           70%  { box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); }
//           100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
//         }
//         .site-header__status-time {
//           font-variant-numeric: tabular-nums;
//           color: var(--color-ink);
//           font-weight: 500;
//         }
//         .site-header__status-city {
//           opacity: 0.5;
//           letter-spacing: 0.02em;
//         }

//         .site-header__cta {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           padding: 10px 18px;
//           background: var(--color-ink);
//           color: var(--color-paper);
//           border-radius: 999px;
//           font-family: var(--font-body);
//           font-size: 13px;
//           font-weight: 500;
//           letter-spacing: -0.005em;
//           text-decoration: none;
//           transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), background 0.2s;
//         }
//         .site-header__cta:hover { background: #1a1a1a; }
//         .site-header__cta:hover .site-header__cta-arrow {
//           transform: translateX(2px);
//         }
//         .site-header__cta-arrow { transition: transform 0.25s ease; }

//         /* ── Burger (mobile) ── */
//         .site-header__burger {
//           display: none;
//           width: 40px; height: 40px;
//           border: 1px solid var(--color-line);
//           border-radius: 10px;
//           background: rgba(255,255,255,0.6);
//           cursor: pointer;
//           position: relative;
//           padding: 0;
//         }
//         .site-header__burger span {
//           position: absolute;
//           left: 10px; right: 10px;
//           height: 1.5px;
//           background: var(--color-ink);
//           border-radius: 2px;
//           transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
//                       opacity 0.2s ease,
//                       top 0.35s cubic-bezier(0.22,1,0.36,1);
//         }
//         .site-header__burger span:nth-child(1) { top: 13px; }
//         .site-header__burger span:nth-child(2) { top: 19px; }
//         .site-header__burger span:nth-child(3) { top: 25px; }
//         .site-header__burger[data-open="true"] span:nth-child(1) {
//           top: 19px; transform: rotate(45deg);
//         }
//         .site-header__burger[data-open="true"] span:nth-child(2) { opacity: 0; }
//         .site-header__burger[data-open="true"] span:nth-child(3) {
//           top: 19px; transform: rotate(-45deg);
//         }

//         /* ── Mega menu ── */
//         .site-header__mega {
//           position: absolute;
//           top: 100%;
//           left: 0; right: 0;
//           background: rgba(250, 250, 249, 0.92);
//           backdrop-filter: saturate(180%) blur(24px);
//           -webkit-backdrop-filter: saturate(180%) blur(24px);
//           border-bottom: 1px solid var(--color-line);
//           border-top: 1px solid var(--color-line);
//           opacity: 0;
//           visibility: hidden;
//           transform: translateY(-6px);
//           transition:
//             opacity 0.3s cubic-bezier(0.22,1,0.36,1),
//             transform 0.3s cubic-bezier(0.22,1,0.36,1),
//             visibility 0s linear 0.3s;
//           pointer-events: none;
//         }
//         .site-header__mega[data-open="true"] {
//           opacity: 1;
//           visibility: visible;
//           transform: translateY(0);
//           pointer-events: auto;
//           transition:
//             opacity 0.3s cubic-bezier(0.22,1,0.36,1),
//             transform 0.3s cubic-bezier(0.22,1,0.36,1),
//             visibility 0s linear 0s;
//         }

//         .site-header__mega-inner {
//           max-width: 1320px;
//           margin: 0 auto;
//           padding: 40px 20px 44px;
//           display: grid;
//           grid-template-columns: 0.9fr 1.6fr;
//           gap: 56px;
//           align-items: start;
//         }

//         .site-header__mega-left { max-width: 340px; }
//         .site-header__mega-title {
//           font-size: 34px;
//           font-weight: 500;
//           line-height: 1.05;
//           letter-spacing: -0.03em;
//           margin: 16px 0 16px;
//         }
//         .site-header__mega-title-italic {
//           font-style: italic;
//           font-weight: 400;
//           color: rgba(10, 10, 10, 0.55);
//         }
//         .site-header__mega-lead {
//           font-family: var(--font-body);
//           font-size: 14px;
//           line-height: 1.65;
//           color: rgba(10, 10, 10, 0.6);
//           margin: 0 0 24px;
//         }
//         .site-header__mega-all {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           font-family: var(--font-body);
//           font-size: 13px;
//           font-weight: 500;
//           text-decoration: none;
//           color: var(--color-ink);
//           padding: 9px 16px;
//           border: 1px solid var(--color-ink);
//           border-radius: 999px;
//           transition: background 0.2s, color 0.2s;
//         }
//         .site-header__mega-all:hover {
//           background: var(--color-ink);
//           color: var(--color-paper);
//         }

//         .site-header__mega-grid {
//           list-style: none;
//           margin: 0;
//           padding: 0;
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 4px;
//         }

//         .site-header__mega-card {
//           position: relative;
//           display: block;
//           padding: 18px 18px 22px;
//           border-radius: 14px;
//           text-decoration: none;
//           color: var(--color-ink);
//           transition: background 0.25s ease;
//         }
//         .site-header__mega-card:hover {
//           background: rgba(10, 10, 10, 0.04);
//         }
//         .site-header__mega-card-top {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           margin-bottom: 14px;
//         }
//         .site-header__mega-card-dot {
//           width: 10px; height: 10px;
//           border-radius: 50%;
//           box-shadow: 0 0 0 3px rgba(10, 10, 10, 0.04);
//         }
//         .site-header__mega-card-num {
//           font-family: var(--font-display);
//           font-size: 12px;
//           font-weight: 500;
//           color: rgba(10, 10, 10, 0.4);
//           font-variant-numeric: tabular-nums;
//         }
//         .site-header__mega-card-title {
//           font-size: 16px;
//           font-weight: 500;
//           letter-spacing: -0.015em;
//           margin-bottom: 6px;
//         }
//         .site-header__mega-card-desc {
//           font-family: var(--font-body);
//           font-size: 13px;
//           line-height: 1.55;
//           color: rgba(10, 10, 10, 0.55);
//         }
//         .site-header__mega-card-arrow {
//           position: absolute;
//           top: 18px; right: 18px;
//           font-size: 14px;
//           color: rgba(10, 10, 10, 0.3);
//           opacity: 0;
//           transform: translate(-4px, 0);
//           transition: opacity 0.25s, transform 0.25s;
//         }
//         .site-header__mega-card:hover .site-header__mega-card-arrow {
//           opacity: 1;
//           transform: translate(0, 0);
//           color: var(--color-ink);
//         }

//         /* ── Mobile drawer ── */
//         .site-drawer {
//           position: fixed;
//           inset: 0;
//           z-index: 90;
//           pointer-events: none;
//         }
//         .site-drawer[data-open="true"] { pointer-events: auto; }
//         .site-drawer__scrim {
//           position: absolute;
//           inset: 0;
//           background: rgba(10, 10, 10, 0.35);
//           opacity: 0;
//           transition: opacity 0.3s ease;
//         }
//         .site-drawer[data-open="true"] .site-drawer__scrim { opacity: 1; }

//         .site-drawer__panel {
//           position: absolute;
//           top: 0; right: 0; bottom: 0;
//           width: min(420px, 100%);
//           background: var(--color-paper);
//           border-left: 1px solid var(--color-line);
//           padding: calc(var(--header-height-compact) + 16px) 24px 24px;
//           display: flex;
//           flex-direction: column;
//           justify-content: space-between;
//           transform: translateX(100%);
//           transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
//           overflow-y: auto;
//         }
//         .site-drawer[data-open="true"] .site-drawer__panel {
//           transform: translateX(0);
//         }

//         .site-drawer__nav {
//           display: flex;
//           flex-direction: column;
//         }
//         .site-drawer__link {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 12px;
//           padding: 18px 4px;
//           font-family: var(--font-display);
//           font-size: 26px;
//           font-weight: 500;
//           letter-spacing: -0.02em;
//           color: var(--color-ink);
//           border: 0;
//           border-bottom: 1px solid var(--color-line);
//           background: transparent;
//           text-decoration: none;
//           text-align: left;
//           cursor: pointer;
//           width: 100%;
//         }
//         .site-drawer__arrow {
//           font-size: 18px;
//           color: rgba(10, 10, 10, 0.3);
//         }
//         .site-drawer__chev {
//           width: 28px; height: 28px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           border: 1px solid var(--color-line);
//           border-radius: 50%;
//           font-size: 16px;
//           font-weight: 400;
//           color: var(--color-ink);
//           transition: transform 0.3s ease, background 0.2s ease;
//         }
//         .site-drawer__chev[data-open="true"] {
//           transform: rotate(45deg);
//           background: var(--color-ink);
//           color: var(--color-paper);
//         }

//         .site-drawer__sub {
//           max-height: 0;
//           overflow: hidden;
//           transition: max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
//         }
//         .site-drawer__sub[data-open="true"] {
//           max-height: 600px;
//         }
//         .site-drawer__sublink {
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           padding: 14px 4px;
//           font-family: var(--font-body);
//           font-size: 15px;
//           font-weight: 500;
//           color: rgba(10, 10, 10, 0.72);
//           text-decoration: none;
//           border-bottom: 1px solid var(--color-line);
//         }
//         .site-drawer__sub-dot {
//           width: 8px; height: 8px;
//           border-radius: 50%;
//           flex-shrink: 0;
//         }
//         .site-drawer__sub-num {
//           font-family: var(--font-display);
//           font-size: 12px;
//           color: rgba(10, 10, 10, 0.4);
//           margin-right: 10px;
//           font-variant-numeric: tabular-nums;
//         }

//         .site-drawer__foot {
//           padding-top: 24px;
//           display: flex;
//           flex-direction: column;
//           gap: 14px;
//         }
//         .site-drawer__cta {
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           padding: 14px 22px;
//           background: var(--color-ink);
//           color: var(--color-paper);
//           border-radius: 999px;
//           font-family: var(--font-body);
//           font-size: 14px;
//           font-weight: 500;
//           text-decoration: none;
//         }
//         .site-drawer__status {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           align-self: flex-start;
//           padding: 6px 12px;
//           border: 1px solid var(--color-line);
//           border-radius: 999px;
//           font-family: var(--font-body);
//           font-size: 12px;
//           color: rgba(10, 10, 10, 0.6);
//         }

//         /* ── Responsive ── */
//         @media (max-width: 1024px) {
//           .site-header__mega-inner {
//             grid-template-columns: 1fr;
//             gap: 32px;
//             padding: 28px 24px 32px;
//           }
//           .site-header__mega-grid { grid-template-columns: repeat(2, 1fr); }
//           .site-header__mega-title { font-size: 28px; }
//         }
//         @media (max-width: 900px) {
//           .site-header__inner { padding: 0 20px; gap: 12px; }
//           .site-header__nav { display: none; }
//           .site-header__status { display: none; }
//           .site-header__cta { display: none; }
//           .site-header__burger { display: inline-flex; align-items: center; justify-content: center; }
//           /* On mobile we never show the mega menu — the drawer takes over */
//           .site-header__mega { display: none; }
//         }
//         @media (max-width: 480px) {
//           .site-header__brand-logo-wrap {
//             width: 208px;
//             height: 44px;
//           }
//         }
//       `}</style>
//     </>
//   );
// }
