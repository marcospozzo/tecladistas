// Keep this file free of imports from utils/ — those modules pull in libphonenumber-js
// which pushes the middleware Edge Runtime bundle past the 1 MB limit.
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const IS_PRODUCTION = process.env.NODE_ENV === "production";
const COOKIE_NAME = IS_PRODUCTION
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";
const LOGIN_PATH = "/entrar";
const INSTRUMENTS_PATH = "/instrumentos";

export const config = {
  matcher: [
    "/profesionales/:path+",
    "/admin/:path*",
    "/perfil-de-profe",
    "/entrar",
    "/registrarse",
    "/contacto",
    "/api/users/open-whatsapp/:userId+",
    "/crear-publicacion",
    "/fotos/:path+",
    "/fotos",
    "/partituras",
  ],
};

export default function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname !== LOGIN_PATH &&
    request.nextUrl.pathname !== "/registrarse" &&
    !request.cookies.has(COOKIE_NAME)
  ) {
    const signinUrl = new URL(LOGIN_PATH, request.url);
    signinUrl.searchParams.set(
      "callbackUrl",
      `${request.nextUrl.pathname}${request.nextUrl.search}`
    );
    return NextResponse.redirect(signinUrl);
  }
}
