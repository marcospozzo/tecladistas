import { ProfessionalProps } from "@/types";
import { getData } from "../getData";
import ProfessionalCard from "@/components/ProfessionalCard";

const Profesionales = async () => {
  const data = await getData("/professionals");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
      {data.map((professional: ProfessionalProps) => (
        <ProfessionalCard key={professional.id} professional={professional} />
      ))}
    </div>
  );
};

export default Profesionales;
