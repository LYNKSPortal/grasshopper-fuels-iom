import { config } from "dotenv";
config({ path: ".env.local" });

import { promises as fs } from "fs";
import path from "path";
import { Client } from "pg";

async function main() {
  // Use the direct (non-pooled) connection string for schema migrations,
  // per Neon's guidance - the pooled (-pooler) connection runs through
  // PgBouncer in transaction mode, which doesn't reliably support
  // session-level DDL/transaction semantics.
  const connectionString =
    process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("Missing DATABASE_URL_UNPOOLED/DATABASE_URL");
  }

  const sql = await fs.readFile(
    path.join(__dirname, "..", "db", "schema.sql"),
    "utf-8"
  );

  const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: true },
  });
  await client.connect();
  try {
    await client.query("BEGIN");
    try {
      await client.query(sql);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  } finally {
    await client.end();
  }
  console.log("Migration applied successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
