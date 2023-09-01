import { ProfessionalProps } from "@/types";
import Image from "next/image";
import { FaLocationArrow } from "react-icons/fa";

const ProfessionalCard = ({
  professional,
}: {
  professional: ProfessionalProps;
}) => {
  return (
    <div className="flex items-center justify-between space-x-4 m-2 p-4 bg-slate-300 rounded-xl">
      <div className="flex flex-row items-center space-x-4">
        <Image
          className="profile-picture"
          src={"/profile-picture-placeholder.jpg"}
          alt={`${professional.firstName}'s profile picture`}
          width={40}
          height={40}
        />
        <p>{professional.firstName}</p>
      </div>
      {professional.location && (
        <div className="flex flex-row items-center space-x-1">
          <FaLocationArrow />
          <p>{professional.location}</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalCard;
