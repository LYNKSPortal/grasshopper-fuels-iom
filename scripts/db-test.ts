import { config } from "dotenv";
config({ path: ".env.local" });

async function main() {
  const { query } = await import("../src/lib/db");
  console.log("Connecting to:", process.env.DB_HOST);
  const { rows } = await query<{ now: string; db: string }>(
    "SELECT now() AS now, current_database() AS db"
  );
  console.log("Connected successfully:", rows[0]);
  process.exit(0);
}

main().catch((err) => {
  console.error("Connection failed:", err);
  process.exit(1);
});
