import type { OrderItem, SelectedProduct } from "@/types";
import { toLowerFirstChar } from "@/utils";
import { create } from "zustand";

interface Store {
  order: OrderItem[];
  toggleOrderDrawer: () => void;
  isOrderDrawerOpen: boolean;
  addItem: (product: SelectedProduct) => void;
  deleteItem: (product: OrderItem) => void;
}

export const useOrderStore = create<Store>()((set, get) => ({
  order: [],
  isOrderDrawerOpen: false,
  toggleOrderDrawer: () => {
    set((state) => ({ isOrderDrawerOpen: !state.isOrderDrawerOpen }));
  },
  addItem: (product) => {
    const currentOrder = get().order;

    const hasSize = Boolean(product.size);
    const key = hasSize
      ? `${product.id}-${toLowerFirstChar(product.size!)}`
      : undefined;

    const isMatch = (item: OrderItem) =>
      hasSize ? item.key === key : item.id === product.id;
    const existingItem = currentOrder.find(isMatch);

    let order: OrderItem[];
    if (existingItem) {
      order = currentOrder.map((item) =>
        isMatch(item)
          ? {
              ...item,
              quantity: item.quantity + 1,
              subtotal: item.price * (item.quantity + 1),
            }
          : item,
      );
    } else {
      const newItem = {
        ...product,
        quantity: 1,
        subtotal: product.price,
        key,
      };
      order = [...currentOrder, newItem];
    }
    set({ order });
    // console.log(order)
  },
  deleteItem: (product) => {
    const order = get().order.filter((item) =>
      product.key ? item.key !== product.key : item.id !== product.id,
    );
    set({order})
  },
}));
