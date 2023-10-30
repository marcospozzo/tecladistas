"use client";

import Link from "next/link";
import { BsPlusCircleDotted } from "react-icons/bs";
import { usePathname } from "next/navigation";

const CardNew = () => {
  const pathname = usePathname();
  const url = pathname === "/instrumentos" ? "/crear-publicacion" : "/contacto";
  return (
    <div className="flex box-item bg-slate-300 rounded-xl">
      <Link className="m-auto" href={url}>
        <BsPlusCircleDotted className="m-auto" size={40} />
      </Link>
    </div>
  );
};

export default CardNew;
