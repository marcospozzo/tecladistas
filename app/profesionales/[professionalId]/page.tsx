import { ProfessionalProps } from "@/types";
import { getProfessional } from "@/utils/axios";
import { getData } from "@/utils/getData";

const Professional = async ({
  params,
}: {
  params: { professionalId: string };
}) => {
  const professional = await getProfessional(params.professionalId);
  console.log({ professional });

  return <div>{professional.firstName}</div>;
};

export default Professional;
