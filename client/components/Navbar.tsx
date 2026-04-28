"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ROUTES, NavLinkItem } from "./../types/routes";

const navLinks: NavLinkItem[] = [
  { name: "Продукты", path: ROUTES.products },
  { name: "Ордера", path: ROUTES.orders },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="d-flex flex-column align-items-center gap-4">
      {navLinks.map((link) => (
        <Link
          key={link.path}
          href={link.path}
          className={`navLink ${pathname === link.path ? "active" : ""} fw-bolder text-black opacity-75`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
