'use client'

import { Button } from '@components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@components/ui/input'
import { useRouter } from 'nextjs-toploader/app';
import React from 'react'
import { useNotice } from '@store/notice/useNotice'
import { ITimeFormat } from '@config/constant'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { convertDateStringToFormattedString } from '@lib/time'

const formSchema = z
    .object({
        title: z.string().min(1, {
            message: 'Notice title is required',
        }),
        description: z.string().min(1, {
            message: 'Notice description is required',
        }),
        startDate: z.string().min(1, {
            message: 'Start Date is required',
        }),
        endDate: z.string().min(1, {
            message: 'End Date is required',
        }),
    })
    .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
        message: 'End Date cannot be before Start Date',
        path: ['endDate'], // Path to the field that will receive the error message
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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await createNoticeAction({
            title: values.title,
            description: values.description,
            startDate: convertDateStringToFormattedString(
                values.startDate,
                ITimeFormat.dateTime
            ),
            endDate: convertDateStringToFormattedString(
                values.endDate,
                ITimeFormat.dateTime
            ),
        })
    }

    return (
        <>
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    router.push('/notice')
                }}
            />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Create new notice</h3>
            </div>
            <div className="mt-5">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="description"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Date</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="endDate"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Date</FormLabel>
                                    <FormControl>
                                        <Input type="datetime-local" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </>
    )
}

export default CreateNoticePage
