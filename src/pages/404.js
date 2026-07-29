import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <div className="center-narrow">
      <p className="eyebrow">404</p>
      <h1>That page does not exist</h1>
      <p className="lede">
        The link may be stale, or the URL slightly off. Nothing is broken — CloudFront
        returned this page deliberately.
      </p>

      <div className="actions">
        <Link className="btn btn-primary" to="/">
          Go home
        </Link>
        <Link className="btn" to="/projects/">
          Projects
        </Link>
        <Link className="btn" to="/resume/">
          Resume
        </Link>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;

export const Head = () => <Seo title="Not found" pathname="/404/" />;
