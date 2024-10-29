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
import { useAuth } from '@store/auth/useAuth'
import CustomForm, { CustomField } from '@components/form/element/CustomForm'

interface ResetPasswordDialogProps {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

// Define schema for form validation
const formSchema = z
    .object({
        currentPassword: z.string(),
        newPassword: z.string().min(6, {
            message: 'Password must be at least 6 characters long',
        }),
    })
    .refine((data) => data.newPassword !== data.currentPassword, {
        message: 'New password cannot be the same as the current password',
        path: ['newPassword'],
    })

const ResetPasswordDialog = ({ open, setOpen }: ResetPasswordDialogProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            newPassword: '',
            currentPassword: '',
        },
    })
    const resetPasswordAction = useAuth((state) => state.resetPasswordAction)

    // Define the fields for the custom form
    const fields: Record<string, CustomField> = {
        currentPassword: {
            type: 'password',
            label: 'Current Password',
        },
        newPassword: {
            type: 'password',
            label: 'New Password',
        },
    }

    // Handle the form submission
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await resetPasswordAction({
            newPassword: values.newPassword,
            currentPassword: values.currentPassword,
        })
        setOpen(false)
        form.reset()
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                        Enter and confirm your new password
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <CustomForm form={form} fields={fields} onSubmit={onSubmit} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ResetPasswordDialog
