'use client'

import React, { useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import CustomTable from '@components/table/Table'
import { useUserManagement } from '@store/userManagement/useUserManagement'
import { useRouter } from 'nextjs-toploader/app'
import { ArrowUpDown } from 'lucide-react'
import { Checkbox } from '@components/ui/checkbox'
import { ColumnDef, Row } from '@tanstack/react-table'
import { GetUserDto } from '@dtos/user-management/userManagement.dto'
import { Button } from '@components/ui/button'
import { ITimeFormat, PaginationDirection } from '@config/constant'
import { convertDateStringToFormattedString } from '@lib/time'

const UserManagementPage = () => {
    const {
        getUserListAction,
        userList,
        currentPage,
        totalUserList,
        resetUserListAction,
    } = useUserManagement()
    const router = useRouter()

    useEffect(() => {
        resetUserListAction()
        fetchUserList()
    }, [])

    const fetchUserList = async (
        direction = PaginationDirection.Next,
        isActive = true
    ) => {
        await getUserListAction(isActive, direction, 10)
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
                    className="text-center"
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
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="flex items-center justify-center w-full text-left"
                >
                    User Id
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="text-center">{row.getValue('userId') as string}</div>
            ),
            size: 100, // Fixed width
        },
        {
            accessorKey: 'userName',
            header: 'Username',
            cell: ({ row }) => (
                <div className="text-center capitalize">
                    {row.getValue('userName') as string}
                </div>
            ),
            size: 150, // Fixed width
        },
        {
            accessorKey: 'firstName',
            header: 'First Name',
            cell: ({ row }) => (
                <div className="text-center capitalize">
                    {row.getValue('firstName') as string}
                </div>
            ),
            size: 150, // Fixed width
        },
        {
            accessorKey: 'lastName',
            header: 'Last Name',
            cell: ({ row }) => (
                <div className="text-center capitalize">
                    {row.getValue('lastName') as string}
                </div>
            ),
            size: 150, // Fixed width
        },
        {
            accessorKey: 'role',
            header: 'User Type',
            cell: ({ row }) => (
                <div className="text-center capitalize">{row.getValue('role')}</div>
            ),
            size: 100, // Fixed width
        },
        {
            accessorKey: 'createdDateTime',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="flex items-center justify-center w-full text-left"
                >
                    Created time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="text-center">
                    {convertDateStringToFormattedString(
                        row.getValue('createdDateTime'),
                        ITimeFormat.dateTime
                    )}
                </div>
            ),
            size: 150, // Fixed width
        },
        {
            accessorKey: 'updatedDateTime',
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="flex items-center justify-center w-full text-left"
                >
                    Updated time
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="text-center">
                    {convertDateStringToFormattedString(
                        row.getValue('updatedDateTime'),
                        ITimeFormat.dateTime
                    )}
                </div>
            ),
            size: 150, // Fixed width
        },
    ]

    return (
        <>
            <div className="flex flex-row justify-between mb-4">
                <h3 className="text-3xl font-bold text-black">User</h3>
            </div>
            <div className="mt-5 w-full">
                <Tabs
                    defaultValue="active"
                    onValueChange={(value) => {
                        fetchUserList(PaginationDirection.Next, value === 'active')
                    }}
                >
                    <TabsList>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="inactive">Inactive</TabsTrigger>
                    </TabsList>
                    <TabsContent value="active">
                        <div className="overflow-x-auto table-auto w-full">
                            <CustomTable
                                data={userList}
                                columns={columns}
                                onView={(row: Row<GetUserDto>) => {
                                    router.push(`/user/${row.original.userGuid}`)
                                }}
                                currentPage={currentPage}
                                totalRecords={totalUserList}
                                recordsPerPage={10}
                                fetchNext={() => fetchUserList(PaginationDirection.Next)}
                                fetchPrev={() =>
                                    fetchUserList(PaginationDirection.Previous)
                                }
                            />
                        </div>
                    </TabsContent>
                    <TabsContent value="inactive">
                        <div className="overflow-x-auto table-auto w-full">
                            <CustomTable
                                data={userList}
                                columns={columns}
                                onView={(row: Row<GetUserDto>) => {
                                    router.push(`/user/${row.original.userGuid}`)
                                }}
                                currentPage={currentPage}
                                totalRecords={totalUserList}
                                recordsPerPage={10}
                                fetchNext={() =>
                                    fetchUserList(PaginationDirection.Next, false)
                                }
                                fetchPrev={() =>
                                    fetchUserList(PaginationDirection.Previous, false)
                                }
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default UserManagementPage
