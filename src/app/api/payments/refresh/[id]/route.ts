import { NextRequest, NextResponse } from "next/server";
import { getOrderById, syncPaymentStatus } from "@/lib/orders";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const order = await getOrderById(id);
  if (!order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  const updated = await syncPaymentStatus(order);
  return NextResponse.json({ order: updated });
}
