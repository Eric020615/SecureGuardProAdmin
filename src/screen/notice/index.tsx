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
import { useNotice } from '@zustand/notice/useNotice'
import { DeleteNotice, GetNotice } from '@zustand/types'
import { useRouter } from 'next/navigation'
import EditNoticeDialog from '@components/dialog/EditNoticeDialog'
import CustomDialog from '@components/dialog/CustomDialog'
import { convertUTCStringToLocalDateString } from '@lib/time'
import { ITimeFormat } from '@config/constant'
import { useApplication } from '@zustand/index'
import { useModal } from '@zustand/modal/useModal'

const NoticeManagementPage = () => {
    const columns: ColumnDef<GetNotice>[] = [
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
                    {convertUTCStringToLocalDateString(
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
                    {convertUTCStringToLocalDateString(
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

    const { getNotice, deleteNoticeById } = useNotice()
    const { setIsLoading } = useApplication()
    const [selectedNoticeGuid, setSelectedNoticeGuid] = useState('')
    const [noticeHistory, setNoticeHistory] = useState<GetNotice[]>([])
    const router = useRouter()
    const [openEditNoticeDialog, setOpenEditNoticeDialog] = useState(false)
    const { setCustomConfirmModal } = useModal()
    const [page, setPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)

    useEffect(() => {
        setNoticeHistory([])
        fetchNotice()
    }, [page])

    const fetchNotice = async () => {
        try {
            setIsLoading(true)
            const response = await getNotice(page, 10)
            if (response.success) {
                setNoticeHistory((prev) => [...prev, ...response.data.list])
                setTotalRecords(response.data.count) // Update total records from response
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const openEditDialog = async (noticeGuid: string) => {
        setOpenEditNoticeDialog(true)
        setSelectedNoticeGuid(noticeGuid)
    }

    const openCustomDialog = async (noticeGuid: string) => {
        setSelectedNoticeGuid(noticeGuid)
        setCustomConfirmModal({
            title: 'Are you sure to delete this notice?',
            subtitle: 'Changes are irrevisible',
        })
    }

    const isConfirm = async () => {
        let deleteNotice: DeleteNotice = {
            noticeGuid: selectedNoticeGuid,
        }
        const response = await deleteNoticeById(deleteNotice)
        if (response.success) {
            window.location.reload()
        } else {
            console.log(response.msg)
        }
    }

    return (
        <>
            <EditNoticeDialog
                open={openEditNoticeDialog}
                setOpen={setOpenEditNoticeDialog}
                noticeGuid={selectedNoticeGuid}
            />
            <CustomDialog customConfirmButtonPress={isConfirm} />
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
                    data={noticeHistory}
                    columns={columns}
                    onView={(row: Row<any>) => {}}
                    totalRecords={totalRecords}
                    recordsPerPage={10}
                    currentPage={page}
                    setCurrentPage={setPage}
                />
            </div>
        </>
    )
}

export default NoticeManagementPage
