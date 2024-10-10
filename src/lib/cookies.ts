"use server"

import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import { checkAuth } from "@api/authService/authService"

const MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const ALGORITHM = 'HS256'
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SIGNATURE)
const encrypt = async (data : any) => {
    const payload = await new SignJWT(data)
    .setProtectedHeader({alg:ALGORITHM})
    .setIssuedAt()
    .setExpirationTime('1 day from now')
    .sign(JWT_SECRET)

    return payload
}

const decrypt = async (data : any) => {
    const payload = (await jwtVerify(data, JWT_SECRET, {algorithms:[ALGORITHM]})).payload
    return payload;
}

export const setCookies = async (name: string, data: any) => {
    cookies().set(name, data, {
        httpOnly: true,
        maxAge: MAX_AGE,
        secure: false,
        sameSite: 'strict'
    })
}

export const getCookies = async (name: string) => {
    // const { setIsLoading } = useApplication()
    try {
        // setIsLoading(true)
        const cookieValue = cookies().get(name)?.value
        if(!cookieValue){
            return null; 
        }
        const response = await checkAuth(cookieValue)
        if(!response.success){
            throw new Error("Unauthorized")
        }
        return cookieValue
    } catch (error) {
        console.log(error)
    } finally {
        // setIsLoading(false)
    }
}
