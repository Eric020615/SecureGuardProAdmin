'use client'

import ResetPasswordForm from '@components/form/auth/ResetPasswordForm'
import React from 'react'

const ResetPasswordPage = () => {
    return (
        <section className="flex flex-col items-center md:w-[40%] w-[80%]">
            <ResetPasswordForm />
        </section>
    )
}

export default ResetPasswordPage
