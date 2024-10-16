import { Input } from '@components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import React, { InputHTMLAttributes, useState } from 'react'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement>{
    type: string
    placeholder: string
    containerStyle: string
}

const CustomInput = ({ type, placeholder, containerStyle, ...props }: CustomInputProps) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <div className={`${containerStyle} relative`}>
            <Input
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                {...props}
            />
            <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    )
}

export default CustomInput
