import { getCookies } from '@lib/cookies'
import GlobalHandler, { IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'
import { GetUser, GetUserDetails } from '@zustand/types'

export const getUserList = async (isActive: boolean, page: number, limit: number): Promise<IResponse<any>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.userManagement.getUsers.path,
            type: listUrl.userManagement.getUsers.type,
            _token: cookieValue as string,
            data: { isActive, page, limit },
        })
        const result: IResponse<GetUser[]> = {
            success,
            msg: success ? 'success' : response?.message,
            data: success ? response?.data : undefined,
        }
        return result
    } catch (error: any) {
        const result: IResponse<any> = {
            success: false,
            msg: error,
            data: null,
        }
        return result
    }
}

export const getUserDetailsById = async (
    userGuid: string
): Promise<IResponse<GetUserDetails>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.userManagement.getUserDetailsById.path,
            type: listUrl.userManagement.getUserDetailsById.type,
            _token: cookieValue as string,
            data: { userGuid },
        })
        const result: IResponse<GetUserDetails> = {
            success,
            msg: success ? 'success' : response?.message,
            data: success ? response?.data : undefined,
        }
        return result
    } catch (error: any) {
        const result: IResponse<any> = {
            success: false,
            msg: error,
            data: null,
        }
        return result
    }
}

export const activateUserById = async (userGuid: string): Promise<IResponse<any>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.userManagement.activateUserById.path,
            type: listUrl.userManagement.activateUserById.type,
            _token: cookieValue as string,
            params: { userGuid },
        })
        const result: IResponse<any> = {
            success,
            msg: success ? 'success' : response?.message,
            data: success ? response?.data : undefined,
        }
        return result
    } catch (error: any) {
        const result: IResponse<any> = {
            success: false,
            msg: error,
            data: null,
        }
        return result
    }
}

export const deactivateUserById = async (userGuid: string): Promise<IResponse<any>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.userManagement.deactivateUserById.path,
            type: listUrl.userManagement.deactivateUserById.type,
            _token: cookieValue as string,
            params: { userGuid },
        })
        const result: IResponse<any> = {
            success,
            msg: success ? 'success' : response?.message,
            data: success ? response?.data : undefined,
        }
        return result
    } catch (error: any) {
        const result: IResponse<any> = {
            success: false,
            msg: error,
            data: null,
        }
        return result
    }
}
