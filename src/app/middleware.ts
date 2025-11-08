// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // This runs on every request, preventing static generation
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/Dashboard/:path*',
    '/Courses/:path*',
    '/Account/Profile/:path*',
  ],
};