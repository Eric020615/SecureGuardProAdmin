import React, { Dispatch, SetStateAction } from 'react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@components/ui/select'

interface SelectItemProps {
    label: string
    value: any
    disabled?: boolean
}

interface CustomSelectProps {
    title?: string
    selectLabel: string
    selectItem: SelectItemProps[]
    onDataChange: Dispatch<SetStateAction<any>>
    value: any
}

const CustomSelect = ({
    title,
    selectLabel,
    selectItem,
    onDataChange,
    value,
}: CustomSelectProps) => {
    return (
        <Select onValueChange={onDataChange} value={value}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={title} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{selectLabel}</SelectLabel>
                    {selectItem.map((x, index) => (
                        <SelectItem key={index} value={x.value} disabled={x.disabled}>
                            {x.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export default CustomSelect
