import Image from "next/image";
import Link from "next/link";
import { StudioProps } from "@/types";
import { MdLocationPin } from "react-icons/md";
import { Location } from "@/components";

const StudioCard = ({ studio }: { studio: StudioProps }) => {
  return (
    <Link
      href={`/estudios/${studio.id}`}
      className="flex flex-col space-y-4 m-5 p-8 bg-slate-300 rounded-xl"
    >
      <Image
        className="mx-auto"
        src={"/placeholder-600x400.png"}
        alt={`descriptive image of ${studio.name}`}
        width={300}
        height={300}
      />
      <h3>{studio.name}</h3>
      <div className="flex justify-between">
        <Location name={studio.location} />
      </div>
    </Link>
  );
};

export default StudioCard;
