# Metrics dashboard

Next.js page, a WebSocket server, and an optional PostgreSQL count.

## Run

```bash
npm install
npm test
npm run socket
npm run dev
```

Open http://localhost:3000. The socket listens on `ws://localhost:3001`.

With Postgres:

```bash
docker compose up -d
DATABASE_URL=postgres://metrics:metrics@localhost:5432/metrics npm run socket
```
