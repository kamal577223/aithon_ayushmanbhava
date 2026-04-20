import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Role-based route access control
const roleRouteMap: Record<string, string[]> = {
  Patient: ["/patient"],
  Doctor: ["/doctor"],
  Admin: ["/admin"],
};

const publicRoutes = ["/", "/login"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const pathname = request.nextUrl.pathname;

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Check if user is accessing a role-protected endpoint
  const allowedRoutes = roleRouteMap[userRole as string] || [];
  const isAccessingRoleRoute = Object.values(roleRouteMap)
    .flat()
    .some((route) => pathname.startsWith(route));

  if (isAccessingRoleRoute) {
    const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));
    if (!isAllowed) {
      console.warn(`User with role ${userRole} attempted to access ${pathname}`);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
