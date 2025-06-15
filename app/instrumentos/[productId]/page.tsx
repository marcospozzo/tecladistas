import {
  DeleteProductButton,
  EditProductButton,
  Location,
  WhatsAppButton,
} from "@/components";
import { getProduct, getUser } from "@/utils/axios";
import { formatPrice, productMessage } from "@/utils/utils";
import Image from "next/image";
import { FaArrowsRotate } from "react-icons/fa6";
import { MdPiano } from "react-icons/md";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { generateMetadata } from "./utils";
import { SALE } from "@/utils/constants";
export { generateMetadata };

const Product = async ({ params }: { params: { productId: string } }) => {
  const product = await getProduct(params.productId);
  const user = await getUser(product.userId!);
  const session = await getServerSession(authOptions);
  const isTheirOwn = session?.user.id === user._id;

  return (
    <div className="item">
      <div className="max-lg:w-full relative w-2/3 h-full">
        <Image
          className="object-contain w-full h-full lg:pr-8 max-h-screen"
          src={product.images[0]}
          alt={`${product.brand} ${product.model} product`}
          width={1000}
          height={1000}
        />
      </div>
      <div className="w-1/3 max-lg:w-full space-y-4">
        <h1>{product.title}</h1>

        {product.listingType === SALE
          ? product.price && (
              <h1 className="text-4xl">{formatPrice(product.price)}</h1>
            )
          : product.price && (
              <h1 className="text-4xl">{`${formatPrice(
                product.price
              )} / día`}</h1>
            )}

        {product.exchanges && (
          <div className="flex space-x-1">
            <FaArrowsRotate className="self-center" />
            <i className="self-center">
              Escucha propuestas de intercambio, como parte de pago.
            </i>
          </div>
        )}

        {product.year && <div>Año: {product.year}</div>}

        {product.description && <pre>{product.description}</pre>}

        <Location name={product.location} />

        <div>
          <div className="flex space-x-1">
            <MdPiano className="self-center" />
            <h3>{user.firstName}</h3>
          </div>
        </div>

        {isTheirOwn ? (
          <>
            <EditProductButton productId={product._id} />
            <DeleteProductButton id={product._id} />
          </>
        ) : (
          <WhatsAppButton
            userId={product.userId!}
            message={productMessage(user.firstName, product.title ?? "")}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
