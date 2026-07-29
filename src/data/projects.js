/**
 * Project case studies.
 *
 * The structure is deliberately problem / approach / outcome rather than a
 * feature list. A hiring manager skimming this wants to know whether you can
 * identify a real problem and finish something, not which flags you passed to
 * terraform apply.
 *
 * Three strong entries beat eight thin ones. `featured: true` surfaces an entry
 * on the home page.
 */

const projects = [
  {
    slug: "this-site",
    title: "This site",
    // Shown in the card; one sentence, no marketing voice.
    blurb:
      "A static site on AWS that reports its own uptime, its own build metadata, and its own monthly bill.",
    featured: true,
    year: "2026",
    stack: ["Terraform", "AWS", "GitHub Actions", "Python", "Gatsby"],
    problem:
      "A resume claims you can build infrastructure. It cannot show the commit history, the failing test, or the cost of the thing you built.",
    approach: [
      "Two repositories: one for the site, one for the infrastructure that carries it. They communicate through SSM Parameter Store rather than duplicated configuration.",
      "Terraform provisions a private S3 origin behind CloudFront, with the JSON API mounted on the same distribution as a Lambda Function URL — same-origin requests, no CORS, no API Gateway.",
      "GitHub Actions authenticates with OIDC. There are no AWS access keys in either repository.",
      "Scheduled Lambdas probe the public URL and snapshot Cost Explorer, writing to DynamoDB so the site can serve its own operational data.",
    ],
    outcome:
      "Every claim on the pipeline page is checkable against the two public repositories. Running cost is roughly $1–2/month.",
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
  {
    slug: "todo-project-two",
    title: "TODO: Project title",
    blurb: "TODO: One sentence a stranger would understand.",
    featured: true,
    year: "TODO",
    stack: ["TODO"],
    problem: "TODO: What was broken, and who was hurting because of it?",
    approach: [
      "TODO: What you built, and the interesting decision you made along the way.",
      "TODO: A tradeoff you took deliberately.",
    ],
    outcome: "TODO: What changed. Numbers if you have them.",
    links: [],
  },
  {
    slug: "todo-project-three",
    title: "TODO: Project title",
    blurb: "TODO: One sentence.",
    featured: false,
    year: "TODO",
    stack: ["TODO"],
    problem: "TODO",
    approach: ["TODO"],
    outcome: "TODO",
    links: [],
  },
];

export default projects;
