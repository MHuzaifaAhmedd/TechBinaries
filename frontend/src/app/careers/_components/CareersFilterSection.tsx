import { FILTER } from "../_lib/careers-data";

export function CareersFilterSection() {
  return (
    <section className="cr-filter" aria-labelledby="cr-filter-title">
      <div className="cr-filter-inner">
        <div className="cr-sh cr-section-head">
          <h2 id="cr-filter-title" className="cr-h2">
            {FILTER.title} <span className="cr-italic-mute">{FILTER.titleAccent}</span>
          </h2>
          <p className="cr-h2-lead">{FILTER.lead}</p>
        </div>

        <div className="cr-filter-table" role="table" aria-label="Hiring signals comparison">
          <div className="cr-filter-thead" role="row">
            <div className="cr-filter-th cr-filter-th--yes" role="columnheader">
              <span className="cr-filter-th-icon" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M3 7.5 L6 10 L11 4.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="cr-filter-th-label">{FILTER.yes.label}</span>
            </div>
            <div className="cr-filter-th cr-filter-th--no" role="columnheader">
              <span className="cr-filter-th-icon" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M4 4 L10 10 M10 4 L4 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <span className="cr-filter-th-label">{FILTER.no.label}</span>
            </div>
          </div>

          <div className="cr-filter-tbody" role="rowgroup">
            {FILTER.yes.items.map((yesText, i) => {
              const noText = FILTER.no.items[i];
              if (noText === undefined) return null;
              return (
                <div key={i} className="cr-filter-row" role="row">
                  <div className="cr-filter-cell cr-filter-cell--yes" role="cell">
                    <span className="cr-filter-cell-bullet" aria-hidden />
                    <span className="cr-filter-cell-text">{yesText}</span>
                  </div>
                  <div className="cr-filter-cell cr-filter-cell--no" role="cell">
                    <span className="cr-filter-cell-bullet" aria-hidden />
                    <span className="cr-filter-cell-text">{noText}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
