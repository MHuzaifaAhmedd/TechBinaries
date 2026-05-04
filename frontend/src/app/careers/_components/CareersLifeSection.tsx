import Image from "next/image";
import { LIFE } from "../_lib/careers-data";

export function CareersLifeSection() {
  return (
    <section className="cr-life" aria-labelledby="cr-life-title">
      <div className="cr-life-inner">
        <div className="cr-sh cr-section-head">
          <h2 id="cr-life-title" className="cr-h2">
            {LIFE.title} <span className="cr-italic-mute">{LIFE.titleAccent}</span>
          </h2>
          <p className="cr-h2-lead">{LIFE.lead}</p>
        </div>

        <div className="cr-life-grid">
          {LIFE.benefits.map((b, i) => (
            <article key={b.h} className="cr-life-item" data-side={i % 2 === 0 ? "L" : "R"}>
              <div className="cr-life-visual">
                <Image
                  src={b.visual}
                  alt={b.visualAlt}
                  fill
                  sizes="(max-width: 900px) 100vw, 45vw"
                  className="cr-life-img"
                />
                <div className="cr-life-visual-overlay" />
              </div>
              <div className="cr-life-body">
                <h3 className="cr-life-h">{b.h}</h3>
                <p className="cr-life-d">{b.d}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
