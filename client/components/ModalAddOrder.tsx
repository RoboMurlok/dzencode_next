"use client";

import { useState } from "react";
import { CreateOrder } from "../types/order";
import { useUIStore, useOrderStore } from "../stores/orderStore";

export default function ModalAddProduct() {
  const closeModal = useUIStore((s) => s.closeModal);
  const setOrders = useOrderStore((s) => s.setOrders);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, type, value } = e.target;

    let finalValue: string | number | boolean = value;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      finalValue = e.target.checked;
    }

    if (type === "number") {
      finalValue = value === "" ? "" : Number(value);
    }

    if (name.includes(".")) {
      const keys = name.split(".");

      setForm((prev) => {
        const newForm = { ...prev };
        let current: Record<string, unknown> = newForm;

        for (let i = 0; i < keys.length - 1; i++) {
          const key = keys[i];

          current[key] = {
            ...(typeof current[key] === "object" && current[key] !== null
              ? (current[key] as Record<string, unknown>)
              : {}),
          };

          current = current[key] as Record<string, unknown>;
        }

        current[keys[keys.length - 1]] = finalValue;

        return newForm;
      });
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: finalValue,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 🔍 validation
    if (!form.title || !form.description) {
      alert("Заполни обязательные поля");
      return;
    }

    const newOrder: CreateOrder = {
      title: form.title,
      description: form.description,
    };

    try {
      const res = await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const createdOrder = await res.json();

      fetch("http://localhost:5000/orders")
        .then((res) => res.json())
        .then((data) => setOrders(data));

      closeModal();
    } catch (error) {
      console.error("Ошибка при создании ордера:", error);
      alert("Ошибка при создании ордера:");
    }
  };

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <div className="mb-2">
        <label
          htmlFor="basic-url"
          className="form-label m-0 text-danger-emphasis small small"
        >
          Название
        </label>
        <input
          name="title"
          className="form-control border-dark-subtle py-0 px-2"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="basic-url"
          className="form-label m-0 text-danger-emphasis small"
        >
          Описание
        </label>
        <input
          name="description"
          className="form-control border-dark-subtle py-0 px-2"
          onChange={handleChange}
        />
      </div>

      <div className="d-flex gap-2 mt-4">
        <button type="reset" className="btn btn-danger flex-fill">
          Отменить
        </button>
        <button type="submit" className="btn btn-success flex-fill">
          Сохранить
        </button>
      </div>
    </form>
  );
}
