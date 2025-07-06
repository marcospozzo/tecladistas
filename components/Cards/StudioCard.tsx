import { Location } from "@/components";
import { StudioProps } from "@/types";
import constants from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

const StudioCard = ({ studio }: { studio: StudioProps }) => {
  return (
    <Link
      href={`${constants.STUDIOS_PATH}/${studio._id}`}
      className="flex flex-col box-item bg-slate-300 rounded-xl"
    >
      <div className="relative inline-block w-full h-48 bg-white dark:bg-black overflow-hidden">
        <Image
          className="object-cover w-full h-full box-item-image"
          src={studio.images ? studio.images[0] : ""}
          alt={`Imagen que representa al estudio ${studio.name}`}
          width={300}
          height={300}
          priority={true}
        />
      </div>
      <h3 className="card-title">{studio.name}</h3>
      <div className="flex justify-start">
        <Location name={studio.location} />
      </div>
    </Link>
  );
};

export default StudioCard;
