import { create } from 'zustand'
import {
    cancelBooking,
    checkAvailabilitySlot,
    createBooking,
    getBookingHistory,
} from '@api/facilityService/facilityService'
import { generalAction } from '@store/application/useApplication'
import { IResponse } from '@api/globalHandler'
import {
    CancelFacilityBookingDto,
    FacilityBookingFormDto,
    GetFacilityBookingHistoryDto,
    SpaceAvailabilityDto,
} from '@dtos/facility/facility.dto'
import { PaginationDirection } from '@config/constant'

interface State {
    availabilitySlot: SpaceAvailabilityDto[]
    facilityBookingHistory: GetFacilityBookingHistoryDto[]
    currentPage: number
    totalFacilityBookingHistory: number
}

interface Actions {
    submitBookingAction: (facilityBookingForm: FacilityBookingFormDto) => Promise<any>
    getFacilityBookingHistoryAction: (
        direction: PaginationDirection,
        limit: number
    ) => Promise<any>
    resetFacilityBookingHistoryAction: () => void
    cancelBookingAction: (
        cancelBookingForm: CancelFacilityBookingDto
    ) => Promise<IResponse<any>>
    checkAvailabilitySlotAction: (
        facilityId: string,
        startDate: string,
        endDate: string
    ) => Promise<any>
}

export const useFacility = create<State & Actions>((set, get) => ({
    availabilitySlot: [],
    facilityBookingHistory: [],
    currentPage: 0,
    totalFacilityBookingHistory: 0,
    submitBookingAction: async (facilityBookingForm: FacilityBookingFormDto) => {
        return generalAction(
            async () => {
                const response = await createBooking(facilityBookingForm)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Booking successfully submitted!',
            'Failed to submit booking. Please try again.'
        )
    },
    getFacilityBookingHistoryAction: async (
        direction: PaginationDirection,
        limit: number
    ) => {
        return generalAction(
            async () => {
                let response: any
                const { facilityBookingHistory, currentPage } = get()
                if (direction === PaginationDirection.Next) {
                    // Pass the last booking ID from the current list for next pagination
                    const lastId =
                        facilityBookingHistory.length > 0
                            ? facilityBookingHistory[facilityBookingHistory.length - 1]
                                  .bookingId
                            : 0 // If no history, pass 0 or handle accordingly

                    response = await getBookingHistory(direction, lastId, limit)
                    set({ currentPage: currentPage + 1 })
                } else {
                    // Pass the first booking ID from the current list for previous pagination
                    const firstId =
                        facilityBookingHistory.length > 0
                            ? facilityBookingHistory[0].bookingId
                            : 0 // If no history, pass 0 or handle accordingly

                    response = await getBookingHistory(direction, firstId, limit)
                    set({ currentPage: Math.max(currentPage - 1, 1) })
                }
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set({
                    facilityBookingHistory: response.data.list,
                    totalFacilityBookingHistory: response.data.count,
                })
                return response
            },
            '',
            'Failed to retrieve booking history. Please try again.'
        )
    },
    resetFacilityBookingHistoryAction() {
        set({
            facilityBookingHistory: [],
			currentPage: 0,
            totalFacilityBookingHistory: 0,
        })
    },
    cancelBookingAction: async (cancelBookingForm: CancelFacilityBookingDto) => {
        return generalAction(
            async () => {
                const response = await cancelBooking(cancelBookingForm)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                return response
            },
            'Booking successfully canceled!',
            'Failed to cancel booking. Please try again.'
        )
    },

    checkAvailabilitySlotAction: async (
        facilityId: string,
        startDate: string,
        endDate: string
    ) => {
        return generalAction(
            async () => {
                const response = await checkAvailabilitySlot(
                    facilityId,
                    startDate,
                    endDate
                )
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set({ availabilitySlot: response.data })
                return response
            },
            '',
            'Failed to check slot availability. Please try again.'
        )
    },
}))
