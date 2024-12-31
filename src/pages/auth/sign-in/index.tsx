'use client'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { useRouter } from 'nextjs-toploader/app'
import SignInForm from '@components/form/auth/SignInForm'
import Link from 'next/link'
import React from 'react'

const SignInPage = () => {
    const router = useRouter()
    return (
        <section className="flex flex-col items-center md:w-[40%] w-[80%]">
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    router.push('/')
                }}
            />
            <SignInForm />
            <div className="flex gap-2 mt-3">
                <p>Don't have an account?</p>
                <Link href="/sign-up" className="text-primary font-bold">
                    Register now
                </Link>
            </div>
        </section>
    )
}

export default SignInPage
