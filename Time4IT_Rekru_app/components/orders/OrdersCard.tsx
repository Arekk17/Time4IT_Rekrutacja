"use client";
import { useState } from "react";
import { OrdersResponse } from "@/lib/api/orders";
import { OrdersTable } from "./OrdersTable";
import { OrdersPagination } from "./OrdersPagination";
import { AddOrderModal } from "./AddOrderModal";
import { ConfigureViewSelect, ViewColumn } from "./ConfigureViewSelect";

interface OrdersCardProps {
  ordersData: OrdersResponse;
}

export function OrdersCard({ ordersData }: OrdersCardProps) {
  const [visibleColumns, setVisibleColumns] = useState<ViewColumn[]>([
    { id: "orderNumber", label: "Numer zamówienia", checked: true },
    { id: "date", label: "Data", checked: true },
    { id: "status", label: "Status", checked: true },
    { id: "amount", label: "Kwota", checked: true },
    { id: "customer", label: "Klient", checked: true },
    { id: "description", label: "Opis zamówienia", checked: false },
  ]);

  const handleColumnsChange = (columns: ViewColumn[]) => {
    setVisibleColumns(columns);
  };

  return (
    <div className="w-full max-w-[1216px] bg-card border border-border shadow-[0px_1px_2px_rgba(10,13,18,0.05)] rounded-xl overflow-hidden">
      <div className="flex flex-row justify-between items-center px-5 py-3 pb-2 gap-4">
        <h1 className="font-['Inter'] font-semibold text-sm leading-5 text-foreground flex-1">
          Zamówienia
        </h1>
      </div>
      <div className="bg-background shadow-[0px_1px_2px_rgba(10,13,18,0.05)] mx-0 rounded-xl border-y border-border">
        <div className="flex flex-col justify-center items-end p-5 gap-5 w-full h-[170px]">
          <div className="flex flex-row items-start gap-4 w-full h-[70px]">
            <div className="flex flex-row items-center flex-1 h-[58px]">
              <div className="flex flex-col justify-center items-start flex-1 h-[58px]">
                <div className="w-[39px] h-[38px] font-['Inter'] font-semibold text-[30px] leading-[38px] text-foreground">
                  {ordersData.total}
                </div>

                <div className="flex flex-row items-center gap-2 w-[149px] h-5">
                  <span className="w-[149px] h-5 font-['Inter'] font-medium text-sm leading-5 text-muted-foreground">
                    Wszystkich zamówień
                  </span>
                </div>
              </div>

              <div className="flex-none">
                <AddOrderModal />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-end">
            <ConfigureViewSelect
              columns={visibleColumns}
              onColumnsChange={handleColumnsChange}
            />
          </div>
        </div>

        <OrdersTable
          orders={ordersData.items}
          visibleColumns={visibleColumns}
        />

        <OrdersPagination
          currentPage={ordersData.page}
          totalPages={ordersData.totalPages}
          hasPrev={ordersData.hasPrev}
          hasNext={ordersData.hasNext}
        />
      </div>
    </div>
  );
}
