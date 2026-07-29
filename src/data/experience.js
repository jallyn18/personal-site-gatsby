/**
 * Work history.
 *
 * Highlights describe outcomes, not duties. Fields marked TODO are ones I
 * could not fill in for you — dates, and the employers for the earlier roles.
 * Swap "Large automotive manufacturer" for the real name if you are comfortable
 * naming it; a named employer is worth more to a recruiter than a category.
 */

const experience = [
  {
    role: "Lead Systems Engineer",
    company: "Large automotive manufacturer",
    location: "TODO: City, State (or Remote)",
    start: "TODO: 20XX",
    end: "Present",
    summary:
      "Automation and infrastructure as code for on-premises data center infrastructure. I lead a team that develops 100% of its code with AI using spec-driven development.",
    highlights: [
      "Replaced manual DNS record management with an infrastructure-as-code workflow integrated with ServiceNow, taking human-error incidents to near zero and making every change peer-reviewable.",
      "Built tag automation linking workloads and components to workforce-management portfolios and teams, giving security and incident response reliable ownership data instead of a hunt.",
      "Automated six-year hardware refresh financial forecasting, cutting a process that took weeks down to days.",
      "Lead the team's move to spec-driven, AI-assisted development, where the specification and the review carry the engineering rather than the typing.",
    ],
    stack: ["Terraform", "Ansible", "Python", "GitHub Actions", "RHEL", "ServiceNow"],
  },
  {
    role: "TODO: title — data center compute",
    company: "TODO: Company",
    location: "TODO: City, State",
    start: "TODO: 20XX",
    end: "TODO: 20XX",
    summary:
      "Managed large-scale compute in data centers, moving from operating infrastructure by hand toward operating it through code.",
    highlights: [
      "TODO: An outcome from this role — scale you were responsible for, a migration you ran, a process you replaced.",
    ],
    stack: ["TODO: what you actually used here"],
  },
  {
    role: "TODO: title — internal IT",
    company: "TODO: Company",
    location: "TODO: City, State",
    start: "TODO: 20XX",
    end: "TODO: 20XX",
    summary:
      "Where the scripting habit started: automating the repetitive parts of internal IT rather than repeating them.",
    highlights: [
      "TODO: Optional. Roles this far back can be a single line, or dropped entirely.",
    ],
    stack: ["Bash", "Python"],
  },
];

/**
 * Education. The section hides itself while this is empty.
 * Format: { credential: "B.S. ...", institution: "...", year: "20XX" }
 */
export const education = [];

export default experience;
