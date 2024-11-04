'use client'

import { Button } from '@components/ui/button'
import React, { useEffect } from 'react'
import { RiAddBoxLine } from 'react-icons/ri'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '@components/ui/checkbox'
import CustomTable from '@components/table/Table'
import { useRouter } from 'nextjs-toploader/app'
import { Badge } from '@components/ui/badge'
import { DocumentStatus, ITimeFormat, PaginationDirection } from '@config/constant'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { useVisitor } from '@store/visitor/useVisitor'
import { GetVisitorDto } from '@dtos/visitor/visitor.dto'
import { convertDateStringToFormattedString } from '@lib/time'
import { tableStyles } from '@screen/style'

const VisitorManagementPage = () => {
    const {
        visitorHistory,
        currentPage,
        totalVisitorHistory,
        getVisitorHistoryAction,
        resetVisitorHistoryAction,
    } = useVisitor()
    const router = useRouter()

    const columns: ColumnDef<GetVisitorDto>[] = [
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
            accessorKey: 'visitorId',
            header: ({ column }) => (
                <div className={tableStyles.headerStyle}>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Id
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            ),
            cell: ({ row }) => (
                <div className={tableStyles.dateCellStyle}>
                    {row.getValue('visitorId')}
                </div>
            ),
        },
        {
            accessorKey: 'visitorName',
            header: () => (
                <div className={tableStyles.headerStyle}>Name</div>
            ),
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
                    {row.getValue('visitorName')}
                </div>
            ),
        },
        {
            accessorKey: 'visitorCategory',
            header: () => (
                <div className={tableStyles.headerStyle}>Category</div>
            ),
            cell: ({ row }) => (
                <div className={tableStyles.dateCellStyle}>
                    {row.getValue('visitorCategory')}
                </div>
            ),
        },
        {
            accessorKey: 'visitorContactNumber',
            header: () => (
                <div className={tableStyles.headerStyle}>
                    Contact Number
                </div>
            ),
            cell: ({ row }) => (
                <div className={tableStyles.dateCellStyle}>
                    {row.getValue('visitorContactNumber')}
                </div>
            ),
        },
        {
            accessorKey: 'visitDateTime',
            header: ({ column }) => (
                <div className={tableStyles.headerStyle}>
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Visit Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            ),
            cell: ({ row }) => (
                <div className={tableStyles.dateCellStyle}>
                    {convertDateStringToFormattedString(
                        row.getValue('visitDateTime'),
                        ITimeFormat.dateTime
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: () => (
                <div className={tableStyles.headerStyle}>Status</div>
            ),
            cell: ({ row }) => {
                const statusValue = row.getValue('status') as string

                // Function to get status name from DocumentStatus enum
                const getStatusName = (value: string): string => {
                    switch (value) {
                        case DocumentStatus.Active:
                            return 'Active'
                        case DocumentStatus.SoftDeleted:
                            return 'Soft Deleted'
                        case DocumentStatus.Archived:
                            return 'Archived'
                        case DocumentStatus.Pending:
                            return 'Pending'
                        case DocumentStatus.Draft:
                            return 'Draft'
                        case DocumentStatus.Suspended:
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
                                    statusValue === DocumentStatus.SoftDeleted
                                        ? 'bg-orange-500'
                                        : statusValue === DocumentStatus.Active
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
        resetVisitorHistoryAction()
        fetchVisitorHistory()
    }, [])

    const fetchVisitorHistory = async (
        direction: PaginationDirection = PaginationDirection.Next
    ) => {
        await getVisitorHistoryAction(direction, 10)
    }

    return (
        <>
            <ActionConfirmationDialog />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Visitors</h3>
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        router.push('/visitor/create') // Adjust route as necessary
                    }}
                >
                    <RiAddBoxLine className="text-xl" />
                    <p className="flex items-center text-center">Create</p>
                </Button>
            </div>
            <div className="mt-5 w-full">
                <CustomTable
                    data={visitorHistory}
                    columns={columns}
                    onView={(row: Row<GetVisitorDto>) => {
                        router.push(`/visitor/${row.original.visitorGuid}`) // Adjust route as necessary
                    }}
                    currentPage={currentPage}
                    totalRecords={totalVisitorHistory}
                    recordsPerPage={10}
                    fetchNext={() => {
                        fetchVisitorHistory(PaginationDirection.Next)
                    }}
                    fetchPrev={() => {
                        fetchVisitorHistory(PaginationDirection.Previous)
                    }}
                />
            </div>
        </>
    )
}

export default VisitorManagementPage
