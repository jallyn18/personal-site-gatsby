/**
 * Skills, grouped.
 *
 * A flat wall of logos tells a reader nothing. Grouping by what the tool is
 * *for* shows you understand the problem space, not just the vendor list.
 *
 * Only list things you would be comfortable being asked about in an interview.
 */

const skills = [
  {
    group: "Infrastructure as Code",
    items: ["Terraform", "CloudFormation", "TODO: others"],
  },
  {
    group: "Configuration Management",
    items: ["Ansible", "TODO: others"],
  },
  {
    group: "CI/CD",
    items: ["GitHub Actions", "TODO: Jenkins? GitLab CI? Azure DevOps?"],
  },
  {
    group: "Cloud",
    items: ["AWS", "TODO: Azure? GCP? On-prem?"],
  },
  {
    group: "Languages",
    items: ["Python", "Bash", "TODO: Go? PowerShell?"],
  },
  {
    group: "Observability",
    items: ["CloudWatch", "TODO: Datadog? Prometheus? Grafana?"],
  },
];

/**
 * Certifications. Delete the array contents if you have none — the section
 * hides itself rather than showing an empty heading.
 */
export const certifications = [
  // { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2024" },
];

export default skills;
