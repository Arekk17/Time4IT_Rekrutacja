"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionMenuProps {
  onDelete?: () => void;
}

export function ActionMenu({ onDelete }: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-5 h-5 p-0 bg-ui-background-light cursor-pointer grid place-items-center rounded data-[state=open]:shadow-[0px_0px_0px_2px_var(--ui-background-light),0px_0px_0px_4px_var(--brand-primary)]">
          <MoreVertical className="w-5 h-5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[248px] p-1 bg-white border border-[rgba(0,0,0,0.08)] shadow-[0px_12px_16px_-4px_rgba(10,13,18,0.08),0px_4px_6px_-2px_rgba(10,13,18,0.03),0px_2px_2px_-1px_rgba(10,13,18,0.04)] rounded-lg"
      >
        {onDelete && (
          <DropdownMenuItem
            onClick={onDelete}
            className="flex flex-row items-center px-1.5 py-1 w-[248px] h-[38px] hover:bg-gray-50 focus:bg-gray-50"
          >
            <div className="flex flex-row items-center px-2.5 py-2 gap-3 w-[236px] h-9 rounded-md">
              <div className="flex flex-row items-center gap-2 w-[216px] h-5">
                <Trash2 className="w-4 h-4 text-destructive-primary" />
                <span className="w-[192px] h-5 font-semibold text-sm leading-5 text-muted-foreground">
                  Usuń zamówienie
                </span>
              </div>
            </div>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
