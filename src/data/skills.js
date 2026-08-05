/**
 * Skills, grouped by what the tool is for rather than by vendor.
 *
 * Taken from the resume. Only things worth being questioned on in an interview.
 */

const skills = [
  {
    group: "VMware and private cloud",
    items: [
      "vSphere / ESXi",
      "vRealize Automation",
      "Cloud templates",
      "Service catalogs and approval policies",
      "vRealize Orchestrator",
      "vRealize Operations",
    ],
  },
  {
    group: "Automation and IaC",
    items: ["Terraform", "Ansible", "GitHub Actions", "GitOps", "Docker", "Kubernetes"],
  },
  {
    group: "Languages and scripting",
    items: ["Python", "PowerShell", "JavaScript"],
  },
  {
    group: "Integrations",
    items: [
      "ServiceNow",
      "Active Directory",
      "REST APIs",
      "RabbitMQ",
      "Event-driven CMDB workflows",
    ],
  },
  {
    group: "Platforms",
    items: ["RHEL", "Windows Server", "SQL Server", "Redis", "Elastic", "AWS", "Azure"],
  },
  {
    group: "Monitoring and observability",
    items: ["New Relic", "Splunk", "PagerDuty", "Prometheus", "Grafana"],
  },
  {
    group: "Practice",
    items: [
      "Spec-driven development",
      "AI-assisted delivery",
      "Code review",
      "Change management (ServiceNow)",
    ],
  },
];

/**
 * Certifications. The section hides itself while this is empty.
 * Format: { name: "...", issuer: "...", year: "2024" }
 */
export const certifications = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    year: "2024",
  },
];

export default skills;
