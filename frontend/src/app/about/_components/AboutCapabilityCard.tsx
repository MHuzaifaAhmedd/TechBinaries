import Image from "next/image";
import type { AboutCapabilityItem } from "../_types/about.types";
import { capabilityAccentStyle } from "../_lib/about-styles";

type AboutCapabilityCardProps = {
  item: AboutCapabilityItem;
  index: number;
};

export function AboutCapabilityCard({ item, index }: AboutCapabilityCardProps) {
  return (
    <article
      className="ab-cap-card"
      data-index={index}
      style={capabilityAccentStyle(item.accent)}
    >
      <div className="ab-cap-card-layout">
        <figure className="ab-cap-card-figure">
          <span className="ab-cap-card-accent-bar" aria-hidden />
          <div className="ab-cap-card-figure-mask">
            <Image
              src={item.coverSrc}
              alt=""
              fill
              sizes="(max-width: 1200px) 100vw, 32vw"
              className="ab-cap-card-photo"
              draggable={false}
            />
            <span className="ab-cap-card-figure-tone" aria-hidden />
          </div>
        </figure>

        <div className="ab-cap-card-sheet">
          <header className="ab-cap-card-rail-head">
            <div className="ab-cap-card-rail-meta">
              <span className="ab-cap-card-rail-roman">{item.roman}</span>
              <span className="ab-cap-card-rail-slash" aria-hidden>
                /
              </span>
              <span className="ab-cap-card-rail-practice">Practice {item.n}</span>
            </div>
            <div className="ab-cap-card-stat-block">
              <span className="ab-cap-card-stat">{item.stat}</span>
              <span className="ab-cap-card-stat-label">{item.statLabel}</span>
            </div>
          </header>

          <span className="ab-cap-card-rule" aria-hidden />

          <div className="ab-cap-card-body">
            <h3 className="ab-cap-card-head">{item.head}</h3>
            <p className="ab-cap-card-copy">{item.body}</p>
          </div>

          <div className="ab-cap-card-delivs">
            {item.deliverables.map((deliverable, deliverableIndex) => (
              <div key={deliverable} className="ab-cap-card-deliv">
                <span className="ab-cap-card-deliv-num">
                  {String(deliverableIndex + 1).padStart(2, "0")}
                </span>
                <span className="ab-cap-card-deliv-label">{deliverable}</span>
              </div>
            ))}
          </div>

          <div className="ab-cap-card-tags">
            {item.tags.map((tag) => (
              <span key={tag} className="ab-cap-card-tag">
                {tag}
              </span>
            ))}
          </div>

          <footer className="ab-cap-card-footer">
            <span className="ab-cap-card-footer-mark" aria-hidden>
              ●
            </span>
            <span className="ab-cap-card-footer-text">
              {item.shortHead.toUpperCase()} — TECH BINARIES
            </span>
            <span className="ab-cap-card-footer-page">{item.n} / 04</span>
          </footer>
        </div>
      </div>
    </article>
  );
}
