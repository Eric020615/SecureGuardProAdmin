import React, { Dispatch, SetStateAction } from 'react'
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
import { useFacility } from '@zustand/facility/useFacility'

interface CancelBookingDialogProps {
    bookingGuid: string
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const formSchema = z.object({
    cancelRemark: z.string().min(1, {
        message: 'Cancel Remark is required',
    }),
})

const CancelBookingDialog = ({
    bookingGuid,
    open,
    setOpen,
}: CancelBookingDialogProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            cancelRemark: '',
        },
    })
    const cancelBooking = useFacility((state) => state.cancelBookingAction)
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await cancelBooking({
            bookingGuid: bookingGuid,
            cancelRemark: values.cancelRemark,
        })
        if (response.success) {
            window.location.reload()
        }
    }

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
                                name="cancelRemark"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">
                                                Cancel Remark
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="text"
                                                    placeholder="Write somethings..."
                                                    {...field}
                                                    className="col-span-3"
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage className="text-center" />
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

export default CancelBookingDialog
