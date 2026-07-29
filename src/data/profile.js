/**
 * Identity and contact details.
 *
 * Everything a visitor reads lives in src/data/. Editing this file changes the
 * site; no component needs to be touched.
 *
 * Fields marked TODO are placeholders awaiting real content.
 */

const profile = {
  name: "TODO: Your Name",
  // Shown under the name in the hero and used as the page title suffix.
  title: "Automation Engineer",
  // One line. This is the sentence a recruiter reads before deciding to scroll.
  tagline: "TODO: I build the systems that build the systems.",
  location: "TODO: City, State",

  /**
   * Two or three short paragraphs. Written in first person, no buzzword salad.
   * Answer: what do you automate, for whom, and what changes when you do?
   */
  summary: [
    "TODO: Opening paragraph. What you do and the kind of problem you take on.",
    "TODO: Second paragraph. How you work, what you have built, what you care about.",
  ],

  /**
   * Public links. Set `primary: true` on the ones worth putting in the header.
   * Remove any entry you do not want; nothing else references them by name.
   */
  links: [
    {
      label: "GitHub",
      href: "https://github.com/jallyn18",
      handle: "@jallyn18",
      primary: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/TODO",
      handle: "TODO",
      primary: true,
    },
    {
      label: "Email",
      href: "mailto:TODO@example.com",
      handle: "TODO@example.com",
      primary: true,
    },
  ],

  /**
   * Optional. Drop a PDF at static/resume.pdf and this button appears.
   * Set to null to hide it.
   */
  resumePdf: "/resume.pdf",

  /**
   * The two repositories behind this site. Shown on the pipeline page so a
   * visitor can read the code rather than take the diagram on faith.
   */
  repositories: {
    site: "https://github.com/jallyn18/personal-site-gatsby",
    automation: "https://github.com/jallyn18/personal-site-automation",
  },
};

export default profile;
