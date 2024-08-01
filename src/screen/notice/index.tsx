"use client";

import { Button } from "@components/ui/button";
import React, { useEffect, useState } from "react";
import { RiAddBoxLine } from "react-icons/ri";
import {
  ColumnDef,
  Row
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
import { useNotice } from "@zustand/notice/useNotice";
import { DeleteNotice, GetNoticeList } from "@zustand/types";
import moment from "moment";
import "moment-timezone"
import { useRouter } from "next/navigation";
import EditNoticeDialog from "@components/dialog/EditNoticeDialog";
import CustomDialog from "@components/dialog/CustomDialog";

const NoticePage = () => {
  const columns: ColumnDef<GetNoticeList>[] = [
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
      accessorKey: "noticeId",
      header: "Id",
      cell: ({ row }) => (
        <div>{
          row.getValue("noticeId") as string
        }</div>
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => (
        <div className="capitalize">{
          row.getValue("title") as string
        }</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "startDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Start Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{
        moment(row.getValue("startDate")).tz('Asia/Kuala_Lumpur').format("DD MMM YYYY, HH:mm")
      }</div>,
    },
    {
      accessorKey: "endDate",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            End Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{
        moment(row.getValue("endDate")).tz('Asia/Kuala_Lumpur').format("DD MMM YYYY, HH:mm")
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
              <DropdownMenuItem onClick={() => {openEditDialog(row.getValue("noticeId"))}}>Edit Notice</DropdownMenuItem>
              <DropdownMenuItem onClick={() => {customDialog(row.getValue("noticeId"))}}>Delete Notice</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const getNotice = useNotice((state) => state.getNotice);
  const deleteNoticeById = useNotice((state) => state.deleteNoticeById);
  const [selectedNoticeId, setSelectedNoticeId] = useState("");
  const [noticeHistory, setNoticeHistory] = useState<GetNoticeList[]>([]);
  const router = useRouter()
  const [openEditNoticeDialog, setOpenEditNoticeDialog] = useState(false)
  const [openCustomDialog, setOpenCustomDialog] = useState(false)
  const [noticeId, setNoticeId] = useState("")

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await getNotice();
    setNoticeHistory(response.data);
  };

  const openEditDialog = async (noticeId: string) => {
    setOpenEditNoticeDialog(true)
    setNoticeId(noticeId)
  }

  const customDialog = async (noticeId: string) => {
    setOpenCustomDialog(true)
    setSelectedNoticeId(noticeId)
  }

  const isConfirm = async () => {
    let deleteNotice : DeleteNotice = {
      noticeId: selectedNoticeId
    }
    const response = await deleteNoticeById(deleteNotice);
    if(response.success){
      window.location.reload();
    }
    else{
      console.log(response.message)
    }
  }

  return (
    <>
      <EditNoticeDialog open={openEditNoticeDialog} setOpen={setOpenEditNoticeDialog} noticeId={noticeId}/>
      <CustomDialog 
        title="Are you sure to delete this notice?"
        subtitle="Changes are irrevisible"
        open={openCustomDialog}
        setOpen={setOpenCustomDialog}
        isConfirm={isConfirm}/>
      <div className="flex flex-row justify-between">
        <h3 className="text-3xl font-bold text-black">Notice</h3>
        <Button 
          className="flex items-center gap-1"
          onClick={() => {
            router.push("/notice/create-notice")
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
          onView={(row: Row<any>) => {
            
          }}
        />
      </div>
    </>
  );
};

export default NoticePage;
