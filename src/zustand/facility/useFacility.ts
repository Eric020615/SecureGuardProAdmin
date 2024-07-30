import { create } from "zustand"
import { cancelBooking, createBooking, getBookingHistory } from "@api/facilityService/facilityService"
import { CancelBooking, CreateFacilityBooking } from "../types";

interface facilityState {
    isLoading: boolean;
    error: string | null;
    submitBooking: (bookingForm: CreateFacilityBooking) => Promise<any>;
    getBookingHistory: () => Promise<any>;
    cancelBooking: (cancelBookingForm: CancelBooking) => Promise<any>;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useFacility = create<facilityState>((set) => ({
    isLoading: false,
    error: null,
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    submitBooking: async (bookingForm : CreateFacilityBooking ) => {
        try {
            set({ isLoading: true, error: null });
            const response = await createBooking(bookingForm);
            return response;
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    getBookingHistory: async () => {
        try {
            set({ isLoading: true, error: null });
            const response = await getBookingHistory();
            return response;
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    },
    cancelBooking: async (cancelBookingForm: CancelBooking) => {
        try {
            set({ isLoading: true, error: null });
            const response = await cancelBooking(cancelBookingForm);
            return response;
        } catch (error: any) {
            console.log(error);
            set({ error: error.msg });
        } finally {
            set({ isLoading: false })
        }
    }
}))