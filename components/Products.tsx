"use client";

import { ProductProps } from "@/types";
import {
  ProductCard,
  Cards,
  CardNew,
  SaleRentSwitchButton,
} from "@/components";
import { useEffect, useState } from "react";
import { constants } from "@/utils/utils";

const Products = ({
  products,
  userId,
}: {
  products: ProductProps[];
  userId: string | undefined;
}) => {
  const [listingType, setListingType] = useState<
    NonNullable<ProductProps["listingType"]>
  >(constants.SALE);

  const sortedProducts = [...products].sort((a, b) =>
    a.userId === userId ? -1 : b.userId === userId ? 1 : 0,
  );

  const productsForSale = sortedProducts.filter(
    (product) => product.listingType === constants.SALE,
  );

  const productsForRent = sortedProducts.filter(
    (product) => product.listingType === constants.RENT,
  );

  const handleSwitchListingType = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setListingType((prevListingType) =>
      prevListingType === constants.SALE ? constants.RENT : constants.SALE,
    );
  };

  const displayedProducts =
    listingType === constants.SALE ? productsForSale : productsForRent;

  useEffect(() => {
    if (window.location.hash === "#alquiler") setListingType(constants.RENT);
  }, []);

  return (
    <>
      {listingType === constants.SALE && (
        <div className="rounded-xl border border-amber-400/70 bg-amber-50 p-4 mb-2 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-300">
          Las publicaciones de venta dejarán de mostrarse luego de un año sin
          modificaciones.
        </div>
      )}
      <SaleRentSwitchButton
        handleSwitchListingType={handleSwitchListingType}
        listingType={listingType}
      />
      <Cards>
        {/* show create button if user does not have one created yet */}
        {displayedProducts[0]?.userId !== userId && (
          <CardNew listingType={listingType} />
        )}

        {displayedProducts.map((product: ProductProps) => (
          <ProductCard
            key={product._id}
            product={product}
            isTheirOwn={product.userId === userId}
            listingType={listingType}
          />
        ))}
      </Cards>
    </>
  );
};

export default Products;
