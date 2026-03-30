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
    <nav className="mx-auto mb-2 flex w-fit items-center gap-2 rounded-full border border-black/10 bg-white/70 p-1 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
      <button
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          listingType === constants.SALE
            ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950"
            : "text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10"
        }`}
        onClick={handleSwitchListingType}
        type="button"
      >
        Venta
      </button>
      <button
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          listingType === constants.RENT
            ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-950"
            : "text-slate-600 hover:bg-black/5 dark:text-slate-300 dark:hover:bg-white/10"
        }`}
        onClick={handleSwitchListingType}
        type="button"
      >
        Alquiler
      </button>
    </nav>
  );
};

export default SaleRentSwitchButton;
