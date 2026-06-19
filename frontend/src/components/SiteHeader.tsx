//version 3 
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { SERVICE_CATEGORIES } from "@/data/serviceCategories";
import { isServicePagePath } from "@/lib/service-routes";

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
  { label: "Services", href: "/custom-software-development", mega: true },
  { label: "Insights", href: "/blogs" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

const INSIGHTS_LINKS = [
  { label: "Case studies", href: "/case-studies" },
  { label: "Blogs", href: "/blogs" },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Mobile-only: which category accordion is currently expanded inside the
  // drawer's Services section. -1 = none.
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileInsightsOpen, setMobileInsightsOpen] = useState(false);
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState<number>(-1);

  // Hover-intent timer — keeps the menu open while the cursor travels
  // diagonally from the trigger button to the panel.
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const insightsCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  // Collapse mobile accordions when the drawer closes
  useEffect(() => {
    if (mobileOpen) return;
    setMobileServicesOpen(false);
    setMobileInsightsOpen(false);
    setMobileCategoryOpen(-1);
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  const toggleMobileServices = () => {
    setMobileServicesOpen((v) => {
      const next = !v;
      if (next) {
        setMobileInsightsOpen(false);
        setMobileCategoryOpen(-1);
      }
      return next;
    });
  };

  const toggleMobileInsights = () => {
    setMobileInsightsOpen((v) => {
      const next = !v;
      if (next) {
        setMobileServicesOpen(false);
        setMobileCategoryOpen(-1);
      }
      return next;
    });
  };

  // Close drawers on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setInsightsOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (insightsCloseTimer.current) clearTimeout(insightsCloseTimer.current);
    setInsightsOpen(false);
    setMegaOpen(true);
  };
  const scheduleCloseMega = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  };
  const openInsights = () => {
    if (insightsCloseTimer.current) clearTimeout(insightsCloseTimer.current);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(false);
    setInsightsOpen(true);
  };
  const scheduleCloseInsights = () => {
    if (insightsCloseTimer.current) clearTimeout(insightsCloseTimer.current);
    insightsCloseTimer.current = setTimeout(() => setInsightsOpen(false), 140);
  };
  // Routes that keep a frosted header treatment at top-of-page.
  const darkHeroRoute = false;
  const headerTheme = darkHeroRoute && !scrolled ? "dark" : "light";
  // Routes where header should blend directly into the hero at load.
  const blendedHeroViewport =
    (pathname === "/" ||
      pathname === "/about" ||
      pathname === "/blogs" ||
      pathname === "/case-studies" ||
      pathname.startsWith("/case-studies/") ||
      pathname.startsWith("/blog/") ||
      pathname === "/careers" ||
      isServicePagePath(pathname)) &&
    !scrolled;

  return (
    <>
      <header
        className="site-header"
        data-scrolled={scrolled ? "true" : "false"}
        data-theme={headerTheme}
        data-hero-blend={blendedHeroViewport ? "true" : "false"}
        onMouseLeave={() => {
          scheduleCloseMega();
          scheduleCloseInsights();
        }}
      >
        <div className="site-header__inner">
          {/* ── Logo ── */}
          <Link href="/" className="site-header__brand" aria-label="TechBinaries — home">
            <span className="site-header__brand-logo-wrap" aria-hidden>
              <Image
                src={blendedHeroViewport ? "/images/header-logo-white.png" : "/images/header-logo.png"}
                alt="TechBinaries"
                fill
                className="site-header__brand-logo"
                sizes="(max-width: 480px) 170px, 220px"
                priority={pathname !== "/"}
                loading={pathname === "/" ? "lazy" : "eager"}
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
                      onClick={() =>
                        setMegaOpen((v) => {
                          const next = !v;
                          if (next) setInsightsOpen(false);
                          return next;
                        })
                      }
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
              if (item.label === "Insights") {
                return (
                  <div
                    key={item.label}
                    className="site-header__nav-item"
                    onMouseEnter={openInsights}
                    onMouseLeave={scheduleCloseInsights}
                  >
                    <Link href={item.href} className="site-header__nav-link">
                      {item.label}
                      <svg
                        aria-hidden
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        className="site-header__chevron"
                        data-open={insightsOpen ? "true" : "false"}
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
                    </Link>
                    <div
                      className="site-header__mini-menu"
                      data-open={insightsOpen ? "true" : "false"}
                      onMouseEnter={openInsights}
                    >
                      <ul className="site-header__mini-menu-list" role="list">
                        {INSIGHTS_LINKS.map((link) => (
                          <li key={link.href}>
                            <Link href={link.href} className="site-header__mini-menu-link">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
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
                <a href="/custom-software-development" className="site-header__mega-all">
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
        <div className="site-drawer__scrim" onClick={closeMobileMenu} />
        <div
          className="site-drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
        >
          <button
            type="button"
            className="site-drawer__close"
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <svg
              aria-hidden
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <nav className="site-drawer__nav">
            {NAV.map((item) => {
              if (item.mega) {
                return (
                  <div key={item.label} className="site-drawer__group">
                    <button
                      type="button"
                      className="site-drawer__split-row site-drawer__split-row--top site-drawer__split-trigger"
                      onClick={toggleMobileServices}
                      aria-expanded={mobileServicesOpen}
                      aria-label={`${mobileServicesOpen ? "Hide" : "Show"} service categories`}
                      data-open={mobileServicesOpen ? "true" : "false"}
                      suppressHydrationWarning
                    >
                      <span className="site-drawer__split-link site-drawer__split-link--top">
                        {item.label}
                      </span>
                      <span
                        className="site-drawer__split-toggle site-drawer__split-toggle--top"
                        aria-hidden
                      >
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
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
                      className="site-drawer__sub"
                      data-open={mobileServicesOpen ? "true" : "false"}
                    >
                      <div className="site-drawer__sub-inner">
                      <a
                        href="/custom-software-development"
                        className="site-drawer__sub-link"
                        onClick={closeMobileMenu}
                      >
                        All capabilities
                        <span className="site-drawer__sub-link-arrow" aria-hidden>
                          →
                        </span>
                      </a>

                      {SERVICE_CATEGORIES.map((cat, idx) => {
                        const isOpen = mobileCategoryOpen === idx;
                        return (
                          <div key={cat.id} className="site-drawer__cat">
                            <div className="site-drawer__cat-row">
                              <Link
                                href={cat.href}
                                className="site-drawer__cat-link"
                                onClick={closeMobileMenu}
                              >
                                {cat.title}
                              </Link>
                              <button
                                type="button"
                                className="site-drawer__cat-toggle"
                                aria-expanded={isOpen}
                                aria-label={`${isOpen ? "Hide" : "Show"} ${cat.title} offerings`}
                                data-open={isOpen ? "true" : "false"}
                                onClick={() =>
                                  setMobileCategoryOpen(isOpen ? -1 : idx)
                                }
                                suppressHydrationWarning
                              >
                                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                                  <path
                                    d="M3 4.5 L6 7.5 L9 4.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                            <div
                              className="site-drawer__cat-panel"
                              data-open={isOpen ? "true" : "false"}
                            >
                              <div className="site-drawer__cat-panel-inner">
                              <ul role="list">
                                {cat.links.map((l) => (
                                  <li key={l.href}>
                                    <a
                                      href={l.href}
                                      onClick={closeMobileMenu}
                                    >
                                      {l.label}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                );
              }
              if (item.label === "Insights") {
                return (
                  <div key={item.label} className="site-drawer__group">
                    <button
                      type="button"
                      className="site-drawer__split-row site-drawer__split-trigger"
                      onClick={toggleMobileInsights}
                      aria-expanded={mobileInsightsOpen}
                      aria-label={`${mobileInsightsOpen ? "Hide" : "Show"} insights links`}
                      data-open={mobileInsightsOpen ? "true" : "false"}
                      suppressHydrationWarning
                    >
                      <span className="site-drawer__split-link">{item.label}</span>
                      <span className="site-drawer__split-toggle" aria-hidden>
                        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
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
                      className="site-drawer__sub"
                      data-open={mobileInsightsOpen ? "true" : "false"}
                    >
                      <div className="site-drawer__sub-inner">
                      <ul className="site-drawer__insights-list" role="list">
                        {INSIGHTS_LINKS.map((link) => (
                          <li key={link.href}>
                            <a href={link.href} onClick={closeMobileMenu}>
                              {link.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="site-drawer__link"
                  onClick={closeMobileMenu}
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
              onClick={closeMobileMenu}
            >
              <span>Contact us</span>
              <span className="site-drawer__arrow" aria-hidden>
                →
              </span>
            </a>
          </nav>

          <div className="site-drawer__foot">
            <Link href="/contact" className="site-drawer__cta" onClick={closeMobileMenu}>
              Start a project
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
            </Link>
            <a href="mailto:hello@techbinaries.com" className="site-drawer__mail">
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
        .site-header[data-hero-blend="true"] {
          background: transparent !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          border-bottom-color: transparent !important;
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
        .site-header__mini-menu {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          width: 260px;
          background: #fff;
          border: 1px solid rgba(10, 10, 10, 0.1);
          border-radius: 12px;
          box-shadow: 0 20px 42px -28px rgba(10, 10, 10, 0.35);
          padding: 8px;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: opacity 0.22s ease, transform 0.22s ease, visibility 0s linear 0.22s;
          z-index: 20;
        }
        .site-header__mini-menu[data-open="true"] {
          opacity: 1;
          visibility: visible;
          pointer-events: auto;
          transform: translateX(-50%) translateY(0);
          transition: opacity 0.22s ease, transform 0.22s ease, visibility 0s linear 0s;
        }
        .site-header__mini-menu-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .site-header__mini-menu-link {
          display: block;
          text-decoration: none;
          color: rgba(10, 10, 10, 0.72);
          font-family: var(--font-body);
          font-size: 13px;
          padding: 10px 12px;
          border-radius: 8px;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .site-header__mini-menu-link:hover {
          background: rgba(10, 10, 10, 0.05);
          color: #0a0a0a;
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
          transition: transform 0.42s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.28s ease,
                      top 0.42s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__burger {
          border-color: rgba(255, 255, 255, 0.24);
          background: rgba(255, 255, 255, 0.06);
        }
        .site-header[data-theme="dark"][data-scrolled="false"] .site-header__burger span {
          background: #fafaf9;
        }

        /*
          On full-bleed dark hero routes (home, CSD services):
          frosted header bar with dark/black nav (same look as the scrolled state).
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
        .site-header[data-hero-blend="true"] .site-header__brand-logo {
          filter: none;
        }
        .site-header[data-hero-blend="true"] .site-header__nav-link {
          color: rgba(255, 255, 255, 0.82);
        }
        .site-header[data-hero-blend="true"] .site-header__nav-link:hover,
        .site-header[data-hero-blend="true"] .site-header__nav-link:focus-visible {
          color: #fafaf9;
          background: rgba(255, 255, 255, 0.1);
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
          background: rgba(10, 10, 10, 0.42);
          opacity: 0;
          backdrop-filter: blur(0px);
          -webkit-backdrop-filter: blur(0px);
          transition:
            opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1),
            backdrop-filter 0.65s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .site-drawer[data-open="true"] .site-drawer__scrim {
          opacity: 1;
          backdrop-filter: blur(16px) saturate(140%);
          -webkit-backdrop-filter: blur(16px) saturate(140%);
        }

        .site-drawer__panel {
          position: absolute;
          top: 0; right: 0; bottom: 0;
          width: min(420px, 100%);
          background:
            linear-gradient(
              165deg,
              rgba(255, 255, 255, 0.38) 0%,
              rgba(255, 255, 255, 0.24) 42%,
              rgba(250, 250, 249, 0.18) 100%
            );
          backdrop-filter: blur(52px) saturate(195%) brightness(1.05);
          -webkit-backdrop-filter: blur(52px) saturate(195%) brightness(1.05);
          border: none;
          box-shadow: -28px 0 90px -24px rgba(10, 10, 10, 0.28);
          padding:
            calc(var(--header-height-compact) + 12px)
            24px
            max(28px, calc(env(safe-area-inset-bottom, 0px) + 20px));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
          transform: translate3d(104%, 0, 0);
          opacity: 0.96;
          transition:
            transform 0.78s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.55s ease;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          will-change: transform;
          isolation: isolate;
        }
        .site-drawer__panel::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.22) 0%,
            rgba(255, 255, 255, 0.06) 14%,
            transparent 32%
          );
          z-index: 0;
        }
        .site-drawer[data-open="true"] .site-drawer__panel {
          transform: translate3d(0, 0, 0);
          opacity: 1;
        }

        .site-drawer__close {
          position: absolute;
          top: max(16px, env(safe-area-inset-top, 0px));
          right: max(16px, env(safe-area-inset-right, 0px));
          z-index: 2;
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.55);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(16px) saturate(170%);
          -webkit-backdrop-filter: blur(16px) saturate(170%);
          color: var(--color-ink);
          cursor: pointer;
          box-shadow:
            0 10px 28px -16px rgba(10, 10, 10, 0.32),
            inset 0 1px 0 rgba(255, 255, 255, 0.78);
          -webkit-tap-highlight-color: transparent;
          opacity: 0;
          transform: scale(0.88) rotate(-12deg);
          transition:
            opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.18s,
            transform 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.18s,
            background 0.2s ease,
            border-color 0.2s ease;
        }
        .site-drawer[data-open="true"] .site-drawer__close {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        .site-drawer__close:hover {
          background: rgba(255, 255, 255, 0.42);
          border-color: rgba(255, 255, 255, 0.68);
        }
        .site-drawer__close:active {
          background: rgba(255, 255, 255, 0.5);
        }
        .site-drawer[data-open="true"] .site-drawer__close:active {
          transform: scale(0.94) rotate(0deg);
        }

        .site-drawer__nav {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding-top: 4px;
        }

        .site-drawer__nav > .site-drawer__link,
        .site-drawer__nav > .site-drawer__group {
          opacity: 0;
          transform: translate3d(18px, 0, 0);
          transition:
            opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.62s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .site-drawer[data-open="true"] .site-drawer__nav > .site-drawer__link,
        .site-drawer[data-open="true"] .site-drawer__nav > .site-drawer__group {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .site-drawer[data-open="true"] .site-drawer__nav > :nth-child(1) { transition-delay: 0.1s; }
        .site-drawer[data-open="true"] .site-drawer__nav > :nth-child(2) { transition-delay: 0.16s; }
        .site-drawer[data-open="true"] .site-drawer__nav > :nth-child(3) { transition-delay: 0.22s; }
        .site-drawer[data-open="true"] .site-drawer__nav > :nth-child(4) { transition-delay: 0.28s; }
        .site-drawer[data-open="true"] .site-drawer__nav > :nth-child(5) { transition-delay: 0.34s; }
        .site-drawer[data-open="true"] .site-drawer__nav > :nth-child(6) { transition-delay: 0.4s; }

        .site-drawer__link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 12px;
          font-family: var(--font-display);
          font-size: 26px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--color-ink);
          border: 0;
          border-radius: 14px;
          background: transparent;
          text-decoration: none;
          text-align: left;
          cursor: pointer;
          width: 100%;
          transition: background 0.22s ease, transform 0.22s ease;
        }
        .site-drawer__link:active {
          background: rgba(255, 255, 255, 0.28);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transform: translateX(2px);
        }
        .site-drawer__group {
          border-radius: 0;
          border: none;
        }
        .site-drawer__group:has(.site-drawer__sub[data-open="true"]) {
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border-color: transparent;
          box-shadow: none;
        }
        .site-drawer__group:has(.site-drawer__sub[data-open="true"]) .site-drawer__split-row {
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(10, 10, 10, 0.07);
        }
        .site-drawer__arrow {
          font-size: 16px;
          color: rgba(10, 10, 10, 0.45);
          transition: transform 0.25s ease, color 0.25s ease;
        }
        .site-drawer__link:active .site-drawer__arrow {
          transform: translateX(3px);
          color: rgba(10, 10, 10, 0.65);
        }

        .site-drawer__split-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 12px;
        }
        .site-drawer__split-trigger {
          width: 100%;
          margin: 0;
          border: 0;
          background: transparent;
          cursor: pointer;
          text-align: left;
          -webkit-tap-highlight-color: transparent;
        }
        .site-drawer__split-trigger:focus {
          outline: none;
        }
        .site-drawer__split-row--top {
          padding: 16px 12px;
        }
        .site-drawer__split-link {
          flex: 1;
          min-width: 0;
          font-family: var(--font-display);
          font-size: 22px;
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--color-ink);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .site-drawer__split-link--top {
          font-size: 26px;
        }
        .site-drawer__split-trigger:active .site-drawer__split-link {
          color: rgba(10, 10, 10, 0.62);
        }
        .site-drawer__split-toggle,
        .site-drawer__cat-toggle {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: auto;
          height: auto;
          min-width: 16px;
          padding: 0;
          border: 0;
          border-radius: 0;
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          color: rgba(10, 10, 10, 0.52);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          box-shadow: none;
          transition:
            transform 0.42s cubic-bezier(0.16, 1, 0.3, 1),
            color 0.25s ease;
        }
        .site-drawer__split-toggle svg,
        .site-drawer__cat-toggle svg {
          display: block;
          width: 16px;
          height: 16px;
        }
        .site-drawer__split-toggle:focus,
        .site-drawer__cat-toggle:focus {
          outline: none;
        }
        .site-drawer__split-toggle--top {
          width: auto;
          height: auto;
        }
        .site-drawer__split-trigger[data-open="true"] .site-drawer__split-toggle,
        .site-drawer__cat-toggle[data-open="true"] {
          transform: rotate(180deg);
          background: transparent;
          border-color: transparent;
          color: rgba(10, 10, 10, 0.62);
          box-shadow: none;
        }
        .site-drawer__split-toggle:active,
        .site-drawer__cat-toggle:active {
          color: rgba(10, 10, 10, 0.72);
        }
        .site-drawer__split-trigger[data-open="true"]:active .site-drawer__split-toggle,
        .site-drawer__cat-toggle[data-open="true"]:active {
          transform: rotate(180deg);
          color: rgba(10, 10, 10, 0.72);
        }

        .site-drawer__sub {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.58s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .site-drawer__sub[data-open="true"] {
          grid-template-rows: 1fr;
        }
        .site-drawer__sub-inner {
          overflow: hidden;
          min-height: 0;
        }
        .site-drawer__sub[data-open="true"] .site-drawer__sub-inner {
          margin: 0;
          padding: 2px 0 4px 14px;
          border-radius: 0;
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border: none;
          box-shadow: none;
        }

        .site-drawer__sub-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 10px 12px 12px 2px;
          margin: 0 0 10px;
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(10, 10, 10, 0.72);
          text-decoration: none;
          border-bottom: 1px solid rgba(10, 10, 10, 0.12);
          transition: color 0.2s ease;
        }
        .site-drawer__sub-link:active {
          color: var(--color-ink);
        }
        .site-drawer__sub-link-arrow {
          font-size: 13px;
          color: rgba(10, 10, 10, 0.5);
        }

        .site-drawer__cat {
          margin: 0;
          border-radius: 0;
          border: none;
        }
        .site-drawer__cat:has(.site-drawer__cat-panel[data-open="true"]) {
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border-color: transparent;
          box-shadow: none;
        }
        .site-drawer__cat + .site-drawer__cat {
          margin-top: 0;
          border-top: 1px solid rgba(10, 10, 10, 0.06);
        }
        .site-drawer__cat-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 0 10px 0 2px;
        }
        .site-drawer__cat-link {
          flex: 1;
          min-width: 0;
          display: block;
          padding: 14px 0;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.005em;
          line-height: 1.35;
          color: var(--color-ink);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .site-drawer__cat-link:active {
          color: rgba(10, 10, 10, 0.75);
        }

        .site-drawer__cat-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .site-drawer__cat-panel[data-open="true"] {
          grid-template-rows: 1fr;
        }
        .site-drawer__cat-panel-inner {
          overflow: hidden;
          min-height: 0;
        }
        .site-drawer__cat-panel ul {
          list-style: none;
          margin: 0 0 6px;
          padding: 0 0 8px 14px;
          border-left: 2px solid rgba(10, 10, 10, 0.18);
        }
        .site-drawer__cat-panel a {
          display: block;
          padding: 9px 8px 9px 10px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          color: var(--color-ink);
          text-decoration: none;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .site-drawer__cat-panel a:active {
          color: var(--color-ink);
          background: rgba(10, 10, 10, 0.05);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .site-drawer__insights-list {
          list-style: none;
          margin: 0;
          padding: 4px 0 8px 14px;
          border-left: 2px solid rgba(10, 10, 10, 0.18);
        }
        .site-drawer__insights-list a {
          display: block;
          padding: 10px 8px;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 500;
          color: var(--color-ink);
          text-decoration: none;
          border-radius: 10px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .site-drawer__insights-list a:active {
          color: var(--color-ink);
          background: rgba(10, 10, 10, 0.05);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
        }

        .site-drawer__foot {
          position: relative;
          z-index: 1;
          padding-top: 12px;
          margin-top: 4px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          opacity: 0;
          transform: translateY(12px);
          transition:
            opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1) 0.42s,
            transform 0.62s cubic-bezier(0.16, 1, 0.3, 1) 0.42s;
        }
        .site-drawer[data-open="true"] .site-drawer__foot {
          opacity: 1;
          transform: translateY(0);
        }
        .site-drawer__cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 15px 22px;
          background: var(--color-ink);
          color: var(--color-paper);
          border-radius: 999px;
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          box-shadow: 0 16px 36px -18px rgba(10, 10, 10, 0.55);
          transition: transform 0.25s ease, background 0.2s ease;
        }
        .site-drawer__cta:active {
          transform: scale(0.98);
          background: #1a1a1a;
        }
        .site-drawer__cta svg {
          transition: transform 0.25s ease;
        }
        .site-drawer__cta:active svg {
          transform: translateX(2px);
        }
        .site-drawer__mail {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 4px 2px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 500;
          color: rgba(10, 10, 10, 0.78);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .site-drawer__mail:active {
          color: var(--color-ink);
        }

        @media (prefers-reduced-motion: reduce) {
          .site-drawer__scrim,
          .site-drawer__panel,
          .site-drawer__close,
          .site-drawer__nav > .site-drawer__link,
          .site-drawer__nav > .site-drawer__group,
          .site-drawer__foot,
          .site-drawer__sub,
          .site-drawer__cat-panel {
            transition-duration: 0.01ms !important;
            transition-delay: 0ms !important;
          }
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
          .site-header__inner {
            padding: 0 20px;
            gap: 12px;
            grid-template-columns: auto 1fr;
          }
          .site-header__right { justify-self: end; }
          .site-header__nav { display: none; }
          .site-header__cta { display: none; }
          .site-header__burger {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }
          /* Drawer takes over on mobile */
          .site-header__mega { display: none; }
          .site-drawer__panel {
            padding-bottom: max(32px, calc(env(safe-area-inset-bottom, 0px) + 24px));
          }
          .site-drawer__foot {
            margin-bottom: 10px;
          }
        }
        @media (max-width: 480px) {
          .site-header__brand-logo-wrap {
            width: 208px;
            height: 44px;
          }
          .site-drawer__panel {
            padding-left: 18px;
            padding-right: 18px;
            padding-bottom: max(44px, calc(env(safe-area-inset-bottom, 0px) + 36px));
          }
          .site-drawer__link {
            font-size: 24px;
            padding: 14px 10px;
          }
          .site-drawer__split-row,
          .site-drawer__split-row--top {
            padding: 14px 10px;
          }
          .site-drawer__split-link--top {
            font-size: 24px;
          }
          .site-drawer__split-link {
            font-size: 20px;
          }
          .site-drawer__cat-link {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
