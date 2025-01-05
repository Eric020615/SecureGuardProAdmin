'use server'

import { NextResponse, type NextRequest } from 'next/server'
import { getCookies } from '@libs/cookies'
import { checkJwtAuthAction } from '@store/auth/useAuth'
import { RoleEnum } from '@config/constant/user'

const roleBasedAllowed = {
    '/visitor/check-in': ['STF'], // Check-In restricted for SYSTEM_ADMIN
    '/facility': ['SA'], // Facility Management restricted for STAFF
    '/notice': ['SA'], // Notices Management restricted for STAFF
    '/user': ['SA'], // User Management restricted for STAFF
    '/visitor': ['SA'], // Visitor Management restricted for STAFF
    '/profile': ['SA', 'STF'], // No restrictions (accessible by both SA and STF)
}

export const middleware = async (request: NextRequest) => {
    try {
        const path = request.nextUrl.pathname
        if (
            path.startsWith('/403') ||
            path.startsWith('/sign-in') ||
            path.startsWith('/sign-up') ||
            path.startsWith('/reset-password') ||
            path.startsWith('/user-information') ||
            path.startsWith('/sub-user') ||
            path.startsWith('/visitor/access-pass')
        ) {
            return NextResponse.next()
        }
        const currentToken = await getCookies('token')
        const response = await checkJwtAuthAction(currentToken as string, true)
        if (!response.success) {
            throw new Error('Unauthorized')
        }
        if (
            response.data.role !== RoleEnum.SYSTEM_ADMIN &&
            response.data.role !== RoleEnum.STAFF
        ) {
            throw new Error('Invalid Role')
        }
        // when staff direct to dashboard direct to check-in page
        if (path === '/' && response.data.role === RoleEnum.STAFF) {
            return NextResponse.rewrite(new URL('/visitor/check-in', request.url))
        }
        // Check if the user's role is allowed for the current path
        for (const [allowedPath, allowedRoles] of Object.entries(roleBasedAllowed)) {
            if (path === "visitor/check-in" && response.data.role === RoleEnum.SYSTEM_ADMIN) {
                return NextResponse.rewrite(new URL('/403', request.url)) // Redirect to 403 page
            }
            if ( 
                path !== "/visitor/check-in" &&
                path.startsWith(allowedPath) && // Check for exact match
                !allowedRoles.includes(response.data.role)
            ) {
                return NextResponse.rewrite(new URL('/403', request.url)) // Redirect to 403 page
            }
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
        const redirectResponse = NextResponse.rewrite(new URL('/sign-in', request.url))
        redirectResponse.cookies.delete('token') // Clear the token cookie
        return redirectResponse
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
