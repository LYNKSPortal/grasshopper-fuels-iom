import type { Order, PaymentStatus, OrderStatus } from "@/lib/order-types";

// Denominations sold via the "gift-card" product (see src/lib/products.ts).
const GIFT_CARD_AMOUNTS = new Set([25, 50, 100, 200, 500]);

export type GiftCardLine = {
  label: string;
  quantity: number;
  value: number;
};

export type GiftCardPurchase = {
  orderId: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  lines: GiftCardLine[];
  totalValue: number;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
};

/**
 * Extracts the gift card lines from an order. Prefers the structured `items`
 * JSON stored at checkout; falls back to parsing the human-readable
 * order_summary ("2 x £25, 1 x Birch") for orders placed before items were
 * persisted.
 */
export function getGiftCardLines(order: Order): GiftCardLine[] {
  const fromItems = order.items
    .filter((item) => item.productSlug === "gift-card")
    .map((item) => {
      const amount = parseFloat(item.variantLabel.replace(/[^0-9.]/g, ""));
      return {
        label: item.variantLabel,
        quantity: item.quantity,
        value: Number.isFinite(amount) ? amount * item.quantity : 0,
      };
    })
    .filter((line) => line.value > 0);
  if (fromItems.length > 0) return fromItems;

  const lines: GiftCardLine[] = [];
  for (const segment of order.order.split(/[,\n]/)) {
    const match = segment.trim().match(/^(\d+)\s*x\s*£(\d+(?:\.\d+)?)$/i);
    if (!match) continue;
    const amount = parseFloat(match[2]);
    if (!GIFT_CARD_AMOUNTS.has(amount)) continue;
    const quantity = parseInt(match[1], 10);
    lines.push({
      label: `£${amount % 1 === 0 ? amount.toFixed(0) : amount}`,
      quantity,
      value: amount * quantity,
    });
  }
  return lines;
}

/** All orders that contain at least one gift card line, newest first. */
export function getGiftCardPurchases(orders: Order[]): GiftCardPurchase[] {
  const purchases: GiftCardPurchase[] = [];
  for (const order of orders) {
    const lines = getGiftCardLines(order);
    if (lines.length === 0) continue;
    purchases.push({
      orderId: order.id,
      createdAt: order.createdAt,
      firstName: order.firstName,
      lastName: order.lastName,
      email: order.email,
      phone: order.phone,
      lines,
      totalValue: lines.reduce((sum, l) => sum + l.value, 0),
      paymentStatus: order.paymentStatus,
      orderStatus: order.status,
    });
  }
  return purchases;
}
