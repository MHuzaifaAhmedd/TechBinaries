import Image from "next/image";
import { PILLARS } from "../_lib/about-data";

export function AboutPillarsSection() {
  return (
    <section className="ab-pillars" aria-labelledby="ab-pillars-title">
      <div className="ab-pillars-bg" aria-hidden>
        <div className="ab-pillars-grid-pattern" />
      </div>

      <div className="ab-pillars-inner">
        <div className="ab-pillars-head">
          <h3 id="ab-pillars-title" className="ab-h2">
            {PILLARS.title}{" "}
            <span className="ab-italic-mute">{PILLARS.titleAccent}</span>
          </h3>
          <p className="ab-h2-lead">{PILLARS.lead}</p>
        </div>

        <div className="ab-pillars-divider" aria-hidden>
          <span className="ab-pillars-divider-line" />
          <span className="ab-pillars-divider-mark">
            <Image
              src="/images/black-TB.png"
              alt="TechBinaries logo"
              width={34}
              height={34}
              sizes="34px"
              className="ab-pillars-divider-logo"
            />
          </span>
          <span className="ab-pillars-divider-line" />
        </div>

        <div className="ab-pillars-grid">
          {PILLARS.items.map((item) => (
            <article key={item.n} className="ab-pillar-card">
              <div className="ab-pillar-inner">
                <Image
                  src={item.image}
                  alt={item.head}
                  fill
                  className="ab-pillar-image"
                  sizes="(max-width: 1100px) 100vw, 33vw"
                />
                <div className="ab-pillar-teaser" aria-hidden>
                  <span className="ab-pillar-teaser-kicker">
                    <span className="ab-pillar-teaser-kicker-num">{item.n}</span>
                    <span className="ab-pillar-teaser-kicker-text">{item.kicker}</span>
                  </span>
                  <span className="ab-pillar-teaser-cta">
                    <span className="ab-pillar-teaser-dot" />
                    Explore
                    <span className="ab-pillar-teaser-arrow" aria-hidden>
                      ↗
                    </span>
                  </span>
                </div>
                <div className="ab-pillar-overlay">
                  <div className="ab-pillar-overlay-top">
                    <span className="ab-pillar-num">{item.n}</span>
                    <span className="ab-pillar-kicker">{item.kicker}</span>
                  </div>
                  <h3 className="ab-pillar-overlay-head">{item.head}</h3>
                  {item.body ? (
                    <p className="ab-pillar-overlay-body">{item.body}</p>
                  ) : null}
                  {item.meta.length > 0 ? (
                    <ul className="ab-pillar-meta">
                      {item.meta.map((meta) => (
                        <li key={meta} className="ab-pillar-meta-item">
                          <span className="ab-pillar-meta-mark" aria-hidden>
                            ▸
                          </span>
                          {meta}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
