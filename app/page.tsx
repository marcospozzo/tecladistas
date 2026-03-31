import PendingContentFallback from "@/components/navigation/PendingContentFallback";
import HomeDashboard from "@/components/home/HomeDashboard";
import { getHomeDashboardData } from "@/components/home/home-data";
import { Suspense } from "react";

async function HomePageContent() {
  const homeDashboardData = await getHomeDashboardData();

  return <HomeDashboard {...homeDashboardData} />;
}

const HomePage = () => {
  return (
    <Suspense fallback={<PendingContentFallback variant="dashboard" />}>
      <HomePageContent />
    </Suspense>
  );
};

export default HomePage;
