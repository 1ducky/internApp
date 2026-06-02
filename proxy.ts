import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/settings(.*)",
  "/profile(.*)",
  "/api/private(.*)",
]);



export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname
  
  if (pathname.startsWith("/api/uploadthing")) {
    return NextResponse.next()
  }
  if (isProtectedRoute(req)) {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.redirect(
        new URL("/sign-in", req.url)
      );
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};