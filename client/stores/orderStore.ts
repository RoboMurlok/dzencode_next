import { create } from "zustand";
import { Order, ModalType } from "../types/order";

type OrderStore = {
    orders: Order[];

    addOrder: (order: Order) => void;
    removeOrder: (id: number) => void;
    setOrders: (orders: Order[]) => void;
};

export const useOrderStore = create<OrderStore>((set) => ({
    orders: [],

    addOrder: (order) =>
        set((state) => ({
            orders: [...state.orders, order],
        })),

    removeOrder: (id) =>
        set((state) => ({
            orders: state.orders.filter((p) => p.id !== id),
        })),

  setOrders: (orders) =>
  set({
    orders: [...orders].sort((a, b) => a.id - b.id),
  }),

}));


type UIStore = {
  stealth: boolean;
  offStealth: () => void;
  onStealth: () => void;

  activeOrderdId: number | null;
  setActiveOrder: (id: number | null) => void;

  isModalOpen: boolean;
  modalType: ModalType;

  openModal: (type: ModalType) => void;
  closeModal: () => void;
};

export const useUIStore = create<UIStore>((set) => ({
  stealth: false,

  offStealth: () => set({ stealth: true }),
  onStealth: () => set({ stealth: false }),

  activeOrderdId: null,
  setActiveOrder: (id) => set({ activeOrderdId: id }),

  isModalOpen: false,
  modalType: null,

  openModal: (type) =>
    set({
      isModalOpen: true,
      modalType: type,
    }),

  closeModal: () =>
    set({
      isModalOpen: false,
      modalType: null,
    }),
}));


