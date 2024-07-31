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
import { useFacility } from "@zustand/facility/useFacility";
import { GetFacilityBookingList } from "@zustand/types";
import moment from "moment";
import "moment-timezone"
import { FacilityName } from "@config/constant/facility"
import { useRouter } from "next/navigation";
import CancelBookingDialog from "@components/dialog/CancelBookingDialog";
import { Badge } from "@components/ui/badge"

const FacilityPage = () => {
  const getBookingHistory = useFacility((state) => state.getBookingHistory);
  const [bookingHistory, setBookingHistory] = useState<GetFacilityBookingList[]>([]);
  const [openCancelDialog, setOpenCancelDialog] = useState(false)
  const [selectedBookingId, setSelectedBookingId] = useState("")
  const router = useRouter();

  const columns: ColumnDef<GetFacilityBookingList>[] = [
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
      accessorKey: "bookingId",
      header: "Id",
      cell: ({ row }) => (
        <div>{
          row.getValue("bookingId")
        }</div>
      ),
    },
    {
      accessorKey: "facilityId",
      header: "Facility",
      cell: ({ row }) => (
        <div className="capitalize">{
          FacilityName[row.getValue("facilityId") as string]
        }</div>
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
      accessorKey: "bookedBy",
      header: "Created By",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("bookedBy")}</div>
      ),
    },
    {
      accessorKey: "isCancelled",
      header: "Status",
      cell: ({ row }) => (
        <div>
          {row.getValue("isCancelled") ? (
            <>
              Cancelled
            </>
          ): (
            <>
              -
            </>
          )}
        </div>
      ),
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
              {
                moment(row.getValue("startDate")).tz('Asia/Kuala_Lumpur') > moment().tz('Asia/Kuala_Lumpur') ? (
                  row.getValue("isCancelled") ? (
                    <Badge className="w-full bg-red-500 text-center">Cancelled</Badge>
                  ) : (
                    <DropdownMenuItem onClick={() => {openCancelBookingDialog(row.getValue("bookingId"))}}>Cancel Booking</DropdownMenuItem>
                  )
                ) : 
                (
                  <div className="flex justify-center">
                    <Badge className="w-full bg-red-500 text-center">Expired Booking</Badge>
                  </div>
                )
              }
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  
  const openCancelBookingDialog = (bookingId: string) => {
    setOpenCancelDialog(true)
    setSelectedBookingId(bookingId)
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getBookingHistory();
      setBookingHistory(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <CancelBookingDialog open={openCancelDialog} setOpen={setOpenCancelDialog} bookingId={selectedBookingId}/>
      <div className="flex flex-row justify-between">
        <h3 className="text-3xl font-bold text-black">Facility</h3>
        <Button 
          className="flex items-center gap-1"
          onClick={() => {
            router.push("/facility/create-booking")
          }}
        >
          <RiAddBoxLine className="text-xl" />
          <p className="flex items-center text-center">Create</p>
        </Button>
      </div>
      <div className="mt-5 w-full">
        <CustomTable 
          data={bookingHistory}
          columns={columns}
        />
      </div>
    </>
  );
};

export default FacilityPage;
