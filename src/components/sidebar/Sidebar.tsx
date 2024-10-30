'use client'

import React, { useEffect, useState } from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '../ui/command'
import Link from 'next/link'
import { useMediaQuery } from 'usehooks-ts'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '../ui/sheet'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { useAuth } from '@store/auth/useAuth'

interface SidebarProps {
    menuList: any
    isCollapsed: boolean
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ isCollapsed, setIsCollapsed, menuList }: SidebarProps) => {
    const [isClient, setIsClient] = useState(false)
    const isMobileView = useMediaQuery('(max-width: 768px)')
    const path = usePathname()
    const logOutAction = useAuth((state) => state.logOutAction)
    const router = useRouter()

    const handleLogout = () => {
        logOutAction()
        router.replace('/sign-up')
    }

    useEffect(() => {
        setIsClient(true)
    }, [])
    if (!isClient) return <></>

    return (
        <>
            {isMobileView ? (
                <Sheet
                    open={isCollapsed}
                    onOpenChange={() => {
                        setIsCollapsed(!isCollapsed)
                    }}
                >
                    <SheetContent side="left" className="w-[50%]">
                        <SheetHeader>
                            <SheetDescription></SheetDescription>
                        </SheetHeader>
                        <SheetTitle></SheetTitle>
                        <Command className="h-full w-full">
                            <CommandInput
                                className="text-base"
                                placeholder="Type a command or search..."
                            />
                            <CommandList>
                                <CommandEmpty className="text-base">
                                    No results found.
                                </CommandEmpty>
                                {menuList.map((menu: any, key: number) => (
                                    <CommandGroup key={key} heading={menu.group}>
                                        {menu.items.map((item: any, key: number) => (
                                            <CommandItem
                                                key={key}
                                                className={`text-base ${
                                                    path == item.link
                                                        ? 'bg-slate-700 text-white rounded-md' // Add your selected class here
                                                        : ''
                                                }`}
                                            >
                                                {item.icon}
                                                <Link
                                                    href={item.link}
                                                    className="text-base w-full"
                                                >
                                                    {item.text}
                                                </Link>
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                ))}
                                <hr className="my-2 border-t border-gray-300" />{' '}
                                {/* Horizontal Line */}
                                <CommandItem
                                    onSelect={handleLogout}
                                    className="text-base text-red-600 hover:bg-red-50 cursor-pointer flex items-center pl-3"
                                >
                                    <LogOut className="mr-2 h-5 w-5" />
                                    Log Out
                                </CommandItem>
                            </CommandList>
                        </Command>
                    </SheetContent>
                </Sheet>
            ) : (
                <div className="h-full">
                    <Command className="h-full w-full">
                        <CommandInput
                            className="text-base"
                            placeholder="Type a command or search..."
                        />
                        <CommandList>
                            <CommandEmpty className="text-base">
                                No results found.
                            </CommandEmpty>
                            {menuList.map((menu: any, key: number) => (
                                <CommandGroup key={key} heading={menu.group}>
                                    {menu.items.map((item: any, key: number) => (
                                        <CommandItem
                                            key={key}
                                            className={`text-base cursor-pointer ${
                                                path == item.link
                                                    ? 'bg-slate-700 text-white rounded-md' // Add your selected class here
                                                    : ''
                                            }`}
                                        >
                                            {item.icon}
                                            <Link
                                                href={item.link}
                                                className="text-base w-full"
                                            >
                                                {item.text}
                                            </Link>
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ))}
                            <hr className="m-2 border-t border-gray-300" />{' '}
                            {/* Horizontal Line */}
                            <CommandItem
                                onSelect={handleLogout}
                                className="text-base text-red-600 hover:bg-red-50 cursor-pointer flex items-center pl-3"
                            >
                                <LogOut className="mr-2 h-5 w-5" />
                                Log Out
                            </CommandItem>
                        </CommandList>
                    </Command>
                </div>
            )}
        </>
    )
}

export default Sidebar
