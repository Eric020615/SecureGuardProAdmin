"use client";

import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import React, { useState } from 'react'
import { LayoutDashboard, Newspaper, Building, CircleUser } from 'lucide-react'

const menuList = [
    {
        group: 'General',
        items: [
            {
                link: '/',
                text: 'Dashboard',
                icon: <LayoutDashboard className="mr-2 h-5 w-5" />,
            },
            {
                link: '/facility',
                text: 'Facility Management',
                icon: <Building className="mr-2 h-5 w-5" />,
            },
            {
                link: '/notice',
                text: 'Notices Management',
                icon: <Newspaper className="mr-2 h-5 w-5" />,
            },
            {
                link: '/user',
                text: 'User Management',
                icon: <CircleUser className="mr-2 h-5 w-5" />,
            },
        ],
    },
    {
        group: 'Settings',
        items: [
            {
                link: '/profile',
                text: 'Profile',
            },
            {
                link: '/settings',
                text: 'Settings',
            },
        ],
    },
]

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    return (
        <>
            <main className="w-full h-auto min-h-[100vh] relative">
                <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div className="flex bg-slate-50 min-h-[100vh]" >
                    <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} menuList={menuList}/>
                    <div className="lg:w-[80%] md:w-[70%] max-w-full w-full">
                        <div className="md:px-10 md:py-8 p-5">{children}</div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Layout
