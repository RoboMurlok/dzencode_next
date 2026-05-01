import { create } from "zustand";
import { Product } from "../types/product";

type ProductStore = {
  products: Product[];
  activeCardId: number | null;

  addProduct: (product: Product) => void;
  setProducts: (products: Product[]) => void;
  removeProduct: (id: number) => void;
  setActiveCard: (id: number | null) => void;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  activeCardId: null,

  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
    })),

  removeProduct: (id: number) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  setProducts: (products) => set({ products }),

  setActiveCard: (id) => set({ activeCardId: id }),
}));