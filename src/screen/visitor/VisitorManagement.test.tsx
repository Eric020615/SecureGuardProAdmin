import React from 'react'
import { act, fireEvent, render } from '@testing-library/react'
import VisitorManagementPage from '.'
import { useRouter } from 'nextjs-toploader/app'

jest.mock('@api/visitorService/visitorService', () => ({
    ...jest.requireActual('@api/visitorService/visitorService'),
    getVisitors: jest.fn().mockReturnValue({
        success: true,
        msg: 'Visitor list fetched successfully!',
        data: {
            list: [
                {
                    visitorId: 1,
                    visitorGuid: '123e4567-e89b-12d3-a456-426614174000', // Example UUID
                    visitorName: 'John Doe',
                    visitorEmail: 'john.doe@example.com',
                    visitorCategory: 'FM', // Family Member
                    visitorContactNumber: '1234567890',
                    visitDateTime: '2024-12-29T10:30:00Z', // ISO 8601 format
                    status: 'ACTIVE',
                },
                {
                    visitorId: 2,
                    visitorGuid: '987e6543-a21b-45d6-b789-526614174123',
                    visitorName: 'Jane Smith',
                    visitorEmail: 'jane.smith@example.com',
                    visitorCategory: 'F', // Friend
                    visitorContactNumber: '9876543210',
                    visitDateTime: '2024-12-28T14:00:00Z',
                    status: 'PENDING',
                },
                {
                    visitorId: 3,
                    visitorGuid: '192e4737-c34b-12f3-b678-456784672019',
                    visitorName: 'Sam Wilson',
                    visitorEmail: 'sam.wilson@example.com',
                    visitorCategory: 'R', // Relative
                    visitorContactNumber: '5432167890',
                    visitDateTime: '2024-12-30T09:00:00Z',
                    status: 'SUSPENDED',
                },
            ],
            count: 1,
        },
    }),
}))

describe('Visitor Management', () => {
    beforeEach(() => {
        jest.clearAllMocks() // Clears all mock calls and state
    })
    const setup = async () => {
        const utils = render(<VisitorManagementPage />)

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0))
        })

        return {
            ...utils,
            triggerVisitorDetailsButton: async (row: number) => {
                const tableRow = utils.getByTestId(`table-row-${row}`)
                await act(async () => {
                    fireEvent.click(tableRow)
                })
            },
        }
    }

    it('verify table row click', async () => {
        const { triggerVisitorDetailsButton } = await setup()
        await triggerVisitorDetailsButton(0)
        expect(useRouter().push).toHaveBeenCalled()
        expect(useRouter().push).toHaveBeenCalledWith('/visitor/123e4567-e89b-12d3-a456-426614174000')
    })
})
