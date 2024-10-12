'use client'

import SubUserRegistrationForm from '@components/form/auth/SubUserRegistrationForm'
import { useAuth } from '@store/auth/useAuth'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const SubUserRegistrationPage = () => {
    const searchParams = useSearchParams()
    const { checkSubUserAuthAction, subUserPayload } = useAuth()

    const token = searchParams.get('token')
    useEffect(() => {
        if (token) {
            fetchSubUserAuthPayload()
        }
    }, [token])

    const fetchSubUserAuthPayload = async () => {
        await checkSubUserAuthAction(token as string)
    }
    
    return (
        <section className="flex flex-col items-center md:w-[40%] w-[80%]">
            <SubUserRegistrationForm email={subUserPayload.subUserEmail} />
        </section>
    )
}

export default SubUserRegistrationPage
