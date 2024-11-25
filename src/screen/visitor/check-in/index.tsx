'use client'

import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import VisitorCheckInDialog from '@components/dialog/VisitorCheckInDialog'
import { Button } from '@components/ui/button'
import React, { useState } from 'react'
import { RiAddBoxLine } from 'react-icons/ri'

const VisitorCheckInPage = () => {
    const [openCheckInDialog, setOpenCheckInDialog] = useState(false)

    return (
        <>
            <VisitorCheckInDialog
                open={openCheckInDialog}
                setOpen={setOpenCheckInDialog}
            />
            <ActionConfirmationDialog />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Visitor Check In</h3>
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        setOpenCheckInDialog(true)
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
