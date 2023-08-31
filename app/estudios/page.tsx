import { Cards } from "@/components";
import { getData } from "../getData";

const Estudios = async () => {
  const data = await getData("/studios");

  return <Cards data={data} />;
};

export default Estudios;
