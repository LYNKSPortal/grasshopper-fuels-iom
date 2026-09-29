import { getOrders } from "@/lib/orders";
import { OrdersTable } from "@/components/admin/orders-table";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  const pending = orders.filter((o) => o.status === "pending");
  const inProcess = orders.filter((o) => o.status === "in_process");
  const done = orders.filter((o) => o.status === "done");

  return (
    <div className="space-y-12 p-8">
      <div>
        <h1 className="text-2xl font-extrabold text-[#202e25]">Orders</h1>
        <p className="mt-1 text-sm text-[#202e25]/60">
          Enquiries submitted through the website contact form.
        </p>
      </div>

      <OrdersTable
        title="Pending"
        description="New enquiries awaiting review."
        orders={pending}
        emptyLabel="No pending orders"
      />

      <OrdersTable
        title="In Process"
        description="Orders currently being arranged for delivery."
        orders={inProcess}
        emptyLabel="No orders in process"
      />

      <OrdersTable
        title="Done"
        description="Completed orders."
        orders={done}
        emptyLabel="No completed orders"
      />
    </div>
  );
}
