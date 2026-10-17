import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { summarize } from "../src/summarize.js";

describe("summarize", () => {
  it("skips invalid items and picks the highest roi", () => {
    const summary = summarize([
      { title: "Marina", priceUsd: 100, expectedRoi: 4 },
      { title: "Canary", priceUsd: 50, expectedRoi: 9.5 },
      { title: " ", priceUsd: 10, expectedRoi: 99 },
      { title: "Bad", priceUsd: -1, expectedRoi: 50 },
    ]);

    assert.equal(summary.count, 2);
    assert.ok(Math.abs(summary.totalPrice - 150) < 0.001);
    assert.equal(summary.topTitle, "Canary");
  });

  it("keeps the first title on a tie and returns zeros when empty", () => {
    const tied = summarize([
      { title: "First", priceUsd: 10, expectedRoi: 5 },
      { title: "Second", priceUsd: 20, expectedRoi: 5 },
    ]);
    assert.equal(tied.topTitle, "First");
    assert.ok(Math.abs(tied.totalPrice - 30) < 0.001);

    const empty = summarize([]);
    assert.deepEqual(empty, { count: 0, totalPrice: 0, topTitle: "" });
  });
});
