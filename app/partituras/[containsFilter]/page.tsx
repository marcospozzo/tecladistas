import { Metadata } from "next";
import { pageTitles } from "@/utils/utils";
import { getAllSheetMusic, SheetMusic } from "@/utils/axios";
import SheetMusicGrid from "../SheetMusicGrid";

export const metadata: Metadata = {
  title: pageTitles.sheetmusic,
};

export default async function SheetMusicPage(params: {
  params: { containsFilter: string };
}) {
  const sheetMusic: SheetMusic[] = await getAllSheetMusic();

  return (
    <SheetMusicGrid
      rows={sheetMusic}
      startingFilter={params.params.containsFilter}
    />
  );
}
