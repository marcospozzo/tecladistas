import Image from "next/image";
import Link from "next/link";
import { ProductProps } from "@/types";
import { Location } from "@/components";
import { formatPrice } from "@/utils/utils";
import { FaArrowsRotate } from "react-icons/fa6";

const ProductCard = ({
  product,
  isTheirOwn,
}: {
  product: ProductProps;
  isTheirOwn: boolean;
}) => {
  return (
    <Link
      href={`/${product._id}`}
      className={`flex flex-col box-item bg-slate-300 rounded-xl ${
        isTheirOwn && "border-4 border-green-500"
      } `}
      scroll={true}
    >
      <div className=" w-full h-48 bg-white overflow-hidden">
        <Image
          className="object-contain w-full h-full box-item-image"
          src={product.images ? product.images[0] : ""}
          alt={`${product.brand} product`}
          width={300}
          height={300}
          priority={true}
        />
      </div>
      <h3 className="product-title">{product.title}</h3>
      <div className="flex justify-between">
        {product.location && <Location name={product.location} />}
        <div className="flex space-x-2">
          {product.exchanges && <FaArrowsRotate className="self-center" />}
          {product.price && <span>{formatPrice(product.price)}</span>}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
