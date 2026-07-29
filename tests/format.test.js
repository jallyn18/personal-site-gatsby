import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { fmtCurrency, fmtNumber, relativeTime } from "../src/lib/format.js";

describe("fmtCurrency", () => {
  it("formats a number", () => {
    assert.equal(fmtCurrency(1.5), "$1.50");
  });

  it("formats a numeric string, which is what the API returns", () => {
    assert.equal(fmtCurrency("0.5"), "$0.50");
  });

  it("always shows two decimal places", () => {
    assert.equal(fmtCurrency(2), "$2.00");
  });

  it("honours the currency from the API rather than assuming dollars", () => {
    assert.equal(fmtCurrency(1.5, "EUR"), "€1.50");
  });

  it("returns null for missing values so callers can show a placeholder", () => {
    assert.equal(fmtCurrency(null), null);
    assert.equal(fmtCurrency(undefined), null);
    assert.equal(fmtCurrency(""), null);
  });

  it("returns null rather than NaN for junk", () => {
    assert.equal(fmtCurrency("not a number"), null);
  });

  it("formats zero rather than treating it as missing", () => {
    assert.equal(fmtCurrency(0), "$0.00");
  });
});

describe("fmtNumber", () => {
  it("adds thousands separators", () => {
    assert.equal(fmtNumber(1234567), "1,234,567");
  });

  it("formats zero", () => {
    assert.equal(fmtNumber(0), "0");
  });

  it("returns null for missing values", () => {
    assert.equal(fmtNumber(null), null);
    assert.equal(fmtNumber(undefined), null);
  });
});

describe("relativeTime", () => {
  const now = Date.parse("2026-07-29T12:00:00Z");

  it("collapses anything under a minute", () => {
    assert.equal(relativeTime("2026-07-29T11:59:40Z", now), "just now");
  });

  it("reports minutes", () => {
    assert.equal(relativeTime("2026-07-29T11:55:00Z", now), "5 minutes ago");
  });

  it("reports hours", () => {
    assert.equal(relativeTime("2026-07-29T09:00:00Z", now), "3 hours ago");
  });

  it("reports days", () => {
    assert.equal(relativeTime("2026-07-27T12:00:00Z", now), "2 days ago");
  });

  it("handles a clock skewed into the future without crashing", () => {
    assert.equal(relativeTime("2026-07-29T12:30:00Z", now), "in 30 minutes");
  });

  it("returns null for missing or unparseable input", () => {
    assert.equal(relativeTime(null, now), null);
    assert.equal(relativeTime("not a date", now), null);
  });
});
