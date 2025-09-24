"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface OrdersPaginationProps {
  currentPage: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export function OrdersPagination({
  currentPage,
  totalPages,
  hasPrev,
  hasNext,
}: OrdersPaginationProps) {
  return (
    <div className="flex flex-row justify-between items-center px-6 py-4">
      <div className="font-medium text-sm leading-5 text-muted-foreground">
        Strona {currentPage} z {totalPages}
      </div>

      <div className="flex flex-row gap-3">
        {hasPrev ? (
          <Link href={`/orders?page=${currentPage - 1}`}>
            <Button className="flex flex-row justify-center items-center px-3 py-2 gap-1 w-[93px] h-9 bg-background border-[0.5px] border-border shadow-[0px_1px_2px_rgba(10,13,18,0.05)] rounded-lg font-semibold text-sm leading-5 text-muted-foreground hover:bg-gray-50">
              Poprzednia
            </Button>
          </Link>
        ) : (
          <Button
            disabled
            className="flex flex-row justify-center items-center px-3 py-2 gap-1 w-[93px] h-9 bg-background border-[0.5px] border-border shadow-[0px_1px_2px_rgba(10,13,18,0.05)] rounded-lg font-semibold text-sm leading-5 text-muted-foreground opacity-50 cursor-not-allowed"
          >
            Poprzednia
          </Button>
        )}
        {hasNext ? (
          <Link href={`/orders?page=${currentPage + 1}`}>
            <Button className="flex flex-row justify-center items-center px-3 py-2 gap-1 w-[93px] h-9 bg-background border-[0.5px] border-border shadow-[0px_1px_2px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_rgba(10,13,18,0.05)] rounded-lg font-semibold text-sm leading-5 text-muted-foreground hover:bg-gray-50">
              Następna
            </Button>
          </Link>
        ) : (
          <Button
            disabled
            className="flex flex-row justify-center items-center px-3 py-2 gap-1 w-[93px] h-9 bg-background border-[0.5px] border-border shadow-[0px_1px_2px_rgba(10,13,18,0.05)] rounded-lg font-semibold text-sm leading-5 text-muted-foreground opacity-50 cursor-not-allowed"
          >
            Następna
          </Button>
        )}
      </div>
    </div>
  );
}
