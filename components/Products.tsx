"use client";

import { ProductProps } from "@/types";
import {
  ProductCard,
  Cards,
  CardNew,
  SaleRentSwitchButton,
} from "@/components";
import { useState } from "react";

const Products = ({
  products,
  userId,
}: {
  products: ProductProps[];
  userId: string | undefined;
}) => {
  const [listingType, setListingType] = useState("sale");

  const sortedProducts = products.sort((a, b) =>
    a.userId === b.userId ? -1 : 1
  );
  const { productsForSale, productsForRent } = sortedProducts.reduce(
    (result, product) => {
      if (product.listingType === "rent") {
        result.productsForRent.push(product);
      } else {
        result.productsForSale.push(product);
      }
      return result;
    },
    { productsForSale: [], productsForRent: [] }
  );

  const userHasAtLeastOnePublishedProduct = sortedProducts[0].userId === userId;

  const handleSwitchProducts = () => {
    setListingType((prevListingType) =>
      prevListingType === "sale" ? "rent" : "sale"
    );
  };

  const displayedProducts =
    listingType === "sale" ? productsForSale : productsForRent;

  return (
    <>
      <SaleRentSwitchButton handleSwitchProducts={handleSwitchProducts} />
      <Cards>
        {/* show create button if user does not have one created yet */}
        {!userHasAtLeastOnePublishedProduct && <CardNew />}

        {displayedProducts.map((product: ProductProps) => (
          <ProductCard
            key={product._id}
            product={product}
            isTheirOwn={product.userId === userId}
          />
        ))}
      </Cards>
    </>
  );
};

export default Products;
