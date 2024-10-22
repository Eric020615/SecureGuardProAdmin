'use client'

import CustomDatePicker from '@components/datePicker/DatePicker'
import LineChart from '@components/graph/line'
import { Button } from '@components/ui/button'
import { ITimeFormat } from '@config/constant'
import { convertDateStringToFormattedString, convertDateToDateString, getCurrentDate, getCurrentDateString, initializeDateAtBoundary } from '@lib/time'
import { useVisitor } from '@store/visitor/useVisitor'
import React, { useState } from 'react'
import { CSVLink } from 'react-csv'

const DashboardPage = () => {
    const [startDate, setStartDate] = useState<Date | undefined>(getCurrentDate())
    const [endDate, setEndDate] = useState<Date | undefined>(getCurrentDate())
    const { visitorAnalytics, getVisitorAnalyticsAction } = useVisitor()

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
                endDate ? initializeDateAtBoundary(endDate, "end") : getCurrentDate(),
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
            data.count.toString()
        ]),
    ]

    return (
        <>
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Dashboard</h3>
                <Button className="flex items-center gap-1" onClick={() => {}}>
                    <CSVLink
                        data={csvData}
                        filename={`visitor_trends_${getCurrentDateString(ITimeFormat.date)}.csv`}
                    >
                        Export as CSV
                    </CSVLink>
                </Button>
            </div>
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
                <Button
                    className="flex items-center gap-1"
                    onClick={() => {
                        filterData()
                    }}
                >
                    <p className="flex items-center text-center">Filter</p>
                </Button>
            </div>
            <div className="flex-grow flex justify-center items-center bg-white p-5 rounded-lg shadow-md mt-5">
                <LineChart
                    labels={chartLabels}
                    dataPoints={chartDataPoints}
                    chartTitle="Visitor Trends Over Time"
                />
            </div>
        </>
    )
}

export default DashboardPage
