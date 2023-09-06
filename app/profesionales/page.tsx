import { ProfessionalProps, SkillProps } from "@/types";
import { getData } from "@/utils/getData";
import { ProfessionalCard } from "@/components";
import { skillsTranslations } from "@/utils/utils";

const Professionals = async () => {
  const skills = await getData("/skills");
  const professionals = await getData("/professionals");

  return (
    <div>
      {skills.map((skill: string) => (
        <div key={skill} className="mb-16">
          <h1 className="mb-2">{skillsTranslations[skill]}</h1>
          <div className="professionals">
            {professionals
              .filter((professional: ProfessionalProps) =>
                professional.skills.includes(skill)
              )
              .map((professional: ProfessionalProps) => (
                <ProfessionalCard
                  key={professional.id}
                  professional={professional}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Professionals;
