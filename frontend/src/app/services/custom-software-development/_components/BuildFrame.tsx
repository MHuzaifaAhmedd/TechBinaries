import type { CsdBuildVariant } from "../_lib/csd-build-types";

type Props = {
  index: number;
  active: boolean;
  variant: CsdBuildVariant;
  label: string;
};

export function BuildFrame({ index, active, variant, label }: Props) {
  return (
    <div
      className={`csd-build-frame csd-build-frame-${variant}`}
      data-active={active ? "true" : "false"}
      style={{ ["--idx" as never]: index }}
    >
      <div className="csd-build-frame-head">
        <div className="csd-build-frame-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="csd-build-frame-name">{label}</span>
      </div>
      <div className="csd-build-frame-body">
        {variant === "saas" && (
          <>
            <div className="csd-bf-bar-pink" style={{ width: "70%" }} />
            <div className="csd-bf-bar" style={{ width: "100%" }} />
            <div className="csd-bf-bar" style={{ width: "85%" }} />
            <div className="csd-bf-bar" style={{ width: "60%" }} />
          </>
        )}
        {variant === "dashboard" && (
          <>
            <div className="csd-bf-grid">
              <div />
              <div />
              <div />
              <div />
              <div />
              <div />
            </div>
            <div className="csd-bf-chart">
              <span style={{ height: "30%" }} />
              <span style={{ height: "60%" }} />
              <span style={{ height: "45%" }} />
              <span style={{ height: "80%" }} />
              <span style={{ height: "55%" }} />
              <span style={{ height: "90%" }} />
              <span style={{ height: "65%" }} />
            </div>
          </>
        )}
        {variant === "mobile" && (
          <>
            <div className="csd-bf-mobile-circle" />
            <div className="csd-bf-mobile-bar" style={{ width: "80%", margin: "0 auto" }} />
            <div className="csd-bf-mobile-bar" style={{ width: "60%", margin: "4px auto 0" }} />
            <div style={{ height: 8 }} />
            <div className="csd-bf-bar-pink" style={{ width: "100%" }} />
          </>
        )}
        {variant === "internal" && (
          <>
            <div className="csd-bf-bar" style={{ width: "100%" }} />
            <div className="csd-bf-bar" style={{ width: "100%" }} />
            <div className="csd-bf-bar-pink" style={{ width: "55%" }} />
            <div className="csd-bf-bar" style={{ width: "100%" }} />
            <div className="csd-bf-bar" style={{ width: "75%" }} />
          </>
        )}
        {variant === "mvp" && (
          <>
            <div className="csd-bf-bar-pink" style={{ width: "40%" }} />
            <div className="csd-bf-bar" style={{ width: "100%" }} />
            <div className="csd-bf-bar" style={{ width: "100%" }} />
          </>
        )}
        {variant === "market" && (
          <div className="csd-bf-grid">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        )}
      </div>
    </div>
  );
}
