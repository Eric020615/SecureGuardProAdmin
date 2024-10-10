import { create } from 'zustand'
import {
    cancelBooking,
    checkAvailabilitySlot,
    createBooking,
    getBookingHistory,
} from '@api/facilityService/facilityService'
import { CancelBooking, CreateFacilityBooking, GetFacilityBooking, SpaceAvailabilityDto } from '../types'
import { generalAction } from '@zustand/application/useApplication'
import { IResponse } from '@api/globalHandler'


interface State {
	availabilitySlot: SpaceAvailabilityDto[]
	facilityBookingHistory: GetFacilityBooking[]
	totalFacilityBookingHistory: number
}

interface Actions {
	submitBookingAction: (facilityBookingForm: CreateFacilityBooking) => Promise<any>
	getFacilityBookingHistoryAction: (page: number, limit: number) => Promise<any>
	resetFacilityBookingHistoryAction: () => void
    cancelBookingAction: (cancelBookingForm: CancelBooking) => Promise<IResponse<any>>
	checkAvailabilitySlotAction: (
		facilityId: string,
		startDate: string,
		endDate: string,
	) => Promise<any>
}

export const useFacility = create<State & Actions>((set) => ({
	availabilitySlot: [],
	facilityBookingHistory: [],
	totalFacilityBookingHistory: 0,
	submitBookingAction: async (facilityBookingForm: CreateFacilityBooking) => {
		return generalAction(
			async () => {
				const response = await createBooking(facilityBookingForm)
				if(!response.success){
					throw new Error(response.msg)
				}
				return response
			},
			'Booking successfully submitted!',
			'Failed to submit booking. Please try again.',
		)
	},
	getFacilityBookingHistoryAction: async (page: number, limit: number) => {
		return generalAction(
			async () => {
				const response = await getBookingHistory(page, limit)
				if(!response.success){
					throw new Error(response.msg)
				}
				set((state) => ({
					facilityBookingHistory: [...state.facilityBookingHistory, ...response.data.list],
				}))
				set({ totalFacilityBookingHistory: response.data.count })
				return response
			},
			'',
			'Failed to retrieve booking history. Please try again.',
		)
	},
	resetFacilityBookingHistoryAction() {
		set({ facilityBookingHistory: [], totalFacilityBookingHistory: 0 })
	},
	cancelBookingAction: async (cancelBookingForm: CancelBooking) => {
		return generalAction(
			async () => {
				const response = await cancelBooking(cancelBookingForm)
				if(!response.success){
					throw new Error(response.msg)
				}
				return response
			},
			'Booking successfully canceled!',
			'Failed to cancel booking. Please try again.',
		)
	},

	checkAvailabilitySlotAction: async (facilityId: string, startDate: string, endDate: string) => {
		return generalAction(
			async () => {
				const response = await checkAvailabilitySlot(facilityId, startDate, endDate)
				if(!response.success){
					throw new Error(response.msg)
				}
				set({ availabilitySlot: response.data })
				return response
			},
			'',
			'Failed to check slot availability. Please try again.',
		)
	},
}))