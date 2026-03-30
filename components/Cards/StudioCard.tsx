import { Location } from "@/components";
import DefensiveImage from "@/components/DefensiveImage";
import { StudioProps } from "@/types";
import { constants } from "@/utils/utils";
import Link from "next/link";

const StudioCard = ({ studio }: { studio: StudioProps }) => {
  return (
    <Link
      href={`${constants.STUDIOS_PATH}/${studio._id}`}
      className="ui-link-card group flex flex-col overflow-hidden p-4"
    >
      <div className="relative inline-block h-48 w-full overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-950/60">
        <DefensiveImage
          alt={`Imagen que representa al estudio ${studio.name}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          height={300}
          priority={true}
          src={studio.images?.[0]}
          width={300}
        />
      </div>

      <div className="mt-4 space-y-3">
        <h3 className="card-title text-lg font-semibold tracking-tight">
          {studio.name}
        </h3>
        <div className="flex justify-start">
          <Location name={studio.location} />
        </div>
      </div>
    </Link>
  );
};

export default StudioCard;
