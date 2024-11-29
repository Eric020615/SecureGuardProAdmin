import React, { useEffect, useRef, useState } from 'react'
import { IDetectedBarcode, outline, Scanner } from '@yudiel/react-qr-scanner'

interface SharedScannerProps {
    scannedText: string
    setScannedText: (scannedText: string) => void
    scannerError?: string
    height?: number
    width?: number
    onClose?: () => void // Optional: Trigger when closes
}

const SharedScanner: React.FC<SharedScannerProps> = ({
    setScannedText,
    scannerError,
    onClose = () => {},
}) => {
    const [error, setError] = useState<string | null>(scannerError || null)
    const [isWebcamAvailable, setIsWebcamAvailable] = useState<boolean>(false)
    const streamRef = useRef<MediaStream | null>(null)

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
            const constraints = {
                video: {
                    facingMode: 'environment', // Back camera
                    width: { ideal: 1280 }, // Desired width
                    height: { ideal: 720 }, // Desired height
                },
            }
            const stream = await navigator.mediaDevices.getUserMedia(constraints)
            streamRef.current = stream // Store stream reference
            setIsWebcamAvailable(true)
        } catch (error: any) {
            if (error.name === 'OverconstrainedError') {
                console.error(
                    `The constraints could not be satisfied by any available device. Constraint: ${error.constraint}`
                )
                setError(
                    'Camera constraints could not be satisfied. Try using a different device or browser.'
                )
            } else {
                console.error('Camera error:', error)
                setError(error.message || 'Webcam access error')
            }
        }
    }

    const stopWebcam = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop())
            streamRef.current = null
        }
    }

    useEffect(() => {
        // Stop webcam when modal closes
        if (onClose) {
            onClose()
            stopWebcam()
        }
    }, [onClose])

    const handleError = (error: unknown) => {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred'
        setError(errorMessage)
    }

    useEffect(() => {
        setScannedText('')
        setError(null)
        checkWebcamAvailability()

        // Cleanup on unmount
        return () => {
            stopWebcam()
        }
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
                    onError={handleError}
                    paused={false}
                    components={{
                        onOff: true,
                        audio: true,
                        finder: true,
                        zoom: true,
                        torch: true,
                        tracker: outline,
                    }}
                    constraints={{
                        facingMode: {
                            ideal: 'environment',
                        },
                        deviceId: '',
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
