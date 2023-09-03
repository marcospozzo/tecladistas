import { ProfessionalProps, SkillProps } from "@/types";
import { getData } from "../getData";
import ProfessionalCard from "@/components/ProfessionalCard";

const Profesionales = async () => {
  const skills = await getData("/skills");
  const professionals = await getData("/professionals");

  return (
    <div>
      {skills.map((skill: SkillProps) => (
        <div>
          <h1>{skill.name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full">
            {skill.professionals.map((id: number) => {
              const index = professionals.findIndex(
                (professional: { id: number }) => professional.id === id
              );
              <ProfessionalCard key={id} professional={professionals[index]} />;
              return null;
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profesionales;
