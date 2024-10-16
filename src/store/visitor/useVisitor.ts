import { create } from 'zustand'
import {
    cancelBooking,
    checkAvailabilitySlot,
    createBooking,
    getBookingHistory,
} from '@api/facilityService/facilityService'
import { generalAction } from '@store/application/useApplication'
import { IResponse } from '@api/globalHandler'
import { CancelFacilityBookingDto, FacilityBookingFormDto, GetFacilityBookingHistoryDto, SpaceAvailabilityDto } from '@dtos/facility/facility.dto'


interface State {
	visitorHistory: any[]
	totalVisitorHistory: number
}

interface Actions {
	getVisitorHistoryAction: (page: number, limit: number) => Promise<any>
	resetVisitorHistoryAction: () => void
}

export const useVisitor = create<State & Actions>((set) => ({
	visitorHistory: [],
	totalVisitorHistory: 0,
	getVisitorHistoryAction: async (page: number, limit: number) => {
		// return generalAction(
		// 	async () => {
		// 		const response = await getBookingHistory(page, limit)
		// 		if(!response.success){
		// 			throw new Error(response.msg)
		// 		}
		// 		set((state) => ({
		// 			visitorHistory: [...state.visitorHistory, ...response.data.list],
		// 		}))
		// 		set({ totalVisitorHistory: response.data.count })
		// 		return response
		// 	},
		// 	'',
		// 	'Failed to retrieve visitor history. Please try again.',
		// )
	},
	resetVisitorHistoryAction() {
		set({ visitorHistory: [], totalVisitorHistory: 0 })
	},
}))