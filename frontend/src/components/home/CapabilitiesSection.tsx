"use client";

import { useEffect, useRef, useState, MutableRefObject } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { SERVICES } from "@/data/home";

gsap.registerPlugin(ScrollTrigger);

// ── CapabilitiesSection ───────────────────────────────────────────────────────
// Desktop: pinned viewport with horizontal accordion slats (GSAP scrub).
// Mobile: tap-to-expand accordion (pure CSS transitions).
// ─────────────────────────────────────────────────────────────────────────────

interface CapabilitiesSectionProps {
  lenisRef: MutableRefObject<Lenis | null>;
  capProgrammaticScrollRef: MutableRefObject<boolean>;
}

export default function CapabilitiesSection({ lenisRef, capProgrammaticScrollRef }: CapabilitiesSectionProps) {
  const capabilitiesRef = useRef<HTMLElement>(null);
  const capScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const [activeCapability, setActiveCapability] = useState(0);
  const [showCapabilityInterlude, setShowCapabilityInterlude] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpenCap, setMobileOpenCap] = useState<number | null>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const skipToSignals = () => {
    if (typeof window === "undefined") return;
    const signalsEl = document.getElementById("studio");
    if (!signalsEl) return;

    capProgrammaticScrollRef.current = true;
    const release = () => { capProgrammaticScrollRef.current = false; };

    const targetY = signalsEl.getBoundingClientRect().top + window.scrollY;
    const distance = Math.abs(targetY - window.scrollY);
    const duration = Math.min(1.4, 0.7 + distance / 4500);

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, {
        duration,
        easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
        onComplete: release,
      });
      setTimeout(release, duration * 1000 + 300);
    } else {
      gsap.to(window, {
        duration,
        scrollTo: { y: targetY, autoKill: false },
        ease: "power3.inOut",
        onComplete: release,
      });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cap-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".cap-header", start: "top 85%" } }
      );

      const capSection = capabilitiesRef.current;
      const capMM = gsap.matchMedia();

      capMM.add("(min-width: 901px)", () => {
        if (!capSection) return;

        const slatEls = gsap.utils.toArray<HTMLElement>(".cap-slat");
        const slatCount = slatEls.length;
        if (slatCount === 0) return;

        const FLEX_COLLAPSED = 1;
        const FLEX_EXPANDED = 12;

        const slatsContainer = capSection.querySelector<HTMLElement>(".cap-slats");
        const computeExpandedWidth = () => {
          if (!slatsContainer) return;
          const containerW = slatsContainer.clientWidth;
          const gap = 12;
          const totalGap = gap * (slatCount - 1);
          const expandedW =
            ((containerW - totalGap) * FLEX_EXPANDED) /
            (FLEX_EXPANDED + FLEX_COLLAPSED * (slatCount - 1));
          slatEls.forEach((el) => {
            el.style.setProperty("--cap-expanded-w", `${Math.floor(expandedW)}px`);
          });
        };
        computeExpandedWidth();
        ScrollTrigger.addEventListener("refreshInit", computeExpandedWidth);

        slatEls.forEach((el, i) => {
          gsap.set(el, { flexGrow: i === 0 ? FLEX_EXPANDED : FLEX_COLLAPSED });
          const collapsed = el.querySelector<HTMLElement>(".cap-slat-collapsed");
          const expanded = el.querySelector<HTMLElement>(".cap-slat-expanded");
          if (collapsed) gsap.set(collapsed, { autoAlpha: i === 0 ? 0 : 1 });
          if (expanded) gsap.set(expanded, { autoAlpha: i === 0 ? 1 : 0, x: 0 });
        });

        const totalScroll = () => window.innerHeight * slatCount;

        const capST = ScrollTrigger.create({
          trigger: capSection,
          start: "top top",
          end: () => `+=${totalScroll()}`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          scrub: 0.5,
          snap: {
            snapTo: (value) => {
              if (capProgrammaticScrollRef.current) return value;
              return Math.round(value * (slatCount - 1)) / (slatCount - 1);
            },
            duration: { min: 0.2, max: 0.6 },
            delay: 0.12,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const rawPos = self.progress * (slatCount - 1);
            const distToNearestCapability = Math.abs(rawPos - Math.round(rawPos));
            const interludeVisible = distToNearestCapability > 0.42 && distToNearestCapability < 0.58;
            setShowCapabilityInterlude((prev) => prev === interludeVisible ? prev : interludeVisible);

            slatEls.forEach((el, i) => {
              const dist = Math.abs(i - rawPos);
              const weight = Math.max(0, 1 - dist);
              const eased = weight * weight * (3 - 2 * weight);
              const flexVal = FLEX_COLLAPSED + (FLEX_EXPANDED - FLEX_COLLAPSED) * eased;
              el.style.flexGrow = String(flexVal);

              const collapsedOpacity = Math.min(1, Math.max(0, 1 - eased * 2.6));
              const expandedOpacity  = Math.min(1, Math.max(0, (eased - 0.55) / 0.45));
              const direction = i < rawPos ? -1 : 1;
              const slide = (1 - expandedOpacity) * 32 * direction;

              const collapsed = el.querySelector<HTMLElement>(".cap-slat-collapsed");
              const expanded = el.querySelector<HTMLElement>(".cap-slat-expanded");
              if (collapsed) {
                collapsed.style.opacity = String(collapsedOpacity);
                collapsed.style.visibility = collapsedOpacity < 0.01 ? "hidden" : "visible";
              }
              if (expanded) {
                expanded.style.opacity = String(expandedOpacity);
                expanded.style.transform = `translateX(${slide}px)`;
                expanded.style.visibility = expandedOpacity < 0.01 ? "hidden" : "visible";
              }
            });

            const idx = Math.round(rawPos);
            setActiveCapability((prev) => (prev === idx ? prev : idx));
          },
        });

        capScrollTriggerRef.current = capST;

        gsap.to(".cap-progress-bar", {
          scaleX: 1, ease: "none",
          scrollTrigger: {
            trigger: capSection,
            start: "top top",
            end: () => `+=${totalScroll()}`,
            scrub: true,
          },
        });

        return () => {
          capScrollTriggerRef.current = null;
          ScrollTrigger.removeEventListener("refreshInit", computeExpandedWidth);
        };
      });
    });
    return () => ctx.revert();
  }, [capProgrammaticScrollRef]);

  return (
    <section
      id="services"
      ref={capabilitiesRef}
      className="cap-section"
      style={{ position: "relative", padding: "0", background: "#fafaf9" }}
    >
      {!isMobile && (
        <div style={{ height: "100vh", display: "flex", flexDirection: "column", padding: "96px 20px 40px", overflow: "hidden", position: "relative" }}>
          {/* Progress bar */}
          <div
            aria-hidden
            style={{
              position: "absolute", top: 64, left: 20, right: 20, height: 2,
              background: "rgba(0,0,0,0.06)", borderRadius: 1, overflow: "hidden", zIndex: 2,
            }}
          >
            <div
              className="cap-progress-bar"
              style={{ position: "absolute", inset: 0, background: "#0a0a0a", transformOrigin: "left center", transform: "scaleX(0)" }}
            />
          </div>

          {/* Header */}
          <div
            className="cap-header"
            style={{
              maxWidth: 1320, margin: "0 auto", width: "100%",
              display: "flex", justifyContent: "space-between",
              alignItems: "end", gap: 40, flexWrap: "wrap",
              marginBottom: 36, opacity: 0,
            }}
          >
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4.6vw, 68px)", fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 1, margin: 0, whiteSpace: "nowrap" }}>
                What we <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(0,0,0,0.55)" }}>do best.</span>
              </h2>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
              {/* Scroll counter */}
              <div
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  fontSize: 11, letterSpacing: "0.14em", color: "rgba(0,0,0,0.4)",
                  fontWeight: 600, textTransform: "uppercase",
                  transform: activeCapability >= 1 ? "translateX(0)" : "translateX(172px)",
                  transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)",
                }}
              >
                <span>Scroll to explore</span>
                <span style={{ width: 24, height: 1, background: "rgba(0,0,0,0.2)" }} />
                <span style={{ fontVariantNumeric: "tabular-nums", color: "#0a0a0a", fontSize: 13 }}>
                  {String(activeCapability + 1).padStart(2, "0")}
                  <span style={{ opacity: 0.35, margin: "0 4px", fontWeight: 400 }}>/</span>
                  {String(SERVICES.length).padStart(2, "0")}
                </span>
              </div>

              {/* Skip pill */}
              <button
                type="button"
                onClick={skipToSignals}
                className="cap-skip-btn"
                aria-label="Skip to market signals section"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  padding: "9px 16px", border: "1px solid rgba(0,0,0,0.15)",
                  borderRadius: 999, background: "rgba(255,255,255,0.6)",
                  backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                  fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500,
                  letterSpacing: "0.02em", color: "rgba(0,0,0,0.75)", cursor: "pointer",
                  opacity: activeCapability >= 1 ? 1 : 0,
                  transform: activeCapability >= 1 ? "translateY(0)" : "translateY(4px)",
                  pointerEvents: activeCapability >= 1 ? "auto" : "none",
                  transition: "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1), background 0.2s, border-color 0.2s, color 0.2s",
                }}
              >
                <span style={{ opacity: 0.55, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 10, fontWeight: 600 }}>Skip</span>
                <span style={{ width: 1, height: 12, background: "rgba(0,0,0,0.12)" }} />
                <span>Jump to signals</span>
                <svg aria-hidden width="12" height="12" viewBox="0 0 12 12" style={{ transition: "transform 0.25s ease" }} className="cap-skip-arrow">
                  <path d="M6 2.5v7M3 6.5 6 9.5 9 6.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Slats */}
          <div
            className="cap-slats"
            style={{ flex: 1, maxWidth: 1320, margin: "0 auto", width: "100%", display: "flex", gap: 12, alignItems: "stretch", minHeight: 0, position: "relative" }}
          >
            {/* Interlude overlay */}
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0, zIndex: 6,
                pointerEvents: "none", display: "flex",
                alignItems: "center", justifyContent: "center",
                opacity: showCapabilityInterlude ? 1 : 0,
                transition: "opacity 220ms ease",
              }}
            >
              <Image
                src="/images/product-land.png"
                alt=""
                width={1024}
                height={1024}
                draggable={false}
                style={{ width: "min(66vw, 900px)", maxWidth: "100%", height: "auto", opacity: 0.36, filter: "brightness(1.12) contrast(1.12)", userSelect: "none" }}
              />
            </div>

            {SERVICES.map((s, i) => {
              const isActive = activeCapability === i;
              return (
                <div
                  key={s.num}
                  className={`cap-slat ${isActive ? "is-active" : ""}`}
                  onClick={() => {
                    const st = capScrollTriggerRef.current;
                    if (!st) return;
                    const slatCount = SERVICES.length;
                    const progressTarget = i / (slatCount - 1);
                    const targetY = st.start + progressTarget * (st.end - st.start) + 1;
                    const distance = Math.abs(i - activeCapability);
                    const duration = Math.min(1.6, 0.75 + distance * 0.15);

                    capProgrammaticScrollRef.current = true;
                    const releaseGuard = () => { capProgrammaticScrollRef.current = false; };

                    if (lenisRef.current) {
                      lenisRef.current.scrollTo(targetY, {
                        duration,
                        easing: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
                        onComplete: releaseGuard,
                      });
                      setTimeout(releaseGuard, duration * 1000 + 300);
                    } else {
                      gsap.to(window, {
                        duration,
                        scrollTo: { y: targetY, autoKill: false },
                        ease: "power3.inOut",
                        onComplete: releaseGuard,
                      });
                    }
                  }}
                  style={{
                    position: "relative", flexGrow: i === 0 ? 12 : 1, flexShrink: 1, flexBasis: 0,
                    borderRadius: 20, overflow: "hidden", background: "#0a0a0a", color: "#fafaf9",
                    border: "1px solid rgba(255,255,255,0.05)",
                    cursor: isActive ? "default" : "pointer",
                    minWidth: 0, willChange: "flex-grow",
                  }}
                >
                  {/* Collapsed label */}
                  <div
                    className="cap-slat-collapsed"
                    style={{
                      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
                      alignItems: "center", padding: "22px 0",
                      pointerEvents: isActive ? "none" : "auto",
                    }}
                  >
                    <div
                      style={{
                        flex: 1, minHeight: 0, width: "100%", display: "flex",
                        alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          writingMode: "vertical-rl", transform: "rotate(180deg)",
                          fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 500,
                          letterSpacing: "0.28em", textTransform: "uppercase",
                          color: "rgba(250,250,249,0.82)", whiteSpace: "nowrap", lineHeight: 1,
                        }}
                      >
                        {s.title}
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      <span style={{ width: 20, height: 1, background: "rgba(250,250,249,0.18)" }} />
                      <span style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 500, color: "rgba(250,250,249,0.55)", fontVariantNumeric: "tabular-nums" }}>
                        {s.num}
                      </span>
                    </div>
                  </div>

                  {/* Expanded content */}
                  <div
                    className="cap-slat-expanded"
                    style={{
                      position: "absolute", top: 0, left: 0, bottom: 0,
                      width: "var(--cap-expanded-w, 1100px)",
                      padding: "40px 48px 44px",
                      display: "flex", flexDirection: "column",
                      pointerEvents: isActive ? "auto" : "none",
                    }}
                  >
                    {/* Dot grid background */}
                    <div
                      aria-hidden
                      style={{
                        position: "absolute", inset: 0,
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "26px 26px",
                        maskImage: "radial-gradient(ellipse 70% 50% at 85% 15%, black 0%, transparent 75%)",
                        WebkitMaskImage: "radial-gradient(ellipse 70% 50% at 85% 15%, black 0%, transparent 75%)",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Meta row */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 1, marginBottom: 24 }}>
                      <div style={{ display: "flex", alignItems: "center", minWidth: 0, paddingRight: 16 }}>
                        <span style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.62)" }}>
                          Capability {s.num} <span style={{ opacity: 0.4, margin: "0 6px" }}>/</span> {s.kicker}
                        </span>
                      </div>
                      <span aria-hidden style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 500, letterSpacing: "-0.04em", lineHeight: 1, color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.2)", fontVariantNumeric: "tabular-nums" }}>
                        {s.num}
                      </span>
                    </div>

                    {/* Body */}
                    <div
                      className="cap-slat-body"
                      style={{ flex: 1, position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 48, alignItems: "start", minHeight: 0 }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
                        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px, 4vw, 60px)", fontWeight: 500, letterSpacing: "-0.035em", lineHeight: 0.98, margin: "0 0 20px" }}>
                          {s.title.split(" ").map((word, wi, arr) => (
                            <span key={wi} style={{ display: "inline-block", marginRight: wi < arr.length - 1 ? "0.25em" : 0 }}>
                              {wi === arr.length - 1
                                ? <span style={{ fontStyle: "italic", fontWeight: 400, color: "rgba(255,255,255,0.62)" }}>{word}</span>
                                : word}
                            </span>
                          ))}
                        </h3>
                        <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.62)", lineHeight: 1.7, margin: "0 0 28px", maxWidth: 480 }}>{s.desc}</p>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
                          {s.tags.map((t) => (
                            <span key={t} style={{ padding: "6px 12px", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 999, fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.72)", letterSpacing: "0.02em" }}>
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ position: "relative", minHeight: 0, overflow: "hidden" }}>
                        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.62)", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ width: 16, height: 1, background: "rgba(255,255,255,0.3)", display: "inline-block" }} />
                          What we deliver
                        </div>
                        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                          {s.deliverables.map((d, di) => (
                            <li key={di} style={{ padding: "12px 0", borderBottom: di < s.deliverables.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none", display: "flex", alignItems: "center", gap: 14, fontSize: 14, color: "#fafaf9", fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "-0.005em" }}>
                              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", fontVariantNumeric: "tabular-nums", fontWeight: 500, minWidth: 20 }}>0{di + 1}</span>
                              <span style={{ flex: 1 }}>{d}</span>
                              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>→</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer row */}
                    <div style={{ marginTop: 24, paddingTop: 18, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, color: "rgba(255,255,255,0.55)", position: "relative", zIndex: 1 }}>
                      <span>{s.glyph} &nbsp; {s.kicker}</span>
                      <span style={{ fontVariantNumeric: "tabular-nums" }}>{s.num} / {String(SERVICES.length).padStart(2, "0")}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isMobile && (
        <div className="cap-mobile">
          <div className="cap-mobile__header">
            <div className="cap-mobile__eyebrow">What we do best</div>
            <h2 className="cap-mobile__title">
              Three service pillars.
              <br />
              <span className="cap-mobile__title-italic">One senior team.</span>
            </h2>
            <p className="cap-mobile__lead">
              Tap any capability to see what it includes. Or jump straight ahead to signals.
            </p>
            <button type="button" onClick={skipToSignals} className="cap-mobile__skip">
              <span style={{ opacity: 0.55, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 10, fontWeight: 600 }}>Skip</span>
              <span style={{ width: 1, height: 10, background: "rgba(0,0,0,0.12)" }} />
              <span>Jump to signals</span>
              <svg aria-hidden width="11" height="11" viewBox="0 0 12 12">
                <path d="M6 2.5v7M3 6.5 6 9.5 9 6.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <ul className="cap-mobile__list" role="list">
            {SERVICES.map((s, i) => {
              const isOpen = mobileOpenCap === i;
              return (
                <li key={s.num} className="cap-mobile__item" data-open={isOpen ? "true" : "false"}>
                  <button
                    type="button"
                    className="cap-mobile__trigger"
                    aria-expanded={isOpen}
                    onClick={() => setMobileOpenCap(isOpen ? null : i)}
                  >
                    <span className="cap-mobile__num">{s.num}</span>
                    <span className="cap-mobile__name">{s.title}</span>
                    <span className="cap-mobile__chev" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <path d="M3 5.5 7 9.5 11 5.5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div className="cap-mobile__panel">
                    <div className="cap-mobile__panel-inner">
                      <div className="cap-mobile__kicker">
                        Capability {s.num}{" "}
                        <span style={{ opacity: 0.5 }}>·</span>{" "}
                        {s.kicker}
                      </div>
                      <p className="cap-mobile__desc">{s.desc}</p>
                      <div className="cap-mobile__deliver-label">What we deliver</div>
                      <ul className="cap-mobile__deliver" role="list">
                        {s.deliverables.map((d, di) => (
                          <li key={di}>{d}</li>
                        ))}
                      </ul>
                      <div className="cap-mobile__tags">
                        {s.tags.map((t) => <span key={t}>{t}</span>)}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}
