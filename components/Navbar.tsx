import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SearchBox, ProfileButton } from "@/components";

const Navbar = () => {
  return (
    <header className="mx-auto flex justify-between cards-center">
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
        <ul className="flex flex-row cards-center">
          <li>
            <Link href="/">Clasificados</Link>{" "}
          </li>
          <li>
            <Link href="/profesionales">Profesionales</Link>{" "}
          </li>
          <li>
            <Link href="/estudios">Estudios</Link>{" "}
          </li>
        </ul>
      </nav>
      <SearchBox />
      <ProfileButton />
    </header>
  );
};

export default Navbar;
