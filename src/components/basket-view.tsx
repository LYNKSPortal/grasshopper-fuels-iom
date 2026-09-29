"use client";

import Link from "next/link";
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { getEffectiveUnitPrice, useCart } from "@/lib/cart-context";

export function BasketView() {
  const { items, setQuantity, removeItem, subtotal, hasUnpricedItems } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-black/5 bg-[#f7faf9] p-12 text-center">
        <ShoppingBag className="h-12 w-12 text-[#202e25]/30" />
        <h3 className="text-xl font-bold text-[#202e25]">
          Your basket is empty
        </h3>
        <p className="max-w-sm text-sm text-[#202e25]/60">
          Browse our products and add items to your basket to get started.
        </p>
        <Link
          href="/order"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-[#18af8a] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#139775]"
        >
          Browse Products
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="divide-y divide-black/5 rounded-3xl border border-black/5 bg-white shadow-sm">
        {items.map((item) => {
          const bulkActive =
            item.bulkOffer && item.quantity >= item.bulkOffer.minQty;
          return (
          <div
            key={item.key}
            className="flex flex-wrap items-center justify-between gap-4 p-6"
          >
            <div>
              <p className="text-sm font-bold text-[#202e25]">
                {item.productName}
              </p>
              <p className="text-sm text-[#202e25]/60">{item.variantLabel}</p>
              <p className="mt-1 text-xs font-semibold text-[#18af8a]">
                {item.priceLabel ?? "Price on enquiry"}
              </p>
              {bulkActive && item.bulkOffer && (
                <p className="mt-1 inline-flex items-center rounded-full bg-[#63cd26]/15 px-2 py-0.5 text-xs font-bold text-[#4d8f1b]">
                  Bulk offer applied: £{item.bulkOffer.unitPrice.toFixed(2)}{" "}
                  each
                </p>
              )}
              <p className="mt-1 text-xs font-medium text-[#202e25]/50">
                Line total: £{(getEffectiveUnitPrice(item) * item.quantity).toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full border border-input p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(item.key, item.quantity - 1)}
                  aria-label={`Decrease quantity for ${item.variantLabel}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[#202e25] transition-colors hover:bg-muted"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-semibold text-[#202e25]">
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(item.key, item.quantity + 1)}
                  aria-label={`Increase quantity for ${item.variantLabel}`}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[#202e25] transition-colors hover:bg-muted"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <button
                type="button"
                onClick={() => removeItem(item.key)}
                aria-label={`Remove ${item.variantLabel} from basket`}
                className="flex h-9 w-9 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
          );
        })}
      </div>

      <div className="rounded-3xl border border-black/5 bg-[#f7faf9] p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold text-[#202e25]">
            Estimated Subtotal
          </p>
          <p className="text-lg font-extrabold text-[#202e25]">
            £{subtotal.toFixed(2)}
          </p>
        </div>
        {hasUnpricedItems && (
          <p className="mt-2 text-xs text-[#202e25]/60">
            Some items are priced on enquiry and are not included in this
            estimate. Final pricing will be confirmed when we get in touch.
          </p>
        )}
      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/order"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-input px-6 py-3 text-sm font-bold text-[#202e25] transition-colors hover:bg-muted"
        >
          Continue Shopping
        </Link>
        <Link
          href="/checkout"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#18af8a] px-8 py-4 text-base font-bold text-white shadow-md transition-colors hover:bg-[#139775]"
        >
          Proceed to Checkout
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
