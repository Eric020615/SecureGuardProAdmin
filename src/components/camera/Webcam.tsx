import { Button } from '@components/ui/button'
import { Camera, Repeat, Upload } from 'lucide-react'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Webcam from 'react-webcam'

interface SharedWebcamProps {
    faceImage: string | undefined
    setFaceImage: (image: string | undefined) => void
    onUpload: () => void
    screenshotQuality?: number // Allow customization of quality if needed
    height?: number
    width?: number
    onClose?: () => void // Optional: Trigger when closes
}

const SharedWebcam: React.FC<SharedWebcamProps> = ({
    faceImage,
    setFaceImage,
    onUpload,
    screenshotQuality = 1.0,
    height = 600,
    width = 600,
    onClose = () => {},
}) => {
    const webcamRef = useRef<Webcam>(null)
    const [webcamError, setWebcamError] = useState<string | null>(null)
    const [isWebcamAvailable, setIsWebcamAvailable] = useState<boolean>(false)

    const capture = useCallback(() => {
        if (!webcamRef.current) return
        const imageSrc = webcamRef.current.getScreenshot()
        if (!imageSrc) return
        setFaceImage(imageSrc)
    }, [webcamRef])

    const retake = () => {
        setFaceImage('')
    }

    const checkWebcamAvailability = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true })
            if (stream) setIsWebcamAvailable(true)
        } catch (error: any) {
            setWebcamError(error.message)
        }
    }

    const handleError = (error: unknown) => {
        const errorMessage =
            error instanceof Error ? error.message : 'An unknown error occurred'
        setWebcamError(errorMessage)
    }

    useEffect(() => {
        setFaceImage('')
        setWebcamError(null)
        checkWebcamAvailability()
    }, [])

    const stopWebcam = () => {
        if (webcamRef.current?.stream) {
            webcamRef.current.stream.getTracks().forEach((track) => track.stop())
            webcamRef.current.stream = null
        }
    }

    useEffect(() => {
        setFaceImage('')
        setWebcamError(null)
        checkWebcamAvailability()

        // Cleanup on unmount
        return () => {
            stopWebcam()
        }
    }, [])

    useEffect(() => {
        // Stop webcam when modal closes
        if (onClose) {
            onClose()
            stopWebcam()
        }
    }, [onClose])

    const renderWebcam = () => {
        if (webcamError) {
            return (
                <div className="flex items-center justify-center w-full h-96 border-2 border-red-500">
                    <span className="text-red-500">{webcamError}</span>
                </div>
            )
        }

        if (isWebcamAvailable) {
            return (
                <Webcam
                    height={height}
                    width={width}
                    ref={webcamRef}
                    mirrored
                    screenshotFormat="image/jpeg"
                    screenshotQuality={screenshotQuality}
                    onError={(error) => handleError(error)}
                />
            )
        }

        return (
            <div className="flex items-center justify-center w-full h-96">
                <span className="text-gray-500">Loading Webcam...</span>
            </div>
        )
    }

    return (
        <div className="w-full">
            <div>
                {faceImage ? <img src={faceImage} alt="Captured" /> : renderWebcam()}
            </div>
            <div className="flex justify-center gap-4 mt-5">
                {faceImage ? (
                    <div className="flex w-full justify-evenly">
                        <Button onClick={retake}>
                            <Repeat className="mr-2 h-5 w-5" /> Retake
                        </Button>
                        <Button onClick={onUpload}>
                            <Upload className="mr-2 h-5 w-5" /> Upload
                        </Button>
                    </div>
                ) : (
                    <Button onClick={capture}>
                        <Camera className="mr-2 h-5 w-5" /> Capture
                    </Button>
                )}
            </div>
        </div>
    )
}

export default SharedWebcam
