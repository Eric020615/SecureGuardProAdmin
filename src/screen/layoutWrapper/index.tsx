'use client'

import CustomLoader from '@components/loader/Loader'
import TopLoader from '@components/loadingBar/LoadingBar'
import { useApplication } from '@zustand/index'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const { isLoading } = useApplication()
    return (
        <>
            {children}
        </>
    )
}
