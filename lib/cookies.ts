"use server"

import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"

const MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const ALGORITHM = 'HS256'
const JWT_SECRET = new TextEncoder().encode('SECUREGUARDPRO')

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
    const encryptedData = await encrypt({data})
    cookies().set(name, encryptedData, {
        httpOnly: true,
        maxAge: MAX_AGE,
        secure: false,
        sameSite: 'strict'
    })
}

export const getCookies = async (name: string) => {
    const cookieValue = cookies().get(name)?.value
    if(!cookieValue){
        return null; 
    }
    const decryptedData = await decrypt(cookieValue)
    return decryptedData
}