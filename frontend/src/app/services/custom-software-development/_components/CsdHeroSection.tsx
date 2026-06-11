import Image from "next/image";
import Link from "next/link";
import { DESKTOP_MIN_WIDTH_MEDIA_QUERY } from "@/lib/breakpoints";
import type { RefObject } from "react";
import type { CsdHeroServiceValue } from "../_lib/csd-hero-service-types";
import { CsdHeroLeadForm } from "./CsdHeroLeadForm";
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
            media={DESKTOP_MIN_WIDTH_MEDIA_QUERY}
          />
        </video>
        <Image
          className="csd-hero-mobile-bg"
          src="/images/services/custom-software-development/mobile-custom-software-service-hero.webp"
          alt=""
          fill
          sizes="100vw"
          decoding="async"
          priority
        />
        <div className="csd-hero-video-overlay" />
      </div>

      <div className="csd-hero-inner">
        <div className="csd-hero-main">
          <div className="csd-hero-left">
            <div className="csd-hero-mobile-spacer" aria-hidden />

            <CsdHeroHeadline isMobile={isMobile} />

            <p className="csd-hero-fade csd-hero-lead" style={{ opacity: 0 }}>
              Partner with a results-driven custom software development agency that creates intelligent, scalable
              software solutions aligned with your business goals and future digital growth strategies.
            </p>

            <div className="csd-hero-fade csd-hero-cta-row" style={{ opacity: 0 }}>
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

          <div className="csd-hero-right">
            <div className="csd-hero-form-shell" style={{ opacity: 0 }}>
              <h3 className="csd-hero-form-title">Share Your Requirements</h3>
              <p className="csd-hero-form-subtitle">
                Tell our experts about your goals and get a tailored consultation plan.
              </p>

              <CsdHeroLeadForm
                heroMenu={heroMenu}
                serviceControls={{
                  listboxId: "hero-service-listbox",
                  triggerId: "hero-service-trigger",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
