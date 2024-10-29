'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui/accordion'
import { useFacility } from '@store/facility/useFacility'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import {
    convertDateStringToDate,
    convertDateStringToFormattedString,
    getCurrentDate,
} from '@lib/time'
import { DocumentStatus, ITimeFormat } from '@config/constant'
import CancelBookingDialog from '@components/dialog/CancelBookingDialog'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'

const FacilityBookingDetailsPage = () => {
    const params = useParams<{ facilityBookingGuid: string }>()
    const router = useRouter()
    const { facilityBookingDetails, getFacilityBookingDetailsAction } = useFacility()
    const [openCancelDialog, setOpenCancelDialog] = useState(false)

    // Fetch Booking Details
    const getBookingDetailsById = async () => {
        await getFacilityBookingDetailsAction(params.facilityBookingGuid)
    }

    useEffect(() => {
        getBookingDetailsById()
    }, [])

    return (
        <div>
            <CancelBookingDialog
                open={openCancelDialog}
                setOpen={setOpenCancelDialog}
                bookingGuid={params.facilityBookingGuid}
            />
            <ActionConfirmationDialog />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Button
                        className="bg-transparent text-primary p-0 focus:outline-none active:bg-primary hover:bg-primary/20"
                        onClick={() => router.push('/facility')}
                    >
                        <ArrowLeft size={30} />
                    </Button>
                    <h1 className="text-3xl font-bold">Facility Booking Details</h1>
                </div>
                <div>
                    <div>
                        {!facilityBookingDetails.isCancelled && (
                            <Button
                                type="submit"
                                className="w-full bg-red-800"
                                onClick={() => setOpenCancelDialog(true)}
                            >
                                Cancel Booking
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-white w-full h-full flex-col p-8 mt-5 rounded-md">
                <div>
                    <Accordion
                        className="w-full"
                        type="multiple"
                        defaultValue={['Facility Booking Information']}
                    >
                        <AccordionItem value="Facility Booking Information">
                            <AccordionTrigger className="py-2 px-4 bg-slate-100">
                                <h2>Booking Information</h2>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-slate-50">
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Facility:
                                        </span>
                                        <span className="text-sm">
                                            {facilityBookingDetails.facilityName}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Booking ID:
                                        </span>
                                        <span className="text-sm">
                                            {facilityBookingDetails.bookingId}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Facility Booking Status:
                                        </span>
                                        <span className="text-sm">
                                            {facilityBookingDetails.isCancelled ? (
                                                <Badge className="w-[80px] bg-red-500 flex justify-center text-white">
                                                    Cancelled
                                                </Badge>
                                            ) : facilityBookingDetails.startDate &&
                                              convertDateStringToDate(
                                                  facilityBookingDetails.startDate
                                              ) > getCurrentDate() ? (
                                                <Badge className="w-[80px] bg-gray-500 flex justify-center text-white">
                                                    Expired
                                                </Badge>
                                            ) : (
                                                <Badge className="w-[80px] bg-green-500 flex justify-center text-white">
                                                    Valid
                                                </Badge>
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Status:
                                        </span>
                                        <span>
                                            <Badge
                                                className={`w-[80px] ${
                                                    facilityBookingDetails.status ===
                                                    DocumentStatus.SoftDeleted
                                                        ? 'bg-orange-500'
                                                        : facilityBookingDetails.status ===
                                                            DocumentStatus.Active
                                                          ? 'bg-green-500'
                                                          : 'bg-gray-500' // Default color for other statuses
                                                } flex justify-center`}
                                            >
                                                <span>
                                                    {facilityBookingDetails.status}
                                                </span>
                                            </Badge>
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Start Date:
                                        </span>
                                        <span className="text-sm">
                                            {convertDateStringToFormattedString(
                                                facilityBookingDetails.startDate,
                                                ITimeFormat.dateTime
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            End Date:
                                        </span>
                                        <span className="text-sm">
                                            {convertDateStringToFormattedString(
                                                facilityBookingDetails.endDate,
                                                ITimeFormat.dateTime
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Number of Guests:
                                        </span>
                                        <span className="text-sm">
                                            {facilityBookingDetails.numOfGuest}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Booked By:
                                        </span>
                                        <span className="text-sm">
                                            {facilityBookingDetails.bookedBy}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Created By:
                                        </span>
                                        <span className="text-sm">
                                            {facilityBookingDetails.createdBy}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Created Date:
                                        </span>
                                        <span className="text-sm">
                                            {convertDateStringToFormattedString(
                                                facilityBookingDetails.createdDateTime,
                                                ITimeFormat.dateTime
                                            )}
                                        </span>
                                    </div>
                                    {facilityBookingDetails.isCancelled && (
                                        <div className="flex flex-col gap-1">
                                            <span className="text-sm font-semibold">
                                                Cancel Remark:
                                            </span>
                                            <span className="text-sm">
                                                {facilityBookingDetails.cancelRemark}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default FacilityBookingDetailsPage
