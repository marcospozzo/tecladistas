import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, PROFESSIONALS, STUDIOS } from "@/utils/constants";

const Header = () => {
  return (
    <header className="flex justify-center border-b-4 border-solid border-gray-400">
      <nav className="flex flex-row mx-4">
        <Link href="/">
          <Image
            className="m-3 min-h-[40px] min-w-[40px]"
            src="/logo.svg"
            alt="Perilla de teclado"
            width={40}
            height={40}
          />
        </Link>
        <ul className="flex flex-row">
          <li>
            <Link href="/">
              <h2>{PRODUCTS}</h2>
            </Link>{" "}
          </li>
          <li>
            <Link href="/estudios">
              <h2>{STUDIOS}</h2>
            </Link>{" "}
          </li>
          <li>
            <Link href="/profesionales">
              <h2>{PROFESSIONALS}</h2>
            </Link>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
