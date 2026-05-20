"use client";

import { SLAT_FLEX_COLLAPSED, SLAT_FLEX_EXPANDED } from "./constants";
import type { HomeCapabilityService } from "./types";
import { CapabilitySlatCollapsedFace } from "./CapabilitySlatCollapsedFace";
import { CapabilitySlatExpandedPanel } from "./CapabilitySlatExpandedPanel";

export function CapabilityDesktopSlat({
  service,
  isActive,
  isFirst,
  capabilityCount,
  onActivate,
}: {
  service: HomeCapabilityService;
  isActive: boolean;
  isFirst: boolean;
  capabilityCount: number;
  onActivate: () => void;
}) {
  return (
    <div
      className={`cap-slat ${isActive ? "is-active" : ""}`}
      onClick={onActivate}
      style={{
        position: "relative",
        flexGrow: isFirst ? SLAT_FLEX_EXPANDED : SLAT_FLEX_COLLAPSED,
        flexShrink: 1,
        flexBasis: 0,
        borderRadius: 20,
        overflow: "hidden",
        background: "#0a0a0a",
        color: "#fafaf9",
        border: "1px solid rgba(255,255,255,0.05)",
        cursor: isActive ? "default" : "pointer",
        minWidth: 0,
        willChange: "flex-grow",
      }}
    >
      <CapabilitySlatCollapsedFace
        service={service}
        pointerEvents={isActive ? "none" : "auto"}
      />
      <CapabilitySlatExpandedPanel
        service={service}
        capabilityCount={capabilityCount}
        pointerEvents={isActive ? "auto" : "none"}
      />
    </div>
  );
}
