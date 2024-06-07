import { CreateNotice } from "../../zustand/types"
import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"

export const createNotice = async (notice: CreateNotice): Promise<any> => {
    try {
        // const token = await AsyncStorage.getItem("token")
        const [success, data] = await GlobalHandler({
            path: listUrl.notice.create.path,
            type: listUrl.notice.create.type,
            data: notice
            // _token: token
        })
        const result : IResponse<any> = {
            success,
            msg: success ? 'success': data?.message,
            data: success ? data?.data.data : undefined
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

export const getNotice = async (): Promise<any> => {
    try {
        const [success, data] = await GlobalHandler({
            path: listUrl.notice.getNotices.path,
            type: listUrl.notice.getNotices.type,
            // _token: token
        })
        const result : IResponse<any> = {
            success,
            msg: success ? 'success': data?.message,
            data: success ? data?.data.data : undefined
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