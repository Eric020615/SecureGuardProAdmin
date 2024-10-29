'use client'
import React from 'react'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { useNotice } from '@store/notice/useNotice'
import CustomForm from '@components/form/element/CustomForm'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

// Define the validation schema for the form
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
    const handleSubmit = async (data: any) => {
        await createNoticeAction({
            title: data.title,
            description: data.description,
            startDate: data.startDate,
            endDate: data.endDate,
        })
    }

    return (
        <div>
            <ActionConfirmationDialog onSuccessConfirm={() => {
                router.push('/notice')
            }}/>
            <h3 className="text-3xl font-bold text-black">Create New Notice</h3>
            <div className="mt-5">
                <CustomForm
                    form={form}
                    fields={{
                        title: { type: 'text', label: 'Title' },
                        description: { type: 'text', label: 'Description' },
                        startDate: { type: 'datetime', label: 'Start Date' },
                        endDate: { type: 'datetime', label: 'End Date' },
                    }}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    )
}

export default CreateNoticePage
