'use client'

import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import React, { useState } from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    return (
        <main className="w-full h-auto min-h-[100vh]">
            <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <div className="flex">
                <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div className="lg:w-[80%] md:w-[70%] max-w-full">
                  <div className="md:px-10 md:py-8 p-5">{children}</div>
                </div>
            </div>
        </main>
    )
}

export default Layout
