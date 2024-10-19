import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication'
import { getVisitorAnalytics, getVisitorDetailsById, getVisitors } from '@api/visitorService/visitorService'
import { GetVisitorByDateDto, GetVisitorDto } from '@dtos/visitor/visitor.dto'

interface State {
    visitorDetails: GetVisitorDto
	visitorHistory: GetVisitorDto[]
	totalVisitorHistory: number
	visitorAnalytics: GetVisitorByDateDto[]
}

interface Actions {
	getVisitorDetailsByIdAction: (visitorGuid: string) => Promise<any>
	getVisitorHistoryAction: (page: number, limit: number) => Promise<any>
	resetVisitorHistoryAction: () => void
	getVisitorAnalyticsAction: (startDate: string, endDate: string) => Promise<any>
}

export const useVisitor = create<State & Actions>((set) => ({
    visitorDetails: {} as GetVisitorDto,
	visitorHistory: [],
	totalVisitorHistory: 0,
	visitorAnalytics: [],
	getVisitorDetailsByIdAction: async (visitorGuid: string) => {
		return generalAction(
			async () => {
				const response = await getVisitorDetailsById(visitorGuid)
				if(!response.success){
					throw new Error(response.msg)
				}
				set({ visitorDetails: response.data })
				return response
			},
			'',
			'Failed to retrieve visitor details. Please try again.',
		)
	},
	getVisitorHistoryAction: async (page: number, limit: number) => {
		return generalAction(
			async () => {
				const response = await getVisitors(page, limit)
				if(!response.success){
					throw new Error(response.msg)
				}
				set((state) => ({
					visitorHistory: [...state.visitorHistory, ...response.data.list],
				}))
				set({ totalVisitorHistory: response.data.count })
				return response
			},
			'',
			'Failed to retrieve visitor history. Please try again.',
		)
	},
	resetVisitorHistoryAction() {
		set({ visitorHistory: [], totalVisitorHistory: 0 })
	},
	getVisitorAnalyticsAction: async (startDate: string, endDate: string) => {
		return generalAction(
			async () => {
				const response = await getVisitorAnalytics(startDate, endDate)
				if(!response.success){
					throw new Error(response.msg)
				}
				set({ visitorAnalytics: response.data })
				return response
			},
			'',
			'Failed to retrieve visitor analytics. Please try again.',
		)
	}
}))