import { OrdersCard } from "@/components/orders/OrdersCard";
import { PageHeader } from "@/components/orders/PageHeader";
import { fetchOrders } from "@/lib/api/orders";

interface OrdersPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);

  const ordersData = await fetchOrders(page, 7);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="flex flex-col items-start px-8 gap-6 w-full max-w-[1280px] mx-auto py-8">
        <PageHeader />

        <OrdersCard ordersData={ordersData} />
      </div>
    </div>
  );
}
