import { ProductCard, Cards, CardNew } from "@/components";
import { getData } from "@/utils/getData";
import { ProductProps } from "@/types";

const Classified = async () => {
  const data = await getData("/products");

  return (
    <Cards>
      <CardNew />
      {data?.map((product: ProductProps) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </Cards>
  );
};

export default Classified;
