import Image from "next/image";
import Link from "next/link";
import type { RefObject } from "react";
import { HERO_PHONE_COUNTRY_CODES } from "../_lib/csd-data";
import type { CsdHeroServiceValue } from "../_lib/csd-hero-service-types";
import { CsdHeroHeadline } from "./CsdHeroHeadline";

export type CsdHeroMenuProps = {
  heroService: CsdHeroServiceValue | null;
  heroServiceOpen: boolean;
  heroServiceBtnRef: RefObject<HTMLButtonElement | null>;
  openHeroServiceMenu: () => void;
  closeHeroServiceMenu: () => void;
};

type Props = {
  isMobile: boolean;
  heroMenu: CsdHeroMenuProps;
};

export function CsdHeroSection({ isMobile, heroMenu }: Props) {
  const {
    heroService,
    heroServiceOpen,
    heroServiceBtnRef,
    openHeroServiceMenu,
    closeHeroServiceMenu,
  } = heroMenu;

  return (
    <section className="csd-hero">
      <div className="csd-hero-video-wrap" aria-hidden>
        <video
          className="csd-hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        >
          <source
            src="/videos/hero-services-csds-video.mp4"
            type="video/mp4"
            media="(min-width: 901px)"
          />
        </video>
        <Image
          className="csd-hero-mobile-bg"
          src="/images/services/custom-software-development/mobile-custom-software-service-hero.jpeg"
          alt=""
          fill
          sizes="100vw"
          decoding="async"
          preload
        />
        <div className="csd-hero-video-overlay" />
      </div>

      <div className="csd-hero-inner">
        <div className="csd-hero-main">
          <div className="csd-hero-left">
            <div className="csd-hero-mobile-spacer" aria-hidden />

            <CsdHeroHeadline isMobile={isMobile} />

            <p className="csd-hero-fade csd-hero-lead" style={{ opacity: 0 }}>
              We design, build, and modernize web apps, mobile apps, SaaS platforms, and internal tools that launch
              fast, perform reliably, and stay easy to scale as your business grows.
            </p>

            <div className="csd-hero-fade csd-hero-cta-row" style={{ opacity: 0 }}>
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

          <div className="csd-hero-right">
            <div className="csd-hero-form-shell" style={{ opacity: 0 }}>
              <h3 className="csd-hero-form-title">Share Your Requirements</h3>
              <p className="csd-hero-form-subtitle">
                Tell our experts about your goals and get a tailored consultation plan.
              </p>

              <form className="csd-hero-form" onSubmit={(e) => e.preventDefault()}>
                <div className="csd-hero-form-grid">
                  <label className="csd-hero-form-field">
                    <span>First Name</span>
                    <input type="text" name="firstName" placeholder="First name" autoComplete="given-name" />
                  </label>
                  <label className="csd-hero-form-field">
                    <span>Last Name</span>
                    <input type="text" name="lastName" placeholder="Last name" autoComplete="family-name" />
                  </label>
                </div>

                <div className="csd-hero-form-grid">
                  <label className="csd-hero-form-field csd-hero-form-field--phone">
                    <span>Contact Number</span>
                    <div className="csd-hero-phone-row">
                      <select
                        className="csd-hero-phone-cc"
                        name="countryCode"
                        aria-label="Country calling code"
                        defaultValue="+92"
                      >
                        {HERO_PHONE_COUNTRY_CODES.map((code) => (
                          <option key={code} value={code}>
                            {code}
                          </option>
                        ))}
                      </select>
                      <span className="csd-hero-phone-sep" aria-hidden />
                      <input
                        className="csd-hero-phone-num"
                        type="tel"
                        name="phoneNational"
                        placeholder="Enter Your Number*"
                        autoComplete="tel-national"
                        aria-label="Phone number"
                        required
                      />
                    </div>
                  </label>
                  <label className="csd-hero-form-field">
                    <span>Work Email</span>
                    <input type="email" placeholder="Enter your email address" />
                  </label>
                </div>

                <div className="csd-hero-form-grid">
                  <label className="csd-hero-form-field">
                    <span>Budget Range</span>
                    <select name="budgetRange" defaultValue="">
                      <option value="" disabled>
                        Select a budget range
                      </option>
                      <option value="under-10k">Under $10k</option>
                      <option value="10k-25k">$10k - $25k</option>
                      <option value="25k-50k">$25k - $50k</option>
                      <option value="50k-plus">$50k+</option>
                    </select>
                  </label>
                  <label className="csd-hero-form-field">
                    <span>Services</span>
                    <div className="csd-hero-service-dd">
                      <input type="hidden" name="serviceInterest" value={heroService?.href ?? ""} />
                      <button
                        ref={heroServiceBtnRef}
                        type="button"
                        className={`csd-hero-service-dd-trigger${heroService ? "" : " csd-hero-service-dd-trigger--placeholder"}`}
                        aria-expanded={heroServiceOpen}
                        aria-haspopup="listbox"
                        aria-controls="hero-service-listbox"
                        id="hero-service-trigger"
                        aria-label="Service you are interested in"
                        onClick={() => (heroServiceOpen ? closeHeroServiceMenu() : openHeroServiceMenu())}
                      >
                        <span className="csd-hero-service-dd-value">
                          {heroService ? heroService.label : "Select a service"}
                        </span>
                        <span
                          className={`csd-hero-service-dd-chevron${heroServiceOpen ? " csd-hero-service-dd-chevron--open" : ""}`}
                          aria-hidden
                        />
                      </button>
                    </div>
                  </label>
                </div>

                <label className="csd-hero-form-field">
                  <span>Describe your project</span>
                  <textarea rows={3} placeholder="Describe your project" />
                </label>

                <div className="csd-hero-form-foot">
                  <div className="csd-hero-form-captcha">
                    <span>5 + 2 =</span>
                    <input type="text" inputMode="numeric" aria-label="Simple captcha answer" />
                  </div>
                  <button type="submit" className="csd-hero-form-submit">
                    Schedule a Technical Consultation
                  </button>
                </div>
                <p className="csd-hero-form-note">Fast, high-touch engagement under strict NDA protection.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
