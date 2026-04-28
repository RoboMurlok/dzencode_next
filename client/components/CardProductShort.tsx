"use client";

import Image from "next/image";
import TrashIcon from "./TrashIcon";
import { Product } from "./../types/product";

type CardProps = {
  items: Product;
};

const cssCentre = "d-flex align-items-center justify-content-center";
const cssLeft = "d-flex align-items-center justify-content-start";

export default function CardProductShort({ items }: CardProps) {
  const {id,photo, title, serialNumber, isNew } = items;
  

  return (
    <div className="d-flex gap-2 px-4 py-2 bg-white border-bottom border-top">
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
      <TrashIcon stealth={false} id={id}/>
    </div>
  );
}
