'use client'

import SubUserInformationForm from '@components/form/auth/SubUserInformationForm'
import UserInformationForm from '@components/form/auth/UserInformationForm'
import { RoleEnum } from '@config/constant/user'
import { useAuth } from '@store/auth/useAuth'
import { useRouter } from 'nextjs-toploader/app';
import React, { useEffect } from 'react'

const UserInformationPage = () => {
    const router = useRouter()
    const { tempToken, authTokenPayload, checkJwtAuthAction } = useAuth()

    useEffect(() => {
        if (!tempToken) {
            router.replace('/sign-up')
        }
        getAuthTokenPayload()
    }, [tempToken])

    const getAuthTokenPayload = async () => {
        await checkJwtAuthAction(tempToken, false)
    }
  
    return (
        <section className="flex flex-col items-center md:w-[40%] w-[80%]">
            {authTokenPayload.role === RoleEnum.RESIDENT_SUBUSER ? (
                <SubUserInformationForm />
            ) : (
                <UserInformationForm />
            )}
        </section>
    )
}

export default UserInformationPage
