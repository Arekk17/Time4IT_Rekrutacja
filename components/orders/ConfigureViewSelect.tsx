"use client";

import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export interface ViewColumn {
  id: string;
  label: string;
  checked: boolean;
}

interface ConfigureViewSelectProps {
  columns: ViewColumn[];
  onColumnsChange: (columns: ViewColumn[]) => void;
}

export function ConfigureViewSelect({
  columns,
  onColumnsChange,
}: ConfigureViewSelectProps) {
  const handleColumnToggle = (columnId: string) => {
    const updatedColumns = columns.map((col) =>
      col.id === columnId ? { ...col, checked: !col.checked } : col
    );
    onColumnsChange(updatedColumns);
  };

  return (
    <div className="flex flex-col justify-center items-end w-[171px] h-10 p-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex flex-row justify-center items-center w-[171px] h-10 bg-background border border-border rounded-lg px-[14px] py-[10px] gap-1 hover:bg-gray-50 shadow-sm"
          >
            <div className="flex flex-row justify-center items-center px-[2px] w-[119px] h-5">
              <span className="w-[115px] h-5 font-semibold text-sm leading-5 text-muted-foreground">
                Konfiguruj widok
              </span>
            </div>

            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          side="bottom"
          className="w-[189px] h-auto max-h-[197px] bg-white border border-black/[0.08] rounded-lg p-1 z-50 overflow-y-auto shadow-lg"
        >
          {columns.map((column) => (
            <DropdownMenuItem
              key={column.id}
              className="flex flex-row items-center w-full h-9 px-1.5 py-0.5 cursor-pointer hover:bg-gray-50 focus:bg-gray-50 rounded-md"
              onClick={() => handleColumnToggle(column.id)}
            >
              <div className="flex flex-col items-start w-full h-9 p-1 gap-1 rounded-md">
                <div className="flex flex-row items-center w-full h-5 p-0 gap-2 whitespace-nowrap">
                  <Checkbox
                    checked={column.checked}
                    onCheckedChange={() => handleColumnToggle(column.id)}
                  />

                  <span className="font-medium text-sm leading-5 text-text-primary">
                    {column.label}
                  </span>
                </div>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
