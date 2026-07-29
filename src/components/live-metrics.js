import React, { useEffect, useState } from "react";

import { fmtCurrency, fmtNumber, relativeTime } from "../lib/format";

/**
 * Reads the site's own operational data from /api/*.
 *
 * The endpoints are served by a Lambda behind the same CloudFront distribution
 * as this page, so these are same-origin requests: no CORS, no API key, no
 * second domain.
 *
 * Every panel degrades to a readable placeholder rather than an error. Running
 * `gatsby develop` has no API in front of it, and a visitor should never see a
 * stack trace because a collector has not run yet.
 */

const VISIT_SESSION_KEY = "visit-counted";

/**
 * Fetch one endpoint. `method` is POST only for the visit counter, which is the
 * single mutating call the site makes.
 */
const useEndpoint = (path, { method = "GET", skip = false } = {}) => {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    if (skip) {
      setState({ status: "skipped", data: null });
      return undefined;
    }

    const controller = new AbortController();

    fetch(path, { method, signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => setState({ status: "ready", data }))
      .catch((error) => {
        if (error.name === "AbortError") return;
        setState({ status: "unavailable", data: null });
      });

    return () => controller.abort();
  }, [path, method, skip]);

  return state;
};

const Metric = ({ label, value, sub, pending }) => (
  <div className="metric">
    <div className="label">{label}</div>
    <div className={pending ? "value pending" : "value"}>{value}</div>
    {sub ? <div className="sub">{sub}</div> : null}
  </div>
);

const LiveMetrics = ({ showCost = true }) => {
  // Count a visit once per browser session. Gatsby's client-side routing would
  // otherwise fire this on every page change; the API dedupes per day as well,
  // so this is belt and braces, but it keeps the request count honest.
  const [alreadyCounted, setAlreadyCounted] = useState(true);

  useEffect(() => {
    try {
      const seen = window.sessionStorage.getItem(VISIT_SESSION_KEY);
      if (!seen) {
        window.sessionStorage.setItem(VISIT_SESSION_KEY, "1");
        setAlreadyCounted(false);
      }
    } catch {
      // Private browsing can throw on sessionStorage access. Fall back to a
      // read-only view rather than losing the whole panel.
      setAlreadyCounted(true);
    }
  }, []);

  const visits = useEndpoint("/api/visits", {
    method: alreadyCounted ? "GET" : "POST",
  });
  const status = useEndpoint("/api/status");
  const cost = useEndpoint("/api/cost", { skip: !showCost });

  const visitValue = visits.status === "ready" ? fmtNumber(visits.data.count) : null;

  const uptimeReady = status.status === "ready" && status.data.available;
  const availability = uptimeReady ? status.data.availability_pct : null;

  const costReady = cost.status === "ready" && cost.data.available;

  return (
    <div className="metrics">
      <Metric
        label="Visits"
        value={visitValue ?? "—"}
        pending={visitValue === null}
        sub={visitValue === null ? "unavailable" : "unique per day"}
      />

      <Metric
        label="Status"
        value={
          uptimeReady ? (
            <>
              <span
                className={`status-dot ${status.data.last_status === "up" ? "up" : "down"}`}
                aria-hidden="true"
              />
              {status.data.last_status === "up" ? "Operational" : "Degraded"}
            </>
          ) : (
            "—"
          )
        }
        pending={!uptimeReady}
        sub={
          uptimeReady
            ? `checked ${relativeTime(status.data.last_checked_at) ?? "recently"}`
            : "no probe data"
        }
      />

      <Metric
        label="Availability"
        value={availability !== null ? `${availability.toFixed(2)}%` : "—"}
        pending={availability === null}
        sub={
          uptimeReady ? `${fmtNumber(status.data.total_checks)} probes` : "collecting"
        }
      />

      <Metric
        label="Response time"
        value={
          uptimeReady && status.data.avg_latency_ms !== null
            ? `${status.data.avg_latency_ms} ms`
            : "—"
        }
        pending={!uptimeReady}
        sub={
          uptimeReady && status.data.last_latency_ms
            ? `last ${status.data.last_latency_ms} ms`
            : "average"
        }
      />

      {showCost ? (
        <Metric
          label="AWS spend"
          value={
            costReady
              ? (fmtCurrency(cost.data.month_to_date, cost.data.currency) ?? "—")
              : "—"
          }
          pending={!costReady}
          sub={
            costReady
              ? cost.data.forecast_month_end
                ? `${fmtCurrency(cost.data.forecast_month_end, cost.data.currency)} projected`
                : "month to date"
              : "collected daily"
          }
        />
      ) : null}
    </div>
  );
};

export { useEndpoint };
export default LiveMetrics;
