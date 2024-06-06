"use client"

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const BookingUploadPage = () => {
    const router = useRouter();
    return (
        <>
        <div className="flex flex-row justify-between">
            <h3 className="text-3xl font-bold text-black">Create new booking</h3>
            <Button
                className="flex items-center gap-1"
                onClick={() => {
                    router.push("/facility/create-facility");
            }}
            >
            <p className="flex items-center text-center">Submit</p>
            </Button>
        </div>
        <div className="mt-5">
        </div>
        </>
    );
};

export default BookingUploadPage;
