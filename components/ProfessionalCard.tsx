import { ProfessionalProps } from "@/types";
import Image from "next/image";
import { Location } from "@/components";

const ProfessionalCard = ({
  professional,
}: {
  professional: ProfessionalProps;
}) => {
  return (
    <div className="flex items-center justify-between space-x-4 m-2 p-4 bg-slate-300 rounded-xl">
      <div className="flex flex-row items-center space-x-4">
        <p>
          {professional.firstName}{" "}
          {professional.nickname && `"${professional.nickname}"`}{" "}
          {professional.lastName}
        </p>
      </div>
      {professional.location && <Location name={professional.location} />}
    </div>
  );
};

export default ProfessionalCard;
