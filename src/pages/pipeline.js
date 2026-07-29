import React from "react";

import Layout from "../components/layout";
import Seo from "../components/seo";
import BuildInfo from "../components/build-info";
import ArchitectureDiagram from "../components/architecture-diagram";
import LiveMetrics, { useEndpoint } from "../components/live-metrics";
import { fmtCurrency } from "../lib/format";
import profile from "../data/profile";

/**
 * Month-to-date spend broken down by service, read from /api/cost.
 *
 * The collector writes this snapshot once a day. Cost Explorer charges $0.01
 * per request, so serving it from the cached DynamoDB item rather than querying
 * per page view is the difference between cents and dollars a month.
 */
const CostBreakdown = () => {
  const { status, data } = useEndpoint("/api/cost");

  if (status !== "ready" || !data.available) {
    return (
      <p className="muted small">
        Cost data is collected daily and will appear here once the first snapshot has
        run.
      </p>
    );
  }

  const services = data.by_service || [];

  return (
    <>
      <div className="table-scroll">
        <table>
          <caption
            className="small muted"
            style={{ captionSide: "bottom", paddingTop: "0.6rem", textAlign: "left" }}
          >
            Month to date for {data.month}, collected{" "}
            {data.collected_at ? data.collected_at.slice(0, 10) : "daily"}.
          </caption>
          <thead>
            <tr>
              <th scope="col">Service</th>
              <th scope="col" className="num">
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {services.map((row) => (
              <tr key={row.service}>
                <td>{row.service}</td>
                <td className="num">{fmtCurrency(row.amount, data.currency)}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td className="num">
                <strong>{fmtCurrency(data.month_to_date, data.currency)}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {data.forecast_month_end ? (
        <p className="small muted">
          Forecast for the full month:{" "}
          {fmtCurrency(data.forecast_month_end, data.currency)}.
        </p>
      ) : null}
    </>
  );
};

const PipelinePage = () => (
  <Layout>
    <h1>How this site ships</h1>
    <p className="lede">
      Everything below is checkable. The commit shown is the commit that produced this
      page, the uptime figure comes from a prober that fetches this URL over the public
      internet, and the cost table is the actual AWS bill. Both repositories are public.
    </p>

    <section>
      <h2>This build</h2>
      <p className="section-intro">
        Captured by the Actions runner at build time and baked into the page.
      </p>
      <BuildInfo />
    </section>

    <section>
      <h2>Right now</h2>
      <LiveMetrics />
    </section>

    <section>
      <h2>Architecture</h2>
      <ArchitectureDiagram />

      <p>
        A single CloudFront distribution fronts two private origins. Page requests go to
        an S3 bucket that has no public access and no bucket ACLs; requests to{" "}
        <code>/api/*</code> go to a Lambda Function URL set to <code>AWS_IAM</code>{" "}
        auth. CloudFront reaches both through an Origin Access Control that signs every
        request with SigV4, so neither origin can be addressed directly — a request to
        the bucket URL or the function URL returns 403.
      </p>

      <p>
        Mounting the API on the same distribution as the site means the browser makes
        same-origin requests. That removes CORS preflights, a second certificate, and
        API Gateway from the design entirely.
      </p>
    </section>

    <section>
      <h2>What happens when I push</h2>

      <ol>
        <li>
          <strong>Site repository.</strong> Push to <code>main</code> triggers a build.
          The workflow assumes an AWS role via OIDC, reads the bucket name and
          distribution id from SSM Parameter Store, builds the site with the commit
          metadata injected, syncs to S3 in two passes (hashed assets get a one-year
          immutable cache, HTML and page data get revalidated every time), invalidates
          the distribution, and then fetches the live URL to confirm the new commit is
          actually being served.
        </li>
        <li>
          <strong>Infrastructure repository.</strong> Pull requests run <code>fmt</code>
          , <code>validate</code>, and a plan. Merges to <code>main</code> apply{" "}
          <em>the plan artifact the pull request produced</em> rather than re-planning,
          so what was reviewed is what gets applied.
        </li>
        <li>
          <strong>Every day.</strong> A scheduled read-only plan compares the live
          account against the committed code and opens an issue if they have diverged.
        </li>
        <li>
          <strong>Every week.</strong> Trivy scans the Terraform for misconfigurations
          and the dependency tree for CVEs; gitleaks scans history for committed
          secrets. Findings land in the Security tab.
        </li>
      </ol>
    </section>

    <section>
      <h2>Decisions worth defending</h2>

      <h3>No AWS access keys, anywhere</h3>
      <p>
        GitHub Actions authenticates with OIDC and assumes a role whose trust policy
        names a specific repository and ref. The only value stored in GitHub is a role
        ARN, which is not a secret. There is no key to rotate and nothing to leak in a
        workflow log.
      </p>
      <p>
        The two repositories get different roles. The site repository&apos;s role can
        write to one bucket and invalidate one distribution; it cannot read Terraform
        state, touch IAM, or change infrastructure. Fork pull requests cannot assume
        either role.
      </p>

      <h3>One role per Lambda</h3>
      <p>
        Three functions, three roles. The uptime prober can write to DynamoDB but cannot
        call Cost Explorer; the cost collector cannot read the visit counter. Sharing a
        single role would have been fewer lines of Terraform and a worse blast radius.
      </p>

      <h3>The visit counter does not store IP addresses</h3>
      <p>
        Deduplication needs to recognise a repeat visitor without retaining anything
        identifying. The key is a SHA-256 of the IP address, user agent, and date,
        salted with a value generated at deploy time and truncated to 128 bits. The raw
        address is never written, digests do not correlate across deployments, and the
        rows expire after 48 hours via DynamoDB TTL.
      </p>
      <p>
        The conditional write that claims that key is also the concurrency control: two
        simultaneous requests race, one wins, and the counter moves exactly once.
      </p>

      <h3>Polling Cost Explorer per page view would cost more than the site</h3>
      <p>
        Cost Explorer bills $0.01 per API request. At even modest traffic, querying it
        on page load would dominate the bill it was reporting. The collector runs once a
        day and the API serves the cached snapshot from DynamoDB, which is why the cost
        panel updates daily rather than live — a deliberate tradeoff, not a limitation.
      </p>

      <h3>Terraform state locks on S3, not DynamoDB</h3>
      <p>
        S3 conditional writes have handled state locking since Terraform 1.11, and the
        DynamoDB mechanism is deprecated. One fewer resource to provision and pay for.
      </p>
    </section>

    <section>
      <h2>Security posture</h2>
      <ul>
        <li>Private origins; no public S3 URL and no public function URL.</li>
        <li>
          TLS 1.2 minimum, HTTP to HTTPS redirect, HSTS with preload, and bucket
          policies that deny non-TLS requests outright.
        </li>
        <li>
          Content-Security-Policy, <code>X-Content-Type-Options</code>,{" "}
          <code>{"frame-ancestors 'none'"}</code>, and a restrictive Permissions-Policy,
          applied at the edge by a response headers policy.
        </li>
        <li>
          Terraform state is versioned and encrypted, with public access blocked and
          deletion protection on.
        </li>
        <li>
          Point-in-time recovery on the metrics table; a budget alarm at 80% of actual
          and 100% of forecast spend.
        </li>
      </ul>
    </section>

    <section>
      <h2>What it costs</h2>
      <CostBreakdown />
      <p>
        The fixed costs are the Route53 hosted zone at $0.50/month and the Cost Explorer
        requests at roughly $0.60/month. Everything else — CloudFront, S3, Lambda,
        DynamoDB — lands in the cents at personal-site traffic.
      </p>
      <div className="note">
        <p>
          Reporting the cost of the reporting is the point. A system that cannot tell
          you what it costs is a system nobody is really operating.
        </p>
      </div>
    </section>

    <section>
      <h2>Read the code</h2>
      <p className="section-intro">Nothing on this page needs to be taken on trust.</p>
      <div className="actions">
        <a className="btn btn-primary" href={profile.repositories.automation}>
          Infrastructure and pipelines
        </a>
        <a className="btn" href={profile.repositories.site}>
          This site
        </a>
      </div>
    </section>
  </Layout>
);

export default PipelinePage;

export const Head = () => (
  <Seo
    title="How this site ships"
    pathname="/pipeline/"
    description="The architecture, pipeline, security decisions and running cost of this site — with live build metadata, uptime and AWS spend."
  />
);
