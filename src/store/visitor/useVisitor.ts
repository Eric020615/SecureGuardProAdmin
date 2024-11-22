import { create } from 'zustand'
import { generalAction } from '@store/application/useApplication'
import { getVisitorPassDetails } from '@api/visitorService/visitorService'
import { GetVisitorPassDetailsDto } from '@dtos/visitor/visitor.dto'

interface State {
    visitorPassDetails: GetVisitorPassDetailsDto
}

interface Actions {
    getVisitorPassDetailsAction: (token: string) => Promise<any>
}

export const useVisitor = create<State & Actions>((set) => ({
    visitorPassDetails: {} as GetVisitorPassDetailsDto,
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
}))
