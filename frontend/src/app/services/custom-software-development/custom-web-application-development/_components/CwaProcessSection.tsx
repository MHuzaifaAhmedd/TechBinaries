import { PROCESS } from "../_lib/cwa-data";

export function CwaProcessSection() {
  return (
    <section id="process" className="cwa-process-section" aria-labelledby="cwa-process-title">
      <div className="cwa-process-inner">
        <div className="cwa-sh cwa-section-head cwa-section-head--light">
          <h2 id="cwa-process-title" className="cwa-h2 cwa-h2-light">
            How we build — <span className="cwa-italic-light">six phases, one team.</span>
          </h2>
          <p className="cwa-h2-lead cwa-h2-lead-light">
            A delivery rhythm refined across 150+ shipped products. No surprises, no shipping and praying.
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
