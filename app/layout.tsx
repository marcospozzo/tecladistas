import "./globals.css";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import Script from "next/script";
import { Header } from "@/components";
import "react-toastify/dist/ReactToastify.css";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import ClientLayoutUI from "@/components/ClientLayoutUI";
import Provider from "@/components/Provider";
import {
  THEME_COOKIE_NAME,
  THEME_RESOLVED_COOKIE_NAME,
  getServerResolvedTheme,
  getThemeInitScript,
  getThemePreference,
} from "@/components/theme/theme";
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
  const cookieStore = await cookies();
  const session = await getServerSession(authOptions);
  const initialThemePreference = getThemePreference(
    cookieStore.get(THEME_COOKIE_NAME)?.value
  );
  const initialResolvedTheme = getServerResolvedTheme(
    initialThemePreference,
    cookieStore.get(THEME_RESOLVED_COOKIE_NAME)?.value
  );

  return (
    <html
      className={initialResolvedTheme === "dark" ? "dark" : undefined}
      data-theme={initialResolvedTheme}
      data-theme-preference={initialThemePreference}
      lang="es"
      suppressHydrationWarning
      style={
        initialResolvedTheme
          ? { colorScheme: initialResolvedTheme }
          : undefined
      }
    >
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
        >
          {getThemeInitScript()}
        </Script>
      </head>
      <body>
        <Provider
          initialResolvedTheme={initialResolvedTheme}
          initialThemePreference={initialThemePreference}
          session={session}
        >
          <Header />
          <main>{children}</main>
        </Provider>
        <ClientLayoutUI />
      </body>
    </html>
  );
}
