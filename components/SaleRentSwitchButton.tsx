"use client";

import { MouseEventHandler, useEffect, useState } from "react";

const SaleRentSwitchButton = ({ handleSwitchProducts }) => {
  const [switchStatus, setSwitchStatus] = useState(false);

  const handleOnClick = () => {
    setSwitchStatus(!switchStatus);
    handleSwitchProducts();
  };

  return (
    <nav className="flex w-fit mx-auto h-12 space-x-4 mb-4">
      <button
        onClick={handleOnClick}
        className={switchStatus ? "" : "is-active"}
      >
        Venta
      </button>
      <button
        onClick={handleOnClick}
        className={switchStatus ? "is-active" : ""}
      >
        Alquiler
      </button>
    </nav>
  );
};

export default SaleRentSwitchButton;
