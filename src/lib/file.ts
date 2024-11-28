import { GeneralFileDto } from '@dtos/application/application.dto'

export const getGeneralFileDto = (file: File): Promise<GeneralFileDto> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.readAsDataURL(file)

        reader.onload = () => {
            if (reader.result) {
                const base64 = reader.result as string
                const data = base64.split(',')[1]
                resolve({
                    fileName: file.name,
                    fileData: data,
                    contentType: file.type,
                    size: file.size,
                })
            } else {
                reject(new Error('File reading failed: result is null'))
            }
        }

        reader.onerror = () => {
            reject(new Error('File reading failed: ' + reader.error))
        }
    })

export const getBase64FromImage = (image: string): Promise<string> => {
    const base64 = image
    const data = base64.split(',')[1]
    return Promise.resolve(data)
}

export const convertImageToGeneralFile = async (
    image: string,
    fileName: string = 'captured-image.jpg'
): Promise<GeneralFileDto> => {
    try {
        const base64 = image
        const data = base64.split(',')[1]
        const file: GeneralFileDto = {
            fileName: fileName,
            fileData: data,
            contentType: 'image/jpeg', // Assuming JPEG for captured images
            size: data.length * (3 / 4), // Approximation: base64 size (in bytes)
        }
        return file
    } catch (error: any) {
        throw new Error(error)
    }
}
