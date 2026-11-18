import { WebSocketServer } from "ws";
import pg from "pg";

const port = Number(process.env.WS_PORT || 3001);
const server = new WebSocketServer({ port });
let sample = { tick: 0, requests: 0, errors: 0, latencyMs: 40 };

function nextSample(previous, tick) {
  return {
    tick,
    requests: previous.requests + 3 + (tick % 4),
    errors: previous.errors + (tick % 5 === 0 ? 1 : 0),
    latencyMs: 40 + (tick % 7) * 3,
  };
}

async function dbRequests() {
  if (!process.env.DATABASE_URL) return null;
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const result = await client.query("select count(*)::int as requests from events");
  await client.end();
  return result.rows[0].requests;
}

setInterval(async () => {
  sample = nextSample(sample, sample.tick + 1);
  const stored = await dbRequests().catch(() => null);
  const payload = stored == null ? sample : { ...sample, requests: stored };
  const data = JSON.stringify(payload);
  for (const client of server.clients) client.send(data);
}, 1000);

console.log(`metrics socket on ws://localhost:${port}`);
