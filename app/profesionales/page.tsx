import { ProfessionalProps } from "@/types";
import { getData } from "../getData";

const Profesionales = async () => {
  const data = await getData("/professionals");

  return (
    <main>
      {data.map((professional: ProfessionalProps) => (
        <div key={professional.id}>{professional.firstName}</div>
      ))}
    </main>
  );
};

export default Profesionales;
