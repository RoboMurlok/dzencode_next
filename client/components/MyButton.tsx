"use client";

export default function CreateProductButton() {
  const product = {
    serialNumber: 1234,
    isNew: true,
    photo: "/products/monitor.png",
    title: "EIZO FlexScan EV2781",
    type: "монитор",
    specification: "новый",
    guarantee: {
      start: "2017-06-29 12:09:33",
      end: "2017-06-29 12:09:33",
    },
    price: [
      { value: 250, symbol: "USD", isDefault: false },
      { value: 2400, symbol: "UAH", isDefault: true },
    ],
    incoming: "приход 1",
    group: "группа 1",
    person: "персона 1",
    order: 1,
    date: "2017-06-29 12:09:33",
  };

  const handleClick = async () => {
    try {
      const isInvalidProduct = !product?.title || !product?.price?.length;

      if (isInvalidProduct) {
        alert("Продукт невалидный");
        return;
      }

      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      const data = await response.json();
      console.log("Ответ сервера:", data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <button onClick={handleClick} className="btn btn-success myHoverOpen">
      Создать продукт
    </button>
  );
}
