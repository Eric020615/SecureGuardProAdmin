'use client'

import AuthForm from '@components/form/AuthForm'
import React from 'react'

const SignUpPage = () => {
  return (
    <section className='flex justify-center size-full max-sm:px-6'>
        <AuthForm type="sign-up"/>
    </section>
  )
}

export default SignUpPage