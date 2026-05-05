import type { RefObject } from "react";
import Image from "next/image";
import { HERO } from "../_lib/careers-data";

const TICKER_LOGOS = [
  "kfc",
  "nike",
  "apple",
  "google",
  "amazon",
  "coca-cola",
  "tesla",
  "microsoft",
];

function BrandLogo({ brand }: { brand: (typeof TICKER_LOGOS)[number] }) {
  if (brand === "kfc") {
    return (
      <svg viewBox="0 0 64 64" className="cr-ticker-logo-svg" aria-hidden>
        <rect x="10" y="10" width="44" height="44" rx="10" fill="#e4002b" />
        <text x="32" y="39" textAnchor="middle" fontSize="19" fontWeight="700" fill="#fff">
          KFC
        </text>
      </svg>
    );
  }
  if (brand === "nike") {
    return (
      <svg viewBox="0 0 64 64" className="cr-ticker-logo-svg" aria-hidden>
        <path
          d="M10 36c7 2 16 0 26-6 6-3 11-7 18-12-8 10-15 17-23 22-9 5-16 6-21 3-3-2-3-4 0-7z"
          fill="#fff"
        />
      </svg>
    );
  }
  if (brand === "apple") {
    return (
      <svg viewBox="0 0 64 64" className="cr-ticker-logo-svg" aria-hidden>
        <path
          fill="#fff"
          d="M39.8 34.7c0-6.7 5.4-9.9 5.6-10.1-3.1-4.5-7.9-5.1-9.6-5.1-4.1-.4-8 2.4-10.1 2.4-2.2 0-5.5-2.3-9.1-2.2-4.7.1-9 2.7-11.5 6.9-4.9 8.5-1.3 21 3.5 27.8 2.4 3.3 5.1 7 8.8 6.9 3.6-.2 5-2.2 9.4-2.2 4.4 0 5.6 2.2 9.5 2.1 3.9-.1 6.4-3.4 8.7-6.8 2.8-4 3.9-8 4-8.2-.1-.1-7.7-3-7.7-11.5zM33.2 15.2c1.9-2.3 3.1-5.4 2.8-8.6-2.7.1-5.9 1.8-7.8 4.1-1.8 2.1-3.3 5.3-2.9 8.3 3 .2 5.9-1.4 7.9-3.8z"
        />
      </svg>
    );
  }
  if (brand === "google") {
    return (
      <svg viewBox="0 0 64 64" className="cr-ticker-logo-svg" aria-hidden>
        <path
          d="M32 13a19 19 0 1 0 0 38c15.9 0 19.3-14.8 18.4-22H32v8h10.5c-1.1 4.6-5.4 7-10.5 7a11 11 0 1 1 0-22 10.6 10.6 0 0 1 7.6 3l5.8-5.8A19 19 0 0 0 32 13z"
          fill="#4285f4"
        />
      </svg>
    );
  }
  if (brand === "amazon") {
    return (
      <svg viewBox="0 0 64 64" className="cr-ticker-logo-svg" aria-hidden>
        <path d="M16 27h26v7H16z" fill="#fff" />
        <path d="M13 42c10 5 24 6 39 0" stroke="#ff9900" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    );
  }
  if (brand === "coca-cola") {
    return (
      <svg viewBox="0 0 64 64" className="cr-ticker-logo-svg" aria-hidden>
        <path
          d="M14 34c3-5 10-8 17-7 7 1 13 6 18 4 3-1 4-4 4-7 3 3 4 8 1 12-3 4-8 5-13 4-4-1-8-4-12-4-4 0-7 2-8 6-3-2-5-5-7-8z"
          fill="#e61a27"
        />
      </svg>
    );
  }
  if (brand === "tesla") {
    return (
      <svg viewBox="0 0 64 64" className="cr-ticker-logo-svg" aria-hidden>
        <path d="M32 12c7 0 13 1 19 4-4 2-8 3-12 3l-3 2v24h-8V21l-3-2c-4 0-8-1-12-3 6-3 12-4 19-4z" fill="#e82127" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 64 64" className="cr-ticker-logo-svg" aria-hidden>
      <rect x="10" y="10" width="20" height="20" fill="#f25022" />
      <rect x="34" y="10" width="20" height="20" fill="#7fba00" />
      <rect x="10" y="34" width="20" height="20" fill="#00a4ef" />
      <rect x="34" y="34" width="20" height="20" fill="#ffb900" />
    </svg>
  );
}

function splitChars(text: string, keyPrefix: string) {
  return text.split("").map((c, i) => (
    <span key={`${keyPrefix}-${i}`} className="cr-hero-char">
      {c === " " ? "\u00A0" : c}
    </span>
  ));
}

type Props = {
  heroRef: RefObject<HTMLElement | null>;
  tickerRef: RefObject<HTMLDivElement | null>;
};

export function CareersHeroSection({ heroRef, tickerRef }: Props) {
  return (
    <section ref={heroRef} className="cr-hero" aria-labelledby="cr-hero-title">
      <div className="cr-hero-bg" aria-hidden>
        <picture>
          <source
            media="(max-width: 900px)"
            srcSet="/images/careers/careers-hero-section-mobile.jpeg"
          />
          <Image
            src="/images/careers/careers-hero-section.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="cr-hero-photo"
          />
        </picture>
        <div className="cr-hero-bg-overlay" />
        <div className="cr-hero-bg-vignette" />
      </div>

      <div className="cr-hero-inner">
        <div className="cr-hero-meta cr-hero-meta--layout-only" aria-hidden="true">
          <span className="cr-hero-bin">
            <span className="cr-hero-bin-dot" />
            Careers
          </span>
          <span className="cr-hero-index">01 / 04</span>
        </div>

        <h1 id="cr-hero-title" className="cr-hero-title">
          <span className="cr-hero-line">{splitChars(HERO.headline1, "a")}</span>
          <span className="cr-hero-line">
            {splitChars(HERO.headline2, "b")}{" "}
            <span className="cr-hero-italic">{splitChars(HERO.headlineItalic, "c")}</span>
          </span>
        </h1>

        <div className="cr-hero-bottom">
          <p className="cr-hero-fade cr-hero-lead" style={{ opacity: 0 }}>
            {HERO.lead}
          </p>
          <blockquote className="cr-hero-fade cr-hero-pull" style={{ opacity: 0 }}>
            <span className="cr-hero-pull-mark" aria-hidden>
              ¶
            </span>
            <p>{HERO.pullQuote}</p>
          </blockquote>
        </div>
      </div>

      <div className="cr-ticker" ref={tickerRef} aria-hidden>
        <div className="cr-ticker-track">
          {[0, 1].map((set) => (
            <div key={set} className="cr-ticker-set">
              {TICKER_LOGOS.map((logo, i) => (
                <span key={`${set}-${i}`} className="cr-ticker-logo-item">
                  <BrandLogo brand={logo} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
