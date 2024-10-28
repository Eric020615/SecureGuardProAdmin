import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Button } from '@components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@components/ui/input'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@components/ui/form'
import { useNotice } from '@store/notice/useNotice'
import { ITimeFormat } from '@config/constant'
import {
    convertDateStringToFormattedString,
} from '@lib/time'

interface EditNoticeDialogProps {
    noticeGuid: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({
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

const EditNoticeDialog = ({ noticeGuid, open, setOpen }: EditNoticeDialogProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
        },
    })
    const { noticeDetails, getNoticeDetailsByIdAction, updateNoticeByIdAction } = useNotice()
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await updateNoticeByIdAction({
            noticeGuid: noticeGuid,
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
        if (response.success) {
            window.location.reload()
        }
    }

    useEffect(() => {
        if (noticeGuid != '') {
            getNotice(noticeGuid)
        }
    }, [noticeGuid])

    const getNotice = async (noticeGuid: string) => {
        await getNoticeDetailsByIdAction(noticeGuid)
    }

    useEffect(() => {
        form.setValue('title', noticeDetails.title ? noticeDetails.title : '')
        form.setValue('description', noticeDetails.description ? noticeDetails.description : '')
        form.setValue(
            'startDate',
            noticeDetails.startDate
                ? convertDateStringToFormattedString(
                      noticeDetails.startDate,
                      ITimeFormat.dateTime
                  )
                : ''
        )
        form.setValue(
            'endDate',
            noticeDetails.endDate
                ? convertDateStringToFormattedString(noticeDetails.endDate, ITimeFormat.dateTime)
                : ''
        )
    }, [noticeDetails])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cancel Booking</DialogTitle>
                    <DialogDescription>Write down the cancel remarks</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
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
                            <DialogFooter>
                                <Button type="submit">Submit</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default EditNoticeDialog
