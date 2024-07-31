'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { AlignLeft } from 'lucide-react'
import { Button } from './ui/button'
import { useMediaQuery } from 'usehooks-ts'

interface NavbarProps {
    isCollapsed: boolean
    setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = ({ isCollapsed, setIsCollapsed }: NavbarProps) => {
    const isMobileView = useMediaQuery('(max-width: 768px)');
    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed)
    }
    return (
        <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between items-center">
            {isMobileView && (
                <Button onClick={toggleSidebar}>
                    <AlignLeft />
                </Button>
            )}
            <Link href="/">Secure Guard Pro</Link>
        </div>
    )
}

export default Navbar
