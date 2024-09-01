'use client'

import { Button } from '@components/ui/button'
import React, { useEffect, useState } from 'react'
import { RiAddBoxLine } from 'react-icons/ri'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Checkbox } from '@components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import CustomTable from '@components/Table'
import { useFacility } from '@zustand/facility/useFacility'
import { GetFacilityBooking } from '@zustand/types'
import { FacilityName } from '@config/constant/facility'
import { useRouter } from 'next/navigation'
import CancelBookingDialog from '@components/dialog/CancelBookingDialog'
import { Badge } from '@components/ui/badge'
import {
    convertUTCStringToLocalDate,
    convertUTCStringToLocalDateString,
    getTodayDate,
} from '@lib/time'
import { ITimeFormat } from '@config/constant'
import { useApplication } from '@zustand/index'

const FacilityPage = () => {
    const { getBookingHistory } = useFacility()
    const { setIsLoading } = useApplication()
    const [bookingHistory, setBookingHistory] = useState<GetFacilityBooking[]>([])
    const [openCancelDialog, setOpenCancelDialog] = useState(false)
    const [selectedBookingId, setSelectedBookingId] = useState('')
    const router = useRouter()

    const columns: ColumnDef<GetFacilityBooking>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'bookingId',
            header: 'Id',
            cell: ({ row }) => <div>{row.getValue('bookingId')}</div>,
        },
        {
            accessorKey: 'facilityId',
            header: 'Facility',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('facilityId') as string}</div>
            ),
        },
        {
            accessorKey: 'startDate',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Start Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('startDate')}</div>
            ),
        },
        {
            accessorKey: 'endDate',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        End Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('endDate')}</div>
            ),
        },
        {
            accessorKey: 'bookedBy',
            header: 'Created By',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('bookedBy')}</div>
            ),
        },
        {
            accessorKey: 'isCancelled',
            header: 'Status',
            cell: ({ row }) => (
                <div className="w-[100px]">
                    {row.getValue('startDate') != '' &&
                        (convertUTCStringToLocalDate(row.getValue('startDate')) >
                        getTodayDate() ? (
                            row.getValue('isCancelled') ? (
                                <Badge className="w-full bg-red-500 flex justify-center">
                                    <span>Cancelled</span>
                                </Badge>
                            ) : (
                                <Badge className="w-full bg-green-500 flex justify-center">
                                    <span>Active</span>
                                </Badge>
                            )
                        ) : (
                            <Badge className="w-full bg-red-500 flex justify-center">
                                <span>Expired</span>
                            </Badge>
                        ))}
                </div>
            ),
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {row.getValue('startDate') != '' &&
                                (convertUTCStringToLocalDate(row.getValue('startDate')) >
                                getTodayDate() ? (
                                    row.getValue('isCancelled') ? (
                                        <Badge className="w-full bg-red-500 text-center">
                                            Cancelled
                                        </Badge>
                                    ) : (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                openCancelBookingDialog(
                                                    row.getValue('bookingId')
                                                )
                                            }}
                                        >
                                            Cancel Booking
                                        </DropdownMenuItem>
                                    )
                                ) : (
                                    <div className="flex justify-center">
                                        <Badge className="w-full bg-red-500 text-center">
                                            Expired Booking
                                        </Badge>
                                    </div>
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const openCancelBookingDialog = (bookingId: string) => {
        setOpenCancelDialog(true)
        setSelectedBookingId(bookingId)
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setIsLoading(true)
            const response = await getBookingHistory()
            if (response.success) {
                const bookingHistory = response.data.map((x: any) => {
                    return {
                        facilityId: FacilityName[x.facilityId as string],
                        bookingId: x.bookingId,
                        startDate: convertUTCStringToLocalDateString(
                            x.startDate,
                            ITimeFormat.dateTime
                        ),
                        endDate: convertUTCStringToLocalDateString(
                            x.endDate,
                            ITimeFormat.dateTime
                        ),
                        bookedBy: x.bookedBy,
                        numOfGuest: x.numOfGuest,
                        isCancelled: x.isCancelled,
                    } as GetFacilityBooking
                })
                setBookingHistory(bookingHistory)
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
        <>
            <CancelBookingDialog
                open={openCancelDialog}
                setOpen={setOpenCancelDialog}
                bookingId={selectedBookingId}
            />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Facility</h3>
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        router.push('/facility/create-booking')
                    }}
                >
                    <RiAddBoxLine className="text-xl" />
                    <p className="flex items-center text-center">Create</p>
                </Button>
            </div>
            <div className="mt-5 w-full">
                <CustomTable
                    data={bookingHistory}
                    columns={columns}
                    onView={(row: Row<any>) => {}}
                />
            </div>
        </>
    )
}

export default FacilityPage
