import useSWR from "swr";
import type { OrderContent } from "@/types";
import OrderCard from "./OrderCard";


interface Props {
  status: string;
}

function OrderList({ status }: Props) {
  const url = `/api/orders/${status}`;
  const fetcher = () =>
    fetch(url)
      .then((res) => res.json())
      .then((data) => data);

  const config = {
    refreshInterval: 60*1000
  };
  const { data, error, isLoading, mutate } = useSWR<OrderContent[]>(
    url,
    fetcher,
    config,
  );
  // console.log(data)
  // console.log(error)
  // console.log(isLoading)

  if (isLoading) return "Cargando...";

  if (data) {
    return data.length === 0 ? (
      <p className="text-center">No hay ordenedes</p>
    ) : (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {data.map((order) => (
          <OrderCard key={order.id} order={order} mutate={mutate} />
        ))}
      </div>
    );
  }
  return <div>{status}</div>;
}
export default OrderList;
