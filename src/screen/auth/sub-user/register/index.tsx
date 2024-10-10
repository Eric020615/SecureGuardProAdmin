'use client'

import SubUserRegistrationForm from '@components/form/auth/SubUserRegistrationForm'
import { useAuth } from '@store/auth/useAuth'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const SubUserRegistrationPage = () => {
    const searchParams = useSearchParams()
    const checkSubUserAuth = useAuth((state) => state.checkSubUserAuthAction)

    const token = searchParams.get('token')
    useEffect(() => {}, [token])

    const fetchSubUserAuthPayload = async () => {
        const response = await checkSubUserAuth(token as string)
        if (response.success) {
            console.log(response.data)
        } else {
            console.log(response.msg)
        }
    }

    return (
        <section className="flex flex-col items-center md:w-[40%] w-[80%]">
            <SubUserRegistrationForm email={token as string} />
        </section>
    )
}

export default SubUserRegistrationPage
