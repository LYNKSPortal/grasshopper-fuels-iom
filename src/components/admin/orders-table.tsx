"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Inbox } from "lucide-react";
import { OrderStatusSelect } from "@/components/admin/order-status-select";
import { SortableHeader, type SortDirection } from "@/components/admin/sortable-header";
import type { Order } from "@/lib/order-types";

type SortKey =
  | "date"
  | "customer"
  | "email"
  | "phone"
  | "order"
  | "address"
  | "notes"
  | "status";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "date", label: "Date" },
  { value: "customer", label: "Customer" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "order", label: "Order" },
  { value: "address", label: "Address" },
  { value: "notes", label: "Notes" },
  { value: "status", label: "Status" },
];

function getSortValue(order: Order, key: SortKey): string | number {
  switch (key) {
    case "date":
      return new Date(order.createdAt).getTime();
    case "customer":
      return `${order.lastName} ${order.firstName}`.toLowerCase();
    case "email":
      return order.email.toLowerCase();
    case "phone":
      return order.phone.toLowerCase();
    case "order":
      return order.order.toLowerCase();
    case "address":
      return order.address.toLowerCase();
    case "notes":
      return order.message.toLowerCase();
    case "status":
      return order.status;
  }
}

function splitOrderItems(order: string): string[] {
  return order
    .split(", ")
    .map((item) => item.trim())
    .filter(Boolean);
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function OrdersTable({
  title,
  description,
  orders,
  emptyLabel,
}: {
  title: string;
  description: string;
  orders: Order[];
  emptyLabel: string;
}) {
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDir, setSortDir] = useState<SortDirection>("desc");

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const sortedOrders = useMemo(() => {
    const copy = [...orders];
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
  }, [orders, sortKey, sortDir]);

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-extrabold text-[#202e25]">{title}</h2>
        <p className="text-sm text-[#202e25]/55">{description}</p>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-black/10 bg-white py-14 text-center">
          <Inbox className="h-8 w-8 text-[#202e25]/25" />
          <p className="text-sm font-semibold text-[#202e25]/55">{emptyLabel}</p>
        </div>
      ) : (
        <>
          {/* Mobile: sort control + stacked cards */}
          <div className="sm:hidden">
            <div className="mb-3 flex items-center gap-2">
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                aria-label="Sort orders by"
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
              {sortedOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-bold text-[#202e25]">
                        {order.firstName} {order.lastName}
                      </p>
                      <p className="text-xs font-medium text-[#202e25]/50">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <OrderStatusSelect orderId={order.id} status={order.status} />
                  </div>

                  <dl className="mt-3 space-y-2.5 border-t border-black/5 pt-3 text-sm">
                    <MobileField label="Email">
                      <a href={`mailto:${order.email}`} className="break-all text-[#202e25]/80">
                        {order.email}
                      </a>
                    </MobileField>
                    <MobileField label="Phone">
                      <a href={`tel:${order.phone}`} className="text-[#202e25]/80">
                        {order.phone}
                      </a>
                    </MobileField>
                    <MobileField label="Order">
                      <div className="flex flex-col gap-1 text-[#202e25]/80">
                        {splitOrderItems(order.order).map((item, i) => (
                          <div key={i}>{item}</div>
                        ))}
                      </div>
                    </MobileField>
                    <MobileField label="Address">
                      <span className="text-[#202e25]/80">{order.address}</span>
                    </MobileField>
                    {(order.message || order.statusNotes.length > 0) && (
                      <MobileField label="Notes">
                        {order.message && (
                          <div className="text-[#202e25]/80">{order.message}</div>
                        )}
                        {order.statusNotes.length > 0 && (
                          <div className="mt-1.5 space-y-1.5 border-t border-black/5 pt-1.5">
                            {order.statusNotes.map((sn) => (
                              <div key={sn.id} className="text-xs">
                                <span className="font-bold text-[#202e25]/70">
                                  {sn.status.replace("_", " ")}:
                                </span>{" "}
                                <span className="text-[#202e25]/60">{sn.note}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </MobileField>
                    )}
                  </dl>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop/tablet: full table */}
          <div className="hidden overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm sm:block">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-black/5 bg-[#f7faf9] text-xs font-bold text-[#202e25]/50">
                    <SortableHeader label="Date" sortKey="date" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
                    <SortableHeader label="Customer" sortKey="customer" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
                    <SortableHeader label="Email" sortKey="email" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
                    <SortableHeader label="Phone" sortKey="phone" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
                    <SortableHeader label="Order" sortKey="order" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
                    <SortableHeader label="Address" sortKey="address" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
                    <SortableHeader label="Notes" sortKey="notes" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
                    <SortableHeader label="Status" sortKey="status" activeKey={sortKey} direction={sortDir} onSort={handleSort} />
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {sortedOrders.map((order) => (
                    <tr key={order.id} className="align-top">
                      <td className="whitespace-nowrap px-6 py-4 text-xs font-medium text-[#202e25]/60">
                        {formatDate(order.createdAt)}
                      </td>
                      <td className="px-6 py-4 font-semibold text-[#202e25]">
                        {order.firstName} {order.lastName}
                      </td>
                      <td className="px-6 py-4 text-[#202e25]/70">{order.email}</td>
                      <td className="px-6 py-4 text-[#202e25]/70">{order.phone}</td>
                      <td className="max-w-xs px-6 py-4 text-[#202e25]/70">
                        <div className="flex flex-col gap-1">
                          {splitOrderItems(order.order).map((item, i) => (
                            <div key={i}>{item}</div>
                          ))}
                        </div>
                      </td>
                      <td className="max-w-xs px-6 py-4 text-[#202e25]/70">
                        {order.address}
                      </td>
                      <td className="max-w-xs px-6 py-4 text-[#202e25]/70">
                        <div>{order.message}</div>
                        {order.statusNotes.length > 0 && (
                          <div className="mt-2 space-y-1.5 border-t border-black/5 pt-2">
                            {order.statusNotes.map((sn) => (
                              <div key={sn.id} className="text-xs">
                                <span className="font-bold text-[#202e25]/70">
                                  {sn.status.replace("_", " ")}:
                                </span>{" "}
                                <span className="text-[#202e25]/60">{sn.note}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <OrderStatusSelect orderId={order.id} status={order.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

function MobileField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-[0.65rem] font-bold uppercase tracking-wide text-[#202e25]/40">
        {label}
      </dt>
      <dd className="mt-0.5">{children}</dd>
    </div>
  );
}
