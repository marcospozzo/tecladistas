import { Location } from "@/components";
import { ProductProps } from "@/types";
import { constants } from "@/utils/utils";
import { formatPrice } from "@/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { FaArrowsRotate } from "react-icons/fa6";

const ProductCard = ({
  product,
  isTheirOwn,
  listingType,
}: {
  product: ProductProps;
  isTheirOwn: boolean;
  listingType: string;
}) => {
  return (
    <Link
      href={`${constants.INSTRUMENTS_PATH}/${product._id}`}
      className={`flex flex-col box-item bg-slate-300 rounded-xl ${
        isTheirOwn && "border-4 border-green-500"
      } `}
      scroll={true}
    >
      <div className="w-full h-48 bg-white dark:bg-black overflow-hidden">
        <Image
          className="object-contain w-full h-full box-item-image"
          src={product.images ? product.images[0] : ""}
          alt={`${product.brand} product`}
          width={300}
          height={300}
          priority={true}
        />
      </div>
      <h3 className="card-title">{product.title}</h3>
      <div className="flex justify-between">
        {product.location && <Location name={product.location} />}
        <div className="flex space-x-2">
          {product.exchanges && <FaArrowsRotate className="self-center" />}
          {product.price && (
            <span>
              {listingType === constants.SALE
                ? formatPrice(product.price)
                : `${formatPrice(product.price)} / día`}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
