'use client'

import { Button } from '@components/ui/button'
import React, { useEffect, useState } from 'react'
import { RiAddBoxLine } from 'react-icons/ri'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '@components/ui/checkbox'
import CustomTable from '@components/table/Table'
import { useNotice } from '@store/notice/useNotice'
import { useRouter } from 'nextjs-toploader/app'
import { DocumentStatus, ITimeFormat, PaginationDirection } from '@config/constant'
import { GetNoticeDto } from '@dtos/notice/notice.dto'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { convertDateStringToFormattedString } from '@lib/time'
import { Badge } from '@components/ui/badge'

const NoticeManagementPage = () => {
    const columns: ColumnDef<GetNoticeDto>[] = [
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
            accessorKey: 'noticeId',
            header: () => (
                <div className="flex items-center justify-center h-full">Notice ID</div>
            ),
            enableSorting: true,
            cell: ({ row }) => (
                <div className="flex items-center justify-center h-full capitalize">
                    {row.getValue('noticeId')}
                </div>
            ),
        },
        {
            accessorKey: 'title',
            header: () => (
                <div className="flex items-center justify-center h-full">Title</div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center h-full capitalize">
                    {row.getValue('title')}
                </div>
            ),
        },
        {
            accessorKey: 'description',
            header: () => (
                <div className="flex items-center justify-center h-full">Description</div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center h-full capitalize">
                    {row.getValue('description')}
                </div>
            ),
        },
        {
            accessorKey: 'startDate',
            header: ({ column }) => {
                return (
                    <div className="flex items-center justify-center h-full">
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
                <div className="flex items-center justify-center h-full capitalize">
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
                    <div className="flex items-center justify-center h-full">
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
                <div className="flex items-center justify-center h-full capitalize">
                    {convertDateStringToFormattedString(
                        row.getValue('endDate'),
                        ITimeFormat.dateTime
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'status',
            header: () => (
                <div className="flex items-center justify-center h-full">Status</div>
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
                    <div className="flex items-center justify-center h-full">
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

    const { notices, currentPage, totalNotices, getNoticeAction, resetNoticeAction } =
        useNotice()
    const router = useRouter()

    useEffect(() => {
        resetNoticeAction()
        fetchNotice()
    }, [])

    const fetchNotice = async (
        direction: PaginationDirection = PaginationDirection.Next
    ) => {
        await getNoticeAction(direction, 10)
    }

    return (
        <>
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    window.location.reload()
                }}
            />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Notice</h3>
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        router.push('/notice/create')
                    }}
                >
                    <RiAddBoxLine className="text-xl" />
                    <p className="flex items-center text-center">Create</p>
                </Button>
            </div>
            <div className="mt-5 w-full">
                <CustomTable
                    data={notices}
                    columns={columns}
                    onView={(row: Row<GetNoticeDto>) => {
                        router.push(`/notice/${row.original.noticeGuid}`)
                    }}
                    currentPage={currentPage}
                    totalRecords={totalNotices}
                    recordsPerPage={10}
                    fetchNext={() => {
                        fetchNotice(PaginationDirection.Next)
                    }}
                    fetchPrev={() => {
                        fetchNotice(PaginationDirection.Previous)
                    }}
                />
            </div>
        </>
    )
}

export default NoticeManagementPage
