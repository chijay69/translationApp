import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

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

export const config = {
  // Protect all routes under /voice and /profile
  // But exclude auth routes from middleware
  matcher: [
    '/voice/:path*',
    '/profile/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 