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
import { Eye, EyeOff, Trash2 } from 'lucide-react'
import { useDropzone, FileWithPath } from 'react-dropzone'
import { GeneralFileResponseDto } from '@dtos/application/application.dto'

export interface CustomField {
    type: 'text' | 'phone' | 'select' | 'date' | 'datetime' | 'password' | 'file'
    label: string
    options?: any // For select input options
    uploadedFiles?: GeneralFileResponseDto[]
    handleDeleteFile?: (fileGuid: string) => void
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
    acceptedFiles?: Record<string, string[]>
}

const FileDropzoneInput = ({
    onChange,
    value,
    acceptedFiles = { 'application/pdf': ['.pdf'] }, // Default to PDF files
}: FileDropzoneProps) => {
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles: FileWithPath[]) => {
            onChange(acceptedFiles)
        },
        accept: acceptedFiles, // Use the prop here
    })

    return (
        <div>
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
            {/* Displaying files to be uploaded */}
            {value && value.length > 0 && (
                <aside className="mt-4">
                    <h3 className="font-semibold text-gray-600">Files to Upload:</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-600 text-sm space-y-2">
                        {value.map((file, index) => (
                            <li key={index}>{file.name}</li>
                        ))}
                    </ul>
                </aside>
            )}
        </div>
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
            case 'date':
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
                                            className="pr-10"
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
                                    <>
                                        <FileDropzoneInput
                                            onChange={onChange}
                                            value={value}
                                        />
                                        {/* Displaying previously uploaded files */}
                                        {fieldType.uploadedFiles &&
                                            fieldType.uploadedFiles.length > 0 && (
                                                <aside className="mt-4">
                                                    <h3 className="font-semibold text-gray-600">
                                                        Uploaded Files:
                                                    </h3>
                                                    <ul className="list-disc list-inside mt-2 text-gray-600 text-sm space-y-2">
                                                        {fieldType.uploadedFiles.map(
                                                            (file, index) => (
                                                                <li
                                                                    key={index}
                                                                    className="flex items-center justify-between"
                                                                >
                                                                    <span>
                                                                        {file.fileName}
                                                                    </span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            fieldType.handleDeleteFile?.(
                                                                                file.fileGuid
                                                                            )
                                                                        }
                                                                        className="text-red-500 hover:text-red-700"
                                                                        title="Delete file"
                                                                    >
                                                                        <Trash2
                                                                            size={16}
                                                                        />
                                                                    </button>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </aside>
                                            )}
                                    </>
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
