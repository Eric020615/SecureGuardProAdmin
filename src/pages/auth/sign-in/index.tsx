'use client'
import AuthForm from '@components/form/AuthForm'
import React from 'react'

const SignInPage = () => {
    return (
        <section className="flex justify-center size-full max-sm:px-6">
            <AuthForm type="sign-in" />
        </section>
    )
}

export default SignInPage
