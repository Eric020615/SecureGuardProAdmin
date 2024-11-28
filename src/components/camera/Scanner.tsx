import React, { useEffect, useState } from 'react'
import { IDetectedBarcode, Scanner } from '@yudiel/react-qr-scanner'

interface SharedScannerProps {
    scannedText: string
    setScannedText: (scannedText: string) => void
    scannerError?: string
    height?: number
    width?: number
}

const SharedScanner: React.FC<SharedScannerProps> = ({
    setScannedText,
    scannerError,
    height = 600,
    width = 600,
}) => {
    const [error, setError] = useState<string | null>(scannerError || null)
    const [isWebcamAvailable, setIsWebcamAvailable] = useState<boolean>(false)

    const onScan = (detectedCodes: IDetectedBarcode[]) => {
        const firstCode = detectedCodes[0]
        if (firstCode?.rawValue) {
            setScannedText(firstCode.rawValue)
            setError(null)
        } else {
            setError('Invalid QR Code')
        }
    }

    const checkWebcamAvailability = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (stream) setIsWebcamAvailable(true)
        } catch (error: any) {
            setError(error.message)
        }
    }

    const handleError = (error: unknown) => {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
        setError(errorMessage)
    }

    useEffect(() => {
        setScannedText('')
        setError(null)
        checkWebcamAvailability()
    }, [])

    const renderScanner = () => {
        if (error) {
            return (
                <div className="flex items-center justify-center w-full h-96 border-2 border-red-500">
                    <span className="text-red-500">{error}</span>
                </div>
            )
        }

        if (isWebcamAvailable) {
            return (
                <Scanner
                    onScan={onScan}
                    onError={(error) => handleError(error)}
                    styles={{
                        container: {
                            width: `${width}px`,
                            height: `${height}px`,
                        },
                    }}
                />
            )
        }

        return (
            <div className="flex items-center justify-center w-full h-96">
                <span className="text-gray-500">Loading Scanner...</span>
            </div>
        )
    }

    return <div className="w-full">{renderScanner()}</div>
}

export default SharedScanner
