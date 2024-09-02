"use client";

import UserInformationForm from '@components/form/auth/UserInformationForm'
import React from 'react'

const UserInformationPage = () => {
  return (
    <section className="flex flex-col items-center md:w-[40%] w-[80%]">
        <UserInformationForm />
    </section>
  )
}

export default UserInformationPage