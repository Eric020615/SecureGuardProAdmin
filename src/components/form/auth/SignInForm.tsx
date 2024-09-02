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
import { useRouter } from 'next/navigation'
import { useAuth } from '@zustand/auth/useAuth'
import { SignInFormDto } from '@zustand/types'
import { useApplication } from '@zustand/index'

const signInSchema = z.object({
    email: z.string().email().min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
})

const SignInForm = () => {
    const router = useRouter()
    const { signIn } = useAuth()
    const { setIsLoading } = useApplication()

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        try {
            setIsLoading(true)
            const response = await signIn({
                email: values.email,
                password: values.password,
            } as SignInFormDto)
            if (response.success) {
                router.replace('/')
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className="auth-form w-full bg-white p-8 rounded-3xl">
            <header className="flex flex-col md:gap-3 gap-2 mb-5">
                <Link href="/" className="font-bold text-4xl">
                    Secure Guard Pro
                </Link>
                <h1 className='text-3xl'>Sign In</h1>
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
                    <Button type="submit" className="w-[30%]">
                        Submit
                    </Button>
                </form>
            </Form>
        </section>
    )
}

export default SignInForm
