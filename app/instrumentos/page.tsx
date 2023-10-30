import { ProductCard, Cards, CardNew } from "@/components";
import { ProductProps } from "@/types";
import { getProducts } from "@/utils/axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Metadata } from "next";
import { pageTitles } from "@/utils/utils";

export const metadata: Metadata = {
  title: pageTitles.instruments,
};

const Intruments = async () => {
  const products = await getProducts();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const currentUserProducts = products.filter(
    (product) => product.userId === userId
  );
  const otherUsersProducts = products.filter(
    (product) => product.userId !== userId
  );
  const sortedProducts = currentUserProducts.concat(otherUsersProducts);

  return (
    <Cards>
      {/* show create button if user does not have on created yet */}
      {(products.length === 0 || currentUserProducts.length === 0) && (
        <CardNew />
      )}
      {sortedProducts?.map((product: ProductProps) => (
        <ProductCard
          key={product._id}
          product={product}
          isTheirOwn={product.userId === userId}
        />
      ))}
    </Cards>
  );
};

export default Intruments;
