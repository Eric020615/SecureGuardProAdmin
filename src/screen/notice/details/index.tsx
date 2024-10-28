'use client'

import React, { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui/accordion'
import { useNotice } from '@store/notice/useNotice'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import {
    convertDateStringToDate,
    convertDateStringToFormattedString,
    getCurrentDate,
} from '@lib/time'
import { ITimeFormat } from '@config/constant'

const NoticeDetailsPage = () => {
    const params = useParams<{ noticeGuid: string }>()
    const router = useRouter()
    const { noticeDetails, getNoticeDetailsByIdAction } = useNotice()

    // Fetch Notice Details
    const getNoticeDetailsById = async () => {
        await getNoticeDetailsByIdAction(params.noticeGuid)
    }

    useEffect(() => {
        getNoticeDetailsById()
    }, [])

    return (
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Button
                        className="bg-transparent text-primary p-0 focus:outline-none active:bg-primary hover:bg-primary/20"
                        onClick={() => router.push('/notice')}
                    >
                        <ArrowLeft size={30} />
                    </Button>
                    <h1 className="text-3xl font-bold">Notice Details</h1>
                </div>
                <div className="flex items-center gap-3 w-auto">
                    <Button
                        type="button"
                        className="flex-1 bg-primary"
                        onClick={() => {}}
                    >
                        Edit
                    </Button>
                    <Button
                        type="button"
                        className="flex-1 bg-red-800"
                        onClick={() => {}}
                    >
                        Delete
                    </Button>
                </div>
            </div>
            <div className="bg-white w-full h-full flex-col p-8 mt-5 rounded-md">
                <Accordion
                    className="w-full"
                    type="multiple"
                    defaultValue={['Notice Information']}
                >
                    <AccordionItem value="Notice Information">
                        <AccordionTrigger className="py-2 px-4 bg-slate-100">
                            <h2>Notice Information</h2>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-slate-50">
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Notice ID:
                                    </span>
                                    <span className="text-sm">
                                        {noticeDetails?.noticeId ?? 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">Title:</span>
                                    <span className="text-sm">
                                        {noticeDetails?.title ?? 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Description:
                                    </span>
                                    <span className="text-sm">
                                        {noticeDetails?.description ?? 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Notice Status:
                                    </span>
                                    <span className="text-sm">
                                        {noticeDetails?.endDate &&
                                        convertDateStringToDate(noticeDetails.endDate) <
                                            getCurrentDate() ? (
                                            <Badge className="w-[80px] bg-gray-500 flex justify-center text-white">
                                                Expired
                                            </Badge>
                                        ) : (
                                            <Badge className="w-[80px] bg-green-500 flex justify-center text-white">
                                                Active
                                            </Badge>
                                        )}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Start Date:
                                    </span>
                                    <span className="text-sm">
                                        {convertDateStringToFormattedString(
                                            noticeDetails?.startDate,
                                            ITimeFormat.dateTime
                                        ) ?? 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        End Date:
                                    </span>
                                    <span className="text-sm">
                                        {convertDateStringToFormattedString(
                                            noticeDetails?.endDate,
                                            ITimeFormat.dateTime
                                        ) ?? 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Created By:
                                    </span>
                                    <span className="text-sm">
                                        {noticeDetails?.createdBy ?? 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Created Date:
                                    </span>
                                    <span className="text-sm">
                                        {convertDateStringToFormattedString(
                                            noticeDetails?.createdDateTime,
                                            ITimeFormat.dateTime
                                        ) ?? 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Updated By:
                                    </span>
                                    <span className="text-sm">
                                        {noticeDetails?.updatedBy ?? 'N/A'}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Updated Date:
                                    </span>
                                    <span className="text-sm">
                                        {convertDateStringToFormattedString(
                                            noticeDetails?.updatedDateTime,
                                            ITimeFormat.dateTime
                                        ) ?? 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default NoticeDetailsPage
