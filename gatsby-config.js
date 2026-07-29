/**
 * Build metadata is captured here, at build time, from the environment the
 * build actually ran in. GitHub Actions populates the GITHUB_* variables; a
 * local `gatsby develop` falls back to placeholders so the panel still renders.
 *
 * This is what makes the "how this shipped" panel honest rather than decorative:
 * the commit shown on the page is the commit that produced the page.
 */

const shortSha = (sha) => (sha ? sha.slice(0, 7) : "local");

const buildInfo = {
  commit: process.env.GITHUB_SHA || "local",
  commitShort: shortSha(process.env.GITHUB_SHA),
  branch: process.env.GITHUB_REF_NAME || "local",
  repository: process.env.GITHUB_REPOSITORY || "jallyn18/personal-site-gatsby",
  runNumber: process.env.GITHUB_RUN_NUMBER || null,
  runId: process.env.GITHUB_RUN_ID || null,
  workflow: process.env.GITHUB_WORKFLOW || null,
  actor: process.env.GITHUB_ACTOR || null,
  builtAt: new Date().toISOString(),
  // A build outside Actions is a local preview, and the panel says so.
  ci: Boolean(process.env.GITHUB_ACTIONS),
};

// The deploy workflow reads this from SSM and passes it in, so the sitemap and
// canonical URLs are correct without hardcoding the domain in the repository.
const siteUrl = (process.env.SITE_URL || "http://localhost:8000").replace(/\/$/, "");

module.exports = {
  siteMetadata: {
    title: "TODO: Your Name",
    description:
      "TODO: One-sentence description used for search results and link previews.",
    siteUrl,
    buildInfo,
  },

  // Trailing slashes everywhere keeps the CloudFront index.html rewrite and the
  // S3 key layout in agreement. Changing this means changing the edge function.
  trailingSlash: "always",

  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: ["/404/", "/404.html"],
      },
    },
  ],

  flags: {
    DEV_SSR: false,
  },
};
