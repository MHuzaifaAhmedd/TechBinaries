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
    <span aria-live="polite" className="hero-verb-slot">
      <span className="hero-verb-mask">
        {HERO_VERBS.map((v, i) => (
          <span
            key={v}
            className="hero-verb-item"
            style={{
              transform: `translateY(${(i - rotatingVerb) * 100}%)`,
            }}
          >
            {v}
          </span>
        ))}
      </span>
    </span>
  );
}
