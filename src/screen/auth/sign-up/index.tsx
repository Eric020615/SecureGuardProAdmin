'use client'

import SignUpForm from '@components/form/auth/SignUpForm'
import Link from 'next/link'
import React from 'react'

const SignUpPage = () => {
    return (
        <section className="flex flex-col items-center md:w-[40%] w-[80%]">
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
