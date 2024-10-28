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
import { UserSignUpFormDto } from '@dtos/auth/auth.dto'

const signUpSchema = z
    .object({
        email: z.string().email().min(1, { message: 'Email is required' }),
        password: z.string().min(1, { message: 'Password is required' }),
        confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'], // set the path of the error
    })

const SignUpForm = () => {
    const router = useRouter()
    const { signUpAction, setTempTokenAction } = useAuth()
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
        const response = await signUpAction({
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        } as UserSignUpFormDto)
        if (response.success) {
            setTempTokenAction(response.data)
            router.replace('/user-information')
        }
    }

    return (
        <section className="auth-form w-full bg-white p-8 rounded-3xl">
            <header className="flex flex-col gap-2 md:gap-3 mb-5">
                <Link href="/" className="font-bold text-4xl">
                    Secure Guard Pro
                </Link>
                <h1 className="text-3xl">Sign Up</h1>
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
                                    <Input type="email" placeholder="Email" {...field} />
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

export default SignUpForm
