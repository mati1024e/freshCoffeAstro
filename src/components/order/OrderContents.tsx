import { useOrderStore } from "@/stores/order";
import ProductDetails from "./ProductDetails";
function OrderContents() {
  const { order } = useOrderStore();
  return (
    <>
      {order.length === 0 ? (
        <p className="text-center my-10 text-xl">El pedido esta vacio</p>
      ) : (
        <>
          <h4 className="text-2xl font-bold text-gray-900">Ajusta tu pedido</h4>
          {order.map(item => {
            const key = item.size ? `${item.size}-${item.id}` : item.id
            return (
                <ProductDetails
                    key={key}
                    item ={item}
                />
            )
          })}
        </>
      )}
    </>
  );
}
export default OrderContents;
