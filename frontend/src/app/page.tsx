"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CustomCursor from "@/components/shared/CustomCursor";
import GrainOverlay from "@/components/shared/GrainOverlay";
import HeroSection from "@/components/home/HeroSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import GrowthBinarySection from "@/components/home/GrowthBinarySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";

gsap.registerPlugin(ScrollTrigger);

// ── HomePage ──────────────────────────────────────────────────────────────────
// Thin orchestrator: boots Lenis smooth-scroll, wires GSAP ScrollTrigger,
// handles browser back/forward restoration, then delegates every visible
// section to its own component.
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const lenisRef = useRef<Lenis | null>(null);
  const capProgrammaticScrollRef = useRef(false);

  // ── Lenis smooth-scroll ──
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // ── Shared GSAP scroll animations ──
  // Stat count-ups and section tag fade-ins live here because they reference
  // CSS class names shared across multiple sections.
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Count-up numbers
      gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
        const raw = el.dataset.val || "";
        const m = raw.match(/^([\d.]+)(.*)$/);
        if (!m) return;
        const target = parseFloat(m[1]);
        const suffix = m[2];
        const isInt = Number.isInteger(target);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: target, duration: 1.6, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = (isInt ? Math.round(obj.v).toString() : obj.v.toFixed(1)) + suffix;
          },
        });
      });

      // Section header fade-in
      gsap.utils.toArray<HTMLElement>(".sh").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 38 },
          { opacity: 1, y: 0, duration: 0.95, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }
        );
      });

      // Tag fade-in
      gsap.utils.toArray<HTMLElement>(".tag").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 92%" } }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  // ── Scroll restoration for browser back/forward ──
  // Animation-heavy pages with pinned sections can end up in a broken state
  // when restored from the browser cache. Treat any page-show as a fresh load.
  useEffect(() => {
    if (typeof window === "undefined") return;

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    const resetView = () => {
      capProgrammaticScrollRef.current = false;
      const lenis = lenisRef.current;
      lenis?.stop();
      window.scrollTo(0, 0);
      lenis?.scrollTo(0, { immediate: true, force: true });
      lenis?.resize();
      requestAnimationFrame(() => {
        ScrollTrigger.refresh(true);
        ScrollTrigger.update();
        lenis?.start();
      });
    };

    resetView();

    const handlePageShow = () => resetView();
    const handlePageHide = () => lenisRef.current?.stop();

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("pagehide", handlePageHide);
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  // ── Refresh ScrollTrigger once fonts have loaded ──
  useEffect(() => {
    const fonts = "fonts" in document ? document.fonts : undefined;
    if (!fonts?.ready) return;
    fonts.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <>
      <CustomCursor />
      <GrainOverlay />

      <div
        style={{
          background: "#fafaf9",
          color: "#0a0a0a",
          fontFamily: "var(--font-body)",
          overflowX: "hidden",
        }}
      >
        <SiteHeader />

        <HeroSection lenisRef={lenisRef} />

        <CapabilitiesSection
          lenisRef={lenisRef}
          capProgrammaticScrollRef={capProgrammaticScrollRef}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <GrowthBinarySection />
        </div>

        <TestimonialsSection />

        <CTASection />

        <SiteFooter />
      </div>

      {/* ── Global styles ── */}
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { cursor: auto !important; background: #fafaf9; -webkit-font-smoothing: antialiased; }
        ::selection { background: #0a0a0a; color: #fafaf9; }

        @keyframes pulse-ring {
          0%   { box-shadow: 0 0 0 0 rgba(22,163,74,0.45); }
          70%  { box-shadow: 0 0 0 8px rgba(22,163,74,0); }
          100% { box-shadow: 0 0 0 0 rgba(22,163,74,0); }
        }
        .pulse-green { animation: pulse-ring 2s infinite; }

        @keyframes caret-blink {
          0%, 50%   { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .caret-blink { animation: caret-blink 1.1s step-end infinite; }

        @keyframes scroll-dot-bounce {
          0%   { transform: translateY(0); opacity: 0; }
          30%  { opacity: 1; }
          80%  { transform: translateY(14px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
        .scroll-dot { animation: scroll-dot-bounce 2.2s cubic-bezier(0.65,0,0.35,1) infinite; }

        @keyframes building-rotate {
          0%,  2%  { opacity: 0; transform: translateY(8px); }
          4%, 24%  { opacity: 1; transform: translateY(0); }
          26%, 100% { opacity: 0; transform: translateY(-8px); }
        }

        /* Hero CTA hover */
        .hero-cta-primary::before {
          content: "";
          position: absolute; inset: 0;
          background: linear-gradient(90deg, #262626, #0a0a0a);
          transform: translateX(-101%);
          transition: transform 0.5s cubic-bezier(0.76,0,0.24,1);
          z-index: 1;
        }
        .hero-cta-primary:hover::before { transform: translateX(0); }
        .hero-cta-primary:hover .hero-cta-arrow { transform: translateX(2px); }
        .hero-cta-arrow { transition: transform 0.25s ease; }

        .hero-terminal { transition: filter 0.4s; }
        .hero-terminal:hover { filter: drop-shadow(0 10px 30px rgba(0,0,0,0.15)); }

        /* Capabilities */
        .cap-slat { will-change: flex-grow; }
        .cap-slat:not(.is-active):hover .cap-slat-collapsed > div[style*="writing-mode"] {
          color: #fafaf9 !important;
          transition: color 0.3s ease;
        }
        .cap-slat:not(.is-active):hover { background: #161616 !important; transition: background 0.3s ease; }
        .cap-slat-expanded ul li { transition: padding-left 0.3s ease; cursor: default; }
        .cap-slat-expanded ul li:hover { padding-left: 8px; }
        .cap-slat-expanded ul li:hover > span:last-child { transform: translateX(4px); transition: transform 0.25s ease; color: rgba(255,255,255,0.8) !important; }

        .ghost-btn:hover { border-color: rgba(0,0,0,0.35) !important; color: #0a0a0a !important; background: rgba(255,255,255,0.9) !important; }
        .ghost-btn-dark:hover { border-color: rgba(255,255,255,0.45) !important; background: rgba(255,255,255,0.05) !important; }

        /* Skip pill hover */
        .cap-skip-btn:hover { background: #0a0a0a !important; border-color: #0a0a0a !important; color: #fafaf9 !important; }
        .cap-skip-btn:hover .cap-skip-arrow { transform: translateY(2px); }

        /* Mobile capabilities accordion */
        .cap-mobile { padding: 80px 20px 80px; max-width: 720px; margin: 0 auto; }
        .cap-mobile__eyebrow { font-family: var(--font-body); font-size: 11px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(10,10,10,0.45); margin-bottom: 14px; }
        .cap-mobile__title { font-family: var(--font-display); font-size: clamp(32px,8vw,44px); font-weight: 500; letter-spacing: -0.032em; line-height: 1.02; margin: 0 0 16px; color: #0a0a0a; }
        .cap-mobile__title-italic { font-style: italic; font-weight: 400; color: rgba(10,10,10,0.55); }
        .cap-mobile__lead { font-family: var(--font-body); font-size: 15px; line-height: 1.6; color: rgba(10,10,10,0.6); margin: 0 0 22px; max-width: 440px; }
        .cap-mobile__skip { display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border: 1px solid rgba(10,10,10,0.15); border-radius: 999px; background: #fff; font-family: var(--font-body); font-size: 12.5px; font-weight: 500; color: rgba(10,10,10,0.78); cursor: pointer; margin-bottom: 40px; -webkit-tap-highlight-color: transparent; }
        .cap-mobile__skip:active { background: #0a0a0a; color: #fafaf9; border-color: #0a0a0a; }
        .cap-mobile__list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .cap-mobile__item { background: #0a0a0a; color: #fafaf9; border-radius: 16px; overflow: hidden; transition: background 0.3s ease; }
        .cap-mobile__item[data-open="true"] { background: #111; }
        .cap-mobile__trigger { width: 100%; display: grid; grid-template-columns: auto auto 1fr auto; align-items: center; gap: 14px; padding: 18px 18px; border: 0; background: transparent; color: inherit; cursor: pointer; text-align: left; -webkit-tap-highlight-color: transparent; font-family: var(--font-display); }
        .cap-mobile__dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .cap-mobile__num { font-family: var(--font-display); font-size: 12px; font-weight: 500; color: rgba(250,250,249,0.4); font-variant-numeric: tabular-nums; letter-spacing: 0.04em; }
        .cap-mobile__name { font-family: var(--font-display); font-size: 16px; font-weight: 500; letter-spacing: -0.015em; color: #fafaf9; line-height: 1.2; }
        .cap-mobile__chev { width: 28px; height: 28px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid rgba(250,250,249,0.18); border-radius: 50%; color: #fafaf9; transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.2s, border-color 0.2s; flex-shrink: 0; }
        .cap-mobile__item[data-open="true"] .cap-mobile__chev { transform: rotate(180deg); background: #fafaf9; color: #0a0a0a; border-color: #fafaf9; }
        .cap-mobile__panel { display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.4s cubic-bezier(0.22,1,0.36,1); }
        .cap-mobile__item[data-open="true"] .cap-mobile__panel { grid-template-rows: 1fr; }
        .cap-mobile__panel-inner { overflow: hidden; min-height: 0; }
        .cap-mobile__item[data-open="true"] .cap-mobile__panel-inner { padding: 4px 18px 22px; }
        .cap-mobile__kicker { font-family: var(--font-body); font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(250,250,249,0.5); margin-bottom: 12px; padding-top: 4px; }
        .cap-mobile__desc { font-family: var(--font-body); font-size: 14.5px; line-height: 1.6; color: rgba(250,250,249,0.72); margin: 0 0 22px; }
        .cap-mobile__deliver-label { font-family: var(--font-body); font-size: 10.5px; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(250,250,249,0.5); margin-bottom: 10px; }
        .cap-mobile__deliver { list-style: none; padding: 0; margin: 0 0 20px; }
        .cap-mobile__deliver li { display: flex; align-items: flex-start; gap: 12px; padding: 10px 0; border-bottom: 1px solid rgba(250,250,249,0.08); font-family: var(--font-display); font-size: 13.5px; color: #fafaf9; line-height: 1.4; }
        .cap-mobile__deliver li:last-child { border-bottom: none; }
        .cap-mobile__deliver-num { font-size: 10px; color: rgba(250,250,249,0.4); font-variant-numeric: tabular-nums; font-weight: 500; min-width: 18px; padding-top: 2px; }
        .cap-mobile__tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .cap-mobile__tags span { padding: 5px 10px; border: 1px solid rgba(250,250,249,0.14); border-radius: 999px; font-family: var(--font-body); font-size: 10.5px; font-weight: 500; color: rgba(250,250,249,0.72); letter-spacing: 0.02em; }

        /* Growth binary section */
        .growth-binary-grid { display: grid; grid-template-columns: minmax(0,1.08fr) minmax(380px,0.92fr); gap: clamp(42px,6vw,86px); align-items: center; }
        .growth-orbit-bg::before, .growth-orbit-bg::after { content: ""; position: absolute; border-radius: 50%; border: 1px solid rgba(10,10,10,0.06); inset: 12%; }
        .growth-orbit-bg::after { inset: 28%; border-color: rgba(15,23,42,0.08); }
        .growth-live-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; background: #334155; box-shadow: 0 0 0 0 rgba(51,65,85,0.35); animation: growth-pulse 1.8s ease-out infinite; }
        .growth-stat-card { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s, background 0.35s; }
        .growth-stat-card:hover { transform: translateY(-6px); border-color: rgba(15,23,42,0.22) !important; background: #f8fafc !important; }
        .growth-engine-card { position: relative; min-height: 620px; border: 1px solid rgba(10,10,10,0.1); border-radius: 34px; background: radial-gradient(circle at 50% 20%, rgba(255,255,255,0.95), transparent 38%), linear-gradient(145deg, rgba(255,255,255,0.94), rgba(245,245,244,0.76)), #fff; overflow: hidden; box-shadow: 0 38px 90px -64px rgba(15,23,42,0.55); backdrop-filter: blur(22px); }
        .growth-engine-meta { position: absolute; top: 24px; left: 24px; right: 24px; z-index: 4; display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(10,10,10,0.4); }
        .growth-engine-meta span { display: inline-flex; align-items: center; gap: 8px; }
        .growth-logo-system { position: absolute; inset: 56px 34px 34px; display: grid; place-items: center; }
        .growth-logo-system::before { content: ""; position: absolute; width: min(330px,76%); aspect-ratio: 1; border-radius: 50%; background: radial-gradient(circle, rgba(15,23,42,0.075), transparent 64%); filter: blur(4px); }
        .growth-binary-mark { position: relative; z-index: 2; display: flex; align-items: center; gap: clamp(18px,3vw,34px); font-family: var(--font-display); font-size: clamp(108px,12vw,176px); font-weight: 500; letter-spacing: -0.11em; line-height: 0.8; color: #0a0a0a; text-shadow: 0 22px 58px rgba(15,23,42,0.15); }
        .growth-binary-mark span:first-child { animation: growth-one 4.8s cubic-bezier(0.76,0,0.24,1) infinite; }
        .growth-binary-mark span:last-child { color: rgba(10,10,10,0.18); -webkit-text-stroke: 1px rgba(10,10,10,0.22); animation: growth-zero 4.8s cubic-bezier(0.76,0,0.24,1) infinite; }
        .growth-orbit { position: absolute; border-radius: 50%; border: 1px solid rgba(10,10,10,0.12); }
        .growth-orbit::after { content: ""; position: absolute; top: -5px; left: 50%; width: 10px; height: 10px; border-radius: 50%; background: #334155; box-shadow: 0 0 18px rgba(15,23,42,0.28); display: none; }
        .growth-orbit-one { width: min(310px,76%); aspect-ratio: 1; animation: growth-spin 12s linear infinite; }
        .growth-orbit-two { width: min(410px,96%); aspect-ratio: 1; border-color: rgba(100,116,139,0.18); animation: growth-spin 18s linear infinite reverse; }
        .growth-orbit-two::after { background: #64748b; box-shadow: 0 0 18px rgba(100,116,139,0.28); }
        .growth-signal-line { position: absolute; left: 10%; right: 10%; height: 1px; background: linear-gradient(90deg, transparent, rgba(15,23,42,0.42), transparent); opacity: 0.55; transform-origin: center; }
        .growth-signal-line-one { top: 38%; animation: growth-scan 3.8s ease-in-out infinite; }
        .growth-signal-line-two { top: 58%; background: linear-gradient(90deg, transparent, rgba(100,116,139,0.38), transparent); animation: growth-scan 4.8s ease-in-out infinite reverse; }
        .growth-orbit-message { position: absolute; top: 50%; left: 50%; z-index: 5; display: inline-flex; align-items: center; gap: 10px; width: min(220px,38vw); transform-origin: 0 0; pointer-events: none; }
        .growth-orbit-dot { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border: 1px solid rgba(10,10,10,0.12); border-radius: 50%; background: #0a0a0a; color: #fafaf9; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.02em; box-shadow: 0 18px 34px -20px rgba(15,23,42,0.78); flex: 0 0 auto; }
        .growth-orbit-copy { display: grid; gap: 3px; max-width: 160px; border: 1px solid rgba(10,10,10,0.09); border-radius: 16px; background: rgba(255,255,255,0.82); padding: 10px 12px; box-shadow: 0 24px 48px -36px rgba(15,23,42,0.62); backdrop-filter: blur(16px); }
        .growth-orbit-copy strong { font-family: var(--font-display); font-size: 15px; font-weight: 500; letter-spacing: -0.02em; color: #0a0a0a; line-height: 1.1; }
        .growth-orbit-copy span { font-size: 11.5px; line-height: 1.35; color: rgba(10,10,10,0.56); }
        .growth-orbit-message-one { animation: growth-orbit-message-one 15s linear infinite; }
        .growth-orbit-message-two { animation: growth-orbit-message-two 15s linear infinite; }
        .growth-orbit-message-three { animation: growth-orbit-message-three 15s linear infinite; }

        @keyframes growth-pulse { 0% { box-shadow: 0 0 0 0 rgba(51,65,85,0.32); } 70% { box-shadow: 0 0 0 10px rgba(51,65,85,0); } 100% { box-shadow: 0 0 0 0 rgba(51,65,85,0); } }
        @keyframes growth-spin { to { transform: rotate(360deg); } }
        @keyframes growth-one { 0%, 100% { transform: translateX(0); color: #0a0a0a; } 45%, 55% { transform: translateX(10px); color: #334155; } }
        @keyframes growth-zero { 0%, 100% { transform: translateX(0) scale(1); opacity: 0.72; } 45%, 55% { transform: translateX(-10px) scale(1.04); opacity: 1; } }
        @keyframes growth-scan { 0%, 100% { transform: translateY(-24px) scaleX(0.54); opacity: 0.2; } 50% { transform: translateY(24px) scaleX(1); opacity: 0.68; } }
        @keyframes growth-orbit-message-one { 0% { transform: rotate(-24deg) translateX(clamp(118px,13vw,156px)) rotate(24deg) translate(-50%,-50%); } 50% { transform: rotate(156deg) translateX(clamp(118px,13vw,156px)) rotate(-156deg) translate(-50%,-50%); } 100% { transform: rotate(336deg) translateX(clamp(118px,13vw,156px)) rotate(-336deg) translate(-50%,-50%); } }
        @keyframes growth-orbit-message-two { 0% { transform: rotate(104deg) translateX(clamp(96px,11vw,132px)) rotate(-104deg) translate(-50%,-50%); } 50% { transform: rotate(284deg) translateX(clamp(96px,11vw,132px)) rotate(-284deg) translate(-50%,-50%); } 100% { transform: rotate(464deg) translateX(clamp(96px,11vw,132px)) rotate(-464deg) translate(-50%,-50%); } }
        @keyframes growth-orbit-message-three { 0% { transform: rotate(222deg) translateX(clamp(118px,13vw,156px)) rotate(-222deg) translate(-50%,-50%); } 50% { transform: rotate(402deg) translateX(clamp(118px,13vw,156px)) rotate(-402deg) translate(-50%,-50%); } 100% { transform: rotate(582deg) translateX(clamp(118px,13vw,156px)) rotate(-582deg) translate(-50%,-50%); } }

        /* Responsive */
        @media (max-width: 1100px) {
          .growth-binary-grid { grid-template-columns: 1fr !important; }
          .growth-engine-card { min-height: 640px; }
          .hero-main-grid { grid-template-columns: 1fr !important; gap: 56px !important; }
        }
        @media (max-width: 768px) {
          html, body { cursor: auto !important; }
          section, footer { padding-left: 14px !important; padding-right: 14px !important; }
          .growth-binary-section { padding-top: 92px !important; padding-bottom: 92px !important; }
          .growth-binary-stats { grid-template-columns: 1fr !important; }
          .growth-engine-card { min-height: 560px; border-radius: 24px !important; }
          .growth-engine-meta { top: 20px !important; left: 18px !important; right: 18px !important; }
          .growth-logo-system { inset: 58px 16px 24px !important; }
          .growth-logo-system::before { width: min(300px, 68%) !important; }
          .growth-orbit-one { width: min(280px, 68%) !important; }
          .growth-orbit-two { width: min(350px, 84%) !important; }
          .growth-binary-mark { font-size: clamp(86px,28vw,128px) !important; }
          .growth-orbit-message { width: min(210px,58vw) !important; gap: 8px !important; }
          .growth-orbit-dot { width: 34px !important; height: 34px !important; font-size: 10.5px !important; }
          .growth-orbit-copy { max-width: 150px !important; padding: 8px 10px !important; }
          .growth-orbit-copy strong { font-size: 13px !important; }
          .growth-orbit-copy span { font-size: 10.5px !important; }
          @keyframes growth-orbit-message-one { 0% { transform: rotate(-24deg) translateX(clamp(92px,10vw,128px)) rotate(24deg) translate(-50%,-50%); } 50% { transform: rotate(156deg) translateX(clamp(92px,10vw,128px)) rotate(-156deg) translate(-50%,-50%); } 100% { transform: rotate(336deg) translateX(clamp(92px,10vw,128px)) rotate(-336deg) translate(-50%,-50%); } }
          @keyframes growth-orbit-message-two { 0% { transform: rotate(104deg) translateX(clamp(76px,8.5vw,108px)) rotate(-104deg) translate(-50%,-50%); } 50% { transform: rotate(284deg) translateX(clamp(76px,8.5vw,108px)) rotate(-284deg) translate(-50%,-50%); } 100% { transform: rotate(464deg) translateX(clamp(76px,8.5vw,108px)) rotate(-464deg) translate(-50%,-50%); } }
          @keyframes growth-orbit-message-three { 0% { transform: rotate(222deg) translateX(clamp(92px,10vw,128px)) rotate(-222deg) translate(-50%,-50%); } 50% { transform: rotate(402deg) translateX(clamp(92px,10vw,128px)) rotate(-402deg) translate(-50%,-50%); } 100% { transform: rotate(582deg) translateX(clamp(92px,10vw,128px)) rotate(-582deg) translate(-50%,-50%); } }
          .hero-line-3 { white-space: normal !important; }
          #cta-inner { padding: 64px 26px !important; border-radius: 18px !important; }
          .hero-cta { justify-content: flex-start !important; }
          .hero-stats-grid { grid-template-columns: repeat(2,1fr) !important; row-gap: 24px; }
          .hero-stats-grid > div { border-right: none !important; padding-left: 0 !important; }
        }
        @media (max-width: 480px) {
          .cap-mobile { padding: 64px 16px 64px; }
          .cap-mobile__trigger { padding: 16px 14px; gap: 12px; }
          .cap-mobile__item[data-open="true"] .cap-mobile__panel-inner { padding: 4px 14px 20px; }
          .cap-mobile__name { font-size: 15px; }
          .cap-mobile__skip { font-size: 12px; padding: 9px 14px; }
        }
      `}</style>
    </>
  );
}
