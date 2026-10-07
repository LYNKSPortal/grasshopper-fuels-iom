import { getCustomers } from "@/lib/orders";
import { CustomersTable } from "@/components/admin/customers-table";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="p-4 sm:p-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl font-extrabold text-[#202e25] sm:text-2xl">Customers</h1>
        <p className="mt-1 text-sm text-[#202e25]/60">
          Everyone who has submitted an enquiry, with their full order history.
        </p>
      </div>

      <CustomersTable customers={customers} />
    </div>
  );
}
