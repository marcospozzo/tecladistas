import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/profesionales",
    "/profesionales/:path*",
    "/estudios",
    "/estudios/:path*",
    "/clasificados",
    "/entrar",
  ],
};

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname !== "/entrar" &&
    !request.cookies.has("next-auth.session-token")
  ) {
    const signinUrl = new URL("/entrar", request.url);
    signinUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signinUrl);
  }
  if (
    request.nextUrl.pathname === "/entrar" &&
    request.cookies.has("next-auth.session-token")
  ) {
    return NextResponse.redirect(new URL("/clasificados", request.url));
  }
}
