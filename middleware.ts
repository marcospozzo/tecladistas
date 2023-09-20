import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isAuthenticated = false;

export const config = {
  matcher: [
    "/profesionales",
    "/profesionales/:path*",
    "/estudios",
    "/estudios/:path*",
    "/clasificados",
  ],
};

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  //   if (!isAuthenticated(request)) {
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/entrar", request.url));
  }
}
