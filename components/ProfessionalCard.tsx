import { ProfessionalProps } from "@/types";
import Link from "next/link";
import { Location } from "@/components";

const ProfessionalCard = ({
  professional,
}: {
  professional: ProfessionalProps;
}) => {
  return (
    <Link
      href={`/profesionales/${professional.id}`}
      className="flex items-center justify-between space-x-4 m-2 p-4 bg-slate-300 rounded-xl"
    >
      <div className="flex flex-row items-center space-x-4">
        <p>
          {professional.firstName}{" "}
          {professional.nickname && `"${professional.nickname}"`}{" "}
          {professional.lastName}
        </p>
      </div>
      {professional.location && <Location name={professional.location} />}
    </Link>
  );
};

export default ProfessionalCard;
