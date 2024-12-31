import Link from 'next/link'
import React, { useEffect } from 'react'
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
import { useRouter } from 'nextjs-toploader/app'
import { useAuth } from '@store/auth/useAuth'
import { UserSignUpFormDto } from '@dtos/auth/auth.dto'
import { RoleEnum } from '@config/constant/user'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'

const subUserRegistrationSchema = z
    .object({
        email: z.string().min(1, { message: 'Email is required' }).email(),
        password: z
            .string()
            .min(1, { message: 'Password is required' })
            .min(8, 'Password must be at least 8 characters long')
            .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
            .regex(/\d/, 'Password must contain at least one number')
            .regex(/[@$!%*?&]/, 'Password must contain at least one special character'),
        confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'], // set the path of the error
    })

interface SubUserRegistrationFormProps {
    email: string
}

const SubUserRegistrationForm = ({ email }: SubUserRegistrationFormProps) => {
    const router = useRouter()
    const { signUpAction } = useAuth()
    const form = useForm<z.infer<typeof subUserRegistrationSchema>>({
        resolver: zodResolver(subUserRegistrationSchema),
        defaultValues: {
            email: email ? email : '',
            password: '',
            confirmPassword: '',
        },
    })
    useEffect(() => {
        form.reset({
            email: email,
            password: '',
            confirmPassword: '',
        })
    }, [email])

    const onSubmit = async (values: z.infer<typeof subUserRegistrationSchema>) => {
        const response = await signUpAction(
            {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            } as UserSignUpFormDto,
            RoleEnum.RESIDENT_SUBUSER
        )
    }

    return (
        <section className="auth-form w-full bg-white p-8 rounded-3xl">
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    router.replace('/user-information')
                }}
            />
            <header className="flex flex-col gap-2 md:gap-3 mb-5">
                <Link href="/" className="font-bold text-4xl">
                    Secure Guard Pro
                </Link>
                <h1 className="text-3xl">Sub-User Registration</h1>
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
                                        placeholder="Email"
                                        {...field}
                                        disabled={true}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm Password"
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

export default SubUserRegistrationForm
