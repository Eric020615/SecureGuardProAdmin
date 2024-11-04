'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui/accordion'
import { useNotice } from '@store/notice/useNotice'
import { ArrowLeft, Download } from 'lucide-react'
import { Button } from '@components/ui/button'
import { Badge } from '@components/ui/badge'
import {
    convertDateStringToDate,
    convertDateStringToFormattedString,
    getCurrentDate,
} from '@lib/time'
import { DocumentStatus, ITimeFormat } from '@config/constant'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import CustomForm, { CustomField } from '@components/form/element/CustomForm'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { DeleteNoticeDto } from '@dtos/notice/notice.dto'
import { getGeneralFileDto } from '@lib/file'

const formSchema = z
    .object({
        title: z.string().min(1, { message: 'Notice title is required' }),
        description: z.string().min(1, { message: 'Notice description is required' }),
        startDate: z.string().min(1, { message: 'Start Date is required' }),
        endDate: z.string().min(1, { message: 'End Date is required' }),
        attachments: z.array(z.any()),
    })
    .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
        message: 'End Date cannot be before Start Date',
        path: ['endDate'],
    })

const NoticeDetailsPage = () => {
    const params = useParams<{ noticeGuid: string }>()
    const router = useRouter()
    const {
        noticeDetails,
        getNoticeDetailsByIdAction,
        updateNoticeByIdAction,
        deleteNoticeByIdAction,
        deleteAttachmentAction,
    } = useNotice()
    const [pageMode, setPageMode] = useState<'edit' | 'view'>('view')

    // Fetch Notice Details
    const getNoticeDetailsById = async () => {
        await getNoticeDetailsByIdAction(params.noticeGuid)
    }

    useEffect(() => {
        getNoticeDetailsById()
    }, [pageMode])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            attachments: [],
        },
    })

    const deleteAttachment = (attachmentGuid: string) => {
        deleteAttachmentAction(attachmentGuid)
    }

    const [fields, setFields] = useState<Record<string, CustomField>>({
        title: { type: 'text', label: 'Title' },
        description: { type: 'text', label: 'Description' },
        startDate: { type: 'datetime', label: 'Start Date' },
        endDate: { type: 'datetime', label: 'End Date' },
        attachments: {
            type: 'file',
            label: 'Attachments',
            handleDeleteFile: deleteAttachment,
        },
    })

    useEffect(() => {
        form.setValue('title', noticeDetails?.title ? noticeDetails.title : '')
        form.setValue(
            'description',
            noticeDetails?.description ? noticeDetails?.description : ''
        )
        form.setValue(
            'startDate',
            noticeDetails?.startDate
                ? convertDateStringToFormattedString(
                      noticeDetails.startDate,
                      ITimeFormat.dateTime
                  )
                : ''
        )
        form.setValue(
            'endDate',
            noticeDetails?.endDate
                ? convertDateStringToFormattedString(
                      noticeDetails.endDate,
                      ITimeFormat.dateTime
                  )
                : ''
        )
        setFields((prevFields) => ({
            ...prevFields,
            attachments: {
                ...prevFields.attachments,
                uploadedFiles: noticeDetails.attachments || [], // Update with received attachments
            },
        }))
        console.log(noticeDetails)
    }, [noticeDetails && pageMode === 'edit'])

    useEffect(() => {
        if (pageMode === 'edit') {
            setFields((prevFields) => ({
                ...prevFields,
                attachments: {
                    ...prevFields.attachments,
                    uploadedFiles: noticeDetails.attachments || [], // Update with received attachments
                },
            }))
        }
    }, [noticeDetails.attachments])

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        await updateNoticeByIdAction(
            {
                title: values.title,
                description: values.description,
                startDate: values.startDate,
                endDate: values.endDate,
                newAttachments:
                    values.attachments.length > 0
                        ? await Promise.all(
                              values.attachments.map(async (file) => {
                                  const generalFile = await getGeneralFileDto(file)
                                  return generalFile
                              })
                          )
                        : [],
            },
            params.noticeGuid
        )
    }

    const deleteNoticeById = async () => {
        await deleteNoticeByIdAction(params.noticeGuid)
    }

    return (
        <div>
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    setPageMode('view')
                }}
            />
            {/* <CustomConfirmDialog
                onConfirm={isConfirm}
                content={{
                    title: 'Delete Notice',
                    subtitle: 'Are you sure you want to delete this notice?',
                }}
                isOpen={openConfirmModal}
                setOpen={setOpenConfirmModal}
            /> */}
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
                    {pageMode === 'edit' ? (
                        <Button
                            type="button"
                            className="flex-1 bg-primary"
                            onClick={() => {
                                setPageMode('view')
                            }}
                        >
                            View
                        </Button>
                    ) : (
                        <>
                            <Button
                                type="button"
                                className="flex-1 bg-primary"
                                onClick={() => {
                                    setPageMode('edit')
                                }}
                            >
                                Edit
                            </Button>
                            <Button
                                type="button"
                                className="flex-1 bg-red-800"
                                onClick={deleteNoticeById}
                            >
                                Delete
                            </Button>
                        </>
                    )}
                </div>
            </div>
            <div className="bg-white w-full h-full flex-col p-8 mt-5 rounded-md">
                {pageMode === 'edit' ? (
                    <CustomForm form={form} fields={fields} onSubmit={handleSubmit} />
                ) : (
                    <Accordion
                        className="w-full"
                        type="multiple"
                        defaultValue={['Notice Information', 'Notice Attachments']}
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
                                        <span className="text-sm font-semibold">
                                            Title:
                                        </span>
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
                                            Status:
                                        </span>
                                        <span>
                                            <Badge
                                                className={`w-[80px] ${
                                                    noticeDetails.status ===
                                                    DocumentStatus.SoftDeleted
                                                        ? 'bg-orange-500'
                                                        : noticeDetails.status ===
                                                            DocumentStatus.Active
                                                          ? 'bg-green-500'
                                                          : 'bg-gray-500' // Default color for other statuses
                                                } flex justify-center`}
                                            >
                                                <span>{noticeDetails.status}</span>
                                            </Badge>
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
                        <AccordionItem value="Notice Attachments">
                            <AccordionTrigger className="py-2 px-4 bg-slate-100">
                                <h2>Notice Attachments</h2>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-slate-50">
                                {noticeDetails?.attachments &&
                                noticeDetails.attachments.length > 0 ? (
                                    <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                        {noticeDetails.attachments.map(
                                            (attachment, index) => (
                                                <div
                                                    key={index}
                                                    className="flex flex-col gap-1 border-b pb-3"
                                                >
                                                    <span className="font-semibold">
                                                        File Name:
                                                    </span>
                                                    <a
                                                        href={attachment.fileUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 underline"
                                                    >
                                                        {attachment.fileName}
                                                    </a>
                                                    <span className="font-semibold">
                                                        Content Type:
                                                    </span>
                                                    <span>{attachment.contentType}</span>
                                                    {attachment.size && (
                                                        <>
                                                            <span className="font-semibold">
                                                                Size:
                                                            </span>
                                                            <span>
                                                                {attachment.size} KB
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">
                                        No attachments available.
                                    </p>
                                )}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                )}
            </div>
        </div>
    )
}

export default NoticeDetailsPage
