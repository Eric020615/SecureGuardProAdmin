import { getCookies } from "@lib/cookies"
import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"
import { GetUser, GetUserDetails } from "@zustand/types"

export const getUserList = async (): Promise<IResponse<GetUser[]>> => {
    try {
        const cookieValue = await getCookies("token")
        const [success, response] = await GlobalHandler({
            path: listUrl.userManagement.getUsers.path,
            type: listUrl.userManagement.getUsers.type,
            _token: cookieValue as string
        })
        const result : IResponse<GetUser[]> = {
            success,
            msg: success ? 'success': response?.message,
            data: success ? response?.data : undefined
        }
        return result;
    } catch (error: any) {
        const result : IResponse<any> = {
            success: false,
            msg: error,
            data: null
        }
        return result;
    }
}

export const getUserDetailsById = async (userId: string): Promise<IResponse<GetUserDetails>> => {
    try {
        const cookieValue = await getCookies("token")
        const [success, response] = await GlobalHandler({
            path: listUrl.userManagement.getUserDetailsById.path,
            type: listUrl.userManagement.getUserDetailsById.type,
            _token: cookieValue as string,
            data: {userId}
        })
        const result : IResponse<GetUserDetails> = {
            success,
            msg: success ? 'success': response?.message,
            data: success ? response?.data : undefined
        }
        return result;
    } catch (error: any) {
        const result : IResponse<any> = {
            success: false,
            msg: error,
            data: null
        }
        return result;
    }
}