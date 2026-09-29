import { config } from "dotenv";
config({ path: ".env.local" });

import { promises as fs } from "fs";
import path from "path";

async function main() {
  const { withConnection } = await import("../src/lib/db");
  const sql = await fs.readFile(
    path.join(__dirname, "..", "db", "schema.sql"),
    "utf-8"
  );
  await withConnection(async (client) => {
    await client.query("BEGIN");
    try {
      await client.query(sql);
      await client.query("COMMIT");
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    }
  });
  console.log("Migration applied successfully.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
