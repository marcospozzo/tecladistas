"use client";

import constants from "@/utils/constants";
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
  return (
    <div className="flex box-item bg-slate-300 rounded-xl">
      <Link className="m-auto" href={url}>
        <BsPlusCircleDotted className="m-auto" size={40} />
      </Link>
    </div>
  );
};

export default CardNew;
