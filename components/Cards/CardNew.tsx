"use client";

import { constants } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsPlusCircleDotted } from "react-icons/bs";

const CardNew = ({ listingType = "" }) => {
  const pathname = usePathname();
  const url =
    listingType === constants.RENT
      ? "/crear-publicacion#alquiler"
      : pathname === constants.INSTRUMENTS_PATH
      ? "/crear-publicacion"
      : constants.CONTACT_PATH;
  const hoverHint =
    listingType === constants.RENT
      ? "Crear publicación de alquiler"
      : pathname === constants.INSTRUMENTS_PATH
      ? "Crear publicación de venta"
      : "Contactanos para publicar tu estudio";

  return (
    <div className="flex box-item bg-slate-300 rounded-xl">
      <Link
        aria-label={hoverHint}
        className="m-auto"
        href={url}
        title={hoverHint}
      >
        <BsPlusCircleDotted className="m-auto" size={40} />
      </Link>
    </div>
  );
};

export default CardNew;
