import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminCredentials } from './app/utils/edge-config';

export default withAuth(
  async function middleware(req) {
    // Check if it's the admin user
    const adminCookie = req.cookies.get('admin_access');
    const admin = await getAdminCredentials();
    const isAdmin = adminCookie?.value === admin?.email;

    // If the user is authenticated or is admin and trying to access auth pages, redirect to /voice
    if (req.nextUrl.pathname.startsWith('/auth/')) {
      return NextResponse.redirect(new URL('/voice', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async ({ token }) => {
        // Allow access if user has a valid token or is admin
        const admin = await getAdminCredentials();
        return !!token || token?.email === admin?.email;
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

// Handle admin access and callback URL redirections
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // If trying to access signup through callback URL, redirect directly to signup
  if (path === '/auth/signin' && request.nextUrl.searchParams.get('callbackUrl')?.includes('/auth/signup')) {
    return NextResponse.redirect(new URL('/auth/signup', request.url));
  }

  // Check for admin credentials in the URL (after successful admin login)
  if (path === '/voice' && request.nextUrl.searchParams.get('admin') === 'true') {
    const admin = await getAdminCredentials();
    if (admin) {
      const response = NextResponse.next();
      response.cookies.set('admin_access', admin.email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 24 hours
      });
      return response;
    }
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