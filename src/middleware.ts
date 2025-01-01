"use server"

import { NextResponse, type NextRequest } from 'next/server'
import { getCookies } from '@libs/cookies'
import { checkJwtAuthAction } from '@store/auth/useAuth'
import { RoleEnum } from '@config/constant/user'

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
