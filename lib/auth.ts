// Clerk/NextAuth integration instructions and helper functions
import { auth } from '@clerk/nextjs/server'

/**
 * Get the current authenticated user using Clerk
 * Usage in Server Components and Server Actions:
 * const { userId } = await getCurrentUser()
 */
export async function getCurrentUser() {
  return await auth()
}

/**
 * Check if user is authenticated
 * Returns true if user is logged in, false otherwise
 */
export async function isAuthenticated(): Promise<boolean> {
  const { userId } = await auth()
  return !!userId
}

/**
 * Require authentication - throws error if not authenticated
 * Use this in protected routes/API endpoints
 */
export async function requireAuth() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized - Please sign in')
  }
  return userId
}

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Clerk Setup (Recommended):
 *    - Sign up at https://clerk.com
 *    - Create a new application
 *    - Add these env variables to .env.local:
 *      NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
 *      CLERK_SECRET_KEY=sk_test_...
 *    - Wrap your app with ClerkProvider in app/layout.tsx
 *    - Use <SignInButton>, <UserButton> components
 * 
 * 2. NextAuth Setup (Alternative):
 *    - Install: npm install next-auth
 *    - Create app/api/auth/[...nextauth]/route.ts
 *    - Configure providers (Google, GitHub, etc.)
 *    - Add NEXTAUTH_SECRET and NEXTAUTH_URL to .env.local
 *    - Use getServerSession() for auth checks
 * 
 * 3. Protected Routes:
 *    - Use middleware.ts to protect routes
 *    - Or use requireAuth() in page components
 */

// Example middleware.ts content for Clerk:
/*
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
*/

