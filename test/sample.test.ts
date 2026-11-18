import assert from "node:assert/strict";
import test from "node:test";
import { nextSample } from "../lib/sample.ts";

test("counts move forward each tick", () => {
  const first = nextSample({ tick: 0, requests: 0, errors: 0, latencyMs: 40 }, 1);
  const second = nextSample(first, 2);
  assert.ok(second.requests > first.requests);
});
