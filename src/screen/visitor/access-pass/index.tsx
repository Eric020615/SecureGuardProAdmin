'use client'

import { ITimeFormat } from '@config/constant'
import { convertDateStringToFormattedString } from '@lib/time'
import { useVisitor } from '@store/visitor/useVisitor'
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'

const VisitorPassDetailsPage = () => {
    const { visitorPassDetails, getVisitorPassDetailsAction } = useVisitor()
    const tokenParams = useSearchParams()
    const token = tokenParams.get('token')

    const getVisitorPassDetails = async () => {
        await getVisitorPassDetailsAction(token as string)
    }

    useEffect(() => {
        getVisitorPassDetails()
    }, [token])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Visitor Access Pass</h1>

            {/* Visitor Details */}
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <p className="text-lg font-medium text-gray-700 mb-2">
                    <span className="font-bold">Name:</span>{' '}
                    {visitorPassDetails.visitorName}
                </p>
                <p className="text-lg font-medium text-gray-700 mb-2">
                    <span className="font-bold">Date:</span>{' '}
                    {convertDateStringToFormattedString(
                        visitorPassDetails.visitDateTime,
                        ITimeFormat.date
                    )}
                </p>
                <p className="text-lg font-medium text-gray-700">
                    <span className="font-bold">Time:</span>{' '}
                    {convertDateStringToFormattedString(
                        visitorPassDetails.visitDateTime,
                        ITimeFormat.time
                    )}
                </p>
            </div>

            {visitorPassDetails.qrCode && (
                <div className="mt-8 bg-white p-6 shadow-md rounded-lg">
                    <img
                        src={`data:image/png;base64,${visitorPassDetails.qrCode.data}`}
                        alt="QR Code"
                    />
                    <p className="mt-4 text-sm text-gray-500">
                        Scan this QR code for entry
                    </p>
                </div>
            )}
        </div>
    )
}

export default VisitorPassDetailsPage
