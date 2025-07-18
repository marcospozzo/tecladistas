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
      className="flex items-center justify-between box bg-slate-300 dark:bg-slate-600 rounded-xl mx-1 shadow-md"
    >
      <div className="flex flex-row items-center space-x-3">
        <h3 className="dark:text-white">
          {professional.firstName}{" "}
          {professional.nickname && `"${professional.nickname}"`}{" "}
          {professional.lastName && `${professional.lastName.slice(0, 1)}.`}
        </h3>
        {professional.ratings?.length !== 0 && (
          <div className="flex flex-row space-x-1">
            <h3>{calculateRating(professional.ratings)}</h3>
            <FaStar className="self-center" />
          </div>
        )}
      </div>
      <div className="flex space-x-2 icons-container items-center">
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
