import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication'
import {
    getVisitorAnalytics,
    getVisitorDetailsById,
    getVisitors,
} from '@api/visitorService/visitorService'
import { GetVisitorByDateDto, GetVisitorDto } from '@dtos/visitor/visitor.dto'
import { PaginationDirection } from '@config/constant'

interface State {
    visitorDetails: GetVisitorDto
    visitorHistory: GetVisitorDto[]
    currentPage: number
    totalVisitorHistory: number
    visitorAnalytics: GetVisitorByDateDto[]
}

interface Actions {
    getVisitorDetailsByIdAction: (visitorGuid: string) => Promise<any>
    getVisitorHistoryAction: (
        direction: PaginationDirection,
        limit: number
    ) => Promise<any>
    resetVisitorHistoryAction: () => void
    getVisitorAnalyticsAction: (startDate: string, endDate: string) => Promise<any>
}

export const useVisitor = create<State & Actions>((set, get) => ({
    visitorDetails: {} as GetVisitorDto,
    visitorHistory: [],
    currentPage: 0,
    totalVisitorHistory: 0,
    visitorAnalytics: [],
    getVisitorDetailsByIdAction: async (visitorGuid: string) => {
        return generalAction(
            async () => {
                const response = await getVisitorDetailsById(visitorGuid)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set({ visitorDetails: response.data })
                return response
            },
            '',
            'Failed to retrieve visitor details. Please try again.'
        )
    },
    getVisitorHistoryAction: async (direction: PaginationDirection, limit: number) => {
        return generalAction(
            async () => {
                let response: any
                const { visitorHistory, currentPage } = get()
                if (direction === PaginationDirection.Next) {
                    // Pass the last booking ID from the current list for next pagination
                    const lastId =
                        visitorHistory.length > 0
                            ? visitorHistory[visitorHistory.length - 1].visitorId
                            : 0 // If no history, pass 0 or handle accordingly

                    response = await getVisitors(direction, lastId, limit)
                    set({ currentPage: currentPage + 1 })
                } else {
                    // Pass the first booking ID from the current list for previous pagination
                    const firstId =
                        visitorHistory.length > 0 ? visitorHistory[0].visitorId : 0 // If no history, pass 0 or handle accordingly

                    response = await getVisitors(direction, firstId, limit)
                    set({ currentPage: Math.max(currentPage - 1, 1) })
                }
                if (!response.success) {
                    throw new Error(response.msg)
                }
                console.log(response.data)
                set({
                    visitorHistory: response.data.list,
                    totalVisitorHistory: response.data.count,
                })
                return response
            },
            '',
            'Failed to retrieve visitor history. Please try again.'
        )
    },
    resetVisitorHistoryAction() {
        set({ visitorHistory: [], currentPage: 0, totalVisitorHistory: 0 })
    },
    getVisitorAnalyticsAction: async (startDate: string, endDate: string) => {
        return generalAction(
            async () => {
                const response = await getVisitorAnalytics(startDate, endDate)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set({ visitorAnalytics: response.data })
                return response
            },
            '',
            'Failed to retrieve visitor analytics. Please try again.'
        )
    },
}))
