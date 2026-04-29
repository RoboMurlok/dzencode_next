"use client";

import { useState } from "react";
import { Product } from "./../types/product";

export default function ModalAdd() {
  const [form, setForm] = useState({
    title: "",
    serialNumber: "",
    type: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct: Product = {
      id: Date.now(),
      serialNumber: Number(form.serialNumber),
      isNew: true,
      photo: "/products/default.png",
      title: form.title,
      type: form.type,
      specification: "новый",
      guarantee: {
        start: new Date().toISOString(),
        end: new Date().toISOString(),
      },
      prices: [
        {
          value: Number(form.price),
          symbol: "USD",
          isDefault: true,
        },
      ],
      incoming: new Date().toISOString(),
      group: "default",
      person: "admin",
      order: 1,
      date: new Date().toISOString(),
    };

    console.log(newProduct);
  };

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Название</label>
        <input
          name="title"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Серийный номер</label>
        <input
          name="serialNumber"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Тип</label>
        <input
          name="type"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Цена</label>
        <input
          name="price"
          className="form-control"
          onChange={handleChange}
        />
      </div>

      <div className="d-flex gap-2">
        <button type="button" className="btn btn-danger flex-fill">
          Отменить
        </button>
        <button type="submit" className="btn btn-success flex-fill">
          Сохранить
        </button>
      </div>
    </form>
  );
}