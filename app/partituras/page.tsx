import { Metadata } from "next";
import { pageTitles } from "@/utils/utils";
import { getAllSheetMusic, SheetMusic } from "@/utils/axios";
import dynamic from "next/dynamic";

const SheetMusicGrid = dynamic(() => import("./SheetMusicGrid"), { ssr: false });

export const metadata: Metadata = {
  title: pageTitles.sheetmusic,
};

export default async function SheetMusicPage({
  searchParams,
}: {
  searchParams: Promise<{ containsFilter?: string | string[] }>;
}) {
  const sheetMusic: SheetMusic[] = await getAllSheetMusic();
  const resolvedSearchParams = await searchParams;
  const containsFilter = resolvedSearchParams.containsFilter;
  const startingFilter =
    typeof containsFilter === "string" ? containsFilter : undefined;

  return <SheetMusicGrid rows={sheetMusic} startingFilter={startingFilter} />;
}
