/**
 * Skills, grouped by what the tool is for rather than by vendor.
 *
 * Only things worth being questioned on in an interview.
 */

const skills = [
  {
    group: "Infrastructure as Code",
    items: ["Terraform", "Ansible"],
  },
  {
    group: "CI/CD and version control",
    items: ["GitHub Actions", "GitHub", "Pull-request workflows"],
  },
  {
    group: "Platforms",
    items: ["On-premises private cloud", "RHEL", "AWS"],
  },
  {
    group: "Languages",
    items: ["Python", "Bash"],
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
export const certifications = [];

export default skills;
