'use client'

import { AuthTokenPayloadDto } from '@dtos/auth/auth.dto'
import { deleteCookies, getCookies } from '@libs/cookies'
import { useAuth } from '@store/auth/useAuth'
import React, { createContext, useCallback, useContext, useEffect } from 'react'

// Define the structure of your session state
interface SessionState {
    fetchSession: () => void // Function to fetch the session
    setSession: () => void // Function to update the session
    clearSession: () => void // Function to clear session (logout)
}

const SessionContext = createContext<SessionState | undefined>(undefined)

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
    const { setAuthTokenPayload } = useAuth()

    const fetchSession = useCallback(async () => {
        const authCookie = await getCookies('authTokenPayload')
        if (authCookie) {
            const { userGuid, role } = JSON.parse(decodeURIComponent(authCookie))
            setAuthTokenPayload({ userGuid, role })
        } else {
            // If no cookie, clear the session
            setAuthTokenPayload({} as AuthTokenPayloadDto)
        }
    }, [setAuthTokenPayload])

    useEffect(() => {
        fetchSession()
    }, [fetchSession]) // Ensure it runs once on mount

    const setSession = () => {}

    const clearSession = () => {
        deleteCookies('authTokenPayload')
    }

    return (
        <SessionContext.Provider value={{ fetchSession, setSession, clearSession }}>
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
