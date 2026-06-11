import Image from "next/image";
import { VALUE_PROPS } from "../_lib/csd-data";

export function CsdValuePropsSection() {
  return (
    <section className="csd-vp-section" aria-labelledby="csd-vp-title">
      <div className="csd-vp-grid">
        <div className="csd-vp-content csd-sh">
          <h3 id="csd-vp-title" className="csd-vp-h2">
            Built to Deliver <span className="csd-vp-h2-accent">Real Outcomes</span>
          </h3>

          <ul className="csd-vp-list" role="list">
            {VALUE_PROPS.map((v, i) => (
              <li key={v.id} className="csd-vp-item">
                <div className="csd-vp-item-num">
                  <span style={{ fontFamily: "var(--font-mono)" }}>{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="csd-vp-item-body">
                  <h3 className="csd-vp-item-title">{v.title}</h3>
                  <p className="csd-vp-item-desc">{v.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="csd-vp-media" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&auto=format&fit=crop"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            loading="lazy"
          />
          <div className="csd-vp-media-overlay" />
          <div className="csd-vp-media-tag">
            <span className="csd-vp-media-tag-dot" />
            Engineered with intent
          </div>
        </div>
      </div>
    </section>
  );
}
