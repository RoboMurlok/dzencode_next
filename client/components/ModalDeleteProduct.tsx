"use client";

import Image from "next/image";
import trashRed from "./../app/assets/trashRed.svg";
const cssCentre = "d-flex align-items-center justify-content-center";
import { useUIStore, useOrderStore } from "../stores/orderStore";
import { useProductStore } from "../stores/productStore";

export default function ModalDeleteProduct() {
  const setOrders = useOrderStore((s) => s.setOrders);
  const closeModal = useUIStore((s) => s.closeModal);
  const removeProduct = useProductStore((s) => s.removeProduct);
  const setActiveCard = useProductStore((s) => s.setActiveCard);
  const activeCardId = useProductStore((s) => s.activeCardId);
  const product = useProductStore((s) =>
    s.products.find((p) => p.id === activeCardId),
  );

  const deleteProduct = async (activeCardId: number) => {
    console.log(activeCardId);

    try {
      const res = await fetch(
        `http://localhost:5000/products/${activeCardId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      fetch("http://localhost:5000/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data));

      removeProduct(activeCardId);
      closeModal();
      setActiveCard(null);
    } catch (error) {
      console.error("Ошибка при удалении продукта:", error);
      alert("Ошибка при удалении продукта");
    }
  };

  const handleDelete = () => {
    if (activeCardId === null) return;
    deleteProduct(activeCardId);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center p-4">
        <h5 className="m-0">Вы уверены, что хотите удалить этот приход?</h5>
      </div>
      {product && (
        <div className="d-flex gap-2 px-4 py-2 bg-white border-bottom border-top">
          <div className={cssCentre} style={{ width: 20 }}>
            {product.isNew ? (
              <a className="p-1 bg-warning rounded-circle"></a>
            ) : (
              <a className="p-1 bg-black rounded-circle"></a>
            )}
          </div>
          <div className={cssCentre} style={{ width: 50 }}>
            <Image src={product.photo} alt="product" width={40} height={40} />
          </div>
          <div className="d-flex flex-column" style={{ width: 400 }}>
            <p className="fw-bolder text-black-50 m-0 text-decoration-underline">
              {product.title}
            </p>
            <p className="fw-medium text-secondary m-0 text-opacity-50">
              SN-{product.serialNumber}
            </p>
          </div>
        </div>
      )}
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
