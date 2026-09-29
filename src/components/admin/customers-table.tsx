"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Users } from "lucide-react";
import { SortableHeader, type SortDirection } from "@/components/admin/sortable-header";
import type { Customer } from "@/lib/order-types";

type SortKey = "name" | "email" | "phone" | "address" | "orders" | "lastOrder";

function getSortValue(customer: Customer, key: SortKey): string | number {
  switch (key) {
    case "name":
      return `${customer.lastName} ${customer.firstName}`.toLowerCase();
    case "email":
      return customer.email.toLowerCase();
    case "phone":
      return customer.phone.toLowerCase();
    case "address":
      return customer.address.toLowerCase();
    case "orders":
      return customer.totalOrders;
    case "lastOrder":
      return new Date(customer.lastOrderDate).getTime();
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function CustomersTable({ customers }: { customers: Customer[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("lastOrder");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sortedCustomers = useMemo(() => {
    const copy = [...customers];
    copy.sort((a, b) => {
      const aVal = getSortValue(a, sortKey);
      const bVal = getSortValue(b, sortKey);
      const result =
        typeof aVal === "number" && typeof bVal === "number"
          ? aVal - bVal
          : String(aVal).localeCompare(String(bVal));
      return sortDir === "asc" ? result : -result;
    });
    return copy;
  }, [customers, sortKey, sortDir]);

  if (sortedCustomers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-black/10 bg-white py-20 text-center">
        <Users className="h-10 w-10 text-[#202e25]/25" />
        <p className="text-sm font-semibold text-[#202e25]/60">No customers yet</p>
        <p className="max-w-xs text-xs text-[#202e25]/45">
          Customers who submit the contact form will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-black/5 bg-[#f7faf9] text-xs font-bold text-[#202e25]/50">
              <SortableHeader label="Name" sortKey="name" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
              <SortableHeader label="Email" sortKey="email" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
              <SortableHeader label="Phone" sortKey="phone" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
              <SortableHeader label="Address" sortKey="address" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
              <SortableHeader label="Orders" sortKey="orders" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
              <SortableHeader label="Last Order" sortKey="lastOrder" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
              <th className="px-6 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {sortedCustomers.map((customer) => (
              <tr key={customer.email} className="align-top">
                <td className="px-6 py-4 font-semibold text-[#202e25]">
                  {customer.firstName} {customer.lastName}
                </td>
                <td className="px-6 py-4 text-[#202e25]/70">{customer.email}</td>
                <td className="px-6 py-4 text-[#202e25]/70">{customer.phone}</td>
                <td className="max-w-xs px-6 py-4 text-[#202e25]/70">
                  {customer.address}
                </td>
                <td className="px-6 py-4 text-[#202e25]/70">{customer.totalOrders}</td>
                <td className="whitespace-nowrap px-6 py-4 text-[#202e25]/70">
                  {formatDate(customer.lastOrderDate)}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/customers/${encodeURIComponent(customer.email)}`}
                    className="text-sm font-semibold text-[#18af8a] hover:underline"
                  >
                    View history
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
