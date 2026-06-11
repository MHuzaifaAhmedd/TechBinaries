type Props = { isMobile: boolean };

export function CsdHeroHeadline({ isMobile }: Props) {
  return (
    <h1 className="csd-hero-title">
      <span className="csd-h1-lines-desktop" aria-hidden={isMobile}>
        <div className="csd-h1-line">
          {"Custom Software".split("").map((c, i) => (
            <span key={`l1-${i}`} className="csd-h1-char">
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </div>
        <div className="csd-h1-line">
          {"Development Services".split("").map((c, i) => (
            <span key={`l2-${i}`} className="csd-h1-char" style={{ whiteSpace: "pre" }}>
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </div>
        <div className="csd-h1-line">
          <span className="csd-h1-italic">
            {"for Digital Success".split("").map((c, i) => (
              <span key={`l3i-${i}`} className="csd-h1-char">
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
        </div>
      </span>
      <span className="csd-h1-lines-mobile" aria-hidden={!isMobile}>
        <div className="csd-h1-line csd-h1-line-mobile">
          {"Custom Software".split("").map((c, i) => (
            <span key={`m1-${i}`} className="csd-h1-char">
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </div>
        <div className="csd-h1-line csd-h1-line-mobile">
          {"Development Services".split("").map((c, i) => (
            <span key={`m2-${i}`} className="csd-h1-char">
              {c === " " ? "\u00A0" : c}
            </span>
          ))}
        </div>
        <div className="csd-h1-line csd-h1-line-mobile">
          <span className="csd-h1-italic">
            {"for Digital Success".split("").map((c, i) => (
              <span key={`m3i-${i}`} className="csd-h1-char">
                {c === " " ? "\u00A0" : c}
              </span>
            ))}
          </span>
        </div>
      </span>
    </h1>
  );
}
