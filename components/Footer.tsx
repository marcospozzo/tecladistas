import Link from "next/link";
import { CONTACT, EMAIL } from "@/utils/constants";

const Footer = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  return (
    <footer className="flex justify-center h-14 bg-gray-400">
      <nav className="flex flex-row">
        <ul className="flex flex-row">
          <li>
            {isLoggedIn ? (
              <Link href="/contacto">
                <h2>{CONTACT}</h2>
              </Link>
            ) : (
              <Link href={`mailto:${EMAIL}`}>{EMAIL}</Link>
            )}
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
