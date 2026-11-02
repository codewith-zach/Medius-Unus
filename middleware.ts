import { NextRequest, NextResponse } from "next/server";

const LOCALES = ["en", "fr"];
const DEFAULT_LOCALE = "en";

/**
 * Locale routing: every page lives under /en or /fr. Requests without a
 * locale prefix are redirected based on (in order) the visitor's saved
 * `lang` cookie, their Accept-Language header, then the default locale.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return NextResponse.next();

  const cookie = req.cookies.get("lang")?.value;
  const accept = (req.headers.get("accept-language") ?? "").toLowerCase();
  const lang =
    LOCALES.includes(cookie ?? "")
      ? cookie
      : accept.startsWith("fr") || /,\s*fr/.test(accept)
        ? "fr"
        : DEFAULT_LOCALE;

  const url = req.nextUrl.clone();
  url.pathname = `/${lang}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
