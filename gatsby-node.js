/**
 * Explicit schema for siteMetadata.
 *
 * Gatsby infers GraphQL types from the values it sees at build time. The
 * GITHUB_* build variables are null outside Actions, so an inferred schema
 * would drop those fields locally and the build-info query would fail with
 * "Cannot query field" — a build that works in CI and breaks on a laptop, or
 * the reverse.
 *
 * Declaring the types makes the nullability intentional and the build
 * environment-independent.
 */

exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type SiteSiteMetadata {
      title: String!
      description: String!
      siteUrl: String!
      buildInfo: SiteSiteMetadataBuildInfo!
    }

    type SiteSiteMetadataBuildInfo {
      commit: String!
      commitShort: String!
      branch: String!
      repository: String!
      builtAt: String!
      ci: Boolean!

      # Only present when the build ran in GitHub Actions.
      runNumber: String
      runId: String
      workflow: String
      actor: String
    }
  `);
};
