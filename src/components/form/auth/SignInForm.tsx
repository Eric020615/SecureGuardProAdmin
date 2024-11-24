import Link from 'next/link'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '@store/auth/useAuth'
import { SignInFormDto } from '@dtos/auth/auth.dto'
import CustomForm, { CustomField } from '@components/form/element/CustomForm'

const formSchema = z.object({
    email: z.string().email().min(1, { message: 'Email is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
})

const SignInForm = () => {
    const { signInAction } = useAuth()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const fields: Record<string, CustomField> = {
        email: {
            type: 'text',
            label: 'Email',
        },
        password: {
            type: 'password',
            label: 'Password',
        },
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await signInAction({
            email: values.email,
            password: values.password,
        } as SignInFormDto)
    }

    return (
        <section className="auth-form w-full bg-white p-8 rounded-3xl">
            <header className="flex flex-col md:gap-3 gap-2 mb-5">
                <Link href="/" className="font-bold text-4xl">
                    Secure Guard Pro
                </Link>
                <h1 className="text-3xl">Sign In</h1>
            </header>
            <CustomForm form={form} fields={fields} onSubmit={onSubmit} />
            <div className="flex justify-end mb-4">
                <Link href="/reset-password" className="text-primary font-bold">
                    Forgot Password?
                </Link>
            </div>
        </section>
    )
}

export default SignInForm
