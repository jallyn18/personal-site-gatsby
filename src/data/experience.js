/**
 * Work history.
 *
 * Every fact here comes from the resume — roles, employers, dates, and the
 * highlights, which describe outcomes rather than duties.
 *
 * TODO: per-role locations. The resume does not state them, and guessing them
 * would be inventing a fact (FR-4), so they are left empty and the page omits
 * them. Fill them in if you want them shown; recruiters do filter on location.
 */

const experience = [
  {
    role: "Sr. Systems Engineer → Lead Systems Engineer",
    company: "Cox Automotive",
    location: "",
    start: "May 2019",
    end: "Present",
    summary:
      "Architecting and automating a self-service private cloud platform across multiple datacenters. I lead a team that develops 100% of its code with AI using spec-driven development.",
    highlights: [
      "Architected and automated server provisioning for environments spanning multiple datacenters with more than 1,000 hosts, replacing manual build processes with declarative, repeatable pipelines.",
      "Instantiated a self-service private cloud platform on vRealize Automation — the direct predecessor to VMware Cloud Foundation Automation — letting internal customers provision virtual machine workloads on demand.",
      "Authored custom cloud templates, catalog items with approval policies, and vRealize Orchestrator workflows to extend the platform beyond its out-of-the-box capability.",
      "Adopted event-driven solutions for workload and component tracking in a CMDB, keeping ownership and portfolio metadata accurate without manual upkeep.",
      "Lead multiple projects on automation maturation — infrastructure as code, immutability, GitOps — and established the standards, reusable patterns and documentation other engineers build on.",
      "Lead a team that develops 100% of its code with AI, specification-first, backed by automated testing, type checking, security scanning and drift detection.",
    ],
    stack: [
      "Terraform",
      "Ansible",
      "Python",
      "PowerShell",
      "GitHub Actions",
      "vSphere",
      "vRealize Automation",
      "vRealize Orchestrator",
    ],
  },
  {
    role: "Sr. Systems Engineer → Lead Systems Engineer",
    company: "MyWebGrocer",
    location: "",
    start: "August 2017",
    end: "May 2019",
    summary:
      "Reliability engineering for high-transaction workloads across primary and DR datacenters.",
    highlights: [
      "Worked with development teammates to establish SRE practices for system reliability and performance, and developed KPIs measuring reliability against customer SLAs.",
      "Leveraged Prometheus and Grafana for observability in both the private cloud and Azure.",
      "Managed compute (Dell) and storage (EMC) configurations supporting high-transaction OLTP workloads across primary and DR datacenters.",
    ],
    stack: ["Prometheus", "Grafana", "Azure", "Dell", "EMC"],
  },
  {
    role: "IT Systems Engineer",
    company: "Dealer.com",
    location: "",
    start: "Apr 2013",
    end: "August 2017",
    summary:
      "Corporate IT datacenters and applications, across primary on-site and DR locations.",
    highlights: [
      "Administered Microsoft Active Directory, Exchange and DNS, plus developer tooling including Atlassian Confluence and Jira.",
      "Contributed to workload consolidation and migration projects, domain migrations, and campus networking projects.",
    ],
    stack: ["Active Directory", "Exchange", "DNS", "Confluence", "Jira"],
  },
];

/**
 * Education. The section hides itself while this is empty.
 * Format: { credential: "B.S. ...", institution: "...", year: "20XX" }
 */
export const education = [
  {
    credential: "B.S. Computer Networking and Information Security",
    institution: "Champlain College, Burlington VT",
    year: "2007–2011",
  },
];

export default experience;
