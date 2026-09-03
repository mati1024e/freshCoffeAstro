import {ShoppingCartIcon,ShoppingBagIcon} from "@heroicons/react/24/outline"
import { useOrderStore } from "@/stores/order"
function ShowOrderButton() {
  const {toggleOrderDrawer} = useOrderStore()
  return (
    <button 
        type="button"
        className="cursor-pointer p-4"
        onClick={toggleOrderDrawer}
    >
        <ShoppingCartIcon 
            className="size-8 text-gray-800"
        />
    </button>
  )
}
export default ShowOrderButton