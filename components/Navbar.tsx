import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="mx-auto flex justify-center cards-center">
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
            <Link href="/">
              <h2>Clasificados</h2>
            </Link>{" "}
          </li>
          <li>
            <Link href="/profesionales">
              <h2>Profesionales</h2>
            </Link>{" "}
          </li>
          <li>
            <Link href="/estudios">
              <h2>Estudios</h2>
            </Link>{" "}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
