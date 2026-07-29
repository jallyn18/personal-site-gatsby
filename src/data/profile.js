/**
 * Identity and contact details.
 *
 * Everything a visitor reads lives in src/data/. Editing this file changes the
 * site; no component needs to be touched.
 */

const profile = {
  name: "Jon Allyn",
  title: "Lead Systems Engineer",
  tagline:
    "I turn infrastructure clickops into peer-reviewable code. My team now writes 100% of it with AI, spec first.",
  // TODO: add if you want it public — recruiters filter on location.
  location: "",

  summary: [
    "I automate on-premises data center infrastructure for a large automotive manufacturer. At this scale a manual process is not just slow — it is an outage with a delay on it. Most of my job is converting things people click into things people review.",
    // The AI story deliberately lives in its own section on the home page
    // rather than here, so the two do not say the same thing twice.
    "I got here sideways. I started scripting fixes in internal IT, moved into running large-scale compute in data centers, and now I write the code that runs it instead of running it by hand. The through-line is a low tolerance for work a machine should be doing.",
  ],

  /**
   * Public links. `primary: true` puts them in the header actions and footer.
   *
   * There is deliberately no email here. If you want one, add:
   *   { label: "Email", href: "mailto:you@jon-allyn.com", handle: "you@jon-allyn.com", primary: true }
   * A domain-based address is worth the five minutes; a resume site with no way
   * to start a conversation makes a recruiter work harder than they will.
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
      href: "https://www.linkedin.com/in/jon-allyn-08263141/",
      handle: "jon-allyn",
      primary: true,
    },
  ],

  /**
   * Drop a PDF at static/resume.pdf and set this to "/resume.pdf" to show the
   * download button. Left null so the button does not 404.
   */
  resumePdf: null,

  repositories: {
    site: "https://github.com/jallyn18/personal-site-gatsby",
    automation: "https://github.com/jallyn18/personal-site-automation",
  },
};

export default profile;
