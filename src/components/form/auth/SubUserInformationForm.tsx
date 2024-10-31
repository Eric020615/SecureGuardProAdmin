import Link from 'next/link'
import React, { forwardRef } from 'react'
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
import { GenderEnum, userInformationConst } from '@config/constant/user'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useUser } from '@store/user/useUser'
import { ITimeFormat } from '@config/constant'
import CustomSelect from '@components/select/Select'
import { GenderList } from '@config/listOption/user'
import { convertDateStringToFormattedString } from '@lib/time'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'

const userInformationSchema = z.object({
    firstName: z.string().min(1, { message: 'First Name is required' }),
    lastName: z.string().min(1, { message: 'Last Name is required' }),
    userName: z.string().min(1, { message: 'User Name is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
    gender: z.string().min(1, { message: 'Gender is required' }),
    dateOfBirth: z.string().min(1, { message: 'Date of Birth is required' }),
})

const PhoneNumberInput = forwardRef<HTMLInputElement>((props, ref) => {
    return <input {...props} ref={ref} className="h-full w-full rounded-md px-2" />
})

const SubUserInformationForm = () => {
    const router = useRouter()
    const { tempToken, subUserPayload } = useAuth()
    const { createUserAction } = useUser()
    const form = useForm<z.infer<typeof userInformationSchema>>({
        resolver: zodResolver(userInformationSchema),
        defaultValues: userInformationConst,
    })

    const onSubmit = async (values: z.infer<typeof userInformationSchema>) => {
        const response = await createUserAction(
            {
                firstName: values.firstName,
                lastName: values.lastName,
                userName: values.userName,
                contactNumber: values.phoneNumber,
                gender: values.gender as GenderEnum,
                dateOfBirth: convertDateStringToFormattedString(
                    values.dateOfBirth,
                    ITimeFormat.isoDateTime
                ),
                parentUserGuid: subUserPayload.parentUserGuid,
                subUserRequestGuid: subUserPayload.subUserRequestGuid,
            },
            tempToken
        )
    }

    return (
        <section className="auth-form w-full bg-white p-8 rounded-3xl">
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    router.replace('/sign-up')
                }}
            />
            <header className="flex flex-col gap-2 md:gap-3 mb-5">
                <Link href="/" className="font-bold text-4xl">
                    Secure Guard Pro
                </Link>
                <h1 className="text-3xl">Sub-User Information</h1>
            </header>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your first name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your last name"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="userName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Choose a username"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field: { onChange, value } }) => (
                            <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        onChange={onChange}
                                        value={value}
                                        name="phoneNumber"
                                        placeholder="Enter your phone number"
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        inputComponent={PhoneNumberInput}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field: { value, onChange } }) => (
                            <FormItem>
                                <FormLabel>Gender</FormLabel>
                                <FormControl>
                                    <CustomSelect
                                        title="Gender"
                                        selectLabel="Gender"
                                        selectItem={GenderList}
                                        onDataChange={onChange}
                                        value={value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dateOfBirth"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Date of Birth</FormLabel>
                                <FormControl>
                                    <Input
                                        type="date"
                                        placeholder="Select your date of birth"
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

export default SubUserInformationForm
