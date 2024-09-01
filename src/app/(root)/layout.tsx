"use client";

import CustomLoader from '@components/Loader'
import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import { useApplication } from '@zustand/index'
import React, { useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { isLoading } = useApplication()
    return (
        <>
            <main className="w-full h-auto min-h-[100vh] relative">
                <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div className="flex bg-slate-50 min-h-[100vh]">
                    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                    <div className="lg:w-[80%] md:w-[70%] max-w-full w-full">
                        <div className="md:px-10 md:py-8 p-5">{children}</div>
                    </div>
                </div>
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-[9999] bg-white bg-opacity-50">
                        <CustomLoader />
                    </div>
                )}
            </main>
        </>
    )
}

export default Layout
