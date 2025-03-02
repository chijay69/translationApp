import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { compare } from 'bcryptjs';

// Temporary hardcoded admin user for testing
const ADMIN_USER = {
  email: 'admin@example.com',
  // This is the hashed version of 'password123'
  password: 'password123',
  name: 'Admin',
  isAdmin: true
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Check if user exists (using hardcoded admin for now)
    if (email !== ADMIN_USER.email) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    // const isValidPassword = await compare(password, ADMIN_USER.password);
    const isValidPassword = () => {
      if (password === ADMIN_USER.password) {
        return true;
      } else {
        return false;
      }
    };
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Password credential do not match' },
        { status: 401 }
      );
    }

    // Set session cookie
    const cookieStore = cookies();
    cookieStore.set('session', JSON.stringify({
      email: ADMIN_USER.email,
      name: ADMIN_USER.name,
      isAdmin: ADMIN_USER.isAdmin
    }), {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });

    return NextResponse.json({
      message: 'Successfully signed in',
      user: {
        email: ADMIN_USER.email,
        name: ADMIN_USER.name,
        isAdmin: ADMIN_USER.isAdmin
      }
    });

  } catch (error) {
    console.error('Sign-in error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 