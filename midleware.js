import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth
    const { pathname } = req.nextUrl

    if (pathname.startsWith("/dashboard") && token && !token.isVerified) {
      const url = req.nextUrl.clone()
      url.pathname = "/auth/verify"
      url.searchParams.set("userId", token.sub)
      url.searchParams.set("method", "email")
      return Response.redirect(url)
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Allow access to auth pages without token
        if (pathname.startsWith("/auth/")) {
          return true
        }

        // Require token for dashboard routes
        if (pathname.startsWith("/dashboard")) {
          return !!token
        }

        // Allow access to other pages
        return true
      },
    },
  },
)

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
