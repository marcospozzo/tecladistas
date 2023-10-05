"use client";

import Link from "next/link";
import { CONTACT, EMAIL } from "@/utils/constants";
import { useSession } from "next-auth/react";

const Footer = () => {
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  return (
    <footer className="flex justify-center h-14 border-t-4 header-footer">
      <nav className="flex flex-row">
        <ul className="flex flex-row">
          <li>
            {isLoggedIn ? (
              <Link href="/contacto">
                <h2>{CONTACT}</h2>
              </Link>
            ) : (
              <Link
                href={`mailto:${EMAIL}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {EMAIL}
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
