import { create } from 'zustand'
import { GetUser, GetUserDetails } from '../types'
import {
    activateUserById,
    deactivateUserById,
    getUserDetailsById,
    getUserList,
} from '@api/userManagementService/userManagementService'
import { IResponse } from '@api/globalHandler'
import { generalAction } from '@zustand/application/useApplication'

interface State {
    userDetails: GetUserDetails
    userList: GetUser[]
    totalUserList: number
}

interface Actions {
    getUserListAction: (
        isActive: boolean,
        page: number,
        limit: number
    ) => Promise<IResponse<any>>
    resetUserListAction: () => void
    getUserDetailsAction: (userGuid: string) => Promise<IResponse<GetUserDetails>>
    activateUserByIdAction: (userGuid: string) => Promise<IResponse<any>>
    deactivateUserByIdAction: (userGuid: string) => Promise<IResponse<any>>
}

export const useUserManagement = create<State & Actions>((set) => ({
    userDetails: {} as GetUserDetails,
    userList: [],
    totalUserList: 0,
    getUserListAction: async (isActive: boolean, page: number, limit: number) => {
        return generalAction(
            async () => {
                const response = await getUserList(isActive, page, limit)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set((state) => ({
                    userList: [...state.userList, ...response.data.list],
                }))
                set({ totalUserList: response.data.count })
                return response
            },
            '',
            'Failed to retrieve user list. Please try again.'
        )
    },
    resetUserListAction() {
        set({ userList: [], totalUserList: 0 })
    },
    getUserDetailsAction: async (userGuid: string) => {
        return generalAction(
            async () => {
                const response = await getUserDetailsById(userGuid)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set({ userDetails: response.data })
                return response
            },
            '',
            'Failed to retrieve user details. Please try again.'
        )
    },
    activateUserByIdAction: async (userGuid: string) => {
        return generalAction(
            async () => {
                const response = await activateUserById(userGuid)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'User activated successfully!',
            'Failed to activate user. Please try again.'
        )
    },
    deactivateUserByIdAction: async (userGuid: string) => {
        return generalAction(
            async () => {
                const response = await deactivateUserById(userGuid)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'User deactivated successfully!',
            'Failed to deactivate user. Please try again.'
        )
    },
}))
