'use client'

import Navbar from '@components/navbar/Navbar'
import Sidebar from '@components/sidebar/Sidebar'
import React, { useEffect, useMemo, useState } from 'react'
import {
    LayoutDashboard,
    Newspaper,
    Building,
    CircleUser,
    Users,
    ScanBarcode,
} from 'lucide-react'
import { useApplication } from '@store/application/useApplication'
import CustomLoader from '@components/loader/Loader'
import { useMediaQuery } from 'usehooks-ts'
import { useAuth } from '@store/auth/useAuth'
import { useSession } from '../../context/SessionContext'

const fullMenuList = [
    {
        group: 'General',
        items: [
            {
                link: '/',
                text: 'Dashboard',
                icon: <LayoutDashboard className="mr-2 h-5 w-5" />,
                roles: ['SA'], // Allowed roles
            },
            {
                link: '/visitor/check-in',
                text: 'Check-In',
                icon: <ScanBarcode className="mr-2 h-5 w-5" />,
                roles: ['STF'], // Allowed roles
            },
            {
                link: '/facility',
                text: 'Facility Management',
                icon: <Building className="mr-2 h-5 w-5" />,
                roles: ['SA'], // Only SA
            },
            {
                link: '/notice',
                text: 'Notices Management',
                icon: <Newspaper className="mr-2 h-5 w-5" />,
                roles: ['SA'], // Only SA
            },
            {
                link: '/user',
                text: 'User Management',
                icon: <CircleUser className="mr-2 h-5 w-5" />,
                roles: ['SA'], // Only SA
            },
            {
                link: '/visitor',
                text: 'Visitor Management',
                icon: <Users className="mr-2 h-5 w-5" />,
                roles: ['SA'], // Only SA
            },
        ],
    },
    {
        group: 'Settings',
        items: [
            {
                link: '/profile',
                text: 'Profile',
                roles: ['SA', 'STF'], // Both SA and STF
            },
        ],
    },
]

interface MenuItem {
    link: string // URL link for the menu item
    text: string // Display text for the menu item
    icon?: React.ReactNode // Icon component (optional)
    roles: string[] // Allowed roles
}

interface MenuGroup {
    group: string // Group name
    items: MenuItem[] // List of menu items within the group
}

type MenuList = MenuGroup[] // Full menu list type

const Layout = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { isLoading } = useApplication()
    const { authTokenPayload } = useAuth()
    const isMobileView = useMediaQuery('(max-width: 768px)')
    const [isMounted, setIsMounted] = useState(false)
    const [filteredMenuList, setFilteredMenuList] = useState<MenuList>([]) // Use state for filtered menu list
    const session = useSession()

    useEffect(() => {
        // Set mounted to true once component mounts on the client
        setIsMounted(true)
        session.fetchSession()
    }, [])

    // Ensure the menu updates dynamically when authTokenPayload.role updates
    useEffect(() => {
        setFilteredMenuList(
            fullMenuList.map((menuGroup) => ({
                ...menuGroup,
                items: menuGroup.items.filter((item) =>
                    item.roles.includes(authTokenPayload.role)
                ),
            }))
        )
    }, [authTokenPayload])

    return (
        <>
            <main className="w-full h-screen relative flex flex-col">
                <Navbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
                <div className="flex flex-1 overflow-hidden bg-slate-50">
                    <aside className="flex-shrink-0 h-full bg-white">
                        <div
                            className={`h-full overflow-y-auto ${
                                isMounted ? (isMobileView ? 'w-0' : 'w-64') : 'w-0'
                            } transition-width duration-300`}
                        >
                            <Sidebar
                                isCollapsed={isCollapsed}
                                setIsCollapsed={setIsCollapsed}
                                menuList={filteredMenuList} // Pass filtered menu list
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
