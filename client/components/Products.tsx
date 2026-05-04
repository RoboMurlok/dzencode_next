"use client";

import { useEffect, useState } from "react";
import Animation from "./Animation";
import { useProductStore } from "./../stores/productStore";
import CardProductFull from "./CardProductFull";

export default function Products() {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const setProducts = useProductStore((s) => s.setProducts);
  const [type, setType] = useState("");
  const [cert, setCert] = useState("");
  const products = useProductStore((state) => state.products);
  const normalize = (str: string) => str.trim().toLowerCase();
  const filteredCard = products.filter((item) => {
    const matchType = type ? normalize(item.type) === normalize(type) : true;
    const matchCert = cert
      ? normalize(item.specification) === normalize(cert)
      : true;

    return matchType && matchCert;
  });

  useEffect(() => {
    fetch(`${baseUrl}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);


  return (
    <Animation>
      <section className="d-flex flex-column gap-5">
        <div className="d-flex align-items-center gap-5">
          <h3 className="fw-boder text-black opacity-75">
            Продукты / {filteredCard.length}
          </h3>
          <div className="flex-grow-1">
            <div className="row gap-3">
              <div className="d-flex col-xxl-3 p-0 align-items-center gap-2">
                <span className="fw-medium text-secondary text-opacity-50 m-0">
                  Тип:
                </span>
                <div className="select-wrapper flex-grow-1 position-relative w-25">
                  <select
                    className="fw-bolder border border-success border-opacity-25 rounded-1 px-2 w-100"
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="">Все</option>
                    <option value="монитор">монитор</option>
                    <option value="системный блок">системный блок</option>
                    <option value="клавиатура">клавиатура</option>
                    <option value="мышь">мышь</option>
                  </select>
                </div>
              </div>
              <div className="d-flex col-xxl-4 p-0 align-items-center gap-2">
                <span className="fw-medium text-secondary text-opacity-50 m-0">
                  Спецификация:
                </span>
                <div className="select-wrapper flex-grow-1 position-relative w-25">
                  <select
                    className="fw-bolder border border-success border-opacity-25 rounded-1 px-2 w-100"
                    onChange={(e) => setCert(e.target.value)}
                  >
                    <option value="">Все</option>
                    <option value="новый">новый</option>
                    <option value="б/у">б/у</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-nowrap overflow-x-auto">
          <div className="d-flex flex-column gap-2">
            {filteredCard.map((product) => (
              <CardProductFull items={product} key={product.id} />
            ))}
          </div>
        </div>
      </section>
    </Animation>
  );
}
