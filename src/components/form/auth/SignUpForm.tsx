import Link from 'next/link'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useAuth } from '@store/auth/useAuth'
import { UserSignUpFormDto } from '@dtos/auth/auth.dto'
import CustomForm, { CustomField } from '@components/form/element/CustomForm'

const formSchema = z
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
    const { signUpAction } = useAuth()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: '',
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
        confirmPassword: {
            type: 'password',
            label: 'Confirm Password',
        },
    }

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await signUpAction({
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        } as UserSignUpFormDto)
    }

    return (
        <section className="auth-form w-full bg-white p-8 rounded-3xl">
            <header className="flex flex-col gap-2 md:gap-3 mb-5">
                <Link href="/" className="font-bold text-4xl">
                    Secure Guard Pro
                </Link>
                <h1 className="text-3xl">Sign Up</h1>
            </header>
            <CustomForm form={form} fields={fields} onSubmit={onSubmit} />
        </section>
    )
}

export default SignUpForm
