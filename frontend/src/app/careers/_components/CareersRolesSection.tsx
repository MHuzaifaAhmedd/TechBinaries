import type { CSSProperties } from "react";
import { OPENINGS } from "../_lib/careers-data";

export function CareersRolesSection() {
  return (
    <section className="cr-roles" aria-labelledby="cr-roles-title">
      <div className="cr-roles-inner">
        <div className="cr-sh cr-section-head">
          <h2 id="cr-roles-title" className="cr-h2">
            {OPENINGS.title} <span className="cr-italic-mute">{OPENINGS.titleAccent}</span>
          </h2>
          <p className="cr-h2-lead">{OPENINGS.lead}</p>
        </div>

        <div className="cr-roles-list" role="list">
          {OPENINGS.roles.map((role, i) => (
            <article
              key={role.id}
              className="cr-role-row"
              role="listitem"
              style={{ "--i": i } as CSSProperties}
            >
              <div className="cr-role-left">
                <span className="cr-role-dept">{role.dept}</span>
                <h3 className="cr-role-title">{role.title}</h3>
              </div>

              <div className="cr-role-mid">
                <div className="cr-role-meta">
                  <span className="cr-role-meta-item">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                      <path
                        d="M6 12C6 12 2 8.5 2 5a4 4 0 0 1 8 0c0 3.5-4 7-4 7Z"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        fill="none"
                      />
                    </svg>
                    {role.location}
                  </span>
                  <span className="cr-role-dot" aria-hidden />
                  <span className="cr-role-meta-item">{role.type}</span>
                </div>
                <div className="cr-role-tags" aria-label="Required skills">
                  {role.tags.map((tag) => (
                    <span key={tag} className="cr-role-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="cr-role-right">
                <p className="cr-role-blurb">{role.blurb}</p>
                <a
                  href={`/careers/${role.id}`}
                  className="cr-role-cta"
                  aria-label={`Apply for ${role.title}`}
                >
                  <span>Apply</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M3 7h8M7.5 3.5 11 7l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>

        <p className="cr-roles-footnote">
          Don&apos;t see your role?{" "}
          <a href="mailto:careers@techbinaries.com" className="cr-roles-footnote-link">
            Send us your CV anyway.
          </a>{" "}
          We keep good people on file.
        </p>
      </div>
    </section>
  );
}
