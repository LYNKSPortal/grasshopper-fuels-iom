import { randomUUID } from "crypto";
import { query, withConnection } from "@/lib/db";
import type { Customer, NewOrderInput, Order, OrderStatus, StatusNote } from "@/lib/order-types";

export type { Customer, NewOrderInput, Order, OrderStatus };
export { orderStatuses } from "@/lib/order-types";
export type { StatusNote } from "@/lib/order-types";

type OrderRow = {
  id: string;
  created_at: Date;
  status: OrderStatus;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  order_summary: string;
  address: string;
  message: string;
};

type StatusNoteRow = {
  id: string;
  order_id: string;
  status: OrderStatus;
  note: string;
  created_at: Date;
};

function toOrder(row: OrderRow, notes: StatusNoteRow[]): Order {
  return {
    id: row.id,
    createdAt: row.created_at.toISOString(),
    status: row.status,
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    order: row.order_summary,
    address: row.address,
    message: row.message,
    statusNotes: notes.map(toStatusNote),
  };
}

function toStatusNote(row: StatusNoteRow): StatusNote {
  return {
    id: row.id,
    status: row.status,
    note: row.note,
    createdAt: row.created_at.toISOString(),
  };
}

export async function getOrders(): Promise<Order[]> {
  const { rows: orderRows } = await query<OrderRow>(
    "SELECT * FROM orders ORDER BY created_at DESC"
  );
  if (orderRows.length === 0) return [];

  const { rows: noteRows } = await query<StatusNoteRow>(
    "SELECT * FROM order_status_notes WHERE order_id = ANY($1) ORDER BY created_at ASC",
    [orderRows.map((o) => o.id)]
  );

  const notesByOrderId = new Map<string, StatusNoteRow[]>();
  for (const note of noteRows) {
    const existing = notesByOrderId.get(note.order_id);
    if (existing) {
      existing.push(note);
    } else {
      notesByOrderId.set(note.order_id, [note]);
    }
  }

  return orderRows.map((row) => toOrder(row, notesByOrderId.get(row.id) ?? []));
}

export async function createOrder(input: NewOrderInput): Promise<Order> {
  const id = randomUUID();
  const { rows } = await query<OrderRow>(
    `INSERT INTO orders
      (id, first_name, last_name, email, phone, order_summary, address, message)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [
      id,
      input.firstName,
      input.lastName,
      input.email,
      input.phone,
      input.order,
      input.address,
      input.message,
    ]
  );
  return toOrder(rows[0], []);
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  note?: string
): Promise<Order | null> {
  return withConnection(async (client) => {
    const { rows } = await client.query<OrderRow>(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    if (rows.length === 0) return null;

    if (note && note.trim()) {
      await client.query(
        `INSERT INTO order_status_notes (id, order_id, status, note)
         VALUES ($1, $2, $3, $4)`,
        [randomUUID(), id, status, note.trim()]
      );
    }

    const { rows: noteRows } = await client.query<StatusNoteRow>(
      "SELECT * FROM order_status_notes WHERE order_id = $1 ORDER BY created_at ASC",
      [id]
    );

    return toOrder(rows[0], noteRows);
  });
}

export async function getCustomers(): Promise<Customer[]> {
  const orders = await getOrders();
  const byEmail = new Map<string, Order[]>();

  for (const order of orders) {
    const key = order.email.trim().toLowerCase();
    const existing = byEmail.get(key);
    if (existing) {
      existing.push(order);
    } else {
      byEmail.set(key, [order]);
    }
  }

  const customers: Customer[] = Array.from(byEmail.entries()).map(
    ([email, customerOrders]) => {
      const latest = customerOrders[0];
      return {
        email,
        firstName: latest.firstName,
        lastName: latest.lastName,
        phone: latest.phone,
        address: latest.address,
        orders: customerOrders,
        totalOrders: customerOrders.length,
        lastOrderDate: latest.createdAt,
      };
    }
  );

  return customers.sort(
    (a, b) => new Date(b.lastOrderDate).getTime() - new Date(a.lastOrderDate).getTime()
  );
}

export async function getCustomerByEmail(email: string): Promise<Customer | null> {
  const customers = await getCustomers();
  return (
    customers.find((c) => c.email === email.trim().toLowerCase()) ?? null
  );
}
