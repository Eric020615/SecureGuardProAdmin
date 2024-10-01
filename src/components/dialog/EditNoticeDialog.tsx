import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import { useNotice } from '@zustand/notice/useNotice'
import { EditNotice, GetNoticeDetailsById } from '@zustand/types'
import { useApplication } from '@zustand/index'

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
    const [notice, setNotice] = useState<GetNoticeDetailsById>({} as GetNoticeDetailsById)
    const [updateNotice, setUpdateNotice] = useState<EditNotice>({} as EditNotice)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
        },
    })
    const { getNoticeById, updateNoticeById } = useNotice()
    const { setIsLoading } = useApplication()
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            setUpdateNotice({
                noticeGuid: noticeGuid,
                title: values.title,
                description: values.description,
                startDate: values.startDate,
                endDate: values.endDate,
            })
            const response = await updateNoticeById(updateNotice)
            if (response.success) {
                window.location.reload()
            } else {
                console.log(response.msg)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (noticeGuid != '') {
            getNotice(noticeGuid)
        }
    }, [noticeGuid])

    const getNotice = async (noticeGuid: string) => {
        try {
            setIsLoading(true)
            const response = await getNoticeById(noticeGuid)
            console.log(response)
            setNotice(response.data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        form.setValue('title', notice.title ? notice.title : '')
        form.setValue('description', notice.description ? notice.description : '')
        form.setValue('startDate', notice.startDate ? notice.startDate : '')
        form.setValue('endDate', notice.endDate ? notice.endDate : '')
    }, [notice])

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
