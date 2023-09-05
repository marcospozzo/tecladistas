import Link from "next/link";
import Image from "next/image";
import { ITEMS, PROFESSIONALS, STUDIOS } from "@/utils/constants";

const Header = () => {
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
            <Link href="/">
              <h2>{ITEMS}</h2>
            </Link>{" "}
          </li>
          <li>
            <Link href="/profesionales">
              <h2>{PROFESSIONALS}</h2>
            </Link>{" "}
          </li>
          <li>
            <Link href="/estudios">
              <h2>{STUDIOS}</h2>
            </Link>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
