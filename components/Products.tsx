"use client";

import { ProductProps } from "@/types";
import {
  ProductCard,
  Cards,
  CardNew,
  SaleRentSwitchButton,
} from "@/components";
import { useState } from "react";
import { RENT, SALE } from "@/utils/constants";

const Products = ({
  products,
  userId,
}: {
  products: ProductProps[];
  userId: string | undefined;
}) => {
  const [listingType, setListingType] = useState(SALE);

  const sortedProducts = products.sort((a, b) =>
    a.userId === b.userId ? -1 : 1
  );
  const { productsForSale, productsForRent } = sortedProducts.reduce(
    (result, product) => {
      if (product.listingType === RENT) {
        result.productsForRent.push(product);
      } else {
        result.productsForSale.push(product);
      }
      return result;
    },
    { productsForSale: [], productsForRent: [] }
  );

  const handleSwitchListingType = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setListingType((prevListingType) =>
      prevListingType === SALE ? RENT : SALE
    );
  };

  const displayedProducts =
    listingType === SALE ? productsForSale : productsForRent;

  return (
    <>
      <SaleRentSwitchButton
        handleSwitchListingType={handleSwitchListingType}
        listingType={listingType}
      />
      <Cards>
        {/* show create button if user does not have one created yet */}
        {displayedProducts[0]?.userId !== userId && <CardNew />}

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
