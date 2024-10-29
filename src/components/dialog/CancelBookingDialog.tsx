import React, { Dispatch, SetStateAction } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useFacility } from '@store/facility/useFacility'
import CustomForm, { CustomField } from '@components/form/element/CustomForm'

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
    const fields: Record<string, CustomField> = {
        cancelRemark: {
            type: 'text',
            label: 'Cancel Remark',
        },
    }
    const cancelBooking = useFacility((state) => state.cancelBookingAction)
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
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
                    <CustomForm form={form} fields={fields} onSubmit={handleSubmit} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CancelBookingDialog
