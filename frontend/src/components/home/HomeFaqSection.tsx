"use client";

import Link from "next/link";
import { useState } from "react";
import { HOME_FAQS } from "@/data/home";

export default function HomeFaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section id="faq" className="home-faq-section" aria-labelledby="home-faq-title">
      <div className="home-faq-layout">
        <div className="home-faq-aside">
          <h2 id="home-faq-title" className="home-faq-h2">
            Frequently <span className="home-faq-italic-mute">asked.</span>
          </h2>
          <p className="home-faq-lead">
            Real questions from real prospects. If yours isn&apos;t here, send us a note — we answer
            every inquiry within 24 hours.
          </p>
          <Link href="/contact" className="home-faq-cta">
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

        <div className="home-faq-list">
          {HOME_FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={faq.q} className="home-faq-row" data-open={isOpen ? "true" : "false"}>
                <button
                  type="button"
                  className="home-faq-q"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  suppressHydrationWarning
                >
                  <span className="home-faq-q-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="home-faq-q-text">{faq.q}</span>
                  <span className="home-faq-q-icon" aria-hidden>
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
                <div className="home-faq-a">
                  <div className="home-faq-a-inner">{faq.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
