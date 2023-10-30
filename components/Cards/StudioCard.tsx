import Image from "next/image";
import Link from "next/link";
import { StudioProps } from "@/types";
import { MdLocationPin } from "react-icons/md";
import { Location } from "@/components";

const StudioCard = ({ studio }: { studio: StudioProps }) => {
  return (
    <Link
      href={`/estudios/${studio._id}`}
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
      <h3 className="studio-name">{studio.name}</h3>
      <div className="flex justify-start">
        <Location name={studio.location} />
      </div>
    </Link>
  );
};

export default StudioCard;
