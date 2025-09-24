import { OrderStatus } from "@/lib/orders-types";

export const statusOptions: { value: OrderStatus; label: string }[] = [
  { value: "new", label: "Nowe" },
  { value: "processing", label: "W trakcie" },
  { value: "shipped", label: "Wysłane" },
  { value: "delivered", label: "Dostarczone" },
  { value: "cancelled", label: "Anulowane" },
];
