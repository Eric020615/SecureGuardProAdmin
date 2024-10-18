'use client'

import CustomDatePicker from '@components/datePicker/DatePicker'
import LineChart from '@components/graph/line'
import { Button } from '@components/ui/button'
import { ITimeFormat } from '@config/constant'
import { getLocalDateString, getTodayDate } from '@lib/time'
import React, { useState } from 'react'
import { CSVLink } from 'react-csv'

type VisitorData = {
    date: string
    visitors: number
}

const mockVisitorData: VisitorData[] = [
    { date: '2024-10-17', visitors: 20 },
    { date: '2024-10-18', visitors: 30 },
    { date: '2024-10-19', visitors: 25 },
    { date: '2024-10-20', visitors: 40 },
    { date: '2024-10-21', visitors: 35 },
    { date: '2024-10-22', visitors: 50 },
    { date: '2024-10-23', visitors: 45 },
]

const DashboardPage = () => {
    const [startDate, setStartDate] = useState<Date | undefined>(getTodayDate())
    const [endDate, setEndDate] = useState<Date | undefined>(getTodayDate())
    const [filteredData, setFilteredData] = useState<VisitorData[]>(mockVisitorData)

    // Function to handle date validation and filtering
    const filterData = () => {
        if (startDate && endDate && startDate > endDate) {
            alert('End date cannot be before start date')
            return
        }

        // Filter data based on selected dates
        const filtered = mockVisitorData.filter((data) => {
            const date = new Date(data.date)
            return startDate && endDate && date >= startDate && date <= endDate
        })

        setFilteredData(filtered)
    }

    // Prepare data for the chart
    const chartLabels = filteredData.map((data) =>
        getLocalDateString(new Date(data.date), ITimeFormat.date)
    )
    const chartDataPoints = filteredData.map((data) => data.visitors)

    // CSV data
    const csvData = [
        ['Date', 'Visitors'],
        ...filteredData.map((data) => [data.date, data.visitors.toString()]),
    ]

    return (
        <>
            <div className="flex flex-row justify-between">
                <h3 className="text-3xl font-bold text-black">Dashboard</h3>
                <Button className="flex items-center gap-1" onClick={() => {}}>
                    <CSVLink
                        data={csvData}
                        filename={`visitor_trends_${getLocalDateString(new Date(), 'yyyy-MM-dd')}.csv`}
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
