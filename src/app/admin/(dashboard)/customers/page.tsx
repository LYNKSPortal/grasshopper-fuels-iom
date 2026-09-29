import { getCustomers } from "@/lib/orders";
import { CustomersTable } from "@/components/admin/customers-table";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#202e25]">Customers</h1>
        <p className="mt-1 text-sm text-[#202e25]/60">
          Everyone who has submitted an enquiry, with their full order history.
        </p>
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
}
