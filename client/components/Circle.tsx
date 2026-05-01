"use client";

import Image from "next/image";
import { ImageSrc } from "./../types/image";

type CircleProps = {
  image: ImageSrc;
  alt: string;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export default function Circle({ image, alt, style, onClick }: CircleProps) {
  return (
    <div
      style={style}
      className="position-absolute z-2 d-flex align-items-center bg-white p-2 rounded-circle myHoverOpen"
      onClick={onClick}
    >
      <Image src={image} alt={alt} width={16} height={16} />
    </div>
  );
}
