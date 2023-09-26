import "./globals.css";
import type { Metadata } from "next";
import { Footer, Header } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "Tecladistas",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return (
    <html lang="es">
      <body>
        <Header isLoggedIn={session != undefined} />
        <main>{children}</main>
        <Footer />
        <ToastContainer position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
