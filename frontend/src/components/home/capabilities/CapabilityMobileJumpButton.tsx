"use client";

import { JumpToSignalsChevron } from "./JumpToSignalsChevron";

import type { CSSProperties } from "react";

const skipKickerStyle: CSSProperties = {
  opacity: 0.55,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  fontSize: 10,
  fontWeight: 600,
};

export function CapabilityMobileJumpButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="cap-mobile__skip">
      <span style={skipKickerStyle}>Skip</span>
      <span style={{ width: 1, height: 10, background: "rgba(0,0,0,0.12)" }} />
      <span>Jump to signals</span>
      <JumpToSignalsChevron size={11} />
    </button>
  );
}
