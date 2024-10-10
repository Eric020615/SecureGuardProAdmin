import { getCookies } from '@lib/cookies'
import {
    CancelBooking,
    CreateFacilityBooking,
    SpaceAvailabilityDto,
} from '../../zustand/types'
import GlobalHandler, { IResponse } from '../globalHandler'
import { listUrl } from '../listUrl'

export const createBooking = async (bookingForm: CreateFacilityBooking): Promise<any> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.facility.book.path,
            type: listUrl.facility.book.type,
            data: bookingForm,
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

export const getBookingHistory = async (
    page: number,
    limit: number
): Promise<IResponse<any>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.facility.getBookingHistory.path,
            type: listUrl.facility.getBookingHistory.type,
            _token: cookieValue as string,
            data: {
                page,
                limit,
            },
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

export const cancelBooking = async (cancelBookingForm: CancelBooking): Promise<IResponse<any>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.facility.cancelBooking.path,
            type: listUrl.facility.cancelBooking.type,
            data: cancelBookingForm,
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

export const checkAvailabilitySlot = async (
    facilityId: string,
    startDate: string,
    endDate: string
): Promise<IResponse<SpaceAvailabilityDto[]>> => {
    try {
        const cookieValue = await getCookies('token')
        const [success, response] = await GlobalHandler({
            path: listUrl.facility.checkAvailabilitySlot.path,
            type: listUrl.facility.checkAvailabilitySlot.type,
            data: {
                facilityId: facilityId,
                startDate: startDate,
                endDate: endDate,
            },
            _token: cookieValue as string,
        })
        const result: IResponse<SpaceAvailabilityDto[]> = {
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
