import { pageTitles } from "@/utils/utils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: pageTitles.contact,
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
