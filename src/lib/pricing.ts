import { products as staticProducts, type Product } from "@/lib/products";

// Server-authoritative pricing. Used to recompute the amount to charge from
// the product catalogue rather than trusting a price sent by the browser,
// since the checkout flow charges the customer immediately via Cashflows.
//
// Callers should pass in the live-stock-aware product list (see
// src/lib/stock.ts getProductsWithLiveStock) so that an admin marking a
// variant out of stock also blocks it from being priced/ordered here, not
// just hidden in the UI. Falls back to the hardcoded catalogue if omitted.

export type PricedCartItem = {
  productSlug: string;
  variantLabel: string;
  quantity: number;
};

function parsePriceLabel(label?: string): number | null {
  if (!label) return null;
  const match = label.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : null;
}

export function getUnitPrice(
  productSlug: string,
  variantLabel: string,
  quantity: number,
  productList: Product[] = staticProducts
): number | null {
  const product = productList.find((p) => p.slug === productSlug);
  if (!product) return null;
  if (product.outOfStockVariants?.includes(variantLabel)) return null;

  const bulkOffer = product.variantBulkOffers?.[variantLabel];
  if (bulkOffer && quantity >= bulkOffer.minQty) {
    return bulkOffer.unitPrice;
  }
  return parsePriceLabel(product.variantPrices?.[variantLabel]);
}

export function computeOrderTotal(
  items: PricedCartItem[],
  productList: Product[] = staticProducts
): {
  amount: number;
  allPriced: boolean;
} {
  let amount = 0;
  let allPriced = items.length > 0;

  for (const item of items) {
    if (!Number.isFinite(item.quantity) || item.quantity <= 0) {
      allPriced = false;
      continue;
    }
    const unitPrice = getUnitPrice(item.productSlug, item.variantLabel, item.quantity, productList);
    if (unitPrice === null) {
      allPriced = false;
      continue;
    }
    amount += unitPrice * item.quantity;
  }

  return { amount, allPriced };
}
