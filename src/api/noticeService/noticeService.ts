import { getCookies } from '@lib/cookies'
import { CreateNotice, DeleteNotice, EditNotice, GetNotice } from '../../zustand/types'
import GlobalHandler, { IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'

export const createNotice = async (notice: CreateNotice): Promise<any> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.notice.create.path,
            type: listUrl.notice.create.type,
            data: notice,
            _token: cookieValue as string,
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

export const getNotice = async (page: number, limit: number): Promise<IResponse<any>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.notice.getNotices.path,
            type: listUrl.notice.getNotices.type,
            _token: cookieValue as string,
            data: { page, limit },
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

export const getNoticeById = async (noticeGuid: string): Promise<any> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.notice.getNoticeById.path,
            type: listUrl.notice.getNoticeById.type,
            data: { noticeGuid },
            _token: cookieValue as string,
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

export const updateNoticeById = async (editNotice: EditNotice): Promise<any> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            isUrlencoded: false,
            path: listUrl.notice.editNoticeById.path,
            type: listUrl.notice.editNoticeById.type,
            data: editNotice,
            _token: cookieValue as string,
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

export const deleteNoticeById = async (deleteNotice: DeleteNotice): Promise<any> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.notice.deleteNoticeById.path,
            type: listUrl.notice.deleteNoticeById.type,
            _token: cookieValue as string,
            data: deleteNotice,
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
