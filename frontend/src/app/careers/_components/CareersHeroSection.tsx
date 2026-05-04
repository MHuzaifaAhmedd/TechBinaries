import type { RefObject } from "react";
import Image from "next/image";
import { HERO } from "../_lib/careers-data";

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
              {HERO.ticker.map((t, i) => (
                <span key={`${set}-${i}`} className="cr-ticker-item">
                  <span>{t}</span>
                  <span className="cr-ticker-dot" aria-hidden>
                    ●
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
