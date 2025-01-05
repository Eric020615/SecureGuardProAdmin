import { getCookies } from '@libs/cookies'
import { handleApiPaginationRequest, handleApiRequest, IPaginatedResponse, IResponse } from '@api/globalHandler'
import { listUrl } from '@api/listUrl'
import {
    CancelFacilityBookingDto,
    FacilityBookingFormDto,
    GetFacilityBookingDetailsDto,
    GetFacilityBookingHistoryDto,
    GetFacilityBookingUserDto,
    SpaceAvailabilityDto,
} from '@dtos/facility/facility.dto'
import { PaginationDirectionEnum } from '@config/constant'

export const createBooking = async (
    bookingForm: FacilityBookingFormDto
): Promise<any> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.facilities.book.path,
        listUrl.facilities.book.type,
        bookingForm,
        cookieValue as string
    )
    return response
}

export const getBookingHistory = async (
    direction: PaginationDirectionEnum,
    id: number,
    limit: number
): Promise<IPaginatedResponse<GetFacilityBookingHistoryDto>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiPaginationRequest<GetFacilityBookingHistoryDto>(
        listUrl.facilities.getBookingHistory.path,
        listUrl.facilities.getBookingHistory.type,
        {},
        cookieValue as string,
        { direction, id, limit }
    )
    return response
}

export const getFacilityBookingDetails = async (
    facilityBookingGuid: string
): Promise<IResponse<GetFacilityBookingDetailsDto>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<GetFacilityBookingDetailsDto>(
        listUrl.facilities.getDetails.path,
        listUrl.facilities.getDetails.type,
        {},
        cookieValue as string,
        {},
        {
            placeholder: ':id',
            value: facilityBookingGuid,
        }
    )
    return response
}

export const cancelBooking = async (
    facilityBookingGuid: string,
    cancelBookingForm: CancelFacilityBookingDto
): Promise<IResponse<any>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.facilities.cancelBooking.path,
        listUrl.facilities.cancelBooking.type,
        cancelBookingForm,
        cookieValue as string,
        {},
        {
            placeholder: ':id',
            value: facilityBookingGuid,
        }
    )
    return response
}

export const checkAvailabilitySlot = async (
    facilityId: string,
    startDate: string,
    endDate: string
): Promise<IResponse<SpaceAvailabilityDto[]>> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<any>(
        listUrl.facilities.checkAvailability.path,
        listUrl.facilities.checkAvailability.type,
        {},
        cookieValue as string,
        {
            facilityId,
            startDate,
            endDate,
        }
    )
    return response
}

export const getFacilityBookingUser = async (): Promise<
    IResponse<GetFacilityBookingUserDto[]>
> => {
    const cookieValue = await getCookies('token')
    const response = await handleApiRequest<GetFacilityBookingUserDto[]>(
        listUrl.facilities.getFacilityBookingUser.path,
        listUrl.facilities.getFacilityBookingUser.type,
        {},
        cookieValue as string
    )
    return response
}
