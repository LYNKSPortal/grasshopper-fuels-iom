"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, ChevronRight, Users } from "lucide-react";
import { SortableHeader, type SortDirection } from "@/components/admin/sortable-header";
import type { Customer } from "@/lib/order-types";

type SortKey = "name" | "email" | "phone" | "address" | "orders" | "lastOrder";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "name", label: "Name" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "address", label: "Address" },
  { value: "orders", label: "Orders" },
  { value: "lastOrder", label: "Last Order" },
];

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
    <>
      {/* Mobile: sort control + stacked cards */}
      <div className="sm:hidden">
        <div className="mb-3 flex items-center gap-2">
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            aria-label="Sort customers by"
            className="h-10 flex-1 rounded-xl border border-black/10 bg-white px-3 text-sm font-semibold text-[#202e25]"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                Sort by {o.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
            aria-label="Toggle sort direction"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white text-[#202e25]/60 active:bg-[#f7faf9]"
          >
            {sortDir === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="space-y-3">
          {sortedCustomers.map((customer) => (
            <Link
              key={customer.email}
              href={`/admin/customers/${encodeURIComponent(customer.email)}`}
              className="block rounded-2xl border border-black/5 bg-white p-4 shadow-sm active:bg-[#f7faf9]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-bold text-[#202e25]">
                    {customer.firstName} {customer.lastName}
                  </p>
                  <p className="text-xs font-medium text-[#202e25]/50">
                    {customer.totalOrders} order{customer.totalOrders === 1 ? "" : "s"} &middot;
                    Last {formatDate(customer.lastOrderDate)}
                  </p>
                </div>
                <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-[#202e25]/30" />
              </div>

              <dl className="mt-3 space-y-2.5 border-t border-black/5 pt-3 text-sm">
                <div>
                  <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-[#202e25]/40">
                    Email
                  </dt>
                  <dd className="mt-0.5 break-all text-[#202e25]/80">{customer.email}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-[#202e25]/40">
                    Phone
                  </dt>
                  <dd className="mt-0.5 text-[#202e25]/80">{customer.phone}</dd>
                </div>
                <div>
                  <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-[#202e25]/40">
                    Address
                  </dt>
                  <dd className="mt-0.5 text-[#202e25]/80">{customer.address}</dd>
                </div>
              </dl>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop/tablet: full table */}
      <div className="hidden overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm sm:block">
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
    </>
  );
}
