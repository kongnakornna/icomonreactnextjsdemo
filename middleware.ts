import { NextResponse, type NextRequest } from 'next/server';

import { SESSION_COOKIE } from '@/config';

const PUBLIC_PATHS = ['/sign-in', '/sign-up', '/forgot-password'];

const ROUTE_PERMISSIONS: Record<string, string[]> = {
  '/dashboard': ['admin', 'user'],
  '/customers': ['admin', 'user'],
  '/quotations': ['admin', 'user'],
  '/purchase-orders': ['admin', 'user'],
  '/products': ['admin', 'user'],
  '/payments': ['admin', 'user'],
  '/documents': ['admin', 'user'],
  '/email': ['admin'],
  '/batch': ['admin'],
  '/iot': ['admin', 'user'],
  '/mqtt': ['admin'],
  '/wos': ['admin', 'user'],
  '/jobs': ['admin', 'user'],
  '/reports': ['admin', 'user'],
  '/monitoring': ['admin', 'user'],
  '/ai-analytics': ['admin'],
  '/ai-chatbot': ['admin', 'user'],
  '/settings': ['admin'],
  '/user': ['admin'],
};

function getRoutePermission(pathname: string): string[] | null {
  const sortedKeys = Object.keys(ROUTE_PERMISSIONS).sort((a, b) => b.length - a.length);
  for (const route of sortedKeys) {
    if (pathname.startsWith(route)) {
      return ROUTE_PERMISSIONS[route];
    }
  }
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const sessionId = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionId) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|i18n).*)',
  ],
};
