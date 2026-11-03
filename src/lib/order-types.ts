export type OrderStatus = "pending" | "in_process" | "done";

export type PaymentStatus = "unpaid" | "pending" | "paid" | "failed" | "cancelled";

export type StatusNote = {
  id: string;
  status: OrderStatus;
  note: string;
  createdAt: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  order: string;
  address: string;
  message: string;
  statusNotes: StatusNote[];
  paymentStatus: PaymentStatus;
  paymentJobReference: string | null;
  paymentReference: string | null;
  amountToCollect: string | null;
};

export type NewOrderInput = Omit<
  Order,
  | "id"
  | "createdAt"
  | "status"
  | "statusNotes"
  | "paymentStatus"
  | "paymentJobReference"
  | "paymentReference"
>;

export type Customer = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  orders: Order[];
  totalOrders: number;
  lastOrderDate: string;
};

export const orderStatuses: { value: OrderStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "in_process", label: "In Process" },
  { value: "done", label: "Done" },
];
