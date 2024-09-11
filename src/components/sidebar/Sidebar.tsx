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
import { usePathname } from 'next/navigation'

interface SidebarProps {
    menuList: any
    isCollapsed: boolean
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ isCollapsed, setIsCollapsed, menuList }: SidebarProps) => {
    const [isClient, setIsClient] = useState(false)
    const isMobileView = useMediaQuery('(max-width: 768px)')
    const path = usePathname()

    useEffect(() => {
        setIsClient(true)
        console.log(path)
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
                            </CommandList>
                        </Command>
                    </SheetContent>
                </Sheet>
            ) : (
                <div className="h-[100vh] lg:w-[20%] md:w-[30%]">
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
                        </CommandList>
                    </Command>
                </div>
            )}
        </>
    )
}

export default Sidebar
