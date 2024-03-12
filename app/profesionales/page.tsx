import { ProfessionalProps } from "@/types";
import { ProfessionalCard } from "@/components";
import {
  calculateRating,
  pageTitles,
  skillsPageIds,
  skillsTranslations,
} from "@/utils/utils";
import { skills } from "@/utils/utils";
import { getProfessionals } from "@/utils/axios";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: pageTitles.professionals,
};

const Professionals = async () => {
  const professionals = await getProfessionals();

  return (
    <div>
      {skills.map((skill: string) => (
        <div key={skill} className="mb-14" id={skillsPageIds[skill]}>
          <h1 className="mb-4">{skillsTranslations[skill]}</h1>
          <div className="professionals px-6 sm:px-12">
            {professionals
              .filter((professional: ProfessionalProps) =>
                professional.skills.includes(skill)
              )
              .sort(
                (a, b) =>
                  calculateRating(b.ratings) - calculateRating(a.ratings)
              )
              .map((professional: ProfessionalProps) => (
                <ProfessionalCard
                  key={professional._id}
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
