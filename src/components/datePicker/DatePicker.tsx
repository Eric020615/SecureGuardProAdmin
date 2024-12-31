'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@libs/utils'
import { Button } from '@components/ui/button'
import { Calendar } from '@components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'

interface CustomDatePickerProps {
    title: string
    selectedDate: Date | undefined
    setSelectedDate: Dispatch<SetStateAction<Date | undefined>>
}

const CustomDatePicker = ({
    title,
    selectedDate,
    setSelectedDate,
}: CustomDatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={'outline'}
                    className={cn(
                        'w-full justify-start text-left font-normal',
                        !selectedDate && 'text-muted-foreground'
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : <span>{title}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default CustomDatePicker
