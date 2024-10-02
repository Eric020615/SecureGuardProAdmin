import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui/accordion'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { GenderConst, RoleConst, RoleEnum } from '@config/constant/user'
import { useApplication } from '@zustand/index'
import {
    GetUserDetails,
    ResidentInformation,
    SystemAdminInformation,
} from '@zustand/types'
import { useUserManagement } from '@zustand/userManagement/useUserManagement'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Avatar from 'react-avatar'

// Method to render Resident Role Information
const RenderResidentRoleInformation = (roleInfo: ResidentInformation) => (
    <>
        <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Floor:</span>
            <span className="text-sm">{roleInfo.floorNumber}</span>
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Unit:</span>
            <span className="text-sm">{roleInfo.unitNumber}</span>
        </div>
    </>
)

// Method to render System Admin Information
const RenderSystemAdminInformation = (roleInfo: SystemAdminInformation) => (
    <>
        <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Staff Id:</span>
            <span className="text-sm">{roleInfo.staffId}</span>
        </div>
    </>
)

const UserDetailsPage = () => {
    const params = useParams<{ userId: string }>()
    const router = useRouter()
    const [userDetails, setUserDetails] = useState<GetUserDetails>({} as GetUserDetails)
    const { getUserDetails, activateUserByIdAction, deactivateUserByIdAction } =
        useUserManagement()
    const { setIsLoading } = useApplication()
    const getUserDetailsById = async () => {
        try {
            setIsLoading(true)
            const response = await getUserDetails(params.userId)
            if (response.success) {
                setUserDetails(response.data)
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getUserDetailsById()
    }, [])

    const activateUserById = async () => {
        try {
            setIsLoading(true)
            const response = await activateUserByIdAction(userDetails.userGuid)
            if (response.success) {
                window.location.reload()
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    const deactivateUserById = async () => {
        try {
            setIsLoading(true)
            const response = await deactivateUserByIdAction(userDetails.userGuid)
            if (response.success) {
                window.location.reload()
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
        <div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Button
                        className="bg-transparent text-primary p-0"
                        onClick={() => {
                            router.push('/user')
                        }}
                    >
                        <ArrowLeft size={30} />
                    </Button>
                    <h1 className="text-3xl font-bold">User Details</h1>
                </div>
                <div>
                    <div>
                        {userDetails.isActive ? (
                            <Button
                                type="submit"
                                className="w-full bg-red-800"
                                onClick={() => {
                                    deactivateUserById()
                                }}
                            >
                                Disable
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full bg-green-800"
                                onClick={() => {
                                    activateUserById()
                                }}
                            >
                                Enable
                            </Button>
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-white w-full h-full flex-col p-8 mt-5 rounded-md">
                {/* User header */}
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row gap-2">
                        {userDetails.userName ? (
                            <Avatar
                                className="text-[32px]"
                                name={userDetails.userName}
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
                </div>
                <div className="mt-5">
                    <Accordion
                        type="multiple"
                        className="w-full"
                        defaultValue={[
                            'Personal Information',
                            'Role',
                            'Role Information',
                            'Supported Documents',
                        ]}
                    >
                        <AccordionItem value="Personal Information">
                            <AccordionTrigger className="py-2 px-4 bg-slate-100">
                                <h2>Personal Information</h2>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-slate-50">
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            User Id:
                                        </span>
                                        <span className="text-sm">
                                            {userDetails.userId}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Status:
                                        </span>
                                        {userDetails.isActive ? (
                                            <Badge className="w-[60px] bg-green-500 flex justify-center">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge className="w-[60px] bg-red-500 flex justify-center">
                                                Inactive
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            First Name:
                                        </span>
                                        <span className="text-sm">
                                            {userDetails.firstName}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Last Name:
                                        </span>
                                        <span className="text-sm">
                                            {userDetails.lastName}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Email:
                                        </span>
                                        <span className="text-sm">
                                            {userDetails.email}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Contact Number:
                                        </span>
                                        <span className="text-sm">
                                            {userDetails.contactNumber}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Gender:
                                        </span>
                                        <span className="text-sm">
                                            {GenderConst[userDetails.gender]}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Birthday:
                                        </span>
                                        <span className="text-sm">
                                            {userDetails.dateOfBirth}
                                        </span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="Role Information">
                            <AccordionTrigger className="py-2 px-4 bg-slate-100">
                                <h2>Role Information</h2>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-slate-50">
                                <div className="grid md:grid-cols-2 grid-cols-1 gap-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Role:
                                        </span>
                                        <span className="text-sm">
                                            {RoleConst[userDetails.role]}
                                        </span>
                                    </div>
                                    {userDetails.roleInformation &&
                                    userDetails.role == RoleEnum.RESIDENT ? (
                                        <>
                                            {RenderResidentRoleInformation(
                                                userDetails.roleInformation as ResidentInformation
                                            )}
                                        </>
                                    ) : userDetails.roleInformation &&
                                      userDetails.role == RoleEnum.SYSTEM_ADMIN ? (
                                        <>
                                            {RenderSystemAdminInformation(
                                                userDetails.roleInformation as SystemAdminInformation
                                            )}
                                        </>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="Supported Documents">
                            <AccordionTrigger className="py-2 px-4 bg-slate-100">
                                <h2>Supported Documents</h2>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-slate-50">
                                <div className="grid gap-1">
                                    {userDetails.roleInformation?.supportedFiles &&
                                    userDetails.roleInformation?.supportedFiles.length >
                                        0 ? (
                                        userDetails.roleInformation.supportedFiles.map(
                                            (document, index) => (
                                                <Link
                                                    href={document}
                                                    key={index}
                                                    className="text-blue-700"
                                                >{`Document ${index + 1}`}</Link>
                                            )
                                        )
                                    ) : (
                                        <span>No supported documents</span>
                                    )}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default UserDetailsPage
