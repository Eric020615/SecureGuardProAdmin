'use client'
import SignInForm from '@components/form/auth/SignInForm'
import Link from 'next/link'
import React from 'react'

const SignInPage = () => {
    return (
        <section className="flex flex-col items-center md:w-[40%] w-[80%]">
            <SignInForm />
            <div className='flex gap-2 mt-3'>
                <p>Don't have an account?</p>
                <Link href="/sign-up" className="text-primary font-bold">
                    Register now
                </Link>
            </div>
        </section>
    )
}

export default SignInPage
