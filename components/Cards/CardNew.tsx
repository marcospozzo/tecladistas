"use client";

import { ProductProps } from "@/types";
import { constants } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsPlusCircleDotted } from "react-icons/bs";

const CardNew = ({
  listingType,
}: {
  listingType?: NonNullable<ProductProps["listingType"]>;
}) => {
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
    <div className="ui-card flex min-h-[16rem] p-6">
      <Link
        aria-label={hoverHint}
        className="m-auto flex h-full w-full flex-col items-center justify-center rounded-2xl border border-dashed border-black/10 bg-white/40 text-slate-500 transition hover:border-slate-400 hover:bg-white/70 hover:text-slate-900 dark:border-white/10 dark:bg-slate-950/20 dark:text-slate-300 dark:hover:border-white/30 dark:hover:bg-slate-950/40 dark:hover:text-white"
        href={url}
        title={hoverHint}
      >
        <BsPlusCircleDotted className="m-auto" size={40} />
      </Link>
    </div>
  );
};

export default CardNew;
