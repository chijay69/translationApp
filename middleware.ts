import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default withAuth(
  function middleware(req) {
    // If the user is authenticated and trying to access auth pages, redirect to /voice
    if (req.nextUrl.pathname.startsWith('/auth/')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // If trying to access signup through callback URL, redirect directly to signup
  if (path === '/auth/signin' && request.nextUrl.searchParams.get('callbackUrl')?.includes('/auth/signup')) {
    return NextResponse.redirect(new URL('/auth/signup', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Protect all routes under /voice and /profile
  // But exclude auth routes from middleware
  matcher: [
    '/voice/:path*',
    '/profile/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/auth/:path*',
  ],
}; 