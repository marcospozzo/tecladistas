import HomeDashboard from "@/components/home/HomeDashboard";
import { getHomeDashboardData } from "@/components/home/home-data";

const HomePage = async () => {
  const homeDashboardData = await getHomeDashboardData();

  return <HomeDashboard {...homeDashboardData} />;
};

export default HomePage;
