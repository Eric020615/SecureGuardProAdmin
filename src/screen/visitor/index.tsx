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
import { useRouter } from 'next/navigation'
import { Badge } from '@components/ui/badge'
import { ITimeFormat } from '@config/constant'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { useVisitor } from '@store/visitor/useVisitor'
import { GetVisitorDto } from '@dtos/visitor/visitor.dto'
import { convertDateStringToFormattedString } from '@lib/time'

const VisitorManagementPage = () => {
    const {
        visitorHistory,
        totalVisitorHistory,
        getVisitorHistoryAction,
        resetVisitorHistoryAction,
    } = useVisitor()
    const [openCancelDialog, setOpenCancelDialog] = useState(false)
    const [selectedVisitorGuid, setSelectedVisitorGuid] = useState('')
    const router = useRouter()
    const [page, setPage] = useState(0)

    const columns: ColumnDef<GetVisitorDto>[] = [
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
            accessorKey: 'visitorId',
            header: 'Id',
            cell: ({ row }) => <div>{row.getValue('visitorId')}</div>,
        },
        {
            accessorKey: 'visitorGuid',
            header: () => null,
            cell: () => null,
            enableHiding: true,
        },
        {
            accessorKey: 'visitorName',
            header: 'Visitor Name',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('visitorName')}</div>
            ),
        },
        {
            accessorKey: 'visitorCategory',
            header: 'Category',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('visitorCategory')}</div>
            ),
        },
        {
            accessorKey: 'visitorContactNumber',
            header: 'Contact Number',
            cell: ({ row }) => <div>{row.getValue('visitorContactNumber')}</div>,
        },
        {
            accessorKey: 'visitDateTime',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Visit Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">
                    {convertDateStringToFormattedString(
                        row.getValue('visitDateTime'),
                        ITimeFormat.dateTime
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'createdBy',
            header: 'Created By',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('createdBy')}</div>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <div className="w-[100px]">
                    {row.getValue('status') ? (
                        <Badge className="w-full bg-green-500 flex justify-center">
                            <span>Active</span>
                        </Badge>
                    ) : (
                        <Badge className="w-full bg-red-500 flex justify-center">
                            <span>Cancelled</span>
                        </Badge>
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
                                    openCancelVisitDialog(row.getValue('visitorGuid'))
                                }}
                            >
                                Cancel Visit
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    const openCancelVisitDialog = (visitorGuid: string) => {
        setOpenCancelDialog(true)
        setSelectedVisitorGuid(visitorGuid)
    }

    useEffect(() => {
        resetVisitorHistoryAction()
        fetchVisitorHistory()
    }, [page])

    const fetchVisitorHistory = async () => {
        await getVisitorHistoryAction(page, 10)
    }

    return (
        <>
            <ActionConfirmationDialog />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Visitors</h3>
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        router.push('/visitor/create-visitor') // Adjust route as necessary
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
                        router.push(`/visitor/${row.getValue('visitorGuid')}`) // Adjust route as necessary
                    }} // Implement view logic if needed
                    totalRecords={totalVisitorHistory}
                    recordsPerPage={10}
                    currentPage={page}
                    setCurrentPage={setPage}
                />
            </div>
        </>
    )
}

export default VisitorManagementPage
