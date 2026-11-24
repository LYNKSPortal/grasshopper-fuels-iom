import type { Metadata } from "next";
import { Gift, Inbox } from "lucide-react";
import { getOrders } from "@/lib/orders";
import { getGiftCardPurchases } from "@/lib/gift-cards";
import type { PaymentStatus } from "@/lib/order-types";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const paymentStatusStyles: Record<PaymentStatus, string> = {
  unpaid: "bg-black/5 text-[#202e25]/50 dark:bg-white/5 dark:text-white/50",
  pending: "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400",
  paid: "bg-[#18af8a]/10 text-[#18af8a]",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
  cancelled: "bg-black/5 text-[#202e25]/50 dark:bg-white/5 dark:text-white/50",
};

const paymentStatusLabels: Record<PaymentStatus, string> = {
  unpaid: "Unpaid",
  pending: "Payment Pending via Cashflows",
  paid: "Payment Taken via Cashflows",
  failed: "Payment Failed via Cashflows",
  cancelled: "Payment Cancelled via Cashflows",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function AdminGiftCardsPage() {
  const orders = await getOrders();
  const purchases = getGiftCardPurchases(orders);
  const activePurchases = purchases.filter((p) => p.paymentStatus === "paid");
  const totalActiveValue = activePurchases.reduce((sum, p) => sum + p.totalValue, 0);

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-extrabold text-[#202e25] dark:text-white sm:text-2xl">
          Gift Cards
        </h1>
        <p className="mt-1 text-sm text-[#202e25]/60 dark:text-white/60">
          Gift cards purchased through the website. Each entry shows the
          customer, the denominations bought, and the total value paid.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1c2225]">
          <p className="text-xs font-bold uppercase tracking-wide text-[#202e25]/40 dark:text-white/40">
            Paid Gift Cards
          </p>
          <p className="mt-2 text-2xl font-extrabold text-[#202e25] dark:text-white">
            {activePurchases.reduce((sum, p) => sum + p.lines.reduce((s, l) => s + l.quantity, 0), 0)}
          </p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1c2225]">
          <p className="text-xs font-bold uppercase tracking-wide text-[#202e25]/40 dark:text-white/40">
            Total Value Issued
          </p>
          <p className="mt-2 text-2xl font-extrabold text-[#202e25] dark:text-white">
            £{totalActiveValue.toFixed(2)}
          </p>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1c2225]">
          <p className="text-xs font-bold uppercase tracking-wide text-[#202e25]/40 dark:text-white/40">
            Awaiting Payment
          </p>
          <p className="mt-2 text-2xl font-extrabold text-[#202e25] dark:text-white">
            {purchases.length - activePurchases.length}
          </p>
        </div>
      </div>

      {purchases.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-3xl border border-black/5 bg-white p-12 text-center shadow-sm dark:border-white/10 dark:bg-[#1c2225]">
          <Inbox className="h-10 w-10 text-[#202e25]/25 dark:text-white/25" />
          <p className="text-sm font-semibold text-[#202e25]/60 dark:text-white/60">
            No gift cards have been purchased yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-black/5 bg-white shadow-sm dark:border-white/10 dark:bg-[#1c2225]">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 text-xs font-bold uppercase tracking-wide text-[#202e25]/40 dark:border-white/10 dark:text-white/40">
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Phone</th>
                <th className="px-5 py-3.5">Gift Card</th>
                <th className="px-5 py-3.5">Value</th>
                <th className="px-5 py-3.5">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/10">
              {purchases.map((purchase) => (
                <tr key={purchase.orderId} className="align-top">
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-[#202e25]/60 dark:text-white/60">
                    {formatDate(purchase.createdAt)}
                  </td>
                  <td className="px-5 py-4 font-semibold text-[#202e25] dark:text-white">
                    {purchase.firstName} {purchase.lastName}
                  </td>
                  <td className="px-5 py-4 text-[#202e25]/70 dark:text-white/70">
                    {purchase.email}
                  </td>
                  <td className="px-5 py-4 text-[#202e25]/70 dark:text-white/70">
                    {purchase.phone}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <Gift className="h-3.5 w-3.5 text-[#18af8a]" />
                      {purchase.lines.map((line, i) => (
                        <span key={i} className="font-semibold text-[#202e25] dark:text-white">
                          {line.quantity} x {line.label}
                          {i < purchase.lines.length - 1 ? "," : ""}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-bold text-[#18af8a]">
                    £{purchase.totalValue.toFixed(2)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${paymentStatusStyles[purchase.paymentStatus]}`}
                    >
                      {paymentStatusLabels[purchase.paymentStatus]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
