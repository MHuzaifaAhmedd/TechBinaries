import Link from "next/link";
import { SUB_SERVICES } from "../_lib/csd-data";

export function CsdCapabilitiesSection() {
  return (
    <section id="capabilities" className="csd-cap-section">
      <div className="csd-cap-inner">
        <div className="csd-sh csd-cap-header">
          <div>
            <h2 className="csd-cap-h2">
              Six disciplines. <span className="csd-italic-mute">One senior team.</span>
            </h2>
          </div>
        </div>

        <div className="csd-cap-list">
          {SUB_SERVICES.map((s) => (
            <Link
              key={s.num}
              id={`cap-${s.num}`}
              href={s.href}
              className="csd-svc-card csd-cap-row"
              style={{ ["--svc-accent" as never]: s.accent }}
            >
              <span className="csd-cap-row-sweep" aria-hidden />
              <div className="csd-cap-row-bin">
                <span className="csd-cap-row-dot" style={{ background: s.accent }} />
                <span>{s.bin}</span>
              </div>
              <div className="csd-cap-row-num">{s.num}</div>
              <div className="csd-cap-row-body">
                <h3 className="csd-cap-row-title">{s.title}</h3>
              </div>
              <div className="csd-cap-row-arrow" aria-hidden>
                <svg width="20" height="20" viewBox="0 0 20 20">
                  <path
                    d="M5 10h10M10 5l5 5-5 5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
