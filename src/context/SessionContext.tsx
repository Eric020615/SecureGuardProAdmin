'use client'

import { deleteCookies, getCookies } from '@lib/cookies'
import { useAuth } from '@store/auth/useAuth'
import React, { createContext, useContext, useEffect } from 'react'

// Define the structure of your session state
interface SessionState {
    setSession: () => void // Function to update the session
    clearSession: () => void // Function to clear session (logout)
}

const SessionContext = createContext<SessionState | undefined>(undefined)

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const { setAuthTokenPayload } = useAuth()

    useEffect(() => {
        const fetchAuthTokenPayload = async () => {
            const authCookie = await getCookies('authTokenPayload')
            if (authCookie) {
                const { userGuid, role } = JSON.parse(decodeURIComponent(authCookie))
                setAuthTokenPayload({ userGuid, role })
            }
        }
        fetchAuthTokenPayload()
    }, []) // Runs once when the app loads

    const setSession = () => {}

    const clearSession = () => {
        deleteCookies('authTokenPayload')
    }

    return (
        <SessionContext.Provider value={{ setSession, clearSession }}>
            {children}
        </SessionContext.Provider>
    )
}

// Custom hook to use the session context
export const useSession = (): SessionState => {
    const context = useContext(SessionContext)
    if (!context) {
        throw new Error('useSession must be used within a SessionProvider')
    }
    return context
}
