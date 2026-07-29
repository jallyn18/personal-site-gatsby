import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import projects from "../data/projects";

const CaseStudy = ({ project }) => (
  <article className="case" id={project.slug}>
    <div className="role-head">
      <h2 style={{ marginTop: 0 }}>{project.title}</h2>
      <span className="dates">{project.year}</span>
    </div>

    <p className="lede">{project.blurb}</p>

    {project.stack?.length ? (
      <ul className="tags" style={{ marginBottom: "1.5rem" }}>
        {project.stack.map((item) => (
          <li key={item}>
            <span className="tag">{item}</span>
          </li>
        ))}
      </ul>
    ) : null}

    <div className="case-section">
      <div className="h">Problem</div>
      <p>{project.problem}</p>
    </div>

    <div className="case-section">
      <div className="h">Approach</div>
      {project.approach.map((paragraph) => (
        <p key={paragraph.slice(0, 40)}>{paragraph}</p>
      ))}
    </div>

    <div className="case-section">
      <div className="h">Outcome</div>
      <p>{project.outcome}</p>
    </div>

    {project.links?.length ? (
      <div className="actions">
        {project.links.map((link) =>
          link.internal ? (
            <Link key={link.href} className="btn" to={link.href}>
              {link.label}
            </Link>
          ) : (
            <a key={link.href} className="btn" href={link.href}>
              {link.label}
            </a>
          )
        )}
      </div>
    ) : null}
  </article>
);

const ProjectsPage = () => (
  <Layout>
    <h1>Projects</h1>
    <p className="lede">
      Written up as problem, approach, and outcome rather than a feature list — what was
      broken, what I built, and what changed.
    </p>

    {projects.map((project) => (
      <CaseStudy key={project.slug} project={project} />
    ))}
  </Layout>
);

export default ProjectsPage;

export const Head = () => (
  <Seo
    title="Projects"
    pathname="/projects/"
    description="Case studies: what was broken, what I built, and what changed."
  />
);
