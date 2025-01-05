'use client'

import React from 'react'
import { RiAddBoxLine } from 'react-icons/ri'
import { FaUserCheck, FaClipboardList, FaRegCalendarAlt } from 'react-icons/fa'

const VisitorCheckInPage = () => {
    return (
        <>
            {/* Header */}
            <div className="flex flex-row justify-between items-center border-b pb-4 border-gray-300">
                <h3 className="text-3xl font-bold text-gray-800">Visitor Check-In</h3>
                <div className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:shadow-lg">
                    <RiAddBoxLine className="text-xl" />
                    <span>Create</span>
                </div>
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
