import Image from "next/image";

export function CsdCostSection() {
  return (
    <section
      className="csd-cost-section"
      aria-labelledby="cost-heading"
      style={{ marginBottom: "clamp(40px, 6vw, 88px)" }}
    >
      <div className="csd-cost-grid">
        <div className="csd-cost-media" aria-hidden>
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&auto=format&fit=crop"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 48vw"
            loading="lazy"
          />
          <div className="csd-cost-media-overlay" />
        </div>

        <div className="csd-cost-content csd-sh">
          <h3 id="cost-heading" className="csd-cost-h2">
            Why Custom Software Development <span className="csd-cost-h2-accent">Matters?</span>
          </h3>

          <p className="csd-cost-lead">
            Even today, businesses lose millions on digital products that fail to perform. Without the right custom
            software solutions, these challenges are common but entirely avoidable.
          </p>

          <ul className="csd-cost-list">
            <li>
              <span className="csd-cost-list-mark" />
              <div>
                <strong>Poor user experience</strong>
                {" drives users away quickly, reducing engagement and conversions from the very first interaction."}
              </div>
            </li>
            <li>
              <span className="csd-cost-list-mark" />
              <div>
                <strong>Slow, unoptimized systems</strong>
                {" hurt retention and SEO rankings, causing users to abandon platforms that don't meet performance expectations."}
              </div>
            </li>
            <li>
              <span className="csd-cost-list-mark" />
              <div>
                <strong>Disconnected systems</strong>
                {" create inefficiencies, limiting productivity and preventing seamless business operations across departments."}
              </div>
            </li>
            <li>
              <span className="csd-cost-list-mark" />
              <div>
                <strong>A lack of actionable insights</strong>
                {" leads to poor decision-making, slows growth, and reduces overall return on investment."}
              </div>
            </li>
          </ul>

          <p className="csd-cost-close">
            A skilled custom software developer understands how to eliminate these challenges through scalable,
            user-focused technology. As a results-driven custom software agency, we build high-performance digital
            products designed for usability, integration, and long-term growth, so your business doesn&apos;t just
            function, it thrives.
          </p>
        </div>
      </div>
    </section>
  );
}
