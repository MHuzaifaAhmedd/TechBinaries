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
          <h2 id="cost-heading" className="csd-cost-h2">
            Why it <span className="csd-cost-h2-accent">matters.</span>
          </h2>

          <p className="csd-cost-lead">
            Even leading companies waste millions on apps that don&apos;t convert. The pattern is consistent — and
            almost always preventable.
          </p>

          <ul className="csd-cost-list">
            <li>
              <span className="csd-cost-list-mark" />
              <div>
                <strong>Cluttered interfaces</strong> frustrate users and drive them to competitors within the first
                session.
              </div>
            </li>
            <li>
              <span className="csd-cost-list-mark" />
              <div>
                <strong>Slow performance</strong> kills retention — 53% of users abandon sites that take longer than
                three seconds to load.
              </div>
            </li>
            <li>
              <span className="csd-cost-list-mark" />
              <div>
                <strong>Poor integration</strong> with back-end systems creates silent operational drag and reduces team
                efficiency.
              </div>
            </li>
            <li>
              <span className="csd-cost-list-mark" />
              <div>
                <strong>Lack of analytics</strong> means decisions get made on guesswork instead of evidence — and the
                roadmap suffers.
              </div>
            </li>
          </ul>

          <p className="csd-cost-close">
            We design and engineer custom software to eliminate every one of these failure points — built for the
            audience you actually serve, with adoption, engagement, and ROI as the brief.
          </p>
        </div>
      </div>
    </section>
  );
}
