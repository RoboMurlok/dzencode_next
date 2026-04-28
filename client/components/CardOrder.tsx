"use client";

import Image from "next/image";
import menu from "./../app/assets/menu.svg";
import TrashIcon from "./TrashIcon";
import { Order } from "./../types/order";
import { useUIStore } from "./../stores/orderStore";

type CardProps = {
  items: Order;
};

const cssCentre = "d-flex align-items-center justify-content-center";
const cssLeft = "d-flex align-items-center justify-content-start";
const cssFont = "fw-medium text-black-50 m-0";

export default function CardOrder({ items }: CardProps) {
  const stealth = useUIStore((s) => s.stealth);
  const offStealth = useUIStore((s) => s.offStealth);
  const activeCardId = useUIStore((s) => s.activeCardId);
  const setActiveCard = useUIStore((s) => s.setActiveCard);
  const isActive = activeCardId === items.id;
  const qwentity = items.products.length;
  const sumUSD = items.products.reduce(
    (acc, product) => acc + Number(product.prices[0].value),
    0,
  );
  const sumUAH = items.products.reduce(
    (acc, product) => acc + Number(product.prices[1].value),
    0,
  );

  return (
    <div
      className={`d-flex gap-4 border border-success border-opacity-25 rounded-1 px-4 py-2 ${
        isActive ? "bg-info-subtle" : "bg-white"
      }`}
    >
      <div
        className={`${cssLeft} ${stealth ? "d-none" : ""}`}
        style={{ width: 300 }}
      >
        <p className={`${cssFont} text-decoration-underline`}>{items.title}</p>
      </div>
      <div
        className={`${cssCentre} bg-primary-subtle border rounded-circle myHoverOpen`}
        style={{ width: 50, cursor: "pointer" }}
        onClick={() => {
          offStealth();
          setActiveCard(items.id);
        }}
      >
        <Image src={menu} alt="menu" width={20} height={20} />
      </div>
      <div className="d-flex flex-column" style={{ width: 80 }}>
        <h5 className={cssFont}>{qwentity}</h5>
        <p className="fw-medium text-secondary m-0 text-opacity-50">
          Продуктов
        </p>
      </div>
      <div
        className="d-flex flex-column align-items-center justify-content-center position-relative"
        style={{ width: 200 }}
      >
        <span className="fw-medium text-secondary m-1 text-opacity-50 position-absolute bottom-50">
          10/12
        </span>
        <p className={cssFont}>{items.date}</p>
      </div>
      <div
        className={`d-flex flex-column justify-content-center position-relative ${stealth ? "d-none" : ""}`}
        style={{ width: 120 }}
      >
        <span className="fw-medium text-secondary m-0 text-opacity-50 position-absolute top-0">
          {sumUSD} {items.products?.[0]?.prices?.[0]?.symbol}
        </span>
        <p className={cssFont}>
          {sumUAH} {items.products?.[0]?.prices?.[0]?.symbol}
        </p>
      </div>
      <TrashIcon stealth={true} id={items.id} />
    </div>
  );
}
