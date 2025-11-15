import {withAuth} from "next-auth/middleware";
import {NextResponse} from "next/server";

export default withAuth(
 function middleware(req) {
  const token = req.nextauth.token;
  const isAuth = !!token;
  const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
  const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

  // Redirect jika user sudah login tapi mengakses auth pages
  if (isAuthPage && isAuth) {
   return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Redirect jika user belum login tapi mengakses dashboard
  if (isDashboardPage && !isAuth) {
   let from = req.nextUrl.pathname;
   if (req.nextUrl.search) {
    from += req.nextUrl.search;
   }

   return NextResponse.redirect(
    new URL(`/auth/login?from=${encodeURIComponent(from)}`, req.url)
   );
  }

  // Role-based access control (optional)
  if (isDashboardPage && token) {
   // Contoh: hanya admin yang bisa akses /dashboard/admin
   if (req.nextUrl.pathname.startsWith("/dashboard/admin")) {
    if (token.role !== "admin") {
     return NextResponse.redirect(new URL("/dashboard/unauthorized", req.url));
    }
   }
  }

  return NextResponse.next();
 },
 {
  callbacks: {
   authorized: ({token, req}) => {
    // Untuk auth pages, selalu izinkan akses
    if (req.nextUrl.pathname.startsWith("/auth")) {
     return true;
    }

    // Untuk dashboard pages, require auth
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
     return !!token;
    }

    return true;
   },
  },
 }
);

export const config = {
 matcher: ["/dashboard/:path*", "/auth/:path*"],
};
