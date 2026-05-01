"use client";

import { useEffect } from "react";
import Animation from "./Animation";
import { useOrderStore, useUIStore } from "./../stores/orderStore";
import CardOrder from "./CardOrder";
import TableProducts from "./TableProducts";

export default function Orders() {
  const setOrders = useOrderStore((s) => s.setOrders);
  const orders = useOrderStore((state) => state.orders);
  const activeOrderdId = useUIStore((s) => s.activeOrderdId);
  const activeOrder = orders.find((order) => order.id === activeOrderdId);

  useEffect(() => {
      fetch("http://localhost:5000/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <Animation
    >
      <div className="d-flex flex-column gap-5">
        <h3 className="fw-boder text-black opacity-75">
          Ордера / {orders.length}
        </h3>
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
    </Animation>
  );
}
