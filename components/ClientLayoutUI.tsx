"use client";

import { Analytics } from "@vercel/analytics/react";
import { Bounce, ToastContainer } from "react-toastify";

export default function ClientLayoutUI() {
  return (
    <>
      <ToastContainer
        autoClose={5000}
        closeOnClick
        draggable
        pauseOnFocusLoss
        pauseOnHover
        position="bottom-right"
        theme="light"
        transition={Bounce}
      />
      {process.env.NODE_ENV === "production" ? <Analytics /> : null}
    </>
  );
}
