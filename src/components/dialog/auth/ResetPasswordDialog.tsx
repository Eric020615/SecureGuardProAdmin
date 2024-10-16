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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@components/ui/form'
import { useAuth } from '@store/auth/useAuth'
import CustomInput from '@components/form/element/Input'

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
    .refine((data) => data.newPassword != data.currentPassword, {
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
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">
                                                Current Password
                                            </FormLabel>
                                            <FormControl>
                                                <CustomInput
                                                    type=""
                                                    placeholder="Enter your current password"
                                                    containerStyle="col-span-3"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <FormLabel className="text-right">
                                                New Password
                                            </FormLabel>
                                            <FormControl>
                                                <CustomInput
                                                    type=""
                                                    placeholder="Enter your new password"
                                                    containerStyle="col-span-3"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit">Reset Password</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ResetPasswordDialog
