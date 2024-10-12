import type { NextRequest } from "next/server";
import { getCookies } from "@lib/cookies";

export const middleware = async (request: NextRequest) => {
  try {
    if (
      request.nextUrl.pathname.startsWith("/sign-in") &&
      request.nextUrl.pathname.startsWith("/sign-up") &&
      request.nextUrl.pathname.startsWith("/user-information") && 
      request.nextUrl.pathname.startsWith("/sub-user")
    ) {
      return
    }
    const currentToken = await getCookies("token");
    if (currentToken && !request.nextUrl.pathname.startsWith("/")) {
      return Response.redirect(new URL("/", request.url));
    }
  } catch (error) {
    return Response.redirect(new URL("/sign-in", request.url));
  }
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
