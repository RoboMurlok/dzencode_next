"use client";

import Image from "next/image";
import Circle from "./Circle";
import close from "./../app/assets/close.svg";
import plus from "./../app/assets/plus.svg";
import CardProductShort from "./CardProductShort";
import { Order } from "./../types/order";
import { useUIStore } from "./../stores/orderStore";

type CardProps = {
  items: Order;
};

export default function TableProducts({ items }: CardProps) {
  const stealth = useUIStore((s) => s.stealth);
  const onStealth = useUIStore((s) => s.onStealth);
  const setActiveOrder = useUIStore((s) => s.setActiveOrder);
  const { openModal } = useUIStore();
  const title = items.products?.length
    ? items.products[0].incoming
    : "Нет данных";

  return (
    <div
      className={`d-flex flex-column gap-3 flex-wrap z-1 border border-success border-opacity-25 rounded-1 bg-white position-relative ${!stealth ? "d-none" : ""}`}
    >
      <Circle
        image={close}
        alt="close"
        style={{
          top: "0px",
          right: "0px",
          cursor: "pointer",
        }}
        onClick={() => {
          onStealth();
          setActiveOrder(null);
        }}
      />
      <h5 className="fw-bold text-black opacity-75 px-4 pt-4">{title}</h5>
      <div className="d-flex align-items-center gap-3 px-3">
        <button
          style={{ width: 26, height: 26, cursor: "pointer" }}
          className="d-flex align-items-center justify-content-center border-0 bg-success opacity-75 rounded-circle myHoverOpen"
          onClick={() => {
            openModal();
          }}
        >
          <Image src={plus} alt="plus" width={16} height={16} />
        </button>
        <p className="fw-bold text-success opacity-75 m-0">Добавить продукт</p>
      </div>
      <div>
        {items.products.map((product) => (
          <CardProductShort items={product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
