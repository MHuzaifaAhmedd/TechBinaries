import { RESULTS } from "../_lib/csd-data";

export function CsdResultsSection() {
  return (
    <section className="csd-results-section">
      <div className="csd-results-inner">
        <div className="csd-sh csd-results-header">
          <div className="csd-results-header-left">
            <h3 className="csd-results-h2">
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
            <div key={r.id} className="csd-result-card">
              <div className="csd-result-card-top">
                <span className="csd-result-card-index">R—{String(i + 1).padStart(2, "0")}</span>
                <span className="csd-result-card-dot" />
              </div>
              <div className="csd-result-card-metric">{r.metric}</div>
              <div className="csd-result-card-divider" />
              <div className="csd-result-card-project">{r.project}</div>
              <p className="csd-result-card-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
