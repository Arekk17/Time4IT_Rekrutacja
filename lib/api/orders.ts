import type { Order } from "../orders-types";

export interface OrdersResponse {
  items: Order[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
  hasPrev: boolean;
  hasNext: boolean;
}

export interface ApiErrorData {
  code: string;
  message?: string;
  fieldErrors?: Array<{ field: string; message: string }>;
}

export async function fetchOrders(
  page: number,
  perPage: number = 7
): Promise<OrdersResponse> {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const url = `${baseUrl}/api/orders?page=${page}&perPage=${perPage}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function fetchOrdersClient(
  page: number,
  perPage: number = 7
): Promise<OrdersResponse> {
  const response = await fetch(`/api/orders?page=${page}&perPage=${perPage}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export async function addOrder(order: Omit<Order, "id">): Promise<Order> {
  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data);
  }

  return data;
}

export async function deleteOrder(
  id: string
): Promise<{ deleted: true; id: string }> {
  const response = await fetch(`/api/orders/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(data);
  }

  return data;
}

export class ApiError extends Error {
  code: string;
  fieldErrors?: Array<{ field: string; message: string }>;

  constructor(errorData: ApiErrorData) {
    super(errorData.message || "API Error");
    this.code = errorData.code;
    this.fieldErrors = errorData.fieldErrors;
    this.name = "ApiError";
  }
}
