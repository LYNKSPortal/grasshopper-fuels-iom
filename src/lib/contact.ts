import { randomUUID } from "crypto";
import { query } from "@/lib/db";

export type ContactMessage = {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export type NewContactMessageInput = Omit<ContactMessage, "id" | "createdAt">;

type ContactMessageRow = {
  id: string;
  created_at: Date;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  message: string;
};

function toContactMessage(row: ContactMessageRow): ContactMessage {
  return {
    id: row.id,
    createdAt: row.created_at.toISOString(),
    firstName: row.first_name,
    lastName: row.last_name,
    email: row.email,
    phone: row.phone,
    message: row.message,
  };
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const { rows } = await query<ContactMessageRow>(
    "SELECT * FROM contact_messages ORDER BY created_at DESC"
  );
  return rows.map(toContactMessage);
}

export async function createContactMessage(
  input: NewContactMessageInput
): Promise<ContactMessage> {
  const { rows } = await query<ContactMessageRow>(
    `INSERT INTO contact_messages (id, first_name, last_name, email, phone, message)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [randomUUID(), input.firstName, input.lastName, input.email, input.phone, input.message]
  );
  return toContactMessage(rows[0]);
}
