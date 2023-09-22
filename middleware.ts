import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export const config = {
//   matcher: [
//     "/profesionales",
//     "/profesionales/:path*",
//     "/estudios",
//     "/estudios/:path*",
//     "/clasificados",
//     "/crear-cuenta",
//     "/entrar",
//   ],
// };

const protectedRoutes = ["/profesionales", "/estudios", "/clasificados"];

const routeIsProtected = (route: string) => {
  for (const protectedRoute of protectedRoutes) {
    if (route.includes(protectedRoute)) {
      return true;
    }
  }
  return false;
};

export function middleware(request: NextRequest) {
  // if (request.nextUrl.pathname.startsWith("/entrar")) {
  // }
  if (
    !request.cookies.has("authorization") &&
    routeIsProtected(request.nextUrl.pathname)
  ) {
    const redirectUrl = new URL("/crear-cuenta", request.url);
    redirectUrl.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    (request.nextUrl.pathname === "/entrar" ||
      request.nextUrl.pathname === "/crear-cuenta") &&
    request.cookies.has("authorization")
  ) {
    return NextResponse.redirect(new URL("/clasificados", request.url));
  }

  if (request.nextUrl.pathname === "/salir") {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.delete("authorization");
    return response;
  }
}
