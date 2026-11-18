import pg from "pg";

export async function requestCount(connectionString: string) {
  const client = new pg.Client({ connectionString });
  await client.connect();
  const result = await client.query<{ requests: number }>(
    "select count(*)::int as requests from events",
  );
  await client.end();
  return result.rows[0]?.requests ?? 0;
}
