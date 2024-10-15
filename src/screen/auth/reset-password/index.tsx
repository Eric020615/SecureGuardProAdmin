'use client'

import ResetPasswordForm from '@components/form/auth/ResetPasswordForm'
import Link from 'next/link'
import React, { useState } from 'react'

const ResetPasswordPage = () => {
    return (
        <section className="flex flex-col items-center md:w-[40%] w-[80%]">
            <ResetPasswordForm />
            <div className="flex gap-2 mt-3">
                <p>Don't have an account?</p>
                <Link href="/sign-in" className="text-primary font-bold">
                    Log In
                </Link>
            </div>
        </section>
    )
}

export default ResetPasswordPage
