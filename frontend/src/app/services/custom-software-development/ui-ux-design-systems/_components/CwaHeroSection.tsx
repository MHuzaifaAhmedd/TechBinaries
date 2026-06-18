import Image from "next/image";
import { AnimatedCharSpans } from "@/components/marketing/AnimatedCharSpans";
import Link from "next/link";
import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "@/lib/breakpoints";
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
            media={DESKTOP_MIN_WIDTH_MEDIA_QUERY}
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
                    <AnimatedCharSpans text={PAGE.headline1} charClassName="cwa-h1-char" keyPrefix="a" />
                  </span>
                  <span className="cwa-h1-line">
                    <AnimatedCharSpans text={PAGE.headline2} charClassName="cwa-h1-char" keyPrefix="b" charStyle={{ whiteSpace: "pre" }} />
                    <span className="cwa-h1-italic">
                      <AnimatedCharSpans text={PAGE.headlineItalic} charClassName="cwa-h1-char" keyPrefix="c" />
                    </span>
                  </span>
                </span>
                <span className="cwa-h1-lines-mobile" aria-hidden={!isMobile}>
                  <span className="cwa-h1-line cwa-h1-line-mobile">
                    <AnimatedCharSpans text={PAGE.headline1} charClassName="cwa-h1-char" keyPrefix="m1" />
                  </span>
                  <span className="cwa-h1-line cwa-h1-line-mobile">
                    <AnimatedCharSpans text={PAGE.headline2} charClassName="cwa-h1-char" keyPrefix="m2" charStyle={{ whiteSpace: "pre" }} />
                    <span className="cwa-h1-italic">
                      <AnimatedCharSpans text={PAGE.headlineItalic} charClassName="cwa-h1-char" keyPrefix="m3i" />
                    </span>
                  </span>
                </span>
              </h1>

              <p className="cwa-hero-fade cwa-hero-lead" style={{ opacity: 0 }}>
                {PAGE.lead}
              </p>

              <div className="cwa-hero-fade cwa-hero-cta-row" style={{ opacity: 0 }}>
                <Link href="/contact" className="csd-cta-primary">
                  <span style={{ position: "relative", zIndex: 2 }}>Build My Custom Solution</span>
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
