export const APP_ROUTES = {
  home: "/",
  orders: "/orders",
  orderDetails: (id: string) => `/orders/${id}`,
} as const;
