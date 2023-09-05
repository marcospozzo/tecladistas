"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ITEMS, PROFESSIONALS, STUDIOS } from "@/utils/constants";

const Navbar = () => {
  const [currentPage, setCurrentPage] = useState(ITEMS);

  const handleOnClick = (pageName: string) => {
    setCurrentPage(pageName);
  };

  return (
    <header className="flex justify-center border-b-4 border-solid border-gray-400">
      <nav className="flex flex-row">
        <Link href="/">
          <Image
            className="m-3"
            src="/logo.png"
            alt="keyboard knob"
            width={40}
            height={40}
          />
        </Link>
        <ul className="flex flex-row">
          <li>
            <Link
              href="/"
              className={
                currentPage === ITEMS ? "currentPage" : "notCurrentPage"
              }
              onClick={() => handleOnClick(ITEMS)}
            >
              <h2>{ITEMS}</h2>
            </Link>{" "}
          </li>
          <li>
            <Link
              href="/profesionales"
              className={
                currentPage === PROFESSIONALS ? "currentPage" : "notCurrentPage"
              }
              onClick={() => handleOnClick(PROFESSIONALS)}
            >
              <h2>{PROFESSIONALS}</h2>
            </Link>{" "}
          </li>
          <li>
            <Link
              href="/estudios"
              className={
                currentPage === STUDIOS ? "currentPage" : "notCurrentPage"
              }
              onClick={() => handleOnClick(STUDIOS)}
            >
              <h2>{STUDIOS}</h2>
            </Link>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
