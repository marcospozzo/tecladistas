import PendingContentFallback from "@/components/navigation/PendingContentFallback";
import { StudioCard, Cards, CardNew } from "@/components";
import { StudioProps } from "@/types";
import { getStudios } from "@/utils/axios";
import { pageTitles } from "@/utils/utils";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: pageTitles.studios,
};

async function StudiosContent() {
  const data = await getStudios();

  return (
    <Cards>
      {data?.map((studio: StudioProps) => (
        <StudioCard key={studio._id} studio={studio} />
      ))}
      <CardNew />
    </Cards>
  );
}

const Studios = () => {
  return (
    <Suspense fallback={<PendingContentFallback variant="grid" />}>
      <StudiosContent />
    </Suspense>
  );
};

export default Studios;
