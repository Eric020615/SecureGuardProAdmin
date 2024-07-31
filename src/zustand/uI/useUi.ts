'use client'

import { create } from 'zustand'
import { useMediaQuery } from 'usehooks-ts'

interface uIState {
    isMobileView: boolean
    setIsMobileView: () => void
}

export const useUI = create<uIState>((set) => ({
    isMobileView: false,
    setIsMobileView: () => {
        set({ isMobileView: useMediaQuery('(max-width: 768px)') })
    },
}))
