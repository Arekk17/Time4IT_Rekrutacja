"use client";

import { OrdersTable } from "./OrdersTable";
import { OrdersPagination } from "./OrdersPagination";
import { Order } from "@/lib/orders-types";
import { ViewColumn } from "./ConfigureViewSelect";

interface OrdersTableContainerProps {
  orders: Order[];
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export function OrdersTableContainer({
  orders,
  currentPage,
  totalPages,
  hasPrev,
  hasNext,
}: OrdersTableContainerProps) {
  const defaultVisibleColumns: ViewColumn[] = [
    { id: "orderNumber", label: "Numer zamówienia", checked: true },
    { id: "date", label: "Data", checked: true },
    { id: "status", label: "Status", checked: true },
    { id: "amount", label: "Kwota", checked: true },
    { id: "customer", label: "Klient", checked: true },
    { id: "description", label: "Opis zamówienia", checked: true },
  ];

  return (
    <div className="w-full">
      <OrdersTable orders={orders} visibleColumns={defaultVisibleColumns} />

      <OrdersPagination
        currentPage={currentPage}
        totalPages={totalPages}
        hasPrev={hasPrev}
        hasNext={hasNext}
      />
    </div>
  );
}
