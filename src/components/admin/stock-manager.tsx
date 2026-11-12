"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StockEntry } from "@/lib/stock";

export function StockManager({ items }: { items: StockEntry[] }) {
  const router = useRouter();
  const [pendingKey, setPendingKey] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const byProduct = new Map<string, StockEntry[]>();
  for (const item of items) {
    const list = byProduct.get(item.productSlug);
    if (list) {
      list.push(item);
    } else {
      byProduct.set(item.productSlug, [item]);
    }
  }

  function toggle(item: StockEntry) {
    const key = `${item.productSlug}::${item.variantLabel}`;
    setError(null);
    setPendingKey(key);
    startTransition(async () => {
      const res = await fetch("/api/admin/stock", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productSlug: item.productSlug,
          variantLabel: item.variantLabel,
          inStock: !item.inStock,
        }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        setError("Something went wrong updating stock. Please try again.");
      }
      setPendingKey(null);
    });
  }

  return (
    <div className="space-y-6">
      {error && (
        <p className="rounded-2xl bg-red-50 p-4 text-sm font-medium text-red-600 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}

      {Array.from(byProduct.entries()).map(([slug, variants]) => (
        <div
          key={slug}
          className="rounded-3xl border border-black/5 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-[#1c2225] sm:p-6"
        >
          <h2 className="text-sm font-extrabold uppercase tracking-wide text-[#202e25]/50 dark:text-white/50">
            {variants[0].productName}
          </h2>
          <div className="mt-3 divide-y divide-black/5 dark:divide-white/10">
            {variants.map((item) => {
              const key = `${item.productSlug}::${item.variantLabel}`;
              const pending = pendingKey === key && isPending;
              return (
                <div key={key} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#202e25] dark:text-white">
                      {item.variantLabel}
                    </p>
                    <p
                      className={cn(
                        "text-xs font-bold",
                        item.inStock
                          ? "text-[#18af8a]"
                          : "text-red-500 dark:text-red-400"
                      )}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {pending && (
                      <Loader2 className="h-4 w-4 animate-spin text-[#202e25]/40 dark:text-white/40" />
                    )}
                    <button
                      type="button"
                      onClick={() => toggle(item)}
                      disabled={pending}
                      role="switch"
                      aria-checked={item.inStock}
                      aria-label={`${item.variantLabel} is ${item.inStock ? "in stock" : "out of stock"} - click to toggle`}
                      className={cn(
                        "relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                        item.inStock ? "bg-[#18af8a]" : "bg-black/15 dark:bg-white/15"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform",
                          item.inStock ? "translate-x-6" : "translate-x-1"
                        )}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
