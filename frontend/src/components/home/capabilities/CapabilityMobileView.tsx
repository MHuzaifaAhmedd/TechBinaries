"use client";

import type { Dispatch, SetStateAction } from "react";
import type { HomeCapabilityService } from "./types";
import { CapabilityMobileJumpButton } from "./CapabilityMobileJumpButton";

export function CapabilityMobileView({
  services,
  openIndex,
  setOpenIndex,
  onJumpToSignals,
}: {
  services: readonly HomeCapabilityService[];
  openIndex: number | null;
  setOpenIndex: Dispatch<SetStateAction<number | null>>;
  onJumpToSignals: () => void;
}) {
  return (
    <div className="cap-mobile">
      <div className="cap-mobile__header">
        <div className="cap-mobile__eyebrow">What we do best</div>
        <h2 className="cap-mobile__title">
          Three service pillars.
          <br />
          <span className="cap-mobile__title-italic">One senior team.</span>
        </h2>
        <p className="cap-mobile__lead">
          Tap any capability to see what it includes. Or jump straight ahead to signals.
        </p>
        <CapabilityMobileJumpButton onClick={onJumpToSignals} />
      </div>

      <ul className="cap-mobile__list" role="list">
        {services.map((service, index) => {
          const isOpen = openIndex === index;
          return (
            <li key={service.num} className="cap-mobile__item" data-open={isOpen ? "true" : "false"}>
              <button
                type="button"
                className="cap-mobile__trigger"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="cap-mobile__num">{service.num}</span>
                <span className="cap-mobile__name">{service.title}</span>
                <span className="cap-mobile__chev" aria-hidden>
                  <svg width="14" height="14" viewBox="0 0 14 14">
                    <path
                      d="M3 5.5 7 9.5 11 5.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
              <div className="cap-mobile__panel">
                <div className="cap-mobile__panel-inner">
                  <div className="cap-mobile__kicker">
                    Capability {service.num} <span style={{ opacity: 0.5 }}>·</span> {service.kicker}
                  </div>
                  <p className="cap-mobile__desc">{service.desc}</p>
                  <div className="cap-mobile__deliver-label">What we deliver</div>
                  <ul className="cap-mobile__deliver" role="list">
                    {service.deliverables.map((d: string, di: number) => (
                      <li key={`${service.num}-m-${di}`}>{d}</li>
                    ))}
                  </ul>
                  <div className="cap-mobile__tags">
                    {service.tags.map((t: string) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
