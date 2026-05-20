"use client";

import Image from "next/image";

export function CapabilityDesktopInterlude({ visible }: { visible: boolean }) {
  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 6,
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transition: "opacity 220ms ease",
      }}
    >
      <Image
        src="/images/product-land.webp"
        alt=""
        width={1024}
        height={1024}
        sizes="(max-width: 768px) 100vw, 50vw"
        draggable={false}
        style={{
          width: "min(66vw, 900px)",
          maxWidth: "100%",
          height: "auto",
          opacity: 0.36,
          filter: "brightness(1.12) contrast(1.12)",
          userSelect: "none",
        }}
      />
    </div>
  );
}
