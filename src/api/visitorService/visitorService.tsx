import GlobalHandler, { IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { PaginationDirection } from '@config/constant'
import { GetVisitorByDateDto, GetVisitorDto } from '@dtos/visitor/visitor.dto'
import { getCookies } from '@lib/cookies'

export const getVisitors = async (
    direction: PaginationDirection,
    id: number,
    limit: number
): Promise<IPaginatedResponse<GetVisitorDto>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.vistorManagement.getVisitors.path,
            type: listUrl.vistorManagement.getVisitors.type,
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

export const getVisitorDetailsById = async (
    visitorGuid: string
): Promise<IResponse<GetVisitorDto>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.vistorManagement.getVisitorDetailsById.path,
            type: listUrl.vistorManagement.getVisitorDetailsById.type,
            data: {
                visitorGuid: visitorGuid,
            },
            _token: cookieValue as string,
        })
        const result: IResponse<GetVisitorDto> = {
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

export const getVisitorAnalytics = async (
    startDate: string,
    endDate: string
): Promise<IResponse<GetVisitorByDateDto[]>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.vistorManagement.getVisitorAnalytics.path,
            type: listUrl.vistorManagement.getVisitorAnalytics.type,
            data: {
                startDate,
                endDate,
            },
            _token: cookieValue as string,
        })
        const result: IResponse<GetVisitorByDateDto[]> = {
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
