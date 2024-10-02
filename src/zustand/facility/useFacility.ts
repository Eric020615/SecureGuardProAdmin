import { create } from "zustand"
import { cancelBooking, createBooking, getBookingHistory } from "@api/facilityService/facilityService"
import { CancelBooking, CreateFacilityBooking } from "../types";
import { IResponse } from "@api/globalHandler";

interface facilityState {
    isLoading: boolean;
    error: string | null;
    submitBooking: (bookingForm: CreateFacilityBooking) => Promise<any>;
    getBookingHistory: (page: number, limit: number) => Promise<IResponse<any>>;
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
    getBookingHistory: async (page: number, limit: number) => {
        let response = {} as IResponse<any>;
        try {
            set({ isLoading: true, error: null });
            response = await getBookingHistory(page, limit);
            return response;
        } catch (error: any) {
            set({ error: error.msg });
        } finally {
            return response;
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