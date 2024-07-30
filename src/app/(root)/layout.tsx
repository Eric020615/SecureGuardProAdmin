import Navbar from '@components/Navbar'
import Sidebar from '@components/Sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className="w-full h-auto min-h-[100vh]">
            <Navbar />
            <div className="flex">
                <div className="hidden md:block h-[100vh] min-w-[300px]">
                    <Sidebar />
                </div>
                <div className='w-full flex justify-center'>
                    <div className="max-w-[1340px] md:px-10 md:py-8 p-5">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Layout
