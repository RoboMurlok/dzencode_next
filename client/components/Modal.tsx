"use client";

import Image from "next/image";
import trashRed from "./../app/assets/trashRed.svg";
import close from "./../app/assets/close.svg";
import Circle from "./Circle";
import { useUIStore } from "./../stores/orderStore";
import { useProductStore } from "./../stores/productStore";
const cssCentre = "d-flex align-items-center justify-content-center";

export default function Modal() {
  const { isModalOpen, closeModal } = useUIStore();
  const id = useProductStore((s) => s.activeCardId);
  const product = useProductStore((s) => s.products.find((p) => p.id === id));
  const removeProduct = useProductStore((s) => s.removeProduct);

  if (!isModalOpen) return null;

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center position-absolute z-3 top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onClick={closeModal}
      >
        <div className="bg-white rounded-1 w-50 position-relative">
          <Circle
            image={close}
            alt="close"
            style={{
              top: "-20px",
              right: "-20px",
              cursor: "pointer",
            }}
            onClick={closeModal}
          />
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
                <Image
                  src={product.photo}
                  alt="product"
                  width={40}
                  height={40}
                />
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
              onClick={closeModal}
            >
              Отменить
            </button>
            <button
              className="d-flex align-items-center gap-2 border-0 bg-white text-danger rounded-pill px-4 py-1 myHoverDelete"
              onClick={() => {
                if (id !== null) removeProduct(id);
              }}
            >
              <Image src={trashRed} alt="trash" width={12} height={12} />
              Удалить
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
