'use client'

import { Button } from '@components/ui/button'
import React, { useEffect, useState } from 'react'
import { RiAddBoxLine } from 'react-icons/ri'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { Checkbox } from '@components/ui/checkbox'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@components/ui/dropdown-menu'
import CustomTable from '@components/table/Table'
import { useFacility } from '@store/facility/useFacility'
import { useRouter } from 'next/navigation'
import CancelBookingDialog from '@components/dialog/CancelBookingDialog'
import { Badge } from '@components/ui/badge'
import { ITimeFormat } from '@config/constant'
import { GetFacilityBookingHistoryDto } from '@dtos/facility/facility.dto'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import {
    convertDateStringToDate,
    convertDateStringToFormattedString,
    getCurrentDate,
} from '@lib/time'

const FacilityManagementPage = () => {
    const {
        facilityBookingHistory,
        totalFacilityBookingHistory,
        getFacilityBookingHistoryAction,
        resetFacilityBookingHistoryAction,
    } = useFacility()
    const [openCancelDialog, setOpenCancelDialog] = useState(false)
    const [selectedBookingGuid, setSelectedBookingGuid] = useState('')
    const router = useRouter()
    const [page, setPage] = useState(0)

    const columns: ColumnDef<GetFacilityBookingHistoryDto>[] = [
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
            accessorKey: 'bookingGuid',
            header: () => null,
            cell: () => null,
            enableHiding: true,
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
                <div className="capitalize">
                    {convertDateStringToFormattedString(
                        row.getValue('startDate'),
                        ITimeFormat.dateTime
                    )}
                </div>
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
                <div className="capitalize">
                    {convertDateStringToFormattedString(
                        row.getValue('endDate'),
                        ITimeFormat.dateTime
                    )}
                </div>
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
            cell: ({ row }) => {
                const startDate = row.getValue('startDate')
                    ? convertDateStringToDate(row.getValue('startDate'))
                    : null
                return (
                    <div className="w-[100px]">
                        {startDate &&
                            (startDate > getCurrentDate() ? (
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
                )
            },
        },
        {
            id: 'actions',
            enableHiding: false,
            cell: ({ row }) => {
                const startDate = row.getValue('startDate')
                    ? convertDateStringToDate(row.getValue('startDate'))
                    : null
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
                            {startDate &&
                                (startDate > getCurrentDate() ? (
                                    row.getValue('isCancelled') ? (
                                        <Badge className="w-full bg-red-500 text-center">
                                            Cancelled
                                        </Badge>
                                    ) : (
                                        <DropdownMenuItem
                                            onClick={() => {
                                                openCancelBookingDialog(
                                                    row.getValue('bookingGuid')
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

    const openCancelBookingDialog = (bookingGuid: string) => {
        setOpenCancelDialog(true)
        setSelectedBookingGuid(bookingGuid)
    }

    useEffect(() => {
        resetFacilityBookingHistoryAction()
        fetchFacilityBookingHistory()
    }, [page])

    const fetchFacilityBookingHistory = async () => {
        await getFacilityBookingHistoryAction(page, 10)
    }

    return (
        <>
            <ActionConfirmationDialog />
            <CancelBookingDialog
                open={openCancelDialog}
                setOpen={setOpenCancelDialog}
                bookingGuid={selectedBookingGuid}
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
                    data={facilityBookingHistory}
                    columns={columns}
                    onView={(row: Row<any>) => {}}
                    totalRecords={totalFacilityBookingHistory}
                    recordsPerPage={10}
                    currentPage={page}
                    setCurrentPage={setPage}
                />
            </div>
        </>
    )
}

export default FacilityManagementPage
