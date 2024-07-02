import type { NextRequest } from "next/server";
import { getCookies } from "./lib/cookies";

export const middleware = async (request: NextRequest) => {
  try {
    const currentToken = await getCookies("token");

    if (currentToken && !request.nextUrl.pathname.startsWith("/")) {
      return Response.redirect(new URL("/", request.url));
    }

    if (
      !currentToken &&
      !request.nextUrl.pathname.startsWith("/sign-in") &&
      !request.nextUrl.pathname.startsWith("/sign-up")
    ) {
      return Response.redirect(new URL("/sign-in", request.url));
    }
  } catch (error) {
    return Response.redirect(new URL("/sign-in", request.url));
  }
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
