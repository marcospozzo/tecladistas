"use client";

import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";

export default function ClientLayoutUI() {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <>
      <ToastContainer position="bottom-right" />
      <Analytics />
    </>
  );
}
