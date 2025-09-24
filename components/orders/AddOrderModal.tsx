"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addOrder, ApiError } from "@/lib/api/orders";
import { Loader2, Plus } from "lucide-react";
import BackgroundDecor from "@/components/common/BackgroundDecor";
import { orderSchema, OrderFormData } from "@/lib/orders-schema";
import { statusOptions } from "@/constants/orders-constants";

export function AddOrderModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const todayLocalISO = () => {
    const now = new Date();
    const tzOffsetMinutes = now.getTimezoneOffset();
    const local = new Date(now.getTime() - tzOffsetMinutes * 60_000);
    return local.toISOString().slice(0, 10);
  };

  const form = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderNumber: "",
      customer: "",
      status: "new",
      dueDate: todayLocalISO(),
      totalGross: undefined as unknown as number,
    },
  });

  const onSubmit = async (data: OrderFormData) => {
    setIsSubmitting(true);

    try {
      await addOrder(data);
      setOpen(false);
      form.reset({
        orderNumber: "",
        customer: "",
        status: "new",
        dueDate: todayLocalISO(),
        totalGross: undefined as unknown as number,
      });
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.fieldErrors) {
        error.fieldErrors.forEach(({ field, message }) => {
          form.setError(field as keyof OrderFormData, {
            type: "server",
            message,
          });
        });
      } else {
        form.setError("root", {
          type: "server",
          message: "Wystąpił błąd podczas dodawania zamówienia",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (v) {
          form.reset({
            orderNumber: "",
            customer: "",
            status: "new",
            dueDate: todayLocalISO(),
            totalGross: undefined as unknown as number,
          });
        }
      }}
    >
      <DialogTrigger asChild>
        <button className="flex flex-row justify-center items-center py-[10px] px-4 gap-[6px] w-full h-11 bg-[#7F56D9] shadow-[0px_1px_2px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_rgba(10,13,18,0.05)] rounded-lg cursor-pointer">
          <Plus className="w-5 h-5 text-[#D6BBFB]" />

          <div className="flex flex-row justify-center items-center px-[2px] w-[147px] h-6">
            <span className="w-[143px] h-6 font-semibold text-base leading-6 text-white">
              Dodaj zamówienie
            </span>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="w-[640px] max-w-[640px] sm:max-w-[640px] p-0 rounded-2xl overflow-hidden shadow-[0px_20px_24px_-4px_rgba(10,13,18,0.08),0px_8px_8px_-4px_rgba(10,13,18,0.03),0px_3px_3px_-1.5px_rgba(10,13,18,0.04)]">
        <DialogHeader className="relative items-start px-6 pt-6 pb-0 gap-4 overflow-visible isolate">
          <BackgroundDecor className="absolute -left-30 -top-30 w-[336px] h-[336px] z-0 pointer-events-none select-none" />
          <div className="relative z-[1] box-border w-12 h-12 bg-background border border-border rounded-[10px] shadow-[0px_1px_2px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_rgba(10,13,18,0.05)] flex items-center justify-center">
            <Plus className="w-6 h-6 text-muted-foreground" />
          </div>
          <DialogTitle className="relative z-[1] text-foreground text-base leading-6 font-semibold">
            Dodaj Zamówienie
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 px-6 py-5"
          >
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nazwa klienta</FormLabel>
                  <FormControl>
                    <Input placeholder="Podaj nazwę klienta" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-[280px_128px] gap-4">
              <FormField
                control={form.control}
                name="orderNumber"
                render={({ field }) => (
                  <FormItem className="w-[280px] max-w-[280px]">
                    <FormLabel className="text-sm font-medium text-muted-foreground leading-5">
                      Numer zamówienia
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 w-[280px] border-border shadow-[0px_1px_2px_rgba(10,13,18,0.05)]"
                        placeholder="Podaj Numer zamówienia"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="w-[128px]">
                    <FormLabel className="text-sm font-medium text-muted-foreground leading-5">
                      Status zamówienia
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-11 w-[128px] border-border shadow-[0px_1px_2px_rgba(10,13,18,0.05)]">
                          <SelectValue placeholder="Wybierz status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="totalGross"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kwota</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Podaj kwotę brutto zamówienia"
                      value={
                        (field.value as unknown as number) ? field.value : ""
                      }
                      onChange={(e) => {
                        const v = e.target.value;
                        if (v === "") {
                          (
                            field as unknown as {
                              onChange: (v: unknown) => void;
                            }
                          ).onChange(undefined);
                        } else {
                          const n = parseFloat(v);
                          (
                            field as unknown as {
                              onChange: (v: unknown) => void;
                            }
                          ).onChange(Number.isNaN(n) ? undefined : n);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <div className="text-sm text-red-600">
                {form.formState.errors.root.message}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3 pt-6 ">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
                className="h-11 w-full bg-background text-muted-foreground border border-border shadow-[0px_1px_2px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_rgba(10,13,18,0.05)]"
              >
                Anuluj
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 w-full bg-[#7F56D9] text-white shadow-[0px_1px_2px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),inset_0px_-2px_0px_rgba(10,13,18,0.05)]"
              >
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Dodaj zamówienie
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
