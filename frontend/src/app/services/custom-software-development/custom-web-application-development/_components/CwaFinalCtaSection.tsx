import { Fragment } from "react";
import Link from "next/link";
import { CTA } from "../_lib/cwa-data";

export function CwaFinalCtaSection() {
  return (
    <section className="cwa-ncta" aria-labelledby="cwa-ncta-title">
      <div className="cwa-ncta-inner">
        <div className="cwa-ncta-card">
          <h2 id="cwa-ncta-title" className="cwa-ncta-title">
            <span className="cwa-ncta-head">
              {CTA.headline.split(/\s+/).map((word, wi) => (
                <Fragment key={`h-w-${wi}`}>
                  {wi > 0 ? <span className="cwa-ncta-char">{"\u00A0"}</span> : null}
                  <span className="cwa-ncta-word">
                    {word.split("").map((c, i) => (
                      <span key={`h-${wi}-${i}`} className="cwa-ncta-char">
                        {c === " " ? "\u00A0" : c}
                      </span>
                    ))}
                  </span>
                </Fragment>
              ))}
              <span className="cwa-ncta-head-gap" aria-hidden>
                {"\u00A0"}
              </span>
              <span className="cwa-ncta-italic">
                {CTA.headlineItalic.split(/\s+/).map((word, wi) => (
                  <Fragment key={`i-w-${wi}`}>
                    {wi > 0 ? <span className="cwa-ncta-char">{"\u00A0"}</span> : null}
                    <span className="cwa-ncta-word">
                      {word.split("").map((c, i) => (
                        <span key={`i-${wi}-${i}`} className="cwa-ncta-char">
                          {c === " " ? "\u00A0" : c}
                        </span>
                      ))}
                    </span>
                  </Fragment>
                ))}
              </span>
            </span>
          </h2>

          <p className="cwa-ncta-lead cwa-ncta-fade">{CTA.lead}</p>

          <div className="cwa-ncta-actions cwa-ncta-fade">
            <Link href={CTA.primaryCta.href} className="cwa-ncta-btn">
              <span className="cwa-ncta-btn-label">{CTA.primaryCta.label}</span>
              <span className="cwa-ncta-btn-arrow" aria-hidden>
                <svg width="14" height="14" viewBox="0 0 14 14">
                  <path
                    d="M3 7h8 M7 3l4 4-4 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>

            <a href={`mailto:${CTA.email}`} className="cwa-ncta-mail">
              <span className="cwa-ncta-mail-k">or email</span>
              <span className="cwa-ncta-mail-v">{CTA.email}</span>
            </a>
          </div>

          <dl className="cwa-ncta-rows cwa-ncta-fade">
            {CTA.rows.map((r) => (
              <div key={r.k} className="cwa-ncta-row">
                <dt>{r.k}</dt>
                <dd>{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
