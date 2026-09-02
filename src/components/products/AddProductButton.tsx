import { useOrderStore } from '@/stores/order'
import type {SelectedProduct} from '@/types'

type Props ={
    product:SelectedProduct
}

function AddProductButton({product}:Props) {
    const {addItem} = useOrderStore()
    const handleClick =()=>{
        addItem(product)
    }
  return (
    <button
        type="button"
        className="bg-black hover:bg-amber-400 text-lg text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer rounded-xl"
        onClick={handleClick}
    >
        Agregar
    </button>
  )
}
export default AddProductButton