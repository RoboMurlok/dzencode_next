"use client";

import { useState } from "react";
import { CreateProduct } from "./../types/product";
import { useUIStore } from "./../stores/orderStore";

export default function ModalAdd() {
  const { activeOrderdId, closeModal } = useUIStore();

  const [form, setForm] = useState({
    serialNumber: "",
    isNew: false,
    photo: "",
    title: "",
    type: "",
    guarantee: {
      start: "",
      end: "",
    },
    price: "",
    incoming: "",
    group: "",
    person: "",
  });

  if (activeOrderdId === null) {
    return null;
  }

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
    if (
      !form.serialNumber ||
      !form.title ||
      !form.type ||
      !form.price ||
      !form.group ||
      !form.person
    ) {
      alert("Заполни обязательные поля");
      return;
    }

    const newProduct: CreateProduct = {
      serialNumber: Number(form.serialNumber),
      isNew: form.isNew,
      photo: form.photo,
      title: form.title,
      type: form.type,
      specification: form.isNew ? "новый" : "б/у",
      guarantee: {
        start: form.guarantee.start,
        end: form.guarantee.end,
      },
      price: {
        value: Number(form.price),
        symbol: "UAH",
      },
      incoming: form.incoming,
      group: form.group,
      person: form.person,
      order: activeOrderdId,
    };

    try {
      const res = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const createdProduct = await res.json();
      console.log(createdProduct);

      // 👉 обновление стора (если есть)
      // addProduct(createdProduct);
      closeModal();
      
    } catch (error) {
      console.error("Ошибка при создании продукта:", error);
      alert("Ошибка при создании продукта:");
    }
  };

  return (
    <form className="p-5" onSubmit={handleSubmit}>
      <div className="d-flex align-items-center gap-2 mb-2">
        <input
          type="checkbox"
          name="isNew"
          checked={form.isNew}
          onChange={handleChange}
        />
        <p className="m-0 text-danger-emphasis small small">Новый</p>
      </div>

      <select
        name="type"
        className="form-select form-select-sm border-dark-subtle mb-2"
        value={form.type}
        onChange={handleChange}
      >
        <option value="" disabled>
          Тип
        </option>
        <option value="монитор">монитор</option>
        <option value="системный блок">системный блок</option>
        <option value="клавиатура">клавиатура</option>
        <option value="мышь">мышь</option>
      </select>

      <select
        name="photo"
        className="form-select form-select-sm border-dark-subtle mb-2"
        value={form.photo}
        onChange={handleChange}
      >
        <option value="" disabled>
          Фото
        </option>
        <option value="/products/monitor.png">монитор</option>
        <option value="/products/computer.png">системный блок</option>
        <option value="/products/keyboard.png">клавиатура</option>
        <option value="/products/maus.png">мышь</option>
      </select>

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
          Серийный номер
        </label>
        <input
          type="number"
          name="serialNumber"
          className="form-control border-dark-subtle py-0 px-2"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="basic-url"
          className="form-label m-0 text-danger-emphasis small"
        >
          Цена
        </label>
        <input
          type="number"
          name="price"
          className="form-control border-dark-subtle py-0 px-2"
          onChange={handleChange}
        />
      </div>

      <div>
        <label
          htmlFor="basic-url"
          className="form-label m-0 text-danger-emphasis small"
        >
          Гарантия
        </label>
        <div className="d-flex gap-2 mb-2">
          <input
            type="date"
            name="guarantee.start"
            className="form-control border-dark-subtle py-0 px-2"
            onChange={handleChange}
          />

          <input
            type="date"
            name="guarantee.end"
            className="form-control border-dark-subtle py-0 px-2"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mb-2">
        <label
          htmlFor="basic-url"
          className="form-label m-0 text-danger-emphasis small"
        >
          Приход
        </label>
        <input
          name="incoming"
          className="form-control border-dark-subtle py-0 px-2"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="basic-url"
          className="form-label m-0 text-danger-emphasis small"
        >
          Группа
        </label>
        <input
          name="group"
          className="form-control border-dark-subtle py-0 px-2"
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label
          htmlFor="basic-url"
          className="form-label m-0 text-danger-emphasis small"
        >
          Ответственный
        </label>
        <input
          name="person"
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
