import { StudioCard, Cards, CardNew } from "@/components";
import { StudioProps } from "@/types";
import { getStudios } from "@/utils/axios";
import { pageTitles } from "@/utils/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: pageTitles.studios,
};

const Studios = async () => {
  const data = await getStudios();

  return (
    <Cards>
      {data?.map((studio: StudioProps) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
      <CardNew />
    </Cards>
  );
};

export default Studios;
