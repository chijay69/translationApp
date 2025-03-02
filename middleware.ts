import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getAdminCredentials } from './app/utils/edge-config';

// Handle admin access and callback URL redirections
async function handleAdminAndCallbacks(request: NextRequest) {
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

  return null;
}

export default withAuth(
  async function middleware(request: NextRequest) {
    // First check admin and callback handling
    const specialResponse = await handleAdminAndCallbacks(request);
    if (specialResponse) return specialResponse;

    const adminCookie = request.cookies.get('admin_access');
    const admin = await getAdminCredentials();
    const isAdmin = adminCookie?.value === admin?.email;

    // If user is admin, allow access
    if (isAdmin) {
      return NextResponse.next();
    }

    // For non-admin users, rely on NextAuth's built-in protection
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // For protected routes, require token
        return !!token;
      }
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

export const config = {
  matcher: [
    // Only protect specific routes
    '/voice/:path*',
    '/profile/:path*'
  ]
}; 