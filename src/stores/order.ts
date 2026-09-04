import { getFetchApiAstroProduct } from "@/api/services/serviceProducts";
import type { OrderItem, SelectedProduct } from "@/types";
import { toLowerFirstChar } from "@/utils";
import { strictObject } from "astro/zod";
import { number, string } from "astro:schema";
import { create } from "zustand";

interface Store {
  order: OrderItem[];
  toggleOrderDrawer: () => void;
  isOrderDrawerOpen: boolean;
  addItem: (product: SelectedProduct) => void;
  deleteItem: (product: OrderItem) => void;
  increaseQuantity: (product: OrderItem) => void;
  decreaseQuantity: (product: OrderItem) => void;
  updateItemSize: (product: OrderItem, newSize: OrderItem["size"]) => void;
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
    set({ order });
  },
  increaseQuantity(product) {
    const isMatch = (item: OrderItem) =>
      product.key ? item.key === product.key : item.id === product.id;

    const order = get().order.map((item) =>
      isMatch(item)
        ? {
            ...item,
            quantity: item.quantity + 1,
            subtotal: item.price * (item.quantity + 1),
          }
        : item,
    );
    set({ order });
  },
  decreaseQuantity(product) {
    const isMatch = (item: OrderItem) =>
      product.key ? item.key === product.key : item.id === product.id;

    const order = get().order.map((item) =>
      isMatch(item)
        ? {
            ...item,
            quantity: item.quantity - 1,
            subtotal: item.price * (item.quantity - 1),
          }
        : item,
    );
    set({ order });
  },
  updateItemSize: async (product, newSize) => {
    if (!product.key || !newSize) return;
    const data = await getFetchApiAstroProduct(product.id.toString());

    const updateData = Object.values(data.acf)
      .filter(
        (value): value is { size: string; price: number } =>
          typeof value === "object" &&
          value !== null &&
          "size" in value &&
          "price" in value,
      )
      .find((value) => value.size === newSize);

    if (!updateData) return;

    const order = get().order;
    const newKey = `${product.id}-${toLowerFirstChar(newSize)}`;
    const isMatch = (item: OrderItem, key: string) => item.key === key;

    const selectedIndex = order.findIndex((item) =>
      isMatch(item, product.key!),
    );
    const existingIndex = order.findIndex((item) => isMatch(item, newKey));

    let updateOrder = [...order];

    if (existingIndex !== -1) {
      const existingItem = updateOrder[existingIndex]
      const mergeQuantity = existingItem.quantity+product.quantity
      updateOrder[existingIndex] ={
        ...existingItem,
        quantity:mergeQuantity,
        subtotal: mergeQuantity *existingItem.price
      }
      if(existingIndex !== selectedIndex){
        updateOrder.splice(selectedIndex,1)
      }
    } else {
      updateOrder[selectedIndex] = {
        ...product,
        key: newKey,
        size: newSize,
        price: updateData.price,
        subtotal: product.quantity * updateData.price,
      };
    }

    set({ order: updateOrder });
  },
}));
