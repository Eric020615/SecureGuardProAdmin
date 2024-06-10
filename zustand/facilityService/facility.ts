import { create } from "zustand"
import { cancelBooking, createBooking, getBookingHistory } from "../../api/facilityService/facilityService"
import { CancelBooking, CreateFacilityBooking } from "../types";

const application = (set: any, get: any) => ({
    createBooking: async (bookingForm : CreateFacilityBooking ) => {
        try {
            const response = await createBooking(bookingForm);
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    getBookingHistory: async () => {
        try {
            const response = await getBookingHistory();
            return response;
        } catch (error) {
            console.log(error);
        }
    },
    
    cancelBooking: async (cancelBookingForm: CancelBooking) => {
        try {
            const response = await cancelBooking(cancelBookingForm);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
})

export const useFacility = create(application)