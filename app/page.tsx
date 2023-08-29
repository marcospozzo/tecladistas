import { Cards } from "@/components";
import { getData } from "./getData";

const Home = async () => {
  const data = await getData("products");

  return <Cards data={data} />;
};

export default Home;
