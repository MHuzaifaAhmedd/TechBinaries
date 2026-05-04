import Link from "next/link";
import type { Dispatch, SetStateAction } from "react";
import { FAQS } from "../_lib/csd-data";

type Props = {
  openFaq: number | null;
  setOpenFaq: Dispatch<SetStateAction<number | null>>;
};

export function CsdFaqSection({ openFaq, setOpenFaq }: Props) {
  return (
    <section className="csd-faq-section">
      <div className="csd-faq-layout">
        <div className="csd-faq-aside csd-sh">
          <h2 className="csd-h2">
            Frequently <span className="csd-italic-mute">asked.</span>
          </h2>
          <p className="csd-h2-lead csd-faq-lead">
            Real questions from real prospects. If yours isn&apos;t here, send us a note — we answer every inquiry within
            24 hours.
          </p>
          <Link href="/contact" className="csd-faq-cta">
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

        <div className="csd-faq-list">
          {FAQS.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="csd-faq-row" data-open={isOpen ? "true" : "false"}>
                <button
                  type="button"
                  className="csd-faq-q"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  suppressHydrationWarning
                >
                  <span className="csd-faq-q-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="csd-faq-q-text">{f.q}</span>
                  <span className="csd-faq-q-icon" aria-hidden>
                    <svg width="14" height="14" viewBox="0 0 14 14">
                      <path d="M3 7h8 M7 3v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
                <div className="csd-faq-a">
                  <div className="csd-faq-a-inner">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
