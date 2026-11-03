"use client";

import { useEffect, useRef } from "react";
import { useCart } from "@/lib/cart-context";

export function ClearCartOnSuccess() {
  const { clearCart } = useCart();
  const hasCleared = useRef(false);

  useEffect(() => {
    if (hasCleared.current) return;
    hasCleared.current = true;
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
