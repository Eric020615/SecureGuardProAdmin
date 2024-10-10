import Link from 'next/link'
import React, { forwardRef, useEffect } from 'react'
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
import { useAuth } from '@store/auth/useAuth'
import { GenderEnum, userInformationConst } from '@config/constant/user'
import { useDropzone, FileWithPath } from 'react-dropzone'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { getBase64 } from '@lib/file'
import { useUser } from '@store/user/useUser'
import { getUTCDateString } from '@lib/time'
import { ITimeFormat } from '@config/constant'
import CustomSelect from '@components/select/Select'
import { GenderList } from '@config/listOption/user'

const userInformationSchema = z.object({
    firstName: z.string().min(1, { message: 'First Name is required' }),
    lastName: z.string().min(1, { message: 'Last Name is required' }),
    userName: z.string().min(1, { message: 'User Name is required' }),
    staffId: z.string().min(1, { message: 'Staff Id is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
    gender: z.string().min(1, { message: 'Gender is required' }),
    dateOfBirth: z.string().min(1, { message: 'Date of Birth is required' }),
    files: z.array(z.any()),
    // .nonempty({ message: 'Please upload at least one file.' }),
})

const PhoneNumberInput = forwardRef<HTMLInputElement>((props, ref) => {
    return <input {...props} ref={ref} className="h-full w-full rounded-md px-2" />
})

const UserInformationForm = () => {
    const router = useRouter()
    const { tempToken } = useAuth()
    const { createUserAction } = useUser()
    const form = useForm<z.infer<typeof userInformationSchema>>({
        resolver: zodResolver(userInformationSchema),
        defaultValues: userInformationConst,
    })
    useEffect(() => {
        if (!tempToken) {
            router.replace('/sign-up')
        }
    }, [tempToken])

    const onSubmit = async (values: z.infer<typeof userInformationSchema>) => {
        const response = await createUserAction(
            {
                firstName: values.firstName,
                lastName: values.lastName,
                userName: values.userName,
                contactNumber: values.phoneNumber,
                gender: values.gender as GenderEnum,
                staffId: values.staffId,
                dateOfBirth: getUTCDateString(
                    new Date(values.dateOfBirth),
                    ITimeFormat.date
                ),
                supportedFiles:
                    values.files.length > 0
                        ? await Promise.all(
                              values.files.map(async (file) => {
                                  const base64 = await getBase64(file)
                                  return base64
                              })
                          )
                        : [],
            },
            tempToken
        )
        if (response.success) {
            // setCustomFailedModal({
            //     title: 'Account updated successfully',
            //     subtitle: 'Please wait for system admin approval to log in',
            // })
            router.replace('/sign-up')
        }
    }

    return (
        <section className="auth-form w-full bg-white p-8 rounded-3xl">
            <header className="flex flex-col gap-2 md:gap-3 mb-5">
                <Link href="/" className="font-bold text-4xl">
                    Secure Guard Pro
                </Link>
                <h1 className="text-3xl">User Information</h1>
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
                        name="staffId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Staff ID</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter your staff ID"
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
                    <FormField
                        control={form.control}
                        name="files"
                        render={({ field: { onChange, value } }) => (
                            <FormItem>
                                <FormLabel>Supported Documents</FormLabel>
                                <FormControl>
                                    <FileDropzone onChange={onChange} value={value} />
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

interface FileDropzoneProps {
    onChange: (event: any[]) => void
    value: FileWithPath[]
}

const FileDropzone = ({ onChange, value }: FileDropzoneProps) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: FileWithPath[]) => {
            onChange(acceptedFiles)
        },
    })
    return (
        <>
            <div
                {...getRootProps({
                    className:
                        'dropzone flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400',
                })}
            >
                <input {...getInputProps()} />
                <p className="text-gray-500">
                    Drag 'n' drop some files here, or click to select files
                </p>
            </div>
            <aside className="mt-4">
                <ul className="list-disc list-inside mt-2 text-gray-600 text-sm">
                    {value &&
                        value.length > 0 &&
                        value.map((file, index) => <li key={index}>{file.name}</li>)}
                </ul>
            </aside>
        </>
    )
}

export default UserInformationForm
