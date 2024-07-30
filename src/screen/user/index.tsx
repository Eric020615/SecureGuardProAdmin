"use client";

import { Button } from "@components/ui/button";
import React, { useEffect, useState } from "react";
import { RiAddBoxLine } from "react-icons/ri";
import {
  ColumnDef
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import CustomTable from "@components/Table";
import { GetUser } from "@zustand/types";
import moment from "moment";
import "moment-timezone"
import { useRouter } from "next/navigation";
import CustomDialog from "@components/dialog/CustomDialog";
import { useUserManagement } from "@zustand/userManagementService/userManagement";

const UserListPage = () => {
  const columns: ColumnDef<GetUser>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
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
      accessorKey: "userId",
      header: "User Id",
      cell: ({ row }) => (
        <div>{
          row.getValue("userId") as string
        }</div>
      ),
    },
    {
      accessorKey: "firstName",
      header: "First Name",
      cell: ({ row }) => (
        <div className="capitalize">{
          row.getValue("firstName") as string
        }</div>
      ),
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
      cell: ({ row }) => (
        <div className="capitalize">{
          row.getValue("lastName") as string
        }</div>
      ),
    },
    {
      accessorKey: "contactNumber",
      header: "Contact Number",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("contactNumber")}</div>
      ),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("gender")}</div>
      ),
    },
    {
      accessorKey: "role",
      header: "User Type",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("role")}</div>
      ),
    },
    {
      accessorKey: "dateOfBirth",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            DOB
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{
        moment(row.getValue("dateOfBirth")).format("DD MMM YYYY")
      }</div>,
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      cell: ({ row }) => (
        <div>{row.getValue("createdBy")}</div>
      ),
    },
    {
      accessorKey: "createdDateTime",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{
        moment(row.getValue("updatedDateTime")).tz('Asia/Kuala_Lumpur').format("DD MMM YYYY, HH:mm")
      }</div>,
    },
    {
      accessorKey: "updatedBy",
      header: "Updated By",
      cell: ({ row }) => (
        <div>{row.getValue("updatedBy")}</div>
      ),
    },
    {
      accessorKey: "updatedDateTime",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Update time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{
        moment(row.getValue("updatedDateTime")).tz('Asia/Kuala_Lumpur').format("DD MMM YYYY, HH:mm")
      }</div>,
    },
    {
      id: "actions",
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
              <DropdownMenuItem onClick={() => {openEditDialog(row.getValue("userId"))}}>Edit User</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {customDialog(row.getValue("userId"))}}>Delete User</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const { getUserList } = useUserManagement();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [userList, setUserList] = useState<GetUser[]>([]);
  const router = useRouter()
  const [openEditUserDialog, setOpenEditUserDialog] = useState(false)
  const [openCustomDialog, setOpenCustomDialog] = useState(false)
  const [UserId, setUserId] = useState("")

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getUserList();
    setUserList(response.data);
  };

  const openEditDialog = async (UserId: string) => {
    setOpenEditUserDialog(true)
    setUserId(UserId)
  }

  const customDialog = async (UserId: string) => {
    setOpenCustomDialog(true)
    setSelectedUserId(UserId)
  }

  return (
    <>
      <CustomDialog 
        title="Are you sure to delete this User?"
        subtitle="Changes are irrevisible"
        open={openCustomDialog}
        setOpen={setOpenCustomDialog}
        isConfirm={() => {}}/>
      <div className="flex flex-row justify-between">
        <h3 className="text-3xl font-bold text-black">User</h3>
        <Button 
          className="flex items-center gap-1"
          onClick={() => {
            router.push("/User/create-User")
          }}
        >
          <RiAddBoxLine className="text-xl" />
          <p className="flex items-center text-center">Create</p>
        </Button>
      </div>
      <div className="mt-5 w-full">
        <CustomTable 
          data={userList}
          columns={columns}
        />
      </div>
    </>
  );
};

export default UserListPage;
