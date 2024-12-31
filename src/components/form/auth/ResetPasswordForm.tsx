import Link from 'next/link'
import React from 'react'
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
import { useAuth } from '@store/auth/useAuth'

const resetPasswordSchema = z.object({
    email: z.string().min(1, { message: 'Email is required' }).email(),
})

const ResetPasswordForm = () => {
    const router = useRouter()
    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            email: '',
        },
    })
    const requestResetPasswordAction = useAuth((state) => state.requestResetPasswordAction)

    const onSubmit = async (values: z.infer<typeof resetPasswordSchema>) => {
        await requestResetPasswordAction(values)
        router.replace('/sign-in')
    }

    return (
        <section className="auth-form w-full bg-white p-8 rounded-3xl">
            <header className="flex flex-col gap-2 md:gap-3 mb-5">
                <Link href="/" className="font-bold text-4xl">
                    Secure Guard Pro
                </Link>
                <h1 className="text-3xl">Reset Password</h1>
            </header>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-[30%]">
                        Submit
                    </Button>
                </form>
            </Form>
        </section>
    )
}

export default ResetPasswordForm
