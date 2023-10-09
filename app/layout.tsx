import "./globals.css";
import type { Metadata } from "next";
import { Footer, Header } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: {
    template: "%s | Tecladistas.ar",
    default: "Tecladistas.ar", // a default is required when creating a template
  },
  description:
    "Esta web reúne y facilita información útil para Tecladistxs Gitanxs. Desde nuestros teclados en venta hasta el contacto directo con técnicos.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es">
      <body>
        <Provider session={session}>
          <Header />
          <main>{children}</main>
          <Footer />
        </Provider>
        <ToastContainer position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
