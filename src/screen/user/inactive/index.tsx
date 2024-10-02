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
import CustomTable from '@components/table/Table'
import { GetUser } from '@zustand/types'
import { useRouter } from 'next/navigation'
import CustomDialog from '@components/dialog/CustomDialog'
import { useUserManagement } from '@zustand/userManagement/useUserManagement'
import { convertUTCStringToLocalDateString } from '@lib/time'
import { ITimeFormat } from '@config/constant'
import { useApplication } from '@zustand/index'

const InactiveUserList = () => {
    const { getUserList } = useUserManagement()
    const { setIsLoading } = useApplication()
    const [selectedUserId, setSelectedUserId] = useState('')
    const [userList, setUserList] = useState<GetUser[]>([])
    const router = useRouter()
    const [openEditUserDialog, setOpenEditUserDialog] = useState(false)
    const [openCustomDialog, setOpenCustomDialog] = useState(false)
    const [userId, setUserId] = useState('')
    const [page, setPage] = useState(0)
    const [totalRecords, setTotalRecords] = useState(0)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setIsLoading(true)
            const response = await getUserList(false)
            if (response.success) {
                setUserList(response.data)
            } else {
                console.log(response.msg)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const openEditDialog = async (userId: string) => {
        setOpenEditUserDialog(true)
        setUserId(userId)
    }

    const customDialog = async (userId: string) => {
        setOpenCustomDialog(true)
        setSelectedUserId(userId)
    }

    const columns: ColumnDef<GetUser>[] = [
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
            accessorKey: 'userId',
            header: 'User Id',
            cell: ({ row }) => <div>{row.getValue('userId') as string}</div>,
        },
        {
            accessorKey: 'firstName',
            header: 'First Name',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('firstName') as string}</div>
            ),
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('lastName') as string}</div>
            ),
        },
        {
            accessorKey: 'contactNumber',
            header: 'Contact Number',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('contactNumber')}</div>
            ),
        },
        {
            accessorKey: 'gender',
            header: 'Gender',
            cell: ({ row }) => <div className="capitalize">{row.getValue('gender')}</div>,
        },
        {
            accessorKey: 'role',
            header: 'User Type',
            cell: ({ row }) => <div className="capitalize">{row.getValue('role')}</div>,
        },
        {
            accessorKey: 'dateOfBirth',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        DOB
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">
                    {convertUTCStringToLocalDateString(
                        row.getValue('dateOfBirth'),
                        ITimeFormat.date
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'createdBy',
            header: 'Created By',
            cell: ({ row }) => <div>{row.getValue('createdBy')}</div>,
        },
        {
            accessorKey: 'createdDateTime',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Created time
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">
                    {convertUTCStringToLocalDateString(
                        row.getValue('createdDateTime'),
                        ITimeFormat.dateTime
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'updatedBy',
            header: 'Updated By',
            cell: ({ row }) => <div>{row.getValue('updatedBy')}</div>,
        },
        {
            accessorKey: 'updatedDateTime',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        Update time
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => (
                <div className="capitalize">
                    {convertUTCStringToLocalDateString(
                        row.getValue('updatedDateTime'),
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
                                    openEditDialog(row.getValue('userId'))
                                }}
                            >
                                Edit User
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    customDialog(row.getValue('userId'))
                                }}
                            >
                                Delete User
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
    return (
        <CustomTable
            data={userList}
            columns={columns}
            onView={(row: Row<any>) => {
                router.push(`/user/${row.getValue('userId')}`)
            }}
            totalRecords={totalRecords}
            recordsPerPage={10}
            currentPage={page}
            setCurrentPage={setPage}
        />
    )
}

export default InactiveUserList
