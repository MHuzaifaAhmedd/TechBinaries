import Image from "next/image";
import Link from "next/link";
import type { CsdHeroMenuProps } from "../../_components/CsdHeroSection";
import type { CsdHeroPickerDomIds } from "../../_components/CsdHeroServicePickerPortal";
import { CsdHeroLeadForm } from "../../_components/CsdHeroLeadForm";
import { PAGE } from "../_lib/cwa-data";

type Props = {
  isMobile: boolean;
  heroMenu: CsdHeroMenuProps;
  pickerDomIds: CsdHeroPickerDomIds;
};

export function CwaHeroSection({ isMobile, heroMenu, pickerDomIds }: Props) {
  const {
    heroService,
    heroServiceOpen,
    heroServiceBtnRef,
    openHeroServiceMenu,
    closeHeroServiceMenu,
  } = heroMenu;

  return (
    <section className="cwa-hero" aria-labelledby="cwa-hero-title">
      <div className="cwa-hero-video-wrap" aria-hidden>
        <video className="cwa-hero-bg-video" autoPlay muted loop playsInline preload="metadata">
          <source
            src="/videos/services/Custom%20Software%20Development/custom-web-application-development/service-cwad-hero.mp4"
            type="video/mp4"
            media="(min-width: 901px)"
          />
        </video>
        <Image
          className="cwa-hero-mobile-bg"
          src="/images/services/custom-software-development/cwad-service-hero-mobile.webp"
          alt=""
          fill
          sizes="(max-width: 900px) calc(100vw - 28px), 1px"
          decoding="async"
          priority
        />
        <div className="cwa-hero-bg-overlay" />
        <div className="cwa-hero-bg-spotlight" />
      </div>

      <div className="cwa-hero-inner">
        <div className="csd-hero-main">
          <div className="csd-hero-left">
            <div className="csd-hero-mobile-spacer" aria-hidden />
            <div className="cwa-hero-copy">
              <h1 id="cwa-hero-title" className="cwa-hero-title">
                <span className="cwa-h1-lines-desktop" aria-hidden={isMobile}>
                  <span className="cwa-h1-line">
                    {PAGE.headline1.split("").map((c, i) => (
                      <span key={`a-${i}`} className="cwa-h1-char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </span>
                  <span className="cwa-h1-line">
                    {PAGE.headline2.split("").map((c, i) => (
                      <span key={`b-${i}`} className="cwa-h1-char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </span>
                  <span className="cwa-h1-line">
                    <span className="cwa-h1-italic">
                      {PAGE.headlineItalic.split("").map((c, i) => (
                        <span key={`c-${i}`} className="cwa-h1-char">
                          {c === " " ? "\u00A0" : c}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
                <span className="cwa-h1-lines-mobile" aria-hidden={!isMobile}>
                  <span className="cwa-h1-line cwa-h1-line-mobile">
                    {`${PAGE.headline1} engineered`.split("").map((c, i) => (
                      <span key={`m1-${i}`} className="cwa-h1-char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </span>
                  <span className="cwa-h1-line cwa-h1-line-mobile">
                    {"for ".split("").map((c, i) => (
                      <span key={`m2-${i}`} className="cwa-h1-char" style={{ whiteSpace: "pre" }}>
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                    <span className="cwa-h1-italic">
                      {PAGE.headlineItalic.split("").map((c, i) => (
                        <span key={`m3i-${i}`} className="cwa-h1-char">
                          {c === " " ? "\u00A0" : c}
                        </span>
                      ))}
                    </span>
                  </span>
                </span>
              </h1>

              <p className="cwa-hero-fade cwa-hero-lead" style={{ opacity: 0 }}>
                {PAGE.lead}
              </p>

              <div className="cwa-hero-fade cwa-hero-cta-row" style={{ opacity: 0 }}>
                <Link href="/contact" className="csd-cta-primary">
                  <span style={{ position: "relative", zIndex: 2 }}>Plan my build</span>
                  <svg
                    aria-hidden
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    className="csd-cta-arrow"
                    style={{ position: "relative", zIndex: 2 }}
                  >
                    <path
                      d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="csd-hero-right">
            <div className="csd-hero-form-shell" style={{ opacity: 0 }}>
              <h3 className="csd-hero-form-title">Share Your Requirements</h3>
              <p className="csd-hero-form-subtitle">
                Tell our experts about your goals and get a tailored consultation plan.
              </p>

              <CsdHeroLeadForm
                heroMenu={heroMenu}
                serviceControls={{
                  listboxId: pickerDomIds.listbox,
                  triggerId: pickerDomIds.trigger,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
