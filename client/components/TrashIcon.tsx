"use client";

import Image from "next/image";
import trash from "./../app/assets/trash.svg";
import { ModalType } from "./../types/order";
import { useUIStore } from "./../stores/orderStore";
import { useProductStore } from "./../stores/productStore";

type CircleProps = {
  id: number;
  stealth?: boolean;
  modalType: ModalType;
};

const cssCentre = "d-flex align-items-center justify-content-center";

export default function TrashIcon({ stealth, id, modalType }: CircleProps) {
  const openModal = useUIStore((s) => s.openModal);
  const setActiveCard = useProductStore((s) => s.setActiveCard);

  return (
    <div
      className={`${cssCentre} d-flex bg-danger-subtle ${stealth ? "d-none" : ""} rounded-circle myHoverDelete`}
      style={{ width: 40, height: 40, cursor: "pointer" }}
      onClick={() => {
        openModal(modalType);
        setActiveCard(id);
      }}
    >
      <Image src={trash} alt="trash" width={16} height={16} />
    </div>
  );
}
