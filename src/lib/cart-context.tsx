"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products } from "@/lib/products";

export type CartBulkOffer = {
  minQty: number;
  unitPrice: number;
};

export type CartItem = {
  key: string;
  productSlug: string;
  productName: string;
  variantLabel: string;
  priceLabel?: string;
  bulkOffer?: CartBulkOffer;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  hasUnpricedItems: boolean;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "grasshopper-fuels-cart";

function parsePrice(priceLabel?: string): number {
  if (!priceLabel) return 0;
  const match = priceLabel.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

export function getEffectiveUnitPrice(item: Pick<CartItem, "priceLabel" | "bulkOffer" | "quantity">): number {
  if (item.bulkOffer && item.quantity >= item.bulkOffer.minQty) {
    return item.bulkOffer.unitPrice;
  }
  return parsePrice(item.priceLabel);
}

function readStoredItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore corrupt storage
  }
  return [];
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage (external system) on mount
    setItems(readStoredItems());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.key === item.key);
        if (existing) {
          return prev.map((i) =>
            i.key === item.key
              ? { ...i, quantity: Math.min(99, i.quantity + quantity) }
              : i
          );
        }
        return [...prev, { ...item, quantity: Math.min(99, quantity) }];
      });
    },
    []
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    setItems((prev) => {
      if (quantity <= 0) return prev.filter((i) => i.key !== key);
      return prev.map((i) =>
        i.key === key ? { ...i, quantity: Math.min(99, quantity) } : i
      );
    });
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => sum + getEffectiveUnitPrice(i) * i.quantity, 0),
    [items]
  );

  const hasUnpricedItems = useMemo(
    () => items.some((i) => !i.priceLabel),
    [items]
  );

  const value: CartContextValue = {
    items,
    totalCount,
    subtotal,
    hasUnpricedItems,
    addItem,
    setQuantity,
    removeItem,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
