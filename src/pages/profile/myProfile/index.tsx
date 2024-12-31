import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@components/ui/card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useUser } from '@store/user/useUser'
import Avatar from 'react-avatar'
import { GenderDescriptionEnum, RoleDescriptionEnum } from '@config/constant/user'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { Edit } from 'lucide-react'
import 'react-phone-number-input/style.css'
import { ITimeFormat } from '@config/constant'
import { convertDateStringToFormattedString } from '@libs/time'
import CustomForm, { CustomField } from '@components/form/element/CustomForm'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { GenderOptions } from '@config/listOption/user'

const formSchema = z.object({
    firstName: z.string().min(1, { message: 'First Name is required' }),
    lastName: z.string().min(1, { message: 'Last Name is required' }),
    userName: z.string().min(1, { message: 'User Name is required' }),
    phoneNumber: z.string().min(1, { message: 'Phone Number is required' }),
    gender: z.string().min(1, { message: 'Gender is required' }),
    dateOfBirth: z.string().min(1, { message: 'Date of Birth is required' }),
})

const MyProfilePage = () => {
    const { getUserProfileByIdAction, editUserProfileByIdAction, userProfile } = useUser()
    const [pageMode, setPageMode] = useState<'edit' | 'view'>('view')

    useEffect(() => {
        getData()
    }, [pageMode])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
            userName: userProfile?.userName,
            phoneNumber: userProfile?.contactNumber,
            gender: userProfile?.gender,
            dateOfBirth: userProfile?.dateOfBirth,
        },
    })

    const fields: Record<string, CustomField> = {
        firstName: {
            label: 'First Name',
            type: 'text',
        },
        lastName: {
            label: 'Last Name',
            type: 'text',
        },
        userName: {
            label: 'Username',
            type: 'text',
        },
        phoneNumber: {
            label: 'Phone Number',
            type: 'phone',
        },
        gender: {
            label: 'Gender',
            type: 'select',
            options: GenderOptions,
        },
        dateOfBirth: {
            label: 'Date of Birth',
            type: 'date',
        },
    }

    const getData = async () => {
        await getUserProfileByIdAction()
    }

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        await editUserProfileByIdAction({
            email: userProfile?.email ? userProfile.email : '',
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            contactNumber: values.phoneNumber,
            gender: values.gender as keyof typeof GenderDescriptionEnum,
            dateOfBirth: convertDateStringToFormattedString(
                values.dateOfBirth,
                ITimeFormat.isoDateTime
            ),
        })
    }

    useEffect(() => {
        if (userProfile) {
            form.setValue(
                'firstName',
                userProfile?.firstName ? userProfile.firstName : ''
            )
            form.setValue('lastName', userProfile?.lastName ? userProfile.lastName : '')
            form.setValue('userName', userProfile?.userName ? userProfile.userName : '')
            form.setValue(
                'phoneNumber',
                userProfile?.contactNumber ? userProfile.contactNumber : ''
            )
            form.setValue(
                'gender',
                userProfile?.gender
                    ? (userProfile.gender as keyof typeof GenderDescriptionEnum)
                    : 'M'
            )
            form.setValue(
                'dateOfBirth',
                userProfile?.dateOfBirth
                    ? convertDateStringToFormattedString(
                          userProfile.dateOfBirth,
                          ITimeFormat.date
                      )
                    : ''
            )
        }
    }, [userProfile && pageMode === 'edit'])

    return (
        <div className="h-full">
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    setPageMode('view')
                }}
            />
            <div className="grid gap-5">
                {pageMode === 'view' ? (
                    <div className="grid gap-4 my-2">
                        <Card className="p-4 grid gap-2">
                            <div>
                                {userProfile?.userName ? (
                                    <Avatar
                                        className="text-[32px]"
                                        name={userProfile?.userName}
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
                                        {userProfile?.userName
                                            ? userProfile.userName
                                            : ''}
                                    </p>
                                    {userProfile?.isActive ? (
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
                                    {userProfile?.role
                                        ? RoleDescriptionEnum[userProfile.role]
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
                                        {userProfile?.firstName
                                            ? userProfile.firstName
                                            : ''}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Last Name:
                                    </span>
                                    <span className="text-sm">
                                        {userProfile?.lastName
                                            ? userProfile.lastName
                                            : ''}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">Email:</span>
                                    <span className="text-sm">
                                        {userProfile?.email ? userProfile.email : ''}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Contact Number:
                                    </span>
                                    <span className="text-sm">
                                        {userProfile?.contactNumber
                                            ? userProfile.contactNumber
                                            : ''}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">Gender:</span>
                                    <span className="text-sm">
                                        {userProfile?.gender
                                            ? GenderDescriptionEnum[userProfile.gender]
                                            : ''}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold">
                                        Birthday:
                                    </span>
                                    <span className="text-sm">
                                        {userProfile?.dateOfBirth
                                            ? convertDateStringToFormattedString(
                                                  userProfile.dateOfBirth,
                                                  ITimeFormat.date
                                              )
                                            : ''}
                                    </span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="p-2">
                        <CustomForm form={form} fields={fields} onSubmit={handleSubmit} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyProfilePage
