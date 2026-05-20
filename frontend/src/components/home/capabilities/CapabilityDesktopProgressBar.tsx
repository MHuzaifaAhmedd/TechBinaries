"use client";

export function CapabilityDesktopProgressBar() {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        top: 64,
        left: 20,
        right: 20,
        height: 2,
        background: "rgba(0,0,0,0.06)",
        borderRadius: 1,
        overflow: "hidden",
        zIndex: 2,
      }}
    >
      <div
        className="cap-progress-bar"
        style={{
          position: "absolute",
          inset: 0,
          background: "#0a0a0a",
          transformOrigin: "left center",
          transform: "scaleX(0)",
        }}
      />
    </div>
  );
}
