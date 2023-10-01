import { StudioCard, Cards } from "@/components";
import { StudioProps } from "@/types";
import { getStudios } from "@/utils/axios";

const Studios = async () => {
  const data = await getStudios();

  return (
    // <Cards>
    //   {data?.map((studio: StudioProps) => (
    //     <StudioCard key={studio._id} studio={studio} />
    //   ))}
    // </Cards>
    <div className="flex justify-center">
      <i>Próximamente</i>
    </div>
  );
};

export default Studios;
