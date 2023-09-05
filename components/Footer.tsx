import Link from "next/link";
import { CONTACT } from "@/utils/constants";

const Footer = () => {
  return (
    <footer className="flex justify-end border-t-2 border-solid border-gray-400">
      <nav className="flex flex-row">
        <ul className="flex flex-row">
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
