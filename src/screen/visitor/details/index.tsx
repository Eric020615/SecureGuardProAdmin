'use client'

import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui/accordion'
import { Button } from '@components/ui/button'
import { useVisitor } from '@store/visitor/useVisitor'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Avatar from 'react-avatar'

const VisitorDetailsPage = () => {
    const params = useParams<{ visitorId: string }>()
    const router = useRouter()
    const { visitorDetails, getVisitorDetailsByIdAction } = useVisitor()

    const getVisitorDetailsById = async () => {
        await getVisitorDetailsByIdAction(params.visitorId)
    }

    useEffect(() => {
        getVisitorDetailsById()
    }, [])

    return (
        <div>
            <ActionConfirmationDialog />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Button
                        className="bg-transparent text-primary p-0"
                        onClick={() => {
                            router.push('/visitor')
                        }}
                    >
                        <ArrowLeft size={30} />
                    </Button>
                    <h1 className="text-3xl font-bold">Visitor Details</h1>
                </div>
                <div>
                    <div></div>
                </div>
            </div>
            <div className="bg-white w-full h-full flex-col p-8 mt-5 rounded-md">
                {/* Visitor header */}
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2">
                        {visitorDetails.visitorName ? (
                            <Avatar
                                className="text-[32px]"
                                name={visitorDetails.visitorName}
                                round
                                size="110"
                                color="#7078C0"
                            />
                        ) : (
                            <Avatar
                                className="text-[32px]"
                                name=""
                                round
                                size="110"
                                color="#7078C0"
                            />
                        )}
                    </div>
                </div>
                <div className="mt-5">
                    <Accordion
                        type="multiple"
                        className="w-full"
                        defaultValue={[
                            'Personal Information',
                            'Visit Information',
                            'Supported Documents',
                        ]}
                    >
                        {/* Personal Information Accordion */}
                        <AccordionItem value="Personal Information">
                            <AccordionTrigger className="py-2 px-4 bg-slate-100">
                                <h2>Personal Information</h2>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-slate-50">
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Visitor Id:
                                        </span>
                                        <span className="text-sm">
                                            {visitorDetails.visitorId}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Status:
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Name:
                                        </span>
                                        <span className="text-sm">
                                            {visitorDetails.visitorName}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Contact Number:
                                        </span>
                                        <span className="text-sm">
                                            {visitorDetails.visitorContactNumber}
                                        </span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Visit Information Accordion */}
                        <AccordionItem value="Visit Information">
                            <AccordionTrigger className="py-2 px-4 bg-slate-100">
                                <h2>Visit Information</h2>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-slate-50">
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Visit Date:
                                        </span>
                                        <span className="text-sm">
                                            {visitorDetails.visitDateTime}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Visitor Category:
                                        </span>
                                        <span className="text-sm">
                                            {visitorDetails.visitorCategory}
                                        </span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* Supported Documents Accordion */}
                        <AccordionItem value="Supported Documents">
                            <AccordionTrigger className="py-2 px-4 bg-slate-100">
                                <h2>Supported Documents</h2>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-slate-50">
                                <div className="grid gap-1"></div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default VisitorDetailsPage
