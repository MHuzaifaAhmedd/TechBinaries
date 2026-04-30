//version 3 
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   SiteHeader  ·  v3 (categorised mega-menu)

   Why this rewrite
   ────────────────
   The previous mega-menu treated each service as a single card. Once a studio
   has 6+ capabilities and each capability has its own sub-services, single
   cards stop scaling — the menu either gets too wide or starts hiding things
   behind a "View all" link.

   This version structures Services the way serious software-studio sites do
   (EPAM, Globant, Thoughtbot, Work & Co):

     1.  Each top-level service is a CATEGORY column.
     2.  Each category has a small icon, a heading (clickable, goes to the
         category landing page) and a vertical list of sub-services.
     3.  A "spotlight" panel on the right surfaces a featured offering or
         case-study so the menu has visual hierarchy beyond plain lists.
     4.  A bottom utility strip carries industries, quick links and a
         contact CTA so the menu is a self-contained navigation surface,
         not a dead end.

   Visual treatment
   ────────────────
   • Glass surface preserved (backdrop-blur + translucent fill + 1px inner
     border) but tightened: stronger blur, a faint hairline gradient at the
     top edge, and a soft inner highlight ring so it reads as a real piece
     of glass, not a flat tint.
   • Typography uses the same display/body font tokens you already had —
     nothing hard-coded.
   • Hover-intent timer kept (140ms close delay) so diagonal cursor moves
     don't accidentally close the menu.
   • Mobile drawer expanded to mirror the new structure: each category is
     an accordion, each sub-service is a tappable row.

   Drop-in: this file replaces components/SiteHeader.tsx 1-for-1. No other
   files need to change.
   ────────────────────────────────────────────────────────────────────────── */

// ─── Nav data ────────────────────────────────────────────────────────────────
//
// Each service is now a *category* with sub-items. Add or remove freely —
// the layout fluidly adjusts up to 4 columns. If you add a 5th, drop one
// of them or split into two rows (CSS already handles the wrap).

type SubLink = { label: string; href: string };

type ServiceCategory = {
  id: string;
  title: string;
  href: string;          // category landing page
  blurb: string;         // one-line description, shown under the heading
  accent: string;        // accent dot colour
  icon: React.ReactNode; // 18×18 stroked SVG
  links: SubLink[];      // sub-services listed under the category
};

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "custom-software-digital-solutions",
    title: "Custom Software & Digital Solutions",
    href: "/services/custom-software-digital-solutions",
    blurb: "Product engineering from UX systems to SaaS and mobile delivery.",
    accent: "#f472b6",
    icon: (
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden>
        <path
          d="M5 12h8a3 3 0 0 0 .3-5.97 4.5 4.5 0 0 0-8.7.97A3 3 0 0 0 5 12Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
    links: [
      { label: "Custom Web Application Development", href: "/services/custom-software-digital-solutions/custom-web-application-development" },
      { label: "Mobile App Development (iOS & Android)", href: "/services/custom-software-digital-solutions/mobile-app-development-ios-android" },
      { label: "SaaS Product Development", href: "/services/custom-software-digital-solutions/saas-product-development" },
      { label: "UI/UX Design Systems", href: "/services/custom-software-digital-solutions/ui-ux-design-systems" },
      { label: "CMS & Admin Panel Development", href: "/services/custom-software-digital-solutions/cms-admin-panel-development" },
      { label: "High-Performance Landing Pages", href: "/services/custom-software-digital-solutions/high-performance-landing-pages" },
    ],
  },
  {
    id: "growth-performance-engineering",
    title: "Growth & Performance Engineering",
    href: "/services/growth-performance-engineering",
    blurb: "Conversion systems, analytics, and experimentation frameworks.",
    accent: "#a3e635",
    icon: (
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden>
        <path
          d="M6 4 2.5 9 6 14 M12 4l3.5 5L12 14 M10.5 3.5 7.5 14.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    links: [
      { label: "Conversion-Focused Landing Systems", href: "/services/growth-performance-engineering/conversion-focused-landing-systems" },
      { label: "Funnel Architecture & Optimization", href: "/services/growth-performance-engineering/funnel-architecture-optimization" },
      { label: "Performance Tracking Dashboards", href: "/services/growth-performance-engineering/performance-tracking-dashboards" },
      { label: "User Behavior Analytics Integration", href: "/services/growth-performance-engineering/user-behavior-analytics-integration" },
      { label: "A/B Testing & Experimentation Systems", href: "/services/growth-performance-engineering/ab-testing-experimentation-systems" },
      { label: "Data-Driven Growth Optimization", href: "/services/growth-performance-engineering/data-driven-growth-optimization" },
    ],
  },
  {
    id: "search-visibility-digital-authority",
    title: "Search Visibility & Digital Authority",
    href: "/services/search-visibility-digital-authority",
    blurb: "Technical SEO systems and long-term search growth operations.",
    accent: "#38bdf8",
    icon: (
      <svg viewBox="0 0 18 18" width="18" height="18" aria-hidden>
        <rect
          x="5" y="2" width="8" height="14" rx="1.6"
          fill="none" stroke="currentColor" strokeWidth="1.4"
        />
        <line x1="8" y1="13.5" x2="10" y2="13.5"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
    links: [
      { label: "Technical SEO Optimization", href: "/services/search-visibility-digital-authority/technical-seo-optimization" },
      { label: "Website Performance & Indexing Improvements", href: "/services/search-visibility-digital-authority/website-performance-indexing-improvements" },
      { label: "Scalable Content Architecture", href: "/services/search-visibility-digital-authority/scalable-content-architecture" },
      { label: "Keyword & Search Intent Mapping", href: "/services/search-visibility-digital-authority/keyword-search-intent-mapping" },
      { label: "Competitor & Market Analysis Tools", href: "/services/search-visibility-digital-authority/competitor-market-analysis-tools" },
      { label: "Search Growth Monitoring Systems", href: "/services/search-visibility-digital-authority/search-growth-monitoring-systems" },
    ],
  },
];

// Bottom utility strip — industries we serve. Keep this short; it's a row of
// tags, not a second mega-menu.
const INDUSTRIES = [
  { label: "FinTech", href: "/industries/fintech" },
  { label: "Healthcare", href: "/industries/healthcare" },
  { label: "Logistics", href: "/industries/logistics" },
  { label: "SaaS", href: "/industries/saas" },
  { label: "E-commerce", href: "/industries/ecommerce" },
];

// Top-level nav. "Services" gets the mega flag; everything else is a
// flat link. Add more flat links freely.
type NavItem = {
  label: string;
  href: string;
  mega?: boolean;
};

const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", mega: true },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Mobile-only: which category accordion is currently expanded inside the
  // drawer's Services section. -1 = none.
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<number>(-1);

  // Hover-intent timer — keeps the menu open while the cursor travels
  // diagonally from the trigger button to the panel.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scroll → compact state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  // Close drawers on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };
  const darkHeroRoute = pathname === "/services/custom-software-digital-solutions";
  const headerTheme = darkHeroRoute && !scrolled ? "dark" : "light";

  return (
    <>
      <header
        className="site-header"
        data-scrolled={scrolled ? "true" : "false"}
        data-theme={headerTheme}
        onMouseLeave={scheduleCloseMega}
      >
        <div className="site-header__inner">
          {/* ── Logo ── */}
          <Link href="/" className="site-header__brand" aria-label="TechBinaries — home">
            <span className="site-header__brand-logo-wrap" aria-hidden>
              <Image
                src="/images/header-logo.png"
                alt="TechBinaries"
                fill
                className="site-header__brand-logo"
                sizes="(max-width: 480px) 170px, 220px"
                priority
              />
            </span>
          </Link>

          {/* ── Primary nav (desktop) ── */}
          <nav className="site-header__nav" aria-label="Primary">
            {NAV.map((item) => {
              if (item.mega) {
                return (
                  <div
                    key={item.label}
                    className="site-header__nav-item"
                    onMouseEnter={openMega}
                    onFocus={openMega}
                  >
                    <button
                      type="button"
                      className="site-header__nav-link"
                      aria-haspopup="true"
                      aria-expanded={megaOpen}
                      onClick={() => setMegaOpen((v) => !v)}
                      suppressHydrationWarning
                    >
                      {item.label}
                      <svg
                        aria-hidden
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        className="site-header__chevron"
                        data-open={megaOpen ? "true" : "false"}
                      >
                        <path
                          d="M2 3.5 L5 6.5 L8 3.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                );
              }
              return (
                <a key={item.label} href={item.href} className="site-header__nav-link">
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* ── Right cluster: CTA + mobile trigger ── */}
          <div className="site-header__right">
            <Link href="/contact" className="site-header__cta">
              <span>Contact us</span>
              <svg
                aria-hidden
                width="12"
                height="12"
                viewBox="0 0 12 12"
                className="site-header__cta-arrow"
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

            <button
              type="button"
              className="site-header__burger"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              data-open={mobileOpen ? "true" : "false"}
              suppressHydrationWarning
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* ── MEGA MENU ─────────────────────────────────────────────────
            Layout (desktop ≥1100px):

              ┌──────────────────────────────────────────────────────────┐
              │  intro col │ cat 1 │ cat 2 │ cat 3 │ cat 4 │ spotlight   │
              │            │ cat 5 │ cat 6 │       │       │             │
              │  ─────────────────────────────────────────────────────── │
              │  industries strip          │  contact strip              │
              └──────────────────────────────────────────────────────────┘

            Layout (1024–1100px): intro stacks above the grid.
            Layout (≤1024px): mega menu is hidden, drawer takes over.
        ────────────────────────────────────────────────────────────── */}
        <div
          className="site-header__mega"
          data-open={megaOpen ? "true" : "false"}
          onMouseEnter={openMega}
          onMouseLeave={scheduleCloseMega}
          aria-hidden={!megaOpen}
        >
          <div className="site-header__mega-inner">
            {/* TOP: intro + categories grid + spotlight */}
            <div className="site-header__mega-top">
              {/* Intro column */}
              <div className="site-header__mega-intro">
                <div className="site-header__mega-eyebrow">
                  <span className="site-header__mega-eyebrow-dot" />
                  What we do
                </div>
                <h3 className="site-header__mega-title font-display">
                  End-to-end product
                  <br />
                  <span className="site-header__mega-title-italic">
                    engineering &amp; design.
                  </span>
                </h3>
                <p className="site-header__mega-lead">
                  Six core capabilities, delivered by a senior team that owns the
                  work from discovery to production — and stays after launch.
                </p>
                <a href="/services" className="site-header__mega-all">
                  All capabilities
                  <svg aria-hidden width="12" height="12" viewBox="0 0 12 12">
                    <path
                      d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              {/* Categories grid — 3 cols × 2 rows on desktop */}
              <div className="site-header__mega-cats">
                {SERVICE_CATEGORIES.map((cat) => (
                  <div key={cat.id} className="site-header__mega-cat">
                    <a href={cat.href} className="site-header__mega-cat-head">
                      <span
                        className="site-header__mega-cat-icon"
                        style={{ color: cat.accent }}
                      >
                        {cat.icon}
                      </span>
                      <span className="site-header__mega-cat-title font-display">
                        {cat.title}
                      </span>
                      <span className="site-header__mega-cat-arrow" aria-hidden>
                        →
                      </span>
                    </a>
                    <p className="site-header__mega-cat-blurb">{cat.blurb}</p>
                    <ul className="site-header__mega-cat-links" role="list">
                      {cat.links.map((l) => (
                        <li key={l.href}>
                          <a href={l.href}>
                            <span className="site-header__mega-cat-bullet" aria-hidden>
                              ›
                            </span>
                            <span>{l.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Spotlight column — featured offering / case study.
                  Treated as a vertical card so the grid resolves cleanly. */}
              <aside className="site-header__mega-spotlight">
                <div className="site-header__mega-spot-tag">
                  <span className="site-header__mega-spot-tag-dot" />
                  Featured
                </div>
                <div className="site-header__mega-spot-title font-display">
                  AI-powered logistics
                  <br />
                  <span className="site-header__mega-title-italic">
                    that saved $4M/yr.
                  </span>
                </div>
                <p className="site-header__mega-spot-desc">
                  How we built a route-optimisation engine for ShipFast that scaled
                  to 2M+ daily routes.
                </p>
                <div className="site-header__mega-spot-meta">
                  <span>Case study</span>
                  <span aria-hidden>·</span>
                  <span>8 min read</span>
                </div>
                <a href="/work/shipfast" className="site-header__mega-spot-link">
                  Read the case study
                  <svg aria-hidden width="12" height="12" viewBox="0 0 12 12">
                    <path
                      d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </aside>
            </div>

            {/* BOTTOM: utility strip — industries on the left, contact on the right */}
            <div className="site-header__mega-foot">
              <div className="site-header__mega-foot-left">
                <span className="site-header__mega-foot-label">Industries</span>
                <ul className="site-header__mega-foot-tags" role="list">
                  {INDUSTRIES.map((i) => (
                    <li key={i.href}>
                      <a href={i.href}>{i.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="site-header__mega-foot-right">
                <span className="site-header__mega-foot-label">Got a project?</span>
                <a
                  href="mailto:hello@techbinaries.com"
                  className="site-header__mega-foot-mail"
                >
                  hello@techbinaries.com
                  <svg aria-hidden width="11" height="11" viewBox="0 0 12 12">
                    <path
                      d="M3 9 9 3 M4 3h5v5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ──
          Mirrors the desktop structure: top-level links, a Services section
          that expands into per-category accordions, and a contact footer. */}
      <div
        className="site-drawer"
        data-open={mobileOpen ? "true" : "false"}
        aria-hidden={!mobileOpen}
      >
        <div className="site-drawer__scrim" onClick={() => setMobileOpen(false)} />
        <div className="site-drawer__panel" role="dialog" aria-modal="true">
          <nav className="site-drawer__nav">
            {NAV.map((item) => {
              if (item.mega) {
                return (
                  <div key={item.label} className="site-drawer__group">
                    <button
                      type="button"
                      className="site-drawer__link"
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      aria-expanded={mobileServicesOpen}
                      suppressHydrationWarning
                    >
                      <span>{item.label}</span>
                      <span
                        className="site-drawer__chev"
                        data-open={mobileServicesOpen ? "true" : "false"}
                      >
                        +
                      </span>
                    </button>

                    <div
                      className="site-drawer__sub"
                      data-open={mobileServicesOpen ? "true" : "false"}
                    >
                      {SERVICE_CATEGORIES.map((cat, idx) => {
                        const isOpen = mobileCategoryOpen === idx;
                        return (
                          <div key={cat.id} className="site-drawer__cat">
                            <button
                              type="button"
                              className="site-drawer__cat-head"
                              aria-expanded={isOpen}
                              onClick={() =>
                                setMobileCategoryOpen(isOpen ? -1 : idx)
                              }
                              suppressHydrationWarning
                            >
                              <span
                                className="site-drawer__cat-dot"
                                style={{ background: cat.accent }}
                              />
                              <span className="site-drawer__cat-title">
                                {cat.title}
                              </span>
                              <span
                                className="site-drawer__cat-chev"
                                data-open={isOpen ? "true" : "false"}
                                aria-hidden
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12">
                                  <path
                                    d="M3 4.5 L6 7.5 L9 4.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </button>
                            <div
                              className="site-drawer__cat-panel"
                              data-open={isOpen ? "true" : "false"}
                            >
                              <ul role="list">
                                {cat.links.map((l) => (
                                  <li key={l.href}>
                                    <a
                                      href={l.href}
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {l.label}
                                    </a>
                                  </li>
                                ))}
                                <li>
                                  <a
                                    href={cat.href}
                                    className="site-drawer__cat-all"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    All {cat.title.toLowerCase()} →
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="site-drawer__link"
                  onClick={() => setMobileOpen(false)}
                >
                  <span>{item.label}</span>
                  <span className="site-drawer__arrow" aria-hidden>
                    →
                  </span>
                </a>
              );
            })}
            <a
              href="/contact"
              className="site-drawer__link"
              onClick={() => setMobileOpen(false)}
            >
              <span>Contact us</span>
              <span className="site-drawer__arrow" aria-hidden>
                →
              </span>
            </a>
          </nav>

          <div className="site-drawer__foot">
            <a href="mailto:hello@techbinaries.com" className="site-drawer__cta">
              hello@techbinaries.com
            </a>
          </div>
        </div>
      </div>

      {/* ── Styles ────────────────────────────────────────────────────── */}
      <style>{`
        /* ── Header shell ── */
        .site-header {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 80;
          height: var(--header-height);
          transition:
            height 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.35s ease,
            backdrop-filter 0.35s ease,
            border-color 0.35s ease;
          background: transparent;
          border-bottom: 1px solid transparent;
        }
        .site-header[data-scrolled="true"] {
          height: var(--header-height-compact);
          background: rgba(250, 250, 249, 0.78);
          backdrop-filter: saturate(180%) blur(20px);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          border-bottom-color: var(--color-line);
        }

        /* On the dark hero route, show frosted glass immediately */
        .site-header[data-theme="dark"][data-scrolled="false"] {
          /* Reduce blur/reflection on reload */
          background: rgba(250, 250, 249, 0.9);
          backdrop-filter: saturate(180%) blur(12px);
          -webkit-backdrop-filter: saturate(180%) blur(12px);
          border-bottom-color: var(--color-line);
          transition:
            height 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.15s ease,
            backdrop-filter 0.15s ease,
            border-color 0.35s ease;
        }

        .site-header__inner {
          max-width: 1320px;
          height: 100%;
          margin: 0 auto;
          padding: 0 20px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          gap: 24px;
        }

        /* ── Brand ── */
        .site-header__brand {
          display: inline-flex;
          align-items: center;
          text-decoration: none;
          color: var(--color-ink);
          margin-left: -14px;
        }
        .site-header__brand-logo-wrap {
          position: relative;
          width: 280px;
          height: 56px;
          overflow: hidden;
          display: block;
        }
        .site-header__brand-logo {
          object-fit: cover;
          object-position: center;
          filter: brightness(0) saturate(100%);
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__brand-logo {
          filter: brightness(0) saturate(100%) invert(1);
        }

        /* ── Primary nav ── */
        .site-header__nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
        }
        .site-header__nav-item { position: relative; }

        .site-header__nav-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 11px 18px;
          border: 0;
          background: transparent;
          color: rgba(10, 10, 10, 0.6);
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 500;
          letter-spacing: -0.005em;
          text-decoration: none;
          border-radius: 999px;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__nav-link {
          color: rgba(255, 255, 255, 0.78);
        }
        .site-header__nav-link:hover,
        .site-header__nav-link:focus-visible {
          color: var(--color-ink);
          background: rgba(10, 10, 10, 0.04);
          outline: none;
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__nav-link:hover,
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__nav-link:focus-visible {
          color: #fafaf9;
          background: rgba(255, 255, 255, 0.1);
        }
        .site-header__chevron {
          transition: transform 0.25s ease;
          color: currentColor;
          opacity: 0.7;
        }
        .site-header__chevron[data-open="true"] {
          transform: rotate(180deg);
        }

        /* ── Right cluster ── */
        .site-header__right {
          display: inline-flex;
          align-items: center;
          gap: 16px;
        }

        .site-header__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          background: var(--color-ink);
          color: var(--color-paper);
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          letter-spacing: -0.005em;
          text-decoration: none;
          transition: transform 0.25s cubic-bezier(0.22,1,0.36,1), background 0.2s;
        }
        .site-header__cta:hover { background: #1a1a1a; }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__cta {
          background: rgba(255, 255, 255, 0.06);
          color: #fafaf9;
          border: 1px solid rgba(255, 255, 255, 0.24);
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__cta:hover {
          background: rgba(255, 255, 255, 0.14);
        }
        .site-header__cta:hover .site-header__cta-arrow {
          transform: translateX(2px);
        }
        .site-header__cta-arrow { transition: transform 0.25s ease; }

        /* ── Burger (mobile) ── */
        .site-header__burger {
          display: none;
          width: 40px; height: 40px;
          border: 1px solid var(--color-line);
          border-radius: 10px;
          background: rgba(255,255,255,0.6);
          cursor: pointer;
          position: relative;
          padding: 0;
        }
        .site-header__burger span {
          position: absolute;
          left: 10px; right: 10px;
          height: 1.5px;
          background: var(--color-ink);
          border-radius: 2px;
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1),
                      opacity 0.2s ease,
                      top 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__burger {
          border-color: rgba(255, 255, 255, 0.24);
          background: rgba(255, 255, 255, 0.06);
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__burger span {
          background: #fafaf9;
        }

        /*
          On the custom-software-digital-solutions hero route:
          we keep the frosted-glass header background, but we want the initial
          header content to be dark/black (same look as the "scrolled" state).
        */
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__brand-logo {
          filter: brightness(0) saturate(100%);
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__nav-link {
          color: rgba(10, 10, 10, 0.6);
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__nav-link:hover,
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__nav-link:focus-visible {
          color: var(--color-ink);
          background: rgba(10, 10, 10, 0.04);
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__cta {
          background: var(--color-ink);
          color: var(--color-paper);
          border: 0;
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__cta:hover {
          background: #1a1a1a;
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__burger {
          border-color: var(--color-line);
          background: rgba(255, 255, 255, 0.6);
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__burger span {
          background: var(--color-ink);
        }
        .site-header__burger span:nth-child(1) { top: 13px; }
        .site-header__burger span:nth-child(2) { top: 19px; }
        .site-header__burger span:nth-child(3) { top: 25px; }
        .site-header__burger[data-open="true"] span:nth-child(1) {
          top: 19px; transform: rotate(45deg);
        }
        .site-header__burger[data-open="true"] span:nth-child(2) { opacity: 0; }
        .site-header__burger[data-open="true"] span:nth-child(3) {
          top: 19px; transform: rotate(-45deg);
        }

        /* ─── MEGA MENU ───────────────────────────────────────────────
           Clean solid dropdown surface for better readability.
        ─────────────────────────────────────────────────────────────── */
        .site-header__mega {
          position: absolute;
          top: 100%;
          left: 0; right: 0;
          background: #ffffff;
          border-top: 1px solid rgba(10, 10, 10, 0.06);
          border-bottom: 1px solid rgba(10, 10, 10, 0.08);
          box-shadow:
            0 22px 48px -28px rgba(10, 10, 10, 0.24);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-6px);
          transition:
            opacity 0.32s cubic-bezier(0.22,1,0.36,1),
            transform 0.32s cubic-bezier(0.22,1,0.36,1),
            visibility 0s linear 0.32s;
          pointer-events: none;
        }
        .site-header__mega::before {
          /* Subtle separator at the top edge of dropdown. */
          content: "";
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 1px;
          background: rgba(10, 10, 10, 0.05);
        }
        .site-header__mega[data-open="true"] {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
          transition:
            opacity 0.32s cubic-bezier(0.22,1,0.36,1),
            transform 0.32s cubic-bezier(0.22,1,0.36,1),
            visibility 0s linear 0s;
        }

        .site-header__mega-inner {
          max-width: 1320px;
          margin: 0 auto;
          padding: 36px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 26px;
        }

        /* ── Top row: intro + categories grid + spotlight ── */
        .site-header__mega-top {
          display: grid;
          grid-template-columns: 230px 1fr 240px;
          gap: 36px;
          align-items: start;
        }

        /* Intro column */
        .site-header__mega-intro { max-width: 230px; }
        .site-header__mega-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.5);
          margin-bottom: 14px;
        }
        .site-header__mega-eyebrow-dot {
          width: 6px; height: 6px;
          background: #16a34a;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(22, 163, 74, 0.18);
        }
        .site-header__mega-title {
          font-size: 26px;
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin: 0 0 14px;
          color: var(--color-ink);
        }
        .site-header__mega-title-italic {
          font-style: italic;
          font-weight: 400;
          color: rgba(10, 10, 10, 0.55);
        }
        .site-header__mega-lead {
          font-family: var(--font-body);
          font-size: 13.5px;
          line-height: 1.6;
          color: rgba(10, 10, 10, 0.6);
          margin: 0 0 18px;
        }
        .site-header__mega-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          color: var(--color-ink);
          padding: 9px 16px;
          border: 1px solid rgba(10, 10, 10, 0.85);
          border-radius: 999px;
          transition: background 0.2s, color 0.2s;
        }
        .site-header__mega-all:hover {
          background: var(--color-ink);
          color: var(--color-paper);
        }
        .site-header__mega-all svg {
          transition: transform 0.25s;
        }
        .site-header__mega-all:hover svg {
          transform: translateX(2px);
        }

        /* Category grid */
        .site-header__mega-cats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px 18px;
          row-gap: 22px;
        }

        .site-header__mega-cat {
          padding: 10px 12px 12px;
          border-radius: 12px;
          transition: background 0.2s ease;
        }
        .site-header__mega-cat:hover {
          background: rgba(10, 10, 10, 0.025);
        }

        .site-header__mega-cat-head {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--color-ink);
          margin-bottom: 4px;
        }
        .site-header__mega-cat-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px; height: 28px;
          border-radius: 8px;
          background: rgba(10, 10, 10, 0.04);
          flex-shrink: 0;
        }
        .site-header__mega-cat-title {
          font-size: 14.5px;
          font-weight: 600;
          letter-spacing: -0.01em;
          flex: 1;
        }
        .site-header__mega-cat-arrow {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.3);
          opacity: 0;
          transform: translateX(-3px);
          transition: opacity 0.22s, transform 0.22s, color 0.22s;
        }
        .site-header__mega-cat:hover .site-header__mega-cat-arrow {
          opacity: 1;
          transform: translateX(0);
          color: var(--color-ink);
        }

        .site-header__mega-cat-blurb {
          font-family: var(--font-body);
          font-size: 12px;
          line-height: 1.5;
          color: rgba(10, 10, 10, 0.5);
          margin: 0 0 10px 38px;
        }

        .site-header__mega-cat-links {
          list-style: none;
          padding: 0;
          margin: 0 0 0 38px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .site-header__mega-cat-links a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 0;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 400;
          line-height: 1.4;
          color: rgba(10, 10, 10, 0.7);
          text-decoration: none;
          transition: color 0.18s ease, transform 0.18s ease;
        }
        .site-header__mega-cat-links a:hover {
          color: var(--color-ink);
          transform: translateX(2px);
        }
        .site-header__mega-cat-bullet {
          color: rgba(10, 10, 10, 0.3);
          font-size: 11px;
          flex-shrink: 0;
          transition: color 0.18s ease;
        }
        .site-header__mega-cat-links a:hover .site-header__mega-cat-bullet {
          color: var(--color-ink);
        }

        /* Spotlight */
        .site-header__mega-spotlight {
          padding: 22px 22px 22px;
          background: linear-gradient(165deg,
            rgba(10, 10, 10, 0.96),
            rgba(28, 28, 28, 0.94));
          color: var(--color-paper);
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          min-height: 280px;
          display: flex;
          flex-direction: column;
        }
        .site-header__mega-spotlight::after {
          /* Faint dot grid in the bottom-right of the spotlight, for texture */
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 14px 14px;
          mask-image: radial-gradient(ellipse 70% 60% at 100% 100%, black 0%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse 70% 60% at 100% 100%, black 0%, transparent 80%);
          pointer-events: none;
        }

        .site-header__mega-spot-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 18px;
          position: relative;
          z-index: 1;
        }
        .site-header__mega-spot-tag-dot {
          width: 6px; height: 6px;
          background: #a3e635;
          border-radius: 50%;
          box-shadow: 0 0 0 3px rgba(163, 230, 53, 0.18);
        }
        .site-header__mega-spot-title {
          font-size: 22px;
          font-weight: 500;
          line-height: 1.12;
          letter-spacing: -0.025em;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }
        .site-header__mega-spot-desc {
          font-family: var(--font-body);
          font-size: 12.5px;
          line-height: 1.55;
          color: rgba(255, 255, 255, 0.6);
          margin: 0 0 18px;
          position: relative;
          z-index: 1;
        }
        .site-header__mega-spot-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-body);
          font-size: 11px;
          color: rgba(255, 255, 255, 0.45);
          margin-bottom: auto;
          padding-bottom: 18px;
          position: relative;
          z-index: 1;
        }
        .site-header__mega-spot-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          font-family: var(--font-body);
          font-size: 12.5px;
          font-weight: 500;
          color: var(--color-paper);
          text-decoration: none;
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 999px;
          align-self: flex-start;
          transition: background 0.2s, border-color 0.2s;
          position: relative;
          z-index: 1;
        }
        .site-header__mega-spot-link:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.4);
        }
        .site-header__mega-spot-link svg {
          transition: transform 0.25s;
        }
        .site-header__mega-spot-link:hover svg {
          transform: translateX(2px);
        }

        /* ── Footer strip ── */
        .site-header__mega-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          padding: 16px 4px 4px;
          border-top: 1px solid rgba(10, 10, 10, 0.08);
        }
        .site-header__mega-foot-left,
        .site-header__mega-foot-right {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .site-header__mega-foot-label {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.45);
        }
        .site-header__mega-foot-tags {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .site-header__mega-foot-tags a {
          display: inline-block;
          padding: 6px 12px;
          border: 1px solid rgba(10, 10, 10, 0.12);
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          color: rgba(10, 10, 10, 0.7);
          text-decoration: none;
          background: rgba(255, 255, 255, 0.45);
          transition: background 0.18s, border-color 0.18s, color 0.18s;
        }
        .site-header__mega-foot-tags a:hover {
          background: var(--color-ink);
          border-color: var(--color-ink);
          color: var(--color-paper);
        }
        .site-header__mega-foot-mail {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-display);
          font-size: 14px;
          font-weight: 500;
          color: var(--color-ink);
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.18s;
        }
        .site-header__mega-foot-mail:hover {
          color: rgba(10, 10, 10, 0.6);
        }
        .site-header__mega-foot-mail svg {
          color: rgba(10, 10, 10, 0.4);
          transition: transform 0.22s, color 0.22s;
        }
        .site-header__mega-foot-mail:hover svg {
          transform: translate(2px, -2px);
          color: var(--color-ink);
        }

        /* ── Mobile drawer ── */
        .site-drawer {
          position: fixed;
          inset: 0;
          z-index: 90;
          pointer-events: none;
        }
        .site-drawer[data-open="true"] { pointer-events: auto; }
        .site-drawer__scrim {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 10, 0.35);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .site-drawer[data-open="true"] .site-drawer__scrim { opacity: 1; }

        .site-drawer__panel {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: min(440px, 100%);
          background: var(--color-paper);
          border-left: 1px solid var(--color-line);
          padding: calc(var(--header-height-compact) + 16px) 24px 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transform: translateX(100%);
          transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          overflow-y: auto;
        }
        .site-drawer[data-open="true"] .site-drawer__panel {
          transform: translateX(0);
        }

        .site-drawer__nav { display: flex; flex-direction: column; }

        .site-drawer__link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 18px 4px;
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--color-ink);
          border: 0;
          border-bottom: 1px solid var(--color-line);
          background: transparent;
          text-decoration: none;
          text-align: left;
          cursor: pointer;
          width: 100%;
        }
        .site-drawer__arrow {
          font-size: 18px;
          color: rgba(10, 10, 10, 0.3);
        }
        .site-drawer__chev {
          width: 28px; height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--color-line);
          border-radius: 50%;
          font-size: 16px;
          font-weight: 400;
          color: var(--color-ink);
          transition: transform 0.3s ease, background 0.2s ease, color 0.2s ease;
        }
        .site-drawer__chev[data-open="true"] {
          transform: rotate(45deg);
          background: var(--color-ink);
          color: var(--color-paper);
        }

        /* Services section: holds category accordions */
        .site-drawer__sub {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .site-drawer__sub[data-open="true"] {
          max-height: 2400px;
        }

        .site-drawer__cat {
          border-bottom: 1px solid var(--color-line);
        }
        .site-drawer__cat-head {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 14px 4px;
          background: transparent;
          border: 0;
          color: var(--color-ink);
          cursor: pointer;
          text-align: left;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.005em;
        }
        .site-drawer__cat-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }
        .site-drawer__cat-title { flex: 1; }
        .site-drawer__cat-chev {
          color: rgba(10, 10, 10, 0.4);
          transition: transform 0.3s ease, color 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .site-drawer__cat-chev[data-open="true"] {
          transform: rotate(180deg);
          color: var(--color-ink);
        }

        .site-drawer__cat-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .site-drawer__cat-panel[data-open="true"] { max-height: 600px; }
        .site-drawer__cat-panel ul {
          list-style: none;
          margin: 0;
          padding: 0 0 12px 20px;
        }
        .site-drawer__cat-panel a {
          display: block;
          padding: 8px 4px;
          font-family: var(--font-body);
          font-size: 14px;
          color: rgba(10, 10, 10, 0.7);
          text-decoration: none;
        }
        .site-drawer__cat-panel a:hover { color: var(--color-ink); }
        .site-drawer__cat-all {
          font-weight: 500 !important;
          color: var(--color-ink) !important;
          padding-top: 10px !important;
          border-top: 1px dashed rgba(10, 10, 10, 0.12);
          margin-top: 6px;
        }

        .site-drawer__foot {
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .site-drawer__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 22px;
          background: var(--color-ink);
          color: var(--color-paper);
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
        }

        /* ── Responsive ── */
        @media (max-width: 1180px) {
          .site-header__mega-top {
            grid-template-columns: 200px 1fr 220px;
            gap: 28px;
          }
          .site-header__mega-cats {
            gap: 4px 14px;
            row-gap: 18px;
          }
          .site-header__mega-cat-blurb,
          .site-header__mega-cat-links {
            margin-left: 38px;
          }
        }
        @media (max-width: 1024px) {
          .site-header__mega-top {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .site-header__mega-cats {
            grid-template-columns: repeat(2, 1fr);
          }
          .site-header__mega-spotlight {
            min-height: auto;
          }
        }
        @media (max-width: 900px) {
          .site-header__inner { padding: 0 20px; gap: 12px; }
          .site-header__nav { display: none; }
          .site-header__cta { display: none; }
          .site-header__burger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          /* Drawer takes over on mobile */
          .site-header__mega { display: none; }
        }
        @media (max-width: 480px) {
          .site-header__brand-logo-wrap {
            width: 208px;
            height: 44px;
          }
        }
      `}</style>
    </>
  );
}
