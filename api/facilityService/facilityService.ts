import { CreateFacilityBooking, GetFacilityBookingList } from "../../zustand/types"
import GlobalHandler, { IResponse } from "../globalHandler"
import { listUrl } from "../listUrl"

export const createBooking = async (bookingForm: CreateFacilityBooking): Promise<any> => {
    try {
        // const token = await AsyncStorage.getItem("token")
        const [success, data] = await GlobalHandler({
            path: listUrl.facility.book.path,
            type: listUrl.facility.book.type,
            data: bookingForm
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

export const getBookingHistory = async (): Promise<any> => {
    try {
        // const token = await AsyncStorage.getItem("token")
        const [success, data] = await GlobalHandler({
            path: listUrl.facility.getBookingHistory.path,
            type: listUrl.facility.getBookingHistory.type,
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