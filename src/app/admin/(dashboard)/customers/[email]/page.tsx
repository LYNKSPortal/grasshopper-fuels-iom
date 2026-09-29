import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getCustomerByEmail } from "@/lib/orders";
import { OrdersTable } from "@/components/admin/orders-table";

export const dynamic = "force-dynamic";

export default async function AdminCustomerDetailPage({
  params,
}: {
  params: Promise<{ email: string }>;
}) {
  const { email } = await params;
  const customer = await getCustomerByEmail(decodeURIComponent(email));

  if (!customer) {
    notFound();
  }

  return (
    <div className="p-8">
      <Link
        href="/admin/customers"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#202e25]/60 hover:text-[#202e25]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to customers
      </Link>

      <div className="mb-8 rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-extrabold text-[#202e25]">
          {customer.firstName} {customer.lastName}
        </h1>
        <div className="mt-3 grid grid-cols-1 gap-3 text-sm text-[#202e25]/70 sm:grid-cols-3">
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-[#202e25]/40">
              Email
            </div>
            {customer.email}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-[#202e25]/40">
              Phone
            </div>
            {customer.phone}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wide text-[#202e25]/40">
              Address
            </div>
            {customer.address}
          </div>
        </div>
        <div className="mt-4 text-sm font-semibold text-[#18af8a]">
          {customer.totalOrders} total order{customer.totalOrders === 1 ? "" : "s"}
        </div>
      </div>

      <OrdersTable
        title="Order History"
        description="All enquiries submitted by this customer."
        orders={customer.orders}
        emptyLabel="No orders yet"
      />
    </div>
  );
}
