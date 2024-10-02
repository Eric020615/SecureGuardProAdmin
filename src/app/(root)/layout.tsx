'use client'

import Navbar from '@components/navbar/Navbar'
import Sidebar from '@components/sidebar/Sidebar'
import React, { useState } from 'react'
import { LayoutDashboard, Newspaper, Building, CircleUser } from 'lucide-react'
import { useApplication } from '@zustand/index'
import CustomLoader from '@components/loader/Loader'
import TopLoader from '@components/loadingBar/LoadingBar'

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
    const { isLoading } = useApplication()

    return (
        <>
            <main className="w-full h-auto min-h-[100vh] relative">
                <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div className="flex bg-slate-50 min-h-[100vh]">
                    <Sidebar
                        isCollapsed={isCollapsed}
                        setIsCollapsed={setIsCollapsed}
                        menuList={menuList}
                    />
                    <div className="lg:w-[80%] md:w-[70%] max-w-full w-full">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center z-[9999] bg-white bg-opacity-50">
                                <CustomLoader />
                            </div>
                        )}
                        <TopLoader />
                        <div className="md:px-10 md:py-8 p-5">{children}</div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Layout
