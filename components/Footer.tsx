import Link from "next/link";
import { CONTACT, ABOUT_US } from "@/utils/constants";

const Footer = () => {
  return (
    <footer className="flex justify-center h-14 bg-gray-400">
      <nav className="flex flex-row">
        <ul className="flex flex-row">
          <li>
            <Link href="/sobre-nosotrxs">
              <h2>{ABOUT_US}</h2>
            </Link>
          </li>
          <li>
            <Link href="/contacto">
              <h2>{CONTACT}</h2>
            </Link>{" "}
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
