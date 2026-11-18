export type Sample = { tick: number; requests: number; errors: number; latencyMs: number };

export function nextSample(previous: Sample, tick: number): Sample {
  return {
    tick,
    requests: previous.requests + 3 + (tick % 4),
    errors: previous.errors + (tick % 5 === 0 ? 1 : 0),
    latencyMs: 40 + (tick % 7) * 3,
  };
}
