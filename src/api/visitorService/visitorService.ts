import { handleApiPaginationRequest, handleApiRequest, IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import { PaginationDirectionEnum } from '@config/constant'
import {
    GetVisitorByDateDto,
    GetVisitorDetailsByTokenDto,
    GetVisitorDetailsDto,
    GetVisitorDto,
    GetVisitorPassDetailsDto,
} from '@dtos/visitor/visitor.dto'
import { getCookies } from '@libs/cookies'

// Get a list of visitors with pagination
export const getVisitors = async (
    direction: PaginationDirectionEnum,
    id: number,
    limit: number
): Promise<IPaginatedResponse<GetVisitorDto>> => {
    const cookieValue = await getCookies('token')
    return handleApiPaginationRequest<GetVisitorDto>(
        listUrl.visitorManagement.getAll.path,
        listUrl.visitorManagement.getAll.type,
        {},
        cookieValue as string,
        { direction, id, limit }
    )
}

// Get visitor details by ID
export const getVisitorDetailsById = async (
    visitorGuid: string
): Promise<IResponse<GetVisitorDetailsDto>> => {
    const cookieValue = await getCookies('token')
    return handleApiRequest<GetVisitorDetailsDto>(
        listUrl.visitorManagement.getById.path,
        listUrl.visitorManagement.getById.type,
        {},
        cookieValue as string,
        {},
        {
            placeholder: ':id',
            value: visitorGuid,
        }
    )
}

// Get visitor analytics within a date range
export const getVisitorAnalytics = async (
    startDate: string,
    endDate: string
): Promise<IResponse<GetVisitorByDateDto[]>> => {
    const cookieValue = await getCookies('token')
    return handleApiRequest<GetVisitorByDateDto[]>(
        listUrl.visitorManagement.getAnalytics.path,
        listUrl.visitorManagement.getAnalytics.type,
        {},
        cookieValue as string,
        { startDate, endDate }
    )
}

// Get visitor pass details
export const getVisitorPassDetails = async (
    token: string
): Promise<IResponse<GetVisitorPassDetailsDto>> => {
    return handleApiRequest<GetVisitorPassDetailsDto>(
        listUrl.visitor.getVisitorPass.path,
        listUrl.visitor.getVisitorPass.type,
        {},
        token
    )
}

// Verify visitor token
export const verifyVisitorToken = async (
    token: string
): Promise<IResponse<GetVisitorDetailsByTokenDto>> => {
    return handleApiRequest<GetVisitorDetailsByTokenDto>(
        listUrl.visitor.verifyToken.path,
        listUrl.visitor.verifyToken.type,
        {},
        token
    )
}
