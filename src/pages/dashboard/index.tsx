'use client'

import CustomDatePicker from '@components/datePicker/DatePicker'
import ActionConfirmationDialog from '@components/dialog/ActionConfirmationDialog'
import LineChart from '@components/graph/line'
import { Button } from '@components/ui/button'
import { ITimeFormat } from '@config/constant'
import { RoleEnum } from '@config/constant/user'
import {
    convertDateStringToFormattedString,
    convertDateToDateString,
    getCurrentDate,
    getDateAtBoundary,
    initializeDateAtBoundary,
} from '@lib/time'
import { useAuth } from '@store/auth/useAuth'
import { useVisitorManagement } from '@store/visitorManagement/useVisitorManagement'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'

const DashboardPage = () => {
    const [startDate, setStartDate] = useState<Date | undefined>(
        getDateAtBoundary(getCurrentDate(), 'month', 'start')
    )
    const [endDate, setEndDate] = useState<Date | undefined>(getCurrentDate())
    const { visitorAnalytics, getVisitorAnalyticsAction } = useVisitorManagement()
    const { authTokenPayload } = useAuth()

    useEffect(() => {
        filterData()
    }, [startDate, endDate])

    // Function to handle date validation and filtering
    const filterData = async () => {
        if (startDate && endDate && startDate > endDate) {
            alert('End date cannot be before start date')
            return
        }

        await getVisitorAnalyticsAction(
            convertDateToDateString(
                startDate ? startDate : getCurrentDate(),
                ITimeFormat.isoDateTime
            ),
            convertDateToDateString(
                endDate ? initializeDateAtBoundary(endDate, 'end') : getCurrentDate(),
                ITimeFormat.isoDateTime
            )
        )
    }

    // Prepare data for the chart
    const chartLabels = visitorAnalytics.map((data) =>
        convertDateStringToFormattedString(data.date, ITimeFormat.date)
    )
    const chartDataPoints = visitorAnalytics.map((data) => data.count)

    // CSV data
    const csvData = [
        ['Date', 'Visitors'],
        ...visitorAnalytics.map((data) => [
            convertDateStringToFormattedString(data.date, ITimeFormat.date),
            data.count.toString(),
        ]),
    ]

    const generateFileName = () => {
        if (!startDate || !endDate) {
            alert('Please select a date range to export the data')
            return
        }
        return `visitor_trends_${convertDateToDateString(
            startDate,
            ITimeFormat.date
        )}_to_${convertDateToDateString(endDate, ITimeFormat.date)}.csv`
    }

    return (
        <div className="max-h-screen">
            <ActionConfirmationDialog />
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Dashboard</h3>
                {authTokenPayload?.role === RoleEnum.SYSTEM_ADMIN && (
                    <Button className="flex items-center gap-1" onClick={() => {}}>
                        <CSVLink
                            data={csvData}
                            filename={generateFileName()}
                        >
                            Export as CSV
                        </CSVLink>
                    </Button>
                )}
            </div>
            {authTokenPayload?.role === RoleEnum.SYSTEM_ADMIN && (
                <>
                    <div className="flex gap-4 mt-5">
                        <CustomDatePicker
                            title="Start Date"
                            selectedDate={startDate}
                            setSelectedDate={setStartDate}
                        />
                        <CustomDatePicker
                            title="End Date"
                            selectedDate={endDate}
                            setSelectedDate={setEndDate}
                        />
                    </div>
                    <div className="flex-1 flex justify-center items-center bg-white p-5 rounded-lg shadow-md mt-5">
                        <LineChart
                            labels={chartLabels}
                            dataPoints={chartDataPoints}
                            chartTitle="Visitor Trends Over Time"
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default DashboardPage
