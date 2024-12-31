'use client'

import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import SignUpForm from '@components/form/auth/SignUpForm'
import Link from 'next/link'
import { useRouter } from 'nextjs-toploader/app'
import React from 'react'

const SignUpPage = () => {
    const router = useRouter()
    return (
        <section className="flex flex-col items-center md:w-[40%] w-[80%]">
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    router.replace('/user-information')
                }}
            />
            <SignUpForm />
            <div className="flex gap-2 mt-3">
                <p>Already have an account?</p>
                <Link href="/sign-in" className="text-primary font-bold">
                    Sign in here!
                </Link>
            </div>
        </section>
    )
}

export default SignUpPage
