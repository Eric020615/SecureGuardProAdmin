'use client'

import React, { useState } from 'react'
import { RiAddBoxLine } from 'react-icons/ri'
import { FaUserCheck, FaClipboardList, FaRegCalendarAlt } from 'react-icons/fa'
import VisitorCheckInDialog from '@components/dialog/VisitorCheckInDialog'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { Button } from '@components/ui/button'

const VisitorCheckInPage = () => {
    const [openCheckInDialog, setOpenCheckInDialog] = useState(false)

    return (
        <>
            <VisitorCheckInDialog
                open={openCheckInDialog}
                setOpen={setOpenCheckInDialog}
            />
            <ActionConfirmationDialog />
            {/* Header */}
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

            {/* Main Decorative Section */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 shadow">
                    <FaUserCheck className="text-5xl text-blue-600" />
                    <h4 className="mt-4 text-lg font-semibold text-gray-800">
                        Visitor Registration
                    </h4>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 shadow">
                    <FaClipboardList className="text-5xl text-green-600" />
                    <h4 className="mt-4 text-lg font-semibold text-gray-800">
                        Records Management
                    </h4>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-100 rounded-lg p-8 shadow">
                    <FaRegCalendarAlt className="text-5xl text-yellow-600" />
                    <h4 className="mt-4 text-lg font-semibold text-gray-800">
                        Scheduling
                    </h4>
                </div>
            </div>
        </>
    )
}

export default VisitorCheckInPage
