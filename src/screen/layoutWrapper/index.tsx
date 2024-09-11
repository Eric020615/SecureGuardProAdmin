'use client'

import CustomLoader from '@components/loader/Loader'
import { useApplication } from '@zustand/index'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const { isLoading } = useApplication()
    return (
        <>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-[9999] bg-white bg-opacity-50">
                    <CustomLoader />
                </div>
            )}
            {children}
        </>
    )
}
