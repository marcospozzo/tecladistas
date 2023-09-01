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
    </header>
  );
};

export default Navbar;
