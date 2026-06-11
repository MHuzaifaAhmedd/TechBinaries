import Image from "next/image";
import { RESULTS } from "../_lib/csd-data";

export function CsdResultsSection() {
  return (
    <section className="csd-results-section" aria-labelledby="csd-results-title">
      <div className="csd-results-inner">
        <div className="csd-sh csd-results-header">
          <div className="csd-results-header-left">
            <h3 id="csd-results-title" className="csd-results-h2">
              Measurable Impact. <span className="csd-italic-mute">Real Growth.</span>
            </h3>
          </div>
          <p className="csd-results-lead">
            We deliver measurable results through scalable software, optimized performance, and solutions designed to
            drive consistent business growth.
          </p>
        </div>

        <div className="csd-results-row">
          {RESULTS.map((r, i) => (
            <article key={r.id} className="csd-result-card">
              <div className="csd-result-card-hero">
                <Image
                  src="/images/White Emblem.png"
                  alt=""
                  aria-hidden
                  width={72}
                  height={72}
                  className="csd-result-card-emblem"
                />
                <span className="csd-result-card-index">{String(i + 1).padStart(2, "0")}</span>
                <div className="csd-result-card-metric">{r.metric}</div>
                <div className="csd-result-card-glow" aria-hidden />
              </div>
              <div className="csd-result-card-body">
                <h4 className="csd-result-card-title">{r.project}</h4>
                <p className="csd-result-card-desc">{r.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
