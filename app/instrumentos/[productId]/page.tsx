import {
  DeleteProductButton,
  EditProductButton,
  Location,
  WhatsAppButton,
} from "@/components";
import DefensiveImage from "@/components/DefensiveImage";
import { getProduct, getUser } from "@/utils/axios";
import { formatPrice, productMessage } from "@/utils/utils";
import { FaArrowsRotate } from "react-icons/fa6";
import { MdPiano } from "react-icons/md";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { generateMetadata } from "./utils";
import { constants } from "@/utils/utils";
export { generateMetadata };

const Product = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const product = await getProduct(productId);
  const user = await getUser(product.userId!);
  const session = await getServerSession(authOptions);
  const isTheirOwn = session?.user.id === user._id;
  const date = new Date(product.createdAt ?? "");
  const createdAtSpanishDate = new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return (
    <div className="ui-detail-layout">
      <div className="ui-detail-media min-h-[420px]">
        <DefensiveImage
          alt={`${product.brand} ${product.model} product`}
          className="h-full w-full object-contain"
          height={1000}
          src={product.images?.[0]}
          width={1000}
        />
      </div>
      <div className="ui-detail-sidebar space-y-5">
        <div className="space-y-2">
          <p className="ui-eyebrow">Instrumento</p>
          <h1>{product.title}</h1>
        </div>

        {product.listingType === constants.SALE
          ? product.price && (
              <h1 className="text-4xl">{formatPrice(product.price)}</h1>
            )
          : product.price && (
              <h1 className="text-4xl">{`${formatPrice(
                product.price,
              )} / día`}</h1>
            )}

        {product.exchanges && (
          <div className="ui-chip w-fit">
            <span
              aria-label="Escucha propuestas de canje"
              title="Escucha propuestas de canje"
            >
              <FaArrowsRotate />
            </span>
            <i>Escucha propuestas de canje.</i>
          </div>
        )}

        {product.year && <div className="ui-detail-meta">Año: {product.year}</div>}

        {product.description && (
          <pre className="text-sm leading-7 text-slate-700 dark:text-slate-200">
            {product.description}
          </pre>
        )}

        <Location name={product.location} />

        <div className="ui-detail-meta">
          <MdPiano className="self-center" />
          <h3>{user.firstName}</h3>
        </div>

        <div className="ui-detail-actions">
          {isTheirOwn ? (
            <EditProductButton productId={product._id} />
          ) : (
            <WhatsAppButton
              userId={product.userId!}
              message={productMessage(user.firstName, product.title ?? "")}
            />
          )}

          {isTheirOwn ? (
            <DeleteProductButton id={product._id} />
          ) : (
            <div className="text-sm text-slate-600 dark:text-slate-300">
              <i>{`Fecha de publicación: ${createdAtSpanishDate}`}</i>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
