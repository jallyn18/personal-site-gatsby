/**
 * Project case studies: problem, approach, outcome.
 *
 * The TODO lines inside `approach` are prompts, not placeholders — each entry
 * reads fine without them. They mark the one detail that would take the write-up
 * from credible to specific, which is what an interviewer will dig into anyway.
 */

const projects = [
  {
    slug: "dns-as-code",
    title: "DNS records as code, wired to change management",
    blurb:
      "Turned manual DNS clickops into a peer-reviewed pull request, with ServiceNow change records kept in step.",
    featured: true,
    year: "TODO: 20XX",
    stack: ["Terraform", "Python", "GitHub Actions", "ServiceNow"],
    problem:
      "DNS records were managed by hand. Every change was a click somebody made in a console — no review, no diff, no durable record of why. At data center scale that is a dependable source of incidents: one mistyped record and something stops resolving, and the first job is working out what changed and who changed it.",
    approach: [
      "Moved record definitions into version-controlled code, so a change becomes a pull request: reviewable, diffable, and attributable before it reaches production rather than after it breaks something.",
      "Integrated the workflow with ServiceNow so the change management record and the code change stay in step, instead of being two systems describing the same event in different words.",
      "TODO: worth adding — how the pipeline validates records before applying them, and what happens when a bad change gets through.",
    ],
    outcome:
      "Human-error incidents from DNS changes dropped to near zero. Every record now has an author, a reviewer, and a history.",
    links: [],
  },
  {
    slug: "ownership-tagging",
    title: "Ownership metadata that maintains itself",
    blurb:
      "Automated tagging linking workloads and components to the teams and portfolios that actually own them.",
    featured: true,
    year: "TODO: 20XX",
    stack: ["Python", "Ansible", "GitHub Actions"],
    problem:
      "When a vulnerability lands or a service breaks, the first question is who owns this. Answering it from a spreadsheet or from memory costs time in exactly the situation where time is most expensive — and the answer goes stale the moment somebody reorganizes.",
    approach: [
      "Built automation linking workloads and their components to workforce management portfolios and teams, so ownership is a property of the resource rather than a document describing it.",
      "Because the mapping is generated rather than hand-maintained, it stays correct as teams and portfolios shift underneath it.",
      "TODO: worth adding — what the source of truth is, and where the tags land.",
    ],
    outcome:
      "Security and incident response read ownership directly off the resource. The mapping became integral to how both teams work.",
    links: [],
  },
  {
    slug: "refresh-forecasting",
    title: "Six-year hardware refresh forecasting",
    blurb:
      "Automated the financial forecast behind hardware refresh planning, cutting a multi-week process to days.",
    featured: true,
    year: "TODO: 20XX",
    stack: ["Python"],
    problem:
      "Hardware refresh planning runs on a six-year horizon and feeds real budget decisions. Assembling that forecast by hand took weeks, which made it slow to produce and expensive to revise.",
    approach: [
      "Automated the data collection and modelling behind the forecast so it can be regenerated on demand rather than reassembled from scratch each time.",
      "TODO: worth adding — what the inputs are, what the model accounts for, and who consumes the output.",
    ],
    outcome:
      "A process that took weeks now takes days, and revising an assumption costs a re-run instead of a rewrite.",
    links: [],
  },
  {
    slug: "this-site",
    title: "This site",
    blurb:
      "A static site on AWS that reports its own uptime, its own build metadata, and its own monthly bill.",
    // Not featured on the home page: three work case studies fill the grid
    // cleanly, and this one is already reachable from the nav and the AI section.
    featured: false,
    year: "2026",
    stack: ["Terraform", "AWS", "GitHub Actions", "Python", "Gatsby"],
    problem:
      "My day job is on-premises, and the IaC discipline that matters there — review, drift detection, least privilege, knowing what things cost — is the same discipline public cloud rewards. A resume can claim that. It cannot show you the commit history, the failing test, or the bill.",
    approach: [
      "Two repositories: one for the site, one for the infrastructure carrying it. They communicate through SSM Parameter Store rather than duplicated configuration, so renaming a bucket does not mean editing two repos.",
      "Terraform provisions a private S3 origin behind CloudFront, with the JSON API mounted on the same distribution as a Lambda Function URL — same-origin requests, no CORS, no API Gateway.",
      "GitHub Actions authenticates with OIDC. There are no AWS access keys in either repository, and the site repo's role can write one bucket and invalidate one distribution — nothing else.",
      "Scheduled Lambdas probe the public URL and snapshot Cost Explorer, so the site can serve its own operational data.",
    ],
    outcome:
      "Every claim on the pipeline page is checkable against two public repositories. Running cost is roughly $1–2/month, and the site will tell you the current figure itself.",
    links: [
      {
        label: "Infrastructure repo",
        href: "https://github.com/jallyn18/personal-site-automation",
      },
      {
        label: "Site repo",
        href: "https://github.com/jallyn18/personal-site-gatsby",
      },
      { label: "How it ships", href: "/pipeline/", internal: true },
    ],
  },
];

export default projects;
