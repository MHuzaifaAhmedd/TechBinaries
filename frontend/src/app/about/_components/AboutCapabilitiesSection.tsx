import type { RefObject } from "react";
import { CAPABILITIES } from "../_lib/about-data";
import { AboutCapabilitiesRail } from "./AboutCapabilitiesRail";
import { AboutCapabilityCard } from "./AboutCapabilityCard";
import { AboutCapabilityMobileCard } from "./AboutCapabilityMobileCard";

type AboutCapabilitiesSectionProps = {
  capRef: RefObject<HTMLElement | null>;
  activeIndex: number;
};

export function AboutCapabilitiesSection({
  capRef,
  activeIndex,
}: AboutCapabilitiesSectionProps) {
  return (
    <section
      ref={capRef}
      id="four-pillars"
      className="ab-cap"
      aria-labelledby="ab-cap-title"
    >
      <div className="ab-cap-pin">
        <div className="ab-cap-pin-bg" aria-hidden>
          <div className="ab-cap-grain" />
        </div>

        <div className="ab-cap-header">
          <h2 id="ab-cap-title" className="ab-cap-h2">
            {CAPABILITIES.title}{" "}
            <span className="ab-italic-mute">{CAPABILITIES.titleAccent}</span>
          </h2>
          <p className="ab-cap-lead">{CAPABILITIES.lead}</p>
        </div>

        <div className="ab-cap-pin-inner">
          <AboutCapabilitiesRail activeIndex={activeIndex} />

          <div className="ab-cap-stage">
            {CAPABILITIES.items.map((item, index) => (
              <AboutCapabilityCard key={item.n} item={item} index={index} />
            ))}
          </div>
        </div>

        <div className="ab-cap-scrollhint" aria-hidden>
          <span className="ab-cap-scrollhint-label">Scroll to advance</span>
          <span className="ab-cap-scrollhint-arrow">↓</span>
        </div>
      </div>

      <div className="ab-cap-mobile">
        {CAPABILITIES.items.map((item) => (
          <AboutCapabilityMobileCard key={item.n} item={item} />
        ))}
      </div>
    </section>
  );
}
