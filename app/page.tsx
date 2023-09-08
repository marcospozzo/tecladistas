import { ItemCard, Cards, CardNew } from "@/components";
import { getData } from "@/utils/getData";
import { ItemProps } from "@/types";

const Home = async () => {
  const data = await getData("/products");

  return (
    <Cards>
      <CardNew />
      {data?.map((item: ItemProps) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </Cards>
  );
};

export default Home;
