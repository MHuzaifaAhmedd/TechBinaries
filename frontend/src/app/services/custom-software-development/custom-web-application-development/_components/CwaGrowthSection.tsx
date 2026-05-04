import Image from "next/image";
import type { RefObject } from "react";
import { GROWTH } from "../_lib/cwa-data";

export type CwaGrowthSectionProps = {
  activePillar: number;
  stageRef: RefObject<HTMLDivElement | null>;
  pillarListRef: RefObject<HTMLOListElement | null>;
};

export function CwaGrowthSection({ activePillar, stageRef, pillarListRef }: CwaGrowthSectionProps) {
  return (
    <section className="cwa-growth" aria-labelledby="cwa-growth-title">
      <div className="cwa-growth-stage" ref={stageRef}>
        <div className="cwa-growth-inner">
          <div className="cwa-sh cwa-section-head cwa-growth-head-inline">
            <h2 id="cwa-growth-title" className="cwa-h2">
              {GROWTH.title} <span className="cwa-italic-mute">{GROWTH.titleAccent}</span>
            </h2>
            <p className="cwa-h2-lead">{GROWTH.lead}</p>
          </div>

          <div className="cwa-growth-grid">
            <div className="cwa-growth-media-wrap">
              <div className="cwa-growth-media">
                <div className="cwa-growth-media-stack" aria-hidden>
                  {GROWTH.pillars.map((p, i) => (
                    <Image
                      key={p.n}
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(max-width: 900px) 100vw, 46vw"
                      loading={i === 0 ? "eager" : "lazy"}
                      className="cwa-growth-media-img"
                      data-active={activePillar === i ? "true" : "false"}
                    />
                  ))}
                </div>
                <div className="cwa-growth-media-overlay" />

                <div className="cwa-growth-media-progress" aria-hidden>
                  {GROWTH.pillars.map((_, i) => (
                    <span key={i} data-active={activePillar === i ? "true" : "false"} />
                  ))}
                </div>

                <div className="cwa-growth-media-active">
                  <div className="cwa-growth-media-active-num">{GROWTH.pillars[activePillar].n}</div>
                  <div className="cwa-growth-media-active-body">
                    <div className="cwa-growth-media-active-k">{GROWTH.pillars[activePillar].k}</div>
                    <div className="cwa-growth-media-active-v">{GROWTH.pillars[activePillar].v}</div>
                  </div>
                </div>
              </div>
            </div>

            <ol className="cwa-pillar-list" ref={pillarListRef}>
              {GROWTH.pillars.map((p, i) => (
                <li key={p.n} className="cwa-pillar-row" data-active={activePillar === i ? "true" : "false"}>
                  <div className="cwa-pillar-marker">
                    <span className="cwa-pillar-marker-num">{p.n}</span>
                    <span className="cwa-pillar-marker-line" aria-hidden />
                  </div>
                  <div className="cwa-pillar-body">
                    <div className="cwa-pillar-head">
                      <h3 className="cwa-pillar-title">{p.k}</h3>
                      <span className="cwa-pillar-metric">{p.v}</span>
                    </div>
                    <p className="cwa-pillar-desc">{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
