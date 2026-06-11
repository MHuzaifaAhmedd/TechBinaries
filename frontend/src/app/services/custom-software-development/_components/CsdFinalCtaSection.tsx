import Link from "next/link";

const CTA_META = [
  { label: "Response time", value: "Within 24h" },
  { label: "Typical project", value: "8–24 weeks" },
  { label: "Engagement", value: "Fixed or T&M" },
  { label: "Based in", value: "Global · remote-first" },
] as const;

export function CsdFinalCtaSection() {
  return (
    <section className="csd-cta-section" aria-labelledby="csd-cta-title">
      <div className="csd-cta-inner">
        <div className="csd-cta-body">
          <h3 id="csd-cta-title" className="csd-cta-h2">
            Take The First Step Toward{" "}
            <span className="csd-cta-h2-accent">Smarter Digital Solutions!</span>
          </h3>

          <p className="csd-cta-lead">
            Have an idea worth building? Partner with us to design, develop, and launch a powerful solution that
            delivers measurable impact.
          </p>

          <div className="csd-cta-actions">
            <Link href="/contact" className="csd-cta-primary-light">
              <span>Let&apos;s Map Out Your Product Roadmap</span>
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
              <span className="csd-cta-mail-k">or email</span>
              <span className="csd-cta-mail-v">hello@techbinaries.com</span>
            </a>
          </div>
        </div>

        <dl className="csd-cta-meta">
          {CTA_META.map((item) => (
            <div key={item.label} className="csd-cta-meta-item">
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
