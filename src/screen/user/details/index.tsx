import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui/accordion'
import { Badge } from '@components/ui/badge'
import { Button } from '@components/ui/button'
import { ITimeFormat } from '@config/constant'
import { GenderConst, RoleConst, RoleEnum } from '@config/constant/user'
import {
    ResidentInformationDto,
    SystemAdminInformationDto,
} from '@dtos/user-management/userManagement.dto'
import { convertDateStringToFormattedString } from '@lib/time'
import { useUserManagement } from '@store/userManagement/useUserManagement'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Avatar from 'react-avatar'

// Method to render Resident Role Information
const RenderResidentRoleInformation = (roleInfo: ResidentInformationDto) => (
    <>
        <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Floor:</span>
            <span className="text-sm">{roleInfo.floor}</span>
        </div>
        <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Unit:</span>
            <span className="text-sm">{roleInfo.unit}</span>
        </div>
    </>
)

// Method to render System Admin Information
const RenderSystemAdminInformation = (roleInfo: SystemAdminInformationDto) => (
    <>
        <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">Staff Id:</span>
            <span className="text-sm">{roleInfo.staffId}</span>
        </div>
    </>
)

const UserDetailsPage = () => {
    const params = useParams<{ userGuid: string }>()
    const router = useRouter()
    const {
        userDetails,
        getUserDetailsAction,
        activateUserByIdAction,
        deactivateUserByIdAction,
    } = useUserManagement()
    const getUserDetailsById = async () => {
        await getUserDetailsAction(params.userGuid)
    }
    useEffect(() => {
        getUserDetailsById()
    }, [])

    const activateUserById = async () => {
        await activateUserByIdAction(userDetails.userGuid)
    }
    const deactivateUserById = async () => {
        await deactivateUserByIdAction(userDetails.userGuid)
    }

    return (
        <div>
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    window.location.reload()
                }}
            />
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Button
                        className="bg-transparent text-primary p-0 focus:outline-none active:bg-primary hover:bg-primary/20"
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
                                            {convertDateStringToFormattedString(
                                                userDetails.dateOfBirth,
                                                ITimeFormat.date
                                            )}
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
                                                userDetails.roleInformation as ResidentInformationDto
                                            )}
                                        </>
                                    ) : userDetails.roleInformation &&
                                      userDetails.role == RoleEnum.SYSTEM_ADMIN ? (
                                        <>
                                            {RenderSystemAdminInformation(
                                                userDetails.roleInformation as SystemAdminInformationDto
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
