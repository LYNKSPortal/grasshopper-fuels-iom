import { NextRequest, NextResponse } from "next/server";
import { deleteOrder, getOrderById, updateOrderStatus } from "@/lib/orders";
import { orderStatuses, type OrderStatus } from "@/lib/order-types";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { sendOrderStatusEmail } from "@/lib/email";

const validStatuses = orderStatuses.map((s) => s.value);

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const status = body?.status as OrderStatus | undefined;
  const note = typeof body?.note === "string" ? body.note : undefined;

  if (!status || !validStatuses.includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const previous = await getOrderById(id);
  const order = await updateOrderStatus(id, status, note);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  if (previous && previous.status !== status) {
    // Fire-and-forget: a failed/unconfigured email must never block the
    // admin status update itself.
    void sendOrderStatusEmail(order, status, note);
  }

  return NextResponse.json({ order });
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const deleted = await deleteOrder(id);
  if (!deleted) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
