import { getCookies } from '@lib/cookies'
import { listUrl } from '../listUrl'
import {
    CreateNoticeDto,
    GetNoticeDto,
    EditNoticeDto,
    GetNoticeDetailsByIdDto,
} from '@dtos/notice/notice.dto'
import { handleApiRequest, IResponse } from '../globalHandler'
import { PaginationDirectionEnum } from '@config/constant'

// Function to create a notice
export const createNotice = async (notice: CreateNoticeDto): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.noticeManagement.create.path,
        listUrl.noticeManagement.create.type,
        notice,
        cookieValue as string
    )
    return response
}

// Function to get a list of notices
export const getNoticeList = async (
    direction: PaginationDirectionEnum,
    id: number,
    limit: number
): Promise<IResponse<GetNoticeDto[] | null>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<GetNoticeDto[]>(
        listUrl.noticeManagement.getAll.path,
        listUrl.noticeManagement.getAll.type,
        {},
        cookieValue as string,
        { direction, id, limit }
    )
    return response
}

// Function to get notice details by ID
export const getNoticeDetailsById = async (
    noticeGuid: string
): Promise<IResponse<GetNoticeDetailsByIdDto | null>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<GetNoticeDetailsByIdDto>(
        listUrl.noticeManagement.getById.path,
        listUrl.noticeManagement.getById.type,
        {},
        cookieValue as string,
        {},
        {
            placeholder: ':id',
            value: noticeGuid,
        }
    )
    return response
}

// Function to update a notice by ID
export const updateNoticeById = async (
    notice: EditNoticeDto,
    noticeGuid: string
): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.noticeManagement.update.path,
        listUrl.noticeManagement.update.type,
        notice,
        cookieValue as string,
        {},
        {
            placeholder: ':id',
            value: noticeGuid,
        }
    )
    return response
}

// Function to delete a notice by ID
export const deleteNoticeById = async (noticeGuid: string): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.noticeManagement.delete.path,
        listUrl.noticeManagement.delete.type,
        {},
        cookieValue as string,
        {},
        {
            placeholder: ':id',
            value: noticeGuid,
        }
    )
    return response
}
