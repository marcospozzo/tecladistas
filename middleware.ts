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
  ],
};

export function middleware(request: NextRequest) {
  if (!request.cookies.has("next-auth.session-token")) {
    const signinUrl = new URL("/api/auth/signin", request.url);
    signinUrl.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signinUrl);
  }
}
