'use client'

import { Button } from '@components/ui/button'
import React, { useEffect } from 'react'
import { RiAddBoxLine } from 'react-icons/ri'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '@components/ui/checkbox'
import CustomTable from '@components/table/Table'
import { useNotice } from '@store/notice/useNotice'
import { useRouter } from 'nextjs-toploader/app'
import { DocumentStatusEnum, ITimeFormat, PaginationDirectionEnum } from '@config/constant'
import { GetNoticeDto } from '@dtos/notice/notice.dto'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { convertDateStringToFormattedString } from '@lib/time'
import { Badge } from '@components/ui/badge'
import { tableStyles } from '@screen/style'

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
            header: () => <div className={tableStyles.headerStyle}>Notice ID</div>,
            enableSorting: true,
            cell: ({ row }) => (
                <div className={tableStyles.dateCellStyle}>
                    {row.getValue('noticeId')}
                </div>
            ),
        },
        {
            accessorKey: 'title',
            header: () => <div className={tableStyles.headerStyle}>Title</div>,
            cell: ({ row }) => (
                <div className={tableStyles.dateCellStyle}>
                    <p className={`${tableStyles.textCellEllipsisStyle}`}>
                        {row.getValue('title')}
                    </p>
                </div>
            ),
        },
        {
            accessorKey: 'description',
            header: () => (
                <div className={`${tableStyles.headerStyle}`}>
                    Description
                </div>
            ),
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle}`}>
                    <p className={`${tableStyles.textCellEllipsisStyle}`}>
                        {row.getValue('description')}
                    </p>
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
                <div className={tableStyles.dateCellStyle}>
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
                <div className={tableStyles.dateCellStyle}>
                    {convertDateStringToFormattedString(
                        row.getValue('endDate'),
                        ITimeFormat.dateTime
                    )}
                </div>
            ),
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
                        <Badge
                            className={`w-full ${
                                statusValue === DocumentStatusEnum.SoftDeleted
                                    ? tableStyles.badgeColor.softDeleted
                                    : statusValue === DocumentStatusEnum.Active
                                      ? tableStyles.badgeColor.active
                                      : tableStyles.badgeColor.default // Default color for other statuses
                            } flex justify-center`}
                        >
                            <span>{getStatusName(statusValue)}</span>
                        </Badge>
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
        direction: PaginationDirectionEnum = PaginationDirectionEnum.Next
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
                        fetchNotice(PaginationDirectionEnum.Next)
                    }}
                    fetchPrev={() => {
                        fetchNotice(PaginationDirectionEnum.Previous)
                    }}
                />
            </div>
        </>
    )
}

export default NoticeManagementPage
