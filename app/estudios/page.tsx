import { StudioCard, Cards } from "@/components";
import { getData } from "@/utils/getData";
import { StudioProps } from "@/types";

const Studios = async () => {
  const data = await getData("/studios");

  return (
    <Cards>
      {data?.map((studio: StudioProps) => (
        <StudioCard key={studio.id} studio={studio} />
      ))}
    </Cards>
  );
};

export default Studios;
