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
import { useNotice } from '@store/notice/useNotice'
import { useRouter } from 'next/navigation'
import EditNoticeDialog from '@components/dialog/EditNoticeDialog'
import { ITimeFormat } from '@config/constant'
import { GetNoticeDto } from '@dtos/notice/notice.dto'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import CustomConfirmDialog from '@components/dialog/CustomConfirmDialog'
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
                            <DropdownMenuItem
                                onClick={() => {
                                    openEditDialog(row.getValue('noticeGuid'))
                                }}
                            >
                                Edit Notice
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    openCustomDialog(row.getValue('noticeGuid'))
                                }}
                            >
                                Delete Notice
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const {
        notices,
        totalNotices,
        getNoticeAction,
        deleteNoticeByIdAction,
        resetNoticeAction,
    } = useNotice()
    const [selectedNoticeGuid, setSelectedNoticeGuid] = useState('')
    const router = useRouter()
    const [openEditNoticeDialog, setOpenEditNoticeDialog] = useState(false)
    const [page, setPage] = useState(0)
    const [openConfirmModal, setOpenConfirmModal] = useState(false)

    useEffect(() => {
        resetNoticeAction()
        fetchNotice()
    }, [page])

    const fetchNotice = async () => {
        await getNoticeAction(page, 10)
    }

    const openEditDialog = async (noticeGuid: string) => {
        setOpenEditNoticeDialog(true)
        setSelectedNoticeGuid(noticeGuid)
    }

    const openCustomDialog = async (noticeGuid: string) => {
        setSelectedNoticeGuid(noticeGuid)
        setOpenConfirmModal(true)
    }

    const isConfirm = async () => {
        if (!selectedNoticeGuid) {
            return
        }
        await deleteNoticeByIdAction({
            noticeGuid: selectedNoticeGuid,
        })
    }

    return (
        <>
            <EditNoticeDialog
                open={openEditNoticeDialog}
                setOpen={setOpenEditNoticeDialog}
                noticeGuid={selectedNoticeGuid}
            />
            <ActionConfirmationDialog
                onSuccessConfirm={() => {
                    window.location.reload()
                }}
            />
            <CustomConfirmDialog
                onConfirm={isConfirm}
                content={{
                    title: 'Delete Notice',
                    subtitle: 'Are you sure you want to delete this notice?',
                }}
                isOpen={openConfirmModal}
                setOpen={setOpenConfirmModal}
            />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Notice</h3>
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        router.push('/notice/create-notice')
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
                    onView={(row: Row<any>) => {}}
                    totalRecords={totalNotices}
                    recordsPerPage={10}
                    currentPage={page}
                    setCurrentPage={setPage}
                />
            </div>
        </>
    )
}

export default NoticeManagementPage
