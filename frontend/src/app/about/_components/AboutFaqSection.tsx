"use client";

import Link from "next/link";
import { useState } from "react";
import { ABOUT_FAQ } from "../_lib/about-data";

export function AboutFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="ab-faq" aria-labelledby="ab-faq-title">
      <div className="ab-faq-bg" aria-hidden>
        <div className="ab-faq-grid-pattern" />
      </div>

      <div className="ab-faq-inner">
        <div className="ab-faq-layout">
          <div className="ab-faq-aside">
            <h2 id="ab-faq-title" className="ab-h2 ab-faq-h2">
              {ABOUT_FAQ.title}{" "}
              <span className="ab-italic-mute">{ABOUT_FAQ.titleAccent}</span>
            </h2>
            <p className="ab-h2-lead ab-faq-lead">{ABOUT_FAQ.lead}</p>
            <Link href={ABOUT_FAQ.ctaHref} className="ab-faq-cta">
              {ABOUT_FAQ.cta}
              <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                <path
                  d="M2.5 6h7M6 2.5L9.5 6 6 9.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="ab-faq-list">
            {ABOUT_FAQ.items.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div
                  key={faq.q}
                  className="ab-faq-row"
                  data-open={isOpen ? "true" : "false"}
                >
                  <button
                    type="button"
                    className="ab-faq-q"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    suppressHydrationWarning
                  >
                    <span className="ab-faq-q-num">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="ab-faq-q-text">{faq.q}</span>
                    <span className="ab-faq-q-icon" aria-hidden>
                      <svg width="14" height="14" viewBox="0 0 14 14">
                        <path
                          d="M3 7h8 M7 3v8"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div className="ab-faq-a">
                    <div className="ab-faq-a-inner">{faq.a}</div>
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
