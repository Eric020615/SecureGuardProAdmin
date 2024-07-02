import Link from 'next/link'
import React from 'react'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/zustand/authService/auth'
import { SignInFormDto, UserSignUpFormDto } from '@/zustand/types'

interface authFormProps {
    type: 'sign-in' | 'sign-up'
}

const signInSchema = z.object({
    email: z.string().email().min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
})

const signUpSchema = signInSchema
    .extend({
        confirmPassword: z.string().min(1, { message: 'Confirm password is required' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'], // set the path of the error
    })

const AuthForm = ({ type }: authFormProps) => {
    const router = useRouter()
    const authSignInSelector = useAuth((state) => state.signIn)
    const authSignUpSelector = useAuth((state) => state.signUp)

    const schema = type === 'sign-in' ? signInSchema : signUpSchema
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
    })

    type SignInFormValues = z.infer<typeof signInSchema>
    type SignUpFormValues = z.infer<typeof signUpSchema>
    const isSignUpFormValues = (
        values: SignInFormValues | SignUpFormValues
    ): values is SignUpFormValues => {
        return 'confirmPassword' in values
    }

    const onSubmit = async (values: z.infer<typeof schema>) => {
        if (type === 'sign-in') {
            const result = await authSignInSelector({
                email: values.email,
                password: values.password,
            } as SignInFormDto)
            if (result.success) {
                router.replace('/')
            } else {
                console.log(result.msg)
            }
        }
        if (type === 'sign-up' && isSignUpFormValues(values)) {
            const result = await authSignUpSelector({
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            } as UserSignUpFormDto)
            if (result.success) {
                router.replace('/')
            } else {
                console.log(result.msg)
            }
        }
    }

    return (
        <section className="auth-form w-1/2">
            <header className="flex flex-col gap-2 md:gap-5">
                <Link href="/" className="font-bold text-xl">
                    Secure Guard Pro
                </Link>
                <div className="flex flex-col gap-1 md:gap-3">
                    <h1>{type === 'sign-in' ? 'Sign In' : 'Sign Up'}</h1>
                </div>
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
                    {type === 'sign-up' && (
                        <>
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
                        </>
                    )}
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </section>
    )
}

export default AuthForm
