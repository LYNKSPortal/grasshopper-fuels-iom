"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { orderStatuses, type OrderStatus } from "@/lib/order-types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const statusStyles: Record<OrderStatus, string> = {
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  in_process: "bg-[#18af8a]/10 text-[#18af8a] border-[#18af8a]/30",
  done: "bg-[#63cd26]/10 text-[#3f8a12] border-[#63cd26]/30",
};

const statusLabels: Record<OrderStatus, string> = {
  pending: "Pending",
  in_process: "In Process",
  done: "Done",
};

export function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const router = useRouter();
  const [current, setCurrent] = useState(status);
  const [pendingStatus, setPendingStatus] = useState<OrderStatus | null>(null);
  const [note, setNote] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleSelectChange(newStatus: OrderStatus) {
    if (newStatus === current) return;
    setPendingStatus(newStatus);
    setNote("");
  }

  function confirmStatusChange() {
    if (!pendingStatus) return;
    const newStatus = pendingStatus;
    setPendingStatus(null);
    setCurrent(newStatus);

    startTransition(async () => {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, note }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        setCurrent(status);
      }
    });
  }

  function cancelStatusChange() {
    setPendingStatus(null);
    setNote("");
  }

  return (
    <>
      <div className="relative inline-flex items-center">
        <select
          value={current}
          disabled={isPending}
          onChange={(e) => handleSelectChange(e.target.value as OrderStatus)}
          className={cn(
            "cursor-pointer appearance-none rounded-full border px-3 py-1.5 pr-7 text-xs font-bold outline-none disabled:cursor-not-allowed disabled:opacity-60",
            statusStyles[current]
          )}
        >
          {orderStatuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        {isPending && (
          <Loader2 className="pointer-events-none absolute right-2 h-3 w-3 animate-spin" />
        )}
      </div>

      <Dialog
        open={pendingStatus !== null}
        onOpenChange={(open) => {
          if (!open) cancelStatusChange();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Update status to{" "}
              {pendingStatus ? statusLabels[pendingStatus] : ""}
            </DialogTitle>
            <DialogDescription>
              Leave a note for this order. This will be saved to the
              customer&apos;s order history.
            </DialogDescription>
          </DialogHeader>

          <Textarea
            autoFocus
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. Order confirmed, delivery scheduled for Thursday."
            rows={4}
          />

          <DialogFooter>
            <Button type="button" variant="outline" onClick={cancelStatusChange}>
              Cancel
            </Button>
            <Button type="button" onClick={confirmStatusChange}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
