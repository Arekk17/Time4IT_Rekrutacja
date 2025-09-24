import * as z from "zod";
import { OrderStatus } from "@/lib/orders-types";

export const orderSchema = z.object({
  orderNumber: z
    .string()
    .min(6, "Numer zamówienia musi mieć co najmniej 6 znaków")
    .nonempty("Numer zamówienia jest wymagany"),
  customer: z
    .string()
    .min(1, "Nazwa klienta jest wymagana")
    .nonempty("Nazwa klienta jest wymagana"),
  status: z
    .enum([
      "new",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ] satisfies OrderStatus[])
    .refine((val) => val, {
      message: "Status jest wymagany",
    }),
  dueDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Data musi być w formacie YYYY-MM-DD")
    .nonempty("Data jest wymagana"),
  totalGross: z
    .number()
    .min(0.01, "Kwota musi być większa od 0")
    .positive("Kwota musi być dodatnia"),
});

export type OrderFormData = z.infer<typeof orderSchema>;
