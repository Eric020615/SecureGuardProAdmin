import { create } from 'zustand'
import {
    activateUserById,
    deactivateUserById,
    deleteUserById,
    getUserDetailsById,
    getUserList,
} from '@api/userManagementService/userManagementService'
import { IResponse } from '@api/globalHandler'
import { generalAction } from '@store/application/useApplication'
import {
    GetUserDetailsByUserGuidDto,
    GetUserDto,
} from '@dtos/user-management/userManagement.dto'
import { PaginationDirectionEnum } from '@config/constant'

interface State {
    userDetails: GetUserDetailsByUserGuidDto
    userList: GetUserDto[]
    currentPage: number
    totalUserList: number
}

interface Actions {
    getUserListAction: (
        isActive: boolean,
        direction: PaginationDirectionEnum,
        limit: number
    ) => Promise<IResponse<any>>
    resetUserListAction: () => void
    getUserDetailsAction: (
        userGuid: string
    ) => Promise<IResponse<GetUserDetailsByUserGuidDto>>
    activateUserByIdAction: (userGuid: string) => Promise<IResponse<any>>
    deactivateUserByIdAction: (userGuid: string) => Promise<IResponse<any>>
    deleteUserByIdAction: (userGuid: string) => Promise<IResponse<any>>
}

export const useUserManagement = create<State & Actions>((set, get) => ({
    userDetails: {} as GetUserDetailsByUserGuidDto,
    userList: [],
    currentPage: 0,
    totalUserList: 0,
    getUserListAction: async (
        isActive: boolean,
        direction: PaginationDirectionEnum,
        limit: number
    ) => {
        return generalAction(
            async () => {
                let response: any
                const { userList, currentPage } = get()
                if (direction === PaginationDirectionEnum.Next) {
                    // Pass the last booking ID from the current list for next pagination
                    const lastId =
                        userList.length > 0 ? userList[userList.length - 1].userId : 0 // If no history, pass 0 or handle accordingly

                    response = await getUserList(isActive, direction, lastId, limit)
                    set({ currentPage: currentPage + 1 })
                } else {
                    // Pass the first booking ID from the current list for previous pagination
                    const firstId = userList.length > 0 ? userList[0].userId : 0 // If no history, pass 0 or handle accordingly

                    response = await getUserList(isActive, direction, firstId, limit)
                    set({ currentPage: Math.max(currentPage - 1, 1) })
                }
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set({
                    userList: response.data.list,
                    totalUserList: response.data.count,
                })
                return response
            },
            '',
            'Failed to retrieve user list. Please try again.'
        )
    },
    resetUserListAction() {
        set({ userList: [], currentPage: 0, totalUserList: 0 })
    },
    getUserDetailsAction: async (userGuid: string) => {
        return generalAction(
            async () => {
                const response = await getUserDetailsById(userGuid)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set({
                    userDetails: response.data
                        ? response.data
                        : ({} as GetUserDetailsByUserGuidDto),
                })
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
    deleteUserByIdAction: async (userGuid: string) => {
        return generalAction(
            async () => {
                const response = await deleteUserById(userGuid)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'User deleted successfully!',
            'Failed to delete user. Please try again.'
        )
    },
}))
