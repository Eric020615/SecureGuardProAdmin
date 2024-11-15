'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'nextjs-toploader/app'
import React, { useEffect } from 'react'
import {
    FacilitySelect,
    DurationOptions,
    NumOfGuestOptions,
} from '@config/listOption/facility' // Make sure DurationOptions is defined
import { useFacility } from '@store/facility/useFacility'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import { convertDateStringToFormattedString } from '@lib/time'
import { ITimeFormat } from '@config/constant'
import CustomForm, { CustomField } from '@components/form/element/CustomForm'
import moment from 'moment'

const formSchema = z.object({
    user: z.string().min(1, {
        message: 'Target user is required',
    }),
    facilityId: z.string().min(1, {
        message: 'Facility is required to be selected',
    }),
    startDate: z.string().min(1, {
        message: 'Start date must be in the future',
    }),
    duration: z.string().min(1, {
        message: 'Duration is required',
    }),
    numOfGuest: z.string().min(1, {
        message: 'Number of Guests is required',
    }),
    spaceId: z.string().min(1, { message: 'Slot selection is required' }), // Add slot selection
})

const CreateBookingPage = () => {
    const router = useRouter()
    const {
        submitBookingAction,
        checkAvailabilitySlotAction,
        getFacilityBookingUserAction,
        availabilitySlot,
        facilityBookingUser,
    } = useFacility()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            facilityId: '',
            startDate: '',
            duration: '',
            user: '',
            numOfGuest: '',
            spaceId: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const response = await submitBookingAction({
            facilityId: values.facilityId,
            bookedBy: values.user,
            startDate: convertDateStringToFormattedString(
                values.startDate,
                ITimeFormat.isoDateTime
            ),
            endDate: convertDateStringToFormattedString(
                moment(values.startDate)
                    .add(values.duration as string, 'hours')
                    .format(ITimeFormat.dateTime),
                ITimeFormat.isoDateTime
            ),
            numOfGuest: parseInt(values.numOfGuest),
            spaceId: values.spaceId,
        })

        if (response.success) {
            router.push('/facility')
        }
    }

    useEffect(() => {
        const fetchFacilityBookingUser = async () => {
            await getFacilityBookingUserAction()
        }
        fetchFacilityBookingUser()
    }, [])

    useEffect(() => {
        const facilityId = form.getValues('facilityId')
        const startDate = form.getValues('startDate')
        const duration = form.getValues('duration')
        const endDate = moment(startDate)
            .add(duration as string, 'hours')
            .format(ITimeFormat.dateTime)

        if (startDate && facilityId && duration) {
            const fetchAvailableSlots = async () => {
                await checkAvailabilitySlotAction(
                    facilityId,
                    convertDateStringToFormattedString(
                        startDate,
                        ITimeFormat.isoDateTime
                    ),
                    convertDateStringToFormattedString(endDate, ITimeFormat.isoDateTime)
                )
            }
            fetchAvailableSlots()
        }
    }, [form.watch('startDate'), form.watch('duration'), form.watch('facilityId')])

    const fields: Record<string, CustomField> = {
        user: {
            type: 'select',
            label: 'User',
            options: facilityBookingUser.map((item) => ({
                label: item.email,
                value: item.userGuid,
            })),
        },
        facilityId: {
            type: 'select',
            label: 'Facility',
            options: FacilitySelect.map((item) => ({
                label: item.label,
                value: item.value,
            })),
        },
        startDate: {
            type: 'datetime',
            label: 'Start Date',
        },
        duration: {
            type: 'select',
            label: 'Duration',
            options: DurationOptions.map((item) => ({
                label: item.label,
                value: item.value,
            })),
        },
        spaceId: {
            type: 'select',
            label: 'Booking Slot',
            options: availabilitySlot.map((x) => ({
                label: x.spaceName,
                value: x.spaceId,
                disabled: x.isBooked,
            })),
        },
        numOfGuest: {
            type: 'select',
            label: 'Guests',
            options: NumOfGuestOptions.map((item) => ({
                label: item.label,
                value: item.value,
            })),
        },
    }

    return (
        <>
            <ActionConfirmationDialog />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Create new booking</h3>
            </div>
            <div className="mt-5">
                <CustomForm form={form} fields={fields} onSubmit={onSubmit} />
            </div>
        </>
    )
}

export default CreateBookingPage
