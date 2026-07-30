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
   * There is deliberately no email here, and an address at jon-allyn.com is not
   * an option: the domain publishes a null MX record and `v=spf1 -all`, so it
   * rejects mail by design (spec NFR-5, terraform/dns.tf). Mail sent to
   * anything@jon-allyn.com bounces.
   *
   * If you want a written contact channel, the choices are an address on a
   * domain that does accept mail, or LinkedIn. Adding one here looks like:
   *   { label: "Email", href: "mailto:...", handle: "...", primary: true }
   *
   * Leaving it at LinkedIn is the consistent answer, and it keeps a personal
   * address off a page that harvesters read.
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
