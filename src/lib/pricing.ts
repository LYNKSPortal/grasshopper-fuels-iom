import { products } from "@/lib/products";

// Server-authoritative pricing. Used to recompute the amount to charge from
// the product catalogue rather than trusting a price sent by the browser,
// since the checkout flow charges the customer immediately via Cashflows.

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
  quantity: number
): number | null {
  const product = products.find((p) => p.slug === productSlug);
  if (!product) return null;
  if (product.outOfStockVariants?.includes(variantLabel)) return null;

  const bulkOffer = product.variantBulkOffers?.[variantLabel];
  if (bulkOffer && quantity >= bulkOffer.minQty) {
    return bulkOffer.unitPrice;
  }
  return parsePriceLabel(product.variantPrices?.[variantLabel]);
}

export function computeOrderTotal(items: PricedCartItem[]): {
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
    const unitPrice = getUnitPrice(item.productSlug, item.variantLabel, item.quantity);
    if (unitPrice === null) {
      allPriced = false;
      continue;
    }
    amount += unitPrice * item.quantity;
  }

  return { amount, allPriced };
}
