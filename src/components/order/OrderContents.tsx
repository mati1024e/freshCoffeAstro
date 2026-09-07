import { useOrderStore } from "@/stores/order";
import ProductDetails from "./ProductDetails";
import { calculateTota, formatCurrency } from "@/utils";
function OrderContents() {
  const { order } = useOrderStore();
  const total =  calculateTota(order)
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
          <h3 className="mt-5 text-2xl font-bold text-right">
            Total a pagar:{formatCurrency(total)}
          </h3>
        </>
      )}
    </>
  );
}
export default OrderContents;
