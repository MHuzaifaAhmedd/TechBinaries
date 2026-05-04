import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import { WE_BUILD } from "../_lib/csd-data";
import { BuildFrame } from "./BuildFrame";

export type CsdBuildInteraction = {
  hoveredBuild: number;
  setHoveredBuild: Dispatch<SetStateAction<number>>;
  isLenisScrollingRef: MutableRefObject<boolean>;
  pendingHoveredBuildRef: MutableRefObject<number | null>;
};

type Props = { build: CsdBuildInteraction };

export function CsdBuildSection({ build }: Props) {
  const { hoveredBuild, setHoveredBuild, isLenisScrollingRef, pendingHoveredBuildRef } = build;
  const hb = Math.min(Math.max(hoveredBuild, 0), WE_BUILD.length - 1);

  return (
    <section className="csd-build-section">
      <div className="csd-build-inner">
        <div className="csd-build-grid">
          <div className="csd-build-left">
            <div className="csd-sh">
              <h2 className="csd-h2">
                Real products, <span className="csd-italic-mute">not slides.</span>
              </h2>
              <p className="csd-h2-lead csd-build-lead">
                Service categories are abstract. Here&apos;s what they actually become in production — hover any row
                to see it.
              </p>
            </div>

            <ul className="csd-build-list" role="list">
              {WE_BUILD.map((b, i) => {
                const active = hoveredBuild === i;
                return (
                  <li
                    key={b.id}
                    className="csd-build-row"
                    data-active={active ? "true" : "false"}
                    onMouseEnter={() => {
                      if (isLenisScrollingRef.current) {
                        pendingHoveredBuildRef.current = i;
                        return;
                      }
                      setHoveredBuild((prev) => (prev === i ? prev : i));
                    }}
                    onFocus={() => {
                      setHoveredBuild((prev) => (prev === i ? prev : i));
                    }}
                    tabIndex={0}
                  >
                    <span className="csd-build-row-bin">
                      <span style={{ fontFamily: "var(--font-mono)" }}>{b.bin}</span>
                    </span>
                    <span className="csd-build-row-label">{b.label}</span>
                    <span className="csd-build-row-desc">{b.desc}</span>
                    <span className="csd-build-row-line" />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="csd-build-right">
            <div className="csd-build-stage" aria-hidden>
              <div className="csd-build-stage-grid" />
              <BuildFrame index={0} active={hoveredBuild === 0} variant="saas" label="SaaS" />
              <BuildFrame index={1} active={hoveredBuild === 1} variant="dashboard" label="Dashboard" />
              <BuildFrame index={2} active={hoveredBuild === 2} variant="mobile" label="Mobile" />
              <BuildFrame index={3} active={hoveredBuild === 3} variant="internal" label="Internal" />
              <BuildFrame index={4} active={hoveredBuild === 4} variant="mvp" label="MVP" />
              <BuildFrame index={5} active={hoveredBuild === 5} variant="market" label="Market" />

              <div className="csd-build-stage-badge">
                <span className="csd-build-stage-badge-bin">{WE_BUILD[hb].bin}</span>
                <span>{WE_BUILD[hb].label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
