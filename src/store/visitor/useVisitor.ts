import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication'
import {
    getVisitorPassDetails,
    verifyVisitorToken,
} from '@api/visitorService/visitorService'
import { GetVisitorDetailsByTokenDto, GetVisitorPassDetailsDto } from '@dtos/visitor/visitor.dto'
import { IResponse } from '@api/globalHandler'

interface State {
    visitorPassDetails: GetVisitorPassDetailsDto
    visitorDetails: GetVisitorDetailsByTokenDto
    isValid: boolean
}

interface Actions {
    getVisitorPassDetailsAction: (token: string) => Promise<any>
    verifyVisitorTokenAction: (token: string) => Promise<IResponse<GetVisitorDetailsByTokenDto>>
    resetVisitorDetails: () => void
}

export const useVisitor = create<State & Actions>((set) => ({
    visitorPassDetails: {} as GetVisitorPassDetailsDto,
    visitorDetails: {} as GetVisitorDetailsByTokenDto,
    isValid: false,
    getVisitorPassDetailsAction: async (token: string) => {
        return generalAction(
            async () => {
                const response = await getVisitorPassDetails(token)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set({ visitorPassDetails: response.data })
                return response
            },
            '',
            'Failed to retrieve visitor pass details. Please try again.'
        )
    },
    verifyVisitorTokenAction: async (token: string) => {
        return generalAction(
            async () => {
                const response = await verifyVisitorToken(token)
                if (!response.success) {
                    throw new Error(response.msg)
                }
                set({ visitorDetails: response.data, isValid: true })
                return response
            },
            '',
            'Failed to verify visitor token. Please try again.'
        )
    },
    resetVisitorDetails: () => set({ visitorDetails: {} as GetVisitorDetailsByTokenDto, isValid: false }),
}))
