"use client";

import Image from "next/image";
import { useEffect } from "react";
import Animation from "./Animation";
import plus from "./../app/assets/plus.svg";
import { useOrderStore, useUIStore } from "./../stores/orderStore";
import CardOrder from "./CardOrder";
import TableProducts from "./TableProducts";

export default function Orders() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const setOrders = useOrderStore((s) => s.setOrders);
  const orders = useOrderStore((state) => state.orders);
  const openModal = useUIStore((s) => s.openModal);
  const activeOrderdId = useUIStore((s) => s.activeOrderdId);
  const activeOrder = orders.find((order) => order.id === activeOrderdId);

  useEffect(() => {
    fetch(`${baseUrl}/orders`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <Animation>
      <div className="d-flex flex-column gap-5">
        <h3 className="fw-boder text-black opacity-75">
          Ордера / {orders.length}
        </h3>

        <div className="d-flex flex-column gap-3">
          <div className="d-flex align-items-center gap-3">
            <button
              style={{ width: 26, height: 26, cursor: "pointer" }}
              className="d-flex align-items-center justify-content-center border-0 bg-success opacity-75 rounded-circle myHoverOpen"
              onClick={() => {
                openModal("addOrder");
              }}
            >
              <Image src={plus} alt="plus" width={16} height={16} />
            </button>
            <p className="fw-bold text-success opacity-75 m-0">
              Добавить ордер
            </p>
          </div>
          <div className="d-flex flex-column flex-xxl-row gap-3">
            <div className="flex-shrink-0" style={{ minWidth: "250px" }}>
              {orders.map((order) => (
                <CardOrder items={order} key={order.id} />
              ))}
            </div>

            <div className="flex-grow-1">
              {activeOrder && <TableProducts items={activeOrder} />}
            </div>
          </div>
        </div>
      </div>
    </Animation>
  );
}
