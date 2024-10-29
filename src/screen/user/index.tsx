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
import { Badge } from '@components/ui/badge'

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
                <div className="flex items-center justify-center h-full">
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
                <div className="flex items-center justify-center h-full">
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
            accessorKey: 'userId',
            header: ({ column }) => (
                <div className="flex items-center justify-center h-full">
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
                <div className="flex items-center justify-center h-full">
                    {row.getValue('userId') as string}
                </div>
            ),
        },
        {
            accessorKey: 'userName',
            header: () => (
                <div className="flex items-center justify-center h-full">Username</div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center h-full capitalize">
                    {row.getValue('userName') as string}
                </div>
            ),
        },
        {
            accessorKey: 'firstName',
            header: () => (
                <div className="flex items-center justify-center h-full">First Name</div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center h-full capitalize">
                    {row.getValue('firstName') as string}
                </div>
            ),
        },
        {
            accessorKey: 'lastName',
            header: () => (
                <div className="flex items-center justify-center h-full">Last Name</div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center h-full capitalize">
                    {row.getValue('lastName') as string}
                </div>
            ),
        },
        {
            accessorKey: 'gender',
            header: () => (
                <div className="flex items-center justify-center h-full">Gender</div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center h-full capitalize">
                    {row.getValue('gender') as string}
                </div>
            ),
        },
        {
            accessorKey: 'contactNumber',
            header: () => (
                <div className="flex items-center justify-center h-full">
                    Contact Number
                </div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center h-full capitalize">
                    {row.getValue('contactNumber') as string}
                </div>
            ),
        },
        {
            accessorKey: 'role',
            header: () => (
                <div className="flex items-center justify-center h-full">Role</div>
            ),
            cell: ({ row }) => (
                <div className="flex items-center justify-center h-full capitalize">
                    {row.getValue('role') as string}
                </div>
            ),
        },
        {
            accessorKey: 'userStatus',
            header: () => (
                <div className="flex items-center justify-center h-full">User Status</div>
            ),
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-[100px]">
                            <Badge
                                className={`w-full ${
                                    row.getValue('userStatus') === 'Active'
                                        ? 'bg-green-500'
                                        : row.getValue('userStatus') === 'Inactive'
                                          ? 'bg-orange-500'
                                          : 'bg-gray-500' // Default color for other statuses
                                } flex justify-center`}
                            >
                                <span>{row.getValue('userStatus')}</span>
                            </Badge>
                        </div>
                    </div>
                )
            },
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
