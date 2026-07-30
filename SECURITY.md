# Security

This repository is the Gatsby source for <https://jon-allyn.com>. The
infrastructure that hosts it, and the security posture of the running system,
live in [`jallyn18/personal-site-automation`](https://github.com/jallyn18/personal-site-automation).

## Reporting a vulnerability

Use GitHub's **private vulnerability reporting** on this repository: _Security_ →
_Report a vulnerability_.

Please do not open a public issue for anything exploitable.

**There is no security@ address, and that is deliberate.** The `jon-allyn.com`
domain publishes a null MX record (RFC 7505) and `v=spf1 -all` — it sends and
receives no mail by design, so any address there would bounce.

For anything about IAM, CloudFront, DNS, the `/api/*` Lambda or the deploy
pipeline's AWS access, report it on the automation repository instead — that is
where the code lives and where the `SECURITY.md` covering it is.

## In scope here

- The built site: markup, client-side JavaScript, dependencies
- The `deploy` and `ci` workflows in this repository
- Anything in the built output that leaks information it should not

## Out of scope

- The `TODO:` markers in `src/data/` — those are known missing content, tracked
  as OQ-1 in the automation repository's spec, not a defect
- Absence of a contact email. See above; the domain accepts no mail on purpose
- Missing third-party analytics, tag managers or consent banners. There are no
  third-party scripts at all, by design (spec §6)
- Volumetric denial of service against a static site behind CloudFront

## Intentional, not findings

| Observation                                                              | Why                                                                                                                                                                         |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/*` is called with no authentication and no CORS headers            | It is same-origin through CloudFront. There is no cross-origin request to configure, and nothing behind it is private — a visit counter, an uptime figure and a cost figure |
| The visit counter can be incremented by anyone                           | It counts visits. The dedupe is a salted, non-reversible fingerprint with a TTL, so the tradeoff is deliberate: a slightly gameable number rather than tracking people      |
| Build metadata (commit SHA, branch, run id) is published on `/pipeline/` | That is the entire point of the page. The repository is public; the commit is not a secret                                                                                  |
