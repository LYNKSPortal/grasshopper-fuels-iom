import type { Metadata } from "next";
import { getAllStockEntries } from "@/lib/stock";
import { StockManager } from "@/components/admin/stock-manager";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminStockPage() {
  const items = await getAllStockEntries();

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-extrabold text-[#202e25] dark:text-white sm:text-2xl">
          Stock
        </h1>
        <p className="mt-1 text-sm text-[#202e25]/60 dark:text-white/60">
          Toggle which product variants are currently available. Out-of-stock
          variants are disabled across the website immediately - no code
          changes needed.
        </p>
      </div>

      <StockManager items={items} />
    </div>
  );
}
