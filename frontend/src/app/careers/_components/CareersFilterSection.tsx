import { FILTER } from "../_lib/careers-data";

type FilterItem = {
  readonly text: string;
  readonly emphasis?: string;
};

function renderFilterItem(item: FilterItem) {
  const { text, emphasis } = item;
  if (!emphasis) return text;

  const idx = text.indexOf(emphasis);
  if (idx === -1) return text;

  return (
    <>
      {text.slice(0, idx)}
      <strong className="cr-filter-emphasis">{emphasis}</strong>
      {text.slice(idx + emphasis.length)}
    </>
  );
}

export function CareersFilterSection() {
  return (
    <section className="cr-filter" aria-labelledby="cr-filter-title">
      <div className="cr-filter-inner">
        <div className="cr-sh cr-section-head cr-filter-head">
          <h2 id="cr-filter-title" className="cr-h2 cr-filter-title">
            <span className="cr-filter-title-line">{FILTER.title}</span>
            <span className="cr-filter-title-line cr-filter-title-accent">
              {FILTER.titleAccent}
            </span>
          </h2>
          <p className="cr-h2-lead">{FILTER.lead}</p>
        </div>

        <div className="cr-filter-compare">
          <div className="cr-filter-table" role="table" aria-label="Hiring mindset comparison">
            <div className="cr-filter-thead" role="row">
              <div className="cr-filter-th cr-filter-th--yes" role="columnheader">
                <span className="cr-filter-th-label">{FILTER.yes.label}</span>
              </div>
              <div className="cr-filter-th cr-filter-th--no" role="columnheader">
                <span className="cr-filter-th-label">{FILTER.no.label}</span>
              </div>
            </div>

            <div className="cr-filter-tbody" role="rowgroup">
              {FILTER.yes.items.map((yesItem, i) => {
                const noItem = FILTER.no.items[i];
                if (noItem === undefined) return null;
                return (
                  <div key={i} className="cr-filter-row" role="row">
                    <div className="cr-filter-cell cr-filter-cell--yes" role="cell">
                      <span className="cr-filter-mobile-kicker">{FILTER.yes.label}</span>
                      <span className="cr-filter-cell-text">{renderFilterItem(yesItem)}</span>
                    </div>
                    <div className="cr-filter-cell cr-filter-cell--no" role="cell">
                      <span className="cr-filter-mobile-kicker">{FILTER.no.label}</span>
                      <span className="cr-filter-cell-text">{renderFilterItem(noItem)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
