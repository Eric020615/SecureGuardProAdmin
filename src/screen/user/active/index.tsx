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
import { useRouter } from 'nextjs-toploader/app';
import { useUserManagement } from '@store/userManagement/useUserManagement'
import { ITimeFormat, PaginationDirection } from '@config/constant'
import { GetUserDto } from '@dtos/user-management/userManagement.dto'
import { convertDateStringToFormattedString } from '@lib/time'

const ActiveUserList = () => {
    const { getUserListAction, userList, currentPage, totalUserList, resetUserListAction } =
        useUserManagement()
    const [selectedUserId, setSelectedUserId] = useState('')
    const router = useRouter()
    const [openEditUserDialog, setOpenEditUserDialog] = useState(false)
    const [openCustomDialog, setOpenCustomDialog] = useState(false)
    const [userId, setUserId] = useState('')

    useEffect(() => {
        resetUserListAction()
        fetchActiveUserList()
    }, [])

    const fetchActiveUserList = async (direction: PaginationDirection = PaginationDirection.Next) => {
        await getUserListAction(true, direction, 10)
    }

    const openEditDialog = async (userId: string) => {
        setOpenEditUserDialog(true)
        setUserId(userId)
    }

    const customDialog = async (userId: string) => {
        setOpenCustomDialog(true)
        setSelectedUserId(userId)
    }

    const columns: ColumnDef<GetUserDto>[] = [
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
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === 'asc')
                        }
                    >
                        User Id
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
            cell: ({ row }) => <div>{row.getValue('userId') as string}</div>,
        },
        {
            accessorKey: 'userGuid',
            header: () => null,
            cell: () => null,
            enableHiding: true,
        },
        {
            accessorKey: 'userName',
            header: 'Username',
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue('userName') as string}</div>
            ),
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
                    {convertDateStringToFormattedString(
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
                    {convertDateStringToFormattedString(
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
                    {convertDateStringToFormattedString(
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
                router.push(`/user/${row.getValue('userGuid')}`)
            }}
            currentPage={currentPage}
            totalRecords={totalUserList}
            recordsPerPage={10}
            fetchNext={() => {
                fetchActiveUserList(PaginationDirection.Next)
            }}
            fetchPrev={() => {
                fetchActiveUserList(PaginationDirection.Previous)
            }}
        />
    )
}

export default ActiveUserList
