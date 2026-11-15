import { attachDatabasePool } from "@vercel/functions";
import { Pool, type ClientBase, type QueryResultRow } from "pg";

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

// Neon Postgres. DATABASE_URL is the pooled (-pooler) connection string,
// suitable for serverless/connection-per-request application traffic.
// Schema migrations and data scripts should use DATABASE_URL_UNPOOLED
// (the direct, non-pooled string) instead - see scripts/db-migrate.ts.
const connectionString = requireEnv("DATABASE_URL");

const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: true },
  max: 20,
});

attachDatabasePool(pool);

export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: unknown[]
) {
  return pool.query<T>(sql, params);
}

export async function withConnection<T>(
  fn: (client: ClientBase) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}
