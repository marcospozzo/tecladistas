import { Location } from "@/components";
import DefensiveImage from "@/components/DefensiveImage";
import { getListingBadgeClass } from "@/components/listingBadge";
import { ProductProps } from "@/types";
import { constants } from "@/utils/utils";
import { formatPrice } from "@/utils/utils";
import Link from "next/link";
import { FaArrowsRotate } from "react-icons/fa6";

const ProductCard = ({
  product,
  isTheirOwn,
  listingType,
}: {
  product: ProductProps;
  isTheirOwn: boolean;
  listingType: ProductProps["listingType"];
}) => {
  const badgeListingType = product.listingType ?? listingType;

  return (
    <Link
      href={`${constants.INSTRUMENTS_PATH}/${product._id}`}
      className={`ui-link-card group flex flex-col overflow-hidden p-4 ${
        isTheirOwn ? "border-2 border-emerald-500/70" : ""
      }`}
      scroll={true}
    >
      <div className="relative h-48 overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-950/60">
        <DefensiveImage
          alt={`${product.brand} product`}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          height={300}
          priority={true}
          src={product.images?.[0]}
          width={300}
        />
        {isTheirOwn ? (
          <span
            className={`absolute left-3 top-3 ${getListingBadgeClass(badgeListingType)}`}
          >
            Tu publicación
          </span>
        ) : null}
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="card-title text-lg font-semibold tracking-tight">
            {product.title}
          </h3>
          {product.exchanges && (
            <span
              aria-label="Escucha propuestas de canje"
              className="ui-chip self-center"
              title="Escucha propuestas de canje"
            >
              <FaArrowsRotate />
            </span>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          {product.location ? <Location name={product.location} /> : <span />}
          {product.price ? (
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              {badgeListingType === constants.SALE
                ? formatPrice(product.price)
                : `${formatPrice(product.price)} / día`}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
