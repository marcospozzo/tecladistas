import "./globals.css";
import type { Metadata } from "next";
import { Footer, Header } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Tecladistas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const isLoggedIn = cookieStore.get("authorization");

  return (
    <html lang="es">
      <body>
        <Header isLoggedIn={!!isLoggedIn} />
        <main>{children}</main>
        <Footer />
        <ToastContainer position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
