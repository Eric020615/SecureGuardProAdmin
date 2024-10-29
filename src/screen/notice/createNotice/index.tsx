'use client'
import React from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useNotice } from '@store/notice/useNotice'
import CustomForm, { CustomField } from '@components/form/element/CustomForm'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z
    .object({
        title: z.string().min(1, { message: 'Notice title is required' }),
        description: z.string().min(1, { message: 'Notice description is required' }),
        startDate: z.string().min(1, { message: 'Start Date is required' }),
        endDate: z.string().min(1, { message: 'End Date is required' }),
    })
    .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
        message: 'End Date cannot be before Start Date',
        path: ['endDate'],
    })

const CreateNoticePage = () => {
    const router = useRouter()
    const { createNoticeAction } = useNotice()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
        },
    })
    const fields: Record<string, CustomField> = {
        title: { type: 'text', label: 'Title' },
        description: { type: 'text', label: 'Description' },
        startDate: { type: 'datetime', label: 'Start Date' },
        endDate: { type: 'datetime', label: 'End Date' },
    }
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        await createNoticeAction({
            title: values.title,
            description: values.description,
            startDate: values.startDate,
            endDate: values.endDate,
        })
    }

    return (
        <div>
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    router.push('/notice')
                }}
            />
            <h3 className="text-3xl font-bold text-black">Create New Notice</h3>
            <div className="mt-5">
                <CustomForm form={form} fields={fields} onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default CreateNoticePage
