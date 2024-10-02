import React, { forwardRef, useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
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
import { useUser } from '@zustand/user/useUser'
import { useApplication } from '@zustand/index'
import { GetUserProfileByIdDto } from '@zustand/types'
import Avatar from 'react-avatar'
import { GenderConst, GenderEnum, RoleConst } from '@config/constant/user'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Edit } from 'lucide-react'
import { Input } from '@components/ui/input'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import CustomSelect from '@components/select/Select'
import { GenderList } from '@config/listOption/user'
import {
    convertLocalDateStringToUTCString,
    convertUTCStringToLocalDateString,
} from '@lib/time'
import { ITimeFormat } from '@config/constant'

const profileSchema = z.object({
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

const MyProfilePage = () => {
    const { getUserProfileByIdAction, editUserProfileByIdAction } = useUser()
    const [profileDetails, setProfileDetails] = useState<GetUserProfileByIdDto>()
    const [pageMode, setPageMode] = useState<'edit' | 'view'>('view')
    const { setIsLoading } = useApplication()
    useEffect(() => {
        getData()
    }, [])
    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            firstName: profileDetails?.firstName,
            lastName: profileDetails?.lastName,
            userName: profileDetails?.userName,
            phoneNumber: profileDetails?.contactNumber,
            gender: profileDetails?.gender,
            dateOfBirth: profileDetails?.dateOfBirth,
        },
    })
    const getData = async () => {
        try {
            setIsLoading(true)
            const response = await getUserProfileByIdAction()
            if (response.success) {
                setProfileDetails(response.data)
            } else {
                console.log(response.msg)
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    const onSubmit = async (values: z.infer<typeof profileSchema>) => {
        try {
            setIsLoading(true)
            const response = await editUserProfileByIdAction({
                email: profileDetails?.email ? profileDetails.email : '',
                firstName: values.firstName,
                lastName: values.lastName,
                userName: values.userName,
                contactNumber: values.phoneNumber,
                gender: values.gender as GenderEnum,
                dateOfBirth: convertLocalDateStringToUTCString(
                    values.dateOfBirth,
                    ITimeFormat.date
                ),
            })
            if (response.success) {
                // setCustomFailedModal({
                //     title: 'Account updated successfully',
                //     subtitle: 'Please wait for system admin approval to log in',
                // })
            } else {
                // setCustomFailedModal({
                //     title: 'Account updated failed',
                //     subtitle: 'Please contact our support team for assistance',
                // })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
            setPageMode('view')
            window.location.reload()
        }
    }
    useEffect(() => {
        form.setValue(
            'firstName',
            profileDetails?.firstName ? profileDetails.firstName : ''
        )
        form.setValue('lastName', profileDetails?.lastName ? profileDetails.lastName : '')
        form.setValue('userName', profileDetails?.userName ? profileDetails.userName : '')
        form.setValue(
            'phoneNumber',
            profileDetails?.contactNumber ? profileDetails.contactNumber : ''
        )
        form.setValue('gender', profileDetails?.gender ? profileDetails.gender : '')
        form.setValue(
            'dateOfBirth',
            profileDetails?.dateOfBirth
                ? convertUTCStringToLocalDateString(
                      profileDetails.dateOfBirth,
                      ITimeFormat.date
                  )
                : ''
        )
    }, [profileDetails && pageMode === 'edit'])

    return (
        <div className='h-full'>
            <div className="grid gap-5">
                {pageMode === 'view' ? (
                    <div className="grid gap-4 my-2">
                        <Card className="p-4 grid gap-2">
                            <div>
                                {profileDetails?.userName ? (
                                    <Avatar
                                        className="text-[32px]"
                                        name={profileDetails?.userName}
                                        round
                                        size="110"
                                        color="#7078C0"
                                    />
                                ) : (
                                    <Avatar
                                        className="text-[32px]"
                                        name=""
                                        round
                                        size="110"
                                        color="#7078C0"
                                    />
                                )}
                            </div>
                            <div className="grid gap-1 px-2">
                                <div className="flex items-center gap-3">
                                    <p className="text-2xl font-bold">
                                        {profileDetails?.userName
                                            ? profileDetails.userName
                                            : ''}
                                    </p>
                                    {profileDetails?.isActive ? (
                                        <Badge className="w-[60px] bg-green-500 flex justify-center">
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge className="w-[60px] bg-red-500 flex justify-center">
                                            Inactive
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-sm">
                                    {profileDetails?.role
                                        ? RoleConst[profileDetails.role]
                                        : ''}
                                </p>
                                <Button
                                    type="button"
                                    className="w-fit h-fit mt-2"
                                    onClick={() => {
                                        setPageMode('edit')
                                    }}
                                >
                                    <Edit className="mr-2 h-5 w-5" />
                                    Edit
                                </Button>
                            </div>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="grid lg:grid-cols-2 grid-cols-1 gap-5">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        First Name:
                                    </span>
                                    <span className="text-sm">
                                        {profileDetails?.firstName
                                            ? profileDetails.firstName
                                            : ''}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Last Name:
                                    </span>
                                    <span className="text-sm">
                                        {profileDetails?.lastName
                                            ? profileDetails.lastName
                                            : ''}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">Email:</span>
                                    <span className="text-sm">
                                        {profileDetails?.email
                                            ? profileDetails.email
                                            : ''}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Contact Number:
                                    </span>
                                    <span className="text-sm">
                                        {profileDetails?.contactNumber
                                            ? profileDetails.contactNumber
                                            : ''}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">Gender:</span>
                                    <span className="text-sm">
                                        {profileDetails?.gender
                                            ? GenderConst[profileDetails.gender]
                                            : ''}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Birthday:
                                    </span>
                                    <span className="text-sm">
                                        {profileDetails?.dateOfBirth
                                            ? convertUTCStringToLocalDateString(profileDetails.dateOfBirth, ITimeFormat.date)
                                            : ''}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="p-2">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
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
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyProfilePage
