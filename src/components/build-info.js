import React from "react";
import { graphql, useStaticQuery } from "gatsby";

/**
 * Renders the metadata captured when this page was built.
 *
 * The values come from gatsby-config.js, which reads them out of the GITHUB_*
 * environment variables present in the Actions runner. That makes the commit
 * shown below the commit that produced the bytes you are reading — not a value
 * fetched later that could disagree with them.
 */
const BuildInfo = () => {
  const { site } = useStaticQuery(graphql`
    query BuildInfoQuery {
      site {
        siteMetadata {
          buildInfo {
            commit
            commitShort
            branch
            repository
            runNumber
            runId
            workflow
            actor
            builtAt
            ci
          }
        }
      }
    }
  `);

  const build = site.siteMetadata.buildInfo;
  const repoUrl = `https://github.com/${build.repository}`;
  const commitUrl = `${repoUrl}/commit/${build.commit}`;
  const runUrl = build.runId ? `${repoUrl}/actions/runs/${build.runId}` : null;

  const builtAt = new Date(build.builtAt);
  const builtAtLabel = Number.isNaN(builtAt.getTime())
    ? build.builtAt
    : `${builtAt.toISOString().replace("T", " ").slice(0, 19)} UTC`;

  return (
    <>
      <dl className="rows">
        <div className="row">
          <dt>Commit</dt>
          <dd>
            {build.ci ? <a href={commitUrl}>{build.commitShort}</a> : build.commitShort}
          </dd>
        </div>

        <div className="row">
          <dt>Branch</dt>
          <dd>{build.branch}</dd>
        </div>

        <div className="row">
          <dt>Built</dt>
          <dd>{builtAtLabel}</dd>
        </div>

        <div className="row">
          <dt>Pipeline run</dt>
          <dd>
            {runUrl ? (
              <a href={runUrl}>
                {build.workflow} #{build.runNumber}
              </a>
            ) : (
              "local build"
            )}
          </dd>
        </div>

        <div className="row">
          <dt>Triggered by</dt>
          <dd>{build.actor || "local"}</dd>
        </div>
      </dl>

      {/* A local deploy via scripts/deploy.sh passes real git metadata, so the
          commit above may well be genuine — but there is no workflow run to
          link to, and saying so is more accurate than calling it a placeholder. */}
      {!build.ci ? (
        <p className="small muted">
          Built outside GitHub Actions, so there is no pipeline run to link to.
        </p>
      ) : null}
    </>
  );
};

export default BuildInfo;
