"use client";

import type { CSSProperties } from "react";
import { JumpToSignalsChevron } from "./JumpToSignalsChevron";

const skipKickerStyle: CSSProperties = {
  opacity: 0.55,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontSize: 10,
  fontWeight: 600,
};

const dividerVStyle = { width: 1, height: 12, background: "rgba(0,0,0,0.12)" };

export function CapabilityDesktopJumpButton({
  visible,
  onClick,
}: {
  visible: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="cap-skip-btn"
      aria-label="Skip to market signals section"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "9px 16px",
        border: "1px solid rgba(0,0,0,0.15)",
        borderRadius: 999,
        background: "rgba(255,255,255,0.6)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        fontFamily: "var(--font-body)",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: "0.02em",
        color: "rgba(0,0,0,0.75)",
        cursor: "pointer",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(4px)",
        pointerEvents: visible ? "auto" : "none",
        transition:
          "opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1), background 0.2s, border-color 0.2s, color 0.2s",
      }}
    >
      <span style={skipKickerStyle}>Skip</span>
      <span style={dividerVStyle} />
      <span>Jump to signals</span>
      <JumpToSignalsChevron className="cap-skip-arrow" />
    </button>
  );
}
