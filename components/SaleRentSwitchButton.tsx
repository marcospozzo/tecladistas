import { constants } from "@/utils/utils";
import { MouseEventHandler } from "react";

const SaleRentSwitchButton = ({
  handleSwitchListingType,
  listingType,
}: {
  handleSwitchListingType: MouseEventHandler<HTMLButtonElement>;
  listingType: string;
}) => {
  return (
    <nav className="flex w-fit mx-auto h-12 space-x-4 mb-4">
      <button
        onClick={handleSwitchListingType}
        className={`p-2 ${listingType === constants.SALE && "is-active"}`}
      >
        Venta
      </button>
      <button
        onClick={handleSwitchListingType}
        className={`p-2 ${listingType === constants.RENT && "is-active"}`}
      >
        Alquiler
      </button>
    </nav>
  );
};

export default SaleRentSwitchButton;
