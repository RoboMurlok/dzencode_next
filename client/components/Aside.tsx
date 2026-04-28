"use client";

import Image from "next/image";
import Navbar from "./Navbar";
import avatar from "./../app/assets/avatar.jpg";
import gear from "./../app/assets/gear.svg";

export default function Aside() {
  return (
    // <aside className="d-flex flex-column gap-5 p-5 align-items-center min-vh-100">
    <aside className="d-flex flex-column gap-5 p-5 align-items-center h-100 w-100"> 
      <div className="position-relative">
        <Image
          src={avatar}
          alt="avatar"
          width={100}
          height={100}
          className="rounded-circle"
          priority
        />
        <div
          className="position-absolute z-1 d-flex align-items-center bg-white shadow p-3 rounded-circle"
          style={{
            bottom: "-5px",
            right: "-10px",
          }}
        >
          <Image src={gear} alt="gear" width={14} height={14} />
        </div>
      </div>
      <Navbar />
    </aside>
  );
}
