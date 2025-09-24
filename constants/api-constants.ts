export const API_ENDPOINTS = {
  orders: "/api/orders",
  orderById: (id: string) => `/api/orders/${id}`,
} as const;

export const PAGINATION = {
  defaultPerPage: 7,
  maxPerPage: 100,
  minPerPage: 1,
} as const;

export const VALIDATION = {
  orderNumber: {
    minLength: 6,
  },
  totalGross: {
    min: 0.01,
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
} as const;
