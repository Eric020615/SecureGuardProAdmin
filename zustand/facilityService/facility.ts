import { create } from "zustand"
import { getBookingHistory } from "../../api/facilityService/facilityService"

const application = (set: any, get: any) => ({
    getBookingHistory: async () => {
        try {
            const response = await getBookingHistory();
            return response;
        } catch (error) {
            console.log(error);
        }
    }
})

export const useFacility = create(application)