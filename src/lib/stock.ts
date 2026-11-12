import { query } from "@/lib/db";
import { products, type Product } from "@/lib/products";

// Live stock status per product variant, editable from /admin/stock instead
// of requiring a code change + deploy. Any variant without a row here falls
// back to the outOfStockVariants hardcoded in products.ts.

export type StockEntry = {
  productSlug: string;
  productName: string;
  variantLabel: string;
  inStock: boolean;
  updatedAt: string | null;
};

type StockRow = {
  product_slug: string;
  variant_label: string;
  in_stock: boolean;
  updated_at: Date;
};

function stockKey(productSlug: string, variantLabel: string): string {
  return `${productSlug}::${variantLabel}`;
}

/** Map of "slug::variant" -> inStock, for every row currently in the DB. */
export async function getStockMap(): Promise<Map<string, boolean>> {
  const { rows } = await query<StockRow>("SELECT * FROM product_stock");
  const map = new Map<string, boolean>();
  for (const row of rows) {
    map.set(stockKey(row.product_slug, row.variant_label), row.in_stock);
  }
  return map;
}

/** Every product variant with its live stock status, for the admin UI. */
export async function getAllStockEntries(): Promise<StockEntry[]> {
  const stockMap = await getStockMap();
  const entries: StockEntry[] = [];
  for (const product of products) {
    for (const variant of product.variants ?? []) {
      const key = stockKey(product.slug, variant);
      const inStock = stockMap.has(key)
        ? (stockMap.get(key) as boolean)
        : !(product.outOfStockVariants?.includes(variant) ?? false);
      entries.push({
        productSlug: product.slug,
        productName: product.name,
        variantLabel: variant,
        inStock,
        updatedAt: null,
      });
    }
  }
  return entries;
}

export async function setVariantStock(
  productSlug: string,
  variantLabel: string,
  inStock: boolean
): Promise<void> {
  await query(
    `INSERT INTO product_stock (product_slug, variant_label, in_stock, updated_at)
     VALUES ($1, $2, $3, now())
     ON CONFLICT (product_slug, variant_label)
     DO UPDATE SET in_stock = EXCLUDED.in_stock, updated_at = now()`,
    [productSlug, variantLabel, inStock]
  );
}

function applyLiveStock(product: Product, stockMap: Map<string, boolean>): Product {
  if (!product.variants || product.variants.length === 0) return product;
  const outOfStockVariants = product.variants.filter((variant) => {
    const key = stockKey(product.slug, variant);
    if (stockMap.has(key)) return !stockMap.get(key);
    return product.outOfStockVariants?.includes(variant) ?? false;
  });
  return { ...product, outOfStockVariants };
}

/** The full product catalogue, with outOfStockVariants overridden by live admin-set stock. */
export async function getProductsWithLiveStock(): Promise<Product[]> {
  const stockMap = await getStockMap();
  return products.map((product) => applyLiveStock(product, stockMap));
}

export async function getProductWithLiveStock(slug: string): Promise<Product | undefined> {
  const product = products.find((p) => p.slug === slug);
  if (!product) return undefined;
  const stockMap = await getStockMap();
  return applyLiveStock(product, stockMap);
}
