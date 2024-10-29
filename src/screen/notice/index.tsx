'use client'

import { Button } from '@components/ui/button'
import React, { useEffect, useState } from 'react'
import { RiAddBoxLine } from 'react-icons/ri'
import { ColumnDef, Row } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '@components/ui/checkbox'
import CustomTable from '@components/table/Table'
import { useNotice } from '@store/notice/useNotice'
import { useRouter } from 'nextjs-toploader/app';
import { ITimeFormat, PaginationDirection } from '@config/constant'
import { GetNoticeDto } from '@dtos/notice/notice.dto'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { convertDateStringToFormattedString } from '@lib/time'

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
            header: 'Id',
            enableSorting: true,
            cell: ({ row }) => <div>{row.getValue('noticeId') as string}</div>,
        },
        {
            accessorKey: 'noticeGuid',
            header: () => null,
            cell: () => null,
            enableHiding: true,
        },
        {
            accessorKey: 'title',
            header: 'Title',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('title') as string}</div>
            ),
        },
        {
            accessorKey: 'description',
            header: 'Description',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('description')}</div>
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
    ]

    const {
        notices,
        currentPage,
        totalNotices,
        getNoticeAction,
        deleteNoticeByIdAction,
        resetNoticeAction,
    } = useNotice()
    const router = useRouter()
    const [openConfirmModal, setOpenConfirmModal] = useState(false)

    useEffect(() => {
        resetNoticeAction()
        fetchNotice()
    }, [])

    const fetchNotice = async (direction: PaginationDirection = PaginationDirection.Next) => {
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
