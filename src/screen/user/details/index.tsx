import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui/accordion'
import { Button } from '@components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'

const UserDetailsPage = () => {
    const params = useParams<{ userId: string }>()
    const router = useRouter()
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
                <div className='mt-5'>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="Personal Information">
                            <AccordionTrigger className='p-2 bg-slate-100'>
                                <h2>Personal Information</h2>
                            </AccordionTrigger>
                            <AccordionContent className='p-2 bg-slate-50'>
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Full Name
                                        </span>
                                        <span className="text-sm">John Doe</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold">
                                            Email
                                        </span>
                                        <span className="text-sm">abc@gmail.com</span>
                                    </div>
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
