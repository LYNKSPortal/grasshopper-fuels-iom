"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Minus, Plus, ShoppingCart } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart, type CartBulkOffer } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export function OrderShop({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-8">
      {products.map((product) => (
        <ProductOrderCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

function ProductOrderCard({ product }: { product: Product }) {
  const variants =
    product.variants && product.variants.length > 0
      ? product.variants
      : [product.name];

  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-[350px_1fr]">
        <div className="relative aspect-square w-full">
          <Image
            src={product.image}
            alt={`${product.name} \u2013 ${product.shortDescription}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 p-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-[#202e25]">
                {product.name}
              </h3>
              <p className="mt-1 max-w-md text-sm text-[#202e25]/60">
                {product.shortDescription}
              </p>
            </div>
            <Link
              href={`/products/${product.slug}`}
              className="shrink-0 text-sm font-bold text-[#18af8a] underline underline-offset-4 hover:text-[#139775]"
            >
              View Details
            </Link>
          </div>

          <div className="mt-4 divide-y divide-black/5">
            {variants.map((variant) => (
              <VariantRow
                key={`${product.slug}|${variant}`}
                productSlug={product.slug}
                productName={product.name}
                variant={variant}
                priceLabel={product.variantPrices?.[variant]}
                offerLabel={product.variantOffers?.[variant]}
                bulkOffer={product.variantBulkOffers?.[variant]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VariantRow({
  productSlug,
  productName,
  variant,
  priceLabel,
  offerLabel,
  bulkOffer,
}: {
  productSlug: string;
  productName: string;
  variant: string;
  priceLabel?: string;
  offerLabel?: string;
  bulkOffer?: CartBulkOffer;
}) {
  const key = `${productSlug}|${variant}`;
  const { items, addItem } = useCart();
  const cartItem = items.find((i) => i.key === key);
  const cartQuantity = cartItem?.quantity ?? 0;
  const [quantity, setLocalQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    addItem(
      {
        key,
        productSlug,
        productName,
        variantLabel: variant,
        priceLabel,
        bulkOffer,
      },
      quantity
    );
    setJustAdded(true);
    setLocalQuantity(1);
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div>
        <p className="text-sm font-semibold text-[#202e25]">{variant}</p>
        <p className="text-xs font-semibold text-[#18af8a]">
          {priceLabel ?? "Price on enquiry"}
        </p>
        {offerLabel && (
          <p className="mt-0.5 inline-flex items-center rounded-full bg-[#63cd26]/15 px-2 py-0.5 text-xs font-bold text-[#4d8f1b]">
            {offerLabel}
          </p>
        )}
        {cartQuantity > 0 && (
          <p className="mt-0.5 text-xs font-medium text-[#202e25]/50">
            {cartQuantity} in basket
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 rounded-full border border-input p-1">
          <button
            type="button"
            onClick={() => setLocalQuantity((q) => Math.max(1, q - 1))}
            aria-label={`Decrease quantity for ${variant}`}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#202e25] transition-colors hover:bg-muted"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="w-6 text-center text-sm font-semibold text-[#202e25]">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setLocalQuantity((q) => Math.min(99, q + 1))}
            aria-label={`Increase quantity for ${variant}`}
            className="flex h-7 w-7 items-center justify-center rounded-full text-[#202e25] transition-colors hover:bg-muted"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors",
            justAdded ? "bg-[#63cd26]" : "bg-[#18af8a] hover:bg-[#139775]"
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {justAdded ? (
              <motion.span
                key="added"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-1.5"
              >
                <CheckCircle2 className="h-4 w-4" />
                Added
              </motion.span>
            ) : (
              <motion.span
                key="add"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="flex items-center gap-1.5"
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Basket
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}
