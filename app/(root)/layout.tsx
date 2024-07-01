"use client"

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React, { useState } from "react";
import { useRouter } from 'next/navigation'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState("")
  if(false){
    router.replace('/sign-in')
    return;  
  }

  return (
    <main className="w-full">
      <Navbar />
      <div className="flex">
        <div className="hidden md:block h-[110vh] w-[350px]">
          <Sidebar />
        </div>
        <div className="w-full md:px-10 md:py-8 p-5 items-center justify-center">
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
