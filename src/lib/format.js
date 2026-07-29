/**
 * Pure formatting helpers.
 *
 * Kept out of the component file so they can be unit tested with node:test
 * without pulling React, Gatsby, or a DOM into the test runner.
 */

/** Format a number as currency, or null if the input is not a number. */
export const fmtCurrency = (amount, currency = "USD") => {
  if (amount === null || amount === undefined || amount === "") return null;

  const value = Number(amount);
  if (Number.isNaN(value)) return null;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value);
};

/** Thousands-separated integer, or null when there is nothing to show. */
export const fmtNumber = (value) => {
  if (value === null || value === undefined || value === "") return null;

  const parsed = Number(value);
  if (Number.isNaN(parsed)) return null;

  return new Intl.NumberFormat("en-US").format(parsed);
};

/**
 * "3 minutes ago" for an ISO timestamp.
 *
 * `now` is injectable so the behaviour is testable without freezing the clock.
 * Anything under a minute collapses to "just now" rather than counting seconds,
 * which would make the panel look busier than the data actually is.
 */
export const relativeTime = (iso, now = Date.now()) => {
  if (!iso) return null;

  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return null;

  const seconds = Math.round((then - now) / 1000);
  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  const units = [
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];

  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) {
      return formatter.format(Math.round(seconds / size), unit);
    }
  }

  return "just now";
};
