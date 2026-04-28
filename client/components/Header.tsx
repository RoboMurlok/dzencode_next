"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import shield from "./../app/assets/shield.svg";
import clock from "./../app/assets/clock.svg";
import ActiveUsers from "./ActiveUsers";

export default function Header() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const weekday = now.toLocaleDateString("ru-RU", { weekday: "long" });
  const day = now.toLocaleDateString("ru-RU", { day: "numeric" });
  const month = now.toLocaleDateString("ru-RU", { month: "short" });
  const year = now.toLocaleDateString("ru-RU", { year: "numeric" });
  const time = now.toLocaleTimeString("ru-RU", { timeStyle: "short" });

  return (
    <div className="row">
      <header className="col-8 py-2 px-0 mx-auto d-flex gap-5 justify-content-between align-items-center">
        <div className="d-flex flex-wrap gap-5 w-50">
          <div className="d-flex align-items-center gap-2">
            <Image
              src={shield}
              alt="shield"
              width={40}
              height={40}
              className="rounded-circle"
            />
            <h6 className="fw-bold m-0 text-success">INVENTORY</h6>
          </div>
          <div className="d-flex align-items-center flex-grow-1">
            <input
              type="search"
              placeholder="Поиск"
              className="border border-success border-opacity-25 rounded-1 px-2 w-100 fw-bolder text-bg-light"
            />
          </div>
        </div>
             <ActiveUsers/>
        <div className="d-flex flex-column">
          <div>
            <p className="fw-semibold m-0">{weekday}</p>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3">
            <div>
              <p className="fw-semibold m-0">
                {day}.{month}.{year}
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Image
                src={clock}
                alt="clock"
                width={20}
                height={20}
                className="rounded-circle"
              />
              <div>
                <p className="fw-semibold m-0">{time}</p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
