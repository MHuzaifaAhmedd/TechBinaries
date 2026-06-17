import { PROCESS } from "../_lib/cwa-data";

export function CwaProcessSection() {
  return (
    <section id="process" className="cwa-process-section" aria-labelledby="cwa-process-title">
      <div className="cwa-process-inner">
        <div className="cwa-sh cwa-section-head cwa-section-head--light">
          <h3 id="cwa-process-title" className="cwa-h2 cwa-h2-light">
            How We Build — <span className="cwa-italic-light">Six Phases, One Team.</span>
          </h3>
          <p className="cwa-h2-lead cwa-h2-lead-light">
            Our saas platform development services combine strategic architectural planning with agile execution to turn your complex operational challenges into scalable, high-performance digital realities.
          </p>
        </div>

        <div className="cwa-process-timeline">
          <div className="cwa-process-line" aria-hidden>
            <div className="cwa-process-line-fill" />
          </div>

          <ol className="cwa-process-steps">
            {PROCESS.map((s, i) => (
              <li key={s.num} className="cwa-proc-step" data-side={i % 2 === 0 ? "L" : "R"}>
                <div className="cwa-proc-step-marker" aria-hidden>
                  <span className="cwa-proc-step-marker-num">{s.num}</span>
                </div>
                <div className="cwa-proc-step-card">
                  <div className="cwa-proc-step-head">
                    <h3 className="cwa-proc-step-title">{s.title}</h3>
                    <span className="cwa-proc-step-meta">{s.meta}</span>
                  </div>
                  <p className="cwa-proc-step-desc">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
