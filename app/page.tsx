import { ProductCard, Cards, CardNew } from "@/components";
import { getData } from "@/utils/getData";
import { ProductProps } from "@/types";

const Home = async () => {
  const data = await getData("/products");

  return (
    <Cards>
      <CardNew />
      {data?.map((product: ProductProps) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </Cards>
  );
};

export default Home;
