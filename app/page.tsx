"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [sample, setSample] = useState({ requests: 0, errors: 0, latencyMs: 0 });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3001");
    socket.onmessage = (event) => setSample(JSON.parse(event.data));
    return () => socket.close();
  }, []);

  return (
    <main>
      <h1>Live metrics</h1>
      <p>React page on Next.js. Numbers arrive over a WebSocket. PostgreSQL supplies the request count when DATABASE_URL is set.</p>
      <p>Requests {sample.requests}</p>
      <p>Errors {sample.errors}</p>
      <p>Latency {sample.latencyMs} ms</p>
    </main>
  );
}
