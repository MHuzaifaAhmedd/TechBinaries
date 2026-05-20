"use client";

import { SLAT_GAP_PX } from "./constants";
import type { HomeCapabilityService } from "./types";
import { CapabilityDesktopHeading } from "./CapabilityDesktopHeading";
import { CapabilityDesktopInterlude } from "./CapabilityDesktopInterlude";
import { CapabilityDesktopProgressBar } from "./CapabilityDesktopProgressBar";
import { CapabilityDesktopSlat } from "./CapabilityDesktopSlat";

export function CapabilityDesktopView({
  services,
  activeCapabilityIndex,
  showCapabilityInterlude,
  onJumpToSignals,
  onSelectCapability,
}: {
  services: readonly HomeCapabilityService[];
  activeCapabilityIndex: number;
  showCapabilityInterlude: boolean;
  onJumpToSignals: () => void;
  onSelectCapability: (index: number) => void;
}) {
  const capabilityCount = services.length;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        padding: "96px 20px 40px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <CapabilityDesktopProgressBar />

      <CapabilityDesktopHeading
        activeCapabilityIndex={activeCapabilityIndex}
        capabilityCount={capabilityCount}
        onJumpToSignals={onJumpToSignals}
      />

      <div
        className="cap-slats"
        style={{
          flex: 1,
          maxWidth: 1320,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          gap: SLAT_GAP_PX,
          alignItems: "stretch",
          minHeight: 0,
          position: "relative",
        }}
      >
        <CapabilityDesktopInterlude visible={showCapabilityInterlude} />

        {services.map((service, index) => (
          <CapabilityDesktopSlat
            key={service.num}
            service={service}
            isActive={activeCapabilityIndex === index}
            isFirst={index === 0}
            capabilityCount={capabilityCount}
            onActivate={() => onSelectCapability(index)}
          />
        ))}
      </div>
    </div>
  );
}
