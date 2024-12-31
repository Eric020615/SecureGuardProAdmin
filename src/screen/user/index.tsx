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
import { PaginationDirectionEnum } from '@config/constant'
import { Badge } from '@components/ui/badge'
import { tableStyles } from '@screen/style'
import { GenderDescriptionEnum, RoleDescriptionEnum } from '@config/constant/user'

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
        direction = PaginationDirectionEnum.Next,
        isActive = true
    ) => {
        await getUserListAction(isActive, direction, 10)
    }

    const columns: ColumnDef<GetUserDto>[] = [
        {
            id: 'select',
            header: ({ table }) => (
                <div className={tableStyles.headerStyle}>
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
                <div className={tableStyles.dateCellStyle}>
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
                <div className={tableStyles.headerStyle}>
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
                <div className={tableStyles.dateCellStyle}>
                    {row.getValue('userId') as string}
                </div>
            ),
        },
        {
            accessorKey: 'userName',
            header: () => <div className={tableStyles.headerStyle}>Username</div>,
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
                    {row.getValue('userName') as string}
                </div>
            ),
        },
        {
            accessorKey: 'firstName',
            header: () => <div className={tableStyles.headerStyle}>First Name</div>,
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
                    {row.getValue('firstName') as string}
                </div>
            ),
        },
        {
            accessorKey: 'lastName',
            header: () => <div className={tableStyles.headerStyle}>Last Name</div>,
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
                    {row.getValue('lastName') as string}
                </div>
            ),
        },
        {
            accessorKey: 'gender',
            header: () => <div className={tableStyles.headerStyle}>Gender</div>,
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
                    {
                        GenderDescriptionEnum[
                            row.getValue('gender') as keyof typeof GenderDescriptionEnum
                        ]
                    }
                </div>
            ),
        },
        {
            accessorKey: 'contactNumber',
            header: () => <div className={tableStyles.headerStyle}>Contact Number</div>,
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
                    {row.getValue('contactNumber') as string}
                </div>
            ),
        },
        {
            accessorKey: 'role',
            header: () => <div className={tableStyles.headerStyle}>Role</div>,
            cell: ({ row }) => (
                <div className={`${tableStyles.dateCellStyle} capitalize`}>
                    {
                        RoleDescriptionEnum[
                            row.getValue('role') as keyof typeof RoleDescriptionEnum
                        ]
                    }
                </div>
            ),
        },
        {
            accessorKey: 'userStatus',
            header: () => <div className={tableStyles.headerStyle}>User Status</div>,
            cell: ({ row }) => {
                const statusValue = row.getValue('userStatus') as string
                return (
                    <div className={tableStyles.dateCellStyle}>
                        <Badge
                            className={`w-full ${
                                statusValue === 'Active'
                                    ? tableStyles.badgeColor.active
                                    : tableStyles.badgeColor.default
                            } flex justify-center`}
                        >
                            <span>{statusValue}</span>
                        </Badge>
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
                        resetUserListAction()
                        fetchUserList(PaginationDirectionEnum.Next, value === 'active')
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
                                fetchNext={() =>
                                    fetchUserList(PaginationDirectionEnum.Next)
                                }
                                fetchPrev={() =>
                                    fetchUserList(PaginationDirectionEnum.Previous)
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
                                    fetchUserList(PaginationDirectionEnum.Next, false)
                                }
                                fetchPrev={() =>
                                    fetchUserList(PaginationDirectionEnum.Previous, false)
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
