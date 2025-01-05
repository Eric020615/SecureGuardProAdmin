import { getCookies } from '@libs/cookies'
import { listUrl } from '@api/listUrl'
import {
    GetUserDetailsByUserGuidDto,
    GetUserDto,
} from '@dtos/user-management/userManagement.dto'
import { handleApiPaginationRequest, handleApiRequest, IPaginatedResponse, IResponse } from '@api/globalHandler'
import { PaginationDirectionEnum } from '@config/constant'

// Function to get a list of users
export const getUserList = async (
    isActive: boolean,
    direction: PaginationDirectionEnum,
    id: number,
    limit: number
): Promise<IPaginatedResponse<GetUserDto>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiPaginationRequest<GetUserDto>(
        listUrl.userManagement.getAll.path,
        listUrl.userManagement.getAll.type,
        {},
        cookieValue as string,
        { isActive, direction, id, limit }
    )
    return response
}

// Function to get user details by ID
export const getUserDetailsById = async (
    userGuid: string
): Promise<IResponse<GetUserDetailsByUserGuidDto>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<GetUserDetailsByUserGuidDto>(
        listUrl.userManagement.getById.path,
        listUrl.userManagement.getById.type,
        {},
        cookieValue as string,
        {},
        {
            placeholder: ':id',
            value: userGuid,
        }
    )
    return response
}

// Function to activate a user by ID
export const activateUserById = async (userGuid: string): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.userManagement.activate.path,
        listUrl.userManagement.activate.type,
        {},
        cookieValue as string,
        {},
        {
            placeholder: ':id',
            value: userGuid,
        }
    )
    return response
}

// Function to deactivate a user by ID
export const deactivateUserById = async (userGuid: string): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.userManagement.deactivate.path,
        listUrl.userManagement.deactivate.type,
        {},
        cookieValue as string,
        {},
        {
            placeholder: ':id',
            value: userGuid,
        }
    )
    return response
}

// Function to delete a user by ID
export const deleteUserById = async (userGuid: string): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.userManagement.delete.path,
        listUrl.userManagement.delete.type,
        {},
        cookieValue as string,
        {},
        {
            placeholder: ':id',
            value: userGuid,
        }
    )
    return response
}
