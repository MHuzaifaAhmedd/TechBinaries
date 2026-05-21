import Image from "next/image";
import type { AboutCapabilityItem } from "../_types/about.types";
import { capabilityAccentStyle } from "../_lib/about-styles";

type AboutCapabilityMobileCardProps = {
  item: AboutCapabilityItem;
};

export function AboutCapabilityMobileCard({ item }: AboutCapabilityMobileCardProps) {
  return (
    <article className="ab-cap-mobile-card" style={capabilityAccentStyle(item.accent)}>
      <div className="ab-cap-mobile-figure">
        <span className="ab-cap-mobile-accent-bar" aria-hidden />
        <div className="ab-cap-mobile-figure-mask">
          <Image
            src={item.coverSrc}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 28vw"
            className="ab-cap-mobile-photo"
            draggable={false}
          />
          <span className="ab-cap-mobile-figure-tone" aria-hidden />
        </div>
      </div>
      <div className="ab-cap-mobile-sheet">
        <div className="ab-cap-mobile-top">
          <span className="ab-cap-mobile-num">{item.n}</span>
          <span className="ab-cap-mobile-roman">{item.roman}</span>
        </div>
        <h3 className="ab-cap-mobile-head">{item.head}</h3>
        <p className="ab-cap-mobile-body">{item.body}</p>
        <div className="ab-cap-mobile-stat">
          <span className="ab-cap-mobile-stat-val">{item.stat}</span>
          <span className="ab-cap-mobile-stat-lbl">{item.statLabel}</span>
        </div>
        <div className="ab-cap-mobile-tags">
          {item.tags.map((tag) => (
            <span key={tag} className="ab-cap-mobile-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
