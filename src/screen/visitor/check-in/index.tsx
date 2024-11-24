'use client'

import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { Button } from '@components/ui/button'
import { useRouter } from 'nextjs-toploader/app'
import React from 'react'
import { RiAddBoxLine } from 'react-icons/ri'

const VisitorCheckInPage = () => {
    const router = useRouter()
    return (
        <>
            <ActionConfirmationDialog />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Visitor Check In</h3>
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        router.push('/')
                    }}
                >
                    <RiAddBoxLine className="text-xl" />
                    <p className="flex items-center text-center">Create</p>
                </Button>
            </div>
        </>
    )
}

export default VisitorCheckInPage
