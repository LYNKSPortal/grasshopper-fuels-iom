"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

export function RefreshPaymentButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(false);

  function handleClick() {
    setError(false);
    startTransition(async () => {
      const res = await fetch(`/api/payments/refresh/${orderId}`, { method: "POST" });
      if (res.ok) {
        router.refresh();
      } else {
        setError(true);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      title="Re-check payment status with Cashflows"
      aria-label="Refresh payment status"
      className={cn(
        "inline-flex items-center gap-1 text-[11px] font-semibold text-[#202e25]/40 transition-colors hover:text-[#18af8a] disabled:cursor-not-allowed disabled:opacity-60",
        error && "text-red-500"
      )}
    >
      <RefreshCw className={cn("h-3 w-3", isPending && "animate-spin")} />
      {error ? "Failed - retry" : "Refresh"}
    </button>
  );
}
