'use client'

import React, { useState } from 'react'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from './ui/command'
import Link from 'next/link'
import {
    LayoutDashboard,
    Newspaper,
    Building,
    CircleUser,
    ChevronRight,
} from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'
import { Button } from './ui/button'
import { Sheet, SheetContent } from './ui/sheet'
import { set } from 'date-fns'

interface SidebarProps {
    isCollapsed: boolean
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
    const isMobileView = useMediaQuery('(max-width: 768px)')
    return (
        <>
            {isMobileView ? (
                <Sheet
                    open={isCollapsed}
                    onOpenChange={() => {
                        setIsCollapsed(!isCollapsed)
                    }}
                >
                    <SheetContent side="left" className='w-[50%]'>
                        <Command className="h-full w-full">
                            <CommandInput
                                className="text-base"
                                placeholder="Type a command or search..."
                            />
                            <CommandList>
                                <CommandEmpty className="text-base">
                                    No results found.
                                </CommandEmpty>
                                <CommandGroup heading="Suggestions">
                                    <CommandItem>
                                        <LayoutDashboard className="mr-2 h-5 w-5" />
                                        <Link href="/" className="text-base">
                                            Dashboard
                                        </Link>
                                    </CommandItem>
                                    <CommandItem>
                                        <Building className="mr-2 h-5 w-5" />
                                        <Link href="/facility" className="text-base">
                                            Facility Management
                                        </Link>
                                    </CommandItem>
                                    <CommandItem>
                                        <Newspaper className="mr-2 h-5 w-5" />
                                        <Link href="/notice" className="text-base">
                                            Notices Management
                                        </Link>
                                    </CommandItem>
                                    <CommandItem>
                                        <CircleUser className="mr-2 h-5 w-5" />
                                        <Link href="/user" className="text-base">
                                            User Management
                                        </Link>
                                    </CommandItem>
                                </CommandGroup>
                                <CommandSeparator />
                                <CommandGroup heading="Settings">
                                    <CommandItem className="text-base">
                                        Profile
                                    </CommandItem>
                                    <CommandItem className="text-base">
                                        Billing
                                    </CommandItem>
                                    <CommandItem className="text-base">
                                        Settings
                                    </CommandItem>
                                </CommandGroup>
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
                            <CommandGroup heading="Suggestions">
                                <CommandItem>
                                    <LayoutDashboard className="mr-2 h-5 w-5" />
                                    <Link href="/" className="text-base">
                                        Dashboard
                                    </Link>
                                </CommandItem>
                                <CommandItem>
                                    <Building className="mr-2 h-5 w-5" />
                                    <Link href="/facility" className="text-base">
                                        Facility Management
                                    </Link>
                                </CommandItem>
                                <CommandItem>
                                    <Newspaper className="mr-2 h-5 w-5" />
                                    <Link href="/notice" className="text-base">
                                        Notices Management
                                    </Link>
                                </CommandItem>
                                <CommandItem>
                                    <CircleUser className="mr-2 h-5 w-5" />
                                    <Link href="/user" className="text-base">
                                        User Management
                                    </Link>
                                </CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Settings">
                                <CommandItem className="text-base">Profile</CommandItem>
                                <CommandItem className="text-base">Billing</CommandItem>
                                <CommandItem className="text-base">Settings</CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </div>
            )}
        </>
    )
}

export default Sidebar
