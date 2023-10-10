import "./globals.css";
import type { Metadata } from "next";
import { Footer, Header } from "@/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Provider from "@/components/Provider";
import { pageTitles } from "@/utils/utils";

export const metadata: Metadata = {
  title: {
    template: `%s | ${pageTitles.home}`,
    default: pageTitles.home,
  },
  description:
    "Esta web reúne y facilita información útil para Tecladistxs Gitanxs.",
  openGraph: {
    title: pageTitles.home,
    url: process.env.WEBSITE_URL,
    siteName: pageTitles.home,
    images: [
      {
        url: "/keyboard.jpg",
        alt: "Teclado de piano desde plano cenital",
        width: 2978.5,
        height: 578.5,
      },
    ],
    locale: "es",
    type: "website",
  },
  metadataBase: new URL(process.env.WEBSITE_URL!),
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
