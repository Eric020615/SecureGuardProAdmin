import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui/accordion'
import { Button } from '@components/ui/button'
import { GetUserDetails } from '@zustand/types'
import { useUserManagement } from '@zustand/userManagement/useUserManagement'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const UserDetailsPage = () => {
    const params = useParams<{ userId: string }>()
    const router = useRouter()
    const [userDetails, setUserDetails] = useState<GetUserDetails>({} as GetUserDetails)
    const { getUserDetails } = useUserManagement()
    const getUserDetailsById = async () => {
        const response = await getUserDetails(params.userId)
        setUserDetails(response.data)
    }
    useEffect(() => {
        getUserDetailsById()
    }, [])

    return (
        <div>
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
            <div className="bg-white w-full h-full flex-col p-8 mt-5 rounded-md">
                {/* User header */}
                <div>
                    <h2 className="md:text-lg text-base font-semibold">
                        {params.userId}
                    </h2>
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
                                        <span className="text-sm">-</span>
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
                                            {userDetails.gender}
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
                                            {userDetails.role}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Floor:
                                        </span>
                                        <span className="text-sm">
                                            {userDetails.roleInformation?.floorNumber}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Unit:
                                        </span>
                                        <span className="text-sm">
                                            {userDetails.roleInformation?.unitNumber}
                                        </span>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="Supported Documents">
                            <AccordionTrigger className="py-2 px-4 bg-slate-100">
                                <h2>Supported Documents</h2>
                            </AccordionTrigger>
                            <AccordionContent className="p-4 bg-slate-50">
                                <div className="grid gap-1">
                                    {
                                        userDetails.roleInformation?.supportedFiles && userDetails.roleInformation?.supportedFiles.length > 0 ? (
                                            userDetails.roleInformation.supportedFiles.map((document, index) => (
                                                <Link href={document} key={index} className='text-blue-700'>{`Document ${index + 1}`}</Link>
                                            ))
                                        ) : (
                                            <span>No supported documents</span>
                                        )
                                    }
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
