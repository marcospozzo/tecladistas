import { RENT, SALE } from "@/utils/constants";
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
        className={listingType === SALE ? "is-active" : "p-2"}
      >
        Venta
      </button>
      <button
        onClick={handleSwitchListingType}
        className={listingType === RENT ? "is-active" : "p-2"}
      >
        Alquiler
      </button>
    </nav>
  );
};

export default SaleRentSwitchButton;
