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
      {products.flatMap((product) => {
        const variants =
          product.variants && product.variants.length > 0
            ? product.variants
            : [product.name];

        // If every variant has its own distinct photo, give each one its own
        // full-size card instead of nesting them as small rows under a
        // single shared image.
        const allVariantsHaveOwnImages = variants.every(
          (variant) => product.variantImages?.[variant]
        );

        if (allVariantsHaveOwnImages) {
          return variants.map((variant) => (
            <VariantCard
              key={`${product.slug}|${variant}`}
              product={product}
              variant={variant}
            />
          ));
        }

        return [
          <ProductOrderCard
            key={product.slug}
            product={product}
            variants={variants}
          />,
        ];
      })}
    </div>
  );
}

function useVariantCart({
  productSlug,
  productName,
  variant,
  priceLabel,
  bulkOffer,
}: {
  productSlug: string;
  productName: string;
  variant: string;
  priceLabel?: string;
  bulkOffer?: CartBulkOffer;
}) {
  const key = `${productSlug}|${variant}`;
  const { items, addItem } = useCart();
  const cartItem = items.find((i) => i.key === key);
  const cartQuantity = cartItem?.quantity ?? 0;
  const [quantityInput, setQuantityInput] = useState("1");
  const [justAdded, setJustAdded] = useState(false);

  const quantity = Math.min(99, Math.max(1, parseInt(quantityInput, 10) || 1));

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
    setQuantityInput("1");
    window.setTimeout(() => setJustAdded(false), 1600);
  }

  function handleQuantityInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    if (raw !== "" && !/^\d+$/.test(raw)) return;
    setQuantityInput(raw);
  }

  function handleQuantityInputBlur() {
    setQuantityInput(String(quantity));
  }

  return {
    cartQuantity,
    quantityInput,
    setQuantityInput,
    quantity,
    justAdded,
    handleAdd,
    handleQuantityInputChange,
    handleQuantityInputBlur,
  };
}

function QuantityAddControls({
  variant,
  quantityInput,
  setQuantityInput,
  quantity,
  justAdded,
  onAdd,
  onQuantityChange,
  onQuantityBlur,
}: {
  variant: string;
  quantityInput: string;
  setQuantityInput: (value: string) => void;
  quantity: number;
  justAdded: boolean;
  onAdd: () => void;
  onQuantityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onQuantityBlur: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1.5 rounded-full border border-input p-1">
        <button
          type="button"
          onClick={() => setQuantityInput(String(Math.max(1, quantity - 1)))}
          aria-label={`Decrease quantity for ${variant}`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#202e25] transition-colors hover:bg-muted"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={quantityInput}
          onChange={onQuantityChange}
          onBlur={onQuantityBlur}
          aria-label={`Quantity for ${variant}`}
          className="w-8 border-0 bg-transparent text-center text-sm font-semibold text-[#202e25] outline-none"
        />
        <button
          type="button"
          onClick={() => setQuantityInput(String(Math.min(99, quantity + 1)))}
          aria-label={`Increase quantity for ${variant}`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-[#202e25] transition-colors hover:bg-muted"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <button
        type="button"
        onClick={onAdd}
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
  );
}

function OutOfStockBadge() {
  return (
    <span className="inline-flex items-center rounded-full bg-black/5 px-4 py-2 text-sm font-bold text-[#202e25]/40">
      Out of Stock
    </span>
  );
}

function ProductOrderCard({
  product,
  variants,
}: {
  product: Product;
  variants: string[];
}) {
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
                image={product.variantImages?.[variant]}
                priceLabel={product.variantPrices?.[variant]}
                offerLabel={product.variantOffers?.[variant]}
                bulkOffer={product.variantBulkOffers?.[variant]}
                outOfStock={product.outOfStockVariants?.includes(variant)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VariantCard({
  product,
  variant,
}: {
  product: Product;
  variant: string;
}) {
  const image = product.variantImages?.[variant] ?? product.image;
  const priceLabel = product.variantPrices?.[variant];
  const offerLabel = product.variantOffers?.[variant];
  const bulkOffer = product.variantBulkOffers?.[variant];
  const outOfStock = product.outOfStockVariants?.includes(variant);
  const cart = useVariantCart({
    productSlug: product.slug,
    productName: product.name,
    variant,
    priceLabel,
    bulkOffer,
  });

  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      <div className="grid grid-cols-1 sm:grid-cols-[350px_1fr]">
        <div className="relative aspect-square w-full">
          <Image
            src={image}
            alt={`${product.name} \u2013 ${variant}`}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 p-6">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-bold text-[#202e25]">{variant}</h3>
              <p className="mt-1 text-xs font-bold uppercase tracking-wide text-[#202e25]/40">
                {product.name}
              </p>
            </div>
            <Link
              href={`/products/${product.slug}`}
              className="shrink-0 text-sm font-bold text-[#18af8a] underline underline-offset-4 hover:text-[#139775]"
            >
              View Details
            </Link>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            {outOfStock ? (
              <OutOfStockBadge />
            ) : (
              <p className="text-sm font-semibold text-[#18af8a]">
                {priceLabel ?? "Price on enquiry"}
              </p>
            )}
            {!outOfStock && offerLabel && (
              <p className="inline-flex items-center rounded-full bg-[#63cd26]/15 px-2 py-0.5 text-xs font-bold text-[#4d8f1b]">
                {offerLabel}
              </p>
            )}
            {!outOfStock && cart.cartQuantity > 0 && (
              <p className="text-xs font-medium text-[#202e25]/50">
                {cart.cartQuantity} in basket
              </p>
            )}
          </div>

          {!outOfStock && (
            <div className="mt-3">
              <QuantityAddControls
                variant={variant}
                quantityInput={cart.quantityInput}
                setQuantityInput={cart.setQuantityInput}
                quantity={cart.quantity}
                justAdded={cart.justAdded}
                onAdd={cart.handleAdd}
                onQuantityChange={cart.handleQuantityInputChange}
                onQuantityBlur={cart.handleQuantityInputBlur}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VariantRow({
  productSlug,
  productName,
  variant,
  image,
  priceLabel,
  offerLabel,
  bulkOffer,
  outOfStock,
}: {
  productSlug: string;
  productName: string;
  variant: string;
  image?: string;
  priceLabel?: string;
  offerLabel?: string;
  bulkOffer?: CartBulkOffer;
  outOfStock?: boolean;
}) {
  const cart = useVariantCart({
    productSlug,
    productName,
    variant,
    priceLabel,
    bulkOffer,
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-3">
      <div className="flex items-center gap-3">
        {image && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl bg-[#f7faf9]">
            <Image
              src={image}
              alt={`${productName} \u2013 ${variant}`}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-[#202e25]">{variant}</p>
          {outOfStock ? (
            <p className="text-xs font-semibold text-red-500">Out of Stock</p>
          ) : (
            <>
              <p className="text-xs font-semibold text-[#18af8a]">
                {priceLabel ?? "Price on enquiry"}
              </p>
              {offerLabel && (
                <p className="mt-0.5 inline-flex items-center rounded-full bg-[#63cd26]/15 px-2 py-0.5 text-xs font-bold text-[#4d8f1b]">
                  {offerLabel}
                </p>
              )}
            </>
          )}
          {!outOfStock && cart.cartQuantity > 0 && (
            <p className="mt-0.5 text-xs font-medium text-[#202e25]/50">
              {cart.cartQuantity} in basket
            </p>
          )}
        </div>
      </div>

      {outOfStock ? (
        <OutOfStockBadge />
      ) : (
        <QuantityAddControls
          variant={variant}
          quantityInput={cart.quantityInput}
          setQuantityInput={cart.setQuantityInput}
          quantity={cart.quantity}
          justAdded={cart.justAdded}
          onAdd={cart.handleAdd}
          onQuantityChange={cart.handleQuantityInputChange}
          onQuantityBlur={cart.handleQuantityInputBlur}
        />
      )}
    </div>
  );
}
