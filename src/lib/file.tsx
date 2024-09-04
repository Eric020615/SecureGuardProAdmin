import { GeneralFile } from '@zustand/types'

export const getBase64 = (file: File): Promise<GeneralFile> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            if (reader.result) {
                const base64 = reader.result as string
                const data = base64.split(',')[1]
                resolve({
                    fileName: file.name,
                    data: data,
                })
            } else {
                reject(new Error('File reading failed: result is null'))
            }
        }

        reader.onerror = () => {
            reject(new Error('File reading failed: ' + reader.error))
        }
    })
