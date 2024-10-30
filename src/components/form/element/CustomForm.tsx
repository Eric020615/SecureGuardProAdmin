import React, { forwardRef, useState } from 'react'
import { Button } from '@components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@components/ui/form'
import { UseFormReturn } from 'react-hook-form'
import { Input } from '@components/ui/input'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import CustomSelect from '@components/select/Select'
import { Eye, EyeOff } from 'lucide-react'
import { useDropzone, FileWithPath } from 'react-dropzone'

export interface CustomField {
    type: 'text' | 'phone' | 'select' | 'date' | 'datetime' | 'password' | 'file'
    label: string
    options?: any // For select input options
}

interface CustomFormProps {
    form: UseFormReturn<any>
    fields: Record<string, CustomField>
    onSubmit: (data: any) => void
}

const phoneNumberInput = forwardRef<HTMLInputElement>((props, ref) => {
    return <input {...props} ref={ref} className="h-full w-full rounded-md px-2" />
})

interface FileDropzoneProps {
    onChange: (event: any[]) => void
    value: FileWithPath[]
}

const FileDropzoneInput = ({ onChange, value }: FileDropzoneProps) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: FileWithPath[]) => {
            onChange(acceptedFiles)
        },
    })
    return (
        <>
            <div
                {...getRootProps({
                    className:
                        'dropzone flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400',
                })}
            >
                <input {...getInputProps()} />
                <p className="text-gray-500">
                    Drag 'n' drop some files here, or click to select files
                </p>
            </div>
            <aside className="mt-4">
                <ul className="list-disc list-inside mt-2 text-gray-600 text-sm">
                    {value &&
                        value.length > 0 &&
                        value.map((file, index) => <li key={index}>{file.name}</li>)}
                </ul>
            </aside>
        </>
    )
}

const CustomForm: React.FC<CustomFormProps> = ({ form, fields, onSubmit }) => {
    const renderField = (key: string, fieldType: CustomField) => {
        switch (fieldType.type) {
            case 'text':
                return (
                    <FormField
                        control={form.control}
                        name={key}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fieldType.label}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder={`Enter your ${key}`}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )
            case 'phone':
                return (
                    <FormField
                        control={form.control}
                        name={key}
                        render={({ field: { onChange, value } }) => (
                            <FormItem>
                                <FormLabel>{fieldType.label}</FormLabel>
                                <FormControl>
                                    <PhoneInput
                                        onChange={onChange}
                                        value={value}
                                        placeholder={`Enter your ${key}`}
                                        className="flex h-10 w-full rounded-md border border-input bg-background pl-2 text-sm ring-offset-background"
                                        inputComponent={phoneNumberInput}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )
            case 'select':
                return (
                    <FormField
                        control={form.control}
                        name={key}
                        render={({ field: { onChange, value } }) => (
                            <FormItem>
                                <FormLabel>{fieldType.label}</FormLabel>
                                <FormControl>
                                    <CustomSelect
                                        title={fieldType.label}
                                        selectLabel={fieldType.label}
                                        selectItem={fieldType.options}
                                        onDataChange={onChange}
                                        value={value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )
            case 'date': // Add the case for date input
                return (
                    <FormField
                        control={form.control}
                        name={key}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fieldType.label}</FormLabel>
                                <FormControl>
                                    <Input type="date" placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )
            case 'datetime':
                return (
                    <FormField
                        control={form.control}
                        name={key}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fieldType.label}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="datetime-local"
                                        placeholder="shadcn"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )
            case 'password':
                const [showPassword, setShowPassword] = useState(false)
                return (
                    <FormField
                        control={form.control}
                        name={key}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>{fieldType.label}</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder={`Enter your ${key}`}
                                            {...field}
                                            className="pr-10" // Add padding to avoid overlap with the icon
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                            className="absolute inset-y-0 right-2 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={20} />
                                            ) : (
                                                <Eye size={20} />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )
            case 'file':
                return (
                    <FormField
                        control={form.control}
                        name={key}
                        render={({ field: { onChange, value } }) => (
                            <FormItem>
                                <FormLabel>{fieldType.label}</FormLabel>
                                <FormControl>
                                    <FileDropzoneInput
                                        onChange={onChange}
                                        value={value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )
            default:
                return null
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {Object.entries(fields).map(([key, fieldType]) => (
                    <div key={key}>{renderField(key, fieldType)}</div>
                ))}
                <Button type="submit" className="w-[30%]">
                    Submit
                </Button>
            </form>
        </Form>
    )
}

export default CustomForm
