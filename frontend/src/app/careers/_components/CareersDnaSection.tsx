import type { RefObject } from "react";
import Image from "next/image";
import { DNA } from "../_lib/careers-data";

type Props = {
  dnaStageRef: RefObject<HTMLDivElement | null>;
  activeValue: number;
};

const dnaTotal = DNA.values.length;
const dnaTotalPadded = String(dnaTotal).padStart(2, "0");

export function CareersDnaSection({ dnaStageRef, activeValue }: Props) {
  return (
    <section className="cr-dna" aria-labelledby="cr-dna-title">
      <div className="cr-dna-stage" ref={dnaStageRef}>
        <div className="cr-dna-inner">
          <div className="cr-sh cr-section-head cr-dna-header">
            <h2 id="cr-dna-title" className="cr-h2 cr-h2--light">
              {DNA.title} <span className="cr-italic-light">{DNA.titleAccent}</span>
            </h2>
            <p className="cr-h2-lead cr-h2-lead--light cr-dna-header-lead">{DNA.lead}</p>
          </div>

          <div className="cr-dna-card-stage" aria-live="polite">
            <div className="cr-dna-cards-layer">
              {DNA.values.map((v, i) => (
                <article
                  key={v.n}
                  className="cr-dna-full-card"
                  aria-hidden={activeValue !== i}
                  style={{ perspective: "1200px" }}
                >
                  <div className="cr-dna-full-card-img-wrap">
                    <Image
                      src={v.visual}
                      alt={v.visualAlt}
                      fill
                      sizes="(min-width: 1101px) 60vw, 100vw"
                      className="cr-dna-full-card-img"
                      priority={i === 0}
                    />
                    <div className="cr-dna-full-card-img-overlay" />
                  </div>

                  <div className="cr-dna-full-card-copy">
                    <div className="cr-dna-full-card-text-line" style={{ overflow: "hidden" }}>
                      <span className="cr-dna-full-card-kicker">{v.kicker}</span>
                    </div>
                    <div className="cr-dna-full-card-text-line" style={{ overflow: "hidden" }}>
                      <h3 className="cr-dna-full-card-head">{v.head}</h3>
                    </div>
                    <div className="cr-dna-full-card-text-line" style={{ overflow: "hidden" }}>
                      <div className="cr-dna-full-card-rule" />
                    </div>
                    <div className="cr-dna-full-card-text-line" style={{ overflow: "hidden" }}>
                      <p className="cr-dna-full-card-body">{v.body}</p>
                    </div>
                    <div
                      className="cr-dna-full-card-text-line cr-dna-full-card-roman-wrap"
                      style={{ overflow: "hidden" }}
                    >
                      <span className="cr-dna-full-card-roman" aria-hidden>
                        {v.n}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="cr-dna-progress-strip" aria-hidden>
              <div className="cr-dna-dots">
                {DNA.values.map((_, i) => (
                  <span
                    key={i}
                    className="cr-dna-dot"
                    data-active={i === activeValue ? "true" : "false"}
                  />
                ))}
              </div>
              <div className="cr-dna-counter">
                <span className="cr-dna-counter-num">{String(activeValue + 1).padStart(2, "0")}</span>
                <span className="cr-dna-counter-sep">/</span>
                <span className="cr-dna-counter-total">{dnaTotalPadded}</span>
              </div>
              <div className="cr-dna-progress-bar">
                <div
                  className="cr-dna-progress-fill"
                  style={{ width: `${((activeValue + 1) / dnaTotal) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <ol className="cr-dna-mobile-list" role="list">
            {DNA.values.map((v) => (
              <li key={v.n} className="cr-dna-mobile-card">
                <div className="cr-dna-mobile-visual">
                  <Image
                    src={v.visual}
                    alt={v.visualAlt}
                    fill
                    sizes="(max-width: 1100px) 100vw, 400px"
                    className="cr-dna-mobile-img"
                  />
                  <div className="cr-dna-mobile-overlay" />
                  <span className="cr-dna-mobile-kicker-tag">{v.kicker}</span>
                  <span className="cr-dna-mobile-roman" aria-hidden>
                    {v.n}
                  </span>
                </div>
                <div className="cr-dna-mobile-text">
                  <h3 className="cr-dna-mobile-head">{v.head}</h3>
                  <p className="cr-dna-mobile-body">{v.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
