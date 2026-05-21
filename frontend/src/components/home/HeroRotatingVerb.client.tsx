"use client";

import { useEffect, useState } from "react";
import { HERO_VERBS } from "@/data/home";

/** Small client island — verb rotation only; headline chars stay server-rendered. */
export function HeroRotatingVerb() {
  const [rotatingVerb, setRotatingVerb] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRotatingVerb((v) => (v + 1) % HERO_VERBS.length);
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <span
      aria-live="polite"
      className="hero-verb-slot"
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "visible",
        verticalAlign: "bottom",
        paddingRight: "0.12em",
      }}
    >
      <span className="hero-verb-mask" style={{ display: "inline-block", willChange: "transform" }}>
        {HERO_VERBS.map((v, i) => (
          <span
            key={v}
            style={{
              display: "block",
              fontStyle: "italic",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              whiteSpace: "nowrap",
              transform: `translateY(${(i - rotatingVerb) * 100}%)`,
              transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
              position: i === 0 ? "relative" : "absolute",
              top: 0,
              left: 0,
            }}
          >
            {v}
          </span>
        ))}
      </span>
    </span>
  );
}
