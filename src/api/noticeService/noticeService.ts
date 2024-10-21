import { getCookies } from '@lib/cookies'
import GlobalHandler, { IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'
import { CreateNoticeDto, DeleteNoticeDto, EditNoticeDto } from '@dtos/notice/notice.dto'
import { PaginationDirection } from '@config/constant'

export const createNotice = async (notice: CreateNoticeDto): Promise<any> => {
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

export const getNotice = async (
    direction: PaginationDirection,
    id: number,
    limit: number
): Promise<IResponse<any>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.notice.getNotices.path,
            type: listUrl.notice.getNotices.type,
            _token: cookieValue as string,
            data: { direction, id, limit },
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

export const updateNoticeById = async (editNotice: EditNoticeDto): Promise<any> => {
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

export const deleteNoticeById = async (deleteNotice: DeleteNoticeDto): Promise<any> => {
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
