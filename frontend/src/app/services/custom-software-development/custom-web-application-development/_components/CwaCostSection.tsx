import Image from "next/image";
import { COST } from "../_lib/cwa-data";

export function CwaCostSection() {
  return (
    <section className="cwa-cost" aria-labelledby="cwa-cost-title">
      <div className="cwa-cost-inner">
        <div className="cwa-cost-split">
          <div className="cwa-cost-content cwa-sh">
            <h2 id="cwa-cost-title" className="cwa-h2">
              {COST.title} <span className="cwa-italic-mute">{COST.titleAccent}</span>
            </h2>
            <p className="cwa-h2-lead">{COST.lead}</p>

            <p className="cwa-cost-close">{COST.close}</p>
          </div>

          <div className="cwa-cost-media" aria-hidden>
            <Image
              src={COST.image}
              alt={COST.imageAlt}
              fill
              className="cwa-cost-media-img"
              sizes="(max-width: 900px) 100vw, 46vw"
              loading="lazy"
            />
            <div className="cwa-cost-media-overlay" />
          </div>
        </div>

        <div className="cwa-fail-grid">
          {COST.failures.map((f) => (
            <article key={f.h} className="cwa-fail-card" data-theme={f.theme}>
              <div className="cwa-fail-card-visual">
                <Image
                  src={f.image}
                  alt={f.imageAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 25vw"
                  loading="lazy"
                  className="cwa-fail-card-img"
                />
                <div className="cwa-fail-card-visual-grad" aria-hidden />
                <span className="cwa-fail-card-arrow" aria-hidden>
                  ↗
                </span>
              </div>
              <div className="cwa-fail-card-body">
                <div className="cwa-fail-card-metric">
                  <span className="cwa-fail-card-stat">{f.stat}</span>
                  <span className="cwa-fail-card-label">{f.label}</span>
                </div>
                <h3 className="cwa-fail-card-h">{f.h}</h3>
                <p className="cwa-fail-card-d">{f.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
