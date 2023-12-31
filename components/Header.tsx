"use client";

import Link from "next/link";
import Image from "next/image";
import {
  LOGIN,
  LOGOUT,
  INSTRUMENTS,
  PROFESSIONALS,
  STUDIOS,
} from "@/utils/constants";
import { FaUserAlt } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const Header = () => {
  const pathname = usePathname();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const navigationItems = [
    { label: INSTRUMENTS, link: "/instrumentos" },
    { label: PROFESSIONALS, link: "/profesionales" },
    { label: STUDIOS, link: "/estudios" },
  ];

  return (
    <header className="flex justify-between max-sm:justify-center border-b-4 header-footer">
      <nav className="flex flex-row mx-4">
        <Link className="self-center" href="/">
          <Image
            className="m-2 min-h-[40px] min-w-[40px]"
            src="/logo.svg"
            alt="Perilla de teclado"
            width={40}
            height={40}
          />
        </Link>
        <ul className="flex flex-row">
          {navigationItems.map((item, index) => {
            const isActive = pathname === item.link;

            return (
              <Link className="self-center" key={index} href={item.link}>
                <li className={isActive ? "is-active" : ""}>
                  <h2>{item.label}</h2>
                </li>
              </Link>
            );
          })}
        </ul>
      </nav>
      {isLoggedIn ? (
        <Link
          className="self-center max-sm:hidden"
          href="/api/auth/signout"
          prefetch={false}
        >
          <nav id="login navbar" className="flex flex-row mx-4">
            <FaUserAlt className="self-center" />
            <ul className="flex flex-row">
              <li>
                <h2>{LOGOUT}</h2>
              </li>
            </ul>
          </nav>
        </Link>
      ) : (
        <Link className="self-center max-sm:hidden" href="/entrar">
          <nav id="login navbar" className="flex flex-row mx-4">
            <FaUserAlt className="self-center" />
            <ul className="flex flex-row">
              <li>
                <h2>{LOGIN}</h2>
              </li>
            </ul>
          </nav>
        </Link>
      )}
    </header>
  );
};

export default Header;
