"use client";

import close from "./../app/assets/close.svg";
import Circle from "./Circle";
import { useUIStore } from "./../stores/orderStore";
import { useProductStore } from "./../stores/productStore";
import ModalDeleteProduct from "./ModalDeleteProduct";
import ModalAddProduct from "./ModalAddProduct";
import ModalDeleteOrder from "./ModalDeleteOrder";
import ModalAddOrder from "./ModalAddOrder";  

export default function Modal() {
  const isModalOpen = useUIStore((s) => s.isModalOpen);
  const closeModal = useUIStore((s) => s.closeModal);
  const modalType = useUIStore((s) => s.modalType);
  const setActiveCard = useProductStore((s) => s.setActiveCard);

  if (!isModalOpen) return null;

  return (
    <div
      className="d-flex align-items-center justify-content-center position-absolute z-3 top-0 start-0 w-100 h-100"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-1 w-50 position-relative">
        <Circle
          image={close}
          alt="close"
          style={{
            top: "0px",
            right: "0px",
            cursor: "pointer",
          }}
          onClick={() => {
            setActiveCard(null);
            closeModal();
          }}
        />
        {isModalOpen && modalType === "addProduct" && <ModalAddProduct />}
        {isModalOpen && modalType === "deleteProduct" && <ModalDeleteProduct />}
        {isModalOpen && modalType === "deleteOrder" && <ModalDeleteOrder />}
        {isModalOpen && modalType === "addOrder" && <ModalAddOrder />}
      </div>
    </div>
  );
}
