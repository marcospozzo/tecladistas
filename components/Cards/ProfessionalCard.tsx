import { ProfessionalProps } from "@/types";
import { constants } from "@/utils/utils";
import { calculateRating } from "@/utils/utils";
import Link from "next/link";
import { FaGlobeAmericas, FaPhone, FaStar } from "react-icons/fa";
import { MdEmail, MdLocationPin, MdPiano } from "react-icons/md";

const ProfessionalCard = ({
  professional,
}: {
  professional: ProfessionalProps;
}) => {
  return (
    <Link
      href={`${constants.PROFESSIONALS_PATH}/${professional._id}`}
      className="ui-link-card flex items-center justify-between gap-4 p-5"
    >
      <div className="flex min-w-0 flex-row items-center gap-3">
        <h3 className="truncate text-base font-semibold tracking-tight dark:text-white">
          {professional.firstName}{" "}
          {professional.nickname && `"${professional.nickname}"`}{" "}
          {professional.lastName && `${professional.lastName.slice(0, 1)}.`}
        </h3>
        {professional.ratings?.length !== 0 && (
          <div className="ui-chip flex flex-row space-x-1">
            <h3>{calculateRating(professional.ratings)}</h3>
            <FaStar className="self-center" />
          </div>
        )}
      </div>
      <div className="flex shrink-0 items-center space-x-2 text-slate-600 dark:text-white">
        {professional.isTecladista && <MdPiano />}
        {professional.phone && <FaPhone />}
        {professional.email && <MdEmail />}
        {professional.website && <FaGlobeAmericas />}
        {professional.location && <MdLocationPin />}
      </div>
    </Link>
  );
};

export default ProfessionalCard;
