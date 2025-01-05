import React from 'react'
import { act, fireEvent, render, within } from '@testing-library/react'
import DashboardPage from '.'
import { getVisitorAnalytics } from '@api/visitorService/visitorService'

jest.mock('@api/visitorService/visitorService', () => ({
    ...jest.requireActual('@api/visitorService/visitorService'),
    getVisitorAnalytics: jest.fn().mockReturnValue({
        success: true,
        msg: 'Visitor analytics fetched successfully!',
        data: [],
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

jest.mock('@components/graph/line', () => () => (
    <div data-testid="line-chart-mock">Mock LineChart</div>
))

describe('Dashboard', () => {
    beforeEach(() => {
        jest.clearAllMocks() // Clears all mock calls and state
    })
    const setup = async () => {
        const utils = render(<DashboardPage />)

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0))
        })

        return {
            ...utils,
            triggerFilterButton: async () => {
                const filterButton = utils.getByTestId('filter-button')
                await act(async () => {
                    fireEvent.click(filterButton)
                })
            },
            fillStartDate: async (startDate: string) => {
                // Parse the desired date into year, month, and day
                const [year, rawMonth, day] = startDate.split('-').map(Number)
                const month = rawMonth - 1 // Adjust month to 0-indexed for JavaScript Date
                // Open the date picker
                const startDateButton = utils.getByTestId('date-picker-button-start-date')
                await act(async () => {
                    fireEvent.click(startDateButton)
                })

                // Get today's date to calculate the difference in months
                const today = new Date()
                const todayYear = today.getFullYear()
                const todayMonth = today.getMonth()

                // Calculate how many months to navigate forward or backward
                const monthDifference = (year - todayYear) * 12 + (month - todayMonth)

                const nextMonthButton = utils.getByRole('button', {
                    name: /Go to next month/i,
                })
                const prevMonthButton = utils.getByRole('button', {
                    name: /Go to previous month/i,
                })

                // Navigate to the target month
                if (monthDifference > 0) {
                    for (let i = 0; i < monthDifference; i++) {
                        fireEvent.click(nextMonthButton)
                    }
                } else if (monthDifference < 0) {
                    for (let i = 0; i < Math.abs(monthDifference); i++) {
                        fireEvent.click(prevMonthButton)
                    }
                }

                // Select the correct day
                const calendarGrid = utils.getByRole('grid') // Get the calendar grid
                const dayButtons = within(calendarGrid).getAllByText(day.toString()) // Find all buttons with the target day
                const correctDayButton = dayButtons.find(
                    (button) => !button.classList.contains('day-outside') // Ensure the button is within the current month
                )
                if (correctDayButton) fireEvent.click(correctDayButton)
                await act(async () => {
                    fireEvent.click(startDateButton)
                })
            },
            fillEndDate: async (endDate: string) => {
                const [year, rawMonth, day] = endDate.split('-').map(Number)
                const month = rawMonth - 1
                const endDateButton = utils.getByTestId('date-picker-button-end-date')
                await act(async () => {
                    fireEvent.click(endDateButton)
                })

                const today = new Date()
                const todayYear = today.getFullYear()
                const todayMonth = today.getMonth()
                const monthDifference = (year - todayYear) * 12 + (month - todayMonth)

                const nextMonthButton = utils.getByRole('button', {
                    name: /Go to next month/i,
                })
                const prevMonthButton = utils.getByRole('button', {
                    name: /Go to previous month/i,
                })

                if (monthDifference > 0) {
                    for (let i = 0; i < monthDifference; i++) {
                        fireEvent.click(nextMonthButton)
                    }
                } else if (monthDifference < 0) {
                    for (let i = 0; i < Math.abs(monthDifference); i++) {
                        fireEvent.click(prevMonthButton)
                    }
                }

                const calendarGrid = utils.getByRole('grid')
                const dayButtons = within(calendarGrid).getAllByText(day.toString())
                const correctDayButton = dayButtons.find(
                    (button) => !button.classList.contains('day-outside')
                )
                if (correctDayButton) fireEvent.click(correctDayButton)
                await act(async () => {
                    fireEvent.click(endDateButton)
                })
            },
        }
    }

    it('verify start date button', async () => {
        const { fillStartDate, getByTestId } = await setup()
        await fillStartDate('2024-11-5')
        expect(getByTestId('date-picker-button-start-date')).toHaveTextContent(
            `November 5th, 2024`
        )
    })

    it('verify end date button', async () => {
        const { fillEndDate, getByTestId } = await setup()
        await fillEndDate('2024-12-25')
        expect(getByTestId('date-picker-button-end-date')).toHaveTextContent(
            `December 25th, 2024`
        )
    })

    it('verify filter button', async () => {
        const { fillStartDate, fillEndDate, triggerFilterButton } = await setup()
        await fillStartDate('2025-12-05')
        await fillEndDate('2025-12-25')
        await triggerFilterButton()
        expect(getVisitorAnalytics).toHaveBeenCalledWith(
            '2025-12-05T00:00:00+08:00',
            '2025-12-25T23:59:59+08:00'
        )
    })
})
