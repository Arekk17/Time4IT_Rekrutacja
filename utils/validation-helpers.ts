import { OrderStatus } from "@/lib/orders-types";

export function isValidOrderStatus(status: string): status is OrderStatus {
  const allowedStatuses: OrderStatus[] = [
    "new",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];
  return allowedStatuses.includes(status as OrderStatus);
}

export function isValidDateFormat(dateString: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(dateString);
}

export function isNonEmptyString(value: string): boolean {
  return value.trim().length > 0;
}

export function hasMinLength(value: string, minLength: number): boolean {
  return value.length >= minLength;
}

export function isPositiveNumber(value: number): boolean {
  return Number.isFinite(value) && value > 0;
}
