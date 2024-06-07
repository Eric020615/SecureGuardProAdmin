"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import CustomSelect from "@/components/Select";
import { FacilitySelect } from "@/config";
import moment from "moment";
import "moment-timezone";
import CustomDatePicker from "@/components/DatePicker";
import { useFacility } from "../../../zustand/facilityService/facility";

const formSchema = z
  .object({
    user: z.string().min(1, {
      message: "Target user is required",
    }),
    facilityId: z.string().min(1, {
      message: "Facility is required to be selected",
    }),
    date: z.date(),
    startTime: z.string().min(1, {
      message: "Start Time is required",
    }),
    endTime: z.string().min(1, {
      message: "End Time is required",
    }),
    numOfGuest: z.string().min(1, {
      message: "Number of Guests is required",
    }),
  })
  .refine((data) => data.endTime > data.startTime, {
    path: ["endTime"],
    message: "End Date must be after Start Date",
  });

const NoticeUploadPage = () => {
  const router = useRouter();
  const createBooking = useFacility((state) => state.createBooking);
  const [facility, setFacility] = useState("");
  const [date, setDate] = useState<Date | undefined>(moment().toDate());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      facilityId: "",
      date: date,
      startTime: "",
      endTime: "",
      user: "",
      numOfGuest: ""
    },
  });

  useEffect(() => {
    form.setValue("facilityId", facility);
  }, [facility]);

  useEffect(() => {
    form.setValue("date", date ? date: moment().toDate());
  }, [date])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    let startTimeSplit = values.startTime.split(":");
    let endTimeSplit = values.endTime.split(":");
    let startDate = moment(values.date).hour(parseInt(startTimeSplit[0])).minute(parseInt(startTimeSplit[1]));
    let endDate = moment(values.date).hour(parseInt(endTimeSplit[0])).minute(parseInt(endTimeSplit[1]));
    const response = await createBooking({
        facilityId: values.facilityId,
        userGUID: values.user,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numOfGuest: parseInt(values.numOfGuest)
    });
    if(response.success){
        router.push("/facility")
    }
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <h3 className="text-3xl font-bold text-black">Create new notice</h3>
      </div>
      <div className="mt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="user"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>User</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="User Id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facilityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facility</FormLabel>
                  <FormControl>
                    <CustomSelect
                      title="Select a facility"
                      selectLabel="Facility"
                      selectItem={FacilitySelect}
                      onDataChange={setFacility}
                      value={facility}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <CustomDatePicker
                      title="Select a date"
                      selectedDate={date}
                      setSelectedDate={setDate}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Time</FormLabel>
                  <FormControl>
                    <Input type="time" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Time</FormLabel>
                  <FormControl>
                    <Input type="time" placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numOfGuest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Guest</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <CustomDatePicker
                      title="Select a end date"
                      selectedDate={startDate}
                      setSelectedDate={setStartDate}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </>
  );
};

export default NoticeUploadPage;