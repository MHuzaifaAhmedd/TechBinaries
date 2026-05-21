import { CAPABILITIES } from "../_lib/about-data";

type AboutCapabilitiesRailProps = {
  activeIndex: number;
};

export function AboutCapabilitiesRail({ activeIndex }: AboutCapabilitiesRailProps) {
  const total = CAPABILITIES.items.length;

  return (
    <aside className="ab-cap-rail" aria-hidden>
      <div className="ab-cap-rail-top">
        <span className="ab-cap-rail-eyebrow">
          <span className="ab-cap-rail-mark" /> Index
        </span>
        <ul className="ab-cap-rail-list">
          {CAPABILITIES.items.map((item, index) => (
            <li
              key={item.n}
              className={`ab-cap-rail-item ${
                activeIndex === index ? "is-active" : ""
              } ${activeIndex > index ? "is-past" : ""}`}
            >
              <span className="ab-cap-rail-num">{item.n}</span>
              <span className="ab-cap-rail-bar">
                <span className="ab-cap-rail-bar-fill" />
              </span>
              <span className="ab-cap-rail-label">{item.shortHead}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ab-cap-arc">
        <svg viewBox="0 0 120 120" className="ab-cap-arc-svg" aria-hidden>
          <circle
            cx="60"
            cy="60"
            r="52"
            className="ab-cap-arc-track"
            fill="none"
            stroke="rgba(10,10,10,0.08)"
            strokeWidth="1"
          />
          <circle
            cx="60"
            cy="60"
            r="52"
            className="ab-cap-arc-fill"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="326.7"
            strokeDashoffset="326.7"
            transform="rotate(-90 60 60)"
          />
          <text x="60" y="56" textAnchor="middle" className="ab-cap-arc-num">
            {String(activeIndex + 1).padStart(2, "0")}
          </text>
          <text x="60" y="72" textAnchor="middle" className="ab-cap-arc-denom">
            / {String(total).padStart(2, "0")}
          </text>
        </svg>
      </div>
    </aside>
  );
}
