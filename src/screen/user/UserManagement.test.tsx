import React from 'react'
import { act, fireEvent, render, waitFor } from '@testing-library/react'
import UserManagementPage from '.'
import { getUserList } from '@api/userManagementService/userManagementService'

jest.mock('@api/userManagementService/userManagementService', () => ({
    ...jest.requireActual('@api/userManagementService/userManagementService'),
    getUserList: jest.fn().mockReturnValue({
        success: true,
        msg: 'User list fetched successfully!',
        data: {
            list: [
                {
                    userId: 1,
                    userGuid: '123e4567-e89b-12d3-a456-426614174000',
                    firstName: 'John',
                    lastName: 'Doe',
                    userName: 'johndoe',
                    contactNumber: '123-456-7890',
                    gender: 'M', // Assuming 'Male' is a key in GenderDescriptionEnum
                    role: 'SA', // Assuming 'Admin' is a key in RoleDescriptionEnum
                    userStatus: 'Active',
                    status: 'Enabled',
                },
            ],
            count: 1,
        },
    }),
}))

jest.mock('@store/auth/useAuth', () => {
    const originalModule = jest.requireActual('@store/auth/useAuth') // Retain the original module
    return {
        ...originalModule, // Retain other functionalities of useFacility
        useAuth: jest.fn().mockReturnValue({
            ...originalModule.useAuth.getState(),
            authTokenPayload: {
                userGuid: '1',
                role: 'SA',
            },
        }),
    }
})

describe('User Management', () => {
    beforeEach(() => {
        jest.clearAllMocks() // Clears all mock calls and state
    })
    const setup = async () => {
        const utils = render(<UserManagementPage />)

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0))
        })

        return {
            ...utils,
            triggerActiveUserButton: async () => {
                const activeUserButton = utils.getByTestId('active-user-button')
                await act(async () => {
                    fireEvent.mouseDown(activeUserButton)
                })
            },
            triggerInactiveUserButton: async () => {
                const inactiveUserButton = utils.getByTestId('inactive-user-button')
                await act(async () => {
                    fireEvent.mouseDown(inactiveUserButton)
                })
            },
        }
    }

    it('verify active user button', async () => {
        const { triggerActiveUserButton } = await setup()
        await triggerActiveUserButton()
        expect(getUserList).toHaveBeenCalled()
        expect(getUserList).toHaveBeenCalledWith(true, 'next', 0, 10)
    })

    it('verify inactive user button', async () => {
        const { triggerInactiveUserButton } = await setup()
        await triggerInactiveUserButton()
        await waitFor(() => {
            expect(getUserList).toHaveBeenCalled()
            expect(getUserList).toHaveBeenCalledWith(false, 'next', 0, 10)
        })
    })
})
