import { config } from "dotenv";
config({ path: ".env.local" });

// One-off: mark Oak and Ash back in stock.
async function main() {
  const { query } = await import("../src/lib/db");
  for (const variant of ["Oak", "Ash"]) {
    await query(
      `INSERT INTO product_stock (product_slug, variant_label, in_stock, updated_at)
       VALUES ('kiln-dried-logs', $1, true, now())
       ON CONFLICT (product_slug, variant_label)
       DO UPDATE SET in_stock = EXCLUDED.in_stock, updated_at = now()`,
      [variant]
    );
  }
  const { rows } = await query<{ product_slug: string; variant_label: string; in_stock: boolean }>(
    "SELECT * FROM product_stock ORDER BY product_slug, variant_label"
  );
  console.table(rows);
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
