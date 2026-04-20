import { ProductProps } from "@/types";
import { constants } from "@/utils/utils";

const LISTING_BADGE_BASE_CLASS =
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold text-white shadow-lg";

const LISTING_BADGE_RENT_CLASS =
  "border-sky-200/80 bg-sky-600 shadow-sky-950/30";

const LISTING_BADGE_SALE_CLASS =
  "border-emerald-200/80 bg-emerald-600 shadow-emerald-950/30";

export function getListingBadgeClass(
  listingType?: ProductProps["listingType"],
) {
  const toneClass =
    listingType === constants.RENT
      ? LISTING_BADGE_RENT_CLASS
      : LISTING_BADGE_SALE_CLASS;

  return `${LISTING_BADGE_BASE_CLASS} ${toneClass}`;
}
