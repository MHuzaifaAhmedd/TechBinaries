import Link from "next/link";

export function CsdFinalCtaSection() {
  return (
    <section className="csd-cta-section">
      <div className="csd-cta-inner">
        <div className="csd-cta-grid">
          <div className="csd-cta-left">
            <h2 className="csd-cta-h2">
              Ready to build something <span className="csd-cta-h2-accent">that lasts?</span>
            </h2>

            <p className="csd-cta-lead">
              Free 30-minute discovery call. You&apos;ll talk directly with an engineer and a strategist — no sales pitch,
              just a real conversation about your problem and timeline.
            </p>

            <div className="csd-cta-actions">
              <Link href="/contact" className="csd-cta-primary-light">
                <span>Book a discovery call</span>
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
              <a href="mailto:hello@techbinaries.com" className="csd-cta-mail">
                hello@techbinaries.com
              </a>
            </div>
          </div>

          <div className="csd-cta-right">
            <dl className="csd-cta-meta">
              <div className="csd-cta-meta-item">
                <dt>Response time</dt>
                <dd>Within 24h</dd>
              </div>
              <div className="csd-cta-meta-item">
                <dt>Typical project</dt>
                <dd>8–24 weeks</dd>
              </div>
              <div className="csd-cta-meta-item">
                <dt>Engagement</dt>
                <dd>Fixed or T&amp;M</dd>
              </div>
              <div className="csd-cta-meta-item">
                <dt>Based in</dt>
                <dd>Global · remote-first</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
