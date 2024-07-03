import { getCookies } from "@lib/cookies"
import { CreateNotice, DeleteNotice, UpdateNotice } from "../../zustand/types"
import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"

export const createNotice = async (notice: CreateNotice): Promise<any> => {
    try {
        const cookieValue = await getCookies("token")
        const [success, response] = await GlobalHandler({
            path: listUrl.notice.create.path,
            type: listUrl.notice.create.type,
            data: notice,
            _token: cookieValue?.data as string
        })
        const result : IResponse<any> = {
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

export const getNotice = async (): Promise<any> => {
    try {
        const cookieValue = await getCookies("token")
        const [success, response] = await GlobalHandler({
            path: listUrl.notice.getNotices.path,
            type: listUrl.notice.getNotices.type,
            _token: cookieValue?.data as string
        })
        const result : IResponse<any> = {
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

export const getNoticeById = async (noticeId: string): Promise<any> => {
    try {
        const cookieValue = await getCookies("token")
        const [success, response] = await GlobalHandler({
            path: listUrl.notice.getNoticeById.path,
            type: listUrl.notice.getNoticeById.type,
            data: {noticeId},
            _token: cookieValue?.data as string
        })
        const result : IResponse<any> = {
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

export const updateNoticeById = async (noticeForm: UpdateNotice): Promise<any> => {
    try {
        const cookieValue = await getCookies("token")
        const [success, response] = await GlobalHandler({
            isUrlencoded: false,
            path: listUrl.notice.updateNoticeById.path,
            type: listUrl.notice.updateNoticeById.type,
            data: noticeForm,
            _token: cookieValue?.data as string
        })
        const result : IResponse<any> = {
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

export const deleteNoticeById = async (deleteNotice: DeleteNotice): Promise<any> => {
    try {
        const cookieValue = await getCookies("token")
        const [success, response] = await GlobalHandler({
            path: listUrl.notice.deleteNoticeById.path,
            type: listUrl.notice.deleteNoticeById.type,
            _token: cookieValue?.data as string,
            data: deleteNotice
        })
        const result : IResponse<any> = {
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