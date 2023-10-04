import "./globals.css";
import type { Metadata } from "next";
import { Footer, Header } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { SessionProvider } from "next-auth/react";
import Provider from "@/components/Provider";

export const metadata: Metadata = {
  title: "Tecladistas",
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
        </Provider>
        <main>{children}</main>
        <Footer isLoggedIn={session !== null} />
        <ToastContainer position="bottom-right" />
        <Analytics />
      </body>
    </html>
  );
}
