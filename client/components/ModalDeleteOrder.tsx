"use client";

import Image from "next/image";
import trashRed from "./../app/assets/trashRed.svg";
import { useUIStore, useOrderStore } from "./../stores/orderStore";
import { useProductStore } from "./../stores/productStore";

export default function ModalDelete() {
  const setActiveCard = useProductStore((s) => s.setActiveCard);
  const removeOrder = useOrderStore((s) => s.removeOrder);
  const closeModal = useUIStore((s) => s.closeModal);
  const activeCardId = useProductStore((s) => s.activeCardId);

  const deleteOrder = async (activeCardId: number) => {
    
    try {
      const res = await fetch(`http://localhost:5000/orders/${activeCardId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      // обновление UI (ВАЖНО)
      removeOrder(activeCardId); // если есть в Zustand
      closeModal();
    } catch (error) {
      console.error("Ошибка при удалении ордера:", error);
      alert("Ошибка при удалении ордера");
    }
  };

  const handleDelete = () => {
    if (activeCardId === null) return;
    deleteOrder(activeCardId);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-4">
        <h5 className="m-0">Вы уверены, что хотите удалить этот ордер?</h5>
      </div>
  
      <div className="d-flex justify-content-end gap-2 bg-success p-4">
        <button
          className="btn bg-success text-white rounded-pill px-4 py-1 myHoverOpen"
          onClick={() => {
            closeModal();
            setActiveCard(null);
          }}
        >
          Отменить
        </button>
        <button
          className="d-flex align-items-center gap-2 border-0 bg-white text-danger rounded-pill px-4 py-1 myHoverDelete"
          onClick={handleDelete}
        >
          <Image src={trashRed} alt="trash" width={12} height={12} />
          Удалить
        </button>
      </div>
    </div>
  );
}
