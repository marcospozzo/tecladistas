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
      {/* hide the create button if user already has an active one */}
      {data[0].userId !== userId && <CardNew />}
      {data?.map((product: ProductProps) => (
        <ProductCard
          key={product._id}
          product={product}
          isTheirOwn={product.userId === userId}
        />
      ))}
    </Cards>
  );
};

export default Classified;
