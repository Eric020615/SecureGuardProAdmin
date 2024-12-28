import React from 'react'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import CreateNotice from '../../../app/(root)/notice/create/page'
import { createNotice } from '@api/noticeManagementService/noticeManagementService'

jest.mock('@api/noticeManagementService/noticeManagementService', () => ({
    ...jest.requireActual('@api/noticeManagementService/noticeManagementService'),
    createNotice: jest.fn().mockReturnValue({
        success: true,
        msg: 'Notice created successfully!',
        data: null,
    }),
}))

describe('CreateNotice', () => {
    beforeEach(() => {
        jest.clearAllMocks() // Clears all mock calls and state
    })
    const setup = async () => {
        const utils = render(
            <>
                <CreateNotice />
            </>
        )

        await act(async () => {
            await new Promise((resolve) => setTimeout(resolve, 0))
        })

        return {
            ...utils,
            triggerSubmit: async () => {
                await act(async () => {
                    fireEvent.click(utils.getByTestId('submit-button'))
                })
            },
            fillTitle: async (title: string) => {
                const input = await utils.findByPlaceholderText('Enter your title')
                await act(async () => {
                    fireEvent.change(input, { target: { value: title } })
                })
            },
            fillDescription: async (description: string) => {
                const input = await utils.findByPlaceholderText('Enter your description')
                await act(async () => {
                    fireEvent.change(input, { target: { value: description } })
                })
            },
            fillStartDate: async (startDate: string) => {
                const startDateLabel = utils.getByText('Start Date') // Locate the label
                const input = startDateLabel.parentElement?.querySelector('input') // Select the input in the same container
                if (input) {
                    await act(async () => {
                        fireEvent.change(input, { target: { value: startDate } })
                    })
                }
            },
            fillEndDate: async (endDate: string) => {
                const endDateLabel = utils.getByText('End Date') // Locate the label
                const input = endDateLabel.parentElement?.querySelector('input') // Select the input in the same container
                if (input) {
                    await act(async () => {
                        fireEvent.change(input, { target: { value: endDate } })
                    })
                }
            },
            fillAttachments: async (file: File) => {
                const fileInputLabel = utils.getByText('Attachments') // This will find the label by text
                // Find the file input element by navigating the DOM
                const input =
                    fileInputLabel.parentElement?.querySelector('input[type="file"]') // Target the file input in the same container
                if (input) {
                    // Simulate the file selection by changing the input's 'files' property
                    Object.defineProperty(input, 'files', { value: [file] })
                    await act(async () => {
                        fireEvent.change(input) // Trigger the change event to simulate file selection
                    })
                }
            },
        }
    }

    it('verify notice title field', async () => {
        const { fillTitle, triggerSubmit, queryByText } = await setup()

        expect(queryByText('Notice title is required')).not.toBeInTheDocument()
        await fillTitle('Test Notice Title')
        await triggerSubmit()
        await act(async () => {
            expect(queryByText('Notice title is required')).not.toBeInTheDocument()
        })
        await fillTitle('')
        await triggerSubmit()
        await act(async () => {
            expect(queryByText('Notice title is required')).toBeInTheDocument()
        })
    })

    it('verify notice description field', async () => {
        const { fillDescription, triggerSubmit, queryByText } = await setup()

        // Initially, the error message should not be present
        expect(queryByText('Notice description is required')).not.toBeInTheDocument()

        // Submit without filling the description field
        await triggerSubmit()
        await act(async () => {
            // The error message should now appear
            expect(queryByText('Notice description is required')).toBeInTheDocument()
        })

        // Fill the description field and submit again
        await fillDescription('This is a test description')
        await triggerSubmit()

        // The error message should no longer be present
        expect(queryByText('Notice description is required')).not.toBeInTheDocument()
    })

    it('verify notice start date field', async () => {
        const { fillStartDate, triggerSubmit, queryByText } = await setup()

        // Initially, the error message should not be present
        expect(queryByText('Start Date is required')).not.toBeInTheDocument()

        // Submit without filling the start date field
        await triggerSubmit()
        await act(async () => {
            // The error message should now appear
            expect(queryByText('Start Date is required')).toBeInTheDocument()
        })

        // Fill the start date field and submit again
        await fillStartDate('2024-12-30T10:00')
        await triggerSubmit()

        // The error message should no longer be present
        expect(queryByText('Start Date is required')).not.toBeInTheDocument()
    })

    it('verify notice end date field', async () => {
        const { fillEndDate, triggerSubmit, queryByText } = await setup()

        // Check if the error message is not initially present
        expect(queryByText('End Date is required')).not.toBeInTheDocument()

        // Submit without filling the end date field
        await triggerSubmit()
        await act(async () => {
            // The error message should appear
            expect(queryByText('End Date is required')).toBeInTheDocument()
        })

        // Fill the end date field with a valid date and submit again
        await fillEndDate('2024-12-29T12:00') // Using datetime-local format
        await triggerSubmit()

        // The error message should disappear
        expect(queryByText('End Date is required')).not.toBeInTheDocument()
    })

    it('verify notice attachments field', async () => {
        const { fillAttachments, queryByText } = await setup()
        const inputNoFile = document.querySelector('input[type="file"]') as HTMLInputElement
        expect(inputNoFile?.files?.length).toBe(0) // No file should be selected initially
        const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' })
        await fillAttachments(file)
        expect(queryByText('example.txt')).toBeInTheDocument()
        const input = document.querySelector('input[type="file"]') as HTMLInputElement
        expect(input?.files?.[0]).toBe(file)
    })

    it('verify Submit button', async () => {
        const {
            triggerSubmit,
            fillTitle,
            fillDescription,
            fillStartDate,
            fillEndDate,
            fillAttachments,
            queryByText,
        } = await setup()
        await fillTitle('Test Notice Title')
        await fillDescription('This is a test description')
        await fillStartDate('2024-12-30T10:00')
        await fillEndDate('2024-12-31T12:00') // Using datetime-local format
        const file = new File(['dummy content'], 'example.txt', { type: 'text/plain' })
        await fillAttachments(file)
        await triggerSubmit()
        await waitFor(() => {
            expect(createNotice).toHaveBeenCalledTimes(1)
            expect(queryByText('Notice successfully created!')).toBeInTheDocument()
        })
    })
})
