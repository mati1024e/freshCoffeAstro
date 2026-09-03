import { useOrderStore } from '@/stores/order'
import type { SelectedProduct } from "@/types";
import {toast} from 'react-toastify'


type Props = {
  product: SelectedProduct;
};

function AddProductVariantButton({ product }: Props) {
  const {addItem} = useOrderStore()
  const handleClick = () => {
    addItem(product)
    toast.success('Agregado correctamente')
  };
  return (
    <button
      type="button"
      className="bg-black hover:bg-amber-400 text-lg text-white w-full  p-3 uppercase font-bold cursor-pointer rounded-xl leading-2"
      onClick={handleClick}
    >
      +
    </button>
  );
}
export default AddProductVariantButton;
