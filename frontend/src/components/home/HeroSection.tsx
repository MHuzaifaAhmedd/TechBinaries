"use client";

import { useEffect, useRef, useState, MutableRefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Lenis from "@studio-freight/lenis";
import { HERO_VERBS, BUILDING_NOW } from "@/data/home";

gsap.registerPlugin(ScrollTrigger);

// ── HeroSection ───────────────────────────────────────────────────────────────
// Full-viewport landing hero with:
//  - Animated character-split headline with rotating verb
//  - Parallax background glyph + dot grid
//  - 3D-tilting "live terminal" card on mouse move
//  - GSAP intro timeline + scroll-fade out
// ─────────────────────────────────────────────────────────────────────────────

interface HeroSectionProps {
  lenisRef: MutableRefObject<Lenis | null>;
}

export default function HeroSection({ lenisRef }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const heroTerminalRef = useRef<HTMLDivElement>(null);
  const [rotatingVerb, setRotatingVerb] = useState(0);

  // Rotating verb cycle
  useEffect(() => {
    const id = setInterval(() => {
      setRotatingVerb((v) => (v + 1) % HERO_VERBS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  // Mouse-reactive terminal tilt
  useEffect(() => {
    if (!heroRef.current) return;
    const hero = heroRef.current;
    const terminal = heroTerminalRef.current;

    const termRY = terminal ? gsap.quickTo(terminal, "rotationY", { duration: 0.7, ease: "power3.out" }) : null;
    const termRX = terminal ? gsap.quickTo(terminal, "rotationX", { duration: 0.7, ease: "power3.out" }) : null;

    if (terminal) gsap.set(terminal, { transformPerspective: 1400, transformStyle: "preserve-3d" });

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      if (e.clientY > rect.bottom || e.clientY < rect.top) return;
      const tx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ty = (e.clientY / window.innerHeight - 0.5) * 2;
      termRY?.(tx * -3);
      termRX?.(ty * 3);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // GSAP intro timeline + scroll-driven fade
  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ delay: 0.1 });

      heroTl.fromTo(
        gsap.utils.toArray<HTMLElement>(".hero-char"),
        { yPercent: 110, rotateX: -35, opacity: 0 },
        { yPercent: 0, rotateX: 0, opacity: 1, duration: 0.9, stagger: { each: 0.018, from: "start" }, ease: "power4.out" },
        0
      );
      heroTl.fromTo(
        ".hero-verb-mask",
        { yPercent: 100 },
        { yPercent: 0, duration: 0.85, ease: "power4.out" },
        0.2
      );
      heroTl.fromTo(
        ".hero-intro-col",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" },
        0.7
      );
      heroTl.fromTo(
        ".hero-terminal",
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out" },
        0.35
      );
      heroTl.fromTo(
        ".hero-terminal-line",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.12, ease: "power2.out" },
        0.65
      );
      heroTl.fromTo(
        ".hero-scroll-hint",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        1.5
      );

      if (heroRef.current) {
        gsap.to(".hero-content-wrap", {
          y: -80, opacity: 0.4, scale: 0.98, ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-scroll-hint", {
          opacity: 0, y: 20, ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "15% top", scrub: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "120px 20px 60px",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Hero background media */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <source src="/videos/her-section-land.mp4" type="video/mp4" />
      </video>

      {/* Cinematic left-heavy shade inspired by services hero */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.62) 34%, rgba(0,0,0,0.38) 58%, rgba(0,0,0,0.18) 78%, rgba(0,0,0,0.1) 100%), linear-gradient(180deg, rgba(0,0,0,0.34) 0%, rgba(0,0,0,0.52) 100%)",
        }}
      />

      {/* Soft spotlight for a richer hero tone */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(1000px 520px at 18% 36%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 34%, transparent 72%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Corner crosshair marks */}
      {[
        { top: 140, left: 40, borderTop: "1px solid rgba(255,255,255,0.34)", borderLeft: "1px solid rgba(255,255,255,0.34)" },
        { top: 140, right: 40, borderTop: "1px solid rgba(255,255,255,0.28)", borderRight: "1px solid rgba(255,255,255,0.28)" },
        { bottom: 40, left: 40, borderBottom: "1px solid rgba(255,255,255,0.34)", borderLeft: "1px solid rgba(255,255,255,0.34)" },
        { bottom: 40, right: 40, borderBottom: "1px solid rgba(255,255,255,0.28)", borderRight: "1px solid rgba(255,255,255,0.28)" },
      ].map((s, i) => (
        <div key={i} aria-hidden style={{ position: "absolute", width: 10, height: 10, pointerEvents: "none", ...s }} />
      ))}

      {/* Main content */}
      <div
        className="hero-content-wrap"
        style={{ maxWidth: 1320, width: "100%", margin: "0 auto", position: "relative", zIndex: 1, willChange: "transform, opacity" }}
      >
        <div
          className="hero-main-grid"
          style={{ display: "grid", gridTemplateColumns: "1.65fr 1fr", gap: 36, alignItems: "start", marginBottom: 56 }}
        >
          {/* LEFT — headline + copy + CTA */}
          <div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(40px, 5.8vw, 96px)",
                fontWeight: 500, lineHeight: 0.96,
                letterSpacing: "-0.032em", margin: "0 0 48px",
                color: "#ffffff",
                textShadow: "0 8px 28px rgba(0,0,0,0.35)",
              }}
            >
              {/* "We [rotating verb]" */}
              <div style={{ overflow: "hidden", paddingBottom: "0.08em", display: "flex", flexWrap: "nowrap", alignItems: "baseline", gap: "0.22em" }}>
                <span style={{ display: "inline-flex", overflow: "hidden", flexShrink: 0 }}>
                  {"We".split("").map((c, i) => (
                    <span key={`we-${i}`} className="hero-char" style={{ display: "inline-block", willChange: "transform" }}>
                      {c === " " ? "\u00A0" : c}
                    </span>
                  ))}
                </span>
                <span
                  aria-live="polite"
                  style={{
                    position: "relative", display: "inline-block",
                    overflow: "visible", verticalAlign: "bottom",
                    minWidth: "7ch", paddingRight: "0.12em",
                  }}
                >
                  <span className="hero-verb-mask" style={{ display: "inline-block", willChange: "transform" }}>
                    {HERO_VERBS.map((v, i) => (
                      <span
                        key={v}
                        style={{
                          display: "block", fontStyle: "italic", fontWeight: 400,
                          color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap",
                          transform: `translateY(${(i - rotatingVerb) * 100}%)`,
                          transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
                          position: i === 0 ? "relative" : "absolute",
                          top: 0, left: 0,
                        }}
                      >
                        {v}
                      </span>
                    ))}
                  </span>
                </span>
              </div>

              {/* "software for" */}
              <div style={{ overflow: "hidden", paddingBottom: "0.06em" }}>
                {"software for".split("").map((c, i) => (
                  <span key={`s-${i}`} className="hero-char" style={{ display: "inline-block", willChange: "transform" }}>
                    {c === " " ? "\u00A0" : c}
                  </span>
                ))}
              </div>

              {/* "ambitious teams." */}
              <div className="hero-line-3" style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
                {"ambitious teams.".split("").map((c, i) => (
                  <span
                    key={`a-${i}`}
                    className="hero-char"
                    style={{
                      display: "inline-block", willChange: "transform",
                      color: c === "." ? "rgba(255,255,255,0.55)" : "inherit",
                      whiteSpace: "pre",
                    }}
                  >
                    {c === " " ? "\u00A0" : c}
                  </span>
                ))}
              </div>
            </h1>

            <p
              className="hero-intro-col"
              style={{ fontSize: 17, color: "rgba(255,255,255,0.88)", maxWidth: 480, lineHeight: 1.65, margin: "0 0 36px", fontWeight: 400, opacity: 0, textShadow: "0 6px 22px rgba(0,0,0,0.32)" }}
            >
              A senior team of engineers, designers, and strategists partnering with
              startups and scale-ups to design, build, and ship products that matter —
              from zero to production and long after.
            </p>

            <div className="hero-intro-col hero-cta" style={{ display: "flex", gap: 12, opacity: 0, flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="hero-cta-primary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "15px 28px", background: "#0a0a0a", color: "#fafaf9",
                  textDecoration: "none", fontSize: 14, fontWeight: 500,
                  borderRadius: 999, position: "relative", overflow: "hidden",
                }}
              >
                <span style={{ position: "relative", zIndex: 2 }}>Start a project</span>
                <svg
                  aria-hidden width="12" height="12" viewBox="0 0 12 12"
                  className="hero-cta-arrow"
                  style={{ position: "relative", zIndex: 2, flexShrink: 0 }}
                >
                  <path d="M2.5 6h7M6 2.5L9.5 6 6 9.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>

          {/* RIGHT — live terminal card */}
          <div ref={heroTerminalRef} className="hero-terminal" style={{ opacity: 0, willChange: "transform", transformStyle: "preserve-3d", position: "relative" }}>
            <div
              style={{
                background: "linear-gradient(145deg, rgba(12,12,12,0.74) 0%, rgba(12,12,12,0.5) 100%)",
                color: "#fafaf9", borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.14)",
                padding: "20px 22px 22px",
                boxShadow: "0 30px 70px -30px rgba(0,0,0,0.6), 0 8px 24px -10px rgba(0,0,0,0.35)",
                position: "relative", overflow: "hidden",
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Window chrome */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                  ))}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.06em" }}>studio.tsx</div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[0, 1].map((i) => (
                    <span key={i} style={{ width: 10, height: 1, background: "rgba(255,255,255,0.25)" }} />
                  ))}
                </div>
              </div>

              {/* Code block */}
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12.5, lineHeight: 1.8 }}>
                {[
                  [<><span style={{ color: "#ec4899" }}>export const</span> <span style={{ color: "#38bdf8" }}>studio</span> = {"{"}</>, "01"],
                  [<>{"  "}<span style={{ color: "#a3e635" }}>team</span>: <span style={{ color: "#fbbf24" }}>40</span>,</>, "02"],
                  [<>{"  "}<span style={{ color: "#a3e635" }}>shipped</span>: <span style={{ color: "#fbbf24" }}>150</span>,</>, "03"],
                  [<>{"  "}<span style={{ color: "#a3e635" }}>stack</span>: [<span style={{ color: "#fde68a" }}>&apos;react&apos;</span>, <span style={{ color: "#fde68a" }}>&apos;go&apos;</span>, <span style={{ color: "#fde68a" }}>&apos;k8s&apos;</span>],</>, "04"],
                  [<>{"  "}<span style={{ color: "#a3e635" }}>status</span>: <span style={{ color: "#fde68a" }}>&apos;accepting&apos;</span>,</>, "05"],
                  [<>{"  "}<span style={{ color: "#a3e635" }}>ship</span>: <span style={{ color: "#ec4899" }}>async</span> () =&gt; <span style={{ color: "rgba(255,255,255,0.5)" }}>{"/"}* every week *{"/"}</span></>, "06"],
                  [<>{"}"}<span className="caret-blink" style={{ display: "inline-block", width: 8, height: 14, background: "#fafaf9", marginLeft: 6, verticalAlign: "middle" }} /></>, "07"],
                ].map(([content, lineNum]) => (
                  <div key={lineNum as string} className="hero-terminal-line" style={{ opacity: 0, display: "flex", gap: 14 }}>
                    <span style={{ color: "rgba(255,255,255,0.25)", width: 14, textAlign: "right" }}>{lineNum}</span>
                    <span>{content}</span>
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "18px -22px 14px" }} />

              {/* "Currently shipping" ticker */}
              <div style={{ position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "rgba(255,255,255,0.35)", marginBottom: 8, textTransform: "uppercase" }}>
                  Currently shipping
                </div>
                <div className="building-now" style={{ position: "relative", height: 22 }}>
                  {BUILDING_NOW.map((b, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute", top: 0, left: 0, right: 0,
                        display: "flex", alignItems: "center", gap: 10,
                        opacity: 0,
                        animation: `building-rotate 12s infinite ${i * 3}s`,
                      }}
                    >
                      <span
                        style={{
                          padding: "2px 8px", borderRadius: 4,
                          background: "rgba(255,255,255,0.08)",
                          fontSize: 9, fontWeight: 600, letterSpacing: "0.14em",
                          color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-mono)",
                        }}
                      >
                        {b.tag}
                      </span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div
                style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr",
                  gap: 12, marginTop: 18, paddingTop: 14,
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {[
                  { label: "Commits today", val: "247" },
                  { label: "Deploys this week", val: "18" },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 4 }}>
                      {label}
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
                      <span className="stat-num" data-val={val}>{val}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Glow */}
              <div
                aria-hidden
                style={{
                  position: "absolute", top: -80, right: -80, width: 280, height: 280,
                  background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 65%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="hero-scroll-hint"
        style={{
          position: "absolute", bottom: 28, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
          opacity: 0, pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)" }}>
          Scroll
        </span>
        <div style={{ width: 20, height: 32, borderRadius: 10, border: "1px solid rgba(255,255,255,0.35)", position: "relative", overflow: "hidden" }}>
          <span
            className="scroll-dot"
            style={{ position: "absolute", top: 6, left: "50%", marginLeft: -2, width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.75)" }}
          />
        </div>
      </div>
    </section>
  );
}
