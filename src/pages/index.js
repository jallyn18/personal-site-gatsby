import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";
import LiveMetrics from "../components/live-metrics";
import profile from "../data/profile";
import projects from "../data/projects";

const IndexPage = () => {
  const featured = projects.filter((project) => project.featured);
  const primaryLinks = profile.links.filter((link) => link.primary);

  return (
    <Layout>
      <section className="hero">
        <p className="eyebrow">{profile.title}</p>
        <h1>{profile.name}</h1>
        <p className="tagline">{profile.tagline}</p>

        <div className="actions">
          <Link className="btn btn-primary" to="/working-with-ai/">
            How my team builds with AI
          </Link>
          <Link className="btn" to="/resume/">
            Read the resume
          </Link>
          {primaryLinks.map((link) => (
            <a key={link.label} className="btn" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {/* Served from this site's own API. The numbers describe the page you are
          currently looking at. */}
      <LiveMetrics />
      <p className="small muted" style={{ marginTop: "-0.75rem" }}>
        Live figures from this site&apos;s own infrastructure —{" "}
        <Link to="/pipeline/">how that works</Link>.
      </p>

      <section>
        <h2>What I do</h2>
        {profile.summary.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>{paragraph}</p>
        ))}
      </section>

      <section>
        <h2>100% of our code is written with AI</h2>
        <p>
          I lead a team that develops entirely through AI, spec first. The specification
          is what we argue about; generating the implementation is the cheap part. That
          only works because the verification underneath it is serious — tests, type
          checking, scanning, drift detection, and a deploy that refuses to claim
          success until it has confirmed the live site is serving the new commit.
        </p>
        <p>
          If that sounds like a claim worth checking, it is.{" "}
          <Link to="/working-with-ai/">Here is how it actually works</Link>, and{" "}
          <Link to="/pipeline/">here is the verification</Link> running on this site.
        </p>
      </section>

      <section>
        <h2>Selected work</h2>
        <p className="section-intro">
          Problem, approach, outcome. Full write-ups on the{" "}
          <Link to="/projects/">projects page</Link>.
        </p>

        <div className="grid">
          {featured.map((project) => (
            <article className="card" key={project.slug}>
              <h3>{project.title}</h3>
              <p>{project.blurb}</p>
              <ul className="tags">
                {project.stack.map((item) => (
                  <li key={item}>
                    <span className="tag">{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <Seo pathname="/" />;
