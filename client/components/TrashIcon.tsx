import Image from "next/image";
import trash from "./../app/assets/trash.svg";
import { useUIStore } from "./../stores/orderStore";
import { useProductStore } from "./../stores/productStore";

type CircleProps = {
  id: number;
  stealth?: boolean;
};

const cssCentre = "d-flex align-items-center justify-content-center";

export default function TrashIcon({ stealth, id }: CircleProps) {
  const { openModal } = useUIStore();
  const setActiveCard = useProductStore((s) => s.setActiveCard);

  return (
    <div
      className={`${cssCentre} bg-danger-subtle ${stealth ? "d-none" : ""} rounded-circle myHoverDelete`}
      style={{ width: 50, cursor: "pointer" }}
      onClick={() => {
        openModal();
        setActiveCard(id);
      }}
    >
      <Image src={trash} alt="trash" width={20} height={20} />
    </div>
  );
}
