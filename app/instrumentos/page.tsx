import PendingContentFallback from "@/components/navigation/PendingContentFallback";
import { Products } from "@/components";
import { getProducts } from "@/utils/axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Metadata } from "next";
import { pageTitles } from "@/utils/utils";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: pageTitles.instruments,
};

async function InstrumentsContent() {
  const products = await getProducts();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  return <Products products={products} userId={userId} />;
}

const Instruments = () => {
  return (
    <Suspense fallback={<PendingContentFallback variant="grid" />}>
      <InstrumentsContent />
    </Suspense>
  );
};

export default Instruments;
