"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/orders-types";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import { DeleteOrderDialog } from "./DeleteOrderDialog";
import { StatusBadge } from "@/components/common/StatusBadge";
import { ActionMenu } from "@/components/common/ActionMenu";
import { Checkbox } from "@/components/ui/checkbox";
import { ViewColumn } from "./ConfigureViewSelect";

interface OrdersTableProps {
  orders: Order[];
  visibleColumns: ViewColumn[];
}

type SortField = "orderNumber" | "totalGross" | "dueDate";
type SortDirection = "asc" | "desc";

export function OrdersTable({ orders, visibleColumns }: OrdersTableProps) {
  const router = useRouter();
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());

  const isColumnVisible = (columnId: string) => {
    const column = visibleColumns.find((col) => col.id === columnId);
    return column?.checked ?? true;
  };

  const isAllSelected =
    orders.length > 0 && selectedOrders.size === orders.length;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(orders.map((order) => order.id)));
    }
  };

  const handleSelectOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedOrders = useMemo(() => {
    if (!sortField) return orders;

    return [...orders].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case "orderNumber":
          aValue = a.orderNumber;
          bValue = b.orderNumber;
          break;
        case "totalGross":
          aValue = a.totalGross;
          bValue = b.totalGross;
          break;
        case "dueDate":
          aValue = new Date(a.dueDate).getTime();
          bValue = new Date(b.dueDate).getTime();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [orders, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return (
        <ChevronsUpDown className="w-3 h-3 text-text-tertiary flex-none" />
      );
    }
    return sortDirection === "asc" ? (
      <ChevronUp className="w-3 h-3 text-text-tertiary flex-none" />
    ) : (
      <ChevronDown className="w-3 h-3 text-text-tertiary flex-none" />
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("pl-PL", {
      style: "currency",
      currency: "PLN",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pl-PL");
  };

  const handleDeleteSuccess = () => {
    router.refresh();
  };

  return (
    <div className="w-full border-t border-border">
      <div className="w-full bg-background overflow-x-auto">
        {sortedOrders.length === 0 ? (
          <div className="px-5 py-8 text-center text-muted-foreground border-b border-border">
            Brak zamówień do wyświetlenia
          </div>
        ) : (
          <div className="flex flex-row w-full min-w-max">
            {isColumnVisible("orderNumber") && (
              <div className="flex flex-col w-[592px] min-w-[592px]">
                <div className="flex flex-row items-center px-[20px] pr-[24px] py-[12px] gap-[12px] h-11 bg-background border-b border-border">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex flex-row items-center !p-0 gap-1 hover:bg-transparent w-auto h-auto"
                    onClick={() => handleSort("orderNumber")}
                  >
                    <span className="font-semibold text-xs leading-[18px] text-text-secondary flex-none ">
                      Numer zamówienia
                    </span>
                    <SortIcon field="orderNumber" />
                  </Button>
                </div>

                {sortedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-row items-center px-[20px] pr-[24px] py-[16px] gap-[12px] h-[72px] border-b border-border"
                  >
                    <Checkbox
                      checked={selectedOrders.has(order.id)}
                      onCheckedChange={() => handleSelectOrder(order.id)}
                    />
                    <div className="flex flex-col items-start p-0 w-[120px] h-5">
                      <span className="w-[120px] h-5 font-medium text-sm leading-5 text-foreground flex-none">
                        {order.orderNumber}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isColumnVisible("date") && (
              <div className="flex flex-col w-32 min-w-[120px]">
                <div className="flex flex-row items-center px-[24px] py-[12px] gap-[12px] h-11 bg-background border-b border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex flex-row items-center !p-0 gap-1 hover:bg-transparent w-auto h-auto"
                    onClick={() => handleSort("dueDate")}
                  >
                    <span className="font-semibold text-xs leading-[18px] text-text-secondary flex-none">
                      Data
                    </span>
                    <SortIcon field="dueDate" />
                  </Button>
                </div>
                {sortedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-row items-center px-[24px] py-[16px] gap-[12px] h-[72px] border-b border-border"
                  >
                    <div className="flex flex-col items-start p-0 w-[85px] h-5">
                      <span className="w-[85px] h-5 font-normal text-sm leading-5 text-muted-foreground flex-none">
                        {formatDate(order.dueDate)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isColumnVisible("status") && (
              <div className="flex flex-col w-36 min-w-[100px]">
                <div className="flex flex-row items-center px-6 py-3 h-11 bg-background border-b border-border">
                  <span className="font-semibold text-xs leading-[18px] text-muted-foreground">
                    Status
                  </span>
                </div>
                {sortedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-row items-center px-6 py-4 h-[72px] border-b border-border"
                  >
                    <StatusBadge status={order.status} />
                  </div>
                ))}
              </div>
            )}

            {isColumnVisible("amount") && (
              <div className="flex flex-col w-28 min-w-[100px]">
                <div className="flex flex-row items-center px-[24px] py-[12px] gap-[12px] h-11 bg-background border-b border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex flex-row items-center !p-0 gap-1 hover:bg-transparent w-auto h-auto"
                    onClick={() => handleSort("totalGross")}
                  >
                    <span className="font-semibold text-xs leading-[18px] text-text-secondary flex-none">
                      Kwota
                    </span>
                    <SortIcon field="totalGross" />
                  </Button>
                </div>
                {sortedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-row items-center px-[24px] py-[16px] gap-[12px] h-[72px] border-b border-border"
                  >
                    <div className="flex flex-col items-start p-0 w-[51px] h-5">
                      <span className="w-[51px] h-5 font-normal text-sm leading-5 text-muted-foreground flex-none">
                        {formatCurrency(order.totalGross)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isColumnVisible("customer") && (
              <div className="flex flex-col flex-1 min-w-[150px]">
                <div className="flex flex-row items-center px-6 py-3 h-11 bg-background border-b border-border">
                  <span className="font-semibold text-xs leading-[18px] text-muted-foreground">
                    Klient
                  </span>
                </div>
                {sortedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-row items-center px-6 py-4 h-[72px] border-b border-border"
                  >
                    <span className="font-medium text-sm leading-5 text-foreground">
                      {order.customer}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {isColumnVisible("description") && (
              <div className="flex flex-col flex-1 min-w-[200px]">
                <div className="flex flex-row items-center px-6 py-3 h-11 bg-background border-b border-border">
                  <span className="font-semibold text-xs leading-[18px] text-muted-foreground">
                    Opis zamówienia
                  </span>
                </div>
                {sortedOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-row items-center px-6 py-4 h-[72px] border-b border-border"
                  >
                    <span className="font-normal text-sm leading-5 text-muted-foreground">
                      {order.description || "—"}
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col w-12 min-w-[48px]">
              <div className="flex flex-row items-center px-4 py-3 h-11 bg-background border-b border-border"></div>
              {sortedOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex flex-row items-center px-4 py-4 h-[72px] border-b border-border"
                >
                  <ActionMenu onDelete={() => setDeleteOrderId(order.id)} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <DeleteOrderDialog
        orderId={deleteOrderId}
        onClose={() => setDeleteOrderId(null)}
        onSuccess={handleDeleteSuccess}
      />
    </div>
  );
}
