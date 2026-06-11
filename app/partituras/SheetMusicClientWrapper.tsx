"use client";

// `ssr: false` must live in a Client Component — Server Components don't allow it.
// This wrapper is the boundary; page.tsx stays a Server Component for data fetching.
import dynamic from "next/dynamic";
import { SheetMusic } from "@/utils/axios";

const SheetMusicGrid = dynamic(() => import("./SheetMusicGrid"), { ssr: false });

export default function SheetMusicClientWrapper({
  rows,
  startingFilter,
}: {
  rows: SheetMusic[];
  startingFilter?: string;
}) {
  return <SheetMusicGrid rows={rows} startingFilter={startingFilter} />;
}
