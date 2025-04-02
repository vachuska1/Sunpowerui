import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// List of supported locales
const locales = ["en", "cs", "de"]

// Get the preferred locale from request headers
function getLocale(request: NextRequest) {
  // Check if there's a cookie with a preferred locale
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale
  }

  // Otherwise, use the Accept-Language header
  const acceptLanguage = request.headers.get("accept-language")
  if (acceptLanguage) {
    // Parse the Accept-Language header and find the best match
    const parsedLocales = acceptLanguage
      .split(",")
      .map((l) => {
        const [locale, priority] = l.split(";q=")
        return { locale: locale.trim().split("-")[0], priority: priority ? Number(priority) : 1 }
      })
      .sort((a, b) => b.priority - a.priority)

    // Find the first supported locale
    const matchedLocale = parsedLocales.find((l) => locales.includes(l.locale))
    if (matchedLocale) return matchedLocale.locale
  }

  // Default to English
  return "en"
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname already has a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  if (pathnameHasLocale) return

  // Redirect to the locale-prefixed path
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`

  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|api|_vercel|.*\\..*).*)",
  ],
}

