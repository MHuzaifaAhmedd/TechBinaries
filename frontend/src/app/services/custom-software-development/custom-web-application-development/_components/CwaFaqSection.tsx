"use client";

import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { FAQS } from "../_lib/cwa-data";

export type CwaFaqSectionProps = {
  openFaq: number | null;
  setOpenFaq: Dispatch<SetStateAction<number | null>>;
};

export function CwaFaqSection({ openFaq, setOpenFaq }: CwaFaqSectionProps) {
  return (
    <section className="cwa-faq-section" aria-labelledby="cwa-faq-title">
      <div className="cwa-faq-layout">
        <div className="cwa-faq-aside cwa-sh">
          <h2 id="cwa-faq-title" className="cwa-h2">
            Frequently <span className="cwa-italic-mute">asked.</span>
          </h2>
          <p className="cwa-h2-lead cwa-faq-lead">
            Real questions from real prospects. If yours isn&apos;t here, send us a note — we answer every inquiry
            within 24 hours.
          </p>
          <Link href="/contact" className="cwa-faq-cta">
            Ask us anything
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

        <div className="cwa-faq-list">
          {FAQS.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="cwa-faq-row" data-open={isOpen ? "true" : "false"}>
                <button
                  type="button"
                  className="cwa-faq-q"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  suppressHydrationWarning
                >
                  <span className="cwa-faq-q-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="cwa-faq-q-text">{f.q}</span>
                  <span className="cwa-faq-q-icon" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path d="M3 7h8 M7 3v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div className="cwa-faq-a">
                  <div className="cwa-faq-a-inner">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
