import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookieName } from "./utils/utils";
// export { default } from "next-auth/middleware"; // its buggy on nextjs 13.4

export const config = {
  matcher: [
    "/profesionales/:path+",
    "/entrar",
    "/registrarse",
    "/contacto",
    "/crear-usuario",
    "/api/users/open-whatsapp/:userId+",
    "/crear-publicacion",
  ],
};

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname !== "/entrar" &&
    request.nextUrl.pathname !== "/registrarse" &&
    !request.cookies.has(cookieName)
  ) {
    const signinUrl = new URL("/entrar", request.url);
    signinUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signinUrl);
  }
  if (
    (request.nextUrl.pathname === "/entrar" ||
      request.nextUrl.pathname === "/registrarse") &&
    request.cookies.has(cookieName)
  ) {
    return NextResponse.redirect(new URL("/instrumentos", request.url));
  }
}
