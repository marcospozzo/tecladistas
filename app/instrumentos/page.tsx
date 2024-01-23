import { Products } from "@/components";
import { getProducts } from "@/utils/axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Metadata } from "next";
import { pageTitles } from "@/utils/utils";

export const metadata: Metadata = {
  title: pageTitles.instruments,
};

const Instruments = async () => {
  const products = await getProducts();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  return <Products products={products} userId={userId} />;
};

export default Instruments;
