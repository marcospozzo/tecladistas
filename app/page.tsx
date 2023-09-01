import { ItemCard, Cards } from "@/components";
import { getData } from "./getData";
import { ItemProps } from "@/types";

const Home = async () => {
  const data = await getData("/products");

  return (
    <Cards>
      {data?.map((item: ItemProps) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </Cards>
  );
};

export default Home;
