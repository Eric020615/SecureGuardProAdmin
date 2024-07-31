'use client'

import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import React, { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isMobileView = useMediaQuery('(max-width: 768px)')
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <main className="w-full h-auto min-h-[100vh]">
            <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className="flex">
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div className="w-full flex justify-center">
                    <div className="max-w-[1340px] md:px-10 md:py-8 p-5">{children}</div>
                </div>
            </div>
        </main>
    )
}

export default Layout
