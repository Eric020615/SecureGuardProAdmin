'use client'

import CustomLoader from '@components/loader/Loader'
import { useApplication } from '@store/application/useApplication'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
    const isLoading = useApplication((state) => state.isLoading)
    return (
        <main className="auth">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-[9999] bg-white bg-opacity-50">
                    <CustomLoader />
                </div>
            )}
            {children}
        </main>
    )
}

export default Layout
