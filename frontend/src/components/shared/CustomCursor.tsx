"use client";

import { useEffect, useRef } from "react";

// ── CustomCursor ──────────────────────────────────────────────────────────────
// Desktop-only custom cursor: a small dot that tracks the mouse instantly,
// plus a lagged ring that scales up when hovering interactive elements.
// Skips itself on touch devices and when prefers-reduced-motion is set.
// ─────────────────────────────────────────────────────────────────────────────

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    if (
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      return;
    }

    dot.style.display = "block";
    ring.style.display = "block";

    let mx = 0, my = 0, rx = 0, ry = 0, rafId = 0;
    let isHoveringInteractive = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx - 2}px, ${my - 2}px)`;
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.22;
      ry += (my - ry) * 0.22;
      const scale = isHoveringInteractive ? 1.35 : 1;
      ring.style.transform = `translate(${rx - 9}px, ${ry - 9}px) scale(${scale})`;
      rafId = requestAnimationFrame(animateRing);
    };
    animateRing();

    window.addEventListener("mousemove", onMove);

    const onEnter = () => {
      isHoveringInteractive = true;
      dot.style.background = "#ffffff";
      ring.style.borderColor = "rgba(255,255,255,0.98)";
    };
    const onLeave = () => {
      isHoveringInteractive = false;
      dot.style.background = "#ffffff";
      ring.style.borderColor = "rgba(255,255,255,0.85)";
    };

    const interactive = document.querySelectorAll("a, button, [data-cursor]");
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        style={{
          display: "none",
          position: "fixed", top: 0, left: 0, width: 4, height: 4,
          background: "#ffffff", borderRadius: "50%", pointerEvents: "none",
          zIndex: 9999, willChange: "transform",
          mixBlendMode: "difference",
        }}
      />
      <div
        ref={ringRef}
        style={{
          display: "none",
          position: "fixed", top: 0, left: 0, width: 18, height: 18,
          border: "1px solid rgba(255,255,255,0.85)", borderRadius: "50%",
          pointerEvents: "none", zIndex: 9998, willChange: "transform",
          transition: "border-color 0.2s ease",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.25)",
        }}
      />
    </>
  );
}
