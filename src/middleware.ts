import { NextResponse, type NextRequest } from 'next/server'
import { getCookies } from '@lib/cookies'
import { checkJwtAuthAction } from '@store/auth/useAuth'

export const roles = {
    SA: 'SA', // Super Admin
    STF: 'STF', // Staff
    RES: 'RES', // Resident
    SUB: 'SUB', // Sub User
} as const // Makes roles a readonly type with literal values

type Role = keyof typeof roles // 'SA' | 'STF' | 'RES' | 'SUB'

export const rolePermissions: Record<Role, string[]> = {
    SA: ['/', '/facility', '/notice', '/profile', '/user', '/visitor'], // SA can access all pages
    STF: ['/', '/visitor/check-in', '/profile'], // STF can only access pageC
    RES: [],
    SUB: [],
}

export const middleware = async (request: NextRequest) => {
    try {
        const path = request.nextUrl.pathname
        if (
            path.startsWith('/403') ||
            path.startsWith('/sign-in') ||
            path.startsWith('/sign-up') ||
            path.startsWith('/user-information') ||
            path.startsWith('/sub-user') ||
            path.startsWith('/visitor/access-pass')
        ) {
            return
        }
        const currentToken = await getCookies('token')
        const response = await checkJwtAuthAction(currentToken as string, true)
        if (!response.success) {
            throw new Error('Unauthorized')
        }
        const allowedRoutes = rolePermissions[response.data.role] || []
        // Check if the requested path is in the allowed routes
        if (!allowedRoutes.includes(path)) {
            return Response.redirect(new URL('/403', request.url))
        }
        // Set authTokenPayload as a cookie for client-side usage
        const newResponse = NextResponse.next()
        newResponse.cookies.set(
            'authTokenPayload',
            JSON.stringify(response.data), // Store the payload
            { path: '/', httpOnly: true } // Securely store it in HttpOnly cookie
        )
        return newResponse
    } catch (error) {
        return Response.redirect(new URL('/sign-in', request.url))
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
