import { ProductCard, Cards, CardNew } from "@/components";
import { ProductProps } from "@/types";
import { getProducts } from "@/utils/axios";

const Classified = async () => {
  const data = await getProducts();

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
