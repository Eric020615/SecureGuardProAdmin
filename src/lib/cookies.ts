'use server'

import { cookies } from 'next/headers'
import { checkAuth } from '@api/authService/authService'

const MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export const setCookies = async (name: string, data: any) => {
    cookies().set(name, data, {
        httpOnly: true,
        maxAge: MAX_AGE,
        secure: false,
        sameSite: 'strict',
        path: '/',
    })
}

export const getCookies = async (name: string) => {
    try {
        const cookieValue = cookies().get(name)?.value
        if (!cookieValue) {
            return null
        }
        const response = await checkAuth(cookieValue, true)
        if (!response.success) {
            throw new Error('Unauthorized')
        }
        return cookieValue
    } catch (error) {
        throw new Error('Unauthorized')
    }
}

export const deleteCookies = (name: string) => {
    cookies().delete(name)
}
