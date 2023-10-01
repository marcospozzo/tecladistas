import { ProductCard, Cards, CardNew } from "@/components";
import { ProductProps } from "@/types";
import { getProducts } from "@/utils/axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const Classified = async () => {
  const data = await getProducts();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  return (
    <Cards>
      <CardNew />
      {data?.map((product: ProductProps) => (
        <ProductCard
          key={product._id}
          product={product}
          isOwner={product.userId === userId}
        />
      ))}
    </Cards>
  );
};

export default Classified;
