# personal-site-gatsby

The site itself. Infrastructure and pipelines live in
[`personal-site-automation`](https://github.com/jallyn18/personal-site-automation).

A static Gatsby build published to S3 and served through CloudFront. The
interesting part is `/pipeline/`, which reports the site's own build metadata,
uptime, and AWS bill — the commit shown on that page is the commit that produced
the page.

## Editing content

All copy lives in `src/data/`. Editing those files changes the site; no
component needs to be touched.

| File                     | Holds                                       |
| ------------------------ | ------------------------------------------- |
| `src/data/profile.js`    | Name, title, tagline, summary, links        |
| `src/data/experience.js` | Work history and education                  |
| `src/data/projects.js`   | Case studies (problem / approach / outcome) |
| `src/data/skills.js`     | Skill groups and certifications             |

Fields marked `TODO:` are placeholders. Sections whose data array is empty —
certifications, education — hide themselves rather than rendering an empty
heading.

To add a resume PDF, drop it at `static/resume.pdf`. The download button appears
automatically; set `resumePdf: null` in `profile.js` to hide it.

## Local development

```bash
npm install
npm run develop      # http://localhost:8000
```

```bash
npm run build        # production build into public/
npm run serve        # serve the built output
npm test             # unit tests for the formatting helpers
npm run lint         # eslint
npm run format       # prettier, writes
npm run format:check # prettier, checks only
```

The `/api/*` endpoints do not exist locally — they are served by a Lambda behind
CloudFront in production. Every panel that reads them degrades to a placeholder,
so `gatsby develop` renders the full site without an AWS account.

## Build metadata

`gatsby-config.js` reads the `GITHUB_*` variables present in the Actions runner
and puts them in `siteMetadata.buildInfo`, which `src/components/build-info.js`
queries. Outside CI those variables are absent, so the panel says "local build"
rather than inventing a commit.

Because the values are captured at build time rather than fetched later, the
commit shown cannot disagree with the bytes it is printed on.

`gatsby-node.js` declares the GraphQL types for those fields explicitly. Gatsby
infers types from observed values, and the CI-only fields are `null` locally —
without the explicit schema the build would work in Actions and fail on a
laptop.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`:

1. Assume an AWS role via OIDC. No access keys are stored in this repository.
2. Read the bucket name, distribution id, and site URL from SSM Parameter Store
   — all Terraform outputs, so nothing about the infrastructure is duplicated
   here.
3. Build with the commit metadata injected.
4. Sync to S3 in two passes: content-hashed assets get
   `max-age=31536000, immutable`; HTML and page data get
   `max-age=0, must-revalidate` so a visitor is never served the previous
   deploy.
5. Invalidate the distribution and wait for it to complete.
6. Fetch the live URL and assert the new commit is actually being served. A
   deploy that cannot prove it worked fails.

Pull requests run `.github/workflows/ci.yml`, which has no AWS access at all:
format check, lint, build, tests, and an assertion that the expected pages were
emitted.

### Required repository variable

| Variable              | Value                                                       |
| --------------------- | ----------------------------------------------------------- |
| `AWS_DEPLOY_ROLE_ARN` | `terraform output deploy_role_arn` from the automation repo |

It is a variable rather than a secret because a role ARN is not sensitive — the
trust policy is what grants access, and it names this repository and branch.

## Notes on the build

- **No CSS framework.** The site is a few pages of text and tables; a utility
  framework or CSS-in-JS runtime would add weight and hydration cost for nothing
  a visitor could perceive. One stylesheet, custom properties, light and dark.
- **System fonts.** The Content-Security-Policy blocks external font hosts, and
  self-hosting a webfont would cost more render time than it buys.
- **The architecture diagram is hand-written SVG.** A client-side renderer like
  Mermaid would have to be bundled and executed on every page load to draw a
  picture that never changes.
- **Trailing slashes everywhere.** This has to agree with the CloudFront
  function that rewrites extensionless paths to `index.html`; changing one means
  changing the other.
