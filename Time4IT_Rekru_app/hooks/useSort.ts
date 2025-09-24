import { useState, useMemo } from "react";

export type SortDirection = "asc" | "desc";

/**
 * Hook do obsługi sortowania list z różnymi typami pól
 */
export function useSort<T, K extends keyof T>(data: T[]) {
  const [sortField, setSortField] = useState<K | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const handleSort = (field: K) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Handle different data types
      let comparison = 0;

      if (typeof aValue === "string" && typeof bValue === "string") {
        comparison = aValue.localeCompare(bValue);
      } else if (typeof aValue === "number" && typeof bValue === "number") {
        comparison = aValue - bValue;
      } else if (aValue instanceof Date && bValue instanceof Date) {
        comparison = aValue.getTime() - bValue.getTime();
      } else {
        // For date strings, convert to timestamps
        const aTime = new Date(String(aValue)).getTime();
        const bTime = new Date(String(bValue)).getTime();
        comparison = aTime - bTime;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [data, sortField, sortDirection]);

  return {
    sortedData,
    sortField,
    sortDirection,
    handleSort,
  };
}
