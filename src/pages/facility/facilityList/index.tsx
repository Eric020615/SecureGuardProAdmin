import { Button } from '@components/ui/button'
import React, { useEffect } from 'react'
import { RiAddBoxLine } from 'react-icons/ri'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '@components/ui/checkbox'
import CustomTable from '@components/table/Table'
import { useFacility } from '@store/facility/useFacility'
import { useRouter } from 'nextjs-toploader/app'
import { Badge } from '@components/ui/badge'
import {
    DocumentStatusEnum,
    ITimeFormat,
    PaginationDirectionEnum,
} from '@config/constant'
import { GetFacilityBookingHistoryDto } from '@dtos/facility/facility.dto'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import {
    convertDateStringToDate,
    convertDateStringToFormattedString,
    getCurrentDate,
} from '@libs/time'
import { tableStyles } from '@pages/style'
import { FacilityDescriptionEnum } from '@config/constant/facility'

const FacilityBookingManagementPage = () => {
    const {
        facilityBookingHistory,
        currentPage,
        totalFacilityBookingHistory,
        getFacilityBookingHistoryAction,
        resetFacilityBookingHistoryAction,
    } = useFacility()
    const router = useRouter()

    const columns: ColumnDef<GetFacilityBookingHistoryDto>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <div className={tableStyles.headerStyle}>
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && 'indeterminate')
                        }
                        onCheckedChange={(value) =>
                            table.toggleAllPageRowsSelected(!!value)
                        }
                        aria-label="Select all"
                    />
                </div>
            ),
            cell: ({ row }) => (
                <div className={tableStyles.dateCellStyle}>
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => row.toggleSelected(!!value)}
                        aria-label="Select row"
                    />
                </div>
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: 'bookingId',
            header: () => <div className={tableStyles.headerStyle}>Id</div>,
            cell: ({ row }) => (
                <div className={tableStyles.dateCellStyle}>
                    {row.getValue('bookingId')}
                </div>
            ),
        },
        {
            accessorKey: 'facilityId',
            header: () => <div className={tableStyles.headerStyle}>Facility</div>,
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
                    {
                        FacilityDescriptionEnum[
                            row.getValue(
                                'facilityId'
                            ) as keyof typeof FacilityDescriptionEnum
                        ]
                    }
                </div>
            ),
        },
        {
            accessorKey: 'spaceId',
            header: () => <div className={tableStyles.headerStyle}>Space</div>,
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
                    {row.getValue('spaceId')}
                </div>
            ),
        },
        {
            accessorKey: 'startDate',
            header: ({ column }) => {
                return (
                    <div className={tableStyles.headerStyle}>
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting(column.getIsSorted() === 'asc')
                            }
                        >
                            Start Date
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
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
                    <div className={tableStyles.headerStyle}>
                        <Button
                            variant="ghost"
                            onClick={() =>
                                column.toggleSorting(column.getIsSorted() === 'asc')
                            }
                        >
                            End Date
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                )
            },
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
                    {convertDateStringToFormattedString(
                        row.getValue('endDate'),
                        ITimeFormat.dateTime
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'bookedBy',
            header: () => <div className={tableStyles.headerStyle}>Booked By</div>,
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle}`}>
                    {row.getValue('bookedBy')}
                </div>
            ),
        },
        {
            accessorKey: 'isCancelled',
            header: () => <div className={tableStyles.headerStyle}>Booking Status</div>,
            cell: ({ row }) => {
                const startDate = row.getValue('startDate')
                    ? convertDateStringToDate(row.getValue('startDate'))
                    : null
                return (
                    <div className={tableStyles.dateCellStyle}>
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
                                <Badge className="w-full bg-gray-500 flex justify-center">
                                    <span>Expired</span>
                                </Badge>
                            ))}
                    </div>
                )
            },
        },
        {
            accessorKey: 'status',
            header: () => <div className={tableStyles.headerStyle}>Status</div>,
            cell: ({ row }) => {
                const statusValue = row.getValue('status') as string

                // Function to get status name from DocumentStatusEnum enum
                const getStatusName = (value: string): string => {
                    switch (value) {
                        case DocumentStatusEnum.Active:
                            return 'Active'
                        case DocumentStatusEnum.SoftDeleted:
                            return 'Soft Deleted'
                        case DocumentStatusEnum.Archived:
                            return 'Archived'
                        case DocumentStatusEnum.Pending:
                            return 'Pending'
                        case DocumentStatusEnum.Draft:
                            return 'Draft'
                        case DocumentStatusEnum.Suspended:
                            return 'Suspended'
                        default:
                            return 'Unknown'
                    }
                }
                return (
                    <div className={tableStyles.dateCellStyle}>
                        <div className="w-[100px]">
                            <Badge
                                className={`w-full ${
                                    statusValue === DocumentStatusEnum.SoftDeleted
                                        ? 'bg-orange-500'
                                        : statusValue === DocumentStatusEnum.Active
                                          ? 'bg-green-500'
                                          : 'bg-gray-500' // Default color for other statuses
                                } flex justify-center`}
                            >
                                <span>{getStatusName(statusValue)}</span>
                            </Badge>
                        </div>
                    </div>
                )
            },
        },
    ]

    useEffect(() => {
        resetFacilityBookingHistoryAction()
        fetchFacilityBookingHistory()
    }, [])

    const fetchFacilityBookingHistory = async (
        direction: PaginationDirectionEnum = PaginationDirectionEnum.Next
    ) => {
        await getFacilityBookingHistoryAction(direction, 10)
    }

    return (
        <>
            <ActionConfirmationDialog />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Facility</h3>
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        router.push('/facility/create')
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
                    onView={(row: Row<GetFacilityBookingHistoryDto>) => {
                        router.push(`/facility/${row.original.bookingGuid}`)
                    }}
                    currentPage={currentPage}
                    totalRecords={totalFacilityBookingHistory}
                    recordsPerPage={10}
                    fetchNext={() => {
                        fetchFacilityBookingHistory(PaginationDirectionEnum.Next)
                    }}
                    fetchPrev={() => {
                        fetchFacilityBookingHistory(PaginationDirectionEnum.Previous)
                    }}
                />
            </div>
        </>
    )
}

export default FacilityBookingManagementPage
