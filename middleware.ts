import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // PUBLIC ROUTES — NO AUTH CHECK
  if (
    pathname === "/" ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/updates") ||
    pathname.startsWith("/events") ||
    pathname.startsWith("/blogs") ||
    pathname.startsWith("/council")
  ) {
    return NextResponse.next()
  }

  // 🔒 PROTECTED ROUTES
  if (
    pathname.startsWith("/tools") ||
    pathname.startsWith("/queries") ||
    pathname.startsWith("/resources")
  ) {
    let res = NextResponse.next()

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get: (name) => req.cookies.get(name)?.value,
          set: (name, value, options) =>
            res.cookies.set({ name, value, ...options }),
          remove: (name, options) =>
            res.cookies.set({ name, value: "", ...options }),
        },
      }
    )

    return supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        const redirectUrl = req.nextUrl.clone()
        redirectUrl.pathname = "/signin"
        return NextResponse.redirect(redirectUrl)
      }

      return res
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}
