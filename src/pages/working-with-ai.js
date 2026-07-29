import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import Seo from "../components/seo";

/**
 * The delivery-model page.
 *
 * Written to survive a skeptical senior engineer reading it. The claim "we
 * write 100% of our code with AI" invites exactly one question — how do you
 * know it works — so the page answers that question before it is asked, and
 * points at the pipeline page as the worked example.
 */
const WorkingWithAiPage = () => (
  <Layout>
    <h1>Working with AI</h1>
    <p className="lede">
      I lead a team that develops 100% of its code with AI, working spec first. That is
      a change in where the engineering happens, not a shortcut — and it only holds up
      because the verification underneath it is serious.
    </p>

    <section>
      <h2>Spec first, code second</h2>
      <p>
        The failure mode of AI-assisted development is prompting your way toward
        something that looks finished. You get working code fast, and you find out later
        that nobody ever decided what it was supposed to do.
      </p>
      <p>
        Spec-driven development puts that decision first. The specification is the
        artifact the team argues about: what the thing does, what it must not do, what
        the edges are, what done looks like. Once that is settled, generating the
        implementation is comparatively cheap — and if the implementation is wrong, you
        have something concrete to check it against.
      </p>
      <p>
        {/* TODO: this is the single highest-value thing to add. */}
        <em>
          TODO: describe what a spec looks like on your team — where it lives, who
          writes it, how much detail it carries, and how you know it is ready to build
          from.
        </em>
      </p>
    </section>

    <section>
      <h2>The bottleneck moved, it did not disappear</h2>
      <p>
        When generation gets cheap, review becomes the constraint. A team that can
        produce five times the code and review it at the old rate has not got faster —
        it has built a queue.
      </p>
      <p>
        So the interesting work is in making review fast and making it trustworthy:
        small changes, tests that actually assert behaviour rather than restating the
        implementation, linting and type checking that catch the boring class of error
        before a human ever looks, and CI that fails loudly. None of that is new
        practice. AI just raises the price of not having it.
      </p>
      <p>
        {/* TODO: concrete detail here is worth more than the general argument above. */}
        <em>
          TODO: how does your team handle review volume? Pair review, review rotations,
          automated gates before human review — whatever it actually is.
        </em>
      </p>
    </section>

    <section>
      <h2>What I do not claim</h2>
      <p>
        AI does not know what your organisation needs. It does not know that the
        change-management system is the real constraint, that one team owns the thing
        nobody documented, or that the obvious design fails at your scale for a reason
        you learned the hard way three years ago. Judgement about what to build, and
        whether it worked, stays with people.
      </p>
      <p>
        It also does not remove accountability. If code I own breaks production,
        &ldquo;the model wrote it&rdquo; is not a finding — it is an admission that
        nobody reviewed it.
      </p>
    </section>

    <section>
      <h2>The worked example</h2>
      <p>
        This site and the infrastructure carrying it were built this way. Rather than
        take that on faith, you can read both repositories and check the verification
        for yourself: unit tests against mocked AWS, linting and type checking in CI,
        IaC and dependency scanning, drift detection that opens an issue when the live
        account stops matching the code, and a deploy that fetches the live URL and
        refuses to report success until the new commit is actually being served.
      </p>
      <p>
        That is the part that makes the delivery model defensible. Generating code
        quickly is not interesting on its own; being able to prove the generated code
        does what you said it would is.
      </p>

      <div className="actions">
        <Link className="btn btn-primary" to="/pipeline/">
          See how this site ships
        </Link>
      </div>
    </section>
  </Layout>
);

export default WorkingWithAiPage;

export const Head = () => (
  <Seo
    title="Working with AI"
    pathname="/working-with-ai/"
    description="Leading a team that develops 100% of its code with AI using spec-driven development — and the verification that makes it defensible."
  />
);
