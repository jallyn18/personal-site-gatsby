import React from "react";
import { graphql, useStaticQuery } from "gatsby";

/**
 * Rendered inside each page's exported `Head`, which is Gatsby's built-in
 * head API — no react-helmet dependency needed.
 */
const Seo = ({ title, description, pathname }) => {
  const { site } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `);

  const meta = site.siteMetadata;
  const pageTitle = title ? `${title} · ${meta.title}` : meta.title;
  const pageDescription = description || meta.description;
  const canonical = pathname ? `${meta.siteUrl}${pathname}` : meta.siteUrl;

  return (
    <>
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <link rel="canonical" href={canonical} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:url" content={canonical} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta
        name="theme-color"
        content="#0d6f6f"
        media="(prefers-color-scheme: light)"
      />
      <meta name="theme-color" content="#0e1116" media="(prefers-color-scheme: dark)" />
    </>
  );
};

export default Seo;
