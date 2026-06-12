import type { RefObject } from "react";
import { CTA } from "../_lib/about-data";
import { AnimatedCharSpans } from "@/components/marketing/AnimatedCharSpans";

type AboutCtaSectionProps = {
  sectionRef: RefObject<HTMLElement | null>;
  marqueeRef: RefObject<HTMLDivElement | null>;
};

export function AboutCtaSection({ sectionRef, marqueeRef }: AboutCtaSectionProps) {
  return (
    <section ref={sectionRef} className="ab-cta" aria-labelledby="ab-cta-title">
      <div className="ab-cta-bg" aria-hidden>
        <div className="ab-cta-orb ab-cta-orb-a" />
        <div className="ab-cta-orb ab-cta-orb-b" />
        <div className="ab-cta-orb ab-cta-orb-c" />
        <div className="ab-cta-grid-pattern" />
        <div className="ab-cta-vignette" />
      </div>

      <span className="ab-cta-frame ab-cta-frame--top" aria-hidden />

      <div className="ab-cta-inner">
        <h3 id="ab-cta-title" className="ab-cta-headline">
          <span className="ab-cta-headline-line">
            <AnimatedCharSpans
              text={CTA.headline}
              charClassName="ab-cta-char"
              wrapClassName="ab-cta-char-wrap"
              keyPrefix="cta-h"
            />
          </span>
          {CTA.headlineItalic ? (
            <span className="ab-cta-headline-line">
              <span className="ab-italic-light">
                <AnimatedCharSpans
                  text={CTA.headlineItalic}
                  charClassName="ab-cta-char"
                  wrapClassName="ab-cta-char-wrap"
                  keyPrefix="cta-i"
                />
              </span>
            </span>
          ) : null}
        </h3>

        <p className="ab-cta-after ab-cta-lead">{CTA.lead}</p>

        <div className="ab-cta-after ab-cta-actions">
          <a href="/contact" className="ab-cta-button">
            <span className="ab-cta-button-label">{CTA.cta}</span>
            <span className="ab-cta-button-arrow" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path
                  d="M3.5 9h11M9.5 4l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="ab-cta-button-shine" aria-hidden />
          </a>

          <a href="/work" className="ab-cta-button-ghost">
            <span>See the work</span>
          </a>
        </div>
      </div>

      <span className="ab-cta-frame ab-cta-frame--bottom" aria-hidden />

      <div className="ab-cta-marquee" ref={marqueeRef} aria-hidden>
        <div className="ab-cta-marquee-track">
          {[0, 1].map((setIndex) => (
            <div key={setIndex} className="ab-cta-marquee-set">
              {CTA.marquee.map((phrase) => (
                <span key={`${setIndex}-${phrase}`} className="ab-cta-marquee-item">
                  <span>{phrase}</span>
                  <span className="ab-cta-marquee-dot" aria-hidden>
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
