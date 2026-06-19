import { OPENINGS } from "../_lib/careers-data";

export function CareersRolesSection() {
  type Role = (typeof OPENINGS.roles)[number];
  const totalOpenRoles = OPENINGS.roles.length;
  const rolesByDept = OPENINGS.roles.reduce<Record<string, Role[]>>((acc, role) => {
    acc[role.dept] = [...(acc[role.dept] ?? []), role];
    return acc;
  }, {});

  return (
    <section className="cr-roles" aria-labelledby="cr-roles-title">
      <div className="cr-roles-inner">
        <div className="cr-roles-board">
          <aside className="cr-roles-aside" aria-label="Open roles summary">
            <h3 id="cr-roles-title" className="cr-h2">
              {OPENINGS.title}
            </h3>
            <p className="cr-h2-lead">{OPENINGS.lead}</p>
            <div className="cr-roles-stat">
              <span className="cr-roles-stat-label">Open roles</span>
              <strong className="cr-roles-stat-count">{totalOpenRoles}</strong>
            </div>
          </aside>

          <div className="cr-roles-content">
            <div className="cr-roles-scroll-viewport">
              <div className="cr-roles-scroll-track">
                {Object.entries(rolesByDept).map(([dept, roles]) => (
                  <section key={dept} className="cr-role-group" aria-label={`${dept} openings`}>
                    <header className="cr-role-group-head">
                      <h3 className="cr-role-group-title">{dept}</h3>
                      <span className="cr-role-group-count">
                        {roles.length} {roles.length === 1 ? "opening" : "openings"}
                      </span>
                    </header>

                    <div className="cr-role-ledger" role="list">
                      {roles.map((role) => (
                        <article key={role.id} className="cr-role-row" role="listitem">
                          <div className="cr-role-main">
                            <h4 className="cr-role-title">{role.title}</h4>
                            <div className="cr-role-meta">
                              <span className="cr-role-meta-item">{role.location}</span>
                              <span className="cr-role-meta-dot" aria-hidden />
                              <span className="cr-role-meta-item">{role.type}</span>
                            </div>
                            <p className="cr-role-blurb">{role.blurb}</p>
                            <div className="cr-role-tags" aria-label="Required skills">
                              {role.tags.map((tag) => (
                                <span key={tag} className="cr-role-tag">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <a href={`/careers/${role.id}`} className="cr-role-cta" aria-label={`Apply for ${role.title}`}>
                            Apply
                          </a>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
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
