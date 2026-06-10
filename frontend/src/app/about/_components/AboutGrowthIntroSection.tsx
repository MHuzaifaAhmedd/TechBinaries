"use client";

import Image from "next/image";
import Link from "next/link";
import { GROWTH_INTRO } from "../_lib/about-data";
import { scrollToAboutSection } from "../_lib/scroll-to-section";

type AboutGrowthIntroSectionProps = {
  onNavigateToFourPillars?: () => void;
};

export function AboutGrowthIntroSection({
  onNavigateToFourPillars,
}: AboutGrowthIntroSectionProps) {
  return (
    <section className="ab-growth-intro" aria-labelledby="ab-growth-intro-title">
      <div className="ab-growth-intro-bg" aria-hidden>
        <Image
          src={GROWTH_INTRO.bgImage}
          alt=""
          fill
          sizes="100vw"
          className="ab-growth-intro-photo ab-growth-intro-photo--desktop"
        />
        <Image
          src={GROWTH_INTRO.bgImageMobile}
          alt=""
          fill
          sizes="100vw"
          className="ab-growth-intro-photo ab-growth-intro-photo--mobile"
        />
      </div>

      <div className="ab-growth-intro-inner">
        <div className="ab-growth-intro-layout">
          <div className="ab-growth-intro-aside">
            <h2 id="ab-growth-intro-title" className="ab-growth-intro-h2">
              {GROWTH_INTRO.title}{" "}
              <span className="ab-italic-mute">{GROWTH_INTRO.titleAccent}</span>
            </h2>
            <Link
              href={GROWTH_INTRO.ctaHref}
              className="ab-growth-intro-cta"
              onClick={(event) => {
                event.preventDefault();
                onNavigateToFourPillars?.();
                void scrollToAboutSection(GROWTH_INTRO.ctaHref.replace("#", ""));
              }}
            >
              <span className="ab-growth-intro-cta-label">{GROWTH_INTRO.cta}</span>
              <span className="ab-growth-intro-cta-arrow" aria-hidden>
                →
              </span>
            </Link>
          </div>

          <div className="ab-growth-intro-panel">
            <span className="ab-growth-intro-panel-index" aria-hidden>
              01
            </span>
            <p className="ab-growth-intro-body">{GROWTH_INTRO.body}</p>
            <ul className="ab-growth-intro-tags">
              {GROWTH_INTRO.highlights.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="ab-growth-intro-tag">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
