"use client";

import Link from "next/link";
import Image from "next/image";
import { FOOTER_NAV_COLS, FOOTER_SOCIAL } from "@/data/home";

// ── SiteFooter ────────────────────────────────────────────────────────────────
// Reusable footer rendered on every page (home, services, contact, etc.).
// Drop <SiteFooter /> at the bottom of any page layout.
// ─────────────────────────────────────────────────────────────────────────────

export default function SiteFooter() {
  return (
    <footer
      className="site-footer"
      style={{
        background: "#fafaf9",
        color: "#0a0a0a",
        padding: "88px 20px 36px",
        position: "relative",
        overflow: "hidden",
        borderTopLeftRadius: 88,
        borderTop: "1px solid rgba(10,10,10,0.16)",
      }}
    >
      {/* Dot grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(10,10,10,0.05) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.22,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* ── GRID ── */}
        <div className="footer-grid">
          {/* Brand column */}
          <div className="footer-brand-col">
            <Link
              href="/"
              aria-label="TechBinaries homepage"
              className="footer-brand-link"
              style={{
                display: "inline-flex",
                marginBottom: 14,
                textDecoration: "none",
              }}
            >
              <span
                style={{
                  display: "block",
                  position: "relative",
                  width: 252,
                  height: 50,
                  overflow: "hidden",
                }}
              >
                <Image
                  src="/images/header-logo.png"
                  alt="TechBinaries"
                  fill
                  sizes="252px"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </span>
            </Link>

            <a
              href="mailto:hello@techbinaries.com"
              className="footer-email"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-display)",
                fontSize: 19,
                lineHeight: 1.2,
                color: "rgba(10,10,10,0.84)",
                textDecoration: "none",
                marginBottom: 18,
              }}
            >
              <span className="footer-email-text">hello@techbinaries.com</span>
              <span
                className="footer-email-arrow"
                style={{ transition: "transform 0.25s, color 0.25s", color: "rgba(10,10,10,0.45)" }}
              >
                ↗
              </span>
            </a>

            <p style={{ color: "rgba(10,10,10,0.62)", lineHeight: 1.65, fontSize: 16, maxWidth: 380 }}>
              Growth strategy, conversion systems, and product engineering built
              around measurable business outcomes.
            </p>
          </div>

          {/* Nav columns (paired so mobile can show Explore | Services in two columns) */}
          <div className="footer-nav-pair">
            {FOOTER_NAV_COLS.map((col) => (
              <div
                key={col.heading}
                className={`footer-nav-col footer-nav-col--${col.heading.toLowerCase()}`}
              >
                <div
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(64,64,64,1)",
                    marginBottom: 16,
                  }}
                >
                  {col.heading}
                </div>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 13,
                  }}
                >
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="footer-nav-link"
                        target={link.ext ? "_blank" : undefined}
                        rel={link.ext ? "noreferrer" : undefined}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          color: "rgba(10,10,10,0.72)",
                          textDecoration: "none",
                          fontSize: 16,
                          lineHeight: 1.35,
                          transition: "color 0.25s",
                        }}
                      >
                        <span className="footer-nav-link-text">{link.label}</span>
                        {link.ext && (
                          <span
                            className="footer-nav-link-arrow"
                            style={{ transition: "transform 0.22s, opacity 0.22s", opacity: 0.72 }}
                          >
                            ↗
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter column */}
          <div className="footer-newsletter-col">
            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(64,64,64,1)",
                marginBottom: 16,
              }}
            >
              The Dispatch
            </div>
            <p style={{ color: "rgba(10,10,10,0.65)", fontSize: 16, lineHeight: 1.6, marginBottom: 18 }}>
              Monthly notes on growth bets, technical architecture, and what we&apos;re shipping next.
            </p>
            <form
              className="footer-newsletter-form"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = form.elements.namedItem("email") as HTMLInputElement | null;
                const value = input?.value?.trim() || "";
                const body = value
                  ? `Please subscribe this email to The Dispatch:%0D%0A${encodeURIComponent(value)}`
                  : "Please subscribe me to The Dispatch.";
                window.location.href = `mailto:hello@techbinaries.com?subject=Subscribe%20to%20The%20Dispatch&body=${body}`;
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                border: "1px solid rgba(10,10,10,0.16)",
                borderRadius: 999,
                padding: "7px 7px 7px 16px",
                background: "rgba(10,10,10,0.025)",
                transition: "border-color 0.25s, background 0.25s",
              }}
            >
              <input
                type="email"
                name="email"
                required
                placeholder="you@company.com"
                suppressHydrationWarning
                style={{
                  flex: 1,
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  color: "#0a0a0a",
                  fontSize: 14,
                  fontFamily: "var(--font-body)",
                }}
              />
              <button
                className="footer-newsletter-btn"
                type="submit"
                suppressHydrationWarning
                style={{
                  border: "none",
                  borderRadius: 999,
                  padding: "10px 16px",
                  background: "#0a0a0a",
                  color: "#fafaf9",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "transform 0.22s, background 0.22s",
                }}
              >
                Subscribe →
              </button>
            </form>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid rgba(10,10,10,0.1)",
            paddingTop: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 13, color: "rgba(10,10,10,0.54)" }}>
            © 2026 TechBinaries
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            {FOOTER_SOCIAL.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                title={social.label}
                className="footer-social-link"
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  border: "1px solid rgba(10,10,10,0.18)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(10,10,10,0.72)",
                  textDecoration: "none",
                  transition: "all 0.22s",
                }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
                  <path d={social.svgPath} />
                </svg>
              </a>
            ))}

            <span style={{ width: 1, height: 16, background: "rgba(10,10,10,0.14)", margin: "0 2px" }} />

            {["Privacy", "Terms", "Cookies"].map((item, idx) => (
              <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
                <a
                  href="#"
                  className="footer-legal-link"
                  style={{
                    textDecoration: "none",
                    color: "rgba(10,10,10,0.56)",
                    fontSize: 13,
                    transition: "color 0.22s",
                  }}
                >
                  {item}
                </a>
                {idx < 2 && (
                  <span
                    style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(10,10,10,0.28)" }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer-scoped styles ── */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: minmax(280px, 360px) max-content minmax(320px, 460px);
          column-gap: 44px;
          row-gap: 48px;
          margin-bottom: 50px;
        }
        .footer-grid > * {
          min-width: 0;
        }
        .footer-nav-pair {
          display: grid;
          grid-template-columns: max-content max-content;
          column-gap: 44px;
          align-items: start;
        }
        .footer-nav-col {
          min-width: 0;
        }
        .footer-brand-link {
          margin-left: -18px;
        }
        .footer-newsletter-col {
          max-width: 460px;
          margin-left: 28px;
        }
        .footer-newsletter-form:focus-within {
          border-color: rgba(10,10,10,0.28) !important;
          background: rgba(10,10,10,0.04) !important;
        }
        .footer-newsletter-form input::placeholder { color: rgba(10,10,10,0.4); }
        .footer-newsletter-btn:hover {
          background: #1f1f1f !important;
          transform: translateX(2px);
        }
        .footer-email:hover .footer-email-arrow {
          transform: translate(3px,-3px);
          color: #0a0a0a !important;
        }
        .footer-email .footer-email-text {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 1px;
          background-repeat: no-repeat;
          background-position: 0 100%;
          transition: background-size 0.4s cubic-bezier(0.22,1,0.36,1);
          padding-bottom: 2px;
        }
        .footer-email:hover .footer-email-text { background-size: 100% 1px; }
        .footer-nav-link:hover { color: #0a0a0a !important; }
        .footer-nav-link .footer-nav-link-text {
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 1px;
          background-repeat: no-repeat;
          background-position: 0 100%;
          transition: background-size 0.35s cubic-bezier(0.22,1,0.36,1);
          padding-bottom: 2px;
        }
        .footer-nav-link:hover .footer-nav-link-text { background-size: 100% 1px; }
        .footer-nav-link:hover .footer-nav-link-arrow { transform: translate(2px,-2px); opacity: 1; }
        .footer-legal-link:hover { color: #0a0a0a !important; }
        .footer-social-link:hover {
          color: #0a0a0a !important;
          border-color: rgba(10,10,10,0.42) !important;
          transform: translateY(-1px);
          background: rgba(10,10,10,0.05);
        }
        @media (max-width: 1100px) {
          .footer-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            column-gap: 40px;
            row-gap: 44px;
          }
          .footer-newsletter-col {
            margin-left: 0;
            max-width: none;
            grid-column: 1 / -1;
          }
          .footer-nav-pair {
            column-gap: 40px;
          }
        }
        @media (max-width: 768px) {
          .site-footer {
            padding: 56px 16px 28px !important;
            border-top-left-radius: 48px !important;
          }
          .footer-grid {
            grid-template-columns: 1fr;
            column-gap: 0;
            row-gap: 36px;
            margin-bottom: 40px;
          }
          .footer-nav-pair {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: flex-start;
            justify-content: flex-start;
            gap: 16px;
          }
          .footer-nav-col--explore {
            flex: 1 1 0;
            min-width: 0;
            order: 1;
          }
          .footer-nav-col--services {
            flex: 1 1 0;
            min-width: 0;
            order: 2;
          }
          .footer-nav-pair .footer-nav-link-text {
            word-break: break-word;
          }
          .footer-brand-link {
            margin-left: 0;
          }
          .footer-newsletter-col {
            margin-left: 0;
            max-width: none;
          }
          .footer-newsletter-form {
            flex-wrap: wrap;
            row-gap: 8px;
          }
          .footer-newsletter-form input {
            min-width: 0;
            flex: 1 1 160px;
          }
          .footer-bottom { justify-content: flex-start !important; }
        }
        @media (max-width: 380px) {
          .footer-newsletter-form {
            padding-left: 14px !important;
          }
          .footer-newsletter-btn {
            width: 100%;
            flex: 1 1 100%;
          }
        }
      `}</style>
    </footer>
  );
}
