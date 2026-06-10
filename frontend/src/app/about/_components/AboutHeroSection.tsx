import Image from "next/image";
import { HERO } from "../_lib/about-data";
import { AnimatedCharSpans } from "@/components/marketing/AnimatedCharSpans";

type AboutHeroSectionProps = {
  isMobile: boolean;
};

export function AboutHeroSection({ isMobile }: AboutHeroSectionProps) {
  return (
    <section className="ab-hero" aria-labelledby="ab-hero-title">
      <div className="ab-hero-media" aria-hidden>
        <div className="ab-hero-media-inner">
          {!isMobile ? (
            <video
              className="ab-hero-video"
              src={HERO.videoSrc}
              poster={HERO.videoPoster}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <Image
              src={HERO.mobileImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="ab-hero-photo"
            />
          )}
        </div>
        <div className="ab-hero-overlay" />
        <div className="ab-hero-vignette" />
      </div>

      <div className="ab-hero-content">
        <div className="ab-hero-inner">
          <h1 id="ab-hero-title" className="ab-hero-title">
            <span className="ab-hero-line">
              <AnimatedCharSpans
                text={HERO.headline1}
                charClassName="ab-hero-char"
                wrapClassName="ab-hero-char-wrap"
                keyPrefix="h1"
              />
            </span>
            {(HERO.headline2 || HERO.headlineItalic) && (
              <span className="ab-hero-line">
                {HERO.headline2 ? (
                  <AnimatedCharSpans
                    text={HERO.headline2}
                    charClassName="ab-hero-char"
                    wrapClassName="ab-hero-char-wrap"
                    keyPrefix="h2"
                  />
                ) : null}
                {HERO.headline2 && HERO.headlineItalic ? (
                  <span className="ab-hero-char-wrap">
                    <span className="ab-hero-char">{"\u00A0"}</span>
                  </span>
                ) : null}
                {HERO.headlineItalic ? (
                  <span className="ab-hero-italic">
                    <AnimatedCharSpans
                      text={HERO.headlineItalic}
                      charClassName="ab-hero-char"
                      wrapClassName="ab-hero-char-wrap"
                      keyPrefix="hi"
                    />
                  </span>
                ) : null}
              </span>
            )}
          </h1>

          <div className="ab-hero-bottom">
            <p className="ab-hero-fade ab-hero-lead" style={{ opacity: 0 }}>
              {HERO.lead}
            </p>

            <div className="ab-hero-stats">
              {HERO.stats.map((stat) => (
                <div key={stat.l} className="ab-hero-stat" style={{ opacity: 0 }}>
                  <span className="ab-hero-stat-num">{stat.n}</span>
                  <span className="ab-hero-stat-label">{stat.l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="ab-hero-scrollcue" style={{ opacity: 0 }} aria-hidden>
          <span className="ab-hero-scrollcue-label">Scroll</span>
          <span className="ab-hero-scrollcue-line">
            <span className="ab-hero-scrollcue-dot" />
          </span>
        </div>
      </div>
    </section>
  );
}
