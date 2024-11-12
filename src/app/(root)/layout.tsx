'use client'

import Navbar from '@components/navbar/Navbar'
import Sidebar from '@components/sidebar/Sidebar'
import React, { useEffect, useState } from 'react'
import { LayoutDashboard, Newspaper, Building, CircleUser, Users } from 'lucide-react'
import { useApplication } from '@store/application/useApplication'
import CustomLoader from '@components/loader/Loader'
import { useMediaQuery } from 'usehooks-ts'

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
            {
                link: '/visitor',
                text: 'Visitor Management',
                icon: <Users className="mr-2 h-5 w-5" />,
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
        ],
    },
]

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { isLoading } = useApplication()
    const isMobileView = useMediaQuery('(max-width: 768px)')
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        // Set mounted to true once component mounts on the client
        setIsMounted(true)
    }, [])

    return (
        <>
            <main className="w-full h-screen relative flex flex-col">
                <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div className="flex flex-1 overflow-hidden bg-slate-50">
                    <aside className="flex-shrink-0 h-full bg-white">
                        <div
                            className={`h-full overflow-y-auto ${ isMounted ? (isMobileView ? 'w-0' : 'w-64') : 'w-0' } transition-width duration-300`}
                        >
                            <Sidebar
                                isCollapsed={isCollapsed}
                                setIsCollapsed={setIsCollapsed}
                                menuList={menuList}
                            />
                        </div>
                    </aside>
                    <section className="flex-1 h-full overflow-y-auto relative">
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center z-[9999] bg-white bg-opacity-50">
                                <CustomLoader />
                            </div>
                        )}
                        <div className="md:px-10 md:py-8 p-5">{children}</div>
                    </section>
                </div>
            </main>
        </>
    )
}

export default Layout
