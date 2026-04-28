"use client";

import Image from "next/image";
import TrashIcon from "./TrashIcon";
import { Product } from "./../types/product";

type CardProps = {
  items: Product;
};

const cssCentre = "d-flex align-items-center justify-content-center";
const cssLeft = "d-flex align-items-center justify-content-start";
const cssFont = "fw-medium text-black-50 m-0";

export default function CardProductFull({ items }: CardProps) {
  const {
    id,
    photo,
    title,
    serialNumber,
    isNew,
    guarantee,
    specification,
    prices,
    group,
    person,
    incoming,
    date,
  } = items;

  const formatDate = new Date(date).toLocaleString("ru-RU");
  const guaranteeStart = new Date(guarantee.start).toLocaleString("ru-RU");
  const guaranteeEnd = new Date(guarantee.end).toLocaleString("ru-RU");

  return (
    <div className="d-flex gap-2 border border-success border-opacity-25 rounded-1 px-4 py-2 bg-white">
      <div className={cssCentre} style={{ width: 20 }}>
        {isNew ? (
          <a className="p-1 bg-warning rounded-circle"></a>
        ) : (
          <a className="p-1 bg-black rounded-circle"></a>
        )}
      </div>
      <div className={cssCentre} style={{ width: 50 }}>
        <Image src={photo} alt="product" width={40} height={40} />
      </div>
      <div className="d-flex flex-column" style={{ width: 400 }}>
        <p className="fw-bolder text-black-50 m-0 text-decoration-underline">
          {title}
        </p>
        <p className="fw-medium text-secondary m-0 text-opacity-50">
          SN-{serialNumber}
        </p>
      </div>
      <div className={cssLeft} style={{ width: 100 }}>
        {isNew ? (
          <p className="fw-medium text-warning m-0">свободен</p>
        ) : (
          <p className="fw-medium text-black m-0">в работе</p>
        )}
      </div>
      <div className="d-flex flex-column" style={{ width: 180 }}>
        <p className={cssFont}>с {guaranteeStart}</p>
        <p className={cssFont}>по {guaranteeEnd}</p>
      </div>
      <div className={cssLeft} style={{ width: 60 }}>
        <p className={cssFont}>{specification}</p>
      </div>
      <div
        className="d-flex flex-column justify-content-center position-relative"
        style={{ width: 120 }}
      >
        {prices?.[0] && (
          <span className="fw-medium text-secondary m-0 text-opacity-50 position-absolute top-0">
            {prices[0].value} {prices[0].symbol}
          </span>
        )}
        {prices?.[1] && (
          <p className={cssFont}>
            {prices[1].value} {prices[1].symbol}
          </p>
        )}
      </div>
      <div className={cssLeft} style={{ width: 300 }}>
        <p className={cssFont}>{group}</p>
      </div>
      {person ? (
        <div className={cssLeft} style={{ width: 200 }}>
          <p className={cssFont}>{person}</p>
        </div>
      ) : (
        <div className={cssLeft} style={{ width: 200 }}>
          <p className={cssFont}>&ndash;</p>
        </div>
      )}
      <div className={cssLeft} style={{ width: 300 }}>
        <p className={cssFont}>{incoming}</p>
      </div>
      <div
        className="d-flex flex-column align-items-center justify-content-center position-relative"
        style={{ width: 200 }}
      >
        <span className="fw-medium text-secondary m-0 text-opacity-50 position-absolute top-0">
          10/12
        </span>
        <p className={cssFont}>{formatDate}</p>
      </div>
      <TrashIcon id={id} />
    </div>
  );
}
