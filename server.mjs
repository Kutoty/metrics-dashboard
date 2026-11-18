import { createServer } from "node:http";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));

export function nextSample(previous, tick) {
  return {
    tick,
    requests: previous.requests + 3 + (tick % 4),
    errors: previous.errors + (tick % 5 === 0 ? 1 : 0),
    latencyMs: 40 + (tick % 7) * 3,
  };
}

export function createApp() {
  let sample = { tick: 0, requests: 0, errors: 0, latencyMs: 40 };
  return function handle(req, res) {
    const url = new URL(req.url, "http://localhost");
    if (url.pathname === "/events") {
      res.writeHead(200, {
        "content-type": "text/event-stream",
        "cache-control": "no-cache",
        connection: "keep-alive",
      });
      const timer = setInterval(() => {
        sample = nextSample(sample, sample.tick + 1);
        res.write(`data: ${JSON.stringify(sample)}\n\n`);
      }, 1000);
      req.on("close", () => clearInterval(timer));
      return;
    }
    if (url.pathname === "/" || url.pathname === "/index.html") {
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(readFileSync(join(root, "public/index.html")));
      return;
    }
    res.writeHead(404);
    res.end("Not found");
  };
}

if (process.argv[1] && process.argv[1].endsWith("server.mjs")) {
  const port = Number(process.env.PORT || 3000);
  createServer(createApp()).listen(port, () => {
    console.log(`metrics on http://localhost:${port}`);
  });
}
