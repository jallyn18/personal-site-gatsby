# CLAUDE.md — personal-site-gatsby

Gatsby source for https://jon-allyn.com. The infrastructure that hosts it lives in
`jallyn18/personal-site-automation`, along with the spec and plan for the system as
a whole:

- `specs/001-personal-site/spec.md` — what the site is required to do
- `specs/001-personal-site/plan.md` — why it is built this way

Requirement numbers referenced below (`FR-4`, `NFR-6`, and so on) are from that
spec.

---

## The content rule

**Do not invent facts about Jon's career.** Not dates, not employers, not project
details, not metrics. This is FR-4 and it is not a style preference — the site's
entire argument is that the claims on it are verifiable. A plausible invented
detail is worse than a gap, because it is indistinguishable from the true ones
until someone checks.

Where a fact is unknown, leave a `TODO:` marker in the data file. There are real
ones in `src/data/experience.js` and `src/data/projects.js` right now, and they are
tracked as OQ-1. They are meant to be conspicuous. Do not "tidy" them into
something that reads as finished.

The same applies to the live panels: an empty DynamoDB table renders "no data yet",
never a placeholder number (FR-13).

## Layout

```
src/data/          all content as plain objects -- edit here, not in components
  profile.js       name, headline, links, location
  experience.js    roles (contains TODO markers)
  projects.js      project write-ups (contains TODO markers)
  skills.js        grouped skill lists
src/pages/
  index.js         landing
  working-with-ai.js   the lead position (FR-2) -- see below
  pipeline.js      how this site ships, and the commit being served (FR-6)
  projects.js  resume.js  404.js
src/components/
  layout.js  seo.js
  build-info.js       build metadata panel (FR-9)
  live-metrics.js     visits, uptime, cost -- fetches /api/* (FR-10..12)
  architecture-diagram.js
gatsby-config.js   siteMetadata, reads SITE_URL and GITHUB_* from the environment
gatsby-node.js     explicit GraphQL schema -- read the comment before touching
scripts/           local deploy helper
tests/             node --test
```

**Content changes go in `src/data/`.** If a content edit requires touching a
component, the component is under-parameterised — fix that instead.

## `working-with-ai.js` needs its counterweight

This page leads with Jon leading a team that produces 100% of its code with AI
under spec-driven development. It also contains an explicit "what I do not claim"
section, and that section is load-bearing (FR-3). The audience for this page
includes engineers who are sceptical of exactly this claim; an unqualified version
reads as either naive or dishonest to them. Do not cut it for length.

## How the site learns where it lives

Nothing about the deploy target is hardcoded. The workflow reads three SSM
parameters written by Terraform, then builds with `SITE_URL` set from
`/personal-site/site_url`:

```
/personal-site/site_bucket        S3 bucket
/personal-site/distribution_id    CloudFront distribution
/personal-site/site_url           public URL -> SITE_URL at build time
```

`siteUrl` feeds canonical tags and the sitemap, so **it is baked in at build
time.** A change to the URL in Terraform is not live on the site until the site is
rebuilt — that is why enabling the custom domain required a redeploy even though
no site source changed.

`GITHUB_SHA` and friends come from the Actions environment and are what
`/pipeline/` displays.

## Gotchas

- **`gatsby-node.js` declares the `siteMetadata` schema explicitly, on purpose.**
  Gatsby infers GraphQL types from observed values, and the `GITHUB_*` fields are
  null outside Actions — an inferred schema drops them locally and the build-info
  query fails with "Cannot query field". Adding a build variable means adding it to
  `createSchemaCustomization` too, or the build breaks in exactly one environment.
- **The deploy does two S3 passes.** Content-hashed assets get
  `max-age=31536000,immutable`; HTML, `page-data/*`, JSON, XML, text and `sw.js`
  get `max-age=0,must-revalidate`. Collapsing this into one pass leaves visitors
  on the previous deploy until their browser cache expires.
- **The deploy verifies itself.** After invalidating, it fetches
  `${SITE_URL}/pipeline/` and fails the run unless the short SHA appears, retrying
  five times (NFR-6). Do not remove this to make a run pass — if it fails, the
  deploy genuinely did not land.
- **`/api/*` is same-origin** through CloudFront. There is no CORS setup because
  there is no cross-origin request. Do not add a second hostname or point fetches
  at the Lambda Function URL directly — it returns 403 to unsigned callers by
  design.
- **No third-party scripts.** No analytics, no fonts from a CDN, no embeds. The
  visit counter is the entire tracking appetite (spec §6).
- **No contact address at `jon-allyn.com`.** The domain publishes a null MX and
  `v=spf1 -all`, so mail to it bounces by design (NFR-5). Adding a `mailto:` at
  that domain produces a contact link that silently fails.
- **`::add-mask::` filters logs, not step summaries**, and only in the job that
  registers it. The deploy masks the account id because the bucket name embeds
  it and `aws s3 sync` prints the bucket on every object. Do not add the bucket
  to `$GITHUB_STEP_SUMMARY`. This repository is public, so its logs are too.

## Working here

```bash
npm ci
npm run develop         # http://localhost:8000 -- SITE_URL defaults to localhost
npm run build           # production build into public/
npm run lint
npm run format:check
npm test
```

The live panels will show empty states locally — `/api/*` does not exist on the dev
server. That is the correct behaviour to check, not a bug to work around.

Develop on a feature branch, open a PR, let the checks run. A push to `main`
deploys to production.
