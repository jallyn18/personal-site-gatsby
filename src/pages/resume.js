import React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import profile from "../data/profile";
import experience, { education } from "../data/experience";
import skills, { certifications } from "../data/skills";

const ResumePage = () => (
  <Layout>
    <h1>Resume</h1>
    <p className="lede">
      {profile.title}
      {profile.location ? ` · ${profile.location}` : ""}
    </p>

    <div className="actions">
      {profile.resumePdf ? (
        <a className="btn btn-primary" href={profile.resumePdf}>
          Download PDF
        </a>
      ) : null}
      {profile.links
        .filter((link) => link.primary)
        .map((link) => (
          <a key={link.label} className="btn" href={link.href}>
            {link.label}
          </a>
        ))}
    </div>

    <section>
      <h2>Experience</h2>
      <ol className="timeline">
        {experience.map((role) => (
          <li key={`${role.company}-${role.role}-${role.start}`}>
            <div className="role-head">
              <h3>{role.role}</h3>
              <span className="dates">
                {role.start} — {role.end}
              </span>
            </div>
            <p className="org">
              {role.company}
              {role.location ? ` · ${role.location}` : ""}
            </p>

            {role.summary ? <p>{role.summary}</p> : null}

            {role.highlights?.length ? (
              <ul>
                {role.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {role.stack?.length ? (
              <ul className="tags">
                {role.stack.map((item) => (
                  <li key={item}>
                    <span className="tag">{item}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ol>
    </section>

    <section>
      <h2>Skills</h2>
      <p className="section-intro">
        Grouped by what the tool is for. Everything listed is something I would be
        comfortable being questioned on.
      </p>

      <div className="grid">
        {skills.map((group) => (
          <div className="card" key={group.group}>
            <h3>{group.group}</h3>
            <ul className="tags">
              {group.items.map((item) => (
                <li key={item}>
                  <span className="tag">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>

    {/* Both sections hide themselves rather than render an empty heading. */}
    {certifications.length > 0 ? (
      <section>
        <h2>Certifications</h2>
        <dl className="rows">
          {certifications.map((cert) => (
            <div className="row" key={cert.name}>
              <dt>{cert.year}</dt>
              <dd>
                {cert.name}
                {cert.issuer ? ` — ${cert.issuer}` : ""}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    ) : null}

    {education.length > 0 ? (
      <section>
        <h2>Education</h2>
        <dl className="rows">
          {education.map((item) => (
            <div className="row" key={item.credential}>
              <dt>{item.year}</dt>
              <dd>
                {item.credential} — {item.institution}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    ) : null}
  </Layout>
);

export default ResumePage;

export const Head = () => (
  <Seo
    title="Resume"
    pathname="/resume/"
    description="Experience, skills and certifications."
  />
);
