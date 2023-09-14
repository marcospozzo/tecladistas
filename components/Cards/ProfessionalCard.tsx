import { ProfessionalProps } from "@/types";
import Link from "next/link";
import { FaPhone, FaGlobeAmericas } from "react-icons/fa";
import { MdPiano, MdEmail, MdLocationPin } from "react-icons/md";

const ProfessionalCard = ({
  professional,
}: {
  professional: ProfessionalProps;
}) => {
  return (
    <Link
      href={`/profesionales/${professional._id}`}
      className="flex items-center justify-between box bg-slate-300 rounded-xl"
    >
      <div className="flex flex-row items-center space-x-4">
        <div>
          {professional.firstName}{" "}
          {professional.nickname && `"${professional.nickname}"`}{" "}
          {professional.lastName}
        </div>
      </div>
      <div className="flex space-x-2">
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
