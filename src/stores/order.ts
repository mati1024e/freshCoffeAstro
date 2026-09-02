import type { OrderItem, SelectedProduct } from "@/types";
import { create } from "zustand";

interface Store {
  order: OrderItem[];
  addItem: (product: SelectedProduct) => void;
}

export const useOrderStore = create<Store>()((set, get) => ({
  order: [],
  addItem: (product) => {
    const currentOrder =get().order
    const newItem = {
      ...product,
      quantity:1,
      subtotal:product.price
    };
    set({order:[...currentOrder,newItem]})
  },
}));
