import React from "react";

/**
 * Inline SVG rather than a diagramming library.
 *
 * The Content-Security-Policy on the distribution blocks external scripts, so a
 * client-side renderer like Mermaid would need to be bundled and then executed
 * on every page load to draw a picture that never changes. This is ~4KB of
 * markup that themes itself from the same CSS custom properties as the rest of
 * the page and costs nothing at runtime.
 */

const BOX = {
  fill: "var(--bg-subtle)",
  stroke: "var(--border-strong)",
  strokeWidth: 1,
  rx: 6,
};

const GROUP = {
  fill: "none",
  stroke: "var(--border)",
  strokeWidth: 1,
  strokeDasharray: "4 3",
  rx: 8,
};

const Box = ({ x, y, w, h, title, sub, accent }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      {...BOX}
      stroke={accent ? "var(--accent)" : BOX.stroke}
    />
    <text
      x={x + w / 2}
      y={sub ? y + h / 2 - 5 : y + h / 2 + 4}
      textAnchor="middle"
      fontSize="13"
      fontWeight="600"
      fill="var(--text)"
    >
      {title}
    </text>
    {sub ? (
      <text
        x={x + w / 2}
        y={y + h / 2 + 14}
        textAnchor="middle"
        fontSize="11"
        fill="var(--text-muted)"
      >
        {sub}
      </text>
    ) : null}
  </g>
);

const Label = ({ x, y, children, anchor = "start" }) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontSize="10"
    fontWeight="600"
    letterSpacing="0.08em"
    fill="var(--text-faint)"
  >
    {children}
  </text>
);

const EdgeLabel = ({ x, y, children }) => (
  <text
    x={x}
    y={y}
    textAnchor="middle"
    fontSize="11"
    fontFamily="var(--font-mono)"
    fill="var(--accent-text)"
  >
    {children}
  </text>
);

const ArchitectureDiagram = () => (
  <div className="diagram-scroll">
    <svg
      viewBox="0 0 860 620"
      role="img"
      aria-labelledby="arch-title arch-desc"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title id="arch-title">Request and data flow for this site</title>
      <desc id="arch-desc">
        Visitors reach a CloudFront distribution over HTTPS. Requests for pages are
        served from a private S3 bucket; requests to /api/ are served by a Lambda
        Function URL. Both origins are private and reached through Origin Access
        Control. The Lambda reads and writes a DynamoDB table. Two EventBridge-scheduled
        Lambdas populate that table: an uptime probe that fetches the public URL every
        five minutes, and a daily collector that queries the Cost Explorer API.
      </desc>

      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-strong)" />
        </marker>
        <marker
          id="arrow-accent"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
        </marker>
      </defs>

      <g
        stroke="var(--border-strong)"
        strokeWidth="1.5"
        fill="none"
        markerEnd="url(#arrow)"
      >
        <path d="M 430 56 L 430 86" />
        <path d="M 240 202 L 240 246" />
        <path d="M 620 202 L 620 246" />
        <path d="M 620 328 L 620 382" />
        <path d="M 430 440 L 486 428" />
        <path d="M 333 474 L 333 518 L 486 518" />
      </g>

      {/* The prober reaches the site the way a visitor does -- over the public
          internet through CloudFront, not by shortcutting to the bucket. */}
      <path
        d="M 74 446 L 30 446 L 30 145 L 106 145"
        stroke="var(--accent)"
        strokeWidth="1.5"
        strokeDasharray="5 4"
        fill="none"
        markerEnd="url(#arrow-accent)"
      />
      <text
        x="36"
        y="300"
        fontSize="10"
        fill="var(--accent-text)"
        transform="rotate(-90 36 300)"
        textAnchor="middle"
      >
        probes the public URL
      </text>

      <Box x={350} y={12} w={160} h={44} title="Visitor" />

      <rect x={110} y={86} width={640} height={116} {...GROUP} />
      <Label x={126} y={104}>
        CLOUDFRONT
      </Label>
      <Box
        x={126}
        y={116}
        w={292}
        h={72}
        title="Distribution"
        sub="TLS 1.2+ · HTTP/3 · HSTS · CSP"
        accent
      />
      <Box
        x={434}
        y={116}
        w={300}
        h={72}
        title="Edge function"
        sub="index.html rewrite"
      />

      {/* Braced so JSX does not read the leading slash-star as a comment. */}
      <EdgeLabel x={214} y={230}>
        {"/*"}
      </EdgeLabel>
      <EdgeLabel x={596} y={230}>
        {"/api/*"}
      </EdgeLabel>

      <Box
        x={110}
        y={246}
        w={260}
        h={82}
        title="Amazon S3"
        sub="private bucket · OAC signed"
      />
      <Box
        x={490}
        y={246}
        w={260}
        h={82}
        title="Lambda Function URL"
        sub="AWS_IAM auth · OAC signed"
      />

      <Box
        x={490}
        y={382}
        w={260}
        h={72}
        title="DynamoDB"
        sub="visits · uptime · cost"
        accent
      />

      <rect x={60} y={386} width={370} height={160} {...GROUP} />
      <Label x={76} y={406}>
        EVENTBRIDGE
      </Label>
      <Box x={74} y={418} w={167} h={56} title="Uptime probe" sub="every 5 minutes" />
      <Box x={253} y={418} w={161} h={56} title="Cost collector" sub="daily" />

      <Box
        x={490}
        y={490}
        w={260}
        h={56}
        title="Cost Explorer API"
        sub="$0.01 per request"
      />

      <text x={430} y={596} textAnchor="middle" fontSize="11" fill="var(--text-faint)">
        Both origins are private. The only path to either one is through the
        distribution.
      </text>
    </svg>
  </div>
);

export default ArchitectureDiagram;
