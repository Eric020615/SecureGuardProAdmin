'use server'

import { cookies } from 'next/headers'

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
    const cookieValue = cookies().get(name)?.value
    if (!cookieValue) {
        return null
    }
    return cookieValue
}

export const deleteCookies = (name: string) => {
    cookies().delete(name)
}
